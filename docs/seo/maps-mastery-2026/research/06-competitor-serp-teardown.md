# Research 06 — Competitor & SERP Teardown: What Actually Ranks #1

> **Stream (deep-dive addendum):** Reverse-engineering the highest-traffic "[service] in [city]" / "Areas We Serve" pages and the local SERP-feature anatomy of the winners.
> **Compiled:** 2026-06 · Fresh web research, cross-checked. Primary sources cited inline. Disagreements flagged.
> **Status:** Evidence dossier. Feeds → `reports/01-MAPS-INTEGRATION-PLAYBOOK.md`, `reports/03-QA-SHIP-GATES.md`.

---

## EXECUTIVE SUMMARY — 10 evidence-backed bullets

1. **Unique, first-party local content is the dividing line between page-1 and filtered.** Sterling Sky + Whitespark converge on the same template: company history in that area, city-specific service descriptions, local team bios, original testimonials, local FAQs, before/after photos, community connections — content that *cannot* survive a find-and-replace. Sterling Sky: *"Thin content on service area pages can result in a penalty from Google."*
2. **There is no magic word count — coverage and structure beat length.** Ranking service pages cluster around **500–1,000 words** of unique copy, but the dominant 2026 signal is *structure*: headings are "in the top 10 ranking factors," and "a 1,200-word post that answers the question clearly beats a 2,500-word post that repeats itself."
3. **The embedded map is a ranking asset, not decoration — proven by A/B test.** SearchPilot removed the map from location pages → **statistically significant ~7% drop in organic sessions.** Keep the map (rendered as a facade — see playbook).
4. **Showing a physical address is the ~7th-strongest local factor; hiding it is repeatably catastrophic.** Sterling Sky hid a home-service client's address → rankings tanked → restored a month later when re-added → *replicated on a second location.*
5. **Review velocity now outweighs review total.** Sterling Sky (8,186 businesses / 200 cities): "the number of reviews you've gotten *this month* matters more than your total." A client's rankings "fell off a cliff" after an **18-day** pause from their usual 60+/month. Reviews *with text* outrank text-free.
6. **The local pack still captures the most local clicks, and its curve is flat.** ~44% of local searchers click the 3-pack vs ~29% organic; #1 pack ≈17.6%, #2 ≈15.4%, #3 ≈15.1%. Going #1→#3 loses only ~2.5 pts — **inclusion ≫ exact position.**
7. **Organic below the pack is brutal: ~2.6% average CTR if you're not in the 3-pack.** The service-area page is a *supporting* asset for pack ranking and AI citation, not the primary click magnet on a local SERP.
8. **AI Overviews dominate local SERPs and suppress clicks hard.** AIOs appear in **40.2%** (Local Falcon, 60k searches) to ~68% of local queries; presence correlates with **~58% lower CTR for position 1** (Ahrefs, 300k keywords). Service categories are most exposed (window cleaning 65.0%, carpet cleaning 64.6%).
9. **For local AI citations, your own website wins — directories/reviews are the verification layer.** Yext (6.9M citations): **websites** are the most-cited controllable category for objective "near me" questions (>40% of citations for unbranded local), cited **4.31× per URL** vs **2.46× per listing.**
10. **Doorway/thin/duplicate/NAP-drift/JS-hidden content is the documented way to tank.** Whitespark warns against doorway pages and caps at **~10–15 quality city pages** before quality suffers.

---

## 1. Anatomy of a #1-ranking service-area page (2026)

Synthesizing Sterling Sky, Whitespark, SearchPilot, Sangfroid — the winning **section order**:

| # | Section | Why |
|---|---|---|
| 1 | **Geo-H1 + intro** ("[Service] in [City]") with a city-specific opening line | Headings top-10 factor; location-first improves relevance/CTR |
| 2 | **Local context paragraph** — company history *in that area* | Whitespark "background/history in the area" |
| 3 | **City-specific service description** (not brand boilerplate) | Avoids cannibalizing the brand service page |
| 4 | **First-party proof** — local testimonials (Review schema → stars), case studies, before/after, job-site photos | Sterling Sky core elements; star snippets |
| 5 | **Embedded map + served-communities list** | SearchPilot: removing it cost ~7% sessions |
| 6 | **Local trust signals** — visible NAP, memberships, news, guarantees | Visible address = ~7th factor |
| 7 | **City-specific FAQ** in conversational language | AI-Mode citation bait + FAQ schema |
| 8 | **Geo CTA + contact** (form, click-to-call, hours), repeated | Conversion |
| 9 | **Internal links** up to service/city hubs + nearby areas | Never orphan SAB pages |

