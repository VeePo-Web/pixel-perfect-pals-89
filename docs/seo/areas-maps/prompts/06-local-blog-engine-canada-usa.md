# PROMPT 06 — Local Blog Engine That Feeds Areas + Maps (Canada + US, Remixable)

> The content engine that turns the `/areas-we-serve` + Maps system into a **prominence
> machine**. This prompt builds the remixable local-blog layer: the cluster matrix, the
> intent-bridge wiring (already scaffolded), the penalty-safe local-specificity gate,
> answer-first + schema-in-static-HTML article output, and scheduled publishing — so any
> remixed business, in any province/state, grows topical authority and AI citations every day.
>
> **Fire AFTER Prompt 00 (static render) and Prompt 01 (geo-data + gate).** A blog post is only
> a ranking/citation asset if it ships in static HTML — same release blocker as the area pages.
> Pairs with [Research 06](../research/06-blog-content-for-maps-local.md) and
> [Research 08](../research/08-local-blog-for-maps-deep-dive-2026.md).

---

## ROLE

You are the **Topical Authority Content Architect** (Victorious-SEO × geomatrix). You build a
content engine, not a publication. Every article is a **hub or a spoke and knows which**; every
spoke carries real local data and bridges to a commercial area/service page. You enforce the
**one-keyword-one-URL** law and the **≥4-of-8 local-specificity gate** as hard publish gates.
Frontend/data only — you do not migrate the framework or touch backend.

## ONE-SENTENCE OBJECTIVE

Populate the template's already-wired blog engine with a **remixable, penalty-safe local cluster
system** — cost/permit/neighborhood/seasonal/case-study spokes bridged to area pages, each
answer-first, ≥500 unique words, ≥1 verifiable local data point, ≥4 of 8 local signals,
`Article`+`FAQPage`+`BreadcrumbList` schema in static HTML, a real author Person entity, and a
visible freshness stamp — published on a scheduled cadence that never trips scaled-content abuse.

---

## CURRENT STATE — what already exists (keep all of it)

| Asset | File | Verdict |
|---|---|---|
| `BlogPost` type with `faq[]`+`intent`, `hubGovernance`, `about{regionSlug,communitySlug}`, `publishedAt`/`modifiedAt`, `wordCount`, `outline`, `tldr` | `src/lib/blogData.ts:12–64` | ✅ Best-in-class shape. Populate, don't redesign. |
| Cross-surface selectors (`getPostsAboutCommunity`, `getPostsAboutRegion`) | `src/lib/blogData.ts:67–72` | ✅ Powers the intent bridge. Keep. |
| Empty `blogPosts: BlogPost[] = []` — ships hub-only | `src/lib/blogData.ts:79` | ✅ Correct scaffold. The work is to fill it. |
| `Hub` + `HubGovernanceData` with `intentProfile`, `linkedRegions`/`linkedCommunities`, `relatedHubs`, `servicePages`, `cannibalizationRisk`, `refreshCadence` | `src/lib/hubRegistry.ts:9–56` | ✅ The intent-bridge + cannibalization governance is already modeled. Keep. |
| Bi-directional bridge UI: "Guides for {Community}" rail on area pages | `src/components/blog/GuidesForLocation.tsx` | ✅ Keep — it renders whatever spokes you add. |

> **The wiring is done. This prompt fills it with penalty-safe local content and enforces the
> gates — it does not rebuild the engine.**

---

## THE WORK (in order)

### 1. Build the cluster matrix (plan before any post)
For the remixed business, generate the spoke queue from `{content-type} × {service} × {community}`,
**hub-first**. Source services from `MASTER_REMIX.SUB_SERVICES`, communities from the gate-eligible
set produced by Prompt 01 (only cities that already cleared the area-page gate are candidates).
Prioritize content types by leverage (see Research 08 §2):

1. **Local cost/pricing guide** (highest leverage — AI-citation magnet) → needs a real `range`
   from `SUB_SERVICES[].range` or `localProof` pricing.
2. **Permit/regulation guide** → needs a real municipal code/permit note.
3. **Neighborhood guide** → needs named local landmarks/streets (from `communities.ts`).
4. **Seasonal/timing guide** → needs a real local condition (climate/season).
5. **Local project case study** → needs a named project from `localProof`.

Output the queue as a table: `content-type | service | community | hubUrl | primaryKeyword |
intent | localSignals available`. **A row with <4 available local signals is not queued** — it
would fail the gate.

### 2. Enforce intent separation (the cannibalization gate)
- Blog owns `{cost|permit|season|neighborhood} {service} {city}` (**informational**); the area
  page owns `{service} {city}` (**commercial**). Never queue a spoke that targets the commercial
  term.
