/**
 * ═══════════════════════════════════════════════════════════════════════════
 * COLOR TOKENS — derived from src/config/trade.config.ts
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Semantic over literal. Names describe intent (`TEXT.headline`),
 * not appearance (`TEXT.charcoal`). Opacity is a tool — fewer base colors,
 * more on-light/on-dark variations.
 *
 * Inspired by Fantasy.co + Swedish minimalism.
 *
 * USAGE:
 *   import { BRAND, TEXT, BUTTON, getTextColor } from "@/lib/tokens/colors";
 *
 *   <h2 className={TEXT.headline}>...</h2>
 *   <button className={BUTTON.primary}>...</button>
 *   <p className={getTextColor("light", "muted")}>...</p>
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { TRADE, hslToHex, hslString, type PaletteKey } from "@/config/trade.config";

// ───────────────────────────────────────────────────────────────────────────
// BRAND PALETTE — every named color with Tailwind class + raw values
// ───────────────────────────────────────────────────────────────────────────

interface ColorToken {
  /** Tailwind background class */
  bg: string;
  /** Tailwind text class */
  text: string;
  /** Tailwind border class */
  border: string;
  /** HSL channel string ("178 14% 28%") — for CSS-var consumers */
  hsl: string;
  /** Hex code — for design-tool handoff */
  hex: string;
  /** Human description */
  description: string;
  /** When to use this color */
  useCase: string;
}

const buildToken = (
  key: PaletteKey,
  description: string,
  useCase: string,
): ColorToken => {
  const c = TRADE.palette.light[key];
  return {
    bg: `bg-${key}`,
    text: `text-${key}`,
    border: `border-${key}`,
    hsl: hslString(c),
    hex: hslToHex(c),
    description,
    useCase,
  };
};

export const BRAND: Record<PaletteKey, ColorToken> = {
  bone: buildToken("bone", "Warm fresh-paint background", "Page bg, large surfaces"),
  paper: buildToken("paper", "Pure white card surface", "Elevated cards, modals"),
  seam: buildToken("seam", "Hairline divider — the drywall seam motif", "Borders, separators"),
  charcoal: buildToken("charcoal", "Headline + primary ink", "H1–H3, primary text"),
  graphite: buildToken("graphite", "Body ink", "Paragraph text"),
  mist: buildToken("mist", "Muted ink", "Captions, metadata"),
  forest: buildToken("forest", "Brand green — primary CTA", "Buttons, links, accents"),
  forestDeep: buildToken("forestDeep", "Brand green — pressed state", "CTA hover/active"),
  clay: buildToken("clay", "Restrained warm accent", "Handcrafted moments only"),
  sage: buildToken("sage", "Pale mineral highlight", "Success, soft callouts"),
  success: buildToken("success", "Confirmation green", "Validation success"),
  warning: buildToken("warning", "Caution amber", "Validation warnings"),
  danger: buildToken("danger", "Error red", "Validation errors"),
};

// ───────────────────────────────────────────────────────────────────────────
// SEMANTIC GROUPS — what to actually reach for in components
// ───────────────────────────────────────────────────────────────────────────

export const TEXT = {
  /** H1 / H2 / H3 — the main type */
  headline: "text-foreground",
  /** Long-form body */
  body: "text-foreground/80",
  /** Soft body / secondary */
  muted: "text-muted-foreground",
  /** Captions, metadata */
  ghost: "text-muted-foreground/70",
  /** On forest CTA */
  onPrimary: "text-primary-foreground",
  /** On dark surfaces */
  onDark: "text-bone",
  /** Brand-coloured ink (use sparingly) */
  brand: "text-forest",
} as const;

export const SURFACE = {
  /** Page background */
  page: "bg-background",
  /** Elevated card */
  card: "bg-card",
  /** Subtle inset / muted block */
  muted: "bg-muted",
  /** Dark contrast section */
  dark: "bg-charcoal text-bone",
  /** Brand surface (rare) */
  brand: "bg-forest text-bone",
} as const;

export const BORDER = {
  /** Default hairline */
  hairline: "border border-seam",
  /** Slightly stronger */
  default: "border border-border",
  /** Inset focus ring */
  focus: "ring-2 ring-forest ring-offset-2 ring-offset-background",
  /** Editorial top accent */
  topAccent: "border-t border-forest/40",
} as const;

export const BUTTON = {
  /** Primary CTA — filled forest */
  primary:
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-forest text-bone font-ui font-medium tracking-tight transition-colors hover:bg-forest-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2",
  /** Secondary — outlined */
  secondary:
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-charcoal/30 text-charcoal font-ui font-medium tracking-tight transition-colors hover:bg-charcoal hover:text-bone",
  /** Tertiary — text only */
  tertiary:
    "inline-flex items-center gap-1 text-forest font-ui font-medium underline-offset-4 hover:underline transition-colors",
  /** Ghost — minimal */
  ghost:
    "inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-charcoal/70 font-ui transition-colors hover:bg-seam hover:text-charcoal",
} as const;

export const SHADOW = {
  /** None — most elements get no shadow (drywall = matte) */
  none: "shadow-none",
  /** Barely-there lift on cards */
  subtle: "shadow-[0_1px_3px_rgba(67,61,57,0.04),0_1px_2px_rgba(67,61,57,0.06)]",
  /** Floating cards */
  card: "shadow-[0_4px_12px_rgba(67,61,57,0.06),0_2px_4px_rgba(67,61,57,0.04)]",
  /** Sticky / dropdowns */
  popover: "shadow-[0_12px_32px_rgba(67,61,57,0.12),0_4px_8px_rgba(67,61,57,0.06)]",
  /** Modal / dialog */
  modal: "shadow-[0_24px_64px_rgba(67,61,57,0.18),0_8px_16px_rgba(67,61,57,0.08)]",
} as const;

export const STATUS = {
  success: "text-success bg-success/10 border-success/30",
  warning: "text-warning bg-warning/10 border-warning/30",
  danger: "text-danger bg-danger/10 border-danger/30",
  info: "text-forest bg-forest/10 border-forest/30",
} as const;

export const OVERLAY = {
  /** Dim under modal */
  scrim: "bg-charcoal/60 backdrop-blur-sm",
  /** Hero gradient overlay (top-down) */
  heroTop: "bg-gradient-to-b from-charcoal/40 via-transparent to-transparent",
  /** Hero gradient overlay (bottom-up) */
  heroBottom: "bg-gradient-to-t from-bone via-bone/80 to-transparent",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// HELPERS
// ───────────────────────────────────────────────────────────────────────────

type TextWeight = "headline" | "body" | "muted" | "ghost";

/** Get a text-color class scoped to background brightness. */
export function getTextColor(
  background: "light" | "dark",
  weight: TextWeight = "body",
): string {
  if (background === "light") {
    return {
      headline: "text-charcoal",
      body: "text-graphite",
      muted: "text-mist",
      ghost: "text-mist/70",
    }[weight];
  }
  return {
    headline: "text-bone",
    body: "text-bone/85",
    muted: "text-bone/65",
    ghost: "text-bone/45",
  }[weight];
}
