# Report 02 — National-Scale Template Spec (All Canada + All US States)

> **What this is.** The specification for the **geographic data scaffold** that lets this Areas template drop into any project and cover **all of Canada (every province/territory) and all 50 US states + DC** — then be narrowed and enriched per business so it ranks instead of getting filtered.
> Synthesizes `../research/04-national-geo-data-scaffold-canada-usa.md` and `../research/01-local-maps-ranking.md`. **Spec only — no code changed.**

---

## 0. The core principle

> **The scaffold is data; the page is a privilege.**

Ship a complete, license-clean geographic dataset for the whole of Canada and the USA. But a page is **generated and indexed only when it earns it** — when the per-business deployment has activated that area AND it passes the publish gate (≥4-of-8 local signals + ≥1 first-party element). Coverage without the gate is a doorway network that sinks the domain; the gate is what turns a scaffold into a ranking asset.

---

## 1. The data model (drop-in `Place[]` layer)

Extend today's `src/data/communities.ts` shape into a national scaffold. Keep the existing helper contract (`getCommunity`, `getRegion`, etc.) so pages don't change.

```ts
// The scaffold row — bundled for all of CA + US, license-tagged.
export interface ScaffoldPlace {
  slug: string;             // stable URL key, ASCII-folded: "saint-jerome"
  name: string;             // display: "Saint-Jérôme"
  nameFr?: string;          // FR display where relevant
  country: "ca" | "us";
  region: string;           // province/state slug: "quebec" | "california"
  regionCode: string;       // "QC" | "CA" (postal/ISO)
  parentMetro?: string;     // optional county/metro slug: "los-angeles-county"
  lat: number; lng: number; // internal point (Gazetteer / CSD centroid)
  population?: number;       // drives priority + gate eligibility
  type: "incorporated_place" | "cdp" | "csd" | "popctr" | "neighbourhood";
  source: "uscensus" | "gnis" | "statcan" | "cgndb" | "geonames" | "wikidata";
  wikidata?: string;        // "Q1104015" → schema @id for entity disambiguation
}

// The per-business ENRICHMENT row — only for activated areas. This is what
// the publish gate reads. Empty/thin → page is skipped/noindexed.
export interface AreaEnrichment {
  slug: string;             // FK → ScaffoldPlace.slug
  active: boolean;          // per-business activation flag
  // --- the 8 local-specificity signals (≥4 required) ---
  landmarks?: string[];     // 1. named streets/parks/schools/subdivisions
  conditionNote?: string;   // 2. climate/geography fact affecting the service
  projectRef?: string;      // 3. named local project completed
  codeNote?: string;        // 4. municipal permit/bylaw note
  communityRef?: string;    // 5. named association/event
  proximityNote?: string;   // 6. crew-base / supplier / distance differentiator
  testimonial?: { quote: string; name: string; area: string }; // 7. FIRST-PARTY
  localFaq?: { question: string; answer: string }[];           // 8. community-specific Q&A
  // --- first-party media (≥1 first-party element overall) ---
  photos?: { url: string; alt: string }[];
  // --- editorial ---
  shortDescription?: string;
  fullDescription?: string;
  primaryKeywords?: string[];
  nearestCommunities?: string[];
}
```

**Two-file split is deliberate:** the **scaffold** (`ScaffoldPlace[]`) ships once for all of CA + US and rarely changes; the **enrichment** (`AreaEnrichment[]`) is authored per business and is what the gate evaluates. The page reads `scaffold ⨝ enrichment` by slug.

---

## 2. Data sourcing (license-clean — see research 04 for full table)

| Country | Primary dataset | Gives | License | Bundle? |
|---|---|---|---|---|
| USA | **Census Gazetteer "Places"** | name, GEOID, lat/lng, area, state | **Public domain** | ✅ freely |
| USA | **USGS GNIS** | official names, class, county, coords | **Public domain** | ✅ freely |
| Canada | **StatCan GeoSuite / CSD list** | municipality name, code, pop, province | **OGL-Canada** | ✅ with attribution |
| Canada | **NRCan CGNDB** | 350k+ names, coords, province | **OGL-Canada** | ✅ with attribution |
| Both | **Wikidata** | `@id`, population, alt-names | **CC0** | ✅ enrichment only |
| ⚠️ | GeoNames | worldwide name+latlng | **CC-BY** | only with visible attribution |
| ⚠️ | OSM/Nominatim | geocoding | **ODbL** | lookup-only; don't redistribute the DB |
| ❌ | Canada Post FSA | postal codes | **proprietary/licensed** | do NOT bundle |

**Attribution requirement:** carry `source` per row. Rows sourced from StatCan/CGNDB (OGL-Canada) or GeoNames (CC-BY) trigger a bundled attribution string + a site footer/credits line:
> *"Contains information licensed under the Open Government Licence – Canada."*

**Do NOT model on postal codes.** US ZIPs are mail routes, not areas; Canada Post FSAs are licensed. Model on **incorporated places / CSDs**.

---

## 3. The geographic hierarchy + URL scheme

