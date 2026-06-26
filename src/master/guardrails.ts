/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GUARD RAILS — the constitution above the checklist
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * The checklist (`src/master/checklist.ts`) describes WHAT to do during a
 * remix. The guard rails describe what MUST be true before a site is allowed
 * to ship. They are non-negotiable, immutable, and ALWAYS apply, on every
 * trade site, every time. If a guard rail fails, the site does not launch —
 * full stop.
 *
 * RELATIONSHIP TO THE CHECKLIST
 *   - Each guard rail is enforced by one or more concrete checklist items
 *     (`enforcedBy`). Those items contain the actual work; the guard rail
 *     simply asserts the law.
 *   - Each checklist item carries a `guardRails?: GuardRailId[]` tag listing
 *     which laws it satisfies. This produces a coverage map: every guard rail
 *     should have at least one enforcing item.
 *   - `getUnenforcedGuardRails()` should return `[]` at all times. Anything
 *     else is a bug in the checklist coverage.
 *
 * PLAN FIRST
 *   - Every `planDepth: "deep"` plan must include a "Guard Rail Compliance
 *     Statement" naming each guard rail it touches and how it satisfies it.
 *     See `playbooks/PLAN_FIRST_DISCIPLINE.md` and `playbooks/GUARD_RAILS.md`.
 *
 * THIS FILE IS PURE TYPED DATA — no runtime side effects, no UI, no I/O.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { CheckId } from "./checklist";

// ───────────────────────────────────────────────────────────────────────────
// IDS — kebab-case, stable, prefixed with `gr-`
// ───────────────────────────────────────────────────────────────────────────

export type GuardRailId =
  // A. Brand & Identity
  | "gr-bespoke-brand-derivation"
  | "gr-bespoke-style-guide-live"
  | "gr-zero-sister-fingerprints"
  | "gr-master-logo-slot-map"
  // B. SEO Depth
  | "gr-areas-we-serve-excellence"
  | "gr-page-meta-jsonld-unique"
  | "gr-crawl-hygiene"
  | "gr-local-trust-schema"
  // C. Performance & Accessibility
  | "gr-performance-budget-mobile"
  | "gr-modern-image-pipeline"
  | "gr-wcag-aa"
  // D. Conversion & Trust
  | "gr-booking-one-tap"
  | "gr-real-business-signals"
  | "gr-legal-pages-bespoke"
  // E. Motion, Copy & Craft
  | "gr-motion-system-pinned"
  | "gr-anti-paraphrase-readability"
  // F. Operational Safety
  | "gr-plan-first-deep-items"
  | "gr-prelaunch-walk-postlaunch-monitor";

export type GuardRailCategory =
  | "brand-identity"
  | "seo-depth"
  | "performance-accessibility"
  | "conversion-trust"
  | "motion-copy-craft"
  | "operational-safety";

export interface GuardRail {
  id: GuardRailId;
  category: GuardRailCategory;
  title: string;
  /** One-sentence non-negotiable law. */
  law: string;
  /** What failure costs the brand — kept short, used in failure reports. */
  why: string;
  /** Concrete artifacts that prove this rail is satisfied. */
  proofRequired: string[];
  /** Checklist items whose completion satisfies this rail. */
  enforcedBy: CheckId[];
  /** Always `true`. Guard rails are blocking by definition. */
  blocking: true;
  /** Optional shell command (ripgrep / script) that fails when the rail is violated. */
  scanCommand?: string;
}

// ───────────────────────────────────────────────────────────────────────────
// THE 18 GUARD RAILS
// ───────────────────────────────────────────────────────────────────────────

