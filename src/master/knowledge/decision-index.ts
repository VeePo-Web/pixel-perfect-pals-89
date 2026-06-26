/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DECISION INDEX — programmatic registry of partner-doc routes
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * One DecisionRoute per partner doc. Mechanically derived from each partner
 * doc's §3 (Decision triggers) and §12 (Guard Rail Linkage). Powers both:
 *   - the CLI:  bun scripts/decisions.ts "<query>"
 *   - the UI:   /knowledge route
 *
 * Source docs and partner docs are NEVER modified by this layer. This file is
 * pure typed data — no runtime side effects.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { GuardRailId } from "../guardrails";

export type DecisionCategory =
  | "seo"
  | "brand-style"
  | "voice-copy"
  | "persona-icp"
  | "conversion"
  | "ux-layout"
  | "performance"
  | "trust-legal"
  | "strategy-positioning"
  | "architecture-backend";

export const CATEGORY_LABELS: Record<DecisionCategory, string> = {
  seo: "SEO & AI Search",
  "brand-style": "Brand & Visual Style",
  "voice-copy": "Voice & Copy",
  "persona-icp": "Persona / ICP",
  conversion: "Conversion",
  "ux-layout": "UX & Layout",
  performance: "Performance",
  "trust-legal": "Trust & Legal",
  "strategy-positioning": "Strategy & Positioning",
  "architecture-backend": "Architecture & Backend",
};

export interface DecisionRoute {
  /** Stable id, e.g. "cmb-strategy-1.2" */
  id: string;
  /** Brand slug (mirrors knowledge folder structure) */
  brand: "cochrane-master-builders";
  /** Short label for results */
  title: string;
  /** One-line description of what this doc governs */
  oneLine: string;
  /** Path to the partner (rule-book) document, relative to repo root */
  partnerDoc: string;
  /** Path to the immutable source document, relative to repo root */
  sourceDoc: string;
  /** Categories this route serves */
  categories: DecisionCategory[];
  /** Verbatim trigger phrases pulled from partner doc §3 */
  triggers: string[];
  /** Guard rails the partner doc maps to in §12 */
  guardRails: GuardRailId[];
  /** Optional precedence note from partner doc §6 */
  precedence?: string;
}

const PARTNER_BASE =
  "src/master/knowledge/partner-documents/brands/cochrane-master-builders";
const SOURCE_BASE =
  "src/master/knowledge/source-documents/brands/cochrane-master-builders";

