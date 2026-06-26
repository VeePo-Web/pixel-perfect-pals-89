/**
 * SERVICE AREAS — 100+ locations CMB serves.
 *
 * Auto-renders an index page + one SEO page per area on every remixed site.
 * Each area gets LocalBusiness JSON-LD and internal links to 5 nearby areas
 * + 5 sister sites (from backlink-network.ts).
 *
 * STATUS: Scaffold with anchor entries. Phase 2: replace with the full list
 * from your uploaded service-area document.
 */

export interface ServiceArea {
  /** Unique slug (kebab-case) — becomes /areas/<slug> */
  slug: string;
  /** Display name */
  name: string;
  /** Province/region */
  region: string;
  /** Lat/lng for schema markup */
  coordinates: { lat: number; lng: number };
  /** Distance from Cochrane in km — used for "nearest areas" sorting */
  distanceFromCochrane: number;
  /** Approximate population — used to prioritize SEO effort */
  population?: number;
  /** Notable neighborhoods/communities inside the area */
  neighborhoods: string[];
  /** Tier — affects internal-link weight and sitemap priority */
  tier: "core" | "primary" | "secondary";
}

export const SERVICE_AREAS: ServiceArea[] = [
  {
    slug: "cochrane",
    name: "Cochrane",
    region: "Alberta",
    coordinates: { lat: 51.1894, lng: -114.4669 },
    distanceFromCochrane: 0,
    population: 35000,
    neighborhoods: ["Sunset Ridge", "Heartland", "Fireside", "Riversong", "Bow Ridge"],
    tier: "core",
  },
  {
    slug: "calgary",
    name: "Calgary",
    region: "Alberta",
    coordinates: { lat: 51.0447, lng: -114.0719 },
    distanceFromCochrane: 30,
    population: 1400000,
    neighborhoods: ["NW Calgary", "Tuscany", "Royal Oak", "Rocky Ridge", "Bowness"],
    tier: "primary",
  },
  {
    slug: "airdrie",
    name: "Airdrie",
    region: "Alberta",
    coordinates: { lat: 51.2917, lng: -114.0144 },
    distanceFromCochrane: 35,
    population: 80000,
    neighborhoods: ["Bayside", "Kings Heights", "Reunion", "Cooper's Crossing"],
    tier: "primary",
  },
  {
    slug: "bragg-creek",
    name: "Bragg Creek",
    region: "Alberta",
    coordinates: { lat: 50.9494, lng: -114.5731 },
    distanceFromCochrane: 35,
    population: 600,
    neighborhoods: ["West Bragg Creek", "Wintergreen"],
    tier: "secondary",
  },
  // TODO Phase 2: append remaining 95+ areas from your uploaded document
];

/** Get the N nearest areas to a given slug (by km distance) */
export const getNearestAreas = (slug: string, limit = 5): ServiceArea[] => {
  const target = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!target) return [];
  return SERVICE_AREAS
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      area: a,
      delta: Math.abs(a.distanceFromCochrane - target.distanceFromCochrane),
    }))
    .sort((x, y) => x.delta - y.delta)
    .slice(0, limit)
    .map((x) => x.area);
};
