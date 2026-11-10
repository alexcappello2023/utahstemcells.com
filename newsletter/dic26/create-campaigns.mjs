// Crea su Brevo le 4 campagne Nov26 Wellness come BOZZE (nessun scheduledAt => non partono).
// Idempotente: il manifest conserva i campaignId, quindi un secondo lancio aggiorna e non duplica.
// Le liste calde sono escluse perche' ricevono gia' le staminali due volte a settimana.
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(readFileSync(join(HERE, '..', '.env'), 'utf8'))?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');

const SENDER = { id: 1 };
const REPLY_TO = 'info@utahstemcells.com';
const WARM = [13, 12, 6, 7, 11];
const AUDIENCE = { 1: [3], 2: [4], 3: [4, 3], 4: [4, 3] }; // 1 Men, 2 Women, 3-4 entrambe

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

const locked = new Set();
for (const c of (await api('GET', '/emailCampaigns?limit=100')).campaigns || []) {
  if (['sent', 'inProcess', 'suspended'].includes(c.status)) locked.add(c.id);
}

const manifest = JSON.parse(readFileSync(join(HERE, 'manifest-email.json'), 'utf8'));
const out = [];
for (const dem of manifest) {
  const nn = String(dem.n).padStart(2, '0');
  const payload = {
    name: `DEM Nov26 Wellness ${nn} — ${dem.subject}`,
    subject: dem.subject,
    sender: SENDER,
    replyTo: REPLY_TO,
    htmlContent: readFileSync(join(HERE, 'email', `${dem.slug}.html`), 'utf8'),
    type: 'classic',
    inlineImageActivation: false,
    recipients: { listIds: AUDIENCE[dem.n], exclusionListIds: WARM },
  };
  if (dem.campaignId && locked.has(dem.campaignId)) {
    console.log(`saltata     ${nn} id=${dem.campaignId} (gia' inviata o sospesa)`);
    out.push(dem); continue;
  }
  if (dem.campaignId) {
    await api('PUT', `/emailCampaigns/${dem.campaignId}`, payload);
    console.log(`aggiornata  ${nn} id=${dem.campaignId}  ${dem.subject}`);
    out.push(dem);
  } else {
    const r = await api('POST', '/emailCampaigns', payload);
    console.log(`creata      ${nn} id=${r.id}  ${dem.subject}  liste=${AUDIENCE[dem.n]}`);
    out.push({ ...dem, campaignId: r.id });
  }
  writeFileSync(join(HERE, 'manifest-email.json'), JSON.stringify(out.concat(manifest.slice(out.length)), null, 2));
}
writeFileSync(join(HERE, 'manifest-email.json'), JSON.stringify(out, null, 2));
