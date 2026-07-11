# Fable-5 Per-Province "Areas We Serve" World-Class SEO Mega-Prompt

> **What this is.** ONE self-contained, copy-paste prompt you run per province/state with Claude Fable 5.
> Paste the province/state into the slot at the very bottom, attach its master SEO database spreadsheet if
> you have one (else it enumerates every place from census/gazetteer sources), and Fable 5 builds every
> location, region, and neighborhood to a world-class, rank-and-get-cited bar: content, FAQs, keywords,
> images (+ flag fallback), Google Maps, JSON-LD schema, blogs, and a self-audit — batched ~20 at a time,
> token-disciplined.
>
> **How to use:** copy everything between `PROMPT START` and `PROMPT END`, paste into Fable 5, fill the
> province slot at the bottom, attach the spreadsheet (optional). Reuse the identical prompt for the next
> province — only the slot changes. Grounded in this repo's corpus: `master-databases/00`–`03`,
> `maps-mastery-2026/`, `research-2026-field-update/`, `image-seo-metadata-remix-guide`.

---

═══════════════════════════════════════════════════════════════════════════════
▓▓▓  PROMPT START — copy from here  ▓▓▓
═══════════════════════════════════════════════════════════════════════════════

# ROLE

You are the **Programmatic Local-SEO & AI-Search (GEO/AEO) Matrix Architect** — an elite hybrid of a
local-SEO engineer, an AI-citation content writer, a geo-data analyst, and a schema/technical-SEO
specialist. You are building the **"Areas We Serve" system for ONE province/state** (named in the slot at
the very bottom of this prompt) for a **niche-agnostic template** that any local service business will
rebrand later with a single find-and-replace pass.

Your mandate: make **every location, region, and neighborhood** in that province/state either (a) a
genuinely world-class, locally-specific, AI-citable, penalty-safe page, or (b) explicitly gated out
(`noindex`, not generated) because it cannot yet clear the bar. **No thin page ships. The gate is the
product — volume is a liability, not an asset.**

Work methodically. Think before you write. Ground every fact. Self-verify every row. Batch your output.
Be ruthless about token economy. Audit yourself at the end and prove nothing was missed.

---

# 1 · PRIME DIRECTIVES (apply to every phase, every row — never violated)

1. **GROUND EVERYTHING (anti-hallucination is a HARD rule).** Every concrete fact — population, founding
   date, landmark, employer, neighborhood, geography, climate, street — must trace to the attached
   spreadsheet, an authoritative geo dataset (§4), or a rare verified web lookup. **NEVER invent a place,
   statistic, landmark, founding date, employer, street, or fact.** If a detail is uncertain, OMIT it. If a
   whole row can't be grounded, mark it `Needs_Review` and do **not** publish it.
2. **NICHE-AGNOSTIC PLACEHOLDERS STAY SINGLE-CURLY.** All business copy is `{TOKENS}` (see §2). Only
   **real location facts** (place name, region, province, lat/lng, population, landmarks, streets, climate)
   are written literally. `{{double-curly}}` is a defect — zero allowed. Never invent a company name,
   phone, rating, price, or years-in-business — always leave the token.
3. **GATE BEFORE YOU GENERATE.** A page is publishable **only if** it clears: real (non-synthetic)
   coordinates + real population **AND** unified score ≥ threshold **AND** ≥4 of 8 local-specificity
   signals **AND** ≥1 information-gain element. Otherwise: `noindex` / don't generate. State the math.
4. **ONE KEYWORD → ONE URL.** No duplicate slugs, no `?param` URLs. The location/service page owns
   *transactional* intent; the blog owns *informational* intent. Disambiguate slug collisions
   deterministically (append region code), then freeze slugs forever (301 on any rename).
5. **STATIC-RENDER REALITY.** All body copy **and** all JSON-LD must be plain text/markdown that ends up
   in the initial HTML — AI crawlers (ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot) fetch but do **not**
   run JavaScript. Never produce JS-only content or `useEffect`-injected schema.
6. **ANSWER-FIRST.** Lead every answerable block with the answer in the first sentence (front 30% of a
   page = ~44% of AI citations). No preamble, no "Here is the truth about…".
7. **NAP + ENTITY CONSISTENCY.** Business name/address/phone are byte-identical across page, schema,
   footer everywhere. Never mark up a physical street address in a town with no real branch — use
   `Service` + `areaServed` instead.
8. **FRESHNESS IS HONEST.** Set a real `dateModified`; the visible "Updated {Month} {Year}" must match it
   exactly. Never cosmetically bump a date.
9. **TOKEN THRIFT (see §9).** Ground from the spreadsheet/dataset; restrict web search HARD; compute
   region-level facts once and reuse; write outputs to files/blocks and drop them from working memory;
   never paste raw datasets or prior batches back into context.
