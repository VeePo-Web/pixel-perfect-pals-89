# Research 07 — National Geo-Data Sourcing Playbook (hands-on, all CA + all US)

> **Stream (deep-dive addendum):** The exact datasets, download endpoints, file layouts, field mappings, slug rules, and pipeline to build a license-clean geo scaffold for **all of Canada + 50 US states + DC**. Built so an engineer can execute without further research.
> **Compiled:** 2026-06 · Download locations + field layouts verified against official sources (flags noted). Feeds → `prompts/02-national-geo-data-scaffold.md`, `reports/02-NATIONAL-SCALE-TEMPLATE-SPEC.md`.

---

## Executive Summary

- **US is the easy half.** The Census Bureau **2025 National Places Gazetteer** (`2025_Gaz_place_national.zip`, ~1.2 MB) is one download with every incorporated place + CDP (~32,000 rows): name, GEOID, internal-point lat/lng, land area — **public domain**, no attribution.
- **GNIS** (USGS Domestic Names) is the US fallback for unincorporated communities + feature IDs; pipe-delimited, public domain, refreshed bi-monthly. Filter `feature_class = "Populated Place"`.
- **Canada's population layer** = StatCan **2021 GeoSuite Data Package** (catalogue 92-150-X) — CSV, free; CSDs + Population Centres with DGUID/UID, name, type, province, population, land area, representative point.
- **Canada's names layer** = **Canadian Geographical Names (CGN)** from NRCan CGNDB — CSV/SHP/KML, per-province, regenerated weekly. Both StatCan + CGN are **OGL-Canada** (one attribution string).
- **Wikidata** SPARQL → a stable **QID per place** for schema `@id` + a population sanity-check; **GeoNames** (CC-BY) is the cross-border fallback, and its `asciiname` solves half the slugging problem.
- **Slugging is the real engineering risk:** ASCII-fold accented Québec names *and* disambiguate duplicate names colliding across regions (`springfield`, `london`, `paris`, `windsor`).
- **License discipline:** US public-domain → no attribution; OGL-Canada → one footer line; GeoNames CC-BY → attribution; **never bundle OSM/ODbL** (share-alike) or **Canada Post FSA** (proprietary).
- **Cadence:** US Gazetteer annual (~Sept); GNIS bi-monthly; StatCan per-census (2026 Census geography lands ~2027–2028); CGN weekly. Pin versions; refresh yearly; **freeze slugs.**

---

## 1. US Datasets — exact specifics

### 1a. Census 2025 National Places Gazetteer (primary)
- **Landing:** `https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html`
- **Directory:** `https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/`
- **National file (verified):** `2025_Gaz_place_national.zip` (~1.2 MB, modified 2025-09-10). Per-state `2025_gaz_place_NN.txt` also exist (FIPS-numbered; 72 = Puerto Rico — **exclude** for states-only).
- **Format:** tab-delimited UTF-8 inside the zip; split on `\t` then `.trim()` every field (lat/long carry trailing whitespace).
- **Verified columns (2025):**

| # | Field | Notes |
|---|---|---|
| 1 | `USPS` | 2-letter state (`regionCode`) |
| 2 | `GEOID` | State FIPS + Place FIPS |
| 3 | `GEOIDFQ` | fully-qualified id |
| 4 | `ANSICODE` | ANSI/GNIS feature id |
| 5 | `NAME` | "Cochrane city" / "Springfield city" |
| 6 | `LSAD` | 25=city, 43=town, 47=village, 57=CDP |
| 7 | `FUNCSTAT` | functional status |
| 8 | `ALAND` | land m² |
| 9 | `AWATER` | water m² |
| 10 | `ALAND_SQMI` | land mi² |
| 11 | `AWATER_SQMI` | water mi² |
| 12 | `INTPTLAT` | internal-point lat (dec deg) |
| 13 | `INTPTLONG` | internal-point lng (dec deg) |

- **Rows:** ~32,000 (~19,500 incorporated + ~12,500 CDP across 50 states + DC).
- **Population:** NOT in the gazetteer — join `GEOID` to ACS `B01003` via the Census API, or treat population as optional.
- **License:** public domain (17 U.S.C. §105). No attribution.

