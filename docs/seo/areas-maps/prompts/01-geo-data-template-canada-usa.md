# PROMPT 01 — Geo-Data Template: All of Canada + All US States

> Fire **after Prompt 00's gate is green.** Paste this whole file to the build agent.
> This is the prompt that turns the 4-community placeholder into a real, penalty-safe,
> all-Canada/all-states geo-template.

---

## ROLE

You are the **Programmatic Local SEO Matrix Architect** (`/geomatrix`) + **Local SEO Architect**
(`/areas`). Frontend + build-script only; no framework migration. Your creed: **scaled
uniqueness, not find-and-replace** — build the *fewest* pages you can make genuinely useful,
each carrying real local data, behind a hard build-time gate. Verify with evidence.

## ONE-SENTENCE OBJECTIVE

Replace the placeholder geo-data with an **open-data-sourced geo-hierarchy** that can cover
every Canadian province/territory and every US state, with population + postal + centroid data
and nearest-N edges, gated by a **build-time 4-of-8 uniqueness rule** so only genuinely-useful
pages are generated.

## WHY / CURRENT STATE

- The live data layer is `src/data/communities.ts` — a **4-community placeholder scaffold**
  (`:59–162`, `{PLACEHOLDER}` tokens). Good *shape* (`Region`, `Community` with
  `coordinates{lat,lng}`, `tier`, `streets[]`, `landmarks[]`, `faqs`, `nearestCommunities[]`,
  `adjacentRegions[]`) and good helpers (`getCommunity`, `getRegion`, `getRegionCommunities`,
  `getNearestCommunities`, `getAllRegionSlugs`, `getAllCommunitySlugs`).
- There is **no nationwide dataset, no population/postal data, and no uniqueness gate.** Scaling
  this to thousands of cities *without* a gate is a doorway/scaled-content trigger (Research 05).
- `src/master/seo/service-areas.ts` + `src/master/knowledge/.../service-areas/` are a
  provenance/source layer; **`communities.ts` is the runtime target.**

---

## THE WORK

### Part A — The geo-hierarchy data model (extend, don't replace)

1. Keep the existing `Region`/`Community` interfaces and helper API **stable** (pages,
   sitemap, schema, widgets all depend on them). Extend the `Community` type additively with the
   fields the gate and scale need:
   ```ts
   // additive fields on Community
   population?: number;          // for the population floor
   countyOrCD?: string;          // county (US) / census division (CA)
   postalCodes?: string[];       // ZIP/ZCTA (US) | FSA (CA)
   geoId?: string;               // Census GEOID / StatCan DGUID — provenance
   distanceFromBaseKm?: number;  // computed: Haversine from business base
   localScore?: number;          // computed by the 4-of-8 gate
   indexable?: boolean;          // gate output: false → noindex + excluded from sitemap
   lang?: "en" | "fr";           // community-level language hint (QC)
   ```
2. Model the hierarchy as **country → region(province/state) → metro/city → community**. The
   template's three URL tiers map to: Region = province/state, Community = city (and, later,
   neighborhood spokes **only after the city ranks**). Keep slugs lowercase, hyphenated, unique
   within parent, **≤3 levels deep**.

### Part B — Open-data ingestion (build a generator script, not hand-typed data)

3. Add `scripts/build-geo-data.ts` (or similar) that ingests free, legal open data into the
   `communities.ts` shape. **Sources (all free; store the source id for provenance):**

   | Source | Use | License |
   |---|---|---|
   | **US Census Gazetteer Files** | US places + counties + ZCTAs, lat/lng, population | Public domain |
   | **StatCan Boundary/Census-Subdivision + Population-Centre files** | CA municipalities, centroids, population | StatCan Open Licence (attribution) |
   | **GeoNames** (`cities500`/`cities1000`) | neighborhood/place enrichment, postal codes | CC-BY 4.0 (credit) |
   | **SimpleMaps US Cities/ZIPs (free tier)** | quick US start | free *with visible link-back* — flag per client |
   | **Natural Earth** | country/region base geometry | Public domain |

   **Recommended baseline:** US Census Gazetteer (US, public domain) + StatCan CSD/POPCTR
   (Canada) + GeoNames for enrichment. Persist `geoId`/`DGUID` so every node is traceable.

4. **Compute nearest-N + adjacency at build time** (never at request time): with lat/lng on
   every node, compute great-circle (Haversine) distance, keep the **N closest same-level
   siblings** as `nearestCommunities` (the field the `NearbyAreasWidget`/`getNearestCommunities`
   already consume). True border-adjacency (PostGIS `ST_Touches`) is optional — **nearest-N by
   centroid is sufficient** for the internal-link pyramid and avoids shipping geometry.

