# 15 — Universal Template Wireframe (CMB Master Template)

> **Authority:** This document is the **structural spine** for every Cochrane Master Builders sub-brand site. It is the single source of truth for **what pages exist, what sections each page contains, in what order, with what slots, and which remix variables fill those slots.**
>
> **Scope:** Cochrane Master Builders only — all 150 planned service-specific spin-off sites (Cochrane Tile Co., Cochrane Flooring Co., Cochrane Drywall Co., …). The first sandbox implementation is the current Drywall app; every future site is a **remix** of this wireframe with variables re-bound.
>
> **Inheritance:**
> - Visual identity, tokens, palette, motion → files **01–08**
> - Voice + lexicon → file **09**
> - SEO + schema → file **10**
> - Perf + a11y budgets → files **11 + 14**
> - Landing page persona + operating manual → files **12 + 13**
> - **Wireframe / IA / slot map → THIS FILE (15)**
>
> **Hard rule:** No copy is written in this document. No components are coded in this document. This is the **scaffold contract** that copy (next phase) and code (phase after) bind to.
>
> **Family-resemblance promise:** Two CMB sub-brand sites opened side-by-side must feel like siblings — same skeleton, same rhythm, same governance — with the trade, palette accent, photography, and locality being the *only* visible variation.

---

## Table of contents

1. Operating principles
2. Remix variables (the only things that change per site)
3. Page set (locked)
4. Section spine — page by page
5. Cross-page systems (nav / footer / booking / schema / CTA map)
6. Component → slot mapping
7. Remix workflow (5 phases)
8. Pass/Fail audit checklist (35 items)
9. Auditor ripgrep bundle
10. Sign-off chain
11. Change log

---

## 1. Operating principles

1. **Structure first, copy second, visuals third.** Reversing the order produces copy that fights the layout and visuals that fight the copy.
2. **The skeleton is sacred.** A remix may swap palette accent, hero photography, trade vocabulary, and community list. It may **not** add, remove, or reorder sections without amending this document.
3. **Variables, not exceptions.** If the same slot needs different content per site, it becomes a named variable in §2. Ad-hoc overrides are a code smell and an audit failure.
4. **The booking modal is the conversion destination.** Every CTA on every page opens the same singleton modal mounted in `App.tsx`, with `prefill` describing where the click came from.
5. **Family-resemblance over novelty.** Apple's product line works because every product is recognisably part of the same system. We optimise for sibling-resemblance across all 150 sites.
6. **Mobile-first, thumb-zone CTAs.** Every primary CTA must be reachable in the bottom third of a 390px viewport without scrolling.
7. **Apple-grade restraint.** Massive negative space, editorial type, no decoration for decoration's sake. Composition over chrome.

---

## 2. Remix variables (the only things that change per site)

Every variable below is bound **once per site** at remix time. Slots in §4 reference variables by name in `{BRACES}`.

### Brand-level

| Variable | Type | Source | Example |
|---|---|---|---|
| `{BRAND_NAME}` | string | manual at remix start | "Cochrane Tile Co." |
| `{BRAND_DOMAIN}` | string | manual | "cochranetileco.ca" |
| `{BRAND_ACCENT_HSL}` | HSL token | file 03 palette extension | `hsl(28 35% 42%)` |
| `{TAGLINE}` | string | copy phase | (deferred) |
| `{TRUST_NUMBERS}` | object | CMB ops | `{license, insurance, years, warrantyYears}` |
| `{NAP}` | object | CMB ops | name, address, phone |
| `{AGENCY_CREDIT}` | const | locked | `"VeePo"` |

### Service-level (the unique axis)

