# Prompt 03 — Maps Integration: Facade Embed + Static Geo Schema

> **Goal.** Make the map a **CWV-safe facade** and move **all geo SEO/AI weight into prerendered structured data**. The map is UX/context; the JSON-LD is the signal.
>
> **Satisfies:** Gate C (schema/entity), Gate E (map performance). **Spec:** `../reports/01-MAPS-INTEGRATION-PLAYBOOK.md`. **Evidence:** `../research/02`.

---

## Tasks

### 1. Convert `GoogleMap.tsx` to a facade
- Default render = a **static WebP placeholder** inside a real `<button>` with descriptive `aria-label`; the live iframe is injected **on click/tap/keyboard activation only**.
- Box reserved with `aspect-ratio` → **CLS = 0**. Iframe (when loaded) gets a descriptive `title`.
- **Embed source priority:** (1) Maps **Embed API** `q=place_id:{PLACE_ID}` when an API key + Place ID exist (free, ties to verified entity); (2) keyless `maps.google.com/maps?q={lat},{lng}&output=embed` as **fallback only** (keep today's keyless behavior here).
- Never the live Maps **JavaScript API** marker on community pages at scale (TBT/INP/cost/non-JS-invisible). Remove the JS-API path from per-community use (or guard it behind a single national coverage map, also faceted).
- Placeholder must **not** be the LCP element on cold load.

### 2. Migrate `AreasSEOSchema.tsx` to static + complete the graph
- Render the graph into prerendered HTML (done structurally in prompt 01); here, complete the **fields**:
  - `Service` with `serviceType`, `name="{SERVICE_CATEGORY} in {Community}"`, `provider` (LocalBusiness: NAP, `geo`, **`hasMap`**, **`sameAs`**), and town-scoped **`areaServed`** (`City` + `containedInPlace` AdministrativeArea; add **`@id`** Wikidata where available).
  - Co-emit `LocalBusiness`, `BreadcrumbList`, `FAQPage` (matches visible Q&A), `WebPage` (`dateModified`, `speakable` on the answer block).
  - For SABs serving many towns: hybrid `areaServed` array (cities + `GeoCircle` with `geoRadius` in **metres**).
- Pull `PLACE_ID`, `sameAs` URLs, NAP from the per-business config (`src/config/template/*`), not hardcoded.

### 3. Place ID plumbing
- Add `placeId` + `sameAs[]` to the per-business config; resolve Place ID once and reuse for the facade embed and `hasMap`/`sameAs`.

## Hard rules (Gate C)
- `geoRadius` in **metres** (30 mi = 48280).
- NAP **byte-identical** with GBP + footer.
- **No self-serving `aggregateRating`/`review`.**
- No physical-address `LocalBusiness` on a town with no real branch — use `Service` + `areaServed`.

## Verification (paste evidence)
- `tsc --noEmit` + `vite build` green.
- View-source (JS off) on a community page shows the **full graph** with `areaServed`, `hasMap`, `sameAs`.
- **Rich Results Test / Schema validator: 0 errors.**
- Lighthouse mobile with the map present: **Perf ≥ 90, CLS ≈ 0**; Maps JS not in the cold-load network waterfall; facade loads the iframe only on activation; iframe has a `title`; button is keyboard-operable.
