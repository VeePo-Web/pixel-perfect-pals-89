/**
 * CROSS-SELL MAP — Thank-you page bento source of truth
 *
 * Keyed by serviceSlug. Each entry defines:
 *   - question: the editorial heading above the 3-block bento
 *   - recommendations: exactly 3 links to other Master Builder network sites
 *
 * Remixes edit ONLY this file to customise the thank-you cross-sell.
 * The ThankYou page component reads from here — never hard-codes links.
 */

export interface CrossSellLink {
  /** Trade name — Space Grotesk on the bento card. */
  name: string;
  /** Public URL of the sister site — opens in new tab. */
  url: string;
  /** One-sentence value proposition — Jost 300 on the card. */
  valueProp: string;
}

export interface CrossSellEntry {
  /** Editorial question above the bento. e.g. "Need your floors done next?" */
  question: string;
  /** Exactly 3 recommended links. */
  recommendations: [CrossSellLink, CrossSellLink, CrossSellLink];
}

// ── Master network cross-sell map ────────────────────────────────────────────
// Update URLs when each trade site goes live.

export const CROSS_SELL_MAP: Record<string, CrossSellEntry> = {
  drywall: {
    question: "While the walls are open, did you know we also do?",
    recommendations: [
      {
        name: "Cochrane Insulation Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Spray foam and batt insulation from new builds to heritage retrofits.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Level-5 finish into paint — same crew, same standard.",
      },
      {
        name: "Cochrane Flooring Guild",
        url: "https://cochrane-master-builders.com",
        valueProp: "Hardwood, LVP, and tile from a crew that respects the subfloor.",
      },
    ],
  },

  tile: {
    question: "While the tile is setting, who's handling the rest?",
    recommendations: [
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "Level-5 finish on every wall the tile will meet.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Trim, ceiling, and feature wall — finished to match the tile's precision.",
      },
      {
        name: "Cochrane Insulation Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Sound and thermal insulation before the walls close.",
      },
    ],
  },

  flooring: {
    question: "The floors are done. What's next on the list?",
    recommendations: [
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "Seamless walls to match the floor's horizontal discipline.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Baseboard, trim, and wall colour — the room's final argument.",
      },
      {
        name: "Cochrane Tile Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Wet-area tile set to the same standard as your flooring.",
      },
    ],
  },

  painting: {
    question: "One coat in. What else needs finishing?",
    recommendations: [
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "The Level-5 prep that makes paint look its best.",
      },
      {
        name: "Cochrane Flooring Guild",
        url: "https://cochrane-master-builders.com",
        valueProp: "The floor under the paint — installed and finished by the same standard.",
      },
      {
        name: "Cochrane Tile Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Kitchen and bath tile — precision the wall colour will respect.",
      },
    ],
  },

  insulation: {
    question: "The building envelope is sealed. What's inside it?",
    recommendations: [
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "The first wall surface that goes over the insulation — done once, done right.",
      },
      {
        name: "Cochrane HVAC & Mechanical",
        url: "https://cochrane-master-builders.com",
        valueProp: "Heat distribution systems that work with the insulation envelope, not against it.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Vapour-barrier-aware paint systems for the spaces that need them.",
      },
    ],
  },

  roofing: {
    question: "The roof is sealed. What about the rest of the envelope?",
    recommendations: [
      {
        name: "Cochrane Insulation Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Attic insulation and air-sealing under the new roof.",
      },
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "Interior finishing once the roof work is certified complete.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Exterior soffit and fascia finished to survive the next roof cycle.",
      },
    ],
  },

  concrete: {
    question: "The foundation is poured. Who does what's above it?",
    recommendations: [
      {
        name: "Cochrane Framing & Structural",
        url: "https://cochrane-master-builders.com",
        valueProp: "The first structure on the new slab — engineered, squared, and plumb.",
      },
      {
        name: "Cochrane Insulation Masters",
        url: "https://cochrane-master-builders.com",
        valueProp: "Below-grade and slab insulation before the concrete sets.",
      },
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "The interior finish that follows the framing — Level-5, generational.",
      },
    ],
  },

  // Default — used when serviceSlug is unknown or unset
  default: {
    question: "Need another trade done right?",
    recommendations: [
      {
        name: "Cochrane Master Builders",
        url: "https://cochrane-master-builders.com",
        valueProp: "One network. One accountability standard. 150 trades, one family name.",
      },
      {
        name: "Cochrane Drywall Specialists",
        url: "https://cochrane-master-builders.com",
        valueProp: "Level-5 finish on every wall, from rough-in to ready-to-paint.",
      },
      {
        name: "Cochrane Painting Co.",
        url: "https://cochrane-master-builders.com",
        valueProp: "Interior and exterior — brand-colour precision, one booking.",
      },
    ],
  },
};

/**
 * Returns the cross-sell entry for a given serviceSlug.
 * Falls back to "default" if the slug is unknown.
 */
export function getCrossSell(serviceSlug?: string | null): CrossSellEntry {
  if (serviceSlug && serviceSlug in CROSS_SELL_MAP) {
    return CROSS_SELL_MAP[serviceSlug];
  }
  return CROSS_SELL_MAP.default;
}
