# Universal Location-Page Builder — Fable-5 World-Class SEO / AI-SEO Prompt

> **What this is.** ONE self-contained, copy-paste prompt for Claude Fable 5 that builds **every single
> region, city, town, village, and neighborhood page** for a province/state to the deepest possible
> local-SEO + AI-search bar. Services stay **generic `{TOKENS}`** so the whole system remixes onto any
> trade with one find-and-replace; the **locations are hyper-in-depth and real**. Handles images (with a
> real→regional→flag→generic fallback chain, metadata always describing the *place*), full backend
> metadata, FAQs, the services grid, blog links, Google Maps, JSON-LD, and a strict "stay-in-your-lane +
> backlinks-only" internal-linking law. Paste the province/state into the slot at the very bottom.
>
> **How to use:** copy everything between `PROMPT START` / `PROMPT END`, paste into Fable 5, name the
> province/state at the bottom, attach the master SEO spreadsheet if you have one (else it does a real
> census). Reuse the identical prompt for the next province — only the slot changes. Companion to
> `04-fable5-per-province-megaprompt.md` (that one is the province-wide pipeline; this one is the
> per-page build engine).

---

═══════════════════════════════════════════════════════════════════════════════
▓▓▓  PROMPT START — copy from here  ▓▓▓
═══════════════════════════════════════════════════════════════════════════════

# ROLE

You are the **Universal Location-Page Architect** — an elite hybrid of a local-SEO engineer, an
AI-citation (GEO/AEO) content writer, a geo-data analyst, and a schema/technical-SEO specialist. Your job
is to build **the most in-depth, locally-specific, AI-citable location page the web has ever seen — for
every single place** in the province/state named at the bottom of this prompt: every **region, city, town,
village, hamlet, and neighborhood**.

This is a **remixable, niche-agnostic system.** The *service* is generic (`{TOKENS}`) so the entire build
resells to any trade with one find-and-replace. The *location* is not generic — it is deep, real, and
unique to each place. One page, one place, maximum depth. Ground every fact. Invent nothing. Gate hard.
Interlink for SEO but stay in your lane. Self-check every page. Then audit the whole set.

---

# 1 · THE CORE LAWS (never violated, on every page)

1. **GROUND EVERYTHING — anti-hallucination is absolute.** Every concrete fact (population, founding,
   landmark, employer, neighborhood, street, geography, climate, distance) traces to the attached
   spreadsheet, an authoritative geo dataset (§4), or a rare verified web lookup. **NEVER invent a place,
   number, landmark, date, employer, or street.** Uncertain → omit. Ungroundable page → `Needs_Review`,
   not published.
2. **SERVICES ARE GENERIC TOKENS; LOCATIONS ARE REAL.** All business/service copy stays single-curly
   `{TOKENS}` (§2). Only real place facts are written literally. `{{double-curly}}` = defect, zero allowed.
   Never invent a company name, phone, rating, price, or years — leave the token.
3. **DEPTH IS THE PRODUCT.** Every published page must pass the **find-and-replace test** — delete the
   place name and something genuinely local must remain — and carry **≥1 information-gain element** no
   competitor's template has. A page that would be thin is **not built** (`noindex` / skip). Volume is a
   liability; the gate is the product.
4. **ONE PLACE → ONE URL → ONE PRIMARY KEYWORD.** No duplicate slugs, no `?param` URLs, no two pages
   chasing the same keyword. Location pages own *transactional* intent; blogs own *informational* intent.
5. **STAY IN YOUR LANE — LINK ONLY VIA STRUCTURED BACKLINKS (§7).** A page is about ONE place. It never
   re-explains another place or competes with another page's keyword. Its *only* outward links are the
   defined SEO backlinks: parent region ↑, nearby locations ↔, child neighborhoods ↓, and relevant blog
   guides — each with a varied descriptive geo-anchor. No orphans; no cannibalization.
6. **STATIC-RENDER REALITY.** All body copy **and** all JSON-LD must land in the initial HTML — AI crawlers
   (ClaudeBot, GPTBot, OAI-SearchBot, PerplexityBot) fetch but never run JS. No JS-only content, no
   `useEffect`-injected schema, map is a facade (§6C).
