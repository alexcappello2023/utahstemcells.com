# Utah Stem Cells — Sitemap & Architettura SEO (data-driven)

> Basato su: Google Search Console (16 mesi, 240 URL, 1.000 query) + Ubersuggest rank tracking
> + **documento ufficiale servizi della clinica** ("USC Services Overview", 2026-07-02).
> Data analisi: 2026-07-01. Sito attuale: WordPress + WooCommerce + Elementor. Rebuild previsto: Astro (statico).
> Le categorie e i servizi in §3 riflettono il documento ufficiale della clinica.

---

## 1. Cos'è davvero il sito (dai dati)

Non è "una clinica di staminali". È **due brand sotto lo stesso tetto**:
- **Utah Stem Cells** → medicina rigenerativa (staminali/PRP articolari, IV, ormoni)
- **USC MedSpa** → estetica (botox, filler, Morpheus8, vampire facial, body contouring), + sexual wellness, weight loss, IV, ketamine

- **Sede (NAP ufficiale):** 9980 S 300 W, Suite 150, Sandy, UT 84070 — serve la Greater Salt Lake area
- **Medico / volto E-E-A-T:** Dr. William "Bill" Cimikoski (cercato per nome)
- **Traffico attuale:** ~420 clic/mese, **85% concentrato sulla home** (fragilità n°1)
- **Mobile-first obbligatorio:** 4.474 clic mobile vs 2.169 desktop

### Cluster di domanda (impression GSC, 16 mesi)

| Cluster | Impression | Clic | Stato |
|---|---:|---:|---|
| CORE stem cell therapy / near me | 62.000 | 1.288 | forte ma bloccato in pag. 3-4 |
| Estetica (votiva/morpheus/vampire/cellulite) | 30.600 | 59 | tanta domanda, quasi zero clic |
| LOCAL per città (sandy/slc/jordan…) | 26.200 | 135 | **miniera inesplorata** |
| Lip filler | 22.700 | 19 | template sbagliato (WooCommerce) |
| IV / NAD | 13.000 | 11 | **buco quasi totale** |
| Brand (utah stem cells) | 9.100 | 1.832 | ottimo, il marchio tira |
| Hair restoration | 6.300 | 59 | blog ranka top-10, manca pagina servizio forte |
| Condizioni neuro (autism/MS/CP/SCI) | 5.600 | 22 | giusto asse, da potenziare |
| Ormoni / peptidi | 5.200 | 28 | frammentato in troppe pagine |
| Salute maschile (p-shot/penile) | 4.800 | 36 | miglior pagina servizio esistente |

---

## 2. Architettura: 4 assi

```
                     HOME
                       |
   ┌───────────┬───────┼────────────┬──────────────┐
 SERVICES   CONDITIONS  LOCATIONS    BLOG
(trattamenti)(patologie) (città)  (informativo)
```

- **Services** = cosa offriamo (chi cerca "prp", "lip filler", "nad iv")
- **Conditions** = quale problema risolviamo (chi cerca "knee pain", "autism stem cells")
- **Locations** = dove (chi cerca "stem cell therapy south jordan", "iv therapy salt lake city")
- **Blog** = autorità informativa + E-E-A-T (motore auto-blog)

I tre assi Services × Conditions × Locations si **linkano tra loro** (interlinking = topical cluster).

**Niente Shop / e-commerce.** Il sito è un generatore di contatti (lead), non un negozio.
I trattamenti estetici oggi sono `/product/` WooCommerce → SBAGLIATO: diventano vere **landing di servizio**.
I prodotti fisici (Alastin skincare, integratori, gift card) NON si vendono più online.

---

## 3. Schema URL (pulito, piatto, keyword-first)

Regole:
- niente `-in-sandy-ut` appiccicato ovunque (spammy) → il locale si gestisce con le Location page + segnali on-page + Google Business Profile
- niente date, niente `/product/` per i servizi, un solo `/contact/`, un solo `/about/`
- slug in inglese, minuscolo, trattini

