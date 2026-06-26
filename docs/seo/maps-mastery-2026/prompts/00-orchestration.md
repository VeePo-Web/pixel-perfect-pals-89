# Prompt 00 — Orchestration (order of operations + guardrails)

> **Role.** You are the lead engineer turning this repo's Areas + Maps + Blog systems into a drop-in, data-swappable, all-Canada + all-US template that ranks #1 in Google local/organic AND gets cited by AI search. You execute the prompts in this folder **in order**, gating each on the previous.
>
> **Read first:** `../reports/00-MASTER-STRATEGY.md`, `01-MAPS-INTEGRATION-PLAYBOOK.md`, `02-NATIONAL-SCALE-TEMPLATE-SPEC.md`, `03-QA-SHIP-GATES.md`. Honor the **canonical-source rule** in report 00 §6.

---

## Guardrails (apply to every prompt)

- **Brainstorm before code.** Present a short plan + the files you'll touch; get approval before writing production code (per the engineering-methodology persona).
- **Stack lock:** React 18 + **Vite** + TypeScript + Tailwind. Do NOT migrate to Next.js/Remix/Astro. Add a dependency only with justification + 2 alternatives named.
- **Data-driven, trade-agnostic:** every business-specific value flows from the config/remix source (`src/config/template/*`) or the data layer — never hardcoded.
- **Tokens only** for styling; components < ~250 lines.
- **Static-render is a release blocker** (Gate A). Nothing ships that injects SEO content/schema only via `useEffect`.
- **The gate is law** (Gate B). No thin page ships; on doubt, `noindex` + exclude from sitemap.
- **Evidence before completion:** `npx tsc --noEmit` green → `npx vite build` green → for matrix/blog, **fetch a built URL with JS disabled and confirm H1 + body + JSON-LD present.** Paste the evidence; never claim "done" without it.
- **Concurrent-tree git protocol:** stage only your own files by path; check the branch before commit/push; rebase don't merge; never force-push.

---

## Order of operations

| # | Prompt | Produces | Gate it satisfies |
|---|---|---|---|
| 1 | `01-static-render-and-discovery.md` | **Release blocker** — SSG/prerender so every Areas/Blog route ships static HTML + JSON-LD; robots.txt (AI bots allowed) + build-time sitemap | A, F |
| 2 | `02-national-geo-data-scaffold.md` | All-CA + all-US `ScaffoldPlace[]` + per-business `AreaEnrichment[]` split + build-time publish gate + variation engine | B |
| 3 | `03-maps-integration-facade-and-schema.md` | Facade map embed + static `Service`/`LocalBusiness` + `areaServed`/`hasMap`/`sameAs` graph (migrate `AreasSEOSchema.tsx` to prerendered) | C, E (map) |
| 4 | `04-areas-page-content-eeat-ai.md` | Answer-first content, geo-FAQ, info-gain, freshness, `speakable`, internal-linking pyramid | D, G |
| 5 | `05-local-blog-engine.md` | Topical-authority blog cluster + intent bridge + BlogPosting/author/FAQ schema + freshness | D, G |
| 6 | `06-cwv-hardening.md` | INP/LCP/CLS budget across the matrix + map at scale | E |
| 7 | `07-per-business-remix-runbook.md` | Per-project: swap in a real business, activate real areas, author enrichment, GBP ops, staged rollout | B, C, F |
| 8 | `08-ai-citation-and-entity-hardening.md` | Off-site entity (`sameAs`, citations, brand mentions), review velocity, AI-local-pack readiness | AI-citation, off-site |

**Before any page ships:** it must pass `../reports/03-QA-SHIP-GATES.md`. MUST-fails block ship.

---

## Definition of done (whole template)

- Every Areas/Blog route is **prerendered** (Gate A verified with JS off).
- The **national scaffold** ships for all CA + US, license-tagged, with the **publish gate** preventing thin pages.
- The **map is a facade**; static geo schema carries the SEO/AI weight; CWV ≥ 90 mobile with the map present.
- The **blog + area matrix** are wired by the intent bridge; no cannibalization, no orphans.
- A per-business deployment can be activated by editing the **data + config only**, with zero structural code change.
