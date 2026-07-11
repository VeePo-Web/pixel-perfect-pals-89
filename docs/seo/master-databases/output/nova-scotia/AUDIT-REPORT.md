# Nova Scotia — "Areas We Serve" Build & Final Audit

**Mode A** (master SEO spreadsheet provided). Province: **Nova Scotia**. Build date: **2026-07-11**.
Niche-agnostic: all business copy stays single-curly `{TOKENS}`; every place fact is real and grounded.

Source: `nova_scotia_master_seo_database_OPTIMIZED.xlsx` (`MASTER_LOCATIONS`, 807 rows, 43 cols).

---

## 1. Coverage reconciliation (nothing dropped)

```
INTENDED (every enumerated place)         = 807
  BUILT   (published, passed the gate)    = 248
  DEFERRED (noindex / not generated)      = 559   (558 scored < 50  +  1 duplicate dropped)
  248 + 559 = 807   ✓ reconciled — every row in exactly one bucket
```

Every one of the 807 rows is in exactly one bucket. `deferred-noindex.json` lists all 559 with a
one-line reason (558 scored < 50 — the thin-page/doorway firewall; 1 dropped as a duplicate, below).

**Duplicate dropped (one-place-one-URL law):** `NS-0066 "Enfield (EH)"` is the same community as
`NS-0062 "Enfield"` — identical 2021 population (3,500), identical unified score (56.5), coordinates
~2 km apart, listed twice under two region assignments. Kept `enfield` (Halifax Metro, clean slug);
`enfield-eh` moved to DEFERRED. This resolved the only primary-keyword collision in the set.

---

## 2. Unified re-score + publish gate

One formula applied to all 807 rows so scores are network-comparable (national anchor = Toronto 2021,
2,794,356):

```
Population 30 : min(30, log10(max(pop,1))/log10(2,794,356)*30)
Search Vol 25 : pop bands (>=100k 24 · >=20k 19 · >=5k 14 · >=1k 8 · >=200 3 · else 1)
Competition 20: INVERSE pop (>=100k 4 · >=20k 8 · >=5k 12 · >=1k 15 · else 18)
Proximity 15  : max((1 - min(km to nearer of Halifax/Sydney)/500)*15, 0)   # haversine
Economic 10   : type (City/Regional Muni 8 · Town/District/County 5 · Community/Village 3 · else 1)

BUILD = score >= 50 AND real coords AND real 2021 population   → 248 pages
SKIP  = otherwise → noindex, excluded from sitemap             → 559
```

Score range of the built set: **50.0 – 77.3**. Band distribution across all 807: `65+ : 13 · 50–64 : 236 · 35–49 : 558`.

**Top 10 (unified):** Halifax 77.3 · Cape Breton 73.2 · Sydney 70.4 · Dartmouth 67.5 · West Hants 67.3 ·
East Hants 66.3 · Kings County 66.2 · Colchester County 65.9 · Bedford 65.5 · Lunenburg District 65.3.

---

## 3. What was built (248 pages)

**By region:** Halifax Metro 130 · Cape Breton 55 · Annapolis Valley 16 · Central Nova Scotia 14 ·
South Shore 11 · Northumberland Shore 8 · Fundy Shore 6 · Chignecto 5 · Eastern Shore 3.

**By place type:** Community 141 · Neighborhood 45 · Town 28 · District Municipality 11 · County
Municipality 9 · Urban Community 5 · First Nations Reserve 4 · Regional Municipality 3 · City 2.

**By display tier** (score bands): Tier 1 (>=65) 13 · Tier 2 (57–64) 57 · Tier 3 (50–56) 178.

Each page carries the full §6 anatomy: breadcrumb, hero, answer-first snippet (`.answer-first`/speakable),
entity description, 400–600w About, local facts, generic services grid (tokens), an information-gain
element, 4–5 question-format FAQs, map facade, nearby-areas backlinks, blog backlinks, reviews slot,
city-specific CTA, and a per-page JSON-LD `@graph`.

---

## 4. Defect sweep (hard defects all 0)

| Check | Count |
|---|---|
| Duplicate slugs | **0** |
| `{{` double-curly defects | **0** |
| Duplicate image alt strings | **0** |
| Orphan pages (no inbound internal link) | **0** |
| Pages sharing a primary keyword | **0** |
| Neighbors sharing an About opener | **0** |
| Missing `{PHONE}` CTA (snippet or last FAQ) | **0** |
| Pages with < 4 local signals | **0** |
| Invented facts (spot-check, see §7) | **0** |

Orphans were eliminated by reciprocal sideways backlinking (§7 linking law): every page appears in at
least one other page's Nearby Areas, plus its UP link to the region page and 2–4 blog backlinks.

### Known soft gaps (reported honestly, not hidden)
- **About-body length:** 67 of 248 About sections run **318–379 words** (median 359) against the
  400–600 target — i.e. modestly short, not thin. All still pass the find-and-replace test, carry ≥4
  distinct real signals + an info-gain element, and have unique openers, so none are doorway/thin
  pages. The remaining 181 are in-band. *Optional follow-up: a one-pass expansion agent over these 67.*
- **Short FAQ answers:** 6 answers (across 5 pages: stewiacke, shubenacadie, sipekne-katik-first-nation,
  millbrook-first-nation, lower-truro) run 24–29 words vs the 40–60 target. All are mid-list answers;
  every snippet and every last-FAQ answer still ends in the `{PHONE}` CTA.

