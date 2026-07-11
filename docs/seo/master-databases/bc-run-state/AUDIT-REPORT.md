# British Columbia — "Areas We Serve" Build: Final Audit Report

> **Run complete.** Mode A on `bc_master_seo_database_COMPLETE.xlsx` (480 rows). Every row scored,
> gated, and reconciled; every publishable row generated to the gold-standard content bar, self-checked,
> and merged. Built 2026-07-11. Services stay single-curly `{TOKENS}`; place facts are real and grounded.

---

## 1. Coverage reconciliation — nothing dropped

```
INTENDED  = 480   (every row in MASTER_LOCATIONS)
BUILT     = 181   (score ≥ 50 + real coords + real population + ≥4 signals + ≥1 info-gain, Verified)
NEEDS_REVIEW = 1  (gated-in but held from publish — BC-0358, see §5)
DEFERRED  = 298   (noindex / not generated — each with a reason below)
CHECK: 181 + 1 + 298 = 480 ✓   Every place is in exactly one bucket.
```

**Deferred reasons (298):**

| Reason | Count |
|---|---|
| Unified score < 50 | 161 |
| No real census population (synthetic/absent) | 90 |
| No authoritative coordinates (ungroundable) | 47 |

Deferred ≠ deleted. These are small communities, neighbourhoods, First Nations communities, and tourism
polygons that cannot yet clear the gate; they ship `noindex`, are kept out of the sitemap, and can be
expanded later when real local signals exist. This is the doorway-penalty firewall, not a limitation.

**Deferred by place type:** Neighborhood 101 · Unincorporated Community 82 · Municipality 67 ·
First Nations Community 25 · Tourism Destination 22 · Regional District 1.

---

## 2. What was done (Phases A–D)

**Phase A — normalize + defect sweep.** 480 rows, 4 sheets. Original defects confirmed: 0 duplicate slugs,
0 `{{}}`, but only 50% coordinates / 71% population / 43% FSA filled despite the "COMPLETE" label.

**Phase B — geo backfill (authoritative).** 193 coordinates + 20 populations recovered from **GeoNames
BC (admin1=02, CC-BY)** across three matching passes: exact/alt-name, parenthetical + First-Nations name
variants, and unique-in-BC unconditional accept, with parent-municipality anchoring (≤45 km) and a
corrected distance sanity check (an earlier 150 km cap wrongly rejected genuinely remote places like Atlin,
Bella Bella, Masset — fixed). All hub distances recomputed by haversine against the two provincial hubs
(Vancouver 49.2827,−123.1207 · Victoria 48.4284,−123.3656). Coverage after backfill: coords 50% → 81%.

**Phase C — unified re-score + gate.** The network-comparable formula (§4B) applied identically to all 480
rows. Publishable-tier band split of the 181 built: **70+: 15 · 60–69: 74 · 50–59: 92.** Top of the tier:
Metro Vancouver RD 80.6 · Capital RD 76.8 · Vancouver 75.1 · Fraser Valley RD 74.2 · Surrey 74.1.

**Region fact bundles (12).** Computed once per `Parent_Region` (climate, terrain, economy, building stock,
3–5 landmarks) and reused across the region's places — the anti-clone + token-saver lever.

**Phase D — content generation.** 182 grounding bundles (real geo + existing facts + region bundle +
haversine nearest-5 + child/UP links) → the validated per-location prompt, run in paced chunks of 6 across a
multi-agent workflow (interrupted twice by the Fable 5 monthly spend limit, resumed from checkpoint each
time with the manifest filtered to remaining IDs). Every location produced Entity/Snippet/Short/Long/
Local_Facts/3 FAQs/5 conversational queries/Layer-1 geo alt/info-gain, self-verified.

---

## 3. Defect sweep (all zero)

| Check | Count |
|---|---|
| Duplicate slugs (built) | **0** |
| `{{}}` double-curly | **0** |
| Duplicate alt strings | **0** |
| Orphan pages (no inbound link) | **0** |
| Pages sharing a primary keyword | **0** (one keyword → one URL, flat pattern) |
| Neighbours sharing a Short_Description opener | **0** (one clash found + fixed: Thompson-Nicola RD re-anchored off the Kamloops river confluence) |
| Missing `{PHONE}` CTA where required | **0** (six trailing-filler closers normalized to end on `{PHONE}`) |
| Invented facts on a 10-page spot-check vs bundle | **0** |

