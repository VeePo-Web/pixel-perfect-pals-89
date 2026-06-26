# MASTER BUILD PROMPT — Upgrade Every Master SEO Database to World-Class

> **What this is.** The single, self-contained, executable prompt that takes all six master "Areas We
> Serve" SEO databases — **7,863 locations** (LA + Alberta, BC, Nova Scotia, Ontario, Saskatchewan) — and
> processes **every spreadsheet and every location** to a world-class, rank-and-get-cited bar, using the
> full research corpus in this repo.
>
> **How to use:** paste this whole file to the build agent. Execute the phases **in order, one database at
> a time**, in the database order in §3. Do not advance a phase until its verification gate is green. Do
> not start content (Phase D) on a database until its data (Phases A–C) is clean.
>
> **Decisions already locked with the owner:** LLM-grounded *unique* content · publishable tier first ·
> cleanest small DB first · keep niche-agnostic placeholders (resell to any trade).

---

## 0. REQUIRED READING (load before doing anything)

The agent must read and obey these before touching a row. They are the ground truth; this prompt is the
execution layer on top of them.

- `docs/seo/master-databases/00-system-familiarization-and-quality-assessment.md` — the schema, the
  per-spreadsheet defects, the scorecard, the roadmap. **The map of what you are fixing.**
- `docs/seo/master-databases/01-nova-scotia-pilot-and-content-bar.md` — the proven pipeline + the
  **gold-standard content bar** (worked Halifax before→after). **The quality target.**
- `docs/seo/research-2026-field-update/01-areas-local-2026-field-update.md` — doorway/scaled-content line,
  local-specificity signals, review velocity, "show the address."
- `docs/seo/research-2026-field-update/02-blog-topical-authority-2026-field-update.md` — answer-first block
  lengths, information-gain, FAQ-schema status, content types AI cites.
- `docs/seo/research-2026-field-update/03-ai-search-geo-aeo-2026-field-update.md` — no-JS AI crawlers
  (static render), GEO extraction patterns, robots/llms.txt reality.
- `docs/seo/research-2026-field-update/04-geo-data-sourcing-canada-usa-2026.md` — authoritative geo-data
  sources + **licensing** (incl. the Canadian full-postal-code proprietary constraint → FSA only).
- `docs/seo/maps-mastery-2026/` — the newest (canonical) Maps + national-scale pass; defer to it on Maps
  integration, AI-crawler/JS behavior, geo-data licensing, and the publish gate.
- `docs/seo/areas-maps/prompts/00`–`08` — the executable build prompts this program feeds into (static
  render, geo-data, maps schema, content/EEAT, CWV, entity/off-site, AI-local-pack).

---

## 1. ROLE & MISSION

You are the **Programmatic Local SEO Matrix Architect** (`/geomatrix`) + **AI Search Optimization
Specialist** (`/ai-seo`) + **Topical Authority Content Architect** + **Elite Engineering Methodology**
(brainstorm→plan→verify, evidence before claims).

**Mission:** make every one of the 7,863 locations across all six databases either (a) a genuinely
world-class, locally-specific, AI-citable, penalty-safe location page, or (b) explicitly gated out
(`noindex` / not generated) because it cannot yet clear the bar. **No thin page ships.** Volume is a
liability, not an asset — the gate is the product.

**The one-line standard:** every published row must pass the *find-and-replace test* — remove the location
name and something genuinely local must remain — and carry ≥1 information-gain element a competitor's
template does not have.

---

## 2. NON-NEGOTIABLES (apply to every phase, every row)

1. **Gate before you generate.** A row is published only if it clears: unified score ≥ threshold **AND**
   real (non-synthetic) coordinates + population **AND** ≥ 4 of 8 local-specificity signals **AND** ≥ 1
   first-party/information-gain element. Otherwise `noindex` or don't generate. (Field-update 01 §1.)
2. **One keyword → one URL.** No duplicate slugs (fix SK's 144 + ON's 1). City owns commercial intent;
   blog owns informational. No `?param` URLs.
3. **Static-render reality.** Content + all JSON-LD must end up in initial HTML downstream — AI crawlers
   don't run JS. Keep every field plain-text/markdown, never JS-only. (Field-update 03 §2.)
4. **Grounding / anti-hallucination (hard rule).** Every factual claim in generated content (population,
   founding, landmarks, employers, geography, climate) must trace to a real source row or an authoritative
   dataset. **Never invent a location, a statistic, a landmark, or a fact.** Single-source or unverifiable
   → mark `Needs_Review` and do not publish. Run a verification pass on every generated row (§Phase D).
