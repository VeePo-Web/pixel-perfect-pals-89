# Research Brief 01 — World-Class "Areas We Serve" / Programmatic Local Page Architecture (2025–2026)

**Scope:** Maximum Google rankings **and** AI-search citation for a multi-location service business.
**Synthesized from:** Google Search Central, Sterling Sky (Joy Hawkins), RicketyRoo, BrightLocal,
Whitespark, Search Engine Land, Vercel, and multiple 2025–2026 GEO/AEO studies. Citations inline and
in `sources.md`.

---

## 0. The one governing principle (everything follows from this)

After Google's **March 2024 core + spam update** (which introduced the **scaled content abuse**
policy) and the subsequent **2025 spam updates** (Feb, June, August 2025), the dividing line is **no
longer "how content is made" but "does each page add genuine, unique, real-world value to a user in
that locale."**

> Google's scaled content abuse policy targets *"generating many pages primarily to manipulate search
> rankings, with little or no value added for users."* It explicitly does **not** matter whether
> pages are AI-generated, programmatic, or human-written. **Volume is not the problem; volume without
> proportional per-page value is.**

The critical 2026 architecture change: **the quality signal from your weakest pages now drags down
domain-level authority** rather than merely being filtered. A few hundred thin geo-pages can suppress
your entire domain. This makes a **publish gate** (only generate pages that clear a uniqueness bar)
non-negotiable — it is the single most important design decision in the template.

---

## 1. URL & architecture

### Rules
- **One dedicated, indexable, self-canonical URL per (service × location) intersection.** Never one
  "Areas We Serve" page trying to rank for all locations. Never query parameters (`?city=`) — those
  aren't crawled as separate pages.
- **Hub-and-spoke hierarchy** (the consensus structure):
  ```
  /areas-we-serve/                              ← index/hub (browseable, links to region/city hubs)
  /areas-we-serve/{region}/                     ← region hub (province/state or metro cluster)
  /areas-we-serve/{region}/{community}/         ← community/city spoke (the primary local target)
  ```
  or the service-led matrix variant when you have multiple distinct services:
  ```
  /services/{service}/{city}/                   ← the (service × city) intersection page
  ```
- **Slug pattern:** lowercase, hyphenated, descriptive; contains both the service and the place;
  ≤ 3 levels deep. Clean URLs, no parameters.
- **Do not build a page for every conceivable city.** Sterling Sky's explicit guidance: target
  **revenue-generating cities first**, build **state/province-level pages too** (people search
  "service in {state}" more than expected), and build **one page per distinct service** before
  fanning out geographically.
- **Build the city hub fully before its neighbourhood spokes.** Spokes are leaves with no authority
  unless the hub is strong and linking to them.

### Internal-link pyramid (authority flows down, breadcrumbs flow up)
- Homepage → `/areas-we-serve/` index + top 3–5 priority region/city hubs (nav/footer).
- Primary service pages → `/areas-we-serve/` index.
- Index → all region/city hubs (but **not** every neighbourhood spoke — too many links dilutes).
- Region/city hub → all its spokes **and** 3–5 adjacent hubs ("Nearby areas," cap at 5).
- Spoke → its hub (breadcrumb), 3–5 sibling spokes.
- **No orphan pages.** *"Never hide service-area pages from users and Googlebot because they aren't
  linked anywhere"* (Sterling Sky). Don't bury them behind an uncrawlable JS store-locator.
- Anchor text always descriptive ("our {CITY} {SERVICE} services"), never "click here," and don't
  reuse the identical anchor from many pages to one destination (over-optimization signal).

---

## 2. The thin-content / scaled-content-abuse line — *the most important section*

### What separates pages that RANK from pages that get FILTERED / drag the domain down

**Doorway / spam red flags (RicketyRoo + Google policy):**
- Dozens of pages with identical boilerplate, only the city name swapped (find-and-replace pages).
- Keyword-stuffed copy written for the algorithm, not the user.
- Pages orphaned from navigation with no internal-link context.
- Claims of local service with **no supporting evidence** (no address, no team, no local proof).
- Zero actionable value — a visitor can't tell who you are or what to do next.
- Multiple pages/domains targeting regions that all **funnel to one destination** (Google's literal
  doorway definition).

