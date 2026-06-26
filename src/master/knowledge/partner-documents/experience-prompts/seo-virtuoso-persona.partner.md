---
layer: partner
category: experience-prompts
cross-cuts: seo
source: src/master/knowledge/source-documents/experience-prompts/seo-virtuoso-persona.source.md
scope: cross-brand
adaptation-required: true
priority: P0-foundational-for-seo
---

# Partner — General SEO Virtuoso Persona & "What Not To Do" Checklist

> **Methodology brain for every SEO question in the codebase.** Whenever an
> agent reasons about meta tags, JSON-LD, robots, sitemaps, canonicals,
> internal linking, anchor text, alt text, Core Web Vitals, AI-search
> visibility (GEO), local SEO, link building, or analytics — read the
> source document this partner interprets. Then layer the brand-specific
> SEO research on top.

---

## 1. Document title

**General SEO Virtuoso Persona & "What Not To Do" Checklist.**
Originally uploaded as `General_SEO_Prompt_use_checklist_from_Dev.veepo.ca-2.docx`.
Establishes a 50-year-veteran, Victorious-SEO-grade strategist persona, plus
the 15 core principles, the "what not to do" checklist, and the 5-step working
process the persona uses.

## 2. Document category

`experience-prompts/` — same shelf as `master-design-persona-fantasy.source.md`
(visual quality counterpart) and `anti-gravity-opening-engineer.source.md`
(motion counterpart). Cross-cuts the topical area `seo`.

This is **not** a brand-specific SEO doc. The brand-specific keyword / SERP
research lives at `brands/cochrane-master-builders/seo-research/1.1_…`. This
persona is the **methodology** behind that research.

## 3. Main purpose

Install a single, internally-consistent SEO methodology that any agent (Lovable,
Claude Code, Codex, etc.) must apply when making backend SEO decisions on any
brand in the corpus. Captures both the *do* (15 core principles + 5-step process)
and the *don't* (the comprehensive "what not to do" checklist). Anchors the
quality bar at "Victorious-SEO enterprise-grade" with E-E-A-T as the operating
worldview.

## 4. What this document should influence

Every backend SEO decision, including but not limited to:

- `<head>` contents on every route — `<title>`, `<meta name="description">`,
  `<link rel="canonical">`, `<meta name="robots">`, Open Graph, Twitter Card,
  hreflang (when multilingual)
- JSON-LD blobs — `Organization` / `LocalBusiness`, `WebSite` + `SearchAction`,
  `WebPage`, `BreadcrumbList`, `Article`, `Service`, `FAQPage`, `Review`
  (only when content genuinely qualifies — never decorative schema)
- Heading hierarchy — exactly one `<h1>` per route, lower headings descend
  logically without skipping levels
- `<a href="…">` discipline — never `<button>` or `<div>` for navigation,
  every important page within three clicks of the homepage, descriptive
  anchor text, `rel="nofollow"` / `sponsored` / `ugc` where applicable
- Image pipeline — WebP/AVIF, dimensions in markup, `loading="lazy"` for
  below-the-fold, `alt` attributes that describe both content and purpose
- `robots.txt` and `sitemap.xml` — sitemaps reference only canonical,
  indexable URLs; robots does not block AI crawlers (GPTBot,
  PerplexityBot, ClaudeBot, etc.) unless deliberately scoped
- Redirect strategy — single-hop 301s, no chains, no soft 404s, status
  codes are honest
- Core Web Vitals targets — LCP < 2.5s, INP < 200ms, CLS < 0.1
- Internal linking maps and pillar/cluster topology
- FAQ accessibility for AI synthesis (GEO) — direct answers leading
  paragraphs, sub-query phrasing, fully rendered in HTML (not deferred
  behind JS-only accordions for AI bots)

## 5. Trigger prompts (when to consult this document)

Consult this persona when any of the following appear:

- "meta title for…", "meta description for…", "what should the title be"
- "should this be H1 / H2 / H3", "fix the heading hierarchy"
- "add JSON-LD", "schema markup", "structured data", "FAQPage schema",
  "BreadcrumbList", "LocalBusiness schema", "Organization schema",
  "Service schema"
- "robots.txt", "sitemap", "sitemap.xml", "noindex this page",
  "canonical for…", "set the canonical"
