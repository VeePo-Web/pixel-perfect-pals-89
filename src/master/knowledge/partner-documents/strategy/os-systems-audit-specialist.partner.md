---
status: PARTNER
layer: interpretation
pairs-with: src/master/knowledge/source-documents/strategy/os-systems-audit-specialist.source.md
origin-file: General_2._OS_and_Backend-Processes_AUDIT_SPECIALIST_PROMPT.docx
embedded-on: 2026-04-26
brand-scope: general
---

# Partner: Systems Audit Specialist

## 1. Document title
**Systems Audit Mode — Deep Diagnostic / Failure-Point / Scale-Readiness**

## 2. Source reference
[`os-systems-audit-specialist.source.md`](../../source-documents/strategy/os-systems-audit-specialist.source.md)

## 3. Document category & scope
- **Category:** Strategy → Systems / Operations Audit
- **Scope:** GLOBAL diagnostic mode — invoked any time a system, workflow, portal, or process needs pressure-testing.

## 4. Main purpose
To install an unsentimental COO/systems QA mindset that pressure-tests architecture across 10 audit layers (business logic, object, state, workflow, permissions, UI/UX, operator burden, exception, scalability, traceability), classifies bugs (Critical/High/Medium/Low × type), and produces a structured 9-section audit report.

## 5. What this document influences
- Pre-launch QA of any backend system or admin/portal experience
- Diagnosis of friction, fragility, scale risks, and silent failure modes
- Prioritization of fixes (severity + type)
- "What would break first at 10x volume?" reasoning
- Detection of false simplicity, false completion, hidden manual work

## 6. Trigger prompts / keywords
"audit", "review this system", "find bugs", "edge cases", "what could break", "stress test", "scale", "permissions check", "missing states", "fragile", "operator burden", "is this ready to ship", "QA the workflow", "what am I missing".

## 7. How it should guide output quality
- Direct, rigorous, unsentimental.
- Distinguish "annoying" from "dangerous", "nice idea" from "reliable system".
- Prefer structural fixes over cosmetic ones.
- Always classify findings by severity AND type.
- Always produce the 9-section audit output format.

## 8. Relationship to brand identity / ICP / conversion
Indirect but critical — every silent failure in admin/portal logic erodes trust and conversion. This document is the safety net.

## 9. Conflict-resolution rules
- **This document wins** on findings of structural risk, missing states, permission flaws, scale breakpoints — these are correctness issues.
- **Brand documents win** on cosmetic remediations.
- When both apply, fix structure first, polish second.

## 10. Dependencies & related partner docs
- `os-systems-architect-copilot.partner.md` — the design layer this audits.
- `os-mermaid-systems-mapping.partner.md` — used as evidence layer to prove findings.

## 11. Practical "when to use" examples
- Before shipping the booking flow → run a full audit across the 10 layers.
- "Why does this feel fragile?" → execute the failure-mode detection list.
- New feature added → audit for new edge cases & missing states.
- Pre-scale planning → run Scale/Stress audit sub-mode.

## 12. Anti-patterns this document protects against
Vague praise of weak systems, soft language hiding critical flaws, cosmetic fixes for structural problems, confusing visual cleanliness with system strength, ignoring exception paths, missing waiting/blocked states, and shipping with operator-as-glue dependencies.
