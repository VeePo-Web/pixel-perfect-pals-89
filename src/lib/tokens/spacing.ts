/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SPACING TOKENS — 8pt grid system
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * All values are multiples of 4px (0.25rem) on an 8pt rhythm.
 * Light surfaces breathe more (more padding); dark surfaces compress.
 * Strips are thin and purposeful.
 *
 * USAGE:
 *   import { SECTION_PADDING, MAX_WIDTH } from "@/lib/tokens/spacing";
 *   <section className={`${SECTION_PADDING.standard} ${MAX_WIDTH.content}`}>
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// SECTION PADDING — vertical breathing room
// ───────────────────────────────────────────────────────────────────────────

export const SECTION_PADDING = {
  /** Default — bright sections, room to breathe */
  standard: "py-20 md:py-28 lg:py-36",
  /** Compressed — dark or strip sections */
  compact: "py-14 md:py-20 lg:py-24",
  /** Hero — pinned scroll-scrub or full-bleed */
  hero: "py-0",
  /** Terminal — final CTA, deserves gravitas */
  terminal: "py-24 md:py-32 lg:py-40",
  /** Strip — credential bar, trust signals */
  strip: "py-6 md:py-8",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// CONTAINER PADDING — horizontal gutter
// ───────────────────────────────────────────────────────────────────────────

export const CONTAINER_PADDING = {
  /** Standard page gutter */
  standard: "px-6 md:px-8 lg:px-12",
  /** Wide hero or full-bleed image */
  wide: "px-4 md:px-6 lg:px-8",
  /** Tight inner column */
  tight: "px-4 md:px-6",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// CONTENT GAP — between stacked elements
// ───────────────────────────────────────────────────────────────────────────

export const CONTENT_GAP = {
  /** Tight — within a card or list item */
  tight: "space-y-2",
  /** Default — between paragraphs */
  default: "space-y-4",
  /** Loose — between sub-sections */
  loose: "space-y-8",
  /** Section — between major blocks */
  section: "space-y-16 md:space-y-24",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// MAX WIDTH — content column caps
// ───────────────────────────────────────────────────────────────────────────

export const MAX_WIDTH = {
  /** Single-column prose */
  prose: "max-w-prose mx-auto",
  /** Comfortable content (~720px) */
  content: "max-w-3xl mx-auto",
  /** Wider content (~1024px) */
  wide: "max-w-5xl mx-auto",
  /** Full container (~1280px) */
  container: "max-w-7xl mx-auto",
  /** Edge-to-edge */
  full: "max-w-none",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// MIN HEIGHT — section heights
// ───────────────────────────────────────────────────────────────────────────

export const MIN_HEIGHT = {
  /** Hero full viewport */
  screen: "min-h-screen",
  /** Hero mobile viewport (avoids URL bar bug) */
  svh: "min-h-[100svh]",
  /** Half-screen feature */
  half: "min-h-[50vh]",
  /** Banner */
  banner: "min-h-[40vh]",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// DIVIDER PADDING — between major narrative beats
// ───────────────────────────────────────────────────────────────────────────

export const DIVIDER_PADDING = {
  /** Hairline divider */
  hairline: "py-12 md:py-16",
  /** Image strip divider */
  image: "h-[40vh] md:h-[55vh]",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// RAW SCALE — for ad-hoc spacing references
// ───────────────────────────────────────────────────────────────────────────

export const SCALE = {
  "0": "0",
  "1": "0.25rem", // 4px
  "2": "0.5rem", // 8px
  "3": "0.75rem", // 12px
  "4": "1rem", // 16px
  "5": "1.25rem", // 20px
  "6": "1.5rem", // 24px
  "8": "2rem", // 32px
  "10": "2.5rem", // 40px
  "12": "3rem", // 48px
  "16": "4rem", // 64px
  "20": "5rem", // 80px
  "24": "6rem", // 96px
  "32": "8rem", // 128px
  "40": "10rem", // 160px
} as const;
