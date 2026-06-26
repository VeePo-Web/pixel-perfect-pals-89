# Research 05 — Programmatic Geo-Template at Scale: All of Canada + All US States

> Deep-research findings brief. Sources 2025–2026. A penalty-safe architecture and the open-data sources to populate it.

## 1. What Google rewards vs. penalizes (2026)

Google's **March 2024 spam update** formalized "scaled content abuse," defined by *intent and outcome, not production method*: "generating many pages primarily to manipulate rankings, with little or no value." The system explicitly targets **data-template pages that swap location names into identical structures.** Mueller's standing guidance: 1,300 city pages differing only by `keyword + city` are **doorway pages.**

The bright line: **Zillow/Redfin/Yelp/Thumbtack survive because each URL is differentiated by real per-entity data.** The 2026 quality bar: **≥60% unique content per page**, the page is *the destination* (answers without a second click), and pages link from a central hub. Thin-page-at-volume sites saw 50–80% traffic drops.

**Implication:** Build the *fewest* pages you can make genuinely useful, each carrying real local data. Volume is a liability, not an asset.

## 2. The geographic hierarchy data model

Single self-referencing node table + an adjacency table:

```
GeoNode {
  id            string            // stable, e.g. "us-tx-austin"
  level         "country"|"region"|"metro"|"city"|"community"
  name          string
  slug          string            // lowercase, hyphenated, unique within parent
  parentId      string|null
  lat, lng      number            // WGS84 internal point
  population    number|null
  countyOrCD    string|null       // county (US) / census division (CA)
  postalCodes   string[]          // ZIP / ZCTA (US), FSA (CA)
  geoId         string            // Census GEOID / StatCan DGUID (provenance)
  bbox          [n,s,e,w]|null
  lang          "en"|"fr"|null    // community-level language hint (QC)
}
GeoEdge { aId, bId, kind: "adjacent"|"nearest", distanceKm }
```

**Slug pattern (≤3 levels deep):**
- City hub: `/areas-we-serve/{region-slug}/{city-slug}/` → `/areas-we-serve/texas/austin/`
- Community spoke: `/areas-we-serve/{region}/{city}/{community}/`
- Canada bilingual: mirror under `/fr/zones-desservies/{region}/{ville}/`

**Computing "nearest N" and adjacency:** with lat/lng on every node, compute great-circle (Haversine) distance and keep the N closest *same-level* siblings as `nearest` edges. For true `adjacent` (shared border), derive from boundary files (PostGIS `ST_Touches` or precompute). For most service templates, **nearest-N by centroid distance is sufficient** and avoids shipping geometry. Cache edges at build time; never compute at request time.

## 3. Authoritative open data sources (free, legal)

| Source | Coverage | lat/lng | population | License | URL |
|---|---|---|---|---|---|
| **US Census Gazetteer Files** | US places, counties, ZCTAs | ✅ | ✅ | Public domain | census.gov/geographies/reference-files/.../gazetteer-files.html |
| **US Census Relationship/TIGER** | Place↔ZCTA, geometry | n/a | n/a | Public domain | census.gov relationship-files |
| **StatCan Boundary Files** | Census subdivisions (municipalities), population centres | centroid | via census profile | StatCan Open Licence (attribution) | statcan.gc.ca boundary-limites |
| **GeoNames** | Global populated places, postal codes | ✅ | ✅ | CC-BY 4.0 (credit) | geonames.org/export |
| **SimpleMaps — Basic World Cities** | Global cities | ✅ | ✅ | CC-BY 4.0 | simplemaps.com/resources/free-country-cities |
| **SimpleMaps — US Cities/ZIPs (free)** | US, rich | ✅ | ✅ | Free *conditional on link-back* | simplemaps.com/data/us-zips |
| **OpenStreetMap / Nominatim** | Neighborhoods, geometry | ✅ | partial | ODbL (share-alike) | nominatim.org |
| **Natural Earth** | Country/region base data | ✅ | n/a | Public domain | naturalearthdata.com |

