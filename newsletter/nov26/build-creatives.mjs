// Genera i 12 HTML delle creatività Nov26. Render: Chrome headless 1536x1024.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));

const DISC = 'Stem cell therapy is not an FDA-approved treatment for any specific disease, and individual results vary. The cells used are from ethically donated umbilical cord and amniotic tissue, combined with PRP from your own blood &mdash; they are not harvested from your body. Whether treatment is appropriate for you is decided by the physician after an individual evaluation.';

const CSS = `
:root{--navy:#0a2a4a;--navy-deep:#061d35;--card:#102f4f;--blue:#4fa8e8;--teal:#1f7e8c;--ink:#cfe0ee;--dim:#8ba7bf}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1536px;height:1024px;overflow:hidden}
body{font-family:'Archivo','Helvetica Neue',Arial,sans-serif;position:relative;background:var(--navy)}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:linear-gradient(100deg,var(--navy) 0%,var(--navy) 25%,rgba(10,42,74,.95) 33%,rgba(10,42,74,.62) 43%,rgba(10,42,74,.22) 52%,rgba(10,42,74,0) 60%)}
.content{position:absolute;left:84px;top:70px;width:748px}
.logo{width:262px;display:block;margin-bottom:40px}
h1{font-size:62px;line-height:.99;font-weight:800;letter-spacing:-1.4px;color:#fff;text-transform:uppercase}
h1 .accent{color:var(--blue);display:block}
.sub{margin-top:20px;font-size:21px;line-height:1.45;color:var(--ink);max-width:620px}
.rule{width:92px;height:3px;background:var(--blue);margin:26px 0 24px;border-radius:2px}
.cta{display:inline-block;margin-top:28px;background:var(--teal);color:#fff;font-size:21px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:19px 42px;border-radius:7px;text-decoration:none}
.isi{position:absolute;left:0;right:0;bottom:0;padding:15px 84px;background:linear-gradient(to right,var(--navy-deep) 0%,var(--navy-deep) 62%,rgba(6,29,53,.9) 100%);font-size:13px;line-height:1.5;color:var(--dim)}
/* schede cifra */
.figs{display:flex;flex-direction:column;gap:13px;max-width:620px}
.fig{display:flex;align-items:center;justify-content:space-between;gap:20px;background:rgba(16,47,79,.86);border:1px solid rgba(79,168,232,.3);border-radius:10px;padding:16px 24px}
.fig .l{font-size:15px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:var(--blue)}
.fig .v{font-size:40px;font-weight:800;color:#fff;line-height:1;white-space:nowrap}
.fig.alt .v{color:var(--blue)}
/* timeline */
.tl{display:flex;align-items:flex-end;gap:0;margin-top:10px}
.tl .step{flex:1;text-align:center;position:relative}
.tl .step:before{content:'';position:absolute;top:26px;left:0;right:0;height:2px;background:rgba(139,167,191,.35)}
.tl .step:first-child:before{left:50%}
.tl .step:last-child:before{right:50%}
.tl .bub{position:relative;display:inline-block;background:var(--navy);border:2px solid var(--blue);border-radius:30px;padding:9px 14px;font-size:19px;font-weight:800;color:#fff}
.tl .step.first .bub{background:var(--blue);color:var(--navy);font-size:21px}
.tl .cap{margin-top:12px;font-size:13px;letter-spacing:1.2px;text-transform:uppercase;color:var(--dim)}
/* riga icone zone */
.zones{display:flex;gap:12px;max-width:650px}
.zone{flex:1;background:rgba(16,47,79,.86);border:1px solid rgba(79,168,232,.3);border-radius:10px;padding:16px 10px;text-align:center}
.zone .n{font-size:15px;font-weight:700;color:#fff;letter-spacing:.4px}
.zone .p{margin-top:7px;font-size:21px;font-weight:800;color:var(--blue)}
/* mock browser */
.mock{max-width:660px;background:#fff;border-radius:11px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,.35)}
.mock .bar{background:#e9eef3;padding:11px 14px;display:flex;gap:7px;align-items:center}
.mock .bar i{width:11px;height:11px;border-radius:50%;background:#c6d0da;display:block}
.mock .bar .url{margin-left:12px;background:#fff;border-radius:20px;padding:5px 15px;font-size:13px;color:#6b7c8c;font-family:Arial,sans-serif}
.mock .body{padding:24px 28px 26px}
.mock h3{font-size:22px;color:var(--navy);margin-bottom:14px}
.mock p{font-size:17px;line-height:1.6;color:#333}
.mock b{color:var(--navy)}
/* due cifre giganti */
.duo{display:flex;gap:22px;max-width:680px}
.duo>div{flex:1;background:rgba(16,47,79,.86);border:1px solid rgba(79,168,232,.3);border-radius:12px;padding:26px 22px;text-align:center}
.duo .v{font-size:58px;font-weight:800;line-height:1;color:#fff}
.duo>div:last-child .v{color:var(--blue)}
.duo .c{margin-top:12px;font-size:14px;letter-spacing:1.3px;text-transform:uppercase;color:var(--ink);line-height:1.4}
/* scheda singola */
.note{max-width:620px;background:rgba(16,47,79,.86);border-left:4px solid var(--blue);border-radius:10px;padding:20px 24px;font-size:20px;line-height:1.45;color:#fff;font-weight:600}
.note b{color:var(--blue)}
/* elenco negativo */
.nos{list-style:none;max-width:620px}
.nos li{display:flex;align-items:center;gap:15px;margin-bottom:15px;font-size:21px;color:#fff;font-weight:600}
.nos .x{flex:0 0 auto;width:28px;height:28px;border-radius:50%;border:1.5px solid var(--blue);background:rgba(79,168,232,.16);display:flex;align-items:center;justify-content:center}
.nos .x svg{width:14px;height:14px}
/* due elementi etichettati */
.pairs{display:flex;gap:18px;max-width:680px}
.pairs>div{flex:1;background:rgba(16,47,79,.86);border:1px solid rgba(79,168,232,.3);border-radius:11px;padding:22px}
.pairs .t{font-size:14px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue);margin-bottom:10px}
.pairs .b{font-size:18px;line-height:1.45;color:#fff;font-weight:500}
/* telefono grande */
.tel{font-size:50px;font-weight:800;color:#fff;letter-spacing:-1px}
.tel span{display:block;font-size:14px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--blue);margin-bottom:9px}
/* passi */
.steps{list-style:none}
.steps li{display:flex;align-items:flex-start;gap:16px;margin-bottom:14px;max-width:620px}
.num{flex:0 0 auto;width:32px;height:32px;border-radius:50%;background:var(--blue);color:var(--navy);font-size:16px;font-weight:800;display:flex;align-items:center;justify-content:center}
.steps .txt{font-size:18px;line-height:1.38;color:#fff;font-weight:600;padding-top:3px}
.doc{display:flex;align-items:center;gap:17px;margin-top:22px;max-width:620px}
.doc img{width:84px;height:84px;border-radius:12px;object-fit:cover;object-position:50% 18%;border:2px solid rgba(79,168,232,.45)}
.doc .d1{font-size:18px;font-weight:700;color:#fff}
.doc .d2{font-size:15px;color:var(--ink);line-height:1.4;margin-top:3px}
/* pannello foto reale a destra */
.sphoto{position:absolute;right:0;top:0;width:704px;height:1024px;object-fit:cover;object-position:50% 40%}
.sscrim{position:absolute;inset:0;background:linear-gradient(97deg,var(--navy) 0%,var(--navy) 51%,rgba(10,42,74,.94) 56%,rgba(10,42,74,.52) 63%,rgba(10,42,74,.14) 71%,rgba(10,42,74,0) 79%)}
`;