- Maintain the keyword map in `hubGovernance` (`cannibalizationRisk`). Before adding a post, run
  the equivalent of `site:{BRAND_URL} "{primaryKeyword}"` against existing posts/pages — if an
  owner exists, change the angle or drop it.

### 3. Author each spoke to the local gate
Every populated `BlogPost` must satisfy, **enforced as a hard gate before it enters `blogPosts`**:
- **≥ 500 unique words**, **30–40% differentiation** from sibling posts (use the same
  `contentVariance.ts` FNV-1a primitive the area pages use so two city cost-guides don't read as
  find-and-replace).
- **≥ 1 unique, verifiable local data point** (a real local price range, a real permit rule, a
  named project) — the find-and-replace test: remove the city name, something place-specific must
  remain.
- **≥ 4 of 8 local signals** recorded in the post (landmark/neighborhood, local condition, named
  project, code/permit, community body/event, proximity differentiator, named testimonial,
  city-specific FAQ).
- **Answer-first:** the number/answer in the first 1–3 sentences under each **question-format
  H2** (44.2% of AI citations come from the first 30% of content). Lists/tables where natural.
- **A real author Person entity** in `author{name, role, ...}` linked to an author page with
  `jobTitle` + `sameAs` — Google penalizes content lacking verifiable expertise.
- **`faq[]` with 3+ Q&A** (`intent` tagged) → renders `FAQPage` schema (the highest-leverage AI
  type; stack with `Article`/`BlogPosting` + `BreadcrumbList` + `WebPage` — 3–4 types ≈ 2×
  citations).
- **The intent bridge:** set `about.{regionSlug|communitySlug}` and `hubGovernance.internalLinks`
  so the post links **up to its area/service hub** (descriptive geo-anchor) **+ 2 sibling
  guides**; the area page already renders it back via `GuidesForLocation`. **No orphan posts.**
- **Freshness:** `publishedAt` + `modifiedAt` real; a visible "Updated {Month} 2026" that
  **matches `modifiedAt`**; year in the title.

### 4. Ship schema in static HTML (not `useEffect`)
The post's `Article`/`BlogPosting` + `FAQPage` + `BreadcrumbList` JSON-LD must be in the served
HTML via the Prompt 00 static-render path — same release blocker as the area pages. Verify with a
JS-disabled fetch.

### 5. Scheduled, penalty-safe publishing
- Cap output at **10–15 quality posts/week** (sustained 10+/day is an automated-content red flag;
  AI scales output 2–4×, not 40–100×).
- Use `publishedAt` (future dates) to schedule a **steady drip** (e.g. one/day from an approved
  batch) for a consistent crawl/freshness signal — never a burst.
- Ship borderline posts `noindex` and promote to indexable only when early engagement earns it;
  `noindex` posts stay out of the sitemap.

### 6. The GBP loop (operational, documented in the runbook)
Every published guide → a weekly GBP post that summarizes it and links to it. Keep GBP services,
service pages, and blog topics aligned (Google cross-references them).

---

## VERIFICATION GATE (do not claim done without this)

- [ ] `npx tsc --noEmit` + `npx vite build` green.
- [ ] **JS-disabled fetch** of a built `/blog/{slug}` shows the H1 + body + `<script
      type="application/ld+json">` (`Article` + `FAQPage` + `BreadcrumbList`).
- [ ] Every post: ≥500 unique words, ≥1 verifiable local data point, ≥4 of 8 local signals,
      answer-first under question H2s, real author entity, visible "Updated {Month} 2026" ==
      `modifiedAt`.
- [ ] Intent map clean: no spoke targets a commercial `{service}{city}` term; no two URLs share a
      primary keyword.
- [ ] Every spoke links up to its hub + 2 siblings (no orphans); area pages render the guides back.
- [ ] Sitemap excludes `noindex` posts; publishing cadence ≤ 10–15/week, scheduled not bursted.
- [ ] **Find-and-replace test** passes on a random sample: remove the city name, place-specific
      content remains.

## GUARDRAILS

- Never publish a spoke that can't clear ≥4 of 8 local signals — drop it or gather more data.
- Never let a blog post compete for the area page's commercial `{service}{city}` keyword.
- Never inject schema via `useEffect` — it must ship in static HTML.
- Never fabricate local prices, permit rules, projects, reviews, or an author.
- Never burst-publish or exceed ~10–15/week — depth over breadth; prevention beats a ~6-month
  penalty recovery.
- Verify with `tsc` + `build` + a JS-disabled fetch before claiming the blog engine is live.
