/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ELEVATION TOKENS — radii, borders, shadows
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Drywall = matte. We use shadow with extreme restraint.
 * Borders carry most of our hierarchy work.
 *
 * USAGE:
 *   import { RADIUS, BORDER_WIDTH, ELEVATION } from "@/lib/tokens/elevation";
 * ═══════════════════════════════════════════════════════════════════════════
 */

export const RADIUS = {
  /** Sharp — buttons sometimes, badges */
  none: "rounded-none",
  /** 4px — small UI */
  sm: "rounded-[0.25rem]",
  /** 6px — buttons (default) */
  md: "rounded-md",
  /** 8px — cards */
  lg: "rounded-lg",
  /** 12px — large cards, modals */
  xl: "rounded-xl",
  /** 9999px — pills, avatars */
  full: "rounded-full",
} as const;

export const BORDER_WIDTH = {
  hairline: "border",
  default: "border",
  emphasis: "border-2",
  heavy: "border-4",
} as const;

export const ELEVATION = {
  /** Flat — no shadow, hairline border only */
  flat: "border border-seam",
  /** Resting card — subtle shadow */
  resting: "border border-seam shadow-[0_1px_3px_rgba(67,61,57,0.04)]",
  /** Raised — interactive cards */
  raised: "border border-seam shadow-[0_4px_12px_rgba(67,61,57,0.06),0_2px_4px_rgba(67,61,57,0.04)] transition-shadow hover:shadow-[0_8px_24px_rgba(67,61,57,0.08),0_4px_8px_rgba(67,61,57,0.06)]",
  /** Floating — popovers, dropdowns */
  floating: "border border-seam shadow-[0_12px_32px_rgba(67,61,57,0.12),0_4px_8px_rgba(67,61,57,0.06)]",
  /** Modal */
  modal: "border border-seam shadow-[0_24px_64px_rgba(67,61,57,0.18),0_8px_16px_rgba(67,61,57,0.08)]",
} as const;

export const RING = {
  /** Forest focus ring */
  forest: "ring-2 ring-forest ring-offset-2 ring-offset-background",
  /** Subtle hairline ring */
  hairline: "ring-1 ring-seam",
} as const;
