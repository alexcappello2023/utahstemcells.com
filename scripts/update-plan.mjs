// Rigenera PIANO-EDITORIALE.md a partire dai topic (CSV) e dagli articoli esistenti.
// - "Pubblicati" = tutti gli articoli in src/content/blog (titolo + data dal frontmatter)
// - "In coda"    = topic del CSV che NON hanno ancora un articolo (slug non presente)
// Idempotente: uno stesso topic è "fatto" quando esiste il file <slug>.md.

import { readFile, readdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CSV = join(ROOT, 'keywords/keyword-utahstemcells.csv');
const BLOG = join(ROOT, 'src/content/blog');
const OUT = join(ROOT, 'PIANO-EDITORIALE.md');

export function slugify(str) {
	return str
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/['’]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function parseCSV(text) {
	const rows = [];
	let row = [], field = '', q = false;
	for (let i = 0; i < text.length; i++) {
		const c = text[i];
		if (q) {
			if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
			else if (c === '"') q = false;
			else field += c;
		} else if (c === '"') q = true;
		else if (c === ',') { row.push(field); field = ''; }
		else if (c === '\n' || c === '\r') {
			if (c === '\r' && text[i + 1] === '\n') i++;
			if (field !== '' || row.length) { row.push(field); rows.push(row); row = []; field = ''; }
		} else field += c;
	}
	if (field !== '' || row.length) { row.push(field); rows.push(row); }
	return rows;
}

function fm(md, key) {
	const m = md.match(new RegExp(`^${key}:\\s*['"]?(.+?)['"]?\\s*$`, 'm'));
	return m ? m[1].trim() : '';
}

async function main() {
	// articoli pubblicati
	let files = [];
	try { files = (await readdir(BLOG)).filter((f) => /\.(md|mdx)$/.test(f)); } catch {}
	const published = [];
	const doneSlugs = new Set();
	for (const f of files) {
		const slug = f.replace(/\.(md|mdx)$/, '');
		doneSlugs.add(slug);
		const md = await readFile(join(BLOG, f), 'utf8');
		published.push({ slug, title: fm(md, 'title') || slug, date: fm(md, 'pubDate') });
	}
	published.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

	// topic in coda (CSV, non ancora pubblicati)
	let planned = [];
	try {
		const rows = parseCSV((await readFile(CSV, 'utf8')).trim());
		const header = rows[0].map((h) => h.trim().toLowerCase());
		const iK = header.indexOf('keyword'), iC = header.indexOf('categoria'), iP = header.indexOf('priorita');
		planned = rows.slice(1)
			.filter((r) => r[iK] && r[iK].trim() && !doneSlugs.has(slugify(r[iK])))
			.map((r) => ({ keyword: r[iK].trim(), categoria: (r[iC] || '').trim(), priorita: Number(r[iP] || 9999) }))
			.sort((a, b) => a.priorita - b.priorita);
	} catch {}

	const esc = (s) => (s || '').replace(/\|/g, '\\|');
	let out = `# Piano editoriale — Utah Stem Cells\n\n`;
	out += `_File generato automaticamente ad ogni pubblicazione — non modificare a mano._\n`;
	out += `Ritmo: **4 articoli/mese**. Quando la coda si esaurisce, il sistema **genera nuovi topic da solo** (in base al mercato e ai volumi di ricerca, con focus sulle cellule staminali).\n\n`;
	out += `**Pubblicati: ${published.length}** · **In coda: ${planned.length}**`;
	if (planned[0]) out += ` · Prossimo: _${esc(planned[0].keyword)}_`;
	out += `\n\n## ✅ Pubblicati\n\n| Data | Titolo | URL |\n|---|---|---|\n`;
	for (const p of published) out += `| ${p.date || '—'} | ${esc(p.title)} | \`/${p.slug}/\` |\n`;
	out += `\n## 📝 In coda (prossimi topic)\n\n| # | Titolo | Categoria |\n|---|---|---|\n`;
	planned.forEach((t, i) => { out += `| ${i + 1} | ${esc(t.keyword)} | ${esc(t.categoria)} |\n`; });
	out += `\n`;

	await writeFile(OUT, out);
	console.log(`Piano editoriale aggiornato: ${published.length} pubblicati, ${planned.length} in coda.`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
