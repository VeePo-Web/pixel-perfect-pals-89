/**
 * ═══════════════════════════════════════════════════════════════════════════
 * TYPOGRAPHY TOKENS — derived from src/config/trade.config.ts
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Restraint over variety: fewer sizes, stronger hierarchy.
 * Type scale: Major Third (1.25 ratio) — calm, editorial.
 *
 *   12 → 14 → 16 → 18 → 20 → 24 → 30 → 36 → 48 → 60 → 72 → 88
 *
 * USAGE:
 *   import { HEADLINE, BODY, EYEBROW } from "@/lib/tokens/typography";
 *   <h1 className={HEADLINE.hero}>Title</h1>
 *   <p className={BODY.lg}>Lead paragraph</p>
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// FONT FAMILIES — map to Tailwind classes (set in tailwind.config.ts)
// ───────────────────────────────────────────────────────────────────────────

export const FONT_FAMILY = {
  /** Cormorant Garamond — H1/H2 display moments only (used with restraint) */
  headline: "font-headline",
  /** Inter — everything operational */
  ui: "font-ui",
} as const;

export const FONT_WEIGHT = {
  /** 400 — body, regular display */
  regular: "font-normal",
  /** 500 — emphasis, UI buttons */
  medium: "font-medium",
  /** 600 — display headlines, strong CTAs */
  semibold: "font-semibold",
  /** 700 — rare, only for badges/labels */
  bold: "font-bold",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// HEADLINE SCALE
// ───────────────────────────────────────────────────────────────────────────

export const HEADLINE = {
  /** Hero — the largest type on the site (Cormorant) */
  hero: "font-headline font-normal text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] tracking-[-0.02em] text-foreground text-balance",
  /** Page H1 */
  display: "font-headline font-normal text-[clamp(2.25rem,5vw,4rem)] leading-[1.1] tracking-[-0.015em] text-foreground text-balance",
  /** Section H2 */
  section: "font-headline font-normal text-[clamp(1.875rem,3.5vw,3rem)] leading-[1.15] tracking-[-0.01em] text-foreground text-balance",
  /** Subsection H3 (Inter — operational) */
  sub: "font-ui font-semibold text-[clamp(1.25rem,2vw,1.5rem)] leading-[1.3] tracking-tight text-foreground",
  /** Card title H4 */
  card: "font-ui font-semibold text-[1.125rem] leading-[1.4] tracking-tight text-foreground",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// EYEBROW — uppercase label above headlines
// ───────────────────────────────────────────────────────────────────────────

export const EYEBROW = {
  /** Standard eyebrow — uppercase Inter */
  standard: "font-ui font-medium text-[0.75rem] uppercase tracking-[0.15em] text-forest",
  /** Subtle muted variant */
  muted: "font-ui font-medium text-[0.75rem] uppercase tracking-[0.15em] text-mist",
  /** Inverse on dark surfaces */
  onDark: "font-ui font-medium text-[0.75rem] uppercase tracking-[0.15em] text-bone/70",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// BODY TEXT
// ───────────────────────────────────────────────────────────────────────────

export const BODY = {
  /** Lead paragraph — slightly larger */
  lg: "font-ui text-[1.125rem] leading-[1.7] text-graphite",
  /** Default body */
  md: "font-ui text-[1rem] leading-[1.7] text-graphite",
  /** Compact body — captions, metadata */
  sm: "font-ui text-[0.875rem] leading-[1.6] text-mist",
  /** Caption */
  caption: "font-ui text-[0.75rem] leading-[1.5] text-mist tracking-[0.02em]",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// SPECIALTY
// ───────────────────────────────────────────────────────────────────────────

export const QUOTE = {
  /** Pull quote — large Cormorant italic */
  pull: "font-headline italic text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.4] tracking-[-0.005em] text-charcoal text-balance",
  /** Inline quote */
  inline: "font-headline italic text-[1.125rem] leading-[1.6] text-graphite",
} as const;

export const UI = {
  /** Button label */
  button: "font-ui font-medium text-[0.9375rem] tracking-tight",
  /** Small label */
  label: "font-ui font-medium text-[0.8125rem] tracking-tight",
  /** Nav link */
  nav: "font-ui font-medium text-[0.9375rem] tracking-tight",
  /** Helper text under inputs */
  helper: "font-ui text-[0.8125rem] leading-[1.5] text-mist",
} as const;

export const STAT = {
  /** Big number — pricing, statistics */
  display: "font-headline font-semibold text-[clamp(2.5rem,4vw,3.5rem)] leading-none tracking-[-0.02em] text-foreground tabular-nums",
  /** Inline price */
  price: "font-ui font-semibold text-[1.125rem] leading-none tabular-nums text-charcoal",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// AXIS TOKENS — use to compose custom typography
// ───────────────────────────────────────────────────────────────────────────

export const LINE_HEIGHT = {
  none: "leading-none", // 1
  tight: "leading-[1.15]",
  snug: "leading-[1.3]",
  normal: "leading-[1.5]",
  relaxed: "leading-[1.7]",
  loose: "leading-[1.85]",
} as const;

export const LETTER_SPACING = {
  tighter: "tracking-[-0.02em]",
  tight: "tracking-[-0.01em]",
  normal: "tracking-normal",
  wide: "tracking-[0.05em]",
  eyebrow: "tracking-[0.15em]",
} as const;

/** Optimal reading widths (CSS measure rule) */
export const TEXT_WIDTH = {
  /** ~45ch — narrow column */
  narrow: "max-w-[45ch]",
  /** ~62ch — comfortable reading */
  comfortable: "max-w-[62ch]",
  /** ~75ch — wide */
  wide: "max-w-[75ch]",
} as const;
