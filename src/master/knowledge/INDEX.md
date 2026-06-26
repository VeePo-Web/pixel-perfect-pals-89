# Knowledge Index — Master Registry of Embedded Documents

This is the master index of every document embedded into the backend knowledge system.
AI assistants should consult this index first to find which source documents are relevant
to the current request, then read those source documents in full before making decisions.

**Status legend**
- `source-only` — embedded verbatim; partner interpretation document not yet written.
- `partnered`   — both source document and partner interpretation document exist.

---

## Governance (read first) (`governance/`)

Top-level meta documents that govern how every other source + partner document
is embedded, stored, and consulted. P0 — foundational.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/governance/knowledge-system-charter.source.md` | Markdown (verbatim DOCX) | partnered | Master charter: dual-layer rule, folder taxonomy, immutability, partner template, conflict rule, fantasy.co quality bar |
| `partner-documents/governance/source-document-integrity.partner.md` | Markdown (partner) | active | **Integrity gate.** Every source file is byte-for-byte verified via SHA-256 sidecars. Run `npm run verify:sources`. Capture only via `scripts/source-docs/capture-source.mjs` — never paste into the editor. |

---

## Experience Prompts — Cross-Brand Personas (`experience-prompts/`)

Cross-brand expertise personas. Methodology brains that get applied through
the brand-specific layers below. P0 within their topical area.

> **3-mode Backend OS callout:** the Architect (`systems-architect-copilot`), Mapper (`mermaid-systems-mapping-mode`), and Auditor (`systems-audit-mode`) personas form a single unified operating system. Default loop: Architect → Mapper → Auditor → Mapper → Architect. Architect first when *building*, Auditor first when *inspecting*, Mapper first when *visualizing*.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/experience-prompts/seo-virtuoso-persona.source.md` | Markdown (verbatim DOCX) | partnered | 50-year SEO virtuoso persona + 15 core principles + "what not to do" checklist + GEO/AI-search methodology + 5-step working process |
| `source-documents/experience-prompts/seo-faq-optimization-persona.source.md` | Markdown (verbatim DOCX) | partnered | World-class SEO FAQ optimization playbook (8 principles + 10-section process + intent buckets + FAQPage JSON-LD rules + voice/local + performance + monitoring) |
| `source-documents/experience-prompts/master-design-persona-fantasy.source.md` | Markdown (verbatim DOCX) | partnered | Fantasy.co-level master design persona |
| ↳ `source-documents/experience-prompts/master-design-persona-fantasy.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 snapshot of `General_Design_Prompt-2.docx` — adds 3-pillar mission filter (Elevate Human Experience / Embody Brand Truth / Innovate Responsibly), 8-phase methodology, and 15-section "What Not To Do" boundaries report. Canonical v1 remains primary; v2 consulted in addition for methodology, ethics, and quality-bar QA. |
| ↳ `source-documents/experience-prompts/master-design-persona-fantasy.v3.source.md` | Markdown (verbatim DOCX) | provenance-only | v3 snapshot of `General_Design_Prompt-3.docx` — substantively identical to v2. Routing stays on v1 + v2 partners; this entry exists for audit trail only. |
| `source-documents/experience-prompts/anti-gravity-opening-engineer.source.md` | Markdown (verbatim DOCX) | partnered | Anti-gravity opening / cinematic intro engineer persona |
| ↳ `source-documents/experience-prompts/anti-gravity-opening-engineer.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 expanded snapshot from `GENERAL_ANTI_GRAVITY_OPENING_PROMPT-2.docx` — adds 3-pillar mission filter (Elevate / Embody / Innovate), 10-belief value system, 8-phase methodology, 15-section "What Not To Do" boundaries, hard React/Vite/TS/Tailwind frontend constraints, and the mandatory Strategic Input Phase + 6-step pre-code analysis with an Approval Gate. v1 partner remains primary for cinematic-opening choreography; v2 partner is consulted **in addition** for methodology, hygiene, anti-patterns, and pre-code intake. Masters / VeePo translation rules + firewalls (Hero Section Lock, Motion Philosophy, brand tokens, mobile constraints) live in the partner doc. |
| `source-documents/experience-prompts/mermaid-systems-mapping-mode.source.md` | Markdown (verbatim DOCX) | partnered | Mermaid Diagram + Systems Mapping Mode — Mapper agent in the 3-mode OS (Architect / Auditor / Mapper). Verbatim embed of `General_3._OS_and_Backend-Processes_Mermaid_Diagram_Systems_Mapping_Mode_PROMPT-2.docx`. Governs when to externalize systems as Mermaid (flowchart / sequenceDiagram / stateDiagram-v2 / erDiagram / journey / gantt), diagram-pack composition (Workflow / State / Portal / Admin Ops / Full System), naming discipline, exception + bug-revelation rules, paired-diagram comparison, 9-section output standard, and Architect↔Mapper↔Auditor handoff protocol. Backend-only intelligence layer; never renders in live UI by default. Masters / VeePo firewall (strip non-automotive vocabulary, honor locked memories: Booking Funnel / Modal Lifecycle / Loading Sequence / Hero Section Lock / Booking Submission Animation) lives in the partner doc. **Keywords:** mermaid, diagram, systems mapping, flowchart, state diagram, ER, sequence, journey, workflow, audit, architecture visualization, lifecycle, handoff, exception map. |
| `source-documents/experience-prompts/systems-architect-copilot.source.md` | Markdown (verbatim DOCX) | partnered | Elite Systems & Operations Architect Copilot — **Architect** agent in the 3-mode OS (Architect / Mapper / Auditor). Verbatim embed of `General_1._OS_and_Backend-Processes_PROMPT-2.docx`. Governs the 10-layer system-design lens, 20-object default atom set (Workspace, User, Role, Account, Project, Task, Checklist, Request, Approval, Asset, Comment, Dependency, Milestone, Change Request, Invoice, Contract, Notification, Audit Event, Template), default status vocabulary + Blocked-output contract, approval-gate vocabulary, admin-vs-external portal split rule, checklist & action-system rules, request/inbox triage logic, permissions + automation rules, UX rules for process-heavy software, and 6 deliverable templates (System Architecture Plan / Workflow Breakdown / Process Audit / Object Model Draft / Checklist & Portal Action Design / Mermaid Diagrams). Mantra: *Maximum organization, minimum friction, minimum admin overhead.* Backend-only; deliverables live in chat / .md plans / .mmd diagrams. Masters / VeePo firewall (strip non-automotive vocabulary, rename objects to Studio/Customer/Concierge/Technician/Booking/Service Step/Photo Asset/Detail Phase, honor locked memories as immutable inputs, surface memory-conflicts rather than silently overriding, brand-token + UI Strict firewall, no-portal-yet caveat, zero-hallucination on unknown data) lives in the partner doc. **Keywords:** systems architect, operations, workflow design, object model, state machine, permissions, automation, approval gates, admin dashboard, client portal, triage, checklist, scale-ready, deliverables, SOP, intake, handoff, dependency, blocker, source of truth. |
| `source-documents/experience-prompts/systems-audit-mode.source.md` | Markdown (verbatim DOCX) | partnered | Systems Audit Mode — Auditor agent in the 3-mode OS (Architect / Mapper / Auditor). Verbatim embed of `General_2._OS_and_Backend-Processes_AUDIT_SPECIALIST_PROMPT-2.docx`. Governs deep diagnostic / failure-point / scale-readiness pressure-testing across 10 audit layers (Business Logic, Object Model, State Model, Workflow, Permissions, UI/UX, Operator Burden, Exception/Failure, Scalability, Traceability), 7 sub-modes (Flow / State / Portal UX / Operator Load / Data-Object / Scale-Stress / Edge Case), Bug Classification (Critical/High/Medium/Low + 11 type tags), 20 primary audit questions, mandatory failure-mode detection checklist, 9-section output standard (Executive Diagnosis → Next Actions), and the Mermaid Audit Requirement (pair with Mapper for visual evidence). Backend-only intelligence layer; audits live in chat / planning docs / `.mmd` artifacts, never silent UI changes. Masters / VeePo firewall (strip non-automotive vocabulary, honor locked memories as ground truth, surface memory-conflicts rather than silently propose violations, brand-token firewall, UI Strict honored, mobile constraints respected, no-portal-yet caveat) lives in the partner doc. **Keywords:** audit, diagnostic, pressure-test, stress-test, failure mode, edge case, scale, fragility, permissions, state model, operator burden, traceability, bug classification, conversion leak, false simplicity. |
| `partner-documents/experience-prompts/template-architect-persona.partner.md` | Markdown (partner-only brief) | partner-only | **Template Architect** — Mode-OS persona that operationalizes the Cochrane Universal Website Template Wireframe Plan. Composes the structural axis (wireframe), content/style axis (v1.0–v10.0 joined on `Master Row`), and geographic axis (`communities_master_v3` joined on `Community`) into a per-site spec for any of the 115 Cochrane spin-off domains. Owns: per-site spec output contract (Identity Card → Master Message → Sitemap → Navigation → Homepage → Service Pages → Pricing → Process → Areas → Per-Community Page → Contact → FAQ → Schema Bundle → Performance Budget → Voice Box → Family-Resemblance Audit Hooks), service-category overlays, automotive firewall enforcement, hand-off protocol to Mapper + Auditor. Brand scope: **Cochrane Master Builders only** — does NOT touch the live VeePo / Masters Detailing front end. **Keywords:** template architect, scaffold the [service] site, build the spec for [domain], per-site spec, universal template applied to, areas-we-serve page for, schema bundle for, family resemblance, structural spine, fantasy.co studio, IA, page architecture, conversion choreography, local-service brand, multi-site spec, Cochrane spin-off. |
| `partner-documents/experience-prompts/master-style-guide-architect-persona.partner.md` | Markdown (partner-only brief) | partner-only | **Master Style Guide Architect** — Mode-OS persona that owns the **Style Axis** (sibling to Template Architect / Master Copywriter / Communities Mapper). Generates 18+ section style guides that are deeper, more premium, and more consistent than competitor references. Hard NOs: copying any token, voice line, or value from `_external-references/`. Required sections add Cross-Site Consistency Matrix, Variable-Driven Theming, and Brand Anchor Enforcement on top of the standard 15. Pairs with Auditor for banned-token / voice / contrast checks and Mermaid Mapper for token-flow diagrams. Brand scope: **Cochrane Master Builders only**; firewalled from VeePo. **Keywords:** style guide, design tokens, HSL palette, semantic tokens, typography scale, spacing scale, components spec, motion philosophy, accessibility budget, performance budget, cross-site consistency, variable-driven theming, brand anchor enforcement, audit checks, premium editorial, heritage accent. |

