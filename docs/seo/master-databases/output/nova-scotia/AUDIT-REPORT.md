# Nova Scotia — "Areas We Serve" Build & Full-Gazetteer Audit

**Mode A + census/gazetteer audit.** Province: **Nova Scotia**. Build date: **2026-07-12**.
Niche-agnostic: all business copy stays single-curly `{TOKENS}`; every place fact is real and grounded.

Sources: `nova_scotia_master_seo_database_OPTIMIZED.xlsx` (807 rows) **reconciled against** the
authoritative **GeoNames Canada** gazetteer (CC-BY) filtered to Nova Scotia populated places.

---

## 0. Gazetteer audit — "are ALL the places here?"

**The 807-row spreadsheet was a hand-curated list, not a census enumeration** (`build_ns_data.py`
hardcodes "49 municipalities"; `expand_ns_data.py` hardcodes community tuples). So it undercounted the
real universe. I pulled the authoritative enumeration and reconciled every place:

| Source | Count |
|---|---|
| GeoNames NS populated places (`fclass=P`) | **2,647** (PPL 2,202 · PPLL 369 · PPLX 75 · PPLA 1) |
| Original spreadsheet rows | 807 |
| **Union (deduped by slug) = the full INTENDED universe** | **2,646** |
| …of which named in the sheet | 646 |
| …in the gazetteer but **missing from the sheet** | **1,839** |
| GeoNames NS places carrying **any population figure** | 260 |

So Nova Scotia genuinely has **~2,646 named populated places** — thousands, as expected — and the sheet
was missing 1,839 of them. **All 2,646 are now enumerated and reconciled** into exactly one bucket below.

**Why the built set is hundreds, not thousands:** the publish gate is deliberate. Of the 2,646 named
places, **1,766 have no population at all** (bare locality names) and **575 more score below the tier-1
threshold**. Building pages for those would be textbook doorway / scaled-content spam — one thin page
risks a domain-wide Google penalty. The core law is explicit: "Build a neighborhood/village page ONLY
where real local signals exist — never auto-spawn empty pages." So those 2,341 are enumerated and
**noindex-deferred**, not built. The gate is the product.

---

## 1. Coverage reconciliation (nothing dropped)

```
INTENDED (full gazetteer ∪ sheet)          = 2,646
  BUILT   (published, passed the gate)     =   260
  DEFERRED (noindex / not generated)       = 2,386
  260 + 2,386 = 2,646   ✓ reconciled — every named place in exactly one bucket
```

**DEFERRED breakdown (each row in `deferred-noindex.json` carries a one-line reason):**
- **1,766** — no population in census/gazetteer (named locality only; page would be thin) → noindex
- **575** — unified score < 50 (below first publish tier) → noindex
- **44** — GeoNames candidates that cleared the score gate but are subdivision tracts / sections without
  a distinct local identity, or came back `Needs_Review` from content generation (see §3) → not published
- **1** — duplicate (`Enfield (EH)` == `Enfield`, one-URL law)

---

## 2. The build set (260 pages)

**248** from the census-verified spreadsheet tier **+ 12 genuinely-identifiable communities the sheet
missed**, recovered from the gazetteer audit and grounded through the same pipeline:

> Whitney Pier · St. Peter's · Mount Uniacke · Milford Station · Lower Economy · Cambridge ·
> Windsor Junction · Springfield Lake · Upper Hammonds Plains · Preston · Kearney Lake · Port Wallace.

**By region:** Halifax Metro 136 · Cape Breton 57 · Annapolis Valley 17 · Central Nova Scotia 16 ·
South Shore 11 · Northumberland Shore 8 · Chignecto 6 · Fundy Shore 6 · Eastern Shore 3.
**By display tier:** Tier 1 (score ≥ 65) 13 · Tier 2 (57–64) 60 · Tier 3 (50–56) 187.

Unified scoring formula (one formula, network-comparable; national anchor = Toronto 2021, 2,794,356):
Population 30 · Search-volume band 25 · inverse-competition 20 · haversine proximity 15 · economic 10.
`BUILD = score ≥ 50 + real coords + real population`. Score range of the built set: 50.0–77.3.
**Top 10:** Halifax 77.3 · Cape Breton 73.2 · Sydney 70.4 · Dartmouth 67.5 · West Hants 67.3 ·
East Hants 66.3 · Kings County 66.2 · Colchester County 65.9 · Bedford 65.5 · Lunenburg District 65.3.

---

## 3. How the 12 new communities were gated (grounding integrity)

The gazetteer audit surfaced 57 gate-passers absent from the sheet. These were **not** auto-published:
- **5** were name-variants of pages already built (Halifax South End, Membertou, Quinpool District,
  Eskasoni 3, the Enfield duplicate) → dropped.
