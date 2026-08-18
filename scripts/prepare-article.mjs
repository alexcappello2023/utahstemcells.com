// Prepara l'articolo appena generato: normalizza il frontmatter E aggiunge la
// hero, in UNA sola scrittura atomica (niente più conflitti add-hero/normalize).
// Robusto: gestisce code fence, BOM, CRLF, chiavi in grassetto, YAML rotto,
// frontmatter impilati/duplicati, delimitatori storti. Non fallisce mai.
//
// Env: PEXELS_API_KEY (se manca, l'articolo esce senza immagine ma valido)

import yaml from 'js-yaml';
import sharp from 'sharp';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG = join(ROOT, 'src/content/blog');
const IMG = join(ROOT, 'public/blog-images');
const TREAT = join(ROOT, 'src/content/treatments');
const COND = join(ROOT, 'src/content/conditions');
const W = 1640, H = 880;
const STOP = new Set(['the','a','an','and','or','for','to','of','in','on','is','are','can','you','your','with','what','how','why','does','do','vs','my','it','that','this','right','really','truth','revealed','guide','a','about']);

const slugsIn = async (d) => { try { return new Set((await readdir(d)).filter((f) => /\.md$/.test(f)).map((f) => f.replace(/\.md$/, ''))); } catch { return new Set(); } };
const humanize = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
const exists = async (p) => { try { await stat(p); return true; } catch { return false; } };

async function newest() {
	const files = (await readdir(BLOG)).filter((f) => /\.md$/.test(f));
	let best = null, bestM = -1;
	for (const f of files) { const m = (await stat(join(BLOG, f))).mtimeMs; if (m > bestM) { bestM = m; best = f; } }
	return best;
}

function clean(str) {
	let t = String(str).replace(/^﻿/, '').replace(/\r\n?/g, '\n').trim();
	const fence = t.match(/^```[a-zA-Z-]*\n([\s\S]*?)\n```$/);
	if (fence) t = fence[1].trim();
	return t;
}

// Estrae TUTTI i blocchi frontmatter impilati in testa; i blocchi successivi
// sovrascrivono i precedenti (l'ultimo, quello vero dell'AI, vince).
function peel(t) {
	let body = t, data = {}, rawAll = '';
	for (let guard = 0; guard < 5; guard++) {
		const lines = body.split('\n');
		if (lines[0].trim() !== '---') break;
		let ci = -1;
		for (let i = 1; i < lines.length; i++) if (/^-{2,3}\s*$/.test(lines[i].trim())) { ci = i; break; }
		if (ci === -1) break;
		const raw = lines.slice(1, ci).join('\n');
		rawAll += '\n' + raw;
		try { const d = yaml.load(raw); if (d && typeof d === 'object' && !Array.isArray(d)) data = { ...data, ...d }; } catch { /* grab sotto */ }
		body = lines.slice(ci + 1).join('\n').replace(/^\n+/, '');
	}
	return { data, rawAll, body };
}

function grab(raw, key) {
	const m = raw.match(new RegExp(`^\\**${key}\\**[ \t]*:[ \t]*(.+?)[ \t]*$`, 'im'));
	return m ? m[1].replace(/^["']|["']$/g, '').trim() : '';
}

async function pexels(query) {
	const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;
	const res = await fetch(url, { headers: { Authorization: process.env.PEXELS_API_KEY, 'User-Agent': 'usc-bot' } });
	if (!res.ok) throw new Error(`Pexels HTTP ${res.status}`);
	return (await res.json()).photos || [];
}

async function main() {
	const file = await newest();
	if (!file) { console.log('Nessun articolo.'); return; }
	const slug = file.replace(/\.md$/, '');
	const full = join(BLOG, file);
	const { data, rawAll, body } = peel(clean(await readFile(full, 'utf8')));

	const [treatSlugs, condSlugs] = await Promise.all([slugsIn(TREAT), slugsIn(COND)]);
	const today = new Date().toISOString().slice(0, 10);
	const pick = (k) => (typeof data[k] === 'string' && data[k].trim()) ? data[k].trim() : grab(rawAll, k);

	const title = pick('title') || humanize(slug);
	const metaTitle = pick('metaTitle') || `${title} | Utah Stem Cells`;
	let description = pick('description') || `${title} — physician-led regenerative medicine in Sandy, UT. Book a consultation.`;
	if (description.length > 300) description = description.slice(0, 297).trimEnd() + '…';
	const author = pick('author') || 'Dr. William Cimikoski';
	const cleanList = (arr, valid) => Array.isArray(arr) ? [...new Set(arr.map(String).map((s) => s.trim().replace(/^["']|["']$/g, '')).filter((s) => valid.has(s)))] : [];
	const relatedTreatments = cleanList(data.relatedTreatments, treatSlugs);
	const relatedConditions = cleanList(data.relatedConditions, condSlugs);

	// HERO: scarica se non c'è già il webp
	const heroPath = join(IMG, `${slug}-hero.webp`);
	let hero = (await exists(heroPath)) ? `/blog-images/${slug}-hero.webp` : '';
	if (!hero && process.env.PEXELS_API_KEY) {
		const q = (pick('imageQuery') || title.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter((w) => w && !STOP.has(w)).slice(0, 4).join(' ')).trim();
		try {
			const photos = await pexels(q || 'medical clinic doctor');
			if (photos.length) {
				const src = photos[0].src.large2x || photos[0].src.landscape || photos[0].src.original;
				const r = await fetch(src, { headers: { 'User-Agent': 'usc-bot' } });
				if (r.ok) { await sharp(Buffer.from(await r.arrayBuffer())).resize(W, H, { fit: 'cover', position: 'attention' }).webp({ quality: 82 }).toFile(heroPath); hero = `/blog-images/${slug}-hero.webp`; }
			} else { console.warn(`[${slug}] nessuna foto Pexels per "${q}"`); }
		} catch (e) { console.warn(`[${slug}] immagine non riuscita: ${e.message}`); }
	}

	const out = { title, metaTitle, description, pubDate: today, author };
	if (hero) out.hero = hero;
	if (relatedTreatments.length) out.relatedTreatments = relatedTreatments;
	if (relatedConditions.length) out.relatedConditions = relatedConditions;

	const fm = yaml.dump(out, { lineWidth: -1, quotingType: '"', forceQuotes: true }).trimEnd();
	const finalBody = (body || '').trim() || `${title}\n\nContent coming soon.`;
	await writeFile(full, `---\n${fm}\n---\n\n${finalBody}\n`, 'utf8');
	console.log(`[${slug}] pronto (title="${title.slice(0, 45)}", hero=${hero ? 'sì' : 'NO'}, tr:${relatedTreatments.length} co:${relatedConditions.length}).`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
