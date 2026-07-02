# Fable 5 Batch Expansion Prompt — Spreadsheet → Live Template Pages + Blogs (20 at a time)

> **What this is.** The in-depth, reusable prompt + harness that takes one master SEO database
> (spreadsheet) at a time and expands the live template with world-class location pages **and** a
> geo-bound blog post per location — 20 locations per batch, pushed straight to GitHub after
> verification. It is the execution engine on top of:
> `00` (familiarization) · `01` (unified score + publish gate + content bar) · `02` (master build
> prompt) · `03` (validated Phase-D per-location content prompt).
>
> **Prompt engineering basis: Claude Fable 5** (`claude-fable-5`). This prompt was written after
> researching the Fable 5 prompting guidance (Anthropic migration guide + claude-api reference,
> 2026-06). The design choices below are deliberate Fable-5 adaptations, not style preferences.

---

## 1. Why this prompt is shaped for Fable 5

Researched behavioral notes → concrete prompt decisions:

| Fable 5 behavior (documented) | Design decision in this prompt |
|---|---|
| Over-prescriptive prompts *reduce* output quality; state goal + constraints, not steps | The agent prompt states the deliverable, the grounding contract, and the quality bar — it does not script sentence-by-sentence procedure |
| Full task spec up front, one well-specified turn, high effort | Each agent gets its complete input bundle (grounding + Phase-D content + assembly contract) in a single message |
| Strong literal instruction-following | Hard rules are few, explicit, and scoped ("zero invented facts", "no tokens in body copy", "write JSON to OUTPATH") |
| Grounded progress claims — audit every claim against evidence | STEP "SELF-VERIFY" requires each concrete fact to trace to the bundle; uncertain facts are omitted, never guessed |
| Parallel sub-agents are dependable | The harness fans out one agent per location, in paced waves (≤7 concurrent) — the pattern validated in `03` |
| Boundaries must be stated explicitly | The prompt names what agents must NOT produce (image URLs, dates, coordinates, region mapping, nearest-communities — all deterministic, assembled by the orchestrator) |
| Autonomy — never ask mid-task | Agents return a one-line status; every ambiguity has a stated default (omit the fact, empty the list) |

**Anti-hallucination architecture** (same as the validated Phase-D engine): numbers and geo facts
are computed/known deterministically and *injected*; the model's job is interpretation and prose.
Every concrete fact in the output must trace to the grounding bundle (or established world
knowledge for famous places, flagged by the confidence rule). Facts the model is not sure of are
omitted — a page with 4 verified local signals beats a page with 8 shaky ones.

---

## 2. The batch harness (how a batch runs)

```
INPUT   one master database (order: Nova Scotia → LA → Alberta → BC → Ontario → Saskatchewan)
        + its full manifest (ALL locations + regions, unified-scored, publish-gated)
        docs/seo/master-databases/<database>/  ← manifest committed BEFORE any batch ships

BATCH   the next 20 publishable locations by unified score (manifest `batch` field)

A. PREP (deterministic, orchestrator)
   - Extract per-location input bundle: manifest row + grounding bundle + Phase-D upgraded row
   - Compute nearest-communities graph (haversine, within the published set only — no 404 links)
   - Map Parent_Region → Region slugs; define/extend the REGIONS array (all regions of the DB)

B. GENERATE (Fable 5 agents, paced waves of ≤7)
   - One agent per location runs THE PROMPT (§3) → writes repo-ready JSON to disk
   - Returns one line: "OK <ID> sig=<n> <status>" — outputs never flood orchestrator context

C. ASSEMBLE (deterministic, orchestrator)
   - Merge agent JSON + deterministic fields (§4) into:
       src/data/locations/<database>.ts     (REGIONS + COMMUNITIES)
       src/data/blog/<database>-posts.ts    (BlogPost[] — one per location)
       src/lib/hubRegistry.ts               (one "Local Area Guides — <DB>" hub, linkedRegions/Communities)
   - communities.ts + blogData.ts import from these modules (contract helpers unchanged)

D. VERIFY (evidence, not confidence)
   - QA gate (§5) on every row  →  npx tsc --noEmit  →  npx vite build
   - Confirm public/sitemap.xml contains every new region/community/blog route

E. SHIP
   - Commit (own files only, Concurrent-Tree protocol) + push to GitHub
   - Record the batch in the manifest README (what shipped, what's next)
```

