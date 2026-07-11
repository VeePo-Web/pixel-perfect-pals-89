# Manitoba Location-Page Writer — Batch Contract

You are writing world-class, AI-citable, locally-deep SEO location-page content for ONE batch of Manitoba places. Business/service copy is 100% generic `{TOKENS}`; place facts are 100% real. Output = one JSON object per page, one per line (JSONL).

## Inputs
1. Your batch file (JSON): `pages[]` — each page's grounded facts (name, type, class, slug, url, region, pop 2021/2016, growthPct, lat/lng, distances dWpg/dBdn km, score, links {up, nearby[], down[], blog[]}, popSrc, qid if present).
2. `region_bundles.md` — the shared region fact bundle. Use YOUR region's bundle + the shared provincial facts.

## Absolute laws
- **Ground everything.** Allowed facts: (a) the page's row data, (b) the region bundle, (c) high-confidence encyclopedic facts about THIS specific place (a fact you could find in any encyclopedia — e.g. "Neepawa is Margaret Laurence's hometown"). If you are not certain a landmark/employer/street belongs to THIS place — OMIT it. NEVER invent a street name, business, employer, founding date, or number. NEVER guess. Small places you don't genuinely know → write from row+bundle facts only.
- **Tokens single-curly**, exactly as given: {SERVICE} {SERVICE_CATEGORY} {SERVICE_LIST} {SERVICE_SLUG} {SUBSERVICE_1} {SUBSERVICE_2} {SUBSERVICE_3} {BUSINESS_TYPE} {COMPANY_NAME} {UNIQUE_VALUE_PROP} {SERVICE_DESCRIPTION} {PHONE} {YEARS_IN_BUSINESS} {RATING} {CERTIFICATIONS} {PROPERTY_TYPE} {PRICE_RANGE} {RESPONSE_TIME} {ESTIMATE_TYPE} {AVAILABILITY} {CTA_PRIMARY} {CTA_SECONDARY}. Never write `{{`. Never invent business details. Never tokenize a place fact.
- **Answer-first.** First sentence of every answerable block IS the answer. No preamble, no "Here's the truth about…".
- **Population figures**: use row values verbatim (2021 census). Distances: row values only. Growth %: row growthPct only.
- Grade 6–8 reading level. No two pages may share an opener pattern or a reused sentence — every About opener starts from a DIFFERENT distinctive real hook (employer, landmark, river, growth stat, geology, history — weather only if it truly defines the place).