---

## Animations & Motion (`animations/`)

Function-scoped technical playbooks for motion, scroll mechanics, and performance-disciplined
animation. Brand-agnostic; brand personality is layered on via brand-specific motion memories
and partner docs.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/animations/premium-scroll-animation-persona.source.md` | Markdown (verbatim DOCX) | partnered | Master scroll-craftsperson persona + Lenis + GSAP playbook (config, ScrollTrigger integration triad, Igloo case study, 5-phase implementation plan, performance + accessibility rules) |

---

## Brand Identity — Cross-Brand Foundations (`brand-identity/`)

Cross-brand brand-identity / experience-philosophy methodology. Cochrane Master
Builders (and any brand-specific identity docs under `brands/<slug>/brand-identity/`)
always wins on aesthetics, palette, voice, and iconography. These cross-brand
sources govern *how* identity work is reasoned about (manifesto + behaviours,
recurring motif systems, narrative flow, scannable hierarchy, motion timing,
8-phase delivery cadence). Subject-matter content from any source whose primary
context is unrelated to the active brand is FIREWALLED — see partner docs.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brand-identity/brand-identity-architect.source.md` | Markdown (verbatim DOCX) | partnered | Brand Identity Architect persona — cross-brand identity-system authoring methodology |
| ↳ `source-documents/brand-identity/brand-identity-architect.v2.source.md` | Markdown (verbatim DOCX) | partnered | v2 expanded operating-system snapshot from `GENERAL_BRAND_IDENTITY_PROMPT-2.docx` — adds Brand Spine, Brand Truth Table, defensible-premium "proof mechanics", conflict-resolution hierarchy, taboo-language + visual anti-pattern guardrails, and the required 12-section "Brand Identity North Star — [Company]" deliverable format. v1 partner remains primary routing; v2 partner is consulted **in addition** for these deeper mechanics. Masters / VeePo translation rules + firewalls live in the partner doc. |
| ↳ `source-documents/brand-identity/brand-identity-architect.v3.source.md` | Markdown (verbatim user paste, 2026-05-10) | partnered | v3 — explicit `Customer truth + category reality → founder truth → operational constraints → visual taste` ordering, named 9-step method, named 12-section "Brand Identity North Star — [Company]" output contract. CMB-scoped operating notes in the v3 partner doc; routes to the v2.0 authority set under `brands/cochrane-master-builders/brand-identity/v2/`. |
| `source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md` | Markdown (verbatim DOCX) | partnered | Colours & Shapes experience philosophy (v1) — cross-brand canonical reference for narrative-driven, story-led experience design |
| ↳ `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.source.md` | Markdown (verbatim DOCX) | partnered (firewalled) | v2 — Christian-centered UI/UX playbook from `General_CHRISTIAN_Colours_and_shapes_PROMPT-2.docx`. **BACKEND-ONLY.** Partner doc extracts the transferable craft layer (manifesto + behaviours, recurring motif, narrative flow, 8-phase delivery, motion under 300 ms, accessibility/performance/security as trust) and **firewalls** all liturgical / scripture / iconography / persona content from front-end output. v1 remains primary routing; v2 consulted in addition for craft-layer prompts only. |
| ↳ `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md` | Markdown (verbatim DOCX) | partnered (provenance-only) | v3 — audit/provenance snapshot from `General_CHRISTIAN_Colours_and_shapes_PROMPT-3.docx`. **Substantively identical to v2.** Embedded for audit trail only. v3 partner explicitly forbids routing decisions here — all design/UX/brand prompts continue to route to v1 + v2. Same firewall as v2 applies. |

