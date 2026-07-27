// Assegna un'immagine HERO (da Pexels) agli articoli del blog che non ce l'hanno.
// Passo DETERMINISTICO della routine: l'AI scrive solo il testo, l'immagine la
// mette questo script — così non dipende dalla diligenza dell'AI.
//
// Per ogni articolo .md senza hero già presente in public/blog-images/:
//   - usa il campo frontmatter `imageQuery` (2-4 parole) o, in mancanza, il titolo
//   - scarica una foto orizzontale da Pexels (licenza libera, no attribuzione)
//   - la converte in webp 1640x880 -> public/blog-images/<slug>-hero.webp
//   - imposta `hero:` nel frontmatter e rimuove `imageQuery:`
//
// Env: PEXELS_API_KEY
// Uso:  node scripts/add-hero.mjs

import 'dotenv/config';
import sharp from 'sharp';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const IMG_DIR = join(ROOT, 'public/blog-images');

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const W = 1640, H = 880;
const STOP = new Set(['the','a','an','and','or','for','to','of','in','on','is','are','can','you','your','with','what','how','why','does','do','vs','my','it','that','this','right','really','truth','revealed','guide']);

async function exists(p) { try { await stat(p); return true; } catch { return false; } }

function fmBlock(text) {
	if (!text.startsWith('---')) return null;
	const end = text.indexOf('\n---', 3);
	if (end === -1) return null;
	return { start: 0, end: end + 1, raw: text.slice(0, end + 1) };
}

function readField(fmRaw, name) {
	const m = fmRaw.match(new RegExp(`^${name}:\\s*(.+)$`, 'm'));
	if (!m) return '';
	return m[1].trim().replace(/^['"]|['"]$/g, '');
}

function queryFromTitle(title) {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((w) => w && !STOP.has(w))
		.slice(0, 4)
		.join(' ');
}

async function pexelsSearch(query) {
	const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&orientation=landscape&per_page=15`;
	const res = await fetch(url, { headers: { Authorization: PEXELS_API_KEY, 'User-Agent': 'utahstemcells-bot' } });
	if (!res.ok) throw new Error(`Pexels HTTP ${res.status}`);
	const data = await res.json();
	return data.photos || [];
}

async function downloadToWebp(photo, outPath) {
	const src = photo.src.large2x || photo.src.landscape || photo.src.original;
	const res = await fetch(src, { headers: { 'User-Agent': 'utahstemcells-bot' } });
	if (!res.ok) throw new Error(`Download immagine HTTP ${res.status}`);
	const buf = Buffer.from(await res.arrayBuffer());
	await sharp(buf).resize(W, H, { fit: 'cover', position: 'attention' }).webp({ quality: 82 }).toFile(outPath);
}

function setHeroAndCleanFrontmatter(text, slug) {
	const fm = fmBlock(text);
	if (!fm) return text;
	let lines = fm.raw.split('\n');
	// rimuovi imageQuery
	lines = lines.filter((l) => !/^imageQuery:\s*/.test(l));
	const heroLine = `hero: '/blog-images/${slug}-hero.webp'`;
	const hasHero = lines.some((l) => /^hero:\s*/.test(l));
	if (hasHero) {
		lines = lines.map((l) => (/^hero:\s*/.test(l) ? heroLine : l));
	} else {
		// inserisci prima della riga di chiusura '---'
		lines.splice(lines.length - 1, 0, heroLine);
	}
	return lines.join('\n') + text.slice(fm.end + 1);
}

async function main() {
	if (!PEXELS_API_KEY) { console.error('Manca PEXELS_API_KEY.'); process.exit(1); }
	const files = (await readdir(BLOG_DIR)).filter((f) => /\.md$/.test(f));
	let processed = 0;
	for (const file of files) {
		const slug = file.replace(/\.md$/, '');
		const heroPath = join(IMG_DIR, `${slug}-hero.webp`);
		if (await exists(heroPath)) continue; // già ha l'immagine

		const full = join(BLOG_DIR, file);
		const text = await readFile(full, 'utf8');
		const fm = fmBlock(text);
		if (!fm) continue;
		const title = readField(fm.raw, 'title');
		const query = readField(fm.raw, 'imageQuery') || queryFromTitle(title);
		if (!query) continue;

		try {
			const photos = await pexelsSearch(query);
			if (!photos.length) { console.warn(`[${slug}] Nessuna foto Pexels per "${query}"`); continue; }
			await downloadToWebp(photos[0], heroPath);
			const updated = setHeroAndCleanFrontmatter(text, slug);
			await writeFile(full, updated, 'utf8');
			processed++;
			console.log(`[${slug}] hero impostata da Pexels (query: "${query}", foto di ${photos[0].photographer}).`);
		} catch (e) {
			console.error(`[${slug}] errore immagine: ${e.message}`);
		}
	}
	if (!processed) console.log('Nessun articolo da elaborare (tutti hanno già la hero).');
}

main().catch((e) => { console.error(e.message); process.exit(1); });
