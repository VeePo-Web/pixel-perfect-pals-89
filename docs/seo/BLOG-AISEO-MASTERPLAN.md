# Blog + Areas-We-Serve — AI-SEO Masterplan & Remix Prompt Library

> **Goal:** make this template's `/blog` and `/areas-we-serve` engines rank #1 in **Google AND AI search** (ChatGPT, Perplexity, Google AI Overviews, Claude, Gemini) for every business it is remixed into — so the pages pull maximum traffic, build awareness, and convert.
>
> Compiled from a deep audit of the current codebase against 2026 Google ranking factors and GEO/AEO (AI-citation) research. Last updated: 2026-06.

> ⚠️ **2026 CORRECTIONS — read `DEEPDIVE-5-2026-UPDATE.md` alongside this file.** Fresh mid-2026 research + a live code audit produced four corrections that **supersede** parts of this plan: **(1) `llms.txt` is downgraded** — Google won't read it and ~97% of llms.txt files get zero AI-bot traffic, so it is a cheap optional footnote, *not* a Phase-1 lever (amends Phase 1 / Prompt B); **(2) word count** is an *output of coverage*, never a target (padding is now demoted) — amends §B/§C; **(3) internal links** become *density-based* (~1 per 225 words), not flat minimums — amends Prompt I; **(4) answer length** splits into section 40–60w / passage ~150w / FAQ 80–150w. Deep Dive 5 also adds two dimensions this plan lacked: a **Scaled-Content-Abuse defense gate** (the remix's #1 risk) and the **zero-click conversion reframe**, plus a **current build-state scorecard** (the infrastructure is planned but not yet built). New prompts R–V live there.

---

## 0. EXECUTIVE DIAGNOSIS

The template's **SEO data architecture is already excellent** — easily top-1% of remix templates. The schema graph (`seoGraph.ts`), hub governance registry, content-variance engine, geo-binding bridges, and auto-generated sitemap are Victorious-SEO-grade.

But there is **one decisive flaw that currently caps traffic at near-zero, and four high-severity gaps** that stop it from ranking once that flaw is fixed.

| # | Severity | Finding | Why it matters | Fix |
|---|---|---|---|---|
| 1 | **🔴 CRITICAL — RELEASE BLOCKER** | **Client-only SPA. No prerender/SSG anywhere.** All content + every JSON-LD block is injected at runtime by React/Helmet/`useEffect`. | AI crawlers (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) **do not execute JavaScript**. They fetch the HTML, see an empty `<div id="root">`, and leave. **Zero AI citations are possible.** Google *can* render JS but does it slowly and unreliably at matrix scale — and the schema injected via `useEffect` (`AreasSEOSchema.tsx:35`, `BlogPostingSchema.tsx:31`) is the weakest signal it can receive. | **Prerender to static HTML at build time** (Phase 0). Content + JSON-LD must be in the served markup. |
| 2 | 🟠 HIGH | **`robots.txt` blocks AI crawlers by omission + sitemap line commented out.** Only Googlebot/Bingbot/Twitterbot/facebookexternalhit are named (`public/robots.txt`). | "Crawler access is the precondition for citation; a page that is not fetched cannot be cited." No `GPTBot`, `OAI-SearchBot`, `PerplexityBot`, `ClaudeBot`, `anthropic-ai`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `cohere-ai`. No discoverable sitemap. No `llms.txt`. | **Build the discovery layer** (Phase 1). |
| 3 | 🟠 HIGH | **Blog ships empty (`blogPosts = []`, `hubRegistry = []`).** Brilliant interface, zero content. | A blog with no posts ranks for nothing. The whole engine is dormant. The remix needs a *repeatable content production system*, not hand-written one-offs. | **The Content Engine** (Phase 3) + per-remix generation prompts. |
| 4 | 🟠 HIGH | **Article body renders as plain text** (`BlogPost.tsx:130` — `whitespace-pre-line`, `{post.content}` as a string). No real `<h2>/<h3>`, lists, tables, or per-section answer blocks. | AI extraction + featured snippets + AI Overviews require **semantic HTML structure**: question-format H2s, 40–60 word answer-first paragraphs, lists, tables. A wall of pre-wrapped text is extracted poorly. | **Article HTML & extraction upgrade** (Phase 2). |
| 5 | 🟡 MEDIUM | **No freshness/recency layer.** `dateModified` exists in schema but no visible "Last updated · Month 2026", no year signals in titles, no refresh pipeline. | Perplexity cites content <30 days old at an **82% rate**; visible "2026" signals lift citations **~30%**. Freshness is now a first-class AI ranking signal. | **Freshness + AI-citation layer** (Phase 4). |

**The order is non-negotiable.** Fixing #3 (writing 100 articles) before #1 (prerender) produces 100 articles no AI engine can read. **Phase 0 first, always.**

---

## 1. WHAT WINS IN 2026 — RESEARCH SYNTHESIS

### 1.1 Google (traditional ranking)
The 2026 ranking buckets, in order of leverage:
1. **Topical authority** — Google rewards *complete coverage of a subject*, not single keywords. A cluster with 10 adequate spokes beats 3 brilliant ones. (You already have the hub-governance model for this.)
2. **Document quality / helpfulness** — solves the query *completely, in one visit*, in the format the intent demands.
3. **Semantic completeness** — primary keyword surrounded by related entities and co-occurring phrases beats repetition.
4. **Intent match** — informational → blog; commercial/transactional → service/area page. Mismatched intent never ranks.
5. **Freshness + engagement** — `dateModified`, dwell time, scroll depth.
6. **Core Web Vitals** — LCP <2.5s, INP <200ms, CLS <0.1 (a ranking signal *and* an AI-Overview selection signal).

### 1.2 AI search / GEO / AEO (getting cited)
The mechanics are **different from Google and from each other**:
- **Crawlability is the precondition.** JS-rendered content is invisible. Static HTML + in-markup JSON-LD is mandatory.
- **Extraction-first structure wins citations:** answer-first prose (40–60 word self-contained answer opening each section), **question-format H2s** that mirror real queries, explicitly named entities, lists, tables, and Schema.org JSON-LD.
- **Freshness:** Perplexity cites <30-day content ~82% of the time; visible year signals ("2026") lift citations ~30%.
- **Consensus signal:** AI engines cite brands that appear consistently across *multiple independent sources* (Reddit, YouTube, G2, industry pubs, your own site) with consistent positioning. Off-site presence compounds on-site content.
- **E-E-A-T:** visible author bylines + credentials + `Person`/`author` schema + `sameAs` profiles. AI systems trust attributable content.
- **Platform notes:** ChatGPT leans Wikipedia-heavy; Perplexity leans Reddit + recency; Google AI Overviews increasingly select on semantic completeness + structured data *independent of the #10 organic ranking* (top-10's share of AIO citations fell from 76% to 38% in a year).
- **Net finding:** content optimized specifically for AI citation sees **3–4× higher mention rates** than conventional-SEO content.

### 1.3 The unifying principle
**Every optimization must serve both at once.** Answer-first + question-H2s + JSON-LD-in-HTML wins Google featured snippets *and* AI citations *and* voice search simultaneously. Static rendering serves Google CWV *and* AI crawlability. There is no trade-off — there is one correct build.

---

## 2. CURRENT-STATE INVENTORY (what you already have — keep all of it)

These are genuine strengths. The plan *builds on* them, never replaces them.

| Asset | File | Verdict |
|---|---|---|
| Rich `BlogPost` interface (faq w/ intent, tldr, outline, wordCount, hubGovernance, `about` geo-binding) | `src/lib/blogData.ts:12` | ✅ World-class. Keep. |
| Hub governance registry (clusters, cannibalization risk, refresh cadence, intent profile, linked regions/communities) | `src/lib/hubRegistry.ts:9` | ✅ Excellent topical-authority spine. Keep. |
| JSON-LD graph builders w/ stable `@id` entity linking | `src/lib/seoGraph.ts` | ✅ Best-in-class. Keep — but emit into HTML (Phase 0). |
| `speakable` FAQ selectors for voice/assistant | `seoGraph.ts:171` | ✅ Ahead of the curve. Keep. |
| Content-variance engine (anti-doorway deterministic phrasing) | `src/lib/contentVariance.ts` | ✅ Critical for area-page scale. Keep + apply (Phase 5). |
| 3-tier Areas engine (Hub → Region → Community) w/ LocalBusiness + Service + FAQ + Breadcrumb schema | `AreasSEOSchema.tsx`, `CommunityPage.tsx` | ✅ Strong. Keep — emit into HTML. |
| Bi-directional Areas ↔ Blog "intent bridge" | `hubRegistry.ts:28`, `BlogPost.tsx:135` | ✅ Rare and powerful internal-linking. Keep. |
| Auto-generated, data-driven sitemap (regions + communities + hubs + posts, with image entries) | `scripts/generate-sitemap.ts` | ✅ Keep — wire discovery (Phase 1). |
| Full token-driven remix system (`MASTER_REMIX`) | `src/config/template/remix-variables.ts` | ✅ Keep — the remix backbone. |
| Author/E-E-A-T surface (`AUTHORS`, `AuthorBio`, author schema) | `remix-variables.ts:203`, `BlogPost.tsx:166` | ✅ Keep — enforce per remix. |

