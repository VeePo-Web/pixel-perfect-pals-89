# Research 04 — National Geo-Data Scaffold (All Canada + All US States)

> **Stream:** Building a reusable geographic data SCAFFOLD for "Areas We Serve" pages covering ALL of Canada (every province/territory) and ALL US states — and scaling location pages safely without triggering doorway / scaled-content penalties.
> **Compiled:** 2026-06 · Fresh web research, cross-checked. Licensing risks flagged explicitly.
> **Status:** Evidence dossier. Feeds → `reports/02-NATIONAL-SCALE-TEMPLATE-SPEC.md` and `prompts/02-national-geo-data-scaffold.md`.

---

## Executive Summary (10 bullets)

1. **The scaffold is data; the page is a privilege.** Bundle authoritative geo-data for every province/state, but treat *publishing* a page as a **gated event**, not automatic. Google's March 2024 spam policy makes **scaled content abuse** and **doorway abuse** explicitly penalizable — both manual-actionable and algorithmic.
2. **Best free, license-clear sources:** USA → **US Census TIGER/Line + Census "Places"** and **USGS GNIS** (both effectively **public domain**, no attribution). Canada → **Statistics Canada Census Subdivisions/Population Centres** and **NRCan CGNDB** (350,000+ names), both under the **Open Government Licence – Canada** (attribution required).
3. **Avoid Canada Post postal-code/FSA data** as a primary key — **licensed IP** with commercial restrictions and fees. Use **StatCan census geography** instead; treat FSAs as optional secondary metadata only if licensed.
4. **ZIP/FSA codes are not geographic areas.** US ZIPs are mail routes, not polygons (~42,000 ZIPs vs ~32,000 ZCTAs; ZIPs cross city/county/state lines). Model on **incorporated places/CSDs**, not postal codes.
5. **Dataset scale to plan for:** USA ~**19,500 incorporated places + ~9,700 CDPs (~29,000)**; Canada ~**5,000+ census subdivisions** + ~1,000 population centres. A full national scaffold is tens of thousands of rows — but *publish* only a tiny, justified fraction per business.
6. **Depth beats coverage.** 2025–2026 consensus: publish "fewer, stronger pages that function as true destination content." Prioritize top **2–4 service areas within ~2 hours' drive**; expand only when you have something genuinely new to say.
7. **Ship a uniqueness/quality GATE at build time:** require **N local-specificity signals (≥4) + ≥1 first-party element** before a page can index; otherwise `noindex`/skip. The single most important anti-doorway control.
8. **Separate template from data, and run a variation engine.** Target ≥60% unique main content and **8+ unique data points per row**; "more pages on a thin dataset produces more thin pages."
9. **Stage the rollout and watch Search Console:** publish in batches (20–30 → 50 → 100 → 200+); confirm **80%+ indexing within 4 weeks** before scaling; diagnose if <50% indexed at 8 weeks.
10. **Bilingual Canada hreflang is worth it where you genuinely have FR content** — `en-ca`/`fr-ca`/`x-default` with reciprocal return tags. Don't auto-translate to manufacture pages (scaled content abuse).

---

## 1. Authoritative, License-Clear Geo-Data Sources

### USA (recommended primary — public domain)

| Dataset | What it gives | License | Format |
|---|---|---|---|
| **US Census TIGER/Line — Places** (incorporated + CDPs) | Name, GEOID/FIPS, type (legal vs statistical), boundaries, county/state hierarchy | **US Gov public domain** | Shapefile, GeoJSON via API |
| **US Census Gazetteer Files** | Name, GEOID, **lat/lng (internal point)**, land/water area, state | Public domain | TSV/CSV (lightweight — ideal data layer) |
| **USGS GNIS** | Official feature names, feature class, county, state, coordinates | Public domain | Pipe-delimited text by state |

**Best lightweight choice:** the **Census Gazetteer "Places" file** — flat CSV with name + GEOID + lat/lng + area, perfect to bundle as JSON/TS with zero licensing friction.

### Canada (recommended primary — OGL-Canada, attribution required)

