/**
 * Master brand version. Bump when the parent CMB brand changes
 * (new tagline, palette evolution, new mission). Each remix records
 * `forkedFromMaster` in `trade.config.ts` so we know which sites are stale.
 *
 * Bump notes live in `src/master/playbooks/MIGRATIONS.md`.
 */
export const MASTER_VERSION = "0.1.0" as const;
export type MasterVersion = typeof MASTER_VERSION;
