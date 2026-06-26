# Report 00 — Master Strategy: World-Class Areas + Maps + Blog SEO/AI-SEO

> **What this is.** The north-star strategy for turning this repo's **Areas We Serve + Maps + Blog** systems into a **drop-in, data-swappable template** that scales to **all of Canada and all 50 US states** and ranks at the top of **both** Google local/organic **and** AI search (AI Overviews/AI Mode, ChatGPT, Perplexity, Claude, Gemini, Copilot).
>
> **Status: RESEARCH + STRATEGY + PROMPTS ONLY — no application code changed.** Synthesizes the five dossiers in `../research/`.
> **Compiled 2026-06.** Read this first, then the playbooks (`01`, `02`), then the prompts.

---

## 1. The thesis in seven lines

1. **Two search games, won at once.** Classic Google local/organic ranking (relevance · proximity · prominence · schema · links · reviews) **and** AI-citation (GEO/AEO — being *quoted inside* an AI answer). They overlap only partially and the overlap is *shrinking* (AI Overview ↔ organic top-10 ≈ 38% and falling; standalone assistants looser). Engineer for both.
2. **The quality model is existential.** Google's **scaled-content-abuse** + **doorway** policies + the 2024–2025 core/spam updates mean weak thin pages drag the **whole domain** down. The template's #1 job is a **publish gate**, not a page generator.
3. **"Template for all of Canada + all states" ≠ "a page for every town."** Ship the complete geographic *scaffold* + the *uniqueness engine + publish gate*; per-business activation selects only the real, service-relevant areas and enriches each with first-party local signals.
4. **Static HTML or you're invisible to AI.** GPTBot / OAI-SearchBot / ChatGPT-User / ClaudeBot / PerplexityBot **do not run JavaScript** (confirmed, 500M+ fetches). Content + all JSON-LD must be in the **initial server HTML**. This is the single hardest blocker — and **the current template fails it** (`AreasSEOSchema.tsx` injects schema via `useEffect`).
5. **The map is UX/context, the schema is the signal.** An embedded Google Map helps *indirectly* (~7% organic-session value in a controlled test) but is not a keyword/ranking lever. Spend engineering on **static `Service`/`LocalBusiness` + `areaServed` + `hasMap` JSON-LD** and on a **performance-safe facade embed** — not on a heavy live map widget.
6. **GBP is the engine; the website is the answer layer.** For local + AI-local visibility, Google Business Profile (category, reviews/velocity, service areas, NAP) drives the pack and feeds AI's structured layer; the website's job is the **authoritative, answer-first, locally-specific content** AI quotes and Google ranks organically. Both, in sync, NAP-identical.
7. **Two content layers feed each other.** Transactional matrix/area pages (`{service} in {city}`) win commercial clicks + (via GBP) the local pack; an informational blog/FAQ cluster wins citations + links *down* into the matrix (the "intent bridge").

---

## 2. The unified scoring model (what to actually optimize)

The 2026 evidence collapses into one priority stack. Higher = more leverage for a service-area business chasing both Google and AI.

