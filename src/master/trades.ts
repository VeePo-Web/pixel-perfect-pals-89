/**
 * TRADE TAXONOMY — every site CMB plans to (or already does) operate.
 *
 * Used by:
 *  - `src/master/seo/backlink-network.ts` to pick adjacent sister sites
 *  - The /remix dashboard to validate `trade.config.ts -> identity.trade`
 *  - The "Related services" footer widget
 *
 * Add a row each time you remix a new site. One source of truth.
 */

export interface TradeEntry {
  /** Unique slug (kebab-case). Matches identity.trade in trade.config.ts */
  slug: string;
  /** Display name */
  name: string;
  /** Parent category — used for backlink relevance scoring */
  category:
    | "interior-finishing"
    | "exterior"
    | "structural"
    | "mechanical"
    | "electrical"
    | "landscape"
    | "specialty";
  /** Other trade slugs that are natural cross-sells / cross-links */
  adjacent: string[];
  /** Live URL once the site is deployed; null while in dev */
  url: string | null;
  /** Short blurb used by the SisterSites component */
  blurb: string;
}

export const TRADES: TradeEntry[] = [
  {
    slug: "drywall-insulation",
    name: "Cochrane Drywall & Insulation",
    category: "interior-finishing",
    adjacent: ["painting", "basement-finishing", "garage-finishing"],
    url: null, // fill once deployed
    blurb: "Clean drywall repairs, smooth installs, painting, and insulation for Cochrane homes.",
  },
  // Add a row per remix. Examples to scaffold:
  // { slug: "roofing", name: "Cochrane Roofing", category: "exterior", adjacent: ["siding", "eavestroughs"], url: null, blurb: "..." },
  // { slug: "plumbing", name: "Cochrane Plumbing", category: "mechanical", adjacent: ["heating", "drain-cleaning"], url: null, blurb: "..." },
];

/** Find a trade entry by slug */
export const getTrade = (slug: string) => TRADES.find((t) => t.slug === slug);

/** Get N adjacent sister sites for a given trade slug, by category + adjacency */
export const getSisterSites = (slug: string, limit = 5): TradeEntry[] => {
  const self = getTrade(slug);
  if (!self) return TRADES.filter((t) => t.url).slice(0, limit);
  const scored = TRADES.filter((t) => t.slug !== slug && t.url).map((t) => ({
    trade: t,
    score:
      (self.adjacent.includes(t.slug) ? 10 : 0) +
      (t.category === self.category ? 3 : 0),
  }));
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.trade);
};
