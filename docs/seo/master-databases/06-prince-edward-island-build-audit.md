# Prince Edward Island — Areas-We-Serve Build & Self-Audit

> **Mode B** build (no vendor spreadsheet existed for PEI). Every place was enumerated
> and grounded from authoritative open data, scored on the unified network formula, run
> through the publish gate, and written to `src/data/locations/prince-edward-island.ts`
> (`PE_REGIONS` + `PE_COMMUNITIES`, wired into `src/data/communities.ts`). Services stay
> in the component/token layer; the data module is 100% real geographic intelligence.

Date: 2026-07-12 · Province anchor hubs: Charlottetown, Summerside.

---

## 0 · "There should be thousands" — what the authoritative census actually shows

Prince Edward Island is Canada's smallest province (154,331 people, 2021). The complete
national gazetteer — **NRCan's Canadian Geographical Names Database (CGN)** — lists **1,871
named features** in PEI, but the large majority are **not populated places**:

| CGN feature category | Count | Location pages? |
|----------------------|------:|-----------------|
| **Populated Place** | **649** | yes — the addressable universe |
| Water Feature (bays, rivers, coves) | 640 | no |
| Terrain Feature (capes, hills, points) | 424 | no |
| Administrative Area | 130 | no |
| Other | 28 | no |

So the true, complete count of **named populated places is 649**, broken down as:

```
CITY   2     (Charlottetown, Summerside)
TOWN  11     (Alberton, Borden-Carleton, Cornwall, Georgetown, Kensington, Montague,
              North Rustico, O'Leary, Souris, Stratford, Tignish)
VILG  71     incorporated villages / rural municipalities + village-level localities
UNP  565     unincorporated localities & dispersed rural place-names
```

PEI genuinely does **not** have thousands of buildable *communities* — it has 649 named
places, of which ~84 are cities/towns/villages and 565 are unincorporated locality names
(road-junction hamlets, dispersed rural names) with no census population and no groundable
local signals. Publishing thin pages for those 565 would violate this system's core law
("DEPTH IS THE PRODUCT… a thin page risks a domain-wide scaled-content penalty").

## 1 · Grounding sources (all open-licence)

| Fact | Source | Licence |
|------|--------|---------|
| Complete place enumeration | **NRCan CGN** file `cgn_pe_csv_eng` (649 populated places) | OGL-Canada |
| Population (2021) | Statistics Canada, Census Table **98-10-0002** | OGL-Canada |
| Coordinates | CGN representative points (cross-checked vs GeoNames CA) | OGL-Canada / CC BY 4.0 |
| Region bundles (climate, economy, building stock, landmarks) | computed once per county (§4C) | — |
| Hero imagery | Wikimedia Commons, licence-filtered to the allowed enum | CC BY 2.0 / CC BY-SA 3.0 |

> **Footer requirement:** OGL-Canada sources are used → the site footer must read
> *"Contains information licensed under the Open Government Licence – Canada."* Canadian
> 6-char postal codes are proprietary and were **not** used — pages model places, not routes.

## 2 · Score + publish gate

```
SEO_Priority_Score (0–100) = Population 30 + SearchVol 25 + Competition 20 + Proximity 15 + Economic 10
  (hubs = Charlottetown, Summerside; haversine proximity)

BUILD = score ≥ 50 AND real coords AND real 2021 population AND ≥4 grounded local signals
```

The build tier was extended to **every incorporated municipality/village with a census
population ≥ 100** (all pass the real-pop + real-coords + ≥4-signals test), not just the
score ≥ 50 first cut — this is the defensible "all real communities" set for a small province.

## 3 · Coverage reconciliation — INTENDED = BUILT + DEFERRED

```
INTENDED (CGN populated places) .................. 649
  ├─ CITY   2   ├─ TOWN 11   ├─ VILG 71   └─ UNP 565

BUILT ............................................ 67 pages
  ├─ 60 CGN cities/towns/villages (all incorporated communities + census villages ≥100 pop)
  │     — this matches 86 CGN place-name rows (CGN lists some names more than once)
  └─  7 Charlottetown neighbourhoods (Downtown, Sherwood, West/East Royalty,
        Parkdale, Brighton, Spring Park) — real GeoNames populations & coordinates

DEFERRED (noindex / next tier) ................... 563 CGN places
  ├─ 532  unincorporated localities (UNP) — no census population, no groundable signals
  ├─  26  village-level localities inside a larger CSD (Lower Montague, Brudenell, Grand
  │       Tracadie, Bonshaw, Oyster Bed…) — no distinct population; covered by parent page
  ├─   3  incorporated villages under 100 residents (Darlington 99, St. Louis 69,
  │       Tignish Shore 64) — too small to ground 4 distinct signals
  └─   2  incorporated villages below build tier / parent-covered

IDENTITY: 649 = 86 matched-built + 563 deferred ✓
```

