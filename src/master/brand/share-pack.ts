/**
 * SHARE PACK — typed registry for the Master Builders Cochrane
 * social-share / OG / profile asset family.
 *
 * Mirrors the philosophy of `logo-registry.ts`: every consumer that needs a
 * pre-rendered share asset reads from here instead of hardcoding `/share/...`
 * paths. Backgrounds (transparent vs navybg) are first-class so callers can
 * pick the right surface treatment for their context.
 *
 * Files live under `/public/share/` (root-relative paths so OG crawlers and
 * server-side renderers can fetch them directly without Vite import resolution).
 *
 * See `LOGO_SLOT_MAP.md` → "Social share & profile pack" for the full
 * per-file decision tree.
 */

export type SharePlatform =
  | "og" // 1200×630 — Facebook / Slack / iMessage / LinkedIn link previews, default OG/Twitter
  | "twitter" // 1200×600 — Twitter alternate 2:1, generic 2:1 share
  | "linkedin" // 1584×396 — LinkedIn company-page cover banner
  | "instagram" // 1080×1080 — IG feed, FB square, generic 1:1 social
  | "profile"; // 400×400 — round avatar across all social platforms

export type ShareBackground = "transparent" | "navybg";

export interface ShareAsset {
  transparent: string;
  navybg: string;
  /** Native pixel dimensions (also useful for OG meta width/height tags). */
  w: number;
  h: number;
}

export const SHARE_PACK: Record<SharePlatform, ShareAsset> = {
  og: {
    transparent: "/share/og-1200x630-transparent.png",
    navybg: "/share/og-1200x630-navybg.jpg",
    w: 1200,
    h: 630,
  },
  twitter: {
    transparent: "/share/twitter-1200x600-transparent.png",
    navybg: "/share/twitter-1200x600-navybg.jpg",
    w: 1200,
    h: 600,
  },
  linkedin: {
    transparent: "/share/linkedin-1584x396-transparent.png",
    navybg: "/share/linkedin-1584x396-navybg.jpg",
    w: 1584,
    h: 396,
  },
  instagram: {
    transparent: "/share/instagram-1080x1080-transparent.png",
    navybg: "/share/instagram-1080x1080-navybg.jpg",
    w: 1080,
    h: 1080,
  },
  profile: {
    transparent: "/share/profile-400x400-transparent.png",
    navybg: "/share/profile-400x400-navybg.jpg",
    w: 400,
    h: 400,
  },
} as const;

/**
 * Default-pick the right background per platform.
 *
 * Rule of thumb: any external surface where we don't control the rendering
 * chrome (share crawlers, profile photos, banner uploads) gets the pre-baked
 * navy backdrop so the diamond + wordmark always read as a contained brand
 * card. Reach for `transparent` only when the destination already provides a
 * surface (e.g. layered comps, dark-mode overlays, brand-kit downloads).
 */
export const recommendedShareBackground = (
  _platform: SharePlatform,
): ShareBackground => "navybg";

/** Convenience helper: resolve a single URL given platform + (optional) bg. */
export const getShareAsset = (
  platform: SharePlatform,
  background: ShareBackground = recommendedShareBackground(platform),
): string => SHARE_PACK[platform][background];
