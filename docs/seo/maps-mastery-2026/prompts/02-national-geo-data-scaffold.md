# Prompt 02 — National Geo-Data Scaffold + Publish Gate (All CA + All US)

> **Goal.** Turn `src/data/communities.ts` from a 4-row placeholder into a **drop-in national scaffold** covering every Canadian province/territory and all 50 US states + DC, with a **two-file split** (immutable scaffold + per-business enrichment), a **build-time publish gate**, and a **variation engine** — so the same template drops into any project and ranks instead of getting filtered.
>
> **Satisfies:** Gate B. **Spec:** `../reports/02-NATIONAL-SCALE-TEMPLATE-SPEC.md`. **Evidence:** `../research/04`.

---

## Tasks

### 1. Build the scaffold dataset (all CA + US)
- Source from **license-clean** datasets only (see report 02 §2):
  - **USA:** US Census **Gazetteer "Places"** (name, GEOID, lat/lng, area) + **USGS GNIS** — both **public domain.**
  - **Canada:** StatCan **GeoSuite / CSD list** + **NRCan CGNDB** — **OGL-Canada (attribution required).**
  - Enrich with **Wikidata** (`@id`, population) — CC0.
  - ❌ Do NOT bundle Canada Post FSA; ❌ do not redistribute OSM/ODbL DB; ⚠️ GeoNames only with visible attribution.
- Produce `src/data/scaffold/` as compact JSON/TS keyed by region, shape = `ScaffoldPlace` (report 02 §1): `slug, name, nameFr?, country, region, regionCode, parentMetro?, lat, lng, population?, type, source, wikidata?`.
- Carry `source` per row; bundle the OGL-Canada attribution string and render a footer credit when any CA-sourced row is active.
- Keep the file(s) to the **flat attribute layer** (a few MB) — no boundary geometry in the client. Consider lazy-loading per-region chunks.

### 2. Split scaffold vs enrichment
- `ScaffoldPlace[]` — ships once, rarely changes.
- `AreaEnrichment[]` — authored per business; holds the 8 signals + first-party media + editorial (report 02 §1). `active: boolean` per row.
- Preserve the **existing helper contract** (`getCommunity`, `getRegion`, `getRegionCommunities`, `getNearestCommunities`, `getAllCommunitySlugs`) so pages don't change — make them read `scaffold ⨝ enrichment`.

### 3. The build-time publish gate
- Implement `shouldIndex(slug)` / `gateResult(slug)`:
  ```
  PASS ⇔ signalsPresent(enrichment) ≥ 4
        AND hasFirstParty(enrichment)               // testimonial | first-party photo | named project
        AND uniqueDescription(enrichment)            // passes "remove the city name" test
  ```
- FAIL → route skipped OR `noindex` + excluded from sitemap. Never ship thin.
- Print a **forecast** at build: `ACTIVATED=n GATE-PASS=m SKIPPED=n-m (reasons)`.

### 4. The variation engine
- Deterministic rotation keyed by `hash(slug + service)` (stable across builds): rotating intro, condition note, nearest-proof selection, assembled local FAQ, computed nearby module. Target ≥60% unique main content, 8+ data points/row. (Report 02 §5.)

### 5. URL + slug discipline
- Slugs ASCII-folded, lowercase, hyphenated; display names keep accents. `/areas-we-serve/{region}/{community}`. Self-canonical. 301 map for any changed slug.

## Guardrails
- Trade-agnostic: no business/service strings hardcoded in the scaffold.
- Don't model on postal codes (US ZIP = mail route; CA FSA = licensed).
- Don't auto-generate FR pages by machine translation (scaled content abuse).

## Verification (paste evidence)
- `tsc --noEmit` + `vite build` green.
- Scaffold contains rows for **every** CA province/territory + all 50 US states + DC (spot-check counts; ~29k US places / ~5k CA CSDs available, bundled or chunked).
- Gate forecast prints; a deliberately thin enrichment row is **skipped/noindexed** and absent from the sitemap.
- Two gate-passing neighbours render **>60% different** main content (diff check).
- OGL-Canada attribution renders when a CA row is active.