---

## 3. THE GAP-CLOSING PLAN (phased, in order)

Each phase has an **objective**, **work**, and a **verification gate**. Do not advance until the gate is green. This honors the engineering-methodology persona: brainstorm → plan → TDD → verify.

### PHASE 0 — STATIC RENDERING (the release blocker) 🔴
**Objective:** content + every JSON-LD block present in the served HTML for every route, with JS disabled.

**Work:**
1. Add a build-time prerender step that crawls every route the sitemap knows (`/`, `/blog`, `/blog/:hub`, `/blog/:hub/:post`, `/areas-we-serve`, `/areas-we-serve/:region`, `/areas-we-serve/:region/:community`, plus static pages) and writes static HTML per route.
2. **Recommended approach:** `vite-react-ssg` (route-aware, React-Router-native, modern, maintained) OR a Puppeteer post-build prerender (`@prerenderer/rollup-plugin` + puppeteer renderer, concurrency ≤2). Avoid the abandoned `prerender-spa-plugin` (last updated 2019).
3. **Move JSON-LD out of `useEffect` into render output.** `AreasSEOSchema.tsx` and `BlogPostingSchema.tsx` currently `document.head.appendChild` inside `useEffect` — invisible to prerender's first paint unless the prerenderer waits for it. Safer: render the `<script type="application/ld+json">` directly in JSX (via Helmet `<script>` or a `<JsonLd>` component that returns the tag) so it is in the static HTML deterministically.
4. Ensure `react-helmet-async` meta is captured by the prerenderer (it is, if the prerenderer serializes `<head>` after render).

**Verification gate:**
- `curl`/fetch a built `/areas-we-serve/{region}/{community}` and a `/blog/{hub}/{post}` URL → the H1, body copy, AND `<script type="application/ld+json">` are present **with JS disabled**.
- `npx tsc --noEmit` green, `vite build` green.
- Lighthouse mobile: Perf ≥90, SEO 100.

> This is the geomatrix persona's **Law 4 (static-first or it doesn't count)**. Until this gate is green, nothing else moves the needle.

---

### PHASE 1 — DISCOVERY LAYER (crawler access) 🟠
**Objective:** every AI + search crawler can fetch, and a machine-readable map exists.

**Work:**
1. **`robots.txt`** — add explicit `Allow` for: `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `Perplexity-User`, `ClaudeBot`, `anthropic-ai`, `Claude-Web`, `Google-Extended`, `Applebot-Extended`, `Amazonbot`, `cohere-ai`, `Bytespider` (decide per brand), `CCBot`. Keep existing Googlebot/Bingbot.
2. **Uncomment + template the `Sitemap:` line** — point at `{BRAND_URL}/sitemap.xml`. Generate this from `MASTER_REMIX.BRAND_URL` so the remix sets it once.
3. **`public/llms.txt`** — new file (AI's equivalent of a sitemap): brand summary, key pages (blog hubs, area hubs, services), services list, key facts (founded, location, specialization). Template it with `{TOKENS}` from `MASTER_REMIX` + generate the page list from the data layer (mirror `generate-sitemap.ts`).
4. Make robots.txt + llms.txt **generated** (or token-filled) so a remix never edits raw text.

**Verification gate:** all three files present and absolute-URL-correct after a build with `BRAND_URL` set; AI agents un-blocked; sitemap reachable.

---

### PHASE 2 — ARTICLE HTML & EXTRACTION UPGRADE 🟠
**Objective:** article bodies render as extraction-optimized semantic HTML, not a text blob.

**Work:**
1. Replace the `whitespace-pre-line` string render (`BlogPost.tsx:130`) with a structured renderer. Two options:
   - **(a) MDX/markdown → HTML** via a build-time markdown compiler (content authored in markdown, compiled to real `<h2>/<h3>/<ul>/<table>`), OR
   - **(b) a typed `sections[]` block model** on `BlogPost` (each section: `{ h2, answer (40–60w), body, list?, table? }`) rendered to semantic HTML.
   - Recommendation: **(b)** — it *forces* the answer-first + question-H2 discipline structurally and stays static-fast (no runtime markdown). Keep `content` for legacy/long-form prose within sections.
2. **Answer-first pattern:** every section opens with a self-contained 40–60 word answer in a `<p>` directly under a **question-format `<h2>`**. This is the single highest-ROI structure for snippets + AI citations.
3. **Add `.faq-question` / `.faq-answer` classes** to the visible FAQ DOM so the existing `speakable` selectors (`seoGraph.ts:179`) actually resolve. (Right now the schema references selectors that may not exist in the rendered FAQ markup — verify and wire.)
4. **Real table-of-contents** from `outline[]` with anchor links to each `<h2 id>` (improves dwell + AIO structure). The current outline (`BlogPost.tsx:115`) is a non-linked `<ol>` — make the items jump links.
5. Ensure exactly one `<h1>`, logical h2→h3 nesting, `<time datetime>`, `<figure>/<figcaption>` for images, descriptive alt text.
6. Add `wordCount` to `BlogPosting` JSON-LD (the field exists on the interface but isn't emitted in `BlogPostingSchema.tsx`).

**Verification gate:** a sample post renders with real headings/lists/tables in static HTML; FAQ speakable selectors resolve; one h1; Rich Results Test passes for BlogPosting + FAQPage + BreadcrumbList.

---

### PHASE 3 — THE CONTENT ENGINE (per-remix production) 🟠
**Objective:** a repeatable system to fill the empty blog with a complete topical cluster per remix — not hand-written one-offs.

**Work (per remix, driven by the `/blog` skill + the prompts in §5):**
1. **Topical map** — for the remixed trade, define 2–4 pillar hubs + 8–15 spokes each, classified by intent (informational only on the blog; commercial/transactional → service/area pages). Populate `hubRegistry`.
2. **Content briefs** — one per article (target keyword, secondary keywords, intent, cluster, exact H2 question structure, required internal links, FAQ questions matching People-Also-Ask, schema, word-count + reading-grade targets).
3. **Generate articles** into `blogData.ts` (or markdown) against the briefs, each with: answer-first sections, FAQ (3+ Q with intent), `about` geo-binding where relevant, `outline`, `tldr`, `wordCount`, real author from `AUTHORS`, `publishedAt`/`modifiedAt`.
4. **Internal linking pyramid** — every spoke → its hub (first 200 words) + 2 adjacent spokes + 1 service/area page; hub → all spokes; the bi-directional Areas↔Blog bridge wired via `about` + `linkedRegions`/`linkedCommunities`.
5. **Reading grade 6–8**, Grade-6–8 sentences, named entities, statistics attributed.

**Verification gate:** cluster reaches ≥80% subtopic coverage; no orphan posts; no two posts share a primary keyword (cannibalization map clean); sitemap regenerates with all posts.

---

### PHASE 4 — FRESHNESS + AI-CITATION LAYER 🟡
**Objective:** harvest the recency + extraction signals that AI engines reward.

**Work:**
1. **Visible freshness:** render "Last updated: {Month YYYY}" prominently (you have `modifiedAt`; surface it as a styled line, not just a `· Updated` aside).
2. **Year signals:** allow `{YEAR}` token in titles/H2s where genuinely relevant ("…in 2026") — lifts AI citation ~30%. Don't fake it; use on evergreen-but-dated topics (pricing, codes, trends).
3. **Refresh pipeline:** honor `hubGovernance.refreshCadence`; a script that flags posts whose `modifiedAt` is older than their cadence, for a refresh pass (update a stat, expand a section, bump `dateModified`).
4. **Key-facts / quotable blocks:** add a "Key takeaways" list near the top of pillar posts (5–7 self-contained, quotable bullets) — prime AI-extraction real estate.
5. **`dateModified` discipline:** any content edit bumps it; never silently.

**Verification gate:** freshness visible + in schema; refresh-flagging script runs; pillar posts have quotable key-takeaway blocks.

---

### PHASE 5 — CONVERSION + AREAS UNIQUENESS + LOOP 🟡
**Objective:** traffic converts, and area pages survive the doorway-page classifier at scale.

**Work:**
1. **Apply `contentVariance.pickVariant`** to area-page intros + FAQ phrasing so a 50-community region doesn't ship 50 near-identical pages (the engine exists at `contentVariance.ts` — wire it into `CommunityPage.tsx`). Enforce the geomatrix **4-of-8 local-specificity gate** per community (landmark, local condition, project ref, code note, community body, proximity, local testimonial, local FAQ).
2. **One first-person, outcome-named CTA per page** (the `ConversionBar` is already wired in `BlogPost.tsx:183` — ensure copy is first-person + outcome, friction-reducer underneath, per the conversion personas).
3. **Close the loop:** every blog post that targets a geo links to its community/region page (`about`), and every community page surfaces "Guides for {Community}" (the rail exists via `GuidesForLocation`/`linkedCommunities` — ensure populated).
4. **Mid-post + end CTA** from `ctaConfig` (interface supports it; wire rendering).

**Verification gate:** area pages pass the 4-of-8 gate + doorway self-audit (find-and-replace test, local-stranger test); each post has exactly one primary CTA; the Areas↔Blog loop has no dead ends.

---

### PHASE 6 — VERIFICATION & MONITORING
**Objective:** prove it, then watch it.

- **Build gates:** `tsc --noEmit` + `vite build` green; prerendered HTML contains content + JSON-LD (JS off); Rich Results Test green for every schema type; Lighthouse mobile Perf ≥90 / SEO 100 / A11y ≥95.
- **Submit:** sitemap to Google Search Console + Bing Webmaster.
- **Monitor:** GSC queries ranking 11–30 → new spokes; People-Also-Ask drift → new FAQ; AI-citation tracking (does the brand appear in ChatGPT/Perplexity answers for target queries).

---

## 4. THE REMIX RUNBOOK (the order for every new business)

When you remix this template for a new trade/business, run **infrastructure once**, then **content per remix**:

```
INFRASTRUCTURE (do once, fixes the template itself — Phases 0–2,4):
  1. Phase 0 prerender            → Prompt A
  2. Phase 1 discovery layer      → Prompt B
  3. Phase 2 article HTML upgrade → Prompt C
  4. Phase 4 freshness layer      → Prompt F