```
/                                         Home
/about/                                   Chi siamo (storia, clinica, USC MedSpa)
/about/dr-cimikoski/                      Pagina medico (E-E-A-T, credenziali)  ← critico YMYL
/contact/                                 Contatti + mappa + form
/reviews/                                 Testimonianze + recensioni (schema Review)

/treatments/                             HUB servizi (indice di tutte le categorie)

  # — Regenerative medicine (Regenerative Medicine & Joint Restoration)
/treatments/stem-cell-joint-regeneration/  ← PAGINA CORE
/treatments/prp-joint-treatment/
/treatments/iv-stem-cell-therapy/

  # — Hair restoration
/treatments/hair-restoration/             (PRP ± stem cell, men & women)

  # — Sexual wellness
/treatments/p-shot/                       (erectile dysfunction)
/treatments/o-shot/
/treatments/gainswave/                    (acoustic wave, ED maschile)
/treatments/votiva-femtite/
/treatments/penile-enhancement/

  # — Hormone optimization
/treatments/hormone-pellet-therapy/       (men & women)

  # — Medical aesthetics (injectables + facials)
/treatments/botox/                        (Botox, Jeuveau)
/treatments/dermal-fillers/               (Juvéderm, Restylane, Radiesse, Versa, Bellafill…)
/treatments/sculptra/                     (collagen-stimulating)
/treatments/kybella/                      (double-chin / deoxycholic acid)
/treatments/morpheus8/                    (microneedling + RF)
/treatments/microneedling/
/treatments/vampire-facial/               (microneedling + PRP)
/treatments/ipl-photofacial/

  # — Body contouring & skin tightening
/treatments/facetite-bodytite/            (RF skin tightening viso/corpo)
/treatments/rf-body-contouring/
/treatments/liposuction/
/treatments/fat-transfer/

  # — Medical weight loss
/treatments/medical-weight-loss/          (physician-supervised + nutrition)

  # — IV therapy & wellness
/treatments/iv-therapy/                   HUB IV
/treatments/iv-therapy/nad/
/treatments/iv-therapy/vitamin-infusions/
/treatments/iv-therapy/vitamin-c/
/treatments/wellness-injections/

  # — Ketamine therapy
/treatments/ketamine-therapy/             (il vecchio sito rankava già su ketamine)

/conditions/                             HUB patologie
  # — Ortopedico / articolare (Stem Cell Joint Regeneration + PRP)
/conditions/knee-osteoarthritis/
/conditions/osteoarthritis/              (generale — pagina esistente)
/conditions/rheumatoid-arthritis/        (pagina esistente)
/conditions/shoulder-pain/
/conditions/hip-pain/
/conditions/back-pain/
/conditions/neck-pain/
/conditions/joint-pain/
/conditions/sacroiliac-joint-dysfunction/ (c'è già un articolo)
  # — Neurologiche (CONFERMATO offerto dalla clinica, 2026-07-02)
/conditions/autism/
/conditions/multiple-sclerosis/
/conditions/cerebral-palsy/
/conditions/spinal-cord-injury/
/conditions/neuropathy/                  (c'è già un case study)
  # — Sistemiche / altre (pagine esistenti sul sito attuale)
/conditions/heart-failure/               (⚠️ molto sensibile FDA, testo prudentissimo)
/conditions/autoimmune-conditions/
/conditions/erectile-dysfunction/
/conditions/hair-loss/

/locations/                              HUB sedi/città
/locations/sandy/                         (sede principale)
/locations/salt-lake-city/
/locations/south-jordan/
/locations/west-jordan/
/locations/draper/
/locations/herriman/
/locations/lehi/
   (espandibili in modo programmatico su servizio×città)

/blog/                                    Indice blog (auto-generato)
/blog/[slug]/                             Articoli
```

---

## 4. Pagine da costruire — priorità (per impression/opportunità)

### TIER 1 — Core money (costruire per prime)
| Pagina | Perché | Dato GSC |
|---|---|---|
| Home | 85% del traffico, va ricostruita per distribuire | 171k imp, pos 25 |
| `/treatments/stem-cell-therapy/` | keyword madre | "stem cell therapy" 7.254i pos30; "…near me" 2.991i |
| `/treatments/stem-cell-hair-restoration/` | blog già top-10 con 38k imp | migrare autorità su pagina servizio |
| `/treatments/lip-filler/` | 33k imp su product sbagliato + articolo 18k imp pos 8 | enorme, template da correggere |
| `/treatments/penile-enhancement/` + `/treatments/p-shot/` | miglior pagina servizio esistente | penile-enhancement 252 clic |
| `/treatments/iv-therapy/` (+ NAD) | buco totale, alta domanda | nad/iv slc 1.100-1.500i pos 44-70 |
| `/treatments/stem-cell-therapy/cost` o sezione FAQ prezzi | intento commerciale | "…cost" 897i pos 8 |

### TIER 2 — Espansione servizi & condizioni
BHRT (unificare le ~10 pagine ormoni frammentate in 1 forte), peptidi, votiva, vampire facial, morpheus8, cellulite, under-eye, weight loss/semaglutide.
Conditions: autism (75c, 4.110i), MS, cerebral palsy, spinal cord, rheumatoid arthritis, knee.

