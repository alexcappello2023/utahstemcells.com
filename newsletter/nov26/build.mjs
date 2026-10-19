// Produce il CSV di riferimento e la tabella HTML da incollare nel tab nov26.
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dems } from './content.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const rows = [['Oggetto', 'Body', 'Creative']];
dems.forEach((d, i) => {
  rows.push([d.oggetto, d.body, d.creative]);
  if (i < dems.length - 1) rows.push(['', '', '']);
});

const csvCell = (s) => `"${s.replace(/"/g, '""')}"`;
writeFileSync(join(HERE, 'nov26-piano.csv'), rows.map((r) => r.map(csvCell).join(',')).join('\n'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const cell = (s, header, sep) => {
  const v = esc(s).replace(/\n/g, '<br>');
  const style = header
    ? 'font-weight:bold;background:#0a2a4a;color:#ffffff;padding:6px;'
    : sep ? 'background:#a4c2f4;padding:6px;' : 'vertical-align:top;padding:6px;';
  return `<td style="${style}">${v || '&nbsp;'}</td>`;
};
const html = `<meta charset="utf-8"><table>${rows
  .map((r, i) => `<tr>${r.map((c) => cell(c, i === 0, i > 0 && !r[0])).join('')}</tr>`)
  .join('')}</table>`;
writeFileSync(join(HERE, 'nov26-piano.html'), html);
console.log(`righe: ${rows.length} (1 intestazione + ${dems.length} DEM + ${dems.length - 1} separatori)`);
