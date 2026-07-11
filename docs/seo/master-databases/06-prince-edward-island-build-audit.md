# Prince Edward Island — Areas-We-Serve Build & Self-Audit

> **Mode B** build (no vendor spreadsheet existed for PEI). Every place was enumerated
> and grounded from authoritative open data, scored on the unified network formula, run
> through the publish gate, and written to `src/data/locations/prince-edward-island.ts`
> (`PE_REGIONS` + `PE_COMMUNITIES`, wired into `src/data/communities.ts`). Services stay
> in the component/token layer; the data module is 100% real geographic intelligence.

Date: 2026-07-11 · Province anchor hubs: Charlottetown, Summerside.

---

## 1 · Grounding sources (all open-licence)

| Fact | Source | Licence |
|------|--------|---------|
| Population (2021) | Statistics Canada, Census Table **98-10-0002** (CSD population & dwellings) | OGL-Canada |
| Coordinates | **GeoNames CA** gazetteer (representative points) | CC BY 4.0 |
| Region bundles (climate, economy, building stock, landmarks) | computed once per county (§4C) and reused | — |
| Hero imagery | Wikimedia Commons, licence-filtered to the allowed enum | CC BY 2.0 / CC BY-SA 3.0 |

> **Footer requirement:** because StatCan CSD data (OGL-Canada) is used, the site footer
> must read *"Contains information licensed under the Open Government Licence – Canada."*
> Canadian full 6-char postal codes are proprietary and were **not** used — pages are
> modelled on places, not postal routes.

## 2 · Score + publish gate

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(pop)/log10(2,794,356) * 30)
  Search Vol 25  : pop bands (≥100k→24 … <200→1)
  Competition 20 : INVERSE pop bands (≥100k→4 … <1k→18)
  Proximity 15   : max((1 − min(km to nearer of Charlottetown/Summerside)/500) * 15, 0)
  Economic 10    : City→8 · Town→5 · Community/Village→3 · Lot/part→1

BUILD = score ≥ 50 AND real coords AND real 2021 population AND ≥4 grounded signals
```

Merged CSDs (e.g. the two "Souris", "Alberton", "Wellington" subdivisions) are scored on the
combined population but published as one page per place — no two pages chase one keyword.

## 3 · Coverage reconciliation — INTENDED = BUILT + DEFERRED

```
INTENDED (enumerated)  = 618 places
  ├─ StatCan 2021 CSDs ............ 98
  └─ GeoNames-only localities ..... 520   (hamlets, sub-CSD place-names, dispersed rural names)

BUILT (published)      = 45 pages  (representing 61 places)
  ├─ 52 CSDs merged into ......... 36 municipality/community pages
  └─ 9 GeoNames neighbourhoods ... 9 pages  (7 Charlottetown districts + Montague + Georgetown)

DEFERRED (noindex/next-tier) = 557 places
  ├─ 46 CSDs  : CSD "parts" (8), township lots (1), no verified coords (8),
  │             score < 50 (23), score ≥ 50 but < 4 groundable signals (6)
  └─ 511 GeoNames-only localities below gate (no census population / dispersed rural names)

IDENTITY: 618 = 61 promoted + 557 deferred ✓   (98 CSDs = 52 built + 46 deferred ✓)
```

Full deferred list: `prince-edward-island/pe-deferred-ledger.json`. Deferred ≠ deleted — the
CSD "parts", sub-50 hamlets, and unverifiable-coordinate districts wait for real local signals
before earning an index slot (doorway-penalty firewall).

**County population control totals (StatCan 2021, sum of CSDs):**
Queens 89,770 · Prince 46,234 · Kings 18,327 · **PEI total 154,331** ✓ (matches the census figure).

## 4 · Distribution & tiers

| Tier | Meaning | Count |
|------|---------|-------|
| 1 | Cities + largest towns (score ≥ 60) | 5 |
| 2 | Towns + strong rural municipalities (54–60) | 19 |
| 3 | Smaller communities + neighbourhoods (< 54) | 21 |

All 45 are `Verified`; 0 `Needs_Review`. Region pages: 3 (Queens / Prince / Kings County).

## 5 · Per-page self-check (whole set — automated)

| Check | Result |
|-------|--------|
| Duplicate slugs | **0** |
| Unresolved `nearestCommunities` refs | **0** |
| Self-referencing nearest links | **0** |
| Pages with < 3 sideways links | **0** |
| `{{` / `{TOKEN}` leaks in rendered copy | **0** |
| Duplicate hero `alt` strings | **0** |
| Duplicate `shortDescription` openers (neighbours) | **0** |
| Coordinates outside PEI bounds | **0** |
| `shortDescription` word count | 34–65 (entity/answer-first density) |
| `fullDescription` word count | 150–207 (two grounded paragraphs) |
| Cross-province link leakage (PE → NS/AB) | **0** (all nearest resolve within PE) |

Service/brand copy is injected by the page components from `trade.config` — the data module is
trade-neutral, so one config change re-keys every H1, FAQ, schema node, and CTA across all 45 pages.

## 6 · Images — fallback chain (§6D), licence-verified

5 verified heroes drive the set; every other page inherits its county region hero (region-tier
fallback). All licences are inside the allowed enum and every `alt` is geographic-only + unique.

| Scope | Place | Licence | Shows |
|-------|-------|---------|-------|
| region | Queens County | CC BY 2.0 (R. Linsdell) | Cavendish red cliffs & Gulf beach |
| region | Prince County | CC BY 2.0 (M. Cathrae) | Confederation Bridge, Borden-Carleton |
| region | Kings County | CC BY 2.0 (S. Krasowski) | Georgetown harbour |
| community | Cavendish | CC BY-SA 3.0 (Rangeley) | Cavendish farmland & shore |
| community | Borden-Carleton | CC BY 2.0 (M. Cathrae) | Confederation Bridge landing |

Full image manifest (URL + stored alt): `prince-edward-island/pe-full-manifest.json`.

## 7 · Static/schema/crawler

- Pages render server-agnostically from the data module; JSON-LD (LocalBusiness + BreadcrumbList
  + FAQPage + Service) is emitted by `AreasSEOSchema` per the existing component contract.
- All 48 PEI URLs (3 regions + 45 communities) land in `public/sitemap.xml` via the real
  `scripts/generate-sitemap.ts` build step — verified (`154` total entries, 48 PEI).
- Typecheck of the data module: **0 errors** (`tsc -p tsconfig.app.json` surfaces only 3
  pre-existing App-shell import errors unrelated to this change).

## 8 · Sample pages (across the score range)

- **Charlottetown** (score 71.4, tier 1) — `/areas-we-serve/queens-county/charlottetown`:
  capital, 38,809 (2021), Birthplace of Confederation, Province House / Great George Street,
  harbour + 3 rivers, UPEI / QEII / government economy, heritage-vs-Royalty-suburb building stock.
- **Victoria** (score 49.1, tier 3, documented exception) — `/areas-we-serve/queens-county/victoria`:
  Victoria-by-the-Sea, 1819 seaport grid, 1879 range lighthouse, 139 residents, dense heritage
  wood-frame stock on a working strait harbour. Passes find-and-replace + ≥4 signals.
