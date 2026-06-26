# PROMPT 07 — Entity Graph, Off-Site Presence & Review Velocity

> Fire after Prompts 00–03. Paste this whole file to the build agent.
> On-site is necessary but not sufficient for local + AI ranking. This prompt builds the **entity layer**
> (what the site asserts about the business + author) and the **operational runbook** for the off-site
> signals (directories, review velocity) that the 2026 research shows are decisive — and that AI engines
> actually read. Closes the off-site/entity gap flagged in the docs audit.

---

## ROLE

You are the **AI Search Optimization Specialist** (`/ai-seo`) + **Local SEO Architect** (`/areas`). The
on-site schema work is frontend-on-tokens; the off-site work is a **documented runbook the business owner
executes** (you do not create third-party listings). Verify the on-site schema with the Rich Results Test.

## ONE-SENTENCE OBJECTIVE

Make the business a **resolvable entity** to Google's Knowledge Graph and to AI engines — via a complete
`Organization` + `Person` `sameAs` graph on-site — and ship the **review-velocity + directory runbook**
that the off-site half of local + AI ranking depends on.

## WHY / CURRENT STATE

- `index.html` carries an `Organization` + `WebSite` anchor with a fixed `@id`, but **no `sameAs`** (per
  the AREAS-MAPS-MASTERPLAN inventory). `sameAs` is how Google + AI bind the site to the real-world entity.
- Field-update 02 §3: post-March-2026 core, **`Organization` + `Person` schema with `sameAs` is the
  highest-leverage structured data** for AI entity resolution; **entity trust attaches to the author**, and
  the concrete threshold is **≥3 `sameAs`** (LinkedIn/X/industry + ideally Wikidata).
- Field-update 03 §1: non-Google AI engines lean on **directories/aggregators** — **Yelp appeared in 33%
  of local AI searches; Perplexity used Yelp in every industry.** Off-site presence *is* AI optimization.
- Field-update 01 §4: **review velocity > count** — a **18-day review pause measurably dropped rankings**;
  text reviews beat star-only; 50+ reviews → 266% more likely in the Local Pack.

---

## THE WORK

### Part A — On-site entity graph (frontend, on tokens)
1. Extend the sitewide `Organization` node with **`sameAs`**: the business's GBP/Maps URL, Facebook,
   Instagram/LinkedIn, Yelp/BBB, and any industry association or directory profile — sourced from
   `MASTER_REMIX` (add a `SAMEAS: string[]` token). Keep the existing `@id`.
2. Add `Organization` fields that aid entity resolution where data exists: `logo`, `image`, `telephone`
   (E.164), `address`/`areaServed`, `foundingDate`, `knowsAbout`.
3. **Author/Person entity** (ties to the blog work): each named author gets a `Person` node with
   `jobTitle`, `worksFor` (`@id` → Organization), `knowsAbout`, `hasCredential`, and **≥3 `sameAs`**
   (LinkedIn, X, an industry/association profile; a Wikidata entry if credible). `@id`-link it into the
   graph so author ↔ org ↔ pages form one connected entity.
4. NAP in every node **byte-identical** to the page text, footer, and GBP (it is now an AI-trust signal,
   field-update 01 §3 non-negotiables).

### Part B — Off-site presence runbook (owner-executed; ship as `docs` or an in-repo checklist)
5. Write a **directory/citation checklist** the remix owner runs per business, prioritized for **both**
   Google (GBP) **and** AI engines: GBP (primary category exact), Bing Places, Apple Business Connect,
   **Yelp, BBB, Trustpilot, G2/industry-specific** (these feed ChatGPT/Perplexity), plus the vertical's
   top directories. Each listing's NAP must match the site exactly.
6. Note the **seed-presence targets AI cites** (field-update 02 §6): a genuine presence on the platforms
   AI over-cites (Reddit participation where authentic, a YouTube channel — YouTube correlates **0.737**
   with AI visibility, the single strongest predictor). Document, don't fabricate.

### Part C — Review-velocity operations (the strongest local mover)
7. Ship a **review-generation cadence runbook**: a steady monthly request flow (post-job ask, SMS/email
   template), target **text** reviews (not star-only), and **never let velocity stall >2 weeks** (the
   18-day-pause finding). Track reviews/month as a KPI.
8. **On-site display:** render real reviews as crawlable HTML with `Review`/`AggregateRating` tied to the
   `LocalBusiness` node **only where genuine** — and **never** self-serving `aggregateRating` on the
   business's own page beyond real, displayed reviews (Google's stated rule; QA Gate D).

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **Entity graph:** built HTML's `Organization` node has **≥3 `sameAs`**; a sample author page's `Person`
   node has `jobTitle` + `worksFor` `@id` + **≥3 `sameAs`**; Rich Results Test / Schema validator passes;
   the graph is `@id`-connected (org ↔ author ↔ page).
2. **NAP consistency:** name/address/phone identical across page text, footer, and every JSON-LD node.
3. **Runbooks exist:** the directory checklist + review-velocity cadence are committed as docs/checklists,
   prioritized for Google + AI, with NAP-match instructions.
4. **No fake/self-serving review schema:** any `Review`/`AggregateRating` maps to real, displayed reviews.
5. `npx tsc --noEmit` + `npx vite build` green; new schema ships in **static HTML**.

## GUARDRAILS

- Do **not** create third-party listings or fabricate reviews/profiles — the off-site work is a runbook the
  owner executes with real data.
- `sameAs` must point to **real, owned** profiles; a wrong/aspirational link weakens entity confidence.
- Keep everything token-driven (`MASTER_REMIX.SAMEAS`, `AUTHORS`) so it remixes per business.
- Stay scoped: page content/EEAT rendering = Prompt 03; this prompt owns the **entity graph + off-site +
  review-velocity** layer.