| Variable | Type | Source | Example |
|---|---|---|---|
| `{SERVICE}` | string | manual | "tiling" |
| `{SERVICE_NOUN}` | string | manual | "tile" |
| `{SERVICE_PLURAL}` | string | manual | "tile installations" |
| `{SERVICE_VERB}` | string | manual | "tile" / "install" |
| `{SERVICE_CATEGORY}` | enum | catalogue | `interior-finish \| structural \| exterior \| mechanical \| landscape` |
| `{HERO_IMAGE}` | asset | image SEO persona | service-specific macro photograph |
| `{SUB_SERVICES[]}` | array | catalogue | each row → one `/services/{slug}` page |
| `{PRICE_BANDS[]}` | array | pricing doc | range + drivers per sub-service |
| `{FAQS[]}` | array (≥20) | copy phase | service-specific Q&A |
| `{PROOF[]}` | array | gallery ops | before/after pairs |
| `{REVIEWS[]}` | array | reviews ops | quotes + attribution |
| `{PROBLEMS_WE_SOLVE[]}` | array (3–6) | copy phase | pain chips for hero-adjacent section |
| `{MATERIALS_WE_LOVE[]}` | array | copy phase | for /why-we-love grid |

### Geographic axis

| Variable | Type | Source | Example |
|---|---|---|---|
| `{COMMUNITIES[]}` | array | `communities_master_v3` | one row → one `/areas/{community}` page |
| `{AREA_PRIMARY}` | string | first row | "Cochrane" |
| `{AREA_CLUSTERS[]}` | array | communities map | regional groupings for `/areas` index |

### Slot variables (computed per CTA)

| Variable | Notes |
|---|---|
| `{CTA_LABEL}` | copy phase per slot |
| `{prefill.service}` | usually = `{slug}` of containing page; on home/contact = `null` |
| `{prefill.source_page}` | route path |
| `{prefill.source_section}` | section anchor id |

---

## 3. Page set (locked)

```text
/                       Home
/our-story              Brand story (founder + family legacy + master-builder ethos)
/why-we-love            Why we love {SERVICE}
/services               Services index
/services/{slug}        Service detail (one per {SUB_SERVICES} row)
/areas                  Areas-we-serve SEO hub (index)
/areas/{community}      Per-community SEO page (one per {COMMUNITIES} row)
/pricing-process        Pricing transparency + how quoting works
/gallery                Proof / before-after
/reviews                Social proof
/about                  Company, license, insurance, warranty
/contact                Contact + booking entry
/faq                    Master FAQ
/privacy                Privacy
/terms                  Terms
/warranty               Warranty
/accessibility          Accessibility statement
/brand                  Internal brand kit (noindex)
```

**Rules**
- Every site renders **all** routes above. Pages with empty data sources render a graceful empty state — never 404, never hidden.
- Route `/` is the only level-0. All others are level-1; `{slug}` and `{community}` are the only level-2 patterns.
- Trailing slash policy: **no** trailing slash (matches current app).
- `noindex` is set only on `/brand`.

---

## 4. Section spine — page by page

Notation: `[N]` = section index; `<Component>` = preferred React component (see §6); `→` = link target; `(prefill: …)` = booking prefill; `‖slot‖` = copy slot deferred to phase 4.

### 4.1 `/` Home — 12 sections

```text
[1]  <Hero>
       slots: ‖h1‖ (uses {SERVICE}, {AREA_PRIMARY}), ‖sub‖, primary CTA → modal (prefill: null), phone link
       background: {HERO_IMAGE}
[2]  <TrustBar>            license, insurance, warranty years, BBB/HomeStars badges
[3]  Problems we solve     3–6 chips from {PROBLEMS_WE_SOLVE}
[4]  Core services grid    cards for top {SUB_SERVICES} → /services/{slug}
[5]  Why we love teaser    1-screen excerpt → /why-we-love
[6]  <BeforeAfterPair>×3   first 3 of {PROOF}
[7]  Why choose us         3–5 differentiators incl. <MasterBuilderSeal />
[8]  <ProcessSteps>        3–6 steps (universal CMB process)
[9]  Starter packages      teaser → /pricing-process
[10] Testimonials          3 from {REVIEWS}
[11] FAQ top 5             from {FAQS} → /faq for full list
[12] <CTABand> + <Footer>  primary CTA → modal (prefill: null)
```

### 4.2 `/our-story` Brand Story — 8 sections

