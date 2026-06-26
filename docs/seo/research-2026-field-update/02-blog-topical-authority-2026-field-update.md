# Field Update 02 — Blog Topical Authority, Helpful Content & AI Citation (2026-06)

> Extends `seo-templates/research/02`, `BLOG-AISEO-MASTERPLAN.md`, and `DEEPDIVE-5`. Verifies the topical-
> authority + GEO playbook with current sources and adds the 2025–2026 shifts those briefs predate.

---

## 1. Topical authority & internal linking — the current numbers

- **Coverage beats single-asset depth.** A tightly interlinked cluster can outrank higher-DR domains;
  reinforced by the **June 2025 core update**. → https://searchengineland.com/guide/topic-clusters [directional]
- **Cluster sizing:** broad topics need **12–30 spokes**, narrow topics **5–10**; HubSpot recommends **20–30
  spokes/pillar** (cap ~100 subtopic keywords) and implementers saw avg **+43% organic traffic.** [directional]
- **Word-count = guardrails, not goals:** pillar **3,000–5,000**, spoke **800–1,500** (≤~2,500 for a deep
  subtopic). [directional]
- **Internal-link density is hybrid — a floor AND a density rule:** Ahrefs floor **3–5 contextual links/article**;
  density **2–5 internal links per 1,000 words** (~1 per 200–300 words for long-form); the old **"<100 links per
  page" cap is obsolete** (relevance governs). [directional]
  → https://ahrefs.com/blog/internal-links-for-seo/ — **confirms `DEEPDIVE-5 §3.3` (density, not flat minimums).**
- **Mandatory topology:** every spoke links **UP** to its pillar (keyword-rich descriptive anchor), **laterally**
  to 1–3 adjacent spokes, and the pillar links **DOWN** to all spokes.