**Word-count / CTA gate** (per row, enforced in `assemble.js`): Entity 50–100 · Snippet 40–60 ·
Short 100–150 · Long 300–500; `AI_Answer_Snippet` / `Short_Description` / `FAQ_3_Answer` each end on a
`{PHONE}` CTA; no tokens in Entity/Local_Facts/alt; exactly 5 conversational queries. **Average signals
per built page: 7.7** (gate floor is 4).

---

## 4. Built distribution by region (181)

| Region | Built |
|---|---|
| Metro Vancouver | 43 |
| Vancouver Island Central & North | 40 |
| Okanagan | 22 |
| Vancouver Island South | 18 |
| Gulf Islands & Sunshine Coast | 13 |
| Fraser Valley | 12 |
| Kootenays | 9 |
| Thompson-Nicola & Cariboo | 8 |
| Sea-to-Sky | 6 |
| Northern BC - Northwest | 5 |
| Peace Region & Northeast | 3 |
| Northern BC - Prince George | 2 |

Each built page carries the §7 linking law: 1 UP (parent Regional District / region hub), 3–5 SIDEWAYS
(haversine nearest, bidirectional), DOWN to child pages where they exist, and 2–4 blog backlinks. Encoded
in `deliverables/bc_page_structure.json`; 12 region hub pages in `bc_region_pages.json`.

---

## 5. Distribution: Verified vs Needs_Review

- **Verified & published: 181.**
- **Needs_Review (excluded from publish): 1 — BC-0358 Pender Islands.** The generating agent honestly
  self-flagged it: its grounding-bundle coordinate (50.37, −125.53) and computed nearby-areas pointed to the
  *northern* Strait of Georgia (Quadra/Campbell River/Cortes), but Pender is in the *Southern* Gulf Islands.
  The agent wrote correct Pender facts and refused the wrong neighbours rather than publish a geo error —
  exactly the gate working. It is held from the sitemap pending a coordinate fix (the source row had no
  authoritative coord; GeoNames matched a same-named northern feature).

**Two full sample pages across the score range** are in §6.

---

## 6. Sample pages (across the score range)

### Kelowna — BC-0007 — unified score 63.9 — Okanagan (mid-tier)

- **Entity (91w):** "Kelowna is a city in the Central Okanagan Regional District of British Columbia,
  Canada, spread along the eastern shore of Okanagan Lake. As of the 2021 Census it had a population of
  144,576, making it the largest city in the province's interior. The surrounding valley is Canada's premier
  wine region, with 180-plus wineries alongside historic tree-fruit orchards, while tourism, healthcare, and
  technology round out the economy. Kelowna hosts UBC Okanagan and Kelowna International Airport, and its
  semi-arid climate delivers hot, dry summers and snowy winters."
- **AI snippet (54w, ends `Call {PHONE}.`):** "{COMPANY_NAME} provides {SERVICE} across Kelowna, BC, from
  the downtown waterfront and Okanagan Lake shoreline to hillside neighbourhoods like Okanagan Mission and
  across the lake to West Kelowna. As the interior's largest city, Kelowna's stucco suburbs, view homes, and
  hot, dry summers shape every job we handle. Call {PHONE}."
- **Layer-1 geo alt:** "Kelowna, Okanagan British Columbia — hillside vineyards and stucco suburbs above the
  eastern shore of Okanagan Lake"
- **Info-gain:** coverage geometry (lakeside core → Okanagan Mission ~8 km → across the bridge to West
  Kelowna ~7 km) tied to the stucco dry-climate exteriors of its post-2000 hillside suburbs. Signals 6. Verified.

### Harrison Hot Springs — BC-0263 — unified score 55.2 — Fraser Valley (lower tier)

