# PROMPT 05 — Per-Business Remix Runbook + Doorway Self-Audit Ship Gate

> The operational payoff. Once Prompts 00–03 (and optionally 04) are built into the template,
> **this** is what you run for every new business: change a config + a proof sheet, regenerate,
> verify, ship. **Zero code change per client.** Paste this whole file when remixing.

---

## ROLE

You are the **Local SEO Architect** running a remix. No code change — **data + config only**.
Your ship gate is the **Doorway-Page Self-Audit**: a batch that fails any of its 5 questions is
reworked, not shipped.

## ONE-SENTENCE OBJECTIVE

Stand up a fully-ranking `/areas-we-serve` + Maps geo-network for a new business by supplying its
`MASTER_REMIX` config + `GEO_CONFIG` (base, radius, services) + a `localProof` sheet, then
regenerating data, gate, sitemap, schema, maps, and pages — and proving it passes the doorway
self-audit before publish.

## THE RUNBOOK (do in order)

### 1. Brand + service tokens — `src/config/template/remix-variables.ts` (`MASTER_REMIX`)
Set: `BRAND_NAME`, `SERVICE` / `SERVICE_PLURAL` / `SERVICE_CATEGORY`, `SERVICE_REGION_TAGLINE`,
`PHONE` (E.164), `BRAND_URL`, `PARENT_BRAND_URL`, `RATING`, `SUB_SERVICES[]` (with `range` for
local pricing), `TRUST_*`, `RESPONSE_PROMISE`, `OG_IMAGE`, `AUTHORS`. These flow automatically
into pages, schema, nav, sitemap, robots, and `llms.txt` — never hardcode brand text in a page.

### 2. Geo config — `GEO_CONFIG` (added in Prompt 01)
Set: `base.{lat,lng}` (real dispatch point), `serviceRadiusKm` (**real operational radius**, not
aspirational), `minPopulation`, `nearestN`, `locales`, and the per-city `localProof` map.
`localProof` is the **uniqueness engine** — the more real testimonials/projects/conditions/permit
notes you supply, the more cities clear the 4-of-8 gate. Cities without enough proof are correctly
suppressed.

### 3. Regenerate the data + gate
Run the geo-data generator (`scripts/build-geo-data.ts`) for the business's province(s)/state(s).
It filters by `serviceRadiusKm` + `minPopulation`, runs the **4-of-8 gate**, computes nearest-N,
and prints the **page-count math**: `intended = services × eligible; published; skipped/noindex = N`.
Read it. If almost everything is skipped, the business needs more `localProof`, not a lower gate.

### 4. Regenerate discovery + schema + maps
- Sitemap (`generate-sitemap.ts`) emits only `indexable` cities, segmented, with `<lastmod>`.
- `robots.txt` + `llms.txt` token-fill from `BRAND_URL`/`MASTER_REMIX`.
- The `@graph` picks up the new NAP, `areaServed`/`GeoCircle` (from `GEO_CONFIG.base`+radius),
  `hasMap`, and `sameAs` (GBP/parent/social).
- Static map posters generate per published city.

### 5. Verify the build
`npx tsc --noEmit` + `npx vite build` green. **JS-disabled fetch** of a built
`/areas-we-serve/{region}/{city}/` shows H1 + body + JSON-LD. Lighthouse mobile Perf ≥ 90 / SEO 100.

### 6. The Doorway-Page Self-Audit (the ship gate — every batch)
A batch ships **only** if every archetype passes all five:
1. **Local-stranger test** — would a person *from that town* find the page specifically useful, or
   obviously mass-produced?
2. **Find-and-replace test** — remove the city name. Is anything left that's specific to that
   place? If no → **fail** (skip or enrich).
3. **Intent test** — does it satisfy someone ready to hire **this service here, now**?
4. **Schema test** — does `areaServed` resolve to this city; do the visible FAQs match `FAQPage`
   schema; do `hasMap`/`geo` match GBP?
5. **Crawl test** — does the built URL serve content **+ JSON-LD without JS**?

A batch that fails any question is reworked. This audit is the line between a ranking network and
a manual action.

### 7. Phased publish + measure
Publish in priority order (population × proximity × demand) in batches; watch indexation +
rankings per batch before releasing the next tier. Track: rankings per `{service}{city}`
(local-pack + organic), GBP Insights (views/directions/calls), and AI mentions
(ChatGPT/Perplexity/AIO) — expect citation lift within 60–90 days when structured correctly.
Keep the freshness queue (Prompt 03) running so `dateModified` stays real.

---

## WHAT A NEW CLIENT REQUIRES (the whole input)

| Input | Where it goes | Notes |
|---|---|---|
| Brand + service + NAP + URL | `MASTER_REMIX` | E.164 phone; `BRAND_URL` drives sitemap/robots/llms |
| Base lat/lng + real service radius | `GEO_CONFIG.base` / `serviceRadiusKm` | aspirational radius = doorway trap |
| Min population + nearestN + locales | `GEO_CONFIG` | gate + linking + bilingual |
| Local-proof sheet (per city: testimonial / project / condition / permit note) | `GEO_CONFIG.localProof` | the uniqueness engine; more proof = more eligible cities |
| GBP/parent/social URLs | `Organization.sameAs` (via `MASTER_REMIX`) | entity reinforcement |
| Author(s) + credentials | `AUTHORS` | E-E-A-T |

**No code is edited.** New client = new config + proof sheet + a regenerate. That is the template.

## GUARDRAILS

- Never lower the gate to publish more cities — supply more `localProof` instead, or suppress.
- Never fabricate local facts, reviews, or an address for a no-address city.
- Never ship a batch that fails the Doorway-Page Self-Audit.
- Never list a `noindex` city in the sitemap.
- Verify with `tsc` + `build` + a JS-disabled fetch before claiming a remix is live.
