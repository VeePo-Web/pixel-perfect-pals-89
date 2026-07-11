# ONTARIO LOCATION-PAGE CONTENT SPEC (generation contract — follow exactly)

You are upgrading rows of a niche-agnostic local-SEO location database for Ontario, Canada.
Each input row = one place = one page. You write world-class, locally-specific, AI-citable content.

## ABSOLUTE LAWS
1. **NEVER invent a fact.** Every concrete fact (population, founding, landmark, employer, street,
   geography, climate, distance) must come from (a) the input row, (b) the region bundle, or
   (c) your own HIGH-CONFIDENCE encyclopedic knowledge of this real, well-known place. If you are not
   certain a fact is true of THIS exact place, OMIT it. Never guess. Never pad with invented specifics.
2. **Business copy = single-curly {TOKENS}, verbatim.** Allowed tokens: {SERVICE} {SERVICE_CATEGORY}
   {SERVICE_LIST} {SERVICE_SLUG} {SUBSERVICE_1..N} {BUSINESS_TYPE} {COMPANY_NAME} {UNIQUE_VALUE_PROP}
   {SERVICE_DESCRIPTION} {PHONE} {YEARS_IN_BUSINESS} {RATING} {CERTIFICATIONS} {PROPERTY_TYPE}
   {PRICE_RANGE} {RESPONSE_TIME} {ESTIMATE_TYPE} {AVAILABILITY} {CTA_PRIMARY} {ESTIMATE_TYPE}.
   Never invent a company name, phone, price, rating, or years. NEVER type `{{` (double-curly = defect).
   Place names, region names, "Ontario", real geography: written literally, never tokenized.
3. **Answer-first.** Every answerable block leads with the answer in sentence one. No preamble.
   BANNED openers: "Here's the truth about…", "Every community has a story", "X isn't just…",
   "X did not become what it is by accident", weather-as-opener (unless climate genuinely defines the place).
4. **Grade 6–8 reading level.** Short sentences. No hype filler ("thriving", "vibrant" max once per page).

## TIER RULES (input row has `tier`)
- **Tier A** — `curatedFacts` holds verified facts (founded/landmarks/notable/economy + old descriptions).
  Use them as primary grounding (fix any grammar chimeras like "Founded named after…" / "~~"). You may add
  well-known encyclopedic facts. Output `verification:"Verified"`.
- **Tier B** (pop ≥ 20k, no curated facts) — `regionBoilerplate` fields are REGION-level filler: you may use
  them ONLY as regional context explicitly attributed to the region. Place-specific facts must come from your
  own high-confidence knowledge of this major municipality (real neighborhoods, landmarks, employers, highways,
  waterfront, history). These are large, well-documented Ontario municipalities — you know them. Output
  `verification:"Verified"` only if every stated fact is one you are sure of; else `"Needs_Review"`.
- **Tier C** (pop 4k–20k) — same as B but stricter: use ONLY facts you are certain of (e.g., Stratford Festival,
  Collingwood ski country, Cobourg's Victoria Park beach). If you cannot assemble ≥4 certain place-specific
  signals, set `status:"FLAG_THIN"` and output ONLY {id, name, status, reason} for that row — do NOT write
  filler content for it.

## THE 8 LOCAL SIGNALS (count them per row; need ≥4 to publish)
1 named neighborhoods/communities inside the place · 2 named landmarks · 3 named streets/highways/corridors ·
4 climate/geography tied to services · 5 economy/named employers · 6 property/building-stock mix ·
7 distance/access to real anchors · 8 history/founding/identity fact.
`signals` = array of short labels for the ones actually present in your copy. Also every page needs ≥1
`infoGain` element: the single most distinctive real thing your page has that a template wouldn't (one line).

## PER-ROW OUTPUT (JSON object, one per line = JSONL)
{"id","name","slug","region","tier","status":"OK|FLAG_THIN|FLAG_COORD","verification":"Verified|Needs_Review",
 "signalCount",N,"signals":[],"infoGain":"…",
 "seoTitle":"{SERVICE} in <Name>, ON | {COMPANY_NAME}"            // ≤60 chars with a ~20-char service filled
 "metaDescription":"…",   // 150–160 chars, answer-first, place name, outcome CTA ending "Call {PHONE}."
 "h1":"{SERVICE} in <Name>, Ontario",
 "primaryKeyword":"{SERVICE} <Name>",
 "secondaryKeywords":"… | … | … | …",       // 4, pipe-separated, incl. "{SERVICE} near me" + region variant
 "longTailKeywords":"… | … | …",            // 3, each = {SERVICE} + <Name> + a REAL local qualifier
 "questionKeywords":"… | … | …",            // 3 question-format
 "conversationalQueries":"… | … | … | … | …", // 5 natural AI-assistant phrasings using real local terms
 "entityDescription":"…",   // 50–100 words, NO tokens, pure encyclopedic place facts, answers "What is <Name>?"
                             // sentence 1 = what/where + population figure from the row
 "aiAnswerSnippet":"…",      // 40–60 words, names {COMPANY_NAME} exactly once, 1–2 real local specifics,
                             // ends exactly: "Call {PHONE}."
 "shortDescription":"…",     // 60–90 words, answer-first hook, unique to this place, ends with a CTA + {PHONE}
 "longDescription":"…",      // 400–600 words, see structure below
 "localFacts":["…",…],       // 5–7 bullets: population (2021 census figure from row, clean format, no "~~"),
                             // founding/geo, named employers/economy, climate note, named areas/landmarks served
 "faqs":[{"q","a"},×4],      // question-format, answers 40–60 words, answer-first; ≥1 hyper-local (a condition/
                             // geography/coverage only THIS place has); 4th answer ends "Call {PHONE}."
 "imageAltGeo":"<Name>, <Region> Ontario — <one distinctive real geographic trait>",  // NO trade/service word
 "imageFilename":"<slug>-<region-slug>-on.webp",
 "nearbySlugs":[…],          // copy from input neighbors
 "sourcesNote":"…"}          // one line: what grounded this row (row facts / encyclopedic / region bundle)

## longDescription STRUCTURE (400–600 words)
- Para 1: the single most distinctive REAL thing about this place (opener hook) + place & "Ontario" in first
  100 words + population woven in naturally.
- Para 2: geography/neighborhoods/streets — named real areas in prose, what property stock looks like.
- Para 3: economy/employers + what that means for {SERVICE} demand ({TOKENS} for all business claims).
- Para 4: climate/seasonal conditions tied to {SERVICE} (region bundle climate, localized honestly).
- Para 5: access/nearby (use input `neighbors` names/km) + commitment close ending
  "Call {PHONE} for your {ESTIMATE_TYPE} estimate."
- NO two rows in your batch may share an opener pattern or any full sentence. Vary paragraph rhythm.

## OTHER RULES
- Population format: "256,885 (2021 census)" — never "~~", never invented 2025 estimates.
- Neighbors: mention 2–3 by name with km in longDescription para 5 ("20 km east of Barrie").
  If a neighbor is geographically absurd for this place (you know it's nowhere near), set status:"FLAG_COORD"
  and still write the page but omit the absurd neighbor from copy.
- French/accented names: keep exact spelling from input.
- First Nations reserves: respectful, factual; economy filler does not apply; if you lack certain knowledge → FLAG_THIN.
- imageAltGeo must be UNIQUE (a trait no other row in your batch used).
- Do not re-explain the region or other places (one page = one place; a neighbor gets a mention, not a description).