**Recommended stack:** US Census Gazetteer (places + ZCTAs, public domain) + StatCan CSDs/POPCTRs for Canada + GeoNames for neighborhood enrichment. Store the source `geoId`/`DGUID` for provenance. SimpleMaps' free US tier requires a visible link-back — a per-client constraint to flag.

## 4. The uniqueness / eligibility gate (don't ship 30,000 thin pages)

Generate a page **only if it passes a build-time gate** producing a `localScore`:

1. **Population floor** — e.g., ≥1,000 (community) / ≥5,000 (city). Filters phantom places.
2. **Distance-from-base radius** — within the business's *real operational* service radius (Haversine). Aspirational radius is the doorway trap.
3. **Local-specificity availability (4-of-8 rule)** — page publishes only if ≥4 unique local elements exist: named landmark/neighborhood, local condition note, local project/proof, local code/permit note, local FAQ, proximity differentiator, named testimonial, community reference. If the data can't supply 4 → **skip or `noindex`.**
4. **Demand signal (optional)** — keyword volume / Search Console impressions tier.

State the math before generating: `intended = services × eligible_communities; published = passing gate; skipped = N`. This single discipline separates a ranking network from a manual action.

## 5. Per-business remix — data-driven, zero code change

One shared geo dataset; a per-business **config object** filters it:

```json
{
  "businessId": "apex-roofing",
  "base": { "lat": 51.18, "lng": -114.47 },
  "serviceRadiusKm": 60,
  "minPopulation": 1500,
  "services": ["roof-repair", "metal-roofing"],
  "localProof": { "austin": { "testimonial": "...", "project": "River Song re-roof" } },
  "nearestN": 5,
  "locales": ["en"]
}
```

Pipeline: load shared geo → filter by `serviceRadiusKm` + `minPopulation` → join `localProof` → run the 4-of-8 gate → emit pages + sitemaps. A new client = a new config + a proof spreadsheet, **never a code change.** Local proof and condition notes are the uniqueness engine; without them the gate fails and pages are correctly suppressed.

## 6. Scale mechanics

- **Sitemap segmentation:** single sitemap caps at **50,000 URLs / 50MB**; use a **sitemap index**, gzip every file.
- **Segment by type + region** (`sitemap-areas-tx.xml.gz`, `sitemap-services.xml.gz`) so Search Console isolates indexation per segment. Accurate `<lastmod>`.
- **Build the index structure proactively at ~20k URLs** so the jump to 60k is seamless.
- **Prioritization tiers / phased rollout:** publish in priority order (population × proximity × demand), in batches, watching indexation + rankings per batch before releasing the next tier. Wire the internal-link pyramid (hub → spoke, breadcrumb up, nearest-N sideways) so no page is orphaned.

## 7. Bilingual Canada (EN/FR) hreflang

- Distinct URLs per language (`/en-ca/...`, `/fr-ca/...`); annotate hreflang `en-ca`, `fr-ca`, plus **`x-default`.**
- **Bidirectional + self-referencing**, fully-qualified absolute URLs.
- ISO 639-1 language + 3166-1 Alpha-2 region codes.
- **Translate intent, not strings** — French search intent diverges; regenerate local copy.
- **No auto-redirects** by language — offer a switcher. Emit hreflang in the **XML sitemap** at scale. Tag each Quebec node with a `lang` hint to drive FR-first defaults.

## Sources
- https://www.searchenginejournal.com/in-depth-look-at-google-spam-policies-updates/511005/
- https://www.seroundtable.com/google-march-2024-spam-updates-37002.html
- https://www.hobo-web.co.uk/firefly/
- https://www.digitalapplied.com/blog/scaled-content-abuse-google-march-update-ai-pages-decimated
- https://www.getpassionfruit.com/blog/programmatic-seo-traffic-cliff-guide
- https://seomatic.ai/blog/programmatic-seo-best-practices
- https://backlinko.com/programmatic-seo
- https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html
- https://www12.statcan.gc.ca/census-recensement/2021/geo/sip-pis/boundary-limites/index2021-eng.cfm?year=21
- https://www.geonames.org/export/
- https://simplemaps.com/data/us-zips · https://simplemaps.com/data/license
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/large-sitemaps
- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