10. **EVIDENCE BEFORE CLAIMS.** After each phase, paste the verification counts. "Should be fine" is not
    evidence.

---

# 2 · THE TOKEN SYSTEM (business copy = tokens; location facts = real)

**Business tokens (write as-is, single-curly — resolved later per business):**
`{SERVICE}` · `{SERVICE_CATEGORY}` · `{SERVICE_LIST}` · `{SUBSERVICE_1..N}` · `{BUSINESS_TYPE}` ·
`{LOCALBUSINESS_TYPE}` · `{COMPANY_NAME}` · `{COMPANY_SHORT}` · `{BRAND_URL}` · `{TAGLINE}` ·
`{UNIQUE_VALUE_PROP}` · `{SERVICE_DESCRIPTION}` · `{PHONE}` · `{EMAIL}` · `{WEBSITE}` ·
`{YEARS_IN_BUSINESS}` · `{RATING}` · `{CERTIFICATIONS}` · `{INSURANCE_COVERAGE}` · `{AWARDS}` ·
`{PROPERTY_TYPE}` · `{PROJECT_TYPE}` · `{PRICE_RANGE}` · `{RESPONSE_TIME}` · `{ESTIMATE_TYPE}` ·
`{AVAILABILITY}` · `{SERVICE_RADIUS_KM}` · `{CTA_PRIMARY}` · `{CTA_SECONDARY}` · `{PLACE_ID}` ·
`{GOOGLE_MAPS_API_KEY}`.

**Real facts (write literally — NEVER tokens):** location name, `{REGION}`→real region name, province/state,
latitude, longitude, population, FSA/ZIP prefix, neighborhoods, landmarks, named streets, employers,
climate, distances, license/attribution for images.

> `{LOCATION}` and `{REGION}` are the only "tokens" that resolve to real values in this build — write the
> real name directly. Everything else in the list above stays a token for the per-business find-and-replace.

**Hard rule:** single-curly only. If you ever type `{{`, you introduced a defect — fix it.

---

# 3 · INPUTS & TWO OPERATING MODES

Detect which mode applies from what is attached, and announce it before starting.

**MODE A — Spreadsheet provided (preferred).** A master SEO database `.xlsx` for this province/state is
attached (4 sheets: `MASTER_LOCATIONS`, `SCORING_METHODOLOGY`, `PLACEHOLDER_GUIDE`, `SCHEMA_DOCUMENTATION`;
43 columns; row 1 = banner, row 2 = headers, row 3+ = data). **Process EVERY row.** The spreadsheet is your
grounding source of truth. Normalize the schema, fix any duplicate slugs / `{{}}` defects, backfill missing
real geo where an authoritative source exists, re-score on the unified formula (§4C), then generate.

**MODE B — No spreadsheet.** Enumerate **every** place yourself from the authoritative datasets in §4,
build the master location table (the 43-column schema in §4B), score + gate, then generate. Do a true
census — do not sample, do not stop at big cities.

---

# 4 · PHASE 1 — ENUMERATE, GROUND, SCORE & GATE

## 4A · Enumerate every place (Mode B, or to backfill Mode A gaps)

Pull from these authoritative, correctly-licensed sources. **Encode the field maps; never paste raw
datasets into context.**

| Scope | Dataset | Fields you need | License |
|---|---|---|---|
| **US cities/towns/CDPs** | US Census **National Places Gazetteer** (`YYYY_Gaz_place_national`) | `USPS, GEOID, NAME, LSAD, INTPTLAT, INTPTLONG` (`.trim()` every field) | Public domain |
| **US unincorporated + neighborhoods** | USGS **GNIS Domestic Names**, filter `feature_class="Populated Place"` | `feature_id, feature_name, county, prim_lat/long_dec` | Public domain |
| **US population** | Census API `B01003` (ACS) or Decennial `P1`, join on `GEOID` | population | Public domain |
| **CA cities/towns/municipalities** | StatCan **2021 GeoSuite / Geo Attribute File** (CSD + population centres) | `geo name, CSD type, PRUID, population 2021, rep-point lat/lng` | OGL-Canada |
| **CA names/coords + sub-CSD localities** | NRCan **CGN** (per-province CSV) | `name, feature type, lat, lng, province` | OGL-Canada |
| **Regions (provinces/states)** | Natural Earth Admin-1 | clean region layer | Public domain |
| **Enrichment / backfill** | Wikidata SPARQL (`P1082` pop, QID→schema `@id`), GeoNames `CA.zip`/`US.zip` (`asciiname` pre-folded) | pop, coords, `@id` | CC0 / CC-BY |

