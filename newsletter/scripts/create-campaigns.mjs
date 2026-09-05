// Crea su Brevo le 6 DEM come CAMPAGNE IN BOZZA (Campaigns -> Email).
// Nessun scheduledAt e nessuna lista => restano bozze, non possono partire.
// Uso: node newsletter/scripts/create-campaigns.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', 'sett26');

const env = readFileSync(join(HERE, '..', '.env'), 'utf8');
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(env)?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante in newsletter/.env');

const SENDER = { id: 1 }; // "Utah Stem Cells" <info@utahstemcells.com> — verificato
const REPLY_TO = 'info@utahstemcells.com';

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

const manifest = JSON.parse(readFileSync(join(ROOT, 'manifest.json'), 'utf8'));
const out = [];

for (const dem of manifest) {
  const htmlContent = readFileSync(join(ROOT, 'html', `${dem.slug}.html`), 'utf8');
  const payload = {
    name: `DEM Sep26 — ${String(dem.n).padStart(2, '0')} — ${dem.subject}`,
    subject: dem.subject,
    sender: SENDER,
    replyTo: REPLY_TO,
    htmlContent,
    type: 'classic',
    inlineImageActivation: false,
    // niente scheduledAt e niente recipients: la campagna resta in bozza
  };

  if (dem.campaignId) {
    await api('PUT', `/emailCampaigns/${dem.campaignId}`, payload);
    out.push({ ...dem, action: 'campagna aggiornata' });
    console.log(`aggiornata  campaignId=${dem.campaignId}  ${dem.subject}`);
  } else {
    const r = await api('POST', '/emailCampaigns', payload);
    out.push({ ...dem, campaignId: r.id, action: 'campagna creata' });
    console.log(`creata      campaignId=${r.id}  ${dem.subject}`);
  }
}

writeFileSync(join(ROOT, 'manifest.json'), JSON.stringify(out, null, 2));
