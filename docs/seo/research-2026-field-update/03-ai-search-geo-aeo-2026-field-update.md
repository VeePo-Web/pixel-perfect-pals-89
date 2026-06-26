# Field Update 03 — AI Search, GEO/AEO, Crawlers, robots.txt & llms.txt (2026-06)

> Extends `areas-maps/research/03`, `seo-templates/research/03`, and `DEEPDIVE-5 §3.1`. The confirmed
> structural facts here (no-JS crawlers, schema-in-HTML, the robots 3-lane model) are **load-bearing build
> requirements**; the percentages are dials, not constants.

---

## 1. How each engine sources its answers (and whether any reads GBP)

- **ChatGPT Search** — runs on **Bing's real-time index.** Web search is the minority path: only **~18% of
  ChatGPT conversations trigger any web search/citation** (Profound, ~730k US conversations, Oct–Dec 2025). Favors
  **Wikipedia + Reddit** heavily; premium news (WSJ/NYT/Bloomberg) under-cited. **Volatile:** ChatGPT's Reddit
  citation share collapsed **~60% → ~10%** in Aug–Sept 2025 (an OpenAI-side change) — any pre-Sept-2025 ChatGPT
  sourcing stat is stale. [confirmed pattern / volatile %] → https://www.tryprofound.com/blog/chatgpt-citation-sources
- **Perplexity** — **Reddit is its #1 single domain** (6.6% of all citations, up to 46.7% in some categories);
  most SERP-aligned assistant (~⅓ of its citations also rank in Google top-10 vs ~8% for others). [directional]
  → https://ahrefs.com/blog/ai-search-overlap/
- **Google AI Overviews (AIO)** — RAG over Google's own live index. **AI Mode sources differently:** AI Mode and
  AIO cite the same URLs only **13.7%** of the time despite reaching the same conclusion ~86% of the time
  (SE Ranking, 540k pairs, Feb 2026). **Google self-cites heavily in AI Mode: google.com = 17.42% of all AI-Mode
  citations** (up from 5.7% in Jun 2025). 97% of AI-Mode responses carry ≥1 citation. [directional]
  → https://searchengineland.com/google-ai-mode-citing-google-more-study-471042
- **Bing Copilot** — Bing index + live web; favors recent, structured, easily-parsed pages. Low cross-engine
  source overlap (28% Bing-only, 46% Perplexity-only, 26% shared across 672 queries). [directional]
