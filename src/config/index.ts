/**
 * COCHRANE DRYWALL & INSULATION — Source of Truth Index
 *
 * Single barrel export for all canonical brand/business/design configs.
 * Every page and component imports from here.
 *
 * Source documents (verbatim, embedded as TypeScript):
 *  - 1.0 Style Sheet            → BRAND
 *  - 1.2 Business Description   → BUSINESS
 *  - 1.3 Design Preferences     → DESIGN_PREFERENCES
 *  - 1.5 Brand Identity         → BRAND_IDENTITY
 *  - 2.1 Wireframes             → SITE_STRUCTURE
 *  - Copy of 2.1 Fear Sentences → FEAR_DISPEL
 */

export { BRAND } from "./brand";
export { BUSINESS } from "./business";
export { DESIGN_PREFERENCES } from "./design-preferences";
export { BRAND_IDENTITY } from "./brand-identity";
export { SITE_STRUCTURE } from "./site-structure";
export { FEAR_DISPEL } from "./fear-dispel";
export { TRADE } from "./trade.config";

export type { BrandColors } from "./brand";
export type { ServiceKey, Service } from "./business";
export type { PageKey } from "./site-structure";
export type { FearDispelKey } from "./fear-dispel";
export type { Trade, HSL, ColorMode } from "./trade.config";
