# Decision Router — How to Find the Right Source Document for Any Decision

> **Programmatic equivalent:** `decision-index.ts` (typed registry) + `decision-search.ts` (keyword scorer + structured router) power the `bun scripts/decisions.ts "<query>"` CLI and the `/knowledge` UI route, with an AI fallback via `supabase/functions/decision-search-ai`. Use those for queryable lookup; this file remains the human-readable map.
>
> **Strict input schema:** structured queries use `decision-input.ts` — fields `goal`, `pageSection`, `audience[]`, `channel`, `category`, `constraints[]`. Each enum value compiles to (a) free-text trigger phrases, (b) soft category boosts, (c) hard required guard rails. Use the **Refine** panel in the UI or the `--section`, `--audience`, `--channel`, `--constraint`, `--exclude` CLI flags. See *Structured input* below.
>
> **Build-time enforcement:** `bun preflight` runs every guard rail on each build (auto-invoked by the `prebuild` hook) and links every failure back to the partner docs in this router. See `/knowledge/preflight` for the dashboard.

This file is the **first stop** for any AI assistant facing a design, copy, UX, SEO, brand, persona, conversion, or strategy decision on a Cochrane Master Builders (CMB) site or any sister-trade remix.

**How it works**

1. Identify the *shape* of the decision in front of you (e.g. "writing a hero headline", "choosing a meta title", "designing a subcontractor signup form").
2. Scan the **By decision type** table below for the closest match.
3. Open the partner doc(s) listed for that row in the order shown.
4. Each partner doc tells you:
   - What the source doc covers
   - Which section to read first
   - What it does NOT govern
   - Which sibling partner docs to consult alongside
5. Then open the *source* document the partner doc points to and read the relevant section in full before deciding.

**Hard rules**

- Partner docs are routing maps only. They never contain rewrites of source content.
- Source docs (`source-documents/**`) are byte-immutable. Never edit them.
- If two source docs disagree, follow the routing precedence printed inside each partner doc. The default tiebreakers are repeated at the bottom of this file.
- If no partner doc matches the decision shape, fall back to the parent playbook in `src/master/playbooks/` and the brand contract in `src/master/brand/BRAND_BIBLE.md`. Do NOT improvise without naming a source.

---

## By decision type

