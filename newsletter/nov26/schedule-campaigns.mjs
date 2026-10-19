// Programma i due flussi Nov26. Orari = 10:00 America/Denver.
// W: settimanale il lunedi', pausa nelle due settimane di festivita'.
// B: ogni due lunedi'.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(readFileSync(join(HERE, '..', '.env'), 'utf8'))?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');

// 10:00 a Denver espresse in UTC: MDT fino al 1 novembre (UTC-6), poi MST (UTC-7)
const at = (d) => {
  const mdt = new Date(`${d}T00:00:00Z`) < new Date('2026-11-01T00:00:00Z');
  return `${d}T${mdt ? '16' : '17'}:00:00.000Z`;
};

const WAVE = [
  // flusso caldo: 120 destinatari
  { id: 23, d: '2026-10-19', t: 'W01' }, { id: 25, d: '2026-10-26', t: 'W02' },
  { id: 26, d: '2026-11-02', t: 'W03' }, { id: 28, d: '2026-11-09', t: 'W04' },
  { id: 29, d: '2026-11-16', t: 'W05' }, { id: 30, d: '2026-11-23', t: 'W06' },
  { id: 31, d: '2026-11-30', t: 'W07' }, { id: 33, d: '2026-12-07', t: 'W08' },
  { id: 34, d: '2026-12-14', t: 'W09' }, { id: 35, d: '2027-01-04', t: 'W10' },
  { id: 37, d: '2027-01-11', t: 'W11' }, { id: 38, d: '2027-01-18', t: 'W12' },
  // flusso grande: 3.445 destinatari
  { id: 24, d: '2026-10-19', t: 'B01' }, { id: 27, d: '2026-11-02', t: 'B03' },
  { id: 32, d: '2026-11-16', t: 'B07' }, { id: 36, d: '2026-11-30', t: 'B10' },
  { id: 39, d: '2026-12-14', t: 'B12' },
];

async function api(method, path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method,
    headers: { 'api-key': KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}

// prima i due di oggi, che hanno pochi minuti di margine
for (const c of [...WAVE].sort((a, b) => a.d.localeCompare(b.d))) {
  await api('PUT', `/emailCampaigns/${c.id}`, { scheduledAt: at(c.d) });
  console.log(`${c.t}  id=${String(c.id).padStart(2)}  ${c.d} 10:00 Denver  (${at(c.d)})`);
}
