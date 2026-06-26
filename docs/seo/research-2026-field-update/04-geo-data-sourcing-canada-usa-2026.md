# Field Update 04 — Programmatic Geo-Data for ALL Canada + ALL US States (2026-06)

> Extends `areas-maps/research/05` and `prompts/01`. The data-sourcing + **licensing** reference for building the
> nationwide geographic scaffold. **Read the licensing column before importing anything** — one constraint
> (Canadian full postal codes) is a hard legal wall.

---

## 0. Headline verdict on the hard parts

- **City + population + lat/lng + state/province:** fully solved by **free, commercial-OK** sources.
- **US ZIP codes:** free + commercial-OK (HUD-USPS crosswalk + Census ZCTAs + SimpleMaps `zips`).
- **Canadian full 6-character postal codes: PROPRIETARY (Canada Post).** Only the **FSA (first 3 chars)** is free.
  There is **no free, legal, complete 6-char postal-to-place dataset** for commercial reuse. **Scope Canada to FSA,
  or license from Canada Post.** [confirmed] → https://opennorth.ca/resources/open-postal-code-data/

---

## 1. Authoritative data sources + licensing (use this table as the import allow-list)

### Canada
| Source | Gives | License (commercial reuse) |
|---|---|---|
| **Statistics Canada — Open Licence** | Population & dwelling counts at province/territory, census division, **census subdivision (= the authoritative "cities/towns" layer)**; population centres (≥1,000). | **YES**, attribution. The spine for Canada. → https://www.statcan.gc.ca/en/reference/licence |
| **StatCan 2021 FSA Boundary File (92-179-X)** | 1,643 Forward Sortation Areas (first 3 postal chars) + geometry. | **YES** (Open Licence). FSA only. → https://www150.statcan.gc.ca/n1/en/catalogue/92-179-X |
| **Canada Post FSALDU (full 6-char)** | Full postal → place. | **NO — proprietary, licensed (thousands/yr).** The PCCF conversion file inherits Canada Post copyright. Avoid for commercial reuse. |

> StatCan gives population, not always clean centroids → pair with GeoNames/SimpleMaps for lat/lng.

### USA
| Source | Gives | License |
|---|---|---|
| **US Census Bureau (public domain, 17 U.S.C. §105)** | The spine. **Gazetteer Files (2025)** = places/counties/states/ZCTAs with GEOID, name, lat/lng, area — **but NO population column** (join Decennial 2020 **P1** or PEP estimates on GEOID). **TIGER/Line** = boundary geometry. | **YES** (public domain). → https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html · P1: https://data.census.gov/table/DECENNIALPL2020.P1 |
| **HUD-USPS ZIP Crosswalk** | ZIP ↔ tract/county/CBSA, updated quarterly. | **YES** (public domain). → https://www.huduser.gov/portal/datasets/usps_crosswalk.html |

### Cross-country convenience
| Source | Gives | License |
|---|---|---|
| **SimpleMaps Basic (free)** | **US Cities Basic** (city, state, lat, lng, population, county, `zips`, timezone; updated 2026-02-09). **Canada Cities Basic** (8,016 cities; updated 2023-08-27 — **older vintage**). | **CC-BY-4.0**, commercial OK with a public backlink. → https://simplemaps.com/data/us-cities · https://simplemaps.com/data/canada-cities |
| **GeoNames** | `cities500/1000/5000/15000` (lat/lng, population, admin codes, timezone); full CA + US. Free postal file covers **US ZIP well, Canada FSA only.** | **CC-BY-4.0**, attribution. → https://www.geonames.org/export/ |
| **Natural Earth** | Cleanest **state/province (Admin-1)** layer + populated-place labels. | **Public Domain** (no attribution). → https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/ |
| **OpenStreetMap / Nominatim** | Geometry + place discovery; inconsistent population. | **ODbL 1.0 — share-alike + attribution** (stricter than CC-BY). ⚠️ Isolate if used; prefer CC-BY/PD for core data. → https://www.openstreetmap.org/copyright |

**Recommended stack:**
- US/CA **regions** (states/provinces) → Natural Earth (PD).
- US **cities** + pop + lat/lng + ZIP → SimpleMaps US Basic *or* Census Gazetteer + P1 / GeoNames.
- CA **cities** + pop → StatCan CSD population; **lat/lng** → GeoNames/SimpleMaps.
- US **ZIP** → HUD-USPS + ZCTA. CA **postal** → StatCan **FSA only**.

---

## 2. Recommended template data schema

Hierarchical `country → region → city → (optional) neighborhood`. Keep `slug` as the addressable key at every
level (lowercase, hyphenated). This maps cleanly onto the repo's existing `Region` / `Community` types in
`src/data/communities.ts`.

