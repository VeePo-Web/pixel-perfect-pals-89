/**
 * TEMPLATE ENTRY — Areas We Serve  (re-exports the shared hub page)
 *
 * This file keeps the template/pages directory consistent — all template
 * routes have a page here. The implementation lives in src/pages/AreasHub.tsx
 * because it is shared across the hub, region, and community tiers.
 *
 * REMIX GUIDE ─────────────────────────────────────────────────────────────────
 * No changes needed here. Update MASTER_REMIX in trade.config.ts to inject
 * your trade's service name, brand name, and service category.
 *
 * Route served:   /areas-we-serve
 * Sub-routes:     /areas-we-serve/:region
 *                 /areas-we-serve/:region/:community
 *
 * SEO strategy:   3-tier architecture
 *   Tier 1 Hub    → /areas-we-serve              (brand-level regional authority)
 *   Tier 2 Region → /areas-we-serve/:region      (regional cluster authority)
 *   Tier 3 Comm.  → /areas-we-serve/:r/:c        (individual community — the money page)
 *
 * Schema:         LocalBusiness + BreadcrumbList + FAQPage + Service
 * Google Maps:    coordinates-based iframe on every community page (no API key)
 * Internal links: every community links to 4–5 nearest communities
 * ─────────────────────────────────────────────────────────────────────────────
 */

export { default } from "@/pages/AreasHub";
