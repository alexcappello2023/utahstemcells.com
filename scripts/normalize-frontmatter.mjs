// Rete di sicurezza: normalizza il frontmatter dell'articolo appena generato,
// così un piccolo errore dell'AI non rompe il build (autonomia a prova di errore).
// Elabora il file .md del blog PIÙ RECENTE (quello appena scritto):
//   - garantisce title e description (fallback dal titolo/slug)
//   - forza pubDate = oggi (stringa YYYY-MM-DD)
//   - author di default se mancante
//   - rimuove da relatedTreatments/relatedConditions gli slug INESISTENTI
//   - rimuove imageQuery residuo
//   - ri-serializza un frontmatter YAML sempre valido
// Se il frontmatter non è nemmeno parsabile, esce con errore (così si nota).

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
	for (const f of files) {
		const m = (await stat(join(BLOG, f))).mtimeMs;
		if (m > bestM) { bestM = m; best = f; }
	}
	return best;
}

async function main() {
	const file = await newestArticle();
	if (!file) { console.log('Nessun articolo da normalizzare.'); return; }
	const slug = file.replace(/\.md$/, '');
	const full = join(BLOG, file);
	const text = await readFile(full, 'utf8');

	const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
	if (!m) { console.error(`[${slug}] Nessun frontmatter: impossibile normalizzare.`); process.exit(1); }

	let data;
	try { data = yaml.load(m[1]) || {}; }
	catch (e) { console.error(`[${slug}] Frontmatter YAML non parsabile: ${e.message}`); process.exit(1); }
	if (typeof data !== 'object' || Array.isArray(data)) data = {};

	const body = m[2];
	const [treatSlugs, condSlugs] = await Promise.all([slugsIn(TREAT), slugsIn(COND)]);
	const today = new Date().toISOString().slice(0, 10);

	// campi obbligatori + normalizzazioni
	const title = (typeof data.title === 'string' && data.title.trim()) ? data.title.trim() : humanize(slug);
	const metaTitle = (typeof data.metaTitle === 'string' && data.metaTitle.trim()) ? data.metaTitle.trim() : `${title} | Utah Stem Cells`;
	let description = (typeof data.description === 'string' && data.description.trim()) ? data.description.trim() : `${title} — physician-led regenerative medicine in Sandy, UT.`;
	if (description.length > 300) description = description.slice(0, 297).trimEnd() + '…';
	const author = (typeof data.author === 'string' && data.author.trim()) ? data.author.trim() : 'Dr. William Cimikoski';
	const hero = typeof data.hero === 'string' ? data.hero : undefined;

	const clean = (arr, valid) => Array.isArray(arr)
		? [...new Set(arr.map(String).map((s) => s.trim()).filter((s) => valid.has(s)))]
		: [];
	const relatedTreatments = clean(data.relatedTreatments, treatSlugs);
	const relatedConditions = clean(data.relatedConditions, condSlugs);

	const out = { title, metaTitle, description, pubDate: today, author };
	if (hero) out.hero = hero;
	if (relatedTreatments.length) out.relatedTreatments = relatedTreatments;
	if (relatedConditions.length) out.relatedConditions = relatedConditions;

	const fm = yaml.dump(out, { lineWidth: -1, quotingType: '"', forceQuotes: true }).trimEnd();
	await writeFile(full, `---\n${fm}\n---\n\n${body.replace(/^\n+/, '')}`, 'utf8');
	console.log(`[${slug}] frontmatter normalizzato (pubDate=${today}, related tr:${relatedTreatments.length} co:${relatedConditions.length}).`);
}

main().catch((e) => { console.error(e.message); process.exit(1); });
