/**
 * COCHRANE MASTER BUILDERS — Fantasy.co-Level Master Design Plan
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * This is the comprehensive, exhaustive design specification that governs
 * every pixel, interaction, and word of the Cochrane Master Builders website.
 * 
 * Built for a residential interior finishing brand in Calgary, Alberta.
 * Grounded in the Brand Identity North Star, Discovery Questionnaire,
 * and brand-identity.ts — all resolved through a Fantasy.co design lens.
 * 
 * STATUS: APPROVED — Implementation-ready.
 */

export const MASTER_DESIGN_PLAN = {

  // ═══════════════════════════════════════════════════════════════════
  // 0. CURRENT STATE AUDIT
  // ═══════════════════════════════════════════════════════════════════
  currentStateAudit: {
    problem: "The current site is built as a luxury wedding planning brand ('Hickory & Rose'). Cochrane Master Builders is a residential interior finishing service in Calgary. The entire design system, content, architecture, and emotional tone must be rebuilt to serve a grounded, proof-driven, industrial-premium brand that converts Calgary homeowners with overdue homes into bookings.",
    stackConfirmation: {
      framework: "React 18 ✓",
      buildTool: "Vite ✓",
      typescript: "Yes ✓",
      tailwind: "Yes ✓ (v3.4)",
      router: "react-router-dom v6 ✓",
      animation: "framer-motion (installed) ✓",
      fonts: "TO CHANGE — removing serif/script, adopting industrial premium sans",
      componentLibrary: "shadcn/ui (Radix primitives) ✓",
      cssVariables: "HSL design tokens via index.css ✓",
      smoothScroll: "Lenis ✓",
    },
    whatMustChange: [
      "All 'Hickory & Rose' wedding content → Cochrane Master Builders mobile restoration content",
      "Sage/cream wedding palette → Asphalt Black, Stone Gray, Warm Porcelain, Burnished Copper",
      "Cormorant Garamond + Great Vibes → Industrial premium sans-serif type system",
      "Editorial wedding photography → Before/after restoration photography, close-up textures, founder-at-work",
      "Service tiers (Day-Of, Partial, Full) → Single flagship 'Custom Build' offer",
      "Inquiry/consultation form → Minimal booking form + text/call alternative",
      "Wedding narrative arc → Transformation proof narrative arc",
      "Polished Paige persona → Calgary homeowner with overdue home persona",
      "Calm luxury emotional tone → Grounded confidence, deeply satisfying, no-judgment",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 1. STRATEGIC ANALYSIS
  // ═══════════════════════════════════════════════════════════════════
  strategicAnalysis: {
    marketPositioning: "Cochrane Master Builders occupies the 'most satisfying, most convenient, most honest custom build in Calgary' position. Competitors own either 'cheap mobile wash' or 'luxury wall finish for exotics.' The underserved void is everyday homeowners whose homes have crossed into problem-state — people who need a genuine restoration, not a wipe-down, delivered to their door without judgment.",

    primaryConversionObjective: "Convert a Calgary homeowner with an overdue home from website visitor to booking. The path: see transformation proof → feel desire for the reset → understand convenience (mobile, travel included) → book or text.",

    trustBuildingMechanisms: [
      "Before/after photography of real Calgary homes in genuinely bad condition",
      "Founder presence — Cochrane Master Builders's name, face, standards declaration",
      "Transparent pricing — starting from ~$100, travel included, no hidden fees",
      "No-judgment language — explicit reassurance that all conditions are welcome",
      "Service clarity — single 'Custom Build' offer, clear inclusions/exclusions",
      "Calgary-specific locality — real neighborhoods, real driveways, real homes",
    ],

    emotionalTone: "Deeply satisfying and capable. The visitor should feel: 'These people do serious work, and they'll come to me.' Not luxury, not cheap, not corporate. Grounded confidence with immediate proof of transformation. A parent with a fixer-upper should feel just as welcome as someone with a neglected townhome.",

    designDifferentiation: [
      "Proof-forward — before/after slider as the signature interaction, not buried in a gallery",
      "Editorial restraint — not a sales page, a curated transformation experience",
      "Real photography exclusively — no stock, no shiny showroom homes",
      "Industrial premium aesthetic — not luxury-coded, not budget, not masculine-aggressive",
      "Shape language — precision corners, elongated panels, inset windows, not templated",
      "No-judgment tone — explicitly welcoming to overdue, messy, embarrassing homes",
      "Website quality as differentiator — the site itself proves the brand's standards",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. DESIGN LANGUAGE — PIXEL-LEVEL SPECIFICATION
  // ═══════════════════════════════════════════════════════════════════
  designLanguage: {
    layoutPhilosophy: {
      principle: "Editorial automotive restoration meets premium service brand. Alternating dark/light sections create visual rhythm. Full-bleed proof sections. Content is curated and uncluttered — every element earns its place.",
      maxWidth: "1400px for content containers, full-bleed for imagery, proof sections, and dark backgrounds",
      gridSystem: "12-column grid on desktop. Single column on mobile. 2-column on tablet.",
      sectionRhythm: "Alternating dark/light: dark hero → light proof → dark service overview → light how-it-works → light pricing → dark founder → light testimonials → light FAQ → dark final CTA. Never two identical densities adjacent.",
      verticalRhythm: "Section padding: 120px top/bottom on desktop, 80px on tablet, 60px on mobile. Consistent 8px base grid.",
    },

    typographyHierarchy: {
      displayFont: {
        family: "Confident geometric or grotesque sans-serif (e.g., Space Grotesk, Plus Jakarta Sans, or similar industrial-premium face)",
        usage: "H1 headings, hero text, section titles, pull quotes, pricing figures",
        weights: ["400 (Regular)", "500 (Medium)", "600 (SemiBold)", "700 (Bold)"],
        style: "Sturdy, clean, confident. Communicates 'we know what we're doing' through weight, spacing, and restraint. Never delicate, never aggressive.",
        sizing: {
          h1: "clamp(2.5rem, 5vw, 4.5rem) — fluid, impactful",
          h2: "clamp(2rem, 4vw, 3.5rem)",
          h3: "clamp(1.5rem, 3vw, 2rem)",
          pullQuote: "clamp(1.75rem, 3.5vw, 2.5rem)",
          priceFigure: "clamp(3rem, 6vw, 5rem) — bold weight for pricing impact",
        },
      },
      accentFont: {
        family: "NONE — no script fonts, no decorative typefaces",
        usage: "Not applicable. The brand's typography is precision tooling, not ornamentation.",
        rule: "Zero decorative type. The premium signal comes from weight, spacing, and restraint — not from font diversity.",
      },
      bodyFont: {
        family: "Jost (current — evaluate) or clean sans-serif companion to display face",
        usage: "Body copy, navigation, buttons, form labels, metadata, captions",
        weights: ["300 (Light — for large display only)", "400 (Regular)", "500 (Medium)"],
        sizing: {
          body: "15px / 1.7 line-height — comfortable reading",
          small: "13px / 1.6",
          caption: "11px / 1.5 uppercase tracking-wider for overline labels",
        },
      },
      letterSpacing: {
        overlines: "0.2em — uppercase labels, section markers, trust bar items",
        headings: "-0.025em — tight for industrial confidence",
        body: "0 — natural",
        cta: "0.08em — slight openness for button labels",
      },
    },

    colorSystem: {
      philosophy: "Grounded, tactile, automotive-adjacent but not cliché. The palette should feel like materials: asphalt, warm stone, clean porcelain, burnished metal. Not corporate. Not luxury. Real and physical.",
      tokens: {
        asphaltBlack: "hsl(220, 8%, 12%) — primary dark, hero backgrounds, dark sections, depth",
        asphaltMid: "hsl(220, 6%, 18%) — dark section variants, card backgrounds in dark context",
        stoneGray: "hsl(220, 5%, 35%) — secondary text on light, primary text on dark",
        stoneMid: "hsl(220, 4%, 55%) — tertiary text, muted elements, captions",
        warmPorcelain: "hsl(30, 15%, 96%) — primary light background",
        porcelainDark: "hsl(30, 10%, 90%) — light section variants, subtle borders",
        cleanWhite: "hsl(0, 0%, 100%) — pure white for contrast elements",
        burnishedCopper: "hsl(25, 60%, 55%) — primary accent, CTAs, interactive elements",
        copperLight: "hsl(25, 50%, 70%) — hover states, secondary accent",
        copperDeep: "hsl(25, 65%, 42%) — active/pressed states",
        copperGlow: "hsl(25, 60%, 55% / 0.15) — subtle copper tint backgrounds",
      },
      usage: {
        backgrounds: "warmPorcelain for light sections, asphaltBlack for dark sections (hero, founder, final CTA), cleanWhite for cards/elevated content in light context",
        text: {
          onLight: "asphaltBlack for headings, stoneGray for body, stoneMid for captions",
          onDark: "cleanWhite for headings, porcelainDark for body, stoneMid for captions",
        },
        accents: "burnishedCopper for all CTAs, links, interactive hover states, pricing highlights, progress indicators",
        borders: "porcelainDark on light backgrounds, asphaltMid on dark backgrounds",
      },
      antiPatterns: [
        "No black-and-gold luxury coding",
        "No bright contractor-blue",
        "No harsh red racing accents",
        "No all-dark heaviness without light relief",
        "No pastel softness",
        "No neon energy-drink colors",
        "No marble textures",
        "No rainbow/multi-color",
      ],
    },

    spacingSystem: {
      baseUnit: "8px grid",
      scale: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "80px",
        "5xl": "120px",
        "6xl": "160px",
      },
      sectionPadding: {
        desktop: "120px vertical",
        tablet: "80px vertical",
        mobile: "60px vertical",
      },
      componentGaps: {
        cardGrid: "32px gap",
        textBlocks: "24px between paragraphs",
        headingToBody: "16px",
        sectionTitleToContent: "48px",
        trustBarItems: "32px horizontal, 16px vertical on mobile",
      },
    },

    motionPhilosophy: {
      principle: "Purposeful, transformation-narrative-driven. Motion should serve the before/after reveal narrative — wiping away grime, revealing the reset. Never decorative, never bouncy, never attention-seeking. Every animation earns its place.",
      easingCurve: "cubic-bezier(0.25, 0.1, 0.25, 1.0) — smooth, confident, settling",
      durations: {
        microInteraction: "150-200ms — hover states, button feedback, toggle",
        scrollReveal: "400-600ms — section content appearing on scroll",
        pageTransition: "300-500ms — route changes with dark-to-light sweep",
        heroAnimation: "800-1200ms — initial load, light-sweep reveal",
        beforeAfterSlider: "immediate (user-driven) — no artificial delay on drag",
      },
      signatureMotions: [
        "Hero light-sweep reveal — mimics paint-correction light reveal",
        "Before/after slider wipe — feels like physically cleaning the surface",
        "Scroll-triggered problem-to-reset transitions — dark-to-light section reveals",
        "Copper CTA pulse on scroll into view — subtle attention draw",
        "Booking transition choreography — calm, premium-feeling flow",
      ],
      rules: [
        "Only animate transform and opacity — never layout properties",
        "Content appears once and stays — never disappears on scroll",
        "Stagger siblings by 50-100ms for sequential reveals",
        "Respect prefers-reduced-motion — disable all non-essential animations",
        "Mobile: reduce or eliminate scroll-triggered animations for performance",
        "Maximum 3 animated elements visible at any time",
        "Before/after slider interaction must feel zero-latency",
      ],
    },

    imageryStyle: {
      photography: [
        "Real before/after pairs from actual Calgary jobs — the worse the starting state, the better",
        "Close-up texture macro: leather grain, carpet fibers after extraction, paint clarity post-correction",
        "Interior atmosphere shots — almost architectural in composition",
        "Founder-at-work documentary: Cochrane Master Builders working on homes, hands-on detail moments",
        "Calgary residential contexts: driveways, suburban streets, real neighborhoods",
        "Natural light, weather-appropriate — Calgary realism, not studio glamour",
        "Extraction evidence: what came OUT of the seats, the dirty water bucket",
      ],
      avoid: [
        "Spinning home GIFs",
        "Water-droplet-on-hood stock photos",
        "Generic man-wiping-home-with-cloth imagery",
        "Sparkle/shine particle effects",
        "Checkered racing patterns",
        "Glossy black backgrounds with lens flares",
        "Any stock photography of pristine showroom homes",
        "Overly filtered or heavily color-graded images",
      ],
      treatment: {
        heroImages: "Dark atmospheric, slight warm overlay for text legibility, before/after crossfade or slider",
        proofImages: "Clean, high-contrast, consistent framing for before/after pairs",
        textureCloseups: "Macro, edge-to-edge, no text overlay — let the material speak",
        founderImages: "Documentary, warm but grounded, environmental portraits in work context",
      },
    },

    shapeLanguage: {
      philosophy: "A signature part of the identity — noticeable enough that the site feels designed, not templated. Precision and restraint over decoration.",
      elements: [
        "Precision corners (2-4px radius) — sharp but not harsh",
        "Elongated horizontal panels — wide, low containers that feel automotive",
        "Inset content windows — content framed within larger dark/light panels",
        "Clean rectangular structure — no organic shapes, no circles, no rounded everything",
        "Selective asymmetry — occasional off-grid image placement for editorial energy",
        "Clipped panels — subtle clip-path for signature section transitions",
      ],
    },

    uiDensity: "Low-medium. Editorial whitespace communicates premium craft. Content is curated, not crowded. Every element earns its space. But not so sparse that it feels empty — the density should feel deliberate and confident.",

    shadowsAndDepth: {
      subtle: "0 2px 8px hsl(220 8% 12% / 0.06) — cards on light backgrounds",
      medium: "0 8px 24px hsl(220 8% 12% / 0.10) — modals, dropdowns, elevated elements",
      large: "0 16px 48px hsl(220 8% 12% / 0.15) — hero overlays, featured proof cards",
      none: "No excessive drop shadows. Use color contrast and border for separation in most cases.",
    },

    bordersAndRadii: {
      radius: {
        none: "0px — for full-bleed images, edge-to-edge sections",
        sharp: "2px — editorial elements, cards, containers",
        sm: "4px — buttons, inputs",
        pill: "9999px — CTA buttons for signature shape",
      },
      borders: {
        subtle: "1px solid hsl(30 10% 90%) — porcelainDark on light",
        dark: "1px solid hsl(220 6% 18%) — asphaltMid on dark",
        accent: "2px solid hsl(25 60% 55%) — burnishedCopper for emphasis",
        decorative: "1px solid hsl(220 5% 35% / 0.15) — stoneGray at low opacity",
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. WEBSITE ARCHITECTURE — PAGES & SECTIONS
  // ═══════════════════════════════════════════════════════════════════
  websiteArchitecture: {
    pages: {
      home: {
        route: "/",
        purpose: "Primary conversion engine. Complete emotional arc from awareness to desire to action in a single scroll. Compress proof, offer, trust, and convenience into one cinematic flow.",
        h1: "Get Your Home Back — Residential Interior Finishing in Calgary",
        metaDescription: "Calgary's residential interior finishing service. Deep interior extraction, paint restoration, travel included. Full resets from ~$100. We come to you — no judgment, just results.",
        sections: [
          {
            id: "hero",
            type: "Full-screen dark hero with before/after crossfade",
            content: "Emotional hook headline + trust line + dual CTA",
            headline: "Get your home back.",
            subline: "Mobile home restoration across Calgary. Deep interior extraction. Paint restoration. Travel included.",
            trustLine: "Mobile in Calgary · Travel Included · Full Detail from ~$100 · No Judgment",
            primaryCTA: "Book Your Reset",
            secondaryCTA: "See Transformations",
            design: "Asphalt Black background. Slow before/after crossfade or bespoke slider. Light-sweep reveal animation. Centered text. Industrial sans display. Trust line as overline ribbon.",
          },
          {
            id: "immediate-proof",
            type: "Bespoke before/after slider — THE signature interaction",
            content: "Full-width, edge-to-edge drag-to-reveal before/after with annotated callouts",
            design: "The defining moment of the site. Tactile wipe interaction. Annotated labels ('embedded grime,' 'extraction result,' 'restored finish'). Touch-optimized. Zero-latency drag. Caption with condition context ('This addition hadn't been cleaned in 14 months. Here's the reset.').",
          },
          {
            id: "service-overview",
            type: "Outcome-led single service presentation",
            content: "The Custom Build — what you get, not how we do it. Interior + exterior outcomes.",
            interiorCopy: "A deep interior reset — stains extracted, buildup removed, odor eliminated, and every surface restored to a fresh, factory-like standard. Not a wipe-down. A reset you can feel the moment you sit down.",
            exteriorCopy: "Paint restoration that brings back the finish your home started with — site-finish blemishes reduced, grime removed, and a clean, even surface that catches light the way it used to.",
            design: "Light background. Clean layout with outcome-focused copy. Close-up texture photography. 80% outcome language, 20% process detail.",
          },
          {
            id: "how-it-works",
            type: "3-step horizontal process",
            content: "Book → We Come → Reset",
            steps: [
              { number: "01", title: "Book", description: "Pick a time. Tell us your home and condition." },
              { number: "02", title: "We Come to You", description: "Cochrane Master Builders arrives at your location with everything needed." },
              { number: "03", title: "Custom Build", description: "Deep extraction. Drywall + paint finishing. You get your home back." },
            ],
            design: "Warm Porcelain background. Numbered steps with editorial typography. Horizontal on desktop, vertical stack on mobile. Subtle connector lines between steps.",
          },
          {
            id: "pricing-snapshot",
            type: "Transparent pricing section",
            content: "Starting from ~$100 + what affects the price",
            headline: "From ~$100",
            explanation: "Home size and condition may affect final price. Travel always included.",
            design: "Large price figure in display font (bold weight). Visual explainer showing price factors (home size scale, condition level). Not a spreadsheet — a simple, confident presentation.",
          },
          {
            id: "founder-section",
            type: "Manifesto-style founder block",
            content: "Cochrane Master Builders's standards — what 'done' means. Short, punchy, real.",
            copy: "3-4 sentences about what Cochrane Master Builders believes, why he does this, and what his standard is. Not a biography. A declaration of craft.",
            design: "Dark background (Asphalt Black). Founder at-work photography. Clean sans typography. Short manifesto text. Should feel confident, not small.",
          },
          {
            id: "testimonials",
            type: "Integrated proof quotes",
            content: "3-4 strong customer quotes with specific outcome language",
            quoteThemes: ["Relief after the service", "Visible transformation", "Convenience of mobile", "No judgment / easy process", "Worth the money"],
            design: "Light background. Pull-quote style. Not a carousel — integrated into the flow. Each with home type and condition context.",
          },
          {
            id: "faq-preview",
            type: "Top 4 objection-handling questions",
            content: "The questions that block booking decisions",
            questions: [
              "Can you handle really dirty homes?",
              "What does the detail include?",
              "Do you come to me anywhere in Calgary?",
              "Do I need to provide water or power?",
            ],
            design: "Light background. Accordion style. Opens with 'Your home isn't too dirty' reassurance note.",
          },
          {
            id: "final-cta",
            type: "Emotional close with before/after background",
            content: "Permission to act",
            headline: "Your home is next.",
            sensoryCopy: "The smell of a home that's been reset — clean fabric, fresh air, no trace of what was there before.",
            cta: "Book Your Reset",
            secondaryCta: "Text Cochrane Master Builders",
            design: "Dark background with single powerful before/after. Sensory copy. Dual CTA. Should feel like a permission to finally act.",
          },
        ],
      },

      services: {
        route: "/services",
        purpose: "Go deeper into what's included, what affects pricing, what to expect. Answer practical questions. Problem-state framing.",
        h1: "The Custom Build — Residential Interior Finishing in Calgary",
        sections: [
          "Hero with 'The Custom Build' positioning",
          "Problem-state framing: 'Daily homeowner that needs a refresh' vs 'Home that hasn't been touched in a year' vs 'Work truck with heavy-use buildup'",
          "Detailed inclusions: interior extraction, drywall + paint finishing, trim restoration",
          "What affects pricing: home size, condition level, add-ons",
          "Realistic expectations: restoration vs repair, condition-dependent results",
          "FAQ section (service-specific)",
          "Booking CTA",
        ],
      },

      results: {
        route: "/results",
        purpose: "Curated proof portfolio. Make visitors self-identify and feel hopeful. The core trust system of the site.",
        h1: "Real Transformations — Calgary Home Restorations",
        sections: [
          "Curated before/after portfolio with condition tags and home and project types",
          "Annotated before/after sliders with callout labels",
          "Condition-level categories: moderate, heavy, severe",
          "Home-type variety: townhomes, additions, trucks, starter homes",
          "Outcome captions: blend of practical + emotional",
          "Booking CTA",
        ],
      },

      about: {
        route: "/about",
        purpose: "Build trust through founder authenticity. Convert skeptics through realness, not persuasion.",
        h1: "About Cochrane Master Builders — Cochrane & Calgary Master Builder — Custom Homes & Renovations",
        sections: [
          "Short manifesto — what Cochrane Master Builders believes, why he does this, what his standard is",
          "At-work photography and environmental portraits",
          "'Cochrane Master Builders's Standard' — what every home gets and what 'done' means",
          "Calgary locality: local, founder-operated, not a franchise",
          "Booking CTA",
        ],
      },

      book: {
        route: "/book",
        purpose: "Convert. Minimal friction booking. Like a premium app checkout.",
        h1: "Book Your Reset — Custom Home Building in Calgary",
        sections: [
          "Warm welcome copy — calm, reassuring",
          "Minimal form: location, home type, condition level, preferred date",
          "Text/call alternative always visible",
          "What to expect after booking",
          "No account creation, no multi-page wizard",
        ],
      },

      faq: {
        route: "/faq",
        purpose: "Answer objections. Reduce friction. Handle embarrassment and practical concerns.",
        h1: "Frequently Asked Questions — Cochrane & Calgary Master Builder — Custom Homes & Renovations",
        sections: [
          "'Your home isn't too dirty' reassurance header before accordion",
          "Grouped FAQ accordion: Service, Pricing, Process, Coverage Area",
          "Condition-level questions answered with before/after thumbnails inline",
          "Booking CTA at bottom",
        ],
      },
    },

    navigation: {
      items: [
        { label: "Home", path: "/" },
        { label: "Services", path: "/services" },
        { label: "Results", path: "/results" },
        { label: "About", path: "/about" },
        { label: "FAQ", path: "/faq" },
        { label: "Book", path: "/book", isCTA: true },
      ],
      behavior: {
        desktop: "Transparent on hero → solid warmPorcelain/asphaltBlack on scroll. Logo left, links center, Book CTA right (burnishedCopper pill button).",
        mobile: "Minimal hamburger with fast animation (<300ms). Book CTA always visible in sticky bar. No 2-second animation theatrics.",
        scrollTransition: "200-300ms custom easing. Triggers after hero section exit.",
        activeState: "Subtle copper underline on current page link.",
      },
    },

    conversionFlow: {
      primary: "Homepage (proof → desire → book)",
      secondary: "Results → Services → Book",
      tertiary: "Any page → sticky mobile CTA → Book or Text",
      ctaStrategy: "Every page ends with a booking CTA section. Book button in nav on every page. Text/call alternative always accessible. Never more than 1 tap from the booking path on mobile.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. COMPONENT SYSTEM PLAN
  // ═══════════════════════════════════════════════════════════════════
  componentSystem: {
    primitives: {
      SectionWrapper: "Consistent vertical padding, max-width, responsive behavior. Accepts background color token (light/dark variants).",
      Container: "Max-width 1400px container with horizontal padding. Centers content.",
      SectionTitle: "Industrial sans heading with optional overline label, decorative copper rule, and scroll animation.",
      Button: {
        variants: [
          "primary (burnishedCopper background, cleanWhite text, pill shape) — main CTAs",
          "secondary (outlined, copper border, copper text) — secondary actions",
          "ghost (text only, copper color, underline on hover) — tertiary links",
          "dark (asphaltBlack background, cleanWhite text) — CTAs on light backgrounds",
        ],
        states: "default, hover (subtle brightness shift + scale 1.02), focus (visible copper ring), disabled (stoneMid, reduced opacity)",
        sizes: ["sm (h-9 px-4)", "md (h-11 px-6)", "lg (h-13 px-8)"],
      },
      TextBlock: "Paragraph styling with consistent line-height, max-width 60ch for readability.",
      OverlineLabel: "11px uppercase, 0.2em letter-spacing, stoneMid on light / copperLight on dark.",
      CopperRule: "Thin 48px horizontal line in burnishedCopper. Visual separator between overline and heading.",
    },

    sections: {
      HeroSection: "Full-screen dark with before/after, headline, trust line, dual CTA. Light-sweep reveal.",
      BeforeAfterSlider: "Bespoke drag-to-reveal with annotated callouts. Touch-optimized. Zero-latency. THE signature component.",
      ServiceOverviewSection: "Outcome-led 'Custom Build' presentation with texture photography.",
      HowItWorksSection: "3-step numbered process with connector lines.",
      PricingSnapshotSection: "Large price figure + visual factor explainer.",
      FounderSection: "Dark background manifesto with at-work photography.",
      TestimonialSection: "Integrated proof quotes with home context. Not a carousel.",
      FAQSection: "Accordion with reassurance header. Grouped by category.",
      CTASection: "Dark band with emotional headline, sensory copy, dual CTA.",
      BookingFormSection: "Minimal, calm form + text/call alternative.",
      ProofGallery: "Curated before/after grid with condition tags and home and project types.",
      StickyMobileCTA: "Fixed bottom bar on mobile: alternates 'Book Your Reset' / 'Text Cochrane Master Builders' based on scroll position.",
    },

    patterns: {
      darkLightAlternation: "Sections alternate between warmPorcelain and asphaltBlack backgrounds for editorial rhythm.",
      proofCard: "Before/after pair with condition label, home type, outcome caption.",
      insetContentWindow: "Content framed within a larger panel — creates depth and editorial framing.",
      scrollReveal: "Wrapper component for scroll-triggered fade-up + opacity. Uses IntersectionObserver. Disabled on prefers-reduced-motion.",
      elongatedPanel: "Wide, low horizontal container — signature shape language element.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. RESPONSIVE STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  responsiveStrategy: {
    philosophy: "Mobile-first. ~90% of traffic will be mobile. The mobile experience is not a compressed desktop — it's a purpose-built thumb-flow optimized for stressed users seeking a quick booking.",
    breakpoints: {
      mobile: "< 640px — single column, sticky CTA bar, condensed proof slider, expandable FAQs",
      tablet: "640-1024px — 2-column where appropriate, slightly reduced padding",
      desktop: "> 1024px — full editorial layout, 12-column grid, generous whitespace",
    },
    mobileSpecific: [
      "Custom typography scale (not just scaled-down desktop)",
      "Intentional spacing that doesn't just collapse",
      "Touch-optimized before/after sliders (44px+ touch targets)",
      "Sticky CTA bar with bespoke styling",
      "Image loading that prioritizes proof content",
      "Micro-interactions on buttons that feel tactile",
      "Tap-to-call and tap-to-text always accessible",
      "Condensed hero — single before/after with swipe and headline overlaid",
    ],
    aboveTheFoldMobile: [
      "Clear headline ('Get your home back')",
      "What the service is (residential interior finishing)",
      "That it is mobile + Calgary",
      "CTA to book",
      "Proof image or transformation cue",
      "Price guidance (~$100)",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. SEO ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  seoArchitecture: {
    titleTemplate: "{Page Title} | Cochrane Master Builders — Calgary Mobile Detail",
    canonicalBase: "https://cochranemasterbuilders.com",
    structuredData: [
      "LocalBusiness — site-wide (name, address, areaServed: Calgary, priceRange)",
      "Service — services page (The Custom Build)",
      "FAQPage — FAQ sections",
      "BreadcrumbList — all pages",
    ],
    primaryKeywords: [
      "Calgary residential finishing",
      "mobile interior finishing Calgary",
      "interior home cleaning Calgary",
      "home restoration Calgary",
      "mobile residential interior finishing Calgary",
      "home detail Calgary",
    ],
    localSignals: [
      "Calgary, Alberta in footer, about page, meta descriptions",
      "Service area coverage (NW, NE, SW, SE, surrounding communities)",
      "LocalBusiness schema with Calgary geo coordinates",
      "Real Calgary neighborhood context in proof captions",
    ],
    imageAlt: "Descriptive with condition/home context: 'Before and after interior extraction of a heavily soiled Calgary family addition' not 'home cleaning'",
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. ACCESSIBILITY REQUIREMENTS
  // ═══════════════════════════════════════════════════════════════════
  accessibility: {
    standard: "WCAG 2.2 AA",
    requirements: [
      "4.5:1 contrast ratio for normal text, 3:1 for large text — critical for dark sections",
      "All before/after images have descriptive alt text with condition and outcome context",
      "Semantic HTML: proper heading hierarchy (single H1 per page), landmarks, nav, main, footer",
      "Keyboard navigable: before/after slider operable via arrow keys",
      "Skip-to-content link",
      "Form labels associated with inputs, clear error messaging",
      "prefers-reduced-motion respected — all scroll animations disabled",
      "Touch targets minimum 44x44px on mobile — critical for sticky CTA bar",
      "Before/after slider accessible: keyboard operable, screen reader description of both states",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. PERFORMANCE BUDGET
  // ═══════════════════════════════════════════════════════════════════
  performanceBudget: {
    totalPageWeight: "< 1.5MB initial load",
    LCP: "< 2.5 seconds — hero before/after must load fast",
    INP: "< 200ms — before/after slider interaction must feel instant",
    CLS: "< 0.1 — image dimensions must be specified",
    jsBundle: "< 300KB initial (code-split by route)",
    cssBundle: "< 100KB total",
    fontWeight: "< 120KB total (2 weights max of display + body)",
    heroImage: "< 200KB (WebP/AVIF with fallback)",
    proofImages: "< 150KB each (optimized WebP before/after pairs)",
    lazyLoading: "All images below fold lazy-loaded. Proof section images prioritized over decorative.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. SIGNATURE MOMENTS
  // ═══════════════════════════════════════════════════════════════════
  signatureMoments: {
    defining: "The before/after slider — a bespoke, tactile, drag-to-reveal experience with annotated callouts that feels unlike any other builder site's generic gallery. This is the moment that proves the brand.",
    moments: [
      {
        name: "Hero light-sweep reveal",
        description: "A light-sweep animation that mimics a paint-correction reveal, moving across the hero image on initial load",
        timing: "800-1200ms on page load, once",
      },
      {
        name: "Before/after wipe slider",
        description: "Full-width drag-to-reveal that feels like physically wiping away grime. Annotated with callout labels.",
        timing: "User-driven, zero latency",
      },
      {
        name: "Problem-to-reset section transitions",
        description: "Dark-to-light section transitions that mirror the before/after transformation narrative",
        timing: "Scroll-triggered, 400-600ms",
      },
      {
        name: "The Feeling After",
        description: "A short sensory section describing the post-reset experience (smell, sight, touch, pride) — unlike anything in the category",
        timing: "Static, atmospheric, near final CTA",
      },
      {
        name: "Elevated booking transition",
        description: "Clean, focused booking moment with minimal friction and warm confirmation",
        timing: "On route transition to /book, 300-500ms",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 10. ANTI-PATTERNS — WHAT THE SITE MUST NEVER BE
  // ═══════════════════════════════════════════════════════════════════
  antiPatterns: {
    visual: [
      "Generic — if it could be any builder's website, it has failed",
      "Stock photography dependent",
      "Blue-gradient quick handyman fix aesthetic",
      "Black-and-gold luxury coded",
      "Masculine-aggressive (racing fonts, flames, neon)",
      "Template-driven (Bootstrap/Wix default look)",
      "Cluttered with too many service packages",
      "Sparkle/shine effects",
    ],
    copy: [
      "'Attention to detail'",
      "'Quality service'",
      "'Premium experience'",
      "'Customer satisfaction guaranteed'",
      "'Showroom perfection'",
      "'Your home deserves the best'",
      "'We treat every home like our own'",
      "'No job too big or too small'",
      "Any superlative without proof",
      "Any luxury-coded language",
    ],
    ux: [
      "Auto-playing video backgrounds",
      "Chat widgets",
      "Cookie banner theatrics",
      "Scroll-jacking",
      "Infinite scroll galleries",
      "Pop-ups of any kind",
      "Floating social icons",
      "Progress bars that don't represent real loading",
      "Hamburger menus that animate for 2 seconds",
      "'Call for pricing' as primary path",
      "Multi-page booking wizard",
      "Account creation requirement",
    ],
    emotional: [
      "Making the visitor feel judged for their home's condition",
      "Implying a dirty home is unusual or shameful",
      "Feeling corporate or franchise-like",
      "Feeling too small or amateur",
      "Feeling like a luxury service that excludes normal homes",
      "Feeling salesy, gimmicky, or aggressive",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 11. QUALITY BAR — FANTASY.CO STANDARD
  // ═══════════════════════════════════════════════════════════════════
  qualityBar: {
    everyElement: "Must feel weighted, intentional, and premium — but accessible, not exclusive",
    everyTransition: "Must serve the transformation narrative or reduce friction",
    everySection: "Must earn its place in the conversion journey or trust-building arc",
    everyCopy: "Must sound like a real person — direct, warm, sensory, no-judgment, never a brochure",
    everyImage: "Must be real proof from real Calgary homes — evidence over decoration",
    everyInteraction: "Must feel confident and calm — never playful, bouncy, or theatrical",
    successTest: "When the before/after slider makes you want to book a quote for your own home. When the copy sounds like a real person. When the whole experience feels like one cohesive object — not assembled from sections. When you forget you're looking at a local service website.",
    failureTest: "If it looks like it could be any builder's website. If it uses stock photography. If the copy contains 'quality service' or 'attention to detail.' If the pricing is hidden. If it feels luxury-coded. If a parent with a fixer-upper would feel out of place.",
    neverFinished: "There is always a refinement to make. No element is ever 'done.'",
  },

  // ═══════════════════════════════════════════════════════════════════
  // 12. IMPLEMENTATION PHASES
  // ═══════════════════════════════════════════════════════════════════
  implementationPlan: {
    phase1_DesignSystem: {
      order: 1,
      description: "Rebuild design tokens, colors, typography for Cochrane Master Builders identity",
      tasks: [
        "Replace index.css color tokens: sage/cream/teal → asphalt/stone/porcelain/copper",
        "Update tailwind.config.ts with new color system and font families",
        "Replace Google Fonts: remove Cormorant Garamond + Great Vibes, add industrial sans display font",
        "Update base styles: heading font-family, body defaults, selection color, focus rings",
        "Create copper-accent button variants",
        "Update overline/label utility classes",
      ],
    },
    phase2_Navigation: {
      order: 2,
      description: "Rebuild navigation for Cochrane Master Builders brand",
      tasks: [
        "New nav links: Home, Services, Results, About, FAQ, Book",
        "Desktop: transparent → solid on scroll with copper Book CTA",
        "Mobile: minimal hamburger, sticky CTA bar always visible",
        "Active state: copper underline",
      ],
    },
    phase3_Homepage: {
      order: 3,
      description: "Complete homepage rebuild with transformation narrative",
      tasks: [
        "Dark hero with 'Get your home back' headline + trust line + dual CTA",
        "Bespoke before/after slider (signature interaction)",
        "Outcome-led 'Custom Build' service overview",
        "3-step 'How it works' section",
        "Pricing snapshot (~$100)",
        "Founder manifesto section",
        "Integrated testimonials",
        "FAQ preview (top 4)",
        "Final CTA with sensory close",
      ],
    },
    phase4_CorePages: {
      order: 4,
      description: "Build Services, Results, About pages",
      tasks: [
        "Services page with problem-state framing",
        "Results page with curated proof portfolio",
        "About page with founder manifesto",
      ],
    },
    phase5_BookingAndFAQ: {
      order: 5,
      description: "Booking form and FAQ",
      tasks: [
        "Minimal booking form with text/call alternative",
        "FAQ page with reassurance header and grouped accordion",
        "Sticky mobile CTA bar",
      ],
    },
    phase6_Footer: {
      order: 6,
      description: "Contact-forward footer with trust reinforcement",
      tasks: [
        "Contact info (phone, text, email)",
        "Calgary service area mention",
        "Trust line repetition",
        "Social links",
        "Booking CTA",
      ],
    },
    phase7_SEOAndPerformance: {
      order: 7,
      description: "SEO, structured data, performance optimization",
      tasks: [
        "Page-level meta tags and titles for Calgary local SEO",
        "JSON-LD structured data (LocalBusiness, Service, FAQPage)",
        "Image optimization with condition-specific alt text",
        "Font preloading and display:swap",
        "Core Web Vitals optimization",
        "Lazy loading strategy (proof images prioritized)",
      ],
    },
    phase8_ImageGeneration: {
      order: 8,
      description: "Generate brand-aligned imagery",
      tasks: [
        "Before/after pairs: interior extraction, drywall + paint finishing",
        "Close-up texture macro shots",
        "Founder at-work photography style",
        "Calgary residential context imagery",
        "Dark atmospheric hero backgrounds",
      ],
    },
    phase9_Polish: {
      order: 9,
      description: "Final polish, motion, accessibility, cross-device QA",
      tasks: [
        "Hero light-sweep reveal animation",
        "Before/after slider micro-interactions",
        "Section transition choreography",
        "Responsive testing across breakpoints",
        "Accessibility audit (contrast on dark sections, keyboard nav, screen readers)",
        "Performance audit (Lighthouse, CWV)",
        "Copy review for no-judgment tone consistency",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 13. APPROVAL STATUS
  // ═══════════════════════════════════════════════════════════════════
  approvalStatus: {
    status: "APPROVED",
    instruction: "This plan is approved and implementation-ready. Execution follows the phase order defined in implementationPlan.",
    nextStep: "Begin Phase 1: Design System — rebuild color tokens, typography, and base styles for Cochrane Master Builders identity.",
  },

} as const;
