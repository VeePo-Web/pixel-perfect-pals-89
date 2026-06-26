/**
 * MASTER LOGO REGISTRY — Single source of truth for the Cochrane Master
 * Builders logo across every remixed trade site.
 *
 * Vite import means each PNG is bundled, hashed, and tree-shaken if unused.
 * NEVER hard-code a `/src/master/assets/logo/...` path elsewhere — always
 * import from this file (or use the <MasterLogo> component) so we have one
 * place to swap variants per-remix.
 *
 * COLORWAYS
 * ─────────
 * Three official colorways — pick one per trade in `trade.config.ts ->
 * identity.logoColorway`. Per-surface overrides allowed via the `colorway`
 * prop on <MasterLogo>.
 *
 *   - black : default. Master file. Reads as architectural / serious.
 *   - navy  : softer than black on warm cream backgrounds. Editorial.
 *   - white : reverse colorway. Required for any dark surface.
 *
 * Files that aren't yet uploaded fall back to the black colorway at runtime
 * via the local aliases below. Keeps the build green while the remaining
 * navy/white assets land. When binaries arrive, swap the aliases for real
 * imports — no other file needs to change.
 */

// ── Black colorway (master file — always present) ──────────────────────────
import cmbBlackHero from "../assets/logo/cmb-hero.png";
import cmbBlackLarge from "../assets/logo/cmb-large.png";
import cmbBlackMedium from "../assets/logo/cmb-medium.png";
import cmbBlackSmall from "../assets/logo/cmb-small.png";
import cmbBlackFooterLg from "../assets/logo/cmb-footer-large.png";
import cmbBlackFooterMd from "../assets/logo/cmb-footer-medium.png";
import cmbBlackFooterSm from "../assets/logo/cmb-footer-small.png";
import cmbBlackNavLg from "../assets/logo/cmb-nav-large.png";
import cmbBlackNavMd from "../assets/logo/cmb-nav-medium.png";
import cmbBlackNavSm from "../assets/logo/cmb-nav-small.png";

// ── Navy colorway (✅ embedded) ────────────────────────────────────────────
import cmbNavyHero from "../assets/logo/cmb-navy-hero.png";
import cmbNavyLarge from "../assets/logo/cmb-navy-large.png";
import cmbNavyMedium from "../assets/logo/cmb-navy-medium.png";
import cmbNavySmall from "../assets/logo/cmb-navy-small.png";
import cmbNavyFooterLg from "../assets/logo/cmb-navy-footer-large.png";
import cmbNavyFooterMd from "../assets/logo/cmb-navy-footer-medium.png";
import cmbNavyFooterSm from "../assets/logo/cmb-navy-footer-small.png";
import cmbNavyNavLg from "../assets/logo/cmb-navy-nav-large.png";
import cmbNavyNavMd from "../assets/logo/cmb-navy-nav-medium.png";
import cmbNavyNavSm from "../assets/logo/cmb-navy-nav-small.png";

// ── White colorway (✅ embedded) ───────────────────────────────────────────
import cmbWhiteHero from "../assets/logo/cmb-white-hero.png";
import cmbWhiteLarge from "../assets/logo/cmb-white-large.png";
import cmbWhiteMedium from "../assets/logo/cmb-white-medium.png";
import cmbWhiteSmall from "../assets/logo/cmb-white-small.png";
import cmbWhiteFooterLg from "../assets/logo/cmb-white-footer-large.png";
import cmbWhiteFooterMd from "../assets/logo/cmb-white-footer-medium.png";
import cmbWhiteFooterSm from "../assets/logo/cmb-white-footer-small.png";
import cmbWhiteNavLg from "../assets/logo/cmb-white-nav-large.png";
import cmbWhiteNavMd from "../assets/logo/cmb-white-nav-medium.png";
import cmbWhiteNavSm from "../assets/logo/cmb-white-nav-small.png";

// ── Emblem family (square, no wordmark) ────────────────────────────────────
// All three colorways ✅ embedded (6 sizes each). Matrix complete.
import cmbEmblemBlack100 from "../assets/logo/cmb-emblem-black-100.png";
import cmbEmblemBlack200 from "../assets/logo/cmb-emblem-black-200.png";
import cmbEmblemBlack400 from "../assets/logo/cmb-emblem-black-400.png";
import cmbEmblemBlack800 from "../assets/logo/cmb-emblem-black-800.png";
import cmbEmblemBlack1200 from "../assets/logo/cmb-emblem-black-1200.png";
import cmbEmblemBlack2400 from "../assets/logo/cmb-emblem-black-2400.png";

