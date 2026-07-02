# Nova Scotia — Database Expansion Ledger

> Spreadsheet #1 of 6 (`nova_scotia_master_seo_database_OPTIMIZED.xlsx`). The **complete
> inventory** of this spreadsheet — all 807 locations and all 9 regions, unified-scored and
> publish-gated — is committed in [`ns-full-manifest.json`](./ns-full-manifest.json).
> Batches ship through `docs/seo/master-databases/04-fable5-batch-expansion-prompt.md`.

## Inventory (from the manifest — the whole spreadsheet is on record)

| | |
|---|---|
| Total locations | **807** |
| Publishable (unified score ≥50 + real census pop + verified coords) | **249** |
| Held for later expansion / noindex | 558 |
| Regions | **9** — Halifax Metro (228) · Cape Breton (191) · South Shore (78) · Annapolis Valley (76) · Northumberland Shore (57) · Fundy Shore (57) · Central Nova Scotia (54) · Chignecto (36) · Eastern Shore (30) |
| Batch size | 20 publishable locations, unified-score order |
| Batches to complete the publishable tier | 13 (12×20 + 1×9) |

## Shipped batches

### Batch 1 — 2026-07-01 · top 20 by unified score · 20/20 Verified

Each location shipped as a community page (`/areas-we-serve/<region>/<slug>`) **plus** one
geo-bound local-guide blog post under the `nova-scotia-guides` hub. All 9 regions were defined
up front (region pages live for all; community coverage fills in batch by batch).

| # | Location | Score | Region | Signals |
|---|---|---|---|---|
| 1 | Halifax | 77.3 | Halifax Metro | 12 |
| 2 | Cape Breton (CBRM) | 73.2 | Cape Breton | 16 |
| 3 | Sydney | 70.4 | Cape Breton | 13 |
| 4 | Dartmouth | 67.5 | Halifax Metro | 20 |
| 5 | West Hants | 67.3 | Annapolis Valley | 26 |
| 6 | East Hants | 66.3 | Central Nova Scotia | 12 |
| 7 | Kings County | 66.2 | Annapolis Valley | 15 |
| 8 | Colchester County | 65.9 | Central Nova Scotia | 14 |
| 9 | Bedford | 65.5 | Halifax Metro | 16 |
| 10 | Lunenburg District | 65.3 | South Shore | 14 |
| 11 | Lower Sackville | 65.2 | Halifax Metro | 15 |
| 12 | Cole Harbour | 65.2 | Halifax Metro | 14 |
| 13 | Glace Bay | 65.1 | Cape Breton | 15 |
| 14 | Queens | 64.3 | South Shore | 20 |
| 15 | Cumberland County | 63.9 | Chignecto | — |
| 16 | Sydney Mines | 63.6 | Cape Breton | — |
| 17 | North Sydney | 63.5 | Cape Breton | — |
| 18 | Downtown Halifax | 63.5 | Halifax Metro | — |
| 19 | New Waterford | 63.4 | Cape Breton | — |
| 20 | Inverness County | 63.4 | Cape Breton | — |

Artifacts: `src/data/locations/nova-scotia.ts` · `src/data/blog/nova-scotia-posts.ts` ·
hub `H1 nova-scotia-guides` in `src/lib/hubRegistry.ts` · sitemap auto-regenerated.

## Next

**Batch 2** = manifest rows with `batch: 2` (ranks 21–40 of the publishable tier). Run the
harness in `04-fable5-batch-expansion-prompt.md` §2 unchanged; regions already exist, so new
communities slot in and the nearest-communities graph is recomputed over the grown published set.
After NS batch cadence is established, the next database is **Los Angeles** (US variant), then
Alberta → BC → Ontario → Saskatchewan per the pilot order.
