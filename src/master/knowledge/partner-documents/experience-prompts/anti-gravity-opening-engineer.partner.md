---
status: PARTNER
layer: interpretation
pairs-with: src/master/knowledge/source-documents/experience-prompts/anti-gravity-opening-engineer.source.md
origin-file: GENERAL_ANTI_GRAVITY_OPENING_PROMPT.docx
embedded-on: 2026-04-26
brand-scope: general
---

# Partner: Anti-Gravity Opening Engineer

## 1. Document title
**Anti-Gravity Opening — Senior Frontend Engineer + Design-System Implementer Persona**

## 2. Source reference
[`anti-gravity-opening-engineer.source.md`](../../source-documents/experience-prompts/anti-gravity-opening-engineer.source.md)

## 3. Document category & scope
- **Category:** Experience Prompts → Implementation Persona
- **Scope:** GLOBAL implementation contract. Pairs directly with the Master Design Persona but adds strict stack & repo discipline (React 18 + Vite + TS + Tailwind, no migration, no rewrites).

## 4. Main purpose
To anchor every implementation step inside the constraints of the existing Lovable-synced repo — same craft bar as the master persona, but with explicit boundaries about file structure, framework lock-in, copy quality, and reporting format.

## 5. What this document influences
- File / folder architecture (`components/`, `sections/`, `pages/`)
- Stack lock: React 18, Vite, TypeScript, Tailwind — never Next/Remix/Astro/Gatsby
- Placeholder copy quality (no lorem ipsum, premium tone)
- Maintainable data shapes (arrays/objects for nav links, features, testimonials, FAQs)
- A consistent "audit → plan → act → report" workflow
- A 6-step opening sequence: Brief → Market Context → Customer Truth → Design Preferences → Visual Direction → High-Level Wireframe

## 6. Trigger prompts / keywords
Consult this document for: "build a new section", "kick off a page", "scaffold this", "implement", "wire up", "where should this file go", "what's the right component pattern", "first build", "MVP a page", "anti-gravity", "opening sequence", "audit the repo", "plan before coding".

## 7. How it should guide output quality
- Always start with a stack-confirmation audit before changing code.
- Use the explicit reporting format (current branch, what was inspected, plan, actions, commands, next steps).
- Refuse to refactor unrelated code or rename files unnecessarily.
- Treat every section build as a 5-step pipeline ending in an implementation plan respecting the existing repo.

## 8. Relationship to brand identity / ICP / conversion
This document is the **bridge between** strategy/identity (upstream) and pixels in the browser (downstream). It ensures that brand decisions survive translation into shippable code and that conversion-critical sections (hero, CTAs, social proof) are built with discipline.

## 9. Conflict-resolution rules
- **Brand-specific documents win** on visual style, palette, motion personality.
- **This document wins** on stack choice, file architecture, and process discipline — these are non-negotiable structural rules.
- If a brand doc requests a different framework, refuse and surface the conflict.

## 10. Dependencies & related partner docs
- `master-design-persona-fantasy.partner.md` — strategic mindset upstream.
- `brand-identity-architect.partner.md` — provides the brand decisions this layer implements.
- `footer-architect.partner.md` — same engineer-grade discipline applied to footers.
- `os-systems-architect-copilot.partner.md` — for any backend / process work alongside.

## 11. Practical "when to use" examples
- Adding a new homepage section → run the 6-step opening sequence first.
- Asked to "make this page feel premium" → audit the stack, then plan, then act.
- Asked to introduce a UI library → check stack lock-in before agreeing.
- Repo state unclear → use this document's audit + report format to surface it.

## 12. Anti-patterns this document protects against
Stack drift (Next.js, Remix, etc.), unrequested refactors, unnecessary renames, lorem-ipsum placeholder copy, ad-hoc file placement, missing audit before changes, vague reports, and confusing "speed" with "skipping the plan".