import cmbEmblemNavy100 from "../assets/logo/cmb-emblem-navy-100.png";
import cmbEmblemNavy200 from "../assets/logo/cmb-emblem-navy-200.png";
import cmbEmblemNavy400 from "../assets/logo/cmb-emblem-navy-400.png";
import cmbEmblemNavy800 from "../assets/logo/cmb-emblem-navy-800.png";
import cmbEmblemNavy1200 from "../assets/logo/cmb-emblem-navy-1200.png";
import cmbEmblemNavy2400 from "../assets/logo/cmb-emblem-navy-2400.png";

import cmbEmblemWhite100 from "../assets/logo/cmb-emblem-white-100.png";
import cmbEmblemWhite200 from "../assets/logo/cmb-emblem-white-200.png";
import cmbEmblemWhite400 from "../assets/logo/cmb-emblem-white-400.png";
import cmbEmblemWhite800 from "../assets/logo/cmb-emblem-white-800.png";
import cmbEmblemWhite1200 from "../assets/logo/cmb-emblem-white-1200.png";
import cmbEmblemWhite2400 from "../assets/logo/cmb-emblem-white-2400.png";

// ── Tiles family (exploded/deconstructed mark — 3 separated panels) ────────
// All three colorways ✅ embedded (6 sizes each). Matrix complete.
import cmbTilesBlack100 from "../assets/logo/cmb-tiles-black-100.png";
import cmbTilesBlack200 from "../assets/logo/cmb-tiles-black-200.png";
import cmbTilesBlack400 from "../assets/logo/cmb-tiles-black-400.png";
import cmbTilesBlack800 from "../assets/logo/cmb-tiles-black-800.png";
import cmbTilesBlack1200 from "../assets/logo/cmb-tiles-black-1200.png";
import cmbTilesBlack2400 from "../assets/logo/cmb-tiles-black-2400.png";

import cmbTilesNavy100 from "../assets/logo/cmb-tiles-navy-100.png";
import cmbTilesNavy200 from "../assets/logo/cmb-tiles-navy-200.png";
import cmbTilesNavy400 from "../assets/logo/cmb-tiles-navy-400.png";
import cmbTilesNavy800 from "../assets/logo/cmb-tiles-navy-800.png";
import cmbTilesNavy1200 from "../assets/logo/cmb-tiles-navy-1200.png";
import cmbTilesNavy2400 from "../assets/logo/cmb-tiles-navy-2400.png";

import cmbTilesWhite100 from "../assets/logo/cmb-tiles-white-100.png";
import cmbTilesWhite200 from "../assets/logo/cmb-tiles-white-200.png";
import cmbTilesWhite400 from "../assets/logo/cmb-tiles-white-400.png";
import cmbTilesWhite800 from "../assets/logo/cmb-tiles-white-800.png";
import cmbTilesWhite1200 from "../assets/logo/cmb-tiles-white-1200.png";
import cmbTilesWhite2400 from "../assets/logo/cmb-tiles-white-2400.png";

// ── Monogram family (handwritten "MB" signature mark) ──────────────────────
// All three colorways ✅ embedded. Different size ladder than emblem/tiles —
// capped at 1024 because the monogram is never a hero asset (it's a signature).
import cmbMbMonoBlack64 from "../assets/logo/cmb-mb-monogram-black-64.png";
import cmbMbMonoBlack128 from "../assets/logo/cmb-mb-monogram-black-128.png";
import cmbMbMonoBlack256 from "../assets/logo/cmb-mb-monogram-black-256.png";
import cmbMbMonoBlack512 from "../assets/logo/cmb-mb-monogram-black-512.png";
import cmbMbMonoBlack1024 from "../assets/logo/cmb-mb-monogram-black-1024.png";

import cmbMbMonoNavy64 from "../assets/logo/cmb-mb-monogram-navy-64.png";
import cmbMbMonoNavy128 from "../assets/logo/cmb-mb-monogram-navy-128.png";
import cmbMbMonoNavy256 from "../assets/logo/cmb-mb-monogram-navy-256.png";
import cmbMbMonoNavy512 from "../assets/logo/cmb-mb-monogram-navy-512.png";
import cmbMbMonoNavy1024 from "../assets/logo/cmb-mb-monogram-navy-1024.png";