5. **Niche-agnostic placeholders stay single-curly.** All business copy is `{TOKENS}` (see §Phase D token
   list). `{{double}}` is a defect. Only `{LOCATION}`/`{REGION}` resolve at build; the rest stay for the
   per-business Find-and-Replace.
6. **NAP + entity consistency** downstream (page = schema = GBP = directories). Show the address for SABs
   with one. (Field-update 01 §4.)
7. **Freshness is real.** Set honest `Last_Updated`; downstream renders a visible "Updated {Month} 2026"
   and real `dateModified`. No cosmetic date bumps. (Field-update 02 §4.)
8. **Evidence before claims.** After each phase, paste the verification output (counts, samples, defect =
   0). "Should be fine" is not evidence.
9. **Determinism + provenance.** Record `Data_Sources` and `Verification_Status` truthfully per row. Keep
   the build reproducible.

---

## 3. EXECUTION ORDER (one database at a time)

| # | Database | Locations | Why this order | First-fix on entry |
|---|---|---|---|---|
| 1 | **Nova Scotia** | 807 | Clean (100% filled), Canadian → proves the pipeline that transfers to AB/BC/ON/SK | (data clean) |
| 2 | **Los Angeles, CA** | 224 | Clean + small → validates the **US variant** (ZIP/miles/state) | (data clean) |
| 3 | **Alberta** | 1,912 | Content reference DB but worst raw geo | **backfill population + postal (currently ~7%)** |
| 4 | **British Columbia** | 480 | "COMPLETE" label but weak coords | **backfill lat/lng (50%) + postal (42%)** |
| 5 | **Ontario** | 2,514 | Largest market | **fix `guelph-eramosa` dup slug; verify 1,570 `Estimated` rows** |
| 6 | **Saskatchewan** | 1,926 | Largest + most defects | **fix 144 duplicate slugs FIRST (publish blocker)** |

Finish all five phases for a database (or at least A–C + the publishable-tier Phase D) before moving to the
next. After NS + LA prove both variants, AB/BC/ON/SK reuse the identical pipeline.

---

## PHASE A — NORMALIZE THE SCHEMA (cheap, universal)

**Objective:** one canonical 43-column schema + controlled vocabularies across all six, so every downstream
step and the template data layer treat every DB identically.

**Work:**
1. Adopt the canonical 43-column schema from familiarization doc §3. Reconcile the **US variant**
   (`ZIP_Code_Primary`, `Distance_*_Miles`, `State`) and the **CA variant** (`Postal_Code_Primary` = FSA,
   `Distance_*_KM`, `Province`) into the **same column positions** with a `country` field + locale-aware
   units, so one importer reads all six.
2. **Fix duplicate slugs (publish blocker):** SK 144 + ON 1. Disambiguate deterministically by appending
   the parent region/municipality (e.g. `moose-jaw` city stays `moose-jaw`; the neighborhood becomes
   `moose-jaw-<parent>`), ASCII-only, lowercase, hyphenated, no province suffix. Re-verify **0 duplicates**.
3. Standardize enums: `Location_Type`, `Search_Volume_Estimate`/`Competition_Level` (Very Low…Very High),
   and **`Verification_Status` to one vocabulary**: `Verified` (≥2 authoritative sources), `Census_Verified`,
   `Geographic_Verified`, `Needs_Review`, `Estimated`. Map each DB's existing values onto this set.
4. Strip any double-curly `{{ }}` (already 0; re-confirm). Remove stray pipe/control chars in names/slugs.

**Verification gate:** print per-DB: total rows, duplicate-slug count (**must be 0**), enum value sets,
double-curly count (**0**). Paste it.

---

## PHASE B — BACKFILL & VERIFY THE GEO DATA

**Objective:** real, sourced coordinates + population + postal for at least every **publishable-tier** row;
flag the rest honestly. Kill synthetic data where authoritative data exists.

**Work (sources + licensing from field-update 04 — obey the licenses):**
1. **Coordinates (lat/lng):** backfill/replace md5-synthetic coords with authoritative values — **GeoNames**
   (`cities500/1000`, CC-BY), **NRCan CGN** (Canada), **US Census Gazetteer** (US). Priority: AB (7% gap on
   pop, 93% coords), **BC (50% coords)**, ON/SK `Estimated` rows. Any row still synthetic after backfill →
   `Geographic_Verified` (estimated) and **excluded from the publishable tier**.
