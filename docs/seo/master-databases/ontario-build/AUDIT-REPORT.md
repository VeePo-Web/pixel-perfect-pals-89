# Ontario "Areas We Serve" — Build & Audit Report

> **Province:** Ontario, Canada · **Mode:** A (master spreadsheet provided) · **Date:** 2026-07-10
> **Source:** `ontario_master_seo_database_OPTIMIZED (1).xlsx` (`General Provinces/Ontario/` zip), 2,514 rows.
> **System:** niche-agnostic — all business copy stays single-curly `{TOKENS}`; only real place facts are literal.

---

## 1. Mode detection & inputs

Mode **A**. The attached master SEO database was parsed directly (sheets `MASTER_LOCATIONS`,
`SCORING_METHODOLOGY`, `PLACEHOLDER_GUIDE`, `SCHEMA_DOCUMENTATION`; row 1 banner, row 2 headers, 43 columns).
The sheet is the grounding source of truth. No location facts were invented; business copy is tokenized.

**Profile of the raw file (2,514 data rows):**

| Signal | Count |
|---|---|
| Rows with real coordinates | 2,514 / 2,514 |
| Rows missing census population | 604 (all `Neighborhood` type) |
| `{{double-curly}}` defects | **0** |
| Duplicate slugs | 1 (`guelph-eramosa` → ON-0110 vs ON-0453) |
| Location types | City 51 · Town 88 · Municipality 68 · Township 195 · First Nations Reserve 82 · Hamlet 218 · Locality 1,197 · Village 11 · Neighborhood 604 |
| Regions | 11 |

---

## 2. Unified re-score & publish gate (§4B)

Every row was re-scored with **one** formula (national anchor = Toronto 2021 = 2,794,356; hubs = Toronto +
Ottawa; haversine proximity; radius in **metres**) so scores are network-comparable across provinces.

```
Population 30 : min(30, log10(pop)/log10(2,794,356)*30)
Search Vol 25 : pop bands (≥100k→24 … <200→1)
Competition 20: INVERSE pop bands (≥100k→4 … <1k→18)
Proximity 15  : max((1 − min(km to nearer of Toronto/Ottawa)/500)*15, 0)
Economic 10   : City/Regional→8 · Town/District/County→5 · Community/Village→3 · else→1
```

**Publish gate:** `score ≥ 50 AND real coords AND real census population AND ≥4-of-8 local signals AND ≥1 info-gain`.

**Unified band distribution (2,515 rows incl. repaired split):** `80+: 1 · 65–79: 65 · 50–64: 424 · 35–49: 1,355 · <35: 669`.

---

## 3. Source-data repairs (fixed before generation, never destroying the original)

| Row | Defect found | Repair |
|---|---|---|
| **ON-0090 "Hamilton"** | Chimera: **City of Hamilton** facts/landmarks/coords carried the **Hamilton Township (Northumberland)** identity and a wrong population of 11,059 (`~~570,000` in the facts line) | Re-identified as **City of Hamilton**, pop **569,353** (StatCan 2021 CSD), region → Hamilton-Niagara. Built as a flagship. |
| **ON-2515 (new)** | The 11,059 population belonged to a real township with no row | Split out a new **Hamilton Township** row (Needs_Review), so no place is lost |
| **ON-0251** | Name defect `"Blue MountainsThe Blue Mountains"`; coords fell in Georgian Bay | Name/slug fixed → **The Blue Mountains** / `the-blue-mountains`; coords re-centred near Thornbury |
| **ON-0110** | Guelph/Eramosa coords fell in Lake Erie (42.775, −79.558) | Re-centred near Rockwood (43.617, −80.150) |
| **ON-0453** | Ghost duplicate of Guelph/Eramosa (synthetic GTA row on Toronto FSA/coords, dup slug) | Deferred (`DEFERRED_DUP`); Census CSD row wins the slug |

Neighbour ("Nearby Areas") links were recomputed **same-region only**, which drops cross-region absurdities
caused by a number of source rows carrying corrupted lat/lng (e.g. a "Wainfleet" row with GTA coordinates).
Two flagships (London, Brantford) had their nearby lists hand-corrected to genuinely adjacent municipalities.

---

## 4. Coverage reconciliation — INTENDED = BUILT + DEFERRED (nothing dropped)

**INTENDED = 2,515** (2,514 source rows + 1 repaired split row). Every place is in exactly one bucket.

| Bucket | Count | Meaning |
|---|--:|---|
| **Publishable tier (ATTEMPT)** | **242** | Cleared score ≥ 50 + real pop + real coords → world-class content target |
| — Tier A (curated facts) | 25 | Landmarks/Founded/Notable already grounded in the sheet |
| — Tier B (pop ≥ 20k) | 64 | Large municipalities, grounded from high-confidence encyclopedic knowledge |
| — Tier C (pop 4k–20k) | 153 | Mid towns; built only where ≥4 certain local signals exist, else FLAG_THIN |
| **DEFERRED_GATE** | 2,023 | Score < 50 or no census population (includes all 604 neighborhoods) → `noindex`, out of sitemap |
| **DEFERRED_THIN** | 249 | Boilerplate-only grounding, pop < 4k — cannot clear the 4-of-8 gate without invention → `noindex` |
| **DEFERRED_DUP** | 1 | ON-0453 ghost duplicate |

