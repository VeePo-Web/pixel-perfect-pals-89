# Saskatchewan — Universal Location-Page Build (Mode A)

> Build run of `05-universal-location-page-builder-fable5.md` for **Saskatchewan**, executed 2026-07-10.
> Source of truth: `General Provinces/SASK/saskatchewan_master_seo_database_OPTIMIZED.xlsx` (1,926 rows,
> 43-col network schema) + `sk_municipalities_clean.csv` (StatCan 2021/2016) + **CGN Saskatchewan**
> (NRCan `cgn_sk_csv_eng.csv`, downloaded this run — OGL-Canada). The original xlsx is untouched;
> this directory is the upgraded output.

**Contains information licensed under the Open Government Licence – Canada.**

---

## 1 · Mode & grounding corrections (announced before build)

**MODE A — spreadsheet provided.** During familiarization the sheet failed two grounding audits:

1. **Synthetic coordinates** on most non-flagship rows (e.g. Montmartre placed at 52.07,-106.60 near
   Saskatoon; its real CGN position is 50.29,-103.46 east of Regina; Carnduff at 53.18°N vs real 49.17°N).
2. **Corrupted `Parent_Region` + distance columns** derived from those coordinates (Corman Park RM — which
   surrounds Saskatoon — listed in "Northern Saskatchewan" at 374 km; real distance 11 km).

**Fix applied (deterministic, grounded):** every row was re-joined to the authoritative **CGN (NRCan)**
gazetteer by name + feature type (City→CITY, Town→TOWN, Village→VILG, RM→MUN2 official "Name No. N"
entries). Distances to the two provincial hubs (Saskatoon 52.1397,-106.6862 · Regina 50.4548,-104.6066,
both CGN) were recomputed by haversine, regions reassigned geographically (≤60 km of a hub → hub region;
lat ≥54.4 → Northern; else nearest regional anchor city), and every row re-scored with the **unified
network formula** (Population 30 · Search-Vol 25 · Competition-inverse 20 · Proximity 15 · Economic 10 —
national anchor Toronto 2,794,356). Populations were cross-checked against StatCan
`sk_municipalities_clean.csv` (0 conflicts; StatCan wins on tie). Rows without a CGN match keep no
coordinates and are deferred — coordinates are never guessed.

**Region taxonomy (9 → 8 active):** Saskatoon Region · Regina Region · Central Saskatchewan · Southeast
Saskatchewan · Southern Saskatchewan · Southwest Saskatchewan · West Central Saskatchewan · Northwest
Saskatchewan. (Northern Saskatchewan has no tier-1 pass; its rows are deferred, the region page ships
with the hub for navigation only, `noindex` until it has children.) Source labels "Northwest"/"Southeast"
normalized to full names.

## 2 · Publish-gate math (state the math)

```
INTENDED  = 1,926 rows (every row in MASTER_LOCATIONS)
GATE      = unified score ≥ 50
          AND CGN-verified coordinates
          AND real StatCan census population
          AND source Verification_Status = Verified
          AND not a duplicate place (CGNDB "Locality" twin of an incorporated municipality)
          AND (non-RM  OR  RM population ≥ 1,000)   ← tier-1 RM viability floor
BUILT     = 130 location pages   (16 City · 76 Town · 5 Village · 33 Rural Municipality)
          + 8 region pages + 1 hub page = 139 URLs
DEFERRED  = 1,796 rows — every one listed with a one-line reason in deferred-ledger.csv
            (605 no CGN-verifiable coordinates · 947 unified score < 50 · 190 no real census population
             · 54 RM below tier-1 viability floor)
CHECK     : 1,926 = 130 + 1,796 ✓
```

First Nations reserve rows carry source `Verification_Status = Needs_Review` (population sourcing
unresolved in the master sheet) and therefore defer — never published on unverified data.
Neighborhood rows (164, Saskatoon/Regina) have no census population at the neighborhood level in this
sheet → deferred to a phase-2 neighborhood pass with real signals.

## 3 · Encoded-once patterns (apply to every row; rows store only what is unique)