export const DECISION_INDEX: DecisionRoute[] = [
  // ── Strategy ──────────────────────────────────────────────────────────────
  {
    id: "cmb-strategy-1.0",
    brand: "cochrane-master-builders",
    title: "Strategy v1.0 — North Star",
    oneLine:
      "Top-level positioning, North Star, what business CMB is in. First stop for purpose questions.",
    partnerDoc: `${PARTNER_BASE}/strategy/1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/strategy/1.0_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report.md`,
    categories: ["strategy-positioning", "voice-copy"],
    triggers: [
      "what business is CMB in",
      "what do we actually do",
      "elevator pitch",
      "30-second pitch",
      "north star",
      "mission",
      "purpose",
      "why we exist",
      "should this page exist",
      "should this section exist",
      "is this on-brand at the business level",
      "top-level promise on the home page",
      "is this trade remix on-mission",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-brand-derivation",
      "gr-plan-first-deep-items",
      "gr-zero-sister-fingerprints",
    ],
    precedence: "If 1.2 also matches, 1.2 wins on positioning conflicts.",
  },
  {
    id: "cmb-strategy-1.2",
    brand: "cochrane-master-builders",
    title: "Strategy v1.2 — Refined Positioning",
    oneLine:
      "Iterated positioning, differentiation, pricing transparency, second-draft hero. Wins over 1.0.",
    partnerDoc: `${PARTNER_BASE}/strategy/1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.partner.md`,
    sourceDoc: `${SOURCE_BASE}/strategy/1.2_Cochrane_Master_Builders_Strategic_Business_SEO_UX_Report_1.md`,
    categories: ["strategy-positioning", "conversion", "voice-copy"],
    triggers: [
      "refine the home pitch",
      "second-draft hero",
      "tighten the promise",
      "how do we differ from",
      "differentiation",
      "competitive angle",
      "show pricing or hide it",
      "how transparent on pricing",
      "ranges vs quotes",
      "top-level page or sub-section",
      "positioning question after v1.0",
    ],
    guardRails: [
      "gr-bespoke-brand-derivation",
      "gr-legal-pages-bespoke",
      "gr-plan-first-deep-items",
      "gr-real-business-signals",
      "gr-zero-sister-fingerprints",
    ],
    precedence: "Wins over 1.0 on any positioning conflict.",
  },
  {
    id: "cmb-strategy-1.3",
    brand: "cochrane-master-builders",
    title: "Strategy v1.3 — Backend & Sister-Site Network",
    oneLine:
      "Multi-trade backend, sister-site network, taxonomy, long-horizon decisions, NAP propagation.",
    partnerDoc: `${PARTNER_BASE}/strategy/1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.partner.md`,
    sourceDoc: `${SOURCE_BASE}/strategy/1.3_Cochrane_Master_Builders_Backend_Strategy_Design_SEO_Legacy_Report_1.md`,
    categories: [
      "architecture-backend",
      "strategy-positioning",
      "seo",
      "trust-legal",
    ],
    triggers: [
      "add a new trade",
      "new sister site",
      "remix for",
      "what lives in master vs trade.config",
      "brand bible or per-site",
      "backlink network",
      "internal linking between sister sites",
      "footer should mention the parent network",
      "cross-site trust",
      "license / insurance / NAP propagation",
      "warranty across trades",
      "what survives a 50-year horizon",
      "long-horizon decisions",
      "trades.ts taxonomy",
    ],
    guardRails: [
      "gr-bespoke-brand-derivation",
      "gr-crawl-hygiene",
      "gr-master-logo-slot-map",
      "gr-plan-first-deep-items",
      "gr-real-business-signals",
      "gr-zero-sister-fingerprints",
    ],
    precedence: "Wins on multi-trade backend / sister-site / taxonomy.",
  },

  // ── SEO ───────────────────────────────────────────────────────────────────
  {
    id: "cmb-seo-1.1",
    brand: "cochrane-master-builders",
    title: "SEO v1.1 — Market, Competitor, AI SEO",
    oneLine:
      "Keyword selection, meta titles/descriptions, Areas-We-Serve, schema, AI search visibility, FAQs.",
    partnerDoc: `${PARTNER_BASE}/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.partner.md`,
    sourceDoc: `${SOURCE_BASE}/seo-research/1.1_Cochrane_Master_Builders_Market_Competitor_AI_SEO_Research_Report_1.md`,
    categories: ["seo"],
    triggers: [
      "meta title",
      "meta description",
      "h1",
      "slug",
      "page title for SEO",
      "keyword for this page",
      "what should this page rank for",
      "areas we serve",
      "service area page",
      "neighborhoods",
      "local SEO list",
      "schema",
      "json-ld",
      "structured data",
      "FAQ block",
      "people also ask",
      "common questions",
      "AI search",
      "ChatGPT visibility",
      "Perplexity citation",
      "AI Overview",
      "differentiate from",
      "long-tail page",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-areas-we-serve-excellence",
      "gr-bespoke-brand-derivation",
      "gr-crawl-hygiene",
      "gr-local-trust-schema",
      "gr-modern-image-pipeline",
      "gr-page-meta-jsonld-unique",
    ],
    precedence: "Wins on keyword / SERP / Areas-We-Serve / AI-search visibility.",
  },

  // ── Brand Identity ────────────────────────────────────────────────────────
  {
    id: "cmb-brand-1.2.1",
    brand: "cochrane-master-builders",
    title: "Brand Identity v1.2.1 — Family Legacy Standard",
    oneLine:
      "Voice/tone register, family/legacy/generational language, palette derivation, type pairing.",
    partnerDoc: `${PARTNER_BASE}/brand-identity/1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.partner.md`,
    sourceDoc: `${SOURCE_BASE}/brand-identity/1.2.1_Cochrane_Master_Builders_Family_Legacy_Standard_1.md`,
    categories: ["brand-style", "voice-copy"],
    triggers: [
      "voice",
      "tone",
      "how should this sound",
      "register",
      "family language",
      "legacy",
      "generational",
      "heritage",
      "craft passed down",
      "tone words for trade.config",
      "power words",
      "palette derivation",
      "remix accent",
      "trade palette from master",
      "type pair",
      "typography philosophy",
      "font choice",
      "is this on-brand at the visual register level",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-brand-derivation",
      "gr-bespoke-style-guide-live",
      "gr-master-logo-slot-map",
      "gr-wcag-aa",
      "gr-zero-sister-fingerprints",
    ],
  },
  {
    id: "cmb-brand-1.2.2",
    brand: "cochrane-master-builders",
    title: "Brand Identity v1.2.2 — Foundations For Generations",
    oneLine:
      "Hero headlines, taglines, mission/about copy, founder promise, hero CTA microcopy.",
    partnerDoc: `${PARTNER_BASE}/brand-identity/1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/brand-identity/1.2.2_Cochrane_Master_Builders_Foundations_For_Generations_After_Us_Report.md`,
    categories: ["brand-style", "voice-copy", "conversion"],
    triggers: [
      "hero headline",
      "h1 for the hero",
      "tagline",
      "sub-headline",
      "mission statement",
      "about page promise",
      "founder promise",
      "tagline candidates",
      "promise to the next generation",
      "legacy promise",
      "power words for brand-identity-northstar",
      "hero CTA microcopy at the brand level",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-brand-derivation",
      "gr-page-meta-jsonld-unique",
      "gr-real-business-signals",
      "gr-zero-sister-fingerprints",
    ],
  },

  // ── UX Design ─────────────────────────────────────────────────────────────
  {
    id: "cmb-ux-1.3.1",
    brand: "cochrane-master-builders",
    title: "UX v1.3.1 — Bespoke Traditional UX",
    oneLine:
      "Layout density, hero composition, type scale, mobile defaults, footer architecture, form layout, trust signals, reviews placement.",
    partnerDoc: `${PARTNER_BASE}/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/ux-design/1.3.1_Cochrane_Master_Builders_Bespoke_Traditional_UX_Design_Phase_Report.md`,
    categories: [
      "ux-layout",
      "conversion",
      "trust-legal",
      "performance",
      "brand-style",
    ],
    triggers: [
      "layout for",
      "section composition",
      "hero composition",
      "type scale",
      "line-height",
      "rhythm",
      "mobile defaults",
      "viewport behavior",
      "touch targets",
      "footer architecture",
      "footer columns",
      "footer trust signals",
      "form steps",
      "field count",
      "form layout",
      "trust signals where",
      "license / insurance / NAP placement",
      "reviews placement",
      "testimonial layout",
      "is this bespoke or templated",
      "should this animate",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-style-guide-live",
      "gr-booking-one-tap",
      "gr-modern-image-pipeline",
      "gr-motion-system-pinned",
      "gr-performance-budget-mobile",
      "gr-real-business-signals",
      "gr-wcag-aa",
    ],
    precedence: "Wins on layout / density / page flow / form architecture.",
  },

  // ── Personas / ICP ────────────────────────────────────────────────────────
  {
    id: "cmb-persona-1.4.1",
    brand: "cochrane-master-builders",
    title: "ICP v1.4.1 — Subcontractors",
    oneLine:
      "Subcontractor signup, partner portal, vendor onboarding, B2B copy, license/insurance upload.",
    partnerDoc: `${PARTNER_BASE}/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/personas-icp/1.4.1_Cochrane_Master_Builders_Subcontractor_ICP_UX_Report.md`,
    categories: ["persona-icp", "conversion", "ux-layout", "voice-copy"],
    triggers: [
      "subcontractor signup",
      "trade vendor onboarding",
      "partner application",
      "work with us",
      "partners page",
      "join our network",
      "partner portal",
      "vendor dashboard",
      "license / insurance upload",
      "vendor document collection",
      "B2B copy",
      "tradesperson copy",
      "vendor email",
      "would a tradesperson tap this on a job site",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-style-guide-live",
      "gr-booking-one-tap",
      "gr-legal-pages-bespoke",
      "gr-real-business-signals",
      "gr-wcag-aa",
    ],
  },
  {
    id: "cmb-persona-1.4.2",
    brand: "cochrane-master-builders",
    title: "ICP v1.4.2 — Mothers (Family Decision-Makers)",
    oneLine:
      "Family-facing hero/service copy, pricing transparency, safety, scheduling sensitivity, objection handling.",
    partnerDoc: `${PARTNER_BASE}/personas-icp/1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/personas-icp/1.4.2_Cochrane_Master_Builders_Mothers_ICP_UX_Report.md`,
    categories: ["persona-icp", "conversion", "voice-copy", "trust-legal"],
    triggers: [
      "hero / service-page copy for a family decision-maker",
      "mother",
      "mom",
      "family decision-maker",
      "pricing transparency on family-facing pages",
      "safety of contractor",
      "background check",
      "men in the home",
      "scheduling sensitivity",
      "kid-friendly windows",
      "school-run hours",
      "review selection",
      "which testimonials to lead with",
      "objection handling",
      "mess",
      "disruption",
      "kids",
      "pets",
      "booking copy",
      "field count for homeowner form",
      "9pm phone read",
      "late-night research mode",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-style-guide-live",
      "gr-booking-one-tap",
      "gr-legal-pages-bespoke",
      "gr-real-business-signals",
      "gr-wcag-aa",
    ],
  },
  {
    id: "cmb-persona-1.4.3",
    brand: "cochrane-master-builders",
    title: "ICP v1.4.3 — Grandfathers (Long-Tenured Homeowners)",
    oneLine:
      "Long-tenured homeowner copy, accessibility defaults, motion restraint, plainspoken language, phone CTAs.",
    partnerDoc: `${PARTNER_BASE}/personas-icp/1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.partner.md`,
    sourceDoc: `${SOURCE_BASE}/personas-icp/1.4.3_Cochrane_Master_Builders_Grandfathers_ICP_UX_Report.md`,
    categories: [
      "persona-icp",
      "voice-copy",
      "ux-layout",
      "trust-legal",
      "conversion",
    ],
    triggers: [
      "long-tenured homeowner copy",
      "legacy property",
      "older user accessibility",
      "type size defaults",
      "contrast review",
      "touch-target sizing when defaults feel marginal",
      "motion restraint",
      "tone the animation down",
      "phone CTA vs form CTA",
      "trust weighted toward longevity",
      "plainspoken copy",
      "no jargon",
      "no clever wordplay",
      "70-year-old patriarch read in 5 seconds",
      "grandfather",
      "elderly",
      "senior",
      "legal / warranty page that this persona will read",
    ],
    guardRails: [
      "gr-anti-paraphrase-readability",
      "gr-bespoke-style-guide-live",
      "gr-booking-one-tap",
      "gr-legal-pages-bespoke",
      "gr-motion-system-pinned",
      "gr-real-business-signals",
      "gr-wcag-aa",
    ],
  },
];

/** Lean payload sent to the AI fallback edge function */
export interface CompactRoute {
  id: string;
  title: string;
  oneLine: string;
  triggers: string[];
  categories: DecisionCategory[];
  guardRails: GuardRailId[];
}

export function toCompactRegistry(): CompactRoute[] {
  return DECISION_INDEX.map((r) => ({
    id: r.id,
    title: r.title,
    oneLine: r.oneLine,
    triggers: r.triggers,
    categories: r.categories,
    guardRails: r.guardRails,
  }));
}

export function getRouteById(id: string): DecisionRoute | undefined {
  return DECISION_INDEX.find((r) => r.id === id);
}