### Part C — The 4-of-8 uniqueness gate (the hard publish gate)

5. Generate a `Community` page **only if it passes a build-time gate** that produces `localScore`
   and sets `indexable`. The gate runs four filters:
   1. **Population floor** — e.g. ≥ 1,000 (community) / ≥ 5,000 (city). Filters phantom places.
   2. **Service-radius filter** — within the business's **real operational** radius (Haversine
      from `MASTER_REMIX` base lat/lng). The *aspirational* radius is the doorway trap.
   3. **Local-specificity (4-of-8 rule)** — publish only if **≥4** of these unique elements
      exist for the city: named landmark/neighborhood · local condition note tied to the service
      · local project/proof · local code/permit note · local-only FAQ · proximity differentiator
      · named testimonial · community/Chamber reference. `< 4` → `indexable = false`
      (`noindex` + excluded from sitemap), **not** published as a thin clone.
   4. **Demand signal (optional)** — keyword volume / Search Console impressions tier to
      prioritize build order.
6. **State the math before generating** (geomatrix Law): print
   `intended = services × eligible_communities; published = passing gate; skipped/noindexed = N`
   with reasons. This single discipline separates a ranking network from a manual action.
7. Wire the gate into the existing **content-variance engine** (`src/lib/contentVariance.ts`,
   `pickVariant()`/`fill()`) so the unique elements are assembled deterministically per slug,
   and into the per-community FAQ builder (`CommunityPage.tsx:50–91`). Extend the FAQ builder
   toward pulling from the 8 local signals, not just streets.

### Part D — Per-business config (the remix seam)

8. Add base-geo + radius + min-population + local-proof to the remix config so a new client is
   **data, not code** (this is the seam Prompt 05 operationalizes). Extend `MASTER_REMIX` (or a
   sibling `GEO_CONFIG`) with:
   ```ts
   GEO_CONFIG = {
     base: { lat: number, lng: number },   // business HQ / dispatch point
     serviceRadiusKm: number,               // REAL operational radius
     minPopulation: number,
     nearestN: number,                      // default 4–5
     locales: ("en" | "fr")[],
     localProof: Record<citySlug, { testimonial?, project?, condition?, permitNote? }>
   }
   ```
   `localProof` is the **uniqueness engine** — without it the gate fails and pages are correctly
   suppressed. A new client provides a config + a `localProof` spreadsheet, never a code change.

### Part E — Scale mechanics

9. **Phased rollout:** publish in priority order (population × proximity × demand) in batches;
   watch indexation + rankings per batch before releasing the next tier. **Build major-revenue
   cities first**; build neighborhood spokes **only after** the city hub ranks.
10. **Sitemap:** ensure `generate-sitemap.ts` emits **only `indexable` communities**, uses the
    sitemap-index structure from Prompt 00, and carries accurate `<lastmod>`. No `noindex` URL
    in any sitemap, ever.
11. **No orphans:** every published city is reachable from the region hub + its nearest-N siblings
    + breadcrumb up (the existing widgets already do this — confirm at scale).

---

## VERIFICATION GATE (paste evidence before claiming done)

1. The generator script produces a populated `communities.ts` (or a generated data module) for a
   chosen test state/province; `npx tsc --noEmit` + `npx vite build` green.
2. The **page-count math** is printed: intended vs published vs skipped/`noindex`, with the gate
   reason per skipped city.
3. Pick 3 published cities at random → each visibly carries **≥4 distinct local signals**; pick 3
   skipped cities → each genuinely lacked the data (gate is honest, not cosmetic).
4. Sitemap contains **only** `indexable` cities; no `noindex` city appears. Every published city
   has ≥1 internal link in (no orphans).
5. **Doorway self-audit on 3 sample pages:** remove the city name — is anything left that's
   specific to that place? If no → the page fails and must be skipped or enriched.

## GUARDRAILS

- Do **not** generate a page for every place — **eligibility (gate) first, volume never.**
- Do **not** invent local facts to pass the gate. Missing data → skip/`noindex`, not fabrication.
- Keep the `Region`/`Community` helper API and slugs stable (downstream pages/sitemap/schema
  depend on them).
- Respect each data source's license (attribution for StatCan/GeoNames; link-back for SimpleMaps
  free tier — flag it per client).
- Stay scoped: this prompt is data + gate. Map facade/schema = Prompt 02; page content/E-E-A-T =
  Prompt 03; bilingual = Prompt 04.