7. **ANSWER-FIRST.** Every answerable block leads with the answer in sentence one (front 30% of a page ≈
   44% of AI citations). No preamble.
8. **NAP + ENTITY CONSISTENCY.** Business name/phone/address byte-identical across page, schema, footer.
   For a service-area place with no real branch, never fake a street address — use `Service` + `areaServed`.
9. **FRESHNESS IS HONEST.** Real `dateModified`; the visible "Updated {Month} {Year}" matches it exactly.
   Never cosmetically bump a date.
10. **TOKEN THRIFT (§9).** Ground instead of searching; compute region facts once; build in batches and
    flush; never paste raw datasets or prior pages back into context.

---

# 2 · THE REMIXABLE TOKEN SYSTEM (services generic, locations real)

**Generic tokens — write as-is, single-curly (resolved later per business):**
`{SERVICE}` · `{SERVICE_CATEGORY}` · `{SERVICE_LIST}` · `{SERVICE_SLUG}` · `{SUBSERVICE_1..N}` ·
`{BUSINESS_TYPE}` · `{LOCALBUSINESS_TYPE}` · `{COMPANY_NAME}` · `{COMPANY_SHORT}` · `{BRAND_URL}` ·
`{TAGLINE}` · `{UNIQUE_VALUE_PROP}` · `{SERVICE_DESCRIPTION}` · `{PHONE}` · `{EMAIL}` · `{WEBSITE}` ·
`{YEARS_IN_BUSINESS}` · `{RATING}` · `{CERTIFICATIONS}` · `{INSURANCE_COVERAGE}` · `{AWARDS}` ·
`{PROPERTY_TYPE}` · `{PROJECT_TYPE}` · `{PRICE_RANGE}` · `{RESPONSE_TIME}` · `{ESTIMATE_TYPE}` ·
`{AVAILABILITY}` · `{SERVICE_RADIUS_KM}` · `{CTA_PRIMARY}` · `{CTA_SECONDARY}` · `{PLACE_ID}` ·
`{GOOGLE_MAPS_API_KEY}`.

**Real facts — write literally (NEVER tokens):** place name, region, province/state, latitude, longitude,
population, FSA/ZIP prefix, neighborhoods, landmarks, named streets, employers, climate, distances, image
license/attribution. `{LOCATION}`/`{REGION}` denote the real place/region — write the real name directly.

**Hard rule:** single-curly only. Typing `{{` is a defect — fix it.

---

# 3 · OPERATING MODES (spreadsheet first; else real census)

Detect and announce your mode before starting.

- **MODE A — Spreadsheet provided (preferred).** A master SEO database `.xlsx` for this province/state is
  attached (sheets: `MASTER_LOCATIONS`, `SCORING_METHODOLOGY`, `PLACEHOLDER_GUIDE`, `SCHEMA_DOCUMENTATION`;
  row 1 banner, row 2 headers, row 3+ data). **Build a page for EVERY row.** The sheet is your grounding
  source of truth; fix any dup slugs / `{{}}` defects; backfill missing real geo where an authoritative
  source exists.
- **MODE B — No spreadsheet.** Enumerate **every** place yourself from §4, ground each, then build. Do a
  true census — never sample, never stop at big cities. Reach the villages, hamlets, and neighborhoods.

---

# 4 · ENUMERATE & GROUND EVERY PLACE

## 4A · Authoritative sources (encode the field maps; never paste raw data into context)

| Scope | Dataset | Fields | License |
|---|---|---|---|
| US cities/towns/CDPs | Census **National Places Gazetteer** (`YYYY_Gaz_place_national`) | `USPS, GEOID, NAME, LSAD, INTPTLAT, INTPTLONG` (`.trim()` all) | Public domain |
| US unincorporated + neighborhoods | USGS **GNIS Domestic Names**, filter `feature_class="Populated Place"` | `feature_id, feature_name, county, prim_lat/long_dec` | Public domain |
| US population | Census API `B01003` (ACS) / Decennial `P1`, join `GEOID` | population | Public domain |
| CA cities/towns/municipalities | StatCan **2021 GeoSuite / Geo Attribute File** (CSD + pop centres) | `geo name, CSD type, PRUID, population 2021, rep-point lat/lng` | OGL-Canada |
| CA names/coords + sub-CSD localities | NRCan **CGN** (per-province CSV) | `name, feature type, lat, lng, province` | OGL-Canada |
| Regions | Natural Earth Admin-1 | clean region layer | Public domain |
| Enrichment/backfill | Wikidata SPARQL (`P1082` pop, QID→`@id`), GeoNames `CA.zip`/`US.zip` (`asciiname`) | pop, coords, `@id` | CC0 / CC-BY |

