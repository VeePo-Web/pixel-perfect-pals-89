/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DECISION INPUT — strict schema for router queries
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Free-text alone (a `goal` string) is fuzzy. This schema layers strict typed
 * dimensions on top so the router can deterministically narrow the candidate
 * document set BEFORE the keyword scorer runs.
 *
 * Source of truth for every enum: existing partner-doc triggers + guard rail
 * IDs in `src/master/guardrails.ts`. Nothing new about the brand is invented
 * here — this file is pure routing metadata.
 *
 * Validation uses Zod. Field-level errors are user-visible.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { z } from "zod";
import type { GuardRailId } from "../guardrails";
import type { DecisionCategory } from "./decision-index";

// ───────────────────────────────────────────────────────────────────────────
// Enums
// ───────────────────────────────────────────────────────────────────────────

export const PAGE_SECTIONS = [
  "home-hero",
  "home-body",
  "service-page",
  "service-area-page",
  "about",
  "legal",
  "partners-vendors",
  "footer",
  "forms-booking",
  "style-guide",
  "blog-faq",
  "meta-seo",
] as const;
export type PageSection = (typeof PAGE_SECTIONS)[number];

export const PAGE_SECTION_LABELS: Record<PageSection, string> = {
  "home-hero": "Home — Hero",
  "home-body": "Home — Body",
  "service-page": "Service page",
  "service-area-page": "Areas-We-Serve / location page",
  about: "About",
  legal: "Legal (privacy / terms / warranty)",
  "partners-vendors": "Partners / Vendors",
  footer: "Footer",
  "forms-booking": "Form / Booking flow",
  "style-guide": "Style guide page",
  "blog-faq": "Blog / FAQ",
  "meta-seo": "Meta / SEO (head, JSON-LD)",
};

export const AUDIENCES = [
  "mothers",
  "grandfathers",
  "subcontractors",
  "general-homeowner",
  "b2b-vendor",
  "ai-search-crawler",
] as const;
export type Audience = (typeof AUDIENCES)[number];

export const AUDIENCE_LABELS: Record<Audience, string> = {
  mothers: "Mothers (family decision-makers)",
  grandfathers: "Grandfathers (long-tenured homeowners)",
  subcontractors: "Subcontractors / trades",
  "general-homeowner": "General homeowner",
  "b2b-vendor": "B2B vendor / partner",
  "ai-search-crawler": "AI search / crawler",
};

export const CHANNELS = [
  "web-desktop",
  "web-mobile",
  "email",
  "print-collateral",
  "voice-search",
  "ai-overview",
] as const;
export type Channel = (typeof CHANNELS)[number];

export const CHANNEL_LABELS: Record<Channel, string> = {
  "web-desktop": "Web — desktop",
  "web-mobile": "Web — mobile",
  email: "Email",
  "print-collateral": "Print collateral",
  "voice-search": "Voice search",
  "ai-overview": "AI Overview / answer engine",
};

export const CONSTRAINTS = [
  "wcag-aa",
  "motion-restraint",
  "no-sister-fingerprints",
  "bespoke-only",
  "pricing-transparency",
  "local-trust-required",
  "phone-cta-priority",
  "legal-bespoke",
] as const;
export type Constraint = (typeof CONSTRAINTS)[number];

export const CONSTRAINT_LABELS: Record<Constraint, string> = {
  "wcag-aa": "WCAG AA must hold",
  "motion-restraint": "Motion restraint (reduce / disable)",
  "no-sister-fingerprints": "Zero sister-site fingerprints",
  "bespoke-only": "Bespoke (no template patterns)",
  "pricing-transparency": "Pricing transparency required",
  "local-trust-required": "Local trust signals (license / NAP) required",
  "phone-cta-priority": "Phone CTA prioritised over form",
  "legal-bespoke": "Legal pages must be bespoke",
};

// ───────────────────────────────────────────────────────────────────────────
// Enum → routing hints
// Each enum value contributes:
//   - phrases: synthesized into the free-text scorer query
//   - categories: soft category hints
//   - boostRails / requireRails: guard rails the route ought to (or must) cover
// ───────────────────────────────────────────────────────────────────────────

interface RoutingHint {
  phrases: string[];
  categories: DecisionCategory[];
  boostRails: GuardRailId[];
  requireRails?: GuardRailId[];
}