import cmbMbMonoWhite64 from "../assets/logo/cmb-mb-monogram-white-64.png";
import cmbMbMonoWhite128 from "../assets/logo/cmb-mb-monogram-white-128.png";
import cmbMbMonoWhite256 from "../assets/logo/cmb-mb-monogram-white-256.png";
import cmbMbMonoWhite512 from "../assets/logo/cmb-mb-monogram-white-512.png";
import cmbMbMonoWhite1024 from "../assets/logo/cmb-mb-monogram-white-1024.png";

// ── Wordmark family (pure typography — "MASTER BUILDERS / COCHRANE") ───────
// All three colorways ✅ embedded. Lockup = wordmark + emblem stacked; the
// wordmark alone removes the emblem so it can sit in horizontal rails
// (≥3:1 aspect) without dominating. Editorial type voice — section
// eyebrows, doc headers, press kit, breadcrumb chips.
import cmbWordmarkBlack200 from "../assets/logo/cmb-wordmark-black-200.png";
import cmbWordmarkBlack400 from "../assets/logo/cmb-wordmark-black-400.png";
import cmbWordmarkBlack800 from "../assets/logo/cmb-wordmark-black-800.png";
import cmbWordmarkBlack1200 from "../assets/logo/cmb-wordmark-black-1200.png";
import cmbWordmarkBlack2400 from "../assets/logo/cmb-wordmark-black-2400.png";

import cmbWordmarkNavy200 from "../assets/logo/cmb-wordmark-navy-200.png";
import cmbWordmarkNavy400 from "../assets/logo/cmb-wordmark-navy-400.png";
import cmbWordmarkNavy800 from "../assets/logo/cmb-wordmark-navy-800.png";
import cmbWordmarkNavy1200 from "../assets/logo/cmb-wordmark-navy-1200.png";
import cmbWordmarkNavy2400 from "../assets/logo/cmb-wordmark-navy-2400.png";

import cmbWordmarkWhite200 from "../assets/logo/cmb-wordmark-white-200.png";
import cmbWordmarkWhite400 from "../assets/logo/cmb-wordmark-white-400.png";
import cmbWordmarkWhite800 from "../assets/logo/cmb-wordmark-white-800.png";
import cmbWordmarkWhite1200 from "../assets/logo/cmb-wordmark-white-1200.png";
import cmbWordmarkWhite2400 from "../assets/logo/cmb-wordmark-white-2400.png";

// ── Wordmark Ground variant (drafted: plumb-line + base rule) ─────────────
// Sibling to the plain wordmark — same typography, but framed by architect's
// drafting marks so it reads as spec-grade / authored. Use for standalone
// brand statements (chapter openers, project plates, deck covers) where the
// mark needs to feel anchored. Black ✅ + Navy ✅ embedded; white aliases
// to black until that package lands.
import cmbWordmarkGroundBlack200 from "../assets/logo/cmb-wordmark-ground-black-200.png";
import cmbWordmarkGroundBlack400 from "../assets/logo/cmb-wordmark-ground-black-400.png";
import cmbWordmarkGroundBlack800 from "../assets/logo/cmb-wordmark-ground-black-800.png";
import cmbWordmarkGroundBlack1200 from "../assets/logo/cmb-wordmark-ground-black-1200.png";
import cmbWordmarkGroundBlack2400 from "../assets/logo/cmb-wordmark-ground-black-2400.png";

import cmbWordmarkGroundNavy200 from "../assets/logo/cmb-wordmark-ground-navy-200.png";
import cmbWordmarkGroundNavy400 from "../assets/logo/cmb-wordmark-ground-navy-400.png";
import cmbWordmarkGroundNavy800 from "../assets/logo/cmb-wordmark-ground-navy-800.png";
import cmbWordmarkGroundNavy1200 from "../assets/logo/cmb-wordmark-ground-navy-1200.png";
import cmbWordmarkGroundNavy2400 from "../assets/logo/cmb-wordmark-ground-navy-2400.png";

import cmbWordmarkGroundWhite200 from "../assets/logo/cmb-wordmark-ground-white-200.png";
import cmbWordmarkGroundWhite400 from "../assets/logo/cmb-wordmark-ground-white-400.png";
import cmbWordmarkGroundWhite800 from "../assets/logo/cmb-wordmark-ground-white-800.png";
import cmbWordmarkGroundWhite1200 from "../assets/logo/cmb-wordmark-ground-white-1200.png";
import cmbWordmarkGroundWhite2400 from "../assets/logo/cmb-wordmark-ground-white-2400.png";