PER REMIX (every new business — Phases 3,5):
  5. Set MASTER_REMIX + BRAND_URL + AUTHORS for the trade
  6. Topical map + hubs           → Prompt D  (or /blog skill)
  7. Generate the article cluster → Prompt E  (or /blog skill)
  8. Area-page uniqueness pass    → Prompt G  (or /areas + /geomatrix skills)
  9. Phase 6 verification         → Prompt H
```

Once Prompts A–C, F land in the template, **every future remix starts SEO-correct** — you only run D, E, G, H per business.

---

## 5. THE PROMPT LIBRARY

Each prompt is self-contained, references real files, and ends in a verification gate. Fire them in order. The per-remix prompts (D, E, G) can also be run through your existing `/blog`, `/areas`, `/geomatrix` skills — the prompt text below is the scoped brief to hand them.

---

### PROMPT A — Static Prerender (Phase 0, the release blocker)

```
You are a principal frontend/build engineer. This is a React 18 + Vite 5 + React Router 6 SPA
(see package.json). It currently renders 100% client-side: blog/area content and every JSON-LD
block are injected at runtime (BlogPostingSchema.tsx:31 and AreasSEOSchema.tsx:35 use
useEffect + document.head.appendChild). AI crawlers don't run JS, so they see an empty shell.

GOAL: prerender every route to static HTML at build time so content + all JSON-LD are in the
served markup with JavaScript disabled. Do NOT migrate frameworks (stay React+Vite). Do NOT
break the existing client app — prerender hydrates it.

BRAINSTORM FIRST (hard gate — present before coding):
- Evaluate vite-react-ssg vs a Puppeteer post-build prerender (@prerenderer/rollup-plugin +
  puppeteer renderer, concurrency ≤2). Recommend one with trade-offs. Justify any new dependency
  and name 2 alternatives (per the design-mode constraints).
- The route list must be DATA-DRIVEN, reused from the same source as scripts/generate-sitemap.ts
  (REGIONS, COMMUNITIES, hubRegistry, blogPosts) so prerendered routes never drift from the sitemap.
- Decide how JSON-LD reaches the static HTML: prefer moving the <script type="application/ld+json">
  from useEffect into rendered JSX (Helmet <script> or a <JsonLd> component returning the tag), so
  it is deterministic in first paint. Refactor BlogPostingSchema.tsx and AreasSEOSchema.tsx
  accordingly WITHOUT changing the graph shape from seoGraph.ts.

THEN, after approval, implement, and VERIFY with evidence in the same turn:
- Build the site. Fetch a built /areas-we-serve/{region}/{community} and /blog/{hub}/{post} file
  from disk (or curl the preview) and confirm the H1, body text, AND <script application/ld+json>
  are present with NO JS execution. Paste the proof.
- npx tsc --noEmit → 0 errors. vite build → success. Read full output.
- Confirm react-helmet-async per-route <title>/meta/canonical are serialized into each static file.
- Report what you could NOT verify here (e.g. live crawler fetch) and how the user tests it.
```

---

### PROMPT B — Discovery Layer: robots.txt + llms.txt + sitemap wiring (Phase 1)

```
You are an AI-SEO / technical-SEO architect. Make every search AND AI crawler able to fetch this
site, and give them a machine-readable map. Everything must be TOKEN-DRIVEN from
src/config/template/remix-variables.ts (MASTER_REMIX) so a remix sets values once.

1. public/robots.txt — currently only allows Googlebot/Bingbot/Twitterbot/facebookexternalhit and
   has the Sitemap line commented (read it first). Add explicit "User-agent: Allow: /" blocks for:
   GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, Perplexity-User, ClaudeBot, anthropic-ai,
   Claude-Web, Google-Extended, Applebot-Extended, Amazonbot, cohere-ai, CCBot. Keep existing bots.
   Uncomment + template the Sitemap: line to {BRAND_URL}/sitemap.xml.
   Make robots.txt GENERATED from MASTER_REMIX (extend scripts/generate-sitemap.ts or add a sibling
   script run in predev/prebuild) so BRAND_URL flows in automatically — never hand-edited per remix.

2. public/llms.txt — NEW. The AI equivalent of a sitemap. Generate it (same predev/prebuild hook)
   from MASTER_REMIX + the data layer:
     # {BRAND_NAME}
     {one-paragraph: what the business does, who it serves, the geography}
     ## Key Pages — blog hubs (hubRegistry), area hubs (REGIONS), /areas-we-serve, /blog, services
     ## Services — SUB_SERVICES
     ## Key Facts — Founded: {FOUNDATION_YEAR} · Location: {SERVICE_REGION_TAGLINE} · Specialization
   Use absolute URLs from BRAND_URL.

3. Keep scripts/generate-sitemap.ts as the single source of route truth; have robots/llms generation
   import from the same data so all three stay in sync.

VERIFY: run the build with MASTER_REMIX.BRAND_URL set to a test domain; confirm robots.txt names all
AI agents + a correct absolute Sitemap line, llms.txt lists real pages with absolute URLs, and
sitemap.xml is reachable. tsc + build green. Paste the generated files.
```

---

### PROMPT C — Article HTML & Extraction Upgrade (Phase 2)

```
You are a topical-authority content architect + frontend engineer. The blog post body currently
renders as a plain string (src/pages/BlogPost.tsx:130 — whitespace-pre-line {post.content}). AI
extraction, featured snippets, and AI Overviews need EXTRACTION-OPTIMIZED SEMANTIC HTML.

BRAINSTORM FIRST: choose between (a) markdown/MDX compiled at build time, or (b) a typed sections[]
block model on the BlogPost interface (src/lib/blogData.ts:12). Recommend (b) unless you find a
strong reason — it structurally FORCES the answer-first + question-H2 discipline and stays static-fast.

Design the sections model so each section is:
  { id, h2 (QUESTION format), answer (40–60 word self-contained paragraph), body?, list?, table? }
Render to: one <h1>, question-format <h2 id> per section, a 40–60w answer <p> directly under each h2,
real <ul>/<ol> and <table> where used, <figure>/<figcaption> for images, <time datetime>.

ALSO in this pass:
- Make the on-page outline/TOC (BlogPost.tsx:115) anchor-link to each <h2 id>.
- Add .faq-question / .faq-answer classes to the visible FAQ DOM so the speakable cssSelectors in
  seoGraph.ts:179 actually resolve. Verify the FAQ block exists on the post page (add one if missing,
  reading post.faq).
- Emit wordCount into BlogPosting JSON-LD (field exists on interface, not emitted in
  BlogPostingSchema.tsx — add it).
- Keep everything on design tokens (bone/graphite/copper/forest/seam etc.) — no raw hex.
- Update the two scaffold-friendly selectors/exports so a remix author sees the new shape.

VERIFY: add ONE example post to blogData.ts using the new model; build; confirm the static HTML
contains real h1/h2/ul/table + the JSON-LD (BlogPosting w/ wordCount + FAQPage + BreadcrumbList);
speakable selectors resolve; Rich Results Test passes. tsc + build green. Paste the rendered HTML
snippet as proof. Then REMOVE the example post (blog ships empty) or mark it clearly as a sample.
```

---

### PROMPT D — Topical Map + Hub Cluster (Phase 3, PER REMIX)

```
Act as the Topical Authority Content Architect (/blog skill). The site has been remixed for:
  TRADE/BUSINESS: {describe — e.g. "Cochrane drywall & taping"}
  GEOGRAPHY: {from src/data/communities.ts — REGIONS + COMMUNITIES}
  SERVICES: {MASTER_REMIX.SUB_SERVICES}

Build the COMPLETE topical map BEFORE any article is written, and populate src/lib/hubRegistry.ts.

1. Define 2–4 PILLAR HUBS for this trade (the subjects the business must own). For each hub:
   id, name, slug, primaryTopic, primaryKeywordPattern, secondaryTopics, intentProfile
   (INFORMATIONAL only on the blog — commercial/transactional belong on service/area pages),
   linkedRegions + linkedCommunities (wire the bi-directional Areas↔Blog bridge), relatedHubs.
