# New Brunswick — Enumeration Completeness Audit

> Follow-up audit answering one question: **do we have every location, neighbourhood, and community in
> New Brunswick, or did the enumeration miss any?** Method: reconcile the original CGN + StatCan
> enumeration against a second, independent gazetteer (GeoNames), reconcile every place into exactly one
> bucket, and build the genuinely-groundable neighbourhoods the cross-check surfaced. Run July 2026.

## 1. What triggered this audit

The first build enumerated **2,225 places** (266 StatCan census subdivisions + 1,959 NRCan CGN
sub-CSD communities) and built the 66 that cleared the publish gate. The question raised: is 2,225 actually
*complete*, and are city **neighbourhoods** covered? A single-source enumeration can silently miss places
one gazetteer never recorded — so this audit cross-validates against a second source.

## 2. Source-by-source reconciliation

### CGN (NRCan Canadian Geographical Names) — the original source
The NB CGN file holds **2,280 populated places**. Reconciled exactly:

| CGN populated places | 2,280 |
|---|---:|
| − infrastructure points (130 railway points, 11 landings, 3 post offices, 1 station, 1 industrial park) | −146 |
| − entries that dedupe to a census subdivision by name | −175 |
| = CGN-only community rows in the enumeration | **1,959** |
| + StatCan census subdivisions (cities/towns/villages/rural munis/parishes/reserves) | +266 |
| = original enumeration | **2,225** |

Nothing was dropped from CGN except non-residential infrastructure (correctly excluded per §4A).

### GeoNames (CC-BY) — the independent cross-check
Filtered the GeoNames Canada dump to New Brunswick (admin1 = 04), feature class P (populated place):
**2,120 NB populated places**, of which **81 are neighbourhoods (feature code PPLX)**. Matching every
GeoNames place by normalized name against the enumeration:

- **1,954 of 2,120 (92%)** already present — confirms the CGN/StatCan enumeration was substantially complete.
- **166 present in GeoNames but not by name in the enumeration:**
  - **32 neighbourhoods (PPLX)** within 20 km of a built city — real city districts (Uptown Saint John,
    Downtown Moncton, Marysville, Lancaster, and Fredericton subdivisions).
  - **134 other populated places** — mostly StatCan population-centre / dispersed-community names
    (e.g. "Greater Lakeburn", "Shediac Bridge-Shediac River", "Black River-Hardwicke"), First Nations
    communities, and hamlets GeoNames names differently than CGN.

## 3. Updated coverage reconciliation (INTENDED = BUILT + DEFERRED)

**INTENDED = 2,391 places** (2,225 CGN/StatCan + 32 GeoNames neighbourhoods + 134 GeoNames communities).
Every place is in exactly one bucket.

| Bucket | Count |
|---|---:|
| **BUILT — location pages** (municipalities clearing the gate) | 66 |
| **BUILT — neighbourhood pages** (grounded city districts) | 7 |
| **BUILT total (place pages)** | **73** |
| DEFERRED — census subdivisions below gate / parish / reserve | 200 |
| DEFERRED — CGN sub-CSD communities (no census population) | 1,959 |
| DEFERRED — GeoNames neighbourhoods (subdivision-level, insufficient distinct signals) | 25 |
| DEFERRED — GeoNames-only communities (no standalone census population) | 134 |
| **DEFERRED total** | **2,318** |
| **INTENDED = BUILT places (73) + DEFERRED (2,318)** | **2,391** |

Aggregation pages (not "places"): 1 hub + 7 region pages. **Total published URLs: 81.**

## 4. The neighbourhood tier (new in this audit)

The gate for a neighbourhood page is stricter than for a town: it is built **only where real, verifiable
local signals exist** (§4 "never auto-spawn empty pages"). Of the 32 GeoNames neighbourhoods:

**7 BUILT** — iconic, groundable districts with verifiable heritage/landmark/street facts:

