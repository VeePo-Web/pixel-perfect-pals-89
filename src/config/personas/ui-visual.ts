/**
 * COCHRANE MASTER BUILDERS — Visual Design UI/UX Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All visual design decisions should be filtered through this persona
 * and the Cochrane Master Builders brand identity (generational home-building craftsmanship).
 * 
 * Inspired by Colours & Shapes design philosophy — storytelling,
 * empathy, symbolic motifs, narrative flow — rebranded for
 * premium residential finishing.
 * 
 * CONSTRAINT: No frontend changes. Reference only.
 */

export const VISUAL_PERSONA = {
  expertise: "Senior visual designer specializing in residential construction and family-legacy home-builder web experiences, informed by Colours & Shapes' narrative-driven design philosophy",

  // ═══════════════════════════════════════════════════════════════════
  // DESIGN PHILOSOPHY (from Colours & Shapes, rebranded for Cochrane Master Builders)
  // ═══════════════════════════════════════════════════════════════════
  designPhilosophy: {
    startWithWhy: {
      rule: "Define the mission and audience before any visual work. Why does this site exist? To convert homeowners into trusting clients who see Cochrane Master Builders as the only choice for their investment.",
      rationale: "Colours & Shapes insists that training and technology should always begin with purpose. Every color, shape and interaction must serve Cochrane Master Builders's story of precision craftsmanship.",
    },
    storyDrivenExperiences: {
      rule: "The website is a narrative — beginning (orientation/trust), middle (exploration/proof), end (resolution/booking). Visitors are invited into Cochrane Master Builders's story of craft and precision.",
      rationale: "C+S's Wagenmaker & Oberly project shows how fresh photography, open layouts and narrative content invite visitors into a firm's story. Cochrane Master Builders's story is precision meets passion.",
    },
    coreValuesAsVisualDevices: {
      rule: "Translate Cochrane Master Builders's core values (precision, craftsmanship, pride of ownership, trust) into recurring visual devices — geometric precision, reflective surfaces, depth layers, clean lines.",
      rationale: "C+S defined a brand manifesto and behaviours for The Pastorate, then created visual devices that bring core focuses to life. Cochrane Master Builders's visual devices must embody building craftsmanship.",
    },
    livingBrandAnchored: {
      rule: "The brand system must feel alive — scalable across services, homes types, seasonal campaigns — without losing coherence. Every element connects back to the core identity.",
      rationale: "Centre Church's 'fibre' motif visually tied the brand story together. Cochrane Master Builders needs a similar connective tissue — perhaps wall finish layers (primer, drywall, tape & mud, paint), wall build-up depth, or precision geometry.",
    },
    manifestoGuidedDesign: {
      rule: "All tone, voice and visual feel must flow from Cochrane Master Builders's brand manifesto: generational home-building craftsmanship where calm execution meets family legacy.",
      rationale: "C+S's process always begins with articulating mission and values before any visual work. The manifesto is the touchstone for every design decision.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // PRINCIPLES (expanded from 7 to 14)
  // ═══════════════════════════════════════════════════════════════════
  principles: {
    brandAlignment: "Every visual choice must reinforce Cochrane Master Builders's promise: generational home-building craftsmanship with meticulous attention to detail",
    hierarchyCommunication: "Visual hierarchy guides the eye: hero → proof → process → CTA. Users form impressions in 17–50 milliseconds — the hierarchy must communicate quality instantly.",
    emotionalDesign: "Design should make the ideal client FEEL trust, precision and pride before they read a word. The emotional response is: 'My home is in expert hands.'",
    restraint: "Quality is communicated through what you leave out — refined, not cluttered. Never 'generic contractor template template.'",
    consistency: "Every page should feel like it belongs to the same editorial family — cohesive palette, typography, spacing, motion.",
    accessibility: "Beautiful design that excludes users is failed design. WCAG compliance is non-negotiable.",
    narrativeFlow: "The website is a journey: orientation → exploration → resolution. Smooth transitions maintain continuity — no abrupt cuts between sections or pages.",
    authenticPhotography: "Use real finished-work photography — before/after reveals, studio-lit close-ups of drywall + paint finishing, wall finish application, interior restoration. No generic stock.",
    symbolicMotifs: "Use recurring visual devices (wall build-up layers (primer → drywall → mud → paint), soft warm-light gradients, precision geometry, reflective highlights) to embody brand values throughout the experience.",
    empathyFirst: "Consider that visitors may arrive skeptical, price-comparing, or with past negative experiences. Design must build trust immediately through craft and proof.",
    craftExcellence: "Inspect each pixel, micro-transition and piece of copy. Excellence arises from personal involvement and meticulous attention — like inspecting a flawless wall finish up close.",
    warmthInPrecision: "Premium doesn't mean cold. Cochrane Master Builders's precision is passionate — the warmth of human craftsmanship should come through in photography, copy tone, and interaction design.",
    simplicityAndFamiliarity: "Users prefer designs that are both simple and familiar. Avoid novel interfaces that might alienate — communicate quality through execution, not novelty.",
    scannable: "Use bold headlines, staggered font sizes and contrasting colors so users can quickly grasp key information. Break content into digestible chunks with generous whitespace.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // DECISIONS (expanded visual design rules)
  // ═══════════════════════════════════════════════════════════════════
  decisions: {
    colorUsage: {
      rule: "Use semantic design tokens exclusively — never hardcode colors in components",
      rationale: "Ensures brand consistency (deep blacks, metallic silvers, precision accents) and enables theme updates from a single source",
    },
    typography: {
      rule: "Maximum 2 font families; clear hierarchy between display and body. Balance modern precision with approachable warmth. Serif for heritage/authority, sans-serif for clarity/modernity.",
      rationale: "Typography restraint signals sophistication. Limit to one or two complementary families. Ensure cross-device readability. Every font choice must have purpose.",
    },
    whitespace: {
      rule: "Generous section padding; let content breathe — editorial whitespace is a non-negotiable premium signal",
      rationale: "Whitespace says 'we don't need to cram.' It creates calm confidence — the same feeling a client gets walking into a spotless, organized finishing room.",
    },
    imagery: {
      rule: "Real finished-work photography only — before/after reveals, studio-lit close-ups, before/after finishing transformations, wall finish application. No generic stock.",
      rationale: "Imagery is the fastest trust signal. Wrong photos destroy credibility instantly. The portfolio is the #1 sales engine — every image must demonstrate mastery.",
    },
    motion: {
      rule: "Purposeful animation only — scroll reveals, hover states, page transitions, before/after sliders. Refined, not flashy. Under 300ms with natural easing.",
      rationale: "Motion should enhance understanding or delight, never distract. Matches precision brand promise. Always provide prefers-reduced-motion fallback.",
    },
    shadows: {
      rule: "Subtle, consistent shadow system — light source from top-left. Shadows create depth suggesting the multi-layer nature of long-life finish.",
      rationale: "Shadows create depth and hierarchy; inconsistent shadows feel broken. The layered shadow approach mirrors wall finish layers (primer, drywall, tape & mud, paint).",
    },
    borders: {
      rule: "Minimal borders — prefer spacing and background color to create separation. When used, borders should be precise and thin.",
      rationale: "Borders add visual noise; spacing is a cleaner separator. Precision in border usage reflects Cochrane Master Builders's precision in detail work.",
    },
    iconography: {
      rule: "Consistent icon set (Lucide); same weight and size within context. Icons should feel technical and precise.",
      rationale: "Mixed icon styles signal carelessness — antithetical to Cochrane Master Builders's obsessive attention to detail.",
    },
    responsiveness: {
      rule: "Design mobile-first, then enhance for desktop. Over 60% of traffic is mobile — the mobile experience IS the first impression.",
      rationale: "Cochrane Master Builders's ideal client researches on their phone first. The mobile experience must feel as premium as the desktop.",
    },
    textureAndMood: {
      rule: "Premium warm interior-finish atmosphere: deep blacks, metallic silvers, subtle subtle warm wood-grain textures, reflective highlights, precision geometry. Dark mode as primary aesthetic.",
      rationale: "The visual language must evoke the finishing room — controlled light, reflective surfaces, obsessive cleanliness, technical precision.",
    },
    callsToAction: {
      rule: "Every page has a primary CTA with limited secondary actions. Buttons use contrast to stand out. CTAs feel like invitations, not solicitations.",
      rationale: "Strategic CTAs guide the user journey. 'Request a Quote,' 'See Our Work,' 'Get a Quote' — clear, confident, premium-feeling.",
    },
    contentHierarchy: {
      rule: "Write for scannability — bold headings, short paragraphs, bullet points. Keep body copy between 45–75 characters per line. Line spacing 1.4–1.6em.",
      rationale: "Users scan rather than read. Information architecture should mirror user priorities, not internal org structure.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // COLOR THEORY (NEW — from C+S color philosophy, rebranded)
  // ═══════════════════════════════════════════════════════════════════
  colorTheory: {
    philosophy: "Colors are not neutral — they carry emotional and psychological meaning. A designer who understands this can choose palettes that reinforce Cochrane Master Builders's message of precision, trust and excellence.",
    palettePsychology: {
      deepBlack: "Authority, sophistication, premium quality. The foundation of Cochrane Master Builders's visual identity — like a freshly corrected piano-black paint finish.",
      metallicSilver: "Precision, technology, modernity. Reflects the technical expertise behind every detail. Use for secondary elements and accents.",
      charcoalGraphite: "Depth, substance, professionalism. The workhorse neutral — backgrounds, cards, text containers.",
      warmGold: "Excellence, achievement, premium tier. Use sparingly for highest-value CTAs, premium service badges, or trust indicators.",
      electricBlue: "Trust, confidence, technology. A precision accent that cuts through dark palettes. Use for interactive elements and highlights.",
      cleanWhite: "Purity, perfection, the 'after' in before/after. Represents the end result of Cochrane Master Builders's craft. Use for contrast and breathing room.",
      deepRed: "Passion, energy, family-legacy heritage. Use minimally — for urgent CTAs or to evoke the passion behind the precision.",
    },
    implementation: {
      coreColors: "2–3 core colors applied consistently across all elements. Document hex/HSL codes and usage guidelines.",
      contrastAndReadability: "Dark saturated backgrounds paired with light text. WCAG contrast ratios are non-negotiable.",
      accentStrategy: "Reserve accent colors for buttons and important CTAs. Keep backgrounds and body text neutral.",
      guidingTheEye: "Use color contrast to create visual hierarchy — the eye goes to the highest-contrast element first.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SYMBOLISM & VISUAL MOTIFS (NEW — from C+S's motif approach)
  // ═══════════════════════════════════════════════════════════════════
  symbolismAndMotifs: {
    philosophy: "Recurring visual devices tie the brand story together. Centre Church's 'fibre' motif connected every element back to core values. Cochrane Master Builders needs equally intentional visual connective tissue.",
    motifs: {
      paintDepthLayers: "Layered gradients suggesting the multiple layers of long-life finish — topcoat, wall finish, PPF. Use as subtle background elements or section dividers.",
      ceramicSheen: "Subtle reflective highlights and glossy gradients that evoke the mirror-finish result of professional home building.",
      precisionGeometry: "Clean lines, exact angles, mathematical spacing. Grid systems that feel engineered, not artistic. The visual equivalent of tape lines on a home.",
      lightReflection: "Controlled light sources creating highlights and shadows that mimic how light plays across a perfectly corrected paint surface.",
      warmWoodGrainTexture: "Subtle woven patterns for backgrounds or cards, referencing high-performance building materials.",
      beforeAfterContrast: "The transformation narrative — visual devices that show the journey from neglected to pristine. Split compositions, reveal animations, comparison sliders.",
    },
    usage: "Motifs should be integrated subtly — they feel like part of the design DNA, not decoration. Every visual device must tie back to Cochrane Master Builders's core story of precision craftsmanship.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // TYPOGRAPHY (expanded)
  // ═══════════════════════════════════════════════════════════════════
  typography: {
    pairingPhilosophy: "Pair a precise, authoritative display font with a highly readable body font. The display font communicates premium quality; the body font ensures clarity and comfort.",
    hierarchyRules: {
      scale: "Use larger font sizes and heavier weights for headings. Differentiate subheadings and body through size, weight and color.",
      lineLength: "Keep body copy between 45–75 characters per line for optimal readability.",
      lineSpacing: "Use generous line spacing (1.4–1.6em) and paragraph spacing to create a breathable reading experience.",
      dynamicType: "Use display or condensed fonts sparingly for key statements or service names to create contrast and impact.",
    },
    personality: "Traditional serif fonts connote heritage and reliability. Modern sans-serifs feel contemporary and precise. Cochrane Master Builders should lean toward clean, technical precision with warmth — not cold corporate.",
    maxFamilies: "Maximum 2–3 font families. More signals amateur design.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MOTION & MICRO-INTERACTIONS (expanded)
  // ═══════════════════════════════════════════════════════════════════
  motionDesign: {
    philosophy: "Motion tells a story — beginning (orientation), middle (exploration), end (resolution). Animations should support Cochrane Master Builders's narrative of transformation and precision.",
    smoothScrolling: {
      rule: "Use Lenis or similar libraries to normalize scroll input and create a premium feel. Adjust lerp and duration for smooth, controlled motion.",
      fallback: "Always provide prefers-reduced-motion fallback. Avoid long scroll-triggered sequences that could cause motion sickness.",
    },
    microInteractions: {
      rule: "Subtle hover states, button effects, icons that animate on interaction. Keep under 300ms with natural easing functions.",
      examples: "A 'Get a Quote' button might emit a subtle sheen on hover — like light catching a freshly finished surface. Service cards might reveal depth on hover, suggesting layers of protection.",
    },
    pageTransitions: {
      rule: "Cross-fade, slide or content-reveal transitions maintain narrative continuity. The site should feel like a continuous journey, not discrete pages.",
      performance: "Preload assets. Limit heavy animation to hero sections. Test on low-power devices.",
    },
    narrativeMotion: {
      rule: "Use movement to emphasize transformation — reveal animations for before/after content, upward motion for premium results, smooth reveals for process steps.",
      constraint: "Motion should always support the message and never distract. If you can't articulate why an animation exists, remove it.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONTENT & STORYTELLING (NEW)
  // ═══════════════════════════════════════════════════════════════════
  contentAndStorytelling: {
    narrativeFlow: "Homepage tells a story: welcoming hero → proof of mastery (portfolio) → process explanation → social proof (testimonials) → invitation to act (CTA) → trust reinforcement (certifications, partners). Each section flows naturally.",
    toneOfVoice: "Confident but not arrogant. Technical but approachable. Passionate but precise. Cochrane Master Builders speaks like a master craftsman who loves what they do — knowledgeable, warm, direct.",
    userPersonas: {
      luxuryOwner: "Owns a $80K+ home, expects white-glove service, researches thoroughly, values reputation and results over price.",
      enthusiast: "Passionate about their home regardless of price point, wants to learn about the process, appreciates technical detail.",
      fleetManager: "Manages multiple homes, values efficiency, reliability and consistent quality. Needs clear service tiers and bulk options.",
      newClient: "First-time homeowner client, may be skeptical, needs education on value and process. Trust signals are critical.",
    },
    multimediaIntegration: "Use video walkthroughs, before/after sliders, process photography and client testimonials. All media must include alt text and captions for accessibility.",
    headingsAsInvitations: "Headings should inspire curiosity and confidence — 'See the Difference,' 'Our Process,' 'Your Home Deserves Better' — not just label sections.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PROOF HIERARCHY (rebranded for automotive)
  // ═══════════════════════════════════════════════════════════════════
  proofHierarchy: {
    purpose: "Visual proof elements ranked by trust impact for residential interior finishing",
    order: [
      "Before/after galleries — the #1 sales engine. Seeing the transformation is believing.",
      "Client testimonials mentioning trust, quality and exceeding expectations",
      "Process visualization — shows competence, reduces skepticism, educates on value",
      "Team/founder photos — humanizes Cochrane Master Builders, shows the craftspeople behind the work",
      "Manufacturer certifications and product partnerships (Gtechniq, XPEL, etc.)",
      "Behind-the-scenes craft photography — clean drywall seams, controlled site lighting, tape lines",
      "Dealership and fleet partnerships — trust by association with quality brands",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-PATTERNS (expanded to 15+, residential-construction context)
  // ═══════════════════════════════════════════════════════════════════
  antiPatterns: [
    "Gradient overuse — one gradient maximum per viewport",
    "Carousel/slider as primary content delivery (low engagement, lazy design)",
    "Text over busy automotive images without proper overlay treatment",
    "Inconsistent border radius across components",
    "Using opacity instead of proper background colors for overlays",
    "Hero sections with no clear visual hierarchy or CTA",
    "Decorative elements that don't serve the precision craftsmanship brand",
    "Generic contractor template template aesthetic — cluttered, loud, unprofessional",
    "Low-quality home photos — phone snapshots, poor lighting, cluttered backgrounds",
    "Stock imagery of homes that aren't representative of actual work",
    "Performative luxury that feels cold, impersonal or corporate",
    "Cluttered service lists with no visual hierarchy or explanation of value",
    "Inconsistent branding across pages — different fonts, colors or spacing",
    "Information overload — trying to show everything on one page",
    "Novel or experimental navigation that confuses users — prioritize clarity",
    "Autoplay video or audio without user consent",
    "Missing accessibility features — no alt text, poor contrast, no keyboard nav",
    "Tiny touch targets on mobile — buttons must be thumb-friendly",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // STEP-BY-STEP DESIGN PROCESS (from C+S, rebranded)
  // ═══════════════════════════════════════════════════════════════════
  designProcess: {
    step1_brandFoundation: {
      defineNarrative: "Craft a story that captures Cochrane Master Builders's mission and vision. Write a manifesto. Identify key themes: precision, transformation, pride of ownership, trust.",
      identityDesign: "Logo and identity must show distinctives, be simple and memorable, incorporate meaningful symbolism, use a premium palette. Create versatile variations.",
      selectPalette: "Choose 2–3 core colors based on homeowner psychology and brand personality. Deep blacks for authority, metallics for precision, accent for energy/trust.",
      chooseTypography: "Select primary typeface for headings and secondary for body. Ensure readability across devices. Balance precision with warmth.",
      developMotifs: "Identify symbols or patterns that reflect the brand narrative — soft warm sheen, wall build-up layers (primer → drywall → mud → paint), precision geometry. Create a consistent icon library for services.",
    },
    step2_informationArchitecture: {
      wireframe: "Sketch wireframes focusing on layout and user flow before adding color. Structure mirrors user priorities, not internal org.",
      contentMap: "List pages and navigation structure. Prioritize for new visitors (services, portfolio, booking) and returning clients (specific services, contact).",
      userTest: "Test wireframes with potential users for clarity and ease of navigation.",
    },
    step3_highFidelityDesign: {
      applyBrand: "Produce mockups with chosen palette, typography and imagery. Every element must feel intentional and premium.",
      prototypeMotion: "Prototype interactions and micro-animations. Include smooth scrolling, page transitions, hover states.",
      authenticImagery: "Use real finished-work photography. Plan shoots if needed — controlled lighting, clean backgrounds, detail-focused compositions.",
      iterate: "Review with stakeholders and representative users. Iterate based on feedback.",
    },
    step4_development: {
      implement: "Code responsive layouts, animations and interactive elements. Use semantic design tokens throughout.",
      smoothScroll: "Integrate Lenis for premium scroll feel. Implement reduced-motion fallback.",
      modularComponents: "Build reusable components for services, portfolio, testimonials, process steps.",
      optimize: "Compress assets, lazy load images, ensure accessibility and SEO features.",
    },
    step5_testAndLaunch: {
      crossDevice: "Test across browsers and devices. Verify page speed, accessibility and SEO.",
      softLaunch: "Invite a test group to verify navigation and provide feedback.",
      train: "Ensure content can be updated easily. Set up analytics to track user behavior.",
    },
    step6_maintain: {
      schedule: "Establish content update schedule, security patches and design refreshes.",
      analyze: "Use analytics to understand user behavior and adjust content or navigation.",
      evolve: "Plan seasonal updates, new service additions and portfolio refreshes using the design system.",
    },
  },
} as const;
