// Piano editoriale DEM Dic26 — wellness intimo maschile e femminile.
// NESSUN PREZZO: la regola 1 di STATO.md ammette cifre solo per le staminali.
// Fonti: pagine p-shot, o-shot, gainswave, votiva-femtite del sito.
// Tono: discreto, medico, mai allusivo. Nessuna promessa di risultato.

// Un disclaimer per tipo di trattamento: quello del PRP non vale per ormoni e BodyTite.
export const DISCLAIMERS = {
  prp: 'These treatments are not FDA-approved for any specific condition, and individual results vary. PRP is prepared from a small sample of your own blood. Whether a treatment is appropriate for you is decided by the physician after an individual evaluation.',
  hormones: 'Hormone therapy is prescribed and monitored by the physician on the basis of your lab work and an individual evaluation. Individual results vary. This information is for general education and is not a promise of any particular outcome.',
  device: 'FaceTite and BodyTite are physician-performed procedures. Individual results vary, and whether a procedure is appropriate for you is decided after an individual evaluation. This information is for general education and is not a promise of any particular outcome.',
};

const close = (line, url, kind = 'prp') => `${line}\n\nPhone: (801) 999-4860\n\nWeb: ${url}\n\n${DISCLAIMERS[kind]}`;

export const dems = [
  {
    oggetto: 'THE CONVERSATION MOST MEN NEVER HAVE',
    lista: 'Men - july 26',
    body: `Changes in performance, sensitivity or confidence are common as men get older. They are also, almost universally, not discussed — not with friends, often not even with a doctor.

That silence is the problem we can actually do something about.

At Utah Stem Cells there are two non-surgical options, both performed in-office by a physician:

The P-Shot is an injection prepared from a small sample of your own blood. Your blood is drawn, the platelet-rich plasma is separated from it, and it is administered in a short appointment.

GAINSWave uses acoustic waves. No needles, no downtime, delivered over a series of short sessions.

Which one makes sense, or whether either does, is a clinical judgement. The physician reviews your history and tells you honestly what is and is not likely to help.

The appointment is discreet. So is everything that follows.

${close('Book a consultation and ask the questions you have not asked anyone else.', 'https://utahstemcells.com/p-shot/')}`,
    creative: `Landscape 3:2. Navy panel left, photograph right: composed man in his mid fifties outdoors in morning light, fully clothed, calm and self-assured.
Headline: THE CONVERSATION / MOST MEN NEVER HAVE.
Subline: Two non-surgical options, both physician-performed, both discreet.
Two cards: "P-SHOT — prepared from your own blood" and "GAINSWAVE — acoustic waves, no needles".
CTA button: BOOK A CONSULTATION. Logo top left, navy/teal palette.
Avoid: anything suggestive or allusive, bedrooms, couples in intimate poses, bare skin, innuendo, silhouettes, "before and after", needles.`,
  },
  {
    oggetto: 'WHAT NOBODY TELLS YOU TO EXPECT',
    lista: 'Women - july 26',
    body: `Dryness. Reduced sensation. A sense that things are not quite what they were. After childbirth, through hormonal change, or simply over time.

These are common, and they are rarely talked about. Many women live with them for years without ever being told what options exist, or who to ask.

At Utah Stem Cells there are two non-surgical options, both performed in-office by a physician:

The O-Shot is an injection prepared from a small sample of your own blood — the platelet-rich plasma is separated from it and administered in a short appointment.

Votiva and FemTite use gentle radiofrequency energy. No surgery, minimal downtime, delivered in-office.

Whether either is appropriate for you is decided after an evaluation, not from a web page. The physician will tell you plainly what these treatments can and cannot address.

You are entitled to a straightforward conversation about this.

${close('Book a consultation and get a direct answer.', 'https://utahstemcells.com/o-shot/')}`,
    creative: `Landscape 3:2. Navy panel left, photograph right: composed woman in her early fifties seated by a window in soft daylight, fully clothed, serene and self-possessed.
Headline: WHAT NOBODY / TELLS YOU TO EXPECT.
Subline: Common, rarely discussed, and there are options worth knowing about.
Two cards: "O-SHOT — prepared from your own blood" and "VOTIVA / FEMTITE — gentle radiofrequency".
CTA button: BOOK A CONSULTATION. Logo top left, navy/teal palette.
Avoid: anything suggestive or allusive, bedrooms, lingerie, bare skin, flowers used as euphemism, innuendo, "before and after".`,
  },

  {
    oggetto: 'WHEN SLEEP DOES NOT FIX IT',
    lista: 'Men + Women - july 26',
    body: `Fatigue that a good night's sleep does not touch. A flatter mood. Changes in drive or focus. Not feeling quite like yourself, without being able to point at a reason.

As hormone levels shift with age, many men and women notice exactly this. The difficult part is knowing whether hormones are actually part of the picture, because the symptoms are the same ones a dozen other things cause.

That is a question answered by testing, not by guessing.

Hormone pellet therapy uses tiny bioidentical pellets placed just under the skin, releasing steadily over several months rather than in the peaks and valleys some other methods produce.

What matters more than the method is how it is run. Your plan begins with lab work, is overseen by Dr. William Cimikoski rather than a generic protocol, and is adjusted over time based on how you actually respond.

If hormones turn out not to be the cause, you will be told that too.

${close('Book a consultation and start with the lab work.', 'https://utahstemcells.com/hormone-pellet-therapy/', 'hormones')}`,
    creative: `Landscape 3:2. Navy panel left, photograph right: man and woman early fifties walking outdoors in early morning light, alert and energetic, ordinary clothes.
Headline: WHEN SLEEP / DOES NOT FIX IT.
Subline: Fatigue, low mood, changes in drive. Hormones may be part of it — testing is how you find out.
Two cards: "LAB-GUIDED — your plan starts with testing" and "PHYSICIAN-MANAGED — overseen by Dr. Cimikoski, adjusted over time".
CTA button: BOOK A CONSULTATION. Logo top left, navy/teal palette.
Avoid: pills, syringes, supplement bottles, gym or fitness-brand styling, "anti-ageing" visual clichés, before-and-after.`,
  },
  {
    oggetto: 'FIRMER WITHOUT A SURGICAL LIFT',
    lista: 'Men + Women - july 26',
    body: `Skin loosens over time — with age, after weight changes, after pregnancy. A softening along the jawline, some laxity under the chin, areas of the abdomen or arms that no longer feel as firm as they did.

The usual choice presented is to live with it or to have surgery. There is a third option worth understanding before you decide.

FaceTite and BodyTite deliver radiofrequency energy just beneath the skin to tighten and refine areas that have lost firmness. The physician works through very small entry points rather than the larger incisions of traditional surgery, which means less downtime.

FaceTite addresses the face and neck — jowls, jawline, the area under the chin. BodyTite addresses larger areas: abdomen, upper arms, thighs, flanks, knees and back.

Both are performed by the physician. Whether either suits you, and what it can realistically achieve, is settled at an evaluation rather than from a web page.

${close('Book a consultation and find out what is realistic.', 'https://utahstemcells.com/facetite-bodytite/', 'device')}`,
    creative: `Landscape 3:2. Navy panel left, photograph right: woman late forties standing in a bright calm room by a window, fully clothed, relaxed and self-assured.
Headline: FIRMER WITHOUT / A SURGICAL LIFT.
Subline: Radiofrequency delivered beneath the skin, through very small entry points.
Two cards: "FACETITE — jawline, jowls, under the chin" and "BODYTITE — abdomen, arms, thighs, flanks, back".
CTA button: BOOK A CONSULTATION. Logo top left, navy/teal palette.
Avoid: before-and-after, measuring tape, hands pinching skin, swimwear or underwear, exposed midriff, mirrors, body-shaming framing.`,
  },
];
