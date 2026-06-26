# Research Brief 03 — AI Search (GEO / AEO) Playbook for Areas + Blog (2025–2026)

**Scope:** The cross-cutting strategy for getting **cited and quoted** by AI search engines — Google
AI Overviews & AI Mode, ChatGPT (Search), Perplexity, Claude, Gemini, Bing Copilot — applied to both
the Areas-We-Serve matrix and the Blog. This is the layer that earns the *separate* AI-visibility win
on top of classic rankings.

---

## 1. Why AI search is a separate game (the numbers)

- **~80% of LLM-cited sources do not rank in Google's top 100.** AI visibility ≠ rankings — you must
  engineer for both, deliberately.
- **AI citations convert ~5×** a normal organic click (≈14% vs ≈3%) — the click that does come through
  is far more valuable.
- **AI-Overview queries are ~83% zero-click** — being *inside* the answer is the win; the citation is
  the brand impression and the high-intent click.
- **AI Overviews fire heavily on informational/advisory queries (50–92%)** and rarely on raw "service
  + city / near me" (~7–15%). → The **blog/FAQ informational layer** is your AI-Overview capture
  surface; it must link **down** into the transactional Areas pages.
- **Reddit and third-party sources are disproportionately cited** (≈21% of Google AI Overview
  citations; ≈46% of Perplexity). Off-site presence and brand mentions matter.

---

## 2. The two hard technical preconditions (non-negotiable)

### 2a. Static HTML — AI crawlers do not run JavaScript
- **GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot fetch raw HTML
  only.** They don't wait for client rendering and don't retry. A client-only SPA is **invisible**.
- **Googlebot** renders JS (headless Chromium) and **Applebot** renders fully — but the LLM crawlers
  driving the major assistants do not.
- **Requirement:** content **and** every JSON-LD block must be in the **initial server response**
  (SSG / SSR / prerender). **Verify** by fetching a built URL with JS disabled.

### 2b. Crawler access files
**`robots.txt` — explicitly `Allow` the AI crawlers you want citing you** (illustrative):
```
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Amazonbot
Allow: /
User-agent: cohere-ai
Allow: /

Sitemap: https://{domain}/sitemap.xml
```
**`llms.txt`** — include it (cheap insurance), but **set expectations**: as of 2026, adoption is
largely theoretical and log studies show almost **0** AI bots actually requesting `/llms.txt`. It is
**not** a substitute for clean static HTML + schema. Structure: business summary → key pages →
services → service areas → key facts.

---

## 3. The on-page GEO mechanics (apply to every page, both systems)

1. **Front-load the answer.** First ~200 words / first 2 sentences directly answer the page's core
   question, with a **specific/quantitative** statement (a real number/price/range). Quantitative
   statements are cited at a higher rate than qualitative ones.
2. **Self-contained extractable chunks (~130–170 words).** Each FAQ answer / key section must make
   sense lifted out of the page — define terms, name the subject, don't depend on surrounding context.
   Passage-level **semantic completeness** is the strongest on-page citation predictor.
3. **Question-shaped headings.** H2/H3 phrased as the exact user/AI query; direct 40–60-word answer
   immediately below (wins featured snippets + People Also Ask simultaneously).
4. **Encyclopedic, objective tone** in extractable sections — drop "I think / we believe"; declarative
   sentences lower model perplexity and raise citation odds. (Keep brand voice in intros/CTAs.)
5. **Cite sources + quote named experts** — reads as research-backed; raises citation rate.
6. **Original data / statistics** — the highest-leverage asset: it becomes the thing AI quotes *and*
   the thing others cite, generating off-site brand mentions.
7. **Proper heading hierarchy + clean semantic HTML** (`main`, `article`, `section`, `time`,
   `figure/figcaption`) — deterministic structure for parsers.
8. **Freshness** — `dateModified` + visible "Last updated"; AI prefers recently updated content.

---

## 4. Structured data is the machine-readable native layer

- **Areas pages:** `LocalBusiness`(specific subtype) + `Service`(per service, with `areaServed`
  GeoCircle/GeoShape) + `FAQPage` + `BreadcrumbList` + `WebPage`/`Organization`.
- **Blog pages:** `BlogPosting` + `Person`(author + `sameAs`) + `FAQPage` + `BreadcrumbList`.
- **Sitewide:** one stable `Organization` (with `sameAs` to GBP/Maps + socials) + `WebSite`, linked by
  `@id` so every page references one coherent entity graph.
