# STATO — utahstemcells.com

> Handoff per riprendere il lavoro in una nuova chat. Progetto: **Utah Stem Cells**
> (clinica di medicina rigenerativa + med-spa, Sandy, UT — Medical Director Dr. William Cimikoski).
> Sito **Astro** statico, deploy su cPanel `/public_html` via FTP. Repo GitHub: `alexcappello2023/utahstemcells.com`.
> Working dir: `/Users/alex/Desktop/Claude/utahstemcells`. Ultimo aggiornamento: 2026-09-04.

## ⚠️ REGOLE ASSOLUTE DI CONTENUTO (non violare mai)
1. **MAI parlare di COSTI/PREZZI**: niente cifre, valuta, "how much", fasce, confronti economici/assicurativi.
2. **Origine cellule staminali**: le staminali provengono da **cordone ombelicale + amniotico DONATI** (allogeniche, di laboratorio), **NON prelevate dal paziente**. Il **PRP è autologo** (sangue del paziente) — ok dirlo. Il **fat transfer** usa grasso autologo — ok. **MAI dire che la clinica usa staminali autologhe** (adipose/midollo).
3. **MAI scrivere "free consultation"** (la consulenza non è gratuita). Usare "Book a consultation".
4. Toni YMYL prudenti: niente promesse di guarigione, non FDA-approved dove pertinente, idoneità decisa dal medico.
5. Progetti separati: **non citare mai Metalpress/funiacciaio** in questo progetto.
6. Immagini sempre a colori, pertinenti; il dottore nelle foto è il vero Dr. Cimikoski.

## Architettura (essenziale)
- URL **flat a root**: trattamenti/condizioni/locations stanno su `utahstemcells.com/<slug>/` (hub restano `/treatments/`, `/conditions/`, `/locations/`). Dispatcher: `src/pages/[...slug].astro` → componenti `TreatmentArticle` / `ConditionArticle` / `LocationArticle` / `BlogArticle`. SEO preservata con 301 in `public/.htaccess`.
- Menu Treatments a 2 gruppi ("Regenerative & Wellness" / "Aesthetics & Body"), link diretti (no anchor). `src/components/Header.astro`, buckets in `src/consts.ts`.
- `public/site-head.js`: iniettore <head> editabile sul server (analytics/pixel) senza rebuild.
- Blog: 36 articoli in `src/content/blog/`.

## Lead form (FATTO — live in produzione)
- Nuovo componente **`src/components/LeadForm.astro`** (riutilizzabile). Backend identico al form Contact:
  **Web3Forms** (email + redirect a `/thank-you/`) **+ `navigator.sendBeacon`** al webhook **Make** (`https://hook.eu1.make.com/sh64luy2jr3vt0ina5j2xbg35bqqm70r`) → **Brevo**.
- **3 form per pagina trattamento** (`TreatmentArticle.astro`): in alto (dopo hero, `id="request"`), a metà, in fondo. Sostituite le 2 vecchie bande CTA a soli bottoni.
- Campi: Name, Email, Phone, **Which treatment are you interested in?** (precompilato col trattamento, editabile), **What are you experiencing, and how can we help?**, Message (opzionale). Campi liberi, **no select**. Subject **rimosso**.
- Lo `<script>` del componente è bundlato **una sola volta** e lega tutti i form via `form.js-lead-form`.
- **Conditions/Locations: NIENTE form** (scelta del cliente).
- Pulsante hero **"Book a consultation"** → scrolla al primo form (`#request`) con focus sul primo campo; handler globale in `src/layouts/BaseLayout.astro` (`a[data-scroll-form]`) con **fallback** alla prenotazione dove il form non c'è. **Header "Book a visit" invariato**.
- Thank-you page: `src/pages/thank-you/index.astro` → live (HTTP 200).

### ⏳ DA FARE (lead form)
- In **Make**, mappare i **2 nuovi campi** `treatment` e `problem` (arrivano già nel webhook ma non sono agganciati a Brevo). Eventualmente crearli come **attributi contatto** in Brevo.

## Automazione blog (FATTO — attiva)
- Workflow `.github/workflows/genera-articolo.yml`: **4 articoli/mese**, cron `37 6 1,8,15,22 * *` (giorni **1, 8, 15, 22** ore 06:37 UTC = notte in Utah) + `workflow_dispatch`.
- Pipeline: conta topic → rifornisci se <6 → genera (Claude Code CLI `--model claude-sonnet-5`) → `prepare-article` (hero Pexels + frontmatter atomico) → update-plan → build → commit → **FTP deploy** (SamKirkland action). Regole no-costi/sourcing/doppi apici nei prompt.
- Deploy manuale: workflow **"Deploy sito (FTP)"** (`workflow_dispatch`). Lanciabile via `gh workflow run "Deploy sito (FTP)" --ref main` (gh già autenticato come `alexcappello2023`).
- Script chiave in `scripts/`: `prepare-article.mjs`, `update-plan.mjs`, `remaining-topics.mjs`, `next-keyword.mjs`. Topic in `keywords/keyword-utahstemcells.csv`. Piano in `PIANO-EDITORIALE.md`. Istruzioni in `routine/genera-articolo.md`.
- **Serve credito Anthropic** attivo (già esaurito 2 volte): tenere **Auto-reload** su console.anthropic.com → Billing.

## Brevo / newsletter (IN CORSO)
- Account **nuovo** (il precedente sospeso). Dominio autenticato: sender `info@utahstemcells.com`, DKIM/DMARC ok, IP condiviso.
- 2 liste: **Women - july 26** (2964) + **Men - july 26** (1424) = **4398** contatti (solo nome/email/telefono).
- Piano **warm-up** sfruttando il limite free **300 email/giorno**: dividere in ~15 batch da ~300, 1 batch/giorno (~15 giorni). Monitorare bounce/spam dopo i primi 2-3 batch.
- Per la newsletter mensile a regime (invio unico a 4398) servirà un **piano Brevo a pagamento** (il free 300/gg non basta).
- Prossimo step: l'utente esporta le 2 liste CSV → io le splitto in batch + calendario invio. Prima email di ri-benvenuto già bozzata (value-first, no PHI/costi).

## Idee/future
- **Dashboard di approvazione** articoli per il cliente (approva/modifica/rifiuta+rigenera) — per rivendita.
- **Auto-post su Google Business Profile** (via RSS + scheduler tipo Metricool/Publer, o Make) — da valutare.
- Correzione sourcing staminali nei **blog legacy** quando il cliente fornisce il "template di condizioni".

## Ultimi commit (main)
- `230d18a` Book a consultation → scroll al primo form
- `bd4d911` Form lead (3 per pagina trattamento) con campi trattamento e problema
- `fef8003` Articolo automatico del 2026-09-01
