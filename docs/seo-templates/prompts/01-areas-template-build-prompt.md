# PROMPT 01 — Build the "Areas We Serve" Template for All of Canada + All US States

> **Role:** World-class programmatic local SEO + AI SEO engineer (Sterling Sky × Whitespark ×
> Victorious SEO standard). You extend this repo's existing Areas system (`src/data/communities.ts`,
> `src/pages/AreasHub|RegionPage|CommunityPage.tsx`, `src/components/areas/*`, `src/lib/seoGraph.ts`,
> `scripts/generate-sitemap.ts`) into a reusable template that **covers all of Canada and all 50 US
> states in the same data shape it uses now**, while making it **impossible to publish a thin/doorway
> page**.
>
> **Read first:** `research/01-areas-we-serve-research.md`, `reference/current-implementation-map.md`,
> `reference/qa-ship-gates.md` (GATE A + GATE B). Obey `prompts/00`'s iron laws.

---

## The central tension you must resolve (do not skip)

The user wants "the same template, but for all of Canada and then all the states." Read literally,
that means a page for every place — which is **scaled content abuse** and will suppress the whole
domain (research/01 §0, §2). **Resolve it like this:**

- **The template ships the full geographic *scaffold* (data) + the *engine* (uniqueness gate + schema
  + linking), NOT a published page for every place.**
- **Pages only come into existence when their data passes GATE B (≥ 4 of 8 local signals + ≥ 1
  first-party element).** The scaffold is the menu; the business activates only the dishes it can cook
  with genuine local substance.
- This keeps "works for all of Canada and the US" true (any place can be activated) **without** ever
  shipping find-and-replace doorway pages.

Bake this into the architecture; state it explicitly in your plan and your final report.

---

## Deliverable 1 — The geographic scaffold (reusable dataset)

Create a **separate, reusable geography dataset** that the existing `Region`/`Community` types consume,
covering:

- **Canada:** all **13 provinces & territories** as candidate **Regions** (AB, BC, MB, NB, NL, NS, NT,
  NU, ON, PE, QC, SK, YT). For each, the major cities/communities (start with the top
  population/economic centers; the dataset is extensible) as candidate **Communities** with real
  `coordinates{lat,lng}`, `city`, `province`, `country: "Canada"`.