- **30** were GeoNames neighbourhood-*sections* (`PPLX`) with modeled populations → deferred (§1).
- **22** genuine `PPL` communities were run through the content pipeline **with an explicit instruction:
  GeoNames population is approximate (write "about N", never a fake census figure), and if ≥4 distinct
  real local signals cannot be assembled for a specific place, return `Needs_Review` — do NOT invent.**

The content agents enforced this honestly: **Willowdale** and **Hayes Subdivision** were self-flagged
`Needs_Review` as bare subdivisions. On review I further deferred 8 more (Convoy Place, Tam O'Shanter
Ridge, Bridgeview, Thornhill, Green Acres, Sherwood Heights, Harbourview, Princeville) — modern
developer tracts that pass a signal count only via generic adjacency and fail the find-and-replace test.
The **12** kept are all nameable NS communities/neighbourhoods with real identity (Whitney Pier's
steel-and-coal history, St. Peter's canal village, Preston/Upper Hammonds Plains historic communities,
etc.). Their pages state population as "about N (GeoNames)" — no fabricated census precision.

---

## 4. Defect sweep (hard defects all 0, across all 260)

| Check | Count |
|---|---|
| Duplicate slugs · `{{}}` · duplicate alt strings | **0 · 0 · 0** |
| Orphan pages (no inbound internal link) | **0** |
| Pages sharing a primary keyword | **0** |
| Neighbors sharing an About opener | **0** |
| Missing `{PHONE}` CTA (snippet or last FAQ) | **0** |
| Pages with < 4 local signals | **0** |
| Invented facts (spot-check) | **0** |

Orphans eliminated by reciprocal sideways backlinking; every candidate's Nearby-Areas links were
filtered to published pages only (deferred tracts never linked). **Known soft gaps (reported, not
hidden):** 68 of 260 About bodies run 318–379 words vs the 400–600 target (short, not thin — all pass
find-and-replace with ≥4 signals + info-gain); 6 mid-list FAQ answers run 24–29 words vs 40–60. Entity
and AI-snippet word-count checks: 0 failures.

---

## 5. Schema / static-render / crawler / images

- **JSON-LD** per page: static `@graph` — `Service` (+ `areaServed` City list + `GeoCircle`, `geoRadius`
  in **metres**), `WebPage` (`speakable` → `.answer-first`, honest ISO `dateModified` 2026-07-12),
  `BreadcrumbList`, `FAQPage` (mirrors visible FAQs), `ImageObject`. `LocalBusiness` NAP referenced by
  `@id`, never re-inlined. No `aggregateRating`, no `HowTo`.
- **Sitemap:** `sitemap-areas-fragment.xml` — `/areas` + 9 regions + 260 locations, honest `<lastmod>`.
  Deferred URLs excluded. **Robots (recommended):** allow Googlebot, Bingbot, OAI-SearchBot,
  ChatGPT-User, PerplexityBot, ClaudeBot, GPTBot, Google-Extended.
- **Images:** all 260 use verified Wikimedia Commons regional photos (9 regions, compliant CC licences),
  place-described two-layer alts, geo filenames, EXIF geo. **0 duplicate alt strings.** Manifest:
  `image-manifest.json`. **OGL footer required:** "Contains information licensed under the Open Government
  Licence – Canada." (StatCan + GeoNames used.)

---

## 6. Distribution & deliverables

- **Verified: 260 · Needs_Review/deferred: excluded from sitemap.** Two full sample pages
  (Halifax 77.3 → Cambridge 50.0) in `SAMPLE-PAGES.md`.

Files in `docs/seo/master-databases/output/nova-scotia/`:
- `pages/<region>.json` — 260 built pages (full anatomy + JSON-LD), segmented by region.
- `region-pages.json` — 9 region-tier pages + fact bundles + blog-link sets.
- `communities.nova-scotia.ts` — 260 communities + 9 regions in the repo's `src/data/communities.ts`
  shape (`NS_REGIONS`, `NS_COMMUNITIES`) — the Ship bridge.
- `deferred-noindex.json` — **all 2,386 deferred places**, each with a reason (the full-gazetteer ledger).
- `image-manifest.json` · `sitemap-areas-fragment.xml` · `audit-stats.json` · `SAMPLE-PAGES.md`.

**To ship (step E):** re-export `NS_REGIONS`/`NS_COMMUNITIES` from `src/data/communities.ts`; the existing
`AreasHub`/`RegionPage`/`CommunityPage` render the set. Resolve `{TOKENS}` per trade; set the
one-per-business `{PLACE_ID}` + `{GOOGLE_MAPS_API_KEY}`; apply the build-time 4-of-8 gate.