- **Kevin Indig** measures authority by **"Topic Share"** (your % of a topic's total search traffic), not link/word
  thresholds, and high-authority pages gain traffic **57% faster.** → https://www.growth-memo.com/p/how-to-measure-topical-authority (2025-05-20) [directional]

---

## 2. Helpful Content folded into core + the spam updates — what got crushed, what survived

- **The Helpful Content System is no longer standalone — it folded into core ranking (March 2024).** There is
  nothing separate to "recover from." [confirmed]
  → https://developers.google.com/search/blog/2024/03/core-update-spam-policies
- Google targeted a **40% reduction** in low-quality/unoriginal content; an April 2024 follow-up reported **~45%
  achieved.** [confirmed] → https://blog.google/products/search/google-search-update-march-2024/
- **Three spam policies launched March 2024:** **scaled content abuse** (mass-produced — AI, human, *or* hybrid),
  **site-reputation abuse** ("parasite SEO," enforcement 2024-05-05), **expired-domain abuse.** [confirmed]
- **What got crushed:** scaled, value-thin content (e.g. a site that published **60,000+ articles in ~6 months**
  was hit; AI niche-site portfolios deindexed in a day). **What survived:** AI-*assisted* content where **human
  expertise supplies the substance.** AI use is not penalized per se — *scaled, value-thin* is the kill criterion.
  [directional] → https://www.digitalapplied.com/blog/scaled-content-abuse-google-march-update-ai-pages-decimated
- **2025 calendar:** March 2025 core, **June 2025 core (notable HCU-victim recoveries)**, December 2025 core,
  **August 2025 spam update** (longest recent; targeted scaled/thin, expired-domain, site-reputation — though
  SISTRIX saw minimal *visible* movement). [directional] → https://searchengineland.com/google-algorithm-updates-2025-in-review

### Information Gain is the strategic signal of the era
- Patent *"Contextual Estimation Of Link Information Gain"* (filed 2018) was **granted June 2024** — it scores how
  much **new information a page adds beyond what the user already saw.** It does **not** reward "longer/more
  comprehensive than competitors" → **the Skyscraper Technique is outdated.** [directional]
  → https://www.searchenginejournal.com/googles-information-gain-patent-explained/524464/
- Four ways to add it (Semrush): original research/data, first-hand experience, expert commentary, original media.
- **Originality is measurably protective:** position-1 results are **~8× more likely to be human-written**;
  content with unique data/research/interviews **loses ~60% less traffic** under AI Overviews. [directional]
  → https://www.semrush.com/blog/semrush-ai-overviews-study/

> **Template consequence:** every article must ship with **≥1 information-gain element AI cannot replicate** —
> for a local business that's *original local data*, *first-hand job photos/metrics*, or a *named expert quote*.
> This is the single most important blog differentiator in 2026. (Aligns with `DEEPDIVE-5` Prompt S/V.)

---

## 3. E-E-A-T in practice for a local-business blog

- **Quality Rater Guidelines revised 2025-09-11** — added a chapter on evaluating **AI Overview responses** and
  expanded YMYL. [confirmed] → https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf
- **YMYL authorship is effectively required:** named author with credentials + verifiable bio per article. For
  local YMYL (legal, medical, financial, home-safety) a **named, credentialed author/reviewer is not optional.** [directional]
- **The "Experience" E** = first-hand proof AI can't fake: original photos/screenshots, real before/after metrics,
  "in our 47 Cochrane projects…" specifics.
- **Person schema `sameAs` — concrete threshold: 3+ profiles** (LinkedIn, X, industry associations, publication
  author pages; strongest anchors **Wikidata, Wikipedia, Crunchbase**). More agreeing `sameAs` = higher
  Knowledge-Graph entity confidence. [directional] → https://nav43.com/blog/author-pages-ai-search-visibility (2026-04-24)
- **Entity weight now attaches to the author, not just the domain** — and post-March-2026 core, **Organization +
  Person schema with `sameAs` is the highest-leverage structured-data implementation** for AI entity resolution. [directional]

> **Supersedes/strengthens `DEEPDIVE-5` Prompt T's threshold:** use **≥3 `sameAs`** (not 2), and prioritize a
> Wikidata entry for the named author/organization where credible.

---

## 4. Structure for snippets + AI citations; schema status; freshness

**Answer-first / chunking:**
- **Paragraph snippet sweet spot = 40–60 words (avg featured snippet = 43; 45–55 captures best).** Answer the
  H2's implied question in the **first 100–150 words**, no preamble. [directional] → https://backlinko.com/ai-overviews
- **Chunk = 100–300 words, one idea; keep the stat/quote/link in the SAME chunk as the claim.** Self-contained
  50–150-word chunks get **2.3× more citations**; **120–180-word sections earn ~70% more ChatGPT citations** than
  sub-50-word sections. [directional] → https://searchengineland.com/chunk-cite-clarify-build (2025-07-17)
- **Lists & tables dominate extraction:** listicles ≈ **43.8%** of ChatGPT page-type citations (Ahrefs, 26,283
  URLs) / **21.9%** across platforms (Profound, 680M citations); **tables cited ~2.5–4.2× more** than prose;
  **40–61% of AI Overviews use lists/bullets.** [directional] → https://ahrefs.com/blog/best-lists-research/
- **Top-10 organic is the entry ticket:** **38% of AIO citations** come from the organic top-10 (some studies put
  ~99.5% of AIO sources in the top 10); pages ranking #1 are cited by ChatGPT **43.2%** of the time. [directional]

**Schema status in 2026 (important changes):**
- **FAQ rich results: sunset for normal sites.** Restricted to gov/health since Aug 2023; per multiple secondary
  sources FAQ rich results **stopped appearing ~2026-05-07** (SC report/Rich-Results-Test support dropping mid-2026).
  **BUT keep `FAQPage` schema — it's a top AI-citation format** (Google confirms it's still a valid Schema.org
  type; Q&A structure removes interpretive burden for LLMs). Rule: keep it **only where genuine, visible FAQ
  content exists.** [directional — verify the exact sunset date against Google's changelog]
  → https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/ (2026-05-10)
- **HowTo schema: fully deprecated** (desktop + mobile, since 2023-09-13). Drop it. [confirmed]
- **Still worth keeping:** `Article`/`BlogPosting` (with both `datePublished` + `dateModified`), `BreadcrumbList`,
  `Person`(author), `Organization`. [confirmed]

**Freshness — now a quantified AI-ranking lever (and policed):**
- **89.7% of ChatGPT's top-cited pages were refreshed in 2025; 76.4% updated within the past 30 days** (Ahrefs,
  top 1,000 cited, Sept 2025). [directional] → https://ahrefs.com/blog/chatgpts-most-cited-pages/
