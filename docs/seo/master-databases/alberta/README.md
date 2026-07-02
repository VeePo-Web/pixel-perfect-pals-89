# Alberta — Database Expansion Ledger

> Spreadsheet #2 in production (`alberta_master_seo_database_OPTIMIZED.xlsx`). The **complete
> inventory** of this spreadsheet — all 1,912 locations and all 12 regions, unified-scored and
> publish-gated — is committed in [`ab-full-manifest.json`](./ab-full-manifest.json).
> Batches ship through `docs/seo/master-databases/04-fable5-batch-expansion-prompt.md`.

## Inventory (from the manifest — the whole spreadsheet is on record)

| | |
|---|---|
| Total locations | **1,912** |
| Publishable today (unified score ≥50 + real census pop + verified coords) | **97** |
| Held (mostly missing census population — Phase-B backfill pending) | 1,815 |
| Phase-A defects | 0 duplicate slugs · 0 double-curly cells |
| Regions | **12** — Rural Alberta¹ (452) · Central Alberta (338) · Northern Alberta (291) · Edmonton Region (209) · Calgary Region (162) · Canadian Rockies (148) · Southern Alberta (128) · Southeast Alberta (101) · Lakeland (28) · Peace (27) · West Country (19) · Wood Buffalo (9) |
| Batch size | 20 publishable locations, unified-score order |
| Batches to complete the current publishable tier | 5 (4×20 + 1×17) |

¹ The spreadsheet's generic `Alberta` Parent_Region (counties, municipal districts, and
unassigned centres like Brooks) maps to the `rural-alberta` region slug.

**The data-quality picture (from `00-system-familiarization` §7):** only ~7% of Alberta rows
carry real census population/postal data — the weakest raw geo data of the six databases. The
publish gate is doing its job: those 1,815 rows stay out of the sitemap until the Phase-B
backfill (StatCan census + CGN coordinates) raises them over the bar. Publishing them now would
be the doorway-page pattern the 2026 research warns against.

## Shipped batches

### Batch 1 — 2026-07-01 · top 20 by unified score

Each location shipped as a community page (`/areas-we-serve/<region>/<slug>`) **plus** one
geo-bound local-guide blog post under the `alberta-guides` hub (H2). All 12 regions defined up
front with API-verified copyright-free hero images.

Calgary 79.4 · Edmonton 78.9 · St. Albert 72.1 · Airdrie 71.8 · Spruce Grove 70.5 ·
Red Deer 70.2 · Leduc 70.1 · Chestermere 69.8 · Fort Saskatchewan 69.8 · Beaumont 69.5 ·
Lethbridge 69.1 · Sherwood Park 67.3 · Cochrane 67.0 · Okotoks 66.8 · Camrose 66.7 ·
Wetaskiwin 66.2 · Stony Plain 64.7 · Lacombe 64.7 · Medicine Hat 64.4 · High River 63.8

Artifacts: `src/data/locations/alberta.ts` · `src/data/blog/alberta-posts.ts` ·
hub `H2 alberta-guides` in `src/lib/hubRegistry.ts` · sitemap auto-regenerated.

## Next

**Batch 2** = manifest rows with `batch: 2` (ranks 21–40: Canmore, Brooks, Strathmore,
Morinville, Devon, …). Longer term, the highest-leverage Alberta work is the **Phase-B geo
backfill** (census population + postal for the 1,815 held rows) — it grows the publishable tier
far more than any single batch.
