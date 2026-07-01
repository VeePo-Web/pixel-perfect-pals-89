# Prompting Claude Fable 5 for World-Class Location Content — Research + Optimized Prompt

> Deep-research on how to prompt **Claude Fable 5** (`claude-fable-5`, the Claude 5 family) most
> effectively, then the **Fable-5-optimized** rewrite of the Phase-D per-location content prompt. This
> supersedes the plain-prose prompt in `03-location-content-generation-prompt.md` for the generation
> agents.
>
> Note: model IDs — Fable 5 `claude-fable-5`, Opus 4.8 `claude-opus-4-8`, Sonnet 5 `claude-sonnet-5`,
> Haiku 4.5 `claude-haiku-4-5-20251001`. Always confirm current API specifics via the `claude-api`
> reference before wiring code.

---

## 1. How to prompt Claude well (the techniques that move quality)

Anthropic's prompt-engineering guidance, ordered by impact for a **structured content-generation** task
like ours:

1. **Be explicit, clear, and direct.** State the task, the audience, the format, and the constraints
   plainly. Claude follows precise instructions better than it infers intent. Prefer positive instructions
   ("write X") over long lists of "don't."
2. **Use a strong role / system framing.** Open with *who the model is* ("You are an elite local-SEO + GEO
   content writer…"). A sharp role measurably lifts domain quality and tone.
3. **Structure the prompt with XML tags.** Claude is specifically tuned to respect XML delimiters. Wrap the
   inputs, the rules, the output contract, and any examples in named tags (`<grounding>`, `<rules>`,
   `<output_contract>`, `<example>`). This removes ambiguity about "what is data vs. instruction" and is the
   single biggest structural win for reliability.
4. **Put the long/reference material FIRST, the instruction LAST** (for long-context tasks). Placing the
   grounding data before the task, and the final instruction at the end, improves adherence. In our case:
   grounding bundle → rules → "now write and save."
5. **Give an explicit output contract.** Name every output field and the exact format (here: a JSON object
   with named keys, then a one-line status). Ambiguous output specs are the top cause of malformed results.
6. **Multishot (examples) is the highest-leverage single addition.** One or two *gold* worked examples
   (input → ideal output) teach format + tone + the quality bar far better than description alone. For us:
   include the Halifax gold row as a `<example>` so every agent anchors to it.
7. **Let it think, then act (for hard judgment).** For tasks needing verification/judgment, allow a brief
   reasoning pass before the final answer. Keep the *saved* output clean (reasoning stays out of the JSON).
   Fable 5 responds well to a short, scoped "verify against these checks, then write" step.
8. **Emphasis, used sparingly.** A few "MUST"/"NEVER"/"HARD RULE" markers on the non-negotiables (grounding,
   placeholders, word counts) work; over-emphasizing everything flattens the signal.
9. **Decompose into numbered steps.** A clear STEP 1→4 sequence (ground → write → self-verify → save)
   outperforms a wall of requirements.
10. **Constrain length explicitly and give a why.** "40–60 words — this is the AI-citation extraction unit"
    beats "keep it short." Tie each constraint to its purpose so the model optimizes correctly.
11. **Prefill / lead the format** where the harness allows (e.g. begin the answer with `{` for JSON). In a
    tool-writing flow, the equivalent is an unambiguous "write EXACTLY this JSON shape to OUTPATH."
12. **Iterate empirically.** Validate on a small batch, read the outputs, tighten the one or two rules that
    slipped, then scale. (This is exactly how the NS validation → full run was structured.)

**Anti-patterns to avoid:** burying the task inside data; mixing instruction and content without tags;
vague length/format; negative-only instruction lists; over-emphasis on everything; no example; asking for
reasoning *inside* the structured output.

---

## 2. How those map to our task

| Technique | Applied to location content |
|---|---|
| Role framing | "Elite local-SEO + AI-search (GEO) writer" |
| XML tags | `<grounding_bundle>`, `<rules>`, `<fields>`, `<self_check>`, `<output_contract>`, `<gold_example>` |
| Data-first | Read the grounding bundle before the rules; task line last |
| Output contract | Exact JSON keys + one-line status |
| Multishot | Embed the Halifax gold row as the example |
| Think-then-act | A scoped `<self_check>` pass before writing |
| Emphasis (sparing) | Only on: grounding/anti-hallucination, single-curly placeholders, word counts, `{PHONE}` endings |
| Length + why | Each field's word count tagged as an extraction target |
| Empirical | Validate 8 → scale 249 (already done) |

---

## 3. THE FABLE-5-OPTIMIZED PROMPT (per location)

Replace `GROUNDPATH`/`OUTPATH`, and append the `<task>` line. The `<gold_example>` is abbreviated here for
the doc; the runtime prompt embeds the full Halifax row from `01-nova-scotia-pilot-and-content-bar.md §3`.

```
You are an elite local-SEO + AI-search (GEO) content writer. You produce world-class "Areas We Serve"
content for ONE location, for a niche-agnostic template that any local service business rebrands via
find-and-replace. You write like someone who has actually worked in that town.

<grounding_bundle>
Read the JSON at: GROUNDPATH
It holds this location's REAL data (name, type, parent, region, province/state, population, coordinates,
postal/ZIP) and existing factual text (Entity_Description, Local_Facts, Long_Description) rich with real
landmarks, employers, history, and economy.
</grounding_bundle>

<rules>
- ANTI-HALLUCINATION (hard rule): the bundle is your source of truth and is usually sufficient. Do NOT web
  search unless a specific needed fact is genuinely missing for a notable town — most locations need ZERO
  searches. NEVER invent a landmark, statistic, founding date, employer, or fact. If unsure, omit it. Mine
  the bundle for real specifics; fix any grammar.
- PLACEHOLDERS (single-curly, keep exactly): {SERVICE} {BUSINESS_TYPE} {COMPANY_NAME} {PHONE} {TAGLINE}
  {UNIQUE_VALUE_PROP} {SERVICE_DESCRIPTION} {SERVICE_LIST} {RESPONSE_TIME} {ESTIMATE_TYPE} {PROPERTY_TYPE}
  {RATING} {YEARS_IN_BUSINESS} {EMAIL} {WEBSITE} {CTA_PRIMARY}. Write the LOCATION NAME literally. NEVER use
  double braces. NEVER invent a company name, phone, rating, or years — always use the token.
</rules>

<fields>
- Entity_Description — 50-100 words. Encyclopedic, PURE FACTS, no placeholders. Answers "What is <loc>?"
  first. Real population + >=3 real facts (geography, employers/economy, history, building stock).
- AI_Answer_Snippet — 40-60 words (the AI-citation extraction unit). Answer-first. Name {COMPANY_NAME}
  exactly once. 1-2 real local specifics. MUST end "Call {PHONE}."
- Short_Description — 100-150 words. UNIQUE opening hook: lead with whatever is MOST distinctive for THIS
  place (industry/employer, a named landmark, harbour/lake/coast/geography, history/founding, growth, or
  climate). Do NOT default to weather; never reuse a formula; never start with "Here is the truth about".
  Ends with a CTA ending in {PHONE}.
- Long_Description — 300-500 words. Storytelling proving deep local knowledge; weave in >=4 real local
  signals (named neighbourhoods, landmarks, climate-tied-to-service, employers, building stock). {TOKENS}
  for business claims. Specific, never filler.
- Local_Facts — exactly 5-7 bullet lines "- ", every fact real and from the bundle. No placeholders.
- FAQ_1/2/3 (Question+Answer) — question-format, answer-first 2-3 sentences, three DISTINCT angles
  (coverage, local conditions, pricing, response time, why-choose). At least one HYPER-LOCAL FAQ.
  FAQ_3_Answer ends with a CTA ending in {PHONE}.
- Conversational_Query_Examples — exactly 5, pipe-separated, real local phrasing.
</fields>

<self_check>
Before writing, silently verify and fix until ALL pass: (1) zero invented facts; (2) placeholders
single-curly + intact, location literal, no double braces, no invented business details; (3) word counts
met; (4) AI_Answer_Snippet, Short_Description, FAQ_3_Answer each end with {PHONE}; (5) find-and-replace
test — remove the location name and location-specific facts still remain; (6) >=4 distinct real local
signals; hook not weather-defaulted unless weather is genuinely defining. Keep this reasoning OUT of the
saved JSON.
</self_check>

<gold_example>
[Halifax gold row — Entity 68w factual; AI snippet 46w answer-first ending "Call {PHONE}."; Short_Desc
unique hook "Salt air rolling off Halifax Harbour…"; distinct local FAQs; see pilot doc §3.]
</gold_example>

<output_contract>
Write a UTF-8 JSON object to OUTPATH with EXACTLY these string keys: Location_ID, Entity_Description,
AI_Answer_Snippet, Short_Description, Long_Description, Local_Facts, FAQ_1_Question, FAQ_1_Answer,
FAQ_2_Question, FAQ_2_Answer, FAQ_3_Question, FAQ_3_Answer, Conversational_Query_Examples, signals_count,
verification_status ("Verified" if all checks pass, else "Needs_Review").
Then reply with ONLY one line: "OK <Location_ID> sig=<n> <verification_status>" or "FLAG <Location_ID> <reason>".
</output_contract>

<task>Location <NAME> (Location_ID <ID>, slug <SLUG>, score <SCORE>). Grounding: GROUNDPATH. Write to: OUTPATH.</task>
```

**What changed vs. the v1 prose prompt (why this is better for Fable 5):** XML-tagged sections (data vs.
rules vs. contract vs. example); grounding placed first, task last; an embedded gold example (multishot);
a scoped, kept-out-of-output self-check; emphasis reserved for the true non-negotiables. Expect higher
first-pass pass-rate and lower variance — and the validated v1 already produced clean, world-class output,
so this is a refinement, not a rescue.

---

## 4. Status & how to execute (blocked on spend)

**The generation run cannot proceed right now:** the account hit its **monthly spend limit** mid-run
(217/249 NS agents failed with "You've hit your monthly spend limit"). **33 rows completed clean** (Halifax
+ the top publishable tier) and are preserved.

**To finish:** raise the limit at `claude.ai/settings/usage`, then resume — the workflow caches completed
agents, so only the ~216 unfinished NS rows re-run (the 33 done cost nothing to keep). Swap this
Fable-5-optimized prompt into `scratchpad/gen_ns_full.py` (or a new generator) before resuming for the
best quality, keep the **paced chunks of 6** (a wide fan-out trips the transient rate limit), then assemble
+ QA + commit. Then repeat per database: LA → Alberta → BC → Ontario → Saskatchewan.
