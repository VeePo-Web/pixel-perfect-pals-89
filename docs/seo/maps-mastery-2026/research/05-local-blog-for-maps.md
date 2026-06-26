# Research 05 — Local Blog Content for Maps/Local Authority

> **Stream:** Local blog content that drives the most traffic + AI citations and reinforces "Areas We Serve"/Maps rankings — what to write, how to structure it, how it interlinks with location pages.
> **Compiled:** 2026-06 · Fresh web research, cross-checked. Primary sources cited inline.
> **Status:** Evidence dossier. Feeds → `prompts/05-local-blog-engine.md`.

---

## Executive Summary (10 bullets)

1. **The intent bridge is the whole game.** Blog clusters serve *informational* intent and link DOWN into transactional "Areas We Serve"/service pages. Mixing them on one URL causes cannibalization — the most common local-SEO self-inflicted wound.
2. **One keyword → one URL → one intent.** A blog targets "how much does a roof replacement cost in [city]" (informational); the money page targets "roof replacement [city]" (transactional). Same keyword is only OK on two pages if intents differ.
3. **Information gain beats word count.** Google's March 2026 core update made *information gain* dominant. A 1,200–1,500-word post with one original/proprietary data point outranks a 4,000-word restatement. Mass-produced AI content lost up to **71%** of traffic; pages with original data gained **15–25%** visibility.
4. **AI citation rules differ wildly by engine.** ChatGPT cites brands ~**0.59%**, Perplexity ~**13.05%**, Grok ~**27%** of responses. Only ~**11%** of domains are cited by both ChatGPT and Perplexity — optimize structure, not a single engine.
5. **Front-load the answer.** **44.2%** of LLM citations come from the first 30% of a page. Answer-first paragraphs (40–60 words) under question headings win snippets + AI extraction.
6. **Structure earns citations.** FAQ-formatted content gets ~**40%** higher citation weighting in ChatGPT; structured-data pages show ~**73%** higher selection in AI Overviews; text+media pages **156%** higher selection than text-only.
7. **Freshness is a real lever for AI.** ~**82%** of Perplexity-cited content was published within 30 days; adding a "2026" year signal lifts citation rates ~**30%**. Maintain `dateModified` + a visible "Last updated" line.
8. **Geo/neighborhood blog content is powerful but doorway-adjacent.** "Best neighborhoods for X," landmark guides, and local cost guides build authority — only if genuinely unique (reviews, named streets, local conditions). City-name-swap = doorway, penalized by Core Updates/SpamBrain.
9. **Internal links are the cheapest ranking lever.** Sterling Sky: "a few solid links are better than a dozen junky ones"; descriptive anchors only; a single well-placed internal link produced "an immediate ranking improvement." ~3–5 contextual links per post is the working norm.
10. **Cadence: consistency > volume.** Young blog (<1 yr): 6–8 posts/month around a few clusters; mature: steady weekly + a *refresh* program. Topic-clustered pages earn **2–3×** more organic traffic than standalone posts.

---

## 1. Hub-and-Spoke + the Intent Bridge

**Pillar/hub** (broad — "Complete Guide to Home Plumbing Maintenance") links to **spokes** (long-tail — "Signs You Need a New Water Heater"), which link back to the hub + 2–3 siblings. Signals deep topical coverage to Google + AI.

**The local twist — the "intent bridge":** the cluster hands traffic to money pages:
- **Homepage** → service pages + top city hubs.
- **Blog spoke** → its hub + the matching **service page** + (when locally relevant) the matching **Areas We Serve/city page.**
- **City/Area page** → relevant blog posts ("Local resources for [city] homeowners") — closing the loop so authority flows both ways and no page is orphaned.

**Topic types that rank + get cited locally:** cost/price guides, "how to choose a [trade]," seasonal/maintenance, problem-symptom ("signs you need…"), permit/regulation, neighborhood/landmark guides.

---

## 2. Keyword & Intent — Blog vs. Money Page

| Belongs on a BLOG (informational) | Belongs on a MONEY page (transactional) |
|---|---|
| "how much does [service] cost in [city]" | "[service] [city]" / "[service] near me" |
| "how to choose a [trade]" | "hire [trade] [city]" / "[trade] in [neighborhood]" |
| "signs you need [service]" | service detail page |
| "[permit/bylaw] for [project] in [city]" | "Areas We Serve / [city]" hub |
| "best neighborhoods for [X]" / local guides | — |

**Cannibalization rule:** keep a keyword map — one primary keyword + one intent per URL. If a blog post and a service page both chase "[service] [city]," merge/re-optimize and 301 the weaker URL. "Near me" is a *money-page* intent, not a blog target.

---

## 3. Geo + Maps-Flavored Blog Content (and the Doorway Line)

