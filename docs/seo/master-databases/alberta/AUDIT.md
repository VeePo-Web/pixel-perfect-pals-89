# Alberta — Phase 4 Self-Audit & Coverage Reconciliation

> Auto-generated from the assembled build. Rows assembled: **95** of 95 publishable.

## A · Coverage reconciliation (INTENDED = BUILT + DEFERRED)

```
INTENDED = 1912  (every enumerated Alberta place in the master spreadsheet)
BUILT    = 95  publishable tier (unified >=50 + real coords + real census pop + Verified)
  built & content-generated so far: 95
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

- **Verified:** 95 · **Needs_Review (excluded from publish):** 0

- **By region (built):** Central Alberta 26 · Edmonton Region 18 · Calgary Region 14 · Southern Alberta 14 · Northern Alberta 6 · Southeast Alberta 5 · Canadian Rockies 5 · Lakeland Region 5 · Peace Region 1 · Wood Buffalo Region 1

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

### Lowest built — High Prairie (unified 50.3)

```json
{
  "Location_ID": "AB-0151",
  "Entity_Description": "High Prairie is a town in northern Alberta near the west end of Lesser Slave Lake, about 394 kilometres northwest of Edmonton. Its population was 2,564 in the 2021 census. The town anchors the Lesser Slave farm belt, a pocket of canola, hay, and cattle country carved from the boreal forest. Forestry is a major local employer, with sawmill and OSB production, alongside oil and gas and agriculture. High Prairie grew as a rail and service centre on the route between Edmonton and the Peace Country, and Winagami Lake Provincial Park lies a short drive north.",
  "AI_Answer_Snippet": "{COMPANY_NAME} provides {SERVICE} across High Prairie and the surrounding Lesser Slave farm belt, from town homes to acreages in the boreal north. As a local {BUSINESS_TYPE}, we handle the deep frost, heavy snow, and long winters that define building life this far north. For a free {ESTIMATE_TYPE} estimate in High Prairie, Call {PHONE}.",
  "Signals_Count": 7,
  "Info_Gain_Element": "This page names the Lesser Slave farm belt, the local forestry OSB economy, and Winagami Lake as anchors, specific northern references a generic template cannot replicate.",
  "Verification_Status": "Verified"
}
```