```
Country (ca / us)
 └─ Province / State            → /areas-we-serve/{region}/
     └─ Region / Metro / County  (optional grouping layer)
         └─ City / Place / CSD    → the leaf
             └─ Neighbourhood     (optional deeper leaf)

/areas-we-serve/                        national index (hub)
/areas-we-serve/{region}/               provincial/state hub
/areas-we-serve/{region}/{community}/   leaf — the rankable asset
```
- Lowercase, hyphenated, ASCII-folded slugs (`montreal`, display `Montréal`).
- ≤3 levels deep. Self-referencing canonical per leaf.
- **301-redirect** any slug ever changed (store a stable slug as the key).
- Never query parameters for areas.

**Dataset sizes to plan for:** USA ~29,000 places (19.5k incorporated + 9.7k CDP); Canada ~5,000+ CSDs (+ CGNDB 350k names for neighbourhood depth). Bundle the **flat attribute layer** (a few MB JSON/TS) — keep boundary geometry out of the client.

---

## 4. The publish gate (the heart of the spec)

**Build-time, hard, non-bypassable.** For each activated area, evaluate the enrichment row:

```
PASS  ⇔  (count of present signals from the 8) ≥ 4
         AND (≥1 first-party element present: testimonial OR first-party photo OR named project)
         AND (fullDescription is unique — passes the "remove the city name" test)

PASS  → generate page, include in sitemap, allow index
FAIL  → skip the route entirely OR emit with <meta name="robots" content="noindex">
        and EXCLUDE from sitemap; log the reason
```

**The 8 local-specificity signals** (≥4): landmark/neighbourhood · condition note · project ref · code/permit note · community ref · proximity differentiator · **named local testimonial (first-party)** · community-specific FAQ.

**Forecast before building:** the build step prints the math —
```
ACTIVATED = {n}    GATE-PASS = {m}    SKIPPED/NOINDEX = {n-m} (with reasons)
```
so a human sees exactly how many thin pages were prevented from shipping.

---

## 5. The uniqueness (variation) engine

Even gate-passing pages must not read as find-and-replace. Deterministic rotation keyed by `hash(slug + service)` (stable across builds, distinct between neighbours):

| Lever | Mechanism |
|---|---|
| Intro | N intro templates selected by hash → same page stable, neighbours differ |
| Condition note | per-area `conditionNote` keyed to the service |
| Proof | nearest testimonial/project selected per area, fallback by region |
| Local FAQ | assembled from `localFaq` + code/condition fields (≥1 town-only question) |
| Nearby module | computed nearest communities → unique internal-link set per page |

Targets: **≥60% unique main content**, **8+ unique data points per row.**

---

## 6. Internal-linking pyramid (national scale)

```
Homepage ─────────────→ /areas-we-serve/ (index)  +  top {region} hubs
/services/{service} ──→ /areas-we-serve/ (index)
/areas-we-serve/ ─────→ all {region} hubs
{region} hub ─────────→ all its activated {community} leaves
{community} leaf ─────→ breadcrumb up to {region}; sideways to 3–5 nearest leaves
blog post (local) ────→ matching {community} leaf  (the intent bridge)
{community} leaf ─────→ relevant local blog posts
```
Descriptive anchors only; vary anchors to the same destination; no orphans.

---

## 7. Staged rollout + monitoring (per business)

1. Activate the real service areas (top **2–4 within ~2 hours' drive** first — depth over coverage).
2. Author enrichment until each passes the gate.
3. Publish in batches: **20–30 → 50 → 100 → 200+.**
4. Verify in Search Console: **80%+ indexed within 4 weeks** before scaling; **<50% at 8 weeks → diagnose** (look for "duplicate," "crawled – not indexed," soft-404).
5. Expand only when there is something genuinely new to say about the next area.

---

## 8. Bilingual Canada (optional)

- `en-ca` / `fr-ca` / `x-default` with reciprocal return tags, only where **genuine FR content** exists (Quebec, NB, bilingual metros).
- Carry `nameFr` and an FR enrichment variant; FR slugs (`/secteurs-desservis/...`).
- **Never auto-translate to inflate page count** (scaled content abuse). Validate hreflang (>65% of international sites have errors).

---

## 9. Acceptance checklist (national scale)

- [ ] Scaffold ships for **all CA provinces/territories + all 50 US states + DC**, sourced from public-domain/OGL data, license-tagged per row.
- [ ] `source` + attribution string bundled; OGL-Canada/CC-BY credit rendered in footer.
- [ ] Two-file split: immutable scaffold + per-business enrichment.
- [ ] Build-time **publish gate** (≥4-of-8 + ≥1 first-party + uniqueness) skips/noindexes thin pages and prints the forecast.
- [ ] Variation engine yields ≥60% unique content, 8+ data points/row.
- [ ] Clean slug URLs, self-canonical, ≤3 levels, ASCII-folded; 301s for changes.
- [ ] Internal-linking pyramid wired (hub→spoke→sideways + intent bridge); no orphans.
- [ ] Build-time sitemap includes only gate-passing URLs with honest `lastmod`.
- [ ] No postal-code modeling; no Canada Post FSA bundling.
- [ ] Staged-rollout + GSC-indexing monitoring documented for the deployer.
