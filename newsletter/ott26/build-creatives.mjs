// Genera i 6 HTML delle creatività ott26. Render: Chrome headless 1536x1024.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));

const ISI = 'Galleri&reg; is a prescription test and has not been cleared or approved by the FDA. It does not detect all cancers and is intended to be used in addition to routine cancer screening recommended by a healthcare provider. A result of No Cancer Signal Detected does not rule out cancer. False positive and false negative results do occur. Rx only.';
const CTA = 'Book a consultation';

const CSS = `
:root{--navy:#0a2a4a;--navy-deep:#061d35;--navy-card:#102f4f;--blue:#4fa8e8;--teal:#1f7e8c;--ink:#cfe0ee;--dim:#8ba7bf}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1536px;height:1024px;overflow:hidden}
body{font-family:'Archivo','Helvetica Neue',Arial,sans-serif;position:relative;background:var(--navy)}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:linear-gradient(100deg,var(--navy) 0%,var(--navy) 25%,rgba(10,42,74,.95) 33%,rgba(10,42,74,.62) 43%,rgba(10,42,74,.22) 52%,rgba(10,42,74,0) 60%)}
.content{position:absolute;left:84px;top:70px;width:748px}
.logo{width:270px;display:block;margin-bottom:50px}
h1{font-size:66px;line-height:.98;font-weight:800;letter-spacing:-1.5px;color:#fff;text-transform:uppercase}
h1 .accent{color:var(--blue);display:block}
.sub{margin-top:24px;font-size:22px;line-height:1.45;color:var(--ink);max-width:620px}
.rule{width:92px;height:3px;background:var(--blue);margin:34px 0 30px;border-radius:2px}
.points{list-style:none}
.points li{display:flex;align-items:flex-start;gap:16px;margin-bottom:18px;font-size:21px;line-height:1.4;color:#fff;font-weight:600;max-width:620px}
.dot{flex:0 0 auto;width:28px;height:28px;border-radius:50%;background:rgba(79,168,232,.16);border:1.5px solid var(--blue);display:flex;align-items:center;justify-content:center;margin-top:1px}
.dot svg{width:15px;height:15px}
.cta{display:inline-block;margin-top:34px;background:var(--teal);color:#fff;font-size:22px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;padding:21px 46px;border-radius:7px;text-decoration:none}
.isi{position:absolute;left:0;right:0;bottom:0;padding:17px 84px;background:linear-gradient(to right,var(--navy-deep) 0%,var(--navy-deep) 62%,rgba(6,29,53,.88) 100%);font-size:14px;line-height:1.5;color:var(--dim);letter-spacing:.2px}
/* coppia "in addition / never instead" */
.pair{margin-top:6px}
.pbox{background:rgba(16,47,79,.82);border:1px solid rgba(79,168,232,.3);border-radius:10px;padding:18px 22px;max-width:620px}
.pbox .t{font-size:14px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--blue);margin-bottom:7px}
.pbox .b{font-size:19px;line-height:1.4;color:#fff;font-weight:600}
.plus{display:flex;align-items:center;gap:14px;margin:12px 0 12px 2px}
.plus .sign{width:34px;height:34px;border-radius:50%;background:var(--teal);color:#fff;font-size:24px;font-weight:700;display:flex;align-items:center;justify-content:center;line-height:1}
.plus .lbl{font-size:15px;letter-spacing:1.4px;text-transform:uppercase;color:var(--dim);font-weight:600}
/* schede risultato */
.cards{display:flex;flex-direction:column;gap:14px;max-width:650px}
.card{border-radius:10px;padding:17px 22px;background:rgba(16,47,79,.85);border-left:4px solid var(--blue)}
.card .t{font-size:15px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--blue);margin-bottom:6px}
.card .b{font-size:18px;line-height:1.4;color:#fff;font-weight:500}
/* layout dati (03) */
.viz{position:absolute;right:84px;top:150px;width:640px}
.vrow{margin-bottom:54px}
.vlabel{font-size:14px;font-weight:700;letter-spacing:1.8px;text-transform:uppercase;color:var(--blue);margin-bottom:18px}
.vlabel.muted{color:var(--dim)}
.chips{display:flex;flex-wrap:nowrap;gap:9px}
.chip{display:flex;align-items:center;gap:10px;background:rgba(79,168,232,.14);border:1px solid var(--blue);border-radius:30px;padding:10px 17px 10px 13px;font-size:18px;color:#fff;font-weight:600}
.chip i{width:12px;height:12px;border-radius:50%;background:var(--blue);display:block}
.field{display:grid;grid-template-columns:repeat(9,1fr);gap:19px;max-width:600px}
.field span{width:30px;height:30px;border-radius:50%;background:rgba(139,167,191,.24);display:block}
.vnote{margin-top:26px;font-size:18px;color:var(--ink);line-height:1.5;max-width:600px}
/* layout passi (06) */
.sphoto{position:absolute;right:0;top:0;width:704px;height:1024px;object-fit:cover;object-position:50% 40%}
.sscrim{position:absolute;inset:0;background:linear-gradient(97deg,var(--navy) 0%,var(--navy) 51%,rgba(10,42,74,.94) 56%,rgba(10,42,74,.52) 63%,rgba(10,42,74,.14) 71%,rgba(10,42,74,0) 79%)}
.steps{list-style:none;margin-top:4px}
.steps li{display:flex;align-items:flex-start;gap:17px;margin-bottom:17px;max-width:620px}
.num{flex:0 0 auto;width:34px;height:34px;border-radius:50%;background:var(--blue);color:var(--navy);font-size:17px;font-weight:800;display:flex;align-items:center;justify-content:center}
.steps .txt{font-size:19px;line-height:1.38;color:#fff;font-weight:600;padding-top:4px}
.doc{display:flex;align-items:center;gap:18px;margin-top:28px;max-width:620px}
.doc img{width:86px;height:86px;border-radius:12px;object-fit:cover;object-position:50% 18%;border:2px solid rgba(79,168,232,.45)}
.doc .d1{font-size:19px;font-weight:700;color:#fff}
.doc .d2{font-size:16px;color:var(--ink);line-height:1.4;margin-top:3px}
`;