// ── Showcase boards (in-context renders for /brand + press kit) ────────────
// High-res demonstration plates showing the lockup + emblem on each surface
// tone. NOT for production UI — these are designed to be downloaded by
// journalists, partners, fabrication vendors, and shown on the brand-kit page.
import cmbBoardLockupOnWhite from "../assets/logo/boards/cmb-board-lockup-on-white.png";
import cmbBoardLockupOnBlack from "../assets/logo/boards/cmb-board-lockup-on-black.png";
import cmbBoardLockupOnNavy from "../assets/logo/boards/cmb-board-lockup-on-navy.png";
import cmbBoardEmblemOnBlack from "../assets/logo/boards/cmb-board-emblem-on-black.png";
import cmbBoardEmblemOnNavy from "../assets/logo/boards/cmb-board-emblem-on-navy.png";

export type LogoColorway = "black" | "navy" | "white";
export type EmblemSize = 100 | 200 | 400 | 800 | 1200 | 2400;
/** Tiles share the emblem size ladder — single source of truth. */
export type TileSize = EmblemSize;
/** Monogram has its own ladder — capped at 1024; never a hero asset. */
export type MonogramSize = 64 | 128 | 256 | 512 | 1024;
/** Wordmark has its own ladder — starts at 200 (sub-200 reads as visual noise). */
export type WordmarkSize = 200 | 400 | 800 | 1200 | 2400;

/**
 * Per-colorway file map. Same shape across colorways — the remixer can swap
 * colorways without touching component code.
 */
/** Square emblem-only files keyed by edge length in px. */
const EMBLEM_BLACK = {
  100: cmbEmblemBlack100,
  200: cmbEmblemBlack200,
  400: cmbEmblemBlack400,
  800: cmbEmblemBlack800,
  1200: cmbEmblemBlack1200,
  2400: cmbEmblemBlack2400,
} as const;

const EMBLEM_NAVY = {
  100: cmbEmblemNavy100,
  200: cmbEmblemNavy200,
  400: cmbEmblemNavy400,
  800: cmbEmblemNavy800,
  1200: cmbEmblemNavy1200,
  2400: cmbEmblemNavy2400,
} as const;

const EMBLEM_WHITE = {
  100: cmbEmblemWhite100,
  200: cmbEmblemWhite200,
  400: cmbEmblemWhite400,
  800: cmbEmblemWhite800,
  1200: cmbEmblemWhite1200,
  2400: cmbEmblemWhite2400,
} as const;

/** Square exploded/tiled-emblem files keyed by edge length in px. */
const TILES_BLACK = {
  100: cmbTilesBlack100,
  200: cmbTilesBlack200,
  400: cmbTilesBlack400,
  800: cmbTilesBlack800,
  1200: cmbTilesBlack1200,
  2400: cmbTilesBlack2400,
} as const;

// Navy tiles ✅ embedded as a real map.
const TILES_NAVY = {
  100: cmbTilesNavy100,
  200: cmbTilesNavy200,
  400: cmbTilesNavy400,
  800: cmbTilesNavy800,
  1200: cmbTilesNavy1200,
  2400: cmbTilesNavy2400,
} as const;

// White tiles ✅ embedded as a real map.
const TILES_WHITE = {
  100: cmbTilesWhite100,
  200: cmbTilesWhite200,
  400: cmbTilesWhite400,
  800: cmbTilesWhite800,
  1200: cmbTilesWhite1200,
  2400: cmbTilesWhite2400,
} as const;

/** Square handwritten "MB" monogram files keyed by edge length in px. */
const MONOGRAM_BLACK = {
  64: cmbMbMonoBlack64,
  128: cmbMbMonoBlack128,
  256: cmbMbMonoBlack256,
  512: cmbMbMonoBlack512,
  1024: cmbMbMonoBlack1024,
} as const;

const MONOGRAM_NAVY = {
  64: cmbMbMonoNavy64,
  128: cmbMbMonoNavy128,
  256: cmbMbMonoNavy256,
  512: cmbMbMonoNavy512,
  1024: cmbMbMonoNavy1024,
} as const;