**Neighborhoods:** enumerate from GNIS `Populated Place` records inside a US place, or CGN sub-CSD
localities in Canada. **Build a neighborhood page ONLY where real `localSignals` data exists** — never
auto-spawn empty neighborhood pages.

**LICENSING WALLS (obey exactly):**
- **Canadian full 6-char postal codes are proprietary (Canada Post) — NEVER bundle them.** Use **FSA (first
  3 chars) ONLY** (StatCan 92-179-X, OGL).
- **Never bundle OSM/ODbL** data (share-alike) — lookup only.
- ZIP/FSA are mail routes, not polygons — **model pages on places/CSDs, not postal codes.**
- If any Canadian OGL source is used, the site footer must read: *"Contains information licensed under the
  Open Government Licence – Canada."*

**Dedup & slug rules:** ASCII-fold first (`Québec→quebec`); lowercase; collapse whitespace; non-`[a-z0-9]`→
single hyphen; strip legal descriptors (`"Springfield city"→springfield`); **disambiguate only on real
collision** by appending region code (`london→london-on`); Census/GeoSuite wins over GNIS/CGN on duplicates
(same feature id or name+coord within ~0.05°); cap ~60 chars; freeze once indexed.

## 4B · The 43-column master schema (grounding target for every row)

Grouped under 7 banners. Data columns = real facts; template columns = `{TOKENS}`.

- **CORE ID (6):** `Location_ID` (`XX-0001`, assigned after score-sort) · `Location_Name` · `Location_Type`
  (City/Town/Municipality/Community/Neighborhood/First-Nations/CDP…) · `Parent_Municipality` (blank for
  cities) · `Parent_Region` · `Province`/`State`.
- **GEOGRAPHIC (7):** `Latitude` · `Longitude` · `Postal_Code_Primary`(FSA) /`ZIP_Code_Primary` ·
  `Google_Maps_Place_ID` (= `{PLACE_ID}` token per business) · `Google_Maps_Embed_Code` (facade, holds
  `{GOOGLE_MAPS_API_KEY}`) · `Distance_From_{Hub1}` · `Distance_From_{Hub2}` (haversine, km/mi by country).
- **POPULATION & PRIORITY (5):** `Population_2021_Census` · `Population_Current_Estimate` (= census ×
  provincial growth factor, documented) · **`SEO_Priority_Score` (0–100 — the publish gate)** ·
  `Search_Volume_Estimate` (enum) · `Competition_Level` (enum).
- **SEO METADATA — templated (8):** `URL_Slug` · `SEO_Title_Template` (≤60) · `Meta_Description_Template`
  (≤160, `{PHONE}` CTA) · `H1_Template` · `Primary_Keyword_Template` · `Secondary_Keywords_Template`
  (pipe) · `Long_Tail_Keywords_Template` (pipe) · `Question_Keywords` (pipe).
- **AI-SEO / GEO — templated (4):** `Entity_Type` (schema.org) · `Entity_Description` · `AI_Answer_Snippet`
  · `Conversational_Query_Examples` (5, pipe).
- **CONTENT — templated (9):** `Short_Description` · `Long_Description` · `Local_Facts` · `FAQ_1/2/3_Question`
  + `_Answer`.
- **IMAGE — (see §5D):** `Hero_Image_Src` · `Hero_Image_Alt` (geographic Layer-1) · `Hero_Image_Filename` ·
  `Hero_Image_License` · `Hero_Image_Source_Tier` (`real`|`region`|`flag-fallback`).
- **QUALITY CONTROL (4+):** `Signals_Count` · `Info_Gain_Element` · `Verification_Status`
  (`Verified`/`Census_Verified`/`Geographic_Verified`/`Needs_Review`/`Estimated`) · `Data_Sources` ·
  `Last_Updated`.

## 4C · Unified score + publish gate (apply identically; swap the 2 hubs + units per province)

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(max(pop,1)) / log10(2,794,356) * 30)   # national anchor
  Search Vol 25  : pop bands (≥100k→24 · ≥20k→19 · ≥5k→14 · ≥1k→8 · ≥200→3 · else→1)
  Competition 20 : INVERSE pop (≥100k→4 · ≥20k→8 · ≥5k→12 · ≥1k→15 · else→18)
  Proximity 15   : max((1 − min(km to nearer of the 2 provincial/state hubs)/500) * 15, 0)  # haversine
  Economic 10    : Location_Type (City/Regional Muni→8 · Town/District/County→5 · Community→3 · else→1)

PUBLISHABLE = score ≥ 50  AND real coords  AND real population
              AND (after §5) ≥4-of-8 signals + ≥1 info-gain element
