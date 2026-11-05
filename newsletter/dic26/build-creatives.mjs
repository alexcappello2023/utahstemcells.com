// Genera i 2 HTML delle creatività Dic26. Render: Chrome headless 1536x1024.
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));

const DISC_PRP = 'These treatments are not FDA-approved for any specific condition, and individual results vary. PRP is prepared from a small sample of your own blood. Whether a treatment is appropriate for you is decided by the physician after an individual evaluation.';
const DISC_HORM = 'Hormone therapy is prescribed and monitored by the physician on the basis of your lab work and an individual evaluation. Individual results vary. This information is for general education and is not a promise of any particular outcome.';
const DISC_DEV = 'FaceTite and BodyTite are physician-performed procedures. Individual results vary, and whether a procedure is appropriate for you is decided after an individual evaluation. This information is for general education and is not a promise of any particular outcome.';

const CSS = `
:root{--navy:#0a2a4a;--navy-deep:#061d35;--blue:#4fa8e8;--teal:#1f7e8c;--ink:#cfe0ee;--dim:#8ba7bf}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1536px;height:1024px;overflow:hidden}
body{font-family:'Archivo','Helvetica Neue',Arial,sans-serif;position:relative;background:var(--navy)}
.photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.scrim{position:absolute;inset:0;background:linear-gradient(100deg,var(--navy) 0%,var(--navy) 25%,rgba(10,42,74,.95) 33%,rgba(10,42,74,.62) 43%,rgba(10,42,74,.22) 52%,rgba(10,42,74,0) 60%)}
.content{position:absolute;left:84px;top:72px;width:740px}
.logo{width:262px;display:block;margin-bottom:40px}
h1{font-size:58px;line-height:1.0;font-weight:800;letter-spacing:-1.3px;color:#fff;text-transform:uppercase}
h1 .accent{color:var(--blue);display:block}
.sub{margin-top:20px;font-size:21px;line-height:1.45;color:var(--ink);max-width:600px}
.rule{width:92px;height:3px;background:var(--blue);margin:26px 0 24px;border-radius:2px}
.opts{display:flex;flex-direction:column;gap:13px;max-width:620px}
.opt{background:rgba(16,47,79,.86);border:1px solid rgba(79,168,232,.3);border-radius:10px;padding:16px 22px}
.opt .t{font-size:16px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;color:var(--blue)}
.opt .b{margin-top:6px;font-size:18px;line-height:1.4;color:#fff;font-weight:500}
.cta{display:inline-block;margin-top:28px;background:var(--teal);color:#fff;font-size:21px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;padding:19px 42px;border-radius:7px;text-decoration:none}
.isi{position:absolute;left:0;right:0;bottom:0;padding:15px 84px;background:linear-gradient(to right,var(--navy-deep) 0%,var(--navy-deep) 62%,rgba(6,29,53,.9) 100%);font-size:13px;line-height:1.5;color:var(--dim)}
`;

const card = (t, b) => `<div class="opt"><div class="t">${t}</div><div class="b">${b}</div></div>`;

const page = ({ bg, pos, head, accent, sub, opts, disc = DISC_PRP }) => `<!doctype html>
<html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<title>${head}</title><style>${CSS}</style></head>
<body>
  <img class="photo" src="creative-src/${bg}" style="object-position:${pos}">
  <div class="scrim"></div>
  <div class="content">
    <img class="logo" src="logo.svg">
    <h1>${head}<span class="accent">${accent}</span></h1>
    <p class="sub">${sub}</p>
    <div class="rule"></div>
    <div class="opts">${opts}</div>
    <a class="cta" href="#">Book a consultation</a>
  </div>
  <div class="isi">${disc}</div>
</body></html>`;

writeFileSync(join(HERE, 'creative-01.html'), page({
  bg: '01-bg.png', pos: '78% 45%',
  head: 'The conversation', accent: 'most men never have.',
  sub: 'Two non-surgical options, both performed in-office by a physician. Both discreet.',
  opts: card('P-Shot', 'An injection prepared from a small sample of your own blood.')
       + card('GAINSWave', 'Acoustic waves. No needles, no downtime.'),
}));

writeFileSync(join(HERE, 'creative-02.html'), page({
  bg: '02-bg.png', pos: '76% 45%',
  head: 'What nobody', accent: 'tells you to expect.',
  sub: 'Common, rarely discussed &mdash; and there are options worth knowing about.',
  opts: card('O-Shot', 'An injection prepared from a small sample of your own blood.')
       + card('Votiva / FemTite', 'Gentle radiofrequency energy. No surgery, minimal downtime.'),
}));

writeFileSync(join(HERE, 'creative-03.html'), page({
  bg: '03-bg.png', pos: '76% 50%',
  head: 'When sleep', accent: 'does not fix it.',
  sub: 'Fatigue, low mood, changes in drive. Hormones may be part of it &mdash; testing is how you find out.',
  opts: card('Lab-guided', 'Your plan starts with testing, not with a guess.')
       + card('Physician-managed', 'Overseen by Dr. Cimikoski and adjusted over time.'),
  disc: DISC_HORM,
}));

writeFileSync(join(HERE, 'creative-04.html'), page({
  bg: '04-bg.png', pos: '74% 45%',
  head: 'Firmer without', accent: 'a surgical lift.',
  sub: 'Radiofrequency energy delivered beneath the skin, through very small entry points.',
  opts: card('FaceTite', 'Jawline, jowls and the area under the chin.')
       + card('BodyTite', 'Abdomen, upper arms, thighs, flanks and back.'),
  disc: DISC_DEV,
}));

console.log('generati 4 file HTML');