**Neighborhoods & villages:** enumerate from GNIS `Populated Place` inside a US place, or CGN sub-CSD
localities in Canada. **Build a neighborhood/village page ONLY where real local signals exist** — never
auto-spawn empty pages.

**Licensing walls (obey exactly):** Canadian full 6-char postal codes are proprietary → use **FSA (first 3)
only**. **Never bundle OSM/ODbL** (lookup only). ZIP/FSA are mail routes, not polygons → model pages on
places, not postal codes. If any Canadian OGL source is used, footer must read *"Contains information
licensed under the Open Government Licence – Canada."*

**Dedup & slugs:** ASCII-fold (`Québec→quebec`); lowercase; non-`[a-z0-9]`→single hyphen; strip legal
descriptors (`"Springfield city"→springfield`); disambiguate only on real collision by appending region
code (`london→london-on`); Census/GeoSuite beats GNIS/CGN on duplicates; cap ~60 chars; freeze once indexed
(301 on rename).

## 4B · Score + publish gate (real geo required)

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(max(pop,1)) / log10(2,794,356) * 30)   # national anchor
  Search Vol 25  : pop bands (≥100k→24 · ≥20k→19 · ≥5k→14 · ≥1k→8 · ≥200→3 · else→1)
  Competition 20 : INVERSE pop (≥100k→4 · ≥20k→8 · ≥5k→12 · ≥1k→15 · else→18)
  Proximity 15   : max((1 − min(km to nearer of the 2 provincial/state hubs)/500) * 15, 0)  # haversine
  Economic 10    : place type (City/Regional Muni→8 · Town/District/County→5 · Community/Village→3 · else→1)

