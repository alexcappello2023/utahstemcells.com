// Crea su Brevo le campagne Nov26 come BOZZE (niente scheduledAt => non partono).
// Due flussi:
//   W = tutte e 12 alle liste calde (13,12,6,7,11)
//   B = le 5 piu' autonome a Women+Men, escludendo le liste calde per non scrivere due volte
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(readFileSync(join(HERE, '..', '.env'), 'utf8'))?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');

const SENDER = { id: 1 };
const REPLY_TO = 'info@utahstemcells.com';
const WARM = [13, 12, 6, 7, 11];
const BIG = [4, 3];
const BIG_PICKS = [1, 3, 7, 10, 12]; // le piu' autonome per un pubblico freddo

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

const sent = new Set();
for (const c of (await api('GET', '/emailCampaigns?limit=100')).campaigns || []) {
  if (c.status === 'sent') sent.add(c.id);
}

const manifest = JSON.parse(readFileSync(join(HERE, 'manifest-email.json'), 'utf8'));
const out = [];

for (const dem of manifest) {
  const htmlContent = readFileSync(join(HERE, 'email', `${dem.slug}.html`), 'utf8');
  const nn = String(dem.n).padStart(2, '0');
  const streams = [{ k: 'warmId', tag: 'W', lists: WARM, excl: [] }];
  if (BIG_PICKS.includes(dem.n)) streams.push({ k: 'bigId', tag: 'B', lists: BIG, excl: WARM });

  const rec = { ...dem };
  for (const st of streams) {
    const payload = {
      name: `DEM Nov26 ${st.tag}${nn} — ${dem.subject}`,
      subject: dem.subject,
      sender: SENDER,
      replyTo: REPLY_TO,
      htmlContent,
      type: 'classic',
      inlineImageActivation: false,
      recipients: { listIds: st.lists, ...(st.excl.length ? { exclusionListIds: st.excl } : {}) },
      // niente scheduledAt: restano bozze
    };
    const id = dem[st.k];
    if (id && sent.has(id)) { console.log(`saltata     ${st.tag}${nn} id=${id} già inviata`); continue; }
    if (id) {
      await api('PUT', `/emailCampaigns/${id}`, payload);
      console.log(`aggiornata  ${st.tag}${nn} id=${id}`);
    } else {
      const r = await api('POST', '/emailCampaigns', payload);
      rec[st.k] = r.id;
      console.log(`creata      ${st.tag}${nn} id=${r.id}  ${dem.subject.slice(0, 44)}`);
    }
  }
  out.push(rec);
}

writeFileSync(join(HERE, 'manifest-email.json'), JSON.stringify(out, null, 2));