2. **Population:** real census — **StatCan 2021** (CA census subdivisions), **US Census Decennial P1 / PEP**
   (US). Backfill AB (currently ~7%), ON (75%), SK (76%), BC (70%). `Population_2025_Estimate` = census ×
   provincial growth factor (document it).
3. **Postal/ZIP:** **CA = FSA (first 3 chars) only** — full 6-char is Canada Post proprietary; do NOT source
   it (field-update 04 §0). **US = ZIP** via SimpleMaps/HUD-USPS. Backfill AB (7%) + BC (42%).
4. **Google_Maps_Place_ID:** populate for the **publishable tier** via the Places API (entity binding +
   precise embed). Leave the embed iframe's `{GOOGLE_MAPS_API_KEY}` token intact.
5. Recompute **haversine distances** from the two real provincial/state hubs after coords are fixed.
6. Set `Data_Sources` + `Verification_Status` truthfully per row.

**Verification gate:** per-DB fill rates for lat/lng, population, postal/ZIP, Place_ID **on the publishable
tier ≥ 95%**; count of rows still `Estimated`/synthetic; sample 5 rows showing real sourced values. Paste it.

---

## PHASE C — UNIFIED RE-SCORE + PUBLISH GATE

**Objective:** one comparable score across all 7,863 rows, then a hard publish gate.

**The unified formula (apply identically to every DB; swap the 2 hubs + units only):**
```
SEO_Priority_Score (0–100) =
  Population 30 : min(30, log10(max(pop,1)) / log10(2,794,356) * 30)   # national anchor = Toronto 2021 census
  Search Vol 25: pop bands  (≥100k→24 · ≥20k→19 · ≥5k→14 · ≥1k→8 · ≥200→3 · else→1)
  Competition20: INVERSE pop (≥100k→4 · ≥20k→8 · ≥5k→12 · ≥1k→15 · else→18)
  Proximity 15 : max((1 − min(km to nearest of the 2 hubs)/500) * 15, 0)
  Economic 10  : Location_Type (City/Regional Muni→8 · Town/District/County Muni→5 · Urban Community/Community→3 · else→1)
```
(US: convert miles→km for the proximity term, or use a 500-mi divisor consistently; document the choice.)

**Publish gate:**
```
PUBLISHABLE  = unified_score ≥ 50  AND  real coords  AND  real population  AND  (after Phase D) ≥4-of-8 signals + ≥1 info-gain
NON-PUBLISH  = noindex / don't generate → excluded from sitemap, kept out of the index
```
Tune the 50 threshold per DB to land a sane first-tier count (NS pilot: 249/807). State the math:
`intended = locations; publishable = N; deferred/noindex = locations − N` with the reason.

**Verification gate:** per-DB unified-score distribution (bands), publishable count + threshold, and the
page-count math. Paste it. (NS reference: bands 65–79:13 / 50–64:236 / 35–49:558 → 249 publishable.)

---

## PHASE D — GENERATE WORLD-CLASS CONTENT (the real work; publishable tier first)

**Objective:** replace the templated/thin content with **genuinely unique, answer-first, locally-specific,
information-gain** content for every publishable row — to the gold-standard bar in pilot doc §3.

**The per-row target (regenerate these columns to spec; preserve `{TOKENS}`):**

| Column | Spec (2026 bar) |
|---|---|
| `Entity_Description` | 50–100w, encyclopedic, factual, answer-first. Real population + ≥3 real local facts (geography, economy/employers, building stock). The AI entity anchor. |
| `AI_Answer_Snippet` | **40–60w**, answer-first, names `{COMPANY_NAME}` once, ends with `{PHONE}`. The citation target. |
| `Short_Description` | 100–150w. **Unique hook per location — NO shared template opener.** Lead with a real local specific; end in CTA. |
| `Long_Description` | 300–500w, storytelling, ≥4 real local signals woven in (named neighborhoods, landmarks, climate tied to the service, economy, building stock). |
| `Local_Facts` | Structured bullets, all real + sourced (population, founding, harbour/geo, named employers, climate, named areas served). Feeds the 4-of-8 gate. |
| `FAQ_1/2/3` | **Question-format**, genuinely local, answer-first. Vary the questions across rows (expand the pool well beyond the 7 templates). At least one FAQ unique to this location (local condition/permit/geography). |
| `Conversational_Query_Examples` | 5 natural-language queries that include real local phrasing ("near me in {Loc}", neighborhood names). |
| keyword/title/meta templates | Keep templated but verify lengths after placeholder fill (title ≤60, meta ≤160) and that they read naturally. |

