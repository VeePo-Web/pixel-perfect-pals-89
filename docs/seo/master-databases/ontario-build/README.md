# Ontario "Areas We Serve" — World-Class Location-Page Build

Niche-agnostic, AI-citable local-SEO location pages for **Ontario, Canada**, built in **Mode A** from the
province's master SEO database. All business copy stays single-curly `{TOKENS}` for per-business
find-and-replace; only real place facts are literal. Ground everything, gate hard, invent nothing.

**Start here:** [`AUDIT-REPORT.md`](AUDIT-REPORT.md) — coverage math, repairs, defect sweep, schema validation.

## What's here

```
ontario-build/
├─ AUDIT-REPORT.md              Build & audit evidence (INTENDED = BUILT + DEFERRED, defect sweep)
├─ data/
│  ├─ ontario_master_upgraded.csv   25 built flagship rows, full 51-column upgraded schema
│  ├─ content-flagships.jsonl       Source content for the 25 built pages (one JSON object per page)
│  ├─ coverage-ledger.csv           ALL 2,515 places bucketed with a one-line reason (nothing dropped)
│  ├─ image-manifest.csv            Per-image tier + license rule + two-layer alt formula
│  └─ flagged-rows.csv              Rows flagged during generation (currently 0)
├─ schema/
│  ├─ jsonld-graphs.jsonl           Per-page JSON-LD @graph (static, token-preserving) — 25 validated
│  ├─ sample-page-toronto.html      Static-render proof: H1 + body + <a href> + ld+json, no JS
│  ├─ sitemap-areas-ontario.xml     Segmented sitemap, honest lastmod, BUILT URLs only
│  └─ robots.txt                    Allows Googlebot, Bingbot, OAI-SearchBot, ClaudeBot, PerplexityBot, GPTBot…
└─ pipeline/                        The reusable, resumable engine
   ├─ content-spec.md               The per-row generation contract (the law for writing a page)
   ├─ region-bundles.md             The 11 region fact bundles (computed once, shared grounding)
   ├─ batch-index.json              25 region batches (region, ids, tiers)
   ├─ batches-in/                   25 ready grounding files — each row pre-scored, neighboured, tiered
   ├─ batches-out/                  Generated content (batch-flagships.jsonl built; others pending)
   └─ *.js                          profile → prep2 → neighbors-clean → author-* → audit → assemble → build-schema
```

## Status (honest snapshot)

- **Enumerated & gated:** 2,515 places → **242 publishable** (Tier A 25 · B 64 · C 153) + **2,273 deferred** (`noindex`).
- **Built to the world-class bar this pass:** **25 flagship pages** (every major Ontario city), **0 audit defects**.
- **Remaining 217 publishable rows:** prepared and **resumable** from `pipeline/batches-in/`. Their generation
  was interrupted by an **account monthly-spend limit** (the subagent batches were terminated by the API before
  writing). They re-run with no rework — see below.

## The build pipeline (Node.js, uses `xlsx`)

```
profile.js         Parse the .xlsx, defect scan, unified re-score, gate counts
prep2.js           Apply source repairs, classify tiers, compute neighbours, emit batches-in/ + coverage-ledger
neighbors-clean.js Recompute Nearby Areas same-region (drops corrupted-coord cross-region links)
extract-tierA.js   Pull the 25 Tier-A grounding facts
author-*.js        Author the 25 flagship pages (the worked reference for the content bar)
patch-flagships.js Expand bodies past 400w + trim metas (already applied)
audit.js           Spec-compliance sweep over batches-out/*.jsonl (word counts, tokens, uniqueness, CTAs…)
assemble.js        Merge content → ontario_master_upgraded.csv + image-manifest.csv
build-schema.js    Emit per-page JSON-LD @graph, sample static HTML, sitemap, robots.txt
```

## To generate the remaining publishable rows

1. For each `pipeline/batches-in/batch-0NN-*.json`, write one JSON object per row to
   `pipeline/batches-out/batch-0NN.jsonl`, following **`pipeline/content-spec.md`** exactly and using only the
   matching region section of **`pipeline/region-bundles.md`** for regional facts. Tier A `author-*.js` files
   are the worked example of the bar. Tier C rows that cannot reach ≥4 certain local signals → `FLAG_THIN`
   (skip, do not pad with invention).
2. `node audit.js` — fix until **0 defects**.
3. `node assemble.js && node build-schema.js` — regenerates the CSV, manifest, schema, sitemap and robots
   across every built row.

## Core laws (never violated)

Ground every fact · services are `{TOKENS}`, locations are real · depth over volume (thin pages are deferred,
not shipped) · one place → one URL → one primary keyword · answer-first · static-render reality · honest
freshness · `geoRadius` in metres · Canadian postal data limited to FSA (first 3 chars) · OGL-Canada
attribution in the footer.
