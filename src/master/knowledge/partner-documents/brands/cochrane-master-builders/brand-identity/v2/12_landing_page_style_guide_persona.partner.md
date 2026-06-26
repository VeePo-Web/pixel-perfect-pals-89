---
doc: 12_landing_page_style_guide_persona
brand: cochrane-master-builders
authority_set: cmb-master-style-guide-v2.0
status: active
priority: 4
scope: homepage + every service hub, service detail, process, and service-area landing page
upstream_source: src/master/knowledge/source-documents/brands/cochrane-master-builders/brand-identity/landing-page-style-guide-persona.source.md
upstream_sha256: eca6f5cae359 (truncated; full hash in .integrity/manifest.json)
embedded_from: src/master/knowledge/source-documents/brand-identity/colours-and-shapes-experience-philosophy.v3.source.md
captured_via: scripts/source-docs/capture-source.mjs (byte-for-byte)
defers_to:
  - 01_brand_identity_north_star.partner.md (north star, brand spine, master line)
  - 09_voice_messaging_lexicon.partner.md (voice, banned words)
  - 11_performance_accessibility_governance.partner.md (a11y + perf hard floors)
governs:
  - 13_landing_page_operating_manual.partner.md
  - all per-cluster landing page implementations
---

# CMB Landing Page Style Guide Persona (v2.0)

## What this is

The **Colours & Shapes Experience Philosophy v3** persona, adopted verbatim as the official **Landing Page Style Guide persona** for Cochrane Master Builders. It is the visual-experience authority every CMB landing page (homepage, service hub, service detail, process, service-area) must be reasoned through before component code is written.

The full persona text lives at the upstream source path above and is byte-locked by the integrity gate (`scripts/source-docs/validate-source-docs.mjs`). Do **not** restate the persona here. Read it directly when designing or auditing.

## Why "landing page" specifically

CMB landing pages are the highest-stakes surfaces in the system: they carry the family-legacy promise, host the conversion forms, and set the visual standard every cluster page inherits. They demand the persona's strongest moves — disciplined breath, editorial restraint, copper accents used like punctuation, and a strict refusal of decorative noise.

## Conflict resolution

When the persona disagrees with a higher-priority doc, the higher-priority doc wins. Order:

1. `01_brand_identity_north_star` — brand spine, master line, customer truth.
2. `09_voice_messaging_lexicon` — voice and banned-word list.
3. `11_performance_accessibility_governance` — a11y and performance floors.
4. **This persona** — visual-experience philosophy.
5. `13_landing_page_operating_manual` — concrete tokens and decision rules derived from this persona.
6. Component code.

If a persona instruction would force a banned word, a sub-AA contrast pair, a font size below 13px, or a CLS above the perf floor, drop the persona instruction.

## How to use

- **Designing a new landing page** → read this persona end-to-end first, then open `13_landing_page_operating_manual` for the concrete tokens, then the relevant cluster overlay in `03_color_authority`.
- **Auditing an existing landing page** → run the grep bundle from `13` and the visual checklist; cite the persona section number when filing a Pass/Fail.
- **Extending to a new archetype** → propose the archetype as a PR to `13`; do not edit this persona file or the source.

## Integrity

- Source is captured byte-for-byte; any drift fails CI.
- This partner doc is the only place CMB authority references the persona.
- Replacing the persona requires a new versioned partner doc (e.g. `12_…_v2.1`) and a fresh source capture.