All business copy is single-curly `{TOKENS}`; place facts are literal. `{{` count target: **0**.

| Pattern | Template |
|---|---|
| URL | `/areas/{URL_Slug}` (flat; region NOT in path) |
| SEO title | `{SERVICE} in <Name>, SK \| {COMPANY_NAME}` (RM rows: `{SERVICE} in the RM of <Name>, SK \| {COMPANY_NAME}`) |
| H1 | `{SERVICE} in <Name>, Saskatchewan — {COMPANY_NAME}` |
| Primary keyword | `{SERVICE} <Name>` (RM rows: `{SERVICE} RM of <Name>` — no clash with the town page) |
| Secondary keywords | `{SERVICE} near me · {SERVICE} <Name> Saskatchewan · {BUSINESS_TYPE} <Name> SK` + row-specific variants |
| Question keywords | `How much does {SERVICE} cost in <Name>? · Who does {SERVICE} in <Name>, Saskatchewan? · How do I choose a {BUSINESS_TYPE} in <Name>?` (cost/choose intent routes to the region blog guides) |
| Conversational (5) | `"{SERVICE} near me in <Name>" · "best {BUSINESS_TYPE} in <Name> Saskatchewan" · "who can do {SERVICE} in <Name> SK"` + 2 row-specific phrasings using a real local term |
| CTA (hero) | `{CTA_PRIMARY} — Call {PHONE}` · city-specific closer: `Get my free <Name> {ESTIMATE_TYPE} estimate — {PHONE}` |
| Updated stamp | Visible `Updated July 2026` = `dateModified: 2026-07-10` on every row in this run (honest — this IS the edit date) |

**Services grid (remixable layer):** every location page renders 4–8 cards from `{SERVICE_LIST}` /
`{SUBSERVICE_1..N}`, each linking `/areas/<slug>/{SERVICE_SLUG}`. Never hardcode a trade.

**Map facade (every page):** `<figure class="map-facade">` → keyboard-accessible `<button>` wrapping a
WebP placeholder `<img>` (explicit `width`/`height`, `loading="lazy"`, `decoding="async"`,
`alt="Map showing our {SERVICE_CATEGORY} service area across <Name>, Saskatchewan"`); iframe
`https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=place_id:{PLACE_ID}` injected on
click only; `aspect-ratio:4/3`. `{PLACE_ID}` resolves once per business in config — never per page.

**JSON-LD `@graph` (one per page, static HTML, referenced by `@id`):**
```json
{"@context":"https://schema.org","@graph":[
 {"@type":"{LOCALBUSINESS_TYPE}","@id":"{BRAND_URL}#business"},
 {"@type":"Service","@id":"{BRAND_URL}/areas/<slug>#service",
  "serviceType":"{SERVICE_CATEGORY}","name":"{SERVICE_CATEGORY} in <Name>",
  "provider":{"@id":"{BRAND_URL}#business"},
  "areaServed":[{"@type":"City","name":"<Name>","containedInPlace":{"@type":"AdministrativeArea","name":"Saskatchewan"}},
                {"@type":"GeoCircle","geoMidpoint":{"@type":"GeoCoordinates","latitude":"<lat>","longitude":"<lng>"},
                 "geoRadius":"<Geo_Radius_M>"}],
  "hasOfferCatalog":{"@type":"OfferCatalog","name":"{SERVICE_LIST}"}},
 {"@type":"WebPage","@id":"{BRAND_URL}/areas/<slug>#page","dateModified":"2026-07-10",
  "speakable":{"@type":"SpeakableSpecification","cssSelector":[".answer-first"]}},
 {"@type":"BreadcrumbList","itemListElement":["Home","Areas We Serve","<Region>","<Name>"]},
 {"@type":"FAQPage","mainEntity":"<the row's FAQs, verbatim>"},
 {"@type":"ImageObject","contentUrl":"/images/areas/<Image_Filename>","name":"<Alt_Geo>","contentLocation":"<Name>, Saskatchewan"}
]}
```
`geoRadius` is **metres**, per row: City ≥25k pop → `12000` · City → `8000` · Town → `4000` · Village →
`2500` · RM → `25000`. The business node is defined once per province with full NAP; every page
references `#business` by `@id` only. No street address for service-area places; no self-serving
`aggregateRating`. No `HowTo`.