- **AI-cited content is 25.7% fresher** than classically-ranked organic; **85% of AIO citations are <2 years old,
  44% from 2025 alone.** [directional]
- **Hard multipliers:** ChatGPT — content updated **<3 months is ~2× as likely cited**; AI Mode — pages updated
  **<2 months ~28% more likely** cited than 2-yr-stale; the "13-week rule" — content **<30 days old earns ~3.2×**
  more AI citations. [directional/volatile]
- **Never just change the date** — Google compares historical versions; artificial date manipulation moved content
  **61–95 positions** in AI rankings. Use both `datePublished` + `dateModified`, keep the URL on refresh. [directional]

---

## 5. Intent mapping, cannibalization & zero-click

- **Anti-cannibalization is intent + anchor discipline:** the same keyword on two URLs is OK only if intents
  differ (informational "How to choose X" vs commercial "Best X"). **Informational anchors → blog spokes;
  transactional anchors → money/location pages.** Every keyword owned by exactly one URL. [directional]
- **Classic local failure mode:** a blog post outranking and starving the service/location page meant to convert.
  Fix order: re-focus the weaker page → consolidate/301 → noindex → re-point internal links.
- **AI Overviews ARE eating informational clicks:** Pew (68,879 searches, Mar 2025) — with an AI summary present,
  users click a traditional result **8% vs 15%** of the time; only **1% click a citation inside the summary**
  (Google disputes this figure). Ahrefs (Dec 2025) — **AIO cuts position-1 CTR by 58%** (up from 34.5% in April). [directional/volatile]
  → https://www.pewresearch.org/short-reads/2025/07/22/ · https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/
- **AIO migrated off pure informational intent:** informational share of AIO triggers fell **91.3% (Jan) → 57.1%
  (Oct) 2025** as AIOs expanded into commercial/transactional; AIO prevalence peaked ~24.6% (Jul) → 15.7% (Nov). [directional]
- **Being cited inside an AIO recovers clicks:** Seer — AIO citation yielded **+35% organic / +91% paid clicks**
  vs not being cited. → the goal is **be the cited source**, not avoid AIO. [directional]

---

## 6. Content types AI cites most (with numbers)

| Type | Citation share / lift | Source |
|---|---|---|
| **"Best X" listicles** | **43.8%** of ChatGPT page-type citations; 21.9% across platforms | Ahrefs; Profound |
| **Articles / editorial** | 16.7% across platforms | Profound |
| **Tables vs prose** | cited **2.5–4.2× more** | serps.io |
| **Original data / proprietary stats** | loses **~60% less traffic** under AIO | Semrush |
| **Pull quotes w/ key stats (2–3 prominent)** | **+37%** LLM citation rate | Ekamoira |
| **Recent stats + Tier-1 (.gov/.edu) citations** | **+89%** selection probability | The Digital Bloom |
| **Comparison pages (3 tables)** | **+25.7%** citations | serps.io |

**Counter-intuitive length fact:** **53.4% of AIO-cited content is UNDER 1,000 words** (16.6% under 350); the
correlation between length and AIO citation ≈ **0.04 (near-zero).** Short pages compete equally — they win on
**structure, not size.** [directional] → https://ahrefs.com/blog/short-vs-long-content-in-ai-overviews/ (2025-12-03)

**Where AI sources concentrate (seed presence here too):** Wikipedia (29.7% of ChatGPT top-1,000), Reddit (46.7%
of Perplexity, 21% of Google AIO), YouTube — **YouTube presence correlates 0.737 with AI visibility, the single
strongest predictor in any 2025–2026 study** (Ahrefs, 75,000 brands). **~67% of ChatGPT's top citations are
off-limits to marketers** (Wikipedia/homepages/app stores) — only ~32% is influenceable. [directional]

---

## 7. What changed in 2025–2026

1. **Helpfulness is core, permanently** — no standalone HCU, no separate recovery path.
2. **AIO crossed into commercial/transactional intent** and roughly **doubled the click penalty** in 8 months.
3. **Strategic signal shifted from comprehensiveness → information gain + novelty.** Skyscraper is dead.
4. **FAQ rich results sunset (~2026); FAQPage schema survives as an AI-citation format. HowTo fully dead.**
5. **Entity/author schema (`sameAs` ≥3) is the highest-leverage structured data;** entity trust attaches to the author.
6. **Freshness became a quantified AI lever** (2× / 3.2× multipliers) — and date-faking is penalized.
7. **Refreshing winners in place beats publishing new** on ROI (~748% vs ~389%; +106–127% traffic from refreshes).

