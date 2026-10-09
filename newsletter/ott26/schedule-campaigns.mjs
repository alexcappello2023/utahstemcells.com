// Assegna liste e data di invio alle 3 campagne della prima ondata ott26.
// Liste: 4 (Women - july 26) + 3 (Men - july 26). Orari = 10:00 America/Denver.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const env = readFileSync(join(HERE, '..', '.env'), 'utf8');
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(env)?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');

const LISTS = [4, 3];
const WAVE = [
  { campaignId: 17, at: '2026-10-09T16:00:00.000Z', label: '01 — ONE BLOOD DRAW' },
  { campaignId: 18, at: '2026-10-16T16:00:00.000Z', label: '02 — IN ADDITION. NEVER INSTEAD' },
  { campaignId: 21, at: '2026-10-23T16:00:00.000Z', label: '05 — IS THIS TEST RIGHT FOR YOU?' },
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

for (const c of WAVE) {
  await api('PUT', `/emailCampaigns/${c.campaignId}`, {
    recipients: { listIds: LISTS },
    scheduledAt: c.at,
  });
  console.log(`programmata  id=${c.campaignId}  ${c.at}  ${c.label}`);
}
