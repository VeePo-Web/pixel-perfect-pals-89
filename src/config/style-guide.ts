/**
 * COCHRANE MASTER BUILDERS — Comprehensive Style Guide
 *
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * This is the single definitive pixel-level specification for
 * every visual implementation decision on the Cochrane Master Builders website.
 *
 * Cross-references:
 *   - src/config/brand-identity-northstar.ts (brand DNA)
 *   - src/config/design-plan.ts (phase roadmap)
 *   - src/index.css (CSS custom properties)
 *   - tailwind.config.ts (utility classes)
 */

// ─────────────────────────────────────────────────────────────
// 1. COLOR SYSTEM
// ─────────────────────────────────────────────────────────────

export const COLORS = {
  tokens: {
    asphaltBlack: {
      hex: "#1A1D21",
      hsl: "220 8% 12%",
      cssVar: "--asphalt",
      usage: "Primary dark — hero backgrounds, dark sections, footer, nav solid state, depth elements",
    },
    charcoal: {
      hex: "#272B31",
      hsl: "220 6% 18%",
      cssVar: "--charcoal",
      usage: "Dark section card backgrounds, dark hover states, mobile menu overlay panels",
    },
    stoneGray: {
      hex: "#535A63",
      hsl: "220 5% 35%",
      cssVar: "--stone",
      usage: "Secondary text on light backgrounds, primary body text on dark backgrounds",
    },
    stoneMid: {
      hex: "#808690",
      hsl: "220 4% 55%",
      cssVar: "--stone-mid",
      usage: "Tertiary text, muted captions, timestamps, overline labels on light backgrounds",
    },
    stoneLight: {
      hex: "#E6E1DC",
      hsl: "30 10% 90%",
      cssVar: "--stone-light",
      usage: "Light section variants, subtle borders on light backgrounds, dividers, card borders",
    },
    warmPorcelain: {
      hex: "#F5F2EF",
      hsl: "30 15% 96%",
      cssVar: "--porcelain",
      usage: "Primary light background — content sections, page base",
    },
    porcelainDark: {
      hex: "#EDE9E5",
      hsl: "30 12% 92%",
      cssVar: "--porcelain-dark",
      usage: "Muted panels on light backgrounds, form field backgrounds, alternate light sections",
    },
    cleanWhite: {
      hex: "#FFFFFF",
      hsl: "0 0% 100%",
      cssVar: "--clean-white",
      usage: "Cards on light backgrounds, elevated content, high-contrast text on dark",
    },
    burnishedCopper: {
      hex: "#C47A3A",
      hsl: "25 60% 55%",
      cssVar: "--copper",
      usage: "Primary accent — CTAs, interactive links, pricing highlights, progress indicators, copper rules",
    },
    copperLight: {
      hex: "#D4A070",
      hsl: "25 50% 70%",
      cssVar: "--copper-light",
      usage: "Hover states for copper elements, secondary accent, subtle highlights",
    },
    copperGlow: {
      hex: "#DAB58C",
      hsl: "25 45% 70%",
      cssVar: "--copper-glow",
      usage: "Hover shimmer, focus ring glow, subtle copper tint backgrounds",
    },
  },

  /** Which token serves which role on DARK (asphalt) backgrounds */
  darkContext: {
    background: "asphaltBlack",
    backgroundAlt: "charcoal",
    textPrimary: "cleanWhite",
    textSecondary: "stoneGray (inverted — reads as light gray on dark)",
    textTertiary: "stoneMid",
    accent: "burnishedCopper",
    accentHover: "copperLight",
    border: "charcoal",
    borderSubtle: "hsl(220 6% 22%)",
    divider: "burnishedCopper at 30% opacity",
  },

  /** Which token serves which role on LIGHT (porcelain) backgrounds */
  lightContext: {
    background: "warmPorcelain",
    backgroundAlt: "porcelainDark",
    backgroundElevated: "cleanWhite",
    textPrimary: "asphaltBlack",
    textSecondary: "stoneGray",
    textTertiary: "stoneMid",
    accent: "burnishedCopper",
    accentHover: "copperLight",
    border: "stoneLight",
    borderSubtle: "hsl(30 10% 88%)",
    divider: "burnishedCopper",
  },

  /** WCAG 2.1 AA contrast ratios — minimum 4.5:1 for normal text, 3:1 for large text */
  accessibilityMatrix: [
    { text: "cleanWhite", bg: "asphaltBlack", ratio: "14.5:1", passAA: true, passAAA: true },
    { text: "cleanWhite", bg: "charcoal", ratio: "10.8:1", passAA: true, passAAA: true },
    { text: "stoneGray", bg: "asphaltBlack", ratio: "3.2:1", passAA: false, passLargeText: true, note: "Use only for large text (≥18px bold or ≥24px regular)" },
    { text: "stoneMid", bg: "asphaltBlack", ratio: "5.1:1", passAA: true, passAAA: false },
    { text: "asphaltBlack", bg: "warmPorcelain", ratio: "13.8:1", passAA: true, passAAA: true },
    { text: "stoneGray", bg: "warmPorcelain", ratio: "4.5:1", passAA: true, passAAA: false },
    { text: "stoneMid", bg: "warmPorcelain", ratio: "2.8:1", passAA: false, passLargeText: true, note: "Tertiary text only; use for captions/overlines at ≥11px uppercase" },
    { text: "burnishedCopper", bg: "asphaltBlack", ratio: "4.7:1", passAA: true, note: "Accent text on dark — passes AA" },
    { text: "burnishedCopper", bg: "warmPorcelain", ratio: "3.0:1", passAA: false, passLargeText: true, note: "Copper on light — large text only; use for headings/CTAs, not body" },
    { text: "cleanWhite", bg: "burnishedCopper", ratio: "3.1:1", passAA: false, passLargeText: true, note: "White on copper buttons — passes for large bold text (CTA labels)" },
    { text: "asphaltBlack", bg: "cleanWhite", ratio: "15.4:1", passAA: true, passAAA: true },
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// 2. TYPOGRAPHY SYSTEM
// ─────────────────────────────────────────────────────────────

export const TYPOGRAPHY = {
  displayFont: {
    family: "'Space Grotesk', sans-serif",
    weights: [400, 500, 600, 700],
    usage: "H1–H3 headings, hero text, section titles, pull quotes, pricing figures, CTA labels. Confident geometric sans — communicates precision and competence.",
  },
  bodyFont: {
    family: "'Jost', sans-serif",
    weights: [300, 400, 500],
    usage: "Body copy, navigation links, form labels, metadata, captions, overlines. Clean humanist companion.",
  },
  noAccentFont: "No decorative, script, or serif typefaces. Premium signal comes from weight, spacing, and restraint — not font diversity.",

  /** Responsive type scale — exact clamp() values per element */
  scale: {
    h1: {
      fontSize: "clamp(2.5rem, 5vw, 4.5rem)",   // 40px → 72px
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      fontWeight: 600,
      fontFamily: "display",
      maxWidth: "20ch",
      usage: "Page hero headlines only. One per page.",
    },
    h2: {
      fontSize: "clamp(2rem, 4vw, 3.5rem)",      // 32px → 56px
      lineHeight: 1.1,
      letterSpacing: "-0.025em",
      fontWeight: 500,
      fontFamily: "display",
      maxWidth: "28ch",
      usage: "Section titles. Primary content division markers.",
    },
    h3: {
      fontSize: "clamp(1.5rem, 3vw, 2rem)",      // 24px → 32px
      lineHeight: 1.2,
      letterSpacing: "-0.015em",
      fontWeight: 500,
      fontFamily: "display",
      maxWidth: "32ch",
      usage: "Subsection headings, card titles, service names.",
    },
    h4: {
      fontSize: "clamp(1.125rem, 2vw, 1.5rem)",  // 18px → 24px
      lineHeight: 1.3,
      letterSpacing: "-0.01em",
      fontWeight: 500,
      fontFamily: "display",
      maxWidth: "36ch",
      usage: "Tertiary headings, FAQ questions, feature labels.",
    },
    pullQuote: {
      fontSize: "clamp(1.5rem, 3vw, 2.25rem)",   // 24px → 36px
      lineHeight: 1.35,
      letterSpacing: "-0.01em",
      fontWeight: 400,
      fontFamily: "display",
      maxWidth: "36ch",
      fontStyle: "normal",
      usage: "Testimonial quotes, brand statements, editorial emphasis.",
    },
    priceFigure: {
      fontSize: "clamp(3rem, 6vw, 5rem)",         // 48px → 80px
      lineHeight: 1.0,
      letterSpacing: "-0.03em",
      fontWeight: 700,
      fontFamily: "display",
      usage: "Large pricing numbers. The Custom Build price hero.",
    },
    bodyLg: {
      fontSize: "1.0625rem",                       // 17px
      lineHeight: 1.7,
      fontWeight: 300,
      fontFamily: "body",
      maxWidth: "65ch",
      usage: "Lead paragraphs, section introductions.",
    },
    body: {
      fontSize: "0.9375rem",                       // 15px
      lineHeight: 1.7,
      fontWeight: 300,
      fontFamily: "body",
      maxWidth: "60ch",
      usage: "Default body copy. Paragraphs, descriptions, FAQ answers.",
    },
    bodySm: {
      fontSize: "0.8125rem",                       // 13px
      lineHeight: 1.6,
      fontWeight: 400,
      fontFamily: "body",
      maxWidth: "55ch",
      usage: "Secondary body text, fine print, metadata.",
    },
    overline: {
      fontSize: "0.6875rem",                       // 11px
      lineHeight: 1.5,
      letterSpacing: "0.2em",
      fontWeight: 400,
      fontFamily: "body",
      textTransform: "uppercase" as const,
      usage: "Section markers, category labels, trust bar items. Always uppercase.",
    },
    caption: {
      fontSize: "0.6875rem",                       // 11px
      lineHeight: 1.5,
      letterSpacing: "0.05em",
      fontWeight: 400,
      fontFamily: "body",
      usage: "Photo captions, timestamps, attribution text.",
    },
    navLink: {
      fontSize: "0.8125rem",                       // 13px
      lineHeight: 1.0,
      letterSpacing: "0.08em",
      fontWeight: 400,
      fontFamily: "body",
      textTransform: "uppercase" as const,
      usage: "Navigation menu items.",
    },
    ctaLabel: {
      fontSize: "0.875rem",                        // 14px
      lineHeight: 1.0,
      letterSpacing: "0.08em",
      fontWeight: 500,
      fontFamily: "body",
      usage: "Button labels, CTA text.",
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 3. SPACING & GRID
// ─────────────────────────────────────────────────────────────

export const SPACING = {
  baseUnit: 8,
  scale: {
    "0.5": "4px",
    "1": "8px",
    "1.5": "12px",
    "2": "16px",
    "3": "24px",
    "4": "32px",
    "5": "40px",
    "6": "48px",
    "8": "64px",
    "10": "80px",
    "12": "96px",
    "15": "120px",
  },

  sectionPadding: {
    mobile: "60px",     // 3.75rem — py-section-mobile
    tablet: "80px",     // 5rem — py-section-tablet
    desktop: "120px",   // 7.5rem — py-section-desktop
  },

  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1400px",
  },

  grid: {
    columns: 12,
    gutterDesktop: "24px",
    gutterMobile: "16px",
    outerMarginDesktop: "80px",
    outerMarginTablet: "40px",
    outerMarginMobile: "20px",
    maxContentWidth: "1400px",
    narrowContentWidth: "960px",
    tightContentWidth: "720px",
  },

  componentInternal: {
    cardPadding: { desktop: "32px", mobile: "24px" },
    cardGap: "32px",
    formFieldGap: "24px",
    formLabelToField: "8px",
    headingToBody: "16px",
    sectionTitleToContent: "48px",
    paragraphGap: "24px",
    trustBarItemGap: { horizontal: "32px", vertical: "16px" },
    listItemGap: "12px",
    tagGap: "8px",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 4. SECTION CONTEXT SYSTEM
// ─────────────────────────────────────────────────────────────

export const SECTION_CONTEXTS = {
  dark: {
    background: "var(--asphalt)",
    backgroundAlt: "var(--charcoal)",
    textPrimary: "hsl(0 0% 100%)",
    textSecondary: "hsl(220 5% 70%)",
    textTertiary: "hsl(220 4% 55%)",
    accent: "var(--copper)",
    border: "hsl(220 6% 22%)",
    usage: "Hero sections, founder section, CTA blocks, footer. Creates cinematic depth.",
  },
  light: {
    background: "var(--porcelain)",
    backgroundAlt: "var(--porcelain-dark)",
    backgroundElevated: "hsl(0 0% 100%)",
    textPrimary: "var(--asphalt)",
    textSecondary: "hsl(220 5% 35%)",
    textTertiary: "hsl(220 4% 55%)",
    accent: "var(--copper)",
    border: "var(--stone-light)",
    usage: "Service details, proof gallery, FAQ, process steps. Clean, readable.",
  },
  alternationRules: [
    "Home page: Dark hero → Light proof → Dark founder → Light services → Dark CTA → Dark footer",
    "Services page: Dark hero → Light service tiers → Light add-ons → Dark CTA → Dark footer",
    "Never stack two dark sections without a visual separator",
    "Light-to-dark transitions use a 1px copper rule at 30% opacity",
    "Dark-to-light transitions use a hard edge — no gradient blending",
  ],
  sectionSeparator: {
    lightToDark: "1px border-top using burnishedCopper at 30% opacity",
    darkToLight: "Hard edge, no separator element",
    withinLight: "1px border-top using stoneLight",
    withinDark: "No separator — use spacing only",
  },

  /** Per-page section map — resolves context, grid width, and component for every section */
  perPageSectionMap: {
    home: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "TrustBar",          context: "dark",  grid: "narrow", component: "TrustBar" },
      { section: "ProblemEmpathy",    context: "light", grid: "narrow", component: "ProblemSection" },
      { section: "TransformationProof", context: "light", grid: "full", component: "BeforeAfterGrid" },
      { section: "ServiceOverview",   context: "light", grid: "narrow", component: "ServiceOverview" },
      { section: "ProcessSteps",      context: "light", grid: "narrow", component: "ProcessSteps" },
      { section: "FounderTeaser",     context: "dark",  grid: "narrow", component: "FounderSection" },
      { section: "Testimonials",      context: "dark",  grid: "narrow", component: "TestimonialSection" },
      { section: "AreaServed",        context: "light", grid: "narrow", component: "AreaServed" },
      { section: "CTABlock",          context: "dark",  grid: "tight",  component: "CTASection" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    services: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "TheFullReset",      context: "light", grid: "narrow", component: "FlagshipService" },
      { section: "ServiceTiers",      context: "light", grid: "narrow", component: "ServiceTierCards" },
      { section: "AddOns",            context: "light", grid: "narrow", component: "AddOnsGrid" },
      { section: "PricingTransparency", context: "light", grid: "tight", component: "PricingPhilosophy" },
      { section: "CTABlock",          context: "dark",  grid: "tight",  component: "CTASection" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    results: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "FeaturedReset",     context: "light", grid: "full",   component: "FeaturedBeforeAfter" },
      { section: "ProofGallery",      context: "light", grid: "full",   component: "FilterableProofGrid" },
      { section: "ClientStories",     context: "dark",  grid: "narrow", component: "TestimonialSection" },
      { section: "CTABlock",          context: "dark",  grid: "tight",  component: "CTASection" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    about: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "FounderStory",      context: "light", grid: "tight",  component: "FounderManifesto" },
      { section: "Values",            context: "light", grid: "narrow", component: "ValuesGrid" },
      { section: "AreaServed",        context: "light", grid: "narrow", component: "AreaServedDetail" },
      { section: "CTABlock",          context: "dark",  grid: "tight",  component: "CTASection" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    book: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "BookingForm",       context: "light", grid: "tight",  component: "BookingFormSteps" },
      { section: "FallbackCTA",       context: "light", grid: "tight",  component: "TextFallbackCTA" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    faq: [
      { section: "Hero",              context: "dark",  grid: "full",   component: "HeroSection" },
      { section: "FAQAccordion",      context: "light", grid: "tight",  component: "FAQSection" },
      { section: "CTABlock",          context: "dark",  grid: "tight",  component: "CTASection" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
    notFound: [
      { section: "NotFoundContent",   context: "dark",  grid: "tight",  component: "NotFoundBlock" },
      { section: "Footer",            context: "dark",  grid: "full",   component: "Footer" },
    ],
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 5. COMPONENT SPECIFICATIONS
// ─────────────────────────────────────────────────────────────

export const COMPONENTS = {
  buttons: {
    primary: {
      height: "48px",
      paddingX: "32px",
      fontSize: "0.875rem",
      fontWeight: 500,
      fontFamily: "body",
      letterSpacing: "0.08em",
      borderRadius: "9999px",
      textTransform: "uppercase",
      background: "var(--copper)",
      color: "hsl(0 0% 100%)",
      border: "none",
      states: {
        hover: { background: "var(--copper-light)", transform: "translateY(-1px)", transition: "all 200ms ease" },
        focus: { outline: "2px solid var(--copper-glow)", outlineOffset: "2px" },
        active: { background: "hsl(25 65% 42%)", transform: "translateY(0)" },
        disabled: { opacity: 0.5, cursor: "not-allowed" },
      },
    },
    secondary: {
      height: "48px",
      paddingX: "32px",
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.08em",
      borderRadius: "9999px",
      textTransform: "uppercase",
      background: "transparent",
      color: "var(--copper)",
      border: "2px solid var(--copper)",
      states: {
        hover: { background: "hsl(25 60% 55% / 0.1)", transition: "all 200ms ease" },
        focus: { outline: "2px solid var(--copper-glow)", outlineOffset: "2px" },
        active: { background: "hsl(25 60% 55% / 0.2)" },
        disabled: { opacity: 0.5, cursor: "not-allowed" },
      },
    },
    ghost: {
      height: "auto",
      paddingX: "0",
      fontSize: "0.875rem",
      fontWeight: 400,
      letterSpacing: "0.04em",
      borderRadius: "0",
      background: "transparent",
      color: "var(--copper)",
      border: "none",
      textDecoration: "none",
      states: {
        hover: { textDecoration: "underline", textUnderlineOffset: "4px", transition: "all 150ms ease" },
        focus: { outline: "2px solid var(--copper-glow)", outlineOffset: "2px", borderRadius: "2px" },
      },
    },
    ctaHierarchy: [
      "Primary: one per viewport. The dominant action — 'Book Your Reset', 'Get Started'",
      "Secondary: supporting actions — 'View Services', 'See Results', 'Learn More'",
      "Ghost: inline text links, 'Read more' continuations, breadcrumb-like navigation",
      "Never place two primary buttons adjacent to each other",
      "On dark sections: primary copper button stands. Secondary uses white border + white text",
    ],

    secondaryOnDark: {
      height: "48px",
      paddingX: "32px",
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.08em",
      borderRadius: "9999px",
      textTransform: "uppercase",
      background: "transparent",
      color: "hsl(0 0% 100%)",
      border: "2px solid hsl(0 0% 100% / 0.6)",
      states: {
        hover: { borderColor: "hsl(0 0% 100%)", background: "hsl(0 0% 100% / 0.08)", transition: "all 200ms ease" },
        focus: { outline: "2px solid var(--copper-glow)", outlineOffset: "2px" },
        active: { background: "hsl(0 0% 100% / 0.14)" },
        disabled: { opacity: 0.4, cursor: "not-allowed" },
      },
    },

    loadingState: {
      note: "Applies to all button variants when form is submitting or async action in progress.",
      spinnerSize: "16px",
      spinnerColor: "inherit from button text color",
      labelOpacity: 0.5,
      disabled: true,
      cursor: "wait",
      spinnerAnimation: "rotate 700ms linear infinite",
    },

    iconButton: {
      size: "40px",
      borderRadius: "2px",
      background: "transparent",
      border: "1px solid var(--copper)",
      color: "var(--copper)",
      iconSize: "20px",
      tooltip: "Required — always provide accessible label via title or aria-label",
      states: {
        hover: { background: "hsl(25 60% 55% / 0.1)", transition: "all 150ms ease" },
        focus: { outline: "2px solid var(--copper-glow)", outlineOffset: "2px" },
      },
    },
  },

  cards: {
    light: {
      background: "hsl(0 0% 100%)",
      borderRadius: "2px",
      border: "1px solid var(--stone-light)",
      shadow: "0 2px 8px hsl(220 8% 12% / 0.06)",
      padding: { desktop: "32px", mobile: "24px" },
      hover: {
        transform: "translateY(-4px)",
        shadow: "0 8px 24px hsl(220 8% 12% / 0.10)",
        transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      },
    },
    dark: {
      background: "var(--charcoal)",
      borderRadius: "2px",
      border: "1px solid hsl(220 6% 22%)",
      shadow: "none",
      padding: { desktop: "32px", mobile: "24px" },
      hover: {
        borderColor: "var(--copper)",
        transition: "border-color 300ms ease",
      },
    },
  },

  forms: {
    input: {
      height: "48px",
      paddingX: "16px",
      fontSize: "0.9375rem",
      fontWeight: 300,
      fontFamily: "body",
      borderRadius: "2px",
      background: "hsl(0 0% 100%)",
      border: "1px solid var(--stone-light)",
      color: "var(--asphalt)",
      placeholder: "hsl(220 4% 55%)",
      states: {
        focus: {
          borderColor: "var(--copper)",
          boxShadow: "0 0 0 3px hsl(25 60% 55% / 0.15)",
          transition: "all 200ms ease",
        },
        error: {
          borderColor: "hsl(0 65% 51%)",
          boxShadow: "0 0 0 3px hsl(0 65% 51% / 0.1)",
        },
        success: {
          borderColor: "hsl(145 55% 42%)",
        },
        disabled: {
          background: "var(--porcelain-dark)",
          opacity: 0.6,
          cursor: "not-allowed",
        },
      },
    },
    textarea: {
      minHeight: "120px",
      resize: "vertical",
      note: "Same styling as input, taller default",
    },
    label: {
      fontSize: "0.8125rem",
      fontWeight: 500,
      fontFamily: "body",
      color: "var(--asphalt)",
      marginBottom: "8px",
      position: "above field, left-aligned",
    },
    select: {
      note: "Same dimensions as input. Custom chevron indicator using lucide ChevronDown. No native browser arrow.",
    },
    errorMessage: {
      fontSize: "0.75rem",
      fontWeight: 400,
      color: "hsl(0 65% 51%)",
      marginTop: "4px",
      icon: "lucide AlertCircle at 14px inline before text",
    },
  },

  navigation: {
    desktop: {
      height: "72px",
      position: "fixed top",
      zIndex: 40,
      initialState: {
        background: "transparent",
        logoColor: "white",
        linkColor: "hsl(0 0% 100% / 0.85)",
      },
      scrolledState: {
        trigger: "scrollY > 80px",
        background: "hsl(220 8% 12% / 0.95)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid hsl(220 6% 22%)",
        transition: "all 300ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
      },
      logo: {
        height: "28px",
        position: "left",
      },
      links: {
        typography: "navLink scale (13px uppercase, 0.08em tracking)",
        gap: "32px",
        hoverUnderline: "2px copper line, animate from center, 200ms",
        activeIndicator: "copper underline persistent",
      },
      ctaButton: {
        variant: "primary (pill copper)",
        size: "height 40px, paddingX 24px, fontSize 0.8125rem",
        label: "Get a Quote",
      },
    },
    mobile: {
      height: "64px",
      hamburgerIcon: "3 lines, 20px wide, 2px stroke, 16px gap. Animate to X on open (300ms).",
      menuOverlay: {
        background: "hsl(220 8% 12% / 0.98)",
        animation: "slide from right, 400ms ease-out",
        linkTypography: "display-sm (18–24px), 500 weight, white",
        linkGap: "24px",
        ctaAtBottom: "Full-width primary button, 16px margin from edges",
      },
    },
  },

  footer: {
    background: "var(--asphalt)",
    paddingTop: "80px",
    paddingBottom: "40px",
    layout: {
      desktop: "4-column grid (Contact | Services | Areas Served | Book CTA)",
      mobile: "Single column, stacked, 40px gap between groups",
    },
    contentHierarchy: [
      "1. Contact info: phone, email, hours (prominent)",
      "2. Service links: The Custom Build, Interior Only, Exterior Only, Add-ons",
      "3. Service areas: Calgary neighborhoods list",
      "4. Booking CTA: secondary button 'Book Your Reset'",
      "5. Social links: Instagram, Google Business",
      "6. Legal: © Cochrane Master Builders, Privacy, Terms — bottom bar",
    ],
    typography: {
      sectionHeading: "overline scale, copper color",
      links: "body-sm, white at 70% opacity, hover → 100%",
      legal: "caption scale, stoneMid color",
    },
    copperRule: "Full-width 1px copper rule at 15% opacity above legal bar",
  },

  beforeAfterSlider: {
    imageAspectRatio: "4:3",
    container: {
      borderRadius: "2px",
      overflow: "hidden",
      position: "relative",
    },
    handle: {
      width: "48px",
      height: "48px",
      shape: "circle",
      background: "hsl(0 0% 100%)",
      border: "3px solid var(--copper)",
      shadow: "0 2px 8px hsl(220 8% 12% / 0.2)",
      icon: "Two horizontal arrows (lucide ArrowLeftRight), copper color, 20px",
      verticalLine: "2px wide, white, full container height, centered on handle",
    },
    annotations: {
      beforeLabel: { text: "BEFORE", position: "top-left", padding: "8px 12px", background: "hsl(220 8% 12% / 0.7)", color: "white", fontSize: "overline scale" },
      afterLabel: { text: "AFTER", position: "top-right", padding: "8px 12px", background: "hsl(25 60% 55% / 0.85)", color: "white", fontSize: "overline scale" },
    },
    touchTarget: "Minimum 44x44px hit area on handle — larger than visual size",
    keyboard: "Left/Right arrows move handle 5% per press. Focus ring on handle.",
    screenReader: "aria-label='Drag to compare before and after images' role='slider' aria-valuemin=0 aria-valuemax=100",
    mobileSwipe: {
      gesture: "Horizontal pan via touch — track deltaX from touchstart, update slider position proportionally",
      snapPoints: [0, 25, 50, 75, 100],
      snapThreshold: "If released within 8% of a snap point, animate to it (200ms ease-out). Otherwise stay at release position.",
      momentum: false,
      note: "No inertia — slider stops exactly where finger lifts, or snaps to nearest point.",
    },
    instructionalTooltip: {
      text: "Drag to compare",
      position: "Centered above handle, 8px gap",
      fontSize: "caption scale",
      color: "hsl(0 0% 100%)",
      background: "hsl(220 8% 12% / 0.85)",
      borderRadius: "2px",
      padding: "4px 10px",
      showCondition: "Visible on first render. Fades out after first touch/click interaction (opacity 0, 300ms).",
      prefersReducedMotion: "Always hidden — screen reader handles via aria-label.",
    },
    touchFeedback: {
      onGrab: "Handle scales to 1.08 over 80ms, then settles to 1.0 over 120ms",
      cursor: "grab → grabbing on active",
    },
  },

  proofCard: {
    imageAspectRatio: "4:3",
    borderRadius: "2px",
    overflow: "hidden",
    conditionTag: {
      position: "absolute top-left, 12px inset",
      fontSize: "overline scale",
      padding: "4px 10px",
      background: "hsl(220 8% 12% / 0.75)",
      color: "white",
      borderRadius: "2px",
      examples: ["Kids + Dog Hair", "Coffee Spill", "Full Interior", "Paint Finishing"],
    },
    homeLabel: {
      fontSize: "caption scale",
      color: "stoneMid on light / stoneGray on dark",
      marginTop: "8px",
      format: "'2019 Honda Civic — Owner: 3 years'",
    },
    caption: {
      fontSize: "body-sm",
      color: "stoneGray on light",
      marginTop: "4px",
      maxWidth: "100%",
    },
    hover: {
      imageScale: "scale(1.03)",
      overlay: "linear-gradient(to top, hsl(220 8% 12% / 0.6) 0%, transparent 50%)",
      transition: "all 400ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    },
  },

  testimonialBlock: {
    quoteMark: {
      character: "\u201C",
      fontSize: "4rem",
      color: "var(--copper)",
      lineHeight: 0.8,
      marginBottom: "8px",
    },
    quoteText: "pullQuote scale from typography system",
    carousel: {
      autoPlay: false,
      note: "Manual swipe/click only — per anti-pattern rule 'NEVER carousel auto-play'.",
      transition: {
        type: "fade + translateX",
        duration: "400ms",
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
        translateXDistance: "24px",
      },
      pagination: {
        type: "dots",
        dotSize: "8px",
        dotColor: "var(--stone-light)",
        activeDotColor: "var(--copper)",
        activeDotScale: 1.5,
        dotGap: "12px",
        dotTransition: "all 200ms ease",
        position: "Centered below quote block, 24px margin-top",
      },
      navigation: {
        arrows: "Left/right chevron buttons (lucide ChevronLeft/ChevronRight), 40px, ghost style",
        position: "Flanking the quote on desktop (absolute, vertically centered). Hidden on mobile — swipe only.",
      },
      swipe: {
        enabled: true,
        threshold: "30px minimum swipe distance to trigger slide change",
        direction: "horizontal only",
      },
      desktop: {
        visibleCount: 1,
        maxWidth: "720px",
      },
      mobile: {
        visibleCount: 1,
        swipeEnabled: true,
      },
    },
    attribution: {
      fontSize: "body-sm",
      fontWeight: 500,
      color: "asphaltBlack on light / cleanWhite on dark",
      format: "— First Name, Home Year + Make",
      example: "— Sarah, 2021 RAV4",
    },
    homeContext: {
      fontSize: "caption scale",
      color: "stoneMid",
      format: "'Full Interior Reset • Kids + dog owner'",
    },
  },

  pricingDisplay: {
    priceValue: {
      fontSize: "priceFigure scale (48px–80px)",
      fontWeight: 700,
      fontFamily: "display",
      color: "burnishedCopper",
      prefix: "From $",
    },
    factorExplainer: {
      layout: "Horizontal pills below price",
      pillStyle: "porcelainDark background, 2px radius, overline text, 8px gap",
      factors: ["Home Size", "Condition", "Add-ons"],
    },
    travelBadge: {
      text: "Travel Included — We Come to You",
      style: "overline scale, copper color, centered below price",
      icon: "lucide MapPin inline, 14px",
    },
  },

  accordion: {
    headerHeight: "min 56px",
    headerPadding: "16px 0",
    headerFont: "h4 scale (18–24px, display font, 500 weight)",
    headerColor: "asphaltBlack on light",
    indicator: {
      icon: "lucide ChevronDown, 20px",
      color: "burnishedCopper",
      rotation: "rotate(180deg) on open",
      transition: "transform 200ms ease",
    },
    contentReveal: {
      animation: "height auto with 200ms ease-out",
      paddingBottom: "16px",
    },
    itemSeparator: "1px border-bottom using stoneLight",
    itemGap: "0 — items are flush with separator between",
  },

  stickyMobileCTA: {
    height: "56px",
    position: "fixed bottom",
    zIndex: 50,
    background: "hsl(220 8% 12% / 0.95)",
    backdropFilter: "blur(12px)",
    borderTop: "1px solid hsl(220 6% 22%)",
    padding: "8px 16px",
    button: {
      variant: "primary copper pill",
      width: "100%",
      height: "40px",
      label: "Book Your Reset",
    },
    visibility: {
      showTrigger: "User scrolls past hero section (heroBottom enters viewport top)",
      hideTrigger: "User scrolls to footer",
      animation: "translateY(100%) → translateY(0), 300ms ease-out",
    },
    desktopBehavior: "Hidden on ≥1024px — desktop nav CTA is sufficient",
  },

  overlineLabel: {
    fontSize: "0.6875rem",
    letterSpacing: "0.2em",
    fontWeight: 400,
    textTransform: "uppercase",
    fontFamily: "body",
    colorOnLight: "stoneMid",
    colorOnDark: "copperLight",
    marginBottom: "12px",
    usage: "Above section headings, above card titles, trust bar labels",
  },

  copperRule: {
    default: { width: "48px", height: "1px", color: "var(--copper)", marginY: "24px" },
    wide: { width: "64px", height: "1px", color: "var(--copper)", marginY: "32px" },
    fullWidth: { width: "100%", height: "1px", color: "var(--copper)", opacity: 0.3, marginY: "0" },
    usage: "Visual punctuation between content blocks. Default below overline labels. Wide for section emphasis. Full-width for footer/section boundaries.",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 6. OVERLAY & IMAGE TREATMENT
// ─────────────────────────────────────────────────────────────

export const IMAGE_TREATMENT = {
  heroOverlay: {
    gradient: "linear-gradient(to bottom, hsl(220 8% 12% / 0.65) 0%, hsl(220 8% 12% / 0.35) 40%, hsl(220 8% 12% / 0.75) 100%)",
    purpose: "Ensures white text legibility over photographic hero images",
  },
  cardImageHover: {
    overlay: "linear-gradient(to top, hsl(220 8% 12% / 0.5) 0%, transparent 50%)",
    transition: "opacity 400ms ease",
  },
  beforeAfterImages: {
    filter: "none — no color grading, high contrast, true-to-life",
    framing: "Consistent 4:3, same angle, same lighting conditions",
    purpose: "Authenticity is the proof. No enhancement.",
  },
  founderPortrait: {
    overlay: "hsl(25 30% 50% / 0.08) — very subtle warm tint",
    aspectRatio: "3:4",
    framing: "Environmental, work-context. Hands-on detail moments.",
  },
  textureCloseups: {
    overlay: "none",
    display: "edge-to-edge, no border radius",
    aspectRatio: "1:1 or 3:2",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 7. ICON SYSTEM
// ─────────────────────────────────────────────────────────────

export const ICONS = {
  library: "Lucide React",
  style: "Line icons, consistent stroke width",
  defaultSize: "24px",
  strokeWidth: 1.5,
  sizing: {
    inline: "16px — inside buttons, form indicators",
    standard: "24px — standalone icons, feature lists",
    feature: "32px — service icons, process step markers",
    hero: "48px — trust bar stats, large feature callouts",
  },
  color: {
    default: "inherit — matches surrounding text color",
    interactive: "var(--copper) — clickable icons, links",
    muted: "stoneMid — decorative, non-interactive",
  },
  allowedMotifs: [
    "ArrowRight, ArrowLeft — navigation, CTAs",
    "ChevronDown, ChevronRight — accordions, dropdowns",
    "Check, CheckCircle — feature lists, confirmation",
    "Phone, Mail — contact",
    "MapPin — service areas, travel included",
    "Calendar, Clock — booking, availability",
    "Droplets — extraction, cleaning",
    "Sparkles — results (used sparingly, only in proof context)",
    "Star — ratings, reviews",
    "Home — home type selector only",
    "Camera — before/after",
  ],
  prohibitedMotifs: [
    "Shield — implies security/insurance, not custom home building",
    "Award/Trophy — feels inauthentic for a solo operator",
    "Ornate decorative icons — conflicts with industrial aesthetic",
    "Animated emoji/icons — breaks premium tone",
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// 8. FOCUS & ACCESSIBILITY
// ─────────────────────────────────────────────────────────────

export const ACCESSIBILITY = {
  focusRing: {
    style: "2px solid var(--copper-glow)",
    offset: "2px",
    borderRadius: "inherit from element",
    note: "Applied via focus-visible only — no focus ring on mouse click",
  },
  skipToContent: {
    text: "Skip to main content",
    style: "sr-only by default, visible on focus — positioned top-left, asphalt bg, white text, z-60",
  },
  touchTargets: {
    minimum: "44x44px",
    recommended: "48x48px",
    note: "Apply to all interactive elements. Use padding to increase hit area if visual size is smaller.",
  },
  reducedMotion: {
    rule: "@media (prefers-reduced-motion: reduce)",
    behavior: [
      "Disable all scroll-triggered animations",
      "Set all transition durations to 0.01ms",
      "Keep essential state transitions (accordion open/close) but instant",
      "Before/after slider: still functional, just no easing",
      "Page transitions: instant cut, no slide/fade",
    ],
  },
  contrastReference: "See COLORS.accessibilityMatrix for all verified pairings",
  semanticHTML: [
    "One <h1> per page",
    "Heading levels never skip (h1 → h2 → h3, never h1 → h3)",
    "Use <main>, <nav>, <footer>, <section>, <article> landmarks",
    "All images require descriptive alt text (see IMAGERY.altTextPatterns)",
    "Form inputs require associated <label> elements",
    "Interactive elements require visible focus indicators",
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// 9. MOTION SYSTEM
// ─────────────────────────────────────────────────────────────

export const MOTION = {
  easing: {
    default: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    description: "Smooth, confident, settling — the 'precision' curve",
  },
  durations: {
    micro: "150–200ms — hover states, button feedback, toggles, icon rotation",
    reveal: "400–600ms — section content scroll reveal, card entrance",
    page: "300–500ms — route transitions",
    hero: "800–1200ms — initial load hero animation, text stagger",
    slider: "0ms — before/after slider is user-driven, zero artificial delay",
  },
  rules: [
    "Only animate transform and opacity — never layout properties (width, height, margin, padding)",
    "Content appears once and stays — never disappears on scroll-away",
    "Stagger siblings by 50ms for sequential reveals, maximum 5 staggered items",
    "Maximum 3 animated elements visible simultaneously",
    "Respect prefers-reduced-motion — see ACCESSIBILITY.reducedMotion",
    "Mobile: reduce scroll-triggered animations; keep hover/tap feedback only",
  ],
  perComponent: {
    scrollReveal: {
      trigger: "Element 20% into viewport (IntersectionObserver threshold 0.2)",
      animation: "opacity 0→1, translateY(20px→0)",
      duration: "500ms",
      easing: "default curve",
      stagger: "50ms between siblings",
    },
    cardHover: {
      properties: "transform, box-shadow",
      duration: "300ms",
      easing: "default curve",
    },
    navTransition: {
      properties: "background-color, border-color, backdrop-filter",
      duration: "300ms",
      easing: "default curve",
    },
    accordionToggle: {
      properties: "height (auto), chevron rotation",
      duration: "200ms",
      easing: "ease-out",
    },
    pageTransition: {
      exit: "opacity 1→0, 200ms",
      enter: "opacity 0→1, translateY(8px→0), 300ms, 100ms delay",
    },
    mobileCTABar: {
      enter: "translateY(100%→0), 300ms ease-out",
      exit: "translateY(0→100%), 200ms ease-in",
    },
    mobileMenu: {
      enter: "translateX(100%→0), 400ms ease-out",
      exit: "translateX(0→100%), 300ms ease-in",
      linkStagger: "50ms per link, starting 200ms after menu opens",
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 10. SHADOWS & DEPTH
// ─────────────────────────────────────────────────────────────

export const SHADOWS = {
  subtle: "0 2px 8px hsl(220 8% 12% / 0.06)",
  medium: "0 8px 24px hsl(220 8% 12% / 0.08)",
  large: "0 16px 48px hsl(220 8% 12% / 0.12)",
  rule: "No excessive drop shadows. Use color contrast and border for separation in most cases. Shadows are reserved for elevated white cards on porcelain backgrounds.",
} as const;

// ─────────────────────────────────────────────────────────────
// 11. Z-INDEX SCALE
// ─────────────────────────────────────────────────────────────

export const Z_INDEX = {
  base: 0,
  stickyContent: 10,
  stickyHeader: 20,
  dropdown: 30,
  navigation: 40,
  stickyCTA: 50,
  modalOverlay: 60,
  modal: 65,
  toast: 70,
  tooltip: 80,
  skipLink: 90,
  note: "Never use arbitrary z-index values. Always reference this scale.",
} as const;

// ─────────────────────────────────────────────────────────────
// 12. LOGO
// ─────────────────────────────────────────────────────────────

export const LOGO = {
  primary: "src/assets/veepo-logo.png",
  clearSpace: "Minimum 16px on all sides (1x logo cap-height)",
  minWidth: "120px for legibility",
  navSize: {
    desktop: "height 28px",
    mobile: "height 24px",
  },
  onDark: "White/light version — full opacity",
  onLight: "Dark version — asphaltBlack tone",
  doNots: [
    "Never place on busy photographic backgrounds without dark overlay",
    "Never stretch, rotate, or modify proportions",
    "Never use colors outside brand palette",
    "Never add drop shadows, glows, or gradients to the logo mark",
    "Never display smaller than minimum width",
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// 13. IMAGERY
// ─────────────────────────────────────────────────────────────

export const IMAGERY = {
  style: [
    "Real before/after pairs from actual Calgary jobs",
    "Close-up texture macro: leather grain, carpet fibers after extraction, paint clarity",
    "Interior atmosphere shots — almost architectural in composition",
    "Founder-at-work documentary: hands-on detail moments",
    "Calgary residential contexts: driveways, suburban streets, real neighborhoods",
    "Natural light, weather-appropriate — Calgary realism, not studio glamour",
    "Extraction evidence: dirty water bucket, what came OUT",
  ],
  avoid: [
    "Spinning home GIFs or animations",
    "Water-droplet-on-hood stock photos",
    "Generic man-wiping-home-with-cloth imagery",
    "Sparkle/shine particle effects",
    "Checkered racing patterns",
    "Glossy black backgrounds with lens flares",
    "Stock photography of pristine showroom homes",
    "Overly filtered or heavily color-graded images",
  ],
  aspectRatios: {
    hero: { ratio: "16:9 or 21:9", dimensions: "1920×1080 or 1920×822", usage: "Full-bleed cinematic hero" },
    proofPairs: { ratio: "4:3", dimensions: "800×600", usage: "Before/after comparison — consistent framing" },
    textureCloseup: { ratio: "1:1 or 3:2", dimensions: "600×600 or 900×600", usage: "Macro detail shots" },
    founderPortrait: { ratio: "3:4", dimensions: "600×800", usage: "Environmental founder photo" },
    serviceCard: { ratio: "16:9", dimensions: "640×360", usage: "Service tier card header image" },
    testimonialBg: { ratio: "21:9", dimensions: "1920×822", usage: "Wide atmospheric behind quote" },
  },
  fileSizeBudgets: {
    hero: "< 200KB (WebP, quality 80)",
    proofImage: "< 150KB per image (WebP, quality 85)",
    cardImage: "< 100KB (WebP, quality 80)",
    thumbnail: "< 40KB (WebP, quality 75)",
    founderPortrait: "< 120KB (WebP, quality 85)",
  },
  altTextPatterns: {
    beforeAfter: "'Before: [condition description]. After: [result description].' Example: 'Before: Coffee-stained grey fabric home seat with visible discoloration. After: Clean grey fabric seat restored to original color.'",
    founder: "'Cochrane Master Builders [action] [context].' Example: 'Cochrane Master Builders extracting carpet fibers in a client\u2019s addition.'",
    texture: "'Close-up of [material] [condition].' Example: 'Close-up of restored leather steering wheel with natural grain visible.'",
    service: "'[Service name]: [what\u2019s shown].' Example: 'The Custom Build: complete interior deep clean in progress.'",
  },

  /** Responsive image delivery strategy */
  responsiveStrategy: {
    srcsetBreakpoints: ["640w", "960w", "1280w", "1920w"],
    sizesPatterns: {
      fullBleed: "(min-width: 1280px) 1920px, 100vw",
      narrowContent: "(min-width: 1024px) 960px, (min-width: 640px) 90vw, 100vw",
      cardImage: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
      proofPair: "(min-width: 1024px) 400px, (min-width: 640px) 45vw, 100vw",
    },
    format: "WebP with JPEG fallback via <picture>",
  },

  lazyLoading: {
    heroImages: "loading='eager' — above the fold, critical render path",
    belowFold: "loading='lazy' — native browser lazy, no JS library needed",
    intersectionThreshold: "200px rootMargin for preloading just before viewport entry",
  },

  placeholder: {
    type: "Skeleton pulse — animated placeholder while image loads",
    background: "var(--porcelain-dark)",
    animation: "pulse 1.5s ease-in-out infinite (matching Tailwind animate-pulse)",
    aspectRatio: "Preserve container aspect ratio using CSS aspect-ratio property matching target image ratio",
    note: "Never show a broken-image icon. Skeleton remains until load or error — on error, show neutral porcelain background.",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 14. ANTI-PATTERNS
// ─────────────────────────────────────────────────────────────

export const ANTI_PATTERNS = {
  visual: [
    "NEVER use rounded-everything (rounded-xl, rounded-2xl on containers). Radius is 2px for editorial elements, pill for CTAs only.",
    "NEVER use gradient backgrounds on sections. Solid color tokens only.",
    "NEVER use colored text shadows or text glow effects.",
    "NEVER use parallax scrolling on images. Static positioning, scroll reveal only.",
    "NEVER use carousel/slider auto-play. User-initiated only.",
    "NEVER use floating decorative elements (dots, blobs, circles).",
    "NEVER stack more than 2 font weights on a single card/component.",
    "NEVER use opacity below 0.4 for body text — it becomes illegible.",
    "NEVER use box-shadow on dark-background components.",
    "NEVER center-align body paragraphs. Left-align always. Center only for single-line overlines and headings.",
  ],
  copy: [
    "NEVER use 'luxury', 'premium', 'elite', 'VIP' — let the craft speak.",
    "NEVER use construction jargon: 'wall finish', 'drywall + paint finishing', 'millwork detail' without explanation.",
    "NEVER use pushy sales language: 'Act now!', 'Limited spots!', 'Don't miss out!'",
    "NEVER use gendered language: 'man cave', 'dad home', 'mom's starter home'.",
    "NEVER reference competitors or other finishing services.",
    "NEVER promise specific timelines that can't be met.",
    "NEVER use exclamation marks in headings. Period or no punctuation.",
  ],
  layout: [
    "NEVER use full-width text without max-width constraint (max 60ch body, 28ch heading).",
    "NEVER place content edge-to-edge without outer margin (minimum 20px mobile).",
    "NEVER use sidebar layouts — this is a single-column editorial experience.",
    "NEVER use tabbed navigation within sections — progressive disclosure via scroll.",
    "NEVER stack more than 3 cards in a row on mobile.",
  ],
} as const;

// ─────────────────────────────────────────────────────────────
// 15. PAGE LAYOUT BLUEPRINTS
// ─────────────────────────────────────────────────────────────

export const PAGE_BLUEPRINTS = {
  note: "Each page blueprint resolves section ordering, context (dark/light), container width, and vertical rhythm. Developers build pages by composing components in this exact order.",

  home: {
    title: "Home — Convert visitors into bookings",
    sections: [
      { name: "Hero",              verticalPadding: "0 (full-bleed)", containerWidth: "full" },
      { name: "TrustBar",          verticalPadding: "sectionPadding.mobile / sectionPadding.desktop", containerWidth: "narrow (960px)" },
      { name: "ProblemEmpathy",    verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
      { name: "TransformationProof", verticalPadding: "sectionPadding", containerWidth: "full (1400px)" },
      { name: "ServiceOverview",   verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "ProcessSteps",      verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "FounderTeaser",     verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "Testimonials",      verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "AreaServed",        verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "CTABlock",          verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
    ],
    verticalRhythm: "Each section separated by sectionPadding value. No additional margin between sections — padding handles all vertical space.",
  },

  services: {
    title: "Services — Explain The Custom Build + tiers",
    sections: [
      { name: "Hero",              verticalPadding: "0", containerWidth: "full" },
      { name: "TheFullReset",      verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "ServiceTiers",      verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "AddOns",            verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "PricingTransparency", verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
      { name: "CTABlock",          verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
    ],
  },

  results: {
    title: "Results — Before/after proof gallery",
    sections: [
      { name: "Hero",              verticalPadding: "0", containerWidth: "full" },
      { name: "FeaturedReset",     verticalPadding: "sectionPadding", containerWidth: "full (1400px)" },
      { name: "ProofGallery",      verticalPadding: "sectionPadding", containerWidth: "full (1400px)" },
      { name: "ClientStories",     verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "CTABlock",          verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
    ],
  },

  about: {
    title: "About — Founder story + trust",
    sections: [
      { name: "Hero",              verticalPadding: "0", containerWidth: "full" },
      { name: "FounderStory",      verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
      { name: "Values",            verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "AreaServed",        verticalPadding: "sectionPadding", containerWidth: "narrow (960px)" },
      { name: "CTABlock",          verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
    ],
  },

  book: {
    title: "Book — Frictionless booking form",
    sections: [
      { name: "Hero",              verticalPadding: "0", containerWidth: "full" },
      { name: "BookingForm",       verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
      { name: "FallbackCTA",       verticalPadding: "32px top / sectionPadding bottom", containerWidth: "tight (720px)" },
    ],
  },

  faq: {
    title: "FAQ — Objection handling",
    sections: [
      { name: "Hero",              verticalPadding: "0", containerWidth: "full" },
      { name: "FAQAccordion",      verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
      { name: "CTABlock",          verticalPadding: "sectionPadding", containerWidth: "tight (720px)" },
    ],
  },

  notFound: {
    title: "404 — Wrong turn recovery",
    sections: [
      { name: "NotFoundContent",   verticalPadding: "0 (centered in viewport)", containerWidth: "tight (720px)" },
      { name: "Footer",            verticalPadding: "0", containerWidth: "full" },
    ],
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 16. COPY SYSTEM
// ─────────────────────────────────────────────────────────────

export const COPY_SYSTEM = {
  headlineFormulas: {
    homeHero: {
      pattern: "[Promise statement]. [Proof anchor].",
      resolved: "Get your home back. Calgary\u2019s mobile interior reset.",
    },
    servicesHero: {
      pattern: "[Service name]. [What it includes in one breath].",
      resolved: "The Custom Build. Interior deep clean + exterior restoration, at your door.",
    },
    resultsHero: {
      pattern: "[Proof quantity]. [Emotional outcome].",
      resolved: "200+ homes reset. See the difference.",
    },
    aboutHero: {
      pattern: "[Founder name]. [One-line origin].",
      resolved: "Cochrane Master Builders. Started with one bucket and a borrowed pressure washer.",
    },
    faqHero: {
      pattern: "[Direct address]. [Reassurance].",
      resolved: "Questions? We\u2019ve got answers. No judgment, just clarity.",
    },
  },

  ctaLabelBank: {
    primary: [
      "Book Your Reset",
      "Get Started",
      "Get a Quote",
      "Schedule Your Reset",
    ],
    secondary: [
      "View Services",
      "See Results",
      "Learn More",
      "Our Approach",
      "Meet Cochrane Master Builders",
    ],
    ghost: [
      "Read more",
      "See all results",
      "View full story",
      "How it works",
    ],
  },

  microcopy: {
    loading: {
      formSubmitting: "Sending your details\u2026",
      imageLoading: "Loading\u2026",
      pageTransition: "",
    },
    empty: {
      noResults: "No results match your filter. Try broadening your search.",
      noTestimonials: "Reviews coming soon.",
    },
    validation: {
      required: "This field is required.",
      invalidEmail: "Please enter a valid email address.",
      invalidPhone: "Please enter a valid phone number.",
      minLength: "Must be at least {min} characters.",
      selectRequired: "Please select an option.",
    },
    success: {
      bookingConfirmed: "We\u2019ve got your details. We\u2019ll text you within 2 hours to confirm.",
      messageSent: "Message sent. We\u2019ll be in touch shortly.",
    },
    error: {
      generic: "Something went wrong. Please try again or text us directly.",
      network: "Connection issue. Check your internet and try again.",
    },
  },

  toneCalibration: [
    {
      wrong: "We offer premium luxury finishing services for discerning homeowners!",
      right: "We deep clean your home\u2019s interior and restore the exterior. We come to you.",
      why: "No puffery. State what you do, directly.",
    },
    {
      wrong: "Don\u2019t let your dirty home embarrass you any longer!",
      right: "Life gets messy. Your home doesn\u2019t have to stay that way.",
      why: "Empathy without shame. Normalize the problem, offer the solution.",
    },
    {
      wrong: "Act now! Limited availability this month!",
      right: "Currently booking 2\u20133 weeks out. Secure your spot.",
      why: "Honest scarcity. Real timeline, no pressure tactics.",
    },
  ],

  dirtyDanielPhrases: [
    "You know that moment when someone asks for a ride and you panic?",
    "The coffee stain from three months ago. The french fry graveyard under the seat.",
    "You\u2019ve been meaning to deal with it. Life keeps happening.",
    "No judgment. Just results.",
    "We\u2019ve seen it all. Truly.",
    "Your home used to feel like yours. Let\u2019s get it back.",
  ],

  resolvedPageCopy: {
    home: {
      hero: {
        headline: "Get your home back.",
        subline: "Calgary\u2019s mobile interior reset. Deep clean + exterior restoration, at your door.",
        trustLine: "200+ homes reset \u00b7 4.9\u2605 Google \u00b7 Travel included",
      },
      problemEmpathy: {
        overline: "Sound familiar?",
        paragraphs: [
          "You know that moment when someone asks for a ride and you panic? The quick glance at the backseat. The crumbs. The stains. The smell you\u2019ve gone nose-blind to.",
          "You\u2019ve been meaning to deal with it. But between work, kids, and everything else\u2014it just keeps slipping. A quick handyman fix won\u2019t fix it. You know that.",
          "We get it. And we\u2019re here to handle it\u2014no judgment, no lecture. Just results.",
        ],
      },
      serviceOverview: {
        overline: "Our Flagship",
        headline: "The Custom Build",
        body: "Interior deep clean + exterior restoration. We show up at your door with professional-grade equipment, extract every crumb and stain, restore your paint, and leave your home feeling factory-fresh. From ~$100, travel included.",
      },
      founderTeaser: {
        overline: "Meet Cochrane Master Builders",
        headline: "Started with one bucket and a borrowed pressure washer.",
        body: "Now delivering the most satisfying home transformations in Calgary. Every home gets the same obsessive attention to detail\u2014because that\u2019s the standard.",
      },
      cta: {
        overline: "Ready?",
        headline: "Your home is next.",
        body: "Book your reset. We\u2019ll come to you, handle everything, and leave your home feeling like yours again.",
      },
    },
    services: {
      hero: {
        headline: "The Custom Build.",
        subline: "Interior deep clean + exterior restoration, at your door.",
      },
    },
    results: {
      hero: {
        headline: "200+ homes reset.",
        subline: "See the difference. Real Calgary homes, real conditions, real results.",
      },
    },
    about: {
      hero: {
        headline: "Cochrane Master Builders.",
        subline: "Started with one bucket and a borrowed pressure washer.",
      },
      manifesto: [
        "I started Cochrane Master Builders because I couldn\u2019t find a mobile service in Calgary that actually did deep work. Most places do a surface wipe and call it done. That wasn\u2019t good enough.",
        "Every home I touch gets the same treatment: full interior extraction, paint decontamination, and a complete sensory reset. I bring everything to your driveway\u2014no drop-offs, no coordination, no wasted time.",
        "I\u2019ve seen it all. Pet hair carpets, years-old coffee stains, homes people are embarrassed to show. That\u2019s exactly where I do my best work. The worse the condition, the more dramatic the transformation.",
        "This isn\u2019t a quick handyman fix. It\u2019s a reset. And I\u2019m building the most trusted name in Calgary to deliver it.",
      ],
    },
    book: {
      hero: {
        headline: "Book your reset.",
        subline: "Pick your service, choose a date, and we\u2019ll handle the rest.",
      },
    },
    faq: {
      hero: {
        headline: "Questions?",
        subline: "We\u2019ve got answers. No judgment, just clarity.",
      },
    },
    notFound: {
      headline: "Wrong turn.",
      body: "This page doesn\u2019t exist. Let\u2019s get you back on track.",
    },
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 17. BOOKING FLOW SPECIFICATION
// ─────────────────────────────────────────────────────────────

export const BOOKING_FLOW = {
  totalSteps: 3,
  progressIndicator: {
    type: "3-dot stepper with overline labels",
    dotSize: "12px",
    dotDefault: "border 2px solid var(--stone-light), background transparent",
    dotCompleted: "background var(--copper), border var(--copper)",
    dotActive: "border 2px solid var(--copper), background transparent, pulse animation",
    connectorLine: "1px solid var(--stone-light) between dots, 32px width",
    connectorCompleted: "1px solid var(--copper)",
    labels: ["Home", "Service", "Schedule"],
    labelTypography: "overline scale (0.6875rem, uppercase, 0.15em tracking)",
  },

  steps: {
    step1_home: {
      title: "Your Home",
      fields: [
        { name: "homeType", type: "visual-radio-grid", label: "Home Type", options: ["Townhome", "addition", "Truck", "Van/Minivan"], iconSize: "48px", gridColumns: "2 mobile / 4 desktop" },
        { name: "homeYear", type: "select", label: "Approximate Year", placeholder: "Select year range", options: ["2020+", "2015\u20132019", "2010\u20132014", "Pre-2010"] },
        { name: "condition", type: "radio-cards", label: "Current Condition", options: [
          { value: "light", label: "Light", description: "Regular use, minor dust and crumbs" },
          { value: "moderate", label: "Moderate", description: "Stains, pet hair, months of buildup" },
          { value: "heavy", label: "Heavy", description: "Major spills, smoke, years of neglect" },
        ]},
      ],
    },
    step2_service: {
      title: "Choose Your Service",
      fields: [
        { name: "service", type: "service-cards", label: "Service", options: ["The Custom Build", "Interior Only", "Exterior Only"], note: "Cards show price range, key features, estimated duration" },
        { name: "addOns", type: "checkbox-list", label: "Add-Ons (optional)", options: ["Engine Bay Clean", "Headlight Restoration", "Odor Elimination", "Leather Conditioning"] },
      ],
    },
    step3_schedule: {
      title: "Schedule & Contact",
      fields: [
        { name: "preferredDate", type: "date-picker", label: "Preferred Date", placeholder: "Select a date", note: "Block past dates, show 2\u20133 week lead time" },
        { name: "timePreference", type: "radio", label: "Time Preference", options: ["Morning (8\u201312)", "Afternoon (12\u20135)"] },
        { name: "name", type: "text", label: "Your Name", placeholder: "First and last name" },
        { name: "phone", type: "tel", label: "Phone Number", placeholder: "(403) 555-0123" },
        { name: "email", type: "email", label: "Email", placeholder: "you@email.com" },
        { name: "address", type: "text", label: "Service Address", placeholder: "Where should we come?", note: "Calgary and surrounding areas" },
        { name: "notes", type: "textarea", label: "Anything else? (optional)", placeholder: "Pet hair situation, specific stains, access notes\u2026" },
      ],
    },
  },

  successState: {
    icon: "lucide CheckCircle, 48px, copper",
    heading: "You\u2019re booked.",
    body: "We\u2019ll text you within 2 hours to confirm your details and answer any questions.",
    summary: "Show: home type, service selected, preferred date, name",
    secondaryCTA: { label: "Back to Home", variant: "ghost" },
  },

  fallbackCTA: {
    text: "Prefer to text? Message us directly.",
    phoneDisplay: "(403) 555-RESET",
    position: "Below form on all steps, always visible",
    typography: "body-sm, stoneMid, centered",
    linkColor: "copper, underline on hover",
  },

  radioCard: {
    layout: "Horizontal on desktop (row), vertical stack on mobile",
    width: "Equal flex items, min 160px",
    padding: "20px 16px",
    border: "1px solid var(--stone-light)",
    borderRadius: "0.5rem",
    background: "transparent",
    selectedState: {
      border: "2px solid var(--copper)",
      background: "var(--porcelain-dark)",
      boxShadow: "0 0 0 1px var(--copper) inset",
    },
    hoverState: {
      border: "1px solid var(--stone-mid)",
      background: "hsl(30 15% 96% / 0.5)",
    },
    iconPlacement: "Centered above label, 48px, var(--stone) default, var(--copper) when selected",
    labelTypography: { font: "display", size: "0.9375rem", weight: 600, color: "var(--asphalt)" },
    descriptionTypography: { font: "body", size: "0.8125rem", weight: 300, color: "hsl(220 5% 35%)", marginTop: "4px" },
    radioIndicator: "Hidden — entire card acts as radio, selected state communicates choice",
    transition: "border-color 200ms ease, background 200ms ease, box-shadow 200ms ease",
  },

  serviceCard: {
    layout: "Vertical stack — image (16:9) → content",
    width: "Equal flex items in row, min 280px, max 360px",
    padding: "0 (image flush) + 24px (content area)",
    border: "1px solid var(--stone-light)",
    borderRadius: "0.5rem",
    overflow: "hidden",
    background: "var(--porcelain)",
    selectedState: {
      border: "2px solid var(--copper)",
      background: "var(--porcelain-dark)",
    },
    hoverState: {
      transform: "translateY(-2px)",
      boxShadow: "0 8px 24px -8px hsl(220 8% 12% / 0.12)",
    },
    image: { aspectRatio: "16/9", objectFit: "cover", filter: "none default, brightness(1.02) on hover" },
    serviceName: { font: "display", size: "clamp(1.125rem, 1.5vw, 1.5rem)", weight: 600, color: "var(--asphalt)" },
    price: { font: "display", size: "clamp(1.25rem, 2vw, 1.75rem)", weight: 600, color: "var(--copper)", marginTop: "4px" },
    featureList: {
      style: "Unordered, copper check icon (16px) + body-sm text",
      spacing: "8px between items",
      maxItems: 4,
      color: "hsl(220 5% 35%)",
    },
    duration: { font: "body", size: "0.75rem", weight: 400, color: "hsl(220 4% 55%)", marginTop: "12px" },
    cta: "Full-width secondary button at bottom of content area, 12px margin-top",
    transition: "transform 300ms ease, box-shadow 300ms ease, border-color 200ms ease",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 18. TRUST BAR COMPONENT
// ─────────────────────────────────────────────────────────────

export const TRUST_BAR = {
  layout: {
    desktop: "Horizontal row, centered, gap 48px between items",
    tablet: "Horizontal row, gap 32px",
    mobile: "2×2 grid, gap 24px",
  },
  stats: [
    { value: "200+", label: "Homes Reset", icon: "lucide Home" },
    { value: "4.9\u2605", label: "Google Rating", icon: "lucide Star" },
    { value: "< 2hr", label: "Response Time", icon: "lucide Clock" },
    { value: "\u2713", label: "Travel Included", icon: "lucide MapPin" },
  ],
  statTypography: {
    value: { font: "display", size: "clamp(1.5rem, 2.5vw, 2rem)", weight: 600, color: "var(--copper)" },
    label: { font: "body", size: "0.6875rem", weight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: "hsl(220 4% 55%)" },
  },
  iconSize: "24px",
  iconColor: "var(--copper) at 60% opacity",
  iconPosition: "Above value, centered",
  background: {
    onDarkSection: "transparent",
    onLightSection: "var(--porcelain-dark)",
    padding: "32px 0",
  },
  animation: {
    trigger: "Element 20% in viewport",
    countUp: { duration: "800ms", easing: "ease-out", note: "Numbers animate from 0 to final value. Non-numeric values (checkmark) fade in." },
    stagger: "100ms between items",
  },
  border: {
    top: "none",
    bottom: "1px solid var(--stone-light) on light sections, 1px solid hsl(220 6% 22%) on dark",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 19. PROCESS STEPS COMPONENT
// ─────────────────────────────────────────────────────────────

export const PROCESS_STEPS = {
  layout: {
    desktop: "3 equal columns, gap 48px",
    tablet: "3 columns, gap 32px",
    mobile: "Vertical stack, gap 40px",
  },
  steps: [
    {
      number: "01",
      icon: "lucide CalendarCheck",
      heading: "Book",
      description: "Pick your service and preferred date. Takes 2 minutes.",
    },
    {
      number: "02",
      icon: "lucide Truck",
      heading: "We Come to You",
      description: "We arrive at your door with everything we need. No drop-off required.",
    },
    {
      number: "03",
      icon: "lucide Sparkles",
      heading: "Get Your Home Back",
      description: "Drive away in a home that feels like yours again.",
    },
  ],
  stepTypography: {
    number: { font: "display", size: "clamp(2rem, 3vw, 3rem)", weight: 300, color: "var(--copper)", opacity: 0.6 },
    heading: { font: "display", size: "clamp(1.125rem, 1.5vw, 1.5rem)", weight: 600, color: "var(--asphalt)" },
    description: { font: "body", size: "0.9375rem", weight: 300, color: "hsl(220 5% 35%)", maxWidth: "28ch" },
  },
  iconSize: "32px",
  iconColor: "var(--copper)",
  connector: {
    desktop: "1px solid var(--copper) at 30% opacity, horizontal between columns, vertically centered at icon height",
    mobile: "1px solid var(--copper) at 20% opacity, vertical between steps, horizontally centered at number",
    length: "100% of gap",
  },
  animation: {
    trigger: "Section 20% in viewport",
    reveal: "fade-in + translateY(16px→0), 400ms, stagger 100ms between steps",
    connectorDraw: "scaleX(0→1) 500ms ease-out, after all steps visible",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 20. HERO SECTION COMPONENT
// ─────────────────────────────────────────────────────────────

export const HERO_SECTION = {
  dimensions: {
    minHeight: "100svh",
    maxHeight: "none",
    contentMaxWidth: "720px",
    contentAlignment: "flex items-center justify-center text-center",
  },
  overlay: {
    gradient: "linear-gradient(180deg, hsl(220 8% 12% / 0.65) 0%, hsl(220 8% 12% / 0.45) 40%, hsl(220 8% 12% / 0.7) 100%)",
    note: "Ensures headline legibility over any before/after imagery",
  },
  backgroundImage: {
    position: "absolute inset-0 z-0",
    objectFit: "cover",
    objectPosition: "center 40%",
    loading: "eager",
    crossfade: {
      enabled: "Optional — for before/after hero",
      duration: "6000ms",
      easing: "ease-in-out",
      note: "Alternates between before and after images",
    },
  },
  headline: {
    scale: "h1 — clamp(2.5rem, 5vw, 4.5rem)",
    font: "display",
    weight: 700,
    color: "var(--clean-white)",
    maxWidth: "16ch",
    letterSpacing: "-0.02em",
  },
  subline: {
    scale: "body-lg — clamp(1.0625rem, 1.5vw, 1.25rem)",
    font: "body",
    weight: 300,
    color: "hsl(0 0% 100% / 0.8)",
    maxWidth: "48ch",
    marginTop: "16px",
  },
  trustLineRibbon: {
    desktop: "Horizontal row, centered, overline scale (0.6875rem), uppercase, 0.15em tracking, stoneMid color, gap 24px, dot separator (·)",
    mobile: "2-line centered stack, gap 8px",
    marginTop: "24px",
    separatorColor: "hsl(220 4% 55% / 0.5)",
  },
  dualCTA: {
    layout: "flex row gap-16px, centered, wrap on mobile",
    primary: "copper pill — Book Your Reset",
    secondary: "white-border ghost — See Results",
    marginTop: "32px",
  },
  lightSweep: {
    animation: "diagonal gradient sweep: transparent → hsl(0 0% 100% / 0.05) → transparent",
    angle: "135deg",
    duration: "1200ms",
    timing: "ease-in-out",
    trigger: "Once on initial load, after hero image visible",
    delay: "400ms after page load",
  },
  scrollIndicator: {
    type: "Subtle down-chevron or thin line",
    position: "absolute bottom-32px center",
    color: "hsl(0 0% 100% / 0.4)",
    animation: "translateY(0 → 8px) 1.5s ease-in-out infinite",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 21. PROBLEM / EMPATHY SECTION
// ─────────────────────────────────────────────────────────────

export const PROBLEM_EMPATHY_SECTION = {
  context: "light",
  container: "tight (720px)",
  padding: "section-lg (120px desktop / 80px mobile)",
  overline: {
    text: "Sound familiar?",
    typography: "overline scale, copper, uppercase, 0.15em tracking",
  },
  copperRule: {
    width: "48px",
    height: "2px",
    color: "var(--copper)",
    marginTop: "16px",
    marginBottom: "32px",
  },
  bodyText: {
    typography: "body-lg (clamp(1.0625rem, 1.5vw, 1.25rem)), Jost 300, stoneGray",
    paragraphSpacing: "24px between paragraphs",
    maxWidth: "60ch",
    alignment: "left on desktop, left on mobile",
  },
  transition: {
    toNextSection: "No hard divider — fade into proof/transformation section below via scroll reveal opacity",
  },
  animation: {
    trigger: "Section 20% in viewport",
    reveal: "fade-in + translateY(20px→0), 500ms ease-out",
    paragraphStagger: "150ms between paragraphs",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 22. FOUNDER SECTION
// ─────────────────────────────────────────────────────────────

export const FOUNDER_SECTION = {
  context: "dark",
  container: "narrow (960px)",
  padding: "section-lg (120px desktop / 80px mobile)",
  layout: {
    desktop: "2-column grid: 60% text / 40% image, gap 64px",
    mobile: "Stacked — image first (full width), text below",
  },
  image: {
    aspectRatio: "3/4",
    borderRadius: "2px",
    warmOverlay: "hsl(25 30% 50% / 0.08)",
    objectFit: "cover",
    objectPosition: "center 30%",
    note: "Cochrane Master Builders at work — action shot, not posed portrait",
  },
  overline: {
    text: "Meet Cochrane Master Builders",
    typography: "overline scale, var(--copper-light), uppercase, 0.15em tracking",
  },
  manifesto: {
    typography: "body-lg, Jost 300, hsl(0 0% 100% / 0.9), left-aligned",
    paragraphSpacing: "20px",
    maxWidth: "48ch",
  },
  standardsList: {
    heading: "Cochrane Master Builders\u2019s Standard",
    headingTypography: "overline scale, copper, uppercase, marginTop 32px, marginBottom 16px",
    items: [
      "Every home gets the same obsessive attention",
      "Professional-grade equipment, every job",
      "Before/after photos on every reset",
      "Honest pricing — no surprise upsells",
      "We leave your space cleaner than we found it",
    ],
    itemTypography: "body-sm (0.9375rem), Jost 300, hsl(0 0% 100% / 0.8)",
    icon: "lucide Check, 16px, var(--copper), inline before text",
    itemSpacing: "12px",
  },
  cta: {
    label: "Book with Cochrane Master Builders \u2192",
    variant: "ghost — white text, no border, underline on hover, copper underline",
    marginTop: "32px",
  },
  animation: {
    trigger: "Section 20% in viewport",
    imageReveal: "fade-in + scale(1.03→1), 600ms ease-out",
    textReveal: "fade-in + translateX(-16px→0), 500ms ease-out, 200ms delay",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 23. CTA SECTION
// ─────────────────────────────────────────────────────────────

export const CTA_SECTION = {
  context: "dark",
  container: "tight (720px)",
  alignment: "text-center",
  padding: {
    desktop: "120px 0",
    mobile: "80px 0",
    note: "Larger than standard sections — breathing room for impact",
  },
  optionalBackground: {
    image: "Dark atmospheric photo (interior detail, steering wheel, clean dashboard)",
    overlay: "Same hero overlay gradient — hsl(220 8% 12% / 0.75)",
    objectFit: "cover",
  },
  overline: {
    text: "Ready?",
    typography: "overline scale, copper, uppercase, 0.15em tracking",
  },
  headline: {
    scale: "h2 — clamp(2rem, 4vw, 3.5rem)",
    font: "display",
    weight: 700,
    color: "var(--clean-white)",
    maxWidth: "20ch",
  },
  sensoryCopy: {
    text: "That new-home feeling. The clean-seat exhale. The pride when someone gets in your home. It\u2019s all one booking away.",
    typography: "body-lg, Jost 300, hsl(0 0% 100% / 0.7), max-width 48ch",
    marginTop: "16px",
  },
  dualCTA: {
    layout: "flex row gap-16px, centered, wrap on mobile",
    primary: "copper pill — Book Your Reset",
    secondary: "ghost white — or text us at (403) 555-RESET",
    marginTop: "32px",
  },
  animation: {
    trigger: "Section 20% in viewport",
    reveal: "fade-in, 500ms",
    headlinePop: "scale(0.96→1) + fade-in, 600ms ease-out, 100ms delay",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 24. AREA SERVED SECTION
// ─────────────────────────────────────────────────────────────

export const AREA_SERVED_SECTION = {
  context: "light",
  container: "narrow (960px)",
  padding: "section-md (80px desktop / 60px mobile)",
  overline: {
    text: "Service Area",
    typography: "overline scale, stoneMid, uppercase, 0.15em tracking",
  },
  headline: {
    text: "Anywhere in Calgary. Travel included.",
    scale: "h2 — clamp(1.75rem, 3vw, 2.5rem)",
    font: "display",
    weight: 600,
    color: "var(--asphalt)",
  },
  neighborhoodGrid: {
    desktop: "3-column grid, gap 16px 48px",
    mobile: "2-column grid, gap 12px 32px",
    categories: {
      NW: ["Tuscany", "Varsity", "Brentwood", "University District", "Kensington"],
      NE: ["Bridgeland", "Vista Heights", "Marlborough", "Monterey Park", "Saddleridge"],
      SW: ["Altadore", "Marda Loop", "Signal Hill", "Aspen Woods", "Springbank Hill"],
      SE: ["Mahogany", "Cranston", "Auburn Bay", "McKenzie Towne", "Walden"],
      surrounding: ["Airdrie", "Cochrane", "Okotoks", "Chestermere", "Langdon"],
    },
    categoryLabel: "overline scale, copper, uppercase, marginBottom 8px",
    itemTypography: "body-sm (0.875rem), Jost 400, stoneGray",
    itemSpacing: "6px between items",
  },
  travelBadge: {
    text: "Gas & travel always included",
    border: "1px solid var(--copper)",
    borderRadius: "9999px (pill)",
    padding: "8px 24px",
    typography: "overline scale, copper, uppercase, 0.12em tracking",
    position: "Centered below grid, marginTop 40px",
  },
  animation: {
    trigger: "Section 20% in viewport",
    reveal: "fade-in + translateY(16px→0), 400ms ease-out",
    gridStagger: "50ms between category columns",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 25. SERVICE TIER CARD
// ─────────────────────────────────────────────────────────────

export const SERVICE_TIER_CARD = {
  context: "light",
  layout: {
    card: "Vertical stack — image (16:9) → content area",
    grid: "3-column on desktop (gap 32px), 1-column on mobile (gap 24px)",
    cardWidth: "Equal flex, min 280px, max 360px",
  },
  dimensions: {
    borderRadius: "0.5rem",
    overflow: "hidden",
    border: "1px solid var(--stone-light)",
    background: "var(--porcelain)",
  },
  flagshipBadge: {
    text: "Recommended",
    position: "absolute top-12px right-12px",
    background: "var(--copper)",
    color: "var(--clean-white)",
    typography: "overline scale (0.625rem), uppercase, 0.15em tracking, weight 600",
    padding: "4px 12px",
    borderRadius: "9999px",
  },
  image: {
    aspectRatio: "16/9",
    objectFit: "cover",
    hoverFilter: "brightness(1.02)",
    transition: "filter 300ms ease",
  },
  content: {
    padding: "24px",
    serviceName: { font: "display", size: "clamp(1.125rem, 1.5vw, 1.5rem)", weight: 600, color: "var(--asphalt)" },
    price: { font: "display", size: "clamp(1.25rem, 2vw, 1.75rem)", weight: 600, color: "var(--copper)", marginTop: "4px" },
    priceNote: { font: "body", size: "0.75rem", weight: 400, color: "hsl(220 4% 55%)", note: "e.g. 'Starting from' or 'Travel included'" },
    featureList: {
      icon: "lucide Check, 16px, var(--copper)",
      typography: "body-sm (0.875rem), Jost 400, stoneGray",
      spacing: "8px between items",
      maxItems: 6,
      marginTop: "16px",
    },
    duration: {
      typography: "caption scale (0.75rem), Jost 400, stoneMid",
      marginTop: "12px",
      format: "e.g. 'Approx. 3–4 hours'",
    },
    cta: {
      variant: "secondary — full-width button",
      marginTop: "16px",
    },
  },
  hover: {
    transform: "translateY(-4px)",
    boxShadow: "0 12px 32px -12px hsl(220 8% 12% / 0.15)",
    transition: "transform 300ms ease, box-shadow 300ms ease",
  },
  selectedState: {
    borderLeft: "3px solid var(--copper)",
    background: "var(--porcelain-dark)",
    note: "Used when card doubles as a selector in booking flow",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 26. 404 / NOT FOUND PAGE
// ─────────────────────────────────────────────────────────────

export const NOT_FOUND_PAGE = {
  context: "dark",
  background: "var(--asphalt)",
  layout: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100svh",
    containerMaxWidth: "720px",
    textAlign: "center",
    padding: "24px",
  },
  copperRule: {
    width: "48px",
    height: "1px",
    background: "var(--copper)",
    marginBottom: "32px",
    marginInline: "auto",
  },
  headline: {
    text: "Wrong turn.",
    scale: "h1 — display-lg",
    color: "var(--clean-white)",
    marginBottom: "16px",
  },
  body: {
    text: "This page doesn\u2019t exist. Let\u2019s get you back on track.",
    scale: "body-lg",
    color: "hsl(0 0% 100% / 0.7)",
    maxWidth: "40ch",
    marginInline: "auto",
    marginBottom: "40px",
  },
  ctas: {
    layout: "flex row, gap 16px, centered. Wrap on mobile (flex-wrap: wrap).",
    primary: { label: "Back to Home", variant: "primary copper pill", href: "/" },
    secondary: { label: "View Services", variant: "secondaryOnDark (white border)", href: "/services" },
  },
  seoMeta: {
    title: "Page Not Found | Cochrane Master Builders — Cochrane & Calgary Master Builder — Custom Homes & Renovations",
    description: "The page you\u2019re looking for doesn\u2019t exist. Head back to Cochrane Master Builders for Calgary\u2019s best mobile home reset.",
    statusCode: 404,
    noIndex: true,
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 27. INITIAL LOAD EXPERIENCE
// ─────────────────────────────────────────────────────────────

export const INITIAL_LOAD = {
  strategy: "Progressive render — no blocking splash screen or spinner. Content appears in choreographed sequence.",
  logoReveal: {
    duration: "300ms",
    easing: "ease-out",
    initialState: "opacity: 0, translateY: 8px",
    finalState: "opacity: 1, translateY: 0",
    note: "Logo in nav appears as nav mounts. No separate loading screen.",
  },
  heroStagger: {
    note: "Each element appears sequentially. Delays are cumulative from page mount.",
    sequence: [
      { element: "heroImage",  delay: "0ms",   duration: "400ms", property: "opacity 0→1" },
      { element: "overlayGradient", delay: "100ms", duration: "300ms", property: "opacity 0→1" },
      { element: "headline",   delay: "200ms", duration: "400ms", property: "opacity 0→1, translateY 16px→0" },
      { element: "subline",    delay: "350ms", duration: "300ms", property: "opacity 0→1, translateY 8px→0" },
      { element: "trustLine",  delay: "500ms", duration: "300ms", property: "opacity 0→1" },
      { element: "ctaButtons", delay: "600ms", duration: "300ms", property: "opacity 0→1, translateY 8px→0" },
    ],
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  },
  belowFoldSections: {
    trigger: "IntersectionObserver, threshold 0.15",
    animation: "opacity 0→1, translateY 24px→0, duration 500ms",
    stagger: "Children stagger 80ms each",
    easing: "cubic-bezier(0.25, 0.1, 0.25, 1.0)",
  },
  prefersReducedMotion: {
    behavior: "All animations instant — no stagger, no translateY, opacity transitions max 100ms",
    note: "Respect @media (prefers-reduced-motion: reduce). Never force motion.",
  },
  performanceTargets: {
    LCP: "< 2.5s",
    FID: "< 100ms",
    CLS: "< 0.1",
    note: "Hero image should be eager-loaded, above-fold fonts preloaded via <link rel='preload'>.",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 28. FAQ CONTENT
// ─────────────────────────────────────────────────────────────

export const FAQ_CONTENT = {
  note: "Organized by concern category. Tone: direct, short, no-judgment. Each answer 2-4 sentences max.",

  categories: {
    theService: {
      label: "The Service",
      items: [
        {
          q: "What exactly is The Custom Build?",
          a: "A complete interior deep clean plus exterior wash and restoration. We vacuum, shampoo, steam, wipe every surface — then wash, clay, and protect the outside. It\u2019s the whole home, done right.",
        },
        {
          q: "How long does it take?",
          a: "Most Custom Builds take 3\u20134 hours depending on home size and condition. We\u2019ll give you a time estimate when we confirm your booking.",
        },
        {
          q: "Do you come to my location?",
          a: "Yes. We\u2019re fully mobile. We come to your home, office, or wherever your home is parked in Calgary. All we need is access to the home and ideally a power outlet nearby.",
        },
        {
          q: "What if my home is really dirty?",
          a: "That\u2019s literally what we do. No judgment — the worse it is, the more satisfying the reset. We\u2019ve seen it all.",
        },
      ],
    },
    pricingAndBooking: {
      label: "Pricing & Booking",
      items: [
        {
          q: "How much does it cost?",
          a: "The Custom Build starts at $250 for townhomes. additions and trucks are $300+. We\u2019ll confirm exact pricing based on your home and add-ons when you book.",
        },
        {
          q: "Is travel included in the price?",
          a: "Yes. Anywhere in Calgary, travel is included. No surprise fees.",
        },
        {
          q: "How do I book?",
          a: "Use the booking form on our site or text us directly. We respond within 2 hours during business hours to confirm your date and time.",
        },
        {
          q: "Can I cancel or reschedule?",
          a: "Yes. We ask for 24 hours\u2019 notice for cancellations or reschedules. Life happens — just let us know.",
        },
      ],
    },
    theProcess: {
      label: "The Process",
      items: [
        {
          q: "What do I need to do to prepare?",
          a: "Remove personal items and valuables from the home. That\u2019s it. We handle everything else.",
        },
        {
          q: "Do I need to be home?",
          a: "Not necessarily. As long as we can access the home and you\u2019ve left it unlocked (or given us a key), we can work while you\u2019re out.",
        },
        {
          q: "What products do you use?",
          a: "Professional-grade, pH-balanced products safe for all surfaces. We avoid harsh chemicals that damage leather, plastics, or paint. Everything is safe for kids and pets.",
        },
      ],
    },
    homeConcerns: {
      label: "Home Concerns",
      items: [
        {
          q: "Will you damage my paint or interior?",
          a: "No. We use tested techniques and quality products. Cochrane Master Builders personally handles every home with care. Your home is in good hands.",
        },
        {
          q: "Can you remove pet hair?",
          a: "Yes. Pet hair removal is part of every interior service. We use specialized tools designed for embedded hair in fabric and carpet.",
        },
        {
          q: "Do you work on trucks and additions?",
          a: "Absolutely. Trucks, additions, vans, townhomes — we handle all home and project types. Pricing adjusts for size.",
        },
        {
          q: "What about stains that won\u2019t come out?",
          a: "We\u2019re upfront about it. Most stains come out with our process, but some permanent damage (bleach, dye, burns) can\u2019t be reversed. We\u2019ll tell you what to expect before we start.",
        },
      ],
    },
  },

  accordion: {
    behavior: "Single-open — opening one closes others. Smooth height transition 300ms ease.",
    indicator: "Lucide ChevronDown, rotates 180° on open, 200ms ease",
    triggerTypography: "body-lg, fontWeight 500, asphaltBlack",
    answerTypography: "body-sm, fontWeight 300, stoneGray, max-width 60ch",
    divider: "1px solid var(--stone-light) between items",
    padding: "20px vertical on trigger, 0 16px 20px on answer content",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 29. FORM MICRO-INTERACTIONS
// ─────────────────────────────────────────────────────────────

export const FORM_MICRO_INTERACTIONS = {
  label: {
    behavior: "Static above field — no floating label animation",
    note: "Floating labels harm accessibility (placeholder disappears, label shrinks). Static labels are always visible and scannable.",
  },
  focus: {
    borderTransition: "border-color 200ms ease to var(--copper)",
    boxShadowTransition: "box-shadow 200ms ease to 0 0 0 3px hsl(25 60% 55% / 0.15)",
  },
  error: {
    borderEntry: "border-color transitions to hsl(0 65% 51%) over 200ms",
    textEntry: "Error message fades in: opacity 0→1 + translateY(-4px→0), 150ms ease",
    noShake: "No shake animation — it\u2019s disorienting and feels punitive. Error state is communicated via color + message.",
  },
  success: {
    checkIcon: "Lucide Check icon, 16px, hsl(145 55% 42%), fades in at field right edge over 200ms",
    borderColor: "hsl(145 55% 42%)",
    note: "Only shown after validated blur, not on every keystroke.",
  },
  stepTransition: {
    note: "For multi-step booking form only.",
    outgoing: "Current step: opacity 1→0, duration 200ms ease",
    incoming: "Next step: opacity 0→1 + translateY(8px→0), duration 300ms ease, 50ms delay after outgoing completes",
    direction: "Forward = translateY down-to-up. Back = translateY up-to-down.",
  },
  autoAdvance: false,
  autoAdvanceNote: "No auto-advance between fields. User explicitly clicks 'Next' or 'Continue' per step. Respects user control.",
} as const;

// ─────────────────────────────────────────────────────────────
// 30. SCROLL & ANCHOR NAVIGATION
// ─────────────────────────────────────────────────────────────

export const SCROLL_ANCHOR_NAV = {
  smoothScroll: {
    css: "scroll-behavior: smooth on html element",
    library: "Lenis for premium easing on desktop. Disabled on touch devices (pointer: coarse) for native scroll performance.",
    lenisConfig: {
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1.2,
    },
  },
  anchorOffset: {
    scrollMarginTop: "88px",
    note: "Nav height (72px) + 16px breathing room. Applied to all section anchor targets via CSS.",
  },
  urlHash: {
    updateOnClick: true,
    updateOnScroll: false,
    note: "Hash updates only on manual anchor link click. No passive scroll spy hash updates — avoids URL noise and back-button confusion.",
  },
  backToTop: {
    trigger: "Appears after scrolling 2× viewport height (200vh)",
    position: "Fixed, bottom-right, 24px from edges",
    size: "48px circle",
    background: "var(--copper)",
    color: "hsl(0 0% 100%)",
    icon: "Lucide ArrowUp, 20px",
    borderRadius: "9999px",
    shadow: "0 4px 12px hsl(220 8% 12% / 0.2)",
    animation: {
      enter: "opacity 0→1 + translateY(8px→0), 200ms ease",
      exit: "opacity 1→0 + translateY(0→8px), 150ms ease",
    },
    hover: {
      background: "var(--copper-light)",
      transform: "translateY(-2px)",
      transition: "all 200ms ease",
    },
    zIndex: 30,
    ariaLabel: "Scroll to top",
  },
} as const;

// ─────────────────────────────────────────────────────────────
// 31. TOAST / NOTIFICATION SYSTEM
// ─────────────────────────────────────────────────────────────

export const TOAST_SYSTEM = {
  position: {
    mobile: "bottom-center, 16px from bottom edge",
    desktop: "bottom-right, 24px from right and bottom edges",
  },
  dimensions: {
    maxWidth: "400px",
    minWidth: "280px",
    padding: "16px 20px",
    borderRadius: "2px",
  },
  styling: {
    background: "hsl(220 8% 12% / 0.95)",
    backdropFilter: "blur(8px)",
    border: "1px solid hsl(220 6% 22%)",
    color: "hsl(0 0% 100%)",
    fontSize: "body-sm scale (0.875rem)",
    fontWeight: 400,
    fontFamily: "body (Jost)",
  },
  variants: {
    success: {
      icon: "Lucide Check, 20px, var(--copper)",
      iconBackground: "none",
      autoDismiss: "5000ms",
    },
    error: {
      icon: "Lucide AlertCircle, 20px, hsl(0 65% 51%)",
      iconBackground: "none",
      autoDismiss: false,
      dismissButton: "Lucide X, 16px, hsl(0 0% 100% / 0.5), hover → white",
    },
  },
  animation: {
    enter: "translateY(16px→0) + opacity(0→1), 300ms cubic-bezier(0.25, 0.1, 0.25, 1.0)",
    exit: "opacity(1→0), 200ms ease",
  },
  zIndex: 70,
  maxStack: 1,
  maxStackNote: "Only one toast visible at a time. New toast replaces current. Prevents notification pile-up.",
} as const;

// ─────────────────────────────────────────────────────────────
// UNIFIED EXPORT
// ─────────────────────────────────────────────────────────────

export const STYLE_GUIDE = {
  colors: COLORS,
  typography: TYPOGRAPHY,
  spacing: SPACING,
  sectionContexts: SECTION_CONTEXTS,
  components: COMPONENTS,
  imageTreatment: IMAGE_TREATMENT,
  icons: ICONS,
  accessibility: ACCESSIBILITY,
  motion: MOTION,
  shadows: SHADOWS,
  zIndex: Z_INDEX,
  logo: LOGO,
  imagery: IMAGERY,
  antiPatterns: ANTI_PATTERNS,
  pageBlueprints: PAGE_BLUEPRINTS,
  copySystem: COPY_SYSTEM,
  bookingFlow: BOOKING_FLOW,
  trustBar: TRUST_BAR,
  processSteps: PROCESS_STEPS,
  heroSection: HERO_SECTION,
  problemEmpathySection: PROBLEM_EMPATHY_SECTION,
  founderSection: FOUNDER_SECTION,
  ctaSection: CTA_SECTION,
  areaServedSection: AREA_SERVED_SECTION,
  serviceTierCard: SERVICE_TIER_CARD,
  notFoundPage: NOT_FOUND_PAGE,
  initialLoad: INITIAL_LOAD,
  faqContent: FAQ_CONTENT,
  formMicroInteractions: FORM_MICRO_INTERACTIONS,
  scrollAnchorNav: SCROLL_ANCHOR_NAV,
  toastSystem: TOAST_SYSTEM,
} as const;
