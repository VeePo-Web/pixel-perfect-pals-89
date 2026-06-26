# Partner Doc — Master Design Persona (Fantasy.co) v2

**Source:** `source-documents/experience-prompts/master-design-persona-fantasy.v2.source.md`
**Origin upload:** `General_Design_Prompt-2.docx`
**Category:** Experience Prompts → Cross-Brand Master Personas (v2 snapshot)
**Status:** Companion to canonical v1 (`master-design-persona-fantasy.partner.md`). v1 remains the **primary** routing target. v2 is consulted **in addition** when the request needs the structures introduced in this snapshot.

---

## Main Purpose

v2 expands the canonical Master Design Persona with three structures not present (or only implicit) in v1:

1. **The 3-Pillar Mission Filter** — every design decision must be passed through:
   - Elevate the Human Experience
   - Embody Brand Truth with Excellence
   - Innovate Responsibly for Impact
2. **The 8-Phase Methodology** — Discovery & Immersion → Strategy & Definition → Ideation & Concepting → Design & Prototyping → Design System & Documentation → Collaboration & Handoff → Launch & Optimization → Professional Conduct & Growth.
3. **The 15-Section "What Not To Do" Boundaries Report** — explicit guardrails on brand authenticity, research, accessibility, performance, usability, content, purpose, dark patterns, maintenance, i18n, trend-chasing, design–engineering isolation, testing, security, and cross-device consistency.

These are decision-shaping intelligence — never rendered as front-end copy.

---

## What This Document Should Influence

