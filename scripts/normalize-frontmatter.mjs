// Rete di sicurezza BULLETPROOF: normalizza il frontmatter dell'articolo appena
// generato così un errore dell'AI non rompe mai il build (autonomia reale).
// Gestisce: code fence ```md, BOM, CRLF, chiavi in grassetto **title**, YAML
// rotto, frontmatter assente. Produce SEMPRE un frontmatter YAML valido.
// Elabora il file .md del blog più recente (quello appena scritto).

import yaml from 'js-yaml';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG = join(ROOT, 'src/content/blog');
const TREAT = join(ROOT, 'src/content/treatments');
const COND = join(ROOT, 'src/content/conditions');

const slugsIn = async (d) => {
	try { return new Set((await readdir(d)).filter((f) => /\.md$/.test(f)).map((f) => f.replace(/\.md$/, ''))); }
	catch { return new Set(); }
};
const humanize = (slug) => slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

async function newestArticle() {
	const files = (await readdir(BLOG)).filter((f) => /\.md$/.test(f));
	let best = null, bestM = -1;
	for (const f of files) { const m = (await stat(join(BLOG, f))).mtimeMs; if (m > bestM) { bestM = m; best = f; } }
	return best;
}

function clean(str) {
	let t = String(str).replace(/^﻿/, '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim();
	const fence = t.match(/^```[a-zA-Z-]*\n([\s\S]*?)\n```$/); // tutto avvolto in un code fence
	if (fence) t = fence[1].trim();
	return t;
}

function splitFrontmatter(t) {
	const m = t.match(/^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n([\s\S]*))?$/);
	if (!m) return null;
	return { fm: m[1], body: (m[2] || '').replace(/^\n+/, '') };
}

// estrazione best-effort di un campo scalare (gestisce **key** e quote)
function grab(fmRaw, key) {
	const m = fmRaw.match(new RegExp(`^\\**${key}\\**[ \t]*:[ \t]*(.+?)[ \t]*$`, 'im'));
	if (!m) return '';
	return m[1].replace(/^["']|["']$/g, '').trim();
}

async function main() {
	const file = await newestArticle();
	if (!file) { console.log('Nessun articolo da normalizzare.'); return; }
	const slug = file.replace(/\.md$/, '');
	const full = join(BLOG, file);
	const raw = await readFile(full, 'utf8');
	const t = clean(raw);

	const [treatSlugs, condSlugs] = await Promise.all([slugsIn(TREAT), slugsIn(COND)]);
	const today = new Date().toISOString().slice(0, 10);

	const split = splitFrontmatter(t);
	let data = {}, fmRaw = '', body = t;
	if (split) {
		fmRaw = split.fm; body = split.body;
		try { const d = yaml.load(fmRaw); if (d && typeof d === 'object' && !Array.isArray(d)) data = d; } catch { /* YAML rotto → uso grab() sotto */ }
	}

	const pick = (k) => (typeof data[k] === 'string' && data[k].trim()) ? data[k].trim() : grab(fmRaw, k);

	const title = pick('title') || humanize(slug);
	const metaTitle = pick('metaTitle') || `${title} | Utah Stem Cells`;
	let description = pick('description') || `${title} — physician-led regenerative medicine in Sandy, UT. Book a consultation.`;
	if (description.length > 300) description = description.slice(0, 297).trimEnd() + '…';
	const author = pick('author') || 'Dr. William Cimikoski';
	const hero = (typeof data.hero === 'string' && data.hero.trim()) ? data.hero.trim() : grab(fmRaw, 'hero');

	const cleanList = (arr, valid) => Array.isArray(arr)
		? [...new Set(arr.map(String).map((s) => s.trim().replace(/^["']|["']$/g, '')).filter((s) => valid.has(s)))]
		: [];
	const relatedTreatments = cleanList(data.relatedTreatments, treatSlugs);
	const relatedConditions = cleanList(data.relatedConditions, condSlugs);

	const out = { title, metaTitle, description, pubDate: today, author };
	if (hero) out.hero = hero;
	if (relatedTreatments.length) out.relatedTreatments = relatedTreatments;
	if (relatedConditions.length) out.relatedConditions = relatedConditions;

	const fm = yaml.dump(out, { lineWidth: -1, quotingType: '"', forceQuotes: true }).trimEnd();
	const finalBody = (body || '').trim() || `${title}\n\nContent coming soon.`;
	await writeFile(full, `---\n${fm}\n---\n\n${finalBody}\n`, 'utf8');
	console.log(`[${slug}] frontmatter normalizzato (title="${title.slice(0, 50)}", pubDate=${today}, tr:${relatedTreatments.length} co:${relatedConditions.length}, fm=${split ? 'trovato' : 'ricostruito'}).`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
