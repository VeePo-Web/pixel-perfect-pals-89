# Prompt 01 — Static Render + Discovery (RELEASE BLOCKER)

> **Why this is first.** Confirmed across 500M+ fetches: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot **do not execute JavaScript.** Googlebot renders on a deferred wave with timing risk. Today this repo injects area-page JSON-LD via `useEffect` (`src/components/areas/AreasSEOSchema.tsx`) — **invisible to AI search and fragile for Google.** Nothing else in this package matters until content + JSON-LD ship in the initial HTML.
>
> **Satisfies:** Gate A (static render), Gate F (discovery). **Evidence:** `../research/02` §4, `../research/03` §3.

---

## Objective

Every Areas and Blog route serves **fully-formed static HTML** — `<h1>`, body copy, internal links, and **all JSON-LD** present in the raw response with JavaScript disabled. Plus a build-time sitemap and an AI-bot-friendly robots.txt.

## Tasks

1. **Add a prerender/SSG step to the Vite build.**
   - Brainstorm the approach first and present options + a recommendation. Candidates (justify choice, name 2 alternatives):
     - `vite-plugin-ssr` / `vike`, `vite-react-ssg`, a `puppeteer`/`@prerenderer` post-build crawl of known routes, or a custom `renderToString` script over the route list from the data layer.
   - Requirement: each `/areas-we-serve/{region}`, `/areas-we-serve/{region}/{community}`, `/blog`, `/blog/{slug}` route emits a static `.html` with content + schema inlined.
2. **Move all SEO-critical JSON-LD into prerendered output.** Refactor `AreasSEOSchema.tsx` so its graph (LocalBusiness, Service+areaServed, BreadcrumbList, FAQPage) is rendered into the server HTML `<head>` at build time — not appended by `useEffect` at runtime. Same for blog schema.
3. **robots.txt** — generate/confirm `public/robots.txt` allows the search/answer crawlers:
   ```
   User-agent: Googlebot
   Allow: /
   User-agent: Bingbot
   Allow: /
   User-agent: Google-Extended
   Allow: /
   User-agent: OAI-SearchBot
   Allow: /
   User-agent: ChatGPT-User
   Allow: /
   User-agent: PerplexityBot
   Allow: /
   User-agent: ClaudeBot
   Allow: /
   Sitemap: {SITE_URL}/sitemap.xml
   ```
   (Optionally block `GPTBot` training while keeping `OAI-SearchBot` — decide per business.)
4. **Build-time sitemap** — extend `scripts/generate-sitemap.ts` to enumerate all **gate-passing** Areas + Blog routes with honest `<lastmod>` from content dates. (The gate itself lands in prompt 02; for now wire the generator to read a `shouldIndex(slug)` predicate.)
5. **`llms.txt`** — optional, low priority (≈zero AI-search lift). Build only if trivially cheap; do not gate anything on it.

## Guardrails

- Do not change the visual output or routing UX — this is a rendering-pipeline change.
- Keep the keyless-iframe map fallback working (prompt 03 makes it a facade).
- No new heavy runtime deps shipped to the client.

## Verification (paste evidence)

- `npx tsc --noEmit` → 0 errors; `npx vite build` → success.
- For a sample `/areas-we-serve/{region}/{community}` **and** `/blog/{slug}`: fetch the built file / served route **with JS disabled** and confirm presence of: `<h1>`, body paragraph text, breadcrumb `<a href>`, and `<script type="application/ld+json">` containing `areaServed` (areas) / `BlogPosting` (blog).
- `robots.txt` reachable and lists the AI bots; `sitemap.xml` generated and references only indexable routes.

**Done = Gate A + Gate F pass on the sample URLs, with pasted view-source evidence.**
