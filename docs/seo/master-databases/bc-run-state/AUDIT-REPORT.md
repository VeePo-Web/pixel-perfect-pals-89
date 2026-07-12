# British Columbia — "Areas We Serve" Build: Final Audit Report (Full-Census Expansion)

> **Run complete, census-expanded (2026-07-12).** The original master spreadsheet held only **480 rows**.
> Audited against the authoritative gazetteer, enumeration was expanded to the **full BC populated-place
> census** — every city, town, village, hamlet, community, and neighbourhood — then re-gated and reconciled.
> Services stay single-curly `{TOKENS}`; place facts are real and grounded (spreadsheet StatCan 2021 +
> GeoNames CC-BY).

---

## 1. Coverage audit — the spreadsheet was NOT the full census

The attached "COMPLETE" spreadsheet enumerated **480** BC places. The GeoNames Canada gazetteer
(admin1=02 = British Columbia, feature class P, non-abandoned) lists **1,827** populated places. Merged
and de-duplicated against the spreadsheet, the true enumerated universe is:

```
INTENDED (full census)  = 1,986 places
  from spreadsheet        480
  added from GeoNames   1,506   (distinct places the spreadsheet never contained)
  matched/deduped         321   (GeoNames entries already covered by a spreadsheet row)
```

This is the honest answer to "make sure you have ALL locations — there should be thousands." There are
~2,000 named populated places in BC; every one is now enumerated, grounded with real coordinates (1,939 of
1,986 have authoritative coords), and bucketed.

> Wikidata SPARQL enrichment (§4A) was attempted for extra populations/`@id`s but the public WDQS endpoint
> was returning empty result sets under load at run time; GeoNames (CC-BY, an authoritative §4A source) was
> used as the population/coordinate base instead. A StatCan GeoSuite CSD pull is the recommended next
> enrichment to lift several hundred more small municipalities/reserves over the population gate.

---

## 2. Coverage reconciliation — nothing dropped

```
INTENDED      = 1,986
BUILT         =   194   (score ≥ 50 + real coords + real population + ≥4 signals + ≥1 info-gain, Verified)
NEEDS_REVIEW  =     1   (gated-in but held from publish — BC-0358 Pender, coord defect)
DEFERRED      = 1,791   (noindex / not generated — every one with a reason below)
CHECK: 194 + 1 + 1,791 = 1,986 ✓   Every place is in exactly one bucket.
```

**Deferred reasons (1,791):**

| Reason | Count |
|---|---|
| No real census population (small localities, GeoNames pop=0) | 1,226 |
| Unified score < 50 | 263 |
| Neighbourhood tier — real signals required, never auto-spawned | 218 |
| Suburb/neighbourhood of a built city — neighbourhood tier | 26 |
| No authoritative coordinates | 47 |
| Duplicate of an already-built municipality | 8 |
| Data quality (implausible population / duplicate island trust area) | 3 |

Deferred ≠ deleted. The gate is deliberately hard (§4B, "volume is a liability; the gate is the product"):
a page with no grounded population, or that would merely duplicate a bigger place's keyword, is **not** built
— it ships `noindex`, stays out of the sitemap, and is recoverable later when real signals/population exist.

**Why the built tier is ~194, not ~2,000 (deliberate quality guards):**
- **218 neighbourhoods** (GeoNames PPLX) were held to the neighbourhood tier rather than published as
  standalone location pages that would cannibalise their parent city's primary keyword (§7 anti-cannibalisation).
- **26 GeoNames "populated places"** that are actually suburbs within ~8 km of a larger built city (West End,
  Burquitlam, Harewood, Tillicum, Whalley…) were reclassified to the neighbourhood tier — their GeoNames
  populations are dissemination-area estimates, not town populations.
