# Research 02 — How Google Maps / Local Pack / GBP Rankings Work, and How On-Site Areas + Maps Support Them

> Deep-research findings brief. Sources current to 2025–2026. Proven vs. speculative is flagged throughout.

Google's local ranking rests on three officially-stated pillars — **relevance, distance, prominence** — but the modern weighting of *what feeds* those pillars has shifted sharply toward reviews and Google Business Profile (GBP) signals, with on-site content acting as a relevance/prominence support layer rather than a direct Maps lever.

## 1. The real ranking factors and modern weighting

BrightLocal's 2026 Local Search Ranking Factors survey groups Local Pack weighting as: **GBP ~32%, Reviews ~20%, On-page ~15%, Behavioral ~9%, Links ~8%, Citations ~6%, Social ~5%** (BrightLocal 2026). Reviews rose from 16% (2023) to 20%; on-page fell from 19% to 15%.

Top individual Local Pack factors: **#1 Primary GBP category, #2 proximity to searcher, #3 keywords in GBP business title, #4 physical address in the search city, #5 open status, #6 high star ratings** (BrightLocal 2026). Proximity is #2 individually but a shrinking share of total weight (~25–30% in 2020 → ~15% in 2025).

Sterling Sky's 2025 study of **8,186 businesses across 200 cities** ("near me" queries) found the strongest movers are **review recency and velocity** — a steady monthly stream of fresh, text-containing reviews — over raw review count. Reviews *with text* outrank ratings alone.

## 2. Service-area business (SAB) specifics

The single most counter-intuitive area. **The GBP "service area" setting does NOT impact ranking** — it is purely visual (Sterling Sky). A plumber verified in Town A ranks strongest in Town A's pack and fades with distance regardless of how many service-area cities are listed.

Worse, Sterling Sky's 2025 "near me" study found a **negative correlation between hiding your address and ranking**. Practical takeaways: (a) keep a verifiable address and, where legitimate, display it; (b) to rank in a city you have no address in, you cannot rely on GBP proximity — you must win on **prominence (reviews, links, citations), relevance (on-site content), and behavioral signals.**

## 3. The website + on-site location pages as a prominence/relevance signal

On-page is ~15% of pack weight, and a "physical address in the search city" is a top-5 factor — so **content is the primary lever an SAB can pull for non-address cities**. A dedicated, substantive city page is the mechanism by which Google associates your *entity* with a geography you can't claim via proximity. Sterling Sky's data shows landing-page content depth (meaningful word count, not stop-words) correlates with better pack rankings.

**Evidence-based, not myth:** a city page genuinely helps you rank in that city's *organic* local results and contributes relevance/prominence toward the pack — but it does **not override the distance pillar.** Unique, locally-specific pages are supported; thin doorway pages are penalized.

## 4. Embedding a Google Map — myth vs. evidence

**Myth:** that embedding a Google Map is a ranking factor. Whitespark: "embedding the Google Map of a GMB listing will get some engagement... but it's just not a ranking factor on its own." Google ended embed-to-address ranking credit in **June 2018** after abuse.

**What's still useful (UX/trust, not ranking):** embedding your *own GBP map* (tied to your Place ID / CID) aids users and may drive minor profile engagement; driving-directions links and a store-locator are conversion aids. what3words and KML overlays carry no documented ranking benefit. The legitimate SEO play near a map is the surrounding **content and LocalBusiness schema**, not the iframe itself.

## 5. NAP consistency, citations, schema, and the Knowledge Graph

NAP consistency remains a top-15 pack factor and a foundational trust signal. Citations are ~6% of weight: a baseline, not a growth lever.

**LocalBusiness JSON-LD** doesn't directly move the Map Pack but strengthens your **entity in Google's Knowledge Graph** and qualifies pages for organic rich results. The critical mechanic is **`sameAs`**: linking your Organization/LocalBusiness markup to GBP/Maps URL, Wikidata, and social profiles reduces entity ambiguity and ties website to GBP entity. This is *entity reinforcement* — supportive (not deterministic) for the pack, proven helpful for organic and AI surfaces.

## 6. Reviews — on-site vs. GBP

Native **GBP reviews** are the ranking-relevant ones (~20% of pack weight; recency/velocity/text strongest). **On-site review display + schema** does not feed Maps, but supports conversion, dwell time, behavioral signals (~9%). Leverage play: drive a steady stream to GBP for Maps; surface the best on-site for trust and organic E-E-A-T.

## 7. 2025–2026 changes

- **GBP website builder removed:** Google shut down ~21.7M `business.site` sites in March 2024; redirects ended June 10, 2024 → those URLs 404. A real, owned "areas we serve" site is now essential.
- **AI Overviews + local intent:** AIOs appear for ~68% of local searches overall but only ~15% of *simple transactional* local queries vs ~92% of *informational* local queries. For "near me"/transactional, the **classic Local Pack still appears in 90%+ of results** (Search Engine Land 2025). Organic CTR can fall up to ~60% when an AIO appears.

## Sources
- BrightLocal — Local Algorithm & Ranking Factors: https://www.brightlocal.com/learn/google-local-algorithm-and-ranking-factors/
- Sterling Sky — Ranking for "Near Me" 2025: https://www.sterlingsky.ca/what-gets-you-ranking-for-near-me-2025/
- Sterling Sky — Does GBP Service Area Impact Ranking: https://www.sterlingsky.ca/does-the-service-area-in-google-my-business-impact-ranking/
- Whitespark — 10 Local SEO Myths Debunked: https://whitespark.ca/blog/10-common-local-seo-myths-debunked/
- Search Engine Land — Service Area Pages: https://searchengineland.com/guide/service-area-pages
- Google Business Profile Help — GBP website shutoff: https://support.google.com/business/answer/14368911
- Search Engine Journal — Schema for Local SEO: https://www.searchenginejournal.com/how-to-use-schema-for-local-seo-a-complete-guide/294973/
- Local Falcon — AI Overviews impact on local visibility: https://www.localfalcon.com/blog/whitepaper-studies-the-impact-of-google-ai-overviews-on-local-business-search-visibility
