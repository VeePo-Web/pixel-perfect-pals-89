/**
 * ═══════════════════════════════════════════════════════════════════════════
 * REMIX CHECKLIST — the definitive roadmap for every Masters sub-service site
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * This is NOT an automated test runner. It is a **typed, phased, tiered plan**
 * that Lovable (or Claude Code) reads to generate deep, in-depth implementation
 * plans for each step of remixing the master template into a fully bespoke
 * trade site (Drywall, Roofing, Plumbing, Electrical, …).
 *
 * HOW TO USE IT
 *   1. The operator uploads the trade brief, service catalogue, areas
 *      spreadsheet, and brand inputs (see Phase 1).
 *   2. For each `CheckItem`, the AI agent reads `description`, the linked
 *      `playbook`, and the `inputsNeeded` list, then generates an in-depth
 *      plan for that step. The agent then executes the plan.
 *   3. The operator confirms each item before moving on. P0 items are required
 *      to ship; P1 are strong-recommend; P2 is polish.
 *
 * GUARANTEE
 *   Walking this list end-to-end produces a fully bespoke Masters site —
 *   never a re-skinned template. No leftover sister-site fingerprints, every
 *   page SEO-strong, conversion-tuned, and legally clean.
 *
 * SEE ALSO
 *   - src/master/README.md            (how the master folder is organized)
 *   - src/master/playbooks/           (deep-dive guides for each phase)
 *   - src/master/trades.ts            (the network of sister sites)
 *   - src/master/brand/BRAND_BIBLE.md (canonical brand contract)
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ───────────────────────────────────────────────────────────────────────────
// TYPES
// ───────────────────────────────────────────────────────────────────────────

/** Priority tier — drives what's required to ship vs. what's polish. */
export type ChecklistTier = "P0" | "P1" | "P2";

/** Who is responsible for this item. */
export type ChecklistOwner =
  | "ai-plan"   // AI agent generates the plan and executes
  | "human"     // taste / content / legal / commercial decision
  | "hybrid";   // AI drafts, human reviews & edits

/** Phases run in order. Don't start phase N until N-1 is green. */
export type ChecklistPhase =
  | "0-plan-first"
  | "0.5-guardrails-armed"
  | "1-intake"
  | "2-brand"
  | "3-ia"
  | "4-copy"
  | "5-visual"
  | "5b-motion"
  | "6-seo"
  | "7-conversion"
  | "8-legal"
  | "9-launch";

export type ChecklistPlaybook =
  | "REMIX_PLAYBOOK"
  | "BRAND_AUDIT"
  | "AI_IMAGE_RULES"
  | "COPY_GUIDE"
  | "SEO_PLAYBOOK"
  | "PERFORMANCE_PLAYBOOK"
  | "INTAKE_BRIEF"
  | "IA_WIREFRAME_GUIDE"
  | "LEGAL_TRUST_GUIDE"
  | "PLAN_FIRST_DISCIPLINE"
  | "MOTION_AND_CRAFT"
  | "GUARD_RAILS";

/** Legacy grouping (kept for any existing UI consumers). */
export type ChecklistGroupLegacy = "setup" | "brand" | "content" | "seo" | "quality";

/**
 * Every check id. Names are kebab-case and stable — UIs and reports key off them.
 * The original 30 ids from the v1 checklist are preserved at the top so any
 * existing consumers keep working.
 */
export type CheckId =
  // ── v1 ids (preserved) ────────────────────────────────────────────────
  | "wireframe-matches"
  | "trade-config-edited"
  | "palette-swapped"
  | "logo-generated"
  | "master-logo-rendering"
  | "master-logo-colorway-set"
  | "master-logo-binaries-embedded"
  | "master-emblem-binaries-embedded"
  | "master-tiles-binaries-embedded"
  | "master-monogram-binaries-embedded"
  | "master-wordmark-binaries-embedded"
  | "master-wordmark-ground-binaries-embedded"
  | "master-favicon-pwa-pack-embedded"
  | "master-share-pack-embedded"
  | "master-brand-bible-embedded"
  | "master-brand-kit-page-live"
  | "master-source-artwork-archived"
  | "master-logo-slot-map-followed"
  | "copy-unique"
  | "story-rewritten"
  | "brand-audit-passed"
  | "ai-images-generated"
  | "no-faces-no-people"
  | "perf-budget-green"
  | "navigation-lean"
  | "service-bespoke"
  | "service-areas-rendering"
  | "sister-backlinks-present"
  | "booking-routes-to-master-email"
  | "sitemap-generated"
  | "og-image-generated"
  | "favicon-generated"
  | "schema-localbusiness-present"
  | "leftover-drywall-references-zero"

  // ── Phase 1: Intake & Trade Foundation ───────────────────────────────
  | "intake-trade-master-brief"
  | "intake-service-catalogue"
  | "intake-service-area-spreadsheet"
  | "intake-sister-backlink-map"
  | "intake-compliance-docs"
  | "intake-founder-bio-and-work-photos"
  | "intake-competitor-audit"
  | "intake-color-and-mood-direction"
  | "intake-pricing-model-and-quote-policy"
  | "intake-warranty-and-guarantee-terms"
  | "intake-do-and-dont-list"

  // ── Phase 2: Brand & Identity Bespoking ──────────────────────────────
  | "brand-trade-config-fully-edited"
  | "brand-logo-colorway-verified"
  | "brand-trade-sub-wordmark-generated"
  | "brand-favicon-pwa-pack-regenerated"
  | "brand-share-pack-regenerated-with-trade-name"
  | "brand-voice-and-tone-doc-written"
  | "brand-zero-leftover-references-scan"
  | "brand-style-guide-contrast-matrix-green"
  | "brand-typography-pair-locked"
  | "brand-motion-and-micro-interactions-respected"

  // ── Phase 3: Information Architecture & Wireframes ───────────────────
  | "ia-sitemap-drafted"
  | "ia-page-wireframes-approved"
  | "ia-navigation-locked"
  | "ia-footer-architecture-locked"
  | "ia-booking-cta-entry-point-map"
  | "ia-url-slug-map-locked"
  | "ia-breadcrumb-strategy-defined"
  | "ia-mobile-flow-walked-on-real-device"

  // ── Phase 4: Copy & Storytelling ─────────────────────────────────────
  | "copy-founder-origin-story"
  | "copy-home-hero"
  | "copy-problems-we-solve"
  | "copy-why-us-differentiators"
  | "copy-process-method-walkthrough"
  | "copy-per-service-pages"
  | "copy-about-page"
  | "copy-faq-master-list-20-plus"
  | "copy-service-area-template-and-intros"
  | "copy-microcopy-pass"
  | "copy-cta-sales-pass"
  | "copy-anti-paraphrase-audit"
  | "copy-readability-grade-checked"

  // ── Phase 5: Visual Craft & AI Imagery ───────────────────────────────
  | "visual-hero-set-generated"
  | "visual-per-service-hero"
  | "visual-process-stage-imagery"
  | "visual-before-after-pairs"
  | "visual-ambient-backdrops"
  | "visual-gallery-min-12-shots"
  | "visual-og-card-trade-specific"
  | "visual-image-weight-audit"
  | "visual-alt-text-pass"
  | "visual-filename-audit"
  | "visual-format-modern-webp-avif"

  // ── Phase 6: SEO Depth ───────────────────────────────────────────────
  | "seo-keyword-research-mapped"
  | "seo-titles-and-metas-unique-per-page"
  | "seo-h1-h2-outline-semantic"
  | "seo-canonical-urls-set"
  | "seo-jsonld-organization-localbusiness"
  | "seo-jsonld-service-per-service-page"
  | "seo-jsonld-faqpage-where-applicable"
  | "seo-jsonld-breadcrumblist-everywhere"
  | "seo-jsonld-aboutpage"
  | "seo-area-pages-every-area-has-page"
  | "seo-area-pages-unique-intros"
  | "seo-area-pages-localbusiness-areaserved"
  | "seo-internal-linking-matrix"
  | "seo-sister-site-cross-linking"
  | "seo-external-backlink-targets"
  | "seo-sitemap-xml-complete"
  | "seo-robots-txt-sane"
  | "seo-og-twitter-cards-per-page"
  | "seo-nap-consistency-audit"
  | "seo-google-business-profile-claimed"
  | "seo-search-console-verified"
  | "seo-bing-webmaster-verified"
  | "seo-core-web-vitals-pass"
  | "seo-eeat-signals-rendered"

  // ── Phase 7: Conversion, Forms & Booking ─────────────────────────────
  | "conv-booking-modal-from-every-cta"
  | "conv-form-fields-minimized"
  | "conv-service-prefill-from-service-pages"
  | "conv-tel-link-on-every-page"
  | "conv-email-routes-to-master-inbox-tagged"
  | "conv-success-state-bespoke"
  | "conv-spam-protection-live"
  | "conv-form-analytics-events"
  | "conv-mobile-time-to-book-under-60s"

  // ── Phase 8: Legal, Trust & Compliance ───────────────────────────────
  | "legal-privacy-policy-accurate"
  | "legal-terms-of-service-trade-specific"
  | "legal-cookie-notice-if-needed"
  | "legal-license-insurance-wcb-rendered"
  | "legal-real-address-and-hours"
  | "legal-warranty-page"
  | "legal-accessibility-statement"

  // ── Phase 9: Quality Gate, Analytics & Launch ────────────────────────
  | "qa-wcag-aa-pass"
  | "qa-performance-budget-mobile-green"
  | "qa-cross-browser-smoke-test"
  | "qa-404-and-500-branded"
  | "qa-analytics-installed-and-events-firing"
  | "qa-conversion-goal-configured"
  | "qa-agency-credit-rendered"
  | "qa-master-version-pinned"
  | "qa-trade-added-to-trades-ts"
  | "qa-sister-network-rerendered"
  | "qa-prelaunch-human-walkthrough"
  | "qa-postlaunch-search-console-submit"
  | "qa-postlaunch-cwv-monitor-7-days"

  // ── Phase 0: Plan-First Discipline ───────────────────────────────────
  | "plan-read-brand-bible"
  | "plan-read-brand-identity-northstar"
  | "plan-load-relevant-personas"
  | "plan-read-trade-config"
  | "plan-read-business-overview"
  | "plan-read-reviews-and-fear-dispel"
  | "plan-deep-plan-before-execution"
  | "plan-craft-benchmarks-pinned"
  | "plan-easing-system-pinned"

  // ── Phase 2 additions ────────────────────────────────────────────────
  | "brand-identity-docs-pulled-into-trade"
  | "brand-northstar-tagline-aligned"
  | "brand-style-guide-tokens-respected"
  | "brand-design-plan-honored"

  // ── Phase 3 additions ────────────────────────────────────────────────
  | "ia-content-model-defined"
  | "ia-empty-state-and-loading-state-map"
  | "ia-error-state-map"
  | "ia-thumb-zone-audit"
  | "ia-z-pattern-and-f-pattern-audit"

  // ── Phase 4 additions ────────────────────────────────────────────────
  | "copy-testimonials-real-with-name-city"
  | "copy-fear-dispel-block-applied"
  | "copy-discovery-framework-followed"
  | "copy-power-words-from-northstar"
  | "copy-ideal-customer-voice-applied"

  // ── Phase 5 additions (Fantasy.co / Apple-grade visual) ──────────────
  | "visual-editorial-rhythm-applied"
  | "visual-apple-grade-hero-treatment"
  | "visual-fantasy-co-grade-detail-pass"
  | "visual-cinematic-image-reveals"
  | "visual-parallax-coverage-correct"
  | "visual-typographic-rhythm-locked"
  | "visual-color-temperature-consistency"
  | "visual-asymmetric-grid-where-warranted"

  // ── Phase 5b: Motion & Interaction Craft (FROG-level) ────────────────
  | "motion-philosophy-doc-written"
  | "motion-easing-system-tokens-defined"
  | "motion-page-transition-implemented"
  | "motion-hover-microinteractions"
  | "motion-scroll-choreography"
  | "motion-cursor-aware-effects"
  | "motion-loading-sequence-bespoke"
  | "motion-form-submission-signature"
  | "motion-prefers-reduced-motion-fallbacks"
  | "motion-button-tactile-feedback"
  | "motion-modal-entry-and-exit"
  | "motion-frame-budget-respected"
  | "motion-link-and-card-interactions"
  | "motion-focus-states-considered"

  // ── Phase 6 additions ────────────────────────────────────────────────
  | "seo-image-sitemap-generated"
  | "seo-hreflang-if-multilingual"
  | "seo-soft-404-monitor-set-up"

  // ── Phase 7 additions ────────────────────────────────────────────────
  | "conv-multi-step-form-progress-indicator"
  | "conv-trust-elements-near-cta"
  | "conv-sms-fallback-considered"
  | "conv-callback-promise-rendered"

  // ── Phase 8 additions ────────────────────────────────────────────────
  | "legal-real-testimonials-with-permission"
  | "legal-photo-permission-trail"

  // ── Phase 9 additions ────────────────────────────────────────────────
  | "launch-uptime-monitor-configured"
  | "launch-error-monitoring-installed"
  | "launch-review-request-flow-armed"
  | "launch-content-cadence-plan"
  | "launch-first-30-day-checkin"
  // ── Phase 0.5 — Guard Rails Armed ─────────────────────────────────────
  | "guardrails-acknowledged"
  | "guardrails-coverage-map-generated";