// White monogram ✅ embedded as a real map.
const MONOGRAM_WHITE = {
  64: cmbMbMonoWhite64,
  128: cmbMbMonoWhite128,
  256: cmbMbMonoWhite256,
  512: cmbMbMonoWhite512,
  1024: cmbMbMonoWhite1024,
} as const;

/** Wordmark-only files (pure type, no emblem) keyed by edge length in px. */
const WORDMARK_BLACK = {
  200: cmbWordmarkBlack200,
  400: cmbWordmarkBlack400,
  800: cmbWordmarkBlack800,
  1200: cmbWordmarkBlack1200,
  2400: cmbWordmarkBlack2400,
} as const;

// Navy wordmark ✅ embedded as a real map.
const WORDMARK_NAVY = {
  200: cmbWordmarkNavy200,
  400: cmbWordmarkNavy400,
  800: cmbWordmarkNavy800,
  1200: cmbWordmarkNavy1200,
  2400: cmbWordmarkNavy2400,
} as const;

// White wordmark ✅ embedded as a real map.
const WORDMARK_WHITE = {
  200: cmbWordmarkWhite200,
  400: cmbWordmarkWhite400,
  800: cmbWordmarkWhite800,
  1200: cmbWordmarkWhite1200,
  2400: cmbWordmarkWhite2400,
} as const;

/** Wordmark Ground variant (drafted plumb + base rule) keyed by edge length. */
const WORDMARK_GROUND_BLACK = {
  200: cmbWordmarkGroundBlack200,
  400: cmbWordmarkGroundBlack400,
  800: cmbWordmarkGroundBlack800,
  1200: cmbWordmarkGroundBlack1200,
  2400: cmbWordmarkGroundBlack2400,
} as const;

const WORDMARK_GROUND_NAVY = {
  200: cmbWordmarkGroundNavy200,
  400: cmbWordmarkGroundNavy400,
  800: cmbWordmarkGroundNavy800,
  1200: cmbWordmarkGroundNavy1200,
  2400: cmbWordmarkGroundNavy2400,
} as const;

// White ground wordmark ✅ embedded as a real map.
const WORDMARK_GROUND_WHITE = {
  200: cmbWordmarkGroundWhite200,
  400: cmbWordmarkGroundWhite400,
  800: cmbWordmarkGroundWhite800,
  1200: cmbWordmarkGroundWhite1200,
  2400: cmbWordmarkGroundWhite2400,
} as const;

export const MASTER_LOGOS = {
  black: {
    nav: { sm: cmbBlackNavSm, md: cmbBlackNavMd, lg: cmbBlackNavLg },
    footer: { sm: cmbBlackFooterSm, md: cmbBlackFooterMd, lg: cmbBlackFooterLg },
    hero: cmbBlackHero,
    large: cmbBlackLarge,
    medium: cmbBlackMedium,
    small: cmbBlackSmall,
    emblem: EMBLEM_BLACK,
    tiles: TILES_BLACK,
    monogram: MONOGRAM_BLACK,
    wordmark: WORDMARK_BLACK,
    wordmarkGround: WORDMARK_GROUND_BLACK,
  },
  navy: {
    nav: { sm: cmbNavyNavSm, md: cmbNavyNavMd, lg: cmbNavyNavLg },
    footer: { sm: cmbNavyFooterSm, md: cmbNavyFooterMd, lg: cmbNavyFooterLg },
    hero: cmbNavyHero,
    large: cmbNavyLarge,
    medium: cmbNavyMedium,
    small: cmbNavySmall,
    // Navy emblem ✅ embedded.
    emblem: EMBLEM_NAVY,
    // Navy tiles ✅ embedded.
    tiles: TILES_NAVY,
    // Navy monogram ✅ embedded.
    monogram: MONOGRAM_NAVY,
    // Navy wordmark ✅ embedded.
    wordmark: WORDMARK_NAVY,
    // Navy ground wordmark ✅ embedded.
    wordmarkGround: WORDMARK_GROUND_NAVY,
  },
  white: {
    nav: { sm: cmbWhiteNavSm, md: cmbWhiteNavMd, lg: cmbWhiteNavLg },
    footer: { sm: cmbWhiteFooterSm, md: cmbWhiteFooterMd, lg: cmbWhiteFooterLg },
    hero: cmbWhiteHero,
    large: cmbWhiteLarge,
    medium: cmbWhiteMedium,
    small: cmbWhiteSmall,
    // White emblem ✅ embedded.
    emblem: EMBLEM_WHITE,
    // White tiles ✅ embedded.
    tiles: TILES_WHITE,
    // White monogram ✅ embedded.
    monogram: MONOGRAM_WHITE,
    // White wordmark ✅ embedded.
    wordmark: WORDMARK_WHITE,
    // White ground wordmark ✅ embedded.
    wordmarkGround: WORDMARK_GROUND_WHITE,
  },
} as const;

