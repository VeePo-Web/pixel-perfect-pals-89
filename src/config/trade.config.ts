/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TRADE CONFIG — THE ONLY FILE YOU EDIT TO REMIX THIS TEMPLATE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This file is the single source of truth for everything trade-specific:
 * brand identity, palette, typography, motion, voice, and services.
 *
 * EVERY other token, CSS variable, Tailwind utility, and style-guide chip
 * derives from this file. Changing one HSL value here re-themes the entire
 * site. Changing the trade name updates every page header.
 *
 * REMIX WORKFLOW (≈10 minutes):
 *   1. Edit `identity` block (name, trade, location)
 *   2. Edit `palette` HSL values (use coolors.co or Adobe Color)
 *   3. Optionally swap `typography.headline.family` (update index.html link too)
 *   4. Replace `services` array
 *   5. Update `voice` arrays from the new trade's brand docs
 *   6. Visit /style-guide → confirm Contrast Matrix is all-green
 *   7. Deploy
 *
 * DO NOT add trade-specific values anywhere else in the codebase.
 * If something can't be derived from here, it shouldn't exist.
 *
 * SEE ALSO:
 *   - REMIX_PLAYBOOK.md          (step-by-step guide)
 *   - src/lib/tokens/             (derived design tokens)
 *   - src/pages/StyleGuide.tsx    (live preview)
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { BUSINESS } from "./business";
import { BRAND_IDENTITY } from "./brand-identity";

// ───────────────────────────────────────────────────────────────────────────
// 1. PALETTE — HSL primitives only
// ───────────────────────────────────────────────────────────────────────────

/**
 * HSL is mandatory. Every shadcn/ui token uses HSL channels.
 * If you only have a hex code, convert here: https://hslpicker.com/
 */
export interface HSL {
  /** Hue 0–360 */
  h: number;
  /** Saturation 0–100 */
  s: number;
  /** Lightness 0–100 */
  l: number;
}

// ───────────────────────────────────────────────────────────────────────────
// 2. TRADE IDENTITY
// ───────────────────────────────────────────────────────────────────────────

