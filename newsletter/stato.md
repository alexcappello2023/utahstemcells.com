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
- Fuso orario account: **`America/Denver`** (impostato il 05/09/2026, prima era Los Angeles). Gli orari di programmazione si inseriscono quindi **direttamente in ora dello Utah**. Formato 24 ore, date dd-mm-yyyy.

## Campagne in bozza (Campaigns → Email) — 5 settembre 2026

Create con `POST /v3/emailCampaigns` **senza `scheduledAt` e senza `listIds`**: restano in bozza, non possono partire. Script: `scripts/create-campaigns.mjs` (idempotente, passa a PUT se il manifest ha già il `campaignId`).

| # | Campaign ID | Oggetto |
|---:|---:|---|
| 01 | 11 | KEEP DOING WHAT YOU LOVE |
| 02 | 12 | DON'T LET JOINT PAIN SLOW YOU DOWN |
| 03 | 13 | HEALTHY JOINTS. BRIGHTER DAYS. |
| 04 | 14 | GET BACK TO WHAT MOVES YOU |
| 05 | 15 | PLAY MORE. HURT LESS. |
| 06 | 16 | MORE MOVEMENT. MORE LIFE. |

Il corpo si modifica nell'**editor HTML** di Brevo (non nel drag & drop): è la conseguenza di aver passato `htmlContent` grezzo. Oggetto, mittente, destinatari e programmazione si gestiscono normalmente dall'interfaccia.

I template transazionali ID 5–10 restano inattivi come archivio: `POST /v3/smtp/templates` crea **template transazionali** (Transactional → Email → Templates), che non compaiono in Marketing. `isActive` li rende invocabili via API transazionale, non li sposta di sezione.

Precedente campagna marketing inviata: **"Membership Launch!"** (25/08/2026) alle liste 2, 3, 8, 7, 4.

## Da fare

- Verifica il link **Unsubscribe**: nei template è `{{ unsubscribe }}`, tag delle *campagne* Brevo. Va bene quando il template viene usato come campagna; in un invio transazionale resterebbe letterale.
- Assegnare **liste e data** alle 6 bozze e inviare dall'interfaccia (suggerimento: liste 12/13 per il messaggio sul ritrattamento, 3/4 per il volume).
- Rigenerare gli script `scripts/build-templates.mjs` + `push-to-brevo.mjs` dopo ogni modifica ai testi: sono idempotenti (il manifest tiene i `templateId` e passa a PUT).

---

# Tab ott26 — categoria Galleri (7 ottobre 2026)

Nuovo tab **`ott26`** nello stesso Google Sheet (gid `2077370776`), schema identico a Sep26: `Oggetto | Body | Creative`, 12 righe (intestazione, 6 DEM, 5 separatori `#A4C2F4`).

Sorgenti versionati in `newsletter/ott26/`:
- `content.mjs` — testi e brief creativi (unica fonte di verità)
- `build.mjs` — genera `ott26-piano.csv` (riferimento) e `ott26-piano.html` (tabella da incollare nel Sheet)

Il Sheet non è scrivibile via API (nessun connettore Google): il tab è stato creato e popolato guidando Chrome sulla sessione Google dell'utente, incollando la tabella HTML dalla clipboard per preservare gli a capo dentro le celle.

| # | Oggetto | Angolo |
|---:|---|---|
| 1 | ONE BLOOD DRAW. MORE THAN 50 CANCERS. | annuncio della nuova categoria |
| 2 | IN ADDITION TO YOUR SCREENING. NEVER INSTEAD OF IT. | il fraintendimento da disinnescare subito |
| 3 | THE CANCERS NOBODY SCREENS FOR | il vuoto che Galleri copre |
| 4 | WHAT YOUR RESULT ACTUALLY MEANS | onestà sui due esiti possibili |
| 5 | IS THE GALLERI TEST RIGHT FOR YOU? | qualificazione, inclusi i casi in cui è no |
| 6 | HOW THE GALLERI TEST WORKS HERE | processo e supervisione del medico |

## Vincoli di contenuto applicati