| Decision shape | Consult in this order |
|---|---|
| Areas-We-Serve page structure / coverage list / SERP intent | `seo-research/1.1.partner.md` → `strategy/1.3.partner.md` |
| Brand voice on a hero, headline, or tagline | `brand-identity/1.2.2.partner.md` → `brand-identity/1.2.1.partner.md` |
| Color palette derivation from master to remix | `brand-identity/1.2.1.partner.md` → `ux-design/1.3.1.partner.md` |
| Competitor framing / how to differentiate | `seo-research/1.1.partner.md` → `strategy/1.2.partner.md` |
| Conversion copy on a service page | `personas-icp/1.4.2.partner.md` (mothers) + `personas-icp/1.4.3.partner.md` (grandfathers) → `brand-identity/1.2.2.partner.md` |
| Family / legacy / generational language | `brand-identity/1.2.1.partner.md` → `brand-identity/1.2.2.partner.md` |
| Footer architecture / trust signals / NAP | `ux-design/1.3.1.partner.md` → `strategy/1.3.partner.md` |
| Form copy and flow for trade-vendor / subcontractor onboarding | `personas-icp/1.4.1.partner.md` → `ux-design/1.3.1.partner.md` |
| Hero image direction (subject, lighting, restraint) | `ux-design/1.3.1.partner.md` → `brand-identity/1.2.1.partner.md` |
| Information architecture / sitemap for a new trade remix | `strategy/1.3.partner.md` → `ux-design/1.3.1.partner.md` |
| Keyword selection / SEO meta titles & descriptions | `seo-research/1.1.partner.md` → `brand-identity/1.2.2.partner.md` |
| Layout density / editorial restraint vs. flash | `ux-design/1.3.1.partner.md` |
| Legacy-buyer (grandfather) empathy in copy | `personas-icp/1.4.3.partner.md` → `brand-identity/1.2.1.partner.md` |
| Master positioning / what business CMB is in | `strategy/1.0.partner.md` → `strategy/1.2.partner.md` (1.2 wins on conflict) |
| Mission statement / "promise to next generation" copy | `brand-identity/1.2.2.partner.md` → `strategy/1.0.partner.md` |
| Mobile UX density / touch target sizing | `ux-design/1.3.1.partner.md` → `personas-icp/1.4.3.partner.md` |
| Mother-buyer empathy / safety / scheduling sensitivity | `personas-icp/1.4.2.partner.md` → `brand-identity/1.2.2.partner.md` |
| Multi-trade backend architecture / sister-site network | `strategy/1.3.partner.md` |
| North Star / overarching site purpose | `strategy/1.0.partner.md` → `strategy/1.2.partner.md` |
| Persona empathy on any audience-facing copy | matching `personas-icp/1.4.x.partner.md` first, then `brand-identity/1.2.2.partner.md` |
| Pricing transparency framing | `personas-icp/1.4.2.partner.md` → `strategy/1.2.partner.md` |
| Reviews / testimonials placement and framing | `ux-design/1.3.1.partner.md` → `personas-icp/1.4.2.partner.md` |
| SEO depth on Areas-We-Serve / local schema | `seo-research/1.1.partner.md` → `strategy/1.3.partner.md` |
| Subcontractor B2B language and partner-portal decisions | `personas-icp/1.4.1.partner.md` → `strategy/1.3.partner.md` |
| Tagline derivation for a remix | `brand-identity/1.2.2.partner.md` → `brand-identity/1.2.1.partner.md` |
| Trust signals on legal / warranty / license pages | `ux-design/1.3.1.partner.md` → `personas-icp/1.4.3.partner.md` |
| Voice & tone arrays in `trade.config.ts` | `brand-identity/1.2.1.partner.md` → `brand-identity/1.2.2.partner.md` |

If your decision touches more than one row, consult **all** matching partner docs and reconcile using the precedence rules below.

---

## By source doc (every partner document, with one-line label)

### Strategy
- [`strategy/1.0_..._Strategic_Business_SEO_UX_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/strategy/1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.partner.md) — top-level strategic business + SEO + UX report (v1.0)
- [`strategy/1.2_..._Strategic_Business_SEO_UX_Report_1.partner.md`](./partner-documents/brands/cochrane-master-builders/strategy/1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.partner.md) — iterated strategic business + SEO + UX report (v1.2)
- [`strategy/1.3_..._Backend_Strategy_Design_SEO_Legacy_Report_1.partner.md`](./partner-documents/brands/cochrane-master-builders/strategy/1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.partner.md) — backend strategy / design / SEO / legacy report (v1.3)

### SEO & Market Research
- [`seo-research/1.1_..._Market_Competitor_AI_SEO_Research_Report_1.partner.md`](./partner-documents/brands/cochrane-master-builders/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.partner.md) — market + competitor + normal SEO + AI SEO research (v1.1)

### Brand Identity
- [`brand-identity/1.2.1_..._Family_Legacy_Standard_1.partner.md`](./partner-documents/brands/cochrane-master-builders/brand-identity/1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.partner.md) — Family Legacy Standard (v1.2.1)
- [`brand-identity/1.2.2_..._Foundations_For_Generations_After_Us_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/brand-identity/1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.partner.md) — "Foundations For Generations After Us" report (v1.2.2)

