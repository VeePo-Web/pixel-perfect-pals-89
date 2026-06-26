# Research 03 — GEO/AEO for Local: Getting Cited by AI Search

> **Stream:** How to get a local service business's "Areas We Serve" pages and local blog content CITED, quoted, and recommended by AI search (Google AI Overviews / AI Mode, ChatGPT Search, Perplexity, Claude, Gemini, Copilot) for local / "near me" / geographic queries.
> **Compiled:** 2026-06 · Fresh web research, cross-checked. Primary sources cited inline.
> **Status:** Evidence dossier. Feeds → `reports/00-MASTER-STRATEGY.md` and `prompts/08-ai-citation-and-entity-hardening.md`.

---

## Executive Summary — 10 Evidence-Backed Bullets

1. **AI engines do NOT primarily live-crawl for local answers — they retrieve from a search index plus structured business data.** AI Overviews/AI Mode draw on Google's own index + the GBP/Maps layer; ChatGPT Search and Copilot lean on Bing; Perplexity blends its own index + live retrieval. For local queries, **GBP is now the primary data layer** and your website is the **authoritative FAQ/answer layer** ([Whitespark, May 2026](https://whitespark.ca/guides/whitesparks-guide-to-googles-ai-mode-for-local-businesses/)).

2. **The old "rank top-10 and you'll be cited" rule has collapsed.** Ahrefs (863K kw / 4M URLs): only **37.9% of AI Overview citations come from top-10 pages — down from 76% mid-2025.** ~31% from ranks 11–100, ~31% from beyond 100. Cause: better citation parsing + **query fan-out** ([Ahrefs](https://ahrefs.com/blog/ai-overview-citations-top-10/)).

3. **Ranking top-10 organically gives a local business only ~25% chance of appearing in the AI answer** (Whitespark). Top-10 helps but is **neither necessary nor sufficient.**

4. **Almost no major AI crawler executes JavaScript.** Vercel/MERJ (500M+ GPTBot fetches): **zero JS execution.** GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot fetch raw HTML only. **Only Googlebot/Google-Extended (Gemini) and Applebot render JS** ([Vercel, Dec 2024](https://vercel.com/blog/the-rise-of-the-ai-crawler)). → **Static/server-rendered HTML with content + schema in the initial response is non-negotiable.**

5. **The original GEO academic paper proves content tactics work:** adding **statistics, quotations, and cited sources** lifted generative visibility up to **~40%** ([arXiv 2311.09735](https://arxiv.org/abs/2311.09735)). Local equivalent: **original local data, named local facts, first-party photos, named local testimonials.**

6. **Answer-first structure is the single highest-leverage pattern.** A direct 40–60 word answer immediately under a question heading lets engines extract + attribute cleanly. **FAQPage content showed a ~67% citation rate** in a relevant-query test; schema-marked pages reported **~3× more likely** cited ([DigitalApplied, Jun 2026](https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study)).

7. **Brand mentions beat backlinks for AI visibility.** Ahrefs (75,000 brands): branded web mentions correlate **0.664** with AI visibility vs **0.218** for backlinks (~3×). For local: **unstructured citations** (local news, "best of"/Yelp lists, community pages, associations) matter more than classic link-building.

8. **Freshness is a hard ranking signal.** ~50% of AI-cited content is <13 weeks old; pages updated in the last 2 months earn **~28% more** AI citations than 6-month-old pages. → **Visible "Last updated" + `dateModified` schema** on every area page and blog post.

9. **`llms.txt` does essentially nothing for AI-search citations in 2026.** Google (Illyes/Mueller) likened it to the keywords meta tag; Ahrefs found **97% of llms.txt files got zero traffic** (137K-site study); rated 2.0/10 for impact. Optional, harmless, low priority — not a GEO ranking factor.

10. **For robots.txt, allowing the *search* bots is mandatory to be cited.** Blocking GPTBot only stops *training*; **OAI-SearchBot** enables ChatGPT Search citations. **Accidentally blocking search crawlers is the highest-impact AI-visibility mistake** ([OpenAI bot docs](https://developers.openai.com/api/docs/bots)).

---

## 1. How AI Engines Retrieve & Cite Local Sources

AI engines are **retrieval-augmented**, not omniscient. They retrieve candidate sources from an index, then synthesize and cite.

- **Google AI Overviews / AI Mode:** Google's own index **plus the GBP/Maps/Knowledge Graph layer.** AI Mode uses **query fan-out** — it decomposes "best emergency plumber near me" into many sub-queries (24-hr? licensed? drain vs leak? neighborhood?) and cites pages that perform across the *whole cluster*. This is why pages ranked 11–100 now get cited: they win a sub-query.
- **ChatGPT Search & Copilot:** primarily **Bing's index** + live retrieval (OAI-SearchBot / Bing's bot).
- **Perplexity:** own index + live retrieval (PerplexityBot), heavily citation-forward.
- **Claude/Gemini:** Claude via web search/ClaudeBot; Gemini inherits Googlebot infrastructure (renders JS).

**What determines whether YOUR page is *the* cited source for "best X in [city]":**
1. You exist in the index (crawlable static HTML).
2. **Entity clarity** — the page unambiguously is about `{service} in {city}` (title, H1, first sentence, `areaServed` schema).
3. **Query-answer match** — you directly answer the fan-out sub-questions.
4. **Corroboration** — GBP, directories, reviews independently confirm you serve that area (NAP consistency).
5. **Information gain** — something the other candidates don't have.

---

## 2. AI Overview ↔ Organic Overlap: Latest Numbers (disagreement flagged)

The most contested statistic in the field. Methodologies are not comparable:

| Source | Overlap of AIO citations with organic top-10 | Date |
|---|---|---|
| **Ahrefs** (863K kw) | **37.9%** (down from 76% mid-2025) | 2026 |
| **Originality.AI** | **52%** | 2025–26 |
| **BrightEdge** | growing 32% → **54%** | 2026 |
| **seoClarity** | **~17%** (flat) | 2025–26 |
| **Whitespark** (local) | top-10 → only **~25%** chance of AIO inclusion | 2026 |

**Honest verdict:** the *trend* is **downward** (fan-out + better citation detection). High vs low numbers differ mainly on what counts as a "citation" and query filtering. For standalone assistants, overlap with Google's organic is **looser still** (different indexes). Classic rankings remain a strong input but are **no longer the gate.**

---

## 3. Do AI Crawlers Execute JavaScript? (Confirmed — existential for scale)

**Confirmed: No, with two exceptions.**
- **Vercel × MERJ** (500M+ GPTBot fetches): **zero JS execution.** GPTBot fetched JS files ~11.5%, ClaudeBot ~23.8% — but **never ran them.**
- **Render-capable:** only **Googlebot / Google-Extended (Gemini)** and **Applebot.**
- **Scale:** GPTBot ~569M fetches/mo (~20% of Googlebot), Claude ~370M, combined AI crawlers ~28% of Googlebot volume.

**Practical implication (release blocker for a matrix):** client-injected area pages, FAQ blocks, internal links, or JSON-LD are **invisible to ChatGPT, Perplexity, and Claude.** A `{service} × {community}` matrix **must be pre-rendered to static HTML with content + JSON-LD in the served markup.** Verify by fetching a built URL with JS disabled.

---

## 4. Content Patterns That Win AI Citations for LOCAL Queries

Ranked by evidence:
1. **Answer-first / definition blocks (highest leverage):** question H2/H3 → **direct 40–60 word answer first** → expand. **44.2% of LLM citations come from the first 30% of a page.**
2. **FAQ blocks with FAQPage schema:** ~67% citation rate in one test; most AI-extractable pattern. One geo-specific question per area page.
3. **Schema/structured data:** LocalBusiness (`areaServed` scoped to community), FAQPage, BreadcrumbList, WebPage, Review/AggregateRating. ~3× more citable; ~73% higher selection in AI Overviews.
4. **"Information gain" — original local facts (the GEO paper's core finding):** statistics, quotes, cited sources lifted visibility up to ~40%. Local: named local project references, climate/code notes, first-party photos, named local testimonials, local data you collected. Pass the "remove the city name — is anything left?" test.
5. **Lists & comparison tables:** text + images + structured elements showed **156% higher selection** (BuzzStream).
6. **E-E-A-T & author entities:** author bylines + `sameAs`; visible NAP; reviews. **Brand mentions ~3× more predictive than backlinks.**
7. **Freshness:** visible "Last updated" + `dateModified`. ~50% of cited content is <13 weeks old.

**Editorial content is disproportionately cited** — ~53% of citations are editorial/blog (≈80% excluding branded queries). Validates the **local blog cluster linking down into the area-page matrix.**

---

## 5. The "AI Local Pack" / AI-Mode Local Results

- AI Overviews on **~40–68% of local queries.**
- Google rolling out **AI-driven local packs** (mobile, US): only **1–2 businesses** vs the classic 3-pack, often **lack call buttons**, surface ~**32% fewer unique businesses** ([Sterling Sky, May 2026](https://www.sterlingsky.ca/the-state-of-local-seo-in-2026/)).
- **GBP vs website:** GBP feeds the **structured layer** (name, hours, ratings, photos, Reserve with Google); the **website is the authoritative answer layer** for FAQs + depth. You need both. Pack rewards proximity + reviews; AI Overviews reward information quality + entity clarity.
- **The shift:** often **"get cited," not "get the click"** — AI Overviews reduce clicks ~58% on affected queries (Ahrefs); 67% of consumers don't fact-check AI-cited sources.
- **Hallucination risk:** AI conflates stale/cross-source data — keep NAP/hours/policies identical across GBP, directories, and site.

---

## 6. The Honest Verdict on `llms.txt` (2026)

**Does not move the needle for AI-search citations.**
- Google (Illyes/Mueller): not supported; "purely speculative"; likened to the keywords meta tag.
- **Ahrefs (137K sites): 97% got zero traffic.** DigitalApplied rates it 2.0/10.
- OpenAI/Anthropic/Perplexity do **not** document it as a citation signal.
- **Real use:** developer-doc products for AI *coding* assistants — a different use case.
- **Verdict: optional, harmless, low priority; do not sell it as a GEO ranking factor.**

---

## 7. robots.txt for AI Crawlers — Allow vs Block (for a business that WANTS citations)

Separate **training** bots from **search** bots — the whole game:

| Bot | Purpose | For citations |
|---|---|---|
| **OAI-SearchBot** | ChatGPT Search index | **MUST allow** |
| **ChatGPT-User** | live fetch on user action | **Allow** |
| GPTBot | model training | Optional (block ≠ lose citations) |
| **PerplexityBot** | Perplexity index | **Allow** |
| **ClaudeBot / Claude search** | Claude web | **Allow** to be citable |
| **Google-Extended** | Gemini/AIO grounding | **Allow** |

- **Allowing search crawlers is non-negotiable if visibility is the goal.** No "cite me without crawling me" setting.
- Common stance: **block GPTBot (training) but allow OAI-SearchBot (search).** For a small business wanting reach, **allow all the search/answer bots.**
- **#1 mistake: accidentally blocking OAI-SearchBot / PerplexityBot / Google-Extended** via a broad `Disallow`.

---

## 8. Concrete Do / Don't — Rank in BOTH Google Local AND AI Answers

**DO**
- Serve **static/pre-rendered HTML** with content + JSON-LD in the initial response.
- **Answer-first 40–60 word blocks** under question headings + a **geo-specific FAQ** with FAQPage schema.
- Emit **LocalBusiness (`areaServed`), FAQPage, BreadcrumbList, WebPage** per page; **Review/AggregateRating** where genuine (never self-serving).
- Inject **information gain**: named local facts, original data, first-party photos, named testimonials (≥4 of 8 local signals).
- Keep **NAP identical** across site, GBP, Bing Places, directories.
- **Allow OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended.**
- Visible **"Last updated"** + `dateModified`; refresh on a cadence.
- Build **unstructured citations + brand mentions** (out-predict backlinks ~3×).
- Run a **blog cluster** linking *down* into the area matrix.
- Optimize **GBP aggressively** — it's the primary local data layer.

**DON'T**
- Don't rely on client-side rendering for content, links, or schema.
- Don't ship find-and-replace area pages (doorway/thin filtering).
- Don't bank on `llms.txt` for citations.
- Don't block the **search/answer** crawlers.
- Don't assume top-10 organic = AI citation (only ~25% for local).
- Don't let GBP/site data drift out of sync (mis-citation risk).
- Don't use "Areas We Serve" as one page for all towns — one indexable URL per `{service}×{community}`.

---

## SOURCES

- [Vercel — The rise of the AI crawler (Dec 17 2024)](https://vercel.com/blog/the-rise-of-the-ai-crawler)
- [Ahrefs — 38% of AI Overview Citations Pull From the Top 10 (2026)](https://ahrefs.com/blog/ai-overview-citations-top-10/)
- [Ahrefs — 76% of AI Overview Citations Pull From the Top 10 (Jul 2025)](https://ahrefs.com/blog/search-rankings-ai-citations/)
- [Ahrefs — 97% of llms.txt Files Never Get Read (2026)](https://ahrefs.com/blog/llmstxt-study/)
- [Ahrefs — AI Overviews Reduce Clicks by 58%](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)
- [Whitespark — Guide to Google's AI Mode for Local Businesses (May 22 2026)](https://whitespark.ca/guides/whitesparks-guide-to-googles-ai-mode-for-local-businesses/)
- [Sterling Sky — The State of Local SEO in 2026](https://www.sterlingsky.ca/the-state-of-local-seo-in-2026/)
- [DigitalApplied — What Actually Gets You Cited in AI Search (2026)](https://www.digitalapplied.com/blog/ai-search-citation-ranking-factors-2026-data-study)
- [DigitalApplied — Google Says llms.txt Has No SEO Value](https://www.digitalapplied.com/blog/google-llms-txt-no-seo-value-lighthouse-audit-2026)
- [Aggarwal et al. — GEO: Generative Engine Optimization (arXiv 2311.09735)](https://arxiv.org/abs/2311.09735)
- [SEJ — AI Overview Citations From Top-Ranking Pages Drop Sharply](https://www.searchenginejournal.com/google-ai-overview-citations-from-top-ranking-pages-drop-sharply/568637/)
- [SEJ — Google Says llms.txt Is Purely Speculative](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)
- [BrightEdge — AI Overview Citations 54% From Organic Rankings](https://www.brightedge.com/resources/weekly-ai-search-insights/rank-overlap-after-16-months-of-aio)
- [seoClarity — Overlap Between AI Overviews and Organic Rankings](https://www.seoclarity.net/research/aio-rankings-overlap)
- [Originality.AI — 52% of AI Overview Citations in the Top-10](https://originality.ai/blog/google-ranking-ai-citations-study)
- [OpenAI — Overview of OpenAI Crawlers](https://developers.openai.com/api/docs/bots)
- [AdviceLocal — 2026 Local Search Ranking Factors (Maps, Organic & AI)](https://www.advicelocal.com/blog/2026-local-search-ranking-factors-maps-organic-ai/)
- [Passionfruit — JS Rendering and AI Crawlers: Can LLMs Read Your SPA? (2026)](https://www.getpassionfruit.com/blog/javascript-rendering-and-ai-crawlers-can-llms-read-your-spa)
- [AuthorityTech — Content Freshness in 2026](https://authoritytech.io/blog/content-freshness-seo-ai-2026)

**Evidence vs hype:** the overlap percentages (§2) genuinely conflict across vendors; treat any single number with caution, the *direction* (declining top-10 dependence) as robust. The **JS-rendering** finding (§3), the **llms.txt null result** (§6), and the **train-vs-search-bot distinction** (§7) are the best-evidenced and most actionable. Freshness/schema "lift" percentages are vendor studies (directionally consistent, not peer-reviewed); the one peer-reviewed source (GEO paper) confirms statistics/quotes/citations causally raise generative visibility.
