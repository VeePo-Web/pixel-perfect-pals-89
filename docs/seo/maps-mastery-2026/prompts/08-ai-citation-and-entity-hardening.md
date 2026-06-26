# Prompt 08 — AI-Citation + Off-Site Entity Hardening

> **Goal.** Maximize the odds that AI engines (AI Overviews/AI Mode, ChatGPT, Perplexity, Claude, Gemini) **cite this business** for local queries — and that Google's local pack ranks it — by hardening the entity, off-site signals, and review velocity that LLMs cross-reference.
>
> **Satisfies:** AI-citation + off-site. **Evidence:** `../research/03`, `../research/01`. Mostly **ops + on-page entity**, not heavy code.

---

## On-page entity (code/config)
1. **`sameAs` everywhere** — GBP Maps URL + every social/profile, on the brand `LocalBusiness` node (consistent across all pages). Add `@id` (Wikidata) to area `City` nodes where available.
2. **Answer-first + FAQ + info-gain** on every area/blog page (prompts 04, 05) — the patterns LLMs extract (44.2% of citations from the first 30%; FAQ ~67% citation rate; original data up to ~40% lift).
3. **Freshness** — `dateModified` + visible "Updated {Month} 2026" tied to real edits.
4. **Static render** (prompt 01) — non-JS AI crawlers see nothing client-injected. Confirm.

## Crawler config
5. **robots.txt allows** `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`, Googlebot, Bingbot. Blocking these = the #1 AI-visibility mistake. (Optionally block `GPTBot` training while allowing `OAI-SearchBot` search.)
6. **`llms.txt`** — optional/low-priority (~zero AI-search lift). Build only if trivially cheap; never gate on it.

## Off-site (ops — these out-predict backlinks ~3× for AI)
7. **Brand mentions + unstructured citations:** local news, "best of"/roundup lists, Yelp/industry directories, association pages, community sites. Pursue actively — branded web mentions correlate ~3× more than backlinks with AI visibility.
8. **NAP-consistent citations** across the top directories (Google, Apple Maps, Bing Places, Yelp, BBB, industry-specific). Byte-identical NAP; this is the verification layer Google + LLMs cross-reference.
9. **Review velocity** (also a Google pack factor): sustained ≥4/mo, text-rich, responded-to within 48h; never stall.

## AI-local-pack readiness
10. **GBP as the structured layer** (prompt 07) + the **website as the answer layer**. AI local packs show only 1–2 businesses and often lack call buttons — the win is being the **cited/recommended** source. Keep GBP ↔ site data identical to avoid hallucinated mis-citation.

## Verification (paste evidence)
- robots.txt confirmed to allow all search/answer crawlers (no broad `Disallow`).
- A sample area/blog page (JS off): `sameAs`, answer-first block, FAQ schema, "Updated {Month} 2026" all present in static HTML.
- A directory/citation audit shows NAP byte-identical across the top listings + the site schema.
- (Ongoing, not a build claim) track AI citations + local-pack presence for the priority `{service} {city}` queries over the weeks after launch.