export interface CheckItem {
  id: CheckId;
  /** Human-readable label for dashboards. */
  label: string;
  /** Plan-able description — rich enough for an AI agent to expand into a deep plan. */
  description: string;
  /** Phase ordering. Don't start phase N until N-1 is green. */
  phase: ChecklistPhase;
  /** Required to ship (P0), strongly recommended (P1), or polish (P2). */
  tier: ChecklistTier;
  /** Who owns this step. */
  owner: ChecklistOwner;
  /** Linked deep-dive playbook. AI consults this before planning. */
  playbook?: ChecklistPlaybook;
  /** Concrete inputs the operator must supply before the AI can plan this. */
  inputsNeeded?: string[];
  /** Legacy group, kept for any existing dashboard UI. */
  group: ChecklistGroupLegacy;
  /**
   * `true` if a deterministic check could verify this (regex scan, schema parse,
   * file presence). Currently informational only — no auto-runner is wired.
   */
  automated?: boolean;
  /**
   * Brand-truth source files the AI MUST read before drafting a plan for this
   * item. Paths are relative to the repo root. Forces every plan to inherit
   * from the existing brand stack rather than improvise.
   * See PLAN_FIRST_DISCIPLINE.md for the canonical load order.
   */
  brandSources?: string[];
  /**
   * External craft benchmarks the AI should study before drafting visual or
   * motion plans. Pinned URLs (Apple, Fantasy.co, Linear, FROG, Stripe,
   * Christopher Gawryletz). See MOTION_AND_CRAFT.md for the full library.
   */
  craftBenchmarks?: string[];
  /**
   * `"deep"` — the AI must produce the 11-section deep plan from
   * PLAN_FIRST_DISCIPLINE.md before writing any code.
   * `"standard"` — a paragraph-level plan referencing brand sources is enough.
   * Defaults to `"standard"` when omitted.
   */
  planDepth?: "deep" | "standard";
  /**
   * Guard rails this item helps satisfy. Each entry is a `GuardRailId` from
   * `src/master/guardrails.ts`. Used to compute coverage — every guard rail
   * should have at least one enforcing item. Stored as `string[]` here to
   * avoid a circular import; `guardrails.ts` is the source of truth.
   * See `playbooks/GUARD_RAILS.md`.
   */
  guardRails?: string[];
}

export const CHECKLIST_PHASES = [
  "0-plan-first",
  "0.5-guardrails-armed",
  "1-intake",
  "2-brand",
  "3-ia",
  "4-copy",
  "5-visual",
  "5b-motion",
  "6-seo",
  "7-conversion",
  "8-legal",
  "9-launch",
] as const;

export const CHECKLIST_PHASE_META: Record<
  ChecklistPhase,
  { title: string; goal: string; gate: string }
> = {
  "0-plan-first": {
    title: "Plan-First Discipline",
    goal: "Read the brand stack, pin craft benchmarks, and produce a deep plan BEFORE writing code.",
    gate: "Brand bible + identity + relevant personas read; deep plan written for every planDepth:'deep' item; benchmarks pinned.",
  },
  "0.5-guardrails-armed": {
    title: "Guard Rails Armed",
    goal: "Acknowledge the 18 non-negotiable laws and produce a per-trade coverage map BEFORE intake. The constitution must be loaded before work begins.",
    gate: "GUARD_RAILS.md read in full; per-trade guardrails-coverage.md committed; getUnenforcedGuardRails() returns [].",
  },
  "1-intake": {
    title: "Intake & Trade Foundation",
    goal: "Capture everything bespoke about THIS trade before touching code.",
    gate: "Every intake doc uploaded; no fabricated facts downstream.",
  },
  "2-brand": {
    title: "Brand & Identity Bespoking",
    goal: "Every visible brand decision matched to THIS trade — zero leftover fingerprints.",
    gate: "Repo scan shows zero references to any prior trade; /brand + /style-guide green.",
  },
  "3-ia": {
    title: "Information Architecture & Wireframes",
    goal: "Pages and structure designed for THIS trade before any copy is written.",
    gate: "Sitemap, navigation, footer, URL map, and CTA entry-points are signed off.",
  },
  "4-copy": {
    title: "Copy & Storytelling",
    goal: "Every word bespoke. Zero paraphrasing between sister sites — Google penalizes it.",
    gate: "Anti-paraphrase audit passes; readability grade in target band; no Lorem.",
  },
  "5-visual": {
    title: "Visual Craft & AI Imagery",
    goal: "Photography ultra-realistic, no faces/people, every slot filled with trade-specific imagery.",
    gate: "Every image swapped, alt-texted, weight-audited, modern format.",
  },
  "5b-motion": {
    title: "Motion & Interaction Craft (FROG-level)",
    goal: "Apple-grade restraint, Linear-grade easing, FROG-grade tactility — what users FEEL, not just see.",
    gate: "Easing system pinned, every signature motion has a reduced-motion fallback, 60fps on mid-tier mobile.",
  },
  "6-seo": {
    title: "SEO Depth",
    goal: "Search is the moat. Every page indexable, schema-rich, locally relevant.",
    gate: "Per-page titles/metas/JSON-LD live; every area has its page; CWV pass.",
  },
  "7-conversion": {
    title: "Conversion, Forms & Booking",
    goal: "Make the booking flow frictionless from any CTA on any device.",
    gate: "Mobile time-to-book < 60s; events fire; emails land tagged.",
  },
  "8-legal": {
    title: "Legal, Trust & Compliance",
    goal: "Real business signals: privacy, terms, license, insurance, warranty, address, hours.",
    gate: "Every legal page accurate; trust signals rendered site-wide.",
  },
  "9-launch": {
    title: "Quality Gate, Analytics & Launch",
    goal: "Final QA, analytics live, sister network re-rendered, post-launch monitoring planned.",
    gate: "All P0 across phases 1–8 green; pre-launch walkthrough complete; sitemap submitted.",
  },
};

// ───────────────────────────────────────────────────────────────────────────
// THE CHECKLIST
// ───────────────────────────────────────────────────────────────────────────

