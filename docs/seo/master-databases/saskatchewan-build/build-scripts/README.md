# Reproducibility scripts

Deterministic pipeline that produced this build. Run order (Node + `xlsx` package; CGN download required):

1. **Grounding sources** (not committed — third-party, fetch fresh):
   - `saskatchewan_master_seo_database_OPTIMIZED.xlsx` + `sk_municipalities_clean.csv` — from the repo's
     committed `General Provinces/SASK/` zip (StatCan 2021/2016, OGL-Canada).
   - `cgn_sk_csv_eng.csv` — NRCan Canadian Geographical Names, Saskatchewan (OGL-Canada). Download:
     `https://ftp.maps.canada.ca/pub/nrcan_rncan/vector/geobase_cgn_toponyme/prov_csv_eng/cgn_sk_csv_eng.zip`
2. **`rebuild.js`** — re-grounds every row against CGN (name+type join), recomputes hub distances by
   haversine, reassigns regions geographically, re-scores with the unified formula, applies the publish
   gate, and writes `sk_built_final.json` (184) → tier-1 floor → `sk_tier1.json` (130) + `sk_deferred_final.json`.
3. **`curation.js`** — hand-curated, grounded fact snippets for flagship cities + notable towns (facts
   traceable to the sheet's curated Entity fields and known SK geography). No invented facts.
4. **`generate.js`** — composes the full per-location row (Entity, AI snippet, About, Local Facts,
   Info-gain, FAQs, keywords, nearby links, image metadata) from the grounded fields; writes `locations/*.json`.
5. **`validate.js`** — self-check gate: word counts, `Call {PHONE}` endings, `{{` defects, slug/alt/
   keyword/opener uniqueness, signals ≥4, title length. Must print `FAILS 0`.

Content is niche-agnostic: all business copy is single-curly `{TOKENS}`; only real place facts are literal.