- **Rule:** schema must match visible content (FAQ Q&A identical to rendered text); **no self-serving
  `aggregateRating`/`review`** on your own business.

---

## 5. Entity Trust & off-site authority (the consensus layer)

AI assistants verify a business/brand via **consensus across the whole web**, not one page:
- **NAP byte-identical** across site, GBP, Yelp, YellowPages, directories — conflicting data = **no
  citation**.
- **`sameAs`** links connecting your Organization/Person entities to GBP, Maps, LinkedIn, socials.
- **Brand mentions** on third-party authoritative sources, industry sites, and (where appropriate)
  Reddit/forums — these raise inclusion odds across every engine.
- **Consistent author entities** across bylines build E-E-A-T for both Google and AI.

---

## 6. Platform-by-platform nuance (where to lean)

| Engine | Rewards most | Practical lever |
|---|---|---|
| **Google AI Overviews / AI Mode** | Traditional authority + schema + freshness | Win the informational cluster; clean schema; strong internal links |
| **ChatGPT (Search)** | Domain authority + **off-site brand mentions** | Earn third-party mentions; consistent entity; static HTML |
| **Perplexity** | Niche expert content + **Reddit** + citations | Deep niche pages; original data; forum/community presence |
| **Bing Copilot** | Structured data + multimedia | Rich schema; images/video with transcripts |
| **Claude / Gemini** | Clean structure + authoritative, well-cited content | Self-contained chunks; cited sources; static HTML |

---

## 7. How the two systems combine for AI (the architecture)

```
INFORMATIONAL LAYER (Blog)                TRANSACTIONAL LAYER (Areas matrix)
"how much does {service} cost in {city}"   "{service} in {city}"
"how to choose a {trade} in {region}"      "{service} in {community}"
   ↓ fires AI Overviews 50–92%                ↓ wins local pack + commercial clicks
   answer-first + original data                LocalBusiness + Service + FAQ schema
   cited by AI  ──links DOWN──▶  funnels intent into the gated, unique matrix page
```
- The **blog** is the AI-Overview/citation net (informational intent).
- The **Areas matrix** is the conversion surface (transactional intent), protected by the uniqueness
  gate so it never becomes doorway spam.
- The **intent bridge** (blog posts declare `about.{region,community}`; Areas pages surface relevant
  guides) wires them together for both users and crawlers.

---

## 8. Measurement (you can't improve what you don't track)

- **Track AI visibility separately** from rankings: monitor brand/citation appearance in AI Overviews,
  ChatGPT, Perplexity (manual prompt panels or a GEO tracking tool).
- **Server-log AI crawler hits** (GPTBot/ClaudeBot/PerplexityBot user-agents) to confirm they're
  fetching your static HTML.
- **Search Console** for snippet/PAA wins and queries ranking 11–30 (new spoke opportunities).
- **GBP insights + local-grid tools** (e.g., Local Falcon) for proximity/pack performance.
- The **2026 Whitespark survey** now tracks AI-search-visibility factors as a first-class local
  dimension — treat AI visibility as a KPI, not a curiosity.

---

## 9. AI SEO anti-patterns (do-not list)

1. Client-only rendering — invisible to LLM crawlers.
2. Blocking the AI crawlers you *want* citations from (check robots.txt doesn't disallow them).
3. Treating `llms.txt` as a substitute for static HTML + schema.
4. Conflicting NAP / entity data across the web → suppresses citation.
5. Vague, qualitative, opinion-laden copy in the extractable sections (high perplexity).
6. No original data / no information gain → nothing for AI to *uniquely* quote.
7. Schema that doesn't match visible content; self-serving review markup.
8. Stale content with no `dateModified` refresh.
9. Assuming local-pack ranking = AI-Overview inclusion (they surface different businesses).

---

### Top 5 AI-SEO takeaways
1. **Static HTML + schema in the initial response** — or you don't exist to AI.
2. **Front-load specific, quantitative answers in self-contained chunks** — that's what gets quoted.
3. **Original data + cited experts** — the highest-leverage citation assets.
4. **Entity Trust (consistent NAP + `sameAs` + brand mentions)** governs whether you're cited at all.
5. **Blog captures AI Overviews and funnels intent down into the gated Areas matrix** — one architecture, both wins.

*Sources: see `research/sources.md`.*
