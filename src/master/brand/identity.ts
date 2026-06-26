/**
 * COCHRANE MASTER BUILDERS — PARENT BRAND IDENTITY
 *
 * This file holds everything that is true of the *parent* brand and
 * therefore true of *every* trade site. Per-trade overrides live in
 * `src/config/trade.config.ts`.
 *
 * STATUS: Scaffold. Will be populated from your uploaded brand docs in Phase 2.
 */

export const MASTER = {
  brandName: "Cochrane Master Builders",
  shortName: "CMB",

  // The master inbox. Every remixed site's booking form sends here by default.
  // Override per-trade in trade.config.ts only if a specific trade needs its own.
  email: "hello@cochranemasterbuilders.ca", // TODO: confirm in Phase 2

  // Master phone — same logic as email
  phone: "", // TODO: fill from brand docs

  location: {
    city: "Cochrane",
    region: "Alberta",
    country: "Canada",
    coordinates: { lat: 51.1894, lng: -114.4669 },
  },

  // Mission — what the parent brand stands for across every trade
  mission: "", // TODO: from brand docs

  // Voice — applies to every trade site. Per-trade adjustments stay subtle.
  voice: {
    traits: [] as string[], // TODO
    wordsToAvoid: [] as string[], // TODO
    replacements: {} as Record<string, string>, // TODO
  },

  // Do / Don't — the running design and copy filter
  do: [] as string[], // TODO
  dont: [] as string[], // TODO
} as const;

export type Master = typeof MASTER;