### UX Design
- [`ux-design/1.3.1_..._Bespoke_Traditional_UX_Design_Phase_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.partner.md) — bespoke / traditional UX design-phase report (v1.3.1)

### Personas / ICP
- [`personas-icp/1.4.1_..._Subcontractor_ICP_UX_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.partner.md) — Subcontractor ICP + UX report (v1.4.1)
- [`personas-icp/1.4.2_..._Mothers_ICP_UX_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/personas-icp/1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.partner.md) — Mothers ICP + UX report (v1.4.2)
- [`personas-icp/1.4.3_..._Grandfathers_ICP_UX_Report.partner.md`](./partner-documents/brands/cochrane-master-builders/personas-icp/1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.partner.md) — Grandfathers ICP + UX report (v1.4.3)

---

## Routing precedence (default tiebreakers)

When two source docs both seem to govern the same decision, use these defaults unless a specific partner doc overrides:

1. **Voice / visual / tone questions** → `brand-identity/*` wins.
2. **Positioning / "what business are we in" / North Star** → `strategy/*` wins; within strategy, **higher version number wins** (1.3 > 1.2 > 1.0).
3. **Keyword / SERP / Areas-We-Serve / AI-search visibility** → `seo-research/1.1` wins.
4. **Audience empathy / language register / objection handling** → matching `personas-icp/1.4.x` wins.
5. **Layout / density / page flow / form architecture** → `ux-design/1.3.1` wins.
6. **Multi-trade backend / sister-site / taxonomy** → `strategy/1.3` wins.

If precedence still doesn't resolve it, surface the conflict in your plan (per `playbooks/PLAN_FIRST_DISCIPLINE.md` §10 Risks) instead of guessing.

---

## Structured input

Free-text alone is fuzzy. The strict schema in `src/master/knowledge/decision-input.ts` lets you pin the routing dimensions explicitly:

| Field | Type | Notes |
|---|---|---|
| `goal` | string (3–240) | **Required.** Free-text intent, joined with synthesized phrases from the other fields. |
| `pageSection` | enum | `home-hero` · `home-body` · `service-page` · `service-area-page` · `about` · `legal` · `partners-vendors` · `footer` · `forms-booking` · `style-guide` · `blog-faq` · `meta-seo` |
| `audience` | enum[] | `mothers` · `grandfathers` · `subcontractors` · `general-homeowner` · `b2b-vendor` · `ai-search-crawler` |
| `channel` | enum | `web-desktop` · `web-mobile` · `email` · `print-collateral` · `voice-search` · `ai-overview` |
| `category` | enum | One of the existing `DecisionCategory` values. Hard pre-filter. |
| `constraints` | enum[] | `wcag-aa` · `motion-restraint` · `no-sister-fingerprints` · `bespoke-only` · `pricing-transparency` · `local-trust-required` · `phone-cta-priority` · `legal-bespoke` |
| `excludeIds` | string[] | Route ids the caller has already rejected. |

**Compilation:** `compileQuery(input)` turns the schema into `{ text, category, boostRails, requiredRails, excludeIds }`. The router then:

1. Pre-filters `DECISION_INDEX` by `category`, `requiredRails`, and `excludeIds`.
2. Runs the keyword scorer against the synthesized `text`.
3. Adds a small score nudge per `boostRails` hit on each route.

Hard rails are derived from the enum values themselves — for example `pageSection: "service-area-page"` *requires* `gr-areas-we-serve-excellence`, and `constraints: ["wcag-aa"]` *requires* `gr-wcag-aa`. A route that doesn't cover those rails is removed from the candidate set before scoring.

### Worked examples

**UI** — open `/knowledge`, type goal, click **Refine**, pick filters. The "Compiled query" strip shows what the router actually applied.

**CLI**
```bash
bun scripts/decisions.ts "hero copy for a 9pm phone read" \
  --section home-hero \
  --audience mothers \
  --channel web-mobile \
  --constraint wcag-aa
```

**Programmatic**
```ts
import { validateDecisionInput } from "@/master/knowledge/decision-input";
import { searchDecisionsStructured } from "@/master/knowledge/decision-search";

const v = validateDecisionInput({
  goal: "service area page meta",
  pageSection: "service-area-page",
  channel: "ai-overview",
  constraints: ["local-trust-required"],
});
if (v.ok) {
  const { results } = searchDecisionsStructured(v.value);
}
```

When NO structured field is set, the router falls back to the original free-text `searchDecisions(query)` path — fully backward compatible.

---

## What this router does NOT do

- It does not contain source content. To actually read intelligence, open the source doc the partner doc points to.
- It does not replace `INDEX.md`. `INDEX.md` registers what's embedded; this router governs what to consult when.
- It does not replace `playbooks/`. Playbooks describe *how* to execute. The router and source docs describe *what truth* to execute against.