---

## Messaging — Copy, Narrative, Voice (`messaging/`)

Methodology brains for copywriting and brand storytelling. Govern wording only —
never visual design. Always paired with the active brand's voice/identity layer.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/messaging/round-two-copywrite-storytelling-persona.source.md` | Markdown (verbatim DOCX) | partnered | Master storyteller / brand strategist persona for page-by-page, section-by-section copy refinement (narrative backbone, voice & tone, emotional resonance, inclusive storytelling, advanced techniques, governance) — design strictly untouched |

---

## SEO — Image, Local & Sub-Specialty Personas (`seo/`)

Function-scoped SEO sub-specialty playbooks. The general SEO virtuoso and FAQ
SEO personas remain canonical under `experience-prompts/`; this shelf holds
deeper sub-specialty embeds (image SEO, local visibility, future: technical
SEO, programmatic SEO, etc.). All entries enforce the source's hard rule:
**do not change desktop design, layout, or visual hierarchy.**

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/seo/image-seo-local-visibility-persona.source.md` | Markdown (verbatim DOCX) | partnered | Image SEO + Local Visibility Specialist persona — page→section→image audit format, alt-text rules, filenames, formats/compression, responsive + lazy, ImageObject + image sitemap, CDN/caching, local schema + GBP, OG/Twitter, pitfalls, tooling, future trends, 14-step implementation framework |

---

## Navigation — Wayfinding & Sitewide Nav Systems (`navigation/`)

Function-scoped playbooks for navbars, footer-nav coherence, mobile menus,
dropdowns, breadcrumbs, ARIA, keyboard maps, and scroll-driven nav behaviour.
Binding rules from the source: **never write a "no changes needed" nav
plan**, **navigation must be sitewide consistent**, and **nav + footer must
read as one composition** (the "Easter egg" coincidence).

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/navigation/navigation-architect-persona.source.md` | Markdown (verbatim DOCX) | partnered | Navigation Architect persona — 8-step process (Discovery→IA→Responsive→Visual→Accessibility→Personalization→Testing→Documentation) + 10-step implementation plan + principles (Hick's/Fitts's/Serial Position) + patterns (mega/drop/hamburger/bottom/full-screen/sidebar/search) + 7 what-if concepts + tone & voice. Always-propose-a-refinement rule. Nav↔footer Easter-egg coherence. |
| ↳ `source-documents/navigation/navigation-architect-persona.v3.source.md` | Markdown (verbatim DOCX) | provenance-only | v3 snapshot of `-3.docx` upload — substantively identical to canonical v2. Routing stays on the v2 partner; this entry exists for audit trail only. |

---

## Footer — End-of-Scroll Surface & Nav Coherence (`footer/`)

Function-scoped playbooks for footer IA, signature brand moments, footer-only
SEO + LocalBusiness schema, governance/QA, and the binding "footer ↔ scrolled
navbar must read as one composition" mandate. Hard binding rule from the
source: **never alter anything outside the footer as a side-effect of footer
work** (no nav, copy, layout, tokens, or motion changes). Brand-specific
Cochrane Master Builders docs win on aesthetics/voice; these footer sources
win on structure, governance, and anti-pattern discipline.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/footer/footer-architect.source.md` | Markdown (verbatim DOCX) | partnered | Footer Architect persona (canonical v2) — bespoke footer craft, 4-discipline framing (brand / UX / perf / SEO), Lovable.dev workflow, jobs-to-be-done IA, signature brand moment, governance. Primary routing target. |
| ↳ `source-documents/footer/footer-architect.v3.source.md` | Markdown (verbatim DOCX) | partnered | v3 snapshot of `General_FOOTER_Prompt-3.docx`. Adds: Required 9-section Output (Objective Map → IA → Layout → Bespoke Brand Layer → Trust & Compliance → Footer-only SEO → Perf+a11y hardening → 15+ anti-patterns → QA Plan), Absolute Constraints, full "World-Class Custom Footers" reference report (sections 1–12 + future trends + 13 anti-patterns), and Final Directive scoping footer-first then nav-second as one bespoke composition. Consulted alongside v2 for structured deliverables, governance/QA gating, brand-moment scaffolding, and the footer↔scrolled-nav coherence mandate. |

---

## Performance & Speed (`performance/`)

Function-scoped technical playbooks for Core Web Vitals, asset/bundle/network
optimization, React 18 concurrency, and Vite-specific tuning. Hard binding
rule from the source: **never alter design, layout, motion, copy, or
hierarchy as a side-effect of performance work.** All perf moves must route
through the project's design memories (Hero Section Lock, Motion Philosophy,
Loading Sequence, Cloth Wipe, Parallax Coverage Specs, Booking Modal
Architecture, etc.) before shipping.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/performance/react-vite-performance-engineer-persona.source.md` | Markdown (verbatim DOCX) | partnered | World-class React 18 + Vite performance engineer persona — 11-section playbook (perf-first mindset, asset optimization, minify/compress/bundle, critical render path, network/protocols, caching, React concurrency + memoization + SSR/RSC, Vite-specific tuning, third-party hygiene, monitor/iterate, emerging trends) + binding "no design changes" rule. LCP ≤ 2.5s / INP ≤ 200ms / CLS < 0.1 targets. |

