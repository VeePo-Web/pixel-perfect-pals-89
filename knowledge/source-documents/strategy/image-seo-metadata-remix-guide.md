# Areas We Serve — Image SEO Metadata Remix Guide
## How to Make Every Hero Image SEO-Specific to Your Trade

**Document type:** Technical Remix Guide  
**Applies to:** All 150 VeePo Master Builder sub-sites  
**System files:** `src/data/communities.ts`, `src/pages/CommunityPage.tsx`, `src/pages/RegionPage.tsx`  
**Updated:** 2026

---

## 1. How the Image SEO System Works

Every community page in the Areas We Serve section has a hero image. The SEO power of that image comes from its **alt text** — the text Google reads to understand what the image contains and what page it's on.

The system is built in two layers:

### Layer 1 — Geographic Context (stored in `communities.ts`)
The `alt` field inside every community's `heroImage` contains a **pure geographic description** — community name, city, province, and one distinctive geographic trait:

```
"Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes"
```

This text never mentions a specific trade. It describes only the place.

### Layer 2 — Service Injection (generated at render in `CommunityPage.tsx`)
When the page renders, it reads `MASTER_REMIX.SERVICE_CATEGORY` and prepends it to the geographic description:

```
`${sc} in ${community.name}, ${community.city} Alberta — ${heroImg.alt}`
```

The final rendered alt text becomes:

```html
<!-- Drywall Masters remix: -->
<img alt="Drywall Installation in Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes">

<!-- Tile Masters remix: -->
<img alt="Tile Installation in Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes">

<!-- Insulation Masters remix: -->
<img alt="Insulation Services in Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes">

<!-- Flooring Masters remix: -->
<img alt="Flooring Installation in Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes">
```

**No code changes needed per remix.** Only update `MASTER_REMIX.SERVICE_CATEGORY` in `trade.config.ts` and every image alt text across all 120+ communities updates automatically.

---

## 2. Why This Matters for SEO

### Google Image Search
Google reads image alt text as one of its strongest signals for what a page is about geographically and topically. An image with `alt="Drywall Installation in Riversong, Cochrane Alberta"` tells Google:
- This page is about drywall installation
- This page serves Riversong
- This page is in Cochrane, Alberta

That single alt text reinforces the page's H1, meta title, and body copy — stacking the same geo+service keyword signal multiple times in a single page.

### Why Unique Alt Text Per Community Matters
If 120 community pages all had the same image with the same alt text (`alt="Cochrane Alberta mountain view"`), Google would see 120 identical image signals — which it ignores or penalises as low-quality repetition.

By giving every community a unique geographic description, each image provides a distinct signal. Even if two communities share the same photograph (e.g., both Sunset Ridge and Heritage Hills use the Cochrane banner photo), their alt texts are completely different:

```
Heritage Hills: "Drywall in Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain views..."
Sunset Ridge:   "Drywall in Sunset Ridge, Cochrane Alberta — north-of-highway community with 6-acre freshwater pond..."
```

Google sees 120 unique images contextualised by 120 unique geographic descriptions. This is a significant ranking signal for "[service] [community name] Alberta" queries.

### Google Image Search as a Lead Channel
Many homeowners searching for contractors search Google Images first — especially for renovation work where they want to see the quality of work and verify the contractor is genuinely local. Having community-specific image results on Google Images for "[service] [community] Alberta" queries is an additional traffic channel most competitors don't even attempt.

---

## 3. The Two-Tier Image System

### Tier 1 — Community-Specific Photos (highest SEO value)
These are verified real photographs of the exact community. Currently assigned to:

| Community | Photo | Source | License |
|---|---|---|---|
| Bearspaw (incl. Watermark) | Bearspaw, Alberta.JPG | Wikimedia Commons | CC BY-SA 2.5/3.0 |
| CottageClub at Ghost Lake | Ghost Lake panoramio | Wikimedia Commons | CC BY-SA 3.0 |
| Ghost Lake Village | Ghost Lake autumn | Wikimedia Commons | Public Domain |
| Three Sisters Mountain Village | Three Sister Mountains, Canmore | Wikimedia Commons | CC BY-SA |
| Silvertip Resort | Bow Valley from Silver Tip | Wikimedia Commons | CC BY-SA |
| Benchlands (Canmore) | Grotto Mountain, Canmore | Wikimedia Commons | CC BY-SA |
| Spring Creek Mountain Village | Downtown Canmore panorama | Wikimedia Commons | CC BY-SA |
| GlenEagles (Cochrane) | Dawn in Cochrane panoramio | Wikimedia Commons | CC BY-SA 3.0 |
| West Springs (Calgary) | West Springs Sunset | Wikimedia Commons | CC BY 2.0 |
| Riversong (Cochrane) | Cochrane Ranch Alberta Canada | Wikimedia Commons | CC BY 2.0 |
| Cochrane Heights | Cochrane Ranch Alberta Canada | Wikimedia Commons | CC BY 2.0 |
| Fireside (Cochrane) | Cochrane Ranch Alberta Canada | Wikimedia Commons | CC BY 2.0 |
| Glenbow (Cochrane) | Cochrane Ranch Alberta Canada | Wikimedia Commons | CC BY 2.0 |

### Tier 2 — Region Representative Photos (all other communities)
Communities without a specific verified photo use their region's representative landscape image. The geographic alt text is still community-specific — only the photo URL is shared.

| Region | Photo | Source | License | Used For |
|---|---|---|---|---|
| Cochrane | Cochrane Wikivoyage banner | Wikimedia Commons | CC BY 2.0 | Heritage Hills, Sunset Ridge, Heartland, East End, West Terrace |
| Rocky View County | Bearspaw panoramio | Wikimedia Commons | CC BY-SA 3.0 | Silverhorn, Heritage Pointe |
| Springbank | Springbank Road Facing West | Wikimedia Commons | CC BY-SA | All 40+ Springbank communities |
| Elbow Valley | Rockies in the morning | Wikimedia Commons | CC BY-SA | All 11 Elbow Valley communities |
| Calgary SW | Calgary Peace Bridge | Unsplash | Unsplash License | Most Calgary SW communities |
| Calgary NW | Calgary skyline across Bow | Unsplash | Unsplash License | All Calgary NW communities |
| Calgary SE | Calgary aerial | Unsplash | Unsplash License | All Calgary SE communities |
| Bow Valley | Ghost Lake panoramio | Wikimedia Commons | CC BY-SA 3.0 | Waiparous, Exshaw, Harvie Heights, etc. |
| Canmore | Three Sisters Mountains | Wikimedia Commons | CC BY-SA | All other Canmore communities |

---

## 4. Step-by-Step Remix Checklist

When remixing for a new trade (e.g., Cochrane Tile Masters), follow these steps:

### Step 1 — Update `trade.config.ts`
Set the correct `SERVICE_CATEGORY`:

```typescript
// trade.config.ts
export const MASTER_REMIX: RemixVariables = {
  BRAND_NAME: "Cochrane Tile Masters",
  SERVICE: "tile",
  SERVICE_PLURAL: "tile work",
  SERVICE_VERB: "tile",
  SERVICE_CATEGORY: "Tile Installation",  // ← This becomes the image alt prefix
  // ...
};
```

**That's it.** Every image alt text on every community page updates automatically.

### Step 2 — Verify with Browser DevTools
Open any community page, right-click the hero image, and inspect. Confirm the `alt` attribute reads:
```
Tile Installation in [Community Name], [City] Alberta — [geographic description]
```

### Step 3 — Optional: Add Community-Specific Photos
If you find a verified copyright-free photo of a specific community, add it to the community object in `communities.ts`:

```typescript
{
  slug: "my-community",
  // ... existing fields ...
  heroImage: {
    url: "https://upload.wikimedia.org/wikipedia/commons/path/to/image.jpg",
    alt: "My Community, City Alberta — unique geographic description of the community",
  },
}
```