| Dataset | What it gives | License | Format |
|---|---|---|---|
| **StatCan 2021 Census — Census Subdivisions (CSD)** | Municipality-equiv name, UID/DGUID, type (53 designations), province, area | **OGL – Canada** (attribution) | Shapefile, boundary files |
| **StatCan Population Centres (POPCTR)** | Urban-area name, UID, population/dwellings, area | OGL-Canada | Boundary files |
| **StatCan GeoSuite / Geographic Attribute File** | Codes, names, UIDs, population/dwellings, full hierarchy linkage | OGL-Canada | CSV/database |
| **NRCan CGNDB** | 350,000+ official names, coordinates, province; regenerated weekly | OGL-Canada | Text, Shape, KML by province |

**Best lightweight choice:** **CSD list from GeoSuite** (municipality name + code + population + province) supplemented by **CGNDB** for community/neighbourhood granularity.

> **OGL-Canada attribution:** acknowledge the source, e.g. *"Contains information licensed under the Open Government Licence – Canada,"* with a link. Bundle this string in the data layer.

### Supplements (use carefully)

| Source | License | Caveat for a commercial template |
|---|---|---|
| **GeoNames** | **CC BY 4.0** | Attribution required forever. Fast worldwide name+lat/lng. |
| **OpenStreetMap / Nominatim** | **ODbL** (share-alike + attribution) | **Share-alike trap:** redistributing a derived DB triggers obligations. Lookup-only; don't bundle. |
| **Wikidata** | **CC0** (public domain) | No attribution; good for enrichment (population, alt-names, `@id`), uneven provenance. |

**Licensing-risk verdict:** For a **resold drop-in template**, prefer **US Census + GNIS (public domain)** and **StatCan + CGNDB (OGL-Canada, attribution)**. Treat **OSM/ODbL** as lookup-only, **GeoNames/CC-BY** as attribution-bearing, **Canada Post FSA** as licensed/paid — never bundle FSA data without a license.

---

## 2. The Geographic Hierarchy & URL Model

```
Country (ca / us)
 └─ Province / State            (Ontario / California)
     └─ Region / Metro / County  (Halton Region / Los Angeles County)
         └─ City / Place / CSD    (Oakville / Pasadena)
             └─ Community / Neighbourhood (Glen Abbey / Old Town)
```

**Slug/URL pattern at national scale** (clean slugs, never query params):
```
/areas-we-serve/                         (national index — hub)
/areas-we-serve/{state-or-province}/     (regional hub)
/areas-we-serve/{region}/{community}/    (leaf — the rankable asset)
```
Lowercase, hyphenated, ≤3 levels deep, ASCII-folded (`montreal` not `montréal` for the slug; accented display name in content). Store a stable `slug` field as the addressability key; **301 redirect** any slug you ever change.

---

## 3. The Doorway / Scaled-Content Danger — and How to Ship a Scaffold Safely

### Google's exact policy language (verbatim)

**Scaled content abuse** — *"when many pages are generated for the primary purpose of manipulating search rankings and not helping users."* Examples: *"using generative AI tools or other similar tools to generate many pages without adding value"*; *"automated transformations like synonymizing, translating, or other obfuscation techniques, where little value is provided"*; *"stitching or combining content from different web pages without adding value"*; *"creating many pages where the content makes little or no sense to a reader but contains search keywords."*

**Doorway abuse** — *"when sites or pages are created to rank for specific, similar search queries… lead users to intermediate pages that are not as useful as the final destination."* Examples: *"multiple domain names or pages targeted at specific regions or cities that funnel users to one page"*; *"substantially similar pages that are closer to search results than a clearly defined, browseable hierarchy."*

Enforcement tightened through 2024–2025 (March 2024 core update introduced scaled-content abuse; Nov 2024 site-reputation-abuse update expanded scope; later updates intensified detection of thin, keyword-swap programmatic pages). Spam policies now also cover content surfaced in AI Overviews/AI Mode.

### The safe-scaffold architecture

1. **Per-business activation.** The scaffold holds all 60+ jurisdictions; each deployment **activates** only the areas a business truly serves. Inactive rows render nothing and emit no URL.
2. **The publish GATE (build-time, hard).** A page is only generated/indexable with **≥4 of 8 local-specificity signals + ≥1 first-party element:**
   - Local landmark/neighbourhood · local condition note (climate/geography affecting the service) · local project reference · local code/permit note · community association/event · proximity/crew-base differentiator · **named local testimonial (first-party)** · community-specific FAQ.
   - Fail → **skip or `noindex`.** This separates a ranking network from a manual action.