- Ogni body chiude con la **Important Safety Information** di GRAIL (non FDA-approved, non rileva tutti i tumori, da usare *in aggiunta* allo screening di routine, falsi positivi e negativi, Rx only).
- **Nessun prezzo**: la pagina `/galleri-test/` non ne riporta e la regola del sito vieta i costi. Da decidere con il cliente se inserirli nelle DEM, come fatto per Sep26.
- Nessun tono allarmistico, nessuna promessa di diagnosi precoce, nessuna immagine di aghi o procedure.
- CTA sempre "Book a consultation" (mai "free consultation").

## Creatività — fatte (8 ottobre 2026)

Tutte e sei prodotte e inserite nella colonna C come `=IMAGE("https://utahstemcells.com/dem-ott26/<slug>.jpg")`.
Gli URL sono **permanenti** (deploy FTP del sito), non link temporanei come in Sep26.

Pipeline in `newsletter/ott26/` — vedi `README.md`:
- fotografia generata con AI **senza testo**, con spazio negativo a sinistra (01, 02, 04, 05);
- 03 interamente in HTML (visualizzazione dati, nessuna foto);
- 06 con le **foto reali**: `clinic-reception-v5.webp` e `dr-cimikoski.jpeg` del sito;
- testo + `logo.svg` ufficiale composti in HTML, render Chrome headless 1536×1024;
- `build-creatives.mjs` genera i sei HTML da un layout condiviso: per correggere un testo si modifica il config e si rirenderizza.

I brief creativi che prima stavano in colonna C restano in `content.mjs` (campo `creative`).

## Da fare

- Decidere se le DEM devono riportare un prezzo e quale.
- Verificare se GRAIL impone requisiti di approvazione o co-branding sul materiale marketing dei partner, e come vuole sia citato il marchio Galleri®.
- Sostituire le creatività rotte del tab Sep26 con gli URL stabili `utahstemcells.com/dem/` (le formule `=IMAGE()` originali sono scadute).
- Costruire i template/campagne Brevo per ott26, come fatto per Sep26.

---

# Sequenza email ott26 su Brevo (9 ottobre 2026)

## Campagne in bozza

Create con `POST /v3/emailCampaigns`, **senza `scheduledAt` e senza `listIds`**: non possono partire.
Script: `newsletter/ott26/create-campaigns.mjs` (idempotente, passa a PUT con il `campaignId` del manifest).

| # | Campaign ID | Oggetto |
|---:|---:|---|
| 01 | 17 | ONE BLOOD DRAW. MORE THAN 50 CANCERS. |
| 02 | 18 | IN ADDITION TO YOUR SCREENING. NEVER INSTEAD OF IT. |
| 03 | 19 | THE CANCERS NOBODY SCREENS FOR |
| 04 | 20 | WHAT YOUR RESULT ACTUALLY MEANS |
| 05 | 21 | IS THE GALLERI TEST RIGHT FOR YOU? |
| 06 | 22 | HOW THE GALLERI TEST WORKS HERE |

Template generati da `newsletter/ott26/build-emails.mjs` in `newsletter/ott26/email/`:
hero dalle creatività su `/dem-ott26/`, link a `/galleri-test/`, ISI in un blocco dedicato sopra il footer.

## Prima ondata programmata (approvata il 09/10/2026)

Liste **4 (Women - july 26, 2.964)** + **3 (Men - july 26, 1.424)** = 4.388 destinatari per invio.
Script: `newsletter/ott26/schedule-campaigns.mjs`.

| ID | Campagna | Invio | Stato |
|---:|---|---|---|
| 17 | 01 — ONE BLOOD DRAW | ven 9 ott, 10:00 MDT | queued |
| 18 | 02 — IN ADDITION. NEVER INSTEAD | mer 14 ott, 10:00 MDT | queued |
| 21 | 05 — IS THIS TEST RIGHT FOR YOU? | mer 21 ott, 10:00 MDT | queued |

Calendario rivisto il 09/10: primo invio anticipato a oggi, secondo e terzo riportati al mercoledì.
Intervallo fra il primo e il secondo invio: **5 giorni**, non 7.

Totale 13.164 invii sui 20.000 del ciclo 04/10 → 04/11.
Le campagne **19, 20, 22** (DEM 03, 04, 06) restano in bozza per una seconda ondata a novembre,
da mirare su chi ha aperto o cliccato.