Full machine-readable enumeration (every one of the 649 places with status + defer reason):
`prince-edward-island/pe-full-manifest.json`. The earlier CSD-level ledger is retained at
`prince-edward-island/pe-deferred-ledger.json`. **Deferred ≠ deleted** — every place is on
record and bucketed; the unincorporated hamlets wait for real local signals before earning
an index slot (doorway-penalty firewall).

**County population control totals (StatCan 2021):** Queens 89,770 · Prince 46,234 ·
Kings 18,327 · **PEI total 154,331** ✓ (matches the census figure exactly).

## 4 · Distribution & tiers (67 pages)

| Tier | Meaning | Count |
|------|---------|-------|
| 1 | Cities + largest towns (score ≥ 60) | 5 |
| 2 | Towns + strong rural municipalities (54–60) | 19 |
| 3 | Smaller communities, villages + neighbourhoods (< 54) | 43 |

Region pages: 3 (Queens / Prince / Kings County). All 67 are `Verified`; 0 `Needs_Review`.

## 5 · Per-page self-check (whole set — automated, 67 pages)

| Check | Result |
|-------|--------|
| Duplicate slugs | **0** |
| Unresolved `nearestCommunities` refs | **0** |
| Self-referencing nearest links | **0** |
| Orphans (no inbound link — region directory + nearby) | **0** |
| `{{` / `{TOKEN}` leaks in rendered copy | **0** |
| Duplicate hero `alt` strings | **0** |
| Duplicate `shortDescription` openers | **0** |
| Duplicate `fullDescription` openers (neighbours) | **0** |
| Coordinates outside PEI bounds | **0** |
| Cross-province link leakage (PE → NS/AB) | **0** |

Service/brand copy is injected by the page components from `trade.config` — the data module
is trade-neutral, so one config change re-keys every H1, FAQ, schema node, and CTA.

## 6 · Images — fallback chain (§6D), licence-verified

5 verified heroes drive the set; every other page inherits its county region hero
(region-tier fallback). All licences are inside the allowed enum; every `alt` is
geographic-only and unique. Manifest: `prince-edward-island/pe-full-manifest.json`.

| Scope | Place | Licence | Shows |
|-------|-------|---------|-------|
| region | Queens County | CC BY 2.0 (R. Linsdell) | Cavendish red cliffs & Gulf beach |
| region | Prince County | CC BY 2.0 (M. Cathrae) | Confederation Bridge, Borden-Carleton |
| region | Kings County | CC BY 2.0 (S. Krasowski) | Georgetown harbour |
| community | Cavendish | CC BY-SA 3.0 (Rangeley) | Cavendish farmland & shore |
| community | Borden-Carleton | CC BY 2.0 (M. Cathrae) | Confederation Bridge landing |

## 7 · Static / schema / crawler

- Pages render from the data module; JSON-LD (LocalBusiness + BreadcrumbList + FAQPage +
  Service) is emitted by `AreasSEOSchema` per the existing component contract.
- All 70 PEI URLs (3 regions + 67 communities) land in `public/sitemap.xml` via the real
  `scripts/generate-sitemap.ts` build step — verified (251 total entries, 67 PEI communities).
- Typecheck of the data module: **0 errors** (`tsc` surfaces only pre-existing App-shell
  import errors unrelated to this change).

## 8 · Sample pages (across the score range)

- **Charlottetown** (71.4, tier 1) — capital, 38,809, Birthplace of Confederation, Province
  House / Great George Street, harbour + 3 rivers, UPEI/QEII/government economy.
- **Eastern Kings** (49.8, tier 3, incorporated-community extension) — far-eastern rural
  municipality, 687 residents, East Point Lighthouse (1867) at the Island's easternmost point,
  Elmira Railway Museum, exposed Gulf-and-strait coast. Passes find-and-replace + ≥4 signals.
