# PROMPT 02 — Build the Blog Template (Topical-Authority + AI-Citation Engine)

> **Role:** World-class topical-authority content engineer (Victorious SEO × Ahrefs × Kevin Indig
> standard). You extend this repo's existing Blog system (`src/lib/blogData.ts`, `src/lib/hubRegistry.ts`,
> `src/pages/BlogHub|BlogHubPage|BlogPost.tsx`, `src/components/blog/*`) into a reusable template that
> builds **complete topic clusters**, wins **featured snippets + AI Overviews**, and **funnels intent
> down into the Areas matrix**.
>
> **Read first:** `research/02-blog-topical-authority-research.md`,
> `reference/current-implementation-map.md`, `reference/qa-ship-gates.md` (GATE A + GATE C). Obey
> `prompts/00`'s iron laws.

---

## What "template" means here

The blog already ships **empty-by-default** with the right data shapes (`BlogPost`, `Hub`,
`HubGovernanceData`) and the intent bridge (`about.{regionSlug,communitySlug}`,
`getPostsAboutRegion/Community`). Your job is to add the **engine and guardrails** that make any
operator able to drop in a world-class cluster, not to write a specific business's articles. Per-
business content is produced later via `prompts/03`.

---

## Deliverable 1 — Topical-map + cluster governance (research/02 §1)

- Formalize the **pillar → spoke** model in `hubRegistry.ts`/`HubGovernanceData` so every post
  declares: `postType (pillar|spoke)`, its `pillar` URL, `hub`, `relatedPosts`, `servicePages`,
  `refreshCadence`, `cannibalizationRisk`. (Most of this exists — fill gaps, add validation.)
- Add a **build-time cluster validator** (`src/lib/blog/clusterGate.ts`):
  - Every spoke links to its pillar; pillar links to all its spokes.
  - No two posts share a primary keyword (cannibalization → fail).
  - Warn when a cluster has < 8 spokes ("not yet topical authority").
  - Every post has ≥ 3 internal links and (if geo-relevant) `about.{region|community}` set.
- Add a helper that **auto-suggests internal links** from `relatedPosts` + `servicePages` +
  `linkedRegions/linkedCommunities` so authors don't hand-wire equity.

---

## Deliverable 2 — Information-gain + answer-first authoring contract (research/02 §2–§4)

Encode the content rules as **author-facing scaffolding + validation**, not prose generation:

- Extend `BlogPost` (additively) with optional structured fields that enforce the patterns:
  - `informationGain: string` (required non-empty to publish — names the first-party stat / case /
    quote / original data that makes the post non-me-too). The cluster gate **blocks** a post with an
    empty `informationGain`.
  - `keyAnswer: string` (the 40–60-word front-loaded answer, rendered first / used in meta).
  - `faq[]` already exists — validate each answer is self-contained (~130–170 words target) and
    question-shaped.
- Provide an **article skeleton generator** (a TS helper or a docs template) that outputs the
  answer-first structure: question H2s → 40–60-word direct answers → expansion; definition/process/
  comparison/list/FAQ patterns; Grade 6–8 guidance.
- **Reading-grade + widow** guidance surfaced to the author (a lint script is ideal but optional).

---

## Deliverable 3 — Author entity / E-E-A-T (research/02 §5–§6)

- Strengthen `BlogPostingSchema.tsx` + `AuthorBio.tsx` so the `Person` author emits **`sameAs`**
  (LinkedIn / professional profiles / other bylines) from author data — the cross-web author entity.
- Add an **author registry** (`src/lib/blog/authors.ts`) with reusable Person records (name, jobTitle,
  bio, image, `sameAs[]`, author-page URL) referenced by posts — so one real expert's entity compounds
  across the cluster.
- Ensure each post can render **first-hand experience** signals and links to an author page.
- Confirm **no self-serving `aggregateRating`/`review`** anywhere.

---

## Deliverable 4 — Intent strategy + the bridge down into Areas (research/02 §7, research/03 §7)

- The blog targets **informational intent only**; commercial/transactional intent routes to service /
  Areas matrix pages (document the routing; the cluster gate flags a post that targets a commercial
  keyword).
- Strengthen the **down-link**: when a post sets `about.{region|community}`, it must include a
  contextual in-body link to that Areas matrix page (the AI-Overview→conversion funnel). Validate it.
- `GuidesForLocation` already surfaces posts on Areas pages — confirm the reverse bridge is complete.

---

## Deliverable 5 — Schema + freshness (research/02 §5, §9)

- `BlogPosting` + `Person`(+`sameAs`) + `BreadcrumbList` (+ `FAQPage` when Q&A) — **rendered into
  static HTML** (coordinate with `prompts/04`).
- `HowTo` markup allowed for semantic clarity but **expect no rich result** (Google deprecated the UI
  in 2023) — never build content around getting the rich result.
- `datePublished` + `dateModified` + **visible "Last updated"**; the sitemap uses **honest `lastmod`**
  from `modifiedAt`. Add a **refresh-queue surface** (a build report listing posts > 6–12 months since
  `modifiedAt`).

---

## Plan → Build → Verify

1. **Plan** (≤ 12 bullets): schema-field additions to `BlogPost`/`Hub`, the cluster gate, author
   registry, validators, schema diffs. Get approval.
2. **Build** in bite-sized tasks; commit per green step; shared-lib fixes over per-page patches.
3. **Verify (evidence in same turn):** `tsc --noEmit` clean; `vite build` green; cluster gate unit
   test (blocks empty `informationGain`, blocks cannibalization, warns < 8 spokes); a sample post
   **fetched with JS disabled** contains H1 + body + `BlogPosting`/`Person`(`sameAs`)/`BreadcrumbList`
   JSON-LD; GATE A + GATE C pass.
4. **Report:** what changed (file:line), what the operator supplies per business (hand off to
   `prompts/03`).

---

## Never do
- Generate or ship mass AI prose with no information-gain element.
- Allow orphan posts, intent mismatch, or keyword cannibalization.
- Emit self-serving review schema.
- Build content around a deprecated HowTo rich result.
- Claim done without `tsc` + `build` + the JS-disabled static check in the same turn.