Full row-by-row buckets with one-line reasons: [`data/coverage-ledger.csv`](data/coverage-ledger.csv) (2,515 rows).

### Built this pass

**25 of 242** publishable rows are fully authored to the world-class bar and audited (**Tier A — every
city ≥ ~65k population; the crown-jewel transactional pages**). Content: [`data/content-flagships.jsonl`](data/content-flagships.jsonl).
The remaining **217** publishable rows (Tier B/C) are **prepared and resumable** — grounding, neighbours,
scores, batch inputs and the generation contract are committed under `pipeline/`. Generation of those batches
was interrupted by an account **monthly-spend limit** (subagent batches 001/005/012 terminated by the API
before writing); they re-run from `pipeline/batches-in/` with no rework. This is a coverage-honest snapshot,
not a claim that all 242 shipped.

---

## 5. Defect sweep on the 25 built pages (all 0 unless noted)

Automated audit (`pipeline/audit.js`) — **0 defects**:

| Check | Result |
|---|--:|
| Duplicate slugs | 0 |
| `{{double-curly}}` | 0 |
| Unknown / malformed tokens | 0 |
| Duplicate image-alt strings | 0 |
| Duplicate About-openers between siblings | 0 |
| Entity 50–100w / snippet 40–60w / body 400–600w / FAQ 40–60w | all in range |
| AI snippet + last FAQ end in `Call {PHONE}.` | 25 / 25 |
| Banned openers ("Here's the truth…", "isn't just…", etc.) | 0 |
| ≥4 local signals + ≥1 info-gain | 25 / 25 (signal counts: 5→7 pages, 6→18 pages) |
| Meta ≤ 160 chars | 25 / 25 |
| geoRadius in metres | 25 / 25 |
| Verification status | 25 Verified · 0 Needs_Review |

Invented-fact spot-check: every concrete fact on the 25 pages traces to the sheet's curated facts, the region
bundles, or well-documented encyclopedic knowledge of these major cities. Uncertain details were omitted.

---

## 6. Schema / static-render / crawler (§6E, §1.5)

- **JSON-LD** — one `@graph` per page, cross-referenced by `@id`. Every graph contains
  `{LOCALBUSINESS_TYPE}` (NAP defined once, referenced elsewhere), `Service` (with `areaServed` City +
  neighbours + `GeoCircle` in **metres**), `WebPage` (`speakable` → `.answer-first`, ISO `dateModified`),
  `BreadcrumbList`, `ImageObject`, `FAQPage` (text mirrors the visible FAQ). No `HowTo`, no self-serving
  `aggregateRating`. Validated: 25/25 graphs, **0 defects**. See [`schema/jsonld-graphs.jsonl`](schema/jsonld-graphs.jsonl).
- **Static render** — [`schema/sample-page-toronto.html`](schema/sample-page-toronto.html) proves the H1, all
  body copy, every `<a href>`, and the `ld+json` are present in the initial HTML with **no JavaScript**. The
  map is a click-to-load facade; the OGL-Canada attribution line is in the footer.
- **Sitemap** — [`schema/sitemap-areas-ontario.xml`](schema/sitemap-areas-ontario.xml), honest `<lastmod>`,
  only BUILT URLs (deferred rows excluded).
- **robots.txt** — [`schema/robots.txt`](schema/robots.txt) allows Googlebot, Bingbot, OAI-SearchBot,
  ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, GPTBot.

---

## 7. Two sample pages across the score range

**Top of range — Toronto (ON-0001, unified 81):** Entity (67w) opens "Toronto is the capital of Ontario and
the largest city in Canada, with a 2021 census population of 2,794,356…"; 6 signals (158 neighbourhoods,
CN Tower/Distillery/St. Lawrence Market, Bay Street/finance/tech/film, Don-Humber-Rouge ravines, heritage-vs-
condo stock); info-gain = "200+ ethnic groups, 140+ languages, needs vary block by block." Full record in the JSONL.

**Bottom of flagship range — Sault Ste. Marie (ON-0074, unified 57.6):** Entity (63w) opens "Sault Ste. Marie
is a city in Northern Ontario, with a 2021 census population of 72,051 on the St. Marys River…"; 5 signals
(downtown/Steelton/west-east ends, Agawa Canyon/canal/Bushplane centre, St. Marys River & Lake Superior,
Algoma Steel/forestry/Algoma U, lake-effect winters); info-gain = "one of North America's oldest European
settlements on the St. Marys rapids." Full record in the JSONL.

Both pass the find-and-replace test: delete the place name and genuinely local, place-specific facts remain.

---

## 8. Reproduce / resume

The `pipeline/` folder is the full engine. To generate the remaining 217 publishable rows, run a content pass
per `pipeline/content-spec.md` over each `pipeline/batches-in/batch-0NN-*.json` (grounding, neighbours, tier,
region bundle all pre-computed), write JSONL to `batches-out/`, then `node audit.js` → `node assemble.js` →
`node build-schema.js`. Tier A authoring (`author-*.js`) is the worked reference for the bar. See the README.
