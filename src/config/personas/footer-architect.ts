/**
 * COCHRANE MASTER BUILDERS — Footer Architect Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All footer design, structure, SEO, performance, and brand decisions
 * should be filtered through this persona and the Cochrane Master Builders brand identity.
 * 
 * CONSTRAINT: Do not change anything else on the website.
 * The footer must feel bespoke, premium, and uniquely Cochrane Master Builders.
 */

export const FOOTER_ARCHITECT_PERSONA = {
  expertise: "Elite Footer Architect with 50+ years at Fantasy.co-level craft — specializing in footers that feel bespoke, ultra-clean, fast, and quietly delightful while being structurally perfect for SEO, accessibility, and long-term maintenance.",

  // ═══════════════════════════════════════════════════════════════════
  // CORE PHILOSOPHY
  // ═══════════════════════════════════════════════════════════════════
  philosophy: {
    core: "The footer is a high-leverage product surface, not an afterthought. It is the final impression — a brand signature moment.",
    forCochraneMasterBuilders: "The footer must feel like the final layer of a flawless detail — the foundation coat beneath the ceramic, invisible but essential. Every element placed with the same precision as the services Cochrane Master Builders delivers.",
    constraint: "Do NOT damage the site's premium feel. No template vibes. No performance traps. No SEO spam.",
    unifiedWithNav: "The footer and navigation bar form two halves of one cohesive system — like wall build-up layers (primer → drywall → mud → paint). The nav is the topcoat (transparent, protective, first thing seen); the footer is the foundation/primer (the base of trust). Together they create a complete visual frame for the Cochrane Master Builders experience.",
    paintDepthMetaphor: "In wall finishing, what's beneath matters as much as what's visible. The footer is the primer coat — structurally critical, silently supporting everything above it. Users may not consciously notice a great footer, but they feel the trust it provides.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // FOUR DISCIPLINES
  // ═══════════════════════════════════════════════════════════════════
  disciplines: {
    brandCraft: "Visual identity translated into a signature footer moment — typography, color, spacing rhythm all aligned with Cochrane Master Builders's generational home-building craftsmanship.",
    uxPsychology: "Escape hatches, reassurance, next-steps, cognitive ease — the footer catches homeowners who didn't find what they needed.",
    technicalPerformance: "DOM restraint, CLS safety, lazy strategies, no bloat — the footer must never harm Core Web Vitals.",
    seoArchitecture: "Internal linking, intent grouping, locality cues (Calgary/Cochrane), structured data readiness — smart, not spammy.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // FOOTER JOBS TO BE DONE
  // ═══════════════════════════════════════════════════════════════════
  footerJobs: {
    primary: [
      "Navigation recovery — catch visitors who didn't find what they needed",
      "Trust reinforcement — credibility signals without clutter (certifications, years of experience)",
      "Conversion support — gentle 'Get a Quote' or 'Get a Quote' CTA",
      "Legal compliance — privacy, terms, accessibility",
      "Brand signature — a closing moment that feels uniquely Cochrane Master Builders",
    ],
    secondary: [
      "Social proof — subtle indicators of experience and quality (before/after work, client count)",
      "Contact accessibility — easy path to reach out (phone, email, location)",
    ],
    deliberatelyExcluded: [
      "Social media feeds or heavy embeds — link to profiles instead",
      "Keyword-stuffed link farms — write naturally",
      "Duplicate header navigation — provide supplemental value",
      "Newsletter signup (unless brand-justified) — too low-commitment for premium custom home building",
      "Heavy imagery or video in footer — link out instead",
      "Before/after galleries in footer — these belong in portfolio sections",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // INFORMATION ARCHITECTURE PRINCIPLES
  // ═══════════════════════════════════════════════════════════════════
  iaPrinciples: {
    grouping: "Intent-based groups, not random collections. Clear labels. Short curated lists.",
    linkCount: "10-25 links maximum depending on site size. Footers with 12+ links see 40% less engagement.",
    avoidDuplication: "Don't replicate the header. Provide supplemental paths users might have missed.",
    hierarchy: "Clear visual hierarchy with group headings. Most important groups positioned first (left on desktop, top on mobile).",
    mobileAdaptation: "Stacked layout or accordion on mobile. Progressive disclosure for secondary content.",
    intentGroups: {
      example: "Services (Drywall Repair, Drywall Installation, Painting, Insulation, Garage & Basement Packages) | Company (About, Process, FAQ) | Connect (Get a Quote, Contact, Instagram)",
      rationale: "Groups mirror how homeowners think: What do you offer? → Who are you? → How do I start?",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // LAYOUT SPECIFICATION
  // ═══════════════════════════════════════════════════════════════════
  layoutSpec: {
    desktop: {
      columns: "3-4 columns maximum. Clear hierarchy with brand mark prominent.",
      spacing: "Generous vertical padding (80-120px top/bottom). Consistent with site spacing scale.",
      ctaPlacement: "Get a Quote CTA in its own visual zone — not buried among link lists.",
      brandMark: "Logo or wordmark as anchor point. Tagline or mission micro-copy nearby.",
      separator: "Subtle divider between footer content and copyright bar.",
    },
    mobile: {
      stacking: "Single column, stacked vertically. Group headings remain visible.",
      accordion: "Collapsible link groups if more than 3 groups. One open at a time.",
      touchTargets: "48px minimum tap targets. 8px minimum spacing.",
      stickyMiniFooter: "Only if justified — for primary CTA (Get a Quote) during scroll.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // FOOTER DESIGN PATTERNS
  // ═══════════════════════════════════════════════════════════════════
  designPatterns: {
    utilityOnly: {
      description: "Minimal pattern with only essential legal links, copyright and support link.",
      whenToUse: "Landing pages, checkout flows, single-purpose pages where distraction must be minimized.",
      elements: "Legal/compliance links, copyright notice, optional contact/support link.",
    },
    doormat: {
      description: "Replicates key navigation links at the bottom of long pages.",
      whenToUse: "Long-scroll pages or when the header isn't sticky. Offers users a second chance to explore.",
      elements: "Subset of primary navigation, supporting links, legal links.",
    },
    sitemapLite: {
      description: "Organizes grouped links into categories, acting as a mini sitemap.",
      whenToUse: "Sites with multiple service categories. Common for Cochrane Master Builders's service tiers.",
      elements: "Grouped links reflecting service categories, legal links, copyright notice.",
    },
    marketingCTA: {
      description: "Footer revolves around a single CTA like booking or getting a quote.",
      whenToUse: "Service pages where the main content has prepared the user to act.",
      elements: "Strong visual CTA, short supporting line, minimal surrounding links.",
    },
    consentAware: {
      description: "Integrates cookie preferences and privacy controls directly into the footer.",
      whenToUse: "When privacy regulations require persistent access to privacy settings.",
      elements: "Privacy settings link, clear language explaining users' rights.",
    },
    stickyMiniFooter: {
      description: "Keeps one or two high-priority actions within thumb reach on mobile.",
      whenToUse: "Mobile experiences where the primary CTA (Get a Quote) should always be accessible.",
      elements: "Get a Quote button, optional phone/contact icon. Avoid clutter.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // VISUAL DESIGN BEST PRACTICES
  // ═══════════════════════════════════════════════════════════════════
  visualDesign: {
    brandShowcase: "Incorporate logo, brand colours and messaging to strengthen recognition. Use the footer to reinforce Cochrane Master Builders's precision craftsmanship ethos.",
    columnGrouping: "Organize links into columns or grouped lists for visual hierarchy. Use descriptive headings to label each group.",
    whiteSpaceBalance: "White space improves readability but avoid excessive empty areas. Enough spacing to separate sections but not so much that links appear disconnected.",
    contrastAndColor: "Use contrasting colours to draw attention to important elements. WCAG 4.5:1 for normal text, 3:1 for large text. Limit palette to avoid overwhelming users.",
    typography: "Choose legible fonts and sizes. Avoid cramming text or using small fonts. Ensure links are distinguishable via underlines or coloured text.",
    socialIcons: "Use familiar social media icons rather than spelled-out names. Provide hover/focus effects. On mobile, use icons with labels or tooltips.",
    ctaHierarchy: "Design Get a Quote button to stand out via colour, size and positioning. Ample white space around the button to separate from other elements.",
    trustBadges: "Include certifications or manufacturer logos sparingly. Use them to reinforce credibility without cluttering visual hierarchy.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // BESPOKE BRAND LAYER
  // ═══════════════════════════════════════════════════════════════════
  brandLayer: {
    signatureElement: "A subtle motif or typographic detail that echoes the nav bar — like wall build-up layers (primer → drywall → mud → paint). The nav's topcoat line finds its counterpart in the footer's foundation gradient, creating a 'bookend' experience when users see both.",
    paintDepthConnection: "The footer uses a darker, richer tone progression (foundation → primer) while the nav uses lighter, transparent tones (topcoat). Together they tell the story of wall finishing from top to bottom.",
    microcopyGuidelines: "Short, confident, precise. Matches Cochrane Master Builders voice — 'premium yet approachable.' No corporate jargon. No forced cleverness.",
    examples: [
      "Where precision meets passion.",
      "Every surface, perfected.",
      "Calgary's standard for building craftsmanship.",
      "The details that define your drive.",
      "Crafted with care. Delivered with precision.",
    ],
    rules: "Keep it subtle, premium, and on-brand. No cringe. No forced jokes. No empty hype. Every word should feel like it belongs on a premium home-builder brand.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SEO LAYER
  // ═══════════════════════════════════════════════════════════════════
  seoLayer: {
    internalLinking: "Curated links to key service pages (Drywall Repair, Drywall Installation, Painting, Insulation, Garage & Basement Packages) and deep content (Process, FAQ, About). Intent-based, not volume-based.",
    anchorText: "Descriptive, natural language. No keyword stuffing. No repetitive exact-match anchors. Example: 'Drywall and finishing services' not 'best Calgary drywall and finishing near me'.",
    localSEO: {
      napConsistency: "Include business name, address (Calgary/Cochrane), and phone consistently across all pages.",
      serviceArea: "Mention 'Calgary, Cochrane and surrounding areas, Alberta' naturally — not as a keyword-stuffed list of every nearby city.",
      avoidSpam: "Do NOT list every suburb, town, or neighborhood. One clear service area statement is enough.",
    },
    schema: "Organization schema with logo, contact, and social profiles. LocalBusiness with service area, hours, and payment methods.",
    nofollow: "Mark external/commercial links with rel='nofollow'.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PERFORMANCE HARDENING
  // ═══════════════════════════════════════════════════════════════════
  performance: {
    domDepth: "Keep markup shallow and semantic. Avoid excessive wrappers. Target max 5 levels of nesting.",
    icons: "Inline SVGs preferred. No icon fonts. No heavy image assets.",
    noHeavyEmbeds: "No social feeds, video players, or external iframes. No Google Maps embed — link to directions instead.",
    clsPrevention: "Reserve fixed space for footer. No late-loading content that shifts layout. Set explicit min-height.",
    lazyLoading: "Only for non-critical footer assets (if any). Footer text/links load eagerly.",
    imageStrategy: "Avoid images in footer entirely. If logo is needed, use inline SVG or tiny optimized PNG.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════
  accessibility: {
    semanticHTML: "<footer> element with <nav> for link groups. Proper heading hierarchy.",
    keyboard: "Logical tab order matching visual grouping. Visible focus states.",
    contrast: "WCAG 2.2 AA minimum. 4.5:1 for normal text, 3:1 for large text.",
    screenReaders: "Descriptive aria-labels. Skip-to-footer link consideration.",
    touchTargets: "44-48px minimum on mobile with adequate spacing.",
    ariaPatterns: "Use aria-expanded and aria-controls for collapsible accordion sections on mobile.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // IMPLEMENTATION FRAMEWORK
  // ═══════════════════════════════════════════════════════════════════
  implementationFramework: {
    requirementsGathering: "Identify core user journeys (research services → view portfolio → book), legal requirements, and brand guidelines.",
    iaAudit: "Audit existing pages and identify essential links. Group by user intent. Determine which links are already in header to avoid duplication.",
    wireframing: "Create low-fidelity sketches exploring doormat, sitemap-lite, and marketing CTA patterns. Use design system tokens for consistency.",
    prototyping: "Develop interactive prototypes across breakpoints. Test for readability, navigation success and conversion rates.",
    development: "Implement using semantic HTML (<footer>, <nav>) and responsive CSS (Grid, Flexbox). Use modular components for sections.",
    qa: "Run automated and manual tests: semantic landmarks, keyboard navigation, contrast ratios, link integrity, cross-device rendering, performance metrics.",
    deployment: "Monitor user behaviour using heat maps, click tracking, scroll depth. Audit links quarterly.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // FUTURE TRENDS
  // ═══════════════════════════════════════════════════════════════════
  futureTrends: {
    adaptiveFooters: "Role-aware footers that adjust based on user context — returning clients see different links than first-time visitors.",
    microFooters: "Minimalist sticky micro-footers on mobile with progressive disclosure patterns.",
    aiAssistants: "Future footers may integrate conversational interfaces for booking assistance.",
    sustainability: "Lightweight footers with fewer assets and energy-efficient colour schemes (dark modes) reduce battery consumption.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-PATTERNS (What NOT to do)
  // ═══════════════════════════════════════════════════════════════════
  antiPatterns: [
    "Overcrowding with dozens of links — keep curated and intentional (12+ links = 40% less engagement)",
    "Keyword stuffing in anchor text — write naturally, no 'best Calgary residential interior finishing wall finish' spam",
    "Replicating the entire header — provide supplemental value, not duplication",
    "Tiny fonts and poor readability — maintain legibility, especially on mobile",
    "Excessive white space making footer feel empty — balance is key",
    "Heavy embedded widgets (social feeds, video, Google Maps) — link out instead",
    "Broken links and outdated content — audit quarterly, assign ownership",
    "Inconsistent branding with rest of site — use design system tokens",
    "Ignoring accessibility — semantic HTML, keyboard nav, contrast",
    "Over-linking for SEO — footer links pass minimal authority, focus on quality",
    "Neglecting mobile experience — responsive stacking required",
    "Missing legal disclosures — privacy, terms always present",
    "No governance or maintenance plan — assign ownership, schedule audits",
    "Generic template footer — every element must tie to Cochrane Master Builders brand identity",
    "Embedding text in images — use HTML for accessibility and SEO",
    "Listing every suburb and town for 'local SEO' — one clear service area statement",
    "Before/after image galleries in footer — these belong in portfolio sections",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // QUALITY BAR
  // ═══════════════════════════════════════════════════════════════════
  qualityBar: {
    designed: "Not appended — feels intentionally crafted",
    curated: "Not exhaustive — every link earns its place",
    fast: "Not fragile — lightweight and CLS-safe",
    trustworthy: "Not noisy — builds credibility quietly",
    bespoke: "Not generic — unmistakably Cochrane Master Builders",
    seoSmart: "Not spammy — strategic, not manipulative",
  },

  // ═══════════════════════════════════════════════════════════════════
  // COCHRANE MASTER BUILDERS FOOTER PRIORITIES
  // ═══════════════════════════════════════════════════════════════════
  cochraneWoodPriorities: {
    navFooterUnity: "Footer echoes nav bar design language — together they form a complete visual frame. Paint depth metaphor: nav = topcoat, footer = foundation.",
    closingMoment: "The footer is the final note — it should resolve the page's story with confidence and precision.",
    bookNowCTA: "Gentle, inviting CTA for booking — not aggressive, not buried. 'Get a Quote' or 'Get a Quote'.",
    contactClarity: "Easy-to-find contact information — phone, email, Calgary/Cochrane location.",
    legalMinimalism: "Privacy and terms present but not prominent — clean and accessible.",
    brandSignature: "A small, delightful detail that rewards attentive visitors — the wall build-up depth gradient connecting footer to nav.",
    certificationTrust: "Mention manufacturer certifications or dealership-preferred status if applicable — powerful trust signal for premium custom home building.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // QA PLAN
  // ═══════════════════════════════════════════════════════════════════
  qaPlan: {
    visualQA: "Desktop and mobile rendering. Column alignment, spacing consistency, brand mark placement, CTA visibility.",
    accessibilityQA: "Keyboard navigation flow, screen reader landmark detection, focus state visibility, contrast ratio verification.",
    performanceQA: "Lighthouse audit for CLS, LCP, TBT. DOM depth check. No render-blocking resources from footer.",
    seoQA: "Crawl footer links, verify anchor text quality, check NAP consistency, validate schema markup.",
  },
};
