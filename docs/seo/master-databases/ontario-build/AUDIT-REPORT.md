# Ontario "Areas We Serve" — Build & Audit Report

> **Province:** Ontario, Canada · **Mode:** A (master spreadsheet provided) · **Updated:** 2026-07-12
> **Source:** `ontario_master_seo_database_OPTIMIZED (1).xlsx` (`General Provinces/Ontario/` zip), 2,514 rows.
> **System:** niche-agnostic — all business copy stays single-curly `{TOKENS}`; only real place facts are literal.

---

## 1. Mode detection & inputs

Mode **A**. The attached master SEO database was parsed directly (sheets `MASTER_LOCATIONS`,
`SCORING_METHODOLOGY`, `PLACEHOLDER_GUIDE`, `SCHEMA_DOCUMENTATION`; 43 columns). No location facts were
invented; business copy is tokenized.

**Raw-file profile (2,514 data rows):** 2,514/2,514 have coordinates · 604 rows (all `Neighborhood`) lack a
census population · **0** `{{double-curly}}` defects · **1** duplicate slug (`guelph-eramosa`).
Types: City 51 · Town 88 · Municipality 68 · Township 195 · Village 11 · First Nations Reserve 82 ·
Hamlet 218 · Locality 1,197 · Neighborhood 604. Regions: 11.

---

## 2. Completeness audit (census vs spreadsheet) — **0 municipalities missing**

The spreadsheet was cross-referenced against the census municipality reference that shipped in the same zip
(`on_municipalities_clean.csv`, **414** Ontario municipalities). **Every one of the 414 census municipalities
is present** in the spreadsheet (0 missing after name-normalized matching). The full enumeration:

| Layer | Count |
|---|--:|
| Municipalities (City/Town/Municipality/Township/Village) | **414** (100% of the census list) |
| First Nations reserves | 82 |
| Hamlets | 218 |
| Localities | 1,197 |
| Neighbourhoods | 604 |
| Repaired split row (Hamilton Township, ON-2515) | +1 |
| **INTENDED total** | **2,515** |

The enumeration reaches the expected "thousands." The volume sits in the **localities (1,197) and
neighbourhoods (604)**, which the publish gate holds out of the index until they show real local signals —
auto-spawning thin pages for them would trigger a domain-wide scaled-content penalty (Core Law 3).

---

## 3. Unified re-score & publish gate (§4B)

One formula for every row (national anchor = Toronto 2021 = 2,794,356; hubs = Toronto + Ottawa; haversine
proximity; `geoRadius` in **metres**).

```
Population 30 : min(30, log10(pop)/log10(2,794,356)*30)
Search Vol 25 : pop bands (≥100k→24 … <200→1)
Competition 20: INVERSE pop bands (≥100k→4 … <1k→18)
Proximity 15  : max((1 − min(km to nearer of Toronto/Ottawa)/500)*15, 0)
Economic 10   : City/Regional→8 · Town/District/County→5 · Community/Village→3 · else→1
```

**Publish gate:** `score ≥ 50 AND real coords AND real census population AND ≥4-of-8 local signals AND ≥1 info-gain`.

---

## 4. Source-data repairs

### 4a. Identity/name repairs
| Row | Defect | Repair |
|---|---|---|
| **ON-0090 "Hamilton"** | Chimera: City-of-Hamilton facts with Hamilton Township (Northumberland) identity & pop 11,059 | Re-identified as **City of Hamilton**, pop **569,353** (StatCan 2021), region → Hamilton-Niagara |
| **ON-2515 (new)** | The 11,059 pop belonged to a real township with no row | Split out a **Hamilton Township** row (built, Verified) |
| **ON-0251** | Name defect `"Blue MountainsThe Blue Mountains"` | → **The Blue Mountains** / `the-blue-mountains` (built) |
| **ON-0135** | Name defect `"NationThe Nation"` | → **The Nation** (built) |
| **ON-0453** | Ghost duplicate of Guelph/Eramosa (Toronto FSA/coords, dup slug) | Deferred (`DEFERRED_DUP`) |

### 4b. Coordinate corruption (systematic source defect) — **found and fixed**
The generation agents discovered that the source spreadsheet **and** its origin pickle (`on_locations_final.pkl`,
byte-identical coordinates) carry **corrupted latitude/longitude for a large share of smaller municipalities** —
e.g. Goderich plotted inland at 42.68,-81.95 (truly on Lake Huron at 43.75,-81.71), St. Marys, Wainfleet,
Niagara-on-the-Lake, and dozens of Southwestern/Eastern townships placed in the wrong county, which produced
absurd "nearby" distances. Because the pickle and xlsx agree, there was **no clean local coordinate source**.

**Fix:** all **242 built municipalities were re-geocoded** to their representative population-centre coordinates
(validated against known anchors — Goderich/NOTL/St. Marys/Kirkland Lake/Oliver Paipoonge all 0 km from
reference; 0 out-of-Ontario-bounds; 4 dispersed townships flagged "rep-point approximate"). The corrected
coordinates feed the `GeoCircle` midpoints, the map facade, and a full recomputation of the same-region
**Nearby Areas** links — which are now geographically accurate (e.g. Goderich → Ashfield-Colborne-Wawanosh,
Central Huron, Huron East, North Huron), with **0 orphans and 0 dangling links**. Corrected coordinates:
[`pipeline/geocoded-all.json`](pipeline/geocoded-all.json). Note: the deferred localities/neighbourhoods carry
the same source-coordinate risk and must be re-geocoded before any future build promotes them.

---

## 5. Coverage reconciliation — INTENDED = BUILT + DEFERRED (nothing dropped)