- **8 duplicate city entries** (a second "Surrey"/"Saanich"/"Langley"/"North Vancouver" whose GeoNames
  representative point drifted >6 km from the spreadsheet's) were deduped.
- **3 bad-data rows** rejected: Hanceville (GeoNames pop 10,000 for a settlement of dozens — provably wrong),
  Aldergrove East (near-duplicate of Aldergrove), Denman Island Trust Area (duplicate of built Denman Island).

---

## 3. What was added this run (census expansion)

**13 genuinely new distinct communities** GeoNames carried that the spreadsheet lacked — all Verified:

| New community | Region | Pop (GeoNames) | Score |
|---|---|---|---|
| Aldergrove | Metro Vancouver | 12,363 | 61.5 |
| Cowichan Bay | Vancouver Island South | 2,799 | 55.9 |
| Langdale | Gulf Islands & Sunshine Coast | 2,407 | 55.8 |
| Mount Currie (Lil'wat Nation) | Sea-to-Sky | 1,242 | 51.8 |
| Youbou | Gulf Islands & Sunshine Coast | 1,302 | 53.2 |
| South Pender Harbour | Gulf Islands & Sunshine Coast | 1,187 | 53.1 |
| Fairwinds | Gulf Islands & Sunshine Coast | 1,147 | 53.0 |
| Welcome Beach | Gulf Islands & Sunshine Coast | 1,125 | 53.4 |
| Oyster River | Vancouver Island Central & North | 1,500 | 51.0 |
| Bradner | Metro Vancouver | 3,213 | 55.7 |
| Cherry Point | Vancouver Island South | 582 | 50.8 |
| Sunset Beach | Metro Vancouver | 424 | 50.7 |
| Shirley | Vancouver Island South | 485 | 50.3 |

Their populations are GeoNames estimates (flagged as approximate in each grounding bundle); content was
written conservatively — real geography and Indigenous-governance facts, no invented specifics.

---

## 4. Built distribution by region (194)

| Region | Built |
|---|---|
| Metro Vancouver | 46 |
| Vancouver Island Central & North | 41 |
| Okanagan | 22 |
| Vancouver Island South | 21 |
| Gulf Islands & Sunshine Coast | 18 |
| Fraser Valley | 12 |
| Kootenays | 9 |
| Thompson-Nicola & Cariboo | 8 |
| Sea-to-Sky | 7 |
| Northern BC - Northwest | 5 |
| Peace Region & Northeast | 3 |
| Northern BC - Prince George | 2 |

181 from the original spreadsheet + 13 new GeoNames communities. Each carries the §7 linking law
(1 UP, 3–5 haversine SIDEWAYS, DOWN where children exist, 2–4 blog); structure in
`deliverables/bc_page_structure.json`, 12 region hubs in `bc_region_pages.json`.

---

## 5. Defect sweep (all zero, over the built set)

| Check | Count |
|---|---|
| Duplicate slugs (whole 1,986-row universe) | **0** |
| `{{}}` double-curly | **0** |
| Duplicate alt strings | **0** |
| Orphan pages (no inbound link) | **0** |
| Pages sharing a primary keyword | **0** |
| Neighbours sharing a Short_Description opener | **0** |
| Missing `{PHONE}` CTA where required | **0** |
| Invented facts on a 10-page spot-check vs bundle | **0** |

Average signals per built page: **7.7** (gate floor 4). Word-count / CTA / token-purity gates enforced in
`assemble2.js`.

---

## 6. Distribution & samples

- **Verified & published: 194.** **Needs_Review (excluded): 1 — BC-0358 Pender Islands**, agent-flagged for
  a bad source coordinate (northern Strait vs Southern Gulf Islands); held from the sitemap pending a coord fix.

### Sample A — Kelowna (BC-0007, score 63.9, Okanagan)
Entity (91w): "Kelowna is a city in the Central Okanagan Regional District of British Columbia, Canada,
spread along the eastern shore of Okanagan Lake. As of the 2021 Census it had a population of 144,576…
Canada's premier wine region, with 180-plus wineries… UBC Okanagan and Kelowna International Airport…"
Alt: "Kelowna, Okanagan British Columbia — hillside vineyards and stucco suburbs above the eastern shore of
Okanagan Lake." Signals 6. Verified.

### Sample B — Mount Currie (BC-1244, score 51.8, Sea-to-Sky) — NEW census community
AI snippet (46w): "{COMPANY_NAME} provides {SERVICE} throughout Mount Currie, the Lil'wat Nation community
in the Pemberton Valley along Highway 99. From farm properties near the Lillooet River to homes below Mount
Currie peak, our {BUSINESS_TYPE} delivers {SERVICE_DESCRIPTION} with {RESPONSE_TIME} response. Call {PHONE}."
Alt: "Mount Currie, Sea-to-Sky British Columbia — Lil'wat Nation community on the Pemberton Valley floor
beneath the peak it is named for." Signals 7. Verified. Both pass the find-and-replace test.

---

## 7. Deliverables (in this folder)

| File | What |
|---|---|
| `bc_universe.json` / `bc_universe_final.json` | Full 1,986-place enumerated + scored + gated census (final has merged content) |
| `bc_census_places.json` | Raw GeoNames BC populated-place enumeration (1,827) |
| `deliverables/bc_master_seo_database_UPGRADED.xlsx` | **All 1,986 rows**, original 4 sheets + 8 QC columns (Unified_Score, Gate_Publishable, Defer_Reason, Hero_Image_Alt_Geo, Info_Gain_Element, Signals_Count, Geo/Pop source) |
| `deliverables/bc_image_manifest.json` | 194 images — place-describing flag fallback, two-layer alt, EXIF |
| `deliverables/bc_page_structure.json` | Per-page linking law (breadcrumb, UP/SIDEWAYS/DOWN/blog) |
| `deliverables/bc_region_pages.json` | 12 region hub pages + children |
| `deliverables/bc_sitemap.xml` | 207 URLs (hub + 12 regions + 194 locations), honest lastmod 2026-07-12 |
| `deliverables/bc_audit_stats.json` | Machine-readable audit (this report's numbers) |
| `out/BC-XXXX.json` (195) · `bundles/BC-XXXX.json` (195) | Per-location content + grounding bundles |
| `enumerate.js · merge_census.js · score_universe.js · refine_gate.js · split_suburbs.js · finalize_new.js · assemble2.js · build_artifacts2.js` | Reproducible full-census pipeline |

**OGL compliance:** GeoNames (CC-BY) + StatCan sources recorded in `Data_Sources`; site footer must carry
*"Contains information licensed under the Open Government Licence – Canada."*

**Reusable for the next province:** the census-expansion pipeline (GeoNames enumerate → merge/dedup vs sheet
→ score → gate → build) is province-agnostic; only the two hubs, region bundles, and admin1 code change.
