# SEO & AI-SEO Template — MASTER INDEX

> **What this is.** The single entry point to the complete research + build-prompt package for turning
> this repo's **Areas-We-Serve** and **Blog** systems into **drop-in, data-swappable templates** that
> scale to **all of Canada and all 50 US states** and rank at the top of **both** Google and AI search
> (Google AI Overviews / AI Mode, ChatGPT, Perplexity, Claude, Gemini, Copilot).
>
> **Status: RESEARCH + PROMPTS ONLY.** No application/template code has been changed. These documents are
> the specification you (or an agent) execute later via the build prompts.
>
> Compiled 2026-06. Read this file first.

---

## 0. The package has two trees — here's how they relate

There are two documentation trees in this repo. They overlap by design but play different roles. **This
index is the authority on which doc to trust for what.**

| Tree | Role | Read it when |
|---|---|---|
| **`docs/seo/`** | The **internal masterplan** — north-star strategy, deep research, the worked gold-standard example, the 2026 corrections, the executable Areas+Maps build phases, and (in `research-2026-field-update/`) the latest dated field research. | You are the team **building** the template and want the full strategy + current evidence. |
| **`docs/seo-templates/`** | The **external remix spec** — a tighter, self-contained research + prompt set aimed at *applying* the template to a real business with zero code change. | You are **remixing** the finished template onto a new client. |

**Canonical-source rule (resolve any conflict with this order):**
1. `docs/seo/research-2026-field-update/` — newest dated evidence (2026-06). **Wins on any factual conflict.**
2. `docs/seo/DEEPDIVE-5-2026-UPDATE.md` — the prior correction layer. Supersedes the masterplans where it says so.
3. `docs/seo/BLOG-AISEO-MASTERPLAN.md` + `docs/seo/areas-maps/AREAS-MAPS-MASTERPLAN.md` — the core strategy.
4. `docs/seo-templates/` — equivalent, tighter restatements; defer to `docs/seo/` on any disagreement.
5. **Code is ground truth for *what exists today*:** `docs/seo-templates/reference/current-implementation-map.md`.

> The only known historical drift between the trees was the **`llms.txt`** verdict. It is now settled:
> **build it only if trivially cheap; expect ~zero AI-search lift** (see field-update brief 03 §4).

---

## 1. The thesis in five lines

1. **Two search games, won at once.** Classic Google ranking (proximity · prominence · relevance · schema
   · links) **and** AI-citation (GEO/AEO — being *quoted inside* an AI answer). They overlap only partially
   (AI Overviews ↔ Google top-10 ≈ 38%; standalone assistants ≈ 8–12%) — engineer for both.
2. **The quality model is existential.** Google's **scaled-content-abuse** + **doorway** policies + the 2024–2025
   core/spam updates mean weak thin pages drag the **whole domain** down. The template's #1 job is a **publish
   gate**, not a page generator.
3. **"Template for all of Canada + all states" ≠ "a page for every town."** Ship the complete geographic
   *scaffold* + the *uniqueness engine + publish gate*; per-business activation selects only the real,
   service-relevant areas and enriches each with first-party local signals.
4. **Static HTML or you're invisible to AI.** GPTBot / OAI-SearchBot / ClaudeBot / PerplexityBot **do not run
   JavaScript** (confirmed, 500M+ fetches). Content + all JSON-LD must be in the initial server HTML. Hard blocker.
5. **Two content layers feed each other.** Transactional matrix pages (`{service} in {city}`) win commercial
   clicks + (via GBP) the local pack; an informational blog/FAQ cluster wins citations and links *down* into the
   matrix. They are deliberately wired together (the "intent bridge").

---

## 2. Reading order

**To understand the strategy (build team):**
1. `docs/seo/INDEX.md` ← you are here
2. `docs/seo/research-2026-field-update/00-README.md` → briefs `01`–`04` (latest evidence)
3. `docs/seo/areas-maps/AREAS-MAPS-MASTERPLAN.md` (the Areas engine, phased)
4. `docs/seo/BLOG-AISEO-MASTERPLAN.md` (the Blog engine, phased)
5. `docs/seo/DEEPDIVE-5-2026-UPDATE.md` (prior corrections)
6. `docs/seo/REFERENCE-ARTICLE-gold-standard.md` (a fully worked spoke article: data → HTML → JSON-LD)

**To understand the code you're templating:**
- `docs/seo-templates/reference/current-implementation-map.md`