export const GUARD_RAILS: GuardRail[] = [
  // ════════════════════════════════════════════════════════════════════
  // A. BRAND & IDENTITY
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-bespoke-brand-derivation",
    category: "brand-identity",
    title: "Bespoke Brand Identity Derivation",
    law: "Every site MUST derive its own complete brand identity (palette, typography pair, motion signature, voice rules, photographic direction) from the master CMB brand bible. No site ships using master tokens unmodified.",
    why: "Without a derived identity, every sister site looks like a re-skin of the same template. Google sees near-duplication, customers see a generic vendor, and the family-legacy story collapses into stock-template feel.",
    proofRequired: [
      "src/config/brand-identity.ts customized for this trade",
      "src/master/brand/IDENTITY_DERIVATION.md (per remix) explaining what was inherited vs. bespoked",
      "Style-guide page renders this trade's tokens, not master tokens",
    ],
    enforcedBy: [
      "brand-trade-config-fully-edited",
      "brand-voice-and-tone-doc-written",
      "brand-typography-pair-locked",
      "brand-style-guide-contrast-matrix-green",
      "intake-color-and-mood-direction",
    ],
    blocking: true,
  },
  {
    id: "gr-bespoke-style-guide-live",
    category: "brand-identity",
    title: "Bespoke Style Guide Live",
    law: "Every site MUST publish an internal `/style-guide` route (noindex) showing its own palette, type scale, spacing, every component in every state, motion samples, and image direction.",
    why: "If the trade's own style guide does not render, there is no proof the brand was actually bespoked — only assertions. The style guide is the receipt.",
    proofRequired: [
      "/style-guide route reachable, noindex meta tag present",
      "Page shows trade-specific palette swatches with HSL values",
      "Page shows every shadcn component in default + hover + focus + disabled + loading states",
      "Page shows motion samples (entry, hover, modal-in, reduced-motion fallback)",
    ],
    enforcedBy: [
      "brand-style-guide-contrast-matrix-green",
      "brand-typography-pair-locked",
      "brand-motion-and-micro-interactions-respected",
      "master-brand-kit-page-live",
    ],
    blocking: true,
  },
  {
    id: "gr-zero-sister-fingerprints",
    category: "brand-identity",
    title: "Zero Sister-Site Fingerprints",
    law: "Codebase scan MUST return zero references to any other trade's name, slug, accent values, photography filenames, or copy paragraphs.",
    why: "Even one stray reference proves the remix was not finished. It also tells Google these sites are templates, not businesses.",
    proofRequired: [
      "Repo scan against every sibling trade slug returns zero hits",
      "Anti-paraphrase audit: ≤40% n-gram overlap on any 100-word window vs. each sister site",
    ],
    enforcedBy: [
      "brand-zero-leftover-references-scan",
      "leftover-drywall-references-zero",
      "copy-anti-paraphrase-audit",
      "copy-unique",
    ],
    blocking: true,
    scanCommand:
      "rg -n -i --hidden -g '!node_modules' -g '!dist' -g '!*.lock' '<sibling-trade-slug-pattern>' src/",
  },
  {
    id: "gr-master-logo-slot-map",
    category: "brand-identity",
    title: "Master Logo Slot Map Honored",
    law: "All logo surfaces use `<MasterLogo slot=\"...\"/>` per `LOGO_SLOT_MAP.md`. Zero direct `<img src=\".../cmb-...png\">` references. Favicon, PWA, and share pack are regenerated for THIS trade.",
    why: "Direct logo imports rot under remix — they hardcode the master file path and skip per-trade variants. The slot map is the only resilient pattern.",
    proofRequired: [
      "Repo scan: zero `<img src=\"/cmb-` or `/master/assets/logo` direct references in app code",
      "Favicon + PWA pack present in /public/ with this trade's identity",
      "/share/ pack present with trade-specific OG card",
    ],
    enforcedBy: [
      "master-logo-slot-map-followed",
      "master-logo-rendering",
      "master-logo-binaries-embedded",
      "master-favicon-pwa-pack-embedded",
      "master-share-pack-embedded",
      "brand-favicon-pwa-pack-regenerated",
      "brand-share-pack-regenerated-with-trade-name",
    ],
    blocking: true,
    scanCommand:
      "rg -n '<img[^>]*src=\"[^\"]*(cmb-|master/assets/logo)' src/",
  },

  // ════════════════════════════════════════════════════════════════════
  // B. SEO DEPTH
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-areas-we-serve-excellence",
    category: "seo-depth",
    title: "Areas-We-Serve Excellence",
    law: "Every site MUST ship a deep, SEO-tailored Areas We Serve system: one indexable page per area in the area spreadsheet, each with bespoke 150+ word intro, area-specific proof, LocalBusiness JSON-LD with `areaServed`, breadcrumbs, and an internal-link matrix back to relevant services. Templated or duplicated area pages are an automatic fail.",
    why: "The area network is the long-term local-SEO moat. Templated area pages are detected by Google as doorway pages and either ignored or penalized.",
    proofRequired: [
      "/areas/[slug] route exists for every row in the area spreadsheet",
      "Each area page has a bespoke intro ≥150 words referencing the actual area",
      "LocalBusiness JSON-LD with `areaServed` validates",
      "Breadcrumbs present with BreadcrumbList JSON-LD",
      "Internal-link matrix audit passes (every area links to top services + back to home)",
    ],
    enforcedBy: [
      "seo-area-pages-every-area-has-page",
      "seo-area-pages-unique-intros",
      "seo-area-pages-localbusiness-areaserved",
      "seo-internal-linking-matrix",
      "service-areas-rendering",
      "copy-service-area-template-and-intros",
    ],
    blocking: true,
  },
  {
    id: "gr-page-meta-jsonld-unique",
    category: "seo-depth",
    title: "Per-Page Title / Meta / JSON-LD Uniqueness",
    law: "Every indexable URL has a unique `<title>` and meta description, plus valid JSON-LD: Organization or LocalBusiness on home, Service on service pages, FAQPage where applicable, BreadcrumbList everywhere. No duplicates within the site or across the sister network.",
    why: "Duplicate metadata signals a templated network. Invalid schema gets dropped silently and we lose rich-result eligibility.",
    proofRequired: [
      "Title + meta uniqueness audit returns zero duplicates",
      "Schema validator passes on every page type (Organization/LocalBusiness/Service/FAQPage/BreadcrumbList)",
      "Cross-network duplicate check passes vs. all sister sites",
    ],
    enforcedBy: [
      "seo-titles-and-metas-unique-per-page",
      "seo-jsonld-organization-localbusiness",
      "seo-jsonld-service-per-service-page",
      "seo-jsonld-faqpage-where-applicable",
      "seo-jsonld-breadcrumblist-everywhere",
      "seo-jsonld-aboutpage",
      "seo-h1-h2-outline-semantic",
    ],
    blocking: true,
  },
  {
    id: "gr-crawl-hygiene",
    category: "seo-depth",
    title: "Crawl Hygiene",
    law: "Every site MUST ship a valid `sitemap.xml` listing every indexable URL, a sane `robots.txt`, canonical URLs on every page, zero orphan pages, and an internal-link matrix where every service ↔ every relevant area, every area ↔ home + parent service.",
    why: "Crawl hygiene determines whether the site even gets fully indexed. Orphan pages waste effort. Bad robots/sitemap configs can deindex the whole site overnight.",
    proofRequired: [
      "sitemap.xml validates and contains every public route",
      "robots.txt does not block production routes",
      "Every page has a self-referential canonical",
      "Orphan-page audit returns zero",
    ],
    enforcedBy: [
      "seo-canonical-urls-set",
      "seo-sitemap-xml-complete",
      "seo-robots-txt-sane",
      "seo-internal-linking-matrix",
      "seo-sister-site-cross-linking",
    ],
    blocking: true,
  },
  {
    id: "gr-local-trust-schema",
    category: "seo-depth",
    title: "Local Trust Schema Rendered",
    law: "NAP (Name / Address / Phone) consistency is verified across the site, footer, schema, and external profiles. LocalBusiness JSON-LD includes address, hours, phone, geo, and `areaServed`. Google Business Profile is claimed and Search Console is verified before launch.",
    why: "Local trust signals are the primary input to map-pack ranking. Inconsistent NAP fragments authority and silently caps local performance.",
    proofRequired: [
      "NAP audit passes (footer, schema, GBP, citations all match)",
      "LocalBusiness JSON-LD validates with required fields",
      "GBP claimed and verified",
      "GSC property verified",
    ],
    enforcedBy: [
      "seo-nap-consistency-audit",
      "seo-google-business-profile-claimed",
      "seo-search-console-verified",
      "seo-bing-webmaster-verified",
      "seo-jsonld-organization-localbusiness",
      "legal-real-address-and-hours",
    ],
    blocking: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // C. PERFORMANCE & ACCESSIBILITY
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-performance-budget-mobile",
    category: "performance-accessibility",
    title: "Performance-First Budget (Mobile)",
    law: "Every site MUST hit a hard mobile budget on a mid-tier Android over 4G: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1, total transferred weight ≤ 1.5 MB on first paint, JS ≤ 200 KB gzipped on the initial route. Fail = no ship.",
    why: "Performance is the floor of UX. Slow sites lose the lead before the brand even loads. Core Web Vitals also feed search rank.",
    proofRequired: [
      "Lighthouse mobile run shows LCP ≤2.5s, INP ≤200ms, CLS ≤0.1 on home + a service page + an area page",
      "Network panel: first-paint transfer ≤1.5MB, JS ≤200KB gz",
      "CrUX / RUM (where available) confirms field data within budget",
    ],
    enforcedBy: [
      "seo-core-web-vitals-pass",
      "qa-performance-budget-mobile-green",
      "qa-postlaunch-cwv-monitor-7-days",
      "visual-image-weight-audit",
      "visual-format-modern-webp-avif",
    ],
    blocking: true,
  },
  {
    id: "gr-modern-image-pipeline",
    category: "performance-accessibility",
    title: "Modern Image Pipeline",
    law: "Every image is WebP or AVIF, sized to the largest viewport that uses it, lazy-loaded below the fold, has explicit width/height to prevent CLS, descriptive alt text, and a trade-specific filename. No PNG/JPG hero >250 KB.",
    why: "Images are the single biggest performance lever. They also drive Image Search traffic when alt text and filenames are honest and trade-specific.",
    proofRequired: [
      "Repo scan: zero images >250KB in hero slots",
      "Every <img> has width + height attributes",
      "Every <img> has descriptive, non-generic alt text",
      "Filename audit: no `image1.jpg`, no sister-trade slugs, no faces/people",
    ],
    enforcedBy: [
      "visual-image-weight-audit",
      "visual-format-modern-webp-avif",
      "visual-alt-text-pass",
      "visual-filename-audit",
      "no-faces-no-people",
    ],
    blocking: true,
  },
  {
    id: "gr-wcag-aa",
    category: "performance-accessibility",
    title: "WCAG 2.2 AA Across The Board",
    law: "Contrast matrix is green for every token pair. Every interactive element has a visible focus state. The booking flow is fully keyboard-reachable. `prefers-reduced-motion` is respected by every signature animation. Heading order is semantic. No meaning is conveyed by color alone.",
    why: "Accessibility is legal exposure AND UX integrity. A site that fails WCAG AA loses real customers, real lawsuits, and brand trust.",
    proofRequired: [
      "axe / Lighthouse accessibility scan: zero serious or critical violations",
      "Manual keyboard walkthrough completes booking with no mouse",
      "Reduced-motion fallback verified on every signature animation",
    ],
    enforcedBy: [
      "qa-wcag-aa-pass",
      "brand-style-guide-contrast-matrix-green",
      "brand-motion-and-micro-interactions-respected",
      "legal-accessibility-statement",
    ],
    blocking: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // D. CONVERSION & TRUST
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-booking-one-tap",
    category: "conversion-trust",
    title: "Booking CTA Reachable In ≤1 Tap From Anywhere",
    law: "The booking modal opens from a sticky/persistent CTA on every page. A `tel:` link is present on mobile. Service auto-prefills when the modal launches from a service page. Mobile time-to-book under 60 seconds, walked on a real device.",
    why: "Every extra tap loses leads. The whole site exists to make this moment frictionless.",
    proofRequired: [
      "Real-device walkthrough on iPhone + Android: home → modal → submit ≤60s",
      "tel: link present on every mobile breakpoint",
      "Service prefill verified from at least 3 service pages",
    ],
    enforcedBy: [
      "conv-booking-modal-from-every-cta",
      "conv-form-fields-minimized",
      "conv-service-prefill-from-service-pages",
      "conv-tel-link-on-every-page",
      "conv-mobile-time-to-book-under-60s",
      "ia-booking-cta-entry-point-map",
    ],
    blocking: true,
  },
  {
    id: "gr-real-business-signals",
    category: "conversion-trust",
    title: "Real Business Signals Rendered",
    law: "License #, insurance, WCB (where applicable), real address, real hours, founder bio, and warranty terms render site-wide (footer + dedicated pages). No placeholder copy. No fabricated certifications.",
    why: "Trust is built on receipts. Vague or fake credentials are detected by buyers AND by Google's spam systems, and they collapse conversion + ranking together.",
    proofRequired: [
      "License/insurance/WCB rendered in footer and on /about or /trust",
      "Real address + hours match GBP and citations",
      "Founder bio with verifiable details (no AI-stock)",
      "Warranty terms page reflects the operator's actual warranty",
    ],
    enforcedBy: [
      "legal-license-insurance-wcb-rendered",
      "legal-real-address-and-hours",
      "legal-warranty-page",
      "seo-eeat-signals-rendered",
      "intake-warranty-and-guarantee-terms",
      "intake-founder-bio-and-work-photos",
    ],
    blocking: true,
  },
  {
    id: "gr-legal-pages-bespoke",
    category: "conversion-trust",
    title: "Legal Pages Bespoke & Accurate",
    law: "Privacy policy, terms of service, cookie notice (if needed), warranty page, and accessibility statement are present, trade-specific, and reviewed. No template paragraphs from sister sites.",
    why: "Boilerplate legal pages are non-binding and read as cheap. They also leak sister-site references that Google flags.",
    proofRequired: [
      "Each legal page exists, is reachable from footer, and is trade-specific",
      "Anti-paraphrase audit on legal pages vs. sister sites returns ≤40% overlap",
    ],
    enforcedBy: [
      "legal-privacy-policy-accurate",
      "legal-terms-of-service-trade-specific",
      "legal-cookie-notice-if-needed",
      "legal-warranty-page",
      "legal-accessibility-statement",
    ],
    blocking: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // E. MOTION, COPY & CRAFT
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-motion-system-pinned",
    category: "motion-copy-craft",
    title: "Motion System Pinned + Reduced-Motion Fallback",
    law: "Easing tokens, duration ladder, and signature interactions are defined in the brand motion system. Every signature animation has a measured `prefers-reduced-motion` fallback. 60 fps verified on a mid-tier Android.",
    why: "Motion without a pinned system feels random. Without a reduced-motion fallback, it harms users and fails accessibility.",
    proofRequired: [
      "Motion tokens (--ease-entry, --ease-spring, durations) exist and are referenced site-wide",
      "Every signature animation has a code-level prefers-reduced-motion branch",
      "DevTools FPS meter ≥60fps on hero, scroll-reveal, modal entry on a mid-tier Android",
    ],
    enforcedBy: [
      "brand-motion-and-micro-interactions-respected",
    ],
    blocking: true,
  },
  {
    id: "gr-anti-paraphrase-readability",
    category: "motion-copy-craft",
    title: "Anti-Paraphrase + Readability Bands",
    law: "Site copy passes the n-gram overlap audit vs. all sister sites (≤40% overlap on any 100-word window) AND lands in the brand-prescribed Flesch readability band (60–75 unless the persona dictates otherwise).",
    why: "Near-duplicate copy across the network kills the moat. Off-band readability either patronizes or alienates the persona.",
    proofRequired: [
      "Anti-paraphrase script returns ≤40% overlap on any 100-word window vs. each sister site",
      "Flesch reading-ease score per page lands in the prescribed band (default 60–75)",
    ],
    enforcedBy: [
      "copy-anti-paraphrase-audit",
      "copy-readability-grade-checked",
      "copy-unique",
    ],
    blocking: true,
  },

  // ════════════════════════════════════════════════════════════════════
  // F. OPERATIONAL SAFETY
  // ════════════════════════════════════════════════════════════════════
  {
    id: "gr-plan-first-deep-items",
    category: "operational-safety",
    title: "Plan-First Discipline Honored on Every Deep Item",
    law: "A written 12-section deep plan (per `PLAN_FIRST_DISCIPLINE.md`, including the Guard Rail Compliance Statement) exists for every `planDepth: \"deep\"` item before any code lands. No retroactive plans.",
    why: "Skipping the plan is how templated work sneaks in. The plan is the proof that brand sources, benchmarks, and guard rails were considered before the keyboard was touched.",
    proofRequired: [
      "Every deep item has a saved plan referencing brand sources + benchmarks + guard rails",
      "PR / commit history shows plan committed before implementation",
    ],
    enforcedBy: ["guardrails-acknowledged"],
    blocking: true,
  },
  {
    id: "gr-prelaunch-walk-postlaunch-monitor",
    category: "operational-safety",
    title: "Pre-Launch Walkthrough + Post-Launch Monitoring Armed",
    law: "A human walks the full site on real desktop AND real mobile before launch. Uptime monitor, runtime error monitor, analytics events, conversion goals, and CWV monitor are live and verified the moment DNS flips.",
    why: "The first 7 days post-launch decide everything: indexation, first reviews, first leads. Going live blind is how brands burn their launch window.",
    proofRequired: [
      "Pre-launch walkthrough log exists (real iPhone + real Android + real desktop browser)",
      "Uptime monitor pinging /, /contact, /booking",
      "Sentry (or equivalent) receiving events from production",
      "Analytics + conversion goals firing on a test booking",
      "CWV monitor recording field data",
    ],
    enforcedBy: [
      "qa-prelaunch-human-walkthrough",
      "qa-analytics-installed-and-events-firing",
      "qa-conversion-goal-configured",
      "qa-postlaunch-search-console-submit",
      "qa-postlaunch-cwv-monitor-7-days",
      "launch-uptime-monitor-configured",
      "launch-error-monitoring-installed",
      "launch-first-30-day-checkin",
    ],
    blocking: true,
  },
];