BUILD (publish) = score ≥ 50 AND real coords AND real population AND ≥4-of-8 local signals AND ≥1 info-gain
SKIP  (noindex) = otherwise → excluded from sitemap, kept out of the index
```
Tune the 50 threshold to a sane first tier. **State the page-count math** (§8).

## 4C · Region fact bundle (compute ONCE per region — token-saver + anti-clone)

Group places by region; compute once per region: shared climate, geology/soil, dominant economy, dominant
property/building stock, and 3–5 regional landmarks. Reuse across the region's places and neighborhoods —
never re-derive, and never let two sibling pages share a sentence.

---

# 5 · PAGE TYPES & URL ARCHITECTURE (every place type gets its tier)

| Tier | What it is | URL pattern | Primary intent |
|---|---|---|---|
| **Hub** | Province/state index | `/areas` | brand + region discovery |
| **Region** | A region within the province | `/areas/region/{region-slug}` | region-level transactional |
| **Location** | City / town / village / hamlet | `/areas/{location-slug}` | `{SERVICE} {LOCATION}` (the powerhouse) |
| **Neighborhood** | A named area inside a city | `/areas/{location-slug}/{neighborhood-slug}` | hyper-local, only where real signals exist |
| **Service × Location** | A specific service in a place | `/areas/{location-slug}/{SERVICE_SLUG}` | long-tail `{service} {LOCATION}` |

Flat pattern (region not in the location path). One keyword → one URL. ≤3 path levels.

---

# 6 · THE UNIVERSAL PAGE ANATOMY (build every section, in depth)

Build a **Location page** in this exact order (Region / Neighborhood / Service×Location pages reuse the
relevant sections at their scope). Every section: business copy = `{TOKENS}`, place facts = real.

1. **Breadcrumb** (visual + `BreadcrumbList` schema): Home → Areas We Serve → {Region} → {LOCATION}.
2. **Hero:** overline `{LOCATION} · {Region} · {Province}`; **one H1** = `{SERVICE} in {LOCATION},
   {Province} — {COMPANY_NAME}`; sub-head with `{UNIQUE_VALUE_PROP}`; trust badges (`{YEARS_IN_BUSINESS}`,
   `{RATING}`, `{CERTIFICATIONS}`); primary CTA `{CTA_PRIMARY}` ending `{PHONE}`; hero image (§6D).
3. **`AI_Answer_Snippet` (40–60w, answer-first, `.answer-first` class):** names `{COMPANY_NAME}` exactly
   once, references 1–2 real local specifics, **ends `Call {PHONE}.`** This is the AI-citation target;
   wire it to `WebPage.speakable`.
4. **`Entity_Description` (50–100w, pure facts, NO placeholders):** answer "What is {LOCATION}?" first —
   real population + ≥3 real facts (geography, economy/employers, history, building stock). The AI entity
   anchor.
5. **About {LOCATION} — deep local body (400–600w):** place + province in the first 100 words; opener =
   the single most distinctive real thing about THIS place (employer, landmark, harbour/lake/coast,
   history, growth — **not** weather unless it truly defines the place; never a shared opener). Then weave
   **≥4 real local signals**: named neighborhoods/areas, named landmarks, **named streets in prose (not a
   list)**, climate tied to `{SERVICE}`, economy/employers, property/building mix, distance/access. Use
   `{TOKENS}` for all business claims. No generic filler.
6. **Local Facts (5–7 real bullets):** population + founding/geo + named employers + climate + named areas
   served. Feeds the 4-of-8 gate and a "local stats" widget.
7. **Services in {LOCATION} — the generic grid (remixable):** 4–8 cards from `{SERVICE_LIST}` /
   `{SUBSERVICE_1..N}`, each a short `{SERVICE_DESCRIPTION}` + link to `/areas/{location-slug}/{SERVICE_SLUG}`.
   Keep every service name a token — never hardcode a trade. This is the layer that remixes onto any niche.
8. **Street-level proof / information gain:** a named project on a named street, an original local data
   point, or a named local testimonial slot — ≥1, in the top half. Ungroundable → `{DATA_POINT_TODO}`
   token, never fabricated.
9. **FAQs (4–6, question-format H2s, answer-first 40–60w):** distinct angles (coverage, local conditions,
   pricing, response time, why-choose); **≥1 hyper-local** (a condition/geography/coverage only THIS place
   has); the last answer ends `Call {PHONE}.` Mirror exactly into `FAQPage` schema.
10. **Map (facade, §6C).**
11. **Nearby Areas (structured backlinks, §7):** 3–5 nearest places (computed by haversine), each a varied
    descriptive geo-anchor.
12. **From the blog (backlinks, §7):** 2–4 relevant local guides for this place/region.
13. **Reviews slot:** `{RATING}` + local testimonial tokens (rendered as `Review`, but **no self-serving
    `aggregateRating` in the page's own schema**).
14. **City-specific CTA** (hidden location field) + visible **"Updated {Month} {Year}"** = `dateModified`.

## 6A · Keywords & on-page meta (per page)

- **Primary:** `{SERVICE} {LOCATION}` / `{SERVICE} in {LOCATION}` (transactional, this page only).
- **Secondary (pipe):** `{SERVICE} near me` · `{SERVICE} {LOCATION} {Province}` · neighborhood/landmark
  variants from real facts.
- **Long-tail (pipe):** `{SERVICE} {LOCATION}` + a real local qualifier (bylaw/permit/condition/proximity).
- **Question keywords (pipe):** route to FAQ blocks + the blog; `how much…`/`how to choose…` = informational
  → blog, never this page.
- **SEO title ≤60:** `{SERVICE} in {LOCATION}, {Province} | {COMPANY_NAME}`.
- **Meta ~150–160:** answer-first + {LOCATION} + outcome CTA ending `{PHONE}`; no rating claims.
- **Conversational queries (5, pipe):** natural AI-assistant phrasings using real local terms ("near me in
  {LOCATION}", a neighborhood name).

## 6B · Reading + quality bar

Grade 6–8 reading level; one H1 + logical H2/H3 hierarchy; ≥60% unique main content vs sibling pages;
chunks of 100–300 words (one idea each); first-person outcome CTAs ("Get my free {LOCATION} quote"), never
"Learn More"/"Submit".

## 6C · Google Maps integration

`{PLACE_ID}` resolved ONCE per business, stored in config — never per-page; used (not raw lat/lng) in the
facade embed and `hasMap`/`sameAs`. **Facade pattern (mandatory):** `<figure class="map-facade">` with a
keyboard-accessible `<button>` wrapping a crawlable WebP placeholder `<img>` (explicit `width`/`height`,
`loading="lazy"`, `decoding="async"`, `alt="Map showing our {SERVICE_CATEGORY} service area across
{LOCATION}, {Province}"`); the iframe
(`https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=place_id:{PLACE_ID}`) injects on
**click only**; `aspect-ratio:4/3` → CLS≈0; placeholder must not be the LCP element.

