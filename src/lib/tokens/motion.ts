/**
 * ═══════════════════════════════════════════════════════════════════════════
 * MOTION TOKENS — Lenis smooth scroll, scroll-scrub video, reveal timing
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The single source for ALL motion physics on the site.
 * Tunable via the /style-guide Motion Playground.
 *
 * USAGE:
 *   import { LENIS_CONFIG, SCRUB_CONFIG } from "@/lib/tokens/motion";
 *   const lenis = new Lenis(LENIS_CONFIG);
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { TRADE } from "@/config/trade.config";

// ───────────────────────────────────────────────────────────────────────────
// LENIS — global smooth scroll
// ───────────────────────────────────────────────────────────────────────────

export const LENIS_CONFIG = {
  duration: TRADE.motion.lenis.duration,
  easing: TRADE.motion.lenis.easing,
  wheelMultiplier: TRADE.motion.lenis.wheelMultiplier,
  touchMultiplier: TRADE.motion.lenis.touchMultiplier,
  /** Disable on touch — let native momentum scroll handle it */
  smoothTouch: false,
} as const;

// ───────────────────────────────────────────────────────────────────────────
// SCROLL-SCRUB — drives video.currentTime from scroll progress
// ───────────────────────────────────────────────────────────────────────────

/**
 * Spring physics applied to scrollYProgress before it drives the video.
 * Higher stiffness = snappier; lower damping = bouncier.
 *
 * Defaults are tuned for a 4–6s hero video at 30fps.
 */
export const SCRUB_SPRING = {
  stiffness: TRADE.motion.scrub.stiffness,
  damping: TRADE.motion.scrub.damping,
  mass: TRADE.motion.scrub.mass,
} as const;

/**
 * Gate (in seconds of video time): skip seeks smaller than this to avoid
 * hammering the decoder with sub-frame seeks on every RAF tick.
 *
 * gateMs / 1000 — 16ms = ~1 frame at 60fps.
 */
export const SCRUB_GATE_S = TRADE.motion.scrub.gateMs / 1000;

/**
 * Lerp factor: how much of the (target - current) delta we apply per frame.
 * 0.30 = "fast settle, smooth tail". Lower = more glide.
 */
export const SCRUB_LERP = 0.3;

// ───────────────────────────────────────────────────────────────────────────
// REVEAL — defaults for ScrollReveal component
// ───────────────────────────────────────────────────────────────────────────

export const REVEAL_CONFIG = {
  duration: TRADE.motion.reveal.duration,
  staggerMs: TRADE.motion.reveal.stagger,
  y: TRADE.motion.reveal.y,
  easing: TRADE.motion.reveal.easing,
  /** When to trigger — IntersectionObserver root margin */
  rootMargin: "-80px",
  /** Trigger only once per element */
  once: true,
} as const;

// ───────────────────────────────────────────────────────────────────────────
// PARALLAX — for image dividers
// ───────────────────────────────────────────────────────────────────────────

export const PARALLAX = {
  /** Image scale (must be >100% to allow translation without revealing edges) */
  imageScale: 1.3,
  /** Top offset to centre the oversized image */
  topOffset: "-15%",
  /** Translation range as scroll progresses through the divider */
  translateRange: ["0%", "-12%"] as const,
} as const;

// ───────────────────────────────────────────────────────────────────────────
// REDUCED MOTION POLICY
// ───────────────────────────────────────────────────────────────────────────

/**
 * What we do when prefers-reduced-motion is set:
 *   - Lenis: disabled (native scroll)
 *   - Scrub videos: render static poster frame (no scroll-driven playback)
 *   - Reveals: render in final state immediately (no transitions)
 *   - Parallax: locked at offset 0
 *   - Hover micro-interactions: still allowed (these aren't motion-sickness triggers)
 */
export const REDUCED_MOTION_POLICY = {
  disableLenis: true,
  disableScrub: true,
  disableReveals: true,
  disableParallax: true,
  allowHover: true,
} as const;
