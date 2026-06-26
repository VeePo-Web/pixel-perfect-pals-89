# Prompt 07 — Per-Business Remix Runbook (activate the template on a real client)

> **Goal.** Take the finished template and turn it into a ranking deployment for one real business — **by editing data + config only**, with zero structural code change. This is the runbook the operator follows per project.
>
> **Satisfies:** Gate B, C, F (per page). **Spec:** `../reports/02` §7, `../reports/01`. **Evidence:** all dossiers.

---

## Step 1 — Business identity (config)
Edit `src/config/template/*` only:
- `BRAND_NAME`, `PHONE` (E.164), canonical **NAP**, `SITE_URL`, `LOCALBUSINESS_TYPE` (e.g. `HomeAndConstructionBusiness`), `SERVICE`, `SERVICE_CATEGORY`, `priceRange`, hours.
- **`placeId`** (resolve once) + **`sameAs[]`** (GBP Maps URL, Facebook, LinkedIn, Instagram).
- NAP here must match GBP **character-for-character** (it propagates to schema + footer).

## Step 2 — Activate real service areas (depth over coverage)
- From the national scaffold, set `active: true` only for areas the business **truly serves** — start with the **top 2–4 within ~2 hours' drive.**
- Do NOT activate every town. Coverage ≠ ranking; the gate will reject thin ones anyway.

## Step 3 — Author enrichment until the gate passes
For each activated area, fill `AreaEnrichment` until it clears the gate (**≥4 of 8 signals + ≥1 first-party element + unique description**):
- landmarks/neighbourhoods · local condition note · named project · permit/bylaw note · community ref · proximity differentiator · **named local testimonial (first-party)** · ≥1 town-only FAQ · ≥1 first-party photo.
- Pass the **"remove the city name"** test on the description.

## Step 4 — Google Business Profile ops (the engine — off-site)
- **Primary category** = the exact service (the single biggest relevance lever). 3–5 accurate categories total.
- **Service areas** set (≤20, within ~2hr). Decide **show vs hide address** deliberately (SAB evidence favors showing a real one).
- **Reviews = velocity:** stand up a steady flow (≥4/mo); never let it stall (~3-week pause measurably dropped rankings). Encourage **text** reviews with the service + city naturally. Respond within 48h.
- Complete services/products, photos, Q&A, posts. Keep all data identical to the site (AI mis-citation risk if it drifts).

## Step 5 — Blog activation
- Publish the priority local post formats (prompt 05) for the top areas; wire the intent bridge both ways.

## Step 6 — Staged rollout + monitoring
- Publish in batches **20–30 → 50 → 100 → 200+.** Verify in GSC: **80%+ indexed in 4 weeks** before scaling; **<50% at 8 weeks → diagnose** (duplicate / crawled-not-indexed / soft-404). Expand only when there's something new to say.

## Step 7 — Ship gates
- Run `../reports/03-QA-SHIP-GATES.md` on a sample of pages. MUST-fails block ship.

## Verification (paste evidence)
- `tsc --noEmit` + `vite build` green.
- A sample activated area page passes Gates A–G; a deliberately under-enriched area is `noindex`/absent from sitemap.
- NAP identical across page/footer/schema/GBP. robots.txt allows AI bots; sitemap lists only gate-passing URLs.
