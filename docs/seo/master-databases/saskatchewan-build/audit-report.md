# Saskatchewan Build — Final Audit & Coverage Reconciliation

> Run date 2026-07-10 · Mode A (master xlsx + StatCan CSV + NRCan CGN re-grounding) · niche-agnostic
> `{TOKENS}` preserved. Evidence below is generated from the committed `locations/*.json`, not asserted.
> **Contains information licensed under the Open Government Licence – Canada.**

---

## A · Coverage reconciliation (nothing silently dropped)

```
INTENDED   = 1,926   every row in MASTER_LOCATIONS
BUILT      =   130   cleared the gate (world-class location pages)
DEFERRED   = 1,796   noindex / not generated — each with a one-line reason in deferred-ledger.csv
CHECK      : 1,926 = 130 + 1,796   ✓   (every place in exactly one bucket)
```

Plus 8 region pages + 1 hub page + 1 navigation-only Northern region page = **139 indexable URLs** in the
location tier (region/hub pages specified in `region-bundles.md`; Northern ships `noindex`).

**BUILT by region** (highest-score-first): Central Saskatchewan 29 · Southeast 28 · Saskatoon Region 27 ·
Regina Region 17 · Northwest 17 · West Central 5 · Southern 4 · Southwest 3.
**BUILT by type:** City 16 · Town 76 · Rural Municipality 33 · Village 5.

**DEFERRED buckets (each row tagged in the ledger):**
| Reason | Count |
|---|---:|
| Unified score below 50 | 947 |
| No CGN-verifiable coordinates (name/type not matched in NRCan CGN) | 605 |
| No real StatCan census population | 190 |
| Rural Municipality below tier-1 viability floor (pop < 1,000) | 54 |
| **Total deferred** | **1,796** |

Deferred ≠ deleted. The 164 Saskatoon/Regina neighborhood rows (no neighborhood-level census population in
the sheet) and all First Nations reserve rows (source `Verification_Status = Needs_Review`, population
sourcing unresolved) fall into these buckets and are held for a phase-2 pass with real local signals —
never published on unverified data.

## B · Defect sweep (all 0 unless noted — measured across all 130 rows)

| Check | Count |
|---|---:|
| Duplicate slugs | **0** |
| `{{` double-curly defects | **0** |
| Duplicate image alt strings | **0** |
| Duplicate primary keywords (cannibalization) | **0** |
| Neighbors sharing an About-opener (first 50 chars) | **0** |
| Rows missing a `Call {PHONE}` CTA (AI snippet + last FAQ) | **0** |
| Broken sideways links (neighbor slug not a built page) | **0** |
| Self-as-neighbor / duplicate-name neighbor entries | **0** |
| Waterway naming bugs (e.g. "Creek River") | **0** |
| Find-and-replace failures (no real fact survives name removal) | **0** |
| Rows below 4 local signals | **0** |
| Word-count gate fails (Entity 50–100 · AI 40–60 · About 400–600 · FAQ 40–60) | **0** |

**Orphans:** 0 true orphans — every built page receives inbound links from its region page (links DOWN to
all its locations) and its region blog set. One page (Swift Current) is not reciprocated inside a sibling's
nearest-5 sideways module because the southwest is geographically sparse; it still has region + blog
inbound, so it is not an orphan.

**Grounding spot-check (10 rows vs dataset):** Saskatoon, Regina, Moose Jaw, Esterhazy, Lumsden, Clavet,
Corman Park, Warman, Weyburn, Melville — every concrete fact (population, 2016 comparison, distances,
parent RM, adjacent waterway, region economy, curated landmarks) traces to the master xlsx, StatCan
`sk_municipalities_clean.csv`, or NRCan CGN. **0 invented facts found.** Populations were reconciled
StatCan-over-sheet with 0 conflicts; coordinates were re-derived from CGN after the sheet's synthetic
coordinates were rejected (see README §1).

## C · Schema / static / crawler contract

- **JSON-LD:** each page emits one `@graph` (README §3) — `{LOCALBUSINESS_TYPE}` (defined once,
  referenced by `@id`), `Service` with `areaServed` City + `GeoCircle` (`geoRadius` in **metres**: City
  8k–12k · Town 4k · Village 2.5k · RM 25k), `WebPage` (`dateModified` 2026-07-10, `speakable` →
  `.answer-first`), `BreadcrumbList`, `FAQPage` (verbatim to visible FAQs), `ImageObject`. No `HowTo`, no
  self-serving `aggregateRating`. Validates against Rich Results + Schema.org with 0 errors.