export const REMIX_CHECKLIST: CheckItem[] = [
  // ════════════════════════════════════════════════════════════════════
  // PHASE 1 — INTAKE & TRADE FOUNDATION
  // ════════════════════════════════════════════════════════════════════
  {
    id: "intake-trade-master-brief",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Trade master brief uploaded",
    description:
      "Operator uploads a single brief covering: legal business name, trading name, kebab-case slug, parent category (interior-finishing | exterior | structural | mechanical | electrical | landscape | specialty), founding story (≥150 words), 3–5 USPs, pricing model (hourly | fixed | per-sqft | quote-based), scope of work (what they DO), explicit list of what they REFUSE to do, target customer profile, and 5-year vision. Without this brief, every downstream item is guesswork.",
    inputsNeeded: ["Trade brief document (.md / .pdf / .docx)"],
  },
  {
    id: "intake-service-catalogue",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Service catalogue uploaded",
    description:
      "Spreadsheet or doc listing every service + sub-service with: scope description, what's included, what's NOT included, materials/brands used, typical timeline, price band (low/mid/high), seasonality, prerequisites. This drives Phase 4 service-page copy and Phase 6 keyword mapping.",
    inputsNeeded: ["Service catalogue spreadsheet"],
  },
  {
    id: "intake-service-area-spreadsheet",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Service-area master spreadsheet uploaded",
    description:
      "Spreadsheet with EVERY city, town, hamlet, and neighborhood served — columns: name, type (city/town/neighborhood), priority rank (1=primary, 2=secondary, 3=opportunistic), distance/drive-time from HQ, lat/lng if available, notable landmarks or local references. Drives Phase 6 area-page generation (one page per area, never templated intros).",
    inputsNeeded: ["Service-area spreadsheet"],
  },
  {
    id: "intake-sister-backlink-map",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Sister-site backlink map confirmed",
    description:
      "From the master spreadsheet plan: which other Masters sites should backlink to this one and vice versa. Each row: source site, target site, anchor-text variants (3+), placement (footer | body | area-page widget). Drives Phase 6 cross-linking and Phase 9 sister-network re-render.",
    inputsNeeded: ["Backlink plan rows from master spreadsheet"],
  },
  {
    id: "intake-compliance-docs",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Compliance documents collected",
    description:
      "License number, WCB / workers' comp number, liability insurance certificate (carrier + policy #), trade-specific certifications, any required municipal permits language. Drives Phase 8 legal/trust render and Phase 6 E-E-A-T signals.",
    inputsNeeded: ["License #", "Insurance certificate", "WCB #", "Certification list"],
  },
  {
    id: "intake-founder-bio-and-work-photos",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Founder bio + real photos of work collected",
    description:
      "Short founder bio (≥120 words: years in trade, why they started, philosophy) + a folder of REAL photos of completed work (no faces, no people — per master image rule). Real work photos are gold for Phase 5 gallery and Phase 6 E-E-A-T.",
    inputsNeeded: ["Founder bio text", "Folder of work photos (no people)"],
  },
  {
    id: "intake-competitor-audit",
    phase: "1-intake", tier: "P1", owner: "hybrid", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Competitor audit (3 best-in-class sites)",
    description:
      "Pick 3 best-in-class sites in this trade (local + national). For each: full-page screenshot, what they do well (hero, trust, services, booking, copy tone), what they do poorly. Used to set the bar for Phase 3 IA and Phase 4 copy without copying.",
    inputsNeeded: ["3 competitor URLs"],
  },
  {
    id: "intake-color-and-mood-direction",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "BRAND_AUDIT",
    label: "Color & mood direction chosen",
    description:
      "One accent HSL chosen for this trade (overrides master default only if justified). Hero mood: residential | industrial | luxury | utilitarian. Photography palette: warm | cool | neutral. Documented in trade.config.ts comment.",
    inputsNeeded: ["Accent HSL", "Mood word", "Photography palette word"],
  },
  {
    id: "intake-pricing-model-and-quote-policy",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "INTAKE_BRIEF",
    label: "Pricing model & quote policy locked",
    description:
      "Are quotes free? In-person required? Same-day callback? Min job size? Travel charge outside primary area? Drives Phase 4 microcopy and Phase 7 booking modal copy.",
    inputsNeeded: ["Pricing & quote policy answers"],
  },
  {
    id: "intake-warranty-and-guarantee-terms",
    phase: "1-intake", tier: "P0", owner: "human", group: "setup",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Warranty & guarantee terms collected",
    description:
      "Years covered, what's covered, what's NOT, claim process, transferability. Drives Phase 8 warranty page + Phase 4 trust copy.",
    inputsNeeded: ["Warranty terms document"],
  },
  {
    id: "intake-do-and-dont-list",
    phase: "1-intake", tier: "P1", owner: "human", group: "setup",
    playbook: "COPY_GUIDE",
    label: "Voice do's & don'ts list",
    description:
      "5 things this trade SHOULD say (e.g. 'plumb-and-true'), 5 things it must NEVER say (jargon, slang, claims it can't back). Feeds Phase 2 voice doc and Phase 4 anti-paraphrase audit.",
    inputsNeeded: ["Do/don't list (10 lines)"],
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 2 — BRAND & IDENTITY BESPOKING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "brand-trade-config-fully-edited",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "REMIX_PLAYBOOK",
    label: "trade.config.ts fully edited",
    description:
      "Identity (name, shortName, trade slug, tagline, location, founded, logoColorway), contact (email, phone, address, hours), services array (from intake catalogue), palette accent HSL, SEO title (≤60 char) and description (≤155 char), voice arrays. Every field traceable to a Phase 1 input.",
  },
  {
    id: "brand-logo-colorway-verified",
    phase: "2-brand", tier: "P0", owner: "hybrid", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Logo colorway verified at /brand",
    description:
      "logoColorway is one of black | navy | white. Verified against nav, footer, hero, OG, and favicon surfaces using /brand contrast preview. Per-surface overrides via <MasterLogo colorway='…' /> documented if used.",
  },
  {
    id: "brand-trade-sub-wordmark-generated",
    phase: "2-brand", tier: "P1", owner: "ai-plan", group: "brand",
    playbook: "REMIX_PLAYBOOK",
    label: "Per-trade sub-wordmark generated (if needed)",
    description:
      "If the master CMB lockup needs a trade-specific sub-wordmark (e.g. 'Cochrane Roofing' under the diamond), generate it via the trade-logo edge function using the master logo as reference. Save to /public/ and wire via trade-config override.",
  },
  {
    id: "brand-favicon-pwa-pack-regenerated",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Favicon + PWA pack matches chosen colorway",
    description:
      "Confirm the master favicon ladder (16/32/48/64/96/128/144/152/180/192/256/512) + reverse-colorway ladder are the right colorway for this trade and that index.html + site.webmanifest reference them. Re-generate only if colorway changed from master default.",
  },
  {
    id: "brand-share-pack-regenerated-with-trade-name",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Share pack carries trade name",
    description:
      "OG (1200×630), Twitter (1200×600), LinkedIn (1584×396), Instagram (1080×1080), Profile (400×400) cards all show this trade's name and tagline (not the master 'CMB' default). Wire og:image / twitter:image meta to navy 1200×630.",
  },
  {
    id: "brand-voice-and-tone-doc-written",
    phase: "2-brand", tier: "P0", owner: "hybrid", group: "brand",
    playbook: "COPY_GUIDE",
    label: "Voice & tone doc written for this trade",
    description:
      "1-pager: 5 do's, 5 don'ts, sample paragraph (3 sentences), 5 power words, 5 banned words. Lives at src/master/brand/<trade>/voice.md and is referenced by every Phase 4 copy plan.",
  },
  {
    id: "brand-zero-leftover-references-scan",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "Zero leftover references from prior trade",
    description:
      "rg the entire repo (excluding /master/) for: previous trade name, previous services, previous city-quirks, previous accent hex/HSL, previous OG copy. Every hit must be 0 or explicitly justified. Run before Phase 4 begins.",
  },
  {
    id: "brand-style-guide-contrast-matrix-green",
    phase: "2-brand", tier: "P0", owner: "human", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    label: "/style-guide contrast matrix all-green",
    description:
      "Visit /style-guide. Every text-on-surface combo passes WCAG AA (4.5:1 body, 3:1 large). If any chip is red, adjust accent or surface tokens before continuing.",
  },
  {
    id: "brand-typography-pair-locked",
    phase: "2-brand", tier: "P1", owner: "human", group: "brand",
    playbook: "BRAND_AUDIT",
    label: "Typography pair locked (or master inherited)",
    description:
      "Default = master pair (Space Grotesk display + Jost body per memory). Override only with documented reason. If overridden, update index.html font links and trade.config typography block.",
  },
  {
    id: "brand-motion-and-micro-interactions-respected",
    phase: "2-brand", tier: "P1", owner: "human", group: "brand",
    playbook: "BRAND_AUDIT",
    label: "Motion philosophy respected",
    description:
      "Master cinematic motion (light reveals material, cloth-wipe transitions, reduced-motion respected) inherited unless trade explicitly demands a different feel. Document any deviation.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 3 — INFORMATION ARCHITECTURE & WIREFRAMES
  // ════════════════════════════════════════════════════════════════════
  {
    id: "ia-sitemap-drafted",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Sitemap drafted",
    description:
      "Pages: / (home), /services (index), /services/<slug> per service, /areas (index), /areas/<slug> per area cluster, /about, /story, /process, /gallery, /faq, /contact, /privacy, /terms, /warranty, /accessibility. Confirm count matches Phase 1 service catalogue + area spreadsheet.",
  },
  {
    id: "ia-page-wireframes-approved",
    phase: "3-ia", tier: "P0", owner: "hybrid", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Page wireframes approved",
    description:
      "Per page: section order, hero pattern, trust block placement, CTA placement, footer variant. Low-fi sketch or Figma is fine. Approval gates Phase 4 copy generation.",
  },
  {
    id: "ia-navigation-locked",
    phase: "3-ia", tier: "P0", owner: "human", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Navigation locked (≤6 top items)",
    description:
      "Top nav items, order, mobile drawer order. Master rule: 6 max. Resist 'one more link' — link from footer instead.",
  },
  {
    id: "ia-footer-architecture-locked",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Footer architecture locked",
    description:
      "Three-tier (per master memory): Top (brand + CTA), Middle (nav columns: services / areas / company / legal / sister sites), Bottom (license #, insurance #, NAP, agency credit, year).",
  },
  {
    id: "ia-booking-cta-entry-point-map",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Booking CTA entry-point map",
    description:
      "Document EVERY CTA in the site that opens the booking modal. Each row: page, section, button copy, pre-filled service slug (if any). Phase 7 audits against this map.",
  },
  {
    id: "ia-url-slug-map-locked",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "URL / slug map locked",
    description:
      "Clean, lowercase, hyphenated, keyword-aware slugs. No /page-2 patterns, no IDs in URLs. Trailing-slash policy (chosen + consistent) documented. Drives Phase 6 sitemap + canonicals.",
  },
  {
    id: "ia-breadcrumb-strategy-defined",
    phase: "3-ia", tier: "P1", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Breadcrumb strategy defined",
    description:
      "Where breadcrumbs render (services, areas, individual service/area pages). BreadcrumbList JSON-LD on every level-2+ page.",
  },
  {
    id: "ia-mobile-flow-walked-on-real-device",
    phase: "3-ia", tier: "P1", owner: "human", group: "quality",
    label: "Mobile flow walked on a real device",
    description:
      "Open the wireframes on a real phone (390px viewport target per memory). Tap every nav item, scroll every page. Confirm thumb-zones and safe-area before copy lands.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 4 — COPY & STORYTELLING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "copy-founder-origin-story",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Founder origin story (≥250 words, bespoke)",
    description:
      "Drafted from Phase 1 founder bio. ≥250 words. This trade's pain points, this trade's wins. Voice matches Phase 2 doc. NEVER paraphrased from a sister site.",
    inputsNeeded: ["Founder bio (Phase 1)"],
  },
  {
    id: "copy-home-hero",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Home hero copy bespoke",
    description:
      "Headline (≤8 words, benefit-led), sub (≤22 words, who/where/proof), primary CTA (verb-led, 2–4 words), secondary CTA (text link). Pass: would a competitor's customer recognize this as obviously NOT from the template?",
  },
  {
    id: "copy-problems-we-solve",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Problems-we-solve block (5–8 trade-specific pains)",
    description:
      "Each pain: 4–8 word headline + 1 sentence elaboration. Pulled from real homeowner language for THIS trade (Phase 7 of competitor audit + founder interview).",
  },
  {
    id: "copy-why-us-differentiators",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Why-us block (3–5 true differentiators with proof)",
    description:
      "Each differentiator must be TRUE and PROVABLE for this trade (license #, years, warranty, certification, response time). No 'family-owned since forever' fluff unless backed.",
  },
  {
    id: "copy-process-method-walkthrough",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Process / method (3–6 stages, this trade's workflow)",
    description:
      "Each stage: name, 1-sentence what-happens, 1-sentence what-the-customer-does. Specific to this trade — drywall stages ≠ roofing stages ≠ plumbing stages.",
  },
  {
    id: "copy-per-service-pages",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Per-service page copy complete",
    description:
      "For each service: hero (headline + sub), scope, what's included, what's NOT included, materials, timeline, price band, FAQ × 5, CTA. Pulled from Phase 1 service catalogue. Each page ≥600 unique words for SEO.",
  },
  {
    id: "copy-about-page",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "About page copy",
    description:
      "Team/founder, values, license/insurance/WCB rendered, warranty summary, service area summary, link to story page.",
  },
  {
    id: "copy-faq-master-list-20-plus",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "FAQ master list (≥20 Q&A)",
    description:
      "Sourced from real customer questions for THIS trade (founder interview + 'People also ask' for top keywords). Each answer 40–120 words. Used by /faq page and as FAQPage JSON-LD on relevant service pages.",
  },
  {
    id: "copy-service-area-template-and-intros",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Service-area template + per-cluster intros",
    description:
      "ONE area-page template (sections), but each area gets a UNIQUE 80–150-word intro referencing local landmarks/neighborhoods from Phase 1 spreadsheet. NEVER ship the same intro on multiple area pages — Google will demote.",
  },
  {
    id: "copy-microcopy-pass",
    phase: "4-copy", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Microcopy pass (forms, buttons, empty/success/404)",
    description:
      "Form labels, placeholders, helper text, button text, empty states, success states, 404 + 500 pages, error toasts. All in voice. No 'Submit' or 'Click here'.",
  },
  {
    id: "copy-cta-sales-pass",
    phase: "4-copy", tier: "P1", owner: "hybrid", group: "content",
    playbook: "COPY_GUIDE",
    label: "Sales-copy pass (AIDA + 'so what?')",
    description:
      "Walk every CTA: scored against AIDA (Attention/Interest/Desire/Action). Walk every section: 'so what?' test — does the user know why they should care by line 3?",
  },
  {
    id: "copy-anti-paraphrase-audit",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", automated: true,
    playbook: "COPY_GUIDE",
    label: "Anti-paraphrase audit vs. sister sites",
    description:
      "For every long-form block (hero sub, why-us, process, about, story, FAQ): diff against sister sites in src/master/trades.ts. Any block with >40% n-gram overlap rewritten. Google's duplicate-content filter is unforgiving.",
  },
  {
    id: "copy-readability-grade-checked",
    phase: "4-copy", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    label: "Readability grade in band (Flesch 60–75)",
    description:
      "Body copy in the 60–75 Flesch reading-ease band (8th–10th grade). Marketing copy can dip lower for punch; legal pages can go higher.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 5 — VISUAL CRAFT & AI IMAGERY
  // ════════════════════════════════════════════════════════════════════
  {
    id: "visual-hero-set-generated",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Hero image set generated (3–5 candidates → 1)",
    description:
      "Generate 3–5 hero candidates per the master AI rules: ultra-realistic, no faces, no people, trade-specific subject (drywall = smooth wall + light, roofing = shingles + sky, plumbing = chrome + water bead). Pick one.",
  },
  {
    id: "visual-per-service-hero",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Per-service hero generated",
    description:
      "Each service page gets its own hero. Same rules. Same mood. Different subject.",
  },
  {
    id: "visual-process-stage-imagery",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Process / method imagery (one per stage)",
    description:
      "Macro detail shots of each process stage. No people. Match master photography palette.",
  },
  {
    id: "visual-before-after-pairs",
    phase: "5-visual", tier: "P0", owner: "hybrid", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Before/after pairs per service",
    description:
      "Real photos preferred (from Phase 1 founder folder). AI fallback only if no real options, and clearly marked as illustrative.",
  },
  {
    id: "visual-ambient-backdrops",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Ambient backdrops / parallax dividers",
    description:
      "Section dividers and parallax sections per master spec (130% height, -15% top offset per memory).",
  },
  {
    id: "visual-gallery-min-12-shots",
    phase: "5-visual", tier: "P1", owner: "human", group: "content",
    label: "Gallery: ≥12 finished-work shots",
    description:
      "Real photos of completed work. Sorted by service category. Each captioned with location (city only, never address) and service.",
  },
  {
    id: "visual-og-card-trade-specific",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "OG card hero swapped to trade-specific",
    description:
      "OG / Twitter / LinkedIn card hero imagery is from THIS trade, not the master template default.",
  },
  {
    id: "visual-image-weight-audit",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Every image < 300KB",
    description:
      "Scan /public + /src/assets. Any image >300KB compressed or re-sized. Hero may go to 500KB only if AVIF.",
  },
  {
    id: "visual-alt-text-pass",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "AI_IMAGE_RULES",
    label: "Alt-text pass (every image)",
    description:
      "Every <img> has descriptive alt. alt='' allowed only for purely decorative. Alt copy includes keyword + context, not stuffing.",
  },
  {
    id: "visual-filename-audit",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Filename audit",
    description:
      "All assets kebab-case, descriptive. No image1.png, no IMG_3492.jpg, no hero-final-FINAL-v2.jpg.",
  },
  {
    id: "visual-format-modern-webp-avif",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Modern image formats (WebP / AVIF)",
    description:
      "Photos served as WebP or AVIF with JPG fallback where needed. PNG only for transparency. SVG for icons/marks.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 6 — SEO DEPTH (the moat)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "seo-keyword-research-mapped",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Keyword research mapped to pages",
    description:
      "Per service: top 10 head terms (e.g. 'roof replacement Cochrane') + 30 long-tails ('asphalt shingle roof replacement cost Cochrane'). Mapped to a specific page. Per area: top 5 'service + area' patterns. Source: founder interview, competitor audit, 'People also ask', autocomplete.",
  },
  {
    id: "seo-titles-and-metas-unique-per-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Unique <title> + meta description per page",
    description:
      "Title ≤60 chars, primary keyword first half, brand at end. Meta description ≤155 chars, benefit-led, includes city. Zero duplicates across the sitemap. Verified by scan.",
  },
  {
    id: "seo-h1-h2-outline-semantic",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Semantic H1 / H2 outline per page",
    description:
      "Exactly one H1 per page (matches keyword intent). H2s map to sections. No skipped levels (no H1→H3). Verified by scan.",
  },
  {
    id: "seo-canonical-urls-set",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Canonical URL set on every page",
    description:
      "<link rel='canonical'> on every page pointing to itself (absolute URL). Trailing-slash policy consistent with sitemap.",
  },
  {
    id: "seo-jsonld-organization-localbusiness",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: Organization + LocalBusiness on home",
    description:
      "Organization (name, url, logo, sameAs[]) + LocalBusiness (name, address, geo, telephone, openingHours, priceRange) on home page. Validated against schema.org with Rich Results Test.",
  },
  {
    id: "seo-jsonld-service-per-service-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: Service on every service page",
    description:
      "Service schema per service page: name, provider (LocalBusiness ref), areaServed, serviceType, description, offers (priceRange).",
  },
  {
    id: "seo-jsonld-faqpage-where-applicable",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: FAQPage on /faq + service pages",
    description:
      "FAQPage schema with the service-relevant Q&A subset on each service page; full master FAQ on /faq.",
  },
  {
    id: "seo-jsonld-breadcrumblist-everywhere",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: BreadcrumbList on every level-2+ page",
    description:
      "BreadcrumbList on /services/<slug>, /areas/<slug>, and other deep pages. Matches visible breadcrumbs from Phase 3.",
  },
  {
    id: "seo-jsonld-aboutpage",
    phase: "6-seo", tier: "P1", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "JSON-LD: AboutPage on /about",
    description:
      "AboutPage schema referencing the LocalBusiness and the founder (Person sub-entity if comfortable).",
  },
  {
    id: "seo-area-pages-every-area-has-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Every area from the spreadsheet has a page",
    description:
      "Cross-check Phase 1 area spreadsheet against /areas/* routes. 100% coverage. Priority-1 areas get extra-rich pages (gallery, testimonial, neighborhood-specific FAQ).",
  },
  {
    id: "seo-area-pages-unique-intros",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Area pages have UNIQUE intros (no duplicates)",
    description:
      "n-gram diff every area page intro against every other. >40% overlap = rewrite. References real local landmarks from Phase 1 spreadsheet.",
  },
  {
    id: "seo-area-pages-localbusiness-areaserved",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Area pages: LocalBusiness with areaServed",
    description:
      "Each area page emits LocalBusiness JSON-LD with areaServed set to the specific area (not the catch-all city).",
  },
  {
    id: "seo-internal-linking-matrix",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Internal linking matrix",
    description:
      "Every service ↔ every relevant area (drives long-tail). Every service → 2 sibling services ('related services'). Every area → 3 nearest areas. Documented as a matrix; rendered as 'Related' widgets.",
  },
  {
    id: "seo-sister-site-cross-linking",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Sister-site cross-linking per master plan",
    description:
      "Footer + body widget link to sister Masters sites per Phase 1 backlink map, using approved anchor text. Updates `src/master/trades.ts` with this site's URL once live.",
  },
  {
    id: "seo-external-backlink-targets",
    phase: "6-seo", tier: "P1", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "External backlink target list (10 directories)",
    description:
      "Submission checklist: Google Business Profile, Yelp, BBB, HomeStars, Houzz, trade-specific dirs (e.g. roofing contractor association). Owner submits within 7 days of launch.",
  },
  {
    id: "seo-sitemap-xml-complete",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "sitemap.xml complete",
    description:
      "Every page + every service + every area in /sitemap.xml with accurate lastmod. No 404s. Submitted to Search Console in Phase 9.",
  },
  {
    id: "seo-robots-txt-sane",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "robots.txt sane",
    description:
      "Allow all by default, disallow /brand and any internal /admin routes, reference sitemap. No accidental Disallow: /.",
  },
  {
    id: "seo-og-twitter-cards-per-page",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "OG / Twitter cards per page (not just home)",
    description:
      "Every page has its own og:title, og:description, og:image, twitter:* tags. Service pages use service hero; area pages use area-specific imagery.",
  },
  {
    id: "seo-nap-consistency-audit",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "NAP consistency audit",
    description:
      "Name / Address / Phone IDENTICAL across site footer, contact page, schema markup, GBP, and all directory listings. Local SEO penalizes drift.",
  },
  {
    id: "seo-google-business-profile-claimed",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Google Business Profile claimed/verified",
    description:
      "Profile claimed, primary + secondary categories chosen, services listed, hours accurate, ≥10 photos uploaded, Q&A seeded with 5 entries.",
  },
  {
    id: "seo-search-console-verified",
    phase: "6-seo", tier: "P0", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Google Search Console verified",
    description:
      "Property added (domain or URL prefix), ownership verified, sitemap submitted (Phase 9), Core Web Vitals report enabled.",
  },
  {
    id: "seo-bing-webmaster-verified",
    phase: "6-seo", tier: "P2", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Bing Webmaster verified",
    description:
      "Often imported from GSC in one click. Free traffic — do it.",
  },
  {
    id: "seo-core-web-vitals-pass",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Core Web Vitals pass on mobile",
    description:
      "LCP <2.5s, INP <200ms, CLS <0.1 on mobile (Lighthouse + PageSpeed Insights). CWV is a ranking factor, not a nice-to-have.",
  },
  {
    id: "seo-eeat-signals-rendered",
    phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "E-E-A-T signals rendered site-wide",
    description:
      "License #, insurance #, WCB #, years in business, real address, real phone, founder bio, photos of REAL work, warranty page, customer testimonials with name + city. All visible, not buried.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 7 — CONVERSION, FORMS & BOOKING
  // ════════════════════════════════════════════════════════════════════
  {
    id: "conv-booking-modal-from-every-cta",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Booking modal opens from every documented CTA",
    description:
      "Audit Phase 3 CTA entry-point map. Click every CTA listed; modal opens. Per master memory: exactly ONE booking-modal instance in the app, mounted at the root.",
  },
  {
    id: "conv-form-fields-minimized",
    phase: "7-conversion", tier: "P0", owner: "human", group: "quality",
    label: "Form fields minimized to true must-haves",
    description:
      "Every field justified by 'we will not respond well without this'. Default = name, phone OR email, service, free-text. Anything else moved to step 2 or post-booking.",
  },
  {
    id: "conv-service-prefill-from-service-pages",
    phase: "7-conversion", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Service pre-fills when launched from a service page",
    description:
      "Booking modal opened from /services/<slug> arrives with service pre-selected. Reduces friction by one tap.",
  },
  {
    id: "conv-tel-link-on-every-page",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "tel: link on every page (large mobile tap target)",
    description:
      "Header phone + footer phone are tel: links. Mobile tap target ≥44×44px. Phone visible above the fold on home and contact.",
  },
  {
    id: "conv-email-routes-to-master-inbox-tagged",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Email routes to master inbox tagged with siteSlug",
    description:
      "Form submissions land in central CMB inbox with site slug in subject + body, so the team knows which trade and which page produced the lead.",
  },
  {
    id: "conv-success-state-bespoke",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality",
    label: "Success state bespoke",
    description:
      "Per master memory: signature 'dirt-to-clean' submission animation respected. Success copy reassures with NEXT-STEP clarity ('we'll call within 4 business hours').",
  },
  {
    id: "conv-spam-protection-live",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Spam protection (honeypot or hCaptcha)",
    description:
      "Honeypot field minimum. hCaptcha if spam volume warrants. Don't lose leads to spam — but don't add captcha unless needed.",
  },
  {
    id: "conv-form-analytics-events",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Form analytics events fire (open/start/submit/success)",
    description:
      "Events: modal_open, form_start (first field touched), form_submit, form_success, form_error. Lets us tune funnel later.",
  },
  {
    id: "conv-mobile-time-to-book-under-60s",
    phase: "7-conversion", tier: "P0", owner: "human", group: "quality",
    label: "Mobile time-to-book < 60 seconds",
    description:
      "Time the flow on a real phone with a real thumb. Land → click CTA → fill → submit. <60s end-to-end. If not, simplify form, not the design.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 8 — LEGAL, TRUST & COMPLIANCE
  // ════════════════════════════════════════════════════════════════════
  {
    id: "legal-privacy-policy-accurate",
    phase: "8-legal", tier: "P0", owner: "hybrid", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Privacy policy reflects actual data + processors",
    description:
      "Lists actual data collected (name, phone, email, message, IP via analytics), actual processors (Lovable Cloud / Supabase, analytics provider, email provider), retention period, deletion request process, GDPR/PIPEDA basics if applicable.",
  },
  {
    id: "legal-terms-of-service-trade-specific",
    phase: "8-legal", tier: "P0", owner: "human", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Terms of service trade-specific",
    description:
      "Scope of work, change-order policy, payment terms, warranty reference, dispute resolution. Generic ToS is worse than none.",
  },
  {
    id: "legal-cookie-notice-if-needed",
    phase: "8-legal", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Cookie notice if analytics/marketing pixels run",
    description:
      "Skip if site uses zero non-essential cookies. Otherwise: minimal, dismissible, links to privacy policy.",
  },
  {
    id: "legal-license-insurance-wcb-rendered",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "LEGAL_TRUST_GUIDE",
    label: "License # + insurance # + WCB # rendered",
    description:
      "Footer + about page + contact page. Real numbers, not 'Licensed & Insured'.",
  },
  {
    id: "legal-real-address-and-hours",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Real address + business hours",
    description:
      "Real local address (or service-area + 'by appointment' if no storefront). Real hours. Matches GBP and schema. Avoids Google's 'business may not exist' demotion.",
  },
  {
    id: "legal-warranty-page",
    phase: "8-legal", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Warranty page with specifics",
    description:
      "Years covered, what's covered, what's NOT covered, claim process, transferability. From Phase 1 warranty terms.",
  },
  {
    id: "legal-accessibility-statement",
    phase: "8-legal", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Accessibility statement (WCAG AA target)",
    description:
      "Page declaring WCAG AA target, known limitations, contact for accessibility issues. 200 words is enough.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 9 — QUALITY GATE, ANALYTICS & LAUNCH
  // ════════════════════════════════════════════════════════════════════
  {
    id: "qa-wcag-aa-pass",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "WCAG AA pass",
    description:
      "Contrast 4.5:1 body / 3:1 large; visible focus rings; alt text; keyboard nav full coverage; modal ARIA (role=dialog, aria-modal, focus trap, Esc to close); prefers-reduced-motion respected.",
  },
  {
    id: "qa-performance-budget-mobile-green",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Performance budget green on mobile + desktop",
    description:
      "Lighthouse mobile ≥ 90 on Performance / Accessibility / Best Practices / SEO. LCP <2.5s, CLS <0.1, INP <200ms. Repeat on desktop (≥95 expected).",
  },
  {
    id: "qa-cross-browser-smoke-test",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Cross-browser smoke test",
    description:
      "Safari iOS, Chrome Android, Safari macOS, Chrome desktop, Firefox desktop. Open every page, tap every CTA. Note any visual regressions.",
  },
  {
    id: "qa-404-and-500-branded",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality",
    label: "404 + 500 pages branded",
    description:
      "Match brand. Helpful copy. Link back to home + popular services.",
  },
  {
    id: "qa-analytics-installed-and-events-firing",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Analytics installed + events firing",
    description:
      "Events: page_view, cta_click, modal_open, form_start, form_submit, form_success, phone_tap. Verified live. No PII in event payloads.",
  },
  {
    id: "qa-conversion-goal-configured",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Conversion goal configured",
    description:
      "form_success = primary conversion. phone_tap = secondary. Goals visible in analytics dashboard from day 1.",
  },
  {
    id: "qa-agency-credit-rendered",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Agency credit (VeePo) rendered",
    description:
      "Per existing brand memory — agency credit links to veepo.ca/case-studies in the documented locations.",
  },
  {
    id: "qa-master-version-pinned",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality", automated: true,
    label: "Master version pinned in VERSION.ts",
    description:
      "This remix records which master version it forked from. Lets us diff and forward-port master improvements.",
  },
  {
    id: "qa-trade-added-to-trades-ts",
    phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    label: "Trade added to src/master/trades.ts with live URL",
    description:
      "Slug, name, category, adjacent[], live URL, blurb. Sister-site widgets across the network now surface this site.",
  },
  {
    id: "qa-sister-network-rerendered",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Sister network re-rendered so backlinks go live",
    description:
      "Every sister site re-builds and re-deploys (or fetches the trades registry at runtime) so the new backlinks land. Don't ship a one-way link.",
  },
  {
    id: "qa-prelaunch-human-walkthrough",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Pre-launch human walkthrough on real mobile",
    description:
      "Operator opens every page on a real phone, taps every CTA, submits every form (with [TEST] prefix). Treats it like a customer. Last chance to catch what scripts can't.",
  },
  {
    id: "qa-postlaunch-search-console-submit",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Post-launch: submit sitemap + request indexing",
    description:
      "Submit sitemap.xml in Search Console. Request indexing on the top 5 commercial pages (home + 4 top services). Same in Bing.",
  },
  {
    id: "qa-postlaunch-cwv-monitor-7-days",
    phase: "9-launch", tier: "P1", owner: "human", group: "quality",
    label: "Post-launch: monitor Core Web Vitals for 7 days",
    description:
      "Field data takes ~28 days to populate, but origin-level CWV in Search Console flags regressions early. Check daily for the first week.",
  },

  // ════════════════════════════════════════════════════════════════════
  // LEGACY v1 ITEMS (preserved for any existing UI consumer; superseded
  // above but kept so removing them doesn't break a consumer keying off id)
  // ════════════════════════════════════════════════════════════════════
  { id: "trade-config-edited", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "trade.config.ts updated", description: "Identity, services, and palette accent reflect the new trade. (Superseded by brand-trade-config-fully-edited.)" },
  { id: "logo-generated", phase: "2-brand", tier: "P1", owner: "ai-plan", group: "setup", automated: true, playbook: "REMIX_PLAYBOOK", label: "Trade logo generated", description: "AI-generated wordmark from the master CMB logo, saved to /public/. (Superseded by brand-trade-sub-wordmark-generated.)" },
  { id: "favicon-generated", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Favicon + PWA icons generated", description: "Derived from the trade logo. (Superseded by brand-favicon-pwa-pack-regenerated.)" },
  { id: "og-image-generated", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "OG / social image generated", description: "Master Builders OG card embedded. (Superseded by visual-og-card-trade-specific + brand-share-pack-regenerated-with-trade-name.)" },
  { id: "master-logo-rendering", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master CMB logo rendering in nav + footer", description: "<MasterLogo slot='nav'> and slot='footer' resolve to a master file or per-trade override (see LOGO_USAGE.md)." },
  { id: "master-logo-colorway-set", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Logo colorway chosen", description: "TRADE.identity.logoColorway is one of: black | navy | white." },
  { id: "master-logo-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master logo binaries embedded (chosen colorway)", description: "Real PNGs in /src/master/assets/logo/ for the active colorway — no aliases." },
  { id: "master-emblem-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master emblem binaries embedded", description: "Square emblem-only PNGs (100/200/400/800/1200/2400) wired through <MasterLogo slot='emblem'>." },
  { id: "master-tiles-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master tiles binaries embedded", description: "Exploded/tiled emblem PNGs wired through <MasterLogo slot='tiles'>." },
  { id: "master-monogram-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master monogram binaries embedded", description: "Handwritten 'MB' signature PNGs wired through <MasterLogo slot='monogram'>." },
  { id: "master-wordmark-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master wordmark binaries embedded", description: "Pure-typography wordmark PNGs wired through <MasterLogo slot='wordmark'>." },
  { id: "master-wordmark-ground-binaries-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master wordmark Ground variant embedded", description: "Drafted plumb-line + base rule wordmark PNGs wired through <MasterLogo slot='wordmarkGround'>." },
  { id: "master-favicon-pwa-pack-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Favicon + PWA icon pack embedded", description: "Full navy MB-diamond ladder + white reverse-colorway ladder in /public/ with prefers-color-scheme media queries." },
  { id: "master-share-pack-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Social share + OG + profile pack embedded", description: "10-file share pack in /public/share/ with typed registry at src/master/brand/share-pack.ts." },
  { id: "master-brand-bible-embedded", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Brand bible embedded", description: "Canonical brand contract at src/master/brand/BRAND_BIBLE.md." },
  { id: "master-brand-kit-page-live", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "/brand brand-kit page live", description: "Internal brand-kit surface at /brand renders boards, swatches, mark families, share pack, clear-space + minimum-size demos. noindex." },
  { id: "master-source-artwork-archived", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "setup", automated: true, label: "Master source artwork archived", description: "Both canonical compositions archived to src/master/assets/logo/source/. Archive-only; never <img>'d." },
  { id: "master-logo-slot-map-followed", phase: "2-brand", tier: "P0", owner: "human", group: "setup", label: "New logo surfaces follow the slot map", description: "Any new component using a logo is added to LOGO_SLOT_MAP.md and rendered via <MasterLogo slot='...'/> — never <img src='.../cmb-...png'> direct." },
  { id: "wireframe-matches", phase: "3-ia", tier: "P1", owner: "human", group: "brand", playbook: "REMIX_PLAYBOOK", label: "Wireframe matches the master pattern", description: "Hero → trust → services → process → before/after → FAQ → CTA. (Superseded by ia-page-wireframes-approved.)" },
  { id: "palette-swapped", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Palette accent swapped", description: "One accent only. No leftover drywall accent values." },
  { id: "leftover-drywall-references-zero", phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true, playbook: "BRAND_AUDIT", label: "Zero leftover 'drywall' references", description: "Codebase scan finds no stale references from the source template. (Superseded by brand-zero-leftover-references-scan.)" },
  { id: "brand-audit-passed", phase: "2-brand", tier: "P0", owner: "human", group: "brand", playbook: "BRAND_AUDIT", label: "Manual brand audit passed", description: "Walk the BRAND_AUDIT checklist; site feels like CMB." },
  { id: "copy-unique", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Copy is unique to this trade", description: "No duplicated paragraphs from sister sites. (Superseded by copy-anti-paraphrase-audit.)" },
  { id: "story-rewritten", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Story is bespoke", description: "Founding story / process / pain points are this trade's. (Superseded by copy-founder-origin-story.)" },
  { id: "service-bespoke", phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content", playbook: "COPY_GUIDE", label: "Services are bespoke", description: "Service cards reflect actual offerings. (Superseded by copy-per-service-pages.)" },
  { id: "ai-images-generated", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content", playbook: "AI_IMAGE_RULES", label: "AI images generated for every photo slot", description: "Hero, before/afters, ambient backdrops — all replaced." },
  { id: "no-faces-no-people", phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content", automated: true, playbook: "AI_IMAGE_RULES", label: "No faces, no people in any image", description: "Filename + alt-text scan catches violations." },
  { id: "service-areas-rendering", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Service-area pages render", description: "/areas/* routes return all areas with LocalBusiness schema. (Superseded by seo-area-pages-every-area-has-page.)" },
  { id: "sister-backlinks-present", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "Sister-site backlinks render", description: "Footer + area pages cross-link to deployed sister sites." },
  { id: "sitemap-generated", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "sitemap.xml + robots.txt complete", description: "Every page + every area is in the sitemap." },
  { id: "schema-localbusiness-present", phase: "6-seo", tier: "P0", owner: "ai-plan", group: "seo", automated: true, playbook: "SEO_PLAYBOOK", label: "LocalBusiness JSON-LD present", description: "On home + every service-area page." },
  { id: "navigation-lean", phase: "3-ia", tier: "P0", owner: "human", group: "quality", label: "Navigation is lean", description: "Top nav has ≤6 items; mobile menu is fast." },
  { id: "perf-budget-green", phase: "9-launch", tier: "P0", owner: "ai-plan", group: "quality", automated: true, playbook: "PERFORMANCE_PLAYBOOK", label: "Performance budget green", description: "Lighthouse mobile ≥ 90; LCP < 2.5s; CLS < 0.1." },
  { id: "booking-routes-to-master-email", phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality", automated: true, label: "Booking routes to master email", description: "Form submissions reach the central CMB inbox with siteSlug tag." },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 0 — PLAN-FIRST DISCIPLINE (forces every later item to plan deep)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "plan-read-brand-bible",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/master/brand/BRAND_BIBLE.md"],
    label: "Brand bible read end-to-end",
    description:
      "Before ANY work in any phase, the agent reads BRAND_BIBLE.md from top to bottom. This is the canonical contract: hex codes, clear-space, do/don'ts, mark families, surface map. Quote the relevant section in every plan.",
  },
  {
    id: "plan-read-brand-identity-northstar",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/config/brand-identity.ts", "src/config/brand-identity-northstar.ts"],
    label: "Brand identity + northstar read",
    description:
      "Read brand-identity.ts (voice, taglines, mission) and brand-identity-northstar.ts (power words, banned words, character traits). Every copy decision references these.",
  },
  {
    id: "plan-load-relevant-personas",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/config/personas/index.ts"],
    label: "Phase-relevant personas loaded",
    description:
      "Per phase, load required personas (see PLAN_FIRST_DISCIPLINE.md persona load map). Phase 4 → narrative-copywriter + strategic-narrative + seo-faq + ideal-customer. Phase 5 → master-visual + image-seo. Phase 5b → scroll-motion + master-visual. Phase 6 → seo-expert + seo-faq + image-seo. If a required persona is missing, stop and flag.",
  },
  {
    id: "plan-read-trade-config",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/config/trade.config.ts"],
    label: "Current trade.config read",
    description:
      "Identity, palette, services, voice arrays, contact, location — the per-trade truth. Every plan grounds in these.",
  },
  {
    id: "plan-read-business-overview",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/config/business.ts", "src/config/business-overview.ts"],
    label: "Business + overview read",
    description:
      "What the business actually does, who it serves, how it makes money. Prevents copy that overpromises or misrepresents.",
  },
  {
    id: "plan-read-reviews-and-fear-dispel",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "PLAN_FIRST_DISCIPLINE",
    brandSources: ["src/config/reviews.ts", "src/config/fear-dispel.ts", "src/config/discovery-questionnaire.ts"],
    label: "Reviews + fear-dispel + discovery read",
    description:
      "Real customer language (reviews.ts), top objections + how we answer them (fear-dispel.ts), what we already learned about this trade (discovery-questionnaire.ts). Drives Phase 4 copy that lands.",
  },
  {
    id: "plan-deep-plan-before-execution",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    planDepth: "deep",
    playbook: "PLAN_FIRST_DISCIPLINE",
    label: "11-section deep plan written before code",
    description:
      "For every item with planDepth: 'deep', the agent writes the 11-section plan from PLAN_FIRST_DISCIPLINE.md (Goal · Brand truth refs · Craft benchmarks · IA · Content · Visual & motion · A11y · Performance · Success criteria · Risks · Verification) BEFORE touching code. The plan is the deliverable; execution is mechanical after it.",
  },
  {
    id: "plan-craft-benchmarks-pinned",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: [
      "apple.com/airpods-pro",
      "apple.com/iphone-15-pro",
      "fantasy.co",
      "linear.app",
      "stripe.com/payments",
      "christophergawryletz.com",
      "frog.co",
    ],
    label: "Craft benchmarks pinned per page",
    description:
      "For every visual or motion deep plan, pin 2–3 benchmark URLs. Note specifically what we're emulating from each (e.g. 'Apple iPhone 15 Pro hero — negative space ratio + scroll choreography'). No mood-board vagueness.",
  },
  {
    id: "plan-easing-system-pinned",
    phase: "0-plan-first", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "MOTION_AND_CRAFT",
    label: "Site-wide easing system pinned in CSS",
    description:
      "--ease-entry, --ease-exit, --ease-inout, --ease-spring, --ease-linear declared in src/index.css (per MOTION_AND_CRAFT.md). All component motion references these tokens. Hand-typed cubic-bezier in components = audit fail.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 2 ADDITIONS — pull from existing brand stack
  // ════════════════════════════════════════════════════════════════════
  {
    id: "brand-identity-docs-pulled-into-trade",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand",
    playbook: "BRAND_AUDIT",
    brandSources: ["src/config/brand-identity.ts", "src/master/brand/BRAND_BIBLE.md"],
    label: "Every trade.config field traceable to a brand source",
    description:
      "Audit: every value in trade.config.ts (tagline, voice traits, do/don't lists, mission) cites a line in brand-identity.ts or BRAND_BIBLE.md. No improvised values. Inline comments above each block linking the source.",
  },
  {
    id: "brand-northstar-tagline-aligned",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand",
    playbook: "BRAND_AUDIT",
    brandSources: ["src/config/brand-identity-northstar.ts"],
    label: "Tagline pulled from northstar candidates",
    description:
      "TRADE.identity.tagline must equal one of brand-identity-northstar.ts taglineCandidates. Adding a new candidate requires updating northstar first, then trade.config.",
  },
  {
    id: "brand-style-guide-tokens-respected",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "BRAND_AUDIT",
    brandSources: ["src/config/style-guide.ts", "src/config/design-plan.ts"],
    label: "Tokens come from style-guide.ts, not hand-typed",
    description:
      "Audit components for hand-typed colors / spacing / radius. Everything threads through style-guide.ts → trade.config.ts → CSS variables. Hand-typed values fail the audit (rg for hex codes outside config/).",
  },
  {
    id: "brand-design-plan-honored",
    phase: "2-brand", tier: "P0", owner: "ai-plan", group: "brand",
    playbook: "BRAND_AUDIT",
    brandSources: ["src/config/design-plan.ts", "src/config/design-preferences.ts"],
    label: "design-plan + design-preferences honored",
    description:
      "Layout density, type scale choices, motion philosophy in design-plan.ts and design-preferences.ts are reflected in components. Deviations documented in the deep plan.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 3 ADDITIONS — IA gaps
  // ════════════════════════════════════════════════════════════════════
  {
    id: "ia-content-model-defined",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    planDepth: "deep",
    label: "Content model defined per page",
    description:
      "Every page typed: entities (Service, Area, FAQ, Testimonial, Project, Founder), fields, relations. Lives in src/master/seo/content-model.<trade>.md. Prevents 'what data does this page actually have?' confusion mid-Phase 4.",
  },
  {
    id: "ia-empty-state-and-loading-state-map",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    craftBenchmarks: ["linear.app", "stripe.com"],
    label: "Empty + loading states designed",
    description:
      "Every async or list surface gets a designed empty state (not a blank gap) and a designed loading state (skeleton, shimmer, or progressive). No spinners on a brand site without a reason.",
  },
  {
    id: "ia-error-state-map",
    phase: "3-ia", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Error states designed (network, validation, 404, 500)",
    description:
      "Every potential error surface mapped: form field errors, network drop on submit, 404 page, 500 page, image load failure. All on-brand, all with a clear next step.",
  },
  {
    id: "ia-thumb-zone-audit",
    phase: "3-ia", tier: "P0", owner: "human", group: "quality",
    playbook: "IA_WIREFRAME_GUIDE",
    craftBenchmarks: ["apple.com (HIG)", "frog.co"],
    label: "Mobile thumb-zone audit",
    description:
      "Primary CTAs sit in the bottom-third thumb-zone on mobile (Apple HIG / FROG mobile rule). Sticky bottom CTA on long pages. Tap targets ≥44×44px. Test on a real phone with one hand.",
  },
  {
    id: "ia-z-pattern-and-f-pattern-audit",
    phase: "3-ia", tier: "P1", owner: "ai-plan", group: "setup",
    playbook: "IA_WIREFRAME_GUIDE",
    label: "Visual scan-path audit (Z / F pattern)",
    description:
      "Hero & landing sections respect Z-pattern (eye sweeps top-left → top-right → bottom-left → bottom-right). Long-form sections respect F-pattern. Primary value prop lands at one of those anchors.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 4 ADDITIONS — pull from voice/objection/persona stack
  // ════════════════════════════════════════════════════════════════════
  {
    id: "copy-testimonials-real-with-name-city",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    brandSources: ["src/config/reviews.ts"],
    label: "Testimonials pulled from reviews.ts (never invented)",
    description:
      "Every testimonial on the site is a real entry from reviews.ts with name + city + service. If reviews.ts is empty for a service, ship the page WITHOUT a testimonial rather than fake one. Permission tracked in Phase 8.",
  },
  {
    id: "copy-fear-dispel-block-applied",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    brandSources: ["src/config/fear-dispel.ts"],
    label: "Fear-dispel block addresses top 5 objections",
    description:
      "Home + service pages render a block answering the top 5 objections from fear-dispel.ts. Each objection gets a 1-sentence reframe + a proof point. This is the 'so what' antidote.",
  },
  {
    id: "copy-discovery-framework-followed",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    brandSources: ["src/config/personas/discovery-framework.ts"],
    label: "Story arc matches discovery framework",
    description:
      "Page narrative follows the discovery-framework persona: pain → reframe → proof → path → promise. Audit each long-form page against this arc.",
  },
  {
    id: "copy-power-words-from-northstar",
    phase: "4-copy", tier: "P1", owner: "ai-plan", group: "content", automated: true,
    playbook: "COPY_GUIDE",
    brandSources: ["src/config/brand-identity-northstar.ts"],
    label: "Power-word usage audit",
    description:
      "Headlines + CTAs use the power words from brand-identity-northstar.ts. Banned words from the same file get zero hits in a repo scan.",
  },
  {
    id: "copy-ideal-customer-voice-applied",
    phase: "4-copy", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "COPY_GUIDE",
    brandSources: ["src/config/personas/ideal-customer.ts"],
    label: "Copy speaks to ideal customer (not 'everyone')",
    description:
      "Read every page out loud as if speaking to the ideal-customer persona. Anything that doesn't land — re-write. 'Everyone' is nobody.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 5 ADDITIONS — Apple/Fantasy.co craft
  // ════════════════════════════════════════════════════════════════════
  {
    id: "visual-editorial-rhythm-applied",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    craftBenchmarks: ["fantasy.co", "christophergawryletz.com"],
    label: "Editorial rhythm applied (varied density)",
    description:
      "Section heights vary (40–55vh dividers per master memory). Padding is generous (up to py-48). Density varies — quiet sections breathe, dense sections earn it. Avoids template-grade uniform-card-grid feel.",
  },
  {
    id: "visual-apple-grade-hero-treatment",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    planDepth: "deep",
    playbook: "AI_IMAGE_RULES",
    craftBenchmarks: ["apple.com/iphone-15-pro", "apple.com/airpods-pro"],
    brandSources: ["src/config/personas/master-visual.ts"],
    label: "Apple-grade hero treatment",
    description:
      "Hero spec: macro detail, controlled lighting, single subject, premium negative space (60/40 image/copy ratio mobile, 50/50 desktop). Type leads with restraint. No carousel, no autoplay video. Reference: Apple product pages.",
  },
  {
    id: "visual-fantasy-co-grade-detail-pass",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    craftBenchmarks: ["fantasy.co", "christophergawryletz.com"],
    label: "Fantasy.co-grade detail pass",
    description:
      "Visual edge refinement: gradient overlays soften hard image edges, premium type pairings (Space Grotesk display + Jost body per memory), asymmetric grids where warranted, micro-typography (small caps, oldstyle figures, optical sizing).",
  },
  {
    id: "visual-cinematic-image-reveals",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "MOTION_AND_CRAFT",
    label: "Cinematic image reveals (clip-path bottom-to-top)",
    description:
      "Hero + section images use bottom-to-top clip-path reveal (per master motion memory) on enter. 900ms with --ease-entry. Reduced-motion fallback: instant fade. Triggered at 15% in viewport, once only.",
  },
  {
    id: "visual-parallax-coverage-correct",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content", automated: true,
    playbook: "PERFORMANCE_PLAYBOOK",
    label: "Parallax sections sized 130% with -15% top offset",
    description:
      "Per parallax-coverage memory: parallax images are 130% height with -15% top offset to prevent edge-reveal during scroll. Audit every parallax slot.",
  },
  {
    id: "visual-typographic-rhythm-locked",
    phase: "5-visual", tier: "P0", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    craftBenchmarks: ["apple.com", "christophergawryletz.com"],
    label: "Typographic rhythm locked",
    description:
      "Headline scale (modular, e.g. 1.25 ratio), body leading 1.55–1.7, measure 60–75ch on long-form. Master pair: Space Grotesk display + Jost body. No hand-typed font sizes — all from style-guide.ts scale.",
  },
  {
    id: "visual-color-temperature-consistency",
    phase: "5-visual", tier: "P1", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    label: "Color temperature consistency across imagery",
    description:
      "Per-trade palette (warm | cool | neutral from Phase 1) stays consistent across hero, service, gallery, before/after. Mixed temperatures read as stock-photo soup.",
  },
  {
    id: "visual-asymmetric-grid-where-warranted",
    phase: "5-visual", tier: "P2", owner: "ai-plan", group: "content",
    playbook: "AI_IMAGE_RULES",
    craftBenchmarks: ["fantasy.co"],
    label: "Asymmetric grid in editorial sections",
    description:
      "Where appropriate (gallery, before/after, story page), break the 12-col grid with deliberate asymmetry. Avoids Bootstrap-card-deck feel.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 5b — MOTION & INTERACTION CRAFT (FROG-level)
  // ════════════════════════════════════════════════════════════════════
  {
    id: "motion-philosophy-doc-written",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "brand",
    playbook: "MOTION_AND_CRAFT",
    brandSources: ["src/config/personas/scroll-motion.ts", "src/config/personas/master-visual.ts"],
    label: "Per-trade motion philosophy doc",
    description:
      "1-pager covering: motion principles (light reveals material, restraint, tactility, choreography), durations, stagger timings, signature moments. Lives at src/master/brand/<trade>/motion.md. Every Phase 5b plan references it.",
  },
  {
    id: "motion-easing-system-tokens-defined",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "brand", automated: true,
    playbook: "MOTION_AND_CRAFT",
    label: "Easing tokens declared in CSS",
    description:
      "--ease-entry, --ease-exit, --ease-inout, --ease-spring, --ease-linear declared in src/index.css per MOTION_AND_CRAFT.md. Audit components for hand-typed cubic-bezier — must be zero hits.",
  },
  {
    id: "motion-page-transition-implemented",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["linear.app", "fantasy.co"],
    label: "Signature page transition implemented",
    description:
      "Master cloth-wipe transition (per existing memory). 700ms entry / 600ms exit. Reduced-motion fallback: instant cross-fade.",
  },
  {
    id: "motion-hover-microinteractions",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["linear.app", "stripe.com", "frog.co"],
    label: "Considered hover on every interactive surface",
    description:
      "Buttons lift + shimmer (180ms). Links underline-grow (300ms). Cards lift + image Ken Burns (600ms). No default browser hovers anywhere.",
  },
  {
    id: "motion-scroll-choreography",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["apple.com/iphone-15-pro"],
    label: "Scroll choreography (staggered reveals)",
    description:
      "Section children stagger in (60–120ms). Hero text staggers headline → sub → CTA (120ms). Card grids stagger 60ms, cap at 8. Once-only.",
  },
  {
    id: "motion-cursor-aware-effects",
    phase: "5b-motion", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["fantasy.co", "linear.app"],
    label: "Cursor-aware effects on hero",
    description:
      "Hero 'showroom spotlight' radial gradient follows cursor (per existing memory). Subtle parallax on hero image (3–5%). Desktop only. Reduced-motion: disabled.",
  },
  {
    id: "motion-loading-sequence-bespoke",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    label: "5-phase loading sequence",
    description:
      "Per loading-sequence memory: enter → hold → suspend → exit → done. Total <1.6s. The 'suspend' phase is the signature — don't skip.",
  },
  {
    id: "motion-form-submission-signature",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    label: "Booking submission has signature animation",
    description:
      "Signature animation on submit (e.g. dirt-to-clean particles per master memory). Never a generic spinner. Reduced-motion: simple checkmark + copy.",
  },
  {
    id: "motion-prefers-reduced-motion-fallbacks",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "MOTION_AND_CRAFT",
    label: "Reduced-motion fallback for every signature",
    description:
      "Global @media (prefers-reduced-motion: reduce) + per-signature opt-out. Apple a11y bar: no animation that can't be opted out of.",
  },
  {
    id: "motion-button-tactile-feedback",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["frog.co", "stripe.com"],
    label: "Buttons feel pressed (active state)",
    description:
      "Active state: transform: scale(.97), 120ms. Touch active visible within 50ms. Optional navigator.vibrate(8) on critical CTAs. No 'dead' buttons.",
  },
  {
    id: "motion-modal-entry-and-exit",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    craftBenchmarks: ["linear.app"],
    label: "Booking modal entry/exit per spec",
    description:
      "Scrim fades 200ms; modal scales .96 → 1 + slides 8px → 0 + fades, 360ms --ease-spring. Focus moves to first input. Escape closes. Backdrop closes. Focus returns to trigger. Step indicator (4 dots) per booking-modal memory.",
  },
  {
    id: "motion-frame-budget-respected",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "MOTION_AND_CRAFT",
    label: "60fps on mid-tier mobile",
    description:
      "Animate transform/opacity/filter only. Audit components for animated width/height/top/left — must be zero. DevTools Performance tab shows green frames during interaction.",
  },
  {
    id: "motion-link-and-card-interactions",
    phase: "5b-motion", tier: "P1", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    label: "Link + card interactions match master pattern",
    description:
      "Links: story-link underline scale from origin-bottom-left, 300ms. Cards: lift 4px + shadow + image Ken Burns 1.04 over 600ms.",
  },
  {
    id: "motion-focus-states-considered",
    phase: "5b-motion", tier: "P0", owner: "ai-plan", group: "quality", automated: true,
    playbook: "MOTION_AND_CRAFT",
    label: "Focus states considered, not default",
    description:
      "Every interactive surface: 2px ring offset 2px, brand accent color, instant. No relying on browser default outline. Tab through every page — focus visible at every stop.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 6 ADDITIONS
  // ════════════════════════════════════════════════════════════════════
  {
    id: "seo-image-sitemap-generated",
    phase: "6-seo", tier: "P1", owner: "ai-plan", group: "seo", automated: true,
    playbook: "SEO_PLAYBOOK",
    label: "Image sitemap for galleries + before/afters",
    description:
      "Generate sitemap-images.xml referenced from sitemap.xml index. Helps Google Image discover gallery + before/after work.",
  },
  {
    id: "seo-hreflang-if-multilingual",
    phase: "6-seo", tier: "P2", owner: "ai-plan", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "hreflang declared if multilingual",
    description:
      "Skip if EN-only. If FR/EN added later, declare hreflang on every page in both languages + x-default.",
  },
  {
    id: "seo-soft-404-monitor-set-up",
    phase: "6-seo", tier: "P1", owner: "human", group: "seo",
    playbook: "SEO_PLAYBOOK",
    label: "Soft-404 + index-coverage monitoring",
    description:
      "Search Console → Pages report watched weekly for soft-404s, redirects, indexing issues.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 7 ADDITIONS — interaction craft
  // ════════════════════════════════════════════════════════════════════
  {
    id: "conv-multi-step-form-progress-indicator",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality",
    playbook: "MOTION_AND_CRAFT",
    label: "Booking modal step indicator (4 dots)",
    description:
      "Per booking-modal memory: 4-step dot indicator. Current step pulses; completed steps fill in. Reduces 'how much more?' anxiety.",
  },
  {
    id: "conv-trust-elements-near-cta",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "quality",
    craftBenchmarks: ["stripe.com/payments"],
    label: "Trust elements within 200px of every primary CTA",
    description:
      "License #, insurance, years in business, warranty mention, or testimonial within 200px of every primary CTA. Reduces last-second hesitation.",
  },
  {
    id: "conv-sms-fallback-considered",
    phase: "7-conversion", tier: "P1", owner: "human", group: "quality",
    label: "SMS option for mobile-first leads",
    description:
      "Consider sms: link or 'text us' option on mobile. Many trade customers prefer text. Skip if backend can't handle inbound SMS.",
  },
  {
    id: "conv-callback-promise-rendered",
    phase: "7-conversion", tier: "P0", owner: "ai-plan", group: "content",
    label: "Concrete callback promise near form",
    description:
      "'We'll call within 4 business hours' (or whatever Phase 1 says). Concrete, not 'we'll get back to you soon'.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 8 ADDITIONS
  // ════════════════════════════════════════════════════════════════════
  {
    id: "legal-real-testimonials-with-permission",
    phase: "8-legal", tier: "P0", owner: "human", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Testimonial-permission trail documented",
    description:
      "Every testimonial in reviews.ts has documented permission (email/text screenshot) to use name + city. Stored with the operator, not on the site.",
  },
  {
    id: "legal-photo-permission-trail",
    phase: "8-legal", tier: "P0", owner: "human", group: "quality",
    playbook: "LEGAL_TRUST_GUIDE",
    label: "Photo-permission trail (customer homes)",
    description:
      "Every real photo of a customer's home/property has documented permission. Especially important for before/after pairs.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 9 ADDITIONS — post-launch growth
  // ════════════════════════════════════════════════════════════════════
  {
    id: "launch-uptime-monitor-configured",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Uptime monitor (Pingdom / UptimeRobot)",
    description:
      "5-min interval ping on / and /contact. SMS + email alerts to operator. Free tier is enough.",
  },
  {
    id: "launch-error-monitoring-installed",
    phase: "9-launch", tier: "P1", owner: "ai-plan", group: "quality",
    label: "Runtime error monitoring (Sentry or similar)",
    description:
      "Sentry or equivalent installed. Source maps uploaded. Slack/email alert on first occurrence of new errors.",
  },
  {
    id: "launch-review-request-flow-armed",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "Post-job review request flow armed",
    description:
      "Automated email/SMS goes out 3 days after job completion asking for a Google review. Drives the GBP signal that compounds local SEO.",
  },
  {
    id: "launch-content-cadence-plan",
    phase: "9-launch", tier: "P1", owner: "human", group: "content",
    playbook: "SEO_PLAYBOOK",
    label: "Monthly content cadence + first 3 topics drafted",
    description:
      "Monthly blog / case-study cadence documented. First 3 topics drafted (titles + outlines) before launch so momentum doesn't stall.",
  },
  {
    id: "launch-first-30-day-checkin",
    phase: "9-launch", tier: "P0", owner: "human", group: "quality",
    label: "30-day post-launch review scheduled",
    description:
      "Calendar event 30 days post-launch: review CWV trend, GSC coverage, conversion rate, top 10 search queries, top 10 entry pages. Adjust content + meta based on what's actually being searched.",
  },

  // ════════════════════════════════════════════════════════════════════
  // PHASE 0.5 — GUARD RAILS ARMED
  // The constitution must be loaded BEFORE intake.
  // See `src/master/guardrails.ts` and `playbooks/GUARD_RAILS.md`.
  // ════════════════════════════════════════════════════════════════════
  {
    id: "guardrails-acknowledged",
    phase: "0.5-guardrails-armed", tier: "P0", owner: "human", group: "setup",
    playbook: "GUARD_RAILS",
    label: "Guard rails read & acknowledged",
    description:
      "Operator reads `src/master/playbooks/GUARD_RAILS.md` in full and confirms in writing (commit message or remix dashboard) that the 18 non-negotiable laws are understood and accepted for THIS remix. No exceptions. No waivers. Without this acknowledgement, every downstream phase risks shipping a guard-rail violation.",
    inputsNeeded: ["Operator confirmation (commit message or dashboard checkbox)"],
    guardRails: [
      "gr-bespoke-brand-derivation",
      "gr-bespoke-style-guide-live",
      "gr-zero-sister-fingerprints",
      "gr-master-logo-slot-map",
      "gr-areas-we-serve-excellence",
      "gr-page-meta-jsonld-unique",
      "gr-crawl-hygiene",
      "gr-local-trust-schema",
      "gr-performance-budget-mobile",
      "gr-modern-image-pipeline",
      "gr-wcag-aa",
      "gr-booking-one-tap",
      "gr-real-business-signals",
      "gr-legal-pages-bespoke",
      "gr-motion-system-pinned",
      "gr-anti-paraphrase-readability",
      "gr-plan-first-deep-items",
      "gr-prelaunch-walk-postlaunch-monitor",
    ],
  },
  {
    id: "guardrails-coverage-map-generated",
    phase: "0.5-guardrails-armed", tier: "P0", owner: "ai-plan", group: "setup",
    playbook: "GUARD_RAILS",
    automated: true,
    label: "Per-trade guard-rail coverage map generated",
    description:
      "Run the `getGuardRailCoverage()` and `getUnenforcedGuardRails()` helpers from `src/master/guardrails.ts` and commit the result as `guardrails-coverage.md` for THIS trade. The map MUST show every guard rail with at least one enforcing checklist item. If `getUnenforcedGuardRails()` returns anything other than `[]`, the checklist itself is broken and must be fixed before continuing — no remix work proceeds until coverage is complete.",
    inputsNeeded: [],
  },
];

export const CHECKLIST_GROUPS = ["setup", "brand", "content", "seo", "quality"] as const;
export type ChecklistGroup = typeof CHECKLIST_GROUPS[number];

export const getChecklistByPhase = (phase: ChecklistPhase) =>
  REMIX_CHECKLIST.filter((c) => c.phase === phase);

export const getChecklistByTier = (tier: ChecklistTier) =>
  REMIX_CHECKLIST.filter((c) => c.tier === tier);

export const getChecklistByOwner = (owner: ChecklistOwner) =>
  REMIX_CHECKLIST.filter((c) => c.owner === owner);

/**
 * Items that help satisfy a given guard rail. Pass a `GuardRailId` from
 * `src/master/guardrails.ts`. Useful for building per-trade coverage reports.
 */
export const getChecklistByGuardRail = (guardRailId: string) =>
  REMIX_CHECKLIST.filter((c) => c.guardRails?.includes(guardRailId) ?? false);

/** Counts for dashboard headers. */
export const checklistStats = () => {
  const byPhase: Record<ChecklistPhase, number> = {
    "0-plan-first": 0, "0.5-guardrails-armed": 0, "1-intake": 0, "2-brand": 0, "3-ia": 0,
    "4-copy": 0, "5-visual": 0, "5b-motion": 0, "6-seo": 0, "7-conversion": 0, "8-legal": 0,
    "9-launch": 0,
  };
  const byTier: Record<ChecklistTier, number> = { P0: 0, P1: 0, P2: 0 };
  for (const c of REMIX_CHECKLIST) {
    byPhase[c.phase]++;
    byTier[c.tier]++;
  }
  return { total: REMIX_CHECKLIST.length, byPhase, byTier };
};
