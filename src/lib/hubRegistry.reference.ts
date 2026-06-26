/**
 * ════════════════════════════════════════════════════════════════════════
 *   REFERENCE ONLY — DO NOT IMPORT IN PRODUCTION.
 * ════════════════════════════════════════════════════════════════════════
 *
 * Snapshot of a fully-populated blog Hub entry (sourced from VeePo.ca's
 * "Web Design for Trades" cluster). Copy into the live `hubRegistry.ts`
 * and adapt to your trade's topic clusters when ready to publish.
 */

import type { Hub } from "./hubRegistry";

export const REFERENCE_HUB: Hub = {
  id: "H1",
  name: "Web Design for Trades",
  slug: "trades-web-design",
  pillarUrl: "/blog/trades-web-design",
  hubUrl: "/blog/trades-web-design",
  primaryTopic:
    "Industry-specific web design for HVAC, plumbers, electricians, roofers, contractors",
  primaryKeywordPattern:
    "[trade] website design [city]|web design for [trade]|[trade] web development",
  secondaryTopics: [
    "Trade-specific page structures",
    "Quote flows for service businesses",
    "Before/after galleries",
    "Emergency service pages",
    "Service area expansion",
  ],
  intentProfile: "commercial",
  allowedLocations: ["Cochrane", "Airdrie", "Calgary NW"],
  servicePages: ["/areas-we-serve"],
  relatedHubs: [],
  linkedRegions: ["cochrane"],
  linkedCommunities: ["sunset-ridge", "riversong"],
};