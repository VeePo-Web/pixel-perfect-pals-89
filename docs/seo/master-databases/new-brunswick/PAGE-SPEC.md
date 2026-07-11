# NB Location-Page Build Spec (Mode B · Fable 5 run · July 2026)

The binding per-page contract for every file in `pages/`. Companion to the Universal Location-Page
Builder prompt (`../05-universal-location-page-builder-fable5.md`). Data grounding:
`data/nb_master_locations.csv` (StatCan 2021 Census 98-10-0002 + NRCan CGN + StatCan GAF 92-151-X,
all OGL-Canada) + the curated verified-facts bundle baked into each batch input.

## Laws (zero tolerance)
1. **Ground everything.** Every concrete fact traces to the batch input JSON (census numbers, distances,
   curated facts). NEVER add a named place, number, landmark, employer, street, or date that is not in
   the input. Uncertain → omit.
2. **Services generic, locations real.** All business copy uses single-curly `{TOKENS}`:
   `{SERVICE} {SERVICE_CATEGORY} {SERVICE_LIST} {SERVICE_SLUG} {SUBSERVICE_1..6} {BUSINESS_TYPE}
   {LOCALBUSINESS_TYPE} {COMPANY_NAME} {BRAND_URL} {UNIQUE_VALUE_PROP} {SERVICE_DESCRIPTION} {PHONE}
   {YEARS_IN_BUSINESS} {RATING} {CERTIFICATIONS} {PRICE_RANGE} {RESPONSE_TIME} {ESTIMATE_TYPE}
   {CTA_PRIMARY} {PLACE_ID} {GOOGLE_MAPS_API_KEY} {DATA_POINT_TODO}`. Place facts are written literally.
   `{{` double-curly = defect. Never invent business details.
3. **Answer-first.** First sentence of every answerable block IS the answer.
4. **One H1. One primary keyword: `{SERVICE} {Name}`.** Never target another page's keyword.
5. **Stay in your lane.** Outward links ONLY: parent region (UP), the given `nearby` list (SIDEWAYS,
   all of them), service child pages (DOWN, tokenized), 2–4 blog guides (see below). Varied descriptive
   geo-anchors; never "click here"; never another page's exact primary keyword as anchor.
6. Reading level grade 6–8. Chunks of 100–300 words. First-person CTAs ("Get my free {Name} quote").

## Blog guide URLs (pick 2–4 relevant, varied anchors)
`/blog/{SERVICE_SLUG}-cost-guide-new-brunswick` · `/blog/{SERVICE_SLUG}-winter-preparation-new-brunswick`
· `/blog/{SERVICE_SLUG}-permits-municipal-rules-new-brunswick` · `/blog/coastal-property-{SERVICE_SLUG}-maintenance-new-brunswick`
(coastal one only for shore/island places).

## Location page file: `pages/{slug}.md`

```
---
id: NB-XXXX
slug: <slug>
url: /areas/<slug>
type: location
place: <Name>
county: <County>
region: <Region>
province: New Brunswick
coordinates: <lat>, <lng>
population2021: <n>
seoScore: <score>
title: "{SERVICE} in <Name>, NB | {COMPANY_NAME}"            # ≤60 chars after fill (use NB)
metaDescription: "<answer-first, place, outcome, ends: Call {PHONE}.>"   # 150–160 chars
primaryKeyword: "{SERVICE} <Name>"
secondaryKeywords: "{SERVICE} near me | {SERVICE} <Name> NB | <2 real neighborhood/landmark variants>"
longTailKeywords: "<3 pipes: {SERVICE} <Name> + real local qualifier (condition/proximity/property type)>"
questionKeywords: "<3 pipes, mirror FAQ questions>"
conversationalQueries: "<5 pipes, natural AI-assistant phrasings using real local terms>"
imageTier: flag
imageFile: <slug>-<region-slug>-nb.webp
imageAltGeo: "<Name>, <County> County, New Brunswick — <geoTrait>"     # Layer 1, geographic only
imageAltRendered: "{SERVICE_CATEGORY} in <Name>, New Brunswick — <Layer 1 alt>"
breadcrumb: Home → Areas We Serve → <Region> → <Name>
linkUp: /areas/region/<region-slug>
linkNearby: <all given nearby slugs with km>
linkDown: /areas/<slug>/{SUBSERVICE_SLUG_1..4}
linkBlog: <chosen 2–4>
dateModified: 2026-07-10
updatedVisible: Updated July 2026
---
```

Then body, exactly this order (H2s except hero):

1. `# {SERVICE} in <Name>, New Brunswick — {COMPANY_NAME}` + overline `<Name> · <Region> · New Brunswick`
   + subhead w/ {UNIQUE_VALUE_PROP} + trust badges ({YEARS_IN_BUSINESS} · {RATING} · {CERTIFICATIONS})
   + `{CTA_PRIMARY} — Call {PHONE}`.
2. `## Need {SERVICE} in <Name>?` — **AI_Answer_Snippet**, 40–60 words, class `.answer-first`:
   names {COMPANY_NAME} exactly once, 1–2 real local specifics, ends `Call {PHONE}.`
3. `## About <Name>, New Brunswick` — **Entity_Description**, 50–100 words, pure real facts, NO tokens:
   answers "What is <Name>?" — population + ≥3 real facts.
