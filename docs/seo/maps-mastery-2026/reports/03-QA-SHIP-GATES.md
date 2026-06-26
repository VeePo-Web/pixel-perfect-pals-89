# Report 03 — QA Ship Gates (pass/fail before any page ships)

> **What this is.** The hard, binary gates every Areas/Maps/Blog page must pass before it is allowed to index. If any **MUST** fails, the page does not ship. Derived from all five research dossiers.
> **Use:** the build prompts reference these gates by letter. A reviewer runs this list against a sample of generated URLs.

---

## GATE A — Static render (P0, release blocker)

A page fails the whole build if it fails Gate A.

- [ ] **A1** — Fetch the built URL with **JavaScript disabled**. The `<h1>`, primary body copy, and **all `<script type="application/ld+json">` blocks** are present in the raw HTML.
- [ ] **A2** — Internal links (breadcrumb, nearby areas, intent-bridge links) are present as real `<a href>` in the static HTML.
- [ ] **A3** — No SEO-critical content or schema is injected only by `useEffect`/client JS. *(Today's `AreasSEOSchema.tsx` violates this — must be prerendered.)*
- [ ] **A4** — The map is a **facade**: the page renders fully and the JSON-LD is intact even though the live map iframe has not loaded.

**Verify command pattern:** build → fetch route → `view-source` / curl → grep for `<h1`, `application/ld+json`, `areaServed`, the breadcrumb anchors.

---

## GATE B — Publish gate / uniqueness (P0, anti-doorway)

Per area/leaf page:

- [ ] **B1** — **≥4 of 8** local-specificity signals present (landmark · condition · project · code/permit · community · proximity · testimonial · local-FAQ).
- [ ] **B2** — **≥1 first-party element** (named local testimonial OR first-party photo OR named local project).
- [ ] **B3** — **"Remove the city name" test:** delete every instance of the town/region name — meaningfully unique, place-specific content remains.
- [ ] **B4** — ≥60% unique main content vs. sibling pages; 8+ unique data points in the page's data row.
- [ ] **B5** — The page is a genuine destination (own content + CTA), not a thin intermediate funnelling to one contact page (doorway).
- [ ] **B6** — Pages that fail B1–B3 are **skipped or `noindex`** and **excluded from the sitemap** (not shipped thin).

---

## GATE C — Schema / entity (P1, Google + AI)

- [ ] **C1** — `Service` (or `LocalBusiness`) with town-scoped **`areaServed`** emitted statically.
- [ ] **C2** — `geo` (GeoCoordinates), **`hasMap`** (Place-ID Maps URL), **`sameAs`** (GBP + socials) present.
- [ ] **C3** — `BreadcrumbList` + `FAQPage` (matching visible Q&A) + `WebPage` (`dateModified`, `speakable` on the answer block).
- [ ] **C4** — **NAP byte-identical** across page, footer, schema, GBP, citations.
- [ ] **C5** — **No self-serving `aggregateRating`/`review`** on the business's own schema.
- [ ] **C6** — `geoRadius` (if used) is in **metres**; `@id` (Wikidata) added to `City`/`AdministrativeArea` where available.
- [ ] **C7** — Validates in Google Rich Results Test / Schema.org validator with **zero errors**.

---

## GATE D — Content / answer-first / AEO (P1)

- [ ] **D1** — A **40–60 word answer-first block** sits immediately under the page's primary question heading.
- [ ] **D2** — At least one **geo-specific FAQ** (a question only this town would ask) with `FAQPage` schema.
- [ ] **D3** — At least one **information-gain element** AI can't replicate (original local data, named project, first-party photo, named quote).
- [ ] **D4** — One `<h1>`; logical heading hierarchy; section titles **argue** (not "Our Services").
- [ ] **D5** — Visible **"Updated {Month} 2026"** tied to a real change; matches `dateModified`. No date-faking.
- [ ] **D6** — Reading level ~Grade 6–8; no widows; CTA is first-person + outcome (no "Learn More"/"Submit").

---

## GATE E — Performance / CWV (P2)

Mobile, throttled Slow 4G:
- [ ] **E1** — LCP < 2.5s · INP < 200ms · CLS < 0.1 (target 0).
- [ ] **E2** — Lighthouse **Perf ≥ 90 · Accessibility ≥ 95 · Best Practices ≥ 95 · SEO 100**, *with the map on the page.*
- [ ] **E3** — Map is a facade; Maps JS not loaded on cold paint; placeholder is not the LCP element.
- [ ] **E4** — Every image: explicit `width`/`height`, AVIF/WebP, lazy below fold; hero `fetchpriority="high"`.
- [ ] **E5** — Map iframe (when loaded) has a descriptive `title`; facade trigger is a keyboard-operable `<button>`.

---

## GATE F — Discovery / crawler (P1)

- [ ] **F1** — Page URL in `sitemap.xml` with honest `<lastmod>` (only if it passed Gate B).
- [ ] **F2** — `robots.txt` **allows** Googlebot, Bingbot, **OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended**.
- [ ] **F3** — No accidental `Disallow` blocking search/answer crawlers.
- [ ] **F4** — Self-referencing canonical; hreflang reciprocal + valid if bilingual.
- [ ] **F5** — No orphan: page linked from ≥1 hub + nearby/intent-bridge modules.

---

## GATE G — Cannibalization / intent (P2)

- [ ] **G1** — One primary keyword → one URL. Area page = transactional `{service} {city}`; blog = informational (`how much…`, `how to choose…`).
- [ ] **G2** — Area/matrix and CommunityPage/ServiceDetail tiers don't target the same primary term.
- [ ] **G3** — Blog posts link **down** to the matching service/area page; area pages link to relevant blog posts.

---

## The MUST / SHOULD split

**MUST (block ship):** A1–A4, B1–B6, C1, C4, C5, C7, D1, E1, E3, F2, F3, G1.
**SHOULD (fix before scaling):** everything else.

> A single thin page that ships against Gate B can drag the **whole domain** under Google's scaled-content/doorway evaluation. Gate B is not negotiable — when in doubt, `noindex` and enrich later.