const page = (title, body, extra = '') => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<title>${title}</title><style>${CSS}${extra}</style></head>
<body>
${body}
<div class="isi">${ISI}</div>
</body></html>`;

const check = `<span class="dot"><svg viewBox="0 0 16 16" fill="none" stroke="#4fa8e8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 8.5l3.5 3.5 7.5-8"/></svg></span>`;
const logo = `<img class="logo" src="logo.svg">`;
const cta = `<a class="cta" href="#">${CTA}</a>`;
const h1 = (a, b) => `<h1>${a}<span class="accent">${b}</span></h1>`;

// ---- layout fotografico ----
const photoLayout = ({ bg, pos, head, accent, sub, block, extra }) => page(head, `
  <img class="photo" src="creative-src/${bg}" style="object-position:${pos}">
  <div class="scrim"></div>
  <div class="content">
    ${logo}
    ${h1(head, accent)}
    <p class="sub">${sub}</p>
    <div class="rule"></div>
    ${block}
    ${cta}
  </div>`, extra);

const creatives = {
  '01': photoLayout({
    bg: '01-bg.png', pos: '80% 50%',
    head: 'One blood draw.', accent: 'More than<br>50 cancers.',
    sub: 'A single blood test that looks for a signal shared by more than 50 types of cancer &mdash; now available at Utah Stem Cells.',
    block: `<ul class="points">
      <li>${check}<span>In addition to your routine screening &mdash; never instead of it.</span></li>
      <li>${check}<span>A prescription test, ordered and reviewed by a physician.</span></li>
    </ul>`,
  }),

  '02': photoLayout({
    bg: '02-bg.png', pos: '78% 50%',
    head: 'In addition.', accent: 'Never instead.',
    sub: 'Galleri is designed to work alongside the cancer screening you already do.',
    extra: `.logo{margin-bottom:32px}h1{font-size:58px}.sub{margin-top:18px;font-size:21px}
      .rule{margin:22px 0 20px}.pbox{padding:15px 20px}.pbox .b{font-size:18px}
      .plus{margin:9px 0 9px 2px}.cta{margin-top:24px;padding:19px 42px}`,
    block: `<div class="pair">
      <div class="pbox"><div class="t">Your routine screening</div>
        <div class="b">Mammography, colonoscopy, cervical screening and the rest. Keep every one of them.</div></div>
      <div class="plus"><span class="sign">+</span><span class="lbl">and, not instead of</span></div>
      <div class="pbox"><div class="t">Galleri</div>
        <div class="b">A signal shared by more than 50 types of cancer &mdash; including many with no screening test at all.</div></div>
    </div>`,
  }),

  '04': photoLayout({
    bg: '04-bg.png', pos: '76% 45%',
    head: 'What your result', accent: 'actually means.',
    sub: 'Know this before the blood draw, not after it.',
    block: `<div class="cards">
      <div class="card"><div class="t">No cancer signal detected</div>
        <div class="b">Does not rule out cancer. Your routine screening matters exactly as much as before.</div></div>
      <div class="card"><div class="t">Cancer signal detected</div>
        <div class="b">Not a diagnosis. Requires confirmatory evaluation by established procedures, such as imaging.</div></div>
    </div>`,
  }),

  '05': photoLayout({
    bg: '05-bg.png', pos: '74% 50%',
    head: 'Is this test', accent: 'right for you?',
    sub: 'It is not right for everyone &mdash; and we will tell you when it is not.',
    block: `<ul class="points">
      <li>${check}<span>Adults age 50 or older</span></li>
      <li>${check}<span>Or at elevated risk of cancer</span></li>
      <li>${check}<span>Prescription required &mdash; the physician decides with you</span></li>
    </ul>`,
  }),

  // ---- layout dati, senza fotografia ----
  '03': page('The cancers nobody screens for', `
  <div class="content" style="width:640px;top:132px">
    ${logo}
    ${h1('The cancers', 'nobody<br>screens for.')}
    <p class="sub" style="max-width:540px;margin-top:30px;font-size:23px">Most cancers have no routine screening test at all. Galleri looks for a signal shared by more than 50 types &mdash; from a single blood sample.</p>
    ${cta}
  </div>
  <div class="viz" style="top:186px">
    <div class="vrow">
      <div class="vlabel">Have an established screening test</div>
      <div class="chips">
        ${['Breast', 'Colon', 'Cervical', 'Prostate', 'Lung'].map((c) => `<span class="chip"><i></i>${c}</span>`).join('')}
      </div>
    </div>
    <div class="vrow" style="margin-bottom:0">
      <div class="vlabel muted">Have none &mdash; most cancers</div>
      <div class="field">${'<span></span>'.repeat(54)}</div>
      <p class="vnote">Pancreatic, ovarian, liver, esophageal and many more &mdash; usually found only once they cause symptoms.</p>
    </div>
  </div>`),

  // ---- layout processo, con foto reali della clinica ----
  '06': page('How it works here', `
  <img class="sphoto" src="assets/clinic-reception.jpg">
  <div class="sscrim"></div>
  <div class="content" style="width:700px">
    ${logo}
    ${h1('How it', 'works here.')}
    <div class="rule" style="margin:28px 0 26px"></div>
    <ul class="steps">
      <li><span class="num">1</span><span class="txt">A consultation. The physician reviews your history and explains what the test can and cannot tell you.</span></li>
      <li><span class="num">2</span><span class="txt">A single blood draw, at our clinic in Sandy.</span></li>
      <li><span class="num">3</span><span class="txt">The sample is processed by GRAIL&rsquo;s CLIA-certified, CAP-accredited laboratory.</span></li>
      <li><span class="num">4</span><span class="txt">The physician reviews the result with you and arranges follow-up if a signal is found.</span></li>
    </ul>
    <div class="doc">
      <img src="assets/dr-cimikoski.jpg">
      <div><div class="d1">Dr. William Cimikoski</div>
      <div class="d2">Medical Director. Oversees this process personally.</div></div>
    </div>
    ${cta}
  </div>`, `.logo{margin-bottom:30px}h1{font-size:58px}.steps li{margin-bottom:13px}
     .steps .txt{font-size:18px}.num{width:32px;height:32px;font-size:16px}
     .doc{margin-top:22px}.cta{margin-top:22px;padding:19px 42px}`),
};

for (const [n, html] of Object.entries(creatives)) {
  writeFileSync(join(HERE, `creative-${n}.html`), html);
}
console.log('generati:', Object.keys(creatives).sort().map((n) => `creative-${n}.html`).join(', '));
