---
document_id: "IMG-SEO-1.0"
title: "Areas We Serve — Image SEO Metadata Remix Guide"
source: "../../../source-documents/strategy/image-seo-metadata-remix-guide.md"
type: "Partner Intelligence Document"
category: "Strategy — Local SEO / Image SEO"
---

# Partner Document: Image SEO Metadata Remix Guide

## What This Document Is

This is the complete operational guide for the two-layer image SEO system embedded into the Areas We Serve section. It explains how hero images on all 120+ community pages and all 9 region pages generate service-specific, geo-targeted alt text that adapts automatically to any of the 150 trade remixes.

The source document is a technical spec AND a step-by-step remix guide — consult it whenever:
- A new trade site is being remixed and image SEO needs verification
- A new community-specific photo has been found and needs to be added
- A community is being added to the system and needs its heroImage assigned
- You need to understand why the alt text system works as it does
- You are writing code that touches `CommunityPage.tsx`, `RegionPage.tsx`, or `communities.ts`

---

## The Core Architecture — In One Sentence

The `alt` field stored in `communities.ts` is geographic-only. The page component prepends `MASTER_REMIX.SERVICE_CATEGORY` at render time. Every remix gets service-specific image alt text with zero additional work.

---

## When to Consult This Document

| Decision Type | Consult This Document |
|---|---|
| Remixing for a new trade and verifying image SEO is correct | ✅ |
| Adding a new community-specific photo to communities.ts | ✅ |
| Adding a new community to the system | ✅ |
| Changing how hero images render in CommunityPage or RegionPage | ✅ |
| Understanding the COMMUNITY_HERO_IMAGES lookup map | ✅ |
| Checking which images are CC0 vs CC BY vs CC BY-SA | ✅ |
| Verifying attribution requirements for hero images | ✅ |
| Building the ImageObject schema for a community page | ✅ |

---

## The Two Files That Control Everything

1. **`src/data/communities.ts`** — Contains the `COMMUNITY_HERO_IMAGES` lookup map with geographic alt text for all 120+ communities, and the `resolveCommunityHeroImage()` helper function.

2. **`src/pages/CommunityPage.tsx`** — Constructs the full SEO alt text at render: `` `${sc} in ${community.name}, ${community.city} Alberta — ${heroImg.alt}` ``

3. **`src/pages/RegionPage.tsx`** — Same pattern for region pages: `` `${sc} services across ${region.name}, Alberta — ${heroImg.alt}` ``

---

## Priority Chain for Hero Image Resolution

```
1. community.heroImage (set inline in community object) — highest priority
2. COMMUNITY_HERO_IMAGES[community.slug] (lookup map)
3. region.heroImage (region-level fallback)
4. No image — solid forest colour background
```

Currently, all 120+ communities have an entry in either #1 or #2. No community falls through to #3 (region only) or #4 (no image).

---

## Confirmed Copyright-Free Image Inventory

### Community-Specific Overrides (Tier 1 — exact location photos)
13 communities have verified photographs of their actual location:
- Bearspaw / Watermark, GlenEagles, Riversong, Cochrane Heights, Glenbow, Fireside
- CottageClub at Ghost Lake, Ghost Lake Village
- Three Sisters Mountain Village, Silvertip Resort, Benchlands, Spring Creek Mountain Village
- West Springs (Calgary)

### Region Representative Images (Tier 2 — all others)
9 regional images covering all remaining communities:
- Cochrane banner (CC BY 2.0), Bearspaw panoramio (CC BY-SA), Springbank Road (CC BY-SA)
- Rockies in the morning (CC BY-SA), Calgary bridge/skyline/aerial (Unsplash)
- Ghost Lake panoramio (CC BY-SA), Three Sisters Canmore (CC BY-SA)

---

## Critical Rules for Developers

1. **NEVER add a service name to `heroImage.alt` in `communities.ts`** — The service is added at render time. If you put "drywall" in the alt text in the data, it will break tile and insulation remixes.

2. **NEVER change the alt text construction formula in CommunityPage.tsx** without updating this guide and the source document.

3. **Community-specific `heroImage` on the object takes priority** over the lookup map — this is by design so verified exact-location photos can be used where available.

4. **When adding a new photo**: verify the license, write geographic-only alt text, add it to the community object directly (or to `COMMUNITY_HERO_IMAGES` if it applies to multiple communities).

---

## Relationship to Other Documents

| Document | Relationship |
|---|---|
| `areas-we-serve-seo-design-plan-partner.md` | The parent SEO architecture document — image SEO is one layer within it |
| `communities_master_v3.partner.md` | Community data source — the geographic descriptions in `heroImage.alt` derive from this data |
| `1.5.2_Volume_3_Seo_Ai_Seo_Service_Ecosystem_Partner.md` | The broader SEO strategy — image SEO reinforces the local keyword cluster |

---

## Keywords That Should Trigger Consulting This Document

- "hero image", "alt text", "image SEO", "heroImage", "COMMUNITY_HERO_IMAGES"
- "community photo", "copyright-free image", "Wikimedia Commons", "Unsplash"
- "resolveCommunityHeroImage", "SERVICE_CATEGORY alt text"
- "remix image", "trade-specific alt", "service in community alt"
- Any question about adding, changing, or updating images on area pages