---

## 8. Gold-standard article anatomy (rankable + AI-citable)

A spoke that wins both. Length is a guardrail (~1,200–1,800 words spoke; pillar 3,000–5,000); the **chunk
structure** is what gets cited. *(See the fully worked example in `docs/seo/REFERENCE-ARTICLE-gold-standard.md`.)*

1. **H1** = the conversational question / primary keyword (matches query phrasing).
2. **Answer-first TL;DR** under H1: a **40–60-word** self-contained answer, no preamble (snippet + AIO target).
3. **Visible byline + credentials + "Last updated: {Month Year}"** near the top.
4. **Body = stacked self-contained chunks:** question-format H2 → 40–60-word direct answer in the first 100–150
   words → expand; one idea per 100–300-word chunk; **keep each stat/quote/source inside its own chunk.**
5. **Liberal 5–8-item lists + comparison tables** (highest-extraction formats).
6. **≥1 information-gain element** (original local data, first-hand photos/metrics, named expert quote, mini-study).
7. **Inline Tier-1 citations** (.gov/.edu/industry) + 2–3 prominent pull quotes with key stats.
8. **FAQ section (3–5 genuine, visible Q&As)** + `FAQPage` schema (for AI parsing, not rich results).
9. **Internal links:** UP to pillar (keyword anchor), laterally to 1–3 siblings, DOWN to the relevant
   service/location page **with a transactional anchor** (never the same anchor as the informational target).
10. **Author bio** → author page with `Person` schema (`jobTitle`, `worksFor`, `knowsAbout`, `hasCredential`,
    **≥3 `sameAs`**), `@id`-linked to `Organization`.
11. **Schema stack:** `BlogPosting` (+`dateModified`) + `BreadcrumbList` + `Person`(author) + `FAQPage` (if visible). **Drop `HowTo`.**
12. **Refresh in place** (keep URL, bump `dateModified` with *meaningful* new info-gain) — the <30-day / <3-month
    windows are where the 2×–3.2× AI-citation multipliers live.

**Operating principle:** *Win the organic top-10 with comprehensive, human-authored, entity-backed clusters;
then win the AI citation with answer-first chunks, lists/tables, FAQPage schema, original local information-gain,
and aggressive in-place freshness — while linking informational spokes DOWN to commercial pages with
transactional anchors to avoid cannibalization.*

---

## Sources (2026)
- Google — March 2024 core + spam policies: https://developers.google.com/search/blog/2024/03/core-update-spam-policies · https://blog.google/products/search/google-search-update-march-2024/
- Search Engine Land — 2025 updates in review: https://searchengineland.com/google-algorithm-updates-2025-in-review · topic clusters: https://searchengineland.com/guide/topic-clusters
- SEJ — information gain patent: https://www.searchenginejournal.com/googles-information-gain-patent-explained/524464/ · FAQ rich results dropped: https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/
- Semrush — AI Overviews study: https://www.semrush.com/blog/semrush-ai-overviews-study/
- Ahrefs — internal links: https://ahrefs.com/blog/internal-links-for-seo/ · most-cited pages: https://ahrefs.com/blog/chatgpts-most-cited-pages/ · short-vs-long in AIO: https://ahrefs.com/blog/short-vs-long-content-in-ai-overviews/ · AIO reduce clicks: https://ahrefs.com/blog/ai-overviews-reduce-clicks-update/ · best lists: https://ahrefs.com/blog/best-lists-research/
- Search Engine Land — chunk-cite-clarify-build: https://searchengineland.com/chunk-cite-clarify-build
- Growth Memo (Indig) — measuring topical authority: https://www.growth-memo.com/p/how-to-measure-topical-authority
- Pew Research — AI-summary click study: https://www.pewresearch.org/short-reads/2025/07/22/
- QRG (2025-09-11): https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf
- nav43 — author pages & AI visibility: https://nav43.com/blog/author-pages-ai-search-visibility
- Digital Applied — scaled content abuse: https://www.digitalapplied.com/blog/scaled-content-abuse-google-march-update-ai-pages-decimated