**Word count:** target **500–1,000 words** of genuinely unique copy; prioritize sectioning over volume. **Map:** mid-page with the served-communities list. **Reviews:** high *and* schema-marked.

---

## 2. Page-1 vs filtered — the concrete differences

| Page-1 | Filtered / deindexed |
|---|---|
| High % unique local content (landmarks, local projects, local team, local FAQ) | Boilerplate cloned across cities, city name swapped (doorway) |
| First-party signals (original photos/video, real testimonials, pricing/stats) | Stock content, no original media |
| Linked from homepage/service/blog | Orphaned or hidden in a footer city-list |
| Visible NAP matching GBP | Hidden address / NAP drift |
| Substantive on-page text (slight positive correlation, 8,186-study) | Thin content → penalty |
| Restrained scale (~10–15 city pages) | Mass-produced hundreds of near-identical pages |

Sterling Sky's illustrative example: **Minars Dermatology** — GBP enhancement + high-quality *local* content + optimized area pages → **35 → 1,350 daily clicks** and **670 → 1,920 monthly leads** (agency-reported; directional).

---

## 3. Local SERP-feature anatomy & click reality

**What shows for "[service] [city]" / "[service] near me" in 2026:** AI Overview / AI local pack (1–4 businesses) → Local Pack (3-pack) → People Also Ask → organic → (on expansion) Local Finder. These often show *different* businesses in each feature.