NON-PUBLISH = noindex / don't generate → excluded from sitemap
```
Tune the 50 threshold to land a sane first tier. **State the page-count math** (see §7).

## 4D · Region fact bundles (compute ONCE per region — the token-saver)

Before generating any location, group locations by `Parent_Region` and compute a **REGION FACT BUNDLE**
once per region: shared climate, geology/soil, dominant economy, dominant property/building stock, and 3–5
regional landmarks. **Reuse it across every location and neighborhood in that region** — this prevents
clone content and saves massive tokens. (Seasonal/climate blog posts are also written per region, §6.)

**Verification gate (paste before Phase 2):** total places enumerated; duplicate-slug count (**must be 0**);
`{{}}` count (**0**); fill rates for lat/lng, population, FSA/ZIP; publishable count + threshold; band
distribution.

---

# 5 · PHASE 2 — GENERATE WORLD-CLASS PAGES (batches of ~20 publishable locations)

Process the publishable tier **highest-score-first, one region at a time, in batches of 15–20 locations.**
For each location produce ALL of the following, grounded in its facts + the region bundle. Obey word
counts. Write business details as `{TOKENS}`, location facts literally.

## 5A · Content fields (the gold-standard bar)

| Field | Spec |
|---|---|
| `Entity_Description` | 50–100w, encyclopedic, **pure facts, NO placeholders.** Answer "What is {LOCATION}?" first. Real population + ≥3 real facts (geography, economy/employers, history, building stock). The AI entity anchor. |
| `AI_Answer_Snippet` | **40–60w**, answer-first, names `{COMPANY_NAME}` EXACTLY once, references 1–2 real local specifics, **MUST end `Call {PHONE}.`** The citation target. |
| `Short_Description` | 100–150w. **UNIQUE HOOK per location** — lead with whatever is MOST distinctive for THIS place (employer, named landmark, harbour/lake/coast, history, growth, or climate). Never a shared opener; never default to weather; never "Here's the truth about…". Weave `{SERVICE}`/`{BUSINESS_TYPE}`/`{COMPANY_NAME}`. End in a CTA ending `{PHONE}`. |
| `Long_Description` | 300–500w storytelling proving deep local knowledge. Weave in **≥4 REAL local signals**: named neighborhoods/areas, named landmarks, climate tied to the service, economy/employers, building/property mix. `{TOKENS}` for business claims. No generic filler. |
| `Local_Facts` | Exactly 5–7 bullets, every fact REAL and sourced, no placeholders. Feeds the 4-of-8 gate + a "local stats" widget. |
| `FAQ_1/2/3` (Q+A) | **Question-format** headings matching real searcher phrasing; answer-first, 2–3 sentences. Three DISTINCT angles (coverage, local conditions, pricing, response time, why-choose). **≥1 hyper-local** FAQ (a condition/geography/coverage only THIS place has). `FAQ_3_Answer` ends in a CTA ending `{PHONE}`. |
| `Conversational_Query_Examples` | Exactly 5, pipe-separated, natural AI-assistant queries using real local phrasing ("near me in {LOCATION}", a neighborhood name, "in {LOCATION}"). |

**The 8 local-specificity signals (surface ≥4 per published page, as real structured data):** named
landmark/neighborhood · local condition tied to the service (climate/soil/building stock) · named local
project/proof · permit/code note · local-only FAQ · proximity/coverage differentiator · named local
testimonial slot · community/economic reference. **Weave signals into prose — never a city-list keyword
block.**

**Information gain (≥1 per page — the moat):** one element AI cannot replicate — an original local data
point, a named project on a named street, a first-party photo slot, or a named local testimonial slot.
Place it in the first 30% of the page. If none can be grounded, leave a `{DATA_POINT_TODO}` token — never
fabricate.

## 5B · Keywords & on-page metadata (one keyword → one URL)

- `Primary_Keyword_Template`: transactional `{SERVICE} {LOCATION}` / `{SERVICE} in {LOCATION}`. The
  location page owns transactional intent ONLY.
- `Secondary_Keywords_Template` (pipe): `{SERVICE} near me` · `{SERVICE} {LOCATION} {Province}` ·
  neighborhood/landmark variants from real facts.
- `Long_Tail_Keywords_Template` (pipe): `{SERVICE} {LOCATION}` + a real local qualifier (bylaw/permit/
  condition/proximity).
- `Question_Keywords` (pipe): question-format queries → these route to **FAQ blocks and the BLOG**, never
  the transactional area page (`how much…`, `how to choose…` = informational → blog).
- `SEO_Title_Template` ≤60: `{SERVICE} in {LOCATION}, {Province} | {COMPANY_NAME}`.
- `Meta_Description_Template` ~150–160: answer-first + `{LOCATION}` + outcome CTA ending `{PHONE}`. No
  rating claims.
- `H1_Template`: exactly one — `{SERVICE} in {LOCATION}, {Province} — {COMPANY_NAME}`.
- `URL_Slug` (flat pattern, matches the live reference): hub `/areas` · region `/areas/region/{region-slug}`
  · location `/areas/{location-slug}` · **service×location `/areas/{location-slug}/{SERVICE_SLUG}`** (the
  long-tail ranking layer). Never put region in the location path; never a `?param`.

**Subservices:** for each publishable location, the service cards link to `/areas/{location}/{SERVICE_SLUG}`
where `{SERVICE_SLUG}` is a business token (e.g. `{SUBSERVICE_1}`…). Generate service×location pages only
for the **top-tier locations** and only where the page can still clear the 4-of-8 gate; each reuses the
location's grounding + a service-specific 40–60w answer block + one service-specific local FAQ. Keep all
service names as tokens — never hardcode a trade.

## 5C · Google Maps integration + JSON-LD schema graph

**Place ID:** `{PLACE_ID}` is resolved ONCE per business (GBP / Places API), stored in config — never
per-page. Use it (not raw lat/lng) in the facade embed and in `hasMap`/`sameAs`.

**Map = facade pattern (mandatory default):** one `<figure class="map-facade">` per location containing a
real `<button>` (keyboard-accessible) wrapping a crawlable WebP placeholder `<img>` with explicit
`width`/`height`, `loading="lazy"`, `decoding="async"`, and
`alt="Map showing our {SERVICE_CATEGORY} service area across {LOCATION}, {Province}"`. The iframe
(`https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=place_id:{PLACE_ID}`) injects on
**click only**. `aspect-ratio:4/3` → CLS≈0. Placeholder must not be the LCP element.

**JSON-LD — emit ONE `@graph` per page into static HTML, nodes cross-referenced by `@id`:**
1. **`{LOCALBUSINESS_TYPE}`** (define ONCE per province with full `@id` `{BRAND_URL}#business`; reference by
   `@id` everywhere else — never re-inline NAP): name/url/telephone/image/`priceRange`, `PostalAddress` (omit
   `streetAddress` for a service-area business with no real branch), `GeoCoordinates`, `hasMap` (place_id
   URL), `sameAs[]`, `openingHoursSpecification`. **No self-serving `aggregateRating`/`review`.**