- "redirect chain", "301 vs 302", "soft 404", "404 strategy"
- "Core Web Vitals", "LCP", "INP", "CLS", "page speed", "PageSpeed Insights",
  "LCP image", "preload", "lazy load", "WebP / AVIF", "image format"
- "AI Overview citation", "Perplexity visibility", "ChatGPT search",
  "GEO" (Generative Engine Optimization), "AI bots", "GPTBot",
  "PerplexityBot"
- "internal-linking plan", "anchor text", "click-here", "orphan page",
  "three-clicks rule", "pillar / cluster"
- "alt text", "image alt", "accessibility for screen readers" (SEO + a11y
  overlap)
- "hreflang", "multilingual SEO", "regional variants"
- "local SEO", "Google Business Profile", "GBP", "NAP consistency",
  "Areas-We-Serve" (cross-references `cmb-seo-1.1`)
- "broken links audit", "duplicate content", "keyword cannibalization",
  "self-referencing canonical"
- "Rich Results Test", "URL Inspection", "Search Console"
- Any "audit our SEO" / "rank #1 for X" / "improve organic traffic" prompt

## 6. Scope of application

**Cross-brand / global methodology**, applied through the active brand layer.

Surfaces it touches: every page route's `<head>`, every JSON-LD blob, every
image asset's `alt` and format, every internal link's `href` and anchor text,
every form's accessibility attributes (a11y/SEO overlap), `robots.txt`,
`sitemap.xml`, `manifest.json` (icon/sitemap interplay), CDN/cache headers
when SEO-adjacent.

