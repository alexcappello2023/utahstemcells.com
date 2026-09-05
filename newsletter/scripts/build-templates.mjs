// Genera i 6 template HTML delle DEM Sep26 a partire da sep26-copy.csv.
// Uso: node newsletter/scripts/build-templates.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', 'sett26');
const BASE = 'https://utahstemcells.com';
const CONTACT = `${BASE}/contact/`;
const PHONE = '(801) 999-4860';
const PHONE_HREF = 'tel:+18019994860';

const C = {
  navy: '#0a2a4a', navyDark: '#082038', blue: '#1479c9', blueLight: '#4fa8e8',
  teal: '#1f7e8c', tealDark: '#186572', bg: '#eef2f6', card: '#ffffff',
  text: '#333333', muted: '#6b7c8c', boxBg: '#eaf4fc', border: '#d6e4f0',
};

// --- parsing CSV (gestisce i campi multi-riga con virgolette) ---
function parseCsv(text) {
  const rows = []; let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; }
    else if (c !== '\r') field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// evidenzia prezzi e sconto nel corpo del testo
const hi = (s) => esc(s)
  .replace(/\$2,200/g, `<strong style="color:${C.navy};white-space:nowrap;">$2,200</strong>`)
  .replace(/10% OFF/g, `<strong style="color:${C.blue};white-space:nowrap;">10% OFF</strong>`);

function button(label, href) {
  return `
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:0 auto;">
                <tr>
                  <td align="center" bgcolor="${C.teal}" style="border-radius:6px;">
                    <a href="${href}" style="display:inline-block;padding:16px 38px;font-family:Arial,Helvetica,sans-serif;font-size:17px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:6px;">${label}</a>
                  </td>
                </tr>
              </table>`;
}

function offerBox() {
  return `
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${C.boxBg};border:1px solid ${C.border};border-radius:8px;">
                <tr>
                  <td style="padding:22px 24px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${C.navy};">Previously treated joint?</p>
                    <p style="margin:0 0 18px;font-size:15px;line-height:1.5;color:${C.text};">Retreatment of that same joint for only <strong style="color:${C.navy};white-space:nowrap;">$2,200</strong> &mdash; for the rest of your life.</p>
                    <p style="margin:0 0 6px;font-size:15px;font-weight:bold;color:${C.navy};">New joint?</p>
                    <p style="margin:0;font-size:15px;line-height:1.5;color:${C.text};"><strong style="color:${C.blue};white-space:nowrap;">10% OFF</strong> your initial treatment, and that joint becomes eligible for the same <strong style="color:${C.navy};white-space:nowrap;">$2,200</strong> retreatment for life.</p>
                  </td>
                </tr>
              </table>`;
}

// --- blocchi ricostruiti in HTML per la DEM 01 (erano immagine) ---
function dem01Blocks() {
  const card = (bg, titleColor, textColor, title, body, big, bigColor, sub) => `
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${bg};border:1px solid ${C.border};border-radius:10px;">
                    <tr>
                      <td align="center" style="padding:24px 22px;font-family:Arial,Helvetica,sans-serif;">
                        <p style="margin:0 0 12px;font-size:17px;font-weight:bold;letter-spacing:.5px;color:${titleColor};text-transform:uppercase;">${title}</p>
                        <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:${textColor};">${body}</p>
                        <p style="margin:0;font-size:40px;line-height:1;font-weight:bold;color:${bigColor};">${big}</p>
                        <p style="margin:8px 0 0;font-size:11px;letter-spacing:1.5px;color:${textColor};text-transform:uppercase;">${sub}</p>
                      </td>
                    </tr>
                  </table>`;

  const joints = ['Knees', 'Shoulders', 'Hips', 'Elbows', 'Ankles', 'And more']
    .map((j) => `<td align="center" width="33.33%" style="padding:8px 4px;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:bold;color:${C.navy};">${j}</td>`);

  const badges = ['Stay active longer', 'A trusted, long-term solution', 'Expert care you can count on', 'Proudly serving Utah and beyond']
    .map((b) => `<td align="center" width="25%" style="padding:10px 6px;font-family:Arial,Helvetica,sans-serif;font-size:11px;line-height:1.4;color:${C.muted};">${b}</td>`);

  return `
              ${card(C.navy, '#ffffff', '#d8e6f2', 'Previously treated joints', 'If any joint you&rsquo;ve previously treated with us is causing pain again, it can be treated again for only', '$2,200', C.blueLight, 'For the rest of your life')}
              <div style="height:14px;line-height:14px;">&nbsp;</div>
              ${card(C.boxBg, C.blue, C.text, 'New joints with pain', 'If any new joints are causing pain, you can receive treatment for <strong style="color:' + C.blue + ';">10% OFF</strong> &mdash; and again be eligible to have it treated if necessary for only', '$2,200', C.navy, 'For the rest of your life')}
              <div style="height:14px;line-height:14px;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid ${C.border};border-radius:10px;">
                <tr>
                  <td style="padding:20px 18px 14px;font-family:Arial,Helvetica,sans-serif;">
                    <p style="margin:0 0 12px;text-align:center;font-size:15px;font-weight:bold;letter-spacing:.5px;color:${C.navy};text-transform:uppercase;">Common joints we treat</p>
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>${joints.slice(0, 3).join('')}</tr>
                      <tr>${joints.slice(3).join('')}</tr>
                    </table>
                  </td>
                </tr>
              </table>
              <div style="height:20px;line-height:20px;">&nbsp;</div>
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid ${C.border};border-bottom:1px solid ${C.border};">
                <tr>${badges.join('')}</tr>
              </table>`;
}

