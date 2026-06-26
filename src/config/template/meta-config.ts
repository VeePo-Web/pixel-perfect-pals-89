/**
 * meta-config.ts — Per-route <head> metadata, trade-agnostic.
 *
 * Title rule: ≤ 60 chars. Primary keyword + region first. Brand last.
 * Desc rule:  140–155 chars. Keyword + region + outcome + trust signal.
 *
 * Every string is built from MASTER_REMIX tokens so a remix author only
 * has to edit `remix-variables.ts` to retarget any trade and geography.
 * Areas pages (`/areas-we-serve/*`) and Blog pages (`/blog*`) own their
 * own head — this map only covers true static routes.
 */

import { MASTER_REMIX } from "./remix-variables";

export interface PageMeta {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

const ORIGIN = MASTER_REMIX.BRAND_URL || "";
const BRAND = MASTER_REMIX.BRAND_NAME;
const CAT = MASTER_REMIX.SERVICE_CATEGORY;
const REGION = MASTER_REMIX.SERVICE_REGION_TAGLINE;

// ─── Static route map — only routes that actually exist ─────────────────────
export const META_CONFIG: Record<string, PageMeta> = {
  "/": {
    title: `${CAT}${REGION ? ` — ${REGION}` : ""} | ${BRAND}`,
    description: `${BRAND} — ${CAT} across ${REGION || "the regions we serve"}. Browse the full Areas We Serve directory. Send photos for a written quote.`,
    ogTitle: `${BRAND} — ${CAT}`,
    canonical: `${ORIGIN}/`,
  },
};

// Kept for type compatibility with any legacy import. The /services route
// no longer exists in the live app, so this returns a generic fallback.
export const META_SERVICE_DETAIL = (slug: string): PageMeta => ({
  title: `${CAT} | ${BRAND}`,
  description: `${CAT} — ${BRAND}. Send photos for a written quote.`,
  canonical: `${ORIGIN}/services/${slug}`,
});
