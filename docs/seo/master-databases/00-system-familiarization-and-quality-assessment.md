# Master SEO Databases — System Familiarization & Quality Assessment

> **What this is.** A deep familiarization with the two zip deliverables (`America-…zip` + `General
> Provinces-…zip`) — six pre-built "Areas We Serve" master SEO databases totaling **7,863 locations** —
> and an empirical, per-spreadsheet quality assessment against the world-class 2026 standard captured in
> `docs/seo/` + `docs/seo/research-2026-field-update/`.
>
> **Purpose:** the foundation for processing **every spreadsheet and every location** up to a world-class,
> rank-and-get-cited bar. Analysis only — no spreadsheet has been modified.
>
> Compiled 2026-06.

---

## 1. What these databases are

Each file is a **master "Areas We Serve" location database** for one state/province: one row per location,
43 columns of geo data + templated SEO metadata + AI-SEO/GEO fields + niche-agnostic content + QC, plus
three documentation sheets. They are the **geo-data + uniqueness-content engine** that feeds the Areas
template (`src/data/communities.ts` / the matrix in `docs/seo/areas-maps/`). All business-specific copy is
stored as `{PLACEHOLDER}` tokens so one config rebrands every page for any trade.

| Database | File label | Locations | Source zip |
|---|---|---|---|
| Los Angeles, CA (US) | `…OPTIMIZED.xlsx` | **224** | America |
| Alberta | `…OPTIMIZED.xlsx` | **1,912** | General Provinces |
| British Columbia | `…COMPLETE.xlsx` | **480** | General Provinces |
| Nova Scotia | `…OPTIMIZED.xlsx` | **807** | General Provinces |
| Ontario | `…OPTIMIZED (1).xlsx` | **2,514** | General Provinces |
| Saskatchewan | `…OPTIMIZED.xlsx` | **1,926** | General Provinces |
| **Total** | | **7,863** | |

Supporting assets in the zips: per-province build scripts (`build_*.py`, `expand_*.py`,
`fix_ontario_quality.py`), raw source data (Wikipedia municipality CSV/HTML, StatCan/NRCan/CGN, census
pickles), methodology PDFs/MD (`bc_methodology.pdf`, `bc_scoring_analysis.md`, `optimization_checklist.md`),
the master spec (`areas_we_serve_implementation_guide_for_ai.pdf`), a QA standard
(`seo_ai_optimization_audit_report.pdf`), and a **US-states build tracker** (`build_state_tracker.py` +
`states_pop.pkl` / `state_gdp.pkl` — ranks all 50 states to set the US build order). The nested
`Alberta_Local_SEO_Plan.zip` (154 files) is the full worked build directory and the de-facto reference.

---

## 2. The 4-sheet workbook anatomy

Every database is the same 4-sheet workbook (read by the importer as: row 1 = group banner, row 2 = column
names, row 3+ = data):

1. **MASTER_LOCATIONS** — the deliverable: 1 row per location × 43 columns.
2. **SCORING_METHODOLOGY** — documents the 5-factor `SEO_Priority_Score` (weights, formulas, bands, province adjustments, data sources).
3. **PLACEHOLDER_GUIDE** — the niche-agnostic token system + find-and-replace instructions + per-trade examples.
4. **SCHEMA_DOCUMENTATION** — one row per column (name · section · type · required · description).

---

## 3. The 43-column MASTER_LOCATIONS schema

Grouped under 7 banners. **Data columns** are populated from sources; **template columns** carry
`{PLACEHOLDER}` tokens resolved per business.

