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
// REGIONS + COMMUNITIES — assembled per-database under src/data/locations/.
//
// Each master SEO database (spreadsheet) contributes one module. Locations are
// published in unified-score order, 20 per batch, through the pipeline in
// docs/seo/master-databases/04-fable5-batch-expansion-prompt.md.
// Full inventories: docs/seo/master-databases/<database>/ (all locations +
// regions of each spreadsheet are on record before any batch ships).
// =============================================================================

import { NS_REGIONS, NS_COMMUNITIES } from "./locations/nova-scotia";
import { AB_REGIONS, AB_COMMUNITIES } from "./locations/alberta";

export const REGIONS: Region[] = [...NS_REGIONS, ...AB_REGIONS];

export const COMMUNITIES: Community[] = [...NS_COMMUNITIES, ...AB_COMMUNITIES];

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