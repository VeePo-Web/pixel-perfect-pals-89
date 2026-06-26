# PROMPT 04 — Bilingual Canada (EN/FR) + hreflang at Scale

> Optional layer — fire when a remix targets Quebec / bilingual Canada. After Prompts 00–03.
> Paste this whole file to the build agent.

---

## ROLE

You are the **international/local SEO specialist**. Frontend + build-script only. Your rule:
**translate intent, not strings.** Verify with evidence.

## ONE-SENTENCE OBJECTIVE

Serve every area page in **distinct EN and FR URLs** with correct **sitemap-method hreflang**
(`en-ca` / `fr-ca` / `x-default`), intent-translated copy, and a language switcher — so a
bilingual Canadian remix ranks in both languages without duplicate-content or hreflang errors.

## WHY / CURRENT STATE

- The geo-data shape already supports a `lang` hint per community (Prompt 01 added `lang?: "en"|"fr"`),
  and many target communities are in Quebec. There is currently **no FR routing, no hreflang, and
  no FR copy.** Auto-translated strings or a single bilingual URL would be a duplicate-content +
  hreflang-mismatch problem (Research 04/05).

---

## THE WORK

1. **Distinct URLs per language.** Mirror the area tree under a FR path:
   - EN: `/areas-we-serve/{region}/{city}/`
   - FR: `/fr/zones-desservies/{region}/{ville}/`
   Each language version is its own crawlable, statically-rendered URL (Prompt 00 applies to both).
   **No auto-redirect by language** — offer a visible switcher; let the user/crawler choose.

2. **hreflang via the XML sitemap (the scale method, not per-page tags).** For each URL, the
   sitemap `<url>` lists `<xhtml:link rel="alternate" hreflang="…">` for **`en-ca`, `fr-ca`, and
   one `x-default`**. Requirements:
   - **Bidirectional + self-referencing** (each version references all versions including itself).
   - **Fully-qualified absolute URLs.**
   - **Canonical must agree with hreflang** (each FR page self-canonicals to its FR URL, not the EN).
   - ISO 639-1 language + ISO 3166-1 alpha-2 region codes.
   Extend `scripts/generate-sitemap.ts` to emit the `<xhtml:link>` alternates per URL.

3. **Translate intent, not strings.** French local search intent diverges from English —
   regenerate the local copy (titles, H1s, question-H2s, FAQs, meta) for FR queries; do not run
   the EN copy through a string translator. Reuse the Prompt 03 answer-first structure in FR.

4. **Quebec defaults.** Tag QC nodes with `lang: "fr"` (Prompt 01 field) so the FR version is the
   primary/default for those communities, while still publishing the EN alternate.

5. **Token + data discipline.** Keep all brand/service language on `MASTER_REMIX` tokens; add an
   FR token set (or a `locale`-keyed token map) so the remix supplies both languages once. The
   language switcher reads the alternate URL from the same data the sitemap uses.

---

## VERIFICATION GATE (paste evidence before claiming done)

1. A FR area URL renders **statically** (JS-disabled fetch shows FR H1 + body + JSON-LD) and
   self-canonicals to its FR URL.
2. The sitemap shows, for a sample city, reciprocal `<xhtml:link>` alternates for `en-ca`,
   `fr-ca`, and `x-default`, all absolute; Google's hreflang validation passes (no "no return
   tag" errors).
3. Canonical agrees with hreflang on both EN and FR pages.
4. The language switcher links EN↔FR for the same community; no auto-redirect occurs.
5. `npx tsc --noEmit` + `npx vite build` green.

## GUARDRAILS

- No auto-redirect by language/IP; no machine-translated strings; no single bilingual URL.
- Canonical and hreflang must never disagree.
- Stay scoped to localization — don't alter the EN content structure (that's Prompt 03).