const page = (title, body, extra = '') => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<title>${title}</title><style>${CSS}${extra}</style></head>
<body>
${body}
<div class="isi">${DISC}</div>
</body></html>`;

const logo = `<img class="logo" src="logo.svg">`;
const h1 = (a, b) => `<h1>${a}<span class="accent">${b}</span></h1>`;
const cta = (t) => `<a class="cta" href="#">${t}</a>`;
const cross = `<span class="x"><svg viewBox="0 0 16 16" fill="none" stroke="#4fa8e8" stroke-width="2.6" stroke-linecap="round"><path d="M4 4l8 8M12 4l-8 8"/></svg></span>`;

// con fotografia generata
const photo = ({ bg, pos = '78% 50%', head, accent, sub, block, label, extra }) => page(head, `
  <img class="photo" src="creative-src/${bg}" style="object-position:${pos}">
  <div class="scrim"></div>
  <div class="content">
    ${logo}${h1(head, accent)}
    ${sub ? `<p class="sub">${sub}</p>` : ''}
    <div class="rule"></div>
    ${block}
    ${cta(label)}
  </div>`, extra);

// solo tipografia, fondo navy
const typo = ({ head, accent, sub, block, label, extra, width = 1368, top = 150 }) => page(head, `
  <div class="content" style="width:${width}px;top:${top}px">
    ${logo}${h1(head, accent)}
    ${sub ? `<p class="sub" style="max-width:820px">${sub}</p>` : ''}
    <div class="rule"></div>
    ${block}
    ${cta(label)}
  </div>`, extra);

// pannello con foto reale della clinica a destra
const clinic = ({ head, accent, sub, block, label, extra }) => page(head, `
  <img class="sphoto" src="assets/clinic-reception.jpg">
  <div class="sscrim"></div>
  <div class="content" style="width:700px">
    ${logo}${h1(head, accent)}
    ${sub ? `<p class="sub">${sub}</p>` : ''}
    <div class="rule"></div>
    ${block}
    ${cta(label)}
  </div>`, extra);

const creatives = {
  '01': photo({
    bg: '01-bg.png', pos: '80% 50%',
    head: '$6,000 once.', accent: '$2,200 every time after.',
    sub: 'The whole price list, in two numbers.',
    block: `<div class="figs">
      <div class="fig"><span class="l">First treatment</span><span class="v">$6,000</span></div>
      <div class="fig alt"><span class="l">Every treatment after</span><span class="v">$2,200</span></div>
    </div>`,
    label: 'See the full pricing',
    extra: `h1{font-size:56px}`,
  }),

  '02': typo({
    head: 'The second costs', accent: 'the same as the tenth.',
    sub: 'After the first treatment, the price does not go back up &mdash; and there is no point at which it stops applying.',
    block: `<div class="tl" style="max-width:1180px">
      ${[['$6,000', 'First'], ['$2,200', 'Second'], ['$2,200', 'Third'], ['$2,200', 'Fourth'], ['$2,200', 'And after']]
        .map(([v, c], i) => `<div class="step${i === 0 ? ' first' : ''}"><span class="bub">${v}</span><div class="cap">${c}</div></div>`).join('')}
    </div>`,
    label: 'Read how it works',
    extra: `h1{font-size:66px}.tl{margin-top:24px}
      .tl .bub{padding:13px 20px;font-size:24px}.tl .step.first .bub{font-size:26px}
      .tl .step:before{top:32px}.tl .cap{margin-top:16px;font-size:15px}.cta{margin-top:46px}`,
  }),

  '03': photo({
    bg: '03-bg.png', pos: '76% 50%',
    head: 'A different joint.', accent: 'The same price.',
    sub: 'The $2,200 is not tied to the area we treated first. It applies anywhere.',
    block: `<div class="zones">
      ${['Knee', 'Shoulder', 'Hip', 'Back'].map((z) => `<div class="zone"><div class="n">${z}</div><div class="p">$2,200</div></div>`).join('')}
    </div>`,
    label: 'See what it means for you',
  }),

  '04': typo({
    head: 'Our prices are', accent: 'on our website.',
    sub: 'No call required. No form first. You can read them before you speak to anyone.',
    block: `<div class="mock">
      <div class="bar"><i></i><i></i><i></i><span class="url">utahstemcells.com/stem-cell-joint-regeneration</span></div>
      <div class="body">
        <h3>Straightforward pricing</h3>
        <p>Your first treatment is <b>$6,000</b>. Every treatment after that is <b>$2,200</b> &mdash; and that applies whether you come back for the same area or want a different area of the body treated.</p>
      </div>
    </div>`,
    label: 'Read the pricing',
    width: 900, top: 136,
    extra: `h1{font-size:64px}.mock{max-width:840px}.mock h3{font-size:27px;margin-bottom:17px}
      .mock p{font-size:20px}.mock .body{padding:30px 34px 32px}.cta{margin-top:38px}`,
  }),

  '05': typo({
    head: 'Two numbers.', accent: 'That is the whole price list.',
    sub: 'No packages bought upfront. No membership tiers. Nothing that expires.',
    block: `<div class="duo">
      <div><div class="v">$6,000</div><div class="c">Your first<br>treatment</div></div>
      <div><div class="v">$2,200</div><div class="c">Every treatment after,<br>any area of the body</div></div>
    </div>`,
    label: 'See the pricing',
    width: 860, top: 118,
    extra: `h1{font-size:56px}.sub{margin-top:16px}.rule{margin:22px 0 20px}
      .duo{max-width:800px;gap:24px}.duo>div{padding:30px 24px}
      .duo .v{font-size:64px}.duo .c{margin-top:13px;font-size:14px}.cta{margin-top:32px}`,
  }),

  '06': photo({
    bg: '06-bg.png', pos: '76% 45%',
    head: 'What happens when', accent: 'the other knee goes.',
    sub: 'At most clinics, a second area is a new patient conversation with a new first-time price.',
    block: `<div class="note">Here it is <b>$2,200</b> &mdash; the same as it would be for the original knee, a shoulder, or your back. You pay the first-treatment price once.</div>`,
    label: 'See how it applies',
  }),

  '07': typo({
    head: 'You should not<br>have to call', accent: 'to find out the price.',
    sub: 'If a clinic will not publish what a treatment costs, there is usually a reason, and it is rarely in your favour.',
    block: `<div class="duo" style="max-width:700px">
      <div><div class="v">$6,000</div><div class="c">First treatment</div></div>
      <div><div class="v">$2,200</div><div class="c">Every one after</div></div>
    </div>`,
    label: 'Read the price list',
    width: 860, top: 118,
    extra: `h1{font-size:54px}.sub{margin-top:16px}.rule{margin:22px 0 20px}
      .duo{max-width:800px;gap:24px}.duo>div{padding:30px 24px}
      .duo .v{font-size:64px}.duo .c{margin-top:13px;font-size:14px}.cta{margin-top:32px}`,
  }),

  '08': clinic({
    head: 'The price is', accent: 'the easy part.',
    sub: 'Whether this is right for you is decided at an evaluation &mdash; not on a price list, and not in an email.',
    block: `<div class="note">Some people who come in are good candidates. Some are not, and we tell them so.</div>
    <div class="doc"><img src="assets/dr-cimikoski.jpg">
      <div><div class="d1">Dr. William Cimikoski</div><div class="d2">Medical Director. Every evaluation is physician-led.</div></div>
    </div>`,
    label: 'Book a consultation',
    extra: `.logo{margin-bottom:32px}h1{font-size:58px}.cta{margin-top:24px}`,
  }),

  '09': photo({
    bg: '09-bg.png', pos: '74% 50%',
    head: 'Knee today.<br>Shoulder in three years.', accent: 'Still $2,200.',
    sub: 'The price does not run out, and there is nothing to renew.',
    block: `<ul class="nos">
      <li>${cross}<span>No expiry date</span></li>
      <li>${cross}<span>No renewal to remember</span></li>
      <li>${cross}<span>No window you have to act within</span></li>
    </ul>`,
    label: 'See how it works over time',
    extra: `h1{font-size:50px}`,
  }),

  '10': typo({
    head: 'Where the cells', accent: 'actually come from.',
    sub: '&ldquo;Stem cell therapy&rdquo; describes several quite different things. You are entitled to know which one you are being offered.',
    block: `<div class="pairs">
      <div><div class="t">Donated birth tissue</div><div class="b">Umbilical cord and amniotic stem cells from ethically donated tissue, prepared in a laboratory &mdash; not harvested from your body.</div></div>
      <div><div class="t">Your own PRP</div><div class="b">Platelet-rich plasma, prepared on the day from a small sample of your own blood.</div></div>
    </div>`,
    label: 'Read what it involves',
    width: 900, top: 140,
    extra: `h1{font-size:64px}.pairs{max-width:860px;gap:24px}.pairs>div{padding:30px 28px}
      .pairs .t{font-size:15px;margin-bottom:13px}.pairs .b{font-size:20px}.cta{margin-top:44px}`,
  }),

  '11': clinic({
    head: 'What the first', accent: 'treatment includes.',
    block: `<ul class="steps">
      <li><span class="num">1</span><span class="txt">A physician evaluation with Dr. Cimikoski, and an honest answer on whether you are a candidate.</span></li>
      <li><span class="num">2</span><span class="txt">Preparation of the regenerative components &mdash; your own PRP, and donated cord and amniotic stem cells where appropriate.</span></li>
      <li><span class="num">3</span><span class="txt">The procedure itself, performed in-office by the physician.</span></li>
      <li><span class="num">4</span><span class="txt">Follow-up afterwards, at the same clinic, with the same physician.</span></li>
    </ul>
    <div class="note" style="margin-top:18px;font-size:18px">Every treatment after the first is <b>$2,200</b>, for any area.</div>`,
    label: 'See the steps',
    extra: `.logo{margin-bottom:28px}h1{font-size:54px}.rule{margin:22px 0 20px}.cta{margin-top:20px;padding:17px 38px}`,
  }),

  '12': photo({
    bg: '12-bg.png', pos: '78% 45%',
    head: 'Ask us anything', accent: 'about the price.',
    sub: 'A phone call costs nothing, and you are not obliged to book anything at the end of it.',
    block: `<div class="tel"><span>Call us</span>(801) 999-4860</div>`,
    label: 'Book a consultation',
  }),
};

for (const [n, html] of Object.entries(creatives)) writeFileSync(join(HERE, `creative-${n}.html`), html);
console.log('generati:', Object.keys(creatives).length, 'file HTML');