### TIER 3 — Local landing (la leva a più alto ROI)
Pagine città per i servizi core. GSC mostra ranking già presenti (pos 19-70) con **zero clic** per:
`stem cell therapy south jordan / west jordan / herriman / bluffdale / kaysville`, `iv therapy salt lake city`, `regenerative medicine salt lake city`.

### TIER 4 — Contenuti & supporto
- Blog: migrare i vincenti + motore auto-blog per le informative ("benefits of stem cell therapy" 6.834i pos 84, "stem cell benefits", ecc. → tutte in fondo, da conquistare)
- About + pagina Dr. Cimikoski, Reviews, Contact, FAQ

---

## 5. Mappa redirect 301 (preservare l'equity)

### 5.1 Conditions neurologiche — CONFERMATE (2026-07-02)
I titolari confermano che la clinica **offre ancora** trattamenti con staminali per **autism, multiple sclerosis, cerebral palsy, spinal cord injury**. → si **mantengono** le condition page e si fanno i **301** dai vecchi URL (`/autism/` → `/conditions/autism/`, ecc.).
⚠️ Trattandosi di YMYL su patologie neurologiche (area sotto scrutinio FDA), i testi vanno scritti in modo prudente ed evidence-based: descrivere l'approccio, niente promesse di guarigione, disclaimer medico, firma del Dr. Cimikoski.

### 5.2 Contenuti da PRESERVARE (post-sitemap.xml + page-sitemap.xml, 2026-07-02)
Il cliente vuole **tenere pagine e articoli**. Inventario: 32 articoli, 38 pagine.

