# British Columbia Build — Run State & Resume Instructions

> **COMPLETE + CENSUS-EXPANDED (2026-07-12).** Enumeration expanded from the 480-row spreadsheet to the
> full **1,986-place BC census** (GeoNames CC-BY merged/deduped vs the sheet). Gated: **194 built &
> Verified** (181 original + 13 new distinct communities), 1 Needs_Review (BC-0358), 1,791 deferred —
> reconciles exactly. Final results: **`AUDIT-REPORT.md`**; deliverables in **`deliverables/`** (upgraded
> xlsx now carries all 1,986 rows). Census pipeline: `enumerate.js → merge_census.js → score_universe.js →
> refine_gate.js → split_suburbs.js → finalize_new.js → assemble2.js → build_artifacts2.js`. The notes
> below record the original 182-row run (resumed after Fable-5 spend-limit interruptions). Reusable
> template for the next province.

## What is complete (Phases A–C, deterministic — do NOT redo)

- **Mode A** on `General Provinces/BC/bc_master_seo_database_COMPLETE.xlsx` (480 rows).
- **Phase A defect sweep:** 0 duplicate slugs · 0 `{{}}` · fill gaps confirmed (50% coords, 42% FSA).
- **Phase B backfill:** 193 coordinates + 20 populations from GeoNames (admin1=02, CC-BY), 3 matching
  passes (exact/alt-name/parenthetical variants, parent-municipality anchoring ≤45 km, exact-unique-in-BC
  unconditional accept). Hub distances (Vancouver 49.2827,-123.1207 · Victoria 48.4284,-123.3656)
  recomputed by haversine for every row with coords. → `bc_rows.json` (all 480 rows, post-A–C fields:
  `Unified_Score`, `Gate_Publishable`, `Defer_Reason`, `_geo_source`, `_pop_source`).
- **Phase C unified score + gate (network formula, hubs Vancouver/Victoria):**
  - **INTENDED 480 = PUBLISHABLE 182 + DEFERRED 298**
  - Deferred reasons: 161 score < 50 · 90 no real census population · 47 no authoritative coords.
  - Bands: 80+: 1 · 65–79: 45 · 50–64: 136 · 35–49: 230 · <35: 68. Top: Metro Vancouver RD 80.6,
    Capital RD 76.8, Vancouver 75.1, Surrey 74.1.
- **Region fact bundles** (12, once per `Parent_Region`): `region_bundles.json`.
- **Grounding bundles** (182, one per publishable row, with real geo + existing factual text + region
  bundle + haversine nearest-5 `NEARBY_AREAS` + `CHILD_PAGES` + `UP_LINK`): `bundles/<ID>.json`.
- **Build order manifest** (score-sorted within region order): `manifest.json`.

## What is partially complete (Phase D)

- Workflow `bc_phase_d_inlined.js` (validated doc-03 prompt + Layer-1 geo alt + Info_Gain_Element,
  paced chunks of 6). Run `wf_d1b712c6-4c4` produced **14/182** rows before the spend limit:
  BC-0001 Vancouver · BC-0002 Surrey · BC-0004 Burnaby · BC-0006 Richmond · BC-0008 Coquitlam ·
  BC-0009 Langley (Township) · BC-0012 Delta · BC-0013 North Vancouver (District) ·
  BC-0015 New Westminster · BC-0019 Maple Ridge · BC-0022 North Vancouver (City) ·
  BC-0027 Metro Vancouver RD · BC-0099 Terrace · BC-0154 Prince Rupert → `out/<ID>.json`.
- **QA on the 14:** all pass (word counts, `{PHONE}` CTA endings, 0 `{{}}`, no tokens in factual
  fields, 5 conversational queries, unique alts, opener diversity, signals ≥ 4). 14 Verified,
  0 Needs_Review. See `qa_report.json` (`missing` lists the 168 remaining IDs).

## How to resume (after raising the spend limit)

1. Copy this folder's `bundles/`, `out/`, `*.json`, `*.js` back to the session scratchpad (or point
   the script's `SCRATCH` const at this folder).
2. Re-invoke the workflow: `Workflow({scriptPath: bc_phase_d_inlined.js})` — or resume
   `wf_d1b712c6-4c4` in the same session. The script skips nothing by itself, so either rely on the
   resume cache or (cheaper, any session) **filter the inlined `manifest` to IDs not present in
   `out/`** before relaunching.
3. When `out/` has 182 files: run `node assemble.js` (validates + merges into
   `bc_rows_upgraded.json`), then build the upgraded xlsx (43-col + `Hero_Image_Alt_Geo`,
   `Info_Gain_Element`, `Signals_Count`), the image manifest (filename
   `{location-slug}-{region-slug}-bc.webp`, Layer-1 geo alt, tier per §6D), and the §8 final audit
   (INTENDED = BUILT + DEFERRED, defect sweeps, 2 full sample rows).

## Standing rules for the remainder (from the megaprompt)

- Services stay single-curly `{TOKENS}`; place facts literal; never invent; uncertain → omit;
  ungroundable → Needs_Review (excluded from publish).
- Deferred ≠ deleted: the 298 deferred rows ship `noindex`/unbuilt, kept out of the sitemap.
- Canadian OGL sources used (StatCan/GeoNames CC-BY noted in `Data_Sources`); site footer must carry
  "Contains information licensed under the Open Government Licence – Canada."
