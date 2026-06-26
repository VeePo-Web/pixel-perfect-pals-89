# Areas We Serve + Google Maps — World-Class SEO & AI-SEO Template Kit

> The complete research + executable build-prompt library for turning this template's
> `/areas-we-serve` + Maps engine into a **reusable geo-template for all of Canada and all
> US states** that ranks #1 in **Google AND AI search** (ChatGPT, Perplexity, Google AI
> Overviews, Claude, Gemini) for any business it is remixed into.
>
> **Status of this folder:** research + plans + prompts only. **No source code is changed
> by anything in `docs/`.** The prompts are the executable specs; firing them is a separate,
> explicit step.

---

## What this kit is for

The current template already has a top-1% **3-tier Areas engine** (Hub → Region → Community)
with a real geo-data layer, an `@id`-linked JSON-LD graph, a content-variance engine, a
Maps component with a keyless fallback, an auto-generated sitemap, and a fully token-driven
remix system. (See the Current-State Inventory in the masterplan.)

The goal of this kit is to take that engine and:

1. Make it **AI-readable and Google-fast** (static render + discovery layer) — the one
   release blocker that currently caps traffic near zero.
2. Scale the geo-data layer to **every province/territory in Canada and every US state**,
   populated from **free, legal open data**, behind a **penalty-safe uniqueness gate**.
3. Upgrade the **Maps integration** to a performance-safe, schema-rich, AI-citation-friendly
   pattern (`areaServed` / `GeoCircle` / `hasMap`, static-first facade).
4. Make the whole thing a **per-business remix**: change one config + a local-proof
   spreadsheet, regenerate, and rank — **never a code change**.

Every recommendation in this kit serves Google ranking, AI citation, conversion, and Core
Web Vitals **simultaneously**. There is no trade-off — there is one correct build.

---

## How to read this folder

| Read this | When | What it gives you |
|---|---|---|
| **[`AREAS-MAPS-MASTERPLAN.md`](./AREAS-MAPS-MASTERPLAN.md)** | First | Executive diagnosis of the current engine, what wins in 2026, the full current-state inventory (keep all of it), and the phased gap-closing plan. The strategy. |
| **[`DEEP-DIVE-2026-ADDENDUM.md`](./DEEP-DIVE-2026-ADDENDUM.md)** | After the masterplan | The fresh 2025–2026 deep-dive: hard-numbered ranking weights, the facade + billing decision, AI-search reality, blog-citation levers, and the penalty line — plus the index to the new Maps/blog reports + blog prompt. |
| **[`research/`](./research/)** | For the "why" behind any decision | Eight deep-research findings briefs (cited, current to 2025–2026) — service-area page SEO, Maps/Local-Pack ranking, AI/GEO local citation, Maps+geo-schema technical, programmatic scale + open geo-data, blog content that feeds area pages, **plus two 2026 deep dives: Maps integration (07) and blogs-for-maps (08)**. |
| **[`prompts/`](./prompts/)** | When you're ready to build | Seven self-contained, executable build prompts (geomatrix-grade). Fire them **in order** — each has an objective, the real files it touches, the work, and a verification gate. |

---

## The build prompts (fire in order)

The order is non-negotiable. Populating 5,000 city pages (Prompt 01) before the static-render
fix (Prompt 00) produces 5,000 pages no AI engine can read.

| # | Prompt | Owns | Gate |
|---|---|---|---|
| **00** | [`00-static-render-and-discovery.md`](./prompts/00-static-render-and-discovery.md) | 🔴 **Release blocker.** Prerender/SSG so content + JSON-LD ship in static HTML; `robots.txt` AI-crawler allow-list; templated `Sitemap:`; `llms.txt`. | A built area URL contains H1 + body + `<script type="application/ld+json">` **with JS disabled**. |
| **01** | [`01-geo-data-template-canada-usa.md`](./prompts/01-geo-data-template-canada-usa.md) | The all-Canada / all-US-states geo dataset, open-data ingestion, the geo-hierarchy model, nearest-N/adjacency, and the **4-of-8 uniqueness gate**. | Page-count math stated; gate skips/`noindex`es every page that can't clear ≥4 local signals. |
| **02** | [`02-maps-integration-and-geo-schema.md`](./prompts/02-maps-integration-and-geo-schema.md) | Static-first Maps facade (CWV-safe), `areaServed`/`GeoCircle`/`hasMap`/`Organization`+`sameAs` in the graph, static-map LCP poster. | Map never costs initial load; graph validates; `areaServed` resolves to the page's geography. |
| **03** | [`03-areas-page-content-schema-eeat.md`](./prompts/03-areas-page-content-schema-eeat.md) | Page body upgraded for AI extraction (answer-first, question-H2s, local FAQ), E-E-A-T, reviews-in-city, freshness layer. | Snippet/AI-extractable structure; `speakable` selectors resolve; "Updated {Month} 2026" visible. |
| **04** | [`04-bilingual-canada-hreflang.md`](./prompts/04-bilingual-canada-hreflang.md) | EN/FR Canada: distinct `/fr` URLs, sitemap-method hreflang (`en-ca`/`fr-ca`/`x-default`), intent-translated copy. | Bidirectional + self-referencing hreflang; canonical agrees with hreflang. |
| **05** | [`05-per-business-remix-runbook.md`](./prompts/05-per-business-remix-runbook.md) | The repeatable "new client = new config + proof sheet, zero code change" runbook + the doorway self-audit ship gate. | A fresh remix builds green, passes the doorway self-audit, and is correct for the new business. |
| **06** | [`06-local-blog-engine-canada-usa.md`](./prompts/06-local-blog-engine-canada-usa.md) | The local-blog engine that feeds Areas + Maps: penalty-safe cost/permit/neighborhood/seasonal/case-study clusters, the intent bridge, schema-in-static-HTML, scheduled publishing. Fire after 00 + 01. | A built `/blog/{slug}` shows H1 + body + `Article`/`FAQPage` JSON-LD **with JS disabled**; every spoke bridges to a hub; gate + cadence enforced. |

---

## The one principle to remember

> **Each location page must be an independent ranking asset that is genuinely useful to a
> person in that town — not a find-and-replace clone that exists only to rank.**

Scale is a liability, not an asset. Build the *fewest* pages you can make genuinely useful,
each carrying real local data, each statically rendered, each linked from a hub. That single
discipline is the entire difference between a ranking geo-network and a manual action.

---

*Compiled to the Victorious-SEO × geomatrix × Local-SEO-Architect standard. Last updated: 2026-06.*