Per fermare o modificare un invio: Campaigns → Email → la campagna → *Unschedule*, oppure
`PUT /v3/emailCampaigns/<id>` con `scheduledAt` nullo. Va fatto **prima** dell'orario di invio.

## Invii di prova

Indirizzo fisso per i test: **alex.cappello@gmail.com**.

Brevo rifiuta `sendTest` verso un indirizzo che non sia un contatto appartenente ad almeno una lista
(`Test emails cannot be sent to non-existent/blacklisted/without-contact-list users`). Il contatto
esisteva (id 4526) ma era senza liste, quindi è stata creata la lista **14 "Test interni"** apposta.
Non va mai usata come destinataria di campagne.

Test delle tre campagne della prima ondata inviati il 09/10/2026 (HTTP 204).
Attenzione: i `sendTest` **non generano statistiche**, quindi non verificano il tracciamento dei click.

## Risultati Sep26 (per riferimento)

Inviate tutte alla **sola lista 12** (SC Joint — converted), ~35 destinatari, dal 5 al 28 settembre.

| ID | Data | Consegnate | Aperture uniche | Click unici | Disiscr. |
|---:|---|---:|---:|---:|---:|
| 11 | 05/09 | 35 | 9 (25,7%) | 0 | 0 |
| 12 | 09/09 | 35 | 5 (14,3%) | 0 | 0 |
| 13 | 12/09 | 35 | 6 (17,1%) | 0 | 0 |
| 14 | 16/09 | 35 | 7 (20,0%) | 0 | 0 |
| 15 | 20/09 | 35 | 8 (22,9%) | 0 | 1 |
| 16 | 28/09 | 34 | 6 (17,6%) | 0 | 0 |

**Zero click su tutte e sei** (dato da `campaignStats`; il campo `globalStats` della lista campagne
restituisce un valore fuorviante). Non è un problema di tracciamento: `linksStats` registra entrambi
i link (`/` e `/contact/`) con contatore a 0, quindi erano tracciabili e nessuno li ha aperti.
Su ~209 consegne complessive è un segnale, non rumore: lo schema non va replicato tale e quale.

## Vincoli da tenere presenti

- **Nessun attributo età** fra gli attributi contatto: impossibile segmentare i 50+, che sono il pubblico indicato per Galleri.
- **Limite di invio 20.000/mese** (ciclo 04/10 → 04/11). Sei email a Women+Men (4.388) farebbero 26.328: non ci stanno in un ciclo.
- La restrizione IP sull'account Brevo è stata **disattivata** il 09/10/2026.

---

# Risultati primo invio ott26 — campagna 17, 9 ottobre 2026

Partita alle 10:23 MDT (Brevo accoda, non parte al secondo esatto).

| Metrica | Valore | Su consegnate |
|---|---:|---:|
| Inviate | 3.517 | |
| Consegnate | 3.420 | 97,2% |
| Aperture uniche | 665–680 | ~19,5% |
| Click | **6–9** (vedi nota) | ~0,2% |
| Disiscrizioni | 25 | 0,73% |
| Soft bounce | 100 | 2,9% |
| Hard bounce | 2 | 0,06% |
| Segnalazioni spam | 4 | 0,12% |

Dettaglio per lista: **Men (3)** 1.141 consegnate, 278 aperture, 3 click, 12 disiscr. —
**Women (4)** 2.331 consegnate, 387 aperture, 3 click, 13 disiscr.

## Due trappole nei dati di Brevo

1. **`campaignStats` è un array con una riga per lista.** Leggere solo `[0]` dà i numeri di una
   lista sola (1.141 invece di 3.420). Vanno sommate tutte le righe.
2. **`globalStats.uniqueClicks` è inaffidabile.** Riporta 43 click, ma `linksStats` conta 9 click
   totali sui due link tracciati (`/` 6, `/galleri-test/` 3) e la somma per lista dà 6 click unici.
   Un valore di click unici non può superare i click totali. Stessa anomalia a settembre
   (globalStats 9, realtà 0). Fidarsi di `linksStats` + somma di `campaignStats`.

## Destinatari reali: 3.517, non 4.388