| Priority | Lever | Why (evidence) | Where it's built |
|---|---|---|---|
| **P0** | **Static render of content + JSON-LD** | Non-JS AI crawlers; Googlebot render-timing risk | `prompts/01` |
| **P0** | **Publish gate (≥4-of-8 + ≥1 first-party)** | Scaled-content/doorway policy; thin pages sink the domain | `prompts/02`, `03-QA-SHIP-GATES` |
| **P1** | **GBP optimization** (category, reviews velocity, service areas, NAP) | ~32% of pack weight; primary AI-local data layer | per-business runbook `prompts/07` |
| **P1** | **Answer-first + geo-FAQ + FAQPage schema** | 44.2% of LLM citations from first 30%; ~67% FAQ citation rate | `prompts/04`, `05` |
| **P1** | **`Service`/`LocalBusiness` + `areaServed` + `hasMap` + `sameAs`** | Entity disambiguation for AI; local context for Google | `prompts/03` |
| **P2** | **Information gain** (original local data, named facts, first-party photos/testimonials) | Up to ~40% generative-visibility lift (GEO paper) | `prompts/04`, `05` |
| **P2** | **Internal-linking pyramid + intent bridge** | Cheapest ranking lever; authority distribution | `prompts/04`, `05` |
| **P2** | **Core Web Vitals** (facade map, CWV budget at scale) | Ranking signal; map widget is the main cost | `prompts/06` |
| **P3** | **Freshness** (`dateModified` + visible "Updated {Month} 2026") | ~28% more AI citations; Google freshness signal | `prompts/04`, `05` |
| **P3** | **Off-site entity** (citations, brand mentions, directories) | Brand mentions ~3× more predictive than backlinks for AI | `prompts/08` |
| **P4** | **`llms.txt`** | ~zero AI-search lift (97% never read) | build only if trivially cheap |

**The rule of the stack:** never trade a P0/P1 for a lower-priority flourish. A beautiful live map that breaks static-render (P0) or fails CWV (P2) is a net loss.

---

## 3. The architecture in one diagram

```
                         ┌──────────────────────────────────────────────┐
                         │  GEO-DATA SCAFFOLD  (all CA provinces + US states)
                         │  flat Place[] : slug,name,region,lat,lng,pop,source
                         └───────────────┬──────────────────────────────┘
                                         │  per-business ACTIVATION (serve list)
                                         ▼
   ┌───────────────────────── PUBLISH GATE (build-time) ─────────────────────────┐
   │  ≥4 of 8 local-specificity signals  +  ≥1 first-party element                │
   │  PASS → generate + index     FAIL → skip / noindex (no thin page ever ships) │
   └───────────────┬──────────────────────────────────────────────┬─────────────┘
                   ▼                                                ▼
        AREAS-WE-SERVE MATRIX  (transactional)            LOCAL BLOG CLUSTER (informational)
        /areas-we-serve/{region}/{community}              /blog/{slug}
        • answer-first + geo-FAQ                          • cost guides, permits, neighborhood
        • static Service + areaServed + hasMap JSON-LD    • answer-first, info-gain, FAQ schema
        • facade map embed (CWV-safe)                     • BlogPosting + author Person + sameAs
        • NAP-identical, visible address (SAB)            │
                   ▲   │  intent bridge (links down)      │
                   └───┴──────────◄───────────────────────┘
                                         │
                                         ▼
                          STATIC HTML + sitemap.xml + robots.txt (AI bots allowed)
                                         │
                                         ▼
                 Google organic + Local Pack   ·   AI Overviews / ChatGPT / Perplexity / Claude
                                         ▲
                                         │  (sync, NAP-identical)
                          GOOGLE BUSINESS PROFILE  (category · reviews velocity · service areas)
```

---

## 4. The current template vs. the target (honest gap analysis)

From the code today (`src/components/areas/*`, `src/pages/CommunityPage.tsx`, `src/data/communities.ts`):

| Element | Today | Gap to world-class | Fix in |
|---|---|---|---|
| Schema rendering | `AreasSEOSchema.tsx` injects JSON-LD via `useEffect` (client-side) | **P0 failure** — invisible to non-JS AI crawlers; render-timing risk for Googlebot | `prompts/01` |
| Map embed | `GoogleMap.tsx` — Maps JS API when keyed, keyless iframe fallback. Loads eagerly; no facade | Heavy at scale; no static facade; placeholder risk as LCP | `prompts/03`, `06` |
| Geo data | `communities.ts` — generic placeholder scaffold (2 regions × 4 communities), Canada/USA-agnostic shape | Needs the **all-CA + all-US** scaffold + `source`/license fields + gate fields | `prompts/02` |
| `areaServed` | `serviceNode` emits `areaServed` Place w/ geo — good shape | Confirm `hasMap`, `sameAs`, `@id` (Wikidata), Place-ID embed; keep `geoRadius` in metres | `prompts/03` |
| Uniqueness gate | Not present (data has empty `streets`/`landmarks`/`faqs` arrays) | **P0** — build the 4-of-8 build-time gate + variation engine | `prompts/02` |
| Blog | `BlogHub`, `BlogPost`, `GuidesForLocation` exist | Wire the intent bridge + answer-first + info-gain + schema + freshness | `prompts/05` |
| Discovery | `scripts/generate-sitemap.ts` exists | Extend to matrix + gate-aware; robots.txt AI-bot allows | `prompts/01` |

