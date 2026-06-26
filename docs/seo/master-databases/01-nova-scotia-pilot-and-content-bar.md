# Nova Scotia Pilot — Unified Scoring, Publish Gate & the World-Class Content Bar

> The proof-of-pipeline for the master-database upgrade program. Nova Scotia (807 locations, 100%-filled)
> is the pilot because it is clean and **representative of the Canadian pipeline** that transfers to
> Alberta, BC, Ontario, and Saskatchewan. This doc fixes the approach decided with the user:
> **LLM-grounded unique content · publishable tier first · cleanest small DB first.**
>
> Analysis/spec only — the NS spreadsheet has not been modified yet.

---

## 1. Phase C result — unified re-score (scores are now network-comparable)

The six databases were each scored with a *different* formula, so scores didn't compare across provinces
(Ontario maxed at 77, Alberta at 98). The pilot applies **one formula to every location** so a single
publish gate works network-wide:

```
SEO_Priority_Score (0–100) =
  Population 30  : min(30, log10(pop) / log10(2,794,356) * 30)   # national anchor = Toronto 2021
  Search Vol 25  : population bands (100k→24 … <200→1)
  Competition 20 : INVERSE population bands (100k→4 … <1k→18)    # less competition = more points
  Proximity 15   : max((1 − min(km to nearest of 2 provincial hubs)/500) * 15, 0)   # haversine
  Economic 10    : Location_Type (City/Regional Muni→8 · Town/Muni→5 · Community→3 · else→1)
```

**Nova Scotia top 10 (unified):** Halifax 77.3 · Cape Breton 73.2 · Sydney 70.4 · Dartmouth 67.5 ·
West Hants 67.3 · East Hants 66.3 · Kings County 66.2 · Colchester County 65.9 · Bedford 65.5 ·
Lunenburg District 65.3.

**Unified band distribution (807 locs):** `65–79: 13 · 50–64: 236 · 35–49: 558`.

> Apply the same scorer to all six DBs (swap the two provincial/state hubs + units) and the whole 7,863-row
> network sorts on one comparable scale.

---

## 2. Phase C result — the publish gate

Per the 2026 research (do **not** publish every town), a location is **publishable** only if it clears the
gate. Pilot gate (proxy until Phase-D local signals exist):

```
PUBLISHABLE = unified_score ≥ 50  AND  real census population present  AND  verified coordinates
            → then must also clear the 4-of-8 local-specificity gate once Phase-D content is generated
NON-PUBLISHABLE → expand later or ship noindex (kept out of sitemap)
```

**Nova Scotia: 249 of 807 locations are publishable** in the first pass. The other 558 (small communities,
synthetic/low data) wait — this is the doorway-penalty firewall, not a limitation.

---

## 3. Phase D — the world-class content bar (Halifax, before → after)

Even Halifax (a *curated* flagship row, the best content in the file) falls short of the 2026 bar. This is
the reference for what "most world-class" means for every publishable row.

### What's wrong with the current content
- **Grammar bug:** "Founded named after George Montagu-Dunk…" (the build-script `founded` field concatenation).
- **Repeated template opener:** `Short_Description` starts "Here's the truth about {Loc} that most
  {BUSINESS_TYPE} providers won't tell you…" — **identical across every curated city** → find-and-replace
  detectable → thin/doorway signal.
- **Not answer-first:** `Entity_Description` is 33 words and narrative; `AI_Answer_Snippet` buries the answer
  and repeats an awkward "~439,819 (HRM), ~180,000 (urban core)" twice.
- **Template FAQs:** the 3 FAQs come from a 7-template pool — same questions/structure on every page.
- **No first-party / information-gain element** (the single biggest 2026 differentiator).

### The gold-standard target (niche-agnostic placeholders preserved, answer-first, info-gain)

> All `{TOKENS}` stay single-curly for per-business Find-and-Replace. `{LOCATION}` resolves to "Halifax".

