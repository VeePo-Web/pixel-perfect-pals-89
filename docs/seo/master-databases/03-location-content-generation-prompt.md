# Location Content Generation Prompt (Phase D) — World-Class, Grounded, Per-Row

> The finalized, **validated** prompt that generates world-class "Areas We Serve" content for one
> location at a time, grounded in that location's real facts, preserving niche-agnostic placeholders.
> This is the Phase-D engine of `02-master-build-prompt.md`. It runs once per publishable location, in a
> **paced multi-agent workflow** (sequential chunks) over the gated tier of each database.
>
> **Status:** validated on Nova Scotia (8/8 OK, 0 flagged) → running across all 249 NS publishable rows.

---

## 1. How it runs (the harness around the prompt)

1. **Phases A–C first** (deterministic): normalize → backfill/verify geo → unified re-score → publish
   gate. This writes one **grounding bundle** JSON per publishable row (`<id>.json`) containing the
   location's REAL data + its existing factual text (landmarks, employers, history, economy).
2. **Paced workflow:** the publishable rows are processed in **sequential chunks of 6** (each chunk
   finishes before the next starts). This is mandatory — a 249-wide fan-out trips a transient server
   rate limit and every agent fails. Paced chunks spread the request rate and succeed.
3. **One agent per location:** reads its grounding bundle → (rarely) one verifying web search →
   generates the fields below → self-verifies → **writes the upgraded row JSON to disk** (so results
   never flood the orchestrator's context) → returns a one-line status (`OK <id> sig=<n> <status>`).
4. **Assemble:** the per-row JSONs are merged back into the upgraded master spreadsheet + repo data
   module; the batch is QA'd (see §4) before commit.

**Cost note:** restrict web search hard — the grounding bundle is usually sufficient for the publishable
tier (these are the larger, fact-rich places). Unrestricted search inflated the validation run to ~189k
tokens/agent; with search restricted, expect far less.

---

## 2. THE PROMPT (paste per location; replace `GROUNDPATH` / `OUTPATH`; append the TASK line)

```
You are an elite local-SEO + AI-search (GEO) content writer producing WORLD-CLASS "Areas We Serve"
content for ONE location, for a NICHE-AGNOSTIC template that any local service business will rebrand
via find-and-replace.

STEP 1 - GROUND IN REAL FACTS (anti-hallucination is a HARD rule):
- Read the grounding bundle at: GROUNDPATH. It contains this location's REAL data (name, type, parent,
  region, province/state, population, coordinates, postal/ZIP) and existing factual text
  (Entity_Description, Local_Facts, Long_Description) rich with real landmarks, employers, history and
  economy.
- The bundle is your source of truth and is usually SUFFICIENT. Do NOT web search unless a specific fact
  you need is genuinely missing for a notable town - most locations need ZERO searches. NEVER invent a
  landmark, statistic, founding date, employer, or fact. If a detail is uncertain, omit it. Mine the
  bundle's existing text for real specifics and correct any grammar.

STEP 2 - WRITE these fields. Obey the word counts (extraction targets). Write the LOCATION NAME
literally; keep all BUSINESS details as single-curly {TOKENS}. NEVER use double braces. NEVER invent a
company name, phone, rating, or years - always use the token.

PLACEHOLDER TOKENS (use as-is): {SERVICE} {BUSINESS_TYPE} {COMPANY_NAME} {PHONE} {TAGLINE}
{UNIQUE_VALUE_PROP} {SERVICE_DESCRIPTION} {SERVICE_LIST} {RESPONSE_TIME} {ESTIMATE_TYPE} {PROPERTY_TYPE}
{RATING} {YEARS_IN_BUSINESS} {EMAIL} {WEBSITE} {CTA_PRIMARY}

- Entity_Description (50-100 words): encyclopedic, PURE FACTS, NO placeholders. Answer "What is
  <location>?" first. Real population + >=3 real facts (geography, economy/employers, history, building stock).
- AI_Answer_Snippet (40-60 words): the AI-citation target. Answer-first. Name {COMPANY_NAME} EXACTLY
  ONCE. Reference 1-2 real local specifics. MUST end with "Call {PHONE}."
- Short_Description (100-150 words): a UNIQUE opening hook. CRITICAL: vary the hook by location - lead
  with whichever is MOST distinctive for THIS place (industry/employer, a named landmark,
  harbour/lake/coast/geography, history/founding, growth, OR climate). Do NOT default to weather; do NOT
  reuse a formula; NEVER start with "Here is the truth about". Weave in
  {SERVICE}/{BUSINESS_TYPE}/{COMPANY_NAME}. MUST end with a CTA ending in {PHONE}.
- Long_Description (300-500 words): storytelling proving deep local knowledge. Weave in >=4 REAL local
  signals: named neighbourhoods/areas, named landmarks, climate tied to the service, economy/employers,
  building-stock/property mix. Use {TOKENS} for business claims. Specific, never generic filler.
- Local_Facts: exactly 5-7 bullet lines beginning "- ", every fact REAL and from the bundle. No placeholders.
- FAQ_1/2/3 (Question + Answer each): QUESTION-format headings matching real searcher phrasing.
  Answer-first, 2-3 sentences. The three questions DISTINCT in angle (coverage, local conditions,
  pricing, response time, why-choose). At least ONE FAQ HYPER-LOCAL (a condition/geography/coverage point
  only THIS location has). Use {TOKENS} for business specifics. FAQ_3_Answer MUST end with a CTA ending in {PHONE}.
- Conversational_Query_Examples: exactly 5, pipe-separated, natural-language AI-assistant queries using
  REAL local phrasing (a neighbourhood name, "near me in <location>", "in <location>").

STEP 3 - SELF-VERIFY (fix until ALL pass; never ship a fail):
1. Zero invented facts - every concrete fact traces to the bundle (or a rare verified search).
2. All placeholders single-curly and intact; location name literal; no double braces; no invented business details.
3. Word counts met: Entity 50-100, AI snippet 40-60, Short 100-150, Long 300-500.
4. AI_Answer_Snippet, Short_Description, and FAQ_3_Answer each END with the {PHONE} token in a CTA.
5. Find-and-replace test: remove the location name and location-specific facts still remain.
6. >=4 distinct REAL local signals; the Short_Description hook is NOT weather-defaulted unless weather is
   genuinely this place's defining trait.

STEP 4 - WRITE a JSON object (UTF-8) to OUTPATH with EXACTLY these string keys:
Location_ID, Entity_Description, AI_Answer_Snippet, Short_Description, Long_Description, Local_Facts,
FAQ_1_Question, FAQ_1_Answer, FAQ_2_Question, FAQ_2_Answer, FAQ_3_Question, FAQ_3_Answer,
Conversational_Query_Examples, signals_count, verification_status
- verification_status = "Verified" if all checks pass; "Needs_Review" if you omitted facts/were uncertain.
Then return ONLY a one-line status: "OK <Location_ID> sig=<signals_count> <verification_status>" or
"FLAG <Location_ID> <short reason>".

TASK: Location <NAME> (Location_ID <ID>, slug <SLUG>, unified score <SCORE>). Grounding bundle:
GROUNDPATH. Write output JSON to: OUTPATH.
```

---

## 3. Validation evidence (Nova Scotia, why this prompt is effective)

Run on the top 8 publishable rows: **8/8 OK, 0 flagged, 0 errored.** Halifax (NS-0001) output:
- `Entity_Description` 68w — real: 439,819 pop, world's 2nd-largest natural harbour, Irving Shipbuilding,
  CFB Halifax, Dalhousie, QEII, founded 1749.
- `AI_Answer_Snippet` 46w — answer-first, `{COMPANY_NAME}` once, ends `Call {PHONE}.`
- `Short_Description` 104w — **unique hook** ("Salt air rolling off Halifax Harbour…"), no boilerplate.
- `Long_Description` 368w — Citadel Hill, harbour, named neighbourhoods, climate-tied.
- FAQs — question-format, distinct angles, one hyper-local (HRM coverage); 9 signals; `Verified`.
- **0 double-curly**, all placeholders single-curly and intact.

This clears the gold-standard bar in `01-nova-scotia-pilot-and-content-bar.md §3`.

---

## 4. QA gate before commit (run on the assembled batch)

- Every row: 0 invented facts (spot-check sample vs bundle), 0 `{{`, placeholders intact, word counts in
  range, `{PHONE}` CTA endings present, ≥4 signals, find-and-replace passes.
- Distribution of `verification_status` (Verified vs Needs_Review); `Needs_Review` rows are NOT published.
- No two neighbours share a Short_Description opening device (hook-diversity check).

---

## 5. Reuse for the other databases

Identical prompt; only the harness inputs change. Per database: run Phases A–C → write grounding bundles
for its publishable tier → run this prompt in the paced workflow → assemble + QA. **US variant (LA):** the
grounding bundle carries ZIP/miles/state instead of FSA/km/province; the prompt is unchanged (it reads
"province/state", "postal/ZIP"). Order: Nova Scotia → LA → Alberta → BC → Ontario → Saskatchewan.

*The runnable workflow script is generated by `scratchpad/gen_ns_full.py` (paced chunks of 6, rows + paths
inlined, no args dependency — args binding and CR line endings both broke earlier runs; inlining + LF fixed it).*