- **CORE IDENTIFICATION (6):** `Location_ID` (`ON-0001`…, assigned after score-sort) · `Location_Name` · `Location_Type` (enum) · `Parent_Municipality` (blank for cities) · `Parent_Region` · `Province`/`State`.
- **GEOGRAPHIC (7):** `Latitude` · `Longitude` · `Postal_Code_Primary`/`ZIP_Code_Primary` · `Google_Maps_Place_ID` · `Google_Maps_Embed_Code` (iframe w/ `{GOOGLE_MAPS_API_KEY}`) · `Distance_From_{Hub1}_KM/Mi` · `Distance_From_{Hub2}_KM/Mi` (haversine).
- **POPULATION & PRIORITIZATION (5):** `Population_2021_Census` (2020 for LA) · `Population_2025_Estimate` (= census × 1.03–1.05) · **`SEO_Priority_Score` (0–100, the publish gate)** · `Search_Volume_Estimate` (enum) · `Competition_Level` (enum).
- **SEO METADATA — templated (8):** `URL_Slug` · `SEO_Title_Template` (`{SERVICE} in {Loc}, {ST} | {COMPANY_NAME}`, ≤60) · `Meta_Description_Template` (≤160, w/ `{PHONE}` CTA) · `H1_Template` · `Primary_Keyword_Template` · `Secondary_Keywords_Template` (pipe) · `Long_Tail_Keywords_Template` (pipe) · `Question_Keywords`.
- **AI SEO / GEO — templated (4):** `Entity_Type` (schema.org) · `Entity_Description` (encyclopedic, target 50–100w) · `Conversational_Query_Examples` (5, pipe) · `AI_Answer_Snippet` (ChatGPT/Perplexity citation target, target 100–150w).
- **CONTENT — templated (9):** `Short_Description` (100–200w, "Hormozi" style) · `Long_Description` (300–500w, storytelling + local character) · `Local_Facts` (bulleted) · `FAQ_1/2/3_Question` + `_Answer` (3 pairs → FAQPage schema).
- **QUALITY CONTROL (4):** `Verification_Status` (enum) · `Data_Sources` · `Last_Updated` · `Notes`.

This maps cleanly onto the repo's `Region`/`Community` types — `Location_*`→community fields, `FAQ_*`→`faqs[]`,
`Local_Facts`/landmarks→uniqueness signals, `SEO_Priority_Score`→the publish gate.

---

## 4. The niche-agnostic placeholder system

One `nicheConfig` (Find-and-Replace) rebrands all rows. Tokens: `{SERVICE}` · `{BUSINESS_TYPE}` ·
`{COMPANY_NAME}` · `{COMPANY_SHORT}` · `{TAGLINE}` · `{UNIQUE_VALUE_PROP}` · `{SERVICE_DESCRIPTION}` ·
`{SERVICE_LIST}` · `{PHONE}` · `{EMAIL}` · `{WEBSITE}` · `{YEARS_IN_BUSINESS}` · `{CERTIFICATIONS}` ·
`{INSURANCE_COVERAGE}` · `{AWARDS}` · `{RATING}` · `{PROPERTY_TYPE}` · `{PROJECT_TYPE}` · `{PRICE_RANGE}` ·
`{RESPONSE_TIME}` · `{ESTIMATE_TYPE}` · `{AVAILABILITY}` · `{CTA_PRIMARY}` · `{CTA_SECONDARY}` ·
`{GOOGLE_MAPS_API_KEY}`; `{LOCATION}`/`{REGION}` are injected at render. **Hard rule:** single-curly only —
`{{X}}` double-curly is a defect that breaks template engines (was a critical audit finding, now fixed: 0 in all 6).

---

## 5. The SEO_Priority_Score (the publish gate)

5 weighted factors → 0–100: **Population 30%** (log-scaled to province max) · **Search Volume 25%** ·
**Competition 20%** (inverse — lower competition scores higher) · **Proximity to 2 metros 15%** (haversine)
· **Economic/tourism significance 10%**. Higher score = build/publish first. In the intended Next.js build,
score **≥70 → static (SSG)**, `<70 → ISR`; sitemap `priority = score/100`. This is the same idea as our
template's 4-of-8 publish gate — a phased, highest-value-first rollout to avoid the doorway/scaled-content
penalty.

> ⚠️ **Cross-database scoring is NOT comparable.** Each province's script computes the sub-scores
> differently (Ontario derives search-volume/competition from *location type*; AB/BC/SK/NS derive them from
> *population*; normalization constants differ per province). Result: Ontario's max is **77** and LA's is
> **75**, while Alberta/BC reach **98** — so a flagship like Toronto does **not** outscore a mid Alberta
> town. A unified publish gate must **re-score all six on one formula** before scores can be compared across
> the network. (BC docs also disagree on tier bands: 80/60/40 vs 85/70/50.)

---

## 6. How the data was built (and two load-bearing caveats)

