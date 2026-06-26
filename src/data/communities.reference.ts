/**
 * ════════════════════════════════════════════════════════════════════════
 *   REFERENCE ONLY — DO NOT IMPORT IN PRODUCTION.
 * ════════════════════════════════════════════════════════════════════════
 *
 * Snapshot of a populated Areas-We-Serve dataset (sourced from the
 * Cochrane Master Builders template) so a remix author can see the
 * expected shape, content density, FAQ structure, and SEO copy
 * patterns to aim for when filling out the live `src/data/communities.ts`.
 *
 * To activate: copy entries from `REFERENCE_REGIONS` / `REFERENCE_COMMUNITIES`
 * into `communities.ts`, then adapt to your own geography (Canada, USA,
 * or wherever you serve). Never import this file at runtime — it lives
 * next to the live data layer purely as documentation.
 *
 * Imagery: all `heroImage` URLs are copyright-cleared (Wikimedia Commons
 * CC BY / CC BY-SA / Unsplash License) and remain hot-linked here for
 * reference. Replace with your own per-region imagery on activation.
 */

import type { Community, Region } from "./communities";

export const REFERENCE_REGIONS: Region[] = [
  {
    slug: "cochrane",
    name: "Cochrane",
    shortName: "Cochrane",
    description:
      "Cochrane's established neighbourhoods — from riverside Riversong to the hilltop views of GlenEagles and Heritage Hills.",
    country: "Canada",
    province: "Alberta",
    adjacentRegions: ["rocky-view", "bow-valley"],
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cochrane_Wikivoyage_banner.jpg",
      alt: "Cochrane, Alberta — panoramic view of the town and Cochrane Ranch with the Rocky Mountains",
    },
  },
  {
    slug: "rocky-view",
    name: "Rocky View County",
    shortName: "Rocky View",
    description:
      "Rocky View County's acreage estates — Bearspaw, Watermark, Silverhorn, and Heritage Pointe.",
    country: "Canada",
    province: "Alberta",
    adjacentRegions: ["cochrane"],
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Bearspaw_-_panoramio.jpg",
      alt: "Bearspaw, Rocky View County, Alberta — rolling foothills acreage landscape",
    },
  },
  {
    slug: "bow-valley",
    name: "Bow Valley Corridor",
    shortName: "Bow Valley",
    description:
      "The Bow Valley's mountain hamlets — Ghost Lake, CottageClub, Exshaw, Harvie Heights, and Waiparous.",
    country: "Canada",
    province: "Alberta",
    adjacentRegions: ["cochrane"],
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Ghost_Lake_-_panoramio.jpg",
      alt: "Ghost Lake, Alberta — Bow Valley corridor with the Rocky Mountains reflected in the reservoir",
    },
  },
];