- **United States:** all **50 states + DC** as candidate **Regions**, each with its major
  cities/metros as candidate **Communities** with real coordinates, `province` = state name (the
  schema's `addressRegion`), `country: "USA"`.

**Constraints:**
- **Exact same `Region` / `Community` interface** as `src/data/communities.ts` today — do not fork the
  type. Add the geography as data that *can* populate those arrays, not a new schema.
- Keep it as **structured TS data** (tree-shakeable, typed). Consider
  `src/data/geo/canada.ts` + `src/data/geo/usa.ts` (or `src/data/geo/index.ts`) feeding helpers that
  build candidate Regions/Communities. Do not bloat the shipped bundle: the scaffold is a **source for
  activation**, not auto-rendered. A project imports/activates only the subset it serves.
- Coordinates must be real (≥ 5 decimals where possible) — they feed `geo` + `GeoCircle` schema and
  the map. Use a stable, public coordinate source; record the source in a comment.
- `adjacentRegions` and `nearestCommunities` should be **derivable** (a helper that computes nearest
  by haversine distance) so the operator doesn't hand-maintain them at national scale.

**Do NOT** pre-fill `streets`, `landmarks`, `fullDescription`, `faqs`, or testimonials for thousands
of places — those are the **first-party, gated** fields the business supplies per activated area
(that's exactly what keeps pages unique and non-doorway).

---

## Deliverable 2 — The uniqueness engine + publish gate (GATE B in code)

Implement a pure, tested function, e.g. `src/lib/areas/uniquenessGate.ts`:

```ts
// Returns the count of distinct local-specificity signals present on a community,
// and whether it clears the publish bar.
export interface UniquenessResult { signals: number; cleared: boolean; missing: string[]; firstParty: boolean; }
export function evaluateCommunity(c: Community): UniquenessResult;
// cleared = signals >= 4 && firstParty === true
```

The 8 signals map to data presence (research/01 §2):
1. landmark/street/neighbourhood (`landmarks[]` / `streets[]` non-empty)
2. local condition note (a `localConditions` field — service-relevant)
3. local project reference (`localProjects[]`)
4. local code/permit note (`localCode`)
5. local community/event (`localCommunity`)
6. proximity/crew/supplier differentiator (`coverageNote`)
7. **named local testimonial** (`testimonials[]` with name + area)
8. community-specific FAQ (≥ 1 `faqs[]` entry flagged local)

- **Extend the `Community` interface additively** with these optional fields (don't break existing
  data). The existing `streets`/`landmarks`/`faqs` already cover several signals.
- **Wire the gate into rendering + the sitemap generator:** a community that fails the gate is
  **not** added to routes/sitemap (or is `noindex` + excluded) — it simply isn't a live page. Log a
  build-time summary: "X communities activated, Y skipped (reason: < 4 signals / no first-party)."
- **Write a unit test** proving a community with 3 signals is blocked and one with 4 + first-party is
  allowed. This is the existential protection from research/01 §0.

---

## Deliverable 3 — The scaled-uniqueness content engine (avoid find-and-replace)

So activated pages read as genuinely local, not template×N (research/01 §2 nuance):

- **Deterministic variation:** intro/framing selected by `hash(region+community+service)` so each page
  is stable across builds but neighbours differ. Never `Math.random()` (breaks determinism/caching).
- **Local condition + proof injection** keyed to community data fields.
- **Per-community FAQ assembly** from community fields (the existing `buildFAQs()` pattern, extended to
  surface the local signals as answers).
- **The find-and-replace test must pass:** removing the city name leaves locally specific content.

---

## Deliverable 4 — Schema upgrades (research/01 §4)

In `src/lib/seoGraph.ts` (shared — fix once):
- **`areaServed` → `GeoCircle`** (geoMidpoint lat/long + geoRadius meters) on `LocalBusiness` +
  `Service`, scoped to the community. Keep Place/address too.
- **`LocalBusiness` uses the most specific subtype** — make the subtype a `MASTER_REMIX` value
  (e.g. `BUSINESS_SCHEMA_TYPE: "Plumber"`).
- **NAP from `MASTER_REMIX`**, byte-identical to the footer; assert this in a test if feasible.
- **No `aggregateRating`/`review`** emitted on own business.
- Confirm `Service` (one per service), `FAQPage` (matches visible), `BreadcrumbList`, `WebPage`
  (`isPartOf` WebSite) all present and **rendered into static HTML** (coordinate with `prompts/04`).

---

## Deliverable 5 — Linking pyramid + sitemap at scale (research/01 §1, §6)

- Hub → all region hubs; region hub → its activated communities **and** ≤ 5 adjacent region hubs;
  community → its region (breadcrumb) + ≤ 5 nearest **activated** communities + relevant service pages.
- **No orphans:** every activated community reachable by a crawlable link.
- **`generate-sitemap.ts`:** include only **gate-cleared** communities; **segment** the sitemap if it
  exceeds ~50k URLs (by country/region); **honest `lastmod`** from each community's real
  content-change date (add an `updatedAt` field), not the deploy time.

---

## Deliverable 6 — Cannibalization map (research/01 §10)

Document and enforce one keyword → one URL:
| Tier | URL | Primary intent | Keyword |
|---|---|---|---|
| Service (brand-wide) | `/services/{service}` | "do you offer X" | `{service}` |
| Region/state hub | `/areas-we-serve/{region}` | "X in {state/province}" | `{service} {region}` |
| Community (matrix) | `/areas-we-serve/{region}/{community}` | "X in {city}" (transactional) | `{service} {city}` |

---

## Plan → Build → Verify

1. **Plan** (≤ 12 bullets): files touched, new geo dataset location, gate design, schema diffs,
   sitemap changes, tests. Get approval.
2. **Build** in bite-sized tasks; commit per green step; root-cause fixes in shared libs.
3. **Verify (paste evidence in the same turn):**
   - `tsc --noEmit` clean, `vite build` green.
   - Unit test: gate blocks 3-signal community, allows 4 + first-party.
   - Build-time summary prints activated vs skipped counts.
   - A sample activated community URL, **fetched with JS disabled**, contains H1 + body + all JSON-LD
     with `GeoCircle` `areaServed`.
   - GATE A + GATE B pass on the sample.
4. **Report:** what changed (file:line), geography coverage (13 CA + 50 US + DC), how the gate
   protects the domain, and exactly what first-party data the operator must supply per area (hand off
   to `prompts/03`).

---

## Never do
- Auto-publish a page for every place in the scaffold.
- Hardcode any city/trade/brand in a component (use data + `MASTER_REMIX`).
- Emit self-serving review schema.
- Fork the `Region`/`Community` type or migrate the framework.
- Claim done without `tsc` + `build` + the JS-disabled static check in the same turn.
