/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ANIMATION TOKENS
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Animation is invisible when done right.
 * Restraint over spectacle. Performance over polish.
 * All values respect `prefers-reduced-motion`.
 *
 * USAGE:
 *   import { EASING, DURATION, HOVER, FOCUS } from "@/lib/tokens/animations";
 *   <button className={`transition-colors ${DURATION.fast} ${EASING.expoOut.css}`}>
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// EASING CURVES
// ───────────────────────────────────────────────────────────────────────────

export interface EasingToken {
  /** CSS cubic-bezier value */
  value: string;
  /** Tailwind arbitrary class */
  css: string;
  /** Framer Motion array */
  framer: readonly [number, number, number, number];
  /** Description */
  description: string;
}

export const EASING: Record<string, EasingToken> = {
  expoOut: {
    value: "cubic-bezier(0.16, 1, 0.3, 1)",
    css: "ease-[cubic-bezier(0.16,1,0.3,1)]",
    framer: [0.16, 1, 0.3, 1] as const,
    description: "Premium fast-out, slow-in. Default for reveals.",
  },
  smoothInOut: {
    value: "cubic-bezier(0.4, 0, 0.2, 1)",
    css: "ease-[cubic-bezier(0.4,0,0.2,1)]",
    framer: [0.4, 0, 0.2, 1] as const,
    description: "Symmetric smooth. Hover states, color transitions.",
  },
  easeOut: {
    value: "cubic-bezier(0, 0, 0.2, 1)",
    css: "ease-out",
    framer: [0, 0, 0.2, 1] as const,
    description: "Gentle decelerate. Text fades, subtle UI.",
  },
  overshoot: {
    value: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    css: "ease-[cubic-bezier(0.34,1.56,0.64,1)]",
    framer: [0.34, 1.56, 0.64, 1] as const,
    description: "Slight bounce. Use sparingly — badges, success ticks.",
  },
  sharp: {
    value: "cubic-bezier(0.4, 0, 0.6, 1)",
    css: "ease-[cubic-bezier(0.4,0,0.6,1)]",
    framer: [0.4, 0, 0.6, 1] as const,
    description: "Snappy. UI feedback, instant state changes.",
  },
} as const;

// ───────────────────────────────────────────────────────────────────────────
// DURATION
// ───────────────────────────────────────────────────────────────────────────

export const DURATION = {
  /** 75ms — instant UI feedback */
  instant: "duration-75",
  /** 150ms — hover/focus transitions */
  fast: "duration-150",
  /** 250ms — most UI transitions */
  base: "duration-200",
  /** 400ms — element reveals */
  reveal: "duration-[400ms]",
  /** 600ms — section reveals */
  section: "duration-[600ms]",
  /** 1000ms — atmospheric / ambient */
  glacial: "duration-1000",
} as const;

// Numeric versions for Framer Motion
export const DURATION_S = {
  instant: 0.075,
  fast: 0.15,
  base: 0.2,
  reveal: 0.4,
  section: 0.6,
  glacial: 1.0,
} as const;

// ───────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL PRESETS
// ───────────────────────────────────────────────────────────────────────────

export interface RevealPreset {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  description: string;
}

export const SCROLL_REVEAL: Record<string, RevealPreset> = {
  fadeUp: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    description: "Default. Most content.",
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    description: "Subtle. Atmospheric blocks.",
  },
  fadeDown: {
    initial: { opacity: 0, y: -12 },
    animate: { opacity: 1, y: 0 },
    description: "Reverse direction. Top-anchored elements.",
  },
  slideLeft: {
    initial: { opacity: 0, x: 24 },
    animate: { opacity: 1, x: 0 },
    description: "Side reveal. Right-aligned content.",
  },
  slideRight: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    description: "Side reveal. Left-aligned content.",
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    description: "Card emerges. Use sparingly.",
  },
  blurIn: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    description: "Hero text. Premium feel — expensive, use ≤1× per page.",
  },
} as const;

// ───────────────────────────────────────────────────────────────────────────
// DELAY SEQUENCE — staggered reveal ladder
// ───────────────────────────────────────────────────────────────────────────

/** Stagger ms between siblings in a reveal cascade */
export const DELAY_SEQUENCE = {
  none: 0,
  micro: 50,
  default: 80,
  editorial: 130,
  cinematic: 200,
} as const;

/** Helper: build delay for the Nth child */
export function getStaggerDelay(
  index: number,
  step: keyof typeof DELAY_SEQUENCE = "default",
): number {
  return (index * DELAY_SEQUENCE[step]) / 1000;
}

// ───────────────────────────────────────────────────────────────────────────
// HOVER + FOCUS PRESETS
// ───────────────────────────────────────────────────────────────────────────

export const HOVER = {
  /** Lift card on hover */
  lift: "transition-transform duration-200 ease-out hover:-translate-y-0.5",
  /** Brighten background */
  brighten: "transition-colors duration-200 hover:bg-muted",
  /** Underline link */
  link: "transition-colors duration-200 hover:text-forest",
  /** Button press */
  press: "transition-transform duration-100 active:scale-[0.98]",
} as const;

export const FOCUS = {
  /** Default focus ring — forest */
  ring: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  /** Inset ring (for cards / list items) */
  inset: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-forest",
  /** Subtle underline */
  underline: "focus-visible:outline-none focus-visible:underline focus-visible:underline-offset-4",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// REDUCED MOTION
// ───────────────────────────────────────────────────────────────────────────

export const REDUCED_MOTION = {
  /** Disable transforms — apply via `motion-reduce:` */
  noTransform: "motion-reduce:transform-none motion-reduce:transition-none",
  /** Disable opacity transitions too */
  noTransition: "motion-reduce:transition-none",
} as const;

// ───────────────────────────────────────────────────────────────────────────
// KEYFRAMES — names declared in tailwind.config.ts
// ───────────────────────────────────────────────────────────────────────────

export const KEYFRAME = {
  fadeIn: "animate-[fadeIn_0.4s_cubic-bezier(0.16,1,0.3,1)_forwards]",
  fadeUp: "animate-[fadeUp_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards]",
  shimmer: "animate-[shimmer_2s_linear_infinite]",
} as const;