export const PAGE_SECTION_HINTS: Record<PageSection, RoutingHint> = {
  "home-hero": {
    phrases: ["hero headline", "hero CTA microcopy", "tagline", "h1 for the hero"],
    categories: ["brand-style", "voice-copy", "conversion"],
    boostRails: ["gr-bespoke-brand-derivation", "gr-anti-paraphrase-readability"],
  },
  "home-body": {
    phrases: ["top-level promise on the home page", "section composition"],
    categories: ["strategy-positioning", "ux-layout"],
    boostRails: ["gr-bespoke-style-guide-live"],
  },
  "service-page": {
    phrases: ["service page", "layout for", "trust signals where"],
    categories: ["ux-layout", "conversion", "seo"],
    boostRails: ["gr-page-meta-jsonld-unique", "gr-real-business-signals"],
  },
  "service-area-page": {
    phrases: ["areas we serve", "service area page", "neighborhoods", "local SEO list"],
    categories: ["seo"],
    boostRails: ["gr-areas-we-serve-excellence", "gr-local-trust-schema"],
    requireRails: ["gr-areas-we-serve-excellence"],
  },
  about: {
    phrases: ["about page promise", "founder promise", "mission statement"],
    categories: ["brand-style", "voice-copy", "strategy-positioning"],
    boostRails: ["gr-real-business-signals"],
  },
  legal: {
    phrases: ["legal", "warranty", "privacy", "terms"],
    categories: ["trust-legal"],
    boostRails: ["gr-legal-pages-bespoke"],
    requireRails: ["gr-legal-pages-bespoke"],
  },
  "partners-vendors": {
    phrases: ["partners page", "subcontractor signup", "partner application", "vendor onboarding"],
    categories: ["persona-icp", "conversion"],
    boostRails: ["gr-booking-one-tap"],
  },
  footer: {
    phrases: ["footer architecture", "footer columns", "footer trust signals"],
    categories: ["ux-layout", "trust-legal"],
    boostRails: ["gr-real-business-signals", "gr-zero-sister-fingerprints"],
  },
  "forms-booking": {
    phrases: ["form layout", "field count", "form steps", "booking copy"],
    categories: ["conversion", "ux-layout"],
    boostRails: ["gr-booking-one-tap", "gr-wcag-aa"],
  },
  "style-guide": {
    phrases: ["style guide", "type pair", "palette derivation", "typography philosophy"],
    categories: ["brand-style"],
    boostRails: ["gr-bespoke-style-guide-live"],
    requireRails: ["gr-bespoke-style-guide-live"],
  },
  "blog-faq": {
    phrases: ["FAQ block", "people also ask", "common questions"],
    categories: ["seo", "voice-copy"],
    boostRails: ["gr-page-meta-jsonld-unique"],
  },
  "meta-seo": {
    phrases: ["meta title", "meta description", "schema", "json-ld", "structured data"],
    categories: ["seo"],
    boostRails: ["gr-page-meta-jsonld-unique", "gr-crawl-hygiene"],
    requireRails: ["gr-page-meta-jsonld-unique"],
  },
};

export const AUDIENCE_HINTS: Record<Audience, RoutingHint> = {
  mothers: {
    phrases: [
      "mother",
      "family decision-maker",
      "hero / service-page copy for a family decision-maker",
      "pricing transparency on family-facing pages",
    ],
    categories: ["persona-icp", "conversion", "voice-copy"],
    boostRails: ["gr-real-business-signals", "gr-bespoke-style-guide-live"],
  },
  grandfathers: {
    phrases: [
      "grandfather",
      "long-tenured homeowner copy",
      "older user accessibility",
      "phone CTA vs form CTA",
      "plainspoken copy",
    ],
    categories: ["persona-icp", "ux-layout", "trust-legal"],
    boostRails: ["gr-wcag-aa", "gr-motion-system-pinned"],
  },
  subcontractors: {
    phrases: [
      "subcontractor signup",
      "trade vendor onboarding",
      "partner application",
      "tradesperson copy",
    ],
    categories: ["persona-icp", "conversion"],
    boostRails: ["gr-booking-one-tap"],
  },
  "general-homeowner": {
    phrases: ["homeowner form", "booking copy"],
    categories: ["persona-icp", "conversion"],
    boostRails: ["gr-real-business-signals"],
  },
  "b2b-vendor": {
    phrases: ["B2B copy", "vendor email", "partner portal"],
    categories: ["persona-icp", "conversion"],
    boostRails: [],
  },
  "ai-search-crawler": {
    phrases: ["AI search", "ChatGPT visibility", "Perplexity citation", "AI Overview"],
    categories: ["seo"],
    boostRails: ["gr-page-meta-jsonld-unique", "gr-local-trust-schema"],
  },
};