Le liste dichiarano 4.388 iscritti unici ma includono i blacklisted: Women 585, Men 262.
I contattabili erano 3.541, gli inviati 3.517. Brevo esclude i blacklisted in automatico.
**Per i preventivi di invio usare i contattabili, non `uniqueSubscribers`.**

## Lettura

Consegna e aperture nella norma. Il problema è il click: ~0,2%, cioè il tema interessa
(uno su cinque apre) ma la CTA non converte. Il tracciamento funziona, quindi non è un problema
tecnico: è la call to action.

## CTA rivista (13 ottobre 2026)

Dopo il primo invio — 19,5% aperture, ~0,2% click, e **6 click su 9 andati alla home** invece che
alla landing — la CTA è passata da "Book a consultation" a un invito a leggere, specifico per DEM.
La prenotazione resta sotto il bottone: *"Prefer to talk it through? Book a consultation on (801) 999-4860"*.

| # | ID | CTA |
|---:|---:|---|
| 01 | 17 | Book a consultation *(invariata: già inviata)* |
| 02 | 18 | See where each one fits |
| 03 | 19 | See what Galleri looks for |
| 04 | 20 | See what each result means |
| 05 | 21 | See if it applies to you |
| 06 | 22 | See how the test works here |

Cambiata **sia nel bottone dell'email sia dentro la creatività**, che aveva "BOOK A CONSULTATION"
inciso nell'immagine. Creatività 02-06 rigenerate e ripubblicate su `/dem-ott26/` (stessi URL,
quindi le campagne già programmate puntano automaticamente alle nuove).

**Una campagna già inviata non è aggiornabile**: Brevo risponde `405 method_not_allowed`.
`create-campaigns.mjs` ora salta le campagne in stato `sent`.

Test della 18 inviato a alex.cappello@gmail.com il 13/10.

---

# Tab Nov26 — staminali, leva sul prezzo (19 ottobre 2026)

**12 DEM**, schema `Oggetto | Body | Creative`, 24 righe (intestazione, 12 DEM, 11 separatori `#A4C2F4`).
gid `286234867`. Sorgenti in `newsletter/nov26/` (`content.mjs`, `build.mjs`).

Arco: offerta → meccanica del prezzo → trasparenza → fiducia → onestà clinica → chiusura.

| # | Oggetto |
|---:|---|
| 1 | $6,000 ONCE. $2,200 EVERY TIME AFTER. |
| 2 | THE SECOND TREATMENT COSTS THE SAME AS THE TENTH |
| 3 | A DIFFERENT JOINT. THE SAME PRICE. |
| 4 | OUR PRICES ARE ON OUR WEBSITE |
| 5 | TWO NUMBERS. NO PACKAGES. NO TIERS. |
| 6 | WHAT HAPPENS WHEN THE OTHER KNEE GOES |
| 7 | YOU SHOULD NOT HAVE TO CALL TO FIND OUT THE PRICE |
| 8 | THE PRICE IS THE EASY PART |
| 9 | KNEE TODAY. SHOULDER IN THREE YEARS. STILL $2,200. |
| 10 | WHERE THE CELLS ACTUALLY COME FROM |
| 11 | WHAT THE FIRST TREATMENT ACTUALLY INCLUDES |
| 12 | ASK US ANYTHING ABOUT THE PRICE |

## Conformità verificata

Solo `$6,000` e `$2,200`, nessun'altra cifra. Nessun confronto con concorrenti o chirurgia.
Nessun "cheap/affordable/discount/% off/free consultation". Staminali sempre come donate
(cordone + amniotico) con PRP autologo. Disclaimer FDA in tutte e 12.

**Il confronto "i concorrenti chiedono 10.000 USD" non è stato inserito**: è una dichiarazione
comparativa non documentata, vietata dalla regola 1 di `STATO.md`. La leva usata è quella
documentabile e già pubblicata sul sito: 6.000 una volta, poi 2.200 per sempre, per qualunque zona.

## Sito: già fatto

Le cifre erano già su `stem-cell-joint-regeneration` e `iv-stem-cell-therapy` (sezione
"Straightforward pricing" + FAQ), verificate live in produzione il 19/10. Nessuna modifica necessaria.

## Creatività Nov26 — fatte (19 ottobre 2026)