**Pacing rule (validated in `03`):** never fan out the whole batch at once — a 20+-wide fan-out
trips transient rate limits. Waves of 6–7, each wave completing before the next starts.

---

## 3. THE PROMPT (one agent per location — paste with INPATH/OUTPATH + the TASK line)

```
You are an elite local-SEO + AI-search (GEO) content architect. Your deliverable: the repo-ready
content for ONE location page and ONE geo-bound blog post, for a TRADE-NEUTRAL local-services
website template (React data layer). The template is later rebranded per business at the config
level — so your copy must read as finished, natural editorial prose that works for ANY local
service business (contractor, trades, home services). ZERO {TOKENS} anywhere in your output.
ZERO trade-specific claims ("we install drywall"); speak of "local service work", "projects",
"property owners", "contractors" generically where needed — but keep it concrete about THE PLACE.

INPUT — read the bundle at INPATH. It contains:
  manifest   → real name, slug, type, parent municipality/region, population, score, postal
  grounding  → this location's REAL facts (verified geo data + factual text rich with landmarks,
               employers, history, economy)
  phaseD     → already-validated world-class content for this location (entity description,
               AI answer snippet, descriptions, local facts, FAQs) — written for the spreadsheet
               with {TOKENS}. Mine it for its REAL local specifics and its hooks; do NOT copy
               its tokenized sentences.
  nearest    → nearest published communities (names + km) — usable as real facts

GROUNDING CONTRACT (hard rules):
  - Every concrete fact traces to the bundle, or is established knowledge about a famous place
    you are CERTAIN of. If a detail is uncertain, OMIT it. Never invent a street, landmark,
    employer, statistic, or date. Fewer verified facts beat more shaky ones.
  - Streets: list ONLY real, well-known named streets/roads in this location you are confident
    exist (3–6 for cities/towns). For rural municipalities/counties/districts, prefer named
    communities within them; if unsure of streets, return an empty streets list.
  - No URLs anywhere. No dates, coordinates, or region mapping — the orchestrator owns those.

WRITE (word counts are extraction targets for search/AI snippets — obey them):

1. community.shortDescription (35–60 words) — the hero paragraph under the page H1. A UNIQUE
   opening device per location: lead with whatever is MOST distinctive here (harbour, employer,
   history, growth, geography, building stock). Never a weather cliché unless weather truly
   defines the place. Pure place-intelligence, no sales language.

2. community.fullDescription (130–220 words, 2 paragraphs) — geographic intelligence a local
   would recognise: property types and building stock, neighbourhoods/areas, economy/employers,
   climate as it affects buildings/projects, what makes work here different. This is the page's
   primary SEO content block. ≥4 distinct REAL local signals.

3. community.streets — per the grounding contract above.

4. community.landmarks (4–7) — real named landmarks/institutions/geographic features.

5. community.primaryKeywords (5) — geo-modified patterns a searcher/AI would use, trade-neutral:
   e.g. "contractors in <name>", "<name> home services", "<name> <province-abbr> renovations",
   one neighbourhood-level variant, one "near me"-style conversational variant.

6. blog — ONE genuinely useful, answer-first local guide bound to this location. This is the
   information-gain layer: the article a property owner in THIS place would bookmark.
   - blog.title (≤70 chars) — question- or outcome-led, names the location.
   - blog.metaTitle (≤60 chars, location + intent near front)
   - blog.metaDescription (140–160 chars, compelling sentence, names the location)
   - blog.excerpt (1–2 sentences)
   - blog.tldr (1–2 sentences, direct answer to the title's implied question)
   - blog.outline — the exact H2 list of the article (5–7 H2s; ≥3 phrased as real searcher
     questions)
   - blog.contentMarkdown (900–1,300 words) — structure:
       * Open with a 40–60 word DIRECT ANSWER to the title (snippet/AI-citation target).
       * H2 sections following blog.outline. Under every question-H2, the first 1–2 sentences
         answer directly, then expand.
       * Weave ≥5 real local signals (named areas, landmarks, climate-to-buildings, economy,
         building stock, nearby communities from `nearest`).
       * One markdown table OR one tight bulleted checklist (extractable pattern).
       * A short "Nearby areas" mention using 2–3 names from `nearest` (plain text, no links —
         the template wires links).
       * Close with a 2–3 sentence practical takeaway. NO invented prices, NO invented stats,
         NO business claims, NO "call us" (the template renders CTAs).
   - blog.tags (4–6, include the location name and province)
   - blog.faq — exactly 3 Q&As (question phrased as a real search query; answer-first, 2–3
     sentences; at least one hyper-local — a condition/geography/coverage point only THIS
     location has; trade-neutral). Mark each with intent: "local" or "informational".

7. signals_count — integer, the number of distinct verified local signals used across all fields.
8. verification_status — "Verified" if every self-check passes; "Needs_Review" if you had to
   omit facts or were uncertain anywhere.

SELF-VERIFY before writing (fix until all pass):
  a. Zero invented facts; zero {tokens}; zero URLs; zero trade-specific service claims.
  b. Word counts in range; blog opens with the 40–60w direct answer; ≥3 question H2s.
  c. Find-and-replace test: delete the location name — location-specific substance remains.
  d. shortDescription hook is unique to this place (not a template opener).
  e. streets/landmarks pass the confidence rule.

OUTPUT — write ONE JSON object (UTF-8) to OUTPATH with EXACTLY these keys:
  { "Location_ID", "community": { "shortDescription", "fullDescription", "streets": [],
    "landmarks": [], "primaryKeywords": [] },
    "blog": { "slug", "title", "metaTitle", "metaDescription", "excerpt", "tldr",
    "outline": [], "contentMarkdown", "tags": [], "faq": [ { "question", "answer",
    "intent" } ] }, "signals_count", "verification_status" }
  blog.slug pattern: "<location-slug>-local-guide" unless a more natural keyword slug fits.
Then return ONLY one line: "OK <Location_ID> sig=<n> <status>" or "FLAG <Location_ID> <reason>".

TASK: Location <NAME> (<ID>, slug <SLUG>, unified score <SCORE>, region <PARENT_REGION>).
Input bundle: INPATH. Write output JSON to: OUTPATH.
```