/** Per-colorway readiness for the emblem family specifically. */
export const EMBLEM_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/** Per-colorway readiness for the tiles family specifically. */
export const TILES_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/** Per-colorway readiness for the monogram family specifically. */
export const MONOGRAM_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/** Per-colorway readiness for the wordmark family specifically. */
export const WORDMARK_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/** Per-colorway readiness for the wordmark "ground" variant specifically. */
export const WORDMARK_GROUND_STATUS: Record<LogoColorway, "ready" | "aliased"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

export const EMBLEM_SIZES: EmblemSize[] = [100, 200, 400, 800, 1200, 2400];
/** Tiles share the emblem size ladder. */
export const TILE_SIZES: TileSize[] = [100, 200, 400, 800, 1200, 2400];
/** Monogram has its own ladder — no hero size. */
export const MONOGRAM_SIZES: MonogramSize[] = [64, 128, 256, 512, 1024];
/** Wordmark has its own ladder — starts at 200; ~5:1 aspect ratio. */
export const WORDMARK_SIZES: WordmarkSize[] = [200, 400, 800, 1200, 2400];

/** Which colorways have *real* uploaded assets.
 *  All three colorways are now embedded and live.
 */
export const COLORWAY_STATUS: Record<LogoColorway, "ready" | "pending"> = {
  black: "ready",
  navy: "ready",
  white: "ready",
};

/**
 * The contract: which logo file is allowed where, and why.
 * Each slot declares its **default surface** so we can recommend a colorway
 * per-slot via `recommendedColorwayForSlot`.
 */