- **Static render:** all body copy and JSON-LD are plain data in the row → server-rendered into initial
  HTML; map is a facade (README §3), schema is not JS-injected. JS-disabled HTML shows H1 + body + all
  `ld+json` + `<a href>`.
- **Sitemap/robots (site-level contract):** 130 built URLs + 9 region/hub URLs in a segmented sitemap with
  honest `<lastmod>2026-07-10</lastmod>`; deferred slugs excluded. Robots allows Googlebot, Bingbot,
  OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended. Slugs frozen (301 on rename).

## D · Distribution & samples

- **Verification:** 130 `Verified` · 0 `Needs_Review` (Needs_Review rows were gated out into DEFERRED, not
  published). **Unified score range of built set: 50.0 → 76.2.** **Signals per page: 5 → 8** (min gate 4):
  22 rows at 5 · 53 at 6 · 47 at 7 · 8 at 8.
- **Image tier:** 130 `flag` (place-neutral Saskatchewan flag fallback; every alt/filename/EXIF describes
  the PLACE, never the flag; each row carries a real-photo `upgrade_todo`). See `image-manifest.csv`.
- **Two full sample pages across the range** are in `locations/` — the highest-score city and the
  lowest-score village:

**Sample 1 — Saskatoon (City, unified 76.2, `saskatoon`)** — flagship, curated facts:
> *Entity:* "Saskatoon is a city in Saskatoon Region, Saskatchewan, Canada, with a 2021 census population
> of 266,141, up from 247,201 in 2016. It was incorporated as a city in 1906 and founded in 1882 by the
> Temperance Colonization Society. Its economy runs on potash-mining head offices (Nutrien, Cameco), the
> University of Saskatchewan, a growing tech sector and agricultural research. Landmarks include the
> University of Saskatchewan, the Meewasin Valley and Remai Modern, the largest city in the region."
> *About opener:* "Saskatoon is the 'Paris of the Prairies' and 'Bridge City,' where eight bridges cross
> the South Saskatchewan River…" *Info-gain:* population rose 8% 2016→2021 (247,201 → 266,141).
> *Signals (8):* population · hub-distance · region-climate · region-economy · municipal-structure ·
> waterway · named-landmark · growth-trend.

**Sample 2 — Clavet (Village, unified 50.6, `clavet`)** — gate-floor, purely dataset-composed:
> *Entity:* "Clavet is a village in Saskatoon Region, Saskatchewan, Canada, with a 2021 census population
> of 450, up from 410 in 2016. It sits 26 km from Saskatoon in potash mining, the University of
> Saskatchewan and grain and pulse farming country. Cheviot Lake lies about 5.6 km away. Neighbouring
> communities include Blucher, Dundurn and Allan, within the RM of Blucher."
> *About opener:* "Clavet is one of Saskatoon Region's fastest-growing communities, up 10% to 450 residents
> in the 2021 census as Saskatoon's commuter belt pushes 26 km out." *Info-gain:* +10% 2016→2021 (410 →
> 450). *Hyperlocal FAQ:* "Is Clavet too small for a dedicated {BUSINESS_TYPE}?" *Signals (7):* population ·
> hub-distance · region-climate · region-economy · municipal-structure · waterway · growth-trend.
> The find-and-replace test passes: strip "Clavet" and 450, +10%, 26 km, RM of Blucher, Cheviot Lake and
> the Blucher/Dundurn/Allan neighbor set all remain.

## E · Method notes (grounding integrity)

1. The sheet's synthetic coordinates and the region/distance columns derived from them were **rejected**
   and rebuilt from NRCan CGN by name+type join; distances recomputed by haversine to CGN hub points.
2. Every place was re-scored with the single unified network formula so Saskatchewan sorts on the same
   scale as the other provincial databases (README §1).
3. Business copy is 100% `{TOKENS}`; only real place facts are literal. Verified by the 0 `{{` and 0
   invented-fact sweeps above. The build is one find-and-replace away from any trade.
