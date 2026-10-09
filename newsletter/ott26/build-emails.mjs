// Genera i 6 HTML email ott26 (Galleri) dai testi di content.mjs.
// Stessa struttura responsive di Sep26; ISI spostata nel footer.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { dems, ISI } from './content.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'email');
mkdirSync(OUT, { recursive: true });

const BASE = 'https://utahstemcells.com';
const LANDING = `${BASE}/galleri-test/`;
const PHONE = '(801) 999-4860';
const PHONE_HREF = 'tel:+18019994860';

const C = {
  navy: '#0a2a4a', navyDark: '#082038', blue: '#1479c9',
  teal: '#1f7e8c', bg: '#eef2f6', card: '#ffffff',
  text: '#333333', muted: '#6b7c8c', boxBg: '#eaf4fc', border: '#d6e4f0',
};

const slugs = [
  '01-one-blood-draw', '02-in-addition-never-instead', '03-cancers-nobody-screens-for',
  '04-what-your-result-means', '05-is-this-test-right-for-you', '06-how-it-works-here',
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// enfasi sui concetti chiave, coerente con l'impostazione di Sep26
const hi = (s) => esc(s)
  .replace(/more than 50 types of cancer/g, `<strong style="color:${C.navy};">more than 50 types of cancer</strong>`)
  .replace(/in addition to/g, `<strong style="color:${C.navy};">in addition to</strong>`)
  .replace(/not instead of it|never instead of it|instead of it/g, (m) => `<strong style="color:${C.blue};">${m}</strong>`)
  .replace(/No Cancer Signal Detected|Cancer Signal Detected/g, (m) => `<strong style="color:${C.navy};">${m}</strong>`);

const button = (label, href) => `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr><td align="center" bgcolor="${C.teal}" style="border-radius:6px;">
                  <a href="${href}" style="display:inline-block;padding:16px 38px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">${label}</a>
                </td></tr>
              </table>`;

const keyPoints = () => `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boxBg};border:1px solid ${C.border};border-radius:8px;">
                <tr><td style="padding:22px 24px;font-family:Arial,Helvetica,sans-serif;">
                  <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${C.navy};">What the Galleri test is</p>
                  <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:${C.text};">A single blood draw that looks for a signal shared by more than 50 types of cancer, and predicts where in the body it is likely to have come from.</p>
                  <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${C.navy};">What it is not</p>
                  <p style="margin:0;font-size:15px;line-height:1.5;color:${C.text};">It is not a replacement for the screening your provider already recommends, and a negative result does not rule out cancer.</p>
                </td></tr>
              </table>`;

function render({ subject, paragraphs, image, isi }) {
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
        <a href="${LANDING}"><img src="${BASE}/dem-ott26/${image}" width="600" alt="${esc(subject)} &mdash; Utah Stem Cells" style="display:block;width:100%;max-width:600px;height:auto;" /></a>
      </td></tr>
      <tr><td class="px" style="padding:32px 40px 8px;">
        <h1 class="h1" style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:27px;line-height:1.25;font-weight:bold;color:${C.navy};text-transform:uppercase;">${esc(subject)}</h1>
        ${body}
      </td></tr>
      <tr><td class="px" style="padding:8px 40px 0;">
        ${keyPoints()}
      </td></tr>
      <tr><td class="px btn" align="center" style="padding:30px 40px 10px;">
        ${button('Book a consultation', LANDING)}
      </td></tr>
      <tr><td class="px" align="center" style="padding:6px 40px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${C.muted};">
        or call <a href="${PHONE_HREF}" style="color:${C.navy};font-weight:bold;text-decoration:none;">${PHONE}</a>
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
    .filter((l) => !/^(Phone|Web):/i.test(l) && !/^Important Safety Information:/i.test(l));
  const paragraphs = lines.map(hi);
  const html = render({ subject: d.oggetto, paragraphs, image: `${slugs[i]}.jpg`, isi: ISI });
  writeFileSync(join(OUT, `${slugs[i]}.html`), html);
  return { n: i + 1, slug: slugs[i], subject: d.oggetto, image: `${slugs[i]}.jpg`, bytes: html.length };
});

writeFileSync(join(HERE, 'manifest-email.json'), JSON.stringify(manifest, null, 2));
console.table(manifest.map(({ n, subject, bytes }) => ({ n, subject, bytes })));