**Image system (this run):** no per-place photo could be license-verified this run, so every row ships
**`Image_Source_Tier: "flag"`** — the flag of Saskatchewan (public domain, Wikimedia Commons
`Flag_of_Saskatchewan.svg`) rendered to WebP — with **metadata that describes the PLACE, never the
flag**: filename `<slug>-<region-slug>-sk.webp`, Layer-1 alt = geographic description (unique per row,
stored as `Alt_Geo`), rendered alt = `{SERVICE_CATEGORY} in <Name>, Saskatchewan — <Alt_Geo>`, EXIF
geo-tag = real lat/lng. Each row carries `Image_Upgrade_TODO` noting the real-photo upgrade path
(Wikimedia Commons search term). Attribution: `// Wikimedia Commons — Public Domain — flag of
Saskatchewan used as place-neutral fallback`.

**Linking law implementation (every location row):**
- UP: 1 link to `/areas/region/<region-slug>` with a descriptive geo-anchor.
- SIDEWAYS: `Nearby_Areas` = 3–5 nearest BUILT pages, haversine-computed, bidirectional by construction,
  each with the stored varied anchor (`Nearby_Anchor` per neighbor, never a bare name repeated verbatim
  as another page's primary keyword).
- DOWN: the tokenized services grid (`/areas/<slug>/{SERVICE_SLUG}`); no neighborhood children in tier 1.
- BLOG: 2–4 of the region's guide slugs (see `region-bundles.md` §blogs — cost guide, seasonal guide,
  how-to-choose, permit guide). Blogs are informational only and link back down with contextual anchors.
- No orphans: every BUILT page receives ≥3 inbound links (region page + reciprocal nearby modules).

**Row JSON schema** (`locations/*.json`, arrays of rows — extends the doc-03 contract):
`Location_ID, Location_Name, Location_Type, Region, Province, URL_Slug, Latitude, Longitude,
Population_2021, Population_2016, Parent_RM, Distance_Saskatoon_KM, Distance_Regina_KM, Unified_Score,
Geo_Radius_M, SEO_Title, Meta_Description, Primary_Keyword, Secondary_Keywords, Long_Tail_Keywords,
Question_Keywords, Conversational_Queries, Entity_Description, AI_Answer_Snippet, About_Location,
Local_Facts[], Info_Gain_Element, FAQs[{q,a}], Nearby_Areas[{slug,name,km,anchor}], Region_Link,
Blog_Links[], Image{tier,filename,alt_geo,attribution,upgrade_todo}, Signals[], Signals_Count,
Verification_Status, Date_Modified`.

Word-count gates enforced per row: Entity 50–100 · AI snippet 40–60 (ends `Call {PHONE}`) · About
400–600 · FAQ answers 40–60 (last FAQ ends `Call {PHONE}`) · 4–6 FAQs (≥1 hyper-local) · ≥4 signals ·
≥1 info-gain · unique About opener · unique alt.

## 4 · Files in this build

| File | What |
|---|---|
| `README.md` | This spec — mode, corrections, gate math, encoded-once patterns |
| `region-bundles.md` | 8 region fact bundles (computed once) + region page content + hub page + blog slugs |
| `locations/<region>.json` | Per-location upgraded rows (BUILT tier), one array per region |
| `deferred-ledger.csv` | All 1,796 deferred rows: id, name, type, region, pop, score, reason |
| `audit-report.md` | Final audit: reconciliation, defect sweeps, distribution, sample pages |

Robots/sitemap contract (site-level): every BUILT URL in a segmented sitemap with honest
`<lastmod>2026-07-10</lastmod>`; robots allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User,
PerplexityBot, ClaudeBot, Google-Extended; deferred slugs never enter the sitemap.