### 1b. USGS GNIS Domestic Names (fallback / unincorporated + feature IDs)
- **Landing:** `https://www.usgs.gov/us-board-on-geographic-names/download-gnis-data`
- **File:** `https://prd-tnm.s3.amazonaws.com/StagedProducts/GeographicNames/DomesticNames/DomesticNames_National_Text.zip` → `DomesticNames_National.txt` (~147 MB uncompressed).
- **Format:** pipe-delimited (`|`) UTF-8.
- **Key fields:** `feature_id`, `feature_name`, `feature_class`, `state_name`, `state_alpha`, `county_name`, `prim_lat_dec`, `prim_long_dec`, `date_created`, `date_edited`.
- **Filter:** keep `feature_class = "Populated Place"` (~200,000 of ~2.2M).
- **License:** public domain; refreshed every other month.
- **Use for:** unincorporated communities/neighbourhoods absent from the gazetteer; reconcile `feature_id` ↔ gazetteer `ANSICODE`.

> **Flag:** the `GNIS_file_format.pdf` is a binary the fetch tool couldn't render; field names corroborated via USGS metadata + state mirrors. **Confirm exact column order against the live file header on download.**

---

## 2. Canada Datasets — exact specifics

### 2a. StatCan 2021 GeoSuite Data Package (primary — population + type)
- **Catalogue:** `https://www150.statcan.gc.ca/n1/en/catalogue/92-150-X2021001`
- **Reference guide (fields):** `https://www150.statcan.gc.ca/n1/pub/92-150-g/92-150-g2021001-eng.htm`
- **Format:** ZIP of CSV tables, one per geographic level. Grab the **CSD** table (municipalities — the "city/town" layer) + the **POPCTR** table.
- **Key fields:** `UID`, `DGUID` (e.g. `2021A00054811052`), `geo name` (e.g. "Cochrane"), CSD type (T=Town, CY=City, VL=Village, MU=Municipality), `province/territory` (PRUID + name), `population 2021`, `dwellings 2021`, `land area (km²)`, representative point lat/lng.
- **Rows:** ~5,160 CSDs; ~1,000+ Population Centres.
- **Cleaner alternative:** the **Geographic Attribute File** (catalogue **92-151-X**, guide `…/92-151-g/92-151-g2021001-eng.htm`) — a single flat CSV of every standard geography with names, codes, population.
- **License:** OGL-Canada.