**INTENDED = 2,515.** Every place is in exactly one bucket ([`data/coverage-ledger.csv`](data/coverage-ledger.csv)).

| Bucket | Count | Meaning |
|---|--:|---|
| **BUILT — Verified** | **223** | World-class pages, published (in sitemap) |
| **BUILT — Needs_Review** | **19** | Built but held from the sitemap (see §7) |
| **BUILT subtotal** | **242** | All publishable-tier rows (Tier A 25 · B 64 · C 153) |
| DEFERRED_GATE | 2,023 | Score < 50 or no census population (all 604 neighbourhoods) → `noindex` |
| DEFERRED_THIN | 249 | Boilerplate-only grounding, pop < 4k → `noindex` |
| DEFERRED_DUP | 1 | ON-0453 ghost duplicate |

**Every one of the 242 publishable-tier rows is now built** (up from 25 in the first pass). `0` rows came back
`FLAG_THIN` — every town that cleared the score gate also cleared the ≥4-signal content gate.

**Verified pages by region:** Southwestern 44 · Grey-Bruce-Simcoe 37 · Eastern 30 · GTA 25 · Central 22 ·
Ottawa-Eastern 20 · Kitchener-Waterloo 15 · Hamilton-Niagara 10 · Northern 11 · Windsor-Essex 9.

---

## 6. Defect sweep on the 242 built pages (all 0)

Automated audit (`pipeline/audit.js`) — **0 defects**:

| Check | Result |
|---|--:|
| Duplicate slugs · `{{` · unknown tokens · duplicate alts · dup openers | 0 · 0 · 0 · 0 · 0 |
| Entity 50–100w / snippet 40–60w / body 400–600w / FAQ 40–60w | all in range |
| AI snippet + last FAQ end in `Call {PHONE}.` | 242 / 242 |
| Banned openers | 0 |
| ≥4 local signals + ≥1 info-gain | 242 / 242 (signal counts: 5→40 · 6→89 · 7→78 · 8→35) |
| Meta ≤ 160 chars · geoRadius in metres | 242 / 242 |
| Orphan pages · dangling nearby links | 0 · 0 |

Invented-fact posture: every concrete fact traces to the sheet's curated facts, the region bundles, or
well-documented encyclopedic knowledge; agents were instructed to `FLAG_THIN` rather than pad, and to omit any
uncertain detail. Populations use the 2021 census figures verbatim (no invented estimates).

---

## 7. Distribution — Verified vs Needs_Review

**223 Verified** are published (sitemap). **19 Needs_Review** are built but excluded from the sitemap, pending
a light human confirmation pass:

- **3 First Nations territories** kept for respectful review: Oneida Nation of the Thames, Tyendinaga Mohawk
  Territory, Akwesasne.
- **16 small townships / coordinate-driven** (coordinates now corrected, ready to promote after a glance):
  Southwest Middlesex, Howick, Northern Bruce Peninsula, Amaranth, Beckwith, Elizabethtown-Kitley,
  Hastings Highlands, North Stormont, Whitewater, West Nipissing, Kirkland Lake, Oliver Paipoonge, Seguin,
  Wainfleet, West Lincoln, Niagara-on-the-Lake.

---

## 8. Schema / static-render / crawler (§6E, §1.5)

- **JSON-LD** — one `@graph` per page ([`schema/jsonld-graphs.jsonl`](schema/jsonld-graphs.jsonl), **242**
  validated, 0 defects): `{LOCALBUSINESS_TYPE}` (NAP once, referenced by `@id`), `Service` (`areaServed` City +
  neighbours + `GeoCircle` in **metres**), `WebPage` (`speakable` → `.answer-first`, ISO `dateModified`),
  `BreadcrumbList`, `ImageObject`, `FAQPage` (mirrors visible FAQ). No `HowTo`, no self-serving `aggregateRating`.
- **Static render** — [`schema/sample-page-toronto.html`](schema/sample-page-toronto.html): H1 + all body +
  every `<a href>` + `ld+json` in the initial HTML, no JS; map is a click-to-load facade; OGL-Canada footer.
- **Sitemap** — [`schema/sitemap-areas-ontario.xml`](schema/sitemap-areas-ontario.xml): **223 Verified URLs
  only**, honest `<lastmod>` (Needs_Review excluded).
- **robots.txt** — allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot,
  Google-Extended, GPTBot.

---

## 9. Two sample pages across the score range

- **Top — Toronto (ON-0001, unified 81):** entity opens "Toronto is the capital of Ontario and the largest
  city in Canada, with a 2021 census population of 2,794,356…"; 6 signals; info-gain "200+ ethnic groups, needs
  vary block by block across 158 neighbourhoods."
- **Lower tier — Goderich (ON-0371, Tier C):** entity opens "Goderich is a town on the Lake Huron shore in
  southwestern Ontario…"; info-gain "'Canada's prettiest town' laid out around an octagonal central square, with
  a working salt mine under Lake Huron." Coordinates corrected from the corrupted source value; nearby links now
  its true Huron-County neighbours.

Full records: [`data/content-all.jsonl`](data/content-all.jsonl). Both pass the find-and-replace test.

---

## 10. Reproduce / resume

`pipeline/` is the full engine. `content-spec.md` is the per-row contract; `region-bundles.md` the 11 shared
region bundles; `batches-in/` + `bc-batches-in/` the ready grounding; `geocoded-all.json` the corrected
coordinates. Flow: generate per `content-spec` → `audit.js` (0 defects) → `apply-geocode.js` (coords + nearby) →
`assemble.js` (CSV + manifest) → `build-schema.js` (JSON-LD + sitemap + robots). Deferred localities/
neighbourhoods, if ever promoted, must be re-geocoded first (§4b).