**Legitimate-page traits (the safe side):**
- Localized, original content per area (testimonials, regional photos, local examples, local conditions).
- Transparent about service-area vs. physical-office distinction.
- Integrated into navigation with contextual internal links.
- Real conversion/trust elements and CTAs.
- Pages actually earning impressions/clicks with positive dwell time.

> **The fundamental test (RicketyRoo):** *"Does the page provide legitimate, real-world value to
> users in that locale, or does it exist primarily to capture search traffic through duplication?"*
> Corollary (Search Engine Land): **each location page should read like a standalone homepage
> tailored to that area**, not a template with the city swapped.

### The build gate — concrete uniqueness threshold
- Industry consensus: make **~40–60% of each page genuinely unique, location-specific content** (the
  "70% programmatic / 30% manual" rule — automate service lists/pricing/company info, hand-craft the
  local 30%).
- **Operational publish gate — require ≥ 4 of these 8 local-specificity signals, or do not generate
  the page:**
  1. Local landmark / neighbourhood / street / school / subdivision named.
  2. Local condition note relevant to the service (e.g., "{CITY}'s freeze-thaw cycles stress {SERVICE}";
     "humid Nashville summers and HVAC short-cycling"; "historic Midtown Memphis homes with
     galvanized supply lines").
  3. Local project reference (named area/subdivision/project type you've completed there).
  4. Local code / permit / bylaw note for that jurisdiction.
  5. Local community / event reference.
  6. Proximity / crew-base / supplier differentiator (why you specifically serve this town).
  7. **Named local testimonial** (first name + neighbourhood is enough) — Sterling Sky calls
     city-specific reviews one of the strongest differentiators.
  8. Community-specific FAQ (a question only this town would ask — e.g., a local permit threshold).
- **First-party data is the strongest moat** (Sterling Sky): real pricing from sales data,
  cost ranges, case studies with photos, service-specific reviews, staff bios with credentials. This
  is the content competitors and AI cannot fabricate.
- **The find-and-replace test:** delete the city name from the page. If nothing locally specific
  remains, the page fails — do not publish.

> Nuance: a Sterling Sky study found *similar* content can still increase traffic — but the standing
> recommendation is to make pages **as unique as possible**, because post-2024/2026 the downside risk
> (domain-level drag) now outweighs the upside.

---

## 3. On-page (titles, headings, length, signals, NAP)

### Title tag
- **Formula:** `[Service] in [City], [State/Province] | [Brand]` — keep **≤ 60 chars** to avoid
  truncation; service + city present, keyword near the front.
- **No two pages share a title — ever.**

### Meta description
- **150–160 chars**, written as a marketing pitch (not a keyword list); include the city, a specific
  claim, and a **CTA + phone** (phone in the description drives measurable SERP calls).
- Formula: `{Service} in {City} and surrounding areas. {local hook}. {proof}. {CTA + phone}.`

### H1 / headings
- **One H1:** `[Service] in [City], [State/Province]` so the visitor instantly knows they're in the
  right place.
- **Sequential, logical heading hierarchy** — H2/H3, no skipped levels. (This matters doubly for AI:
  a proper heading hierarchy materially increases citation probability.)
- Recommended H2 sections: local context · services in this area · local proof · service-area map ·
  local FAQ · nearby areas · contact CTA.

### Content & length
- No fixed word count, but each page needs real depth: complete service menu, project showcase with
  **local imagery** (filename `service-city-neighbourhood.webp`), city-specific reviews,
  location-specific offers, staff bios, local awards/PR, FAQs.
- **Video ranks** — Sterling Sky cites a service video ranking in Google video search and feeding the
  service-area page.
- **Don't sacrifice overall site quality to publish these.** Don't set-and-forget — audit regularly
  so contact info, hours, reviews, and offers stay accurate.

### NAP consistency (infrastructure, not decoration)
- **Name, Address, Phone byte-identical** across every service-area page, the homepage, Google
  Business Profile, and every citation/directory. One format only (always `(403) 555-0100`, always
  "Street" not "St.").
- The page's schema NAP must match the visible footer NAP **character for character**.
- **2026 AI note:** *"If ChatGPT sees conflicting phone numbers, it will not cite you."* NAP
  consistency is now an **AI "Entity Trust" signal**, not just a Google one.

---

## 4. Schema / structured data (what Google actually supports/renders in 2026)

### Google's official position (Search Central — current)
- **`LocalBusiness` required:** `name` + `address` (PostalAddress: streetAddress, addressLocality,
  addressRegion, postalCode, addressCountry).
- **Recommended:** `geo` (GeoCoordinates, ≥ 5 decimal places), `telephone`, `url` (the specific page
  URL), `openingHoursSpecification`, `priceRange`, and `department` for distinct departments.
- **Use the most specific subtype** (`Plumber`, `Electrician`, `HomeAndConstructionBusiness`, etc.).
- **Service-area businesses:** use `areaServed` to describe the geographic area — a city name, a
  region, or a **`GeoCircle` / `GeoShape`** object. (Schema.org refined GeoCircle/GeoShape in late
  2025; Google began weighting them for SABs in early 2026.)
- ⚠️ **Reviews policy (critical):** Google marks `aggregateRating` and `review` as *"only recommended
  for sites that capture reviews about **other** local businesses."* Self-serving review markup on
  your **own** business is **not** a supported pattern and is a known manual-action risk. (First-party
  reviews can still appear on-page for users/AI without self-markup.)

### The current best-practice schema stack (per matrix page) — emit **statically, in initial HTML**
- `LocalBusiness` (correct subtype) with NAP + `geo` + `areaServed` scoped to **that** community via
  `GeoCircle` (geoMidpoint lat/long + geoRadius in meters) or `GeoShape`.
- `Service` — one Service block per core service, each with its own `areaServed`. (A 5-service
  business = 5 Service schemas on the hub.)
- `FAQPage` — matching the visible local FAQ (Q&A must match the rendered text exactly).
- `BreadcrumbList` — on every page below the homepage.
- `WebPage` wrapper with `isPartOf` → `WebSite`; plus sitewide `Organization` on the homepage (with
  `sameAs` to GBP/Maps + socials).

### Example `areaServed` (GeoCircle)
```json
"areaServed": {
  "@type": "GeoCircle",
  "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 51.18954, "longitude": -114.46844 },
  "geoRadius": "40000"
}
```

---

## 5. AI SEO / GEO / AEO — getting cited by AI Overviews, ChatGPT, Perplexity, Claude, Gemini

> Full cross-cutting playbook in `research/03-ai-seo-geo-aeo-research.md`. Local-specific essentials:

### The data that should shape strategy
- **AI Overviews rarely fire on pure "service + city" / "near me" queries** (~7–15%) but fire
  **50–92% of the time on the informational/advisory layer** around them ("cost of trenchless sewer
  repair in Chicago," "how to choose a roofer in {city}"). → **Capture AI with an informational
  blog/FAQ cluster that links down into the transactional matrix pages.** Don't stuff informational
  content onto transactional pages.
- **~80% of LLM-cited sources don't rank in Google's top 100** — AI visibility is a *separate* game.
- **AI citations convert ~5× a normal organic click** (≈14% vs ≈3%), and AI-Overview queries are
  ~83% zero-click — being *in* the answer matters more than ever.
- **Reddit is disproportionately cited** (≈21% of Google AI Overview citations, ≈46% of Perplexity) —
  third-party/off-site presence matters.

### Concrete GEO/AEO rules (per page)
1. **Front-load the answer** in the first ~200 words / first 2 sentences, with a specific/quantitative
   statement (a real 2026 price range). Quantitative data earns a higher citation rate.
2. **Self-contained extractable units** — write each FAQ answer to fully answer the query standalone
   in ~130–170 words.
3. **Encyclopedic, objective tone** — remove "I think / we believe"; declarative sentences lower
   perplexity and raise citation likelihood.
4. **Conversational/question targeting** — H2/H3 as the exact questions asked ("How much does
   {service} cost in {city}?"), each with a direct 40–60-word answer below (wins snippets + PAA too).
5. **Schema is the native language of AI Overviews** — `LocalBusiness` + `Service` + `FAQPage`.
6. **Entity Trust / consensus** — consistent NAP across directories, `sameAs` links, brand mentions.
7. **Platform nuance:** Google AIO rewards authority + schema; Perplexity rewards niche expertise +
   Reddit; ChatGPT rewards domain authority + off-site brand mentions; Copilot rewards structured data
   + multimedia.

### Crawler access files
- **`robots.txt`: explicitly `Allow`** the AI crawlers you want citing you: `GPTBot`, `OAI-SearchBot`,
  `ChatGPT-User`, `ClaudeBot`, `Claude-SearchBot`, `PerplexityBot`, `Google-Extended`, `Amazonbot`,
  `cohere-ai` (keep Googlebot/Bingbot).
- **`llms.txt`: include it (low cost), set expectations** — as of 2026 adoption is still largely
  theoretical; log studies show almost **0** AI bots actually requesting `/llms.txt`. Treat it as
  forward-looking insurance, **not** a substitute for clean static HTML + schema.

---

## 6. Internal linking, sitemaps, lastmod, crawl budget at scale

- **Hub-and-spoke link graph** distributes authority and aids crawl (§1).
- **Sitemaps:** keep each under **50,000 URLs / 50 MB**; **split by segment** (location, service,
  date). A build-time generator must enumerate all static routes + the full matrix + area pages,
  regenerated per deploy.
- **`lastmod` must reflect *real content changes*, not deploy dates.** Accurate lastmod makes crawlers
  revisit faster; faked/global lastmod erodes trust and wastes crawl.
- **Crawl budget** becomes a real constraint at tens of thousands+ of URLs or daily publishing. Avoid
  parameterized/faceted junk URLs. Prioritize crawl toward pages whose data actually changes.
- **2026 reality:** aggregate crawl/linking density used to *help* large programmatic sites; **now the
  weakest pages drag domain authority down** — prune/`noindex` thin pages rather than dilute the site.

---

## 7. Static rendering / SSR / SSG (a hard release blocker)

- **AI crawlers do not run JavaScript.** GPTBot, ClaudeBot, PerplexityBot **fetch raw HTML only**,
  don't wait for rendering, and don't retry. A client-only SPA is **invisible** to them.
- Googlebot *does* render JS (headless Chromium), and **Applebot renders fully** — but the LLM
  crawlers driving ChatGPT/Claude/Perplexity do not.
- **Therefore: content + all JSON-LD must be in the initial server HTML.** Use SSG/SSR or a Vite
  prerender step. **Verify** by fetching a built URL with JS disabled and confirming the H1, body
  copy, and `<script type="application/ld+json">` are present.
- Move any schema currently injected via `useEffect`/client JS into the prerendered output.

---

## 8. E-E-A-T, Google Business Profile interplay, surfaces

- **GBP is the spine of the local pack.** Link GBP directly to the matching service-area page (not the
  homepage); a strongly-ranking organic area page can later become the GBP landing page once you
  verify a location there (Sterling Sky).
- **E-E-A-T on every page:** author/staff bios with credentials, first-party experience ("47 projects
  completed in {city}"), real photos, named reviews, external authoritative links, visible "last
  updated" date, HTTPS/clear contact/privacy.
- **AI evaluates trust/authority/reputation across the *entire web*** — off-site consensus (citations,
  mentions, consistent NAP) is now part of E-E-A-T for AI.
- **Three surfaces coexist on one query:** the AI Overview (curated "Top Rated" providers, surfacing
  far fewer businesses than the pack), the traditional local 3-pack, and AI Mode — often each showing
  *different* businesses. Optimize for all three; pack ranking ≠ AI inclusion.

---

## 9. Real 2025–2026 local ranking signals (Whitespark / BrightLocal)

- **The Big 3:** Proximity, Relevance, Prominence qualify you to rank; supporting signals (schema,
  behavioral, review keywords) decide the top spot.
- **Local Pack factor weights (2025–2026 survey):** GBP signals **~32%**, on-page **~19%**, reviews
  **~16%**, links **~15%**, behavioral **~8%**, citations **~7%**, personalization **~3%**.
- **Proximity is the single biggest factor (~55%, Whitespark 2026).** Highest individual GBP factors:
  **primary category, address proximity, keywords in the business title.**
- **Reviews (~16–20% and rising):** review **velocity**, **response rate**, and **total count** matter
  most; review *keywords* feed both Google relevance and AI.
- **Behavioral (~8%):** brand searches, GBP clicks/interactions, page dwell time.
- The **2026 Whitespark survey** (Nov 2025) added **47 new factors and, for the first time, AI-search
  visibility factors** — confirming AI is now a tracked local dimension.

---

## 10. Anti-patterns that get programmatic local pages deindexed (do-not list)

1. Find-and-replace pages (only the city name differs) → scaled content abuse / duplicate content.
2. Building a page for **every conceivable town** regardless of service relevance.
3. Aggregate/doorway pages that funnel many geo-keywords to one destination.
4. Orphan pages with no internal links / hidden behind an uncrawlable JS locator.
5. Query-parameter or JS-fragment location URLs.
6. **Self-serving `aggregateRating`/`review` schema** on your own business.
7. Client-only rendering (invisible to AI crawlers; slow for Googlebot at scale).
8. Keyword-stuffed, no-evidence "we serve {city}" copy with no address/team/proof.
9. Faked/global `lastmod` and deploy-date sitemaps.
10. Set-and-forget pages with stale hours/reviews/NAP — and letting thin pages sit live, dragging the
    whole domain's authority down in the post-2026 quality model.
11. Cannibalization: two URLs targeting the same primary keyword. Route intent: `{service}` =
    brand-wide service page; `{trade} {city}` = location hub; `{service} {city}` = transactional matrix.

---

## The build-template checklist (distilled — per page, ship only if all true)

- [ ] Self-canonical clean URL, one (service × location) intent, in the link pyramid (no orphan).
- [ ] Unique title (≤ 60), unique meta (150–160, with phone + CTA), one H1 `[Service] in [City],
      [State/Province]`, sequential headings.
- [ ] **≥ 4 of 8 local-specificity signals** present (gate); ≥ 1 first-party data element; passes the
      find-and-replace test.
- [ ] First ~200 words answer the core question with a specific/quantitative statement (GEO).
- [ ] Local FAQ (3–5 Qs, one town-specific) with matching `FAQPage` schema.
- [ ] `LocalBusiness`(subtype, NAP matching footer byte-for-byte, geo, areaServed via GeoCircle) +
      `Service` + `BreadcrumbList` + `WebPage` — **all in static HTML**.
- [ ] **No** self-serving review schema.
- [ ] "Nearby areas" (≤ 5) + breadcrumb up + links to relevant service pages.
- [ ] Rendered server-side; verified HTML + JSON-LD appear with JS disabled.
- [ ] In a segmented sitemap with real `lastmod`; AI crawlers `Allow`ed in robots.txt; `llms.txt` present.
- [ ] Visible "last updated" date; on a re-audit cadence.

---

### Top 5 takeaways for the template
1. **Gate before you generate** (≥ 4-of-8 + first-party data) — the domain-drag model makes this existential.
2. **Static-render everything** with schema in the initial HTML — AI crawlers don't run JS.
3. **Two content layers** — transactional matrix + informational blog/FAQ cluster that links down.
4. **NAP + entity consistency** is now both a Google *and* an AI-citation trust signal.
5. **One keyword → one URL**, dense hub-and-spoke linking, segmented sitemaps with honest `lastmod`,
   re-audit cadence.

*Sources: see `research/sources.md`.*