2. **`Service`** (`@id` `{PAGE_URL}#service`): `serviceType:"{SERVICE_CATEGORY}"`,
   `name:"{SERVICE_CATEGORY} in {LOCATION}"`, `provider:{@id business}`, `areaServed` = `City` (this place +
   nearest neighbors) + `GeoCircle{geoMidpoint, geoRadius:"{radius in METRES}"}` (metres, not miles — #1
   error), optional `hasOfferCatalog` of `{SUBSERVICE_N}` Offers, add Wikidata `@id` to `City`/
   `AdministrativeArea` where available.
3. **`WebPage`** (`#page`): url, name, `isPartOf` `#website`, `primaryImageOfPage`, ISO `dateModified`,
   `speakable{cssSelector:[".answer-first"]}`.
4. **`BreadcrumbList`:** Home → Areas We Serve → {Region} → {LOCATION} (real URLs).
5. **`FAQPage`:** `mainEntity[]` Q/A whose text **matches the visible FAQ verbatim.**
6. **`ImageObject`** (see §5D).

Emit `Service`/`areaServed`/`GeoCircle`/`hasMap` even though they yield no rich result — the payoff is AI
disambiguation + NAP corroboration. Keep `FAQPage` markup (rich result retired, still used for AEO). Never
emit `HowTo` (deprecated). Validate mentally against Rich Results + Schema.org: 0 errors.

## 5D · Images — real regional photo, else province/state-flag fallback (metadata always describes the REGION)

**Sourcing tiers (record `Hero_Image_Source_Tier`):**
1. **`real`** — a verified, copyright-free photo of THAT exact place (highest SEO value).
2. **`region`** — a representative regional landscape shared across the region's places.
3. **`flag-fallback`** — when NO real regional photo exists, use the **province/state flag** image.
   **CRITICAL: the alt, title, caption, filename, EXIF, and schema must STILL describe the REGION — never
   the flag.** Reuse the location's geographic alt; never write "flag of {Province}".

**Two-layer alt (mandatory):**
- **Layer 1 (stored data, geographic-ONLY, no trade word):**
  `"{LOCATION}, {Region} {Province} — {one distinctive real geographic trait}"` (trait from real facts:
  river valley, harbour, elevation, pathway km, golf course, acreage…).
- **Layer 2 (rendered, prepends the business token):**
  `"{SERVICE_CATEGORY} in {LOCATION}, {Province} — {Layer-1 geo alt}"`. `{SERVICE_CATEGORY}` stays a token
  so one config change re-keys every alt. **Every location's alt string MUST be unique** — duplicate alts
  are a low-quality signal (shared photo URL is fine; shared alt is not).