Entity (50–100w) and AI-snippet (40–60w) word-count checks: **0 failures**.

---

## 5. Schema / static-render / crawler

- **JSON-LD:** every page emits a static `@graph` — `Service` (+ `areaServed` City list + `GeoCircle`
  with `geoRadius` in **metres** as a string), `WebPage` (`speakable` → `.answer-first`, honest ISO
  `dateModified` = 2026-07-11), `BreadcrumbList`, `FAQPage` (mainEntity text mirrors visible FAQs
  verbatim), `ImageObject`. `LocalBusiness` NAP is referenced by `@id` (`{BRAND_URL}#business`), defined
  once, never re-inlined. No self-serving `aggregateRating`. No `HowTo`. `geoRadius` distribution:
  161 at the 2 km floor (dense metro), 82 mid, 5 at the 25 km cap (isolated places).
- **Sitemap:** `sitemap-areas-fragment.xml` — `/areas`, 9 region URLs, 248 location URLs, honest
  `<lastmod>`. DEFERRED URLs excluded.
- **Static reality:** all body copy and all JSON-LD are plain data destined for the initial HTML (no
  JS-only content). Map is a click-to-load facade.
- **Robots (recommended):** allow `Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot,
  ClaudeBot, GPTBot, Google-Extended`.
- **Footer (OGL):** "Contains information licensed under the Open Government Licence – Canada." (StatCan
  2021 Census + provincial sources were used.)

---

## 6. Images — fallback chain (all place-described)

All 248 pages use **tier `region`** imagery: 9 verified Wikimedia Commons regional landscapes (one per
region), each with a compliant licence (CC0 / CC BY 2.0 / CC BY-SA 3.0/4.0 — attribution recorded).
The Flag of Nova Scotia (public domain) was verified as the province-wide fallback but was **not**
needed — no region fell through to flag/generic. Metadata always describes the **place**: two-layer alt
(stored geographic-only Layer 1 + rendered `{SERVICE_CATEGORY}`-prefixed Layer 2), geo filename
`{location-slug}-{region-slug}-ns.webp`, EXIF geo = real place lat/lng, `ImageObject.contentLocation` =
region + geo. **0 duplicate alt strings** across 248 pages (shared photo URLs, unique alt text).
Full per-image records in `image-manifest.json`.

Region photos: Halifax skyline (Gordon Leggett, CC BY-SA 4.0) · Cabot Trail highlands (ArcaneCraeda,
CC BY-SA 4.0) · Valley + Cape Blomidon (Eric.stewart, CC BY-SA 4.0) · Minas Basin at Truro (Purpletramp,
CC BY-SA 3.0) · Peggys Cove (Michel Rathwell, CC BY 2.0) · Cape George Lighthouse (Virid, CC BY-SA 3.0) ·
Five Islands / Bay of Fundy (Michael C. Rygel, CC BY-SA 3.0) · Joggins Fossil Cliffs (Staka, CC BY-SA 4.0) ·
Lawrencetown Beach (Larry LaRose, CC BY-SA 3.0).

---

## 7. Grounding / anti-hallucination

Every page is grounded strictly in the spreadsheet's verified content, the row's numeric fields
(2021 population, FSA, lat/lng, distances), computed stats (population rank in region, haversine
neighbour distances), and the once-per-region fact bundle. Where the source grounding carried
**region-level boilerplate** (e.g. Point Pleasant Park, Fortress of Louisbourg, universities pasted onto
800-person satellite communities), the generators **declined to attribute those as local landmarks** —
they would fail the find-and-replace test — and grounded those pages on genuinely per-place facts
instead. Known source grammar bugs (e.g. "Founded named after…") were fixed **without adding facts**.
Result: 0 invented facts on spot-checks; all 248 pages are `Verified` (0 `Needs_Review`).

---

## 8. Distribution & deliverables

- **Verified: 248 · Needs_Review: 0.** Only Verified pages are in the sitemap.
- Two full sample pages across the score range (Halifax 77.3 → Edwardsville 50.x) in `SAMPLE-PAGES.md`.

**Files in this folder:**
- `pages/<region>.json` — the 248 built pages (full anatomy + per-page JSON-LD), segmented by region.
- `region-pages.json` — 9 region-tier pages + region fact bundles + blog-link sets.
- `communities.nova-scotia.ts` — the same data mapped to the repo's `src/data/communities.ts`
  interface (`NS_REGIONS`, `NS_COMMUNITIES`) — the Ship bridge; import or re-export to render.
- `image-manifest.json` — per-image filename, tier, source URL, two-layer alt, licence, EXIF geo.
- `sitemap-areas-fragment.xml` — areas hub + 9 regions + 248 locations, honest `<lastmod>`.
- `deferred-noindex.json` — all 559 deferred rows, each with a reason.
- `audit-stats.json` — machine-readable coverage/score/tier/type stats.
- `SAMPLE-PAGES.md` — 2 full worked pages.

**To ship (step E):** re-export `NS_REGIONS`/`NS_COMMUNITIES` from `src/data/communities.ts` (or spread
them into `REGIONS`/`COMMUNITIES`); the existing `AreasHub`, `RegionPage`, and `CommunityPage`
components then render the set. Resolve the business `{TOKENS}` per trade via find-and-replace, set the
one-per-business `{PLACE_ID}` + `{GOOGLE_MAPS_API_KEY}` in config, and apply the build-time 4-of-8 gate.
