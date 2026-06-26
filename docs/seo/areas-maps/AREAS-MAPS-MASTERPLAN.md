# Areas We Serve + Maps — AI-SEO Masterplan & Build Strategy

> **Goal:** make this template's `/areas-we-serve` + Google Maps engine rank #1 in **Google
> AND AI search** (ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini) for every
> business it is remixed into — across **all of Canada and all US states** — so the pages
> pull maximum traffic, build awareness, and convert.
>
> Compiled from a deep audit of the current codebase against 2026 Google ranking factors,
> the Local-Pack algorithm, and GEO/AEO (AI-citation) research. Pairs with the six findings
> briefs in [`research/`](./research/) and the six executable specs in [`prompts/`](./prompts/).
> Last updated: 2026-06.

---

## 0. EXECUTIVE DIAGNOSIS

The template's **Areas data architecture is already excellent** — easily top-1% of remix
templates. The 3-tier engine (`AreasHub.tsx` → `RegionPage.tsx` → `CommunityPage.tsx`), the
geo-data layer with coordinates/tiers/streets/landmarks/nearest-N (`src/data/communities.ts`),
the `@id`-linked JSON-LD graph (`src/lib/seoGraph.ts`), the deterministic content-variance
engine (`src/lib/contentVariance.ts`), the auto-generated sitemap (`scripts/generate-sitemap.ts`),
and the fully token-driven remix (`MASTER_REMIX`) are Victorious-SEO-grade.

But there is **one decisive flaw that currently caps traffic at near-zero, and four
high-severity gaps** that stop it from ranking once that flaw is fixed.

| # | Severity | Finding | Why it matters | Fix (prompt) |
|---|---|---|---|---|
| 1 | 🔴 **CRITICAL — RELEASE BLOCKER** | **Client-only SPA. No prerender/SSG.** Every page body + every JSON-LD block is injected at runtime (`AreasSEOSchema.tsx:35–78` does `document.head.appendChild` inside `useEffect`). `vite.config.ts`/`package.json` have no SSG. | AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) **do not execute JavaScript** — they fetch the HTML, see an empty `<div id="root">`, and leave. **Zero AI citations are possible.** Google renders JS slowly and unreliably at matrix scale, and `useEffect`-injected schema is the weakest signal it can receive. | **[Prompt 00](./prompts/00-static-render-and-discovery.md)** |
| 2 | 🟠 HIGH | **Discovery layer incomplete.** `public/robots.txt` names only Googlebot/Bingbot/Twitterbot/facebookexternalhit; the `Sitemap:` line is commented out; there is **no `llms.txt`**, and no AI bots are allow-listed. | Crawler access is the precondition for citation — a page that is not fetched cannot be cited. No `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`. No discoverable sitemap. | **[Prompt 00](./prompts/00-static-render-and-discovery.md)** |
| 3 | 🟠 HIGH | **Geo-data is a 4-community placeholder scaffold** (`src/data/communities.ts:59–162`, `{PLACEHOLDER}` tokens). No Canada/US dataset, no population/postal data, **no build-time uniqueness gate**. | To be a real all-Canada/all-states template it needs a populated, open-data-sourced geo-hierarchy **and** a penalty-safe gate — without the gate, scaling to thousands of cities is a doorway/scaled-content trigger, not an asset. | **[Prompt 01](./prompts/01-geo-data-template-canada-usa.md)** |
| 4 | 🟡 MEDIUM | **Maps is functional but not optimal.** `GoogleMap.tsx` loads the JS API (or a keyless iframe) directly inside the page (`CommunityPage.tsx:349`). No static-image **facade**, no static-map LCP poster. Schema lacks `GeoCircle` `areaServed`, `hasMap`, and an `Organization` + `sameAs` node. | Heavy map embeds are a Core-Web-Vitals liability (LCP/INP/CLS), and the most important machine-readable geo signals (`areaServed` radius, `hasMap`, entity `sameAs`) are missing — exactly what Google and AI engines read to bind your entity to a geography. | **[Prompt 02](./prompts/02-maps-integration-and-geo-schema.md)** |
| 5 | 🟡 MEDIUM | **Pages are template-strong but extraction-thin & freshness-blind.** Good streets/landmarks/tier copy, but no answer-first question-H2 structure, no in-city reviews, no visible "Last updated 2026", no refresh cadence. | AI citation + featured snippets + AI Overviews require answer-first 40–60-word blocks under question-format H2s, plus visible freshness (pages <30 days old earn ~3.2× more AI citations). | **[Prompt 03](./prompts/03-areas-page-content-schema-eeat.md)** |

