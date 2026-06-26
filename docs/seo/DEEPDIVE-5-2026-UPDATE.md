# Deep Dive 5 — 2026 Verification, Corrections, Build-State & New Prompts

> **Companion to `BLOG-AISEO-MASTERPLAN.md`.** This pass re-ran fresh mid-2026 research against the masterplan's claims, audited the *actual* current codebase, and produced: (1) a build-state scorecard, (2) what the new data **validates**, (3) **four corrections that supersede** parts of the masterplan, (4) two **new strategic dimensions** the plan didn't cover, and (5) new prompts.
>
> Read order if you only read one thing: **§1 (where you actually are) → §3 (what changed) → §7 (the prompts).**
> Every claim below carries a 2026 source in §9. Last updated: 2026-06.

---

## 0. THE ONE-PARAGRAPH SUMMARY

The masterplan's core thesis is **confirmed harder than ever**: AI crawlers still do not execute JavaScript in 2026 (analysis of 500M+ GPTBot fetches found *zero* JS execution), so this client-only SPA is invisible to every AI engine until it is prerendered — **Phase 0 is still the whole ballgame.** But four things have shifted: **`llms.txt` is effectively dead** for AI-search visibility (Google won't read it; 97% of llms.txt files got zero AI-bot traffic), **word-count and internal-link targets must become *outputs of coverage*, not goals** (2026 evaluators detect padding), and **two risks the plan under-weighted are now decisive** — Google's **scaled-content-abuse** crackdown (the #1 March-2026 enforcement, 50–80% traffic drops) which a mass-generating remix template walks straight into, and the **68% zero-click reality** which means the blog's job is now *citation + branded-search + feeding the money pages*, not raw clicks. The conversion happens on the Areas/service pages and through brand recall — the blog earns the awareness.

---

## 1. CURRENT BUILD-STATE SCORECARD (audited from the live code)

The masterplan is a **plan**. As of this audit, the **infrastructure is not built** — the template ships with a world-class *interface* and an empty *engine*. This is the real starting line:

| Phase / Asset | Plan says | **Actual code state** | Evidence |
|---|---|---|---|
| **Phase 0 — Static render** | Release blocker | ❌ **NOT DONE.** 100% client-side SPA. No SSG/prerender in `vite.config.ts`; `index.html` ships empty `<div id="root">`. | `vite.config.ts:1-68`, `index.html:99-102` |
| **JSON-LD emission** | Move to static HTML | ⚠️ **useEffect-injected** (invisible to prerender's first paint & to non-JS crawlers). | `BlogPostingSchema.tsx:30-91`, `AreasSEOSchema.tsx:27-50` — `document.createElement` in `useEffect` |
| **Schema builders** | Keep | ✅ Excellent, stable `@id`s, ready to emit statically. | `seoGraph.ts:1-303` |
| **Phase 1 — robots.txt** | Allow AI crawlers + Sitemap line | ⚠️ **PARTIAL.** Allows all via `*` but **Sitemap line commented out**; no AI bots named explicitly. | `public/robots.txt:17` |
| **Phase 1 — sitemap** | Wire discovery | ✅ Generator works (predev/prebuild) but **emits relative URLs** (BRAND_URL unset). | `scripts/generate-sitemap.ts:1-92` |
| **Phase 1 — llms.txt** | Build it | ❌ Absent — **but see §3.1: now low-priority by design.** | — |
| **Phase 2 — sections model** | Typed `sections[]` | ❌ **NOT DONE.** Body renders as a plain string (`whitespace-pre-line`). No real `<h2>/<table>`. | `BlogPost.tsx:130`, `blogData.ts:12-64` |
| **Phase 2 — BlogPost interface** | Rich | ✅ Rich (faq+intent, tldr, outline, wordCount, about, hubGovernance) — **but no `sections[]`, no `citations[]`, no `keyTakeaways`.** | `blogData.ts:12-64` |
| **Phase 3 — content** | Cluster per remix | ❌ Empty: `blogPosts = []`, `hubRegistry = []`. | `blogData.ts:79` |
| **Phase 4 — freshness** | Visible "Updated", stale script | ⚠️ `modifiedAt` exists; no prominent surface, no stale-flag script. | `BlogPost.tsx:98` |
| **Phase 5 — variance / doorway** | Wire `contentVariance` | ❌ `contentVariance.ts` **exists but is imported nowhere** (CommunityPage doesn't use it). | `contentVariance.ts` (unused) |
| **Author entity** | Full Person graph + author route | ⚠️ **PARTIAL.** `Author` has only `name/role/bio/image/url`; **no `sameAs`/`knowsAbout`/`hasCredential`**; `AUTHORS = {}`; **no `/authors/:slug` route.** | `remix-variables.ts:44-55,368-371`, `App.tsx:1-68` |
| **CWV — fonts** | Self-host | ❌ Google Fonts **CDN** (render-blocking). | `index.html:68-71` |
| **Conversion + geo bridge** | One CTA, Areas↔Blog loop | ✅ `ConversionBar` wired (BlogPost + CommunityPage); `GuidesForLocation` + geo bridge wired. | `BlogPost.tsx:183-193`, `CommunityPage.tsx:456` |

**Read this table as the to-do list.** Everything marked ❌/⚠️ is a prompt in §7 of the masterplan (A–Q) or §7 here (R–V). Greens are real assets to build on, never replace.

---

## 2. WHAT 2026 RESEARCH *VALIDATES* (keep it — with sharper numbers)

These masterplan claims held up and now have harder 2026 data. Bake the numbers into briefs and the pitch.

1. **AI crawlers don't run JS → Phase 0 is non-negotiable.** Analysis of **500M+ GPTBot fetches: zero JS execution**; GPTBot downloads JS ~11.5% of the time and never runs it. GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Bytespider all fetch raw HTML and move on — **no render, no second attempt.** "A React SPA may rank on Google while being entirely blank to every AI crawler." *(Lantern, Passionfruit, Contently — 2026)*
2. **Author-entity verification decides AI citation.** Authors with `Person` schema + `sameAs` to **≥2 external platforms** + **5+ articles** on a topic show measurable citation lift in **3–6 months**; people mentioned positively across **4+ independent platforms are 2.8× more likely** to appear in ChatGPT answers. Entity confidence is computed by traversing `sameAs` → Wikidata/LinkedIn/ORCID/registries; thin chains lose citation share. **Validates Prompt N — now with thresholds.** *(LeadGen-Economy, NAV43, ClickRank — 2026)*
3. **Query fan-out rewards self-contained passages.** Pages ranking for **both the main query AND its fan-out sub-queries are 161% more likely to be cited** in AI Overviews; AI Mode expands one query into **8–12 parallel sub-queries.** **Validates the spoke=sub-query model and the section-as-passage rule.** *(wellows, upGrowth, Conductor — 2026)*
4. **Format mix: listicle-first + articles + original data.** Listicles = **21.9% of AI citations (40.9% of *commercial*-intent)**; articles = 16.7% and cited **2.7× more on informational** queries; adding **original statistics/data lifts visibility up to 40%.** Comparison pages stay marginal. **Validates the format strategy.** *(Search Engine Land / Wix AI Search Lab + HubSpot State of AEO 2026)*
5. **FAQ rich result is retired but the markup still feeds AI.** Confirmed: Google added the FAQ deprecation notice **May 7 2026**; report/Rich-Results-Test support pulled June 2026; API Aug 2026. Markup remains valid and harmless; Q&A structure is still one of the easiest patterns for AI to extract. **Validates "keep emitting FAQPage for AI/voice, stop expecting the SERP dropdown."** *(Search Engine Journal, Search Engine Land, The HOTH — 2026)*
6. **Scaled content abuse "applies no matter how it's created."** Confirms the masterplan's instinct that the engine must add real value at scale — see §4. *(Google Spam Policies; DigitalApplied — 2026)*

---

## 3. CORRECTIONS THAT *SUPERSEDE* THE MASTERPLAN

> Where this section conflicts with the masterplan, **this wins** (it is newer data). Each correction names the masterplan passage it amends.

### 3.1 🔴 `llms.txt` — DOWNGRADE from "build it (Phase 1 / Prompt B)" to "optional, low-priority, do not expect AI-search lift"

**Supersedes:** Masterplan §3 Phase 1 step 3, Prompt B step 2, and the North-Star "llms.txt live" check.

**The 2026 evidence is now decisive and negative:**
- Google's Gary Illyes (July 2025) confirmed Google **does not support** `llms.txt` and isn't planning to; John Mueller compared it to the discredited **keywords meta tag**.
- An **Ahrefs study of 137,000 sites found 97% of `llms.txt` files received *zero* traffic** in May 2026.
- Across **500M+ monitored AI-bot visits over 90 days, only 408 fetched `/llms.txt`.** GPTBot/ClaudeBot/PerplexityBot/OAI-SearchBot/Google-Extended overwhelmingly skip it and crawl HTML directly.
- OpenAI, Anthropic, Google, Meta have **not committed** to reading it in production.

**The corrected stance:** `llms.txt` is a **B2A / agentic-documentation convenience**, not an AI-search-visibility lever. The masterplan was right that "crawlability is the precondition" — but the precondition is satisfied by **static HTML + a clean `robots.txt` + a real `sitemap.xml`**, *not* by `llms.txt`.
- **Do:** still ship a generated `llms.txt` if it's cheap (it is — one token-filled file), purely as a tidy machine-readable index for agentic tools. **Cost is ~zero, so keep it.**
- **Don't:** prioritize it, spend a phase on it, or claim it drives citations. Move it from "Phase 1 deliverable" to a **footnote of Phase 1.** The robots.txt + sitemap wiring is the part of Prompt B that actually matters.

### 3.2 🟠 Word count — REFRAME from "hit 2,200–3,000 (pillar) / 1,200–1,800 (spoke)" to "as long as full coverage requires, and not one word more"

**Supersedes:** Masterplan §B Deep-Dive-2 table ("word count 2,100–2,800… Pillar 2,200–3,000"), North-Star "word count in band."

**2026 data contradicts long-by-default:**
- Backlinko: average top-ranking post = **1,447 words.** Semrush: top-performing content averages **1,152 words**; low performers 668. The competitive sweet spot most studies converge on is **1,500–2,500**, but...
- The **golden rule for 2026 is explicit: "write as much as the topic genuinely needs — and not one word more. Padding to hit a word count is detectable by both readers and AI-powered evaluators,"** and padding is exactly what the Helpful-Content/scaled-content systems demote.

**Corrected rule:** word count is an **output of completeness, never a target.** Briefs should specify **coverage** (every fan-out sub-query answered, every competitor H2 matched + one gap closed) and let length fall where it falls. Soft guidance only: pillars *tend to* land 1,800–2,800 when coverage is complete; spokes 900–1,600; listicles 1,000–1,800. **Never pad to a band.** Delete "fail if under N words" from any linter — replace with "fail if a fan-out sub-query is unanswered."

### 3.3 🟠 Internal links — REFRAME from "flat minimums (≥15 total, ≥8 pillar / ≥4 spoke)" to "density: ~1 contextual link per 200–250 words"

**Supersedes:** Masterplan §B table ("≥15 contextual links/post"), Prompt I step 2 (the `<8`/`<4` hard-fail linter).

**2026 best practice is density-based:** ~**1 contextual internal link per 200–300 words**; short posts 3–5, standard 5–12, long-form 10–25. A flat ≥15 over-links a 900-word spoke into a "list of distractions."

**Corrected rule:** keep the *structural* requirements (every spoke links its hub in the first 200 words + 2 adjacent spokes + 1 area/service page; every hub links all its spokes — these are about *topology*, not count) but make the *volume* check **density-based (≈1 per 225 words, cap ~25)**, not a flat floor. Update Prompt I's linter accordingly (see §7, Prompt R).

### 3.4 🟡 Answer length — SPLIT the single "40–60 words everywhere" rule into two

**Supersedes / refines:** Masterplan §C ("40–60 word answer" used uniformly), passage guidance "100–300 words."

**2026 nuance:** two different surfaces reward two different lengths.
- **Section lead answer (under a question H2):** keep **40–60 words** — this is the *paragraph-featured-snippet* target and the fast AI-extraction grab.
- **The full self-contained passage** an AI Overview lifts is optimally **~134–167 words** (tighter than the masterplan's "100–300"). So: 40–60w direct answer **+** ~80–110w of self-contained expansion = a ~150-word passage that wins both the snippet *and* the fan-out citation.
- **FAQ answers specifically:** **80–150 words get cited more in ChatGPT/Perplexity than 30-word accordion answers.** So FAQ answers should run **longer (80–150w)** than section lead answers — opposite of treating them identically.

**Corrected rule for the sections/FAQ model:** `section.answer` = 40–60w; `section` total (answer+expansion) ≈ 130–170w self-contained; `faq[].answer` = 80–150w. Bake into Prompts C and E.

---

## 4. 🆕 NEW DIMENSION: SCALED-CONTENT-ABUSE DEFENSE (the remix's #1 existential risk)

> The masterplan defends **area pages** against the doorway classifier (geomatrix 4-of-8 gate) but never defends the **blog cluster** against **scaled content abuse** — and a template whose entire value proposition is "remix it for many businesses and auto-generate a cluster each time" is the *textbook* target.

**The 2026 facts:**
- Google defines scaled content abuse as **"generating many pages primarily to manipulate rankings, with little or no value added,"** and it **"applies no matter how it's created"** (AI or hand-written).
- It was the **#1 March-2026 manual-action priority.** Sites publishing **hundreds/thousands of pages without editorial oversight saw 50–80% traffic drops**, and manual actions can mean **full removal from the index, not just a demotion.**
- AI doesn't trigger the penalty; **unoriginal, oversight-free, value-thin scale** does.

**The defense — make it a hard gate in the content engine (new Prompt S):**
1. **Editorial-oversight requirement.** Every generated article passes a human (or persona-as-editor) review before publish — the conformance audit (Prompt J) becomes **mandatory and gating**, not optional.
2. **The Experience injection (the antidote Google rewards).** Each post must carry **first-hand, brand-specific Experience** that an AI commodity article cannot: a real project detail, a real local condition, a real price the business actually charges, a named neighbourhood, an original measurement. This is the same "Experience" E-E-A-T weights and the same thing that separates a citable page from filler. **No post ships as generic, swappable boilerplate.**
3. **Originality per page, not per template.** The content-variance engine (§3.5 / `contentVariance.ts`) is necessary but **not sufficient** — variance defeats *duplicate*-content, not *thin*-content. Each page must add value a reader couldn't get from the SERP's existing top 5.
4. **Don't dump the cluster in one day.** Publish on a **cadence** (the masterplan's daily-publish system, but throttled and reviewed) so the site reads as a maintained publication, not a content dump. A 30-post cluster appearing in 24 hours is a scaled-abuse signal.
5. **Real author, real org, real value chain.** The author-entity layer (Prompt N) is *also* a scaled-abuse defense: oversight-free dumps don't have a verifiable licensed tradesperson attached.

**The test (run before any cluster ships):** for each post, "If I removed the brand name and the local specifics, is there original value left that the top-5 SERP doesn't already give? If no → it is thin, and at scale it is abuse. Rewrite or cut." This is the blog twin of the area-page find-and-replace test.

---

## 5. 🆕 NEW DIMENSION: THE ZERO-CLICK / CONVERSION REFRAME (what "most traffic + convert" really means in 2026)

> Your stated goal is "get the most traffic… and then convert." The 2026 data forces an honest reframe of *how* that goal is now achieved — and the good news is the template is architected for the new reality, it just needs to be *pointed* at it.

**The 2026 reality:**
- **68.01% of Google searches ended without a click** (first four months of 2026); AI Overviews trigger on **~48% of queries**; the **informational-query zero-click rate is 74%.** Top-of-funnel informational content is now **primarily a citation play, not a traffic play.**
- **But citation is the new awareness, and it pays:** brands **cited inside AI Overviews earn 35% more organic clicks and 91% more paid clicks** on the same query than non-cited brands. The citation **"acts like a word-of-mouth recommendation at Google scale."**
- **The surviving clicks are better:** AI-Overview clickers **convert 23% better**, and **visitors arriving after an AI tool recommends a business convert 1.2–5× higher** than traditional organic — AI **pre-qualifies** them.
- **Local is where it still clicks AND converts:** Map Pack = **42% of local clicks**, drives **126% more traffic** than ranks 4–10, **76% of local mobile searches walk into a business within 24 hours**, and **SEO leads close at 14.6% vs 1.7% for cold outbound.** ChatGPT/AI as a *local-recommendation* source jumped **6% → 45% in a single year.**

**The corrected strategy (this reframes the masterplan's executive diagnosis, doesn't replace the build):**

| Funnel stage | 2026 job | Surface in this template | What "winning" looks like |
|---|---|---|---|
| **Informational (blog spokes/pillars)** | **Get cited → build awareness + branded search.** Accept most won't click. | `/blog/*` (sections-as-passages, listicles, original data, author entity) | Brand appears in ChatGPT/Perplexity/AIO answers for "{service} cost/how/signs in {region}". |
| **Branded / consideration** | Convert the awareness into a **branded search** and a site visit. | Consistent entity (NAP, author, positioning sentence) across site + GBP + off-site | "{Brand} {service}" searches rise in GSC; direct visits rise. |
| **Commercial / local (the money pages)** | **This is where the click and the conversion still happen.** | `/areas-we-serve/*` + service pages + GBP/Map Pack | Map-Pack presence; area page ranks "{service} in {city}"; quote-form fills. |
| **The bridge** | Hand the pre-qualified reader from blog → money page → CTA. | geo bridge + `GuidesForLocation` + one first-person CTA (already wired ✅) | No dead ends; every post completes the loop. |

**Net:** stop measuring the blog by raw sessions alone. Measure it by **AI citation rate + branded-search lift + assisted conversions on the money pages.** The blog's traffic *is* awareness; the **Areas/service pages + GBP are the conversion engine**, fed by the awareness and by the high-intent surviving clicks. The template already has the bridge — §7 just adds the measurement and the branded-search discipline.

---

## 6. SHARPENED SPECS (drop-in replacements for the relevant masterplan numbers)

- **Author entity thresholds (amends Prompt N):** require `sameAs` to **≥2** verifiable external profiles (LinkedIn + one of Wikidata/ORCID/industry registry); `knowsAbout` must **match the hub topics** the author writes (topical-alignment scoring); **≥5 posts per author per topic** before expecting citation lift; bio claims must agree with the linked profiles (disagreement downgrades). Author page route `/authors/:slug` is **also** the verifiable node AI traverses.
- **Core Web Vitals by page type (amends Prompt P):** **INP is the most-failed vital (43% of sites fail 200ms)**; **mobile pass rate is only ~48%** and **mobile is the primary ranking signal even for desktop results.** *Blog posts specifically fail LCP via images* → `fetchpriority="high"` + AVIF + prerender; *INP fails on heavy JS* → **code-split `framer-motion` + `lenis` OFF the blog/area content routes** (a reader must not download the cinematic motion bundle). Targets unchanged: LCP <2.5s, INP <200ms, CLS <0.1.
- **Format-by-intent (amends the Deep-Dive-3 matrix):** lead with **listicles** for commercial intent (40.9% of commercial citations) and **articles** for informational (2.7× cited); ship **one original-data asset per hub** (+40% visibility); keep comparison pages ≤1/hub. Listicles render as numbered `<ol>`/`<section>` with each item a self-contained mini-answer.
- **Freshness (amends Phase 4):** AI cites content that is **~25.7% fresher** than classic search; fan-out sub-queries frequently carry explicit **year tags ("2026")**. Surface "Updated {Month 2026}" prominently and use the `{YEAR}` token only where the content is genuinely maintained.

---

## 7. NEW & AMENDED PROMPTS

> Fire alongside the masterplan's A–Q. These either **add** a missing capability or **patch** an existing prompt with the §3 corrections.

### PROMPT R — Patch the discovery + linter prompts with the 2026 corrections (template upgrade)

```
You are an AI-SEO + frontend engineer. Apply four corrections from DEEPDIVE-5-2026-UPDATE.md to the
existing template work. Keep everything token-driven from MASTER_REMIX.

1. llms.txt — DOWNGRADE, don't delete. Still generate public/llms.txt from MASTER_REMIX + the data layer
   (cheap, tidy for agentic tools), BUT: do not gate any build on it, do not reference it in robots.txt as
   if it were a sitemap, and add a header comment stating it is NOT an AI-search-visibility lever (Google
   does not read it; ~97% of llms.txt get zero AI-bot traffic). The discovery levers that matter are static
   HTML + robots.txt + sitemap.xml — make sure THOSE are correct first.
2. robots.txt — uncomment + template the Sitemap: line to {BRAND_URL}/sitemap.xml and name the AI agents
   explicitly (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Claude-SearchBot, anthropic-ai,
   Google-Extended, Applebot-Extended, Amazonbot, CCBot, Bytespider[per brand]). Generate it from MASTER_REMIX.
3. sitemap absolute URLs — fix scripts/generate-sitemap.ts to emit absolute <loc> from MASTER_REMIX.BRAND_URL
   (currently relative — see the file's own TODO).
4. Internal-link linter — change from flat minimums to DENSITY: target ≈1 contextual internal link per 225
   words (cap ~25); still REQUIRE the topology (spoke→hub in first 200 words + 2 adjacent spokes + 1 area/
   service page; hub→all spokes). Do NOT fail a post for word count; DO fail it for an unanswered fan-out
   sub-query or a broken topology link.

VERIFY: build with a test BRAND_URL; paste the generated robots.txt (AI agents + absolute Sitemap line) and a
sitemap.xml snippet (absolute URLs); run the patched linter and paste its density table. tsc + build green.
```

### PROMPT S — Scaled-Content-Abuse Defense Gate (per remix — run as the publish gate for the whole cluster)

```
Act as a senior SEO editor + risk auditor. A remix auto-generates a blog cluster — this is exactly what
Google's scaled-content-abuse policy targets (the #1 March-2026 manual-action priority; 50–80% traffic drops;
penalty applies "no matter how it's created"). Before ANY cluster ships, gate every post:

1. EXPERIENCE INJECTION (the antidote Google rewards): confirm each post carries first-hand, brand-specific
   Experience an AI-commodity article cannot — a real project detail, a real local condition, a real price the
   business actually charges, a named neighbourhood, or an original measurement. Flag any post that reads as
   generic/swappable boilerplate.
2. THE THIN-AT-SCALE TEST (blog twin of the area find-and-replace test): for each post, remove the brand name
   and local specifics — is there original value the top-5 SERP doesn't already give? If no → THIN → rewrite or
   cut. Print a pass/cut table.
3. EDITORIAL OVERSIGHT: make the Prompt J conformance audit MANDATORY and gating for every post (not optional).
4. ORIGINALITY ≠ VARIANCE: confirm contentVariance defeats duplication but each page still adds unique value;
   variance alone does not satisfy this gate.
5. CADENCE: confirm the publish plan throttles releases (not a 30-post dump in 24h) so the site reads as a
   maintained publication. Recommend a schedule.
6. ATTRIBUTION: every post has a real author entity (Prompt N) and links to the real Org — oversight-free dumps
   don't.

Output: a cluster-level risk report (pass / rewrite / cut per post), the recommended publish cadence, and a
go/no-go verdict. Do not mark the cluster shippable until every post passes tests 1–2 and the gate in 3.
```

### PROMPT T — Author-Entity Layer, 2026 thresholds (replaces/【strengthens】Prompt N)

```
You are an E-E-A-T / entity-SEO engineer. Author-entity verification decides AI-Overview citation in 2026
(sameAs to ≥2 platforms + 5+ topical posts → citation lift in 3–6 months; positive mentions across 4+ platforms
→ 2.8× more likely cited in ChatGPT). Build the layer this template is missing, to these thresholds:

1. Expand Author (remix-variables.ts:44) with: sameAs: string[] (REQUIRE ≥2 verifiable — LinkedIn + one of
   Wikidata/ORCID/industry registry), knowsAbout: string[] (MUST match the hub topics the author covers),
   hasCredential?: string[] (trade licence/WCB/manufacturer cert — gold for trades), worksFor = Org @id.
2. Build a crawlable, prerendered /authors/:slug route per AUTHORS entry: photo, bio, jobTitle, credentials,
   knowsAbout, and the list of that author's posts. This page is the node AI traverses — it must be in static HTML.
3. Emit the full personNode() from seoGraph.ts (name, url→author page, image, jobTitle, worksFor, sameAs,
   knowsAbout, hasCredential) and point BlogPosting.author at the Person @id (not an inline minimal object).
4. Render visible credentials + sameAs links in AuthorBio.
5. Consistency rule in remix-variables.ts: bio claims MUST match the linked profiles; never invent credentials;
   one author should own ≥5 posts in a topic before expecting citation lift (don't spread one author thin).

VERIFY: /authors/:slug renders in static HTML with full Person JSON-LD (sameAs ≥2, knowsAbout matching hubs);
BlogPosting.author resolves to the Person @id; tsc + build green. Paste the author page HTML + JSON-LD.
```

### PROMPT U — Branded-Search + Conversion-in-Zero-Click wiring (per remix)

```
Act as a conversion + AI-SEO strategist. In 2026, 68% of searches are zero-click and informational content is a
CITATION play, while the click+conversion happens on the money pages and via branded search. Point this template
at that reality (mostly wiring + copy, the surfaces already exist):

1. THE POSITIONING SENTENCE: define ONE entity-defining sentence for this brand ("{Brand} is the {trade} in
   {region} that {specific differentiator}") and ensure it appears consistently on home, About, author pages,
   GBP, and the off-site runbook — so AI builds a confident entity and cites the brand.
2. BLOG → MONEY-PAGE BRIDGE: confirm EVERY blog post completes the loop (geo bridge + GuidesForLocation +
   exactly one first-person, outcome-named CTA with a friction-reducer). No informational post is a dead end.
3. BRANDED-SEARCH HOOKS: in each post, name the brand + region naturally where an AI answer would quote it, so a
   citation drives a "{Brand} {service}" search (cited brands earn 35% more organic / 91% more paid clicks).
4. MONEY-PAGE PRIORITY: confirm commercial/local intent ("best {service}", "{service} in {city}") routes to
   area/service pages (not blog posts) — that's where the surviving clicks convert (AI-referred visitors convert
   1.2–5×; Map Pack drives 126% more traffic; SEO leads close 14.6% vs 1.7% cold).
5. Add a one-line note to the measurement doc (Prompt Q): track AI citation rate + branded-search impressions
   (GSC) + assisted conversions on money pages — NOT blog raw sessions alone.

VERIFY: every post has one CTA + a working geo bridge (no dead ends); the positioning sentence is identical across
surfaces; commercial keywords map to money pages (cannibalization map clean). tsc + build green.
```

### PROMPT V — Listicle + Original-Data article types (template upgrade, then per remix)

```
You are a topical-authority content architect + frontend engineer. 2026 AI-citation data: listicles = 21.9% of
all citations (40.9% of commercial-intent); original data lifts visibility up to 40%. The template currently has
neither as a first-class type. Add both to the sections model (Prompt C).

1. LISTICLE TYPE: a post variant rendered as a numbered series (<ol> or <section> per item) where EACH item is a
   self-contained mini-answer (a heading + a 40–60w answer + optional detail) — so each item is independently
   citable for a fan-out sub-query. Add postType:"listicle" handling in the renderer + governance.
2. ORIGINAL-DATA ASSET (one per hub, per Prompt L but built into the model): a "state of {trade} in {region}" /
   benchmark post built from REAL data the business has (job counts, real price ranges, seasonal demand, response
   times). Structure: headline stat (tldr) → "Key findings" listicle (5–10 quotable stat bullets) → real <table>
   data → methodology note → Sources. NEVER invent figures; if data is missing, mark the asset "pending data" and
   specify exactly what to collect. Emit BlogPosting (+ Dataset schema where apt). Wire every spoke to link to it.
3. Keep section.answer = 40–60w; full passage ≈130–170w self-contained; faq[].answer = 80–150w (the 2026 split).

VERIFY: a sample listicle renders self-contained numbered items in static HTML; the original-data asset renders a
real <table> + Key-findings + Sources + JSON-LD; spokes link to it. tsc + build green. Paste proof, then remove
samples (blog ships empty) or mark them clearly.
```

---

## 8. UPDATED PRIORITY ORDER & NORTH-STAR ADDITIONS

**Corrected build order (supersedes the masterplan §4 runbook ordering for `llms.txt` and adds the new gates):**

```
INFRASTRUCTURE (once, fixes the template):
  1. Phase 0 prerender (Prompt A)                 ← still THE release blocker (validated harder in 2026)
  2. Discovery: robots.txt + sitemap absolute (Prompt B + R)   ← llms.txt = cheap footnote, not a phase
  3. Article HTML / sections + listicle + original-data (Prompt C + V)
  4. Author-entity layer to 2026 thresholds (Prompt T, replaces N)
  5. Freshness + CWV hardening (Prompt F + P)
  6. citations[] + density linter (Prompt I + R)

PER REMIX (every business):
  7. Set MASTER_REMIX + BRAND_URL + real AUTHORS (with ≥2 sameAs)
  8. Topical map + hubs (Prompt D / /blog)
  9. SERP-first briefs (Prompt K)
 10. Generate cluster — sections model, format-by-intent (Prompt E / /blog)
 11. 🆕 SCALED-CONTENT-ABUSE GATE (Prompt S) — go/no-go before publish
 12. Conformance audit, mandatory (Prompt J)
 13. Branded-search + conversion wiring (Prompt U)
 14. Area-page uniqueness + doorway (Prompt G / /geomatrix)
 15. Off-site consensus runbook (Prompt M)
 16. Final verification (Prompt H) + measurement (Prompt Q)
```

**North-Star additions (append to masterplan §6):**
- [ ] **Scaled-abuse gate passed:** every post carries first-hand Experience; thin-at-scale test passed; cluster published on a cadence, not dumped; conformance audit mandatory.
- [ ] **Zero-click reframe applied:** blog measured by citation rate + branded search + assisted money-page conversions, not raw sessions; one positioning sentence consistent everywhere; commercial intent routes to money pages.
- [ ] **Author entity to 2026 thresholds:** ≥2 verifiable `sameAs`, `knowsAbout` matches hubs, ≥5 posts/author/topic, crawlable author page.
- [ ] **Format mix:** listicle-first for commercial, articles for informational, ≥1 original-data asset/hub, ≤1 comparison/hub.
- [ ] **Corrections live:** `llms.txt` de-prioritized (not a lever); word count = output-of-coverage (no padding); internal links density-based (~1/225w); answer split (section 40–60w / passage ~150w / FAQ 80–150w).
- [ ] **CWV:** motion bundle code-split off content routes; INP <200ms on mobile; LCP image `fetchpriority`; fonts self-hosted.

> **The two sentences that matter most in 2026:** *(1)* If an AI crawler with JS disabled can't read the body + JSON-LD in the first HTTP response, nothing else counts — **prerender first.** *(2)* A remix that auto-generates a cluster without first-hand Experience and editorial oversight isn't building authority, it's building a **scaled-content-abuse manual action** — **gate every cluster before it ships.**

---

## 9. SOURCES (2026)

**AI crawlers & JS rendering:** [Lantern — AI crawlers don't render JS](https://www.asklantern.com/blogs/ai-crawlers-do-not-render-javascript) · [Passionfruit — JS rendering & AI crawlers](https://www.getpassionfruit.com/blog/javascript-rendering-and-ai-crawlers-can-llms-read-your-spa) · [Contently — GPTBot/ClaudeBot/PerplexityBot](https://contently.com/2026/05/06/ai-crawlers-explained-gptbot-claudebot-perplexitybot/)
**llms.txt:** [aeoengine — llms.txt zero usage](https://aeoengine.ai/blog/llms-txt-zero-usage-ai-bots-ignore) · [Kai Spriestersbach — "llms.txt is dead"](https://medium.com/@kaispriestersbach/the-llms-txt-is-dead-more-precisely-a-dud-ab7bee4f469c) · [webyes — what John Mueller says](https://www.webyes.com/blogs/does-llms-txt-improve-rankings/)
**FAQ/HowTo rich results:** [Search Engine Journal — Google drops FAQ rich results](https://www.searchenginejournal.com/google-drops-faq-rich-results-from-search/574429/) · [Search Engine Land — to no longer support FAQ](https://searchengineland.com/google-to-no-longer-support-faq-rich-results-476957) · [The HOTH — FAQ still matters for AI](https://www.thehoth.com/blog/google-faq-rich-results-deprecated/)
**Query fan-out / passages:** [wellows — optimize for fan-out](https://wellows.com/blog/how-to-optimize-for-ai-query-fan-out/) · [upGrowth — fan-out AI Mode + ChatGPT](https://upgrowth.in/query-fan-out-google-ai-mode-chatgpt-explained/) · [Conductor — query fan-out](https://www.conductor.com/academy/query-fan-out/)
**Author entity / E-E-A-T:** [LeadGen-Economy — author-entity verification & AI Overviews](https://www.leadgen-economy.com/blog/eeat-author-entity-verification-ai-overviews/) · [NAV43 — author pages & AI search](https://nav43.com/blog/author-pages-ai-search-visibility-e-e-a-t-guide/) · [ClickRank — E-E-A-T and AI](https://www.clickrank.ai/e-e-a-t-and-ai/)
**Word count / internal links:** [Bluehost — ideal blog length 2026](https://www.bluehost.com/blog/ideal-blog-post-length/) · [12AM Agency — word count for SEO & citations](https://12amagency.com/blog/ideal-word-count-for-seo-and-citations/) · [wellows — internal links per page](https://wellows.com/blog/how-many-internal-links-per-page-seo/)
**Scaled content abuse:** [DigitalApplied — scaled content abuse / March update](https://www.digitalapplied.com/blog/scaled-content-abuse-google-march-update-ai-pages-decimated) · [Google Search — spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · [Google — gen-AI content guidance](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)
**Helpful content / E-E-A-T 2026:** [Keywords Everywhere — E-E-A-T playbook](https://keywordseverywhere.com/blog/google-e-e-a-t-guidelines-an-overview/) · [Analytify — 2026 ranking factors](https://analytify.io/google-ranking-factors/)
**Format / citation share:** [Search Engine Land — AI citations favor listicles/articles/product pages](https://searchengineland.com/ai-citations-favor-listicles-articles-product-pages-study-472364) · [ZipTie — original research wins AI citations](https://ziptie.dev/blog/how-original-research-wins-ai-citations/)
**Core Web Vitals:** [DigitalApplied — CWV 2026](https://www.digitalapplied.com/blog/core-web-vitals-2026-inp-lcp-cls-optimization-guide) · [DigitalApplied — CWV benchmarks 2026](https://www.digitalapplied.com/blog/core-web-vitals-benchmarks-2026-pass-rate-reference)
**Zero-click / conversion:** [SparkToro — <1/3 of searches send a click (2026)](https://sparktoro.com/blog/in-2026-less-than-one-third-of-google-searches-still-send-a-click/) · [Search Engine Land — zero-click 68% (2026 study)](https://searchengineland.com/google-zero-click-searches-2026-study-479717) · [DigitalApplied — zero-click statistics 2026](https://www.digitalapplied.com/blog/zero-click-search-statistics-2026-complete-data)
**Local SEO:** [Hooked Marketing — local SEO statistics 2026](https://hookedmarketing.ca/local-seo-statistics-2026-52-data-points-on-search-clicks-map-pack-leads-and-first-page-roi/) · [Backlinko — local SEO guide 2026](https://backlinko.com/local-seo-guide)
