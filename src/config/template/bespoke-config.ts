/**
 * BESPOKE CONFIG — Cochrane Master Builders Heirloom Identity System
 *
 * "The aesthetic floor is Apple-keynote restraint. The aesthetic ceiling is
 *  heirloom craftsmanship — leather-bound, blueprint-ink, hand-stamped feel
 *  rendered in pure CSS/SVG/Framer Motion." — Brand Brief
 *
 * This file is the single source of truth for every bespoke visual moment
 * across the 150-site network. Change one value here; it propagates everywhere.
 *
 * Per-trade remixes override only MONOGRAM_LETTERS and FOUNDATION_YEAR.
 * The slogan, cornerstone ring text, and marquee content are parent-brand
 * constants — they never change per trade.
 */

import { MASTER_REMIX } from "./remix-variables";

export interface BespokeConfig {
  /** The generational promise — rendered in ≥7 surfaces. Sacred. Never animated with bounce. */
  slogan: string;
  monogram: {
    /** Three letters of the brand monogram. CMB for parent; e.g. CTM for Tile Masters. */
    letters: [string, string, string];
    /** The personification props — always parent-brand; they are the "by CMB" signature. */
    personifications: {
      /** Letter 1 (C): The Foreman — wears a hardhat */
      first: "hardhat";
      /** Letter 2 (M): The Craftsman — carpenter's pencil behind the right peak */
      second: "pencil";
      /** Letter 3 (B): The Local — cradles a Tim Hortons-style coffee cup */
      third: "coffee";
    };
  };
  cornerstone: {
    /** Text that rings the foundation seal. Tracked caps, outer ring. */
    ringText: string;
    /** Rotation period for the stamp in seconds. 60s = nearly still. */
    rotateDurationS: number;
    /** Default render size in px. */
    sizePx: number;
  };
  /** Year the parent company was established. Displayed in FoundationCounter. */
  foundationYear: number;
  /** Enable the generational marquee above the footer sign-off? */
  marqueeEnabled: boolean;
  /** Enable the Master's Mark SVG signature on long-form pages? */
  masterMarkEnabled: boolean;
}

export const BESPOKE_CONFIG: BespokeConfig = {
  slogan: MASTER_REMIX.BRAND_SLOGAN,

  monogram: {
    letters: MASTER_REMIX.MONOGRAM_LETTERS,
    personifications: {
      first: "hardhat",
      second: "pencil",
      third: "coffee",
    },
  },

  cornerstone: {
    // Outer ring engraving — "EST · COCHRANE · MASTER · BUILDERS · ALBERTA"
    ringText: "EST · COCHRANE · MASTER · BUILDERS · ALBERTA",
    rotateDurationS: 60,
    sizePx: 80,
  },

  foundationYear: MASTER_REMIX.FOUNDATION_YEAR,
  marqueeEnabled: true,
  masterMarkEnabled: true,
};