---

## 4. Deterministic assembly (orchestrator-owned — agents never touch these)

| Field | Source |
|---|---|
| `slug`, `name`, `coordinates`, `province`, `country` | manifest (verified spreadsheet data) |
| `region` (slug) | Parent_Region → kebab-case region slug (one Region per Parent_Region, ALL regions of the DB defined up front) |
| `city` | Parent_Municipality if present, else the province name (renders "in <Community>, <City>") |
| `tier` | unified score: ≥67 → 1 · 60–66.9 → 2 · <60 → 3 |
| `nearestCommunities` | haversine among PUBLISHED communities only (4–5 nearest, no 404s) |
| `faqs` (community) | `[]` — CommunityPage generates trade-accurate FAQs from MASTER_REMIX at render time; blog carries the hyper-local FAQPage schema instead |
| `heroImage` | region-level, orchestrator-verified copyright-free URLs only (curl-checked). Agents never emit image URLs |
| blog `author` | template placeholder author (remix contract) |
| blog `publishedAt`/`modifiedAt`/`readingTime`/`wordCount`/`featuredImage`/`hubGovernance`/`about` | orchestrator (dates real, readingTime = words/220, `about` binds post ↔ community for the bi-directional rails) |
| Hub | one `Hub` per database: "Local Area Guides — <DB>", `linkedRegions` = the DB's region slugs, `linkedCommunities` = published community slugs |
| Meta/schema/sitemap | automatic — CommunityPage/RegionPage/BlogPostingSchema/seoGraph read the data layer; `scripts/generate-sitemap.ts` regenerates on every build |

---

## 5. QA gate (run on the assembled batch before commit)

- Every row: 0 `{` tokens in rendered strings · 0 URLs in agent copy · word counts in range ·
  ≥4 signals · unique shortDescription opening device vs neighbours (hook-diversity check) ·
  blog opens answer-first · exactly 3 blog FAQs.
- `verification_status` distribution reported; `Needs_Review` rows are HELD (not wired in).
- Slug collision check across communities + blogs + existing routes.
- `npx tsc --noEmit` green → `npx vite build` green → `public/sitemap.xml` contains every new
  `/areas-we-serve/<region>`, `/areas-we-serve/<region>/<community>`, `/blog/<hub>/<post>` route.
- Commit + push (stage own files by path; never `git add -A`).

---

## 6. Batch ledger & what's next

Progress is tracked in `docs/seo/master-databases/<database>/README.md` (batch → locations →
date shipped). The order of work never changes: finish a database's publishable tier batch by
batch, then move to the next database (NS 249 → LA → AB → BC → ON → SK). The manifest for a
database (ALL locations + regions) is committed before its first batch ships, so the full
inventory is always on record ahead of the pages.
