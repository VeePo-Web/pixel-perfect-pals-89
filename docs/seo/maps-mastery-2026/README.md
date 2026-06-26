# Maps Integration & National-Scale Mastery (2026-06)

> **The freshest, Maps-integration-focused and national-scale-focused pass** on turning this repo's **Areas We Serve + Maps + Blog** systems into a **drop-in, data-swappable template** that scales to **all of Canada and all 50 US states** and ranks #1 in **both** Google local/organic **and** AI search.
>
> **Status: RESEARCH + STRATEGY + PROMPTS ONLY. No `src/` code has been changed.** These documents are the specification a later build executes (via the prompts).
>
> Compiled 2026-06 from fresh, cross-checked web research. Every factual claim is sourced in `research/`.

---

## Why this package exists

The user asked for *truly world-class SEO + AI-SEO for Maps integrations on "Areas We Serve" pages and local blogs*, turned into a reusable template for **all of Canada and then all the states**. This package answers exactly that, with newly-sourced 2026 evidence, and is sequenced around the two things that decide success: **Maps-integration done right** and **national scale done safely**.

It complements (does not replace) the earlier `docs/seo/areas-maps/` and `docs/seo-templates/` packages — see the **canonical-source rule** in `reports/00-MASTER-STRATEGY.md` §6.

---

## The five-line thesis

1. **Two games at once:** Google local/organic ranking **and** AI citation (GEO/AEO). Overlap is partial and shrinking — engineer for both.
2. **Static HTML or you're invisible to AI.** GPTBot/OAI-SearchBot/ClaudeBot/PerplexityBot don't run JS. Content + JSON-LD must be in the initial HTML. *(The current template's `useEffect`-injected schema fails this.)*
3. **The map is UX/context; the schema is the signal.** Render the map as a CWV-safe **facade**; put SEO/AI weight in static `Service`/`areaServed`/`hasMap`/`sameAs` JSON-LD.
4. **"Template for all of CA + US" ≠ "a page for every town."** Ship the geographic **scaffold** + a **publish gate** (≥4-of-8 local signals + ≥1 first-party element); a thin page sinks the whole domain under Google's scaled-content/doorway policy.
5. **GBP is the engine, the website is the answer layer, the blog is the citation engine** — wired together by the intent bridge, NAP-identical everywhere.

---

## Folder map

```
maps-mastery-2026/
├── README.md                                  ← you are here
├── research/                                  ← 8 cited evidence dossiers (2026-06)
│   ├── 01-local-maps-ranking.md
│   ├── 02-map-embed-geo-schema-technical.md
│   ├── 03-ai-geo-aeo-local.md
│   ├── 04-national-geo-data-scaffold-canada-usa.md
│   ├── 05-local-blog-for-maps.md
│   ├── 06-competitor-serp-teardown.md         ← deep-dive: what actually ranks #1
│   ├── 07-national-data-sourcing-playbook.md  ← deep-dive: exact datasets + endpoints
│   └── 08-gbp-optimization-deep-dive.md       ← deep-dive: the GBP engine
├── reports/                                   ← 6 synthesized master specs
│   ├── 00-MASTER-STRATEGY.md                  ← read first
│   ├── 01-MAPS-INTEGRATION-PLAYBOOK.md
│   ├── 02-NATIONAL-SCALE-TEMPLATE-SPEC.md
│   ├── 03-QA-SHIP-GATES.md
│   ├── 04-JSON-LD-SCHEMA-COOKBOOK.md          ← copy-paste validated schemas
│   └── 05-BLOG-CONTENT-PLAYBOOK.md            ← 50 titles + keyword matrix + cadence
└── prompts/                                   ← 9 executable build prompts (in order)
    ├── 00-orchestration.md
    ├── 01-static-render-and-discovery.md      ← release blocker
    ├── 02-national-geo-data-scaffold.md
    ├── 03-maps-integration-facade-and-schema.md
    ├── 04-areas-page-content-eeat-ai.md
    ├── 05-local-blog-engine.md
    ├── 06-cwv-hardening.md
    ├── 07-per-business-remix-runbook.md
    └── 08-ai-citation-and-entity-hardening.md
```

## Reading order

1. `reports/00-MASTER-STRATEGY.md` (thesis, scoring model, current-vs-target gap, non-negotiables)
2. `reports/01-MAPS-INTEGRATION-PLAYBOOK.md` (the Maps-specific spec)
3. `reports/02-NATIONAL-SCALE-TEMPLATE-SPEC.md` (all-CA + all-US scaffold + publish gate)
4. `reports/03-QA-SHIP-GATES.md` (the pass/fail gates)
5. `reports/04-JSON-LD-SCHEMA-COOKBOOK.md` (copy-paste schemas) + `reports/05-BLOG-CONTENT-PLAYBOOK.md` (titles + cadence)
6. `prompts/00`–`08` (executable build, in order — **not yet**)
7. `research/01`–`08` (the underlying evidence, cited)

> **Deep-dive addendum (2026-06):** dossiers `06`–`08` and reports `04`–`05` were added in a second research pass — a competitor/SERP teardown of what actually ranks #1, a hands-on national data-sourcing playbook (exact datasets + endpoints + field maps), a GBP optimization deep-dive, a copy-paste JSON-LD cookbook, and a 50-title blog content playbook.

## The non-negotiables (carried into every prompt)

- Gate before you generate (≥4-of-8 + ≥1 first-party).
- One keyword → one URL (no cannibalization).
- Static-render everything (verify with JS off).
- NAP byte-identical everywhere.
- Review **velocity** > review **count**; never stall.
- No self-serving `aggregateRating`/`review`.
- Honest `lastmod` + visible "Updated {Month} 2026".
- Information gain, not word count.
- The map is a **facade**; `geoRadius` is **metres**.
- Data-driven, trade-agnostic — all copy from one config/data source.

---

*Maintainer note: when newer dated evidence lands, add a dossier to `research/`, bump the date, and update the canonical-source rule in `reports/00` §6. Never edit older research in place — supersede it with a dated note so the evidence trail stays intact.*