3. **No funnel-to-one-page behavior.** Each leaf is a genuine destination (own content, own CTA context), never a thin intermediate redirecting to a single contact page.
4. **Browseable hierarchy, not a search-results clone.** Real hub→spoke navigation.

---

## 4. "How Many Is Too Many?" — Depth Over Coverage

No fixed numeric ceiling; the threshold is **value per page**. 2025–2026 consensus:
- **Prioritize the top 2–4 areas within ~2 hours' drive** first; expand only when you "continue to find something unique and useful to say."
- **Group, don't blanket:** "group some areas logically rather than listing each tiny corner with a separate page."
- Named anti-pattern: *"hundreds of pages for every neighborhood… or 30 near-duplicate pages for every zip code in a 10-mile zone"* → doorway pages.
- The shift: **"publishing fewer, stronger pages that function as true destination content."**

**Operating rule:** the scaffold can *describe* 29,000 US places + 5,000 CA CSDs, but a single business typically publishes **dozens, not thousands**, each clearing the gate.

---

## 5. Programmatic-SEO Best Practices (2025–2026)

- **Template ↔ data separation is foundational.** *"Thin content is the single most common reason programmatic pages fail to rank."* Enforce **8+ unique data points per row.**
- **Variation/uniqueness engine.** ≥60% unique main content; deterministic rotation (intro variants, local condition notes, nearest-proof selection, per-community FAQ) keyed by `hash(place+service)` — stable across builds, distinct from neighbours.
- **Internal-linking pyramid (hub→spoke).** Every leaf gets inbound links from (1) its parent hub, (2) topical/blog content, (3) 3–5 sibling/nearest leaves. Descriptive anchors only.
- **Self-referencing canonicals** at template level; clean slugs enable correct canonicalization + **build-time sitemap generation** (all active routes, `lastmod` from content dates, referenced in `robots.txt`).
- **Avoid near-duplicate detection:** enrich the dataset *before* scaling; self-audit — "sample 10 URLs: genuinely different main content or just swapped headings?"
- **Staged publishing + monitoring:** 20–30 → 50 → 100 → 200+. Targets: **80%+ indexed in 4 weeks**; **<50% at 8 weeks** → diagnose. Watch GSC for "duplicate," "crawled – not indexed," **soft-404.**

---

## 6. Bilingual Canada (EN/FR) hreflang

- Use **`en-ca`, `fr-ca`, `x-default`** with **reciprocal return tags** on every page that genuinely exists in both languages.
```html
<link rel="alternate" hreflang="en-ca" href="https://site.ca/en/areas-we-serve/{region}/{community}/" />
<link rel="alternate" hreflang="fr-ca" href="https://site.ca/fr/secteurs-desservis/{region}/{community}/" />
<link rel="alternate" hreflang="x-default" href="https://site.ca/areas-we-serve/{region}/{community}/" />
```
- **Worth it where you have real FR content** (Quebec, NB, bilingual metros). Reported benefits: large lifts in target-language organic + lower bounce. But **>65% of international sites have hreflang errors** — implement + validate carefully.
- **Critical caveat:** do **not** auto-translate purely to double page count — machine-translated low-value pages fall under scaled content abuse.

---

## 7. Practical Data-Pipeline Notes

**Realistic sizes:** USA ~19,500 incorporated places + ~9,700 CDPs ≈ 29,000; ~3,100 counties; 50 states + DC + territories. Canada ~5,000+ CSDs, ~1,000+ population centres, 10 provinces + 3 territories; CGNDB adds 350,000+ names for community granularity. Bundle the **flat attribute layer** (name, code, lat/lng, population, parent hierarchy, slug) — a few MB of JSON/TS — keep boundaries out of the client.