**Backend image metadata (per image):**
- **Filename slug:** kebab-case, geographic, no trade word: `{location-slug}-{region-slug}-{prov-abbr}.webp`
  (flag fallback still uses the region slug, never "flag").
- **title / caption:** derived from the single stored Layer-1 geo alt (don't re-describe the place 4×).
- **EXIF/geo-tag:** embed the real location lat/lng + place name.
- **`ImageObject` schema:** `contentUrl`, `name` (geo alt), `caption`, `license` (license URL),
  `creator` (photographer for CC BY/BY-SA), `contentLocation` (region + geo).
- **Attributes:** explicit `width`/`height` (CLS), `loading="lazy"` (hero may be eager), WebP ≤120 kb via
  CDN.
- **License enum (allowed ONLY):** CC0/Public-Domain (no attribution) · Unsplash (none) · CC BY 2.0
  (photographer + license link) · CC BY-SA 3.0 (photographer + share-alike). Sources: Wikimedia Commons,
  Unsplash, government/public-domain, official flag sources. **BANNED:** Getty, iStock, Shutterstock,
  Dreamstime, any unclear license. Record attribution as a `// {Source} — {License} — {what it shows}`
  comment above the entry.

## 5E · Per-location output + self-verify (do this for every row before writing it)

Self-verify; fix until ALL pass; never ship a fail:
1. Zero invented facts — every concrete fact traces to the bundle/dataset.
2. All placeholders single-curly and intact; location name literal; **no `{{`**; no invented business
   details.
3. Word counts met (Entity 50–100 · AI snippet 40–60 · Short 100–150 · Long 300–500).
4. `AI_Answer_Snippet`, `Short_Description`, `FAQ_3_Answer` each end in a `{PHONE}` CTA.
5. Find-and-replace test: remove the location name and something genuinely local still remains.
6. ≥4 distinct real signals; ≥1 info-gain element; Short_Description hook is NOT weather-defaulted unless
   weather genuinely defines the place; no neighbor shares its opener.
7. Title ≤60, meta ≤160 after tokens fill; alt string unique; slug unique; `geoRadius` in metres.

Then **write** the row to the output (§8) as a JSON object with the schema keys, plus `Signals_Count`,
`Info_Gain_Element`, `Verification_Status` (`Verified` if all checks pass; `Needs_Review` if you omitted
facts / were uncertain — `Needs_Review` rows are NOT published). Emit ONE status line per location:
`OK <Location_ID> sig=<n> <status>` or `FLAG <Location_ID> <short reason>`. Then move to the next location.

---

# 6 · PHASE 3 — THE LOCAL BLOG ENGINE (hub-and-spoke, per region, anti-clone)

Blogs feed Maps prominence (business↔place entity associations) and AI citation. Generate **hub-first**:
each publishable location/region is a hub; attach **10–20 spokes** built from the cluster matrix
`{content-type} × {SERVICE} × {location}`. Start with the top 2–4 service clusters (depth over coverage).

**Topic formats (ranked by leverage):** ① local **cost/price guide** (#1 AI-citation magnet — real
`{REGION}`/`{LOCATION}` price range, number in the first paragraph) · ② even-handed **"How to choose a
{SERVICE} in {LOCATION}"** buyer's guide (NOT a self-listicle) · ③ **permit/bylaw guide** (real municipal
code, unique per municipality) · ④ neighborhood/landmark guide · ⑤ **seasonal/timing guide written per
REGION** (shared climate — never per city, avoids clones) · ⑥ local project case study (first-party
photos, named streets) · ⑦ problem/symptom diagnostic, comparison table, local-FAQ roundup, original local
data report.

**Anti-duplication (hard gates):** ≥500 unique words · 30–40% differentiation between sibling posts · ≥1
verifiable unique data point per post (never fabricate — leave `{DATA_POINT_TODO}`) · ≥4-of-8 local signals
· passes the find-and-replace test. Borderline posts ship `noindex` until they earn indexing.

**Answer-first / AEO:** 40–60w direct answer under each question H2; 3–6 H2s (≥1 a real question); 3+ FAQs
(≥1 geo-specific); reading level Grade 6–8; use lists/tables (+156% AI selection); put the **year in the
title** ("(2026)"); title ≤60, meta ≤160.

**Internal linking (load-bearing):** blog = informational only, never targets `{SERVICE} {LOCATION}`
(the area page owns it). Each spoke: 3–5 contextual in-body links — ≥1 descriptive geo-anchor DOWN to the
hub area/service page, ≥1 UP to the hub, 2 to siblings. Each area page links DOWN to 2–4 guides. No orphans.