function render({ n, subject, paragraphs, cta, image, isFirst }) {
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
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" class="wrap" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${C.card};border-radius:10px;overflow:hidden;">
        <tr>
          <td>
            <a href="${CONTACT}"><img src="${BASE}/dem/${image}" width="600" alt="${esc(subject)} &mdash; Utah Stem Cells" style="display:block;width:100%;max-width:600px;height:auto;" /></a>
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:32px 40px 8px;">
            <h1 class="h1" style="margin:0 0 20px;font-family:Arial,Helvetica,sans-serif;font-size:27px;line-height:1.25;font-weight:bold;color:${C.navy};text-transform:uppercase;">${esc(subject)}</h1>
            ${body}
          </td>
        </tr>
        <tr>
          <td class="px" style="padding:8px 40px 0;">
            ${isFirst ? dem01Blocks() : offerBox()}
          </td>
        </tr>
        <tr>
          <td class="px btn" align="center" style="padding:30px 40px 10px;">
            ${button(cta, CONTACT)}
          </td>
        </tr>
        <tr>
          <td class="px" align="center" style="padding:6px 40px 34px;font-family:Arial,Helvetica,sans-serif;font-size:15px;color:${C.muted};">
            or call <a href="${PHONE_HREF}" style="color:${C.navy};font-weight:bold;text-decoration:none;">${PHONE}</a>
          </td>
        </tr>
        <tr>
          <td style="padding:26px 40px;background-color:${C.navyDark};font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.7;color:#a9c0d4;" align="center">
            <strong style="color:#ffffff;font-size:14px;">Utah Stem Cells</strong><br />
            9980 S 300 W, Suite 150, Sandy, UT 84070<br />
            <a href="${PHONE_HREF}" style="color:#a9c0d4;text-decoration:none;">${PHONE}</a> &nbsp;&middot;&nbsp;
            <a href="${BASE}/" style="color:#a9c0d4;text-decoration:underline;">utahstemcells.com</a>
            <br /><br />
            <span style="font-size:11px;color:#7f98ad;">You are receiving this email because you are a patient or contact of Utah Stem Cells.<br />
            <a href="{{ unsubscribe }}" style="color:#7f98ad;text-decoration:underline;">Unsubscribe</a></span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

// --- costruzione ---
const rows = parseCsv(readFileSync(join(ROOT, 'sep26-copy.csv'), 'utf8'));
const images = [
  '01-keep-doing-what-you-love.jpg', '02-dont-let-joint-pain-slow-you-down.jpg',
  '03-healthy-joints-brighter-days.jpg', '04-get-back-to-what-moves-you.jpg',
  '05-play-more-hurt-less.jpg', '06-more-movement-more-life.jpg',
];
const slugs = images.map((i) => i.replace(/\.jpg$/, ''));

const dems = rows.slice(1).filter((r) => r[0] && r[0].trim());
if (dems.length !== 6) throw new Error(`Attese 6 DEM, trovate ${dems.length}`);

const manifest = dems.map((r, i) => {
  const subject = r[0].trim();
  // le ultime righe del body (Contact/Phone/Web) diventano CTA e blocco telefono
  const lines = r[1].split('\n').map((l) => l.trim()).filter(Boolean)
    .filter((l) => !/^(Phone|Web):/i.test(l));
  const last = lines[lines.length - 1];
  const cta = /request more information/i.test(last) ? 'Request more information' : 'Contact us today';
  const paragraphs = lines.slice(0, -1).map(hi);

  const html = render({ n: i + 1, subject, paragraphs, cta, image: images[i], isFirst: i === 0 });
  writeFileSync(join(ROOT, 'html', `${slugs[i]}.html`), html);
  return { n: i + 1, slug: slugs[i], subject, cta, image: images[i], bytes: html.length };
});

writeFileSync(join(ROOT, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.table(manifest.map(({ n, subject, cta, bytes }) => ({ n, subject, cta, bytes })));