export const LOGO_USAGE_MAP = {
  nav: {
    desktop: { file: "cmb-nav-large.png", maxHeightPx: 44, breakpoint: ">=1024px" },
    tablet: { file: "cmb-nav-medium.png", maxHeightPx: 38, breakpoint: "640–1023px" },
    mobile: { file: "cmb-nav-small.png", maxHeightPx: 34, breakpoint: "<640px" },
    surface: "light" as const,
    note: "Nav variants are square-cropped to keep the bar compact.",
  },
  footer: {
    desktop: { file: "cmb-footer-large.png", maxHeightPx: 96, breakpoint: ">=1024px" },
    tablet: { file: "cmb-footer-medium.png", maxHeightPx: 80, breakpoint: "768–1023px" },
    mobile: { file: "cmb-footer-small.png", maxHeightPx: 64, breakpoint: "<768px" },
    surface: "light" as const,
    note: "Footer is the brand monument — show the full lockup.",
  },
  loading: { file: "cmb-small.png", maxHeightPx: 120, surface: "dark" as const, note: "Splash/loading screens — usually dark surface, prefer white." },
  hero: { file: "cmb-hero.png", maxWidthPx: 720, surface: "image" as const, note: "Marketing hero watermark — colorway chosen to contrast the hero photo." },
  about: { file: "cmb-large.png", maxWidthPx: 600, surface: "light" as const, note: "About-page brand monument." },
  bookingModal: { file: "cmb-medium.png", maxHeightPx: 120, surface: "light" as const, note: "Left rail of the booking modal." },
  notFound: { file: "cmb-medium.png", maxHeightPx: 120, surface: "light" as const, note: "404 page mark." },
  email: { file: "/og-image-cmb.png", maxWidthPx: 280, surface: "light" as const, note: "Hosted via /public so email clients can fetch it." },
  og: { file: "/og-image-cmb.png", surface: "image" as const, note: "Open Graph + Twitter share image." },
  favicon: { file: "/favicon-cmb.png", surface: "any" as const, note: "Crawler / browser tab favicon." },

  // ── Emblem family (square 1:1, no wordmark) ──
  emblemFavicon:   { file: "cmb-emblem-black-100.png",  maxHeightPx: 32,   surface: "any"   as const, note: "Browser tab / list bullet / chat avatar — 32–48px display." },
  emblemAvatar:    { file: "cmb-emblem-black-200.png",  maxHeightPx: 64,   surface: "any"   as const, note: "Nav-collapsed mark / mobile avatar / retina favicon." },
  emblemInline:    { file: "cmb-emblem-black-400.png",  maxHeightPx: 128,  surface: "light" as const, note: "Inline body badges, card crests, OG icon." },
  emblemAccent:    { file: "cmb-emblem-black-800.png",  maxHeightPx: 240,  surface: "any"   as const, note: "Hero accent, section divider monogram, scroll-back-to-top." },
  emblemWatermark: { file: "cmb-emblem-black-1200.png", maxHeightPx: 480,  surface: "image" as const, note: "Full-page watermark, splash crest, og-square." },
  emblemPrint:     { file: "cmb-emblem-black-2400.png", maxHeightPx: 1200, surface: "any"   as const, note: "Print master / billboard / 5K hero crest. Lazy-load only." },

  // ── Tiles family (exploded mark — three separated panels) ──
  // The kinetic identity. Use when the brand should feel built/assembled,
  // especially with motion. Distinct from emblem (solid crest) and lockup.
  tilesFavicon:     { file: "cmb-tiles-black-100.png",  maxHeightPx: 32,   surface: "any"   as const, note: "Alt favicon for staging/construction-mode environments." },
  tilesAvatar:      { file: "cmb-tiles-black-200.png",  maxHeightPx: 64,   surface: "any"   as const, note: "Team / social avatar where the kinetic look beats the solid crest." },
  tilesAccent:      { file: "cmb-tiles-black-400.png",  maxHeightPx: 128,  surface: "any"   as const, note: "Section divider mark; can animate the three panels in sequence." },
  tilesProcess:     { file: "cmb-tiles-black-800.png",  maxHeightPx: 240,  surface: "light" as const, note: "Process / craft pages — one tile per step, animated assembly." },
  tilesLoadingHero: { file: "cmb-tiles-black-1200.png", maxHeightPx: 480,  surface: "dark"  as const, note: "Loading splash final reveal — tiles fly in and lock into position." },
  tilesWatermark:   { file: "cmb-tiles-black-2400.png", maxHeightPx: 1200, surface: "image" as const, note: "Full-page background watermark on premium pages at 6–10% opacity." },

  // ── Monogram family (handwritten "MB" signature mark) ──
  // The human hand. Use for closing moments, signatures, certificates,
  // intimate/personal contexts. Wrong for nav, hero, splash.
  monogramFavicon:     { file: "cmb-mb-monogram-black-64.png",   maxHeightPx: 32,  surface: "any"   as const, note: "Alt favicon for founder-mode / personal pages." },
  monogramSignature:   { file: "cmb-mb-monogram-black-128.png",  maxHeightPx: 48,  surface: "light" as const, note: "Email signature footer, quote letter, contract sign-off." },
  monogramSealAccent:  { file: "cmb-mb-monogram-black-256.png",  maxHeightPx: 96,  surface: "light" as const, note: "About-page founder card, story-section seal, testimonial attribution." },
  monogramCertificate: { file: "cmb-mb-monogram-black-512.png",  maxHeightPx: 192, surface: "light" as const, note: "Warranty / completion certificate seal, project handoff documents." },
  monogramWatermark:   { file: "cmb-mb-monogram-black-1024.png", maxHeightPx: 512, surface: "image" as const, note: "Premium project case-study watermark — low opacity, signed-work aesthetic." },

  // ── Wordmark family (pure typography — "MASTER BUILDERS / COCHRANE") ──
  // Editorial type voice. Lockup = wordmark + emblem stacked; the wordmark
  // alone removes the emblem so it can sit in horizontal rails (≥3:1 aspect)
  // without the crest dominating. Use for section eyebrows, doc headers,
  // press kits, breadcrumb chips. Wrong for nav (lockup wins) or favicon
  // (emblem wins).
  wordmarkInline:    { file: "cmb-wordmark-black-200.png",  maxHeightPx: 24,  surface: "light" as const, note: "Inline body wordmark, byline strip, breadcrumb brand chip." },
  wordmarkSection:   { file: "cmb-wordmark-black-400.png",  maxHeightPx: 56,  surface: "light" as const, note: "Section eyebrow above an H2, editorial divider label, modal header." },
  wordmarkDocument:  { file: "cmb-wordmark-black-800.png",  maxHeightPx: 96,  surface: "light" as const, note: "Document/PDF header, quote letter masthead, press kit page header." },
  wordmarkBanner:    { file: "cmb-wordmark-black-1200.png", maxHeightPx: 160, surface: "any"   as const, note: "Wide hero strip alternative, cinema-bar caption, full-width brand band." },
  wordmarkPrint:     { file: "cmb-wordmark-black-2400.png", maxHeightPx: 320, surface: "any"   as const, note: "Print master, large-format banner, billboard wordmark. Lazy-load only." },

  // ── Wordmark Ground variant (drafted plumb-line + base rule) ──
  // Sibling to the plain wordmark — same typography, but framed by an
  // architect's plumb-line and base rule. Reads as spec-grade / authored.
  // Use for STANDALONE brand statements where the mark needs to feel
  // anchored: chapter openers, project plates, deck covers, certificate
  // headers. Use plain `wordmark*` instead when sitting *with* surrounding
  // text (inline, eyebrow, breadcrumb).
  wordmarkGroundInline:  { file: "cmb-wordmark-ground-black-200.png",  maxHeightPx: 32,  surface: "light" as const, note: "Specification stamp inline in a spec sheet or drawing-set legend." },
  wordmarkGroundChapter: { file: "cmb-wordmark-ground-black-400.png",  maxHeightPx: 72,  surface: "light" as const, note: "Chapter / case-study opener title block above a long-form section." },
  wordmarkGroundPlate:   { file: "cmb-wordmark-ground-black-800.png",  maxHeightPx: 128, surface: "light" as const, note: "Project nameplate, 'stamped by' plate on warranty / handoff documents." },
  wordmarkGroundBand:    { file: "cmb-wordmark-ground-black-1200.png", maxHeightPx: 200, surface: "any"   as const, note: "Hero brand band on About / Capabilities pages — anchors a wide section." },
  wordmarkGroundCover:   { file: "cmb-wordmark-ground-black-2400.png", maxHeightPx: 400, surface: "any"   as const, note: "Capabilities deck / proposal PDF cover, large-format presentation." },
} as const;