Dodici grafiche 1536×1024, inserite in colonna C del tab Nov26 come
`=IMAGE("https://utahstemcells.com/dem-nov26/<slug>.jpg")`. URL permanenti (deploy FTP), verificati
byte per byte contro i file locali. Sorgenti e generatore in `newsletter/nov26/`.

| Tipo | Creatività | Come è fatta |
|---|---|---|
| Fotografia AI | 01, 03, 06, 09, 12 | foto generata senza testo, spazio negativo a sinistra |
| Tipografica | 02, 04, 05, 07, 10 | interamente HTML su fondo navy, nessuna foto |
| Foto reali | 08, 11 | `clinic-reception-v5.webp` e `dr-cimikoski.jpeg` del sito |

`build-creatives.mjs` genera i dodici HTML da tre layout condivisi (`photo`, `typo`, `clinic`):
per correggere un testo si modifica il config e si rirenderizza, senza rigenerare le fotografie.

**Due trappole incontrate, già corrette nel file:**
- `.duo div` e `.pairs div` colpivano anche i div annidati, disegnando un riquadro dentro il riquadro.
  Servono i selettori figlio diretto (`.duo>div`).
- I layout senza fotografia partono in alto e lasciano un vuoto in fondo: vanno fatti partire più in
  basso (`top`) e ingranditi. Con headline su tre righe, però, sforano sotto la fascia ISI: 05 e 07
  hanno richiesto `top` ridotto e font più piccolo.

---

# Mappa delle liste Brevo (19 ottobre 2026)

Conteggi ottenuti **scorrendo tutti i contatti uno per uno**, non dal campo `totalBlacklisted`
dell'elenco liste, che riporta 0 ovunque ed è inaffidabile (la GET sulla singola lista invece è corretta).

| ID | Lista | In lista | Contattabili | Nuovi rispetto a Women+Men | Campagne ricevute |
|---:|---|---:|---:|---:|---|
| 4 | Women - july 26 | 2964 | 2367 | — | 4 |
| 3 | Men - july 26 | 1424 | 1149 | — | 4 |
| 13 | SC Joint tx — not converted | 52 | 47 | **47** | mai scritto |
| 12 | SC Joint tx — converted | 39 | 34 | 31 | 6 |
| 6 | Contacts involved in conversations | 25 | 21 | 12 | mai scritto |
| 7 | Website | 18 | 17 | 16 | 1 |
| 11 | P-Shot Tx List | 19 | 14 | 9 | mai scritto |
| 8 | Social | 92 | **3** | 1 | 1 |
| 14 | Test interni | 1 | 1 | 0 | mai scritto |
| 2 | La tua prima lista | 1 | 1 | 0 | 1 |

- **Contatti totali: 4.533. Contattabili: 3.566** (967 disiscritti o in blacklist, il **21,3%**).
- Nessun contatto è fuori da tutte le liste.
- **Women + Men deduplicate = 3.462**, cioè il 97% dell'universo raggiungibile. 54 persone sono in entrambe (Brevo deduplica da solo).
- Tutte le liste piccole insieme aggiungono solo **103 persone nuove**.
- **La lista 13 non ha alcuna sovrapposizione con Women/Men**: quei 47 non hanno mai ricevuto nulla.
- **La lista 8 "Social" è morta**: 92 iscritti, 3 contattabili. 97% disiscritti.

## Capacità di invio

Un invio a tutti i contattabili costa **3.565** crediti. Il piano ne dà 20.000 al mese.

- 12 email a tutti = **42.780 invii**, cioè ~2,1 cicli mensili.
- Nel ciclo corrente (04/10 → 04/11) restano **12.997** crediti: 3 invii a tutti.

## Campagne Nov26 create (19 ottobre 2026) — opzione "liste calde + selezione sulle grandi"

Due flussi, tutte **bozze senza data**. Script: `newsletter/nov26/create-campaigns.mjs`.

**Flusso W — tutte e 12 alle liste calde** (13, 12, 6, 7, 11): **120 destinatari** deduplicati.

