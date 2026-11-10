// Invii a blocchi giornalieri per Nov26 Wellness (DEM 01 Men, DEM 02 Women).
// Uso:  node chunks.mjs plan | apply | schedule
//   plan      calcola e stampa i blocchi, non tocca Brevo
//   apply     crea le liste-blocco, ci mette i contatti e crea le campagne come BOZZE (senza data)
//   schedule  assegna la data di invio a ogni blocco  -> da lanciare SOLO dopo aver verificato
//             che Brevo accetti davvero l'invio (oggi sospende tutto: piano cancellato)
// Limite giornaliero: variabile d'ambiente DAILY_LIMIT (default 300, valore NON verificato).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const KEY = /^BREVO_API_KEY=(.+)$/m.exec(readFileSync(join(HERE, '..', '.env'), 'utf8'))?.[1].trim();
if (!KEY) throw new Error('BREVO_API_KEY mancante');
const MODE = process.argv[2] || 'plan';

const DAILY_LIMIT = Number(process.env.DAILY_LIMIT || 300);
const CAP = Math.floor((DAILY_LIMIT * 0.85) / 10) * 10; // 15% di margine: 300 -> 250
const WARM = [13, 12, 6, 7, 11];
const START = '2026-11-11';
const SKIP = new Set(['2026-11-26']); // Ringraziamento
const STATE = join(HERE, 'chunks.json');
const DEM = { 1: { slug: '01-mens-wellness', lista: 3, label: 'Men' }, 2: { slug: '02-womens-wellness', lista: 4, label: 'Women' } };