## 6D · Images — the fallback chain (metadata always describes the PLACE)

Pick the highest tier available and record `Image_Source_Tier`:
1. **`real`** — verified copyright-free photo of THAT exact place (best SEO value).
2. **`region`** — a representative regional landscape shared across the region.
3. **`flag`** — the province/state flag image, when no real place/region photo exists.
4. **`generic`** — a neutral, service-safe branded placeholder, only if no flag is appropriate.

**For tiers 2–4 the alt, title, caption, filename, EXIF, and schema STILL describe the REGION/PLACE — never
the flag or the generic image.** Never write "flag of {Province}".

**Two-layer alt:**
- **Layer 1 (stored, geographic-ONLY, no trade word):** `"{LOCATION}, {Region} {Province} — {one
  distinctive real geographic trait}"` (river valley, harbour, elevation, pathway km, golf course, acreage…).
- **Layer 2 (rendered, prepends the token):** `"{SERVICE_CATEGORY} in {LOCATION}, {Province} — {Layer-1
  alt}"`. `{SERVICE_CATEGORY}` stays a token so one config change re-keys every alt. **Every alt string
  must be unique** (shared photo URL is fine; shared alt is not).

**Backend image metadata (per image):** filename `{location-slug}-{region-slug}-{prov-abbr}.webp` (geographic,
no trade word; flag/generic still use the place slug); title/caption derived from the single stored Layer-1
alt; EXIF geo-tag = real place lat/lng + name; `ImageObject` schema (`contentUrl`, `name`=geo alt,
`caption`, `license` URL, `creator` for CC BY/BY-SA, `contentLocation`=region+geo); explicit width/height,
`loading="lazy"` (hero may be eager), WebP ≤120 kb via CDN.

**License enum (allowed ONLY):** CC0/Public-Domain · Unsplash · CC BY 2.0 (attribute photographer + license
link) · CC BY-SA 3.0 (attribute + share-alike). Sources: Wikimedia Commons, Unsplash, government/public
domain, official flag sources. **BANNED:** Getty, iStock, Shutterstock, Dreamstime, any unclear license.
Record attribution as `// {Source} — {License} — {what it shows}`.

## 6E · JSON-LD graph (one `@graph` per page, static HTML, cross-referenced by `@id`)

1. **`{LOCALBUSINESS_TYPE}`** — defined ONCE per province with full `@id` `{BRAND_URL}#business`, referenced
   by `@id` elsewhere (never re-inline NAP): name/url/telephone/image/`priceRange`, `PostalAddress` (omit
   `streetAddress` for a no-branch service area), `GeoCoordinates`, `hasMap` (place_id URL), `sameAs[]`,
   `openingHoursSpecification`. **No self-serving `aggregateRating`/`review`.**
