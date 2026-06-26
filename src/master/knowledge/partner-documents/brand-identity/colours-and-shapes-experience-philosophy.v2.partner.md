---
title: Colours & Shapes Experience Philosophy — v2 Partner (Christian-Centered Source, Firewalled)
category: Brand Identity → Experience Philosophy → v2 extension
status: BACKEND-ONLY · partnered with firewall
source_file: ../../source-documents/brand-identity/colours-and-shapes-experience-philosophy.v2.source.md
companion_to:
  - ../../source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md (v1, canonical)
  - ./colours-and-shapes-experience-philosophy.partner.md (v1 partner — primary routing)
---

# Colours & Shapes — v2 Partner (Firewalled Christian Source)

## Why this exists

`General_CHRISTIAN_Colours_and_shapes_PROMPT-2.docx` is a 27-page Christian-centered UI/UX & visual design playbook based on Colours & Shapes' church/ministry case studies (The Pastorate, Centre Church, Practicing the Way, Smith Creative, Wagenmaker & Oberly), liturgical color theory, and an 8-phase delivery process.

Per the immutability rule, the **source is preserved verbatim**. Per the conflict rule, all church/liturgical/Gospel-specific subject matter is **firewalled to backend reasoning only**. The active project (Cochrane Master Builders / VeePo — luxury automotive editorial / master-builder brand) is not religious. None of the Christian-specific content may surface in front-end output.

This partner doc has two jobs:

1. **Extract the transferable craft layer** (manifesto + behaviours, recurring motif as theme thread, narrative flow, scannable hierarchy, mobile-first, motion under 300 ms with natural easing, accessibility/performance/security as trust signals, 8-phase delivery cadence) and make it available alongside the v1 philosophy for any future design/UX/brand decision.
2. **Firewall the Christian subject matter** so no AI assistant pulls scripture, liturgical palettes, or church iconography into the codebase, copy, components, or design tokens.

## Routing rules

- **v1 partner remains the primary routing target** for the cross-brand Colours & Shapes experience philosophy.
- v2 is **consulted in addition** when the prompt is about: brand manifesto + behaviours, recurring visual motif systems, hero narrative flow, scannable typography hierarchy, mobile-first information architecture, motion timing budgets, page-transition continuity, accessibility/performance as trust, or the 8-phase delivery cadence.
- **Anti-routing (do NOT consult v2 here)** — if the prompt touches color systems, palette design, iconography, copy/voice, or imagery, **prefer v1 + `brand-identity-northstar.ts` + `style-guide.ts`** so the firewalled Christian content is never surfaced.

## Trigger keywords (route IN)

- "manifesto", "brand behaviours"
- "recurring motif", "visual thread", "fibre motif equivalent"
- "narrative flow", "homepage story arc"
- "scannable hierarchy", "mobile-first IA"
- "8-phase delivery", "discovery → maintenance cadence"
- "motion under 300ms", "natural easing", "page transitions as continuous journey"
- "accessibility as trust", "performance budget as hospitality"
- "Lenis smooth scroll fallback for prefers-reduced-motion"

## Anti-trigger keywords (FIREWALL — never surface in front-end)

`Christian`, `church`, `liturgical`, `scripture`, `Gospel`, `prayer`, `donate`, `sermon`, `cross`, `dove`, `flame`, `Trinity`, `Advent`, `Lent`, `Easter`, `worship times`, `God`, `Holy Spirit`, `congregation`, `seekers/members/volunteers personas`.

If a prompt seems to draw any of the above into front-end code, copy, tokens, components, icons, alt text, microcopy, or assets, **STOP and use v1 + `brand-identity-northstar.ts` instead.**

## Brand-translation table (Cochrane Master Builders / VeePo)