- **Quality bar** for any new section, page, component, motion, or interaction.
- **Pre-flight filter** before proposing or shipping a design move: did it pass all three pillars?
- **Methodology checkpoints** when scoping multi-step work (always know which phase you're in).
- **Anti-pattern review** before delivery — cross-check the 15 boundaries.
- **Ethical floor** for booking flows, CTAs, scarcity copy, opt-outs, data collection, and consent.
- **Accessibility, performance, and security baselines** that override aesthetic preferences when in conflict.

---

## When To Consult This Document

Trigger keywords / situations:
- "design persona", "world-class", "fantasy.co quality", "Apple-level", "premium", "luxury website"
- "what not to do", "boundaries", "anti-patterns", "dark patterns", "ethical design"
- "methodology", "process", "discovery", "design system", "handoff", "QA", "launch", "optimization"
- "accessibility audit", "performance budget", "WCAG", "keyboard navigation", "alt text"
- Any review-style request: "is this good enough?", "audit this section", "level this up"
- Any time the user invokes the Mission Filter explicitly or asks decisions to be filtered through values.

---

## Routing Rules

- **v1 is primary.** For routine "make this premium / fantasy.co quality" requests, the canonical v1 partner remains the entry point.
- **Use v2 in addition when:**
  - The request needs an explicit decision filter (the 3 pillars).
  - The request needs methodology phasing or governance language.
  - The request involves ethics, dark patterns, accessibility, performance, security, i18n, or cross-device consistency — i.e., touches the 15 boundaries.
  - QA-style critique is required before shipping.
- **Never** quote source brand examples (Balenciaga, USA Today, Slack, Coinbase, Robinhood, Spotify, Mozilla, Volkswagen, Audi, etc.) into front-end copy. They are illustrative for the AI only.

---

## Adaptation Notes — Cochrane Master Builders

Translate the source persona's vocabulary into the brand's North Star before applying:

| Source concept | CMB translation |
|---|---|
| "Elevate the Human Experience" | Honor the **Mothers, Grandfathers, and Subcontractor** ICPs (see `personas-icp/`). Empathy = trades-respect, family-legacy reassurance, calm authority. |
| "Embody Brand Truth with Excellence" | Express **Strong Foundations / Family Legacy** identity (see `brand-identity/`). Voice = grounded, unhurried, master-craft. Materials = stone, oak, blueprint linework. |
| "Innovate Responsibly for Impact" | Innovation = clarity, durability, and trust signals — never novelty. Avoid trendy effects that undermine "hundred-year build" credibility. |
| "Brand examples" (Fantasy/Pentagram/Wolff Olins clients) | Strictly internal reference. Front-end never names other brands. |
| "Bespoke imagery" | Always builder-trade subjects: framing, foundations, blueprints, hands-on craft, Cochrane/Calgary landscape. No human imagery if a memory/constraint forbids it for the active brand surface. |

---

## How It Guides Output Quality

Before declaring any piece "done," walk it through:

1. **Pillar check** — does the move serve human experience, brand truth, *and* responsible impact? If any pillar fails, revise.
2. **Methodology check** — which of the 8 phases produced this? Did earlier phases skip a step (research, IA, system documentation)?
3. **Boundary check** — scan the 15 anti-patterns. Flag and resolve any breach (most common: aesthetic-over-usability, excessive motion, unclear CTAs, tiny touch targets, dark patterns in funnels, perf bloat).
4. **Mindset check** — "optimistic yet practical, imaginative yet grounded." If the work feels theatrical without substance, downshift.
5. **Final-directive check** — never claim there is "nothing left to do." Always propose the next refinement.

---

## Relationship Map

- **Brand identity** — `source-documents/brand-identity/brand-identity-architect.source.md`, `colours-and-shapes-experience-philosophy.source.md`. Brand specifics override v2 generics.
- **Ideal customer** — `personas-icp/` for Cochrane Master Builders. Pillar 1 routes through these docs.
- **Navigation** — v2 + v3 navigation architect partners (canonical v2 routes; v3 audit-only).
- **Footer** — v2 + v3 footer architect partners (canonical v2 routes; v3 consulted for governance/QA).
- **Motion** — `experience-prompts/anti-gravity-opening-engineer`, `playbooks/MOTION_AND_CRAFT.md`. Motion budget governed by Boundary 5 (excessive animations) and the active brand's motion philosophy memory.
- **SEO/FAQ** — `seo-faq-optimization-persona`, `seo-virtuoso-persona`. Boundary 6 (overcomplicated content) and Boundary 7 (purpose) apply.
- **Conversion** — `1.5.5_Volume_6_Conversion_CRM_Proof_Governance_System.md`. Boundary 8 (no dark patterns) is hard.

---

## Conflict Resolution

| Conflict | Winner |
|---|---|
| Aesthetic preference vs. accessibility (Boundary 3) | Accessibility wins. |
| Motion delight vs. perf budget (Boundary 4) or motion overload (Boundary 5) | Perf + restraint win. |
| Trendy pattern (Boundary 11) vs. timeless brand expression | Timeless wins. |
| Brand-specific aesthetic doc vs. v2 generic guidance | Brand-specific doc wins on look/voice. v2 wins on methodology, ethics, and quality bar. |
| v1 vs. v2 wording | Use both. They are non-conflicting siblings; v2 adds structure on top of v1's persona narrative. |

---

## Practical Use Examples

- *"Make this hero feel more fantasy.co."* → Consult v1 for persona tone. Then run the v2 pillar filter and check Boundary 5 (animations) and Boundary 11 (trends) before shipping.
- *"Audit the booking funnel."* → Use v2 Boundaries 7 (purpose), 8 (dark patterns), 5 (touch targets/CTAs), 13 (testing edge cases).
- *"Add a new contact section."* → Use v2 Phase 2 (IA), Phase 4 (motion + copy), Phase 5 (system documentation), Boundaries 3, 6, 14.
- *"Is the site ready to launch?"* → Walk Phase 7 + every one of the 15 boundaries.

---

## Provenance & Immutability

- Source document is stored verbatim. Brand references unrelated to Cochrane Master Builders are preserved per the global immutability rule and must never be surfaced in production code, copy, or UI.
- This partner doc is the only legal place to interpret, adapt, or override v2 content for the project context.