The `alt` here should be GEOGRAPHIC ONLY (no service mention). The service prefix is added at render time.

### Step 4 — Do Not Touch These
- Do NOT add the service name to `heroImage.alt` in `communities.ts`
- Do NOT change the `COMMUNITY_HERO_IMAGES` lookup map unless you're adding new community-specific photos
- Do NOT change the alt text construction logic in `CommunityPage.tsx` or `RegionPage.tsx`

---

## 5. Correct Alt Text Format by Trade

When `SERVICE_CATEGORY` is set correctly, alt texts are generated automatically. For reference, here is what the system produces for each trade:

### Drywall Installation
`"Drywall Installation in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Tile Installation
`"Tile Installation in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Insulation Services
`"Insulation Services in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Flooring Installation
`"Flooring Installation in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Painting Services
`"Painting Services in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Roofing Services
`"Roofing Services in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

### Kitchen Renovation
`"Kitchen Renovation in Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche"`

The pattern is always: `{SERVICE_CATEGORY} in {Community}, {City} Alberta — {geographic suffix from communities.ts}`

---

## 6. Region Page Alt Text Format

Region pages use the same dynamic construction:

```
`${sc} services across ${region.name}, Alberta — ${heroImg.alt}`
```

Examples:

### Drywall
`"Drywall Installation services across Springbank, Alberta — Springbank Road facing west toward the Rocky Mountains, Alberta foothills acreage country"`

### Tile
`"Tile Installation services across Springbank, Alberta — Springbank Road facing west toward the Rocky Mountains, Alberta foothills acreage country"`

### Insulation
`"Insulation Services services across Springbank, Alberta — Springbank Road facing west toward the Rocky Mountains, Alberta foothills acreage country"`

---

## 7. All Community Geographic Alt Texts (Reference)

These are the pure geographic suffixes stored in `COMMUNITY_HERO_IMAGES` in `communities.ts`. Each is prepended with the service at render time.

### Cochrane Communities
| Community | Geographic Alt Suffix |
|---|---|
| Heritage Hills | Heritage Hills, Cochrane Alberta — elevated northwest community with Rocky Mountain vistas and upscale estate homes |
| Sunset Ridge | Sunset Ridge, Cochrane Alberta — north-of-highway community with 6-acre freshwater pond and 5km of connected pathways |
| Riversong | Riversong, Cochrane Alberta — Bow River valley community with 19km of natural reserve pathways adjacent to the Historic Cochrane Ranche |
| GlenEagles | (Specific: Dawn over Cochrane, Alberta — GlenEagles overlooks the Bow River valley and Rocky Mountains) |
| Heartland | Heartland, Cochrane Alberta — west-end community with 45 acres of open green space and direct Ghost Lake recreational access |
| Cochrane Heights | Cochrane Heights, Cochrane Alberta — elevated hilltop community overlooking the Historic Cochrane Ranche and Bow River valley |
| Glenbow | Glenbow, Cochrane Alberta — established community adjacent to the Cochrane Ranche Historic Site and Riverfront Park |
| East End & Downtown | Downtown Cochrane, Alberta — historic Main Street community with heritage architecture and walkable civic character |
| West Terrace & West Pointe | West Terrace, Cochrane Alberta — Bow River community with Mitford Park sports fields, fishing access, and riverside pathways |
| Fireside | Fireside, Cochrane Alberta — Cochrane's newest community adjacent to Heritage Hills with modern open-plan estate homes |

### Rocky View Communities
| Community | Geographic Alt Suffix |
|---|---|
| Bearspaw (incl. Watermark) | (Specific: Bearspaw, Alberta — rolling acreage landscape between Calgary and Cochrane with mountain views) |
| Silverhorn | Silverhorn, Bearspaw Alberta — master-planned acreage community with 50% preserved natural open space and rolling hill terrain |
| Heritage Pointe | Heritage Pointe, Rocky View County Alberta — upscale south Calgary estate community with Heritage Pointe Golf Club and park trails |

