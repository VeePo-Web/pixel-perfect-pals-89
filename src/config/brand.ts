/**
 * COCHRANE DRYWALL & INSULATION — Brand Style Sheet (canonical)
 *
 * SOURCE OF TRUTH — verbatim from `1.0_cochrane_drywall_insulation_--_style_sheet.docx`.
 * DO NOT modify these primitives without updating the source document first.
 *
 * Headline color and button green are exact hex values from the supplied style sheet.
 * Surrounding tokens (bone, paper, graphite, mist, seam, clay, sage) are the
 * supporting palette derived to satisfy the design-preference brief
 * ("bright backgrounds or soft warm neutrals", "restrained accent color",
 * "soft sage or pale mineral tone for success/detail highlights").
 */

export const BRAND = {
  name: "Cochrane Drywall & Insulation",
  shortName: "Cochrane Drywall",
  location: "Cochrane, Alberta",

  // ── Typography (verbatim from style sheet) ──────────────────────────
  fonts: {
    headline: "Cormorant Garamond", // H1 / H2 display moments only — used with restraint
    ui: "Inter", // nav, buttons, body, pricing, everything operational
  },

  // ── Color tokens (style sheet primitives + derived supporting palette) ──
  colors: {
    // Verbatim from style sheet
    headline: "#433D39", // headline color (warm charcoal)
    buttonGreen: "#3E5352", // primary CTA / button green

    // Supporting palette (light-dominant, "fresh paint" warm neutrals)
    bone: "#F4F1EC", // primary background — warm soft neutral
    paper: "#FFFFFF", // surface highlights / cards
    charcoal: "#433D39", // alias for headline color
    graphite: "#5B544F", // body text
    mist: "#8C857F", // secondary text / captions
    seam: "#E5E0D8", // hairline dividers — the "drywall seam" motif
    forest: "#3E5352", // alias for buttonGreen
    forestDeep: "#2F4140", // CTA hover
    clay: "#B07A5B", // restrained warm accent — handcrafted moments only
    sage: "#A8B3A0", // pale mineral tone for success / detail highlights
  },
} as const;

export type BrandColors = typeof BRAND.colors;