Surfaces it must **not** touch (per the persona's own "Separation of
Concerns" principle): visible copy wording, layout, design tokens, motion,
component visual styling. Those belong to the design / brand / UX partner
docs.

## 7. How it should guide output quality

- **Victorious-SEO discipline** — every output is justifiable against an
  enterprise SEO audit. No "looks fine" vibes; every change has a documented
  reason.
- **E-E-A-T obsession** — Experience, Expertise, Authoritativeness,
  Trustworthiness expressed in author attribution, citations, real business
  signals (license, insurance, NAP, reviews from real customers).
- **GEO-aware** — content structured so AI systems can extract direct answers
  to sub-queries. FAQ blocks are not decorative; they exist to be cited by
  ChatGPT, Perplexity, Claude, and Google's AI Overviews.
- **Zero-tolerance for the "what not to do" list** — keyword stuffing,
  cannibalization, plagiarism / AI scaled content abuse, thin content,
  doorway pages, hidden text, broken links, cloaking, link spam, intrusive
  interstitials, ads that block content, generic anchor text, missing alt,
  random URL slugs, blocked AI crawlers without reason.
- **Long-horizon mindset** — SEO compounds; do not chase rank-instant-shortcuts.

## 8. Brand / ICP relationship — how to apply on this codebase

This codebase serves **Cochrane Master Builders Corp.** (custom home builder;
Cochrane / Bow Valley / Rocky View County / Calgary CMA). Apply the persona
as follows:

- Pair with `cmb-seo-1.1` (`brands/cochrane-master-builders/seo-research/`)
  for Cochrane-specific keywords, competitor SERPs, AI-Overview opportunities.
- Pair with `cmb-strategy-1.3` for the multi-trade backend, Areas-We-Serve
  taxonomy, and NAP propagation rules (sister-site network).
- Pair with `cmb-strategy-1.0` / `cmb-strategy-1.2` for top-level
  positioning that meta titles + descriptions must reflect.
- Pair with `cmb-brand-1.2.2` ("Foundations For Generations After Us") for
  on-brand voice in any FAQ answer copy or meta description.
- Pair with the ICP partners — `cmb-persona-1.4.1` (subcontractors),
  `cmb-persona-1.4.2` (mothers / family decision-makers), `cmb-persona-1.4.3`
  (grandfathers / long-tenured homeowners) — to choose the *phrasing* of
  FAQ questions and meta descriptions for the page's primary audience.
- Local-SEO clauses become: GBP for Cochrane location, `LocalBusiness` schema
  with real Cochrane NAP, service-area pages aligned to the
  `cmb-strategy-1.3` taxonomy.

## 9. Global vs specific

**Global, P0 alongside the master governance charter** for any SEO question.

- **Wins over** `cmb-seo-1.1` on *methodology, technical rules, and the don'ts*.
- **Loses to** `cmb-seo-1.1` on *which Cochrane keywords to target* and
  *which competitor SERPs to beat*.
- **Loses to** the ICP partner docs on *tone of FAQ answer copy*.
- **Loses to** the design persona docs on *anything visible*. The persona's
  principle 2 ("Separation of Concerns") makes this explicit.

## 10. Adaptation notes (the conflict rule applied here — verbatim source preserved)

The source contains references and artefacts that must be translated for
this codebase but **must not be edited inside the source file**:

- **"Lovable.dev"** — the persona was originally written for Lovable.dev as
  the optimisation target. Substitute the active brand: **Cochrane Master
  Builders Corp.** for this codebase. (Other future codebases would
  substitute their own brand.)
- **"Victorious SEO"** — external agency reference; treat as the *quality
  benchmark*, not as a brand to imitate. Do not copy their site or
  vocabulary; emulate their rigor.
- **"mangools.com"** inline citations — informational sources the persona
  drew from. Treat as background reading, not as endorsements or required
  outbound links.
- **Trailing operational instruction block** ("ONLY ON THE COCHRANE PAGES AND
  NOTHING ELSE…") — this is leftover scope from a prior `dev.veepo.ca`
  conversation about a different codebase ("Cochrane sub-domain" of
  veepo.ca). On the current Cochrane Master Builders codebase, the *whole
  site* is Cochrane, so the "only Cochrane subdomain" qualifier collapses to
  "the whole site". This embedding is **knowledge-only** — it does **not**
  authorise any frontend SEO pass. If the user later asks for "the Cochrane
  SEO pass," that request opens a separate, deliberate scope.
- **Trailing collapsible-FAQ bug request** ("MAKE SURE THAT ALL COLLAPSABLE
  AND UNCOLLAPSABLE FEATURES WORK…") — this references a bug on the prior
  `dev.veepo.ca` codebase. It is **not** a frontend instruction for this
  codebase. If/when the user asks for an FAQ-accordion audit here, that's a
  separate task. (Note: the persona itself flags accordions as a GEO risk —
  AI bots cannot click them — so any future FAQ work should default to
  rendering all answers in HTML even when collapsed.)
- **Source-side typos / duplicated heading fragments** ("People-First
  Content First Content", "Heading  ierarchy", "Local  **Local & International
  SEO:**", "Audit  Audit & Research", etc.) — these are upload artefacts. Do
  not "fix" them in the source. Read past them.
- **"Lovable.dev serves specific regions"** clause → for this codebase, the
  regions are: Town of Cochrane, Bow Valley, Rocky View County, and the
  Calgary CMA adjacency (per `cmb-strategy-1.3`).
- **Mention of "AI assistance used in content creation" transparency** — for
  this codebase, content authored with AI assistance must still pass the
  E-E-A-T bar (real expertise behind the words, real review by a builder /
  Cochrane subject-matter expert before publish).

## 11. Dependencies / related documents

**Hard dependencies (always read alongside this persona):**
- `governance/knowledge-system-charter` — P0 governance; defines how this
  document itself is used.
- `brands/cochrane-master-builders/seo-research/1.1_…` — the brand-specific
  keyword / competitor / AI-SEO research the methodology applies to.

**Soft dependencies (read when relevant to the SEO question at hand):**
- `brands/cochrane-master-builders/strategy/1.3_…` — Areas-We-Serve taxonomy,
  sister-site network, NAP propagation, hreflang-equivalent for trades.
- `brands/cochrane-master-builders/strategy/1.0_…` and `1.2_…` — North Star
  + refined positioning that meta titles must reflect.
- `brands/cochrane-master-builders/brand-identity/1.2.1_…` and `1.2.2_…` —
  voice/tone for any FAQ answer copy or meta description.
- `brands/cochrane-master-builders/personas-icp/1.4.1_…` (subcontractors),
  `1.4.2_…` (mothers), `1.4.3_…` (grandfathers) — audience-specific phrasing.
- `brands/cochrane-master-builders/ux-design/1.3.1_…` — confirms any
  layout/CWV trade-offs.
- `experience-prompts/master-design-persona-fantasy.source.md` — visual
  quality counterpart (do not contradict on visible decisions).
- `experience-prompts/anti-gravity-opening-engineer.source.md` — motion
  counterpart (motion choices may affect CWV / INP / CLS).

**Router status:** This persona is discoverable through `INDEX.md`. It is
**not** wired into the typed `decision-index.ts` router because the current
`brand` enum is locked to `"cochrane-master-builders"` and this persona is
brand-agnostic. Wiring it in is a separate, deliberate schema change — out
of scope for this embed.

## 12. Practical examples (how to apply this persona)

**Example A — "Add an FAQ section to the Cochrane homepage."**
1. Read this persona (principle 11 — GEO; checklist — accordions hide content
   from AI bots).
2. Read `cmb-seo-1.1` for the actual sub-queries Cochrane homeowners ask
   ChatGPT / Perplexity / AI Overviews about custom home builders.
3. Read `cmb-persona-1.4.2` (mothers) to choose tone and concerns to address
   (pricing transparency, scheduling sensitivity, mess/disruption, safety).
4. Build: questions phrased as users actually search; answers lead with the
   direct answer in the first sentence; full answer rendered in HTML even
   when the UI collapses it; `FAQPage` JSON-LD that mirrors visible content
   exactly; no fabricated answers (the user's instruction
   "ONLY INCLUDE INFORMATION THAT YOU KNOW IS 100% TRUE" is reinforced by
   E-E-A-T).

**Example B — "Audit our meta titles."**
1. This persona's principle 8 + checklist's metadata section govern: ~50–60
   characters, unique per route, front-loaded primary keyword, no
   boilerplate, no duplicates across routes.
2. Cross-check with `cmb-seo-1.1` to confirm the chosen primary keyword
   matches Cochrane SERP intent.
3. Cross-check with `cmb-brand-1.2.2` so the title voice matches "Strong
   Foundations For Those Who Come After Us."
4. Validate every title with the URL Inspection tool and Rich Results Test
   after deploy.

**Example C — "We want to rank #1 for 'custom home builder Cochrane'."**
1. This persona answers *how*: pillar page with one H1 matching the title,
   self-referencing canonical, `LocalBusiness` + `Service` JSON-LD with real
   NAP, descriptive internal links from /about, /service-areas, /portfolio,
   image alt that includes the keyword without stuffing, page within three
   clicks of homepage, full HTML render for AI bots, LCP image preloaded,
   FAQ block with sub-queries Cochrane homeowners actually ask.
2. `cmb-seo-1.1` answers *which long-tail variants* support the head term.
3. `cmb-strategy-1.3` answers *whether* a sister-site / Areas-We-Serve sub-
   page is needed to triangulate authority.
4. `cmb-brand-1.2.2` answers *how the page sounds*.
5. Persona principle 14 (Analytics): set Search Console queries to monitor;
   plan a 90-day refresh cycle (the persona's "AI citations drop after
   ~3 months" rule).

---

## Indexing / reference entry

| Field | Value |
|------|-------|
| **Lives at (source)** | `src/master/knowledge/source-documents/experience-prompts/seo-virtuoso-persona.source.md` |
| **Lives at (partner)** | `src/master/knowledge/partner-documents/experience-prompts/seo-virtuoso-persona.partner.md` |
| **Governs** | All backend SEO decisions across all brands: meta tags, JSON-LD, robots/sitemap, canonicals, internal linking, anchor text, alt text, Core Web Vitals, AI-search visibility (GEO), local SEO, link building, analytics, ethics. Does NOT govern visible copy or visual design. |
| **Keywords / topics** | seo, on-page seo, technical seo, meta title, meta description, json-ld, schema, structured data, robots.txt, sitemap, canonical, redirect, core web vitals, lcp, inp, cls, alt text, anchor text, internal linking, pillar cluster, faq schema, geo, generative engine optimization, ai overview, perplexity, chatgpt search, e-e-a-t, hreflang, local seo, google business profile, nap, link building, search console, page speed, web vitals, what-not-to-do, keyword cannibalization, hidden text, cloaking, link spam, doorway page, scaled content abuse |
| **Consult when** | Any question about backend SEO, AI-search citation, FAQ schema, meta tags, structured data, accessibility-for-crawlers, or the "is this an SEO anti-pattern" check. |
| **Priority** | P0 for SEO topics. Reads after the governance charter; reads before brand-specific SEO research. |
| **Brand scope** | Brand-agnostic methodology. Apply through the active brand's research + voice + ICP layers. |
