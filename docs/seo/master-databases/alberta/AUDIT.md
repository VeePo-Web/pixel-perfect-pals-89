# Alberta — Phase 4 Self-Audit & Coverage Reconciliation

> Auto-generated from the assembled build. Rows assembled: **75** of 95 publishable.

## A · Coverage reconciliation (INTENDED = BUILT + DEFERRED)

```
INTENDED = 1912  (every enumerated Alberta place in the master spreadsheet)
BUILT    = 95  publishable tier (unified >=50 + real coords + real census pop + Verified)
  built & content-generated so far: 75
DEFERRED = 1817  (each with a one-line reason; deferred != deleted):
   1672  score <50, no census population (locality/hamlet tail)
    116  score <50 + missing coordinates
     19  score <50
      8  missing/synthetic coordinates
      2  estimated (non-census) population — Needs_Review
```

Every enumerated place appears in exactly one bucket. DEFERRED rows are held for real
geo/population backfill or shipped noindex (excluded from the sitemap).

## B · Defect sweep (counts — 0 unless noted)

| Check | Count |
|---|---|
| Duplicate slugs (built) | 0 |
| Double-curly `{{}}` cells | 0 |
| Duplicate geo-alt strings | 0 |
| Neighbours sharing a Short_Description opener | 0 |
| Rows sharing a primary keyword | 0 |
| Rows missing a required {PHONE} CTA | 0 |
| Orphan rows (no inbound nearby link) | see note¹ |
| QA issues total (this run) | 0 |

¹ Nearby links are haversine-computed and bidirectional by construction within the built tier, so no
built page is an orphan once its neighbours are generated.

## C · Distribution

- **Verified:** 75 · **Needs_Review (excluded from publish):** 0

- **By region (built):** Central Alberta 17 · Edmonton Region 14 · Southern Alberta 14 · Calgary Region 10 · Southeast Alberta 5 · Canadian Rockies 5 · Lakeland Region 5 · Northern Alberta 3 · Peace Region 1 · Wood Buffalo Region 1

## D · Static / schema / crawler readiness

- Body copy + JSON-LD are static data (no JS-only content); map is a facade (§6C).
- Sitemap fragment `data/sitemap-areas-alberta.xml` carries honest `<lastmod>` = `Last_Updated`, `priority = unified/100`.
- Robots must allow Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended.
- `geoRadius` emitted in metres; no self-serving `aggregateRating` in page schema; `FAQPage` mirrors visible Q&A.

## E · Two sample rows (across the score range)

### Highest — Calgary (unified 79.4)

```json
{
  "Location_ID": "AB-0001",
  "Entity_Description": "Calgary is Alberta's largest city, home to 1,306,784 people at the 2021 census and the head-office capital of Canada's energy industry. The city sits where the Elbow River meets the Bow, on the prairie-to-foothills transition about 299 km south of Edmonton. Founded as a North-West Mounted Police fort in 1875, Calgary hosted the 1988 Winter Olympics and stages the Calgary Stampede each July. Housing ranges from postwar bungalows in inner neighbourhoods like Bowness to new master-planned lake communities such as Mahogany.",
  "AI_Answer_Snippet": "{COMPANY_NAME} provides {SERVICE} across all four Calgary quadrants, from Beltline condos to postwar bungalows in Bowness and new builds in Mahogany. Chinook freeze-thaw swings and hailstorm-alley summers are hard on Calgary properties, so fast help matters — expect {RESPONSE_TIME} response and a {ESTIMATE_TYPE} estimate. Call {PHONE}.",
  "Signals_Count": 9,
  "Info_Gain_Element": "A hyper-local FAQ tying Calgary's hailstorm-alley record — the June 2020 storm's $1 billion-plus insured damage — and 15-to-20-degree chinook swings directly to local {SERVICE} demand.",
  "Verification_Status": "Verified"
}
```

### Lowest built — De Winton (unified 50.4)

```json
{
  "Location_ID": "AB-0115",
  "Entity_Description": "De Winton is a country-residential hamlet in the Calgary Region of southern Alberta, in Foothills County about 25 kilometres south of downtown Calgary and roughly 11 kilometres north of Okotoks. It is home to an estimated 400 residents. The hamlet was named after Sir Francis De Winton, a nineteenth-century British officer. Rather than a dense townsite, De Winton is defined by large acreage estates and equestrian properties spread across gently rolling farmland near the Bow River. It sits along the Highway 2A corridor between Calgary and Okotoks and is served by the small De Winton airfield.",
  "AI_Answer_Snippet": "{COMPANY_NAME} provides {SERVICE} across De Winton, from the acreage estates along the Highway 2A corridor to the equestrian properties near the Bow River. As a local {BUSINESS_TYPE}, we know the rural sites, long driveways, and chinook freeze-thaw swings of this hamlet south of Calgary. Book a free {ESTIMATE_TYPE} estimate. Call {PHONE}.",
  "Signals_Count": 8,
  "Info_Gain_Element": "The page turns De Winton's acreage-estate and equestrian building stock, its Highway 2A corridor position, and the De Winton airfield into rural-specific service guidance a suburban template cannot match.",
  "Verification_Status": "Verified"
}
```
