/**
 * canonical.ts — single source of truth for URL building.
 *
 * Every page that emits `<link rel="canonical">`, `og:url`, or a
 * JSON-LD `@id` should route through `buildCanonical(path)` so the
 * Victorious-SEO entity graph stays internally consistent. When
 * `MASTER_REMIX.BRAND_URL` is empty (preview / pre-remix), this
 * returns the relative path — browsers and crawlers resolve relative
 * canonicals against the current origin, so the link still validates
 * after the project is given a domain.
 */

import { MASTER_REMIX } from "@/config/template/remix-variables";

const origin = (): string => (MASTER_REMIX.BRAND_URL || "").replace(/\/$/, "");

export function buildCanonical(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${origin()}${p}`;
}

export interface LocaleAlternate {
  hreflang: string;
  href: string;
}

/**
 * Emit `<xhtml:link rel="alternate" hreflang>` candidates when the
 * brand has populated more than one locale. Defaults to a single-locale
 * setup (returns `[]`) so the template doesn't ship with phantom
 * alternates pointing nowhere.
 */
export function buildAlternates(path: string): LocaleAlternate[] {
  // Placeholder hook — wire `MASTER_REMIX.alternateLocales` once a remix
 // declares e.g. { "en-CA": "https://acme.ca", "en-US": "https://acme.com" }.
  void path;
  return [];
}