// ───────────────────────────────────────────────────────────────────────────
// HELPERS — pure, no I/O, no UI
// ───────────────────────────────────────────────────────────────────────────

export const GUARD_RAIL_CATEGORIES: Record<GuardRailCategory, { title: string; description: string }> = {
  "brand-identity": {
    title: "Brand & Identity",
    description: "The site must look, feel, and sound like THIS trade — never like a re-skin.",
  },
  "seo-depth": {
    title: "SEO Depth",
    description: "Search is the moat. Every page indexable, schema-rich, locally relevant, with a deep area network.",
  },
  "performance-accessibility": {
    title: "Performance & Accessibility",
    description: "Fast on cheap phones. Usable by everyone. Non-negotiable floors.",
  },
  "conversion-trust": {
    title: "Conversion & Trust",
    description: "Make booking frictionless and trust visible. Real receipts, no placeholders.",
  },
  "motion-copy-craft": {
    title: "Motion, Copy & Craft",
    description: "What users feel. Pinned motion system, bespoke copy, brand-prescribed readability.",
  },
  "operational-safety": {
    title: "Operational Safety",
    description: "Plans before code. Monitoring before DNS flips. No blind launches.",
  },
};

export const getGuardRailById = (id: GuardRailId): GuardRail | undefined =>
  GUARD_RAILS.find((g) => g.id === id);