### Springbank Communities (40+)
| Community | Geographic Alt Suffix |
|---|---|
| Springbank Hill | Springbank Hill, Calgary Alberta — prestigious west Calgary estate community with panoramic Rocky Mountain and foothill views |
| Aventerra Estates | Aventerra Estates, Springbank Alberta — exclusive two-acre estate community near Bingham Crossing and Springbank Links Golf Club |
| Devonian Ridge Estates | Devonian Ridge Estates, Springbank Alberta — 10-lot estate enclave with 32 acres of preserved parkland and Bow River valley views |
| Morning Vista Estates | Morning Vista Estates, Springbank Alberta — 42 custom estate homes on two-acre lots with breathtaking Rocky Mountain views |
| Pinnacle Ridge | Pinnacle Ridge, Springbank Alberta — ridge-top estate community with sweeping panoramic mountain and valley views |
| Mackenas Country Estates | Mackenas Country Estates, Springbank Alberta — gated enclave of 21 estate homes behind iron and stone entry gates |
| Swift Creek Estates | Swift Creek Estates, Springbank Alberta — 63 estate homes on two-acre lots five minutes west of Calgary with wildlife habitat |
| Morgan's Rise | Morgan's Rise, Springbank Alberta — stately western-heritage estate community with two-acre parcels and mountain-view gardens |
| Rodeo Ridge | Rodeo Ridge, Springbank Alberta — intimate golf-corridor community within Springbank Links Golf Club |
| Villosa Ridge | Villosa Ridge, Springbank Alberta — premier estate community minutes from Springbank Links Golf Club |
| Windhorse Manor | Windhorse Manor, Springbank Alberta — serene acreage community with architectural harmony standards and equestrian facilities |
| Pinebrook Estates | Pinebrook Estates, Springbank Alberta — mature estate community among spruce and poplar trees adjacent to Pinebrook Golf Club |
| Sterling Springs | Sterling Springs, Springbank Alberta — quiet acreage enclave with one to two acre lots, mountain vistas, equestrian trails |
| Westbluff | Westbluff, Springbank Alberta — estate enclave on Calgary's western boundary with mountain views near private schools |
| Westview | Westview, Springbank Alberta — acreage estate community adjacent to Calgary's western edge with mountain views |
| River Ridge Estates | River Ridge Estates, Springbank Alberta — ridge-top enclave with luxury homes above the Bow River valley |
| (All other Springbank) | [community name], Springbank Alberta — [unique geographic trait from shortDescription] |

### Elbow Valley Communities (12)
| Community | Geographic Alt Suffix |
|---|---|
| Elbow Valley | Elbow Valley, Rocky View County Alberta — 600-acre protected estate community with private lakes and Glencoe Golf corridor |
| Stonepine | (Specific: Stonepine, Elbow Valley Alberta — ultra-exclusive gated enclave above Glencoe Golf & Country Club) |
| Stone Pine | Stone Pine, Elbow Valley Alberta — contemporary open-concept estates adjacent to Stonepine above the Glencoe Golf valley |
| Swift Creek Villas | Swift Creek Villas, Elbow Valley Alberta — lock-and-leave villas with Fisherman's Pond skating access |
| Lott Creek Estates | Lott Creek Estates, Elbow Valley Alberta — estate community walkable to Elbow Springs Golf Club |
| All others | [community name], Elbow Valley Alberta — [geographic trait] |

### Calgary SW Communities (22)
| Community | Geographic Alt Suffix |
|---|---|
| West Springs | West Springs, Calgary Alberta — family-focused west Calgary community with excellent schools and West 85th Shopping |
| Aspen Woods | Aspen Woods, Calgary Alberta — upscale west Calgary community with mountain views and Aspen Landing Shopping |
| Discovery Ridge | Discovery Ridge, Calgary Alberta — nature-focused community bordering Griffith Woods Park and the Elbow River |
| Signal Hill | Signal Hill, Calgary Alberta — large southwest community with estate homes and Westhills shopping amenities |
| Cougar Ridge | Cougar Ridge, Calgary Alberta — hillside community with Canada Olympic Park views near Paskapoo Slopes |
| Britannia | Britannia, Calgary Alberta — prestigious neighbourhood adjacent to Calgary Golf & Country Club |
| Bel-Aire | Bel-Aire, Calgary Alberta — exclusive enclave adjacent to Calgary Golf & Country Club with Glenmore Reservoir views |
| Eagle Ridge | Eagle Ridge, Calgary Alberta — exclusive community bordering Glenmore Reservoir and Heritage Park |
| All others | [community name], Calgary Alberta — [geographic trait] |

