# Automazione blog — Utah Stem Cells

Sistema di **generazione articoli automatica** (settimanale) con **pubblicazione manuale**
(revisione umana prima del live), su GitHub Actions. Funziona anche a Mac spento.

## Come funziona

- **`Genera articolo blog`** (`.github/workflows/genera-articolo.yml`) — parte ogni **lunedì**:
  1. prende il prossimo topic da `keywords/keyword-utahstemcells.csv` (`npm run next-keyword`)
  2. l'AI (Claude Code) scrive **solo il testo** seguendo `routine/genera-articolo.md`
     (SEO, link interni a root, sourcing staminali corretto, compliance YMYL, FAQ)
  3. `npm run add-hero` scarica un'immagine da Pexels → `public/blog-images/<slug>-hero.webp`
  4. build di **validazione** (non pubblica)
  5. **committa** la bozza su GitHub — **NON** pubblica
- **`Deploy sito (FTP)`** (`.github/workflows/deploy.yml`) — **manuale**, è il tuo *1-click*:
  dopo aver revisionato l'articolo, vai su **GitHub → Actions → Deploy sito (FTP) → Run workflow**.
  Fa build e carica sul cPanel via FTP incrementale.

Un topic è "fatto" quando esiste il suo file in `src/content/blog/` → il sistema è idempotente
e non riscrive due volte lo stesso argomento.

## Setup iniziale (una volta)

1. **Crea il repo GitHub** (privato) e collega questo progetto:
   ```
   git add -A && git commit -m "Sito + automazione blog"
   git branch -M main
   git remote add origin git@github.com:<tuo-utente>/utahstemcells.com.git
   git push -u origin main
   ```
2. **Aggiungi i Secrets** in GitHub → repo → Settings → Secrets and variables → Actions → *New repository secret*:
   - `ANTHROPIC_API_KEY` (puoi riusare quella di funiacciaio)
   - `PEXELS_API_KEY` (idem)
   - `FTP_HOST`, `FTP_USER`, `FTP_PASSWORD`, `FTP_PORT` (di solito 21), `FTP_SECURE` (`true`),
     `FTP_REMOTE_DIR` (la document root, es. `/public_html`)
3. **Primo deploy manuale** per caricare tutto il sito: Actions → *Deploy sito (FTP)* → *Run workflow*.

## Uso quotidiano

- **Aggiungere/ordinare topic**: modifica `keywords/keyword-utahstemcells.csv`
  (colonne: `keyword,argomento,categoria,priorita`; priorità più bassa = prima).
  In alternativa puoi usare un Google Sheet pubblicato come CSV: imposta il secret/variabile
  `GSHEET_CSV_URL`.
- **Revisione**: quando parte il bot, trovi un commit "Bozza articolo automatico…". Leggi il
  file `.md` (o fai `npm run dev` in locale per l'anteprima). Se vuoi, correggi e committa.
- **Pubblicare**: Actions → *Deploy sito (FTP)* → *Run workflow*.
- **Immagine "curata"**: se preferisci una tua foto al posto di quella Pexels, sostituisci
  `public/blog-images/<slug>-hero.webp` (1640×880) e committa prima del deploy.

## Test in locale (facoltativo)

```
cp .env.example .env      # compila le variabili
npm run next-keyword      # mostra il prossimo topic
npm run add-hero          # assegna le hero mancanti (serve PEXELS_API_KEY)
npm run build             # build di validazione
npm run deploy            # deploy FTP (serve .env con le credenziali FTP)
```

## Note
- Il modello AI è impostato su `claude-sonnet-5` nel workflow; puoi cambiarlo alla riga `--model`.
- Frequenza: cron `37 6 * * 1` (lunedì). Per cambiarla, modifica la riga `cron:` in `genera-articolo.yml`.
- Il deploy FTP è **incrementale** (carica solo i file cambiati) e **non cancella** file remoti.
