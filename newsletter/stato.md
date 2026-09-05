# Stato del progetto — BILL / Campagna DEM Utah Stem Cells

Aggiornato: 5 settembre 2026

## Obiettivo

Creare una sequenza di DEM in American English per Utah Stem Cells, mantenendo sempre la stessa offerta:

- Articolazione già trattata: nuovo trattamento a **$2,200**.
- Nuova articolazione: **10% OFF** sul trattamento iniziale; dopo il primo trattamento, futuri ritrattamenti della stessa articolazione a **$2,200 per tutta la vita**.

Ogni creatività deve essere coerente con il relativo copy: anziani/coppie mature, hiking, running, golf o attività outdoor secondo il contenuto della DEM.

## Google Sheet

- File: **Newsletter**
- Foglio: **Sep26**
- URL: https://docs.google.com/spreadsheets/d/1_Xp-RRrQr2esyKuFkIJEi6HjNEyhIfZDItTbAssJ2jk/edit#gid=0
- Struttura: **Oggetto | Body | Creative**
- Le DEM sono separate da righe azzurre.

### Contenuto presente

| Riga | Oggetto | Soggetto della creatività | Stato |
|---:|---|---|---|
| 2 | KEEP DOING WHAT YOU LOVE | Coppia adulta / hiking | Presente |
| 4 | DON’T LET JOINT PAIN SLOW YOU DOWN | Coppia matura e attiva | Copy e creatività completi |
| 6 | HEALTHY JOINTS. BRIGHTER DAYS. | Uomo adulto / hiking | Copy e creatività completi; logo corretto senza riquadro nero |
| 8 | GET BACK TO WHAT MOVES YOU | Coppia di runner | Copy e creatività completi |
| 10 | PLAY MORE. HURT LESS. | Golfista maturo | Copy e creatività completi |
| 12 | MORE MOVEMENT. MORE LIFE. | Coppia matura / outdoor | Copy e creatività completi |

Le righe 4, 6, 8, 10 e 12 sono state verificate visivamente nel Google Sheet. Le immagini sono inserite nella colonna C e le righe hanno altezza adeguata alla visualizzazione.

## Logo ufficiale

File fornito dall’utente:

`/Users/alex/Desktop/c/Bill/logo.png`

Il logo deve essere usato nelle creatività senza riquadri neri visibili e integrato armoniosamente nel layout. Non deve essere sostituito con un logo inventato.

## Asset locali

Cartella:

`/Users/alex/.codex/.chatgpt-projects/g-p-6908cca5458881918621cb942919e5c9/output/dem`

File principali:

- `02-dont-let-joint-pain-slow-you-down.png`
- `03-healthy-joints-brighter-days-logo-v2.png` — versione definitiva della riga 6
- `04-get-back-to-what-moves-you.png`
- `05-play-more-hurt-less.png`
- `06-more-movement-more-life.png`

La precedente versione `03-healthy-joints-brighter-days-logo.png` aveva il logo dentro un riquadro nero ed è stata sostituita nel Google Sheet dalla versione `-v2`.

## Direzione visiva approvata

- Formato landscape, rapporto circa 3:2.
- Fotografia lifestyle realistica e premium.
- Ambientazioni Utah con luce naturale calda.
- Palette blu navy e teal coerente con Utah Stem Cells.
- Headline ben visibile, offerta sintetica e CTA.
- Soggetti maturi rappresentati come attivi, indipendenti e positivi.
- Evitare procedure mediche, aghi, anatomia invasiva, tono aggressivo o promesse cliniche aggiuntive.

## Prossima fase: template Brevo

L’utente vuole trasformare le DEM in template su Brevo, preferibilmente lavorando in Work.

Brevo consente di creare template email tramite API con `POST /v3/smtp/templates`. I template possono essere creati inizialmente come inattivi per la revisione.

### Dati ancora necessari

1. Chiave API Brevo configurata localmente come variabile `BREVO_API_KEY`.
   - **Non chiedere all’utente di incollarla in chat.**
   - Non salvare la chiave in questo file o in file tracciati.
2. Mittente verificato su Brevo:
   - Sender ID, oppure
   - nome e indirizzo email verificato.
3. Scelta del tipo di contenuto:
   - template transazionali riutilizzabili, oppure
   - campagne newsletter già predisposte.
