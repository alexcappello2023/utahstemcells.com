// Crea/aggiorna su Brevo i 6 template DEM come INATTIVI.
// Uso: node newsletter/scripts/push-to-brevo.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', 'sett26');

// chiave dal .env locale (mai loggata)
const env = readFileSync(join(HERE, '..', '.env'), 'utf8');
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(env)?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante in newsletter/.env');

const SENDER_ID = 1; // "Utah Stem Cells" <info@utahstemcells.com> — verificato
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
    templateName: `DEM Sep26 — ${String(dem.n).padStart(2, '0')} — ${dem.subject}`,
    subject: dem.subject,
    sender: { id: SENDER_ID },
    replyTo: REPLY_TO,
    htmlContent,
    isActive: false, // mai attivi: revisione prima dell'invio
    tag: 'dem-sep26',
  };

  if (dem.templateId) {
    await api('PUT', `/smtp/templates/${dem.templateId}`, payload);
    out.push({ ...dem, action: 'aggiornato' });
    console.log(`aggiornato  id=${dem.templateId}  ${dem.subject}`);
  } else {
    const r = await api('POST', '/smtp/templates', payload);
    out.push({ ...dem, templateId: r.id, action: 'creato' });
    console.log(`creato      id=${r.id}  ${dem.subject}`);
  }
}

writeFileSync(join(ROOT, 'manifest.json'), JSON.stringify(out, null, 2));
