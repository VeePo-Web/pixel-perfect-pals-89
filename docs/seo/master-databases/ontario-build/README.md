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
│  ├─ ontario_master_upgraded.csv   242 built rows, full 51-column upgraded schema
│  ├─ content-all.jsonl             Source content for all 242 built pages (one JSON object per page)
│  ├─ coverage-ledger.csv           ALL 2,515 places bucketed (BUILT_VERIFIED/BUILT_NEEDS_REVIEW/DEFERRED_*)
│  ├─ image-manifest.csv            Per-image tier + license rule + two-layer alt formula
│  └─ flagged-rows.csv              Rows flagged out during assembly (currently 0)
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

## Status

- **Completeness audit passed:** all **414** Ontario census municipalities are in the spreadsheet (0 missing).
  Full enumeration = **2,515 places** (414 municipalities + 82 reserves + 218 hamlets + 1,197 localities +
  604 neighbourhoods + 1 repaired split).
- **Enumerated & gated:** 2,515 → **242 publishable** (Tier A 25 · B 64 · C 153) + **2,273 deferred** (`noindex`).
- **Built to the world-class bar:** **all 242 publishable pages, 0 audit defects** — **223 Verified** (published,
  in sitemap) + **19 Needs_Review** (built, held out; mostly coordinate-driven, now corrected — see the report).
- **Coordinate corruption fixed:** the source sheet/pickle carried wrong lat/lng for many smaller
  municipalities; all 242 built rows were **re-geocoded and validated**, and Nearby-Areas links recomputed
  (0 orphans, 0 dangling). See `AUDIT-REPORT.md` §4b and `pipeline/geocoded-all.json`.

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

## Regenerate / extend

All 242 publishable rows are built (`pipeline/batches-out/`). To rebuild the deliverables from source content:

1. `node audit.js` — spec-compliance sweep (must be **0 defects**).
2. `node apply-geocode.js` — apply corrected coordinates (`geocoded-all.json`) and recompute Nearby-Areas links.
3. `node assemble.js && node build-schema.js` — regenerate CSV, image manifest, JSON-LD, sitemap, robots.

To promote a `Needs_Review` row: confirm its facts, set `verification:"Verified"` in its `batches-out` row,
re-run steps 1–3 (it then enters the sitemap). To ever build a deferred locality/neighbourhood, **re-geocode it
first** — the source coordinates for those are unreliable (see `AUDIT-REPORT.md` §4b).

## Core laws (never violated)

Ground every fact · services are `{TOKENS}`, locations are real · depth over volume (thin pages are deferred,
not shipped) · one place → one URL → one primary keyword · answer-first · static-render reality · honest
freshness · `geoRadius` in metres · Canadian postal data limited to FSA (first 3 chars) · OGL-Canada
attribution in the footer.
