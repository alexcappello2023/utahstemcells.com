// Stampa quanti topic del CSV NON hanno ancora un articolo (coda residua).
// Usato dalla GitHub Action per decidere se rifornire i topic (auto-replenish).
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CSV = join(ROOT, 'keywords/keyword-utahstemcells.csv');
const BLOG = join(ROOT, 'src/content/blog');

const slugify = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function parseCSV(text) {
	const rows = []; let row = [], field = '', q = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (q) { if (c === '"' && text[i + 1] === '"') { field += '"'; i++; } else if (c === '"') q = false; else field += c; }
		else if (c === '"') q = true;
		else if (c === ',') { row.push(field); field = ''; }
		else if (c === '\n' || c === '\r') { if (c === '\r' && text[i + 1] === '\n') i++; if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = ''; } }
		else field += c;
	}
	if (field !== '' || row.length) { row.push(field); rows.push(row); }
	return rows;
}

let done = new Set();
try { done = new Set((await readdir(BLOG)).filter((f) => /\.(md|mdx)$/.test(f)).map((f) => f.replace(/\.(md|mdx)$/, ''))); } catch {}
let remaining = 0;
try {
	const rows = parseCSV((await readFile(CSV, 'utf8')).trim());
	const iK = rows[0].map((h) => h.trim().toLowerCase()).indexOf('keyword');
	remaining = rows.slice(1).filter((r) => r[iK] && r[iK].trim() && !done.has(slugify(r[iK]))).length;
} catch {}
console.log(String(remaining));
