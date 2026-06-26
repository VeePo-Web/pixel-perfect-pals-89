# PROMPT 00 — Static Render + Discovery Layer (🔴 RELEASE BLOCKER)

> **Fire this prompt first. Nothing else moves the needle until its gate is green.**
> Paste this whole file to the build agent. It is self-contained and references the real files.

---

## ROLE

You are the **Programmatic Local SEO Matrix Architect** (`/geomatrix`) working on a React 18 +
Vite + TypeScript + Tailwind template. Your Law 4 is **"static-first or it doesn't count."**
Frontend only. No framework migration. Verify with evidence before any completion claim.

## ONE-SENTENCE OBJECTIVE

Make every `/areas-we-serve` route serve its **content + every JSON-LD block in the initial
HTML response** (so AI crawlers and Google's first pass can read it), and ship a complete
**discovery layer** (AI-crawler `robots.txt`, discoverable + segmented sitemap, `llms.txt`).

## WHY (the diagnosis you are fixing)

- The site is a **client-only SPA** (`vite.config.ts`/`package.json` have no SSG; `BrowserRouter`
  in `src/App.tsx:53`). AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) **do not
  execute JavaScript** — they fetch the HTML, see an empty `<div id="root">`, and leave. **Zero
  AI citations are possible** and Google renders JS slowly/unreliably at matrix scale.
- JSON-LD is injected at **runtime** via `useEffect` + `document.head.appendChild`
  (`src/components/areas/AreasSEOSchema.tsx:35–78`) — the weakest signal a crawler can receive.
- `public/robots.txt` names only Googlebot/Bingbot/Twitterbot/facebookexternalhit; the
  `Sitemap:` line is **commented out**; there is **no `llms.txt`**.

---

## THE WORK

### Part A — Static rendering (the core fix)

1. **Add a build-time prerender step** that renders every route the sitemap already knows to
   static HTML. Routes (from `src/App.tsx`): `/`, `/areas-we-serve`, `/areas-we-serve/:region`,
   `/areas-we-serve/:region/:community`, `/blog`, `/blog/:hub`, `/blog/:hub/:post`, plus static
   pages. Enumerate dynamic params from the data layer (`getAllRegionSlugs()`,
   `getAllCommunitySlugs()` in `src/data/communities.ts:193,197`; hub/post slugs from the blog
   data + `hubRegistry`) — the exact same sources `scripts/generate-sitemap.ts` reads.

2. **Pick the lightest correct approach** (brainstorm + recommend before coding; name two
   alternatives per geomatrix doctrine):
   - **Recommended: `vite-react-ssg`** — React-Router-native, route-aware, modern, maintained.
     It maps cleanly onto the existing `BrowserRouter` routes and serializes `react-helmet-async`
     `<head>` after render.
   - **Alternative A:** a Puppeteer post-build prerender (`@prerenderer/rollup-plugin` +
     `@prerenderer/renderer-puppeteer`, concurrency ≤2) crawling the route list.
   - **Alternative B:** migrate the area routes to a static generator. *Avoid* unless A/recommended
     fail. Avoid the abandoned `prerender-spa-plugin` (last updated 2019).

3. **Move JSON-LD out of `useEffect` into render output.** `AreasSEOSchema.tsx` currently does
   `document.createElement("script")` + `appendChild` inside `useEffect` (lines 35–78) — that
   runs *after* prerender's first paint and is unreliable to capture. Refactor so the
   `<script type="application/ld+json">` is **returned in JSX** (a tiny `<JsonLd graph={...}/>`
   component, or a `react-helmet-async` `<script>` child) so it lands in the static HTML
   deterministically. Do the same for any other `useEffect`-injected schema (blog, region, hub).
   - Keep `src/lib/seoGraph.ts` builders exactly as-is — only change **where the string is
     emitted**, not how it is built.

4. **Confirm `react-helmet-async` `<head>` is serialized** by the chosen prerenderer (title,
   meta, canonical). For `vite-react-ssg` this is built-in; for Puppeteer, serialize after
   `networkidle`.

5. **Hydration safety:** ensure the prerendered markup matches first client render (no
   hydration mismatch warnings). Data lookups are deterministic by slug, so this is achievable.