**The 8 local-specificity signals (surface ≥4 per published row, as real structured data):**
named landmark/neighborhood · local condition tied to the service (climate/soil/building stock) · named
local project/proof · permit/code note · local-only FAQ · proximity/coverage differentiator · named local
testimonial slot · community/economic reference.

**Generation method (LLM-grounded, gated, verified):**
1. **Ground every row** in a facts bundle assembled from the real data (population, coords→region,
   `Location_Type`, parent, real landmarks/economy from CGN/Wikipedia/StatCan, climate by region). The model
   writes *from the bundle*; it never supplies facts itself.
2. **Generate** the columns above to spec, preserving single-curly `{TOKENS}`, answer-first, unique hook.
3. **Verification pass (adversarial):** a second pass checks every factual claim against the facts bundle;
   any unsupported claim is removed or the row is flagged `Needs_Review` and **not published**. Check: no
   invented landmarks/stats, placeholders intact + single-curly, answer-first lengths met, find-and-replace
   test passes (something local remains), ≥4 signals present, no shared template opener across neighbors.
4. **Batch by score** (highest first). For large DBs this is the workflow-suited step (fan-out generate →
   adversarial fact-check per row); otherwise run sequential batches.

**Verification gate:** sample 10 generated rows across the score range — each passes the find-and-replace
test, has ≥4 signals + ≥1 info-gain, answer-first lengths correct, placeholders single-curly and intact,
zero unsupported facts. Report: rows generated, rows passed, rows flagged `Needs_Review`. Paste 2 full
sample rows.

---

## PHASE E — WIRE INTO THE TEMPLATE & SHIP GATED

**Objective:** load the upgraded, gated data into the live template and roll out highest-score-first.

**Work:**
1. Emit the upgraded data into the repo data layer (`src/data/communities.ts` shape, or a generated data
   module) — only **publishable** rows indexable; `noindex` the rest (exclude from sitemap).
2. Run the existing build prompts in order: `areas-maps/prompts/00` (static render + discovery),
   `01` (geo-data + build-time 4-of-8 gate), `02` (maps facade + geo schema), `03` (answer-first content +
   EEAT + freshness), `06` (CWV), `07` (entity/off-site/review velocity), `08` (AI-local-pack). Obey the
   canonical `maps-mastery-2026/` pass where it overrides.
3. Roll out per the expansion roadmap: flagship tier first, then batches, monitoring crawl/index health.

**Verification gate:** built publishable URL served with JS disabled shows H1 + body + JSON-LD;
`noindex` rows absent from sitemap; `tsc`/`build` green; sample URL passes Rich Results Test.

---

## 4. THE GOLD-STANDARD ROW (reference — match this bar for every publishable location)

The worked **Halifax before→after** in `01-nova-scotia-pilot-and-content-bar.md §3` is the canonical
example. Every publishable row must reach that quality: answer-first blocks at the specified lengths,
≥4 real local signals, ≥1 information-gain element, question-format local FAQs, unique hook (no shared
opener), grammar clean, `{TOKENS}` single-curly and intact. If a row cannot reach it from real data, it is
**not published** — it is deferred or `noindex`ed.

---

## 5. GUARDRAILS (what this program will never do)

- Never publish a row that fails the find-and-replace test or the 4-of-8 + info-gain gate.
- Never invent a location, statistic, landmark, founding date, or fact — ground everything; flag the unverifiable.
- Never source full Canadian 6-char postal codes (proprietary) — FSA only.
- Never ship duplicate slugs, double-curly placeholders, or synthetic coords in the publishable tier.
- Never resolve the business `{TOKENS}` in the database — they stay for the per-business Find-and-Replace
  (only `{LOCATION}`/`{REGION}` resolve at render).
- Never claim a phase done without pasting the verification evidence.
- Never publish the whole long tail to chase volume — gate hard; deferred ≠ deleted.

---

## 6. DELIVERABLES PER DATABASE

1. Upgraded master spreadsheet (4 sheets, canonical schema, clean slugs, backfilled geo, unified score,
   world-class content on the publishable tier, honest `Verification_Status`).
2. A one-page report: location count, publishable count + threshold, fill rates, defects fixed, rows
   flagged `Needs_Review`, and the page-count math.
3. The generated repo data module + the gated rollout list (highest-score-first).

Execute Nova Scotia first, end to end, then LA, then AB · BC · ON · SK using the identical pipeline.
```