export const getGuardRailsByCategory = (category: GuardRailCategory): GuardRail[] =>
  GUARD_RAILS.filter((g) => g.category === category);

/**
 * For each guard rail, return the list of CheckIds that enforce it.
 * Built directly from the GUARD_RAILS table (`enforcedBy`).
 */
export const getGuardRailCoverage = (): Record<GuardRailId, CheckId[]> => {
  const out = {} as Record<GuardRailId, CheckId[]>;
  for (const g of GUARD_RAILS) out[g.id] = [...g.enforcedBy];
  return out;
};

/**
 * Returns guard rails with zero enforcing checklist items.
 * In a healthy system this MUST always return [].
 */
export const getUnenforcedGuardRails = (): GuardRailId[] =>
  GUARD_RAILS.filter((g) => g.enforcedBy.length === 0).map((g) => g.id);

/**
 * Optional shell scans for guard rails that ship one. Useful for ops hooks
 * (CI, pre-commit). Not auto-executed by this module.
 */
export const getGuardRailScanCommands = (): Array<{ id: GuardRailId; command: string }> =>
  GUARD_RAILS.filter((g): g is GuardRail & { scanCommand: string } => Boolean(g.scanCommand)).map(
    (g) => ({ id: g.id, command: g.scanCommand }),
  );

export const guardRailStats = () => ({
  total: GUARD_RAILS.length,
  byCategory: GUARD_RAILS.reduce<Record<GuardRailCategory, number>>(
    (acc, g) => {
      acc[g.category] = (acc[g.category] ?? 0) + 1;
      return acc;
    },
    {
      "brand-identity": 0,
      "seo-depth": 0,
      "performance-accessibility": 0,
      "conversion-trust": 0,
      "motion-copy-craft": 0,
      "operational-safety": 0,
    },
  ),
  unenforced: getUnenforcedGuardRails(),
});