**What works (Google + AI):** "best neighborhoods in [city] for X," local cost guides, "[service] near [landmark]," area roundups, neighborhood spotlights, local events/seasonal guides — "position your business as a local authority even when the content isn't directly about your services." Reference **specific neighborhoods, named streets, landmarks, local conditions, local reviews.** Embedding a relevant map + text + image lifts AI Overview selection **156%** vs text-only.

**What tips into thin/doorway:** pages whose "only difference is the city name." Google's doorway policy warns against region/city pages that funnel users to one page; enforcement via Core Updates + **SpamBrain.** **Guardrails:** every geo post needs real local content (reviews, named places, code/conditions), must be naturally linked (no orphans), and be a genuine *resource* — mirror the 4-of-8 local-specificity discipline.

---

## 4. Content Patterns That Win AI Citations (Applied to Local Posts)

- **Answer-first:** 40–60-word direct answer under a question heading — front 30% drives **44.2%** of LLM citations.
- **FAQ blocks:** ~40% higher citation weighting in ChatGPT (note: FAQ *rich results* retired in Google Search May 7, 2026 — the *format* still helps AI extraction).
- **Original "information gain":** proprietary data, first-hand local case studies. Original stats → +22% visibility; direct quotations → +37%.
- **Lists & tables:** structured comparisons (cost by neighborhood, "permit vs no permit") extracted cleanly.
- **Freshness:** publish/update recency + visible year ("2026"); 82% of Perplexity citations <30 days.
- **E-E-A-T/author:** named author with verifiable credentials + bio; first-person local experience ("we've completed 47 projects in [city]").
- **Caveat:** the SEO→AI pathway has *decoupled* — only ~17–38% of AI Overview citations now come from top-10 (down from 76% mid-2025). Ranking #1 ≠ citation; structure + freshness + entity clarity matter independently. Sources disagree on exact figures.

---

## 5. Schema for Local Blog Posts

- **`BlogPosting`/`Article`** on every post. Recommended (none strictly required by Google): `headline`, `image`, `datePublished`, `dateModified`, `author` (name + url), `publisher`.
- **`author` as nested `Person`** with `jobTitle`, `url`, `sameAs` — supports E-E-A-T.
- **`BreadcrumbList`** on every post (reinforces hierarchy).
- **`FAQPage`** — *2026 change:* FAQ **rich results removed from Google Search May 7, 2026.** Markup is still valid Schema.org, can stay, still helps AI extraction — don't expect the SERP rich result.
- **`HowTo`** for genuine step-by-step; **`LocalBusiness`** in global schema (not blog body) so author/publisher entity ties back to the local entity.
- **The 5 that move the needle in 2026:** Organization, Article/BlogPosting, FAQPage (caveat above), Product, LocalBusiness. Structured data → ~73% selection-rate improvement in AI Overviews.

---

## 6. Cadence, Depth, Refresh

- **Cadence:** young blog → 6–8/month around a few clusters; mature → steady weekly. "Consistency matters more than volume." Clustered pages earn **2–3×** standalone traffic.
- **Depth/word count (2026):** no magic number. *Information gain over word count* — match competitor depth, then add something the top-10 don't have (local data point, named project, original photo).
- **Refresh:** prioritize *updating* decaying posts over net-new — realign to intent, refresh stats, add a local example, bump `dateModified` + the visible "Last updated." Itself a quality/freshness signal, disproportionately valuable for AI citation.

---

## 7. Internal Linking Rules

- **Blog → service page:** if a post mentions a service you offer, link it.
- **Blog → area/city page:** when a post has local context, link the matching city page (descriptive geo-natural anchor).
- **Area page → blog:** city hubs link to relevant local posts (loop closed, no orphans).
- **How many:** ~3–5 contextual internal links per post (siblings + hub + service/area).
- **Anchor text:** descriptive, never "click here"/"learn more"; **vary** anchors to the same destination; avoid exact-match on *every* link. Link from high-authority pages (find via GSC/GA4) to lower-visibility city/spoke pages.
- **No orphans:** every post linked from at least its hub + nav/related module.

---

## 8. Ranked Local Blog Post Formats (intent + Maps/area tie-back)