---

## Mobile & Responsive Wrapping (`mobile/`)

Function-scoped playbooks for mobile + tablet adaptation, breakpoints, touch
ergonomics, mobile navigation patterns, art-direction crops, and "One Web"
content prioritization. Hard binding rule from the source: **desktop design
is frozen — mobile work must never alter the desktop experience.** Every
mobile change is page-by-page, section-by-section, routes through the
project's design memories (Hero Section Lock, Booking Modal Architecture,
Mobile Optimization, Typography Legibility, Navigation Specs, etc.) and
pairs with the Performance Engineer partner doc.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/mobile/mobile-wrapping-responsive-persona.source.md` | Markdown (verbatim DOCX) | partnered | 50-year Fantasy/R-GA/Frog/ustwo/Huge responsive design visionary persona — One Web philosophy, content prioritization, mobile nav patterns, fluid type, art direction (srcset + sizes + AVIF/WebP), 4G perf budget, micro-interactions, breakpoint strategy (320–375 / 480–600 / 768–1024 / 1280+), container queries, WCAG, QA matrix + binding "desktop untouched" rule. |

---

## Cochrane Master Builders Corp. (`brands/cochrane-master-builders/`)

Brand slug: `cochrane-master-builders`
Brand context: Custom home builder / construction company. Cochrane, Alberta + Rocky View
County + Calgary CMA adjacency. Brand promise: *"Strong Foundations For Those Who Come
After Us."* Family-legacy / generational-craft positioning.

### Strategy

> **Foundational structural spine:** the **Universal Website Template Wireframe Plan** (`universal_website_template_wireframe_plan.pdf` + `.source.md` + partner doc) is the **structural axis** every Cochrane spin-off site filters through. The v1.0–v10.0 paired set is the **content / style axis** (joined on `Master Row`); `service-areas/communities_master_v3` is the **geographic axis** (joined on `Community`); the wireframe defines the **page architecture, section order, navigation, schema bundle, and performance budget** every site is rendered into. Reconcile every spin-off scaffolding decision against the wireframe partner doc + brand-identity 1.2.1 / 1.2.2 + UX 1.3.1 BEFORE applying the per-site v1.0–v10.0 attributes. The Template Architect persona (`experience-prompts/template-architect-persona.partner.md`) is the Mode-OS operator that composes all three axes into a per-site spec.

> **Family-of-sites callout:** the v1.0 Master Plan (`.xlsm`), v2.0 Services & Pricing (`.xlsx`), v4.0 Ideal Customer Brain (`.xlsx`), v5.0 Color + UX Direction (`.xlsx`), v6.0 UX Experience (`.xlsx`), v7.0 Performance Audit Specs (`.xlsx`), v9.0 Theme Layout / Bespoke UX Components (`.xlsx`, supersedes v8.0), and v10.0 UX Theme Style Guides (`.xlsx`) are a **paired set of eight, joined on `Master Row`**, and must always be consulted **together** when building a new Cochrane spin-off site. v1.0 supplies *positioning + SEO + linking + launch phase*; v2.0 supplies *services offered + mid-high CAD price ranges + compliance guardrails*; v4.0 supplies *per-site Ideal Customer narrative — voice, emotional drivers, fears, language*; v5.0 supplies *per-site palette + visual mood + UX rationale*; v6.0 supplies *per-site UX experience theme + experience strategy — pacing, motion temperament, interaction feel, emotional arc*; v7.0 supplies *per-site performance posture + Core Web Vitals audit spec — speed, weight, asset/render strategy, mobile-first plan*; v9.0 supplies *per-site theme layout + bespoke UX components + perf-aware build notes — page architecture, signature modules, IA scaffolding, cluster-level family resemblance*; v10.0 supplies *per-site UX theme style guide — brand feel, mood, surface treatment, motif language, typographic posture, component tone*. Live `.ca` availability is NOT verified in any of the eight sheets — always WHOIS-check before recommending purchase. Drift in `Recommended Domain` between any two of the eight files for the same `Master Row` = Sync Discrepancy.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/strategy/1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.pdf` | PDF | source-only | Top-level strategic business + SEO + UX report (v1.0) |
| `source-documents/brands/cochrane-master-builders/strategy/1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.pdf` | PDF | source-only | Strategic business + SEO + UX report (v1.2 iteration) |
| `source-documents/brands/cochrane-master-builders/strategy/1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.pdf` | PDF | source-only | Backend strategy / design / SEO / legacy report (v1.3) |
| `source-documents/brands/cochrane-master-builders/strategy/1.0_cochrane_masters_UPGRADED_SEO_Master_Plan_family_legacy_column.xlsm` | XLSM (binary, verbatim) | source-only | **Canonical family-of-sites master plan.** 6 sheets: Audit Summary, Master Tracker (116 rows × 24 cols of every planned site), Service Clusters (21), Hub SEO Map (anchor-text architecture), Domain Rules (`Cochrane + Service + Masters + .ca`), Launch Roadmap (phased rollout). |
| `source-documents/brands/cochrane-master-builders/strategy/1.0_cochrane_masters_UPGRADED_SEO_Master_Plan_family_legacy_column.source.md` | Markdown (verbatim mirror of .xlsm) | partnered | 1:1 textual mirror of the .xlsm so non-Excel tools can consult it. **Keywords:** family of sites, spin-off, sister site, new service site, domain pattern, hub and spoke, internal linking, anchor text, cluster, launch phase, P0/P1/P2, master tracker, Cochrane domain, remix base, multi-site SEO, family legacy column. |
| `source-documents/brands/cochrane-master-builders/strategy/2.0_cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical services + pricing companion** to the v1.0 Master Plan. 1 sheet `Services & Pricing` (116 rows × 6 cols): `Master Row` (join key), `Recommended Domain`, `Website / Brand`, `Cluster`, `Detailed Services & Mid-High Pricing (CAD)`, `Pricing Notes / Compliance Guardrails`. |
| `source-documents/brands/cochrane-master-builders/strategy/2.0_cochrane_masters_all_115_services_pricing_EXPANDED_AUDITED.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 Master Plan on `Master Row`. **Keywords:** pricing, price, cost, CAD, ranges, quote, estimate, services list, service catalog, compliance, guardrails, disclaimer, scope, typical job size, lead qualification, cluster, join key, Master Row, audited snapshot, mid-high, "from $", indicative pricing. |
| `source-documents/brands/cochrane-master-builders/strategy/4.0_cochrane_masters_all_115_ideal_customer_brain.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site ICP brain companion** to v1.0 + v2.0. 1 sheet `Ideal Customers` (116 rows × 3 cols): `Master Row` (join key), `Recommended Domain`, `Ideal Customer Description` (long-form WHO/WANTS/FEARS narrative per site). |
| `source-documents/brands/cochrane-master-builders/strategy/4.0_cochrane_masters_all_115_ideal_customer_brain.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 on `Master Row`. Voice + emotion + intent leg of the remix tripod. **Keywords:** ICP, ideal customer, target buyer, persona, voice, tone, hero copy, headline, subhead, microcopy, CTA wording, trust language, fear reversal, objection handling, value prop, audience, segment, "who they are", buyer intent, per-site persona, narrative, emotional driver, pain point. |
| `source-documents/brands/cochrane-master-builders/strategy/5.0_cochrane_masters_all_115_color_ux_suggestions.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site color + UX direction companion** to v1.0 + v2.0 + v4.0. 1 sheet `Color UX Suggestions` (116 rows × 3 cols): `Master Row` (join key), `Recommended Domain`, `Color Description Suggestions & UX Rationale` (per-site theme, color grouping, mood, UX reasoning). |
| `source-documents/brands/cochrane-master-builders/strategy/5.0_cochrane_masters_all_115_color_ux_suggestions.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 + v4.0 on `Master Row`. Color + feel leg of the remix tetrapod. **Keywords:** color, palette, hex, HSL, tokens, theme, mood, vibe, accent, primary color, background, surface, dark/light treatment, art direction, tonal, gradient, texture, material feel, per-site styling, visual direction, brand colors. |
| `source-documents/brands/cochrane-master-builders/strategy/6.0_cochrane_masters_all_115_ux_experience.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site UX experience companion** to v1.0 + v2.0 + v4.0 + v5.0. 1 sheet `UX Experience` (116 rows × 3 cols): `Master Row` (join key), `Recommended Domain`, `UX Experience For Each One` (per-site UX Experience Theme + Experience Strategy — pacing, motion temperament, trust-building rhythm). |
| `source-documents/brands/cochrane-master-builders/strategy/6.0_cochrane_masters_all_115_ux_experience.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 + v4.0 + v5.0 on `Master Row`. Interaction-temperament leg of the remix pentapod. **Keywords:** UX, experience, feel, vibe, pacing, rhythm, motion temperament, interaction style, scroll behavior, hover personality, transitions, micro-interactions, density, breathing room, section ordering, emotional arc, trust pacing, calm control, confident craft, quiet authority, "how should this site feel". |
| `source-documents/brands/cochrane-master-builders/strategy/7.0_cochrane_masters_all_115_performance_audit_specs.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site performance audit spec companion** to v1.0 + v2.0 + v4.0 + v5.0 + v6.0. 1 sheet `Performance Specs` (116 rows × 3 cols): `Master Row` (join key), `Recommended Domain`, `Performance Audit Spec Write-Up / Specific Optimization` (per-site posture + CWV targets + asset/render/mobile plan). |
| `source-documents/brands/cochrane-master-builders/strategy/7.0_cochrane_masters_all_115_performance_audit_specs.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 + v4.0 + v5.0 + v6.0 on `Master Row`. Speed/weight/CWV leg of the remix hexapod. Reconcile with the cross-brand React/Vite Performance Engineer persona before shipping any actual budget or config. **Keywords:** performance, speed, Core Web Vitals, CWV, LCP, INP, CLS, TTFB, page weight, bundle size, image optimization, AVIF, WebP, lazy load, font loading, hydration, third-party scripts, render blocking, perf budget, audit, lighthouse, mobile speed, 4G, network-aware, perf checklist, trust + speed. |
| `source-documents/brands/cochrane-master-builders/strategy/9.0_cochrane_masters_all_115_theme_layout_ux_specs.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site theme layout + bespoke UX components companion** to v1.0 + v2.0 + v4.0 + v5.0 + v6.0 + v7.0 (supersedes v8.0; byte-identical payload re-numbered). 1 sheet `Theme Layout Specs` (116 rows × 5 cols): `Master Row` (join key), `Recommended Domain`, `Website / Brand`, `Cluster`, `Theme Layout Suggestion / Bespoke UX Components / Performance Optimization` (per-site page architecture + signature modules + perf-aware build notes). |
| `source-documents/brands/cochrane-master-builders/strategy/9.0_cochrane_masters_all_115_theme_layout_ux_specs.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 + v4.0 + v5.0 + v6.0 + v7.0 on `Master Row`. Page-architecture + bespoke-component leg of the remix family. Reconcile against Navigation Architect, Footer Architect, v6.0 temperament, and v7.0 perf budget before shipping any actual component. **Keywords:** theme, layout, page architecture, section order, section list, sitemap of page, hero layout, trust block, conversion block, bespoke component, custom component, signature module, calculator, configurator, comparator, ecosystem map, IA, white space, hierarchy, build recipe, cluster scaffolding, "what sections does this site have," "what's the layout." |
| `source-documents/brands/cochrane-master-builders/strategy/10.0_cochrane_masters_all_115_ux_theme_style_guides.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical per-site UX theme style guide companion** to v1.0 + v2.0 + v4.0 + v5.0 + v6.0 + v7.0 + v9.0. 1 sheet `UX Theme Style Guides` (116 rows × 5 cols): `Master Row` (join key), `Recommended Domain`, `Website / Brand`, `Cluster`, `UX Theme Style Guide` (per-site brand feel + mood + surface treatment + motif language + component tone). |
| `source-documents/brands/cochrane-master-builders/strategy/10.0_cochrane_masters_all_115_ux_theme_style_guides.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Joins to v1.0 + v2.0 + v4.0 + v5.0 + v6.0 + v7.0 + v9.0 on `Master Row`. Brand-feel + surface-treatment + component-tone leg of the remix family. Reconcile against Cochrane brand-identity (1.2.1, 1.2.2), Cochrane UX (1.3.1), v5.0 palette, v6.0 temperament, and v9.0 layout before shipping any actual style decision. **Keywords:** style guide, theme style, brand feel, look-and-feel, mood, vibe, surface treatment, paper vs matte, grain, tonal warmth, motif, frame language, photography crop, typographic posture, component tone, hover quietness, "how should this site feel," "how should this site look." |
| `source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.pdf` | PDF (binary, verbatim) | source-only | **FOUNDATIONAL — Universal Website Template Wireframe Plan.** Structural spine for every Cochrane spin-off site. Defines page architecture, URL structure, navigation (desktop / mega menu / mobile / sticky CTA), homepage section order (Trust Bar → Hero → Trust Strip → Services Grid → Pricing Preview → Process → Family Legacy → Project Proof → Areas We Serve → FAQ → Final CTA → Footer), service / pricing / process / areas / contact / FAQ / project page templates, reusable section library, service-category overlays (Custom Homes / Renovations / Roofing / Concrete / HVAC / Repairs / etc.), schema bundle (Organization / LocalBusiness / ContactPoint / BreadcrumbList / FAQPage / Review), performance optimization requirements, mobile layouts, voice & vocabulary use/avoid lists, and the "Strong Foundations For Those Who Come After Us" master message. |
| `source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.source.md` | Markdown (verbatim mirror of .pdf via `pdftotext -layout`) | partnered | 1:1 textual mirror so non-PDF tools can consult the same content. Foundational structural spine — composes with v1.0–v10.0 (content / style axis joined on `Master Row`) and `communities_master_v3` (geographic axis joined on `Community`) to produce per-site specs. Operationalized by the **Template Architect** persona (`experience-prompts/template-architect-persona.partner.md`). **Keywords:** wireframe, universal template, page architecture, sitemap, URL structure, route plan, homepage sections, hero section, trust bar, services grid, pricing preview, our process, family legacy block, project proof, areas we serve, FAQ accordion, final CTA, footer structure, navbar, mega menu, mobile drawer, sticky CTA, contact form, multi-step form, service detail template, area landing page, community page, service category overlay, custom homes, renovations, roofing, concrete, HVAC, repairs, schema bundle, LocalBusiness, FAQPage, BreadcrumbList, performance budget, Core Web Vitals, voice and vocabulary, master message, "Strong Foundations For Those Who Come After Us," scaffold a site, build the spec for, per-site spec, structural axis. |
| `source-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.pdf` | PDF (binary, verbatim) | source-only | **Process Page Style Guide Template + Service-Specific How-To.** Page-specific brief for the Process page across all 115 spin-off sites. Anti-Gravity process UX. 15-section master order, 8-step universal timeline, 9 service-category overlays (Roofing / Bath-Kitchen / Basement / Concrete / Decks / Flooring / HVAC / Commercial / Handyman), service process config schema, SEO template, microcopy system, 15-point QA gate, performance + accessibility requirements. Master message echo: "Strong Foundations For Those Who Come After Us." |
| `source-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.source.md` | Markdown (verbatim mirror of .pdf via `pdftotext -layout`) | partnered | 1:1 textual mirror of the Process Page guide so non-PDF tools can consult it. Process-page leg of the Style Axis. Owned by the Master Style Guide Architect; operationalized via the Process Page Sub-Style-Guide v1.0 partner doc. **Keywords:** process page, our process, how it works, "what happens next," anti-gravity process, process timeline, scope review, price drivers, what affects price, what affects timeline, home protection, change handling, communication standard, process FAQ, fast answer block, process hero, trust bar, family-owned process, service-specific process, roofing process, bathroom renovation process, basement suite process, concrete process, deck process, flooring process, HVAC process, commercial tenant improvement process, handyman repairs process, process page SEO, FAQPage schema, ProcessHero, FastAnswerBlock, ProcessTimeline, WhatWeNeedChecklist, PriceTimelineDrivers, HomeProtectionGrid, ServiceSpecificProcess, ProcessProofCards, ProcessFAQ, FinalCTA, performance budget process page, audit process page. |
| `partner-documents/brands/cochrane-master-builders/strategy/process_page_style_guide_template_and_service_specific_how_to.partner.md` | Markdown (partner-only brief) | partner-only | Anchors the Process Page leg of the Style Axis. Routes work to Style Architect, Master Copywriter, SEO Virtuoso/FAQ, Performance Engineer, Mobile Wrapping, Premium Scroll, Mermaid Mapper, and Auditor. Mandates master-message echo, banned-word list, 5-step hand-off, and points to the Process Page Sub-Style-Guide v1.0 as the authored deliverable. |
| `source-documents/brands/cochrane-master-builders/strategy/homepage_service_page_style_guide_template_and_how_to.source.md` | Markdown (verbatim user upload) | partnered | **CMB Homepage + Service Page Style Guide Template + How-To.** Authored CMB asset (NOT external). 12 homepage blocks, 12 service-page blocks, 9-cluster cheat-sheet (Roofing/Bath/Basement/Concrete/Decks/Flooring/Mechanical/Commercial/Handyman), 10-step bespoke-domain workflow, shared-component spec, Lovable/React implementation guidance, 10-point Homepage QA, 13-point Service-Page QA. Master line: "Strong Foundations For Those Who Come After Us." |
| `partner-documents/brands/cochrane-master-builders/strategy/homepage_service_page_style_guide_template_and_how_to.partner.md` | Markdown (partner-only brief) | partner-only | Anchors the Homepage + Service Page legs of the Style Axis (sibling to the Process Page leg). Routes to Brand Identity Architect v3, Master Style Guide Architect, Master Copywriter, Template Architect, SEO + FAQ, Performance Engineer, Mobile Wrapping, Navigation Architect, Footer Architect, Auditor, Mermaid Mapper. Encodes the locked block orders, the 9-cluster cheat-sheet, and the QA gates. |