## Per-page fields (JSONL keys, in this order)
- `Location_ID`, `Location_Name`, `Location_Type` (row type), `Location_Class` (CSD/COMMUNITY/NEIGHBORHOOD), `Parent_Region` (region name), `Province`: "Manitoba", `URL_Slug`, `URL_Path`, `Latitude`, `Longitude`, `Population_2021_Census`, `Population_2016_Census`, `Population_Growth_Pct`, `SEO_Priority_Score`, `Search_Volume_Estimate` (band: pop≥100k "High" · ≥20k "Medium-High" · ≥5k "Medium" · ≥1k "Low-Medium" · else "Low"), `Competition_Level` (inverse: ≥100k "High" · ≥20k "Medium" · ≥5k "Low-Medium" · else "Low"), `Distance_From_Winnipeg_KM`, `Distance_From_Brandon_KM`.
- `SEO_Title_Template` ≤60 chars filled-length: `{SERVICE} in <Name>, MB | {COMPANY_NAME}` (adjust to fit; keep place literal).
- `Meta_Description_Template` ~150–160 chars: answer-first + place + outcome CTA ending `Call {PHONE}.` No rating claims.
- `H1_Template`: `{SERVICE} in <Name>, Manitoba — {COMPANY_NAME}`.
- `Primary_Keyword_Template`: `{SERVICE} <Name>`.
- `Secondary_Keywords_Template` (pipe-separated, 3–5): `{SERVICE} near me` variants + `{SERVICE} <Name> Manitoba` + one real neighborhood/landmark variant.
- `Long_Tail_Keywords_Template` (pipe, 3–4): each = {SERVICE} + place + a REAL local qualifier (clay soil, ring dike, lakefront, bedrock, base housing…).
- `Question_Keywords` (pipe, 3–4): the FAQ questions' natural query forms.
- `Conversational_Query_Examples` (pipe, 5): natural AI-assistant phrasings using real local terms.
- `Entity_Type`: "City" | "Town" | "Rural Municipality" | "Village" | "Community" | "Neighborhood" (schema.org City/AdministrativeArea mapping noted in Notes if RM).
- `Entity_Description` 50–100 words, PURE facts, ZERO tokens: what IS this place — population, geography, economy, history, building stock. The AI entity anchor.
- `AI_Answer_Snippet` 40–60 words: names {COMPANY_NAME} exactly once, 1–2 real local specifics, ends `Call {PHONE}.`
- `Short_Description` 100–150 words: unique local hook (never a shared template), business tokens allowed, ends with a CTA containing {PHONE}.
- `Long_Description` 400–600 words: the About body. Place + "Manitoba" inside the first 100 words. Opener = THE most distinctive real thing about this place. Weave ≥4 distinct real local signals (named areas/landmarks/economy/geology/climate-tied-to-{SERVICE}/distance-access). {TOKENS} for all business claims. Reference 1–2 nearby BUILD places naturally (they're in links.nearby). No filler, no list-dumping — prose.
- `Local_Facts`: 5–7 real bullets joined by ` • ` (population, geography, economy/employers, climate/soil condition, areas/access).
- `FAQ_1..4_Question` / `_Answer`: 4 FAQs, question-format, answers 40–60 words, answer-first. Angles must differ: coverage, local condition (hyper-local — a condition ONLY this place/region has), pricing ({PRICE_RANGE}/{ESTIMATE_TYPE} tokens), response/why-choose. FAQ_4_Answer ends `Call {PHONE}.`
- `Region_Link`: `{ "url": links.up, "anchor": <varied descriptive geo-anchor, e.g. "more {SERVICE_CATEGORY} coverage across the Interlake"> }`
- `Nearby_Links`: array from links.nearby → `{ "url": "/areas/<slug>", "anchor": <varied: mixes real geo descriptor + place name; never identical phrasing twice in your batch; never just the bare name> }`
- `Down_Links`: array from links.down (same shape; empty ok).
- `Blog_Links`: array from links.blog → `{ "url": slug, "anchor": <natural informational anchor from the given title> }`.
- `Image_Source_Tier`: "region" (default). `Image_Alt_Geo` (Layer-1, geographic ONLY, no trade word): `<Name>, <Region> Manitoba — <one distinctive real geographic trait>` — must be unique. `Image_Filename`: `<slug>-<region-slug>-mb.webp`. `Image_License`: "{IMAGE_LICENSE_TODO}". `Image_Attribution`: "{IMAGE_ASSET_TODO}" (sourcing happens at implementation; never fabricate a source).
- `Wikidata_QID`: row qid or null.
- `Signals_Count`: integer — count the DISTINCT real local signals actually present in your content (named areas, landmarks, employers, geology/soil, climate-condition, history, growth stat, access/distance).
- `Info_Gain_Element`: one sentence naming the element competitors' templates won't have (e.g. "ring-dike coverage FAQ", "Tyndall-stone quarry context", "-40°C mobilization promise").
- `Verification_Status`: "Verified-Dataset" (only row+bundle facts) or "Verified-LLM" (includes encyclopedic facts you are confident in). If ANYTHING is uncertain, cut it rather than flag it.
- `Data_Sources`: e.g. "StatCan 98-10-0002 (2021 Census); NRCan CGN; region bundle; encyclopedic".
- `Last_Updated`: "2026-07-11".
- `Notes`: anything an implementer must know (e.g. "no streetAddress — service-area page", "RM page: use AdministrativeArea in schema").

## Neighborhood pages (Location_Class = NEIGHBORHOOD)
Same fields; scope everything to the neighborhood INSIDE Winnipeg: Entity ~50–80w; Long_Description 300–450 words is acceptable; links.up = /areas/winnipeg (anchor about city-wide coverage); hyper-local FAQ mandatory; primary keyword `{SERVICE} <Neighborhood> Winnipeg`.

## Self-check before writing each page (fix, then write)
1. Word counts in range. 2. All tokens single-curly, no {{. 3. AI snippet + Short_Description + FAQ_4 end with {PHONE} CTA. 4. ≥4 signals (count them honestly). 5. Opener unique in your batch. 6. No invented facts. 7. Anchors varied. 8. Place name literal everywhere.

## Output
Write the JSONL to the output path you were given (one JSON object per line, no wrapping array, UTF-8). Then return ONLY a status report: one line per page `OK <slug> sig=<N> <Verification_Status> words=<Long_Description word count>` (or `FLAG <slug> <reason>` if a page cannot pass), plus a final line `BATCH DONE n=<count>`.