| Source concept (v2)                                  | Translated for the active brand                                                                       |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| "theological why"                                    | brand-truth why → legacy, master-craft, family stewardship                                            |
| "manifesto + behaviours"                             | already encoded in `brand-identity-northstar.ts` and `style-guide.ts` — DO NOT add a new manifesto    |
| Centre Church "fibre motif"                          | already implemented as the copper hairline / CW monogram thread — reinforce, do not replace          |
| Liturgical seasonal palette rotation                  | Asphalt / Graphite + copper accent system. **NEVER** introduce liturgical palettes                   |
| "Cross / dove / flame / fish / tree" iconography     | FORBIDDEN in front-end output                                                                         |
| Scripture quotes / verse banners                     | Editorial pull-quotes from brand voice only — NEVER scripture                                         |
| Church personas (seeker/member/volunteer)            | Existing ICP personas (homeowner, fleet, dealership, subcontractor — see `personas/ideal-customer.ts`) |
| Sermon archive / prayer button / donate button       | Not applicable — do not port these components                                                         |
| "Plan a Visit / Watch / Give" nav items              | Existing nav items per `personas/nav-architect.ts` — do not modify                                   |
| "Worship times prominent on every page"              | Translates to: booking CTA / contact info accessible from every page (already implemented)            |
| Webflow as preferred CMS                             | Not applicable — this project is React/Vite per project tech stack                                    |

## What this v2 source DOES legitimately add to backend reasoning

- A second, deeper articulation of the **manifesto-and-behaviours** authoring step (worth consulting when refining brand voice docs).
- The **continuous-journey page-transition** principle (cross-fade / slide / content reveal vs. abrupt cuts) — aligns with the existing cloth-wipe transition memory.
- The **17–50 ms first-impression** research datapoint and the **3–5 (max 6) main-nav items** rule from Mission Lab — useful for IA reviews.
- The **45–75 character line length** and **1.4–1.6 em line spacing** typography defaults — already broadly aligned with project memory but useful as reference.
- The **8-phase delivery cadence** (Discovery → Brand → IA/Wireframing → Hi-Fi → Development → Content → Testing/Launch → Maintenance) — consult when scoping multi-phase work.
- **Lenis smooth-scroll + `prefers-reduced-motion` fallback** — consult before introducing any new scroll-driven animation.
- **Accessibility/performance/security framed as hospitality and trust** — consult when prioritizing trade-offs.

## Conflict resolution

- If v2 ever appears to contradict v1 on the cross-brand philosophy, **v1 wins**.
- If v2 ever appears to contradict the brand-identity-northstar or project memory (dark luxury editorial, copper accents, no human imagery, no rounded cards, etc.), **the project memory wins**.
- The verbatim Christian content in the source is held only for traceability of the user's upload — never as guidance for output.

## Dependencies / related documents

- `source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md` (v1)
- `partner-documents/brand-identity/colours-and-shapes-experience-philosophy.partner.md` (v1 partner — primary)
- `source-documents/brand-identity/brand-identity-architect.source.md`
- `partner-documents/experience-prompts/master-design-persona-fantasy.partner.md` (v1)
- `partner-documents/experience-prompts/master-design-persona-fantasy.v2.partner.md` (v2 — methodology + anti-patterns)
- `src/config/brand-identity-northstar.ts`
- `src/config/style-guide.ts`
- `src/config/personas/ideal-customer.ts`
- `src/master/knowledge/INDEX.md`

## Practical examples of when to consult v2

- "Help me refine the brand manifesto authoring step before we ship a new section." → consult v1 + v2 (manifesto-and-behaviours pattern).
- "I want page transitions to feel like one continuous journey instead of cuts." → consult v2 (page-transitions section) + cloth-wipe memory.
- "Plan a multi-phase scope for the next site iteration." → consult v2's 8-phase cadence.
- "Audit our main nav for first-impression load." → consult v2 (17–50 ms, 3–5 items max).
- "Suggest a new color palette." → **DO NOT consult v2.** Use v1 + brand-identity-northstar only.
- "Suggest iconography for the trust section." → **DO NOT consult v2.** Use v1 + brand-identity-northstar only.

## Out of scope

- No front-end changes from this embedding.
- No edits to v1 source/partner.
- No edits to `brand-identity-northstar.ts`, `style-guide.ts`, `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`, or `GENERAL_INTELLIGENCE_INDEX.md`.