### SEO & Market Research

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md` | Markdown | source-only | Market + competitor + normal SEO + AI SEO research (v1.1) |

### Brand Identity

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/brand-identity/1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.pdf` | PDF | source-only | Family Legacy Standard (brand-identity v1.2.1) |
| `source-documents/brands/cochrane-master-builders/brand-identity/1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.pdf` | PDF | source-only | "Foundations For Generations After Us" report (v1.2.2) |
| `partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md` | Markdown (partner-only brief) | **superseded by v2.0** | **Cochrane Master Builders Style Guide v1.0 — Style Axis.** Frozen for provenance. All Style Axis edits land on v2.0 (`brand-identity/v2/`). 18-section authored guide (Brand Foundations → Design Philosophy → Color → Typography → Spacing → Grid → Imagery → Components → Motion → Forms → Voice → Accessibility → Performance → SEO → Cross-Site Consistency Matrix → Variable-Driven Theming → Brand Anchor Enforcement → Governance + Token Quick Reference). HSL semantic tokens (stone / graphite / heritage). Locks pairing Space Grotesk + Jost. Joins with Wireframe (Structural), Copywriting Plan (Copy), and `communities_master_v3` (Geographic). Every section ends with a Pass/Fail audit check. Owned by Master Style Guide Architect persona. **Firewall:** zero tokens, copy, or voice inherited from any external reference. |
| `partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_process_page_style_guide_v1.partner.md` | Markdown (partner-only brief) | partner-only (re-parented under v2.0) | **Process Page Sub-Style-Guide v1.0** — page-specific child (now under MSG v2.0). 18 sections, each ending with Pass/Fail audit. 15-section Master Order, 9 service-category overlays, Service Process Config schema, SEO + JSON-LD, Variable-Driven Theming (`--process-accent`), Performance Audit (LCP ≤ 1.8s / CLS ≤ 0.02 / INP ≤ 150ms / JS ≤ 140kb gz + 17 grep bundle + Lighthouse ≥ 95). |

