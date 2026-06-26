---
status: PARTNER
layer: partner
category: experience-prompts
cross-cuts: [seo, faq, forms]
pairs-with: source-documents/experience-prompts/seo-faq-optimization-persona.source.md
embedded-on: 2026-04-26
brand-scope: cross-brand (default-applies-to-cochrane-master-builders)
priority: P0 (FAQ work) / P1 (general SEO work)
---

# Partner — World-Class SEO FAQ Optimization Persona & Page-by-Page Instructions

> Interpretation layer for `source-documents/experience-prompts/seo-faq-optimization-persona.source.md`. The source file is immutable; everything below is how this codebase uses it. Read alongside `governance/knowledge-system-charter` and `experience-prompts/seo-virtuoso-persona`.

---

## 1. Title

World-Class SEO FAQ Optimization Persona & Page-by-Page Instructions — operational FAQ companion to the General SEO Virtuoso persona.

## 2. Category

`experience-prompts/` — cross-brand, function-scoped persona. Cross-cuts: `seo`, `faq`, `forms` (FAQ accordion is a form-adjacent disclosure component).

## 3. Main purpose

Install a Victorious-SEO-grade, page-by-page FAQ playbook. The source defines: how to source questions, how to select/cluster them, the 4-part answer framework, where FAQs live (page-specific vs canonical global), `FAQPage` JSON-LD schema rules, voice + local optimization, performance/accessibility constraints, monitoring metrics, and a 10-step process workflow.

## 4. What this document should influence

- **Question selection** — sourced from real data (support logs, sales calls, Search Console, "People Also Ask"), not invention. 15–40 questions per core service page. Action-oriented phrasing ("How…", "What…", "Do…", "Is…").
- **Question phrasing** — exactly how users ask, no jargon. "How do I…?" not "Returns Procedure".
- **Intent bucketing** — every question maps to one of: Informational / Transactional / Navigational / Local / Edge Case. One intent per question.
- **Answer structure** — Direct answer (1–2 sentences) → Context & nuance → Factors/ranges → CTA with internal link.
- **Answer voice** — first-person plural ("we"), conversational, no keyword stuffing.
- **Placement** — page-specific FAQ for service-specific questions; global `/faq` for site-wide policies; one canonical page per question with shorter linked variants elsewhere.
- **Heading hierarchy** — `<h2>` for FAQ section, `<h3>`/`<h4>` for individual questions.
- **UI implementation** — lightweight `<details>`/`<summary>` (or minimal JS) for collapsibles. Top 5–8 questions expanded by default, the rest **rendered in HTML even when collapsed** so crawlers can read them.
- **Schema** — single `FAQPage` JSON-LD blob per page, JSON-LD text matching visible text **exactly**, in `<head>` or `<body>`, not injected post-load. Use `QAPage` (not `FAQPage`) on user-generated boards. Never `FAQPage` on promotional content.
- **Local optimization** — geographic modifiers ("in Cochrane", "near me", service-area names) and `LocalBusiness` schema linkage.
- **Voice search** — conversational phrasing, brief direct answers, schema-backed.
- **Performance** — Core Web Vitals safe (no heavy accordion libraries, no CLS, lazy-load multimedia).
- **Accessibility** — WCAG 2.1, ARIA on disclosure widgets, contrast, mobile tap targets.
- **Monitoring** — Search Console impressions/CTR/position, GA4 accordion-open events, support-ticket deflection, monthly review cadence.
- **Ethics** — no advertising, no PII, no discriminatory language, accuracy & source credibility.

## 5. Trigger prompts (consult this document when you see)

- "add an FAQ section…", "FAQ block on…", "FAQ for the [page] page"
- "write FAQ answers", "rewrite this FAQ", "FAQ tone"
- "what FAQ questions should we include", "FAQ discovery"
- "FAQPage schema", "FAQ JSON-LD", "structured data for FAQs", "Rich Results Test"
- "FAQ accordion", "collapsible FAQ", "expand-by-default FAQs", "`<details>`/`<summary>`"
- "categorize FAQs", "FAQ jump links", "FAQ table of contents"
- "voice search FAQ", "AI Overview FAQ", "GEO for FAQs"
- "FAQ duplicated across pages", "FAQ canonical page", "FAQ cannibalization"
- "monitor FAQ performance", "Search Console FAQ", "FAQ CTR"
- "Cochrane FAQ", "Areas-We-Serve FAQ", "service-page FAQ"

## 6. Scope of application

**In scope:**
- Backend FAQ structure (which questions, on which pages, in what order, under what categories)
- Answer copy authored within the partner-defined brand voice
- `FAQPage` / `QAPage` / `LocalBusiness` JSON-LD generation and validation
- The *structural* requirements of FAQ UI: lightweight component, full HTML render, ARIA, visible top FAQs, mobile-responsive, WCAG 2.1
- Internal linking from FAQ answers to deeper pages
- FAQ analytics instrumentation

