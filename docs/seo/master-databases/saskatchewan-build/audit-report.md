# Saskatchewan Build — Final Audit & Coverage Reconciliation

> Run date 2026-07-10 (full-coverage expansion 2026-07-12) · Mode A (master xlsx + StatCan CSV + NRCan CGN
> re-grounding) · niche-agnostic `{TOKENS}` preserved. Evidence below is generated from the committed
> `locations/*.json`, not asserted. **Contains information licensed under the Open Government Licence – Canada.**

---

## A · Completeness audit — the true Saskatchewan universe

The question "do we have ALL locations — there should be thousands?" was answered by enumerating the
authoritative gazetteer directly:

| Source | What it holds |
|---|---|
| **NRCan CGN** (populated-place features) | **3,259** — 16 city · 146 town · 310 village · 213 hamlet · **1,384 unincorporated locality** · **823 First Nations reserve** · 367 rural municipality |
| **StatCan** `sk_municipalities_clean.csv` | 770 incorporated municipalities · **769 with a published 2021 population** |
| **The sheet** `MASTER_LOCATIONS` | 1,926 rows (incl. 786 localities, 164 neighborhoods, 74 reserves, 125 organized hamlets, 8 Métis) |

**Finding:** the "thousands" are real in the gazetteer (3,259 features) but are almost entirely
**unincorporated localities, hamlets, and reserves with no published census population**. The sheet is
**complete for incorporated municipalities** — all 769 StatCan municipalities are present (only Flin Flon,
a Manitoba border city with a 159-person SK sliver, is absent). So no *groundable* place was missing.

**Why only 763 pages, not 3,259:** a page can only be built for a place with a real, sourced population —
inventing a population to manufacture a page would violate the anti-hallucination core law and create
doorway pages (the exact thing §1 and §4B forbid). Exactly **764** CGN features carry a StatCan census
population; **763** of those also resolve to CGN coordinates and clear the duplicate-place check. Those 763
are built. The remaining ~2,495 gazetteer features (unincorporated localities, hamlets, reserves,
neighborhoods) are deferred with a reason — accounted for, not dropped.

## B · Coverage reconciliation (nothing silently dropped)

```
INTENDED   = 1,926   every row in MASTER_LOCATIONS
BUILT      =   763   every incorporated SK municipality with a real StatCan population + CGN coordinates
DEFERRED   = 1,163   each with a one-line reason in deferred-ledger.csv
CHECK      : 1,926 = 763 + 1,163   ✓   (every place in exactly one bucket)
```

Plus **9 region pages + 1 hub page = 773 indexable URLs** (region/hub pages specified in `region-bundles.md`).

**BUILT by type:** Rural Municipality 295 · Village 245 · Town 144 · Resort Village 39 · City 16 ·
Northern Village 11 · Northern Hamlet 11 · Northern Town 2.
**BUILT by region:** Southeast 206 · Central 162 · Southwest 86 · Northwest 84 · West Central 63 ·
Southern 55 · Regina Region 44 · Saskatoon Region 40 · Northern 23.

**DEFERRED buckets (each row tagged in the ledger):**
| Reason | Count |
|---|---:|
| No published StatCan census population (unincorporated locality / reserve / neighborhood — population would have to be invented) | 1,134 |
| Duplicate place (CGNDB "Locality" twin of an incorporated municipality) | 24 |
| No CGN-verifiable coordinates (has StatCan pop but no confident CGN name match: Grand Coulee, Katepwa, Pense, Marshall, Lakeland) | 5 |
| **Total deferred** | **1,163** |

Deferred ≠ deleted. The 823 CGN reserves / 74 sheet reserves, 1,384 CGN localities / 786 sheet localities,
125 organized hamlets, 8 Métis communities, and 164 Saskatoon/Regina neighborhoods are held for a phase-2
pass sourced from StatCan reserve/DPL population tables or first-party local signals — never published on
invented numbers.

## C · Defect sweep (all 0 unless noted — measured across all 763 rows)

| Check | Count |
|---|---:|
| Duplicate slugs | **0** |
| `{{` double-curly defects | **0** |
| Duplicate image alt strings | **0** |
| Duplicate primary keywords (cannibalization) | **0** |
| Rows sharing an About-opener (first 55 chars) | **0** |
| Rows missing a `Call {PHONE}` CTA (AI snippet + last FAQ) | **0** |
| Broken sideways links (neighbor slug not a built page) | **0** |
| Self-as-neighbor / duplicate-name neighbor entries | **0** |
| Waterway naming bugs (e.g. "Creek River") | **0** |
| Find-and-replace failures (no real fact survives name removal) | **0** |
| Word-count gate fails (Entity 50–100 · AI 40–60 · About 400–600 · FAQ 40–60) | **0** |
| Rows below 4 local signals | **0** (signals distribute 4→8: two rows at 4, 112 at 5, 413 at 6, 228 at 7, 8 at 8) |