**Articoli blog (32) — migrare TUTTI** in `/blog/[slug]/` (301 dai vecchi URL a root). Mantieni gli slug dei top performer (equity SEO):
- `stem-cell-therapy-hair-what-works…-2026` (38k imp), `half-syringe-lip-injections…` (18k imp), `hyperhidrosis-and-stress…` (12.9k imp), `5-benefits-of-stem-cell-therapy` (6.8k imp), `can-stem-cells-really-increase-penis-size…`.
- Ogni articolo → link "verso l'alto" alla Service/Condition pertinente (interlink cluster).
- Temi presenti (riferimento per l'auto-blog): ketamine (chronic pain, depression, +NAD), staminali educativi (benefici, 10 condizioni, scegliere il medico), articolare (ginocchio, artrosi, sacroiliaca, proloterapia), capelli, estetica/pelle (lip filler, vampire facial, PRP skin aging), sessuale (o-shot/p-shot), Votiva/incontinenza, neuropatia, iperidrosi/ansia.

**Pagine da tenere:** `/about-us` (→ /about/), `/contact-us` (→ /contact/), `/faq`, `/disclaimer` (→ /medical-disclaimer/), `/privacy-policy`, `/terms-of-service`, `/testimonials-and-reviews` (→ /reviews/), `/resources`, `/video`, `/out-of-town-patients`, `/self-assessment`, le condition page (osteoarthritis, rheumatoid-arthritis, heart-failure, cerebral-palsy, autism, autoimmune-conditions, multiple-sclerosis, spinal-cord-injury), `/services-4/joint-regeneration-procedures`, `/services-4/iv-therapy-for-energy-recovery-wellness`, `/service/armtite`.

**Pagine spazzatura → 410 (NON migrare):** `thank-you, testform, faq-test, about-us-test, home-old, shop-old, store-2, services-3, privacy-policy-2, gift-cards, give-a-gift-card, tell-a-friend, shop, shop-products`.

**Vincitori da redirezionare con precisione (hanno clic/impression reali):**

| URL vecchio | Clic | → URL nuovo |
|---|---:|---|
| `/` | 5.747 | `/` |
| `/services/penile-enhancement-therapy/` | 252 | `/treatments/penile-enhancement/` |
| `/about-us/` | 88 | `/about/` |
| `/autism/` | 75 | `/conditions/autism/` |
| `/half-syringe-lip-injections-is-0-5ml…/` | 53 | mantenere come articolo blog → link a `/treatments/lip-filler/` |
| `/services/peptide-therapy-in-sandy-ut/` | 50 | `/treatments/peptide-therapy/` |
| `/stem-cell-therapy-hair-what-works…-2026/` | 37 | mantenere come articolo → link a `/treatments/stem-cell-hair-restoration/` |
| `/services/stem-cell-hair-restoration-in-sandy-ut/` | 32 | `/treatments/stem-cell-hair-restoration/` |
| `/votiva-vaginal-rejuvenation-a-patients-votiva-review/` | 30 | mantenere articolo → link a `/treatments/votiva/` |
| `/product/mini-lip-plump/` | 28 | `/treatments/lip-filler/` |
| `/can-stem-cells-really-increase-penis-size…/` | 25 | mantenere articolo → link a `/treatments/penile-enhancement/` |
| `/services/iv-stem-cell-therapy-copy/` | 18 | `/treatments/stem-cell-iv-therapy/` |
| `/before-and-after-stem-cell-hair-treatment…/` | 18 | mantenere articolo |
| `/product/full-lip-plump/` | 14 | `/treatments/lip-filler/` |
| `/services/p-shot-erectile-dysfunction-treatment-in-sandy-ut/` | 13 | `/treatments/p-shot/` |
| `/multiple-sclerosis/` | 11 | `/conditions/multiple-sclerosis/` |
| `/services/cellulite-treatment/` | 11 | `/treatments/cellulite-treatment/` |
| `/services/joint-regeneration-procedures-sandy-ut/` | 10 | `/treatments/joint-regeneration/` |
| `/contact/` + `/contact-us/` | 9 + 7 | `/contact/` (unificare i due) |
| `/product/under-eyes-treatment/` | 9 | `/treatments/under-eye-treatment/` |
| `/cerebral-palsy/` | 7 | `/conditions/cerebral-palsy/` |
| `/hyperhidrosis-and-stress…/` | 7 | mantenere articolo |
| `/product/morpheus8-stretch-marks/` | 6 | `/treatments/morpheus8/` |
| `/spinal-cord-injury/` | 6 | `/conditions/spinal-cord-injury/` |
| `/product/vampire-facial/` | 6 | `/treatments/vampire-facial/` |
| `/rheumatoid-arthritis/` | 1 | `/conditions/rheumatoid-arthritis/` |
| `/peyronies/` | 2 | `/conditions/peyronies-disease/` |

**Regole di pattern per il resto (301 alla pagina padre) e spazzatura da eliminare (410/noindex):**
- `/services/*-in-sandy-ut/` e `/services/*` → mappa 1:1 al nuovo `/treatments/...`; i doppioni al canonico
- `/product/alastin-*`, integratori, gift card, carrello → **410/noindex** (e-commerce dismesso). Se un prodotto è legato a un trattamento (es. lip filler), 301 alla relativa `/treatments/...`
- **Eliminare/410:** `*test12`, `*-copy`, `medspa-2`, `home-old`, `services-3`, `services-4`, `/services/page/N/`, `?add-to-cart=`, `?gQT=`, `/store*`, `/dt_*`, `/project-category/*`, tag/category vuote
- `/wp-content/uploads/*.pdf` ancora utili (es. NAD-Review.pdf 3.528i) → migrare in `/resources/`

---

## 6. Note tecniche SEO (da fare a prescindere dalla struttura)

1. **Schema markup:** `MedicalClinic` + `Physician` (Dr. Cimikoski) site-wide; `MedicalProcedure` sulle treatment; `MedicalCondition` sulle condition; `FAQPage`; `Review`/`AggregateRating`; `LocalBusiness` con NAP su ogni Location.
2. **Google Business Profile:** ottimizzare in parallelo (per un locale vale quanto il sito). NAP coerente ovunque.
3. **E-E-A-T:** ogni pagina medica e articolo firmati dal Dr. Cimikoski con bio, credenziali, licenze. Pagina medico forte.
4. **Performance:** con Astro parte già ottima; tenere Core Web Vitals verdi (mobile-first).
5. **Interlinking:** ogni Service ↔ Condition ↔ Location correlata. Es. `/treatments/joint-regeneration/` ↔ `/conditions/knee-osteoarthritis/` ↔ `/locations/south-jordan/`.
6. **Auto-blog:** puntare i contenuti informativi in fondo alla SERP ("benefits of…", "does X work", "before and after") — autorità costante.

---

## 7. Prossimi passi
1. ✅ Sitemap & architettura (questo documento)
2. ☐ Validare la lista servizi/patologie con il cliente (offerta reale attuale)
3. ☐ Definire template Astro riutilizzabili: Treatment, Condition, Location, Blog post
4. ☐ Costruire Tier 1 → Tier 4
5. ☐ Implementare mappa 301 completa prima del go-live
6. ☐ Setup schema + GBP + Search Console sul nuovo sito