async function api(method, path, body) {
  const res = await fetch(`https://api.brevo.com/v3${path}`, {
    method, headers: { 'api-key': KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} -> ${res.status} ${text}`);
  return text ? JSON.parse(text) : {};
}
// 10:00 a Denver in UTC (MST = UTC-7 dal 1 novembre)
const at = (d) => `${d}T${new Date(`${d}T00:00:00Z`) < new Date('2026-11-01T00:00:00Z') ? '16' : '17'}:00:00.000Z`;

async function allContacts() {
  const out = []; let off = 0;
  for (;;) {
    const d = await api('GET', `/contacts?limit=500&offset=${off}`);
    const cs = d.contacts || [];
    out.push(...cs); off += 500;
    if (!cs.length || off >= d.count) break;
  }
  return out;
}

function buildPlan(contacts, camps) {
  const ok = contacts.filter((c) => !c.emailBlacklisted);
  const has = (c, l) => (c.listIds || []).includes(l);
  const warmSet = new Set(ok.filter((c) => WARM.some((l) => has(c, l))).map((c) => c.id));
  const byId = (a, b) => a.id - b.id;
  const people = {
    1: ok.filter((c) => has(c, DEM[1].lista) && !warmSet.has(c.id)).sort(byId),
    2: ok.filter((c) => has(c, DEM[2].lista) && !warmSet.has(c.id)).sort(byId),
  };
  // giorni in cui partono gia' le staminali al flusso caldo: il tetto e' dell'account, non della singola campagna
  const warmDays = new Set(camps.filter((c) => c.status === 'queued' && c.scheduledAt
    && (c.recipients?.lists || []).some((l) => WARM.includes(l))).map((c) => c.scheduledAt.slice(0, 10)));
  const warmSize = warmSet.size;

  let cursor = new Date(`${START}T12:00:00Z`);
  const nextSlot = () => {
    for (;;) {
      const iso = cursor.toISOString().slice(0, 10), dow = cursor.getUTCDay();
      cursor = new Date(cursor.getTime() + 86400000);
      if (dow < 1 || dow > 5 || SKIP.has(iso)) continue;
      const cap = warmDays.has(iso) ? CAP - warmSize : CAP;
      if (cap > 0) return { date: iso, cap, warm: warmDays.has(iso) };
    }
  };
  const chunks = [];
  for (const k of [1, 2]) {
    let i = 0, n = 0;
    while (i < people[k].length) {
      const s = nextSlot(); const take = Math.min(s.cap, people[k].length - i);
      chunks.push({ dem: k, n: ++n, date: s.date, warm: s.warm, cap: s.cap,
        contactIds: people[k].slice(i, i + take).map((c) => c.id), emails: people[k].slice(i, i + take).map((c) => c.email) });
      i += take;
    }
  }
  return { chunks, warmSize, men: people[1].length, women: people[2].length, warmDays: [...warmDays].sort() };
}

const contacts = await allContacts();
const camps = (await api('GET', '/emailCampaigns?limit=100')).campaigns || [];
const P = buildPlan(contacts, camps);

console.log(`Limite giornaliero ipotizzato: ${DAILY_LIMIT} (NON verificato) -> tetto usato ${CAP}/giorno, ${CAP - P.warmSize} nei giorni con il flusso caldo (${P.warmSize} destinatari)`);
console.log(`Men contattabili (liste calde escluse): ${P.men} | Women: ${P.women} | giorni caldi: ${P.warmDays.join(', ')}`);
console.log('');
for (const c of P.chunks) {
  const d = new Date(`${c.date}T12:00:00Z`);
  console.log(`  DEM ${c.dem} ${DEM[c.dem].label.padEnd(5)} blocco ${String(c.n).padStart(2)}  ${c.date} (${['dom','lun','mar','mer','gio','ven','sab'][d.getUTCDay()]})  ${String(c.emails.length).padStart(3)} destinatari${c.warm ? '  [giorno caldo]' : ''}`);
}
const last = P.chunks[P.chunks.length - 1];
console.log(`\n${P.chunks.length} blocchi, ultimo invio ${last.date}. Totale ${P.chunks.reduce((s, c) => s + c.emails.length, 0)} destinatari.`);

if (MODE === 'plan') process.exit(0);

// ---- apply / schedule ----
const state = existsSync(STATE) ? JSON.parse(readFileSync(STATE, 'utf8')) : { chunks: [] };
const save = () => writeFileSync(STATE, JSON.stringify(state, null, 2));

const wait = (ms) => new Promise((ok) => setTimeout(ok, ms));
if (MODE === 'apply') {
  // FASE A: tutte le liste, con i contatti. Brevo impiega minuti a "vederle" per le campagne.
  for (const c of P.chunks) {
    const key = `${c.dem}-${c.n}`;
    let rec = state.chunks.find((x) => x.key === key);
    if (!rec) { rec = { key, dem: c.dem, n: c.n, date: c.date, size: c.emails.length }; state.chunks.push(rec); }
    if (!rec.listId) {
      const l = await api('POST', '/contacts/lists', { name: `Wellness ${DEM[c.dem].label} ${String(c.n).padStart(2, '0')} · ${c.date}`, folderId: 1 });
      rec.listId = l.id; save();
      for (let i = 0; i < c.emails.length; i += 150) {
        await api('POST', `/contacts/lists/${rec.listId}/contacts/add`, { emails: c.emails.slice(i, i + 150) });
      }
      rec.filled = true; save();
    }
  }
  console.log(`  liste pronte: ${state.chunks.filter((r) => r.filled).length}/${P.chunks.length}`);

  // FASE B: le campagne, come bozze. Tentativi con attesa; l'esclusione delle liste calde
  // e' la prima scelta, ma si rinuncia se Brevo continua a rifiutarla (il blocco ne e' gia' privo).
  for (const c of P.chunks) {
    const rec = state.chunks.find((x) => x.key === `${c.dem}-${c.n}`);
    if (!rec.campaignId) {
      const sub = { 1: 'THE CONVERSATION MOST MEN NEVER HAVE', 2: 'WHAT NOBODY TELLS YOU TO EXPECT' }[c.dem];
      const payload = {
        name: `DEM Nov26 Wellness ${String(c.dem).padStart(2, '0')} · blocco ${String(c.n).padStart(2, '0')} · ${c.date}`,
        subject: sub, sender: { id: 1 }, replyTo: 'info@utahstemcells.com', type: 'classic', inlineImageActivation: false,
        htmlContent: readFileSync(join(HERE, 'email', `${DEM[c.dem].slug}.html`), 'utf8'),
        // niente scheduledAt: resta bozza
      };
      let r = null;
      const attempts = [
        ...Array(4).fill({ listIds: [rec.listId], exclusionListIds: WARM }),
        ...Array(16).fill({ listIds: [rec.listId] }),
      ];
      for (let t = 0; t < attempts.length && !r; t++) {
        try {
          r = await api('POST', '/emailCampaigns', { ...payload, recipients: attempts[t] });
          rec.noExclusion = !attempts[t].exclusionListIds;
        } catch (e) {
          if (!/no contacts associated/.test(String(e))) throw e;
          await wait(15000);
        }
      }
      if (!r) throw new Error(`lista ${rec.listId} ancora "vuota" per Brevo dopo ~5 minuti`);
      rec.campaignId = r.id; save();
    }
    console.log(`  ok  DEM ${c.dem} blocco ${c.n}  lista ${rec.listId}  campagna ${rec.campaignId}  (${c.emails.length})${rec.noExclusion ? '  [senza esclusione]' : ''}`);
  }
}

if (MODE === 'schedule') {
  for (const rec of state.chunks) {
    await api('PUT', `/emailCampaigns/${rec.campaignId}`, { scheduledAt: at(rec.date) });
    console.log(`  programmata  campagna ${rec.campaignId}  ${rec.date} 10:00 Denver`);
  }
}