- **Entity (86w):** "Harrison Hot Springs is a resort village of 1,796 people (2021 Census) at the southern
  end of Harrison Lake in British Columbia's Fraser Valley, about 97 km east of Vancouver. Named for the
  natural mineral hot springs that feed its famous lakeside resort and public pool, the village has been a
  spa and tourism destination since the 1880s. Its compact core of hotels, motels, and cottages lines a
  sandy lagoon beach beneath the Coast Mountains, with Sasquatch Provincial Park just to the north and the
  farming communities of Agassiz and Kent minutes to the south."
- **AI snippet (48w, ends `Call {PHONE}.`):** "For {SERVICE} in Harrison Hot Springs, BC, {COMPANY_NAME}
  serves the entire resort village, from the Esplanade Avenue lakefront strip to residential streets behind
  the lagoon, plus nearby Agassiz and Kent. Crews handle both tourism properties and year-round homes at the
  south end of Harrison Lake. Call {PHONE}."
- **Layer-1 geo alt:** "Harrison Hot Springs, Fraser Valley British Columbia — resort village on the sandy
  lagoon at the southern end of Harrison Lake beneath the Coast Mountains"
- **Info-gain:** 1880s hot-springs resort economy + lagoon-front / high-groundwater lakefront building stock
  on the Miami River corridor, tied to service planning, with coverage geometry (Agassiz/Kent 8 km,
  Chilliwack 20 km). Signals 9. Verified.

Both pass the find-and-replace test: delete the place name and the harbour/lake, wineries, hot springs,
named neighbours, and coverage geometry remain.

---

## 7. Images, schema, crawler notes

- **Image manifest (`deliverables/bc_image_manifest.json`, 181 rows):** tier = `flag` fallback (no
  per-place photo library shipped) — but every alt/title/caption/EXIF/filename **describes the place**, never
  the flag. Filenames `{location-slug}-{region-slug}-bc.webp`; two-layer alt (stored geo-only + rendered
  `{SERVICE_CATEGORY}` prefix); all 181 alt strings unique; license CC0/Public-Domain. Upgrade any row to
  tier `real`/`region` later by swapping `contentUrl` — metadata stays.
- **Schema (per-page spec, ready to render):** one `@graph` with `{LOCALBUSINESS_TYPE}` (defined once,
  referenced by `@id`), `Service` + `areaServed` City + `GeoCircle` (geoRadius in **metres**), `WebPage` +
  `speakable[.answer-first]`, `BreadcrumbList`, `FAQPage` (verbatim), `ImageObject`. No self-serving
  `aggregateRating`; no `HowTo`.
- **Static render:** all body copy + JSON-LD land in initial HTML; map is a facade (click-to-load iframe).
- **Sitemap (`deliverables/bc_sitemap.xml`):** 194 URLs (hub + 12 region pages + 181 locations), honest
  `<lastmod>` = 2026-07-11. Needs_Review row excluded.
- **OGL compliance:** GeoNames/StatCan sources recorded in `Data_Sources`; site footer must carry
  *"Contains information licensed under the Open Government Licence – Canada."*

---

## 8. Deliverables (in this folder)

| File | What |
|---|---|
| `deliverables/bc_master_seo_database_UPGRADED.xlsx` | All 480 rows, original 4 sheets + 8 new QC columns (Unified_Score, Gate_Publishable, Defer_Reason, Hero_Image_Alt_Geo, Info_Gain_Element, Signals_Count, Geo/Pop source) |
| `deliverables/bc_image_manifest.json` | 181 images — tier, two-layer alt, EXIF, license |
| `deliverables/bc_page_structure.json` | Per-page linking law (breadcrumb, UP/SIDEWAYS/DOWN/blog) |
| `deliverables/bc_region_pages.json` | 12 region hub pages + children |
| `deliverables/bc_sitemap.xml` | Segmented sitemap, honest lastmod |
| `deliverables/bc_audit_stats.json` | Machine-readable audit (this report's numbers) |
| `out/BC-XXXX.json` (182) | Per-location generated content |
| `bundles/BC-XXXX.json` (182) | Grounding bundles |
| `bc_rows_upgraded.json` | Full merged 480-row dataset |
| `assemble.js` · `build_artifacts.js` · `bc_phase_d_resume2.js` | Reproducible pipeline |
| `RESUME.md` | Run-state / resume notes |

**Reusable for the next province:** identical pipeline; only the two hubs + region bundles change.