**Drop-in data-layer shape (TS):**
```ts
export interface Place {
  slug: string;            // stable URL key: "oakville"
  name: string;            // display: "Oakville"
  nameFr?: string;
  country: "ca" | "us";
  region: string;          // province/state slug: "ontario"
  parentMetro?: string;    // "halton-region"
  lat: number; lng: number;
  population?: number;     // drives priority + gate eligibility
  type: string;            // "incorporated_place" | "csd" | "cdp"
  source: "uscensus" | "gnis" | "statcan" | "cgndb";
}
```
Carry a `source` field so attribution auto-asserts (OGL-Canada/CC-BY rows trigger a footer credit; public-domain US rows don't).

**License-compliance checklist:**
- ✅ US Census + GNIS → public domain, ship freely.
- ✅ StatCan + CGNDB → ship with the **OGL-Canada attribution string** in the data layer + footer.
- ⚠️ GeoNames (CC-BY) → only with visible attribution.
- ⚠️ OSM/Nominatim (ODbL) → lookup-only; don't redistribute the bundled DB.
- ❌ Canada Post FSA → licensed/paid; exclude unless separately licensed.

---

## Sources

- [Spam Policies for Google Web Search — Search Central](https://developers.google.com/search/docs/essentials/spam-policies)
- [March 2024 core update and new spam policies — Google Search Central Blog](https://developers.google.com/search/blog/2024/03/core-update-spam-policies)
- [Updating our site reputation abuse policy — Google (Nov 2024)](https://developers.google.com/search/blog/2024/11/site-reputation-abuse)
- [Guide to Google's Scaled Content Abuse Policies — Breakline](https://www.breaklineagency.com/guide-to-googles-scaled-content-abuse/)
- [Programmatic SEO Best Practices — SEOmatic](https://seomatic.ai/blog/programmatic-seo-best-practices)
- [Programmatic SEO Quality Rules to Avoid Thin Content — BlogSEO](https://www.blogseo.io/blog/programmatic-seo-quality-rules-avoid-thin-content)
- [Service Area Page SEO — BrightLocal](https://www.brightlocal.com/learn/service-area-pages/)
- [Service area pages — Search Engine Land](https://searchengineland.com/guide/service-area-pages)
- [TIGER/Line Shapefiles — US Census Bureau](https://www.census.gov/geographies/mapping-files/2024/geo/tiger-line-file.html)
- [Place (US Census Bureau) — Wikipedia (place counts)](https://en.wikipedia.org/wiki/Place_(United_States_Census_Bureau))
- [Geographic Names Information System (GNIS) — USGS](https://www.usgs.gov/tools/geographic-names-information-system-gnis)
- [Download GNIS Data — USGS](https://www.usgs.gov/us-board-on-geographic-names/download-gnis-data)
- [2021 Census Boundary files (CSD, Population Centres) — Open Government Portal](https://open.canada.ca/data/en/dataset/ef70dc3b-1069-4037-9bce-61f47e628a1d)
- [Census subdivision: Detailed definition (53 types) — Statistics Canada](https://www150.statcan.gc.ca/n1/pub/92-195-x/2011001/geo/csd-sdr/def-eng.htm)
- [Download Geographical Names Data — NRCan (CGNDB)](https://natural-resources.canada.ca/maps-tools-publications/maps/geographical-names-canada/download-geographical-names-data)
- [Canadian Geographical Names – CGN — Open Government Portal (OGL-Canada)](https://open.canada.ca/data/en/dataset/e27c6eba-3c5d-4051-9db2-082dc6411c2c)
- [About GeoNames (CC BY 4.0)](https://www.geonames.org/about.html)
- [Copyright and License — OpenStreetMap (ODbL)](https://www.openstreetmap.org/copyright)
- [License our data — Canada Post (licensed FSA/postal data)](https://www.canadapost-postescanada.ca/cpc/en/commercial/data-solutions/license-data.page)
- [ZIP Code Tabulation Areas (ZCTAs) — US Census Bureau](https://www.census.gov/programs-surveys/geography/guidance/geo-areas/zctas.html)
- [Localized Versions of your Pages (hreflang) — Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Hreflang Canada Implementation Guide 2026 — Koanthic](https://koanthic.com/en/hreflang-canada-implementation-complete-guide-2026/)

**Key licensing flags:** US Census/GNIS = public domain (safe to bundle/resell). StatCan/CGNDB = OGL-Canada (must attribute). GeoNames = CC-BY (must attribute). OSM/Nominatim = ODbL (share-alike — lookup only). **Canada Post FSA = proprietary/licensed — do not bundle without a paid license.**
