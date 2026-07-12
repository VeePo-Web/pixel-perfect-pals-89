# Alberta — World-Class "Areas We Serve" Location Content (Fable-5 depth build)

> **Companion to `README.md` (the Database Expansion Ledger).** That ledger tracks the app-integrated
> batch rollout into `src/data/locations/alberta.ts`. **This file documents a parallel deep-content
> pass** built with the Universal Location-Page Architect megaprompt
> (`../04-fable5-per-province-megaprompt.md`, `../05-universal-location-page-builder-fable5.md`) to the
> §10 depth bar. **Mode A** — grounded on `alberta_master_seo_database_OPTIMIZED.xlsx` (1,912 rows).
> Business copy stays single-curly `{TOKENS}`; every location fact is real and grounded.
>
> **Reconciliation note:** the two builds agree on the gate (ledger: 97 publishable; this build: 95 —
> the 2-row gap is Bearspaw + Redwood Meadows, held here because their populations are estimates, not
> census counts). This build's per-page content is written to the megaprompt depth bar (unique hook,
> ≥4 real signals, ≥1 info-gain, question-format FAQs) and lives as portable JSON in `data/` for import
> into the app dataset.

## Live-app integration (done)

All 95 towns are integrated into the live app. The 75 that weren't already in Batch 1 were
transformed into token-free `Community` objects (the app's convention: geographic intelligence only —
the trade/business copy is applied at render from `src/config/template/remix-variables.ts`, and FAQs
are built by `buildFAQs()`), then appended to `AB_COMMUNITIES` in
[`src/data/locations/alberta.ts`](../../../../src/data/locations/alberta.ts). `shortDescription` comes
from the token-free `Entity_Description`; `fullDescription` is the token-free geographic prose (all
`{TOKEN}` and first-person service sentences stripped); `streets`/`landmarks` are extracted only from
the grounded prose (never invented — empty where none are grounded). Verified: `tsc --noEmit` clean,
sitemap regenerated (95 Alberta community routes under `/areas-we-serve/{region}/{slug}`), and the
6 remaining preflight failures are all pre-existing brand/template rails (BookingModal, footer NAP,
Privacy/Terms, WCAG) unrelated to this data.

## Pipeline

1. **Load + defect sweep** — 1,912 rows, 4 sheets. **0 duplicate slugs, 0 `{{}}` double-curly** (clean in
   source). Fill: coords 1,788/1,912; real census population 142/1,912.
2. **Unified re-score** — network-comparable formula (§4B), hubs = **Calgary + Edmonton**, km, haversine.
3. **Publish gate** — `unified ≥ 50 AND real coords AND real census population AND Verified`, then
   ≥4-of-8 signals + ≥1 info-gain enforced at generation. **95 pass** (this build).
4. **Region fact bundles** — computed once per region (10 in the BUILT tier); see `alberta-region-bundles.md`.
5. **Generate + self-verify** — batches by region, highest-score first; QA validator enforces word counts,
   token integrity, unique geo-alts, unique Short_Description openers, and `{PHONE}` CTA endings.
6. **Assemble** — dataset + image manifest + sitemap fragment + coverage ledger in `data/`.

## Files this build adds

| File | What it is |
|---|---|
| `data/alberta-locations.json` | Deep-content location rows: full world-class copy, real geo, structured backlinks (`Nearby_Links`, `Link_Up_Region`, `Blog_Links`, service-page pattern), image + schema fields, honest `Verification_Status`. |
| `data/alberta-image-manifest.json` | Per-location hero image: two-layer geographic alt, geo filename, tier (`flag-fallback` until real/region photos sourced), license slot, EXIF geotag. |
| `data/sitemap-areas-alberta.xml` | Sitemap fragment: area hub + region pages + BUILT locations, honest `<lastmod>`, `priority = unified/100`. `{BRAND_URL}` stays a token. |
| `data/alberta-coverage-ledger.json` | All 1,912 places, each in exactly one bucket (BUILT / DEFERRED + reason) — the INTENDED = BUILT + DEFERRED proof. |
| `alberta-blog-matrix.md` | Phase-3 hub-and-spoke blog topic matrix. |
| `alberta-region-bundles.md` | The 10 region fact bundles (climate, geology, economy, building stock, landmarks). |
| `AUDIT.md` | Phase-4 self-audit: coverage reconciliation, defect sweep, distribution, sample rows. |

## Coverage math (this build)

```
INTENDED  = 1,912 enumerated Alberta places
BUILT     =    95 publishable (unified ≥ 50 + real coords + real census pop + Verified)
DEFERRED  = 1,817 (each with a one-line reason in the ledger):
            1,672  score <50, no census population (locality/hamlet tail)
              116  score <50 + missing/synthetic coordinates
               19  score <50
               10  score ≥50 but blocked by synthetic coords or estimated (non-census) population
```

DEFERRED ≠ deleted: held for real geo/population backfill or shipped `noindex` (out of the sitemap) — the
doorway/scaled-content firewall.

## Licensing

- Single-curly `{TOKENS}` for all business copy; `{LOCATION}`/`{REGION}` written literally.
- Canadian **FSA only** (first 3 postal chars) — never full 6-char codes (Canada Post proprietary).
- Source geo under **Open Government Licence – Canada** (StatCan / NRCan CGNDB): consuming sites must show
  *"Contains information licensed under the Open Government Licence – Canada."*
- `geoRadius` in metres. Hero images `flag-fallback` (metadata describes the PLACE, never the flag).
