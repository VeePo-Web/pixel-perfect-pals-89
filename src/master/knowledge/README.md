# Knowledge Backend — Source-of-Truth Intelligence Layer

This folder is the **backend intelligence layer** for the project. The documents inside are
read by AI assistants (Lovable, Claude Code, etc.) to filter and improve their judgment when
making design, UX, copy, motion, conversion, and architectural decisions.

**These documents are never rendered to end users.** They exist to shape the *reasoning* behind
every front-end and content decision so that outputs feel bespoke, premium, brand-aligned, and
strategically intelligent — at fantasy.co / Apple UX / FROG-tier quality.

---

## Hard rules

1. **Source documents are immutable.** Never edit, summarize, "clean up", reformat, or rewrite
   any file inside `source-documents/`. Embed verbatim. If a source doc contains content that
   feels off-context, the adaptation lives in the partner doc, never in the source.
2. **Source documents are not partner documents.** Source = raw uploaded intelligence.
   Partner = a separate interpretation/usage layer (lives under `partner-documents/` once
   created). The two trees mirror each other.
3. **Embedding a doc never changes the front end.** Embedding is a backend-only operation.
   Visual/UX changes happen in later, explicit work.
4. **One brand per brand folder.** Brand-specific docs go under
   `source-documents/brands/<brand-slug>/...`. Cross-brand frameworks (generic personas,
   experience prompts, design philosophies) go under the top-level category folders.
5. **Every embedded doc is registered.** Add an entry to `INDEX.md` in the same change.

---

## Folder layout

```text
knowledge/
├── README.md          ← this file
├── INDEX.md           ← master registry of every embedded document
└── source-documents/
    ├── personas/              ← cross-brand ICP / persona prompts
    ├── experience-prompts/    ← expert-level "you are a 50yr fantasy.co designer" prompts
    ├── brand-identity/        ← cross-brand identity / voice frameworks
    ├── ui-ux/                 ← UI/UX system thinking
    ├── components/            ← buttons, cards, modals, hover states, etc.
    ├── animations/            ← motion, easing, micro-interaction philosophy
    ├── navigation/            ← nav bar, IA, wayfinding
    ├── footer/                ← footer architecture and content
    ├── forms/                 ← form UX, validation, submission flows
    ├── messaging/             ← copy strategy, tone, voice
    ├── conversion/            ← CRO, conversion psychology
    ├── strategy/              ← cross-brand strategy
    └── brands/
        └── <brand-slug>/      ← brand-specific intelligence (mirrors categories as needed)
```

`partner-documents/` will be added later and will mirror this exact tree.

---

## How AI assistants should consult this folder

When asked to design, build, restyle, write, or refine anything:

1. **Identify the topic** of the request (e.g. nav, footer, button, hero, form, persona, copy,
   motion, SEO, conversion).
2. **Identify the brand context** (which sub-service / brand the request applies to).
3. **Look up matching docs** in `INDEX.md` — first brand-scoped, then global category.
4. **Read the relevant source docs** in full (or the relevant section) before deciding.
5. **Filter all decisions through that intelligence**: tone, hierarchy, motion, layout,
   density, conversion structure, persona empathy, SEO posture.
6. **Never copy source content into the front end.** Use it to shape *judgment*, not to render.

---

## Adding a new document (workflow)

1. Save the file into the correct `source-documents/` subfolder. Do not rename it unless the
   original filename is ambiguous; if you do rename, keep the original name in the index entry.
2. Add a row to `INDEX.md` with: path, brand, category, format, partner-doc status (`pending`
   until a partner doc exists), and a one-line label derived from the filename.
3. Write a **decision rule book** partner document in the mirrored
   `partner-documents/<same-path>/<same-stem>.partner.md`. Partner docs are routing +
   rules + worked examples, NEVER rewrites of source content. Follow the 12-section
   template used by every existing partner doc: (1) source pointer, (2) what it is,
   (3) decision triggers, (4) what it does NOT govern, (5) how to read the source,
   (6) routing precedence, (7) cross-links, (8) rules, (9) anti-patterns,
   (10) worked example, (11) AI prompts to run against the source, (12) linkage to
   guard rails (`src/master/guardrails.ts`).
4. Add the new partner doc to `DECISION_ROUTER.md` under both the **By decision type** table
   (for any new decision shapes it owns) and the **By source doc** index.
5. Keep the source byte-identical to the upload.

---

## Decision routing — start here for any decision

The first stop for any design / copy / UX / SEO / brand / persona / conversion decision is
[`DECISION_ROUTER.md`](./DECISION_ROUTER.md). It maps decision shapes to the partner docs
that govern them, which in turn point at the source docs to actually read. Never improvise
without naming a source.

---

## Searchable Index (programmatic equivalent)

For programmatic / queryable lookup of "what rules apply to this decision", use:

- **Registry**: [`decision-index.ts`](./decision-index.ts) — one typed `DecisionRoute`
  per partner doc, with categories, trigger phrases, and guard-rail linkage.
- **Input schema**: [`decision-input.ts`](./decision-input.ts) — strict Zod schema
  for `goal`, `pageSection`, `audience[]`, `channel`, `category`, `constraints[]`,
  `excludeIds[]`. Each enum value carries hints that compile to required guard
  rails, soft category boosts, and trigger phrases. Use this when free-text alone
  is too fuzzy.
- **Scorer**: [`decision-search.ts`](./decision-search.ts) — pure deterministic
  keyword + category matcher. Exposes `searchDecisions(query)` (free-text) and
  `searchDecisionsStructured(input)` (schema-driven, hard-filtered).
- **CLI**: `bun scripts/decisions.ts "<query>" [--category seo] [--limit 10]`
  with optional structured flags `--section`, `--audience`, `--channel`,
  `--constraint`, `--exclude` — auto-switches to the structured router when any
  structured flag is set.
- **UI**: `/knowledge` (internal route, not in nav, `noindex`) — same scorer plus
  a **Refine** panel exposing the strict schema, and an "Ask AI" button that calls
  the `decision-search-ai` edge function for a semantic fallback when keyword
  score is below `0.35`. The AI receives the same filters and is registry-bounded
  via tool calling, so it can never invent route ids or violate hard constraints.

The registry is the single source of truth for both surfaces. Any new partner
doc must append a `DecisionRoute` entry to keep the index complete.