1. **Local cost/price guide** — "How much does [service] cost in [city]?" → informational, high-volume; → city + service page. *(Strongest traffic + AI-citation magnet via original price data.)*
2. **"How to choose a [trade] in [city]"** — commercial-investigation; pre-sells trust → service + area page.
3. **Problem/symptom diagnostic** — "Signs you need [service]" → high intent-to-convert; → exact service page.
4. **Seasonal/maintenance guide** — "[City] [season] checklist" → recurring traffic; ties to local climate + city page.
5. **Neighborhood guide** — "Best neighborhoods in [city] for X" → authority + local relevance; → area hub. *(Doorway-risk if templated.)*
6. **Landmark-anchored guide** — "[Topic] near [landmark]" → hyperlocal "near [place]"; → nearest area page.
7. **Permit/regulation/bylaw explainer** — "Do you need a permit for [project] in [city]?" → unique local info (high information gain).
8. **Local case study / project spotlight** — "How we did [project] on [named street]" → first-hand E-E-A-T + proprietary evidence; → service + city page.
9. **Comparison post** — "[A] vs [B] for [city] homes" → solution-aware; table-format = AI-extractable.
10. **Local FAQ roundup** — "[Service] FAQs for [city] homeowners" → answer-first + FAQ structure for AI.
11. **Area roundup / "best of"** — "Best [adjacent local resource] in [city]" → links + community signal; supports the area hub.
12. **Local event / community involvement** — signals active local presence; supports GBP/local relevance.
13. **Original local data report** — "2026 [city] [service] price index" → the single best AI-citation + link-earning asset (information gain).
14. **"What to expect" process post** — removes friction; → booking/service page.
15. **Buyer's-guide / "best [product] for [local condition]"** — "best roofing for [region] storms" → commercial-investigation; ties product to local conditions + city page.
16. **Troubleshooting how-to (`HowTo`)** — DIY-then-call-us; broad informational traffic, soft-CTA to service page.

**Tie-back principle:** every format must (a) serve informational intent, (b) carry ≥1 descriptive link DOWN to a service/area page, (c) be linked back FROM the relevant area hub — that triangle converts blog authority into Maps/local-pack + "Areas We Serve" strength.

---

## Sources

- [How ChatGPT, Google AI Overviews, and Perplexity Source Information in 2026 — Leapd](https://www.leapd.ai/blog/ai-visibility/how-chatgpt-google-ai-overviews-and-perplexity-source-information-in-2026)
- [Information Gain: Google's #1 Ranking Signal in 2026 — Digital Applied](https://www.digitalapplied.com/blog/information-gain-google-ranking-signal-april-2026)
- [Information Gain & March 2026 Core Update — Vantacron](https://vantacron.com/blog/information-gain-is-the-ranking-signal-nobody-s-optimizing-for-how-google-s-march-2026-core-update-rewards-content-that-)
- [Topic Cluster Content Architecture 2026 — Digital Applied](https://www.digitalapplied.com/blog/topic-cluster-content-architecture-2026-seo-methodology)
- [Content Clusters & Internal Linking for SEO (2026) — SEOScore](https://seoscore.tools/blog/content-clusters/)
- [Topic clusters: The next evolution of SEO — HubSpot](https://blog.hubspot.com/marketing/topic-clusters-seo)
- [Internal Linking Techniques for Local SEO — Optuno](https://www.optuno.com/blog/internal-linking-techniques-for-local-seo)
- [The Ridiculously Easy SEO Trick: Internal Links — Sterling Sky](https://www.sterlingsky.ca/youre-not-using-enough-internal-links/)
- [Service area pages — Search Engine Land](https://searchengineland.com/guide/service-area-pages)
- [Keyword Cannibalization — Neil Patel](https://neilpatel.com/blog/keyword-cannibalization/)
- [Location Pages: What Crosses the Line to Doorway Abuse? — RicketyRoo](https://ricketyroo.com/blog/location-page-spam/)
- [An update on doorway pages — Google Search Central Blog (2015)](https://developers.google.com/search/blog/2015/03/an-update-on-doorway-pages)
- [Creating Helpful, Reliable, People-First Content — Google Search Central](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Article Schema Markup — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/article)
- [FAQPage structured data — Google Search Central](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [FAQ Rich Results Deprecated: Google's May 2026 Change — Passionfruit](https://www.getpassionfruit.com/blog/what-changed-with-google-drops-faq-rich-results-and-what-to-do-now)
- [Local SEO: The Definitive Guide for 2026 — Backlinko](https://backlinko.com/local-seo-guide)
- [Answer Engine Optimization: Complete AEO Guide 2026 — Frase](https://www.frase.io/blog/what-is-answer-engine-optimization-the-complete-guide-to-getting-cited-by-ai)
- [How Often Should You Blog? — HubSpot](https://blog.hubspot.com/marketing/blogging-frequency-benchmarks)

**Uncertainty:** AIO↔organic decoupling figures disagree (Ahrefs ~38% vs BrightEdge ~17%); trend solid, exact figure not. Citation-rate stats (FAQ +40%, schema +73%, freshness +30%) are vendor studies — directionally credible, methodologically unverified. FAQ rich results gone from SERPs (May 7 2026) but markup still aids AI extraction. No source endorses a fixed word count — 2026 consensus is *information gain over length*.
