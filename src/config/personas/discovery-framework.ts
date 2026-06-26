/**
 * COCHRANE MASTER BUILDERS — Website Discovery Framework
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * It encodes the depth of thinking behind every website decision —
 * from positioning and customer psychology to conversion architecture.
 * 
 * Adapted for Cochrane Master Builders — residential interior finishing, Calgary, AB.
 * All decision criteria are specific to transformation-proof-driven
 * residential finishing and no-judgment service positioning.
 * 
 * HOW TO USE:
 * - When making UI/UX decisions, reference the relevant section
 * - Each section maps to a functional area of the website
 * - The "decisionCriteria" in each section guide implementation choices
 */

export const DISCOVERY_FRAMEWORK = {

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1: IDENTITY, POSITIONING, AND THE NAMED PROMISE
  // Guides: Homepage hero, taglines, meta descriptions, about page
  // ═══════════════════════════════════════════════════════════════════
  identity: {
    purpose: "Define what Cochrane Master Builders communicates in every pixel",
    decisionCriteria: {
      brandName: "Cochrane Master Builders (short: Cochrane Master Builders)",
      positioningLine: "Mobile home restoration for Calgary homeowners whose homes need a real reset. Deep extraction. Paint restoration. We come to you.",
      namedPromise: "Cochrane Master Builders exists to give you your home built right — this drives every CTA",
      theFullReset: "The Custom Build is the flagship service name and the brand's primary conversion anchor. It signals depth, completeness, and transformation — not just cleaning.",
      noJudgment: "Every condition is welcome. The worse the starting state, the more dramatic the result. The brand never shames neglect — it meets it with capability and relief.",
      coreValues: "Grounded, hardworking, honest, satisfying, confident, no-nonsense, warm but direct",
      differentiators: "Full mobile convenience (travel included), deep restoration (not surface cleaning), no-judgment service, transparent pricing, before/after proof engine, solo-founder accountability",
    },
    voiceGuidance: {
      purpose: "Voice defines how every word on the site sounds",
      toneOptions: [
        "Direct and capable — no fluff, no buzzwords",
        "Warm but grounded — approachable without being casual",
        "Proof-first — let results speak before making claims",
        "Relief-oriented — meet the customer's pain with a solution, not a sales pitch",
      ],
      boundaries: "Never condescending, never luxury-coded, never shaming, never aggressive, never corporate, never 'bro culture' automotive tone",
      reinforcementWords: ["reset", "restore", "satisfaction", "results", "real", "deep", "mobile", "Calgary", "factory-fresh", "your home built right"],
      prohibitedWords: ["bespoke", "artisan", "curated experience", "premium package", "luxury treatment", "world-class", "cutting-edge", "synergy", "leverage", "state-of-the-art"],
    },
    brandPersona: {
      purpose: "If Cochrane Master Builders were a person at your door, how would they show up?",
      behavioralCues: "On time, prepared, professional equipment, friendly but focused, shows you the results, doesn't oversell, lets the work speak. Like a competent tradesperson who takes pride in the craft.",
      manifesto: "Every home deserves a real reset. Not a wipe-down, not a rinse, not a shortcut. A deep, honest restoration that makes you feel like you got a new home. We show up at your door with the tools, the skill, and the standards to make it happen. No judgment about how it got this way. Just results.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2: IDEAL CUSTOMER PROFILE ("DIRTY DANIEL")
  // Guides: Copy tone, imagery selection, objection handling, CTA language
  // ═══════════════════════════════════════════════════════════════════
  idealClient: {
    purpose: "Every design and copy decision should attract Dirty Daniel and filter out misfits",
    archetype: "Dirty Daniel — a busy Calgary homeowner whose home has crossed into problem-state. Not a home enthusiast, not a slob — just someone whose life got ahead of home maintenance. Values results, convenience, and honesty.",
    decisionCriteria: {
      clientDescription: "Working professional, parent, or tradesperson aged 25-55 in Calgary. Their home has accumulated months of neglect — stains, crumbs, smell, film. They've been meaning to deal with it and keep not doing it.",
      clientContext: "Full life — work, kids, obligations. Home maintenance consistently falls to the bottom of the list. They notice the mess daily but the effort to fix it (drop-off, DIY Saturday, finding a good place) feels like more friction than the discomfort of living with it.",
      fears: "It's too dirty to fix, the price will change once they see it, mobile means lower quality, they'll be judged for how bad it is, they're overpaying for something they 'should' do themselves.",
      desires: "A home that feels new again. The satisfaction of a real reset. Zero effort on their part. Fair pricing with no surprises. Someone who just handles it without making it weird.",
      pressures: [
        "Social embarrassment — avoiding giving rides",
        "Daily discomfort — the mess is a low-grade stressor every commute",
        "Inertia trap — 'I'll do it this weekend' that never happens",
        "Price uncertainty — not knowing what 'custom home building' actually costs",
        "Quality uncertainty — not knowing if mobile is as good as a shop",
        "Trust uncertainty — letting a stranger at your home/location",
      ],
    },
    firstImpressions: {
      fiveSeconds: "Real before/after of a genuinely dirty home restored. Price visible. 'We come to you' confirmed. Gut reaction: 'They can actually fix mine.'",
      thirtySeconds: "Multiple transformations, Google review quotes, pricing clarity, Calgary-specific signals. Gut reaction: 'This is legit, this is local, this is what I need.'",
      byBooking: "Relief, confidence, ease. 'I just need to text them my address and they'll handle it. No judgment. Fair price. Real results.'",
    },
    objections: {
      purpose: "Address these gently throughout the site — not on a single FAQ page",
      common: [
        "My home might be too dirty → 'The worse the condition, the more satisfying the reset. That's where we do our best work.'",
        "~$100 seems too cheap/expensive → 'Full resets from ~$100 — travel included, no hidden fees. The before/after speaks for itself.'",
        "Can mobile do as good a job? → 'Same professional-grade equipment. Hundreds of Calgary homes restored. See the results.'",
        "I should just do it myself → 'You could. But embedded stains, smell, and deep grime need extraction — not just elbow grease.'",
      ],
    },
    misfitProfile: {
      purpose: "Messaging should gently filter these out without being exclusionary",
      signals: "Looking for cheapest possible option regardless of result, wants competition-grade show prep, expects luxury lounge experience, wants to specify products/methods, needs permanent coatings/PPF",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3: SERVICE OFFERING — "THE FULL RESET"
  // Guides: Services page structure, pricing display, proof architecture
  // ═══════════════════════════════════════════════════════════════════
  services: {
    purpose: "Eliminate confusion, create confidence, set expectations, justify value",
    coreServices: ["The Custom Build — comprehensive residential interior finishing"],
    decisionCriteria: {
      serviceClarity: "One flagship offer understood in 10 seconds — what it includes, what the result looks like, what it costs, and how it happens",
      singleOfferAdvantage: "No decision fatigue. No tier confusion. One transformative service, priced by home size and condition. Simplicity IS the conversion advantage.",
      processVisibility: "3-step process: Book → We Come → Reset. Transparent, fast, zero-friction.",
      pricingStrategy: "Public starting price (~$100) with clear factors (home size, condition severity). Travel always included. No hidden fees language prominent.",
    },
    theFullReset: {
      tenSecondPitch: "Complete residential interior finishing — deep interior extraction, full exterior wash and paint decontamination, interior dressing, windows, tires. Your home back to factory-feel, at your door.",
      includes: [
        "Deep interior extraction — seats, carpets, mats, crevices",
        "Full exterior wash and paint decontamination",
        "Interior wipe-down and surface dressing",
        "Window clarity — interior and exterior",
        "Tire and trim restoration",
        "Mobile delivery — we come to your location",
        "Gas and travel — always included in the price",
      ],
      doesNotInclude: [
        "Drywall finishing or long-life topcoat",
        "Engine bay custom home building (available on request)",
        "Permanent scratch repair or bodywork",
        "Competition-grade show preparation",
      ],
      pricingFactors: [
        "Home size — townhome, addition, truck, van",
        "Interior condition severity — light maintenance vs deep problem-state",
        "Add-on requests — engine bay, pet hair specialization",
      ],
    },
    experienceDesign: {
      purpose: "The booking and service experience itself is a trust signal",
      bookingFlow: "Text, call, or short online form → Cochrane Master Builders confirms time and price → shows up → does the work → customer gets their home back",
      communicationStyle: "Text-first, fast response, friendly and direct. No corporate scripts.",
      dayOfExperience: "Cochrane Master Builders arrives on time, assesses the home, does the work, shows the customer the result. No surprise upsells. The transformation IS the selling point for repeat business and referrals.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4: CUSTOMER PSYCHOLOGY & EMOTIONAL ARCHITECTURE
  // Guides: Micro-interactions, page transitions, content pacing, UX flow
  // ═══════════════════════════════════════════════════════════════════
  customerPsychology: {
    purpose: "The website must mirror the emotional arc: overwhelm → relief → desire → action",
    emotionalArc: {
      stage1Recognition: "The visitor arrives in a state of frustration or embarrassment about their home. The hero must immediately signal: 'We understand. We've seen worse. We can fix it.'",
      stage2Proof: "Before/after evidence creates desire. The transformation proof converts skepticism into 'I want that for my home.' This is where the sale happens emotionally.",
      stage3Confidence: "Pricing transparency, process clarity, and founder presence remove remaining barriers. The visitor shifts from 'I want this' to 'I can do this.'",
      stage4Action: "Low-friction booking. Text, call, or short form. No lengthy questionnaires. No 'schedule a consultation.' Just: tell us where you are and what you need.",
    },
    keyEmotionalTriggers: {
      satisfaction: "Before/after reveals — the most satisfying content on the site. The moment of transformation.",
      relief: "'No judgment' messaging — explicit permission to have a messy home. Removes the social barrier.",
      convenience: "'We come to you' — removes the logistics barrier. Travel included removes the cost-surprise barrier.",
      trust: "Real name, real face, real reviews, real results. Founder-led accountability.",
    },
    antiPatterns: [
      "Never shame the customer's current home condition",
      "Never use 'luxury' or 'premium' to describe the experience — it creates the wrong expectation",
      "Never hide pricing — the competitor who hides pricing loses the customer to the one who doesn't",
      "Never require more than 3 clicks to book",
      "Never use stock photography — it destroys the proof-driven trust engine",
      "Never use construction jargon without translating to outcome",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5: BRAND STORY AND TRUST SIGNALS
  // Guides: About page, founder section, credibility architecture
  // ═══════════════════════════════════════════════════════════════════
  brandStory: {
    purpose: "Trust is built through proof, not claims",
    decisionCriteria: {
      founderStory: "Cochrane Master Builders — a Calgary-based founder who takes personal pride in the craft of home restoration. Not corporate-trained, not franchise-backed. Hands-on, standards-driven, accountable.",
      personality: "Hardworking, friendly, direct, no-nonsense. Takes pride in the transformation. Lets the work speak.",
      onlinePresence: "Warmth through messaging, authority through before/after volume, trust through transparency.",
      assumptions: "Never assume the customer knows what 'custom home building' means. Never assume they've done this before. Never assume they're comparing us to other builders — they might be comparing us to doing it themselves.",
    },
    credibility: {
      existingSignals: [
        "Before/after photography — volume and severity of transformations",
        "Google reviews — real customer outcomes",
        "Founder name and face — personal accountability",
        "Transparent pricing — builds trust before first contact",
        "Calgary-specific proof — local homes, local driveways, local neighborhoods",
      ],
      provableClaims: [
        "We come to you — anywhere in Calgary, travel included",
        "Deep extraction — not just surface cleaning",
        "Full resets from ~$100 — no hidden fees",
        "Real before/after results from Calgary homes",
        "Every condition is welcome — no judgment",
        "Founder-operated — the person you book is the person who shows up",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6: PROOF SYSTEM / PORTFOLIO
  // Guides: Before/after gallery, transformation showcases, proof hierarchy
  // ═══════════════════════════════════════════════════════════════════
  proofSystem: {
    purpose: "The proof system is the website's most important sales engine — before/after transformations drive desire and convert skeptics",
    decisionCriteria: {
      curationRule: "Feature the most dramatic transformations — homes in genuinely bad condition restored to factory-feel. The worse the before, the stronger the proof.",
      tenSecondProof: "A single before/after pair should make someone with a dirty home think 'they can fix mine.'",
      organization: "Filterable gallery: by home type (townhome, addition, truck, van), by condition (heavy, moderate), by service (interior focus, custom build, exterior focus)",
      signatureInteraction: "Before/after slider — the defining UX element. Drag to reveal the transformation. Zero latency. Annotated callouts for key restoration points.",
    },
    imageStrategy: {
      editingStyle: "Clean, honest, natural light. Consistent framing between before and after. No filters, no glamour — the transformation speaks for itself.",
      requiredShots: [
        "Wide interior before/after — dashboard, seats, console visible",
        "Close-up extraction results — what came out of the carpets/seats",
        "Exterior before/after — same angle, same lighting",
        "Detail close-ups — leather grain restored, carpet fibers lifted, paint clarity",
        "Environmental context — the home in a Calgary driveway or residential setting",
      ],
      creditFormat: "Home make/model + condition description + Calgary neighborhood when possible",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7: WEBSITE STRATEGY AND CONVERSION ARCHITECTURE
  // Guides: Page structure, navigation, CTA placement, conversion flow
  // ═══════════════════════════════════════════════════════════════════
  websiteStrategy: {
    purpose: "Turn visitors into bookings with minimal friction",
    decisionCriteria: {
      primaryAction: "Book a reset — via text, call, or short online form",
      secondaryActions: [
        "View before/after transformations",
        "Check pricing",
        "Understand what's included",
        "Read reviews",
        "Learn about Cochrane Master Builders",
        "Browse FAQ for objection answers",
      ],
      conversionPath: "See proof → feel desire → confirm price/convenience → book. 3 clicks maximum from any page to booking.",
    },
    navigation: {
      pages: ["Home", "Services", "Results", "About", "FAQ", "Book"],
      criticalPath: "If someone reads only 2 pages before booking: Home (proof + pricing + convenience) → Book. The homepage must contain the complete conversion argument.",
    },
    homepage: {
      aboveTheFold: "Before/after hero or transformation visual + 'Build it like it is ours' headline + trust line (mobile, Calgary, from ~$100, no judgment) + dual CTA",
      storyArc: "Hero → Immediate proof (before/after slider) → Service overview (The Custom Build) → How it works (3 steps) → Pricing snapshot → Founder section → Testimonials → FAQ preview → Final CTA",
      trustSignals: "Before/after count, Google review rating, 'travel included' badge, Calgary-specific language",
    },
    servicesPage: {
      purpose: "Eliminate confusion, set expectations, justify value",
      structure: "Problem-state framing → The Custom Build overview → What's included → What affects price → How to book",
    },
    resultsPage: {
      purpose: "Proof engine — the most important sales page after homepage",
      structure: "Gallery of before/after transformations with home type, condition, and neighborhood tags. Interactive sliders. Annotation callouts.",
    },
    faqPage: {
      purpose: "Handle objections, reduce booking friction, build trust",
      headerReassurance: "'Your home isn't too dirty.' — set the tone before the first question",
      topQuestions: [
        "How much does it cost?",
        "Do you come to me?",
        "Is my home too dirty?",
        "How long does it take?",
        "What's included in The Custom Build?",
        "What do you NOT do?",
        "How do I book?",
        "What if it rains?",
      ],
    },
    bookingPage: {
      purpose: "Minimal friction, maximum clarity",
      fields: ["Location/address", "Home type (townhome, addition, truck, van)", "Condition description or photo upload", "Preferred date/time", "Name", "Phone (primary) or email"],
      alternatives: "Text [number] or call [number] — prominently displayed as equal booking paths",
      emotionalTone: "Relief + action: 'Tell us what you're working with. We'll handle the rest.'",
    },
    ctaLanguage: {
      primary: "Book Your Reset",
      secondary: "See Transformations",
      tertiary: "Text Us",
      supportingLine: "From ~$100 · Travel included · No judgment",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8: SEO AND CONTENT STRATEGY
  // Guides: Meta tags, page titles, content hierarchy
  // ═══════════════════════════════════════════════════════════════════
  seo: {
    purpose: "Rank for Calgary residential finishing queries and build local authority",
    decisionCriteria: {
      primaryKeywords: [
        "interior finishing Calgary",
        "mobile interior finishing Calgary",
        "interior home cleaning Calgary",
        "mobile residential interior finishing Calgary",
        "interior finishing near me",
      ],
      localSignals: "Calgary neighborhoods mentioned naturally in copy, before/after captions, and service area descriptions. Google Business Profile as the local SEO foundation.",
    },
    blog: {
      launchStrategy: "No blog at launch — focus on core pages. Phase 2: add transformation stories, seasonal custom home building tips, Calgary-specific content.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 9: DESIGN DIRECTION
  // Guides: Every visual decision — references design-plan.ts for pixel specs
  // ═══════════════════════════════════════════════════════════════════
  designDirection: {
    purpose: "Visual execution must match brand promise — industrial premium, proof-driven, grounded confidence",
    decisionCriteria: {
      firstFiveSeconds: "Real transformation proof. Pricing visible. 'We come to you' confirmed. Feels capable, honest, and local — not luxury, not cheap.",
      visualNonNegotiables: [
        "Before/after photography as the primary visual element",
        "Dark hero with light content sections — alternating rhythm",
        "Asphalt Black / Stone Gray / Warm Porcelain / Burnished Copper palette",
        "Industrial premium sans-serif typography — Space Grotesk + Jost",
        "Editorial whitespace — curated, not cluttered",
        "Real photography exclusively — no stock",
      ],
      visualAvoid: [
        "Luxury coding — gold, marble, script fonts, 'bespoke'",
        "Master Builders clichés — spinning homes, water droplets, checkered flags",
        "Corporate sterility — stock photos, generic layouts, template feel",
        "Masculine aggression — racing stripes, bold reds, aggressive angles",
        "Visual clutter — too many elements competing for attention",
      ],
    },
    balance: {
      modernVsTimeless: 3,
      warmthVsMinimalism: 3,
      typographyDirection: "Industrial premium sans-serif-led",
      motionLevel: 3,
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 10: CONTENT AND ASSETS
  // ═══════════════════════════════════════════════════════════════════
  content: {
    purpose: "Know what exists, what's needed, and what's urgent",
    existingSources: ["Instagram before/after photos", "Google reviews", "Stamped business cards", "Founder knowledge"],
    copyStatus: "Writing from scratch — guided by strategic narrative, brand identity, and discovery framework",
    urgentPages: ["Home (complete conversion argument)", "Book (minimal friction)", "Results (proof gallery)"],
    launchMustHaves: ["Homepage with before/after proof", "Booking mechanism (form + text/call)", "Pricing transparency", "FAQ with top objections", "Google Business Profile optimization"],
    phaseTwo: ["Transformation case studies with full stories", "Seasonal content", "Service area expansion pages if needed", "Video walkthroughs of restoration process"],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 11: TECHNICAL AND INTEGRATIONS
  // ═══════════════════════════════════════════════════════════════════
  technical: {
    domain: "cochranemasterbuilders.com (or similar — TBD)",
    communication: {
      primary: "Text messaging — fastest, most natural for the customer",
      secondary: "Phone calls",
      tertiary: "Online booking form",
    },
    analytics: ["Google Analytics 4", "Google Search Console", "Google Business Profile insights"],
    integrations: ["Google Business Profile", "Instagram feed (before/after)", "Google Reviews widget or testimonial display"],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 12: LAUNCH AND SUCCESS METRICS
  // ═══════════════════════════════════════════════════════════════════
  launch: {
    success: {
      thirtyDays: "Booking inquiries coming through the website. Google Business Profile driving traffic. Before/after gallery generating interest.",
      sixMonths: "Ranking page 1 for 'mobile interior finishing Calgary.' Consistent weekly bookings from organic search. Referral traffic from Google reviews.",
      kpis: [
        "Booking inquiries (text, call, form submissions)",
        "Google Business Profile views and actions",
        "Organic search traffic for Calgary custom home building queries",
        "Before/after gallery engagement (time on page, slider interactions)",
        "Google review volume and rating",
        "Conversion rate: visitor → booking",
      ],
    },
    oneTruth: "If the website could only communicate ONE truth: 'We show up at your door and give you your home built right. See the proof.'",
  },
} as const;