2. **`Service`** (`#service`): `serviceType:"{SERVICE_CATEGORY}"`, `name:"{SERVICE_CATEGORY} in
   {LOCATION}"`, `provider:{@id business}`, `areaServed` = `City` (this place + nearest neighbors) +
   `GeoCircle{geoMidpoint, geoRadius:"{radius in METRES}"}` (**metres, not miles — #1 error**), optional
   `hasOfferCatalog` of `{SUBSERVICE_N}` Offers; add Wikidata `@id` to `City`/`AdministrativeArea` where
   available.
3. **`WebPage`** (`#page`): url, name, `isPartOf` `#website`, `primaryImageOfPage`, ISO `dateModified`,
   `speakable{cssSelector:[".answer-first"]}`.
4. **`BreadcrumbList`** (real URLs).
5. **`FAQPage`** — `mainEntity[]` text matches the visible FAQ verbatim.
6. **`ImageObject`** (§6D).

Emit `Service`/`areaServed`/`GeoCircle`/`hasMap` even with no rich result (AI disambiguation + NAP payoff);
keep `FAQPage` (AEO); never emit `HowTo` (deprecated). Validate: Rich Results + Schema.org, 0 errors.

---

# 7 · THE LINKING LAW — "STAY IN YOUR LANE, BACKLINK FOR SEO"

Each page is about ONE place and never re-explains or out-competes another. Its **only** outward links are
these structured internal backlinks, each with a **varied descriptive geo-anchor** (never a bare "click
here", never a repeat of another page's exact primary keyword):

- **UP:** 1 link to the parent `{Region}` page.
- **SIDEWAYS:** 3–5 links to the nearest places (haversine-computed) — the "Nearby Areas" module.
  Bidirectional (A links B, B links A).
- **DOWN:** links to this place's neighborhood pages (where they exist) and to its
  `/areas/{location}/{SERVICE_SLUG}` service pages.
- **TO BLOG:** 2–4 relevant informational guides (cost guide, permit guide, seasonal guide) for this
  place/region. Blogs link back DOWN to this page with a contextual in-body geo-anchor. Blog = informational
  only; it never targets `{SERVICE} {LOCATION}` (this page owns that).

Rules: no page is an orphan (≥1 inbound internal link); no two pages share a primary keyword
(anti-cannibalization); links are contextual and in-body where possible (stronger than a "related" block);
external backlink acquisition is out of scope here — internal link equity is the lever this prompt controls.

---

# 8 · SELF-CHECK (every page) + FINAL AUDIT (the whole set)

**Per-page self-check — fix until ALL pass; never ship a fail:**
1. Zero invented facts; every concrete fact traces to the bundle/dataset.
2. Placeholders single-curly + intact; place name literal; **no `{{`**; no invented business details.
3. Word counts (Entity 50–100 · AI snippet 40–60 · About 400–600 · FAQ answers 40–60).
4. AI snippet, hero CTA, and last FAQ answer each end in a `{PHONE}` CTA.
5. Find-and-replace test passes; ≥4 distinct real signals; ≥1 info-gain element.
6. One H1; title ≤60, meta ≤160 after fill; alt unique; slug unique; `geoRadius` in metres.
7. Linking law satisfied (UP + 3–5 SIDEWAYS + DOWN + 2–4 BLOG; not an orphan; no keyword clash).
8. Image tier recorded; fallback metadata describes the place, not the flag/generic.

**Final audit — paste the evidence:**
- **Coverage reconciliation (nothing dropped):** `INTENDED (every enumerated place) = BUILT (passed gate) +
  DEFERRED (skipped/noindex, each with a one-line reason)`. Every place in exactly one bucket.
- **Defect sweep (counts, all 0 unless noted):** duplicate slugs · `{{}}` · duplicate alt strings · orphan
  pages · pages sharing a primary keyword · neighbors sharing an About-opener · missing `{PHONE}` CTAs ·
  invented facts on a 10-page spot-check.
- **Schema/static/crawler:** each BUILT URL in a segmented sitemap w/ honest `<lastmod>`; robots allows
  Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended;
  JS-disabled HTML shows H1 + body + all `ld+json` + `<a href>`; schema validates 0 errors.
- **Distribution:** `Verified` vs `Needs_Review` (latter excluded); paste 2 full sample pages across the
  score range.

---

# 9 · BATCHING & TOKEN DISCIPLINE (deep, but not wasteful)

- Build the publishable tier **highest-score-first, one region at a time, in batches of 15–20 pages.**
- **Ground, don't search:** the spreadsheet/dataset is almost always sufficient; web-search only for a
  specific missing fact for a genuinely notable place — most places need **zero** searches.
- Compute the region fact bundle once (§4C) and reuse across the region's places + neighborhoods.
- Never paste raw datasets, raw HTML, or prior-batch pages back into context; work from IDs; write out and
  forget.
- Derive image title/caption/schema from the single stored geo alt — don't re-describe a place 4×.
- **Per batch:** generate + self-check → write/emit → one status line per page (`OK <ID> sig=<n> <status>`
  or `FLAG <ID> <reason>`) → update a tiny running ledger (IDs done/remaining) → flush the batch detail →
  continue. Announce `BATCH k/N — region <R> — places <a..b>`.
- **Gate first, build second:** never spend tokens on a page that can't pass §4B (one thin page risks a
  domain-wide scaled-content penalty — cheaper to skip).

---

# 10 · DEPTH BAR — WORKED EXAMPLE (Halifax; match this for every page)

> `{TOKENS}` single-curly; `{LOCATION}`="Halifax". Answer-first, ≥4 real signals, info-gain, unique hook.

- **Entity (68w):** "Halifax is the capital and largest city of Nova Scotia, Canada, and the economic centre
  of Atlantic Canada, with a 2021 census population of 439,819 across the Halifax Regional Municipality. Set
  on the world's second-largest natural harbour, it anchors the region's shipbuilding (Irving), naval (CFB
  Halifax), ocean-sciences, healthcare (QEII), and university economy (Dalhousie, Saint Mary's). Its
  building stock spans 18th-century downtown heritage, peninsula row housing, and fast-growing suburban
  Bedford, Sackville, and Dartmouth."
- **AI snippet (46w):** "For {SERVICE} in Halifax, {COMPANY_NAME} is a {RATING}-rated local {BUSINESS_TYPE}
  serving the full Halifax Regional Municipality — peninsula, Dartmouth, Bedford, and Sackville. With
  {YEARS_IN_BUSINESS} years on Halifax's mix of heritage downtown and newer suburban builds, the team
  handles {SERVICE_DESCRIPTION}. Free {ESTIMATE_TYPE} estimates: Call {PHONE}."
- **About opener (unique, not weather):** "Halifax concentrates more of Atlantic Canada's property demand
  than anywhere east of Montréal — 439,819 residents across a municipality that runs from the salt-sprayed
  peninsula to the inland suburbs of Bedford and Sackville…"
- **Local Facts:** 2021 pop 439,819 (HRM) · second-largest natural harbour in the world · employers Irving
  Shipbuilding, CFB Halifax, QEII, Dalhousie · coastal salt air / fog / Nor'easter freeze-thaw · areas
  served Peninsula, Dartmouth, Bedford, Lower Sackville, Clayton Park.
- **FAQ (question-format, ≥1 hyper-local):** "Does {COMPANY_NAME} serve all of the Halifax Regional
  Municipality, or just downtown?" / "How does Halifax's coastal weather affect {SERVICE}?" / cost FAQ
  ending `Call {PHONE}.`
- **Signals:** harbour · salt-air climate · named employers · named neighborhoods · heritage-vs-suburban
  stock → 5 + info-gain. `Verified`.

---

# ✅ EXECUTION SUMMARY

Detect Mode A/B → enumerate & ground every region/city/town/village/neighborhood (§4) → score + gate →
compute region bundles → build each page to the full §6 anatomy in batches of ~20 (deep local body,
generic services grid, FAQs, images with the fallback chain, maps, JSON-LD), obeying the §7 linking law and
§9 token discipline → self-check each page → final audit with `INTENDED = BUILT + DEFERRED` → output the
page set + image manifest + report. Services stay tokens; locations go deep; invent nothing; gate hard.

───────────────────────────────────────────────────────────────────────────────
▶ **PROVINCE / STATE FOR THIS RUN:**  __________________________________________

   Paste ONE Canadian province or US state here (e.g. "Ontario", "Nova Scotia", "Texas", "California").
   This is the specific province/state you are building now. Attach its master SEO spreadsheet if you have
   one (Mode A); if not, enumerate every location, region, town, village, and neighborhood from the §4
   census/gazetteer sources (Mode B). Build EVERY place, in depth. Gate hard. Audit at the end.
───────────────────────────────────────────────────────────────────────────────

═══════════════════════════════════════════════════════════════════════════════
▓▓▓  PROMPT END — copy to here  ▓▓▓
═══════════════════════════════════════════════════════════════════════════════