- **Does any engine read the Google Business Profile API directly?** **No engine is confirmed to.** [unverified —
  frame as upstream] GBP is the dominant *upstream* source for **Google's** AI; non-Google engines instead lean on
  **directories/aggregators** — **Yelp appeared in 33% of local AI searches; Perplexity used Yelp in every
  industry tested** (BrightLocal). **Practical rule: optimize GBP (feeds Google's AI) *and* the
  Yelp/BBB/Trustpilot/G2 directory-review layer (feeds ChatGPT/Perplexity/Copilot).** → https://www.brightlocal.com/blog/ai-search-using-listings-sources/

---

## 2. Do AI crawlers execute JavaScript? (the SSG/static decision) — **CONFIRMED**

**No major AI crawler renders JavaScript, except Google's Gemini (via Googlebot) and Apple's Applebot.** From
the canonical Vercel × Merj study of **500M+ GPTBot fetches: zero evidence of JS execution** across GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Meta-ExternalAgent, Bytespider, PerplexityBot. They *fetch* JS files but
never execute them — they extract text from the **initial HTML only.** [confirmed]
→ https://vercel.com/blog/the-rise-of-the-ai-crawler

| Bot | Renders JS? |
|---|---|
| GPTBot · OAI-SearchBot · ChatGPT-User | **No** |
| ClaudeBot · Claude-SearchBot* | **No** |
| PerplexityBot · Perplexity-User* | **No** |
| Amazonbot* | **No** (cohort-inferred) |
| Google-Extended / Gemini (Googlebot infra) | **Yes** |
| Applebot (search fetcher) | **Yes** |

\*Not individually isolated in the test — high-confidence cohort inference.

> **Build consequence (hard blocker):** a client-only React/Vite SPA is **invisible to ChatGPT, Claude, and
> Perplexity.** Content + all JSON-LD **must be in the initial HTML response (SSR/SSG/prerender).** This is the #1
> reason `areas-maps/prompts/00-static-render-and-discovery.md` runs **first, always.**

---

## 3. Structural patterns that earn AI citations (quantified)

- **Princeton GEO study (KDD 2024, peer-reviewed, ~10,000 queries):** of 9 tactics, **5 raised visibility** —
  Cite Sources, Quotation Addition, Statistics Addition, Fluency Optimization, Authoritative Voice. Effects up to
  **+40% visibility**; **Statistics Addition +41%, Quotation +28%, Cite Sources ~+30–40%.** The biggest lever is
  for **underdogs: ~position-5 pages gained +115%**; position-1 barely moved. The driver is **Information Gain**
  (novel info vs the corpus). [confirmed — direction durable; exact % is 2024-vintage]
  → https://dl.acm.org/doi/10.1145/3637528.3671900
- **Extractable-unit consensus** [directional]: self-contained **40–60-word answer-first blocks** under each
  heading; **question-format H2/H3** matching real queries; **lists & tables** (~80% of AI-cited pages use
  structured elements; tables especially well-extracted); a **stat/date every ~150–200 words**, attributed; one
  `<h1>`, logical heading order, **valid JSON-LD** (Article/FAQPage with dates + author + breadcrumb); visible
  **freshness.** (See field-update 02 §4 for the freshness multipliers.)

---

## 4. llms.txt — settled verdict: **aspirational, not adopted**

**No major AI search/answer engine consumes `llms.txt` as a production signal in 2025–2026.** Google's **Gary
Illyes** confirmed Google does not support it and has no plans to; **John Mueller** compared it to the dead
**keywords meta tag.** Of 500M+ AI-bot visits over 90 days, **only 408 requests targeted `llms.txt`.** ~10% of
domains publish it, but the files are largely **unread by answer bots.** [confirmed]
→ https://www.searchenginejournal.com/google-says-llms-txt-comparable-to-keywords-meta-tag/544804/ · https://www.seroundtable.com/google-ai-llms-txt-39607.html

> **Verdict (confirms `DEEPDIVE-5 §3.1`):** ship `/llms.txt` only if it's trivially cheap (it's harmless and may
> matter later). **Do not present it as a ranking or citation factor, and do not block the build on it.**

---

## 5. robots.txt — the **3-lane bot model** (training vs search-citation vs user-fetch)

The critical 2026 insight: vendors split crawlers into **three independently controllable lanes.** Blocking the
*training* bot does **not** remove you from AI-search citation; *user-fetch* bots may ignore robots.txt entirely.

| Token | Vendor | Lane | robots.txt |
|---|---|---|---|
| `GPTBot` | OpenAI | Training | Honored |
| `OAI-SearchBot` | OpenAI | **Search citation** | Honored |
| `ChatGPT-User` | OpenAI | User-fetch | "rules may not apply" |
| `ClaudeBot` | Anthropic | Training | Honored |
| `Claude-SearchBot` | Anthropic | **Search indexing** | Honored |
| `Claude-User` | Anthropic | User-fetch | Honored |
| `anthropic-ai`, `Claude-Web` | Anthropic | Deprecated | Keep in legacy block lists |
| `PerplexityBot` | Perplexity | **Search indexing** | Honored |
| `Perplexity-User` | Perplexity | User-fetch | "generally ignores robots.txt" |
| `Google-Extended` | Google | Training + Gemini grounding | Honored |
| `Applebot` | Apple | Search (renders JS) | Honored |
| `Applebot-Extended` | Apple | Training opt-out token (does NOT crawl) | Honored |
| `Amazonbot` | Amazon | Indexing (+ reported Nova training) | Honored |
| `CCBot` | Common Crawl | Training corpus (feeds many LLMs) | Honored |
| `Bytespider` | ByteDance | Training | Poor compliance reputation |

**Decision rules:**
- **To appear in ChatGPT search but not train OpenAI:** `Allow: OAI-SearchBot`, `Disallow: GPTBot`.
- **`Google-Extended` is the most misunderstood:** blocking it stops **Gemini/Vertex training + Gemini grounding
  only** — it does **NOT** remove you from **AI Overviews** (AIO obeys **Googlebot**) and is **not a ranking
  signal.** There is no AIO-only opt-out short of blocking Googlebot (which kills organic). [confirmed]
  → https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers
