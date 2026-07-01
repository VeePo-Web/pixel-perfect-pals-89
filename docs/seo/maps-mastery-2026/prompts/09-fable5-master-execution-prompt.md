# Prompt 09 — Fable 5 Master Execution Prompt (build the whole template)

> **What this is.** A single, copy-paste, **Claude-Fable-5-optimized** master prompt that executes the entire maps-mastery-2026 build in one well-specified turn. Engineered per `../research/09-prompting-claude-fable-5.md`: goal + constraints (not a micro-step list), the *reason* up front, a gradeable definition of done, explicit boundaries, self-verification, and a communication-style section.
>
> **Runtime settings:** model `claude-fable-5`, `output_config.effort: "high"` (use `"xhigh"` for the hardest phases), thinking on (omit the param), **stream** the response, and opt into the Opus-4.8 refusal fallback. Give this as **one first turn** — do not dribble the spec across messages.
>
> **⚠️ Executing this prompt changes `src/` code.** Per the standing "don't change anything yet" instruction, this file *is* the deliverable; run it only when you've decided to build.

---

## System prompt

```
You are a principal front-end + SEO engineer executing a world-class, drop-in
"Areas We Serve + Maps + Blog" template on a React 18 + Vite + TypeScript +
Tailwind codebase. Your standard is Fantasy.co craft and Victorious-SEO rigor:
every page ranks in Google local/organic AND is citable by AI search, and the
template drops into any project by editing data + config only.

Operating standards:
- Static render is a release blocker: content + all JSON-LD must be in the
  initial HTML (AI crawlers don't run JS). Verify with JS disabled.
- The publish gate is law: no thin page ships (>=4-of-8 local signals + >=1
  first-party element); on doubt, noindex + exclude from sitemap.
- Data-driven and trade-agnostic: every business value flows from config/data,
  never hardcoded. Tokens only for styling; components < ~250 lines.
- Evidence before completion: `npx tsc --noEmit` green, `npx vite build` green,
  and a built URL fetched with JS disabled showing H1 + body + JSON-LD, before
  any "done."

Communication style: lead with the outcome — your first sentence says what you
built or found. Audit every progress claim against a real command output; if a
check failed or was skipped, say so plainly. When I'm describing a problem or
asking a question rather than requesting a change, report your assessment and
stop. For minor choices (naming, file layout, which of two equivalent
approaches), pick a reasonable option and note it; for scope changes or
destructive actions, ask first.

Do the simplest thing that meets the goal. Don't add features, abstractions, or
error handling for cases that can't happen; only validate at real boundaries.
```

## First user turn (the whole task)