4. Conferma che devono essere convertite tutte e 6 le DEM.
5. Hosting pubblico stabile delle creatività.
   - I link temporanei usati nelle formule `IMAGE()` del Google Sheet non sono adatti alle email definitive perché possono scadere.
   - Le immagini devono essere caricate nella libreria Brevo o su un URL HTTPS pubblico e stabile.

### Workflow consigliato

1. Leggere il foglio `Sep26` e recuperare oggetto/body definitivi.
2. Preparare un template HTML responsive comune, coerente con il brand.
3. Caricare o rendere pubbliche in modo stabile le cinque/sei creatività.
4. Creare i sei template Brevo come inattivi.
5. Recuperare gli ID restituiti da Brevo e registrarli in un riepilogo.
6. Generare e controllare le anteprime renderizzate.
7. Attivare i template solo dopo l’approvazione esplicita dell’utente.

## Vincoli operativi

- Non modificare i file sotto `sources/`; sono materiale sincronizzato di sola lettura.
- Conservare la struttura e il contenuto già approvati nel Google Sheet.
- Non inviare campagne o email senza una richiesta esplicita dell’utente.
- Non attivare automaticamente i template: crearli inattivi per la prima revisione, salvo indicazione diversa.
- Non esporre mai la chiave API Brevo nei log, nei file o nelle risposte.

## Ultima richiesta dell’utente

Creare questo file di stato per trasferire il lavoro in Work e proseguire lì con la creazione dei template Brevo.

---

# Aggiornamento — 5 settembre 2026 (sessione Claude Code)

## Fatto

1. **Testi**: recuperati tutti e 6 dal Sheet `Sep26` (esportabile in CSV senza credenziali) → `sett26/sep26-copy.csv`.
2. **Creatività**: le formule `=IMAGE()` delle righe 4–12 puntavano a URL firmati `oaiusercontent.com` **scaduti il 04/09 (HTTP 403)**. I master PNG sono stati messi in salvo in `sett26/creative-src/`. La creatività della riga 2 non era una formula ma un'**immagine incorporata**: estratta dall'export `.xlsx`.
3. **Ottimizzazione**: 6 JPEG 1200px, <200 KB ciascuno (da ~2,2 MB) in `sett26/creative-email/`.
4. **Hosting stabile**: pubblicati in `public/dem/` e deployati via FTP → `https://utahstemcells.com/dem/<slug>.jpg` (verificati HTTP 200).
5. **Template HTML**: 6 file responsive in `sett26/html/`, generati da `scripts/build-templates.mjs`.
   La DEM 01 ha l'hero ritagliato dall'immagine originale e i tre box offerta + trust badge **ricostruiti in HTML** (testo vero, non pixel).
6. **Brevo**: 6 template creati **inattivi**, sender ID 1 `Utah Stem Cells <info@utahstemcells.com>`, tag `dem-sep26`.

| # | Template ID | Oggetto |
|---:|---:|---|
| 01 | 5 | KEEP DOING WHAT YOU LOVE |
| 02 | 6 | DON'T LET JOINT PAIN SLOW YOU DOWN |
| 03 | 7 | HEALTHY JOINTS. BRIGHTER DAYS. |
| 04 | 8 | GET BACK TO WHAT MOVES YOU |
| 05 | 9 | PLAY MORE. HURT LESS. |
| 06 | 10 | MORE MOVEMENT. MORE LIFE. |

## Account Brevo (rilevato via API)

- Sender verificato: **ID 1** `Utah Stem Cells <info@utahstemcells.com>` (unico).
- Dominio `utahstemcells.com` **autenticato e verificato** (DKIM/DNS ok).
- Piano Marketing: 20.000 invii nel ciclo 04/09 → 04/10. Contatti totali: 4.503.
- Liste principali: **4** Women july 26 (2.964), **3** Men july 26 (1.424), **13** SC Joint tx — not converted (52), **12** SC Joint tx — converted (39).
- La chiave API ha la **restrizione IP attiva**: da riautorizzare se cambia l'IP pubblico.

## Da fare

- Verifica il link **Unsubscribe**: nei template è `{{ unsubscribe }}`, tag delle *campagne* Brevo. Va bene quando il template viene usato come campagna; in un invio transazionale resterebbe letterale.
- Decidere **targeting e calendario** degli invii (suggerimento: liste 12/13 per il messaggio sul ritrattamento, 3/4 per il volume).
- Rigenerare gli script `scripts/build-templates.mjs` + `push-to-brevo.mjs` dopo ogni modifica ai testi: sono idempotenti (il manifest tiene i `templateId` e passa a PUT).