### Brand Identity v2.0 — Royal-Mechanical-grade Authority Set (`brand-identity/v2/`)

Supersedes v1.0. 12 specialist authority files; each ends with Pass/Fail audit. Owned by Brand Identity Architect (v3) + Master Style Guide Architect + Master Copywriter + SEO + Performance Engineer + Auditor.

| File | One-line label |
|------|----------------|
| `brand-identity/v2/00_master_style_guide_v2_overview.partner.md` | Composition map, Brand Spine summary, v1→v2 migration, change-log. |
| `brand-identity/v2/01_brand_identity_north_star.partner.md` | Full 12-section North Star Report (Truth Table → What Not To Do). |
| `brand-identity/v2/02_design_philosophy.partner.md` | 3-value decision filter (Old-School Accountability / Modern Clarity / Family Legacy) + reveal timing. |
| `brand-identity/v2/03_color_authority.partner.md` | Full HSL token system + contrast matrix + per-cluster overlays. |
| `brand-identity/v2/04_typography_authority.partner.md` | Space Grotesk + Jost, 9-step modular scale, numerals, banned families. |
| `brand-identity/v2/05_spacing_grid_layout.partner.md` | 4–128 px scale, 4/8/12 grid, section rhythm, page section budgets. |
| `brand-identity/v2/06_components_authority.partner.md` | Component contracts: Hero, Cards, Buttons, Forms, Pricing, Accordions, Proof Cards, Mega-Menu, Sticky Mobile Bar. |
| `brand-identity/v2/07_motion_scroll_authority.partner.md` | Duration/easing tokens, allowed properties, reduced-motion, banned patterns. |
| `brand-identity/v2/08_imagery_photography.partner.md` | Allowed/banned subjects, per-cluster main visual object, Honest Proof Framework. |
| `brand-identity/v2/09_voice_messaging_lexicon.partner.md` | Voice formula, 5 messaging pillars, banned-word table, claims governance. |
| `brand-identity/v2/10_seo_schema_local.partner.md` | Title/meta templates, JSON-LD blueprints, geographic-axis join, internal-link bundle. |
| `brand-identity/v2/11_performance_accessibility_governance.partner.md` | Hard perf budget, axe gates, **18-item Auditor grep bundle**, 5-question decision filter, 8-step sign-off chain. |
| `brand-identity/v2/12_landing_page_style_guide_persona.partner.md` | **Landing-page visual-experience persona** — embeds `Colours & Shapes Experience Philosophy v3` byte-for-byte (source: `source-documents/brands/cochrane-master-builders/brand-identity/landing-page-style-guide-persona.source.md`) as the official CMB landing-page persona. Conflict order locked. |
| `brand-identity/v2/13_landing_page_operating_manual.partner.md` | **Landing-page operating manual** — translates persona (12) into concrete decisions: full modular type scale (clamp tokens, line-height, max-measure), 8pt spacing system + per-archetype padding tables, 11-archetype section playbook with ASCII diagrams + locked composition order, 15 decision rules, 3 worked examples (service hub / process / service-area), 25-item Pass/Fail audit, 10-item ripgrep bundle, L1–L3 sign-off gates extending the 8-step chain in `11`. Governs typography, spacing, and section layout for every CMB landing page. |
| `brand-identity/v2/14_performance_decision_routing.partner.md` | **Performance-only decision router (design-neutral).** Embeds `react-vite-performance-engineer-persona` byte-for-byte under CMB scope (source: `source-documents/brands/cochrane-master-builders/performance/react-vite-performance-engineer-persona.source.md`). Tighter premium CWV floors (LCP <2.0s, CLS <0.02, INP <150ms), per-route payload caps, allow/conditional/deny matrices for images/fonts/JS/CSS/animations/third-parties, design-neutrality clause that auto-rejects design-altering "optimisations", build-time + runtime gates, 25-item audit, 10-pattern ripgrep bundle, escalation chain that routes design conflicts back to file 13. |
| `brand-identity/v2/15_universal_template_wireframe.partner.md` | **Master template wireframe (CMB universal).** Locked 18-route page set (Home / Our Story / Why We Love / Services + detail / Areas hub + per-community / Pricing / Gallery / Reviews / About / Contact / FAQ / Legal / Brand). Section spine for every page with slot annotations and remix-variable bindings ({SERVICE}, {SUB_SERVICES}, {COMMUNITIES}, {TRUST_NUMBERS}, {HERO_IMAGE}, …). Cross-page systems: Navigation (≤7 desktop, mobile drawer with safe-area sticky CTA), 3-tier Footer, singleton BookingModal mounted in App.tsx with prefill contract, full Schema bundle map, file-14 performance + a11y inheritance. CTA entry-point map (13 rows). Component → slot mapping that binds wireframe to existing component library — no new components required. 5-phase remix workflow (bind variables → copy → code → schema → audit). 35-item Pass/Fail across structure / variables / booking / nav-footer / SEO / perf-a11y / family-resemblance. 10-pattern auditor ripgrep bundle. 6-tier sign-off chain extending files 10 / 11 / 13 / 14. The structural spine all 150 CMB spin-off sites remix from. |