export const TRADE = {
  // ── Identity ───────────────────────────────────────────────────────────
  identity: {
    name: BUSINESS.narrative.paragraph1.includes("Cochrane Drywall")
      ? "Cochrane Drywall & Insulation"
      : "Cochrane Drywall & Insulation",
    shortName: "Cochrane Drywall",
    trade: "drywall-insulation" as const,
    tagline: BRAND_IDENTITY.taglineCandidates[0], // "Finally Get That Wall Handled"
    location: {
      city: "Cochrane",
      region: "Alberta",
      country: "Canada",
      coordinates: { lat: 51.1894, lng: -114.4669 },
    },
    founded: 2024,
    /**
     * Master CMB logo colorway for this remix. One of: "black" | "navy" | "white".
     * Per-surface overrides via <MasterLogo colorway="..." /> still apply.
     * See src/master/brand/LOGO_USAGE.md for the recommendation table.
     */
    logoColorway: "black" as const,
  },

  // ── Contact ────────────────────────────────────────────────────────────
  contact: {
    phone: BUSINESS.contact.phone,
    email: BUSINESS.contact.email,
    instagram: BUSINESS.contact.instagram,
    facebook: BUSINESS.contact.facebook,
    hours: "Mon–Sat 7am–6pm",
  },

  // ── Palette ────────────────────────────────────────────────────────────
  // Drives every CSS variable, Tailwind color, and style-guide chip.
  // Light theme is the default (per design preferences brief).
  palette: {
    light: {
      // Surfaces
      bone: { h: 36, s: 22, l: 95 } as HSL, // page background ("warm fresh paint")
      paper: { h: 0, s: 0, l: 100 } as HSL, // cards / elevated surfaces
      seam: { h: 36, s: 14, l: 88 } as HSL, // borders / hairlines (the "drywall seam")
      // Ink
      charcoal: { h: 25, s: 8, l: 25 } as HSL, // primary text + headlines
      graphite: { h: 25, s: 6, l: 38 } as HSL, // body text
      mist: { h: 25, s: 6, l: 55 } as HSL, // muted / captions
      // Brand
      forest: { h: 178, s: 14, l: 28 } as HSL, // primary CTA (#3E5352 from style sheet)
      forestDeep: { h: 178, s: 16, l: 22 } as HSL, // CTA hover
      // Restrained accents
      clay: { h: 24, s: 38, l: 52 } as HSL, // warm handcrafted moments — use sparingly
      sage: { h: 95, s: 14, l: 64 } as HSL, // success / detail highlights
      // Functional
      success: { h: 142, s: 38, l: 38 } as HSL,
      warning: { h: 38, s: 78, l: 50 } as HSL,
      danger: { h: 0, s: 62, l: 48 } as HSL,
    },
    dark: {
      // Mirrored for completeness (default theme is light; dark is opt-in)
      bone: { h: 25, s: 8, l: 10 } as HSL,
      paper: { h: 25, s: 8, l: 14 } as HSL,
      seam: { h: 25, s: 8, l: 22 } as HSL,
      charcoal: { h: 36, s: 22, l: 95 } as HSL,
      graphite: { h: 36, s: 14, l: 78 } as HSL,
      mist: { h: 36, s: 8, l: 60 } as HSL,
      forest: { h: 178, s: 18, l: 50 } as HSL,
      forestDeep: { h: 178, s: 22, l: 60 } as HSL,
      clay: { h: 24, s: 42, l: 58 } as HSL,
      sage: { h: 95, s: 18, l: 56 } as HSL,
      success: { h: 142, s: 42, l: 50 } as HSL,
      warning: { h: 38, s: 80, l: 60 } as HSL,
      danger: { h: 0, s: 68, l: 60 } as HSL,
    },
  },

  // ── Typography ─────────────────────────────────────────────────────────
  // Loaded via <link> in index.html. Must match.
  typography: {
    headline: {
      family: "'Cormorant Garamond', Georgia, serif",
      cssVar: "--font-headline",
      weights: [400, 500, 600] as const,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap",
    },
    ui: {
      family: "'Inter', system-ui, sans-serif",
      cssVar: "--font-ui",
      weights: [400, 500, 600, 700] as const,
      googleFontsUrl: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    },
  },

  // ── Motion ─────────────────────────────────────────────────────────────
  // Tunable physics for Lenis smooth scroll, scroll-scrub video, and reveals.
  motion: {
    lenis: {
      duration: 1.1,
      // expoOut curve — also used by Framer ScrollReveal
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    },
    scrub: {
      // Physics for the hero scroll-scrub video (drives video.currentTime)
      stiffness: 110,
      damping: 24,
      mass: 0.4,
      gateMs: 16, // skip seeks smaller than ~1 frame at 60fps
    },
    reveal: {
      // Defaults for ScrollReveal component
      duration: 0.6,
      stagger: 80, // ms between staggered children
      y: 12, // px translate distance
      easing: [0.16, 1, 0.3, 1] as const, // expoOut
    },
  },

  // ── Services ───────────────────────────────────────────────────────────
  // Re-export from BUSINESS so there is one canonical list.
  services: BUSINESS.services,
  packages: BUSINESS.packages,

  // ── Voice ──────────────────────────────────────────────────────────────
  // Re-export from BRAND_IDENTITY so copy review touches one place.
  voice: {
    traits: BRAND_IDENTITY.voice.traits,
    wordsToAvoid: BRAND_IDENTITY.wordsToAvoid,
    replacements: BRAND_IDENTITY.replacements,
  },

  // ── SEO ────────────────────────────────────────────────────────────────
  seo: {
    title: "Cochrane Drywall & Insulation — Practical Interior Finishing",
    description:
      "Clean drywall repairs, smooth installs, interior painting, and basement & garage insulation in Cochrane, Alberta. Small jobs welcome.",
    ogImage: "/og-image.jpg",
    twitterHandle: null as string | null,
  },
} as const;

// ───────────────────────────────────────────────────────────────────────────
// 3. TYPE EXPORTS — for token files to consume
// ───────────────────────────────────────────────────────────────────────────

export type Trade = typeof TRADE;
export type PaletteScheme = typeof TRADE.palette.light;
export type PaletteKey = keyof PaletteScheme;
export type ColorMode = keyof typeof TRADE.palette;

// ───────────────────────────────────────────────────────────────────────────
// 4. UTILITIES — used by tokens and style guide
// ───────────────────────────────────────────────────────────────────────────

/** Convert HSL object to CSS-compatible string ("178 14% 28%") */
export function hslString({ h, s, l }: HSL): string {
  return `${h} ${s}% ${l}%`;
}

/** Convert HSL object to hex (used by style guide for display) */
export function hslToHex({ h, s, l }: HSL): string {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) => {
    const v = lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    return Math.round(255 * v)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/** Build a `hsl(...)` CSS color */
export function hsl(c: HSL, alpha = 1): string {
  return alpha === 1 ? `hsl(${c.h} ${c.s}% ${c.l}%)` : `hsl(${c.h} ${c.s}% ${c.l}% / ${alpha})`;
}