export const REFERENCE_COMMUNITIES: Community[] = [
  // ── COCHRANE ──────────────────────────────────────────────────────────
  {
    slug: "heritage-hills",
    name: "Heritage Hills",
    region: "cochrane",
    city: "Cochrane",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.2017, lng: -114.4817 },
    tier: 1,
    shortDescription:
      "Northwest Cochrane's premier community with Rocky Mountain vistas, luxury finishes, and easy Highway 1A access.",
    fullDescription:
      "Heritage Hills sits on the northwest edge of Cochrane with some of the most commanding Rocky Mountain views in town. Semi-detached and fully detached homes built to a luxury standard — chef's kitchens, walkout basements, vaulted great rooms. Homes range mid-$500s to upper $700s. Mountain Ridge Plaza is minutes away; Highway 1A connects to Calgary in under 40 minutes. Open-concept main floors with high ceilings demand precision taping and finishing. Accent walls, coffered ceilings, and feature-fireplace surrounds are common requests.",
    streets: [
      "Heritage Gate Drive",
      "Heritage Parkway",
      "Heritage Heights Way",
      "Heritage View Circle",
      "Heritage Mount Rise",
      "Heritage Boulevard",
    ],
    landmarks: [
      "Mountain Ridge Plaza",
      "Highway 1A",
      "Rocky Mountains",
      "Cochrane town centre",
      "Heritage Hills Community Park",
    ],
    primaryKeywords: [
      "Heritage Hills drywall contractor",
      "Heritage Hills Cochrane home renovation",
      "luxury drywall Heritage Hills",
    ],
    faqs: [
      {
        question: "Do you do drywall in Heritage Hills, Cochrane?",
        answer:
          "Yes — we serve Heritage Hills and all surrounding Cochrane communities. Typically on our schedule within days.",
      },
      {
        question: "What kinds of projects are common in Heritage Hills?",
        answer:
          "Vaulted ceilings, open-concept main floors, walkout basements, coffered ceiling detail, and smooth Level 5 finishes for feature walls.",
      },
      {
        question: "How much does drywall repair cost in Heritage Hills?",
        answer:
          "From $150 for a small patch to $1,200+ for a full ceiling repair. Written estimates before any work begins.",
      },
    ],
    nearestCommunities: ["sunset-ridge", "gleneagles", "riversong"],
  },
  {
    slug: "sunset-ridge",
    name: "Sunset Ridge",
    region: "cochrane",
    city: "Cochrane",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.2017, lng: -114.4617 },
    tier: 1,
    shortDescription:
      "A north-of-highway Cochrane community with a six-acre pond, 5 km of pathways, and housing from condos to $1.25M+ estates.",
    fullDescription:
      "Sunset Ridge occupies the north side of Highway 1A in Cochrane, offering a complete range of housing from entry-level condos and townhomes through to detached executive properties priced above $1.25 million. Six-acre freshwater pond, central park, 5 km pathway network, outdoor exercise circuit, and off-leash dog area. Higher-end homes feature open-concept layouts, 9-foot ceilings, and large mountain-facing windows.",
    streets: [
      "Sunset Heights Drive",
      "Sunhaven Close",
      "Sunrock Close",
      "Sunrise View Way",
      "Sunset Crescent",
    ],
    landmarks: [
      "Six-acre freshwater pond",
      "Cochrane Outdoor Exercise Circuit",
      "5 km Sunset Ridge pathway network",
      "Highway 1A",
    ],
    primaryKeywords: [
      "Sunset Ridge drywall Cochrane",
      "Sunset Ridge home renovation",
      "Cochrane north drywall",
    ],
    faqs: [
      {
        question: "Do you serve Sunset Ridge in Cochrane?",
        answer:
          "Yes — one of our most active neighbourhoods. Basement developments on newer builds, patch repairs on established condos and townhomes.",
      },
      {
        question: "Can you match existing texture in Sunset Ridge homes?",
        answer:
          "Yes. We match orange peel, knockdown, and smooth finishes. We test a sample area before proceeding on any texture-match repair.",
      },
    ],
    nearestCommunities: ["heritage-hills", "gleneagles", "riversong"],
  },
  {
    slug: "riversong",
    name: "Riversong",
    region: "cochrane",
    city: "Cochrane",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.175, lng: -114.4344 },
    tier: 1,
    shortDescription:
      "Southeast Cochrane's nature-reserve community with 19 km of pathways, Bow River views, and proximity to the Cochrane Golf Club.",
    fullDescription:
      "Riversong is built around natural reserve lands on Cochrane's southeast edge — 19 km of connected pathways, river viewpoints, playgrounds, sports fields. Detached single-family homes, semi-attached units, townhomes, prices mid-$400s to $800K+ for river-view estate lots. Drywall and finishing work here often involves precision around large window openings, stairwell vaults, and clean-line finishing.",
    streets: ["Rivercroft Close", "Rivermead Drive", "Riverstone Place", "Riverglen Drive"],
    landmarks: [
      "Cochrane Golf Club",
      "Bow River natural reserves",
      "19 km Riversong pathway network",
      "Spray Lake Sawmills Family Sports Centre",
    ],
    primaryKeywords: [
      "Riversong drywall contractor Cochrane",
      "Bow River view homes drywall",
    ],
    faqs: [
      {
        question: "Do you do drywall in Riversong, Cochrane?",
        answer:
          "Yes — Riversong is one of our core Cochrane service areas. Townhomes near the sports centre to estate lots along the river-view plateau.",
      },
    ],
    nearestCommunities: ["gleneagles", "heritage-hills", "sunset-ridge"],
  },
  {
    slug: "gleneagles",
    name: "GlenEagles",
    region: "cochrane",
    city: "Cochrane",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.175, lng: -114.4517 },
    tier: 1,
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/9/97/Dawn_in_Cochrane_-_panoramio.jpg",
      alt: "Dawn over Cochrane, Alberta — GlenEagles overlooks the Bow River valley and Rocky Mountains",
    },
    shortDescription:
      "Cochrane's hillside golf community with panoramic Rocky Mountain and Bow River valley views, adjacent to the Links of GlenEagles.",
    fullDescription:
      "GlenEagles sits on Cochrane's eastern hillside, defined by the Links of GlenEagles golf course and panoramic Rocky Mountain / Bow River valley views. Tudor, Craftsman, and contemporary prairie architecture; mid-$600s to $1.2M+ for premium golf-course lots. Double-height foyers, two-storey stair walls, and Level 5 smooth finishes for feature rooms are regular requests.",
    streets: ["GlenEagles Drive", "GlenEagles View", "GlenEagles Estates Boulevard"],
    landmarks: [
      "Links of GlenEagles golf course",
      "Bow River valley escarpment",
      "Rocky Mountain panoramic views",
    ],
    primaryKeywords: ["GlenEagles drywall Cochrane", "hillside estate drywall Cochrane"],
    faqs: [
      {
        question: "Can you finish a double-height foyer or stair wall in GlenEagles?",
        answer:
          "Yes — common in GlenEagles' larger builds. We have the scaffolding and experience to finish them cleanly and safely.",
      },
    ],
    nearestCommunities: ["riversong", "heritage-hills", "bearspaw-watermark"],
  },

  // ── ROCKY VIEW ────────────────────────────────────────────────────────
  {
    slug: "bearspaw-watermark",
    name: "Bearspaw (including Watermark)",
    region: "rocky-view",
    city: "Rocky View County",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.1317, lng: -114.3167 },
    tier: 1,
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/2/22/Bearspaw%2C_Alberta.JPG",
      alt: "Bearspaw, Alberta — rolling acreage landscape between Calgary and Cochrane",
    },
    shortDescription:
      "Rocky View's premier estate community between Calgary and Cochrane — rolling hills, mountain views, Bearspaw and Watermark golf clubs.",
    fullDescription:
      "Bearspaw is Rocky View County's most established rural estate community — rolling hill terrain between Calgary and Cochrane with commanding mountain and prairie views. Watermark is a 287-acre master-planned enclave with 479 estate lots. 12-foot coffered ceilings, barrel-vault corridors, wainscoting detail work, and built-in cabinetry surrounds require serious finishing craft.",
    streets: ["Bearspaw Drive", "Watermark Avenue", "Watermark Boulevard"],
    landmarks: [
      "Bearspaw Golf Club",
      "Watermark Golf Club",
      "Equestrian facilities",
    ],
    primaryKeywords: [
      "Bearspaw drywall contractor",
      "Watermark estate home renovation",
      "luxury drywall Bearspaw Alberta",
    ],
    faqs: [
      {
        question: "Can you do coffered ceilings and high-end detail work in Bearspaw estates?",
        answer:
          "Absolutely. Coffered ceilings, barrel vaults, wainscoting, and feature wall finishing — same standard as the homes we work in.",
      },
    ],
    nearestCommunities: ["silverhorn", "gleneagles", "heritage-hills"],
  },
  {
    slug: "silverhorn",
    name: "Silverhorn (Bearspaw)",
    region: "rocky-view",
    city: "Rocky View County",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.15, lng: -114.35 },
    tier: 2,
    shortDescription:
      "Master-planned acreage community in Bearspaw with 50% preserved natural open space and 1.3–2.2 acre custom home lots.",
    fullDescription:
      "Silverhorn preserves more land than it develops — 50%+ retained as natural open space, 80% of wetlands maintained as wildlife corridors. 1.3–2.2 acre serviced lots for custom homes, ~20 minutes from downtown Calgary. Level 5 smooth finish throughout, feature ceilings in great rooms, and specialty texture work are common across Silverhorn projects.",
    streets: ["Silverhorn Drive", "Silverhorn Boulevard"],
    landmarks: ["50%+ natural open space preserved", "Wildlife corridors"],
    primaryKeywords: ["Silverhorn Bearspaw drywall", "custom home finishing Silverhorn"],
    faqs: [
      {
        question: "Do most Silverhorn homes need Level 5 finish?",
        answer:
          "Most clients specify it — full skim coat over all drywall for a perfectly flat surface, standard for high-end paint finishes and open-plan estate homes.",
      },
    ],
    nearestCommunities: ["bearspaw-watermark", "gleneagles", "heritage-hills"],
  },

  // ── BOW VALLEY ────────────────────────────────────────────────────────
  {
    slug: "cottageclub-ghost-lake",
    name: "CottageClub at Ghost Lake",
    region: "bow-valley",
    city: "Rocky View County",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.2, lng: -114.6917 },
    tier: 1,
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/3/38/Ghost_Lake_-_panoramio.jpg",
      alt: "Ghost Lake, Alberta — panoramic view of the reservoir with the Rocky Mountains",
    },
    shortDescription:
      "Fully established private gated lake community 40 minutes west of Calgary — private beaches, boat launch, 11,000 sq ft recreation centre, 350 cottage lots.",
    fullDescription:
      "One of Alberta's most remarkable private lake communities — gated, 40 minutes west of Calgary. Private sandy beaches, boat launch, tennis and pickleball courts, kilometres of trails, 11,000 sq ft recreation centre with pool, hot tub, gym, library. ~350 lots, ~70% second-home ownership, year-round recreation. Custom cottage finishing is a specific skill set.",
    streets: ["CottageClub Drive", "Lakefront Road", "Marina Way"],
    landmarks: [
      "Sandy private beaches",
      "Private boat launch",
      "11,000 sq ft recreation centre",
    ],
    primaryKeywords: [
      "CottageClub Ghost Lake drywall",
      "lakefront cottage renovation",
    ],
    faqs: [
      {
        question: "What's the best finish for a recreational cottage interior?",
        answer:
          "Level 4 is the standard for recreational cottages; Level 5 for cottages used as primary residences or premium rentals.",
      },
    ],
    nearestCommunities: ["ghost-lake-village"],
  },
  {
    slug: "ghost-lake-village",
    name: "Ghost Lake Village",
    region: "bow-valley",
    city: "Rocky View County",
    province: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.2, lng: -114.7 },
    tier: 2,
    heroImage: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Ghost_Lake-autumn01.Alberta.CA.jpg",
      alt: "Ghost Lake, Alberta in autumn — lakeside village landscape in the Bow Valley",
    },
    shortDescription:
      "Serene lakeside community between the Bow Valley Trail and Ghost Lake Reservoir — a peaceful retreat with boating access near Calgary.",
    fullDescription:
      "Nestled between the Bow Valley Trail and the northern shore of the Ghost Lake Reservoir. Stunning natural beauty, year-round outdoor recreation. 45 minutes from Calgary, 15 minutes from Cochrane. Custom cottages and recreational residences are the primary housing type.",
    streets: ["Ghost Lake Drive", "Lakefront Crescent", "Lake Shore Drive"],
    landmarks: ["Ghost Lake Reservoir", "Bow Valley Trail"],
    primaryKeywords: ["Ghost Lake Village drywall", "lakeside cottage renovation"],
    faqs: [
      {
        question: "What's the best insulation for a Ghost Lake cottage?",
        answer:
          "Spray foam for airtightness in a recreational cottage, especially for properties used year-round.",
      },
    ],
    nearestCommunities: ["cottageclub-ghost-lake"],
  },
];