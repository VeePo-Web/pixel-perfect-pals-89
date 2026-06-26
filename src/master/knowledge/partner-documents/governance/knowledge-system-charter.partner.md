---
layer: partner
category: governance
source: src/master/knowledge/source-documents/governance/knowledge-system-charter.source.md
scope: global-meta
adaptation-required: true
priority: P0-foundational
governs: every other source + partner document in src/master/knowledge/
---

# Partner — Backend Knowledge Embedding Charter

> **Read this first.** This partner document interprets the master governance
> charter that defines how every other document in `src/master/knowledge/` is
> stored, structured, and consulted. It is the constitution of the knowledge
> system. If a future agent is unsure how to embed, route, or interpret an
> incoming document, the answer is in the source charter referenced above —
> filtered through the adaptation notes below.

---

## 1. Document title

**Backend Knowledge Embedding Charter.** Originally uploaded as
`Prompt_to_put_personas_into_back_end_of_code-2.docx`. It is a meta-prompt
addressed to AI coding/design assistants (Lovable, Claude Code, etc.) that
defines the operating contract for the entire knowledge layer.

## 2. Document category

`governance/` — a top-level meta category that sits *above* the domain folders
(`personas/`, `experience-prompts/`, `brand-identity/`, `ui-ux/`, `components/`,
`animations/`, `navigation/`, `footer/`, `forms/`, `messaging/`, `conversion/`,
`strategy/`, `brands/`). Governance documents define the rules by which all
domain documents are embedded and used.

## 3. Main purpose

Establish the immutable contract for embedding backend intelligence:

- Every uploaded source document is stored **verbatim** (`*.source.md`) and is
  never edited, summarised, cleaned up, or paraphrased.
- Every source document gets a **separate partner document** (`*.partner.md`)
  in the mirrored `partner-documents/` tree that explains how to use it.
- The folder taxonomy must remain **clean, logical, scalable** so that future
  agents and humans can locate any document by topic, function, or system.
- Source documents shape **backend judgment**, not direct front-end output.

## 4. What this document should influence

Everything *about how the knowledge system itself operates*:

- The shape of every future `.source.md` file (frontmatter, banner, verbatim
  body, no edits).
- The shape of every future `.partner.md` file (the 12-section template
  enumerated in the charter: title, category, purpose, influence, triggers,
  scope-of-application, output-quality direction, brand/ICP relationship,
  global-vs-specific scope, dependencies, examples, indexing entry).
- The folder structure under `src/master/knowledge/source-documents/` and
  `src/master/knowledge/partner-documents/`.
- The contents of `INDEX.md`, `DECISION_ROUTER.md`, and the typed router files
  (`decision-index.ts`, `decision-input.ts`).
- The behaviour of any agent asked to ingest, route, or consult knowledge.

## 5. Trigger prompts (when to consult this document)

Consult the charter **before acting** on any of the following:

- "Embed this document into the backend."
- "Add this persona / experience prompt / brand doc / spec to the knowledge
  system."
- "Where should this go in `src/master/knowledge/`?"
- "Create a partner document for this source file."
- "How should the source document be stored?"
- "Should I edit / clean up / trim / summarise this uploaded doc?" → answer is
  always **no**; adaptation goes in the partner doc.
- "Add a new category folder under source-documents/."
- "Update the master index / topic index / decision map."
- Any prompt that appears to want to modify a `*.source.md` file in place.

## 6. Scope of application

**Global.** Applies to the entire `src/master/knowledge/` tree and to every
agent that reads from or writes into it. Not surface-bound — it is not about
the hero, the footer, the nav, or any UI component. It is about how the
intelligence layer behind those decisions is curated.

## 7. How it should guide output quality

The charter sets the quality bar that every downstream decision inherits:

- **fantasy.co-level** execution
- **Apple-level** UX cleanliness and precision
- **igloo.inc-level** motion polish
- **World-class** hover states, interaction design, premium component behaviour
- **Deeply intentional, brand-specific** decision-making for every element

When a domain partner document is silent on quality posture, default to this
ceiling. Nothing in this codebase should feel generic, template-grade, or
sister-site fingerprinted.

## 8. Relationship to brand identity, ICP, UX, conversion

The charter is **brand-agnostic** — it governs the *system*, not the brand.
But it is the mechanism by which brand-specific knowledge (the Cochrane
Master Builders strategy/SEO/brand-identity/UX/persona reports already embedded
under `brands/cochrane-master-builders/`) gets layered, prioritised, and
consulted. Every brand-specific source document inherits this charter's
embedding rules. Every brand-specific partner document inherits this charter's
12-section anatomy.

## 9. Global vs specific guidance

**Global / foundational.** This is the highest-priority document in the
knowledge system. If it conflicts with any other partner document on the
*process* of embedding or consulting knowledge, this charter wins. Domain
partner documents win over this charter only on *what to build* (visual,
copy, layout, component decisions) — never on *how the knowledge system
itself operates*.

## 10. Adaptation notes (the conflict rule applied to this very document)

The charter contains references to other contexts that do not apply to this
codebase. Per the charter's own conflict rule, **those references are NOT
removed from the source file.** They are addressed here:

- **"VeePo"** — appears in the trailing instruction block as the example
  brand for which weddings references should be deleted from incoming
  personas. The active brand for this codebase is **Cochrane Master Builders
  Corp.** (custom home builder, Cochrane / Rocky View County / Calgary CMA;
  brand promise: *"Strong Foundations For Those Who Come After Us."*).
  Future agents: substitute Cochrane Master Builders wherever the source
  charter refers to VeePo, but **only inside partner documents and code** —
  never inside `*.source.md` files.
- **"weddings"** — appears in the same instruction block as an example of
  off-brand vocabulary to strip from incoming persona docs. For this
  codebase, the equivalent off-brand vocabulary is anything from the wedding
  industry, tech/SaaS startup vocabulary, or any other non-construction
  vertical. Such vocabulary in incoming personas should be neutralised in
  the partner document (with explicit substitutions) and the source left
  untouched.
- **"WHAT YOU MUST DO"** vs **"DO NOT CHANGE"** apparent contradiction —
  the charter says "delete that in these personas" and also "DO NOT CHANGE
  THE DOCUMENT I GIVE YOU AT ALL." Resolution: the deletion instruction
  applies to the *system's interpretation* of incoming personas (captured
  in the partner doc, e.g., "ignore section X"), **not** to a literal edit
  of the bytes inside the `*.source.md` file. The verbatim rule always wins
  on the source file itself.
- **Trailing duplicate "Here is the document you will add now:" lines and
  curly quotes** — these are artefacts of the upload. They are preserved
  verbatim per the immutability rule.
- **Recommended folder list** — the charter lists `personas/`,
  `experience-prompts/`, `brand-identity/`, `ui-ux/`, `components/`,
  `animations/`, `navigation/`, `footer/`, `forms/`, `messaging/`,
  `conversion/`, `strategy/`. The codebase already has all of these under
  `source-documents/`, plus an additional `brands/` folder for
  brand-scoped corpora and this new `governance/` folder for system-level
  meta documents. Both extensions are permitted by the charter's "AND ANY
  OTHERS YOU DEEM NECESSARY" clause.

## 11. Dependencies / related documents

- `src/master/knowledge/INDEX.md` — master registry; every embed must add an
  entry here.
- `src/master/knowledge/DECISION_ROUTER.md` — explains how the router
  surfaces partner docs at decision time.
- `src/master/knowledge/decision-index.ts` — typed registry of brand-scoped
  partner-doc routes (currently constrained to
  `brand: "cochrane-master-builders"`; widening it requires a deliberate
  schema change, not a drive-by edit).
- `src/master/knowledge/decision-input.ts` — strict input schema with
  `pageSection`, `audience`, `channel`, `category`, `constraints` enums.
- `src/master/knowledge/README.md` — high-level orientation document.
- Every existing `*.partner.md` file under `partner-documents/` — they all
  inherit the 12-section anatomy defined here.

## 12. Practical examples (how to apply this charter)

**Example A — User uploads a "Nav Bar UX Persona" document.**
1. Save verbatim to `source-documents/navigation/nav-bar-ux-persona.source.md`
   with the standard immutability frontmatter and DO-NOT-EDIT banner.
2. Create `partner-documents/navigation/nav-bar-ux-persona.partner.md`
   following the 12-section template, with:
   - triggers: "nav bar", "header", "menu", "primary navigation", "logo lockup",
     "scroll-to-section behavior", "sticky header", "mobile menu"
   - adaptation notes translating any non-construction vocabulary into
     Cochrane Master Builders context.
3. Add an entry to `INDEX.md` under a `Navigation` section.
4. (Optional, deliberate) extend `decision-index.ts` only if the route should
   be discoverable through the typed router — and only after widening the
   `brand` enum or adding a `general` brand variant.

**Example B — User uploads a "Footer Architecture" doc that references
weddings.**
1. Source file is saved verbatim, weddings references included.
2. Partner file explicitly says: "Where the source references wedding
   floorplans / venues / receptions, substitute Cochrane Master Builders
   project archetypes (custom homes, generational renovations, legacy
   estates). Do not edit the source."
3. The router and downstream agents read the partner first, then the
   source through the partner's lens.

**Example C — A future agent is tempted to "clean up" a source file's
typos or formatting.**
- Hard stop. The charter forbids it. If the typo materially confuses
  interpretation, note the correction inside the partner document under
  an "Errata / interpretation notes" subsection of §10.

---

## Indexing / reference entry

| Field | Value |
|------|-------|
| **Lives at (source)** | `src/master/knowledge/source-documents/governance/knowledge-system-charter.source.md` |
| **Lives at (partner)** | `src/master/knowledge/partner-documents/governance/knowledge-system-charter.partner.md` |
| **Governs** | The entire knowledge system: every `*.source.md`, every `*.partner.md`, the folder taxonomy, the master index, the routing layer. |
| **Keywords / topics** | embedding, source document, partner document, immutability, verbatim, folder taxonomy, knowledge governance, charter, dual-layer, do-not-edit, partner template, decision filter, conflict rule, fantasy.co quality bar |
| **Consult when** | Ingesting any new document; deciding where to file an upload; writing a new partner doc; resolving an immutability vs adaptation question; updating `INDEX.md` or the router. |
| **Priority** | P0 — foundational. Read before any other knowledge document on embedding-related questions. |
| **Brand scope** | Brand-agnostic (governs how brand-specific knowledge is layered, but is not itself brand-specific). |