| DEM | ID | DEM | ID | DEM | ID |
|---:|---:|---:|---:|---:|---:|
| 01 | 23 | 05 | 29 | 09 | 34 |
| 02 | 25 | 06 | 30 | 10 | 35 |
| 03 | 26 | 07 | 31 | 11 | 37 |
| 04 | 28 | 08 | 33 | 12 | 38 |

**Flusso B — 5 DEM a Women+Men** (01, 03, 07, 10, 12), scelte perché autonome e comprensibili
senza le altre: ID **24, 27, 32, 36, 39**. Ciascuna **esclude le liste calde**
(`recipients.exclusionListIds`), così i 17 contatti presenti in entrambi i gruppi non ricevono
due volte lo stesso messaggio. Destinatari: **3.445**.

Costo: 12 × 120 = 1.440 + 5 × 3.445 = 17.225 → **18.665 invii**. Il ciclo corrente
(04/10 → 04/11) ha **12.997** crediti residui, quindi il flusso B va spalmato su due cicli.

Template email generati da `newsletter/nov26/build-emails.mjs`: hero da `/dem-nov26/`,
link a `/stem-cell-joint-regeneration/`, riquadro con le due cifre, disclaimer sopra il footer.


## Calendario Nov26 programmato (19 ottobre 2026)

Partenza **oggi**, su richiesta dell'utente. Tutte e 17 in stato `queued`, orario 10:00 America/Denver.
Script: `newsletter/nov26/schedule-campaigns.mjs`.

| Data | Flusso W (120 dest.) | Flusso B (3.445 dest.) |
|---|---|---|
| lun 19 ott | W01 (23) | **B01 (24)** |
| lun 26 ott | W02 (25) | — |
| lun 2 nov | W03 (26) | B03 (27) |
| lun 9 nov | W04 (28) | — |
| lun 16 nov | W05 (29) | B07 (32) |
| lun 23 nov | W06 (30) | — |
| lun 30 nov | W07 (31) | B10 (36) |
| lun 7 dic | W08 (33) | — |
| lun 14 dic | W09 (34) | B12 (39) |
| *21 e 28 dic* | *pausa festività* | — |
| lun 4 gen | W10 (35) | — |
| lun 11 gen | W11 (37) | — |
| lun 18 gen | W12 (38) | — |

**Attenzione al cambio ora**: gli Stati Uniti passano a MST il 1° novembre. Dal 2 novembre in poi
le 10:00 di Denver sono le **17:00 UTC**, non le 16:00. Lo script lo calcola da solo; se si aggiungono
date future va mantenuta quella logica.

Consumo per ciclo: 04/10→04/11 = 7.250 invii (su 12.997 residui); 04/11→04/12 = 7.370; 04/12→04/01 = 3.925.
Tutti entro il limite di 20.000.

## Galleri sospeso (19 ottobre 2026)

Decisione dell'utente: fermare la sequenza sul cancro e lasciare spazio a quella sulle staminali.

| ID | DEM | Stato |
|---:|---|---|
| 17 | 01 ONE BLOOD DRAW | inviata 09/10 — non annullabile |
| 18 | 02 IN ADDITION | inviata 14/10 — non annullabile |
| 19, 20, 22 | 03, 04, 06 | bozze, mai programmate |
| 21 | 05 IS THIS TEST RIGHT FOR YOU? | **suspended** (era per il 21/10) |

**Come si sospende una campagna in coda**: `PUT /v3/emailCampaigns/<id>/status` con
`{"status":"suspended"}`. Due trappole verificate il 19/10:
- `PUT /v3/emailCampaigns/<id>` con `scheduledAt: null` risponde **204 ma non cancella la data**:
  la campagna resta con la vecchia data accanto allo stato `suspended`. È solo cosmetico, non parte.
- Da `suspended` **non si può tornare a `draft`**: risposta `400 draft is an invalid status for
  suspended campaign`. Per riusare quel contenuto serve una campagna nuova.

Restano in coda **17 campagne, tutte staminali**. Nessuna Galleri partirà più.

Capacità liberata nel ciclo corrente: i 3.445 invii del 21/10. Dopo gli invii di oggi e il resto
del piano fino al 4/11 restano circa **5.700 invii inutilizzati**: c'è spazio per portare il flusso B
da 5 a 7 DEM, se si decide di coprire di più le liste grandi.
