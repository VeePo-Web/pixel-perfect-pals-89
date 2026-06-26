# Prompt 04 — Areas Page Content: Answer-First, E-E-A-T, AI-Citation

> **Goal.** Make every community page win the local pack, local organic, AND AI citations — answer-first, locally specific, freshness-stamped, and wired into the internal-linking pyramid.
>
> **Satisfies:** Gate D (content/AEO), Gate G (cannibalization/intent). **Evidence:** `../research/01`, `../research/03`, `../research/05`.

---

## Tasks (build into `src/pages/CommunityPage.tsx` + content helpers, data-driven)

### 1. Answer-first block (highest AI leverage)
- Directly under the page's primary question heading, a **40–60 word direct answer** to "{service} in {Community}" — self-contained, no preamble. Wrap with `WebPage.speakable`.
- (44.2% of LLM citations come from the first 30% of a page.)

### 2. Geo-specific FAQ (≥1 town-only question)
- Render 3–5 FAQs from the enrichment `localFaq`, including **≥1 question only this town would ask** (permit/bylaw, local condition). Emit matching `FAQPage` schema (note: FAQ rich results retired in Google Search May 2026, but the format still wins AI extraction).

### 3. Information gain (the moat)
- Surface ≥1 element AI can't replicate: original local data point, named project on a named street, first-party photo (descriptive filename + alt), or a named local testimonial. Pull from enrichment; the **publish gate already guarantees ≥1 first-party element** — render it prominently.

### 4. Local specificity in body
- Weave the ≥4 active signals (landmarks, condition note, code note, proximity, community ref) into the `fullDescription` and section copy — naturally, never a city-list block (keyword stuffing).

### 5. E-E-A-T + freshness
- Visible **"Updated {Month} 2026"** tied to a real `dateModified`. Author/credential surface where applicable. Show the address (SAB with a real one). Surface review *justifications*-style proof (specific outcomes), but **no self-serving rating schema**.

### 6. Internal-linking pyramid + intent bridge
- Breadcrumb up to region; **Nearby Areas** module (3–5 nearest, computed) with descriptive geo anchors; link to the relevant **service page**; link to relevant **local blog posts** (intent bridge, wired in prompt 05). No orphans; vary anchor text.

### 7. Conversion (without breaking content-lock elsewhere)
- One first-person + outcome CTA ("Get my free {Community} quote"); friction-reducer microcopy at the click; single primary action.

## Cannibalization rule (Gate G)
- Area page targets **transactional** `{service} {city}`; informational queries (`how much…`, `how to choose…`) belong on the blog. One keyword → one URL. Ensure the matrix doesn't fight CommunityPage/ServiceDetail.

## Verification (paste evidence)
- `tsc --noEmit` + `vite build` green.
- A sample community page (JS off) shows: one `<h1>`, the 40–60 word answer block, ≥1 geo-specific FAQ in both visible text and `FAQPage` schema, a visible "Updated {Month} 2026", and the nearby/intent-bridge links as real `<a href>`.
- Reading level ~Grade 6–8; no "Learn More"/"Submit" CTA; no city-list keyword block.