- **`Applebot-Extended`** = Apple-Intelligence training opt-out only; disallowing it does **not** remove you from
  search results. [confirmed] → https://support.apple.com/en-us/119829
- **robots.txt is cooperative, not enforceable:** the user-fetch lane asserts robots.txt "may not apply," and
  Cloudflare caught **Perplexity using undeclared stealth crawlers** to evade no-crawl directives (2025-08-04).
  Hard blocking requires WAF/network enforcement. [confirmed]
  → https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/

> **Template default (for a business that *wants* AI visibility):** `Allow` all search/indexing bots
> (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`, `Applebot`, `Amazonbot`, `Googlebot`, `Bingbot`); leave
> training bots (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`) to the owner's preference (allowing them does
> not help citation but is the common default). Always list a discoverable `Sitemap:`.

---

## 6. Overlap between Google-ranking sites and AI-cited sites

| Surface | Overlap | Source |
|---|---|---|
| Google **AIO** ↔ top-10 | **76% (Jul 2025) → 38% (late 2025/26)** [volatile] | Ahrefs |
| Google **AIO** ↔ organic (page-level) | **54.5%** (grew from 32.3% over 16 mo) | BrightEdge |
| **Standalone assistants** ↔ Google top-10 | **~12%** (Perplexity ~33%, others ~8%) | Ahrefs |
| Google **AI Mode** ↔ top-10 | **~14%** | Semrush |

**Synthesis:** Google ranking is **necessary-but-not-sufficient and weakening for AIO**, **moderate for Perplexity
(~33%)**, **weak for ChatGPT/Gemini/Copilot (~8–12%)** (they read independently via query fan-out). Cite the
76%→38% AIO figure **only with its date.** Vertical variance is large (Healthcare 75%, E-commerce 23%). [directional]
→ https://ahrefs.com/blog/ai-overview-citations-top-10/ · https://ahrefs.com/blog/ai-search-overlap/

---

## 7. What this means for the template (decision summary)

1. **Static render is non-negotiable** — content + JSON-LD in initial HTML, verified with JS disabled. (Prompt 00.)
2. **`llms.txt` is optional/cheap; never a blocker or a claimed ranking factor.**
3. **robots.txt allows the *search* bots by default**, lists a sitemap, and treats *training* bots as an owner toggle.
4. **Off-site directory presence (Yelp/BBB/Trustpilot/G2) is part of local AI optimization**, not just on-site —
   see the new prompt `areas-maps/prompts/07-entity-offsite-and-review-velocity.md`.
5. **Structure for extraction** (answer-first chunks, question H2s, lists/tables, schema, freshness) wins Google
   snippets **and** AI citations from one build — the package's unifying principle, now re-confirmed.
6. **Treat percentages as dials.** Re-verify any cited AI-search % before quoting it externally.

---

## Sources (2026)
- Vercel × Merj — AI crawlers don't render JS: https://vercel.com/blog/the-rise-of-the-ai-crawler
- Princeton GEO (KDD 2024): https://dl.acm.org/doi/10.1145/3637528.3671900
- Profound — ChatGPT citation sources: https://www.tryprofound.com/blog/chatgpt-citation-sources
- Ahrefs — AI search overlap: https://ahrefs.com/blog/ai-search-overlap/ · AIO citations top-10: https://ahrefs.com/blog/ai-overview-citations-top-10/
- SE Ranking via Search Engine Land — AI Mode self-citation: https://searchengineland.com/google-ai-mode-citing-google-more-study-471042
- BrightLocal — AI search using listing sources (Yelp): https://www.brightlocal.com/blog/ai-search-using-listings-sources/
- SEJ — Google says llms.txt ≈ keywords meta tag: https://www.searchenginejournal.com/google-says-llms-txt-comparable-to-keywords-meta-tag/544804/
- OpenAI bots docs: https://developers.openai.com/api/docs/bots · Anthropic crawler docs: https://support.claude.com/en/articles/8896518 · Google common crawlers: https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers · Apple Applebot: https://support.apple.com/en-us/119829 · Perplexity crawlers: https://docs.perplexity.ai/docs/resources/perplexity-crawlers
- Cloudflare — Perplexity stealth crawlers (2025-08-04): https://blog.cloudflare.com/perplexity-is-using-stealth-undeclared-crawlers-to-evade-website-no-crawl-directives/