**The order is non-negotiable.** Populating thousands of city pages (Prompt 01) before the
static-render fix (Prompt 00) produces thousands of pages no AI engine can read. **Prompt 00
first, always.** Bilingual Canada (Prompt 04) and the remix runbook (Prompt 05) layer on top.

---

## 1. WHAT WINS IN 2026 — RESEARCH SYNTHESIS

Full detail and citations in [`research/`](./research/). The decision-relevant synthesis:

### 1.1 The on-site Areas system (Research 01)
- **One URL per location, hub-and-spoke.** `/areas-we-serve/` (discovery hub) → `/areas-we-serve/{region}/{city}/` (the ranking target) → `/{neighborhood}/` (only after the city ranks). The template's 3 tiers already match this.
- **The doorway/scaled-content line is the make-or-break.** Google's spam policies explicitly name SAB city-page farms. The survival bar: **40–60% unique content per page**, differentiated by *personalization* (written by someone who knows the town) **and** *uniqueness* (differs page to page). Build pages **only** where you can compete — over-expansion is the #1 penalty trigger.
- **Local specificity, not word count, is the lever:** first-party pricing/response-time data, local conditions tied to the service, permit/code notes, named local projects, landmarks/neighborhoods, local testimonials, a local-only FAQ.

### 1.2 Maps / Local Pack (Research 02)
- Pack weighting ≈ **GBP ~32% · reviews ~20% · on-page ~15% · behavioral ~9% · links ~8% · citations ~6%.** Review **recency + velocity + text** is the strongest mover.
- **The GBP "service area" setting does NOT affect ranking** — it's visual. To rank in a city you have **no address in**, you cannot lean on proximity; you win on **prominence (reviews, links, citations) + relevance (on-site city content) + behavior.** The city page is the primary lever an SAB can pull for non-address cities.
- **Embedding a Google Map is *not* a ranking factor** (Google ended embed-to-address credit in June 2018). The map is UX/trust + conversion; the SEO value near it is the **content + `LocalBusiness` schema**, not the iframe.

### 1.3 AI search / GEO / AEO for "near me" (Research 03)
- Local AI answers are **source-borrowed**: ChatGPT runs Bing in real time and favors Yelp/BBB/Reddit/local media; Perplexity is Reddit-heavy (~47% of citations); Google AIO barely triggers on transactional local intent. **No major AI engine reads GBP directly.**
- **Crawlability is a hard gate:** AI crawlers see **raw HTML only** (except Google-Extended). Client-rendered SPA pages are invisible. → Prompt 00.
- **Extraction-first structure wins citations:** answer-first 40–60-word blocks, question-format H2s, named entities, lists/tables, FAQ schema; **freshness matters more than expected** (pages <30 days old earn ~3.2× more citations).

### 1.4 The unifying principle
**Every optimization serves both at once.** Answer-first + question-H2s + JSON-LD-in-HTML
wins Google snippets *and* AI citations *and* voice search. Static rendering serves Google
CWV *and* AI crawlability. The static-first map facade serves CWV *and* trust. One correct build.

---

## 2. CURRENT-STATE INVENTORY (what you already have — keep all of it)

These are genuine strengths. The plan *builds on* them, never replaces them.

