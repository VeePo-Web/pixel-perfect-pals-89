# PROMPT 08 — AI Local Pack Readiness & Local AI-Citation

> Fire after Prompts 00–03 + 07. Paste this whole file to the build agent.
> The local SERP changed in 2026: **AI Local Packs** show only **1–2 businesses (vs 3) and have no call
> button**, and the new **"AI Search Visibility"** ranking category weights **on-page (24%) over GBP
> (12%)**. This prompt adapts the Areas template so the *page itself* gets cited by AI for local queries
> and converts when the pack shrinks. Net-new in the 2026 field update.

---

## ROLE

You are the **AI Search Optimization Specialist** (`/ai-seo`) + **Conversion** (`/convert`). Frontend
only, on `MASTER_REMIX` tokens. Goal: the area page is the **cited local source** *and* converts the
click AI sends it. Verify with evidence.

## ONE-SENTENCE OBJECTIVE

Make each Areas page **AI-citable for local intent** (answer-first, entity-bound, directory-corroborated)
and **conversion-complete on arrival**, because AI Local Packs surface fewer businesses, carry no call
button, and push users to the website.

## WHY / CURRENT STATE

- Field-update 01 §6: **AI Local Packs are live** (mobile/US, ~7% of local keywords) — **1–2 businesses,
  ~32% as many unique businesses as the 3-pack, NO call button.** Fewer pack slots → the **website + AI
  citation** is the conversion path, not pack presence.
- Field-update 01 §3: the 2026 **"AI Search Visibility"** category weights **on-page ~24% > GBP ~12%** —
  the page content is what earns the local AI citation.
- Field-update 03 §1: ChatGPT/Perplexity source local answers from **Bing + directories (Yelp/BBB)**, not
  the GBP API — so on-page facts + directory corroboration + entity `sameAs` (Prompt 07) are what get the
  business named.
- The page must answer the exact local question an AI is asked ("best {service} in {City}", "{service}
  near me", "who does {service} in {City}") in a self-contained, extractable block.

---

## THE WORK

### Part A — Make the page the answer to the local question
1. Add (or confirm from Prompt 03) a **self-contained answer block** near the top of each area page that
   directly answers "**Who provides {service} in {City}, and what should I know?**" in **40–60 words** —
   business name + the one differentiating local fact + service scope. This is the AI-extraction target.
2. Include a **crawlable local facts table** (price range, response time, neighborhoods served, license/
   certs) — tables are cited 2.5–4.2× more than prose (field-update 02 §6). Drive every value from local
   data so it differs per city.
3. Use **question-format H2s** mirroring real "near me"/"best in {City}" phrasing, each with an answer-first
   paragraph (reuse Prompt 03's structure; this prompt ensures the *local-intent* questions are present).

### Part B — Corroboration the AI can cross-check
4. Surface the **entity signals** from Prompt 07 on the page: the `Organization` `sameAs`, real in-city
   reviews (`Review`/`AggregateRating`), and the directory presence — AI engines corroborate a local
   recommendation against Yelp/BBB/Maps, so the on-page claims must match those profiles.
5. Ensure **NAP + areaServed + geo** are consistent across page, schema, GBP, and directories (one entity,
   one truth) so the AI binds the recommendation to the right business in the right place.

### Part C — Convert the click (no call button in the AI pack)
6. The page must be **conversion-complete on arrival**: a single first-person, outcome-named CTA
   ("Get my free {City} quote"), click-to-call `tel:` (E.164), a short trust strip (reviews count, years,
   license), and the response-time promise — all above the fold, all on `MASTER_REMIX` tokens. Since the
   AI pack has no call button, the **website is the call-to-action surface.**
7. Keep the conversion path fast (defer to Prompt 06's CWV budget) — a slow page loses the AI-sent click.

### Part D — Measurement hook
8. Document how the owner monitors AI presence: Bing Webmaster Tools' **AI Performance / Copilot citation**
   report, manual prompt-spot-checks ("best {service} in {City}") across ChatGPT/Perplexity/Google AI Mode,
   and GBP insights. Note that AI-citation % is **volatile** — track trend, not a single number.

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **Local answer block:** a sample city page has a 40–60-word self-contained answer to "who does {service}
   in {City}" + a local facts table, both in **static HTML** (JS-disabled fetch confirms).
2. **Corroboration:** `Organization.sameAs` (≥3) + in-city `Review`/`AggregateRating` render and validate;
   NAP/areaServed/geo consistent across page + schema.
3. **Conversion-complete:** single first-person CTA + `tel:` + trust strip above the fold; CWV budget held
   (Prompt 06 numbers not regressed).
4. **Measurement runbook** committed (Bing AI report + prompt spot-checks + GBP insights).
5. `npx tsc --noEmit` + `npx vite build` green.

## GUARDRAILS

- Don't fabricate the differentiating local fact, the reviews, or the directory profiles — corroboration
  fails if the AI cross-checks and the claims don't match (Prompt 07 supplies the real data).
- The area page stays **commercial**; informational depth lives on the blog (one keyword → one URL).
- AI-citation percentages are dials, not constants — never hardcode a claim like "we appear in AI 40% of
  the time." Track the trend.
- Keep everything token-driven so it remixes per business. Stay scoped: CWV = Prompt 06; entity/off-site =
  Prompt 07; this prompt owns **local AI-citation readiness + arrival conversion**.
