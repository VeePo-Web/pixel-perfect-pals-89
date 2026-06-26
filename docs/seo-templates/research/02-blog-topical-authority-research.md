# Research Brief 02 — World-Class Business Blog: Topical Authority + AI Citation (2025–2026)

**Scope:** A service/local business blog engineered to rank #1 in Google **and** get cited by AI
search (Google AI Overviews & AI Mode, ChatGPT Search, Perplexity, Claude, Gemini) — maximizing
organic traffic and clicks — built as a reusable template.

**Research basis:** ~30 live searches + ~25 primary-source fetches (June 2026). Every major claim
carries a source; full list in `research/sources.md`. Quantified third-party study figures are
*directional 2025–2026 findings*, not fixed constants (AI citation behavior is volatile quarter-to-
quarter — see caveat at the end).

---

## 0. The ten headline shifts (read this first)

1. **Topical completeness beats individual article polish.** ~20 interconnected articles on a subject
   outrank one superior 5,000-word guide.
2. **Information gain is the bar.** "Another comprehensive guide" with no novelty scores ≈ 0 — AI
   synthesizes comprehensiveness for free. (Google's information-gain patent was *granted June 2024*.)
3. **Brand mentions beat backlinks for AI visibility** (~3× the correlation: 0.664 vs 0.218, Ahrefs
   75k-brand study). Being *talked about* is the new moat.
4. **The Princeton GEO levers are quantified:** quotations **+41%**, statistics **+34%**, fluency
   **+30%**, cited sources **+29%** AI visibility; **keyword stuffing −8%**.
5. **Top-10 ranking no longer guarantees AI visibility.** Only ~38% of AI Overview citations come from
   the top 10 (down from 76% mid-2025); ~12% of ChatGPT/Gemini/Copilot citations rank top-10.
6. **Most AI crawlers do NOT execute JavaScript** (GPTBot, ClaudeBot, PerplexityBot, OAI-SearchBot) —
   a client-rendered SPA blog is **invisible** to AI search. **Static/SSR is mandatory.**
7. **Google retired FAQ rich results entirely (May 7, 2026)** and HowTo rich results (2023). Keep FAQ
   schema for AI/parsing — not for a visual Google SERP payoff.
8. **Long-tail/question/low-volume keywords are the doorway:** 82% of AI Overviews fire on keywords
   with <1,000 monthly searches; ~35% of AIO keywords are questions.
9. **Freshness is heavily weighted:** ~50% of AI citations are content <13 weeks old; <30-day content
   earns ~3.2× more citations.
10. **AI-search visitors convert ~4.4× higher** than traditional organic — fewer clicks, far higher
    value. Being *in* the answer (cited/mentioned) is the objective.

---

## 1. Topical authority architecture

### 1.1 Pillar-cluster (hub-and-spoke) — the validated structure
The **June 2025 core update** leaned further into topical authority over raw domain metrics.

| Component | Word count | Job |
|---|---|---|
| **Pillar / Hub** | 3,000–5,000 | Cover the topic broadly; link to every cluster; be the canonical authority |
| **Cluster / Spoke** | 1,500–2,500 | Comprehensively answer ONE specific question/subtopic (one long-tail intent) |

- **Clusters per pillar:** ideal **8–15**; min 5; max ~20–25. One macro context per page.
- Clustered content reportedly drives ~30% more organic traffic and holds rankings ~2.5× longer than
  standalone posts.
- **Build the topical map FIRST, then the network** (Koray Gübür semantic-SEO: topical authority =
  Topical Coverage + Historical Data; build a "Semantic Content Network" — your own mini-Wikipedia on
  the subject). Never write articles one-off.

### 1.2 Internal linking — concrete rules
**DO:**
- Every cluster links **back to its pillar** with keyword-rich anchor text.
- Each cluster links to **1–3 adjacent clusters** (lateral linking).
- **3–5 contextual internal links per article** (or 2–5 per 1,000 words) baseline.
- **Descriptive, varied anchor text** describing the destination.
- Place important links in the **top ~30%** of the page; keep key pages **≤ 3 clicks from home**.
- Fix **orphan pages** (zero inbound internal links won't earn ranking value).

**DON'T:** generic anchors ("click here"); identical exact-match anchors repeated to one destination;
orphaned articles; linking a cluster *out* to a different cluster's pillar (leaks authority out).

### 1.3 Information gain — the differentiation mandate
Information gain = how much **new** info a page adds beyond what the user has already seen (measured
via semantic embeddings, not volume). Unedited AI content scores ≈ 0.
- **Add it via:** original research / proprietary data, first-hand experience, expert
  commentary/quotes, original images/video (not stock), unique angles.
- **Workflow:** analyze what ranks → match intent → **add 2–3 differentiating elements**.

> **The service/local-business moat:** real job photos, named local project references, actual pricing
> ranges, local code/permit specifics, named customer outcomes. These are exactly what AI and
> competitors *cannot* synthesize — and they satisfy information-gain, E-E-A-T "Experience," and the
> GEO citation levers simultaneously.

---

## 2. Helpful Content / people-first reality (post-2024 → 2026)

- **March 2024 core update** folded Helpful Content into core ranking; goal: cut "unhelpful,
  unoriginal content" ~45%. **2025:** 3 core updates + 1 spam update (August 2025 spam update ran
  Aug 26–Sep 22). **March 2026 core update amplified E-E-A-T**, rewarding first-hand experience over
  comprehensive-but-impersonal content.

**CRUSHED:** thin tool/calculator wrappers; scraped/rehashed data with ads; recycled filler;
**ads-to-content > ~25%**; affiliate stacks over thin content; **no named authors/bios/E-E-A-T**;
anything produced *at scale to rank* (human or AI).
**WON:** sites with **real products/services** (structural advantage for a business blog);
authenticity, originality, thought leadership; fresher/more robust content.

### Scaled content abuse — Google's exact language
> *"Scaled content abuse is when many pages are generated for the primary purpose of manipulating
> search rankings and not helping users"* — including *"using generative AI tools … to generate many
> pages without adding value."* Applies **"whether automation or humans are involved."** It's about
> **intent and value, not the tool.**

### Using AI safely (Google's position)
AI is allowed unless used primarily to manipulate rankings. Checklist: ✅ human review + editing;
✅ adds information gain; ✅ demonstrates real **Experience** (hardest "E" to fake); ✅ serves a real
need; ✅ disclose substantial automation. ❌ don't use "extensive automation to produce content on many
topics."

### Anti-patterns that demote blogs (exact definitions)
- **Site reputation abuse / parasite SEO:** third-party content on a host site mainly to exploit the
  host's ranking signals. Penalized Forbes/WSJ/Time/CNN (Nov 2024); **no level of publisher
  involvement mitigates it** (QRG, Jan 2025). *Don't rent subfolders or place content on unrelated
  high-authority hosts.*
- **Doorway abuse:** sites/pages created to rank for similar queries funneling to one destination —
  **directly relevant to local SEO**: near-duplicate find-and-replace city pages are doorway abuse.
- **Expired domain abuse.**

---

## 3. Content structure for snippets + AI extraction

### 3.1 The answer-first / extractable-chunk pattern (highest-leverage)
Wins featured snippets, People Also Ask, **and** AI citations at once:
1. **Question-format H2/H3** (exact-match to how users ask).
2. **Direct ~40–60-word answer immediately below**, self-contained (makes sense lifted out of context).
3. Then expand with detail, proof, examples.

### 3.2 Featured snippet specs (data-backed)
- **Paragraph ≈ 70%** of snippets → 40–60-word answer after a question heading.
- **List ≈ 19%** → make lists **8+ items** (Google truncates with "More items," signaling depth).
- **Table ≈ 6%** → real HTML `<table>` with clear headers.
- **Eligibility:** snippet sources almost always rank top 10 (highest probability positions 2–8).

### 3.3 Formats AI engines cite most
- **Listicles ≈ 21.9% of all AI citations (~63% of LLM-specific citations)** — the single most-cited
  format. Front-load each item with a clean, self-contained summary sentence.
- **Comparison tables** = #2; pages with **3+ tables earn ~+25.7% citations.**
- **FAQ blocks with FAQPage schema ≈ 3.2× more likely** to appear in AI Overviews.

### 3.4 The snippet ↔ AI Overview payoff
Featured snippets are declining as a standalone feature (AIOs absorb them), **but pages that won
snippets are cited in AI Overviews at ~2× the rate** of non-snippet pages. Snippet-style passages are
now **dual-purpose** (classic SERP + AI).

---

## 4. GEO / AEO — getting cited by AI search

### 4.1 Princeton GEO study — per-tactic visibility lifts (relative)
| Tactic | Lift |
|---|---|
| **Quotation Addition** (quote experts/sources) | **+41%** |
| **Statistics Addition** (quantitative data) | **+34%** |
| **Fluency Optimization** (clean, readable prose) | **+30%** |
| **Cite Sources** (citations on claims) | **+29%** |
| Authoritative (confident) language | +13–19% |
| **Keyword Stuffing** | **−8% (HURTS)** |

**The stack:** lead each key claim with a **statistic + a cited source + an expert quotation, written
fluently** — hits the three strongest levers at once. (Tactics are domain-specific; use all three.)

### 4.2 Brand mentions / entity authority > backlinks (Ahrefs, 75k brands)
Correlation with AI visibility: **YouTube mentions 0.737 · branded web mentions 0.664 · branded
anchors 0.511 · Domain Rating 0.266 · backlinks ~0.20 (weakest).** Top-quartile brands by web-mention
volume average **169 AI Overview mentions vs 14** for the next quartile (>10×).
**Action:** earn off-site presence — guest articles, podcasts, YouTube, PR, "best-of" listicle
inclusion, genuine industry-directory/forum presence.

### 4.3 Which sources AI engines cite
- **ChatGPT** → encyclopedic: Wikipedia ≈ 47.9% of leading-source citations; then Reddit, Forbes.
- **Perplexity** → community/UGC-heavy: Reddit, YouTube.
- **Google AI Overviews** → balanced: Reddit, YouTube, Quora.
- Aggregate (150k+ citations): Reddit ~40%, Wikipedia ~26%, YouTube ~23%.
> **⚠️ Volatility caveat:** AI citation sources swing hard quarter-to-quarter (Reddit AIO citations
> once dropped ~85% in one window while editorial sites rose). The **lower-variance bet is durable
> earned editorial coverage + original first-party data/statistics**, not chasing Reddit.

### 4.4 Fan-out & ranking reality
- Pages ranking for AI Overview **fan-out sub-queries are ~+161% more likely to be cited** than pages
  ranking only for the head query — cover the *full question cluster*.
- **97% of AIOs cite ≥ 1 top-20 organic source (avg ~5 URLs)** — ranking is the floor — but ~62% of
  cited links don't rank top-10. Authority + format + freshness can override raw rank.

### 4.5 AEO economics
- **AI-search visitors convert ~4.4× higher** than traditional organic (pre-qualified).
- ~13% of Google searches trigger AI Overviews (Mar 2025, 10M keywords).
- **Click-loss (Pew):** with an AI summary present, users click a result in 8% of searches vs 15%
  without; clicks *inside* the summary = 1%. **The citation/mention itself is the objective.**

---

## 5. Article schema (current Google guidance + 2026 changes)

### 5.1 BlogPosting / Article (recommended properties; none strictly required)
`headline`; `image` (multiple — 16:9 + 4:3 + 1:1, ≥ 50K px); `datePublished` + `dateModified` (ISO
8601 **with timezone**); `author` (Person — list every visible author separately, match on-page
bylines); `publisher` (Organization with `logo`). Use `publisher` for the org, **not** `author.name`.

### 5.2 FAQPage — the big 2026 change
Pre-2023 broad rich results → Aug 2023 restricted to gov/health → **May 7, 2026: FAQ rich results
fully retired from Google Search.** Verdict: FAQPage is still a valid Schema.org type, Google still
*parses* it, and it stays valuable for **Bing, Perplexity, and AI/RAG crawlers (~3.2× AIO lift)** —
just **don't design copy around a Google rich-result payoff.**

### 5.3 HowTo
**Deprecated (Aug 2023)** — no rich results; minimal benefit now.

### 5.4 BreadcrumbList
Still fully supported and recommended — include on every article.

### 5.5 Author / Person schema for E-E-A-T
Give every author a dedicated bio page (wrap in `ProfilePage`). On the Person:
- `name` + `url` (canonical author profile).
- **`sameAs`** (LinkedIn, ORCID, Wikipedia, Wikidata QID) — *most important after name*; disambiguates
  the real author for Google + AI.
- `jobTitle` + `worksFor`, `knowsAbout` (explicit topical expertise), `alumniOf`, `image`, `description`.

---

## 6. E-E-A-T & author authority in 2026
- **Trust** is the most important pillar; **Experience** is the AI-era differentiator (AI can't have
  first-hand experience). The **March 2026 core update rewards first-hand experience** over impersonal
  comprehensiveness. **YMYL expanded (Sept 2025)** to government/elections/civic trust.
- AI content can satisfy E-E-A-T **if** expert-reviewed, enriched with original data, attributed to a
  **named accountable author**, and intent-aligned.
- **Who/How/Why:** name the author with a real bio (Who); disclose substantial automation (How);
  motivation must be to help readers, not to rank (Why).

---

## 7. Keyword / intent strategy
- **Informational → blog/hub articles, FAQs, how-tos.** **Commercial investigation → blog** (comparison
  posts, "best X," buying guides, review roundups). **Transactional → service/product/landing pages,
  NEVER the blog.** (The named critical error: ranking a blog post for a transactional keyword.)
- **Long-tail / question / low-volume keywords are MORE valuable now:** 57% of AIOs appear for
  long-tail; **82% for keywords with < 1,000 monthly searches**; ~35% of AIO keywords are questions.
- **People Also Ask** appears on > 80% of queries and ~90% of AIO SERPs — answer with exact-question
  H2/H3 + 40–80-word direct answers; post-June-2025 AI filler no longer wins PAA.
- **Query fan-out (AI Mode)** splits one query into ~8–12 parallel sub-queries via Gemini, then
  synthesizes — it does **not** simply retrieve the head query's top results. Build **exhaustive
  clusters that pre-answer the predictable fan-out sub-queries**; favor longer, conversational coverage.

---

## 8. Technical for AI crawlers & ranking

### 8.1 Static/SSR rendering — the #1 technical mandate
**Major AI crawlers fetch but do NOT execute JavaScript** (Vercel × Merj: 500M+ GPTBot fetches = zero
JS execution; corroborated by Cloudflare/Dark Visitors). GPTBot, ClaudeBot, OAI-SearchBot,
ChatGPT-User, PerplexityBot, Meta-ExternalAgent execute **zero** JS. Exceptions: **Google-Extended
(Gemini) and AppleBot render JS.** ~69% of AI crawlers can't run JS.
> **Mandate:** server-/static-render all critical content — body copy, metadata, **JSON-LD schema**,
> nav, internal links — in the **initial HTML response**. A CSR-only React/Vite blog arrives empty to
> ChatGPT/Claude/Perplexity and is invisible to AI search. → validates a static-first/SSG/prerender
> architecture (see `prompts/04`).

### 8.2 robots.txt — AI crawler allow rules (must-allow to be cited)
`OAI-SearchBot`, `ChatGPT-User` (OpenAI); `PerplexityBot` (Perplexity); `ClaudeBot`,
`Claude-SearchBot` (Anthropic); `Google-Extended` (Gemini; renders JS); `Bingbot` (Search + Copilot);
`Applebot-Extended` (Apple). OpenAI/Anthropic/Google/Apple/Perplexity state they respect robots.txt;
CCBot, Bytespider (ignores Disallow), Diffbot do not reliably.

### 8.3 llms.txt — adoption reality (be honest)
**No major provider confirms consuming `/llms.txt` at inference** (Google's Mueller compared it to
meta-keywords; GPTBot logs show it isn't requested). **Treat as optional/experimental — low cost, no
proven ROI.** Not a substitute for static HTML + schema.

### 8.4 Core Web Vitals (ranking signal)
**INP replaced FID (Mar 12, 2024).** 75th-pct mobile thresholds: **LCP ≤ 2.5s · INP ≤ 200ms ·
CLS < 0.1.** Page-experience ranking signal.

### 8.5 Sitemaps + link equity
Sitemap aids discovery; internal links assign importance/flow PageRank — complementary, not
substitutes. Submit `sitemap.xml`, keep `<lastmod>` accurate, reference it in robots.txt.

---

## 9. Freshness
- **`dateModified` is the most explicit AI-parsable freshness signal — bump it ONLY on genuine content
  changes** (faking it sitewide gets the domain's date-weight discounted).
- ~50% of AI citations come from content < 13 weeks old; citation likelihood peaks in the first 3
  months and collapses after ~6; > 1-year content ≈ 5% relative citation rate; **< 30-day content
  earns ~3.2× more citations.**
- **Refresh cadence:** comparison/"best-of" → **monthly**; how-tos/year-specific → **quarterly**;
  evergreen explainers → **every 3–6 months**; news → 30–60-day lifespan. Show a visible "Last
  updated" date.

---

## 10. Consolidated DO / DON'T (build-template checklist)

**DO**
- Map the topic first; build pillar (3,000–5,000w) + **8–15 clusters** (1,500–2,500w); one macro
  context per page.
- Open each section with a **question H2 + ~40–60-word direct answer**; use 8+ item lists and real
  HTML tables.
- **Stack the GEO levers:** statistic + cited source + expert quotation, written fluently, in every
  key section.
- Wire **3–5 contextual internal links/article** (cluster→pillar keyword anchor + 1–3 lateral), zero
  orphans, key pages ≤ 3 clicks deep; **link down into the relevant Areas matrix page** when
  geo-relevant.
- **Static/SSR-render** every article with body + JSON-LD + links in the initial HTML.
- Add **BlogPosting + BreadcrumbList + Person author schema** (with `sameAs`, `knowsAbout`); keep
  **FAQPage schema for AI** (not Google rich results).
- Inject **information gain**: original data, real local/project specifics, first-hand experience,
  original media.
- Show **named expert authors with bio pages**; visible "Last updated"; `dateModified` on genuine edits.
- **robots.txt allow** OAI-SearchBot, PerplexityBot, ClaudeBot/Claude-SearchBot, Google-Extended,
  Bingbot, Applebot-Extended.
- Build **off-site brand mentions** (strongest AI-visibility signal); cover **fan-out sub-queries**;
  chase **long-tail/question/low-volume** keywords.
- Hit **LCP ≤ 2.5s / INP ≤ 200ms / CLS < 0.1**; refresh on a real cadence (quarterly baseline, monthly
  for priority/AI pages).

**DON'T**
- Publish "another comprehensive guide" with no novelty (information gain ≈ 0).
- Mass-produce pages to rank (violation regardless of human/AI); ads-to-content > ~25%; affiliate
  stacks over thin content.
- **Keyword-stuff** (−8% AI visibility); generic/identical-exact-match anchors; orphans.
- Put **transactional keywords on blog posts** (belong on service/conversion pages).
- Build near-duplicate find-and-replace location pages (doorway abuse) or host third-party content to
  exploit your domain (site reputation abuse).
- Ship a **CSR-only SPA blog** (invisible to AI) or rely on `llms.txt` for ROI.
- Assume top-10 ranking = AI visibility (only ~38% of AIO citations are top-10).
- Bump `dateModified` without real edits (whole-domain freshness penalty).

---

## Per-article ship gate (distilled — see `reference/qa-ship-gates.md` GATE C)
- [ ] In a pillar cluster; pillar vs spoke known; single primary keyword (no cannibalization);
      **informational/commercial-investigation intent only**.
- [ ] **≥ 1 information-gain element** (first-party stat / real case / expert quote / original data).
- [ ] Answer-first: question H2s, 40–60-word answers, self-contained chunks; 8+ item lists; real tables.
- [ ] **GEO stack** present in key sections (statistic + cited source + expert quote, fluent prose).
- [ ] ≥ 3 internal links (1 pillar, 1–3 lateral), descriptive anchors; down-link to Areas where geo-relevant.
- [ ] `BlogPosting` + `Person`(`sameAs`,`knowsAbout`) + `BreadcrumbList` (+ FAQPage for AI) — **static HTML**.
- [ ] Named real author with bio/`ProfilePage`; first-hand experience visible.
- [ ] `datePublished` + `dateModified` + visible "Last updated"; in refresh queue.
- [ ] CWV green; rendered server-side; verified HTML + JSON-LD present with JS disabled.

---

### Top 5 takeaways
1. **Cluster before article** — topical map first; pillar + 8–15 spokes; completeness > brilliance.
2. **Information gain is the gate** — real first-party specifics are the moat that satisfies Helpful
   Content, E-E-A-T "Experience," and the GEO levers at once.
3. **Answer-first chunks + the GEO stack** (statistic + cited source + expert quote, fluent) win
   snippets, PAA, and AI citation together.
4. **Brand mentions > backlinks** for AI visibility — invest in earned off-site coverage.
5. **Static/SSR or invisible to AI** — and wire the blog *down* into the gated Areas matrix.

*Sources: see `research/sources.md`.*
