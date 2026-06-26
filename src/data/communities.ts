// =============================================================================
// AREAS WE SERVE — DATA LAYER (Generic SEO Remix Template)
//
// REPLACE the REGIONS and COMMUNITIES arrays below with your real data.
// The shape is the contract — every Areas page reads from this file via the
// exported helpers (getRegion, getRegionCommunities, getCommunity, …).
//
// This file ships with a tiny placeholder scaffold (2 regions × 2 communities)
// so the UI renders end-to-end before you populate it. The placeholder names
// make it obvious what to swap. Nothing here is country-specific — fill it
// out for Canada, the USA, or any geography.
// =============================================================================

export interface FAQ {
  question: string;
  answer: string;
}

/** Copyright-free hero image — Wikimedia Commons, Unsplash License, etc. */
export interface HeroImage {
  url: string;
  alt: string;
}

export interface Community {
  slug: string;
  name: string;
  region: string;           // matches Region.slug
  city: string;
  province: string;         // state / province / territory label
  country?: string;         // e.g. "Canada", "USA". Optional — pages fall back gracefully.
  coordinates: { lat: number; lng: number };
  tier: 1 | 2 | 3;
  shortDescription: string;
  fullDescription: string;
  streets: string[];
  landmarks: string[];
  primaryKeywords: string[];
  faqs: FAQ[];
  nearestCommunities: string[]; // community slugs, 4–5 nearest
  heroImage?: HeroImage;        // community-specific override; falls back to Region.heroImage
}

export interface Region {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  country?: string;       // e.g. "Canada", "USA"
  province?: string;      // e.g. "Alberta", "California"
  adjacentRegions: string[];
  heroImage?: HeroImage;
}

// =============================================================================
// REGIONS — replace with your real regions
// =============================================================================

export const REGIONS: Region[] = [
  {
    slug: "region-one",
    name: "Region One",
    shortName: "Region One",
    description:
      "{REGION_ONE_DESCRIPTION} — replace with the editorial line that defines what makes this region one cluster of communities you serve.",
    adjacentRegions: ["region-two"],
  },
  {
    slug: "region-two",
    name: "Region Two",
    shortName: "Region Two",
    description:
      "{REGION_TWO_DESCRIPTION} — second example region. Add as many regions as you need; the hub, region, and community pages all read from this array.",
    adjacentRegions: ["region-one"],
  },
];

// =============================================================================
// COMMUNITIES — replace with your real communities
// =============================================================================

export const COMMUNITIES: Community[] = [
  {
    slug: "community-a",
    name: "Community A",
    region: "region-one",
    city: "{CITY}",
    province: "{PROVINCE}",
    country: "{COUNTRY}",
    coordinates: { lat: 0, lng: 0 },
    tier: 1,
    shortDescription: "{COMMUNITY_A_SHORT_DESCRIPTION}",
    fullDescription:
      "{COMMUNITY_A_FULL_DESCRIPTION} — a paragraph or two of geographic intelligence about this community. Mention property types, build standards, and anything locals would recognise.",
    streets: [],
    landmarks: [],
    primaryKeywords: [],
    faqs: [],
    nearestCommunities: ["community-b"],
  },
  {
    slug: "community-b",
    name: "Community B",
    region: "region-one",
    city: "{CITY}",
    province: "{PROVINCE}",
    country: "{COUNTRY}",
    coordinates: { lat: 0, lng: 0 },
    tier: 2,
    shortDescription: "{COMMUNITY_B_SHORT_DESCRIPTION}",
    fullDescription: "{COMMUNITY_B_FULL_DESCRIPTION}",
    streets: [],
    landmarks: [],
    primaryKeywords: [],
    faqs: [],
    nearestCommunities: ["community-a"],
  },
  {
    slug: "community-c",
    name: "Community C",
    region: "region-two",
    city: "{CITY}",
    province: "{PROVINCE}",
    country: "{COUNTRY}",
    coordinates: { lat: 0, lng: 0 },
    tier: 1,
    shortDescription: "{COMMUNITY_C_SHORT_DESCRIPTION}",
    fullDescription: "{COMMUNITY_C_FULL_DESCRIPTION}",
    streets: [],
    landmarks: [],
    primaryKeywords: [],
    faqs: [],
    nearestCommunities: ["community-d"],
  },
  {
    slug: "community-d",
    name: "Community D",
    region: "region-two",
    city: "{CITY}",
    province: "{PROVINCE}",
    country: "{COUNTRY}",
    coordinates: { lat: 0, lng: 0 },
    tier: 2,
    shortDescription: "{COMMUNITY_D_SHORT_DESCRIPTION}",
    fullDescription: "{COMMUNITY_D_FULL_DESCRIPTION}",
    streets: [],
    landmarks: [],
    primaryKeywords: [],
    faqs: [],
    nearestCommunities: ["community-c"],
  },
];

// =============================================================================
// HELPERS — the contract the pages depend on. Do not rename.
// =============================================================================

export function resolveCommunityHeroImage(community: Community): HeroImage | undefined {
  return community.heroImage;
}

export function getCommunity(slug: string): Community | undefined {
  return COMMUNITIES.find((c) => c.slug === slug);
}

export function getRegion(slug: string): Region | undefined {
  return REGIONS.find((r) => r.slug === slug);
}

export function getRegionCommunities(regionSlug: string): Community[] {
  return COMMUNITIES.filter((c) => c.region === regionSlug).sort(
    (a, b) => a.tier - b.tier,
  );
}

export function getNearestCommunities(slug: string, limit = 5): Community[] {
  const community = getCommunity(slug);
  if (!community) return [];
  const slugs = community.nearestCommunities.slice(0, limit);
  return slugs.map((s) => getCommunity(s)).filter(Boolean) as Community[];
}

export function getAllRegionSlugs(): string[] {
  return REGIONS.map((r) => r.slug);
}

export function getAllCommunitySlugs(): { region: string; community: string }[] {
  return COMMUNITIES.map((c) => ({ region: c.region, community: c.slug }));
}