export const CHANNEL_HINTS: Record<Channel, RoutingHint> = {
  "web-desktop": {
    phrases: ["layout for"],
    categories: ["ux-layout"],
    boostRails: [],
  },
  "web-mobile": {
    phrases: ["mobile defaults", "viewport behavior", "touch targets", "9pm phone read"],
    categories: ["ux-layout", "performance"],
    boostRails: ["gr-performance-budget-mobile", "gr-wcag-aa"],
  },
  email: {
    phrases: ["vendor email"],
    categories: ["voice-copy"],
    boostRails: [],
  },
  "print-collateral": {
    phrases: ["print"],
    categories: ["brand-style"],
    boostRails: ["gr-bespoke-brand-derivation"],
  },
  "voice-search": {
    phrases: ["voice search", "common questions"],
    categories: ["seo"],
    boostRails: ["gr-page-meta-jsonld-unique"],
  },
  "ai-overview": {
    phrases: ["AI Overview", "AI search", "Perplexity citation"],
    categories: ["seo"],
    boostRails: ["gr-page-meta-jsonld-unique", "gr-local-trust-schema"],
  },
};

export const CONSTRAINT_HINTS: Record<Constraint, RoutingHint> = {
  "wcag-aa": {
    phrases: ["contrast review", "type size defaults", "older user accessibility"],
    categories: ["ux-layout", "trust-legal"],
    boostRails: ["gr-wcag-aa"],
    requireRails: ["gr-wcag-aa"],
  },
  "motion-restraint": {
    phrases: ["motion restraint", "tone the animation down", "should this animate"],
    categories: ["ux-layout"],
    boostRails: ["gr-motion-system-pinned"],
    requireRails: ["gr-motion-system-pinned"],
  },
  "no-sister-fingerprints": {
    phrases: ["is this trade remix on-mission", "is this on-brand at the visual register level"],
    categories: ["brand-style", "strategy-positioning"],
    boostRails: ["gr-zero-sister-fingerprints"],
    requireRails: ["gr-zero-sister-fingerprints"],
  },
  "bespoke-only": {
    phrases: ["is this bespoke or templated"],
    categories: ["brand-style", "ux-layout"],
    boostRails: ["gr-bespoke-style-guide-live", "gr-bespoke-brand-derivation"],
  },
  "pricing-transparency": {
    phrases: ["show pricing or hide it", "how transparent on pricing", "ranges vs quotes"],
    categories: ["strategy-positioning", "conversion"],
    boostRails: ["gr-real-business-signals"],
  },
  "local-trust-required": {
    phrases: ["license / insurance / NAP placement", "license / insurance / NAP propagation"],
    categories: ["trust-legal", "seo"],
    boostRails: ["gr-local-trust-schema", "gr-real-business-signals"],
    requireRails: ["gr-real-business-signals"],
  },
  "phone-cta-priority": {
    phrases: ["phone CTA vs form CTA"],
    categories: ["conversion", "persona-icp"],
    boostRails: ["gr-booking-one-tap"],
  },
  "legal-bespoke": {
    phrases: ["legal", "warranty", "privacy", "terms"],
    categories: ["trust-legal"],
    boostRails: ["gr-legal-pages-bespoke"],
    requireRails: ["gr-legal-pages-bespoke"],
  },
};

// ───────────────────────────────────────────────────────────────────────────
// Schema (Zod)
// ───────────────────────────────────────────────────────────────────────────

const decisionCategoryEnum = z.enum([
  "seo",
  "brand-style",
  "voice-copy",
  "persona-icp",
  "conversion",
  "ux-layout",
  "performance",
  "trust-legal",
  "strategy-positioning",
  "architecture-backend",
]);

export const DecisionInputSchema = z.object({
  goal: z
    .string()
    .trim()
    .min(3, { message: "Describe the goal in at least 3 characters." })
    .max(240, { message: "Keep the goal under 240 characters." }),
  pageSection: z.enum(PAGE_SECTIONS).optional(),
  audience: z.array(z.enum(AUDIENCES)).max(6).optional(),
  channel: z.enum(CHANNELS).optional(),
  category: decisionCategoryEnum.optional(),
  constraints: z.array(z.enum(CONSTRAINTS)).max(8).optional(),
  excludeIds: z.array(z.string().min(1)).max(20).optional(),
});

export type DecisionInput = z.infer<typeof DecisionInputSchema>;

export function validateDecisionInput(
  input: unknown,
):
  | { ok: true; value: DecisionInput }
  | { ok: false; errors: Record<string, string> } {
  const parsed = DecisionInputSchema.safeParse(input);
  if (parsed.success) return { ok: true, value: parsed.data };
  const errors: Record<string, string> = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path.join(".") || "_";
    if (!errors[key]) errors[key] = issue.message;
  }
  return { ok: false, errors };
}

/** True if any structured dimension is present (i.e. more than just `goal`). */
export function hasStructuredFilters(input: Partial<DecisionInput>): boolean {
  return Boolean(
    input.pageSection ||
      (input.audience && input.audience.length > 0) ||
      input.channel ||
      input.category ||
      (input.constraints && input.constraints.length > 0) ||
      (input.excludeIds && input.excludeIds.length > 0),
  );
}
