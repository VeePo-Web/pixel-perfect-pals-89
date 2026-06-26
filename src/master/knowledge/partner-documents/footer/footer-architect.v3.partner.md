# Partner Doc — Footer Architect Persona (v3 snapshot)

- **Source:** [`source-documents/footer/footer-architect.v3.source.md`](../../source-documents/footer/footer-architect.v3.source.md)
- **Origin file:** `General_FOOTER_Prompt-3.docx`
- **Category:** Footer / Cross-brand persona — v3 snapshot
- **Status:** Embedded verbatim. Source untouched.
- **Canonical sibling:** [`footer-architect.partner.md`](./footer-architect.partner.md) (v2 — primary routing target)

## Purpose

A v3 iteration of the Footer Architect persona. Substantively expanded over v2 with:

1. A **Required Output structure** (9 sections: Objective Map → IA → Layout & Visual Hierarchy → Bespoke Brand Layer → Trust & Compliance → Footer-specific SEO → Perf + a11y hardening → "What Not To Do" (≥15) → QA Plan).
2. **Absolute constraints** that explicitly forbid altering anything outside the footer (copy, nav, layout, tokens, motion).
3. A **Final Directive** that scopes a footer-first then nav-second program of work and ties them into one bespoke composition.
4. The full "Creating World-Class Custom Footers" reference report (sections 1–12 + future trends + 13 anti-patterns).

This document is **decision intelligence** for any footer-related work and for the explicit "footer + scrolled-nav coherence" mandate.

## What this should influence

- The Cochrane Master Builders site footer (`src/components/detailing/Footer.tsx` and any future drywall/master-build footers) — IA, microcopy, signature brand moment, NAP + LocalBusiness schema, governance.
- The **scrolled-state navbar** (when the user is near/at the footer) — must read as one composition with the footer per the Final Directive.
- Any new sticky mini-footer on mobile, region/role-aware footer logic, or infinite-scroll companion.
- Footer SEO strategy: anchor text, internal-link curation, schema hooks, anti-spam discipline.
- Footer performance + accessibility QA gates before any release.

## When to consult this document (trigger keywords)

`footer`, `fat footer`, `sitemap-lite`, `doormat footer`, `utility footer`, `sticky mini-footer`, `scrolled nav`, `footer + nav coherence`, `footer IA`, `footer SEO`, `footer schema`, `footer governance`, `footer QA`, `footer anti-pattern`, `footer microcopy`, `signature footer moment`, `NAP footer`, `LocalBusiness footer`.

## Routing rule (vs v2)

- **v2 (`footer-architect.partner.md`)** stays the **primary routing target** for general footer questions and for registration in `decision-index.ts` / `decision-input.ts` / `DECISION_ROUTER.md`.
- **v3 (this doc)** is consulted **in addition** to v2 whenever the request involves any of:
  - Producing a **structured footer deliverable** (the request expects an output that follows the 9-section format).
  - **Footer governance, QA gating, or anti-pattern audits**.
  - The **footer ↔ scrolled-navbar composition mandate** (Final Directive).
  - Defining or refining the **bespoke brand moment / signature element** of the footer.
- If v2 and v3 conflict on tactics, **v3 wins on output structure and governance discipline**; v2 wins on baseline persona framing already wired into the router.

## Adaptation — Cochrane Master Builders

The source persona is brand-agnostic with example domains (e.g. dental in Calgary, dog food). For Cochrane Master Builders (custom home builder, Cochrane + Rocky View + Calgary CMA, brand promise *"Strong Foundations For Those Who Come After Us"*), apply these mappings — never edit the source:

- **Brand moment** → the Strong-Foundations / family-legacy motif. Existing `Footer Architecture` memory ([mem://brand/footer-architecture]) governs the visual sign-off (3-tier vertical, `clamp(4-10rem)` responsive monogram). Treat that as the v3 "Signature element 1."
- **Voice / microcopy** → traditional, family-legacy, restrained craftsmanship. No playful hype, no SaaS jargon, no "Join our inner circle" cuteness. Lean on the Family Legacy Standard partner doc and 1.5 Brand Identity North Star.
- **Local SEO layer** → NAP for Cochrane HQ; service-area cues for Cochrane, Rocky View County, Bragg Creek, NW Calgary. Anchor text stays natural; never list every community. LocalBusiness/Organization schema lives in this footer per source §6.3.
- **Trust layer** → certifications, BuiltGreen, association memberships (when confirmed in `open-questions-checklist.md`). Do not invent badges.
- **Patterns to favour** → Sitemap-Lite for service pages + Marketing CTA hybrid (Book a Consultation). **Avoid**: heavy social feeds, region switchers (single-region brand), role-aware footer (no logged-in product), human imagery (per [mem://constraints/image-content-restrictions]).
- **Performance + a11y** → routes through the Performance Engineer + Mobile Wrapping partner docs. CLS-safe, inline SVG, ≥48px tap targets per [mem://constraints/mobile-optimization].
- **Scrolled-nav coherence** → the Final Directive's "footer + nav as one composition" rule must be cross-checked against `navigation-architect-persona.partner.md` and the Navigation Specs memory before any motion/visual change is proposed.

## Conflict rule

- Brand-specific Cochrane Master Builders documents (Family Legacy Standard, North Star, Footer Architecture memory, Image Restrictions) **win on aesthetics, voice, palette, and signature moment**.
- This v3 source **wins on**: required output structure, governance discipline, anti-pattern checklist, QA gates, and the footer ↔ scrolled-nav composition mandate.
- The Performance Engineer and Mobile Wrapping partner docs **win on**: perf budgets, breakpoint strategy, Core Web Vitals enforcement.
- Source rules forbidding alterations outside the footer are **absolute** — no nav, copy, motion, or token changes as a side-effect of footer work.

## Dependencies / related documents

- [`footer-architect.partner.md`](./footer-architect.partner.md) — canonical v2 partner.
- [`../navigation/navigation-architect-persona.partner.md`](../navigation/navigation-architect-persona.partner.md) — required for the footer ↔ nav coherence directive.
- [`../performance/react-vite-performance-engineer-persona.partner.md`](../performance/react-vite-performance-engineer-persona.partner.md) — perf budgets.
- [`../mobile/mobile-wrapping-responsive-persona.partner.md`](../mobile/mobile-wrapping-responsive-persona.partner.md) — mobile/sticky-mini-footer rules.
- [`../seo/image-seo-local-visibility-persona.partner.md`](../seo/image-seo-local-visibility-persona.partner.md) — local SEO + schema discipline.
- [`../brand-identity/brand-identity-architect.partner.md`](../brand-identity/brand-identity-architect.partner.md) and the Cochrane Master Builders Family Legacy / North Star partner docs.
- Memory: [Footer Architecture](mem://brand/footer-architecture), [Navigation Specs](mem://design/navigation-specs), [Mobile Optimization](mem://constraints/mobile-optimization), [Image Restrictions](mem://constraints/image-content-restrictions).

## Practical examples of when to use it

1. *"Refine the footer IA and copy for the home page."* → consult v2 + v3, produce the 9-section deliverable.
2. *"What should the footer look like when the user has scrolled past 90% of the page, and how should the nav respond?"* → invoke the v3 Final Directive (footer + scrolled-nav as one composition).
3. *"Audit the current footer for anti-patterns."* → run the v3 §12 + §8 anti-pattern checklist (≥15 items) and the QA Plan (§9).
4. *"Add LocalBusiness schema to the footer."* → use v3 §6 SEO Layer + the image-seo partner doc; preserve current visual design.
5. *"Mobile footer is too tall."* → cross-reference v3 §3 Layout (mobile accordion + sticky CTA only if justified) with the Mobile Wrapping partner doc; do not weaken the bespoke brand moment.

## Governance

- Source file is immutable. Any drift is captured here, in v2, or in a future v4 partner — never in the source.
- Routing registration (`decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`) stays on v2; this v3 entry is provenance + extended structural intelligence, mirroring the navigation v3 precedent.
