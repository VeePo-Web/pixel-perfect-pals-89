# Manitoba — "Areas We Serve" World-Class Location-Page Build (Mode B · Fable 5 / Opus 4.8 run · July 2026)

Programmatic local-SEO + AI-search (GEO/AEO) location-page system for **Manitoba**, built with the
Universal Location-Page Builder prompt (`../../master-databases/05-universal-location-page-builder-fable5.md`).
Niche-agnostic: all business/service copy is single-curly `{TOKENS}`; every place fact is real and grounded.

## What's here

| Path | What it is |
|---|---|
| `pages/*.md` | One fully-rendered page per BUILD place — frontmatter + answer-first body + FAQ + JSON-LD `@graph`. 141 files: 118 location + 14 Winnipeg neighborhood + 8 region + 1 provincial hub. |
| `data/manitoba_master_locations.csv` | The 132 BUILD places (loc + neighborhood) with score, gate, coords, population, distances. |
| `data/manitoba_communities_deferred.csv` | The 1,518 DEFERRED places, each with a one-line reason (the doorway-penalty firewall). |
| `data/manitoba_full_enumeration_gate_ledger.csv` | Every enumerated place (1,650) with class, type, score, gate — the full INTENDED set. |
| `data/image-manifest.csv` | Per-page image: tier, geographic filename, two-layer alt, license/attribution TODO tokens. |
| `region-bundles.md` | The 8 region fact bundles (computed once, reused) + shared provincial facts. |
| `WRITER-CONTRACT.md` | The binding per-page authoring contract. |
| `AUDIT.md` | Coverage reconciliation (INTENDED = BUILT + DEFERRED), defect sweep, samples. |

## Mode & grounding

**Mode B** — no master spreadsheet existed for Manitoba, so every place was enumerated and grounded from
authoritative open datasets (all OGL-Canada / public-domain / CC0):

- **StatCan 2021 Census, table 98-10-0002** — Census Subdivisions (CSDs): population 2021/2016, dwellings,
  land area, coordinates via DGUID.
- **StatCan 2021 Census, table 98-10-0011** — population centres (community population backfill).
- **NRCan Canadian Geographical Names (CGN), Manitoba CSV** — names, feature types, lat/lng, incl.
  unincorporated populated places (Community / Local Urban District / Northern Community).
- **GeoNames CA** — coordinate + census-derived population backfill.
- **Wikidata SPARQL (P1082, QID)** — Winnipeg neighborhood populations + entity `@id`s.

Canadian postal codes are proprietary → **FSA-level only** (never full 6-char). Because an OGL-Canada
source is used, every page footer carries: *"Contains information licensed under the Open Government
Licence – Canada."*

## Scoring & gate (§4B of the builder prompt)

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(max(pop,1)) / log10(2,794,356) * 30)   # national anchor
  Search Vol 25  : pop bands (≥100k→24 · ≥20k→19 · ≥5k→14 · ≥1k→8 · ≥200→3 · else→1)
  Competition 20 : INVERSE pop (≥100k→4 · ≥20k→8 · ≥5k→12 · ≥1k→15 · else→18)
  Proximity 15   : max((1 − min(km to nearer of Winnipeg / Brandon)/500) * 15, 0)   # haversine
  Economic 10    : place type (City/Regional→8 · Town/RM/Municipality→5 · Community/Village/LUD→3 · else→1)

BUILD = (score ≥ 50  OR  pop ≥ 4,000)  AND real coords AND real population AND ≥4 local signals AND ≥1 info-gain
DEFER = otherwise → noindex, excluded from sitemap
```

The `pop ≥ 4,000` override captures grounded northern service markets (The Pas, Flin Flon MB-part,
Norway House) whose hub-distance proximity score alone would fall just under 50.

## Regions (8)

Winnipeg Metro · Eastman · Interlake · Central Plains · Pembina Valley · Westman · Parkland ·
Northern Manitoba. See `region-bundles.md` for the shared climate / geology / economy / building-stock /
landmark facts each region's pages draw on (never duplicated sentence-for-sentence between siblings).

## Page-count math

- **INTENDED** (all enumerated, grounded or not): **1,650**
- **BUILT** (passed the gate): **132** location/neighborhood pages + **8** region + **1** hub = **141 pages**
- **DEFERRED** (noindex): **1,518** — small communities, ungrounded population, ambiguous toponyms,
  or score < 50 without the population override. Each carries a one-line reason in the deferred CSV.
- `1,650 INTENDED = 132 BUILT(place) + 1,518 DEFERRED` ✓ (region + hub pages are aggregators, not
  enumerated places).

The gate is the product: volume is a liability. No thin page ships.
