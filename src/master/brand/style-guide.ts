/**
 * MASTER STYLE GUIDE — Parent-brand visual system
 *
 * Every remixed trade site inherits these defaults. The per-trade
 * `trade.config.ts` is allowed to override the *accent* hue and the
 * service-specific copy — but never the structural tokens here.
 *
 * STATUS: Scaffold. Populated in Phase 2 from your uploaded master style guide.
 */

import type { HSL } from "@/config/trade.config";

export const MASTER_STYLE = {
  // Base palette that every trade uses (the "house" colors)
  // Per-trade accent overrides live in trade.config.ts -> palette.light.accent
  basePalette: {
    bone: { h: 36, s: 22, l: 95 } as HSL, // page background
    paper: { h: 0, s: 0, l: 100 } as HSL, // elevated surfaces
    seam: { h: 36, s: 14, l: 88 } as HSL, // hairlines
    charcoal: { h: 25, s: 8, l: 25 } as HSL, // headlines
    graphite: { h: 25, s: 6, l: 38 } as HSL, // body
    mist: { h: 25, s: 6, l: 55 } as HSL, // captions
  },

  typography: {
    headline: {
      family: "'Cormorant Garamond', Georgia, serif",
      weights: [400, 500, 600] as const,
    },
    ui: {
      family: "'Inter', system-ui, sans-serif",
      weights: [400, 500, 600, 700] as const,
    },
  },

  spacing: {
    sectionY: "py-24 md:py-32",
    container: "container mx-auto px-6",
  },

  motion: {
    revealDuration: 0.6,
    revealStaggerMs: 80,
    revealY: 12,
  },

  // Hard rules — never violated by any remix
  rules: [
    "Body background is always bone (warm fresh paint), never pure white",
    "One accent color per trade — never two competing accents",
    "No bright red, neon orange, or saturated yellow",
    "No glossy black sections; use charcoal",
    "Headlines in Cormorant Garamond, body in Inter",
    "Forest green CTA is the default; trade may override but must keep one CTA color",
  ] as const,
} as const;

export type MasterStyle = typeof MASTER_STYLE;
