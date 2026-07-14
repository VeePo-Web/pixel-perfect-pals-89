## Sitemap audit — what's live vs. what's missing

**Good news: the sitemap is fully in sync with the data layer.** Every region and community in `src/data/locations/*.ts` has a corresponding `<loc>` in `public/sitemap.xml`. Nothing is being dropped by the generator.

### Current inventory

- **Sitemap total:** 106 URLs — 3 top-level + 21 region + 40 community + blog hubs/posts
- **Regions defined:** 21 (9 Nova Scotia + 12 Alberta)
- **Communities defined:** 40 (18 NS + 22 AB)

### Alberta — region-by-region community coverage

| Region | Communities in data / sitemap |
|---|---|
| calgary-region | 6 (calgary, airdrie, chestermere, cochrane, okotoks, high-river) |
| edmonton-region | 8 (edmonton, st-albert, spruce-grove, leduc, fort-saskatchewan, beaumont, sherwood-park, stony-plain) |
| central-alberta | 4 (red-deer, camrose, wetaskiwin, lacombe) |
| southern-alberta | 1 (lethbridge) |
| southeast-alberta | 1 (medicine-hat) |
| canadian-rockies | **0** |
| northern-alberta | **0** |
| lakeland-region | **0** |
| peace-region | **0** |
| west-country | **0** |
| wood-buffalo-region | **0** |
| rural-alberta | **0** |

So 7 of 12 Alberta regions currently render as empty region pages (no community spokes). Nova Scotia has the same gap on 3 regions: `northumberland-shore`, `fundy-shore`, `eastern-shore`.

### Two other things worth knowing

1. **`BRAND_URL` is empty**, so `<loc>` values in `public/sitemap.xml` are currently relative (e.g. `/areas-we-serve/calgary-region/calgary`). Google needs absolute URLs — set `MASTER_REMIX.BRAND_URL` and the generator will fill them in on the next `predev`/`prebuild`.
2. The generator already emits `<image:image>` entries for hero images and includes blog hubs + posts — no fix needed there.

---

## Proposed plan

**Nothing to fix in the sitemap generator or wiring — it's correctly reflecting the data.** The gap is in the location data itself. Two options:

**Option A — Fill the 7 empty Alberta regions (recommended if you want a complete Alberta rollout).**
Add community spokes to `src/data/locations/alberta.ts` for the empty regions, following the batch-of-20 pipeline in `docs/seo/master-databases/04-fable5-batch-expansion-prompt.md`. Suggested first batch (population + service-radius sorted):
- canadian-rockies: canmore, banff
- northern-alberta: grande-prairie, hinton, whitecourt
- lakeland-region: cold-lake, bonnyville, lloydminster
- peace-region: peace-river, fairview
- west-country: rocky-mountain-house, drayton-valley
- wood-buffalo-region: fort-mcmurray
- rural-alberta: brooks, taber, drumheller

That would take Alberta from 22 → ~38 communities and Nova Scotia gaps could follow the same pattern.

**Option B — Hide empty region pages until they have spokes.**
Filter the sitemap generator to skip regions with 0 communities (and add `noindex` on those region routes) so Google doesn't see thin hub pages. Fastest path; keeps the roadmap regions visible in the UI without SEO risk.

**Option C — Just set `BRAND_URL` now** and defer content decisions. One-line change; makes the sitemap production-ready even before more communities land.

Which do you want? I'd suggest **C + B now** (make the sitemap absolute-URL correct and stop indexing empty regions today), then **A** as the ongoing content workstream.
