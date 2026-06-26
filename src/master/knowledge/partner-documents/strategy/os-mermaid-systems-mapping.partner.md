---
status: PARTNER
layer: interpretation
pairs-with: src/master/knowledge/source-documents/strategy/os-mermaid-systems-mapping.source.md
origin-file: General_3._OS_and_Backend-Processes_Mermaid_Diagram_Systems_Mapping_Mode_PROMPT.docx
embedded-on: 2026-04-26
brand-scope: general
---

# Partner: Mermaid Systems Mapping

## 1. Document title
**Mermaid Diagram + Systems Mapping Mode (Truth-Mapping / Flow-Externalization)**

## 2. Source reference
[`os-mermaid-systems-mapping.source.md`](../../source-documents/strategy/os-mermaid-systems-mapping.source.md)

## 3. Document category & scope
- **Category:** Strategy → Systems / Visualization
- **Scope:** GLOBAL — invoked whenever a system needs to be visualized to expose hidden complexity, validate flows, or prove an audit finding.

## 4. Main purpose
To install a systems-cartographer mindset that converts invisible system logic into visible system truth using Mermaid diagrams (flowchart, sequenceDiagram, stateDiagram-v2, erDiagram, journey, gantt). Defines diagram-type selection rules, a 5-layer diagram stack, naming consistency rules, and the 9-section response format.

## 5. What this document influences
- Decision of which Mermaid diagram type to use for a given question
- The diagram "stack" produced (System Context / Core Workflow / State / Object / Exception)
- Naming consistency across multiple diagrams
- Inclusion of failure paths, blocked/waiting states, rejection loops
- Cross-mode collaboration (Architect ↔ Mapper ↔ Auditor)

## 6. Trigger prompts / keywords
"diagram", "mermaid", "flowchart", "state machine", "ER diagram", "sequence diagram", "user journey", "map this", "visualize the workflow", "show me the flow", "diagram the architecture", "how does this work visually".

## 7. How it should guide output quality
- Diagrams must improve reasoning — not decorate.
- Prefer 2–5 sharp diagrams over one giant unreadable one.
- Always show failure/rejection paths, not just happy paths.
- Keep names consistent across every diagram in a set.
- Always produce the 9-section response (Goal / Actors / Objects / Diagram Set / Diagrams / What it Reveals / Structural Issues / Cleanest Adjustments / Next Actions).

## 8. Relationship to brand identity / ICP / conversion
Indirect — diagrams are an internal reasoning tool. They prevent shipping broken flows that would damage trust.

## 9. Conflict-resolution rules
- **This document wins** on diagram type selection, naming discipline, and "show the failure path" rule.
- **No brand-doc conflicts expected** — diagrams are an internal artifact.

## 10. Dependencies & related partner docs
- `os-systems-architect-copilot.partner.md` — provides the architecture being mapped.
- `os-systems-audit-specialist.partner.md` — uses diagrams as evidence for findings.

## 11. Practical "when to use" examples
- Designing the booking funnel → produce a flowchart + state diagram.
- Auditing permissions → produce a permissions ER + sequence diagram showing role interaction.
- Onboarding stalled? → produce a journey diagram exposing friction.
- "How do admin and portal interact?" → produce a sequence diagram.

## 12. Anti-patterns this document protects against
Decorative diagrams, giant all-in-one diagrams, happy-path-only diagrams, inconsistent naming across diagrams, diagrams that omit blocked/waiting/rejected states, and using the wrong diagram type for the question.