| Asset | File(s) | Verdict |
|---|---|---|
| 3-tier Areas routing (Hub → Region → Community), lazy-loaded, 404 fallbacks | `src/App.tsx:14–40` | ✅ Correct hub-and-spoke shape. Keep. |
| Geo-data layer: `Region` + `Community` types with `coordinates{lat,lng}`, `tier`, `streets[]`, `landmarks[]`, `faqs`, `nearestCommunities[]`, `adjacentRegions[]` + helpers (`getCommunity`, `getRegion`, `getRegionCommunities`, `getNearestCommunities`, `getAll*Slugs`) | `src/data/communities.ts:1–199` | ✅ Excellent shape. Keep — populate + extend (Prompt 01). |
| `@id`-linked JSON-LD graph builders (LocalBusiness, Service+`areaServed`, FAQPage+`speakable`, Breadcrumb, AdministrativeArea, WebPage, ItemList) | `src/lib/seoGraph.ts` (`localBusinessNode():129`, `serviceNode():89`, `faqPageNode():171`, `breadcrumbNode():29`, `administrativeAreaNode():220`, `stringifyGraph():198`) | ✅ Best-in-class. Keep — emit into static HTML (Prompt 00) + extend (Prompt 02). |
| Sitewide `Organization` + `WebSite` anchor with fixed `@id` | `index.html:37–66` | ✅ Keep — add `sameAs` (Prompt 02). |
| Deterministic content-variance engine (FNV-1a hash → stable per-slug variant; token `fill()`) | `src/lib/contentVariance.ts:1–38` | ✅ Critical anti-doorway primitive. Keep + apply at scale (Prompt 01/03). |
| Per-community dynamic FAQ builder (uses real streets/landmarks/tier language) | `CommunityPage.tsx:50–91` | ✅ Strong uniqueness source. Keep + extend toward 4-of-8 (Prompt 01/03). |
| Maps component: dual-mode (JS API if `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`, else keyless iframe), `loading="async"`, `<noscript>` iframe fallback | `src/components/areas/GoogleMap.tsx:1–135`, `GoogleMapEmbed.tsx` | ✅ Solid base. Keep — upgrade to a static-first facade (Prompt 02). |
| Internal-linking: `NearbyAreasWidget` (`getNearestCommunities(slug,4)`), `CommunityCard`, adjacent-regions widget, blog↔areas bridge (`GuidesForLocation` via `hubRegistry.linkedRegions`) | `src/components/areas/NearbyAreasWidget.tsx`, `CommunityCard.tsx`, `RegionPage.tsx:308–346` | ✅ Rare, powerful internal-link pyramid. Keep. |
| Auto-generated, data-driven sitemap (regions + communities + hubs + posts, with `<image:image>`), runs on `predev`/`prebuild` | `scripts/generate-sitemap.ts:1–92` | ✅ Keep — wire discovery + segment at scale (Prompt 00/01). |
| Token-driven remix backbone (`MASTER_REMIX`: brand, URL, NAP/phone, service tokens, rating, `PARENT_BRAND_URL`) | `src/config/template/remix-variables.ts` | ✅ The remix backbone. Keep — extend with base-geo + radius (Prompt 01/05). |

> **Note on the parallel data file.** `src/master/seo/service-areas.ts` and the partner
> service-area knowledge docs under `src/master/knowledge/.../service-areas/` exist as a
> source-of-record layer; the **live** data the pages render is `src/data/communities.ts`.
> Prompt 01 treats `communities.ts` as the runtime target and the `master/` docs as provenance.

---

## 3. THE GAP-CLOSING PLAN (phased, in order)

Each phase = one executable prompt with an objective, the real files, the work, and a
**verification gate**. Do not advance until the gate is green. This honors the
engineering-methodology + geomatrix doctrine: brainstorm → plan → build static-first → verify.

### PHASE 0 — STATIC RENDER + DISCOVERY (the release blocker) 🔴
**Prompt:** [`00-static-render-and-discovery.md`](./prompts/00-static-render-and-discovery.md)
**Objective:** content + every JSON-LD block present in the served HTML for every area route
with JS disabled; every AI + search crawler can fetch; a machine-readable map exists.
**Gate:** fetch a built `/areas-we-serve/{region}/{community}` with JS off → H1 + body +
`<script type="application/ld+json">` present; `robots.txt` allow-lists AI bots; `Sitemap:`
+ `llms.txt` correct from `BRAND_URL`; `tsc`/`vite build`/Lighthouse green.

### PHASE 1 — GEO-DATA TEMPLATE: CANADA + ALL STATES 🟠
**Prompt:** [`01-geo-data-template-canada-usa.md`](./prompts/01-geo-data-template-canada-usa.md)
**Objective:** replace the placeholder scaffold with an open-data-sourced geo-hierarchy
covering every CA province/territory + every US state, with population/postal/centroid data,
nearest-N edges, and a **build-time 4-of-8 uniqueness gate** that skips/`noindex`es any page
that can't clear ≥4 local signals.
**Gate:** page-count math stated (`intended = services × eligible; published; skipped`);
gate enforced at build; no orphan pages; `noindex` pages excluded from the sitemap.