Pipeline: raw source → cleaned locations (pickle) → scored → **template-generated** SEO content → Excel.
Sources cited: Wikipedia municipality lists, StatCan 2021 Census, NRCan/CGN gazetteer, ISC/First-Nations
directories, municipal/tourism data. Two caveats matter enormously for "world-class":

1. **Coordinates & minor-place populations are frequently synthetic.** For non-flagship places, lat/lng are
   generated deterministically from `md5(name)` around a region centroid, and population is estimated;
   distances and scores derived from them are approximate by construction. These rows are flagged
   `Estimated` / `Geographic_Verified` / `Needs_Review` in `Verification_Status`.
2. **The content layer is templated, not unique.** `Short/Long_Description`, `Entity_Description`,
   `AI_Answer_Snippet`, `Conversational_Query_Examples`, and the 3 FAQs come from **f-string templates +
   3-template hash-rotated pools + a 7-template FAQ pool**, with genuinely custom copy only for ~24 flagship
   cities (the curated `LOCATION_DATA` dict). **This is the single biggest gap vs. world-class:** at scale,
   long-tail pages are near-identical except the town name — exactly the find-and-replace pattern our 2026
   research shows triggers scaled-content/doorway filtering (the zip's own audit graded Content Quality **D / 38**).

---

## 7. Per-spreadsheet quality scorecard (empirical, all 7,863 rows)

| DB | Locs | Lat/Lng | Pop census | Postal/ZIP | Place_ID | Score (min–max, mean) | 80+ tier | Verification | Dup slugs | `{{}}` defects |
|---|---|---|---|---|---|---|---|---|---|---|
| **LA** | 224 | 100% | 100% | 100% | 0% | 52–75, **64** | 0 | Census_Verified 100% | 0 | 0 |
| **Alberta** | 1,912 | 93% | **7%** ⚠ | **7%** ⚠ | 1% | 26–98, 39 | 10 | Verified 925 / Needs_Review 987 | 0 | 0 |
| **BC** | 480 | **50%** ⚠ | 70% | **42%** ⚠ | 0% | 28–98, 52 | 29 | Verified 100% | 0 | 0 |
| **Nova Scotia** | 807 | 100% | 100% | 100% | 0% | 45–85, 52 | 1 | Census/Geo verified | 0 | 0 |
| **Ontario** | 2,514 | 100% | 75% | 100% | 0% | 18–77, 40 | 0 | Verified 944 / **Estimated 1,570** | **1** (`guelph-eramosa`) | 0 |
| **Saskatchewan** | 1,926 | 100% | 76% | 100% | 0% | 23–81, 38 | 1 | Verified 769 / NeedsReview 340 / Estimated 817 | **144** ⚠ | 0 |

**Defects that block a clean publish, in priority order:**
1. **Saskatchewan: 144 duplicate `URL_Slug`s** (e.g. `moose-jaw`, `prince-albert` exist as both city and neighborhood) — a routing collision; violates one-keyword→one-URL. Must disambiguate (parent-region suffix).
2. **Alberta: population & postal only ~7% filled**, 987/1,912 `Needs_Review` — the content-reference DB has the weakest raw geo data. Needs census/postal backfill.
3. **BC: only 50% lat/lng, 42% postal** despite the "COMPLETE" label (~240 coords missing). Needs coordinate/postal backfill.
4. **Ontario: 1 duplicate slug** (`guelph-eramosa`) + **1,570 `Estimated`** (synthetic coords/pop) needing verification.
5. **`Google_Maps_Place_ID` ~0% everywhere** — no Place IDs (intentional placeholder; needed for precise embeds + entity binding).
6. **Cross-DB score incomparability** (§5) — re-score on one formula before using as a network-wide gate.
7. **Templated content thinness** (§6) — the largest, highest-effort gap; the real "world-class" work.

---

## 8. Gaps vs. the world-class 2026 standard (what "most world-class" requires)

Cross-referenced against `docs/seo/research-2026-field-update/`:

| World-class requirement (2026) | Current state | Gap |
|---|---|---|
| **4-of-8 unique local signals + ≥1 first-party element per published page** | Template content + ~24 curated cities | **Large** — long-tail pages are find-and-replace; need genuine local specificity (landmarks tied to service, local conditions, named projects, local FAQ). |
| **Answer-first 40–60w blocks under question H2s** | `AI_Answer_Snippet` exists (~100–150w target) but generic | Medium — restructure to answer-first; make per-location specific. |
| **Information gain (≥1 element AI can't replicate)** | Absent for non-flagship rows | **Large** — first-party data/photos/quotes per business at activation. |
| **Verified coordinates + real population + Place_ID** | Synthetic for many; AB/BC sparse | Medium — backfill from Census/CGN/GeoNames/Places API. |
| **Unified publish gate (comparable scores)** | Per-province formulas | Medium — single re-scoring pass. |
| **One keyword → one URL (no dup slugs)** | SK 144, ON 1 | Small — deterministic disambiguation. |
| **Canadian postal reality (FSA-only is free)** | FSA prefixes used — correct | ✅ aligns with field-update 04. |
| **Freshness (`dateModified`, visible date)** | `Last_Updated` present | Small — wire to template freshness layer. |
| **Static render + schema-in-HTML** | Template targets Next.js SSG; repo is Vite SPA | Handled by `areas-maps/prompts/00` (static render) — keep. |

---

## 9. Proposed "make every spreadsheet world-class" roadmap

A phased program (decisions in §10 first). Order chosen so cheap, universal fixes land before expensive
content regeneration, and so nothing ships that would drag domain authority.

- **Phase A — Normalize the schema across all 6** (cheap, universal): one canonical 43-col schema + enum
  values; reconcile US (ZIP/miles) vs CA (FSA/km) into one template with locale fields; fix the SK 144 + ON 1
  duplicate slugs; standardize `Verification_Status` vocabulary.
- **Phase B — Backfill & verify the geo data** (medium): real lat/lng + population + FSA/ZIP from
  Census/StatCan/CGN/GeoNames; replace synthetic coords where authoritative data exists; populate
  `Google_Maps_Place_ID` (Places API) for ≥ the publishable tier; mark every row's true `Verification_Status`.
- **Phase C — Unify the priority score** (medium): re-score all 7,863 on one formula so the gate is
  network-comparable; set the publish threshold per the 4-of-8 + score gate; tag each row publish/`noindex`.
- **Phase D — Elevate content to the 2026 bar** (large, the real work): regenerate `Entity_Description`,
  `AI_Answer_Snippet`, `Short/Long_Description`, FAQs as **answer-first, locally-specific, information-gain**
  content — not 3-template rotations — at least for every publishable row; expand the FAQ pool; inject the
  4-of-8 local signals as structured fields the page renders.
- **Phase E — Wire into the template + ship gated**: load into `src/data/communities.ts` (or a generated
  data layer), run the build-time 4-of-8 publish gate (`areas-maps/prompts/01`), static-render + schema
  (prompts 00/02), and roll out highest-score-first per the expansion roadmap.

---

## 10. Open decisions (needed before Phase D execution)

1. **Content regeneration method** — keep deterministic templates (fast, cheap, but thin) **vs.** LLM-generate
   genuinely unique per-location content grounded in real local facts (world-class, but slower/costlier and
   needs a grounding+verification pass to avoid hallucination). World-class ⇒ the latter, gated.
2. **Scope of first pass** — all 7,863 locations, or only the publishable tier (score-gated, e.g. top ~1,500)
   first, expanding outward? (Our research says **don't publish every town** — gate hard.)
3. **Order** — which database first? (Recommendation: start with the **cleanest + a flagship** — Nova Scotia
   or LA are 100%-filled and small — to prove the pipeline end-to-end, then Alberta/BC data-backfill, then
   the large Ontario/SK.)
4. **Integration target** — produce upgraded spreadsheets, **and/or** generate the repo data layer directly?
5. **Per-business vs. template** — keep niche-agnostic placeholders (resell to any trade) as the deliverable,
   then activate per business — confirm this stays the model.

---

*Source artifacts analyzed: both zips (incl. nested `Alberta_Local_SEO_Plan.zip`, 154 files), all 6 master
xlsx (4 sheets each), 11 build scripts, `areas_we_serve_implementation_guide_for_ai.pdf`,
`seo_ai_optimization_audit_report.pdf`, `bc_methodology.pdf`, `bc_scoring_analysis.md`,
`bc_database_summary.md`, `optimization_checklist.md`. Empirical stats computed over all 7,863 rows.*