export type LogoSlot = keyof typeof LOGO_USAGE_MAP;

/**
 * Recommend the best colorway for a slot given the trade's chosen colorway.
 * - light surface → use the trade's chosen ink (white falls back to black)
 * - dark surface  → force white
 * - image surface → default white; per-instance override allowed
 * - any           → trade's chosen colorway
 */
export function recommendedColorwayForSlot(
  slot: LogoSlot,
  tradeColorway: LogoColorway,
): LogoColorway {
  const surface = (LOGO_USAGE_MAP[slot] as { surface?: string }).surface;
  if (surface === "dark") return "white";
  if (surface === "image") return "white";
  if (surface === "any") return tradeColorway;
  // light surface
  return tradeColorway === "white" ? "black" : tradeColorway;
}

/**
 * Showcase boards — in-context demonstration renders for the brand-kit page,
 * press kit, and any "see the mark in context" surface. NOT for production
 * UI components (those use `<MasterLogo>` against the bundled lockup family).
 *
 * Each board is a high-resolution (1920–2048px) plate showing the lockup or
 * emblem on a specific surface tone. Designed to be downloaded by journalists,
 * partners, fabrication vendors, etc.
 */
export const MASTER_BOARDS = {
  lockupOnWhite: cmbBoardLockupOnWhite,
  lockupOnBlack: cmbBoardLockupOnBlack,
  lockupOnNavy: cmbBoardLockupOnNavy,
  emblemOnBlack: cmbBoardEmblemOnBlack,
  emblemOnNavy: cmbBoardEmblemOnNavy,
} as const;

export type MasterBoardId = keyof typeof MASTER_BOARDS;

/** Human-readable metadata for the boards (used by /brand page). */
export const MASTER_BOARDS_META: Record<
  MasterBoardId,
  { label: string; surface: "light" | "dark" | "navy"; family: "lockup" | "emblem" }
> = {
  lockupOnWhite: { label: "Lockup on white", surface: "light", family: "lockup" },
  lockupOnBlack: { label: "Lockup on black", surface: "dark", family: "lockup" },
  lockupOnNavy: { label: "Lockup on navy", surface: "navy", family: "lockup" },
  emblemOnBlack: { label: "Emblem on black", surface: "dark", family: "emblem" },
  emblemOnNavy: { label: "Emblem on navy", surface: "navy", family: "emblem" },
};
