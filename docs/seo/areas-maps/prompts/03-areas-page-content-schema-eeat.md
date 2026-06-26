# PROMPT 03 — Area Page Content, AI Extraction, E-E-A-T & Freshness

> Fire after Prompts 00–02. Paste this whole file to the build agent.
> Prompts 00–02 made the page **readable, fast, and machine-legible**. This prompt makes the
> page **win the snippet, earn the AI citation, and convert** — without tripping the doorway line.

---

## ROLE

You are the **Local SEO Architect** (`/areas`) + **AI Search Optimization Specialist**
(`/ai-seo`). Frontend only, on `MASTER_REMIX` tokens. Every change must serve Google ranking,
AI citation, and conversion **at once**. Verify with evidence.

## ONE-SENTENCE OBJECTIVE

Restructure each `CommunityPage`/`RegionPage` body for **answer-first AI extraction**, add real
**in-city E-E-A-T** (reviews, proof, author/expertise), and ship a visible **freshness layer** —
so the page is the genuinely-helpful destination Google and AI engines reward.

## WHY / CURRENT STATE

- Pages are **template-strong** (streets `CommunityPage.tsx:264–271`, landmarks `:275–281`,
  tier-language, per-community FAQ `buildFAQs():50–91`) but **extraction-thin**: no answer-first
  question-H2 structure, no in-city reviews, no visible "Last updated", no refresh cadence.
- AI citation + featured snippets + AI Overviews require **answer-first 40–60-word blocks** under
  **question-format H2s**, plus visible freshness (pages <30 days old earn ~3.2× more AI
  citations — Research 03).
- The `faqPageNode()` `speakable` selectors (`seoGraph.ts:171`) reference `.faq-question` /
  `.faq-answer` — **confirm those classes exist in the rendered FAQ DOM** or `speakable` resolves
  to nothing.

---

## THE WORK

### Part A — Answer-first, AI-extractable structure (highest ROI)

1. Give every city page a small set of **question-format `<h2>`s that mirror real conversational
   queries**, each followed immediately by a **self-contained 40–60-word answer `<p>`**, then
   supporting detail. Drive the questions from the local data so they differ per city:
   - "How much does {service} cost in {City}?" → answer with the local price range from
     `GEO_CONFIG.localProof` / `SUB_SERVICES[].range`.
   - "Do you need a permit for {service} in {City}?" → the local permit note.
   - "How long does {service} take in {City}?" → first-party response/lead-time.
   - "What areas of {City} do you serve?" → named neighborhoods/streets + nearest-N.
2. Ensure semantic HTML: exactly **one `<h1>`** (`{Service} in {City}`), logical `h2→h3` nesting,
   `<address>`, `<time datetime>` for dates, `<figure>/<figcaption>` for the hero, lists/tables
   where they extract cleanly (a local price table is a strong AI-citation + snippet target).
3. **Wire `speakable`:** add the `.faq-question` / `.faq-answer` classes to the visible FAQ DOM so
   the `speakable` selectors in `seoGraph.ts` actually resolve. Verify in the rendered output.

### Part B — Local specificity to clear the doorway line (4-of-8, surfaced)

4. Surface **≥4 of the 8 local signals** *visibly on the page* (not just in data): named
   landmark/neighborhood · local condition tied to the service · named local project/proof ·
   permit/code note · local-only FAQ · proximity differentiator · named testimonial · community
   reference. These are the same signals the Prompt 01 gate scored — now they must be **rendered**.
5. Use the **content-variance engine** (`contentVariance.ts pickVariant/fill`) for intro/section
   phrasing so two adjacent cities never read as find-and-replace, while staying deterministic per
   slug (stable across builds/navigations).

### Part C — In-city E-E-A-T (the trust + AI-confidence layer)

6. **Reviews from customers in *this* city**, rendered as crawlable HTML with `Review` /
   `AggregateRating` markup tied to the `LocalBusiness` node. ChatGPT-recommended businesses
   average ~4.3 stars and AI reads review **text**, not just the number (Research 03).
7. **Author/expertise:** the template has an author/E-E-A-T surface (`AUTHORS`, `AuthorBio`,
   author schema) — attach a real `Person` (with `sameAs`) to area content where appropriate, and
   surface staff/certs/years-in-business as proof.
8. **NAP** identical to schema + GBP everywhere; click-to-call `tel:` (E.164).

### Part D — Freshness layer (a first-class AI signal)

9. Add a **visible "Updated {Month} 2026"** stamp near the H1/byline on every area page, driven
   by a real `updatedDate` field — and emit a real `dateModified` in the JSON-LD. Signal weighting
   is `dateModified` > visible date > publish date; **cosmetic bumps are discounted**, so tie the
   stamp to genuine content refreshes (new local stat/project/permit detail) on a **60–90-day
   cadence**. Add year signals to titles where natural ("…in {City} (2026)").
10. Build a lightweight **refresh queue** (e.g. a script that lists area pages whose
    `updatedDate` is >90 days old) so freshness is operational, not a one-time stamp.

---

## VERIFICATION GATE (paste evidence before claiming done)

1. **Extraction structure:** a sample city page has ≥3 question-format `<h2>`s, each with a
   40–60-word answer-first `<p>` directly under it; exactly one `<h1>`; clean `h2→h3` nesting;
   at least one local table/list.
2. **`speakable` resolves:** `.faq-question` / `.faq-answer` exist in the rendered FAQ DOM and
   match the selectors in `seoGraph.ts:171`.
3. **4-of-8 visible:** pick 3 cities — each shows ≥4 distinct local signals **on the page**.
4. **E-E-A-T:** in-city reviews render with valid `Review`/`AggregateRating` (Rich Results Test
   passes); author/`Person` present where used.
5. **Freshness:** "Updated {Month} 2026" visible; `dateModified` in the static JSON-LD matches.
6. `npx tsc --noEmit` + `npx vite build` green; the new structure ships in **static HTML**
   (JS-disabled fetch confirms).

## GUARDRAILS

- No keyword-stuffing the city name; no fake reviews; no cosmetic `dateModified` bumps.
- Don't let an informational answer block cannibalize the commercial page's job — the area page
  stays commercial; deep informational guides live on the blog (one keyword → one URL).
- Keep everything on `MASTER_REMIX` tokens so it remixes cleanly.
- Stay scoped: rendering/discovery = Prompt 00; data/gate = Prompt 01; map/geo-schema = Prompt 02;
  bilingual = Prompt 04.
