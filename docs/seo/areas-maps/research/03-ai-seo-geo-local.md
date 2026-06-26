# Research 03 — Getting a Local Business Cited by AI Search (GEO/AEO for "Near Me")

> Deep-research findings brief. Sources 2025–2026. *Proven* (multi-study/large-n) vs *emerging* (single-source/vendor) is flagged.

**Headline reality:** local AI search is **source-borrowed**, not natively local — AI engines assemble "near me" answers from the web layer (Bing index, Reddit, directories, reviews), not from a Google-Maps-equivalent of their own.

## 1. How AI engines answer local / "near me" queries (platform-by-platform)

**Proven — they don't use Google's local stack.** No major AI engine queries GBP directly.

- **ChatGPT search** runs a **Bing search in real time, scans the top ~20–30 results**, and selects by its own criteria (not Bing rank). It favors **Yelp, BBB, Facebook, TripAdvisor, Foursquare, and local media/listicles** (Eater, Time Out). Map previews come from **Mapbox**, not Google. ChatGPT cannot read GBP data.
- **Perplexity** is a citation-first answer engine, best for current local info. **Reddit ≈ 47% of its citations** (Profound 2025) — the highest of any platform.
- **Google AI Overviews / AI Mode** inherit Google's index (Google-Extended renders JS) but **barely trigger on local intent** (see §7). Reddit ≈ 21% of AIO citations.
- **Gemini** cites Reddit almost never (~0.1%); leans on the Google index + Wikipedia.

**Implication:** "Optimize for the sources the AI reads" beats "optimize the listing." The web-page / Reddit / review layer is the battlefield, especially for ChatGPT and Perplexity.

## 2. Crawlability precondition (the hard gate)

**Proven.** Major AI crawlers **do not render JavaScript** — GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Amazonbot see **raw HTML only**. Exception: **Google-Extended** inherits Google's rendering (Cloudflare 2025; Vercel 2025).

- Location pages built as client-rendered SPAs are **effectively invisible** to AI crawlers. SSR/SSG so the H1, body copy, NAP, and **JSON-LD live in the initial HTML response.**
- **robots.txt best practice:** explicitly `Allow` GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot. Blocking removes you from the candidate set.

## 3. Content structure that wins citations for location pages

**Proven (GEO research).** The Princeton/Georgia Tech GEO study (Aggarwal et al., 2024): **adding statistics lifts AI visibility 30–40%**; citing credible sources raises citation probability.

Apply on every city/service page:
- **Answer-first 40–60-word blocks** immediately under each heading.
- **Question-format H2s mirroring conversational queries** ("How much does [service] cost in [city]?").
- **Entity + named-location clarity:** business name, city, neighborhoods, landmarks stated explicitly in text.
- **Lists and tables** extract cleanly.
- **3–5 FAQ items per page** with standalone 40–60-word answers + FAQPage schema; LocalBusiness with `areaServed`.

## 4. The off-site consensus signal (the biggest local lever)

**Proven.** Citation studies converge: **Reddit is the single most-cited domain** across ChatGPT, Perplexity, Google AIO, Gemini; YouTube, LinkedIn, Wikipedia, Forbes round out the top five. Even the top domain rarely exceeds ~5% — a **long-tail consensus**, not winner-take-all.

For local specifically:
- **Consistent cross-source mention drives recommendation.** Being named in "best [service] in [city]" listicles, directories (Yelp, BBB, Angi, Porch), and Reddit threads builds the corroboration AI uses. ~**86% of AI citations trace to brand-managed sources** (site, directory listings, review profiles) (evolveamz 2026).
- **Reviews matter — text and rating both.** ChatGPT-recommended locations average **~4.3 stars**; businesses near 3.4 stars with <5% review-response rates are "effectively invisible." AI reads review *content*, not just the number.
- **NAP consistency is a confidence signal.**
- *Emerging:* prioritize the review platform that dominates **your** category and city (Whitespark 2025: Facebook led 10/18 categories, Yelp 2nd, but TripAdvisor for bakeries, Porch for garage-door repair).

## 5. llms.txt for a local business

**Proven negative.** SE Ranking (300,000 domains): ~10% adoption, **no statistically significant correlation** with AI citation frequency. Google confirms **no AI system currently fetches it.** For a local business in 2026, llms.txt is a **low-cost, low-yield optional bet** — build it only if trivially cheap; GBP optimization and §3–4 fundamentals return vastly more.

## 6. Freshness / recency signals

**Proven, stronger than expected.** Ahrefs (17M AI citations, July 2025): AI-cited content is **25.7% fresher** than traditionally ranked organic. **~50% of AI-cited content is <13 weeks old**; pages **<30 days old earn ~3.2× more citations** (the "13-Week Rule").

- ChatGPT shows aggressive recency bias (76.4% of most-cited pages updated within 30 days); Perplexity ~50% current-year.
- **Signal weighting:** `dateModified` > visible "last updated" date > publish date. **Cosmetic `dateModified` bumps without real change are discounted** — refresh real content (new stats, projects, local detail) every ~60–90 days.

## 7. Concrete current data points

- AI Overviews on local queries: **~7% overall**; for explicitly local keywords AIO triggered on only 0.14% (Mar 2025) → 0.01% (Sep 2025). Local SERPs are **largely AIO-resistant.**
- **Only ~1.2% of local businesses get recommended by AI** (SOCi 2026).
- ChatGPT ≈ 60.6% AI-search market share.
- Reddit citation share: ~47% Perplexity, ~21% AIO, ~11% ChatGPT, ~0.1% Gemini.
- 86% of AI citations from brand-managed sources; ~4.3 avg stars for ChatGPT-recommended locations.

**Net strategy:** Win the **Bing-indexed web + Reddit + review/directory consensus** layer with **server-rendered, schema-marked, answer-first, frequently-refreshed** city/service pages and consistent NAP — that is the corpus AI engines actually read for "near me." The map listing alone won't get you cited.

## Sources
- https://searchengineland.com/guide/how-ai-is-impacting-local-search
- https://www.localfalcon.com/blog/chatgpt-local-search-data-sources-where-does-business-info-come-from
- https://searchengineland.com/how-does-chatgpt-conduct-local-searches-454894
- https://quickseo.ai/blog/google-ai-overviews-statistics-2026-60-data-points-every-seo-should-know
- https://blog.cloudflare.com/from-googlebot-to-gptbot-whos-crawling-your-site-in-2025/
- https://vercel.com/blog/the-rise-of-the-ai-crawler
- https://searchengineland.com/ai-search-engines-cite-reddit-youtube-and-linkedin-most-study-473138
- https://www.semrush.com/blog/most-cited-domains-ai/
- https://www.tryprofound.com/blog/ai-platform-citation-patterns
- https://whitespark.ca/blog/want-to-rank-in-chatgpt-focus-on-these-review-sites-new-research/
- https://evolveamz.com/local-business-ai-search-guide/
- https://www.soci.ai/blog/how-to-rank-in-chatgpt-perplexity-and-google-ai-overview/
- https://seranking.com/blog/llms-txt/
- https://rank-and-convert.ghost.io/the-13-week-rule-how-content-freshness-drives-ai-search-citations/
