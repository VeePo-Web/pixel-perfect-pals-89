/**
 * BACKLINK NETWORK — sister sites every remix should link to.
 *
 * Reads from `src/master/trades.ts`. As you deploy each new remix, fill in
 * the `url` on the corresponding TRADES entry — every other site picks it up
 * on next deploy. No editing required here.
 */

import { TRADES, getSisterSites, type TradeEntry } from "../trades";

/** Pick the top N sister sites to link from this trade */
export const pickSisterSites = (currentTradeSlug: string, n = 5): TradeEntry[] =>
  getSisterSites(currentTradeSlug, n);

/** All deployed sister sites — used for the global sitemap submission */
export const allDeployedSites = (): TradeEntry[] =>
  TRADES.filter((t) => t.url !== null);