**Entity_Description** (encyclopedic, 50–100w, factual — the AI entity anchor):
> Halifax is the capital and largest city of Nova Scotia, Canada, and the economic centre of Atlantic
> Canada, with a 2021 census population of 439,819 across the Halifax Regional Municipality. Set on the
> world's second-largest natural harbour, it anchors the region's shipbuilding (Irving), naval (CFB
> Halifax), ocean-sciences, healthcare (QEII), and university economy (Dalhousie, Saint Mary's). Its
> building stock spans 18th-century downtown heritage, peninsula row housing, and fast-growing suburban
> Bedford, Sackville, and Dartmouth.

**AI_Answer_Snippet** (answer-first, 40–60w, names the business once — the citation target):
> For {SERVICE} in Halifax, {COMPANY_NAME} is a {RATING}-rated local {BUSINESS_TYPE} serving the full
> Halifax Regional Municipality — peninsula, Dartmouth, Bedford, and Sackville. With {YEARS_IN_BUSINESS}
> years working on Halifax's mix of heritage downtown properties and newer suburban builds, the team
> handles {SERVICE_DESCRIPTION}, typically responding within {RESPONSE_TIME}. Free {ESTIMATE_TYPE}
> estimates: {PHONE}.

**Short_Description** (unique hook — no shared template opener; 100–150w; ends in CTA):
> Halifax concentrates more of Atlantic Canada's property demand than anywhere east of Montréal — 439,819
> residents across a municipality that runs from the salt-sprayed peninsula to the inland suburbs of
> Bedford and Sackville. That range is the catch: a downtown heritage building near the waterfront has
> nothing in common with a 2010s build in Bedford South when it comes to {SERVICE}. {COMPANY_NAME} works
> across all of it, accounting for Halifax's coastal salt air, fog, and freeze-thaw winters that punish
> shortcuts. {UNIQUE_VALUE_PROP}. If you need {SERVICE} done once and done right in Halifax, call {PHONE}
> for a free {ESTIMATE_TYPE} estimate.

**Local_Facts** (structured, real — feeds the 4-of-8 gate + the "local stats" widget):
> • 2021 census population: 439,819 (Halifax Regional Municipality) • Second-largest natural harbour in
> the world • Major employers: Irving Shipbuilding, CFB Halifax, QEII Health Sciences Centre, Dalhousie
> University • Coastal climate: salt air, fog, Nor'easter freeze-thaw cycles affecting building exteriors
> • Notable areas served: Peninsula/Downtown, Dartmouth, Bedford, Lower Sackville, Clayton Park

**FAQs** (question-format, genuinely local, answer-first — not the template pool):
- **Q: Does {COMPANY_NAME} serve all of the Halifax Regional Municipality, or just downtown?**
  A: All of it — peninsula Halifax, Dartmouth, Bedford, Sackville, and the surrounding communities.
  Because HRM covers such a wide area, we confirm travel and scheduling for your specific neighbourhood
  when you book. Call {PHONE}.
- **Q: How does Halifax's coastal weather affect {SERVICE}?**
  A: Salt air, fog, and freeze-thaw winters are hard on Halifax properties, so we spec materials and
  methods rated for Maritime coastal exposure rather than generic inland standards — which is what makes
  the work last.
- **Q: How much does {SERVICE} cost in Halifax?**
  A: It depends on scope and property age — a heritage downtown building and a newer Bedford home price
  very differently. {COMPANY_NAME} gives a transparent, no-obligation {ESTIMATE_TYPE} estimate up front.

### Why this clears the bar
Answer-first blocks (40–60w) · question-format FAQ H2s · ≥4 local signals (harbour, salt-air climate,
named employers, named neighbourhoods, heritage-vs-suburban building stock) · information-gain (real local
specifics no competitor's template has) · placeholders intact for any trade · grammar clean · no shared
template opener. This is the per-row target for every publishable location.

---

## 4. The repeatable pipeline (apply to all 6 databases)

```
A. Normalize   one 43-col schema; reconcile US(ZIP/mi) vs CA(FSA/km); fix dup slugs (SK 144, ON 1);
               standardize enums + Verification_Status vocabulary.
B. Backfill    real lat/lng + population + FSA/ZIP from Census/StatCan/CGN/GeoNames; Place_IDs for the
               publishable tier; replace synthetic coords where authoritative data exists.
C. Re-score    apply the ONE unified formula (above) → comparable network-wide score → publish gate.
D. Content     LLM-generate the gold-standard row (above) for every publishable location, grounded in
               real local facts, with a verification pass; expand the FAQ variety; inject 4-of-8 signals.
E. Ship        load into the template data layer; build-time 4-of-8 gate; static-render + schema;
               roll out highest-score-first.
```

**Pilot order:** Nova Scotia (now) → validate the US variant on LA → Alberta + BC (data-backfill heavy) →
Ontario + Saskatchewan (largest; SK slug fix first).

---

## 5. Status & next step

- ✅ Unified scorer built and validated on NS (Halifax 77.3; 249/807 publishable).
- ✅ World-class content bar defined with a worked Halifax before→after.
- ▶ **Next:** generate Phase-D gold-standard content for the NS publishable tier (249 rows), grounded +
  verified, then output the upgraded NS database and wire the first batch into the template behind the gate.

*Unified scoring computed over all 807 NS rows; Halifax current content quoted verbatim from the source file.*