**Winnable real estate & CTR:**
- **Local Pack** — the prize. ~44% of local clicks; curve flat (#1≈17.6%, #2≈15.4%, #3≈15.1%) → **inclusion ≫ position.**
- **Organic (not in pack)** — ~**2.6%** CTR. Supporting role.
- **AI Overview** — in 40.2%–68% of local queries; suppresses position-1 organic CTR ~58% when present. Distance has *no* correlation with AIO ranking (Local Falcon coefficient 0.001) — unlike the pack.
- **Zero-click** — ~60% of Google searches end without a click (mobile up to ~77%).

**Implication:** the area page's job is *less* winning the organic click, *more* (a) supporting GBP/pack ranking and (b) being the cited source in the AI layer.

---

## 4. What winners do off-page (documented numbers)

- **Review velocity:** maintain a *monthly* pace. Stable competitors at 15–45/month; a 60+/month client crashed after an 18-day pause.
- **Review quality:** reviews *with text* + higher average rating correlate positively (8,186-study).
- **Visible address:** keep it public — ~7th factor; hiding it produced *repeatable* drops.
- **GBP completeness + recent photos:** helped in visually-focused categories.
- **Brand mentions / unstructured citations:** AI Mode pulls from blogs, news, social, community hubs — pursue them.

---

## 5. AI Overview / AI Mode — local citation patterns

- **The business's own website is the most-cited controllable category** for objective unbranded "near me" questions (>40% of citations; 4.31× per URL vs 2.46× per listing) — Yext, 6.9M citations.
- **Listings/directories** dominate *distinct-URL count* (54.5%) and serve as the **verification layer** (strongest for category-defining queries).
- **Reviews & social** are a *declining* citation category but still surface (Yelp, Instagram).
- **Subdomain/clean-path location pages** are over-represented ("AI doesn't have to compute folder structures") — a structural hint.
- General AIOs skew to YouTube (~23.3%), Wikipedia (~18.4%), Google.com (~16.4%) — but that's *informational*; for *transactional local*, first-party website + complete directory listings is the cleaner signal.
- **Caveat:** top-10 organic gives only ~25% chance of AIO inclusion (Whitespark) — citation is not guaranteed by ranking.

**Template implication:** write FAQ + local-context in natural Q&A language so the page is the citable answer; keep NAP-consistent directory presence as the verification layer; consider clean/subdomain location URLs.

---

## 6. Documented mistakes that tank pages

1. Doorway pages (duplicated, keyword-stuffed, excessive links). 2. Thin content (direct penalty risk). 3. Footer city-list / hidden links / orphaned pages. 4. NAP drift / hidden address. 5. Keyword cannibalization with the brand service page. 6. Removing the embedded map (~7% session loss). 7. Over-scaling beyond ~10–15 quality city pages. 8. JS-rendered/hidden content (must be crawlable HTML).

---

## 7. Five "winner patterns" to bake into the template

1. **Mandatory unique-content gate per page** — require ≥4 genuine local signals before publish. *(thin → penalty; doorway warning)*
2. **Keep the embedded map + served-communities list as a fixed module.** *(SearchPilot ~7% session loss when removed)*
3. **Visible, GBP-matched NAP block on every page; never hide the address.** *(~7th factor; repeatable drop when hidden)*
4. **Conversational FAQ section + Review/FAQ schema as standard.** *(AI-Mode FAQ guidance + first-party citation dominance; star snippets)*
5. **Restrained scale + internal-link pyramid (homepage → service → city → nearby).** *(~10–15 cap; never-orphan rule)*

**Bonus:** pair each page with an off-page **monthly review-velocity** target (≥15/mo, text-encouraged). *(18-day pause crashed rankings)*

---

## Disagreement / uncertainty flags
- **AIO local prevalence:** 40.2% (Local Falcon, primary-sourced) vs ~68% (secondhand) — lower figure more defensible.
- **Word count:** no source proves a causal count; treat 500–1,000 as a floor-for-uniqueness, not a target.
- **AI citation source mix:** studies measure different query types; first-party-website dominance holds for *objective local* queries specifically.
- **Minars/before-after numbers:** agency-reported, directional not controlled.

---

## SOURCES

- [Sterling Sky — What Gets You Ranking for "Near Me" in 2025 (8,186 businesses)](https://www.sterlingsky.ca/what-gets-you-ranking-for-near-me-2025/)
- [Sterling Sky — Create Unique & Helpful Service Area Pages](https://www.sterlingsky.ca/how-to-create-unique-and-helpful-service-area-pages-for-local-businesses/)
- [Sterling Sky — Does Hiding Your Address Impact GBP Ranking?](https://www.sterlingsky.ca/hiding-address-google-business-ranking/)
- [Whitespark — Ranking a Service Area Business Using Exceptional City Pages](https://whitespark.ca/blog/rank-in-cities-with-no-physical-address/)
- [Whitespark — Guide to Google's AI Mode for Local Businesses](https://whitespark.ca/guides/whitesparks-guide-to-googles-ai-mode-for-local-businesses/)
- [SearchPilot — Embedded Map Components & Local SEO Signals (A/B)](https://www.searchpilot.com/resources/case-studies/local-seo-embedded-map-component)
- [SearchPilot — Location at Start of Title Tag & CTR](https://www.searchpilot.com/resources/case-studies/adding-location-to-start-of-title-tags-ctr)
- [Ahrefs — AI Overviews Reduce Clicks by 58% (Dec 2025)](https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/)
- [Local Falcon — Impact of Google AI Overviews on Local Business Search Visibility (Apr 2025)](https://www.localfalcon.com/blog/whitepaper-studies-the-impact-of-google-ai-overviews-on-local-business-search-visibility)
- [Yext / iPullRank — Local Visibility in AI Search: 6.9M Citations (2025)](https://ipullrank.com/local-ai-search-data)
- [Surfer SEO — AI Citation Report 2025](https://surferseo.com/blog/ai-citation-report/)
- [RedLocalSEO — Google Local Pack Statistics 2025 (BrightLocal-sourced)](https://www.redlocalseo.com/google-local-pack-statistics/)
- [12AM Agency — Ideal Word Count for SEO and Citations in 2026](https://12amagency.com/blog/ideal-word-count-for-seo-and-citations/)
- [Sangfroid — Local SEO City Landing Pages (2026)](https://www.sangfroidwebdesign.com/local-seo/city-pages/)
- [Peak District SEO — Google Ranking Factors 2026](https://peakdistrictseo.co.uk/google-ranking-factors/)
- [Search Engine Land — How AI Is Impacting Local Search](https://searchengineland.com/guide/how-ai-is-impacting-local-search)
- [Innerspark Creative — SEO Statistics 2025 (Zero-Click & AIO)](https://www.innersparkcreative.com/news/seo-statistics-2025-verified-market-share-ctr-zero-click-aio)
