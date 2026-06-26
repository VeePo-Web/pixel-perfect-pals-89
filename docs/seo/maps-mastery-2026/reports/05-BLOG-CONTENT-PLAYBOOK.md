# Report 05 — Local Blog Content Playbook (titles, keyword matrix, calendar, brief)

> **What this is.** The concrete, ready-to-execute blog plan that feeds the Areas/Maps matrix: a keyword-intent matrix, 50 proven local post-title templates, a content brief template, a 12-month cadence, and the interlinking rules. The blog is the **AI-citation engine** (editorial content is the most-cited type) and the **intent bridge** into the area pages.
> Synthesizes `../research/05` (blog for Maps), `../research/03` (AEO), `../research/06` (what ranks). **Spec only — no code changed.**

---

## 1. The keyword-intent matrix (assign before writing)

One keyword → one URL → one intent. Blogs own **informational** intent; area/service pages own **transactional**.

| Intent | Belongs on | Example |
|---|---|---|
| Informational ("how much / how to / signs / what / permit") | **Blog** | "how much does {service} cost in {city}" |
| Commercial-investigation ("best / vs / how to choose") | Blog (links to money page) | "how to choose a {trade} in {city}" |
| Transactional ("{service} {city} / near me / hire") | **Area / service page** | "{service} {city}" |

**Cannibalization guard:** a blog post must never target the transactional `{service} {city}` term the area page owns. If two pages compete, merge/re-optimize and 301 the weaker.

---

## 2. 50 proven local post-title templates (by format, with intent + tie-back)

Each links **down** to a service/area page and is linked **back** from the relevant area hub.

**Cost & money (highest traffic + citation magnet — use original local data)**
1. How Much Does {Service} Cost in {City}? ({Year} Price Guide)
2. {City} {Service} Cost Breakdown: What You'll Actually Pay
3. Is {Service} Worth It in {City}? Cost vs. Value
4. {Service} Financing & Rebates Available in {City}/{Province}
5. The Real Cost of Delaying {Service} in {City}

**Choosing / commercial-investigation**
6. How to Choose a {Trade} in {City}: 7 Questions to Ask
7. {Trade} vs {Alternative}: Which Is Right for {City} Homes?
8. Licensed vs Unlicensed {Trade} in {Province}: What to Know
9. Red Flags When Hiring a {Trade} in {City}
10. How to Vet {Service} Quotes in {City}

**Problem / symptom (high intent-to-convert)**
11. Signs You Need {Service} (and What Happens If You Wait)
12. Why Your {System} Is {Problem} in {City} Homes
13. {Season} {Problem}: A {City} Homeowner's Guide
14. Emergency {Service} in {City}: What to Do First
15. Common {Service} Problems in {Neighbourhood}-Style Homes

**Seasonal / maintenance (recurring traffic)**
16. {City} {Season} {Service} Checklist
17. Preparing Your {System} for {City} Winters/Summers
18. {Month}-by-{Month} {Home-System} Maintenance in {Province}
19. Storm/Weather-Proofing Your {System} in {Region}
20. Spring {Service} To-Dos for {City} Homeowners

**Permit / regulation (unique local info — high information gain)**
21. Do You Need a Permit for {Project} in {City}?
22. {City} {Trade} Bylaws & Codes Explained
23. {Province} {Service} Regulations Homeowners Should Know
24. HOA/Strata Rules for {Project} in {City}
25. {City} Inspection Requirements for {Service}

**Neighborhood / landmark (local authority — keep genuinely unique)**
26. Best Neighbourhoods in {City} for {X}
27. {Service} in {Neighbourhood}: What's Different Here
28. {Service} Near {Landmark}: A Local Guide
29. {City} Home Styles & How They Affect {Service}
30. A {Trade}'s Guide to {City}'s {Subdivision/District}

**Case study / proof (first-party E-E-A-T)**
31. How We {Outcome} on {Named Street} in {City}
32. {City} {Service} Project Spotlight: Before & After
33. {Number} {Service} Jobs We've Completed in {City}
34. Lessons From {N} Years of {Service} in {City}
35. A Day on a {City} {Service} Job Site

**Comparison / buyer's guide (table-format = AI-extractable)**
36. {Material/Option A} vs {B} for {City} Homes
37. Best {Product} for {Local Condition} ({Year})
38. {Service} Methods Compared: Pros, Cons, Cost
39. DIY vs Professional {Service} in {City}
40. {Brand/Type} Comparison for {City} Climate