```text
[1] <InnerHero>            ‖h1‖ universal: "Built by a family of builders"
[2] Origin                 founder narrative slot
[3] Family legacy block    ties to Master Builders parent (uses Family_Legacy_Standard partner)
[4] Why this trade         connects family story → {SERVICE}
[5] Values (3)             from CMB voice authority (file 09)
[6] Team / craftsmen       OPTIONAL — hide section if data empty (do not render placeholder)
[7] <TradeManifesto />     remixed per {SERVICE}
[8] <CTABand> + <Footer>
```

### 4.3 `/why-we-love` Why We Love {SERVICE} — 7 sections

```text
[1] <InnerHero>            "Why we love {SERVICE}" + editorial sub
[2] The craft              sensory / material / outcome triad
[3] Materials we love      visual grid from {MATERIALS_WE_LOVE}
[4] Moments that matter    3 micro-stories
[5] What clients feel after outcome-focused, not feature-focused
[6] <EditorialQuote>       pull quote
[7] <CTABand> + <Footer>
```

### 4.4 `/services` Services index — 5 sections

```text
[1] <InnerHero>
[2] Service catalogue grid all {SUB_SERVICES} → /services/{slug}
[3] "Not sure which?"      decision aid: 3 questions → recommended sub-service
[4] <TrustBar>
[5] <CTABand> + <Footer>
```

### 4.5 `/services/{slug}` Service detail — 11 sections

```text
[1]  <Hero> with breadcrumb (Home › Services › {sub-service.name})
[2]  Scope                 included / not included
[3]  Materials & timeline
[4]  <PricingTable>        from {PRICE_BANDS[slug]}
[5]  <ProcessSteps>        process specific to this sub-service
[6]  <BeforeAfterPair>×3   filtered {PROOF} where service == slug
[7]  <FAQAccordion>×5      from {FAQS} filtered by slug — emit FAQPage JSON-LD
[8]  Related services      2 sibling cards
[9]  Areas served chips    {COMMUNITIES} → /areas/{community}
[10] <CTABand>             primary CTA → modal (prefill.service = slug)
[11] <Footer>
```

### 4.6 `/areas` Areas-we-serve SEO hub (index) — 6 sections

```text
[1] <InnerHero>            "{SERVICE_PLURAL} across the Bow Valley & Calgary region"
[2] Region map             static SVG (no JS), pins from {AREA_CLUSTERS}
[3] Community grid         alphabetical, grouped by cluster, each → /areas/{community}
[4] Service-radius note    "How we serve outside our home base" trust copy
[5] LocalBusiness JSON-LD  areaServed = all {COMMUNITIES}
[6] <CTABand> + <Footer>
```

### 4.7 `/areas/{community}` Per-community SEO page — 8 sections

> **The most SEO-sensitive page type in the system.** Section [2] is non-negotiable: every community page must contain a unique 80–150-word intro referencing real local landmarks/neighborhoods. Boilerplate intros are an automatic Phase-7 fail.

```text
[1] <Hero>                 "{SERVICE_NOUN} in {COMMUNITY}"
[2] UNIQUE INTRO           80–150 words, must name ≥2 real {COMMUNITY} landmarks/neighbourhoods
                           (copy phase enforces uniqueness via slot prompt + audit)
[3] Services in {COMMUNITY} chips → /services/{slug}
[4] Local proof            photo + testimonial filtered by community
                           if empty: render trust strip + "first job here? we'll document it" copy
[5] Drive-time line        from base of operations to {COMMUNITY}
[6] LocalBusiness JSON-LD  areaServed = {COMMUNITY}
[7] <CTABand>              primary CTA → modal (prefill.source_page = /areas/{community})
[8] <Footer>
```

### 4.8 `/pricing-process` — 10 sections

```text
[1] <InnerHero>
[2] Starter pricing ranges all {PRICE_BANDS} summarised
[3] What affects price     drivers list (size / access / finish / lead time)
[4] How quoting works      3-step
[5] Photo quote section    inline upload widget → opens modal at upload step
[6] What to expect on-site
[7] How long jobs take
[8] What's included / not
[9] FAQ (5)
[10] <CTABand> + <Footer>
```

### 4.9 `/gallery` — 7 sections