### Part B — Discovery layer

6. **`public/robots.txt`** — keep existing Googlebot/Bingbot rules; **add explicit `Allow`**
   blocks for the AI crawlers (decide Bytespider per brand):
   ```
   User-agent: GPTBot
   Allow: /
   User-agent: OAI-SearchBot
   Allow: /
   User-agent: ChatGPT-User
   Allow: /
   User-agent: PerplexityBot
   Allow: /
   User-agent: Perplexity-User
   Allow: /
   User-agent: ClaudeBot
   Allow: /
   User-agent: anthropic-ai
   Allow: /
   User-agent: Claude-Web
   Allow: /
   User-agent: Google-Extended
   Allow: /
   User-agent: Applebot-Extended
   Allow: /
   User-agent: Amazonbot
   Allow: /
   User-agent: cohere-ai
   Allow: /
   User-agent: CCBot
   Allow: /
   ```
7. **Uncomment + template the `Sitemap:` line** → `{BRAND_URL}/sitemap.xml`, generated from
   `MASTER_REMIX.BRAND_URL` (so a remix sets it once, never edits raw text). Have the
   robots.txt itself be **generated/token-filled** at build (mirror how `generate-sitemap.ts`
   reads `MASTER_REMIX`), so the remix never hand-edits it.
8. **`public/llms.txt`** — new file (AI's equivalent of a sitemap). Generate from `MASTER_REMIX`
   + the data layer:
   ```
   # {BRAND_NAME}
   {COVERAGE_BLURB / one-paragraph what-you-do + who-you-serve + where}

   ## Key Pages
   - Areas We Serve: {BRAND_URL}/areas-we-serve — every city/region we cover
   - {each top region}: {BRAND_URL}/areas-we-serve/{region} — …
   - Blog: {BRAND_URL}/blog — local guides, costs, permits, seasons

   ## Services
   - {each SUB_SERVICE.title}: {summary}

   ## Key Facts
   - Service area: {SERVICE_REGION_TAGLINE}
   - Phone: {PHONE}
   - Specialization: {SERVICE_CATEGORY}
   ```
   Keep it cheap — Research 03 shows `llms.txt` is low-yield, so generate it but spend zero
   manual effort; the static-render fix is where the value is.
9. **Sitemap at scale (forward-looking).** `generate-sitemap.ts` is fine now, but a single file
   caps at 50,000 URLs / 50MB. Add (or stub) a **sitemap index** + per-segment files
   (`sitemap-areas-{region}.xml.gz`, `sitemap-blog.xml.gz`, gzipped, accurate `<lastmod>`) so
   the jump to thousands of city pages in Prompt 01 is seamless. **Never list a `noindex` page
   in the sitemap.**

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **The JS-disabled test (the one that matters):** fetch a built
   `/areas-we-serve/{region}/{community}` URL (e.g. `curl` the file from `dist/`, or serve `dist/`
   and fetch with JS off) and confirm the **H1, body copy, AND `<script type="application/ld+json">`**
   are all present in the raw HTML. Repeat for `/areas-we-serve/{region}` and `/areas-we-serve`.
2. `npx tsc --noEmit` → 0 errors. `npx vite build` → succeeds. The prerender step runs in the
   build without error and emits one HTML file per route.
3. `robots.txt`, `Sitemap:` line, and `llms.txt` are present and **absolute-URL-correct** after
   a build with `BRAND_URL` set; no `noindex` URL appears in any sitemap.
4. Lighthouse mobile on a prerendered area page: **Perf ≥ 90, SEO = 100**, no hydration-mismatch
   console errors.

## GUARDRAILS

- Do **not** migrate the framework, convert Tailwind to CSS-in-JS, or add heavy deps without
  justifying + naming two alternatives.
- Do **not** change `seoGraph.ts` node-building logic — only relocate where the script tag is
  emitted.
- Keep `MASTER_REMIX` the single source of brand/URL truth — generated files read it, never
  hardcode.
- This prompt does **not** populate Canada/US data (that's Prompt 01) or touch the map facade
  (Prompt 02). Stay scoped to render + discovery.