| Neighbourhood | Parent city | Grounding signal |
|---|---|---|
| Uptown Saint John | Saint John | Brick core rebuilt after the 1877 Great Fire; City Market; King/Prince William Streets |
| The North End | Saint John | Historic working district; Main Street; split by the Saint John Throughway |
| The South End | Saint John | Victorian rowhousing on the harbour peninsula tip |
| The West Side | Saint John | Carleton/Lancaster; Reversing Falls; Carleton Martello Tower NHS |
| Downtown Fredericton | Fredericton | Garrison District; Queen Street; 2018/2019 flood-zone riverfront |
| Marysville | Fredericton | National Historic Site; planned cotton-mill company town on the Nashwaak |
| Downtown Moncton | Moncton | Main Street core; Avenir Centre; Resurgo Place; Petitcodiac tidal bore |

**25 DEFERRED** — subdivision- or statistical-section names (e.g. Skyline Acres, Heron Springs,
Sunshine Gardens, Northbrook Heights, Parkton, "Fredericton Northside") with only a name + centroid +
GeoNames population estimate. Building them to the 400–600-word grounded depth bar would require inventing
landmarks/streets — a Law #1 violation — so they wait for real local signals. Each is listed with its
reason in `data/nb_neighborhoods.csv`.

> **Grounding note:** GeoNames PPLX population figures are dissemination-area estimates, not official
> neighbourhood census counts. The built neighbourhood pages therefore cite the **parent city's real 2021
> census population** and lean on verifiable heritage/landmark/street facts — no GeoNames population number
> is presented as a census figure anywhere in the copy.

## 5. Defect sweep on the expanded set (all zero)

66 location + 7 region + 7 neighbourhood + 1 hub = 81 pages re-audited:

duplicate slugs 0 · `{{}}` 0 · duplicate alt strings 0 · orphan pages 0 · pages sharing a primary keyword 0 ·
neighbours sharing an About-opener 0 · missing `{PHONE}` CTAs 0 · JSON-LD errors 0 · FAQPage under 4 Q&A 0 ·
`geoRadius` not in metres 0 · dishonest dates 0 · word-count flags 0 · missing OGL footer 0 · non-H1 pages 0 ·
titles > 60 after fill 0 · non-navigational cross-page duplicate sentences 0.

Linking law extended: each built city (Saint John, Fredericton, Moncton) now links **down** to its
neighbourhood pages, and each neighbourhood links **up** to its city and **sideways** to its siblings —
no orphans, bidirectional.

## 6. New / updated files

```
COVERAGE-AUDIT.md                         this document
pages/neighborhoods/*.md                  7 grounded neighbourhood pages
data/nb_neighborhoods.csv                 all 32 GeoNames neighbourhoods: 7 BUILT + 25 DEFERRED + reasons
data/nb_geonames_supplementary_deferred.csv  134 GeoNames-only communities, deferred with reasons
data/sitemap-areas.xml                    now 81 URLs (adds the 7 neighbourhoods)
data/image-manifest.csv                   now 81 image records (adds the 7 neighbourhoods)
pages/saint-john.md, fredericton.md, moncton.md   add "Neighbourhoods we serve" DOWN-link blocks
```

## 7. Verdict

The original CGN/StatCan enumeration was **92% complete against an independent gazetteer** and complete
against its own source. This audit closed the gap: the definitive INTENDED set is now **2,391 places**,
cross-validated against two authoritative gazetteers, with every place reconciled into BUILT or DEFERRED.
The "thousands" of locations are all enumerated and accounted for; the ones not yet built are deferred with
explicit, per-row reasons — the doorway-penalty firewall, not an omission.

*Sources: StatCan 2021 Census (98-10-0002, OGL-Canada) · StatCan GAF (92-151-X, OGL-Canada) ·
NRCan CGN (OGL-Canada) · GeoNames (CC-BY 4.0). Contains information licensed under the Open Government
Licence – Canada.*