### 2b. Canadian Geographical Names — CGN (names + coords, weekly)
- **Open-data record (stable mirror):** `https://open.canada.ca/data/en/dataset/e27c6eba-3c5d-4051-9db2-082dc6411c2c`
- **Download page:** `https://natural-resources.canada.ca/maps-tools-publications/maps/geographical-names-canada/download-geographical-names-data` *(intermittently 503'd during research — use the open.canada.ca record; flagged not-fully-verified live)*
- **Format:** CSV/SHP/KML, per province/territory; regenerated weekly.
- **Key CSV fields:** `CGNDB_ID`, official `geographical name`, generic term/feature type (City/Town/Village), `latitude`, `longitude`, province/territory, decision date, source.
- **License:** OGL-Canada.
- **Strategy:** use **GeoSuite as the spine** (has population + municipal type); use **CGN only to fill names/coords** for sub-CSD communities (neighbourhoods/localities) where you want spoke pages.

---

## 3. Wikidata / GeoNames enrichment

### Wikidata (QID for schema `@id` + population)
Endpoint `https://query.wikidata.org/sparql` (Accept `application/sparql-results+json`, descriptive `User-Agent`, batch by region):
```sparql
SELECT ?city ?cityLabel ?population ?coord WHERE {
  ?city wdt:P31/wdt:P279* wd:Q515 ;   # instance of city (or subclass)
        wdt:P131* ?region .            # located in admin region
  ?region wdt:P300 "CA-AB" .           # ISO 3166-2 (Alberta); US e.g. "US-CA"
  OPTIONAL { ?city wdt:P1082 ?population . }
  OPTIONAL { ?city wdt:P625 ?coord . }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en,fr". }
}
```
- The `?city` URI tail (e.g. `Q1090`) → `wikidata` field + schema `@id` `https://www.wikidata.org/wiki/Q1090`.
- Reconcile on Census `GEOID` (Wikidata P882 FIPS / P5831) and GNIS `feature_id` (P590), or name + coord within ~0.05°.

### GeoNames (CC-BY 4.0 fallback — one merged file)
- **Download:** `https://download.geonames.org/export/dump/` → `CA.zip`, `US.zip` (or `cities500.zip`).
- **Format:** tab-delimited. **Fields:** `geonameid`, `name`, `asciiname`, `alternatenames`, `latitude`, `longitude`, `feature_class` (filter `P`), `feature_code` (`PPL`…), `country_code`, `admin1_code`, `population`, `modification_date`.
- **`asciiname` is pre-ASCII-folded** (Montréal→"Montreal") — solves half the slugging problem.

---

## 4. Field mapping → normalized scaffold row

Target: `{ slug, name, nameFr?, country, region, regionCode, parentMetro?, lat, lng, population?, type, source, wikidata? }`

**US Census Places →**

| Source | Target | Transform |
|---|---|---|
| `NAME` | `name` | strip trailing " city"/" town"/" CDP" |
| `USPS` | `regionCode` | as-is |
| `USPS`→lookup | `region` | abbr → full state name |
| `INTPTLAT` | `lat` | `parseFloat(trim)` |
| `INTPTLONG` | `lng` | `parseFloat(trim)` |
| `LSAD` | `type` | 25→city, 43→town, 47→village, 57→cdp |
| — | `country` | `"US"` |
| — | `source` | `"census-gazetteer-2025"` |
| `GEOID`/`ANSICODE` | join key | reconcile Wikidata/GNIS |

**StatCan GeoSuite CSD →**

| Source | Target | Transform |
|---|---|---|
| `geo name` | `name` | as-is |
| `geo name` (fr table) | `nameFr` | from FR CSV |
| CSD type | `type` | CY→city, T→town, VL→village, MU→municipality |
| PR name | `region` | province/territory |
| PRUID→lookup | `regionCode` | AB/ON/QC… |
| rep. point lat/lng | `lat`/`lng` | parse |
| `population 2021` | `population` | parse int |
| `DGUID`/`UID` | join key | reconcile Wikidata/CGN |
| — | `country` | `"CA"` |
| — | `source` | `"statcan-geosuite-2021"` |

`parentMetro` from CMA (Canada) / CBSA-metro lookup (US) to cluster spokes under a metro hub.

---

## 5. Slugging rules

1. **ASCII-fold first** (NFD → strip combining marks): `Québec`→`quebec`, `Trois-Rivières`→`trois-rivieres` (or trust GeoNames `asciiname`).
2. Lowercase, trim, collapse whitespace; replace non-`[a-z0-9]` runs with one hyphen; strip leading/trailing hyphens.
3. Preserve meaningful hyphens (`saint-jean-sur-richelieu`); never double.
4. Drop trailing legal descriptors before slugging US places ("Springfield city" → `springfield`).
5. **Disambiguate duplicates only on collision** (`london`, `springfield`, `windsor`, `paris`, `victoria`): append `-<regionCode>` (`london-on`, `springfield-il`). Within-region rare collisions → append county/type or GEOID short hash.
6. Length cap ~60 chars; truncate on a hyphen boundary.
7. **Freeze slugs forever once indexed;** on a deliberate rename keep the old slug + 301 — never let a dataset refresh churn URLs.

---

## 6. Pipeline steps

```
download → parse → normalize → dedupe → tag source/license → chunk per region → output
```
1. **Download & pin** versions; record in `SOURCES.json`.
2. **Parse:** unzip; US gazetteer split `\t` + trim; GNIS split `|`; CSV-parse StatCan/CGN (watch BOM + Latin-1 vs UTF-8). For shapefiles you only need the **`.dbf` attribute table** (`mapshaper -o format=csv`; no GDAL needed).
3. **Normalize:** apply §4; compute `slug` (§5).
4. **Dedupe:** US Census wins over GNIS (drop if `feature_id` == gazetteer `ANSICODE` or name+coords within ~0.05°); GeoSuite CSD wins over CGN.
5. **Enrich:** batch SPARQL per region for `wikidata` + population backfill (rate-limited).
6. **Tag:** stamp `source` + internal `license` enum (`public-domain`/`ogl-canada`/`cc-by`) per row so the footer attribution derives from what shipped.
7. **Chunk per region:** one JSON/TS per state/province (`data/areas/ca-on.json`); a single national bundle is ~6–10 MB — chunk it and lazy-import per region page. Emit a tiny `index.json` (region→slug→name/lat/lng) for the hub/sitemap.
8. **Output:** typed `.ts` `as const` (build-time) or `.json` (runtime). Per-region JSON ~50–400 KB.

---

## 7. License compliance checklist

| Source | License | Attribution? | Action |
|---|---|---|---|
| US Census Gazetteer | Public domain | No | Use freely |
| USGS GNIS | Public domain | No | Use freely |
| StatCan GeoSuite / Geo Attribute File | **OGL-Canada** | **Yes** | Footer line |
| NRCan CGN | **OGL-Canada** | **Yes** | Same footer (once) |
| GeoNames | **CC-BY 4.0** | Yes if used | "© GeoNames, CC-BY 4.0" |
| Wikidata | CC0 | No | Use freely |
| OpenStreetMap | **ODbL** | Share-alike | **Do NOT bundle** |
| Canada Post FSA | Proprietary | Licensed | **Exclude** |

**Required footer (only because Canadian sources are used):**
> *"Contains information licensed under the Open Government Licence – Canada"* → `https://open.canada.ca/en/open-government-licence-canada`.

If GeoNames ships: *"Geographic data © GeoNames contributors, licensed under CC BY 4.0."* US data needs nothing.

---

## 8. Update cadence

- **US Gazetteer:** annual (~Sept; 2025 file dated 2025-09-10). Yearly.
- **GNIS:** bi-monthly — refresh only when you need new unincorporated places.
- **StatCan GeoSuite / Geo Attribute File:** per Census (current 2021); **2026 Census** geography products begin ~2027–2028 — plan a one-time re-base.
- **CGN:** weekly, but names stable — annual pull is plenty.
- **Practice:** pin versions in `SOURCES.json`, run the pipeline yearly (or on new Census), **freeze slugs** across refreshes.

---

## Sources (verification dates noted)

- [US Census — Gazetteer Files (landing)](https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html) — verified 2026-06
- [US Census — 2025 Gazetteer directory (filenames/sizes)](https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2025_Gazetteer/) — verified 2026-06
- [US Census — 2025 Gazetteer Record Layouts (columns)](https://www.census.gov/programs-surveys/geography/technical-documentation/records-layout/gaz-record-layouts/gaz25-record-layouts.html) — verified 2026-06
- [USGS — Download GNIS Data](https://www.usgs.gov/us-board-on-geographic-names/download-gnis-data) — verified 2026-06
- [USGS — GNIS Domestic Names Feature Classes](https://www.usgs.gov/us-board-on-geographic-names/gnis-domestic-names-feature-classes) — verified 2026-06
- [StatCan — GeoSuite 2021 (92-150-X)](https://www150.statcan.gc.ca/n1/en/catalogue/92-150-X2021001) — verified 2026-06
- [StatCan — GeoSuite Reference Guide (92-150-G)](https://www150.statcan.gc.ca/n1/pub/92-150-g/92-150-g2021001-eng.htm) — verified 2026-06
- [StatCan — Geographic Attribute File Reference Guide (92-151-G)](https://www150.statcan.gc.ca/n1/pub/92-151-g/92-151-g2021001-eng.htm) — verified 2026-06
- [NRCan — Canadian Geographical Names (Open Government Portal)](https://open.canada.ca/data/en/dataset/e27c6eba-3c5d-4051-9db2-082dc6411c2c) — verified 2026-06
- [NRCan — Download Geographical Names Data](https://natural-resources.canada.ca/maps-tools-publications/maps/geographical-names-canada/download-geographical-names-data) — **FLAGGED: HTTP 503 during research; use open.canada.ca mirror**
- [GeoNames — Export/Download](https://download.geonames.org/export/dump/) — verified 2026-06
- [Open Government Licence – Canada](https://open.canada.ca/en/open-government-licence-canada)
- [Wikidata Query Service (SPARQL)](https://query.wikidata.org/sparql)

**Verification flags:** (1) NRCan CGN download page intermittently 503'd — open.canada.ca record is the reliable access point. (2) GNIS `GNIS_file_format.pdf` is binary; column names corroborated via metadata + mirrors — confirm order against the live file header. All US Census fields + 2025 filenames directly verified.
