# PROMPT 00 — Master Orchestration

> **Role:** You are a world-class technical + local + AI SEO engineer turning the existing
> Areas-We-Serve and Blog systems into reusable, drop-in templates that scale to **all of Canada** and
> **all 50 US states**, rank #1 in Google, and get cited by AI search. You execute the build prompts
> in `docs/seo-templates/prompts/` in order, gated by `docs/seo-templates/reference/qa-ship-gates.md`.
>
> **Read first (mandatory):** `research/01`, `research/02`, `research/03`,
> `reference/current-implementation-map.md`, `reference/qa-ship-gates.md`.

---

## The mission in one paragraph

Keep the current Areas + Blog systems **exactly as they behave today** (same routes, same components,
same remix contract), but (a) replace the placeholder geography with a **complete, reusable CA + US
geographic scaffold**, (b) add a **uniqueness publish gate** so no thin page can ever be generated,
(c) **static-render** content + schema so AI crawlers can read it, and (d) wire the **AI-SEO
hardening** (llms.txt, robots AI-allows, GeoCircle areaServed, honest lastmod). The result drops into
any project; the operator then runs the **data-population prompt** to make it business-specific.

---

## Iron laws (carried into every sub-prompt)

1. **Gate before you generate.** A page that fails GATE B (Areas) or GATE C (Blog) is never created.
   The template ships the *capability* to cover all of CA + US; it does **not** auto-publish a page
   for every place. (Doing so is scaled-content abuse → domain-level suppression.)
2. **Static HTML or it doesn't ship.** Content + every JSON-LD block in the initial server response;
   verify with JS disabled. (AI crawlers don't run JS.)
3. **One keyword → one URL.** No cannibalization across service / location / blog tiers.
4. **Data-driven, trade-agnostic.** All copy flows from `MASTER_REMIX` + the data arrays; never
   hardcode a trade, city, or brand in a component.
5. **NAP byte-identical** everywhere (page, footer, schema, GBP, citations).
6. **No self-serving review schema** on your own business.
7. **Honest `lastmod`** + visible "Last updated" + a re-audit cadence.
8. **Preserve the existing architecture.** Extend `communities.ts`, `blogData.ts`, `hubRegistry.ts`,
   `remix-variables.ts`, `seoGraph.ts`, `generate-sitemap.ts`, `robots.txt`, `index.html`. Do **not**
   migrate frameworks, swap the router, or convert Tailwind to CSS-in-JS. Add dependencies only with a
   stated justification + two alternatives.

---

## Engineering methodology (from the engineering-methodology persona)

- **Brainstorm → spec → plan → implement (TDD where testable) → verify → report.** No production
  change before an approved plan. No "done" without fresh `tsc --noEmit` + `vite build` evidence in
  the same turn, plus the JS-disabled static-render check on a sample built URL.
- Work in **bite-sized tasks**; commit after each green step.
- **Fix root causes in shared libs** (`seoGraph.ts`, `seo.ts`, generators) over per-page patches.

---

## Execution order

| Step | Prompt | Output |
|---|---|---|
| 1 | `01-areas-template-build-prompt.md` | CA + US geographic scaffold data, the uniqueness engine + GATE B, GeoCircle areaServed, scaled hub/region/community structure |
| 2 | `02-blog-template-build-prompt.md` | Topical-authority engine: pillar/spoke governance, information-gain + answer-first scaffolds, author entities, GATE C |
| 3 | `04-ai-seo-hardening-prompt.md` | Static render/prerender, schema-in-HTML, robots AI-allows, llms.txt, segmented sitemaps with honest lastmod |
| 4 | `03-business-data-population-prompt.md` | **Per project:** swap in real business + real, gated service areas + real blog clusters |

> Steps 1–3 build the **template** (do once, ships in the repo). Step 4 runs **per client project**.

---

## Branch & git protocol (concurrent-tree safe)

This tree may be shared with other tooling. Before committing: `git status` + `git branch --show-current`.
Stage only your files by path (never `git add -A`). Rebase, don't merge. Never force-push a shared
branch. End commit messages with the required co-author trailer. **For this research-and-prompts task
the user explicitly authorized committing directly to `main`.** For the actual build execution,
confirm the target branch with the user first.

---

## Definition of done (template build)

- [ ] `tsc --noEmit` clean, `vite build` green.
- [ ] A sample Areas community URL and a sample blog post URL, **built and fetched with JS disabled**,
      contain the H1, body copy, and all JSON-LD.
- [ ] GATE A/B/C/D in `qa-ship-gates.md` pass on the sample pages.
- [ ] Geography scaffold covers all 13 CA provinces/territories + all 50 US states + DC, in the
      existing `Region`/`Community` shape, with coordinates.
- [ ] Uniqueness gate provably blocks a page with < 4 local signals (write a test).
- [ ] No trade/brand/city hardcoded outside data/config; remix contract intact.
- [ ] Report: what changed (file:line), what was verified, what the operator must supply per business.