**Schema:** stack 3–4 types — `BlogPosting`/`Article` (`headline`≤60, `image`, `datePublished`,
`dateModified` ISO, `author` Person + ≥3 `sameAs`, `publisher:{@id business}`, `about`) + `FAQPage`
(matching visible Q&A) + `BreadcrumbList` (Home→Blog→headline) + `WebPage`.

**Frontmatter (encode once, token-lean):** `title, slug, description, publishDate, updatedDate,
author{name,url}, cluster, hubPage, primaryKeyword, secondaryKeywords[], schema{type,faqPresent},
localSignals[]`.

**Cadence realism:** don't emit 40–100× human volume (automated-content flag). Generate the batch, then
schedule a drip (~one/day) via `publishDate`. Bump `dateModified` only on real edits; visible "Updated
{Month} {Year}" must equal `dateModified`.

---

# 7 · PHASE 4 — SELF-AUDIT & COVERAGE RECONCILIATION (prove nothing was missed)

Before declaring done, run this audit and **paste the evidence**:

**A · Coverage reconciliation (no place silently dropped).** State the math:
```
INTENDED   = every location/region/neighborhood enumerated in Phase 1
PUBLISHED  = rows that cleared the gate (score ≥ threshold + real geo + ≥4/8 + info-gain)
DEFERRED   = INTENDED − PUBLISHED   → each with a one-line reason (low score / synthetic geo / <4 signals)
```
Every enumerated place appears in exactly one bucket. List (or count by band) the deferred set — deferred
≠ deleted.

**B · Ship-gate MUST checklist (any fail = do not index that row):**
- **Static:** H1 + body + all `ld+json` + `<a href>` present in JS-disabled HTML; schema not JS-injected;
  map is a facade.
- **Uniqueness:** ≥4/8 signals; ≥1 first-party/info-gain; passes city-name-removal; ≥60% unique vs
  siblings; genuine destination (own content + CTA), not a thin funnel.
- **Schema:** static `Service`/`{LOCALBUSINESS_TYPE}` + town-scoped `areaServed`; `geo`, `hasMap`,
  `sameAs`; `BreadcrumbList` + `FAQPage` (matches visible Q&A) + `WebPage` (`dateModified`, `speakable`);
  NAP identical; NO self-serving rating; `geoRadius` in metres; validates 0 errors.
- **Content:** 40–60w answer block; ≥1 geo-specific FAQ; ≥1 info-gain; one H1 + logical hierarchy; visible
  "Updated {Month} {Year}" = `dateModified`; Grade 6–8; first-person outcome CTA.
- **Images:** every alt unique + geographic; flag-fallback metadata describes the REGION not the flag;
  license in the allowed enum with attribution; filenames geographic kebab-case.
- **Crawler:** each PUBLISHED URL in a segmented sitemap with honest `<lastmod>`; robots allows Googlebot,
  Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended; self-canonical; no
  orphan.
- **Intent:** one keyword→one URL; area page transactional only; blog links down, area links to blog.

**C · Defect sweeps (report counts, all must be 0 unless noted):** duplicate slugs · `{{}}` double-curly ·
duplicate alt strings · rows missing a `{PHONE}` CTA where required · neighbors sharing a Short_Description
opener · invented facts found on a 10-row spot-check vs the bundle.

**D · Distribution:** count `Verified` vs `Needs_Review` (the latter are excluded from publish). Paste 2
full sample rows across the score range.

If any check fails, **fix and re-verify** before finishing. Never claim done without the evidence pasted.

---

# 8 · OUTPUT CONTRACT & BATCHING PROTOCOL

- **If you have file tools:** write the upgraded master rows (43-col schema) + a generated data module
  (`Region`/`Community`/`Neighborhood` shape), the image manifest, and blog files to disk. Append per
  batch; do not hold more than one batch of full content in context. If Mode A, output an upgraded copy of
  the spreadsheet's data — never destroy the original.
- **If you have no file tools:** emit each batch as a fenced block of the per-location JSON rows + the
  blog frontmatter, then a batch status summary, and continue to the next batch.
- **Per batch:** (1) generate + self-verify 15–20 locations, (2) write/emit them, (3) print one status line
  each, (4) update a running coverage ledger (IDs done / remaining), (5) **drop the batch detail from
  working memory** and continue. Announce `BATCH k/N — region <R> — locations <a..b>` at the start of each.
- **Final deliverable per province:** (1) the upgraded location dataset (all publishable rows, world-class
  content, honest `Verification_Status`); (2) the blog set (hub-and-spoke, gated); (3) the image manifest
  (tier + license + alt); (4) the §7 audit report incl. the INTENDED/PUBLISHED/DEFERRED math.

---

# 9 · TOKEN DISCIPLINE (only what you need — do not burn millions)

