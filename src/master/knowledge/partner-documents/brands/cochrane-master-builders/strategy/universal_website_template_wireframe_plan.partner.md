# Universal Website Template Wireframe Plan — Partner Brief (Foundational)

**Status:** FOUNDATIONAL. This document, together with brand-identity v1.2.1 / v1.2.2 and UX v1.3.1, sits at the top of the Cochrane Master Builders knowledge hierarchy. Every spin-off site scaffolded from the v1.0–v10.0 paired set and the communities registry MUST reconcile against the structural spine defined here.

**Source of truth:**
- `source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.pdf` (binary, immutable)
- `source-documents/brands/cochrane-master-builders/strategy/universal_website_template_wireframe_plan.source.md` (verbatim text mirror)

**Brand scope:** Cochrane Master Builders + its 115 service spin-off domains ONLY. Do NOT cross-pollinate with the VeePo / Masters Detailing automotive site living in this codebase — automotive firewall in effect.

---

## Role In The System

The wireframe is the **structural axis** of the Cochrane family-of-sites matrix:

```text
                Wireframe (this doc)  ← STRUCTURAL AXIS  (page architecture, section order, IA, schema, perf budget)
                          |
                          v
v1.0 ─ v10.0 paired set   ← CONTENT / STYLE AXIS  (joined on `Master Row`)
                          x
communities_master_v3      ← GEOGRAPHIC AXIS    (joined on `Community`)
                          =
              115 sites × N communities
```

Every spin-off site is the cross-product: pick one row from v1.0 (which site), render its v2.0/v4.0/v5.0/v6.0/v7.0/v9.0/v10.0 attributes through the wireframe sections defined here, then duplicate the `/areas-we-serve/[community]` template across the relevant communities.

---

## Triggers (when to consult this doc)

Consult whenever the user mentions:

- "scaffold a Cochrane site", "spin up a new domain", "build the [service] site"
- page architecture, sitemap, URL structure, route plan
- homepage sections, hero section, trust bar, services grid, pricing preview
- process / our-process section, family legacy block, project proof
- areas-we-serve template, area landing pages, community page
- pricing / cost-guide page, contact / request-estimate page, FAQ page
- navbar, mega menu, mobile drawer, sticky mobile CTA
- footer structure, footer columns, footer slogan
- service-detail page template, related services block
- contact form fields, multi-step form, form UX
- schema (LocalBusiness, FAQPage, BreadcrumbList, Organization, ContactPoint, Review)
- performance budget, Core Web Vitals targets, image strategy, font loading
- service-category overlays (Custom Homes, Renovations, Roofing, Concrete, HVAC, Repairs, etc.)
- "Strong Foundations For Those Who Come After Us" master message
- any of the 115 Cochrane Master Builders domains by name

---

## Joins

| Axis | File(s) | Key | Purpose |
|------|---------|-----|---------|
| Site selection | `1.0_..._Master_Plan.xlsm` (+ `.source.md`) | `Master Row` | Which of the 115 sites we are scaffolding |
| Services + pricing | `2.0_..._services_pricing.xlsx` | `Master Row` | Services grid items + pricing-preview tiers |
| Voice / ICP | `4.0_..._ideal_customer_brain.xlsx` | `Master Row` | Hero copy, microcopy, fear-reversal, CTAs |
| Color / mood | `5.0_..._color_ux_suggestions.xlsx` | `Master Row` | Per-site palette feeding tokens |
| UX experience | `6.0_..._ux_experience.xlsx` | `Master Row` | Pacing, motion temperament, interaction feel |
| Performance | `7.0_..._performance_audit_specs.xlsx` | `Master Row` | Per-site CWV + budget overlay on the global perf section |
| Theme layout | `9.0_..._theme_layout_ux_specs.xlsx` | `Master Row` | Bespoke modules slotted into the wireframe shell |
| Style guide | `10.0_..._ux_theme_style_guides.xlsx` | `Master Row` | Surface treatment, typography posture, component tone |
| Geographic | `service-areas/communities_master_v3.xlsx` | `Community` | `/areas-we-serve` cluster lists + `/areas-we-serve/[community]` content |
| Tone baseline | `brand-identity/1.2.1_..._Family_Legacy_Standard_1.pdf`, `1.2.2_..._Foundations_For_Generations_After_Us_Report.pdf` | n/a | Family-legacy voice, "Strong Foundations" anchor |
| UX baseline | `ux-design/1.3.1_..._Bespoke_Traditional_UX_Design_Phase_Report.docx` | n/a | Interaction baseline, bespoke + traditional balance |

---