2. For each hub, list 8–15 SPOKE topics, each with: working title, target long-tail keyword,
   the ONE question H2 it answers first, intent, and which hub/spokes/area-pages it links to.
3. Run the cannibalization map: every primary keyword belongs to exactly ONE URL across blog +
   service + area tiers. Flag and resolve overlaps.
4. Output: the populated hubRegistry array + a content-brief table for all spokes (ready for Prompt E).

Do NOT write article bodies yet. tsc + build green; sitemap regenerates with the new hubs.
```

---

### PROMPT E — Generate the Article Cluster (Phase 3, PER REMIX)

```
Act as the Topical Authority Content Architect (/blog skill). Using the hubRegistry + content briefs
from Prompt D, generate the article cluster into src/lib/blogData.ts using the NEW sections model
(from Prompt C). Generate in cluster-building order: pillar first, then its spokes, hub by hub.

Each article MUST have:
- metaTitle (50–60 chars, primary keyword near front) + metaDescription (150–160, includes keyword + CTA)
- One <h1> = title; question-format H2 sections, each opening with a 40–60 WORD self-contained answer
- Reading grade 6–8 (short sentences, active voice, named entities, attributed stats)
- A "Key takeaways" block (5–7 quotable, self-contained bullets) on PILLAR posts (AI-extraction bait)
- faq[] — 3+ questions matching real People-Also-Ask, each tagged intent
- outline[] (the H2 list, for the TOC) + tldr (1–2 sentences) + wordCount
- about{ regionSlug | communitySlug } where the topic is geo-relevant (closes the Areas↔Blog loop)
- A real author from MASTER_REMIX.AUTHORS (never a fake byline — if AUTHORS is empty, STOP and tell
  the user to add one first)
- publishedAt + modifiedAt (today); hubGovernance (hubId, postType, internalLinks, refreshCadence,
  cannibalizationRisk)
- Internal links: spoke → hub (in first 200 words) + 2 adjacent spokes + 1 service/area page
- Where genuinely evergreen-but-dated, include a "in 2026" year signal in a title or H2

NO orphan posts, NO keyword cannibalization, NO commercial-intent posts (those are service/area pages).
After generation: sitemap regenerates with all posts; tsc + build green; spot-check that the static
HTML of 2 posts contains real headings + JSON-LD. Paste proof.
```

---

### PROMPT F — Freshness + AI-Citation Layer (Phase 4)

```
You are an AI-SEO architect. Add the recency/extraction signals AI engines reward, template-wide.

1. Render a prominent "Last updated: {Month YYYY}" line on blog posts + area pages (you have
   modifiedAt; surface it as a styled element, not just the small "· Updated" aside in BlogPost.tsx:98).
2. Support an optional {YEAR} token in post titles/H2s for genuinely dated-evergreen topics (lifts AI
   citation ~30%) — never fabricate currency; only where the content is actually maintained.
3. Add scripts/flag-stale-content.ts (run manually or in CI) that lists posts whose modifiedAt is older
   than their hubGovernance.refreshCadence, so the user knows what to refresh. Print a table.
4. Ensure any content edit path bumps modifiedAt; document the rule in blogData.ts header.
5. Confirm the "Key takeaways" quotable block (from Prompt C/E) renders near the top of pillar posts.

VERIFY: freshness visible on a sample post + present in BlogPosting.dateModified; stale-flag script runs
and prints; tsc + build green.
```

---

### PROMPT G — Area-Page Uniqueness + Doorway Defense (Phase 5, PER REMIX)

```
Act as the Programmatic Local SEO Matrix Architect (/geomatrix + /areas skills). The Areas engine
(CommunityPage.tsx, AreasSEOSchema.tsx, src/data/communities.ts) is strong but must survive Google's
doorway/thin-content classifier at scale and stay genuinely useful per community.

1. Wire src/lib/contentVariance.ts pickVariant() into the community-page intro + FAQ phrasing so a
   region with N communities ships N genuinely-varied pages (not find-and-replace clones). Build a
   variant pool per section.
2. Enforce the 4-of-8 LOCAL-SPECIFICITY GATE per community (from communities.ts data): local landmark/
   neighbourhood, local condition note, local project reference, local code/permit note, community body/
   event, proximity/crew differentiator, named local testimonial, community-specific FAQ. A community
   that can't assemble ≥4 gets noindex or is skipped — print which pass/skip.
3. Confirm LocalBusiness + Service(areaServed) + FAQPage + BreadcrumbList schema renders in STATIC HTML
   (post-Phase-0) for each community — fetch one with JS off and confirm.
4. Run the DOORWAY SELF-AUDIT on a sample: local-stranger test, find-and-replace test (remove the town
   name — is anything left?), intent test, schema test, crawl test. Report pass/fail per archetype.
5. Ensure the "Guides for {Community}" rail (linkedCommunities) + "Serving {Community}" post bridge are
   populated so Areas↔Blog has no dead ends.

VERIFY: 4-of-8 gate report printed; variance applied; static schema confirmed; doorway audit passed;
tsc + build green.
```

---

### PROMPT H — Final Verification Gate (Phase 6)

```
You are the verification gate. Produce EVIDENCE, not claims. Run and paste output for each:
1. npx tsc --noEmit → 0 errors.
2. vite build → success (read full output).
3. Static-render proof: fetch built HTML for (a) a blog post, (b) a community page, (c) the blog hub —
   confirm H1 + body + <script application/ld+json> present with JS disabled.
4. Schema: run each page's JSON-LD through Google Rich Results Test (or validate structure) — BlogPosting,
   FAQPage, BreadcrumbList, LocalBusiness, Service all valid.
5. robots.txt names all AI crawlers + correct Sitemap line; llms.txt lists real absolute URLs; sitemap.xml
   includes all hubs + posts + regions + communities.
6. Lighthouse mobile (throttled): Perf ≥90, SEO 100, A11y ≥95, CLS <0.1, LCP <2.5s — paste scores.
7. Cannibalization: no two URLs share a primary keyword. No orphan posts (every post linked from ≥1 page).
8. Conversion: each post + area page has exactly ONE first-person outcome CTA with a friction-reducer.