**To execute the build (in order — NOT yet):**
| # | Prompt | Does |
|---|---|---|
| 0 | `docs/seo-templates/prompts/00-master-orchestration-prompt.md` | Order of operations, branch protocol, guardrails |
| 1 | `docs/seo/areas-maps/prompts/00-static-render-and-discovery.md` | **Release blocker** — SSG/prerender + robots + sitemap + llms |
| 2 | `docs/seo/areas-maps/prompts/01-geo-data-template-canada-usa.md` | Geo scaffold (all CA + US) + build-time 4-of-8 uniqueness gate |
| 3 | `docs/seo/areas-maps/prompts/02-maps-integration-and-geo-schema.md` | Static-first map facade + `areaServed`/`hasMap`/`sameAs` graph |
| 4 | `docs/seo/areas-maps/prompts/03-areas-page-content-schema-eeat.md` | Answer-first content, reviews, freshness, `speakable` |
| 5 | `docs/seo/areas-maps/prompts/06-core-web-vitals-hardening.md` | **NEW** — INP/LCP/CLS budget for matrix + map at scale |
| 6 | `docs/seo/areas-maps/prompts/07-entity-offsite-and-review-velocity.md` | **NEW** — entity `sameAs`, directories, review-velocity ops |
| 7 | `docs/seo/areas-maps/prompts/08-ai-local-pack-readiness.md` | **NEW** — adapt to AI Local Packs + AI-citation of local pages |
| 8 | `docs/seo-templates/prompts/02-blog-template-build-prompt.md` | Topical-authority blog engine (+ Prompts A–V, see masterplans) |
| 9 | `docs/seo/areas-maps/prompts/04-bilingual-canada-hreflang.md` | Bilingual Canada EN/FR (`en-ca`/`fr-ca`/`x-default`) |
| 10 | `docs/seo-templates/prompts/04-ai-seo-hardening-prompt.md` | Site-wide AI-crawler + schema + sitemap hardening |
| 11 | `docs/seo/areas-maps/prompts/05-per-business-remix-runbook.md` + `docs/seo-templates/prompts/03-business-data-population-prompt.md` | **Per project** — swap in a real business + real areas |

**Before any page ships:** every page must pass `docs/seo-templates/reference/qa-ship-gates.md`.

---

## 3. The non-negotiables carried into every prompt

- **Gate before you generate** — ≥ 4 of 8 local-specificity signals + ≥ 1 first-party element, or the page is not built.
- **One keyword → one URL** — no cannibalization across service / location / matrix / blog tiers (blog = informational anchors, money/area pages = transactional anchors).
- **Static-render everything** — verify HTML + JSON-LD present with JS disabled.
- **NAP byte-identical everywhere** — page, footer, schema, GBP, citations (now an AI-trust signal too).
- **Show the address, don't hide it** (for SABs with a real one — 2025 "near-me" study; see field-update 01).
- **Review *velocity* > review *count*** — never let review flow stall (an 18-day pause measurably dropped rankings).
- **No self-serving `aggregateRating`/`review`** schema on your own business (Google's stated rule).
- **Honest `lastmod` + visible "Updated {Month} 2026"** tied to real changes; date-faking is penalized.
- **Information gain, not word count** — every article needs ≥1 element AI can't replicate (original local data/photo/quote).
- **Data-driven, trade-agnostic** — all copy flows from one remix/config source, never hardcoded.

---

## 4. Document map (every file, one line)

### `docs/seo/` — internal masterplan
- `INDEX.md` — this file.
- `BLOG-AISEO-MASTERPLAN.md` — phased blog engine (Prompts A–Q) + local-service playbook.
- `DEEPDIVE-5-2026-UPDATE.md` — 2026 corrections + Prompts R–V (scaled-content defense, author entity, conversion, listicle/original-data).
- `REFERENCE-ARTICLE-gold-standard.md` — worked spoke: authoring data → semantic HTML → static JSON-LD.
- `areas-maps/AREAS-MAPS-MASTERPLAN.md` — phased Areas+Maps engine (Phases 0–5) + executive diagnosis.
- `areas-maps/README.md` — areas-maps kit index.
- `areas-maps/research/01`–`06` — service-area SEO · local pack · AI-local · maps/geo-schema · programmatic-scale geo-data · blog-for-local.
- `areas-maps/prompts/00`–`05` — static-render · geo-data · maps-schema · content-EEAT · bilingual · per-business runbook.
- `areas-maps/prompts/06`–`08` — **NEW** CWV hardening · entity/off-site/review-velocity · AI-local-pack readiness.
- `research-2026-field-update/00`–`04` — **NEW** dated 2026-06 verification + extension layer (read first).

### `docs/seo-templates/` — external remix spec
- `README.md` — remix-spec index + thesis.
- `research/01`–`03` + `sources.md` — areas · blog topical authority · AI-SEO/GEO/AEO · consolidated sources.
- `reference/current-implementation-map.md` — exact map of the code today.
- `reference/qa-ship-gates.md` — the pass/fail publish gates (Gates A–D).
- `prompts/00`–`04` — orchestration · areas build · blog build · business-data population · AI hardening.

---

*Maintainer note: when a new field-update brief lands, add it to `research-2026-field-update/`, bump the date,
and update §0's canonical-source rule. Never edit older research in place to "correct" it — supersede it with a
dated note so the evidence trail stays intact.*
