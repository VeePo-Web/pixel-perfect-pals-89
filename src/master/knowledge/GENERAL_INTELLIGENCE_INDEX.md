# General Intelligence Layer — Index

Cross-brand persona & experience documents embedded as a dual-layer knowledge system.

- **Source documents** (`src/master/knowledge/source-documents/`): immutable, byte-perfect copies of user-uploaded `.docx` prompts. Never edit.
- **Partner documents** (`src/master/knowledge/partner-documents/`): interpretation layer. Tells the decision router how/when to consult each source.

**Conflict rule:** brand-specific documents (e.g., Cochrane Master Builders in `partner-documents/brands/`) **win** on aesthetics, voice, palette, motifs. General docs **win** on craft baseline, accessibility, performance, and structural integrity.

## Embedded documents (8)

### Experience prompts
| Slug | Source | Partner | Trigger keywords |
|---|---|---|---|
| `master-design-persona-fantasy` | [source](source-documents/experience-prompts/master-design-persona-fantasy.source.md) | [partner](partner-documents/experience-prompts/master-design-persona-fantasy.partner.md) | design, premium, world-class, Fantasy.co, craft, polish |
| `anti-gravity-opening-engineer` | [source](source-documents/experience-prompts/anti-gravity-opening-engineer.source.md) | [partner](partner-documents/experience-prompts/anti-gravity-opening-engineer.partner.md) | scaffold, implement, plan, audit repo, opening sequence |

### Brand identity
| Slug | Source | Partner | Trigger keywords |
|---|---|---|---|
| `brand-identity-architect` | [source](source-documents/brand-identity/brand-identity-architect.source.md) | [partner](partner-documents/brand-identity/brand-identity-architect.partner.md) | brand identity, positioning, USP, tone, north star |
| `colours-and-shapes-experience-philosophy` | [source](source-documents/brand-identity/colours-and-shapes-experience-philosophy.source.md) | [partner](partner-documents/brand-identity/colours-and-shapes-experience-philosophy.partner.md) | manifesto, brand motif, story-driven, design hospitality |

> ⚠️ The Colours & Shapes source is framed for Christian organizations. Adaptation is **mandatory**: import principles only — never the religious vocabulary — into Cochrane Master Builders work. See its partner doc.

### Footer
| Slug | Source | Partner | Trigger keywords |
|---|---|---|---|
| `footer-architect` | [source](source-documents/footer/footer-architect.source.md) | [partner](partner-documents/footer/footer-architect.partner.md) | footer, fat footer, sticky mini-footer, footer SEO, scrolled nav |

### Strategy / Systems
| Slug | Source | Partner | Trigger keywords |
|---|---|---|---|
| `os-systems-architect-copilot` | [source](source-documents/strategy/os-systems-architect-copilot.source.md) | [partner](partner-documents/strategy/os-systems-architect-copilot.partner.md) | backend, workflow, admin dashboard, portal, RLS, automation |
| `os-systems-audit-specialist` | [source](source-documents/strategy/os-systems-audit-specialist.source.md) | [partner](partner-documents/strategy/os-systems-audit-specialist.partner.md) | audit, find bugs, edge cases, scale, what could break |
| `os-mermaid-systems-mapping` | [source](source-documents/strategy/os-mermaid-systems-mapping.source.md) | [partner](partner-documents/strategy/os-mermaid-systems-mapping.partner.md) | diagram, mermaid, flowchart, state machine, visualize |

## How the router should use this

1. Match the user's prompt against partner-doc trigger keywords.
2. Surface the matched partner doc(s) as decision filters.
3. If a brand-specific (Cochrane Master Builders) document covers the same topic, that document wins on aesthetics; the general partner doc still applies for craft baseline / accessibility / performance.
4. Never modify source files. Adaptation lives in partner docs only.

> Full registration into `decision-index.ts`, `decision-input.ts`, `DECISION_ROUTER.md`, and `INDEX.md` to follow in a separate pass — pinging the router doesn't break in the meantime; the documents are present and discoverable on disk.