State clearly what could NOT be verified in this environment (live crawler fetch, real AI citations) and
the exact steps for the user to verify those (GSC, Bing Webmaster, AI-citation tracking, manual ChatGPT/
Perplexity queries for target keywords).
```

---

## 6. THE NORTH-STAR CHECKLIST (per remix, before "done")

- [ ] **Phase 0:** content + JSON-LD in static HTML (JS off). *Without this, nothing else matters.*
- [ ] **Phase 1:** robots.txt allows all AI crawlers; sitemap + llms.txt live and absolute.
- [ ] **Phase 2:** articles render semantic HTML — question H2s, answer-first 40–60w, lists, tables, one h1.
- [ ] **Phase 3:** ≥2 pillar hubs, 8–15 spokes each, ≥80% subtopic coverage, no orphans, no cannibalization.
- [ ] **Phase 4:** visible "Last updated 2026", key-takeaway blocks, stale-flagging script.
- [ ] **Phase 5:** area pages pass 4-of-8 gate + doorway audit; variance applied; one CTA each; Areas↔Blog loop closed.
- [ ] **Phase 6:** tsc + build green; Rich Results green; Lighthouse mobile Perf ≥90/SEO 100; sitemap submitted.
- [ ] **E-E-A-T:** real authors in `AUTHORS`, visible bylines, `Person` schema, `sameAs` profiles set.
- [ ] **Reading grade 6–8** on every article; entities named; stats attributed.

> **The one rule that decides everything:** if an AI crawler with JavaScript disabled cannot read the article body and its JSON-LD in the first HTTP response, the page cannot be cited, cannot drive AI-search awareness, and cannot convert that traffic. **Phase 0 is the whole ballgame. Do it first.**

---
---

# ADDENDUM — DEEP DIVE 2: THE ON-PAGE ANATOMY OF A #1 ARTICLE

> Second research pass. Where Part 1 covered *strategy and architecture*, this covers the **exact on-page markup and structure** the highest-traffic, most-cited pages actually use — "the HTML that ranks." Plus a critical 2026 schema correction.

## A. 2026 SCHEMA CORRECTIONS (supersede earlier notes)

Two rich-result types are **dead** as of 2026 — this changes tactics, not whether you use the schema:

| Schema | Status 2026 | What it means for this template |
|---|---|---|
| **FAQPage** | **Rich result RETIRED (May 7 2026).** Markup still validates, harmless, **but produces zero SERP rich-result lift.** | **Keep emitting it** (`faqPageNode`, `seoGraph.ts:171`) — it still feeds **AI citation + voice/`speakable` + on-page Q&A extraction**, which is where the value moved. Just stop *expecting* the FAQ dropdown in Google results. Don't build FAQ blocks *for* the rich result; build them for AI answers and People-Also-Ask coverage. |
| **HowTo** | **Deprecated (Sept 2023).** No desktop/mobile rich result. | Don't invest in `HowTo` schema for SERP gain. Author process content as **ordered HTML lists** (which win *list* featured snippets) instead. |

**The schema stack that still earns rich results + AI trust in 2026** (pages with complete structured data see **3.1× higher AI citation frequency**):

```
Per blog post  →  BlogPosting + Person (author) + BreadcrumbList   [+ FAQPage for AI/voice only]
Per area page  →  LocalBusiness + Service(areaServed) + BreadcrumbList   [+ FAQPage for AI/voice]
Sitewide       →  Organization + WebSite (already in index.html)
```

Your `seoGraph.ts` already builds all of these with stable `@id` entity-linking — **the only fix needed is emitting them into static HTML (Phase 0) and adding `wordCount` + `Person.sameAs` to `BlogPosting`.**

## B. THE DATA-BACKED SPEC (what #1 pages measurably have)

From analysis of top-ranking + AI-cited pages (2026):

| Dimension | The winning number | Current template | Action |
|---|---|---|---|
| **Word count (competitive #1s)** | **2,100–2,800 words** (sweet spot 2,250–2,500). Comprehensiveness proxy, not a literal factor. | n/a (empty) | Pillar 2,200–3,000w; spoke 1,200–1,800w. Bake into briefs (Prompt E). |
| **Heading depth** | **h2 + h3 + h4** (complex structure correlates with high traffic) | plain text blob (`BlogPost.tsx:130`) | Sections model with nested h3/h4 (Prompt C). |
| **Internal links** | **≥15 contextual links/post**; topic-cluster sites with ≥8/pillar + ≥4/spoke get **+53% organic traffic** | bridge exists, not enforced | Enforce min counts in briefs + a linter (Prompt I). |
| **Outbound citations** | **91% of #1 AI-assisted posts cite ≥5 hyperlinked external stats; avg 8.3/post**, each linked to the source | **none — not in interface** | **NEW: add `citations[]` to BlogPost + render as linked references.** (Prompt I) This is a top E-E-A-T + AI-trust signal currently entirely missing. |
| **Headline length** | **10–13 words** drives ~2× traffic vs <7 words | n/a | Brief rule. |
| **Featured-snippet blocks** | answer-first 40–60w paragraph; 5–10 item ordered list; real `<table>` 3–4 cols × 5–10 rows | none | Section model supports all three (Prompt C). |
| **Reading grade** | 6–8 | n/a | Brief rule. |

## C. THE GOLD-STANDARD ARTICLE BLUEPRINT (literal structure)

This is the exact rendered HTML skeleton every generated article should compile to. It simultaneously wins Google featured snippets, Google AI Overviews, ChatGPT/Perplexity citations, and voice — because the same structure serves all of them.

```html
<article>
  <!-- ENTITY: one h1, primary keyword, 10–13 words where natural -->
  <h1>{Question or outcome-framed title with primary keyword}</h1>

  <!-- FRESHNESS: visible, above the fold (AI + trust signal) -->
  <p class="byline">By <a href="/about/{author}">{Author}, {Role}</a> ·
     Updated <time datetime="2026-06-01">June 2026</time> · {readingTime} min read</p>

  <!-- TL;DR: 1–2 sentence self-contained summary (AI grabs this) -->
  <p class="tldr">{40–60 word answer to the page's core question}</p>

  <!-- KEY TAKEAWAYS: 5–7 quotable, self-contained bullets (prime AI-extraction real estate) -->
  <section aria-label="Key takeaways">
    <h2>Key takeaways</h2>
    <ul>
      <li>{self-contained fact 1, quotable out of context}</li>
      ... 5–7 total ...
    </ul>
  </section>

  <!-- TABLE OF CONTENTS: anchor links to each h2 id (dwell + structure) -->
  <nav aria-label="On this page"><ol>
    <li><a href="#s1">{Question 1}</a></li> ...
  </nav></ol>

  <!-- BODY: each section = QUESTION h2 + 40–60w ANSWER-FIRST paragraph + expansion -->
  <section>
    <h2 id="s1">{H2 phrased as the exact user query}</h2>
    <p>{40–60 word self-contained DIRECT ANSWER — no preamble. Wins paragraph snippet + AI cite.}</p>
    <p>{expansion, context, with an outbound link to a <a href="{source}">named authoritative stat</a>}</p>
    <h3>{sub-point}</h3> ...
  </section>

  <!-- LIST SNIPPET target: process/steps as a REAL ordered list, one sentence per item -->
  <section>
    <h2 id="s2">How to {process}?</h2>
    <p>{40–60w answer}</p>
    <ol><li>{one-sentence step}</li> ... 5–10 items ...</ol>
  </section>

  <!-- TABLE SNIPPET target: comparison/pricing as REAL table markup -->
  <section>
    <h2 id="s3">{X} vs {Y} / {pricing}</h2>
    <table><thead><tr><th>...</th></tr></thead>
      <tbody><tr><td>...</td></tr> ... 5–10 rows, 3–4 cols ...</tbody></table>
  </section>

  <!-- FAQ: visible Q&A with .faq-question/.faq-answer (speakable + AI; NOT for rich result anymore) -->
  <section>
    <h2>Frequently asked questions</h2>
    <div><h3 class="faq-question">{PAA question}</h3>
         <p class="faq-answer">{40–60w answer}</p></div> ... 3+ ...
  </section>

  <!-- GEO BRIDGE: link to the community/region page (closes Areas↔Blog loop) -->
  <!-- AUTHOR BIO: visible E-E-A-T block (exists: AuthorBio.tsx) -->
  <!-- REFERENCES: the outbound citations rendered as a linked source list -->
  <section><h2>Sources</h2><ol><li><a href="{url}">{Source, Year}</a></li> ...</ol></section>

  <!-- ONE first-person, outcome-named CTA (ConversionBar, exists) -->
</article>

<!-- IN STATIC HTML (Phase 0): -->
<script type="application/ld+json"> { BlogPosting + Person + BreadcrumbList + FAQPage @graph } </script>
```

Every block above maps to a field that **already exists or needs one small addition** to your `BlogPost` interface — this blueprint is the rendering target for Prompt C and the authoring target for Prompt E.

## D. THE LOCAL-SERVICE BLOG PLAYBOOK (this template's money pattern)

Because the template is local-service + Areas-We-Serve, the blog's job is to feed the **local entity** that Google Maps, organic, AND AI Overviews/ChatGPT all draw from. Local SEO drives **60–70% of contractor leads**; **28% of local searches end in a purchase**.

1. **Service × City web.** One service page per service, one area page per city (you have this via SUB_SERVICES × COMMUNITIES). The **blog supplies the informational layer** that links *into* both — "how much does {service} cost in {city}", "{service} permit rules in {region}", "signs you need {service}". These are the long-tail, high-intent informational queries that rank fast and hand the reader to the money page.
2. **Seasonal cadence.** Home services are seasonal — publish/refresh seasonal posts **30–45 days before demand peaks** (freshness signal + captures rising search before competitors). Wire this into the `refreshCadence` + a seasonal tag.
3. **Entity consistency (the consensus signal).** AI engines recommend the brand that appears consistently across GBP, the site, reviews, and citations with **identical NAP**. The blog reinforces the entity by always linking author → about, post → area, and naming the brand + geography consistently. (GBP itself is off-site work, but note it in the remix runbook: **GBP ≈ 32% of Map-Pack weight** — the single highest off-site lever.)
4. **The loop:** informational blog post → geo bridge → area/service page → CTA. Every post must complete it.

## E. ADDITIONAL PROMPTS (append to §5)

### PROMPT I — Outbound Citations + Internal-Link Density + Snippet Blocks (template upgrade)

```
You are a topical-authority content architect + frontend engineer. Add the three measured signals that
separate #1 / AI-cited posts from the rest, as first-class template features.

1. OUTBOUND CITATIONS (currently entirely missing — highest-value gap in this pass):
   - Add `citations?: Array<{ label: string; url: string; publisher?: string; year?: number }>` to the
     BlogPost interface (src/lib/blogData.ts:12).
   - Render a "Sources" <section> with an ordered list of linked references at the post foot.
   - Support inline citation: allow body/section text to reference a citation so authors hyperlink stats
     to their original source (target: 5–8 externally-sourced, hyperlinked stats per pillar post — 91% of
     #1 AI-assisted posts do this; avg 8.3/post). Add rel="noopener" external links.
   - Add `citation` to BlogPosting JSON-LD (schema.org/citation) listing the source URLs.

2. INTERNAL-LINK DENSITY: add scripts/lint-internal-links.ts that fails if a pillar post has <8 internal
   links or a spoke has <4 (and flags posts with <15 total contextual links). Print a per-post table.
   Topic-cluster sites hitting these minimums see +53% organic traffic.

3. SNIPPET BLOCKS: ensure the sections model (Prompt C) supports and renders, as REAL HTML:
   - paragraph answer (40–60 words, directly under a question h2),
   - ordered list (5–10 items, one sentence each) for process queries,
   - <table> with <thead>/<tbody>/<th>/<td> (3–4 cols × 5–10 rows) for comparison/pricing queries.

VERIFY: interface compiles; a sample post renders Sources + an inline cited stat + a real <table> + an
ordered list in STATIC HTML; citation appears in BlogPosting JSON-LD; link-density linter runs and prints.
tsc + build green. Paste proof.
```

### PROMPT J — Article Blueprint Conformance (per remix, run after Prompt E)

```
Act as a senior SEO editor. Audit every generated post against the Gold-Standard Article Blueprint
(docs/seo/BLOG-AISEO-MASTERPLAN.md §C). For each post, produce a conformance table — pass/fix for:
- one h1, 10–13 word title, primary keyword present
- visible "Updated {Month 2026}" freshness + dateModified in schema
- TL;DR (40–60w) + Key-takeaways block (5–7 quotable bullets) on pillars
- every h2 phrased as a real query + opens with a 40–60w answer-first paragraph
- ≥1 list-snippet block and ≥1 table-snippet block where the topic warrants
- FAQ with .faq-question/.faq-answer classes; speakable selectors resolve
- 5–8 hyperlinked outbound stats + a Sources section (pillars)
- internal links: ≥8 (pillar) / ≥4 (spoke), incl. hub + 2 adjacent spokes + 1 area/service page
- geo bridge present where about{} is set; one first-person outcome CTA
- reading grade 6–8; word count in band (pillar 2,200–3,000 / spoke 1,200–1,800)
- BlogPosting + Person + BreadcrumbList (+FAQPage) emitted in STATIC HTML with wordCount + citation

Fix every FAIL in place. Re-run tsc + build. Paste the final all-green conformance table.
```

## F. UPDATED NORTH-STAR ADDITIONS

Add to the §6 checklist:
- [ ] **Outbound citations:** 5–8 hyperlinked external stats + a Sources section on every pillar post; `citation` in schema.
- [ ] **Internal-link density:** ≥8/pillar, ≥4/spoke, ≥15 contextual total; link-density linter green.
- [ ] **Snippet blocks:** every post has answer-first paragraphs; process/comparison posts have real ordered-list / `<table>` blocks.
- [ ] **Word count in band:** pillar 2,200–3,000; spoke 1,200–1,800.
- [ ] **Schema reality check:** stop expecting FAQ/HowTo rich results; keep the markup for AI/voice; rely on BlogPosting + Breadcrumb + Person for rich results.
- [ ] **Seasonal:** seasonal posts refreshed 30–45 days before demand peak.

> **Net of Deep Dive 2:** the structure that wins is not longer or cleverer — it is **more extractable**. Question H2s, 40–60-word answers, real lists and tables, hyperlinked sources, a dense internal-link web, and visible freshness — all present in the *static HTML*. Build the article compiler to emit exactly the §C skeleton, and every remix's posts are born rank-ready for Google and citation-ready for AI.

---
---

# ADDENDUM — DEEP DIVE 3: PASSAGE RETRIEVAL, CONTENT FORMATS, OFF-SITE CONSENSUS & THE SERP-FIRST WORKFLOW

> Third research pass. Covers the dimensions Parts 1–2 didn't: **how AI Overviews actually pick passages, which content *formats* get cited most, the off-site "consensus" signal AI requires, and the per-remix workflow to reverse-engineer the winning structure** instead of guessing.

## A. AI OVERVIEWS RETRIEVE *PASSAGES*, NOT PAGES — DESIGN FOR THE CHUNK

The single most strategy-shifting finding of this pass:

- **AI Overviews run a SEPARATE retrieval system** that extracts individual passages, scores them for relevance, and decides to cite in **<200ms**. A page ranking **#15 organically can be cited while the #1 result is ignored.** (This is why Phase 0 + extractable structure beats chasing raw rank.)
- **Query fan-out:** one user query spins up multiple **related sub-queries**. "How to grow a blog audience" fans out into "what is on-page SEO," "content pillar strategy," "best publishing frequency," etc. The answer is assembled from passages that each satisfy a *sub-query*.
- **Passage-level retrieval** operates on **100–300 word semantically-coherent chunks**. Google's official guidance: don't fragment into tiny pieces, but every section must stand alone as a complete answer to one question.

**What this changes in the plan:**
1. **Each `<h2>` section = one self-contained 100–300 word answer to one fan-out sub-query.** The §C blueprint already does this; now it's *why* — the section is the unit of retrieval, not the page.
2. **Map spokes to fan-out sub-queries of the pillar.** When building the hub (Prompt D), explicitly enumerate the pillar's fan-out sub-queries (use "People Also Ask" + related searches) and make each a spoke or an H2. This is the topical-completeness model expressed in AI-retrieval terms.
3. **Self-containment rule:** no section may depend on a previous section to make sense ("as we saw above" = un-citable). Each opens by naming its entity/subject so a passage lifted out of context still reads as a complete answer.

## B. CONTENT-FORMAT TAXONOMY — WHAT ACTUALLY GETS CITED (2026 data)

AI-citation share by format, across verticals:

| Format | Share of AI citations | Use it for | Template action |
|---|---|---|---|
| **Listicles** ("X best / X ways / X signs / X types of…") | **21.9%** (and **40.9%** of *commercial* citations, 21.7% of informational) | The default workhorse format. Numbered, scannable, each item self-contained. | **Make the listicle a first-class article type** — render as a numbered `<ol>`/`<section>` series, each item a mini answer-block. The most-cited format and you have *none*. |
| **Articles** (how/what/why guides) | **16.7%** (45.5% of informational) | Deep explainers, the pillar pages. | The §C blueprint. |
| **Product/category pages** | 13.7% (40% of navigational) | Service + area pages (you have these). | Keep schema rich. |
| **Comparison / "X vs Y" pages** | **<3%** — *over-invested by most brands* | Niche only. | **De-prioritize.** Don't spend cluster budget here; one per hub at most. |
| **Original research / proprietary data** | Treated as a **primary source** — disproportionate citations + backlinks | One per remix = a link magnet + AI primary-source anchor | **NEW asset type** (Prompt L). |

**Net:** the cluster should be **listicle-heavy + article-pillars + one original-data asset**, not a pile of comparison pages. **Intent predicts format** more than industry does — match format to intent: informational → article/listicle; commercial → listicle; navigational → product/area page.

## C. THE OFF-SITE CONSENSUS ENGINE — THE BLOG CAN'T WIN AI ALONE

AI engines cite a brand when they see **agreement across multiple independent sources** ("consensus signal"). On-site content is necessary but **not sufficient** for AI recommendation. This is off-code work, but it's the difference between "indexed" and "recommended," so it belongs in the remix runbook:

- **Reddit is now decisive for AI Overview + ChatGPT citations.** Mentions of the brand — **even unlinked** — build entity strength; AI parses them when modeling the business as an entity. Practical thresholds: subreddits **<50K rarely cited**; **500K+** for real citation potential. Comments become citation-ready by **leading with the direct answer, using specific numbers + proper nouns**, avoiding context-dependent phrasing.
- **Diversified reinforcement:** winners run **Reddit + owned blog + YouTube + entity SEO + traditional links**, each channel corroborating the same positioning and **identical NAP**.
- **Entity consistency:** brand name, address, phone, service, geography must be **byte-identical** across GBP, site, citations, social, and review platforms. Inconsistency dilutes the entity.
- **GBP is the highest off-site lever for local** (~32% of Map-Pack weight) — create/optimize it per remix.

→ Added as **Prompt M** (a runbook + checklist the operator executes off-code, not a code change).

## D. THE SERP-FIRST WORKFLOW — REVERSE-ENGINEER, DON'T GUESS

Before writing any article, the **top-ranking pages for that query ARE the blueprint.** A generic template loses to a brief built from the live SERP. For every target keyword, close the **four gaps**:

| Gap | Question | How to close it |
|---|---|---|
| **Semantic** | Which entities/subtopics do all top pages cover that we'd miss? | List the union of H2s across the top 5; cover all + more. |
| **Intent** | What format/answer does the SERP reward (the top pages reveal it)? | Match the dominant format; if they only *partially* satisfy intent, fully satisfy it. |
| **Format** | Featured snippet / AIO / video / listicle — which SERP feature is winnable? | Structure to win the specific feature (§C snippet blocks). |
| **Value / Experience** | What first-hand proof do they *lack*? (2026: Google weights "Experience" to beat AI-commodity content.) | Inject real project specifics, real numbers, named local detail, original data. |

This becomes a **pre-brief step**: each content brief (Prompt D/E) starts from a 5-result SERP teardown, so the article is built to beat the *actual* winners, not a hypothetical.

## E. ADDITIONAL PROMPTS (append to §5)

### PROMPT K — SERP-First Brief Builder (per remix, run before Prompt E)

```
Act as a senior SEO content strategist. For each target keyword in the hubRegistry (from Prompt D),
build a SERP-first brief BEFORE any drafting. For each keyword:
1. Identify the dominant SEARCH INTENT and the FORMAT the SERP rewards (article / listicle / product).
2. Enumerate the QUERY FAN-OUT: the sub-queries an AI Overview would spin up (mine People-Also-Ask +
   related searches). Each fan-out sub-query becomes an H2 (self-contained 100–300w answer) or a spoke.
3. List the SEMANTIC union: the subtopics/entities the top-ranking pages collectively cover — we cover
   ALL of them plus the gap.
4. Name the VALUE/EXPERIENCE gap: the first-hand proof, local specifics, or original data the incumbents
   lack (2026 Google rewards demonstrated Experience over commodity AI content).
5. Pick the FORMAT and the winnable SERP feature (paragraph/list/table snippet, AIO passage).
Output an updated brief per article: intent, format, fan-out H2 list, semantic coverage checklist,
value/experience angle, snippet target, internal-link plan, primary+secondary keywords. No prose drafting.
```

### PROMPT L — Original-Research / Statistics Asset (per remix, one per hub)

```
Act as a content + data strategist. AI engines treat ORIGINAL DATA as a primary source — it earns
outsized citations and backlinks. For this remix, design ONE proprietary-data asset per pillar hub:
- A statistics/benchmark/"state of {trade} in {region}" page built from data the business actually has
  (job counts, average project costs by scope, seasonal demand, before/after measurements, response
  times) — REAL numbers only, never fabricated. If the data doesn't exist, specify exactly what to
  collect and how, and mark the asset as "pending data" rather than inventing figures.
- Structure: a one-line headline stat (TL;DR), a "Key findings" listicle (5–10 self-contained stat
  bullets, each quotable), real <table> data blocks, methodology note (builds trust), and a Sources
  section for any external comparison data.
- Emit BlogPosting + Dataset schema where appropriate; make every stat a self-contained passage.
This is the link-magnet + AI-primary-source anchor of the cluster. Wire internal links from every
spoke to it. Build it into blogData.ts using the §C sections model. tsc + build green; paste proof.
```

### PROMPT M — Off-Site Consensus & Entity Runbook (operator checklist — NOT code)

```
Act as an AI-SEO + digital-PR strategist. Produce a per-remix OFF-SITE runbook (a markdown checklist
written to docs/seo/offsite-runbook-{TRADE_SLUG}.md) — this is operator action, not a code change.
Cover, with concrete steps for THIS brand's trade + geography:
1. Google Business Profile: create/verify, exact NAP (must match site byte-for-byte), categories,
   services, service-area, photos, review-generation cadence. (~32% of Map-Pack weight.)
2. NAP consistency audit: the canonical Name/Address/Phone string + every platform it must appear on
   identically (GBP, site footer, citations, social, review sites).
3. Reddit/forum entity plan: the relevant subreddits (note 500K+ for citation potential), how to
   participate genuinely (lead with the answer, specific numbers + proper nouns), what NOT to do (spam).
4. Citation tier list: the local + industry directories to claim (NAP-consistent).
5. YouTube/video + review corpus: where to seed corroborating, consistent positioning.
6. The consensus principle: the ONE positioning sentence that must appear consistently everywhere so AI
   builds a confident entity model of the brand.
Output the runbook file; do not touch app code.
```

## F. FORMAT-BY-INTENT SELECTION MATRIX (bake into Prompt D/E)

```
Informational ("how/what/why/cost/signs")  → Article pillar OR Listicle ("X signs you need…", "X ways to…")
Commercial ("best/top/cheapest {service}")  → Listicle (dominant) → links to service/area pages
Local ("{service} in {city}", "{service} cost {region}") → Area/service page (money page) + supporting blog post
Navigational (brand/"near me")              → Area/service/product page
Original-data play (one per hub)            → Statistics/benchmark asset (Prompt L)
Comparison ("X vs Y")                       → Use sparingly, ≤1 per hub (only ~3% of AI citations)
```

## G. NORTH-STAR ADDITIONS (Deep Dive 3)

- [ ] **Passage self-containment:** every H2 section is a standalone 100–300w answer to one fan-out sub-query; no "as above" cross-dependencies.
- [ ] **Format mix:** cluster is listicle-heavy + article pillars + 1 original-data asset per hub; comparison pages ≤1/hub.
- [ ] **Original-data asset:** ≥1 proprietary statistics/benchmark page per hub (real numbers), wired as the internal-link magnet.
- [ ] **SERP-first briefs:** each article brief built from a live top-5 SERP teardown closing semantic/intent/format/value gaps.
- [ ] **Off-site runbook delivered** per remix (GBP, NAP, Reddit/entity, citations) — the consensus signal.
- [ ] **One positioning sentence** consistent across every surface (entity confidence).

> **Net of Deep Dive 3:** ranking is now decided at the **passage** and the **entity** level, not just the page. Win by (1) making every section a self-contained, citable answer to a fan-out sub-query, (2) shipping the formats AI actually cites (listicles + articles + original data, not comparison pages), (3) building the *same article from the live SERP* so it beats the real incumbents, and (4) corroborating the brand off-site so AI is *confident* enough to recommend it. The on-site engine (Phases 0–5) makes the brand citable; the off-site runbook (Prompt M) makes it *recommended*.

---
---

# ADDENDUM — DEEP DIVE 4: AUTHOR ENTITY, IMAGE/MULTIMODAL, CORE WEB VITALS & MEASUREMENT

> Fourth pass. The four dimensions referenced but not yet fully built: **the author-entity layer that now decides AI-Overview citation, multimodal/image SEO, Core Web Vitals specifics, and the measurement loop.** A fully-worked sample article lives in `docs/seo/REFERENCE-ARTICLE-gold-standard.md`.

## A. THE AUTHOR-ENTITY LAYER — 2026's E-E-A-T CORE (biggest under-built area)

In 2026, **author-entity verification decides AI-Overview citation, knowledge-panel display, and ranking weight for attributed content.** The mechanism is concrete and graph-based:

> A `Person` entity in schema with a **`sameAs`** chain to authoritative external profiles (LinkedIn, **Wikidata**, ORCID, industry registries). Google traverses that graph to confirm the author claimed in schema is the same person identified across the open web. **Confidence emerges from agreement across nodes; disagreement triggers downgrades.**

**Current template gap (`remix-variables.ts:44` `Author` + `BlogPostingSchema.tsx:55`):** you have `name/role/bio/image/url` and emit only `name/jobTitle/image` in schema — **no `sameAs`, no `knowsAbout`, no `hasCredential`, no `worksFor`, and no author page route.** This is the weakest link in your AI-citation chain.

**Fix (Prompt N):**
1. **Expand the `Author` type** with: `sameAs: string[]` (LinkedIn, Wikidata, etc.), `knowsAbout: string[]` (the topics they're expert in — maps to the hubs), `hasCredential?: string[]` (certifications/licenses — gold for trade businesses), `worksFor` (the Org `@id`).
2. **Build an author page route** (`/about/{authorSlug}` or `/authors/{slug}`) — a real, crawlable, static page per author with bio, photo, credentials, `knowsAbout`, links to their posts, and full `Person` JSON-LD. The author `url` in `BlogPosting.author` must point here (it currently may dangle).
3. **Emit the full `Person` node** (use `personNode` in `seoGraph.ts:256` — it already supports `sameAs`; wire it into `BlogPostingSchema` instead of the inline minimal author object).
4. **Consistency rule:** the bio's claims (years of experience, specialty) must match LinkedIn/Wikidata exactly — agreement strengthens the entity, contradiction downgrades it.

> For a local trade, the author is the licensed tradesperson/founder. `hasCredential` (trade license, WCB, manufacturer certs) + `knowsAbout` (the trade's subtopics) + a `sameAs` to a real LinkedIn is a powerful, achievable E-E-A-T chain most competitors don't have.

## B. IMAGE & MULTIMODAL SEO — AI NOW READS THE PIXELS

Search is multimodal: **Google Lens processes 20B+ visual searches/month**, and GPT-4o/Gemini-class models **tokenize and "read" image pixels.** Images are an independent ranking + citation surface.

The rule: **alt text + filename + surrounding paragraph + ImageObject schema must tell ONE consistent story.**

| Lever | Standard | Template status |
|---|---|---|
| **Format** | AVIF > WebP (compression + CWV) | ✅ AVIF used (`STORY_IMAGES` `.avif`) |
| **Dimensions** | explicit `width`/`height` (CLS) | ✅ on `featuredImage` |
| **Filename** | descriptive, keyworded: `drywall-repair-cochrane-before.avif` not `IMG_1234` | ⚠️ wire into `regenerate-images.ts` |
| **Alt text** | descriptive, entity + context, <125 chars, consistent with caption | ✅ field exists; enforce quality |
| **Caption** | `<figure>/<figcaption>` reinforcing the alt + surrounding text | ⚠️ add to article renderer |
| **ImageObject schema** | `contentUrl`, `caption`, `creator`, `width`/`height` — feeds Lens + image carousels | ❌ not emitted |

**Fix (Prompt O):** descriptive filenames in the image script; `<figure>/<figcaption>` in the article renderer; emit `ImageObject` in `BlogPosting.image` (richer than the current bare object) and optionally a standalone `ImageObject` node; ensure alt + caption + nearest paragraph are semantically aligned per image.

## C. CORE WEB VITALS — THE 2026 SPECIFICS (a ranking AND AIO-selection signal)

Thresholds: **LCP <2.5s · INP <200ms · CLS <0.1.** Note: **INP is the most-failed vital (43% of sites fail).** Passing all three correlates with **24% lower bounce.** Relevant to *this* React/Vite/framer-motion/lenis stack:

- **LCP:** Phase 0 prerender is itself a top-4 LCP fix (static HTML paints immediately). Then: preload the LCP image with `fetchpriority="high"` (the blog hero is `loading="eager"` ✅ but not `fetchpriority`); AVIF/WebP ✅; inline critical CSS; **self-host fonts** (you currently load Cormorant/Jakarta/JetBrains from the Google Fonts CDN — render-blocking; the global standard is self-hosted + subset + `font-display: swap`). The `display=swap` param is present ✅ but the stylesheet `<link>` is still render-blocking.
- **INP (watch this one):** `lenis` smooth-scroll + `framer-motion` are INP/long-task risks on content pages. Audit: animate only `transform`/`opacity`, code-split the motion runtime off article/area routes, keep main-thread work <50ms, defer non-critical JS. A blog reader on mobile should not ship the full cinematic motion bundle.
- **CLS:** explicit `width`/`height` on **every** image/embed (mostly ✅); reserve space for the sticky `ConversionBar`; `font-display: swap` metrics matched to avoid FOUT shift.

**Fix (Prompt P):** font self-hosting + subset; `fetchpriority="high"` on LCP images; route-level code-split of `lenis`/`framer-motion` off content pages; per-route Lighthouse mobile budget (Perf ≥90) in the preflight script.

## D. MEASUREMENT & THE 90-DAY ITERATION LOOP

You can't improve what you don't measure, and AI visibility needs *new* metrics beyond rankings.

**The 5 GEO/AEO KPIs:** AI citation rate · AI share of voice · sentiment/accuracy · AI referral traffic · AI-influenced pipeline. Plus **AAIR (AI Answer Inclusion Rate)** = % of tested prompts where the brand appears in the AI answer.

**The achievable measurement stack (no enterprise tooling required):**
- **GA4** — on-site behavior + conversions (tag the CTA conversions).
- **Google Search Console** — impressions, query-level data, **AI-Overview appearances**; the 11–30 ranking queries → new spokes.
- **Bing Webmaster** — Copilot/ChatGPT lean on Bing's index.
- **A prompt-monitor** (manual at first: run your target queries through ChatGPT/Perplexity/Google AIO monthly and log whether the brand is cited) → AAIR + share of voice.

**The 90-day ramp (set expectations):** first citation signals **4–8 weeks**; meaningful citation growth (20–30% for a cluster) **8–12 weeks**; strong category positioning (40%+) **3–6 months**, and it needs **owned content + earned media (the off-site runbook) together.** Local organic lead volume: 3–6 months; real authority: 12–18 months.

**Fix (Prompt Q):** a `docs/seo/measurement-and-iteration.md` per remix — the KPI definitions, the GA4/GSC/Bing setup checklist, a monthly AAIR logging template, and the iteration loop (GSC 11–30 → new spokes; PAA drift → new FAQ; stale flag → refresh).

## E. ADDITIONAL PROMPTS (append to §5)

### PROMPT N — Author-Entity Layer (template upgrade)

```
You are an E-E-A-T / entity-SEO engineer. Author-entity verification now decides AI-Overview citation.
Build the author layer this template is missing.

1. Expand the Author interface (src/config/template/remix-variables.ts:44) with:
   sameAs: string[]; knowsAbout: string[]; hasCredential?: string[]; (and reference worksFor = Org @id).
   Keep it backward-compatible (optional where possible).
2. Build a crawlable, STATIC author page route — /authors/{slug} (or /about/{slug}) — one per AUTHORS
   entry: photo, bio, jobTitle, credentials, knowsAbout topics, and a list linking to that author's posts.
   Prerendered (Phase 0) so it's in static HTML.
3. Replace the minimal inline author object in BlogPostingSchema.tsx:55 with the full personNode()
   from seoGraph.ts:256 — emitting name, url (the new author page), image, jobTitle, worksFor(@id ORG_ID),
   sameAs, knowsAbout, hasCredential. Point BlogPosting.author at the Person @id.
4. Render the visible AuthorBio (AuthorBio.tsx) with credentials + knowsAbout + sameAs links.
5. Document the consistency rule in remix-variables.ts: bio claims MUST match the linked LinkedIn/Wikidata
   (agreement strengthens the entity; contradiction downgrades it). Never invent credentials.

VERIFY: author page renders in static HTML with full Person JSON-LD; BlogPosting.author resolves to it;
sameAs present; tsc + build green. Paste the author page HTML + JSON-LD.
```

### PROMPT O — Image & Multimodal SEO (template upgrade)

```
You are an image/multimodal-SEO engineer. AI vision models read image pixels; Lens does 20B searches/mo.
Make alt + filename + caption + schema tell ONE consistent story.

1. Descriptive filenames: update scripts/regenerate-images.ts so generated files are named
   {trade}-{subject}-{location?}-{variant}.avif (not generic ids). Keep AVIF.
2. In the article renderer (post Prompt C), wrap content images in <figure> with a <figcaption> that
   reinforces the alt text and the surrounding paragraph. Enforce alt <125 chars, descriptive, entity-named.
3. Emit ImageObject for the featured image in BlogPosting.image (contentUrl, caption, width, height,
   creator=Org) — richer than the current bare object. Optionally a standalone ImageObject node.
4. Add a lint check: every content image has non-empty descriptive alt + width + height.

VERIFY: a sample post's featured image emits ImageObject JSON-LD; figures have captions; filenames are
descriptive; alt/caption/surrounding text align. tsc + build green.
```

### PROMPT P — Core Web Vitals Hardening (template-wide)

```
You are a performance engineer. Targets (throttled mobile): LCP <2.5s, INP <200ms (most-failed), CLS <0.1.
This is a Vite + React + framer-motion + lenis stack loading fonts from the Google Fonts CDN.

1. FONTS: self-host Cormorant Garamond / Plus Jakarta Sans / JetBrains Mono (subset to used weights/glyphs),
   font-display: swap, preload the critical font. Remove the render-blocking Google Fonts <link> in index.html.
2. LCP: add fetchpriority="high" to the LCP image on blog post, blog hub, area, and home heroes. Confirm the
   prerendered HTML (Phase 0) paints the hero immediately.
3. INP: route-level code-split lenis + framer-motion OFF content routes (blog post/hub, area pages) — a reader
   should not download the cinematic motion bundle. Keep animations to transform/opacity; defer non-critical JS.
4. CLS: audit every image/embed/figure for explicit width/height; reserve space for the sticky ConversionBar;
   verify font swap doesn't shift layout.
5. Add a per-route Lighthouse budget to scripts/preflight.ts (fail build if a key route < Perf 90 mobile).

VERIFY: Lighthouse mobile on /blog/{post} and /areas-we-serve/{region}/{community}: Perf ≥90, LCP <2.5s,
CLS <0.1, INP <200ms (or TBT proxy). Paste scores. tsc + build green.
```

### PROMPT Q — Measurement & Iteration Loop (per remix, doc artifact)

```
Act as an AI-SEO analyst. Write docs/seo/measurement-and-iteration.md for this remix (not code):
1. The 5 GEO KPIs (AI citation rate, share of voice, sentiment/accuracy, AI referral traffic, AI-influenced
   pipeline) + AAIR, each defined for THIS brand with a target.
2. Setup checklist: GA4 (tag CTA conversions), Google Search Console (watch AI-Overview impressions +
   11–30 ranking queries), Bing Webmaster (Copilot/ChatGPT index).
3. A monthly AAIR log template: the 10–20 target prompts to run through ChatGPT/Perplexity/Google AIO, with
   a pass/fail + cited-source column.
4. The iteration loop: GSC 11–30 queries → new spokes; People-Also-Ask drift → new FAQ; stale-flag (Prompt F)
   → refresh; new fan-out sub-queries → new H2s.
5. The 90-day ramp expectations (signals 4–8 wks; 20–30% growth 8–12 wks; 40%+ 3–6 mo) so the operator
   doesn't quit early. Note: needs owned content + the off-site runbook (Prompt M) together.
```

## F. NORTH-STAR ADDITIONS (Deep Dive 4)

- [ ] **Author entity:** full `Person` schema (url→author page, sameAs, knowsAbout, hasCredential, worksFor); crawlable static author pages; bio matches external profiles.
- [ ] **Image/multimodal:** descriptive filenames, `<figure>/<figcaption>`, `ImageObject` schema, aligned alt+caption+text, AVIF.
- [ ] **CWV:** self-hosted fonts, `fetchpriority` LCP, motion bundle code-split off content routes, per-route Lighthouse budget; LCP<2.5s / INP<200ms / CLS<0.1.
- [ ] **Measurement:** GA4 + GSC + Bing + monthly AAIR log; iteration loop running; 90-day expectations set.

> **Net of Deep Dive 4:** the brand becomes a *verifiable entity* (author `sameAs` graph), *multimodally legible* (images AI can read), *fast enough to be selected* (CWV), and *measurable* (GEO KPIs + the 90-day loop). Combined with Parts 1–3, the template now covers every lever from the first byte of HTML to the AI citation to the booked job.
