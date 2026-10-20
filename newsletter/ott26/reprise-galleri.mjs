// Riprende la sequenza Galleri con l'offerta promozionale.
// 19, 20, 22 sono bozze riutilizzabili; la 21 e' sospesa e Brevo non la riporta a draft:
// va ricreata da zero.
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(readFileSync(join(HERE, '..', '.env'), 'utf8'))?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');

const SENDER = { id: 1 };
const REPLY_TO = 'info@utahstemcells.com';
const BIG = [4, 3];
const WARM = [13, 12, 6, 7, 11];   // escluse: ricevono gia' due staminali a settimana

// 10:00 America/Denver -> UTC. MST (UTC-7) dal 1 novembre.
const at = (d) => `${d}T${new Date(`${d}T00:00:00Z`) < new Date('2026-11-01T00:00:00Z') ? '16' : '17'}:00:00.000Z`;

const PLAN = [
  { n: 3, id: 19, slug: '03-cancers-nobody-screens-for', subject: 'THE CANCERS NOBODY SCREENS FOR', cta: 'See what Galleri looks for', d: '2026-10-26' },
  { n: 4, id: 20, slug: '04-what-your-result-means', subject: 'WHAT YOUR RESULT ACTUALLY MEANS', cta: 'See what each result means', d: '2026-11-09' },
  { n: 5, id: null, slug: '05-is-this-test-right-for-you', subject: 'IS THE GALLERI TEST RIGHT FOR YOU?', cta: 'See if it applies to you', d: '2026-11-23' },
  { n: 6, id: 22, slug: '06-how-it-works-here', subject: 'HOW THE GALLERI TEST WORKS HERE', cta: 'See how the test works here', d: '2026-12-07' },
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

for (const p of PLAN) {
  const payload = {
    name: `DEM Ott26 Galleri — ${String(p.n).padStart(2, '0')} — ${p.subject}`,
    subject: p.subject,
    sender: SENDER,
    replyTo: REPLY_TO,
    htmlContent: readFileSync(join(HERE, 'email', `${p.slug}.html`), 'utf8'),
    type: 'classic',
    inlineImageActivation: false,
    recipients: { listIds: BIG, exclusionListIds: WARM },
    scheduledAt: at(p.d),
  };
  if (p.id) {
    await api('PUT', `/emailCampaigns/${p.id}`, payload);
    console.log(`aggiornata e programmata  id=${p.id}  ${p.d}  ${p.subject.slice(0, 38)}`);
  } else {
    const r = await api('POST', '/emailCampaigns', payload);
    console.log(`ricreata e programmata    id=${r.id}  ${p.d}  ${p.subject.slice(0, 38)}  (sostituisce la 21 sospesa)`);
  }
}