### Calgary NW, SE, Bow Valley, Canmore
Similar unique geographic suffix per community following the same pattern.

---

## 8. Image Attribution Requirements

All images used in this system are free for commercial use. Attribution is required for CC BY and CC BY-SA images. Keep this attribution in the code comments (already done in `communities.ts`).

| License | Required Action |
|---|---|
| CC BY 2.0 | Credit photographer name + link to license page |
| CC BY-SA 3.0 | Credit photographer + share-alike derivative works |
| Public Domain | No attribution required |
| Unsplash License | No attribution required |

**Where to put attribution:** In the HTML source, attribution can be added as a `data-credit` attribute on the image element, or in a hidden `<span>` adjacent to the image. For simple contractor sites, attribution in the code comment (as currently done) is commonly accepted practice.

---

## 9. How to Add a New Community-Specific Photo

Found a real copyright-free photo of a specific community? Add it in three steps:

### Step 1 — Verify the license
Only use images with these licenses:
- CC0 (Public Domain) — completely free
- CC BY 2.0 or CC BY-SA — free with attribution
- Unsplash License — completely free
- Government of Alberta / Canada public domain — completely free

DO NOT use: Getty Images, iStock, Shutterstock, Dreamstime (pay per use), or any image without a clear license.

### Step 2 — Add to `communities.ts`
Find the community object and add `heroImage` directly to it (takes priority over the lookup map):

```typescript
{
  slug: "my-community",
  // ... all existing fields ...
  nearestCommunities: ["slug1", "slug2"],
  // NEW — community-specific image override:
  // Wikimedia Commons — CC BY 2.0 — description of what the photo shows
  heroImage: {
    url: "https://upload.wikimedia.org/wikipedia/commons/path/to/image.jpg",
    alt: "My Community, City Alberta — geographic description of the community and its character",
  },
}
```

**Note:** The `alt` should be GEOGRAPHIC ONLY. The service keyword is prepended at render time.

### Step 3 — Verify it renders
Open the community page in Lovable preview. Confirm:
1. The hero shows the correct photograph
2. The image is clear and attractive (check the 80% forest overlay isn't killing the image)
3. Right-click → Inspect → check the `alt` attribute includes the service name

---

## 10. Expanding to New Communities

When a new community is added to `communities.ts`, follow this checklist:

1. Add the community object with all required fields
2. Either add `heroImage` directly to the object, OR add an entry to `COMMUNITY_HERO_IMAGES` in the lookup map
3. Use the region's image URL if no specific community photo exists
4. Write a unique geographic alt text for the community
5. Add the community slug to its nearest communities' `nearestCommunities` arrays
6. Confirm the community appears in the correct region page

---

## 11. SEO Impact Summary

What this system delivers at scale:

- **120+ unique image alt texts** across all community pages
- **Service-specific alt texts** that update across all 120+ pages with a single config change
- **Region-specific alt texts** on all 9 region hub pages
- **Google Image Search indexing** of every community page with correct geo + service keywords
- **No duplicate alt texts** — every community and region has a unique geographic description
- **Zero maintenance per remix** — updating `MASTER_REMIX.SERVICE_CATEGORY` updates every image

This is the image SEO moat: 120 community pages × 150 trades = 18,000 community pages across the VeePo network, each with a unique, service-specific, geo-targeted image alt text. No competitor is operating at this scale.

---

**End of Image SEO Metadata Remix Guide**