```text
[1] <InnerHero>
[2] Filter by service      tabs by {SUB_SERVICES}
[3] Repair / install / package galleries
[4] <BeforeAfterPair>      grid
[5] Short captions / scope
[6] <CTABand>
[7] <Footer>
```

### 4.10 `/reviews` — 5 sections

```text
[1] <InnerHero>
[2] Review wall            all {REVIEWS} with attribution + source platform
[3] Aggregate proof        rating, count, platforms — emit AggregateRating JSON-LD if data is real
[4] <CTABand>
[5] <Footer>
```

### 4.11 `/about` — 7 sections

```text
[1] <InnerHero>
[2] Who we help
[3] What makes us different
[4] License / insurance / WCB block (real {TRUST_NUMBERS})
[5] Local positioning
[6] Values / work style
[7] <CTABand> + <Footer>
```

### 4.12 `/contact` — 8 sections

```text
[1] <InnerHero>            short reassurance copy
[2] Contact form           inline (not modal) — same submit handler as booking modal
[3] Photo upload
[4] Preferred contact method
[5] Service area note      links to /areas
[6] What happens next      3-step expectation setter
[7] Submit / CTA
[8] <Footer>
```

### 4.13 `/faq` — 4 sections

```text
[1] <InnerHero>
[2] All {FAQS} grouped by theme — emit single FAQPage JSON-LD
[3] <CTABand>
[4] <Footer>
```

### 4.14 Legal & trust pages

`/privacy`, `/terms`, `/warranty`, `/accessibility` — each: `<InnerHero>` + long-form content + `<Footer>`. No CTAs above the fold; trust pages are not conversion surfaces.

### 4.15 `/brand` — internal kit (noindex)

Tokens, logo usage, voice samples. Never linked from public nav.

---

## 5. Cross-page systems

### 5.1 Navigation (file 13 + Navigation Architect persona)

- 80px tall, `bg-bone/95` after scroll, `border-b border-seam`.
- Desktop: ≤ 7 items in this sequence — **Home / Services / Why We Love / Our Story / Areas / Pricing / Gallery / Reviews / About** (Contact lives in the CTA).
- Right-side filled CTA: opens booking modal, prefill = `{ source_page: pathname, source_section: 'nav' }`.
- Mobile drawer: full-height bottom-anchored sheet with sticky CTA in safe-area; groups = Services / Company.
- Footer ↔ scrolled nav must read as one composition (Easter-egg coherence).

### 5.2 Footer (3-tier per Footer Architecture memory)

```text
TOP    Brand mark + tagline + booking CTA
MID    5 columns — Services / Areas / Company / Legal / Sister sites
BOT    license # + insurance # + NAP + VeePo credit + © year
```

### 5.3 Booking modal (singleton)

Mounted once in `App.tsx`. Opened via `openBooking(prefill?)`. Lifecycle obeys the **Modal Lifecycle** memory exactly: AnimatePresence with deterministic `pointer-events` gating during exit. Booking funnel = 4-step right-panel auto-advance with photo upload (memory: Booking Funnel). Two-region modal layout (memory: Booking Modal Architecture).

### 5.4 CTA entry-point map

Every CTA in the system is documented as a row. Phase 7 audits this table — every row must open the booking modal with the listed prefill.

| Page | Section | Slot | prefill.service |
|---|---|---|---|
| `/` | Hero | primary | `null` |
| `/` | Final CTA band | primary | `null` |
| `/services/{slug}` | Hero | primary | `slug` |
| `/services/{slug}` | Final CTA band | primary | `slug` |
| `/areas/{community}` | Final CTA band | primary | `null` (with `source_page = /areas/{community}`) |
| `/our-story` | Final CTA band | primary | `null` |
| `/why-we-love` | Final CTA band | primary | `null` |
| `/pricing-process` | Photo quote | inline upload | `null` |
| `/gallery` | Final CTA band | primary | `null` |
| `/contact` | Submit | form | `null` |
| Nav | right-side button | primary | `null` |
| Mobile drawer | sticky bottom button | primary | `null` |
| `<StickyCTA>` | mobile sticky | primary | `null` |

### 5.5 Schema bundle (file 10)