### PHASE 2 — MAPS INTEGRATION + GEO SCHEMA 🟡
**Prompt:** [`02-maps-integration-and-geo-schema.md`](./prompts/02-maps-integration-and-geo-schema.md)
**Objective:** static-first map facade (CWV-safe), static-map LCP poster, and `areaServed`
(`GeoCircle`/`City`) + `hasMap` + `Organization` + `sameAs` in the `@graph`.
**Gate:** map never costs initial load (facade); graph validates in Rich Results Test;
`areaServed` resolves to the page's geography; `hasMap`/`geo` match GBP coordinates.

### PHASE 3 — PAGE CONTENT, SCHEMA & E-E-A-T 🟡
**Prompt:** [`03-areas-page-content-schema-eeat.md`](./prompts/03-areas-page-content-schema-eeat.md)
**Objective:** answer-first question-H2 structure, in-city reviews + `Review`/`AggregateRating`,
visible "Updated {Month} 2026", a real refresh cadence, and resolved `speakable` selectors.
**Gate:** snippet/AI-extractable structure present; one `<h1>`; `.faq-question`/`.faq-answer`
exist in DOM; freshness visible; `dateModified` real (not cosmetic).

### PHASE 4 — BILINGUAL CANADA (EN/FR) 🟢
**Prompt:** [`04-bilingual-canada-hreflang.md`](./prompts/04-bilingual-canada-hreflang.md)
**Objective:** distinct `/fr/zones-desservies/...` URLs, **sitemap-method** hreflang
(`en-ca`/`fr-ca`/`x-default`, bidirectional + self-referencing), intent-translated copy, a
language switcher (no auto-redirect).
**Gate:** hreflang valid + reciprocal; canonical agrees with hreflang; QC nodes default FR.

### PHASE 5 — PER-BUSINESS REMIX RUNBOOK 🟢
**Prompt:** [`05-per-business-remix-runbook.md`](./prompts/05-per-business-remix-runbook.md)
**Objective:** the repeatable "new client = new config + local-proof sheet, **zero code
change**" runbook + the **doorway-page self-audit** ship gate.
**Gate:** a fresh remix builds green, passes the 5-question doorway self-audit, and is correct
and locally specific for the new business.

---

## 4. THE NON-NEGOTIABLE GUARDRAILS (apply in every phase)

1. **Static-first or it doesn't count.** Content + JSON-LD must be in the served HTML. A
   client-only area page is invisible to AI and weak to Google. (Prompt 00.)
2. **The 4-of-8 gate is a hard publish gate.** No page ships without ≥4 real local signals.
   `< 4` → skip or `noindex`. Volume is a liability, not an asset. (Prompt 01.)
3. **One URL per service × location intersection; one keyword → one URL.** No `?location=`
   params, ≤3 levels deep, city in the slug; blog owns informational, area page owns commercial.
4. **NAP identical everywhere** (page text, JSON-LD, GBP, citations). For SABs with no public
   address, use city + phone + `areaServed` — never a fake address.
5. **The map is UX, not a ranking trick.** Optimize the content + schema around it; keep the
   embed off the critical path (facade). (Prompt 02.)
6. **Freshness is a first-class AI signal.** Visible "Updated 2026" + real `dateModified` on a
   60–90-day refresh cadence; cosmetic bumps are discounted. (Prompt 03.)
7. **Verify before claiming done.** `npx tsc --noEmit` + `npx vite build` green, plus a
   JS-disabled fetch of a built area URL showing static HTML + JSON-LD. Evidence, not confidence.

---

## 5. WHAT "DONE" LOOKS LIKE

A remixed business, in any province/state, where:

- Every eligible city has a **statically rendered** `/areas-we-serve/{region}/{city}/` page
  carrying ≥4 local signals, an `@id`-linked graph with `areaServed`/`hasMap`/`sameAs`, a
  static-first map, in-city reviews, and a visible freshness stamp.
- AI crawlers are allow-listed; the sitemap is discoverable and segmented; `llms.txt` exists.
- The internal-link pyramid (hub → city → nearest-N sideways, breadcrumb up, blog bridge) has
  zero orphans.
- Spinning up the **next** business is a new `MASTER_REMIX` config + a base lat/lng + a service
  radius + a local-proof sheet — and the gate, sitemap, schema, and pages regenerate themselves.

That is the difference between a ranking geo-network and a manual action.
