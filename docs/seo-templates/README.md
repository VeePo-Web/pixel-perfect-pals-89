# SEO & AI SEO Template System — "Areas We Serve" + Blog

> **Purpose.** This folder is the complete research + build-prompt package for turning the existing
> Areas-We-Serve and Blog systems in this repo into **drop-in, data-swappable templates** that
> scale to **all of Canada** and **all 50 US states**, and that rank at the top of **both** Google
> and AI search (Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini).
>
> **Status: RESEARCH + PROMPTS ONLY.** Nothing in the application has been changed or added.
> These documents are the specification you (or an agent) execute later via the build prompts.

---

## What's in here

```
docs/seo-templates/
├── README.md                         ← you are here (index + how to use)
├── research/
│   ├── 01-areas-we-serve-research.md     World-class local/geo SEO + AI SEO research (sourced)
│   ├── 02-blog-topical-authority-research.md  World-class blog SEO + AI SEO research (sourced)
│   ├── 03-ai-seo-geo-aeo-research.md      Cross-cutting AI-search (GEO/AEO) playbook for both
│   └── sources.md                        Consolidated, de-duplicated source list
├── reference/
│   ├── current-implementation-map.md     Exact map of how Areas + Blog work in THIS repo today
│   └── qa-ship-gates.md                  Pass/fail checklists every page must clear before publish
└── prompts/
    ├── 00-master-orchestration-prompt.md     The conductor: order of operations, guardrails
    ├── 01-areas-template-build-prompt.md      Build the Areas template for all CA + US states
    ├── 02-blog-template-build-prompt.md       Build the Blog template (topical authority engine)
    ├── 03-business-data-population-prompt.md   Swap in a real business + its real service areas
    └── 04-ai-seo-hardening-prompt.md           llms.txt, robots, static render, schema, sitemaps
```

---

## The core thesis (read this first)

1. **Two search games, optimized at once.** Classic Google ranking (proximity, prominence,
   relevance, schema, links) **and** AI-citation (GEO/AEO: being *quoted* inside an AI answer).
   ~80% of LLM-cited sources don't rank in Google's top 100 — these are **separate** wins you must
   engineer for simultaneously. (See `research/03`.)

2. **The post-2024/2026 quality model is existential, not cosmetic.** Google's *scaled content
   abuse* policy + the 2025 spam updates mean **your weakest thin pages now drag down your whole
   domain's authority** — they're no longer merely ignored. Therefore the template's #1 job is a
   **publish gate**: never generate a page that fails the local-uniqueness bar. (See `research/01 §2`.)

3. **"Template for all of Canada and all states" ≠ "a page for every city."** The template ships
   the **complete geographic scaffold** (provinces/territories + states, with their cities &
   coordinates) and the **uniqueness engine + publish gate**. Per-business activation then **selects
   only the real, service-relevant areas** and enriches each with first-party local signals so it
   clears the gate. Generating a page for every conceivable town is the fastest way to get
   deindexed. (See `prompts/01` and `prompts/03`.)

4. **Static HTML or you're invisible to AI.** GPTBot / ClaudeBot / PerplexityBot **do not run
   JavaScript**. Content + all JSON-LD must be in the **initial server HTML** (prerender/SSG). This
   is a hard release blocker. (See `research/03` + `prompts/04`.)

5. **Two content layers feed each other.** Transactional matrix pages (`{service} in {city}`) win
   the local pack + commercial clicks; an informational **blog/FAQ cluster** wins the 50–92% of
   local-adjacent queries that fire AI Overviews, and links *down* into the matrix. The Areas system
   and the Blog system are deliberately wired together (the "intent bridge"). (See `reference/...`.)

---

## How to use this package

**To understand the strategy:** read `research/01`, `research/02`, `research/03` in order.

**To understand the current code you're templating:** read `reference/current-implementation-map.md`.

**To execute the build (when you're ready — NOT yet):**
1. `prompts/00-master-orchestration-prompt.md` — sets order, branch protocol, guardrails.
2. `prompts/01-areas-template-build-prompt.md` — geography scaffold + uniqueness engine for all CA + US.
3. `prompts/02-blog-template-build-prompt.md` — topical-authority blog engine.
4. `prompts/04-ai-seo-hardening-prompt.md` — AI-crawler + schema + static-render hardening.
5. `prompts/03-business-data-population-prompt.md` — run this **per project** to make it business-specific.

**Before any page ships:** every page must pass `reference/qa-ship-gates.md`.

---

## Non-negotiables carried into every prompt

- **Gate before you generate** — ≥ 4 of 8 local-specificity signals + ≥ 1 first-party data element, or the page is not built.
- **One keyword → one URL** — no cannibalization across service / location / matrix tiers.
- **Static-render everything** — verify HTML + JSON-LD present with JS disabled.
- **NAP byte-identical everywhere** — page, footer, schema, GBP, citations (now an AI-trust signal too).
- **No self-serving `aggregateRating`/`review` schema** on your own business (Google's stated rule).
- **Honest `lastmod`** tied to real content changes; visible "last updated" date; re-audit cadence.
- **Data-driven, trade-agnostic** — all copy flows from a single remix/config source, never hardcoded.

---

*Compiled 2026-06. Research synthesized from Google Search Central, Sterling Sky (Joy Hawkins),
RicketyRoo, BrightLocal, Whitespark, Search Engine Land/Journal, Ahrefs, Vercel, and multiple
2025–2026 GEO/AEO studies. Full citations in `research/sources.md`.*