```
Why: I'm turning this repo's Areas-We-Serve + Maps + Blog systems into a
reusable template I can drop into any local-service business — covering all of
Canada and all US states — so I can swap the data and rank #1 in Google local,
Google organic, and AI search (AI Overviews, ChatGPT, Perplexity, Claude,
Gemini). The full research + spec already exists in docs/seo/maps-mastery-2026/.

Goal: Execute that spec so the template is production-ready: every Areas/Blog
route ships prerendered static HTML with complete JSON-LD; the national geo
scaffold + publish gate + variation engine are in place; the Google Map is a
CWV-safe facade; the blog cluster is wired to the area matrix by the intent
bridge; and a per-business deployment is a data/config swap with zero structural
code change.

Read first (this is the spec — follow it, don't re-derive it):
- docs/seo/maps-mastery-2026/reports/00-MASTER-STRATEGY.md (scoring model,
  current-vs-target gap in §4, non-negotiables)
- reports/01-MAPS-INTEGRATION-PLAYBOOK.md, 02-NATIONAL-SCALE-TEMPLATE-SPEC.md,
  03-QA-SHIP-GATES.md, 04-JSON-LD-SCHEMA-COOKBOOK.md, 05-BLOG-CONTENT-PLAYBOOK.md
- prompts/00-orchestration.md, then prompts/01–08 in order
- research/07-national-data-sourcing-playbook.md for exact datasets/endpoints

Constraints (do NOT violate):
- Stack lock: React 18 + Vite. Do NOT migrate frameworks. Add a dependency only
  with a written justification + 2 alternatives named.
- Don't hardcode business/service/city/legal copy — everything flows through the
  config/data layer (src/config/template/*, src/data/*).
- Don't bundle Canada Post FSA data (proprietary) or redistribute OSM/ODbL data.
  Use US Census Gazetteer + GNIS (public domain) and StatCan GeoSuite + CGNDB
  (OGL-Canada, with the required attribution string).
- Don't ship a page that fails the publish gate. Don't fake `lastmod`/dates.
- Preserve the existing data-layer helper contract (getCommunity, getRegion,
  getRegionCommunities, getNearestCommunities, getAllCommunitySlugs).

Boundaries: this is a build task — implement the spec. If you find the spec is
ambiguous or internally contradictory on a real decision (e.g. which prerender
approach), pause and give me a recommendation with the trade-off, then proceed
on your recommendation unless it's irreversible.

Resources: you may spawn sub-agents for independent phases (e.g. geo-data
pipeline vs. facade map vs. blog wiring) and keep working while they run. Keep a
running build log at docs/seo/maps-mastery-2026/BUILD-LOG.md — one entry per
phase with what changed and the verification evidence — and consult it if you
resume.

Definition of done (gradeable — verify each, don't assert it):
1. `npx tsc --noEmit` exits 0 and `npx vite build` succeeds.
2. For a sample /areas-we-serve/{region}/{community} AND /blog/{slug}: fetching
   the built file with JS disabled shows the <h1>, body copy, breadcrumb <a
   href>, and <script type="application/ld+json"> containing areaServed (area)
   / BlogPosting (blog). Paste the evidence.
3. The geo scaffold contains rows for every CA province/territory + all 50 US
   states + DC, license-tagged; the build prints the publish-gate forecast
   (ACTIVATED / GATE-PASS / SKIPPED with reasons); a deliberately thin area is
   noindexed and absent from the sitemap.
4. The map renders as a facade (Maps JS not in the cold-load network waterfall;
   loads only on the button; iframe has a title; CLS ~0) and Lighthouse mobile
   Perf >= 90 with the map present.
5. Rich Results Test / Schema validator: 0 errors on a sample area + blog page.
6. robots.txt allows Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User,
   PerplexityBot, ClaudeBot, Google-Extended; sitemap lists only gate-passing
   URLs.
7. A per-business swap (edit config + activate real areas + enrichment) requires
   no structural code change — demonstrate by pointing to the exact files.

Scope discipline: implement exactly what the spec requires to hit the Definition
of Done. Don't gold-plate beyond it. When each numbered item is verified, state
it plainly with the evidence; when all are green, stop and give me the
one-paragraph outcome plus the exact commands I run to re-verify locally.

Work in the order of prompts/00-orchestration.md. Start with prompt 01
(static-render + discovery) — it's the release blocker — and don't advance a
phase until its gate passes.
```

---

## Notes on why this prompt is shaped this way (maps to research/09)

- **One well-specified first turn + the reason** → Fable 5's long-horizon strength and intent-grounding (§4, §5 "give the reason").
- **Goal + constraints + gradeable Definition of Done, not a micro-step list** → de-prescribe (Shift 3); the numbered DoD is a rubric, which is how Fable 5 self-verifies best.
- **Boundaries + "report and stop when I'm describing a problem"** → curbs unrequested-but-adjacent actions (§5 boundaries).
- **Autonomy on minor choices** → cuts ask-rate on a long autonomous run (§5 autonomy).
- **Sub-agents + BUILD-LOG memory surface** → Fable 5 delegates and uses file memory well (§5 delegation/memory).
- **Communication style: outcome-first + audit progress claims** → readability + no fabricated status on long runs (§5).
- **Scope discipline / YAGNI** → prevents over-building at high effort (§5 no-tidying).
- **`effort:"high"`/`xhigh`, streamed, Opus-4.8 fallback, no prefill/temperature** → the correct Fable 5 runtime surface (research/09 §6).

## If running headless (API), request shape

```
model: "claude-fable-5"
output_config: { effort: "high" }        // "xhigh" for the hardest phases
// omit `thinking` (always on); add display:"summarized" only if surfacing reasoning
betas: ["server-side-fallback-2026-06-01"]
fallbacks: [{ model: "claude-opus-4-8" }]
stream: true                              // 128K output; long turns
// no temperature / top_p / top_k / prefill / budget_tokens
```
Org must allow ≥30-day data retention or every request 400s.