4. `## <a locally-specific H2>` — **deep local body 400–600 words**: place + province in first 100 words;
   opener = the place's `hook` in fresh wording (NEVER weather-first unless climate IS the hook; NEVER a
   sentence structure reused from a sibling page); weave ≥4 real signals (named areas, landmarks,
   streets in prose, climate tied to {SERVICE}, economy, building stock, distance/access) + census
   texture (growth %, dwellings, density, seasonal share). All business claims tokenized.
5. `## <Name> at a glance` — 5–7 real bullets (population, growth, dwellings/seasonal share, geography,
   distances, curated facts).
6. `## Our services in <Name>` — 4–6 cards: `**{SUBSERVICE_N}** — {SERVICE_DESCRIPTION}` +
   link `/areas/<slug>/{SUBSERVICE_SLUG_N}`.
7. `## Local proof` — info-gain: an original computed data point (e.g. seasonal-dwelling share, growth
   vs province) tied to {SERVICE} + testimonial slot `> "{TESTIMONIAL_LOCAL}" — {REVIEWER_NAME}, <Name>`
   + one named-street/named-place project slot using `{PROJECT_TYPE}` and a REAL street/area from input
   (if none given: `{DATA_POINT_TODO}`).
8. `## Frequently asked questions — {SERVICE} in <Name>` — **5 Q&A**, question-format H3s, answers 40–60
   words, answer-first; ≥1 hyper-local (a condition/geography only this place has); last answer ends
   `Call {PHONE}.`
9. `## Map` — facade note: crawlable placeholder img (alt = rendered alt), iframe
   `https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=place_id:{PLACE_ID}` on click.
10. `## Nearby areas we serve` — ALL given nearby links, each with a varied descriptive geo-anchor +
    one grounded clause (distance/geography).
11. `## From our blog` — the chosen blog links, contextual anchors.
12. Reviews slot: `{RATING} ★ — {REVIEW_COUNT} local reviews` (no aggregateRating in schema).
13. `**Get my free <Name> quote** — {CTA_PRIMARY}: Call {PHONE}` + `*Updated July 2026*` +
    footer line: `Contains information licensed under the Open Government Licence – Canada.`

14. JSON-LD in one ```json fence — a single `@graph`:
    - `Service`: `@id <url>#service`, `serviceType "{SERVICE_CATEGORY}"`,
      `name "{SERVICE_CATEGORY} in <Name>"`, `provider {"@id":"{BRAND_URL}#business"}`,
      `areaServed`: [City <Name> {geo, containedInPlace NB}, City × each nearby name,
      GeoCircle {geoMidpoint lat/lng, geoRadius "<metres>"}] — metres = round(sqrt(areaKm2/π)×1000),
      min 3000, as a STRING of metres.
    - `WebPage`: `@id <url>#page`, url, name, `isPartOf {"@id":"{BRAND_URL}#website"}`,
      `primaryImageOfPage {"@id":"<url>#img"}`, `dateModified "2026-07-10"`,
      `speakable {cssSelector [".answer-first"]}`.
    - `BreadcrumbList` (Home `{BRAND_URL}` → Areas `/areas` → Region → this page).
    - `FAQPage` — mainEntity matches visible FAQ verbatim.
    - `ImageObject`: `@id <url>#img`, contentUrl `/images/areas/<imageFile>`, name = Layer-1 alt,
      caption, `contentLocation {name "<Name>, New Brunswick", geo}`,
      license `https://commons.wikimedia.org/wiki/File:Flag_of_New_Brunswick.svg` (flag tier).
    - NO LocalBusiness re-inline (reference `{BRAND_URL}#business` only). NO aggregateRating. NO HowTo.

## Region page file: `pages/regions/<region-slug>.md`
Same front-matter shape (type: region, url `/areas/region/<slug>`, title
`"{SERVICE} in <Region>, NB | {COMPANY_NAME}"`, primaryKeyword `{SERVICE} <Region>`). Body: hero H1;
answer-first snippet (40–60w, ends Call {PHONE}); region entity description (50–100w, real);
region body 250–400w from the region bundle (climate, economy, building stock, landmarks — tokenized
business copy); `## Communities we serve in <Region>` — link EVERY child place (name + one real clause);
3 FAQs; 2 blog links; UP link to `/areas`; CTA + Updated July 2026 + OGL footer; JSON-LD @graph
(Service with areaServed = AdministrativeArea counties + child Cities; WebPage; BreadcrumbList; FAQPage).

## Per-page self-check (fix before writing; report failures)
zero invented facts · tokens single-curly, no `{{` · Entity 50–100w · snippet 40–60w · About 400–600w ·
FAQ answers 40–60w · 3 `{PHONE}` CTAs (snippet, hero, last FAQ) · find-and-replace test (delete the place
name — something local must remain) · ≥4 distinct real signals · ≥1 info-gain element · one H1 ·
title ≤60 · meta 150–160 · unique opener vs your other pages · geoRadius in METRES · linking law complete.

## Status line per page (return to orchestrator)
`OK <id> <slug> sig=<n-signals> words=<about-wordcount>` or `FLAG <id> <slug> <reason>`.
