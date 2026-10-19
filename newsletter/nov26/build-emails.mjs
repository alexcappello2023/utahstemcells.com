// Genera i 12 HTML email nov26 (staminali, leva prezzo) dai testi di content.mjs.
// Stessa struttura responsive di ott26; disclaimer in un blocco dedicato sopra il footer.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dems, DISCLAIMER } from './content.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'email');
mkdirSync(OUT, { recursive: true });

const BASE = 'https://utahstemcells.com';
const LANDING = `${BASE}/stem-cell-joint-regeneration/`;
const PHONE = '(801) 999-4860';
const PHONE_HREF = 'tel:+18019994860';

const C = {
  navy: '#0a2a4a', navyDark: '#082038', blue: '#1479c9',
  teal: '#1f7e8c', bg: '#eef2f6', card: '#ffffff',
  text: '#333333', muted: '#6b7c8c', boxBg: '#eaf4fc', border: '#d6e4f0',
};

// CTA a basso impegno: il primo invio ha dato 19,5% di aperture ma ~0,2% di click,
// e dei 9 click 6 sono andati alla home. Chi apre vuole capire, non prenotare.
const CTAS = [
  'See the full pricing', 'Read how it works', 'See what it means for you',
  'Read the pricing', 'See the pricing', 'See how it applies',
  'Read the price list', 'Book a consultation', 'See how it works over time',
  'Read what it involves', 'See the steps', 'Book a consultation',
];

const slugs = [
  '01-6000-once-2200-after', '02-second-same-as-tenth', '03-different-joint-same-price',
  '04-prices-on-our-website', '05-two-numbers', '06-when-the-other-knee-goes',
  '07-should-not-have-to-call', '08-price-is-the-easy-part', '09-still-2200',
  '10-where-the-cells-come-from', '11-what-the-first-includes', '12-ask-us-anything',
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// enfasi sui concetti chiave, coerente con l'impostazione di Sep26
const hi = (s) => esc(s)
  .replace(/\$6,000/g, `<strong style="color:${C.navy};white-space:nowrap;">$6,000</strong>`)
  .replace(/\$2,200/g, `<strong style="color:${C.blue};white-space:nowrap;">$2,200</strong>`);

const button = (label, href) => `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr><td align="center" bgcolor="${C.teal}" style="border-radius:6px;">
                  <a href="${href}" style="display:inline-block;padding:16px 38px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">${label}</a>
                </td></tr>
              </table>`;

const keyPoints = () => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boxBg};border:1px solid ${C.border};border-radius:8px;">
                <tr><td style="padding:20px 24px;font-family:Arial,Helvetica,sans-serif;">
                  <p style="margin:0 0 4px;font-size:13px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:${C.navy};">Your first treatment</p>
                  <p style="margin:0 0 16px;font-size:30px;font-weight:bold;line-height:1;color:${C.navy};">$6,000</p>
                  <p style="margin:0 0 4px;font-size:13px;font-weight:bold;letter-spacing:1.2px;text-transform:uppercase;color:${C.blue};">Every treatment after</p>
                  <p style="margin:0 0 6px;font-size:30px;font-weight:bold;line-height:1;color:${C.blue};">$2,200</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:${C.text};">For the same area or a different area of the body. No expiry.</p>
                </td></tr>
              </table>`;

function render({ subject, paragraphs, image, isi, cta }) {
  const preheader = paragraphs[0].replace(/<[^>]+>/g, '').slice(0, 120);
  const body = paragraphs
    .map((p) => `<p style="margin:0 0 16px;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:1.65;color:${C.text};">${p}</p>`)
    .join('\n              ');

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light only" />
<meta name="supported-color-schemes" content="light only" />
<title>${esc(subject)}</title>
<style type="text/css">
  body,table,td,a{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;}
  img{-ms-interpolation-mode:bicubic;border:0;outline:none;text-decoration:none;display:block;}
  body{margin:0!important;padding:0!important;width:100%!important;background-color:${C.bg};}
  a{color:${C.blue};}
  @media screen and (max-width:620px){
    .wrap{width:100%!important;}
    .px{padding-left:20px!important;padding-right:20px!important;}
    .h1{font-size:24px!important;}
    .btn a{display:block!important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${C.bg};">
<div style="display:none;font-size:1px;color:${C.bg};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.bg};">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${C.card};border-radius:10px;overflow:hidden;">
      <tr><td>
        <a href="${LANDING}"><img src="${BASE}/dem-nov26/${image}" width="600" alt="${esc(subject)} &mdash; Utah Stem Cells" style="display:block;width:100%;max-width:600px;height:auto;" /></a>
      </td></tr>
      <tr><td class="px" style="padding:32px 40px 8px;">
        <h1 class="h1" style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:27px;line-height:1.25;font-weight:bold;color:${C.navy};text-transform:uppercase;">${esc(subject)}</h1>
        ${body}
      </td></tr>
      <tr><td class="px" style="padding:8px 40px 0;">
        ${keyPoints()}
      </td></tr>
      <tr><td class="px btn" align="center" style="padding:30px 40px 10px;">
        ${button(cta, LANDING)}
      </td></tr>
      <tr><td class="px" align="center" style="padding:6px 40px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${C.muted};">
        Questions about the price? Call <a href="${PHONE_HREF}" style="color:${C.navy};font-weight:bold;text-decoration:none;">${PHONE}</a>
      </td></tr>
      <tr><td class="px" style="padding:0 40px 26px;">
        <p style="margin:0;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.55;color:${C.muted};border-top:1px solid ${C.border};padding-top:16px;">${esc(isi)}</p>
      </td></tr>
      <tr><td style="padding:26px 40px;background-color:${C.navyDark};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:#a9c0d4;" align="center">
        <strong style="color:#ffffff;font-size:14px;">Utah Stem Cells</strong><br />
        9980 S 300 W, Suite 150, Sandy, UT 84070<br />
        <a href="${PHONE_HREF}" style="color:#a9c0d4;text-decoration:none;">${PHONE}</a> &nbsp;&middot;&nbsp;
        <a href="${BASE}/" style="color:#a9c0d4;text-decoration:underline;">utahstemcells.com</a>
        <br /><br />
        <span style="font-size:11px;color:#7f98ad;">You are receiving this email because you are a patient or contact of Utah Stem Cells.<br />
        <a href="{{ unsubscribe }}" style="color:#7f98ad;text-decoration:underline;">Unsubscribe</a></span>
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

const manifest = dems.map((d, i) => {
  // dal body: via le righe Phone/Web e la ISI, che hanno un posto dedicato nel template
  const lines = d.body.split('\n').map((l) => l.trim()).filter(Boolean)
    .filter((l) => !/^(Phone|Web):/i.test(l) && l !== DISCLAIMER);
  const paragraphs = lines.map(hi);
  const html = render({ subject: d.oggetto, paragraphs, image: `${slugs[i]}.jpg`, isi: DISCLAIMER, cta: CTAS[i] });
  writeFileSync(join(OUT, `${slugs[i]}.html`), html);
  return { n: i + 1, slug: slugs[i], subject: d.oggetto, image: `${slugs[i]}.jpg`, cta: CTAS[i], bytes: html.length };
});

writeFileSync(join(HERE, 'manifest-email.json'), JSON.stringify(manifest, null, 2));
console.table(manifest.map(({ n, subject, bytes }) => ({ n, subject, bytes })));
