# PROMPT 04 — AI-SEO Hardening (Static Render · Schema-in-HTML · Crawlers · Sitemaps)

> **Role:** World-class AI-search (GEO/AEO) + technical SEO engineer. You make this repo **legible to
> AI crawlers** (which don't run JS) and **maximally citation-worthy**, without changing the visible
> design or the remix contract.
>
> **Read first:** `research/03-ai-seo-geo-aeo-research.md`, `research/01 §4,§7`, `research/02 §8`,
> `reference/current-implementation-map.md` (§7 gaps), `reference/qa-ship-gates.md` (GATE A + GATE D).
> Obey `prompts/00`'s iron laws.

---

## The hard release blocker (do this first)

**AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) fetch raw HTML and do not execute
JavaScript.** The current site is a client-rendered SPA with some schema injected via `useEffect` →
**AI sees almost nothing**. Fix this before anything else.

### Deliverable 1 — Static render (prerender/SSG)
- Add a **build-time prerender step** that emits static HTML for every route (home, services,
  `/areas-we-serve/*` activated pages, `/blog/*` posts) with **content + all JSON-LD in the initial
  HTML**.
- **Preferred:** a Vite-native prerender (e.g. `vite-plugin-ssr`/`vike`, `@prerenderer`, or a custom
  `puppeteer`/`react-snap`-style post-build crawl of the route list). **Justify the choice and name
  two alternatives before adding a dependency** (per iron laws). Do **not** migrate to Next.js.
- **Move schema out of `useEffect`/`document.head` injection into the rendered output** so it's in the
  static HTML. `react-helmet-async` content must be captured during prerender.
- **Verify:** fetch a built Areas community URL and a built blog post URL **with JS disabled** — H1,
  body copy, and every `<script type="application/ld+json">` must be present.

---

### Deliverable 2 — Crawler access files (research/03 §2)
- **`public/robots.txt`:** add explicit `Allow` blocks for `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`,
  `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Amazonbot`, `cohere-ai`
  (keep Googlebot/Bingbot). **Uncomment/enable the `Sitemap:` line** with the real `BRAND_URL`.
- **`public/llms.txt`** (new): business summary → key pages → services → service areas → key facts.
  Generate it from `MASTER_REMIX` + activated data so it stays in sync. Note in a comment that
  adoption is still low (forward-looking insurance, not a substitute for static HTML).

---

### Deliverable 3 — Entity graph + schema correctness (research/03 §4–§5)
- **Sitewide `Organization`** in static `index.html` (or prerendered head) with **real NAP**, `logo`,
  `image`, and **`sameAs`** (GBP, Google Maps place, socials) — all from `MASTER_REMIX`. Linked by
  `@id` (`/#organization`) to every page's `WebPage`/`isPartOf`.
- **`WebSite`** node with `SearchAction`.
- **Areas:** `LocalBusiness`(specific subtype) + `Service`(per service) + `FAQPage` + `BreadcrumbList`
  + `WebPage`; `areaServed` as **GeoCircle/GeoShape** (coordinate with `prompts/01`).
- **Blog:** `BlogPosting` + `Person`(`sameAs`) + `FAQPage` + `BreadcrumbList`.
- **Rules:** schema matches visible content exactly; **no self-serving `aggregateRating`/`review`**;
  NAP byte-identical to footer.

---

### Deliverable 4 — On-page GEO mechanics (research/03 §3)
Provide shared, reusable rendering so authored content lands AI-friendly:
- **Answer-first block** component/pattern: the page's `keyAnswer` (Areas: the local cost/answer;
  Blog: the 40–60-word answer) rendered in the **first ~200 words** with a specific/quantitative
  statement.
- **Self-contained FAQ chunks** (~130–170 words), question-shaped headings, objective tone.
- **Clean semantic HTML:** `main`, `article`, `section`, `time[datetime]`, `figure/figcaption`,
  sequential headings — verify the templates already do this; fix where not.

---

### Deliverable 5 — Sitemaps + honest lastmod + crawl hygiene (research/01 §6)
- `generate-sitemap.ts`: include only **gate-cleared** Areas pages + all blog pillars/spokes; **honest
  `lastmod`** from real `updatedAt`/`modifiedAt`; **segment** if > ~50k URLs (by country/region/type);
  each file < 50k URLs / 50 MB; reference all segments from a sitemap index.
- **Prune protection:** ensure thin/non-activated pages are excluded or `noindex` (domain-drag guard).

---

### Deliverable 6 — Measurement hooks (research/03 §8)
- Document how to **server-log AI crawler hits** (user-agent filter) to confirm GPTBot/ClaudeBot/
  PerplexityBot are fetching the static HTML post-deploy.
- Note the GEO/rank tracking the operator should run (Search Console, GBP insights, a GEO citation
  tracker, local-grid tool).

---

## Plan → Build → Verify
1. **Plan** (≤ 12 bullets): prerender approach (+ 2 alternatives + justification), schema relocation,
   robots/llms/sitemap changes. Get approval.
2. **Build** bite-sized; commit per green step.
3. **Verify (evidence in same turn):** `tsc --noEmit` clean; `vite build` green; **JS-disabled fetch
   of a built Areas URL and a built blog URL shows content + all JSON-LD**; `robots.txt` lists AI
   allows + live Sitemap; `llms.txt` present and accurate; sitemap uses honest lastmod + segments if
   needed; GATE A + GATE D pass.
4. **Report:** what changed (file:line), the prerender mechanism, and the post-deploy crawler-log check.

---

## Never do
- Ship client-only rendering for indexable content (AI-invisible).
- Block an AI crawler you want citations from.
- Treat `llms.txt` as a substitute for static HTML + schema.
- Emit self-serving review schema or mismatched/NAP-inconsistent schema.
- Add a prerender dependency without justification + two alternatives.
- Claim done without `tsc` + `build` + the JS-disabled static check in the same turn.
