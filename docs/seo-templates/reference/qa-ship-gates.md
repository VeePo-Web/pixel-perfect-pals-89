# Reference — QA Ship Gates (pass/fail before any page is published)

Every page must pass the relevant gate **before** it is generated/published. These gates encode the
research into mechanical checks. A build prompt that produces a page failing any gate has failed.

---

## GATE A — Universal (every page, both systems)

- [ ] **Static HTML:** fetching the built URL with **JavaScript disabled** shows the H1, the body
      copy, and every `<script type="application/ld+json">`. *(If not → release blocker.)*
- [ ] **Self-canonical** clean URL, lowercase-hyphenated, ≤ 3 levels, no query params.
- [ ] **One primary keyword → this URL only** (no cannibalization across service/location/blog tiers).
- [ ] **Unique `<title>` ≤ 60 chars**; **unique meta description 150–160 chars**.
- [ ] **One H1**, sequential heading hierarchy (no skipped levels).
- [ ] **Schema matches visible content** (FAQ Q&A identical to rendered text).
- [ ] **No self-serving `aggregateRating`/`review`** on own Organization/LocalBusiness.
- [ ] In **sitemap** with **honest `lastmod`** (real content-change date, not deploy time).
- [ ] **In the internal link graph** (no orphan); descriptive anchors only.
- [ ] **Visible "Last updated" date**; entered into a re-audit/refresh queue.
- [ ] **CWV budget**: LCP < 2.5s, INP < 200ms, CLS < 0.1; images AVIF/WebP with width/height; LCP
      image preloaded.

---

## GATE B — Areas matrix page (the uniqueness gate — existential)

- [ ] **≥ 4 of 8 local-specificity signals** present:
      1) landmark/neighbourhood/street/school  2) local condition note (service-relevant)
      3) local project reference  4) local code/permit/bylaw  5) local community/event
      6) proximity/crew/supplier differentiator  7) **named local testimonial**
      8) community-specific FAQ. *(< 4 → DO NOT generate; skip or `noindex`.)*
- [ ] **≥ 1 first-party data element** (real price range, real case, real review, staff bio).
- [ ] **Passes the find-and-replace test:** remove the city name — locally specific content remains.
- [ ] **First ~200 words** answer the core local question with a **specific/quantitative** statement.
- [ ] **Local FAQ (3–5 Q, ≥ 1 town-specific)** with matching `FAQPage` schema.
- [ ] **`LocalBusiness`** (correct subtype) with **NAP byte-identical to footer**, `geo` (≥5 decimals),
      `areaServed` via **GeoCircle/GeoShape** scoped to this community.
- [ ] **`Service`** node(s) (one per service) with own `areaServed`; **`BreadcrumbList`**; **`WebPage`**.
- [ ] **"Nearby areas" (≤ 5)** + breadcrumb up + links to relevant service pages.
- [ ] Region/state hub fully built before its community spokes.

---

## GATE C — Blog article

- [ ] **Assigned to a pillar cluster**; knows pillar vs spoke; **informational intent only**.
- [ ] **≥ 1 information-gain element** (first-party stat, real case, named expert quote, original
      framework/data) not liftable from the existing SERP.
- [ ] **Answer-first structure**: question H2s, 40–60-word direct answers, self-contained ~130–170-word
      extractable chunks; **Grade 6–8** reading level; no widows.
- [ ] **≥ 3 internal links** (1 to pillar, 2 to adjacent spokes/service pages); links **down** into
      the relevant Areas matrix page where geo-relevant (`about.{region,community}` set).
- [ ] **`BlogPosting`** + **`Person`** author (with `sameAs`) + **`BreadcrumbList`** (+ `FAQPage` if Q&A).
- [ ] **Named real author** with bio + author page; first-hand experience visible.
- [ ] `datePublished` + `dateModified` + visible "Last updated".
- [ ] Pillar = 2,000–4,000 words; spoke = 800–1,800 words; cluster has ≥ 8 spokes target before
      claiming "topical authority."

---

## GATE D — Site-wide AI-SEO hardening (run once per project, re-verify on deploy)

- [ ] **`robots.txt`** explicitly `Allow`s GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
      Claude-SearchBot, PerplexityBot, Google-Extended, Amazonbot, cohere-ai; **Sitemap:** line live.
- [ ] **`llms.txt`** present (business summary → key pages → services → service areas → key facts).
- [ ] **Sitewide `Organization`** with real NAP + `sameAs` (GBP/Maps + socials) + `WebSite`, in
      **static HTML**, linked by `@id` across all pages.
- [ ] **NAP byte-identical** across site, footer, schema, GBP, citations.
- [ ] **Sitemaps segmented** if > ~50k URLs; each < 50k URLs / 50 MB.
- [ ] **Server logs** confirm AI crawlers are fetching static HTML (post-deploy check).
- [ ] **Thin/low-value pages pruned or `noindex`** (domain-drag protection).

---

## The two tests to remember
1. **Find-and-replace test (Areas):** delete the city — is anything locally specific left? If no → fail.
2. **JS-disabled test (Universal):** view source with JS off — are content + JSON-LD there? If no → fail.