**FAQ / answer-first (AEO)**
41. {Service} FAQs for {City} Homeowners
42. Everything {City} Homeowners Ask About {Service}
43. {Service} Myths {City} Residents Still Believe
44. Quick Answers: {Service} in {City}
45. {Service} Glossary for {City} Homeowners

**Data report / community (best link + citation asset)**
46. {Year} {City} {Service} Price Index (Original Data)
47. We Surveyed {N} {City} Homeowners About {Topic}
48. {City} {Service} Trends Report {Year}
49. {Trade} Supporting {City}: Community Projects
50. {City} {Service} Statistics Every Homeowner Should Know

---

## 3. Content brief template (complete before writing)

```
URL:               /blog/{slug}
Primary keyword:   {informational keyword}    Intent: Informational
Secondary kw:      {3–5 variants}
Cluster / hub:     {hub post URL}
Title (<=60):      {…}
Meta (<=160):      {…}
H1:                {mirrors title}
Answer-first block: 40–60 word direct answer under the first question H2
Information gain:   {≥1 original element — local data point / named project / first-party photo}
H2 structure:      {3–6 H2s; ≥1 phrased as a question}
FAQ:               {3+ Qs, ≥1 geo-specific; FAQPage schema}
Internal links DOWN: {service page} + {/areas-we-serve/{region}/{community}}
Linked back FROM:    {which area hub links to this post}
Schema:            BlogPosting + author Person(sameAs) + BreadcrumbList + FAQPage
Author:            {name + credentials + /about/author URL}
Reading level:     Grade 6–8
publishDate / updatedDate: {ISO}   Visible "Updated {Month} {Year}"
```

---

## 4. 12-month cadence (consistency > volume)

- **Young blog (<1 yr):** 6–8 posts/month, concentrated on **1–2 clusters** until each is ~80% complete, then move on. Topic-clustered pages earn ~2–3× standalone traffic.
- **Mature blog:** steady weekly publish **+ a refresh lane** (update 1–2 decaying posts/month: realign intent, refresh stats, add a local example, bump `dateModified`).
- **Sequence per cluster:** publish the **pillar/hub** first, then spokes in dependency order (cost guide → choosing → problem/symptom → seasonal → permit → neighborhood → case study → comparison → FAQ → data report).
- **Priority order across clusters:** start with the cluster matching your **top 2–4 service areas** (the same depth-over-coverage rule as the area matrix).

---

## 5. Interlinking rules (the intent bridge)

- Every locally-relevant post links **down** to the matching **service page** + **`/areas-we-serve/{region}/{community}`** with a descriptive geo anchor.
- Every `{community}` area page links **back** to relevant posts ("{City} resources").
- Spokes link to their **hub** + 2–3 **siblings**.
- ~3–5 contextual internal links per post; **vary anchors**; never "click here"; **no orphans** (every post linked from ≥1 hub + nav/related).
- Link **from high-authority pages** (find via GSC/GA4) **to** lower-visibility area/spoke pages to push equity.

---

## 6. AEO requirements baked into every post

- **Answer-first** 40–60 word block under each question heading (front 30% = ~44% of AI citations).
- **≥1 information-gain element** AI can't replicate (original local data, named project, first-party photo, named quote).
- **Lists/tables** for comparisons (text+media = +156% AI selection).
- **Freshness:** `dateModified` + visible "Updated {Month} {Year}", tied to real edits.
- **Static-rendered** (Gate A) — JSON-LD + content in initial HTML.

---

## 7. Acceptance checklist (per post)

- [ ] One primary keyword, informational intent, no cannibalization with an area/service page.
- [ ] Assigned to a hub cluster; links down to ≥1 service/area page; linked back from ≥1 area hub.
- [ ] Answer-first block + ≥1 geo-specific FAQ (FAQPage schema matches visible text).
- [ ] ≥1 information-gain element; reading level Grade 6–8; no widows.
- [ ] `BlogPosting` + author `Person` (sameAs) + `BreadcrumbList` static in HTML.
- [ ] Visible "Updated {Month} {Year}" === `dateModified`.
- [ ] Passes Gate A (view-source, JS off) and Gate G (intent/cannibalization).