**Conclusion:** the template's *shape* is right and trade-agnostic (data-driven, token-driven). The world-class gaps are all **P0/P1**: static render, the publish gate + national scaffold, the facade map, and the static geo/FAQ schema. The prompts in this package are sequenced to close exactly those.

---

## 5. The non-negotiables (carried into every prompt)

- **Gate before you generate** — ≥4 of 8 local-specificity signals + ≥1 first-party element, or the page is not built.
- **One keyword → one URL** — no cannibalization across service / location / matrix / blog tiers (blog = informational anchors; money/area pages = transactional anchors).
- **Static-render everything** — verify HTML + JSON-LD present with JS disabled.
- **NAP byte-identical everywhere** — page, footer, schema, GBP, citations (now an AI-trust signal too).
- **Show the address, don't hide it** (for SABs with a real one — 2025 "near-me" evidence).
- **Review *velocity* > review *count*** — never let review flow stall (a ~3-week pause measurably dropped rankings).
- **No self-serving `aggregateRating`/`review`** schema on your own business (Google's stated rule).
- **Honest `lastmod` + visible "Updated {Month} 2026"** tied to real changes; date-faking is penalized.
- **Information gain, not word count** — every page/article needs ≥1 element AI can't replicate (original local data/photo/quote).
- **Data-driven, trade-agnostic** — all copy flows from one remix/config source, never hardcoded.
- **The map is a facade** — never let a live map widget break static-render or CWV.
- **`geoRadius` is metres** — the most common geo-schema mistake.

---

## 6. How this package relates to the existing `docs/seo/` tree

This `maps-mastery-2026/` package is the **freshest (2026-06), Maps-integration-focused and national-scale-focused pass.** It re-verifies and extends the earlier `docs/seo/areas-maps/` and `docs/seo-templates/` work with newly-sourced 2026 evidence.

**Canonical-source rule (resolve any conflict):**
1. `maps-mastery-2026/research/*` — newest dated evidence (2026-06). **Wins on factual conflict** about Maps integration, AI-crawler behavior, geo-data licensing, and the publish gate.
2. `docs/seo/research-2026-field-update/` — prior 2026-06 field update.
3. `docs/seo/areas-maps/AREAS-MAPS-MASTERPLAN.md` + `docs/seo/BLOG-AISEO-MASTERPLAN.md` — core strategy.
4. Code is ground truth for *what exists today* (`docs/seo-templates/reference/current-implementation-map.md`).

The earlier package's build prompts remain valid; the prompts here are a tighter, Maps-first, national-scale-first re-sequencing. Where they overlap, prefer this package's evidence and gate definitions.

---

## 7. Reading + build order

**Understand (this report) → playbooks → prompts.**
1. `reports/00-MASTER-STRATEGY.md` ← you are here
2. `reports/01-MAPS-INTEGRATION-PLAYBOOK.md` (the Maps-specific spec)
3. `reports/02-NATIONAL-SCALE-TEMPLATE-SPEC.md` (all-CA + all-US scaffold)
4. `reports/03-QA-SHIP-GATES.md` (the pass/fail gates)
5. `prompts/00`–`08` (executable build, in order — **not yet**)

**Nothing in `src/` is changed by this package.** It is the specification a later build executes.