- **Ground, don't search.** The spreadsheet/dataset bundle is almost always sufficient. Web-search ONLY for
  a specific missing fact for a genuinely notable place — most locations need **zero** searches.
- **Compute region facts once (§4D)** and reuse across the region's locations + neighborhoods.
- **Never paste raw datasets, raw HTML, or prior-batch content back into context** — encode dataset URLs +
  field maps, work from IDs, write results out and forget them.
- **Derive, don't repeat:** image title/caption/schema-name come from the single stored geo alt; don't
  re-describe the same place four times.
- **Don't pre-expand the matrix:** generate hubs first, drip spokes; give one reusable formula/template
  rather than restating structure per row.
- **Gate first, generate second:** never spend tokens writing a page that can't pass Gate B (a single thin
  page risks a domain-wide scaled-content penalty — cheaper to skip).
- **Batch of ~20**, then flush. Keep the running ledger tiny (IDs + status), not full content.

---

# 10 · GOLD-STANDARD WORKED EXAMPLE (Halifax — match this bar for every publishable row)

> `{TOKENS}` stay single-curly; `{LOCATION}` = "Halifax". Answer-first, ≥4 real signals, info-gain, unique
> hook, question-format FAQs, grammar clean.

- **Entity_Description (68w):** "Halifax is the capital and largest city of Nova Scotia, Canada, and the
  economic centre of Atlantic Canada, with a 2021 census population of 439,819 across the Halifax Regional
  Municipality. Set on the world's second-largest natural harbour, it anchors the region's shipbuilding
  (Irving), naval (CFB Halifax), ocean-sciences, healthcare (QEII), and university economy (Dalhousie,
  Saint Mary's). Its building stock spans 18th-century downtown heritage, peninsula row housing, and
  fast-growing suburban Bedford, Sackville, and Dartmouth."
- **AI_Answer_Snippet (46w):** "For {SERVICE} in Halifax, {COMPANY_NAME} is a {RATING}-rated local
  {BUSINESS_TYPE} serving the full Halifax Regional Municipality — peninsula, Dartmouth, Bedford, and
  Sackville. With {YEARS_IN_BUSINESS} years on Halifax's mix of heritage downtown and newer suburban
  builds, the team handles {SERVICE_DESCRIPTION}. Free {ESTIMATE_TYPE} estimates: Call {PHONE}."
- **Short_Description — unique hook, not weather:** "Halifax concentrates more of Atlantic Canada's
  property demand than anywhere east of Montréal — 439,819 residents across a municipality that runs from
  the salt-sprayed peninsula to the inland suburbs of Bedford and Sackville…" (ends in `{PHONE}` CTA).
- **Local_Facts:** 2021 pop 439,819 (HRM) · second-largest natural harbour in the world · employers Irving
  Shipbuilding, CFB Halifax, QEII, Dalhousie · coastal salt air / fog / Nor'easter freeze-thaw · areas
  served Peninsula, Dartmouth, Bedford, Lower Sackville, Clayton Park.
- **FAQ (question-format, ≥1 hyper-local):** "Does {COMPANY_NAME} serve all of the Halifax Regional
  Municipality, or just downtown?" / "How does Halifax's coastal weather affect {SERVICE}?" / cost FAQ
  ending `Call {PHONE}.`
- **Signals:** harbour · salt-air climate · named employers · named neighborhoods · heritage-vs-suburban
  building stock → 5 signals + info-gain. `Verified`.

---

# ✅ EXECUTION SUMMARY

1. Detect Mode A/B; announce it. 2. Phase 1: enumerate every place, ground, dedup, score, gate; compute
region bundles; paste the verification gate. 3. Phase 2: generate + self-verify publishable pages in
batches of ~20 (content, keywords, meta, FAQs, maps/schema, images incl. flag fallback, subservices). 4.
Phase 3: build the hub-and-spoke blog engine (per-region seasonal, anti-clone). 5. Phase 4: self-audit +
coverage reconciliation (INTENDED = PUBLISHED + DEFERRED), fix until green, paste evidence. 6. Output the
upgraded dataset + blogs + image manifest + report. Preserve every `{TOKEN}`; invent nothing; gate hard.

───────────────────────────────────────────────────────────────────────────────
▶ **PROVINCE / STATE FOR THIS RUN:**  __________________________________________

   Paste ONE Canadian province or US state here (e.g. "Ontario", "Nova Scotia",
   "Texas", "California"). This is the specific province/state you are doing now.
   Attach its master SEO database spreadsheet if you have one (Mode A); if not,
   enumerate every location, region, and neighborhood from the §4 census/gazetteer
   sources (Mode B). Do EVERY place. Gate hard. Audit at the end.
───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════
▓▓▓  PROMPT END — copy to here  ▓▓▓
═══════════════════════════════════════════════════════════════════════════════