| Schema | Where | Notes |
|---|---|---|
| `Organization` | sitewide head | once |
| `LocalBusiness` | sitewide head + `/areas/{community}` | `areaServed` differs |
| `Service` | each `/services/{slug}` | `serviceType = {SERVICE_NOUN}` |
| `FAQPage` | any page with FAQ section | dedupe — only render once per page |
| `BreadcrumbList` | every level-2 page | Home › Parent › Self |
| `AggregateRating` | `/reviews` | only if real review data exists; never fabricate |
| `ImageObject` | hero images | per Image SEO persona |

### 5.6 Performance + a11y inheritance

Inherits hard floors from file **14**: LCP < 2.0s, CLS < 0.02, INP < 150ms, TBT < 150ms, JS ≤ 170 KB gz, CSS ≤ 60 KB gz, hero ≤ 140 KB AVIF, fonts ≤ 80 KB. WCAG 2.2 AA, 48px touch, visible focus, `prefers-reduced-motion` honoured (file 11).

---

## 6. Component → slot mapping

The wireframe binds to the **existing component library** — no new components are required to ship a remix.

| Slot type | Component | Notes |
|---|---|---|
| Top hero | `<Hero>` (drywall variant) | one per home / per service detail |
| Inner hero | `<InnerHero>` | every other page |
| Trust strip | `<TrustBar>` | numbers from `{TRUST_NUMBERS}` |
| Service card grid | `<ServiceCard>` | maps `{SUB_SERVICES}` |
| Before/after | `<BeforeAfterPair>` | `{PROOF}` |
| Pricing | `<PricingTable>` | `{PRICE_BANDS}` |
| Process | `<ProcessSteps>` | universal or per-service |
| FAQ | `<FAQAccordion>` | emits FAQPage JSON-LD when `emitSchema` |
| CTA band | `<CTABand>` | `prefill` prop forwarded |
| Editorial quote | `<EditorialQuote>` | pull quotes |
| Editorial image | `<EditorialImage>` / `<HeroImage>` / `<ImageMosaic>` | per imagery doc (file 08) |
| Manifesto | `<TradeManifesto>` (master) | `/our-story` |
| Master seal | `<MasterBuilderSeal>` (master) | trust slots |
| Schema | `<JsonLd>` | one tag per schema, deduped |
| Booking | `<BookingModal>` | singleton in `App.tsx` |
| Sticky mobile CTA | `<StickyCTA>` | hidden on `/contact` and inside the modal |

If a remix needs a new visual element, add a **variant** to an existing component before adding a new component. New components require sign-off from the file-13 owner.

---

## 7. Remix workflow

```text
PHASE 1 — Bind variables
  • {BRAND_NAME}, {BRAND_DOMAIN}, {BRAND_ACCENT_HSL}
  • {SERVICE}, {SERVICE_NOUN}, {SERVICE_PLURAL}, {SERVICE_VERB}, {SERVICE_CATEGORY}
  • {SUB_SERVICES[]} from catalogue
  • {COMMUNITIES[]} from communities_master_v3
  • {TRUST_NUMBERS}, {NAP}

PHASE 2 — Generate copy section-by-section
  • Walk §4 in order. For each section, fill ‖slots‖ using file 09 voice + file 13 operating manual.
  • /areas/{community} [2] uniqueness gate: each intro hashed; collisions auto-fail.

PHASE 3 — Generate code
  • Map slots → components per §6.
  • No new routes, no new sections, no new components without amending this doc.

PHASE 4 — Wire schema
  • Emit per §5.5 table. Validate with rich-results test.

PHASE 5 — Audit
  • Run Pass/Fail (§8) + ripgrep bundle (§9).
  • Family-resemblance compare against the prior sibling site.
  • Sign-off chain (§10).
```

---

## 8. Pass/Fail audit checklist (35 items)

### Structure (8)
1. All 18 routes from §3 render — none 404.
2. No section added, removed, or reordered vs §4.
3. `/areas/{community}` exists for every row in `{COMMUNITIES}`.
4. `/services/{slug}` exists for every row in `{SUB_SERVICES}`.
5. `/brand` has `noindex`; nothing else does.
6. Trailing-slash policy is consistent across all internal links.
7. Breadcrumbs render on every level-2 page.
8. No `/page-2` or numeric-id URLs anywhere.

