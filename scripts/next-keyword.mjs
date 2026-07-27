// Individua il prossimo argomento/keyword da trasformare in articolo del blog.
//
// Fonte (in ordine di precedenza):
//   1) variabile d'ambiente GSHEET_CSV_URL  -> Google Sheet pubblicato come CSV
//   2) file locale keywords/keyword-utahstemcells.csv
//
// Lo "stato" (fatto/da fare) NON è scritto sul foglio: una keyword è
// considerata "fatta" se esiste già il relativo file .md in src/content/blog/.
// Così la routine è idempotente e non richiede permessi di scrittura sul foglio.
//
// Uso:  node scripts/next-keyword.mjs
// Stampa un JSON con la prossima keyword, oppure {"done": true} se finite.

import 'dotenv/config';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BLOG_DIR = join(ROOT, 'src/content/blog');
const LOCAL_CSV = join(ROOT, 'keywords/keyword-utahstemcells.csv');

export function slugify(str) {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// Parser CSV minimale che gestisce le virgolette
function parseCSV(text) {
	const rows = [];
	let row = [];
	let field = '';
	let inQuotes = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (inQuotes) {
			if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
			else if (c === '"') inQuotes = false;
			else field += c;
		} else if (c === '"') inQuotes = true;
		else if (c === ',') { row.push(field); field = ''; }
		else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = ''; }
		} else field += c;
	}
	if (field !== '' || row.length) { row.push(field); rows.push(row); }
	return rows;
}

async function loadKeywords() {
	let text;
	const url = process.env.GSHEET_CSV_URL;
	if (url) {
		const res = await fetch(url);
		if (!res.ok) throw new Error(`Impossibile leggere il Google Sheet: HTTP ${res.status}`);
		text = await res.text();
	} else {
		text = await readFile(LOCAL_CSV, 'utf8');
	}
	const rows = parseCSV(text.trim());
	if (!rows.length) return [];

	const first = rows[0].map((h) => h.trim().toLowerCase());
	const hasHeader = first.includes('keyword');
	const header = hasHeader ? first : [];
	const dataRows = hasHeader ? rows.slice(1) : rows;

	const col = (name) => header.indexOf(name);
	const iKw = hasHeader && col('keyword') >= 0 ? col('keyword') : 0;
	const iArg = col('argomento');
	const iCat = col('categoria');
	const iPri = col('priorita');

	return dataRows
		.filter((r) => r[iKw] && r[iKw].trim())
		.map((r, idx) => ({
			keyword: r[iKw].trim(),
			argomento: iArg >= 0 ? (r[iArg] || '').trim() : '',
			categoria: iCat >= 0 ? (r[iCat] || '').trim() : 'Regenerative medicine',
			priorita: iPri >= 0 ? Number(r[iPri] || 9999) : idx,
		}))
		.sort((a, b) => a.priorita - b.priorita);
}

async function existingSlugs() {
	try {
		const files = await readdir(BLOG_DIR);
		return new Set(files.filter((f) => /\.(md|mdx)$/.test(f)).map((f) => f.replace(/\.(md|mdx)$/, '')));
	} catch {
		return new Set();
	}
}

async function main() {
	const [keywords, done] = await Promise.all([loadKeywords(), existingSlugs()]);
	const next = keywords.find((k) => !done.has(slugify(k.keyword)));
	if (!next) {
		console.log(JSON.stringify({ done: true, total: keywords.length }, null, 2));
		return;
	}
	console.log(
		JSON.stringify(
			{
				...next,
				slug: slugify(next.keyword),
				file: `src/content/blog/${slugify(next.keyword)}.md`,
				remaining: keywords.filter((k) => !done.has(slugify(k.keyword))).length,
			},
			null,
			2,
		),
	);
}

main().catch((e) => {
	console.error(e.message);
	process.exit(1);
});