Source mirror for persona embeds:

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/brand-identity/landing-page-style-guide-persona.source.md` | Markdown (byte-for-byte copy of `source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md`, captured 2026-05-10) | partnered | CMB-scoped capture of the Colours & Shapes Experience Philosophy v3 persona, adopted as the official CMB Landing Page Style Guide persona. Integrity-locked via `.integrity/manifest.json`. |
| `source-documents/brands/cochrane-master-builders/performance/react-vite-performance-engineer-persona.source.md` | Markdown (byte-for-byte copy of `source-documents/performance/react-vite-performance-engineer-persona.source.md`, captured 2026-05-10) | partnered | CMB-scoped capture of the React + Vite Performance Engineer persona, adopted as the upstream source for the CMB Performance Decision Routing authority (file 14). Integrity-locked via `.integrity/manifest.json`. |

### UX Design

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.docx` | DOCX | source-only | Bespoke / traditional UX design-phase report (v1.3.1) |

### Personas / ICP

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.docx` | DOCX | source-only | Subcontractor ICP + UX report (v1.4.1) |
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.docx` | DOCX | source-only | Mothers ICP + UX report (v1.4.2) |
| `source-documents/brands/cochrane-master-builders/personas-icp/1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.pdf` | PDF | source-only | Grandfathers ICP + UX report (v1.4.3) |

