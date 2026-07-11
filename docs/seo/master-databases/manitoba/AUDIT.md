# Manitoba Build — Final Audit

Mode B · Fable 5 / Opus 4.8 run · reconciled 2026-07-11. Every number below is recomputed from the
committed data files and rendered pages, not asserted.

## 1. Coverage reconciliation — INTENDED = BUILT + DEFERRED

```
INTENDED (enumerated & grounded)     1,650   data/manitoba_full_enumeration_gate_ledger.csv
  ├─ BUILT   (passed the gate)         132   data/manitoba_master_locations.csv
  └─ DEFERRED (noindex)              1,518   data/manitoba_communities_deferred.csv

132 BUILT + 1,518 DEFERRED = 1,650  ✓  (exact match to the ledger)
```

Region and hub pages are **aggregators, not enumerated places**, so they sit on top of the 132:

```
RENDERED PAGES                         141   pages/*.md
  ├─ location (CSD)                    101
  ├─ community / First Nation (COMMUNITY) 17
  ├─ Winnipeg neighborhood (NEIGHBORHOOD) 14      → 132 place pages
  ├─ region (REGION)                     8
  └─ provincial hub (HUB)                1
```

## 2. Built pages by region

| Region | BUILT loc/nb |
|---|---|
| Eastman | 34 |
| Interlake | 22 |
| Westman | 18 |
| Pembina Valley | 16 |
| Winnipeg Metro | 16 |
| Central Plains | 12 |
| Parkland | 10 |
| Northern Manitoba | 4 |
| **Total** | **132** |

Northern Manitoba is deliberately thin: most northern places are ungrounded (no census coordinate/population)
or below the gate, and ship as DEFERRED. The four built (Thompson, Flin Flon MB-part, The Pas, Norway House)
are the grounded northern service markets, three of them via the `pop ≥ 4,000` override.

## 3. Depth & quality distribution (132 place pages)

- **About-body length**: min 281w · median 347w · max 537w. Floors met on every page
  (city-scale ≥400w · rural ≥300w · neighborhood ≥280w).
- **Local signals per page**: min 5 · median 6 · max 12 (contract floor is 4).
- **Verification**: 131 `Verified-LLM` (row + bundle + high-confidence encyclopedic), 1 `Verified-Dataset`
  (row + bundle only). No page carries an unverifiable claim — uncertain facts were cut, not flagged.

## 4. Defect sweep (full 141-page validator pass)

| Check | Result |
|---|---|
| Word-count errors (all fields) | **0** |
| `{{double-curly}}` tokens | **0** |
| Unknown / malformed tokens | **0** (the 7-per-page scaffold tokens are intentional deploy-time fills) |
| Duplicate URL / slug | **0** |
| Duplicate image alt (Layer-1) | **0** |
| Shared About-opener pattern | **0** |
| Orphan internal `/areas/*` links | **0** (every nearby/region/down target resolves to a built page) |
| Missing `{PHONE}` CTA (snippet / short / FAQ-4) | **0** |
| Token leak in `Entity_Description` | **0** |
| Coverage vs manifest | want 132 = got 132; the 9 "extra" are the region/hub aggregators |

Only warning: the **Northern Manitoba** region page carries 2 nearby links (not 3+) — geographically honest,
as it sits at the province's northern edge with few adjacent regions. Not a defect.

## 5. Grounding integrity

- Every population, coordinate, growth %, and distance traces to StatCan 2021 Census (98-10-0002 / 98-10-0011),
  NRCan CGN, GeoNames CA, or Wikidata — never invented.
- No full postal codes (proprietary) — FSA-level only.
- Image license/attribution left as `{IMAGE_LICENSE_TODO}` / `{IMAGE_ASSET_TODO}` with
  `Asset_Status = PENDING-SOURCE`: assets are sourced at implementation; no source was fabricated.
- OGL-Canada attribution footer present on every page.

## 6. Sample pages to review

- **City / river valley**: `pages/brandon.md` — Assiniboine valley + sandy-till framing.
- **Northern / Shield + cold**: `pages/thompson.md`, `pages/flin-flon-part.md` — bedrock, -40°C mobilization,
  border-split city (MB portion only).
- **First Nation self-governance**: `pages/sioux-valley-dakota-nation.md` — respectful coordination angle.
- **Ring-dike town**: `pages/altona.md` (Pembina Valley) — flood-protection info-gain.
- **Military base community**: `pages/shilo.md` — CFB Shilo posting-cycle + Spruce Woods sand.
- **Winnipeg neighborhood**: `pages/transcona.md` — hyper-local rail-town scoping inside the city.

## 7. Deferred set — why 1,518 places are noindex

The DEFERRED CSV carries a one-line reason per place. The dominant reasons: score < 50 without the
population override, ungrounded population (no census figure), tiny hamlet/locality below any real search
market, or an ambiguous toponym that could not be pinned to one place with confidence. This is the
doorway-page firewall: volume is a liability, and no thin page ships.
