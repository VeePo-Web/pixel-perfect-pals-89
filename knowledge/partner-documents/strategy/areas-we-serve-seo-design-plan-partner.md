---
document_id: "AWS-1.0"
title: "Areas We Serve — SEO Architecture Design Plan"
source: "../../../source-documents/strategy/areas-we-serve-seo-design-plan.md"
type: "Partner Intelligence Document"
category: "Strategy — Local SEO Architecture"
---

# Partner Document: Areas We Serve SEO Architecture Design Plan

## What This Document Is

This is the master architectural blueprint for the "Areas We Serve" system across all 150 VeePo Master Builder sub-sites. It defines every structural, content, data, and technical decision required to build the primary local SEO engine for the entire network.

The source document is not a high-level overview. It is a complete implementation specification — covering URL architecture, React component hierarchy, TypeScript data models, schema markup, content strategy, street-level SEO logic, internal linking mechanics, cross-site brand injection, and a phased build roadmap.

This document is the most important SEO strategy document in the knowledge system.

---

## When to Consult This Document

| Decision Type | Consult This Document |
|---|---|
| Building or modifying any `/areas-we-serve/` page | ✅ Always |
| Designing the community page component | ✅ Always |
| Deciding URL structure for geographic pages | ✅ Always |
| Writing content for any community page | ✅ Always |
| Adding schema markup to geographic pages | ✅ Always |
| Building the internal linking system between pages | ✅ Always |
| Deciding which communities to prioritize | ✅ Always |
| Writing H1, title tag, or meta description for a community page | ✅ Always |
| Building the `communities.config.ts` data file | ✅ Always |
| Adapting the Areas We Serve system to a new trade brand | ✅ Always |
| Any question about street-level content and why it matters | ✅ Always |
| Static generation, sitemap, or technical SEO for area pages | ✅ Always |

---

## The Three Tiers — At a Glance

The source document defines a strict three-tier page hierarchy. Every Areas We Serve build decision must respect this structure:

**Tier 1 — Hub Page** (`/areas-we-serve`)
- The brand-level authority page
- Links to all 9 region pages
- Features the top 6 community spotlights
- SEO target: brand-level regional queries

**Tier 2 — Region Pages** (`/areas-we-serve/{region}`)
- 9 regional hub pages (Cochrane, Springbank, Bow Valley, etc.)
- Groups all communities in a region
- SEO target: "[Service] [Region]" queries

**Tier 3 — Community Pages** (`/areas-we-serve/{region}/{community}`)
- 131 individual community pages — the SEO powerhouse
- Maximum geographic specificity
- SEO target: "[Service] [Community Name] Alberta" — the money queries

Do not collapse these tiers. Do not merge region and community pages. The hierarchy is intentional and creates the internal link authority flow that makes the system work.

---

## The Street-Level Layer — Why It Matters

The single most important differentiator in this system is the street-level content. Consult Section 9 of the source document when writing any community page body.

Every community page must include:
- Specific named streets (woven into prose, not listed)
- Minimum named streets per tier: 8–12 (Tier 1), 4–8 (Tier 2), 2–4 (Tier 3)
- At minimum 3 named landmarks (golf courses, parks, schools, highways)
- Distance and highway access reference ("X minutes from Cochrane")

Streets are never presented as a bare list. They are written as natural prose that reads like a local tradesperson wrote it — because that is exactly what it signals to Google.

---

## Data Model — What Must Be Built

Before any community page can render, the `communities.config.ts` file must be fully populated. This file is the core data layer. Every field in the `Community` interface defined in Section 5.1 of the source document must be populated for all 131 communities.

Key fields:
- `slug` — URL slug (lowercase, hyphenated)
- `region` — which of the 9 regions
- `streets[]` — specific named streets (researched from Maps or project history)
- `landmarks[]` — named golf courses, parks, schools, lakes, highways
- `primaryKeywords[]` — pull directly from communities_master_v3 SEO suggestions
- `faqs[]` — 4 questions minimum, community-name + service-type specific
- `nearestCommunities[]` — 3–5 slugs of nearest communities (drives internal linking)
- `tier` — `primary | secondary | tertiary` (governs content depth target)

---

## Schema Markup Requirements

Every community page requires FOUR schema types. Missing any of them is incomplete:

1. `LocalBusiness` — with `areaServed` pointing to the specific community
2. `BreadcrumbList` — full 4-level breadcrumb
3. `FAQPage` — minimum 4 Q&A pairs
4. `Service` — with `areaServed` specifying community name and coordinates

See Section 8.6 of the source document for the full JSON-LD structure of each.

---

## Content Output Standards

When writing or generating any community page content, apply these rules from the source document:

### H1 Pattern
`[Service] in [Community Name], [City] — [Brand]`

### Title Tag Pattern
`[Service] [Community Name] [City] | [Brand Name] | Alberta`

