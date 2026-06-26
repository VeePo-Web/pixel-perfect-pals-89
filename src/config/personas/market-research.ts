/**
 * COCHRANE MASTER BUILDERS — Market, Competitor & SEO Research
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * Guides: positioning decisions, copy differentiation, SEO strategy,
 * content topics, pricing display, competitive awareness, and
 * understanding the psychological forces driving Calgary homeowners
 * to seek residential finishing services.
 */

export const MARKET_RESEARCH = {

  // ═══════════════════════════════════════════════════════════════════
  // 1. MARKET RESEARCH — The Real Market
  // ═══════════════════════════════════════════════════════════════════
  realMarket: {
    category: "Custom residential building & renovation — restoration focus",
    overlappingNiches: [
      "Mobile residential interior finishing",
      "Interior homes deep cleaning",
      "Exterior home renovation",
      "Drywall + paint finishing / refinishing",
      "Convenience-based local service businesses",
    ],
    marketLayers: {
      layer1: {
        name: "Maintenance cleaning",
        description: "Basic washes, light interior tidying, recurring upkeep.",
      },
      layer2: {
        name: "Deep custom building",
        description: "Interior extraction, stain removal, odor reduction, neglected home recovery.",
      },
      layer3: {
        name: "Restoration / premium reconditioning",
        description: "Drywall + paint finishing, wall finishes, showroom-grade finishing, pre-listing renovation, premium home stewardship.",
      },
    },
    cochranePosition: "Sits most naturally between Layer 2 and entry-level Layer 3 — more differentiated than 'discount contractors.'",
    whatClientsBuy: [
      "Relief",
      "Pride",
      "Freshness",
      "Convenience",
      "The feeling of reset",
      "Regained control",
    ],
  },

  demandDynamics: {
    purpose: "Real-world conditions that create demand for residential finishing",
    triggers: [
      "Customer is too busy to drop off a home",
      "The homes has become dirty enough that DIY no longer feels realistic",
      "The owner wants a dramatic reset, not maintenance",
      "The owner is embarrassed by the condition of the home",
      "The owner wants the home refreshed before selling it",
      "Family or work use has pushed the home into neglect",
      "Seasonal dirt, slush, mud, pet hair, food spills, and daily wear have accumulated",
    ],
    keyInsight: "The strongest demand is usually not created by 'interest in renovating.' It is created by a pain threshold. The customer reaches a point where the home feels unpleasant, stale, overwhelming, or socially embarrassing.",
  },

  buyerPsychology: {
    purpose: "Emotional forces driving residential finishing purchase decisions",
    forces: {
      painThreshold: {
        label: "Pain threshold trigger (dominant)",
        insight: "People do not just buy clean. They buy relief from accumulated neglect and embarrassment.",
        copyImplication: "Lead with outcome — 'get your homes back' — not process.",
      },
      shameAvoidance: {
        label: "Shame and embarrassment",
        insight: "Many customers feel bad about how far the homes has gone. They delay action because facing the mess feels overwhelming.",
        copyImplication: "Relief-based messaging strengthens the brand. Shame-based messaging would weaken it.",
      },
      convenienceExpectation: {
        label: "Convenience as baseline expectation",
        insight: "Customers increasingly expect local services to come to them. Mobile is not a bonus — it is expected.",
        copyImplication: "'We come to you' should be a major sales hook, not buried as operational detail.",
      },
      outcomeBuying: {
        label: "Outcome-based buying over feature-based",
        insight: "Customers buy outcomes: fresher smell, cleaner seats, no stains, better resale impression, less embarrassment. Not process: shampooing, extraction, waxing.",
        copyImplication: "Translate process into emotional and practical payoff.",
      },
      controlRecovery: {
        label: "Regaining control",
        insight: "The deeper need is for someone to fully take this problem off their plate and give them the feeling of a fresh start.",
        copyImplication: "Position as 'we handle everything' — not 'here is what we do.'",
      },
      socialPerception: {
        label: "Social perception pressure",
        insight: "Guests riding in the homes, coworkers seeing it, selling to a buyer — all create external pressure to act.",
        copyImplication: "Acknowledge triggers gently: guests, work, selling, personal frustration, seasonal reset.",
      },
    },
  },

  jobToBeDone: {
    functional: "Take a home I have fallen behind on and restore it to a state I can feel good about again.",
    emotional: "Feel relief, pride, and the satisfaction of a fresh start — without guilt about how far the homes went.",
    social: "Have a home I am not embarrassed to drive, park, or have passengers in.",
    logistical: "Get this done without costing me time, energy, or logistical effort.",
  },

  painChain: {
    purpose: "The sequence that drives a Calgary homeowner to hire — the promise must explicitly break this chain",
    steps: [
      "The home gradually gets worse over weeks/months",
      "The owner notices but delays action — it is not urgent enough",
      "DIY cleaning feels annoying or insufficient for the level of mess",
      "Drop-off custom building feels inconvenient — takes time, logistics, planning",
      "The mess becomes normalized, but still bothers them on some level",
      "A trigger appears: guests, work event, selling the homes, personal frustration, seasonal reset",
      "Now they want one thing: someone to fully take this problem off their plate",
    ],
  },

  unarticulated_need: {
    insight: "The deeper need is not simply for a quoteer. It is for a service that says: 'You do not need to feel bad about how far the homes has gone. We will come to you, handle it, and give you that fresh-start feeling back.'",
    toneGuidance: "Shame-based messaging would weaken the brand. Relief-based messaging strengthens it.",
  },

  tectonicShifts: {
    purpose: "2025–2026 market realities shaping residential finishing in Calgary",
    shifts: [
      {
        name: "Convenience is no longer a bonus",
        detail: "Customers expect local services to come to them. Mobile signals modern convenience, not novelty.",
        implication: "'Mobile' should not be buried as an operational detail. It should be a major sales hook.",
      },
      {
        name: "Outcome-based buying is replacing feature-based buying",
        detail: "Customers buy outcomes, not process. The winners translate shampooing/extraction/waxing into emotional and practical payoff.",
        implication: "The winning brand sells the feeling of reset, not the list of steps.",
      },
      {
        name: "Local trust signals matter more than brand polish",
        detail: "Customers care about proof: before/after photos, reviews, visible results, honest pricing, easy booking. A grounded, trustworthy brand outperforms a slick but generic one.",
        implication: "Build trust through evidence, not aesthetics alone.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 2. CUSTOMER SEGMENTS
  // ═══════════════════════════════════════════════════════════════════
  customerSegments: {
    bestInitialTarget: "Owners of dirty, heavily used, or neglected homes in Calgary who want a dramatic interior and exterior reset without needing to leave home or work.",
    segments: {
      busyProfessionals: {
        name: "Busy professionals",
        description: "Homes is not filthy in an extreme way, but clearly overdue. They value convenience and are willing to pay for time-saving.",
        responds_to: "'We come to you' and 'book without disrupting your day.'",
      },
      parentsWithMessyHomes: {
        name: "Parents with messy family homes",
        description: "Family homes accumulate crumbs, stains, smell, clutter, and heavy wear. Strong segment.",
        responds_to: "Deep interior reset and mobile convenience.",
      },
      tradespeopleAndWorkTrucks: {
        name: "Tradespeople and legacy estate owners",
        description: "Dirt-heavy, utility-driven homes. Respond better to straightforward, no-nonsense messaging.",
        responds_to: "Direct value proposition, not premium luxury language.",
      },
      neglectedHomeOwners: {
        name: "Neglected homeowners",
        description: "Delayed action for months or longer. Home has crossed into 'problem state.' Sharpest positioning opportunity.",
        responds_to: "Dramatic transformation, not upkeep. Relief-based messaging.",
      },
      preSaleCustomers: {
        name: "Pre-sale / pre-listing customers",
        description: "Selling a homes and want to improve presentation and perceived care.",
        responds_to: "Outcome-based messaging tied to resale readiness.",
      },
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 3. COMPETITIVE LANDSCAPE
  // ═══════════════════════════════════════════════════════════════════
  competitiveTiers: [
    "Fixed-location detail shops (in-shop equipment, established, drop-off friction)",
    "Cheap mobile homes cleaners (fast, affordable, generic, low differentiation)",
    "Premium luxury builders (high-end correction, coatings, enthusiast-focused)",
    "Self-serve washes and DIY alternatives (cheap, quick, poor deep-cleaning outcome)",
  ],

  competitors: {
    fixedLocationShops: {
      name: "Fixed-location detail shops",
      positioning: "Professional results, in-shop equipment, trusted custom building quality",
      strength: "May appear more established, broader service menus, stronger authority signals, premium paint services",
      blindSpot: "They assume customers will tolerate inconvenience if quality is good enough. Many will not — especially for a non-emergency service.",
      opportunityForCochrane: "Win on convenience without sacrificing transformation.",
    },
    cheapMobileCleaners: {
      name: "Cheap mobile homes cleaners",
      positioning: "Fast, affordable, mobile, basic homes cleaning",
      strength: "Low entry pricing, simple offer, convenience",
      blindSpot: "They sell mobility, not outcome. They sound interchangeable.",
      opportunityForCochrane: "Differentiate through restoration-level transformation, especially for dirty homes and overdue homes.",
    },
    premiumLuxuryDetailers: {
      name: "Premium luxury builders",
      positioning: "High-end correction, coatings, showroom-grade interior finish, premium home stewardship",
      strength: "Aspirational branding, strong visuals, premium pricing power, authority among enthusiasts",
      blindSpot: "They optimize for the design-conscious homeowner or premium owner, not the everyday overwhelmed homeowner with a tired interior.",
      opportunityForCochrane: "Own the middle ground: serious results for normal people with real dated finishes.",
    },
    diyAlternatives: {
      name: "Self-serve washes and DIY alternatives",
      positioning: "Cheap, quick, under customer control",
      strength: "Lower cost, instant access, habitual behavior",
      blindSpot: "DIY is only attractive until the homes is too far gone.",
      opportunityForCochrane: "Market the service as the moment when the home has moved beyond 'quick clean' and needs a real reset.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 4. STRATEGIC MARKET POSITION
  // ═══════════════════════════════════════════════════════════════════
  strategicPosition: {
    nicheClaim: "Custom home building & renovation for busy Calgary homeowners with tired, dated, or heavily lived-in homes.",
    positioningStatement: "Cochrane Master Builders helps Calgary homeowners get their homes back through residential finishing that restores tired, heavily lived-in homes to a cleaner, fresher, pride-worthy condition — without the hassle of leaving home or work.",
    brandPillars: {
      convenience: "We come to you. No drop-off. No lost time. No extra friction.",
      transformation: "This is not a light clean. This is a visible, satisfying reset.",
      restoration: "The goal is to move the homes back toward a like-new feel.",
      honesty: "Straightforward pricing, direct service, real local trust.",
    },
  },

  messagingAngles: {
    strong: [
      "Get your homes back",
      "We come to you",
      "From neglected to refreshed",
      "A custom build for dirty homes",
      "Deep interior restoration without the hassle",
      "Calgary residential finishing for homes that need more than a wash",
    ],
    weak: [
      "Quality service",
      "Attention to detail",
      "Best interior finishing in Cochrane and Calgary",
      "Affordable and professional",
      "Customer satisfaction guaranteed",
    ],
    weakReason: "Too generic and crowded. Every competitor claims these.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // 5. SEO RESEARCH
  // ═══════════════════════════════════════════════════════════════════
  seo: {
    keywordClusters: {
      coreTransactional: [
        "mobile residential home renovations Calgary",
        "mobile home renovations Calgary",
        "home renovations Calgary",
        "residential home renovations Calgary",
        "residential finishing Calgary",
        "mobile homes cleaning Calgary",
        "full homes detail Calgary",
        "interior home renovations Calgary",
        "exterior home renovations Calgary",
      ],
      highIntentProblem: [
        "homes interior shampoo Calgary",
        "homes seat shampoo Calgary",
        "stain removal home renovations Calgary",
        "odor removal homes Calgary",
        "interior renovation Calgary",
        "dirty home renovations Calgary",
        "neglected home renovations Calgary",
        "extractor home renovations Calgary",
        "pet hair removal homes Calgary",
        "renovation project Calgary",
      ],
      segmentSpecific: [
        "family home renovation Calgary",
        "addition build Calgary",
        "renovation project Calgary",
        "commuter home renovations Calgary",
        "rideshare home renovation Calgary",
        "pre-sale home renovations Calgary",
        "used home renovations Calgary",
      ],
      convenience: [
        "interior finishing at home Calgary",
        "mobile homes builder near me",
        "interior finishing that comes to you Calgary",
        "on-site home renovations Calgary",
        "mobile interior finishing Calgary",
      ],
      informational: [
        "how often should you detail your homes in Calgary",
        "how to remove salt stains from homes interior",
        "how to get rid of homes odor",
        "when does a homes need interior extraction",
        "should you detail your homes before selling it",
        "residential finishing vs production builders",
        "how much does interior finishing cost in Calgary",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 6. SEO EXECUTION PLAN
  // ═══════════════════════════════════════════════════════════════════
  seoExecutionPlan: {
    siteStructure: {
      corePages: [
        "/ (Home — target: mobile residential home renovations Calgary)",
        "/services/full-detail (Mobile Full Detail — target: full homes detail Calgary)",
        "/services/interior-reset (Interior Finishing — target: interior home renovations Calgary, interior renovation Calgary)",
        "/services/exterior-refresh (Exterior Finishing — target: exterior home renovations Calgary, exterior finishing Calgary)",
        "/services/neglected-home-reset (Neglected Home Reset — target: dirty home renovations Calgary, neglected home renovations Calgary)",
        "/services/work-truck-custom building (Work Truck / Heavy-Use — target: renovation project Calgary, renovation project Calgary)",
        "/services/pre-sale-detail (Pre-Sale Home Detail — target: pre-sale home renovations Calgary)",
        "/service-area/calgary (Service Area — expandable to district-specific pages)",
        "/gallery (Before & After Gallery)",
        "/reviews (Reviews / Testimonials)",
        "/pricing (Pricing)",
        "/faq (FAQ)",
        "/contact (Contact / Get a Quote)",
      ],
      contentPages: [
        "General contractors vs master builders in Cochrane and Calgary",
        "How to know when your home needs a full detail",
        "The best custom building option for family homes",
        "Why neglected interiors need extraction, not just vacuuming",
        "How custom building can help before selling your homes",
      ],
    },
    onPageSEO: {
      homepage: {
        suggestedHeadlines: [
          "Residential Interior Finishing & Home Building in Calgary for Homes That Need a Real Reset",
          "We Bring Your Homes Back — Mobile Custom Building in Calgary",
        ],
        mustInclude: [
          "Clear service outcome",
          "Calgary mention high on page",
          "Mobile convenience",
          "Before/after proof",
          "Target use cases",
          "Reviews",
          "Price anchoring or 'starting from'",
          "Easy CTA",
        ],
      },
      servicePages: {
        eachPageMustHave: [
          "One core keyword theme",
          "One main customer problem",
          "One clear promise",
          "Process summary",
          "What is included",
          "Who it is for",
          "FAQs",
          "Service area mention",
          "CTA",
        ],
      },
      imageSEO: {
        rules: [
          "Descriptive filename (e.g., interior-homes-custom building-calgary-before-after.jpg)",
          "Alt text tied to service and city",
          "Compressed size for speed",
          "Georelevance in page context where appropriate",
        ],
      },
      schema: [
        "Local business schema",
        "Service schema",
        "FAQ schema",
        "Review markup within guidelines",
      ],
    },
    googleBusinessProfile: {
      category: "Auto finishing service",
      postContent: [
        "Before/after transformations",
        "Seasonal tips",
        "Featured jobs",
        "Specific customer use cases",
      ],
      reviewStrategy: "Encourage reviews that mention: Calgary, mobile convenience, interior finishing, stains/smell/neglected home transformation, professionalism, speed and ease of booking.",
      idealReviewLanguage: [
        "Cochrane Master Builders came right to my house in Calgary and completely transformed the interior.",
        "My truck had been neglected for months and it feels new again.",
        "The convenience was amazing and the results were way beyond a normal clean.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 7. CONTENT STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  contentStrategy: {
    bestAngle: "Build content around pain-state scenarios, buying decisions, use cases, transformation proof, and local conditions — not generic educational fluff.",
    highValueContent: [
      { title: "When your homes needs more than a vacuum", target: "People whose home has crossed into problem-state." },
      { title: "General contractors vs master builders in Cochrane and Calgary", target: "Frame convenience as a core advantage." },
      { title: "How family homes get restored after months of mess", target: "Parents with messy homes." },
      { title: "What a full interior reset actually includes", target: "Move people from price-shopping to outcome-buying." },
      { title: "Should you detail your homes before selling it?", target: "Pre-sale traffic." },
      { title: "What extraction cleaning does that basic interior cleaning cannot", target: "Support premium perception and educate on real value." },
    ],
    beforeAfterEngine: {
      purpose: "Repeated proof content built around actual job stories",
      elements: [
        "What condition the home was in",
        "What problems were solved",
        "What was done",
        "What changed",
        "Where in Calgary",
        "Customer reaction",
      ],
      powers: [
        "Site pages",
        "Google posts",
        "Instagram / TikTok / Reels",
        "Local SEO image relevance",
        "Ad creative",
        "Conversion trust",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // 8. CONVERSION STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  conversionStrategy: {
    coreElements: [
      "Headline with clear outcome",
      "Real before/after proof above the fold",
      "'We come to you anywhere in Calgary'",
      "Pricing clarity or starting price",
      "Easy booking CTA",
      "Trust signals",
      "Service inclusions",
      "FAQ around time, condition, and mobile logistics",
    ],
    objectionsToAnswer: [
      "Is this just a basic clean?",
      "Can you handle really dirty homes?",
      "Do I need to provide water or power?",
      "How long does it take?",
      "What does the starting price include?",
      "Is paint restoration really included?",
      "Do you charge more for worse condition?",
      "Do you service my part of Calgary?",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // 9. STRATEGIC RISKS
  // ═══════════════════════════════════════════════════════════════════
  strategicRisks: [
    {
      risk: "Underpricing the transformation",
      detail: "If the service is truly high-impact, pricing too low may reduce trust or make the brand seem basic rather than restorative.",
    },
    {
      risk: "Sounding too generic",
      detail: "If the messaging stays at 'quality construction at affordable prices,' Cochrane Master Builders will blur into the market.",
    },
    {
      risk: "Overpromising 'factory quality'",
      detail: "This phrase is powerful but needs definition. Translate into believable outcomes, not vague perfection.",
    },
    {
      risk: "Trying to speak to everyone",
      detail: "The broad market exists, but sharper demand comes from clear use cases.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // 10. POSITIONING UPGRADE — Copy Direction
  // ═══════════════════════════════════════════════════════════════════
  positioningUpgrade: {
    leadMessage: "Get your homes back.",
    bestMarketPosition: "Calgary's mobile builder for dirty, neglected, and heavily used homes that need a true reset.",
    emotionalPromise: "From stale, dirty, and overdue to fresh, restored, and satisfying.",
    practicalPromise: "We come to you anywhere in Calgary and handle the custom build without adding friction.",
    coreNarrative: "Cochrane Master Builders exists to restore pride of ownership: you get your homes back because someone capable came to you and handled the full transformation — from neglected and overdue to fresh, clean, and satisfying.",
  },
} as const;