## Adaptation Rules

1. **Structure is fixed.** The section order on the homepage (Trust Bar → Hero → Trust Strip → Services Grid → Pricing Preview → Process → Family Legacy → Project Proof → Areas We Serve → FAQ → Final CTA → Footer) is the spine. Do not collapse, reorder, or skip sections without an explicit, logged exception.
2. **Copy + imagery + module choice adapts per service category.** Roofing feels protective + durable; tile feels precise + crafted; basement suites feel safe + income-focused; landscaping feels outdoor + lifestyle; custom homes feel aspirational + legacy. See "Service Category Template Variations" in `source.md` for the unique modules each category swaps in.
3. **Master message anchor.** "Strong Foundations For Those Who Come After Us." MUST appear on every site (hero subtext, about, process, footer, or trust section), adapted to the service per the examples in §"Master Brand Message Across Every Site".
4. **Automotive firewall.** No VeePo / Masters Detailing styling, copy patterns, motion temperament, or imagery may bleed into Cochrane builders work. The dark-luxury-editorial memory in `mem://design/aesthetic-direction` belongs to VeePo, not Cochrane.
5. **No human imagery substitutions** (`mem://constraints/image-content-restrictions`) only applies to VeePo. Cochrane wireframe permits "warm photography" per §6 — but humans must be sincere/non-stock per source notes.
6. **Local-first.** Every page must surface "Cochrane + surrounding communities" trust signals; phone + Request Estimate must be reachable in ≤1 scroll on mobile.
7. **Performance is not optional.** §"Performance Optimization Requirements" defines the universal budget; v7.0 row provides the per-site overlay.
8. **Source PDF is immutable.** Edits live in this partner doc.

---

## Section Index (deep-link map back to source.md)

The `.source.md` is one fenced text block, so cite by approximate page markers (`## Page N`) which are preserved in the extraction:

- Purpose Of This Wireframe System — Page 1
- Core Template Philosophy — Pages 1–2
- Master Brand Message Across Every Site — Page 2
- Universal Site Architecture (core pages, URL structure, SEO logic) — Pages 2–3
- Universal Navigation System (desktop, mega menu, mobile, sticky CTA) — Pages 3–5
- Universal Homepage Wireframe — Pages 5+
  - Section 1: Announcement / Trust Bar — Page 6
  - Section 2: Hero Section (layout, copy formula, mobile rules) — Pages 6–8
  - Section 3: Trust Signal Strip — Pages 7–8
  - Section 4: Services Grid — Pages 8–9
  - Section 5: Pricing Preview — ~Page 9
  - Section 6: The Process — Page 10
  - Section 7: Family Legacy Block — Pages 10–11
  - Section 8: Project Proof — ~Page 11
  - Section 9: Areas We Serve — Pages 11–12
  - Section 10: FAQ — Pages 12–13
  - Section 11: Final CTA — ~Page 14
  - Section 12: Footer — Pages 13–14
- Universal Pricing / Cost Guide Page — Pages 15+
- Universal Areas We Serve Page (regional clusters, community lists) — Pages 15–18
- Universal Contact / Request-Estimate Page (form fields, UX notes) — Pages 18–20
- Reusable Section Library (block field schemas) — Pages 20–22
- Page Templates (Home, Services, Service Detail, Areas, Project, FAQ) — Pages 22–25
- Service Category Template Variations — Pages 25–30
- Schema Bundle — ~Page 30
- Performance Optimization Requirements — Pages 31–32
- Code Architecture recommendation — Page 32
- Mobile Layouts — Pages 32–34
- Sitemap — Pages 34–35
- Footer Structure — Pages 35–36
- Voice & Vocabulary (use / avoid) — Pages 36–37
- Build Recommendation — Pages 37–38

---

## Mode-OS Pairing

- **Architect** scaffolds: invoke when a new spin-off site needs its full spec produced — see `experience-prompts/template-architect-persona.partner.md`.
- **Mapper** renders the cluster-by-cluster matrix (Mermaid / table form) when the user asks "show me the Roofing & Exterior cluster" or similar.
- **Auditor** verifies a candidate site spec against this wireframe + brand-identity + v9.0 + v10.0 + v7.0 budget before any actual code is written.

---

## Out Of Scope

- Editing the live VeePo / Masters Detailing front end in this codebase.
- Mutating the source PDF or any v1.0–v10.0 / communities source file.
- Choosing actual hex tokens or Tailwind classes — that's downstream of v5.0/v10.0 and the eventual scaffolding phase.
- Recommending domains or claiming `.ca` availability without WHOIS confirmation.