**Out of scope:**
- The *visual* design of FAQ accordions (typography, motion, dividers, copper accents) — defer to design partner docs and `mem://design/component-styling`, `mem://design/editorial-divider-specs`
- Anything outside FAQ work (general meta tags, sitemaps, hreflang, Core Web Vitals broadly) — defer to `experience-prompts/seo-virtuoso-persona`
- Brand-identity decisions about voice/tone — defer to brand-identity partner docs

## 7. Output-quality direction

- **Victorious-SEO discipline** — every question earns its slot; no fluff; every answer ends with a CTA + internal link.
- **AI-citation-aware (GEO)** — write the first sentence so it can stand alone in an AI Overview.
- **Schema fidelity** — JSON-LD text **exactly** matches visible text; mismatches get the schema ignored.
- **Performance budget** — FAQ section adds zero CLS and < ~10kb JS. Native `<details>`/`<summary>` preferred over heavyweight Radix accordions when SEO is the priority.
- **Accessibility** — WCAG 2.1 AA. ARIA `aria-expanded` on disclosure triggers, `aria-controls` to panel IDs.
- **Conversion-aware** — every answer concludes with the next step (contact, quote, deeper page).

## 8. Brand & ICP relationship (Cochrane Master Builders)

When applied to this codebase's primary brand:

- **Question source data** — pull from `brands/cochrane-master-builders/seo-research/1.1_…` (keyword + AI-Overview research) plus real homeowner sales conversations.
- **Answer voice** — `brands/cochrane-master-builders/brand-identity/1.2.2_…` ("Strong Foundations For Those Who Come After Us"). Generational, plainspoken, zero jargon, no upsell.
- **Audience-specific question selection:**
  - **Mothers (`cmb-persona-1.4.2`)** → pricing transparency, scheduling sensitivity, mess/disruption protection, child-safety on site, communication cadence, school-year timelines.
  - **Grandfathers (`cmb-persona-1.4.3`)** → warranty, longevity (50-year build standard), plainspoken pricing without "starting at", phone CTA in the next-step slot, references to past projects.
  - **Subcontractors (`cmb-persona-1.4.1`)** → onboarding process, license/insurance upload, payment terms, scope-of-work clarity.
- **Local modifiers** — primary: "in Cochrane"; secondary: "Bow Valley", "Rocky View County", "Calgary CMA"; tertiary: "near me" (only where natural).
- **Geo-specific content** — Cochrane / Bow Valley winter prep, snow load engineering, foothills wind exposure, well-water vs municipal, septic vs sewer, acreage permitting (Rocky View County) vs in-town permitting (Town of Cochrane).
- **CTAs** — generational / phone-friendly for the Grandfather audience; quote-form / scheduling for the Mother audience; portal-login / onboarding for subcontractors.

## 9. Global vs specific (precedence)

- **Wins over** the General SEO Virtuoso persona on FAQ-specific tactics: 15–40 question count, 4-part answer framework, `FAQPage` JSON-LD rules, accordion implementation, FAQ-specific monitoring metrics.
- **Inherits from** the General SEO Virtuoso on overarching methodology: E-E-A-T, GEO, "what not to do", page-load discipline.
- **Inherits from** `governance/knowledge-system-charter` always.
- **Loses to** brand-identity partner docs on voice register and word choice in answer copy.
- **Loses to** ICP partner docs on which questions matter most for which audience.
- **Loses to** explicit user instruction in the active prompt.

## 10. Adaptation notes (conflict rule applied — source preserved verbatim)

The source contains paste artefacts and references from a prior context. Per `governance/knowledge-system-charter`, none of these are edited in the source file. Apply the following mappings:

| In source                                     | Apply as                                                                                  |
|-----------------------------------------------|-------------------------------------------------------------------------------------------|
| `Lovable.dev`                                 | The active brand for the prompt (default: Cochrane Master Builders Corp.)                 |
| `Calgary` example questions                   | On-region for CMB. For Cochrane FAQs prefer `Cochrane` primary, `Calgary` secondary.      |
| August 2023 Google rich-result restriction    | Still accurate at embedding time; schema remains valuable for voice + AI synthesis.       |
| Trailing italicised "Cochrane subdomain" instruction | **Knowledge-only**. Does NOT authorise a frontend FAQ pass on this codebase. A live Cochrane FAQ pass is a separate, deliberately-scoped request. |
| Duplicated heading fragments ("Local Search Relevance levance", "Analytics Analytics", "Variables Variables", "Inclusions Inclusions", "Duplication lication", "Grouping 3 Grouping", "User Interface Interface", "Page Load 1 Page Load", "Usability Usability", "Impressions Impressions", "Categorization ategorization", "Ethical Considerations ical Considerations", "Accessibility Accessibility", "Transparency Transparency", "Structured Structured", "Specificity ity", "Chatbots bots") | Paste artefacts. Read past them — the rule is intact. |
| `■` (black-square) bullet glyph in §5.2       | Treat as a third-level bullet under `acceptedAnswer.text`.                                |
| `<mark>FAQPage</mark>`, `<mark>Question</mark>`, `<mark>Answer</mark>`, `<mark>QAPage</mark>` | Schema.org type names — treat as code identifiers.                              |
| Intent-bucket HTML `<table>` (5 rows)         | Render as a 5-row table when consulting; preserved as raw HTML in source.                 |
| Smart quotes / em-dashes                      | Preserved as-is; carry through to authored copy where the brand voice allows curly quotes.|