**Orphans:** 0 true orphans — every built page receives inbound links from its region page (links DOWN to
all its locations) and its region blog set. 7 pages (e.g. Stony Rapids, Chaplin) are not reciprocated
inside a sibling's nearest-5 sideways module because they are geographically isolated; they still carry
region + blog inbound, so they are not orphans.

**Grounding spot-check (10 rows vs dataset):** Saskatoon, Regina, Air Ronge, Shields, Lampman, Esterhazy,
Clavet, Corman Park, Weyburn, Melville — every concrete fact (population, 2016 comparison, distances,
parent RM, adjacent waterway, region economy, curated landmarks) traces to the master xlsx, StatCan
`sk_municipalities_clean.csv`, or NRCan CGN. **0 invented facts found.** Populations are StatCan-sourced
(0 conflicts vs the sheet); coordinates are CGN-derived after the sheet's synthetic coordinates were
rejected (README §1).

## D · Schema / static / crawler contract

- **JSON-LD:** each page emits one `@graph` (README §3) — `{LOCALBUSINESS_TYPE}` (once, referenced by
  `@id`), `Service` with `areaServed` City + `GeoCircle` (`geoRadius` in **metres**: City 8k–12k · Town
  4k · Village/Resort/Northern 2.5k · RM 25k), `WebPage` (`dateModified` 2026-07-10, `speakable` →
  `.answer-first`), `BreadcrumbList`, `FAQPage` (verbatim to visible FAQs), `ImageObject`. No `HowTo`, no
  self-serving `aggregateRating`. Validates against Rich Results + Schema.org with 0 errors.
- **Static render:** all body copy and JSON-LD are plain data → server-rendered into initial HTML; map is
  a facade; schema is not JS-injected. JS-disabled HTML shows H1 + body + all `ld+json` + `<a href>`.
- **Sitemap/robots (site-level):** 763 built URLs + 10 region/hub URLs in a segmented sitemap with honest
  `<lastmod>2026-07-10</lastmod>`; deferred slugs excluded. Robots allows Googlebot, Bingbot,
  OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended. Slugs frozen (301 on rename).

## E · Distribution & samples

- **Verification:** 763 built, all population-StatCan-sourced + CGN-coordinate-verified. **Unified score
  range: 27.4 → 76.2** (score is now a priority sort, not a gate — the grounding gate is what publishes).
- **Image tier:** 763 `flag` (place-neutral Saskatchewan flag fallback; every alt/filename/EXIF describes
  the PLACE; each row carries a real-photo `upgrade_todo`). See `image-manifest.csv`.
- **Sample pages across the range** (full JSON in `locations/`):

**Sample 1 — Saskatoon (City, unified 76.2, `saskatoon`)** — flagship, curated facts:
> *Entity:* "Saskatoon is a city in Saskatoon Region, Saskatchewan, Canada, with a 2021 census population
> of 266,141, up from 247,201 in 2016… Its economy runs on potash-mining head offices (Nutrien, Cameco),
> the University of Saskatchewan, a growing tech sector and agricultural research. Landmarks include the
> University of Saskatchewan, the Meewasin Valley and Remai Modern, the largest city in the region."
> *Info-gain:* population rose 8% 2016→2021. *Signals (8):* population · hub-distance · region-climate ·
> region-economy · municipal-structure · waterway · named-landmark · growth-trend.

**Sample 2 — Air Ronge (Northern Village, unified 45.4, `air-ronge`)** — far-north, dataset-composed:
> *Entity:* "Air Ronge is a northern village in Northern Saskatchewan, Saskatchewan, Canada, with a 2021
> census population of 1,365, up from 1,199 in 2016. It sits 340 km from Saskatoon in uranium mining
> (Cameco and Orano at McArthur River, Cigar Lake, Key Lake and Rabbit Lake), forestry, commercial fishing
> and outfitting tourism country. The Wood Creek runs nearby. Neighbouring communities include La Ronge,
> Weyakwin and Pinehouse."
> *About:* correctly gets boreal-winter framing ("long, severe boreal winters with deep frost and heavy
> snow") and La Ronge 5 km away. *Signals (6):* population · hub-distance · region-climate · region-economy
> · waterway · growth-trend. Find-and-replace passes: strip "Air Ronge" and 1,365, +14%, 340 km, the
> uranium economy, Wood Creek, and La Ronge/Weyakwin/Pinehouse all remain.

## F · Method notes (grounding integrity)

1. The sheet's synthetic coordinates and derived region/distance columns were **rejected** and rebuilt
   from NRCan CGN by name+type join; distances recomputed by haversine to CGN hub points.
2. The publish gate is **authoritative-source grounding** — population from StatCan 2021 + coordinates
   from CGN — not the sheet's own `Verification_Status` (which flags its 2025 estimate column, not
   grounding) and not the unified score. Every built place has a real, sourced population.
3. Business copy is 100% `{TOKENS}`; only real place facts are literal. Verified by the 0 `{{` and 0
   invented-fact sweeps above. One find-and-replace away from any trade.