### Service Areas

> **Geographic axis callout:** the v1.0–v10.0 paired set is the **service axis** (joined on `Master Row`). The communities registry below is the **geographic axis** (joined on `Community`). Together they form the **service × geography matrix** that powers per-community programmatic SEO pages on every Cochrane spin-off site. The source `.xlsx` is immutable — selective rendering of off-brand fragments happens at copy-generation time only.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/brands/cochrane-master-builders/service-areas/communities_master_v3.xlsx` | XLSX (binary, verbatim) | source-only | **Canonical service-area communities registry (v3).** 1 sheet `Sheet1` (132 rows × 2 cols): `Community`, `Details` (SEO-grade local narrative per community — feeds page bodies, meta descriptions, LocalBusiness/Place schema). 131 communities across Cochrane region + Calgary CMA + Rocky View County + Springbank + Bearspaw + Bragg Creek + inner-city Calgary. |
| `source-documents/brands/cochrane-master-builders/service-areas/communities_master_v3.source.md` | Markdown (verbatim mirror of .xlsx) | partnered | 1:1 textual mirror so non-Excel tools can consult it. Geographic axis of the Cochrane family-of-sites. Reconcile against Image SEO + Local Visibility persona, v9.0 layout, and v10.0 style guide before shipping per-community pages. **Keywords:** community, neighbourhood, area served, service area, location, where we work, "do you serve [X]," geographic SEO, local landing page, programmatic SEO, hub-and-spoke local, Calgary CMA, Cochrane region, Springbank, Bearspaw, Bragg Creek, Rocky View County, acreage, estate community, Place schema, LocalBusiness areaServed. |
---

## External References (`_external-references/`) — NOT OUR BRAND

> **Firewall callout:** files under any `_external-references/` folder are competitor / inspiration artifacts uploaded by the user. They belong to other brands and must **never** be copied verbatim. Use them only to study structure and depth. The Master Style Guide Architect is the only persona authorized to consult them.

| File | Format | Status | One-line label |
|------|--------|--------|----------------|
| `source-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.md` | Markdown (verbatim user upload, banner-wrapped) | source-only | **REFERENCE ONLY — Royal Mechanical Services Style Guide.** 16-section style guide owned by Royal Mechanical Services Ltd. Used as a structural template for the CMB Style Guide v1.0 only — no tokens, voice, or copy inherited. |
| `partner-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.partner.md` | Markdown (partner-only firewall wrapper) | partner-only | Catalogs what we borrow structurally (TOC depth, governance pattern, token quick-reference appendix) vs. what we explicitly reject (their colors, tokens, voice, "Explain before we replace" promise, personality spectrum, services). |

---

## Cross-brand / Global

*(empty — placeholder category folders are ready under `source-documents/` for future
persona, experience-prompt, brand-identity, ui-ux, components, animations, navigation,
footer, forms, messaging, conversion, and strategy documents.)*