## 11. Dependencies / related documents

- **Always inherit:** `partner-documents/governance/knowledge-system-charter`
- **Parent persona:** `partner-documents/experience-prompts/seo-virtuoso-persona`
- **Brand keyword research:** `brands/cochrane-master-builders/seo-research/1.1_…`
- **Service-area taxonomy:** `brands/cochrane-master-builders/strategy/1.3_…` (which location FAQs to add and on which sub-pages)
- **Brand voice / tone:** `brands/cochrane-master-builders/brand-identity/1.2.2_…`
- **ICP personas:** `brands/cochrane-master-builders/personas-icp/1.4.1` (subcontractors), `1.4.2` (mothers), `1.4.3` (grandfathers)
- **UX / component design:** `brands/cochrane-master-builders/ux-design/1.3.1_…` and the Cochrane Master Builders-Wood design memories (`mem://design/component-styling`, `mem://design/editorial-divider-specs`, `mem://constraints/typography-legibility`) for the *visual* treatment of FAQ accordions.
- **Future:** any per-page FAQ canonical registry (a JSON or MD list of "question → canonical page") should be created the first time we duplicate an FAQ across two pages.

## 12. Practical examples

**A. "Add an FAQ section to the Cochrane custom-home services page."**
1. Discovery — pull questions from CMB sales calls, Search Console for `/cochrane/custom-homes`, "People Also Ask" for `custom home builder cochrane`, and competitor PAAs (source §2.1).
2. Filter to 18–25 questions (source §2.3 rule 4) covering all five intent buckets.
3. Cluster: Process & timeline, Pricing & quotes, Permits (Town of Cochrane vs Rocky View), Materials & warranty, Service area, Working with us.
4. Apply 4-part answer framework (source §3.1) in the brand voice from `brand-identity/1.2.2`.
5. Top 6 expanded by default; rest in `<details>`/`<summary>` rendered in HTML.
6. Generate one `FAQPage` JSON-LD blob; text matches visible copy character-for-character.
7. Internal links to `/cochrane/process`, `/cochrane/portfolio`, `/cochrane/about`.
8. Validate with Rich Results Test.
9. Instrument GA4 events on accordion-open and CTA-click.
10. Monthly Search Console review (source §8.1).

**B. "We have the same warranty question on `/faq` and on `/cochrane/custom-homes` — what do we do?"**
- Source §4.1 rule 3 + §4.2 rule 2: `/faq` is canonical (full answer + warranty doc link). `/cochrane/custom-homes` gets a 1–2 sentence variant with descriptive anchor link `"See our full warranty details"` to `/faq#warranty`. Add to the canonical-question registry.

**C. "Our FAQ accordion is heavy and causing CLS."**
- Source §4.4 + §7.1: replace the heavy library with `<details>`/`<summary>` (or our existing Radix accordion configured with `forceMount` so all panels render in the DOM). Lazy-load any media. Reserve box height to eliminate CLS. Verify in Lighthouse.

**D. "User asks for FAQ rich snippets to appear in Google for `/cochrane`."**
- Source §5.4: set expectation — since Aug 2023, Google only renders FAQ rich results for authoritative gov / health domains. Schema is still worth implementing for voice search, AI Overviews, and other engines (Bing/DuckDuckGo). Recommend tracking Search Console "Rich result" report only as a sanity check, not as the success metric.

**E. "Write a Cochrane-winter-prep FAQ for the homeowner audience."**
- Source §6.1.3 example translates: "How do I prepare my Cochrane custom home for winter?" Direct answer in 1–2 sentences (snow load already engineered in to CMB builds; here are 3 owner-side steps). Context: foothills climate, chinook freeze-thaw cycle. Factors: heated vs unheated garage, well-water freeze risk on acreage. CTA: link to `/owners-guide#winter`. Note: only state facts you can verify against CMB build specs — do not invent specs (per the user's trailing instruction in the source).
