// Produce il CSV di riferimento e la tabella HTML da incollare nel tab ott26.
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dems } from './content.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));

// righe: intestazione, poi ogni DEM seguita da una riga vuota (come in Sep26)
const rows = [['Oggetto', 'Body', 'Creative']];
dems.forEach((d, i) => {
  rows.push([d.oggetto, d.body, d.creative]);
  if (i < dems.length - 1) rows.push(['', '', '']);
});

const csvCell = (s) => `"${s.replace(/"/g, '""')}"`;
writeFileSync(join(HERE, 'ott26-piano.csv'), rows.map((r) => r.map(csvCell).join(',')).join('\n'));

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const htmlCell = (s, header) => {
  const v = esc(s).replace(/\n/g, '<br>');
  const style = header
    ? 'font-weight:bold;background:#0a2a4a;color:#ffffff;padding:6px;'
    : 'vertical-align:top;padding:6px;';
  return `<td style="${style}">${v}</td>`;
};
const html = `<meta charset="utf-8"><table>${rows
  .map((r, i) => `<tr>${r.map((c) => htmlCell(c, i === 0)).join('')}</tr>`)
  .join('')}</table>`;
writeFileSync(join(HERE, 'ott26-piano.html'), html);

console.log(`righe: ${rows.length} (1 intestazione + ${dems.length} DEM + ${dems.length - 1} separatori)`);
console.log(`csv : ${join(HERE, 'ott26-piano.csv')}`);
console.log(`html: ${join(HERE, 'ott26-piano.html')}`);