### Variables (5)
9. No raw service vocabulary from a sibling brand leaks in (e.g. "drywall" on a tiling site).
10. `{TRUST_NUMBERS}` are real values, not placeholders.
11. `{NAP}` matches Organization JSON-LD exactly.
12. `{HERO_IMAGE}` is service-specific, not a generic stock image.
13. `{BRAND_ACCENT_HSL}` is set in tokens, not hard-coded in components.

### Booking (5)
14. Booking modal is mounted exactly once in `App.tsx`.
15. Every CTA in the §5.4 table opens the modal.
16. `prefill.service` is correct on every service-page CTA.
17. Modal lifecycle obeys the Modal Lifecycle memory (no stuck `pointer-events`).
18. Mobile sticky CTA is hidden on `/contact` and inside the open modal.

### Nav + footer (4)
19. Nav order matches §5.1 sequence.
20. Mobile drawer CTA is in safe-area.
21. Footer 3-tier matches §5.2.
22. Nav + footer composition feels like one system (visual review).

### SEO (5)
23. Every `/areas/{community}` intro is unique (hash compare).
24. FAQPage JSON-LD renders on every page with a FAQ section, once.
25. LocalBusiness `areaServed` matches the page's community on `/areas/{community}`.
26. BreadcrumbList renders on level-2 pages.
27. No fabricated AggregateRating.

### Performance + a11y (4)
28. Inherits all file-14 budgets — Lighthouse green on home + 1 service + 1 community page.
29. WCAG 2.2 AA (axe clean) on the same 3 pages.
30. `prefers-reduced-motion` disables hero motion.
31. All CTAs ≥ 48px touch target on 390px viewport.

### Family resemblance (4)
32. Side-by-side with the prior CMB sibling site, the skeleton matches.
33. Section rhythm (vertical padding) matches file 13 spec.
34. Type scale matches file 13 spec.
35. Photography subject matter matches file 08 (no banned subjects, no humans).

---

## 9. Auditor ripgrep bundle

Run from project root. Each pattern that returns hits is a Pass/Fail item.

```bash
# 1. Sibling-brand vocabulary leaks (tune {SERVICE} per site)
rg -n "drywall|painting|garage|basement" src/pages src/components --glob '!**/drywall/**'

# 2. Hard-coded brand accent (must use token)
rg -n "hsl\(28\s+35%" src --glob '!**/index.css' --glob '!**/tailwind.config.ts'

# 3. Booking modal mounted more than once
rg -n "<BookingModal" src

# 4. Routes outside the locked set
rg -n "<Route path=" src/App.tsx

# 5. Section files without breadcrumbs on level-2 pages
rg -L "Breadcrumb" src/pages/{Service*,Area*}.tsx

# 6. FAQPage JSON-LD duplication
rg -n "@type.*FAQPage" src

# 7. Fabricated review count / rating
rg -n "AggregateRating" src

# 8. Banned imagery imports (humans / lifestyle stock)
rg -n "people|family-photo|lifestyle" src/assets

# 9. Inline <script> tags (perf — file 14)
rg -n "<script" index.html src

# 10. Trailing-slash inconsistencies
rg -n "to=\"/[a-z-]+/\"" src
```

---

## 10. Sign-off chain

Extends file 11 + file 14 chains:

```text
Wireframe owner (file 15)        — confirms structure & variables
  → Style guide owner (file 13)  — confirms type / spacing / sections
    → Performance owner (file 14) — confirms budget + design-neutrality
      → SEO owner (file 10)       — confirms schema + uniqueness
        → Voice owner (file 09)   — confirms lexicon + claims
          → Brand lead             — final ship
```

A failure at any tier returns the build to the wireframe owner — never auto-patched downstream.

---

## 11. Change log

- **2026-05-10** — v1.0 initial authority. Locks 18-route page set, 13 page section spines, 5 cross-page systems, 35-item audit, 10-pattern grep bundle, 6-tier sign-off. Designed as the master template for all 150 CMB spin-off sites.