```ts
Country  { code: "CA" | "US", name, defaultLang }
Region   { slug, name, code,            // prov/state abbreviation
           countryCode, lat, lng,
           type: "province" | "territory" | "state" }
City     { slug, name, regionSlug, countryCode,
           population, lat, lng, timezone,
           postalPrefixes: string[],    // FSA (CA) | ZIP (US)
           nearbyCitySlugs: string[] }  // computed by haversine — feeds the internal-link pyramid
Neighborhood { slug, name, citySlug, lat, lng,
               localSignals: {...} }     // build ONLY where real data exists; feeds the 4-of-8 gate
```

- Carry `population` so the **publish gate** can threshold (don't auto-spawn a page for a 200-person hamlet).
- Compute `nearbyCitySlugs` from lat/lng (haversine) for the "nearby areas" widget + adjacency linking.
- `localSignals` is where the per-business local-proof data lands (first-party stat, named project, local FAQ,
  local review) — the inputs the **4-of-8 uniqueness gate** counts.

---

## 3. Bilingual Canada — hreflang EN/FR (extends `areas-maps/prompts/04`)

- **Use locale-region codes, not bare language:** `en-ca`, `fr-ca`, + exactly **one** `x-default` → a neutral
  language-selector/global home. Using bare `fr` is a top mistake. [confirmed]
- **Reciprocity is mandatory:** every locale version links to **all** versions **including itself**, or Google
  ignores the annotation. [confirmed]
- **Sitemap method preferred at programmatic scale:** put hreflang clusters in the **XML sitemap**
  (`<xhtml:link>`), not `<head>` tags — centralizes management and avoids head bloat across thousands of pairs.
  Pick one method; don't mix. [confirmed] → https://developers.google.com/search/docs/specialty/international/localized-versions
- **Quebec:** users expect French; beyond SEO, Quebec's **Loi 96 / Charter of the French Language** makes a real
  `fr-ca` version a legal/commercial expectation for Quebec-targeted commercial pages — so `fr-ca` must be genuine
  French, **not thin auto-translation.** [directional]

---

## 4. Avoiding the "page for every town" doorway trap at national scale

Google's **Aug 2025 + Dec 2025** updates intensified scaled-content/doorway enforcement; thin keyword-swap
"[service] in [town]" pages get filtered with rising precision, while **data-rich, intent-matched** programmatic
pages still rank. How real operators gate publication: [directional]

1. **Publish on data quality, not keyword opportunity** — only generate a page with **≥4–5 unique local data
   points** and **≥3 uniqueness blocks** not shared verbatim across the set (the practitioner restatement of the
   4-of-8 gate).
2. **The find-and-replace test** — remove the town name; if nothing location-specific remains, don't publish.
3. **Population/eligibility threshold** — gate by city population + whether genuine local signals exist.
4. **`noindex`-then-conditionally-index** — ship borderline pages `noindex`, promote to indexable only on early
   engagement; keep failures **out of the index** so they don't drag domain quality. Exclude `noindex` pages from
   the sitemap.
5. **Static-first rendering** — a thin page that's *also* JS-only is invisible to AI **and** weak for Google.

→ https://www.blogseo.io/blog/programmatic-seo-quality-rules-avoid-thin-content · https://seosherpa.com/googles-august-2025-spam-update/

---

## 5. The build math the geo prompt must always state

```
INTENDED  = SERVICES × ELIGIBLE_CITIES        (eligible = passes population + 4-of-8 gate)
PUBLISHED = pages that cleared the gate         (indexable, in sitemap)
SKIPPED   = INTENDED − PUBLISHED                (noindex or not generated — log the reason per page)
```

The template ships the **full scaffold** (every CA province/territory + every US state, with their cities &
coordinates) and the **gate**. A given business's remix then *activates* only the eligible subset. **Shipping the
scaffold is not shipping the pages** — activation + local enrichment is what publishes a page.

---

## Sources (2026)
- StatCan Open Licence: https://www.statcan.gc.ca/en/reference/licence · FSA boundary 92-179-X: https://www150.statcan.gc.ca/n1/en/catalogue/92-179-X
- OpenNorth — open postal-code data (Canada Post constraint): https://opennorth.ca/resources/open-postal-code-data/
- US Census — Gazetteer: https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html · Decennial P1: https://data.census.gov/table/DECENNIALPL2020.P1
- HUD-USPS crosswalk: https://www.huduser.gov/portal/datasets/usps_crosswalk.html
- SimpleMaps — US: https://simplemaps.com/data/us-cities · Canada: https://simplemaps.com/data/canada-cities · license: https://simplemaps.com/data/license
- GeoNames export: https://www.geonames.org/export/ · Natural Earth Admin-1: https://www.naturalearthdata.com/downloads/10m-cultural-vectors/10m-admin-1-states-provinces/ · OSM copyright: https://www.openstreetmap.org/copyright
- Google — localized versions / hreflang: https://developers.google.com/search/docs/specialty/international/localized-versions
- BlogSEO — programmatic quality rules: https://www.blogseo.io/blog/programmatic-seo-quality-rules-avoid-thin-content