### Body Content Minimum
- Total: 770 words minimum per page
- Geographic prose: 200 words
- Service connection: 80 words
- Streets and landmarks: 100 words
- Services grid: 120 words (30 × 4)
- FAQ answers: 240 words (60 × 4)
- CTA copy: 30 words

### Content Uniqueness
No two community pages share the same opening paragraph. Streets are always different. Landmarks are always different. The only templated element is the structural pattern — the content is always community-specific.

---

## Cross-Site Brand Injection Rules

When building a community page for any of the 150 sites:

**What changes per brand:**
- Service type in H1, title, meta description
- Service-specific body copy
- Service-specific FAQ answers
- Services grid content
- CTA button text
- Schema `name` field for Service type

**What never changes:**
- Community name, description, geography
- Street names
- Landmark names
- Nearby communities linking
- URL structure
- Breadcrumb pattern

The `BrandConfig` interface (Section 5.2) governs all brand injection. Do not hardcode brand text into community page components.

---

## Internal Linking Rules

Every community page must have:
- **Inbound links:** Minimum 5 (parent region, hub page, 3+ nearby communities)
- **Outbound links:** Minimum 8 (region breadcrumb, hub breadcrumb, 3–5 nearby communities, 4–6 service pages)

The `getNearestCommunities()` function in `service-areas.ts` calculates nearest communities by coordinate distance. Prefer same-region communities. Maximum 2 cross-region nearby links per page.

---

## Implementation Phases — Quick Reference

| Phase | Focus | Status |
|---|---|---|
| Phase 1 | Foundation (data model, templates, static generation, schema, sitemap) | Build first |
| Phase 2 | Content depth (community descriptions, streets, FAQs, photos) | After structure is live |
| Phase 3 | Internal linking activation (Nearby Communities, Service ↔ Community cross-links) | After content is live |
| Phase 4 | Cross-site deployment (150 sites, brand config, service blocks) | After Phase 3 validated |
| Phase 5 | Ongoing optimization (monthly content updates, new streets from projects, ranking monitoring) | Continuous |

---

## Community Tier Priority

**Build Tier 1 first.** These are the highest-value communities.

Tier 1 includes:
- All Cochrane sub-communities (Heritage Hills, Sunset Ridge, Riversong, GlenEagles, Heartland, West Terrace, etc.)
- Bearspaw (including Watermark)
- Elbow Valley (core + sub-communities)
- Springbank Hill
- Aspen Woods
- CottageClub at Ghost Lake
- Bragg Creek & Redwood Meadows

See Section 15 of the source document for the complete tier classification.

---

## Dependencies and Related Documents

| Document | Relationship |
|---|---|
| `communities_master_v3.source.md` | Primary data source — all 131 community descriptions, landmarks, SEO keywords live here. Community page bodies draw from this verbatim |
| `communities_master_v3.partner.md` | Explains how to adapt the spreadsheet data for community page use |
| `1.5.5_Volume_6_Conversion_CRM_Proof_Governance_System_Partner.md` | Community page CTAs and forms must follow the conversion architecture defined there (progressive disclosure, 3-tier CTA hierarchy, CRM pre-fill) |
| `1.5.1_Volume_2_Website_Ux_Ui_Psychology_System_Partner.md` | Community page visual design, animation, spacing, and component polish standards come from this document |
| `1.2_Strategic_Business_SEO_UX_Report_Partner.md` | Overall SEO strategy context — community pages are the local execution layer of the broader SEO system |
| `service-areas.ts` | TypeScript implementation of the community data model — must be updated to include all 131 communities |
| `ServiceArea.tsx` | Existing page component — must be refactored to the 3-tier architecture defined here |

---

## What Future Prompts Should Trigger This Document

When any coding or design assistant receives a prompt containing these keywords or themes, this document must be the primary governing reference:

**Keywords:**
- "areas we serve"
- "service area"
- "community page"
- "local SEO"
- "neighbourhood page"
- "geographic page"
- "which areas do you serve"
- "communities"
- "Riversong", "Heritage Hills", "GlenEagles", or any other community name from the 131-community list
- "street names"
- "Tier 1 / Tier 2 / Tier 3 communities"
- "region page"
- "hub page"
- "nearby communities"
- "internal linking"
- "LocalBusiness schema"
- "areaServed schema"
- "FAQPage schema"
- "communities.config.ts"
- "service-areas.ts"

**Question patterns:**
- "How should we structure the areas we serve section?"
- "What goes on a community page?"
- "How do we rank for [service] in [community]?"
- "How does the cross-site geographic system work?"
- "How do we make this work for Cochrane Tile Masters vs. Cochrane Drywall Masters?"

---

## Quality Standard

Every community page this system produces must feel like it was written by a local contractor who has worked in that specific neighbourhood — not like a content farm page that swapped in a community name. The street-level layer, the landmark integration, and the service-specific prose are what create that authenticity. Do not shortcut them.

This is the primary SEO engine of the entire VeePo network. Treat every decision about these pages at that level of importance.
