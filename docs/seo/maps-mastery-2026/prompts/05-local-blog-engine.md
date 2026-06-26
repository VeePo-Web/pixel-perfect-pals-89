# Prompt 05 — Local Blog Engine + Intent Bridge

> **Goal.** Build a topical-authority blog cluster that wins informational traffic + AI citations and links **down** into the Areas matrix (the intent bridge). Editorial content is the most-cited content type — this is the citation engine.
>
> **Satisfies:** Gate D (content/AEO), Gate G (intent/cannibalization). **Evidence:** `../research/05`, `../research/03`. **Existing code:** `src/pages/BlogHub.tsx`, `BlogPost.tsx`, `src/components/blog/GuidesForLocation.tsx`.

---

## Tasks

### 1. Hub-and-spoke structure (data-driven)
- Pillar (hub) per core service topic; spokes per long-tail subtopic. Each post has a `cluster`/`hubPage` field; spokes link to hub + 2–3 siblings.

### 2. The intent bridge (the point)
- Every locally-relevant post links **down** to the matching **service page** and **Areas We Serve / {city}** page with descriptive geo anchors.
- Every `{community}` area page links **back** to relevant local posts (extend `GuidesForLocation`). Loop closed, no orphans.

### 3. Proven local post formats (ship templates for these)
Prioritize (see `../research/05` §8): local **cost/price guide**, "how to choose a {trade} in {city}", **problem/symptom diagnostic**, **seasonal/maintenance**, **permit/bylaw explainer**, **neighborhood guide**, **landmark-anchored guide**, **local case study**, **comparison**, **local FAQ roundup**, **original local data report** (best citation magnet). Each = informational intent + ≥1 link down + linked back from the area hub.

### 4. AEO content patterns
- **Answer-first** 40–60 word block under each question heading (front 30% = 44.2% of citations).
- **Information gain** ≥1 original/proprietary element per post (local data, named project, first-party photo).
- Lists/tables for comparisons (text+media = +156% AI selection).

### 5. Schema + freshness
- `BlogPosting`/`Article` (headline, image, datePublished, **dateModified**, `author` as nested `Person` with `jobTitle` + `url` + `sameAs`, publisher) + `BreadcrumbList` + `FAQPage` where Q&A present. All **static** (prompt 01 pipeline).
- Visible **"Updated {Month} 2026"**; refresh program for decaying posts (bump `dateModified` on real changes only).

### 6. Cannibalization guard (Gate G)
- Blog = informational anchors only (`how much…`, `how to choose…`, `signs you need…`). Never target the transactional `{service} {city}` term the area page owns. One keyword → one URL.

## Verification (paste evidence)
- `tsc --noEmit` + `vite build` green.
- A sample post (JS off) shows: one `<h1>`, an answer-first block, `BlogPosting` + `author Person` + `BreadcrumbList` JSON-LD, a visible "Updated {Month} 2026", ≥1 descriptive link **down** to a service/area page, and is linked **back** from at least one area page.
- Keyword map shows no blog↔area cannibalization.
