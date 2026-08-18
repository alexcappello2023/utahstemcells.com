# Routine — genera un articolo del blog (Utah Stem Cells)

Scrivi **UN solo** nuovo articolo del blog, in **inglese (US)**, ottimizzato SEO e con
linking interno pertinente. Scrivi **solo il testo**: immagine, build, deploy e salvataggio
sono passi automatici che vengono dopo di te — **non** scaricare immagini, **non** fare build,
**non** fare deploy, **non** usare git.

## Passi (in ordine)

1. **Prossimo argomento**: esegui `npm run next-keyword`.
   - Se l'output contiene `"done": true`, **fermati** senza creare nulla.
   - Altrimenti usa `keyword` (= titolo/tema), `argomento` (indicazioni sui link) e `slug`/`file`.

2. **Scopri i link interni disponibili** (usa SOLO slug che esistono davvero):
   `ls src/content/treatments src/content/conditions src/content/blog`
   I link interni vanno in forma **root**: `/<slug>/` (es. `/knee-osteoarthritis/`, `/stem-cell-joint-regeneration/`).
   NON inventare slug. NON usare `/treatments/...` o `/conditions/...` (la struttura è flat a root).

3. **Ricerca SERP sincrona** nello stesso processo: **1** `WebSearch` + fino a **3** `WebFetch`.
   NON usare la skill deep-research, NON avviare workflow o task in background.

4. **Scrivi** il file `src/content/blog/<slug>.md` (usa lo slug dato da next-keyword) con frontmatter
   e corpo secondo le regole sotto.

## Frontmatter (usa SEMPRE apici DOPPI per i campi di testo)

I campi `title`, `metaTitle`, `description`, `author`, `imageQuery` vanno tra **apici doppi** `"..."`.
Gli apici doppi gestiscono gli apostrofi inglesi (`won't`, `you're`, `it's`) senza rompere lo YAML —
gli apici SINGOLI invece si rompono con gli apostrofi, quindi NON usarli. Se un testo contiene già
apici doppi, sostituiscili con apici singoli o rimuovili. NON scrivere "free consultation" (la
consulenza non è gratuita).

```
---
title: "<il titolo/keyword>"
metaTitle: "<keyword-first, ~50-60 char> | Utah Stem Cells"
description: "<150-160 caratteri, keyword all'inizio, valore. Puoi chiudere con 'Book a consultation.'>"
pubDate: <DATA DI OGGI in formato YYYY-MM-DD>
author: "Dr. William Cimikoski"
relatedTreatments:
  - <1-3 slug di trattamenti ESISTENTI e pertinenti (SOLO slug che esistono davvero)>
relatedConditions:
  - <1-2 slug di condition ESISTENTI e pertinenti (SOLO slug che esistono davvero)>
imageQuery: "<2-4 parole in inglese per una foto stock A COLORI pertinente, es. knee pain doctor>"
---
```

⚠️ `relatedTreatments`/`relatedConditions` devono contenere **solo slug che esistono** (li hai
elencati con `ls src/content/treatments src/content/conditions`). Uno slug inesistente **rompe il build**.
Nel dubbio, metti meno voci o ometti del tutto le due liste.

- **NON** mettere il campo `hero` (lo imposta lo script immagini dopo di te).
- `relatedTreatments`/`relatedConditions` devono contenere solo slug che esistono (vedi passo 2).

## Corpo dell'articolo

- **1200–1600 parole**. NON scrivere un H1 (il titolo diventa già l'H1 dalla pagina): inizia con un
  paragrafo introduttivo, poi usa `##` e `###`.
- Struttura SEO scansionabile: intro (dolore/problema) → cos'è → come funziona → confronto/opzioni →
  chi è candidato → cosa aspettarsi da Utah Stem Cells → **FAQ** → disclaimer.
- **6–10 link interni contestuali**, anchor descrittive, verso trattamenti/condition pertinenti **e
  2–3 altri articoli del blog** (usa `ls src/content/blog` per i loro slug). Naturali, non forzati.
- Includi una sezione `## Frequently asked questions` con 4–6 `###` domande/risposte.
- Chiudi con un blockquote disclaimer, es.:
  `> This article is for general education. It is not medical advice or a promise of any particular result. ...`

## Regole di CONTENUTO obbligatorie (compliance medica / YMYL)

**Origine delle cellule (fondamentale — non sbagliare):**
- Le **staminali** usate da Utah Stem Cells provengono da **tessuto donato di cordone ombelicale e
  amniotico** (allogeniche, preparate in laboratorio), **NON prelevate dal corpo del paziente**.
- **NON** dire mai che la clinica usa staminali **autologhe** (grasso/adipose o midollo osseo).
- Il **PRP** è **autologo** (dal sangue del paziente) — questo è corretto dirlo.
- Il **fat transfer** usa il grasso del paziente (autologo) — corretto. O-Shot/P-Shot/Vampire usano PRP autologo — corretto.

**Toni e claim:**
- Linguaggio **prudente e onesto**: niente promesse di guarigione, niente garanzie di risultato.
- Dove pertinente, precisa che **non è una cura approvata dalla FDA** e che **i risultati variano**.
- Ribadisci che **l'idoneità la determina il medico** dopo valutazione individuale.
- Posizionamento del brand: **physician-led, evidence-informed, onesto** (Dr. William Cimikoski).

## Cosa NON fare
- NON impostare `hero`, NON scaricare immagini, NON fare `astro build`, NON fare deploy, NON usare git.
- NON creare più di un articolo. NON toccare altri file oltre al nuovo `.md`.
