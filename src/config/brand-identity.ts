/**
 * COCHRANE DRYWALL & INSULATION — Brand Identity (canonical)
 *
 * SOURCE OF TRUTH — distilled from `1.5_Cochrane_Drywall_Insulation_--_brand_identiy.docx`.
 * Brand truth table, non-negotiables/flex/dealbreakers, brand spine,
 * messaging pillars with proof points and CTAs, voice/tone/lexicon,
 * words to avoid, replacement phrases.
 */

export const BRAND_IDENTITY = {
  // ── Brand Truth Table (key truths and their site implications) ─────────
  truths: [
    {
      truth:
        "The real market opening is small-to-mid residential interior finishing — not general contracting, not full basement renovation.",
      implication: "Position around practical interior finishing, not broad construction.",
    },
    {
      truth:
        "The best wedge sits between handyman work and full basement renovation.",
      implication:
        "Core messaging: too specialized for a handyman, too small for a big renovator.",
    },
    {
      truth:
        "The customer's real problem is not drywall itself — it is living with visible incompletion, irritation, and low-grade home stress.",
      implication: "Messaging must sell relief, closure, and a more settled home.",
    },
    {
      truth: "Small jobs are a strategic strength, not a leftover category.",
      implication: "'Small jobs welcome' must be explicit across pages.",
    },
    {
      truth: "The buyer wants clarity, tidy execution, and no project spiral.",
      implication:
        "Quote process, pricing language, and on-site expectations must feel contained and predictable.",
    },
    {
      truth:
        "Painting is more competitive standalone than drywall repair and bundled finishing.",
      implication:
        "Painting positioned as a finish enhancer, not the master brand headline.",
    },
    {
      truth: "Insulation is most strategic as a bundled value-add, not lead identity.",
      implication:
        "Site subordinates insulation behind practical finishing outcomes.",
    },
  ],

  // ── Non-Negotiables ────────────────────────────────────────────────────
  nonNegotiables: [
    "Position as a focused residential interior finishing specialist for Cochrane homeowners.",
    "Lead with drywall repair, drywall installation, garage packages, basement starter packages, and paint-ready completion.",
    "Make small jobs feel welcome and respected.",
    "Present quotes, pricing ranges, and process in grounded, plain language.",
    "Sell staged progress instead of forcing full renovation decisions.",
    "Keep insulation as a package enhancer unless scope clearly requires it.",
    "Show visible transformation: damaged/unfinished to clean/complete.",
    "Keep the tone calm, local, tidy, and straightforward.",
    "Use proof mechanics for every quality claim.",
    "Keep the website architecture simple and conversion-led.",
  ],

  // ── Allowed Flex ───────────────────────────────────────────────────────
  flex: [
    "Headline phrasing can vary between 'clean,' 'smooth,' 'finished,' 'straightforward,' and 'practical.'",
    "Accent support colors can expand around the core green as long as the palette stays restrained.",
    "Brand can lean slightly warmer or slightly more modern in photography depending on project type.",
    "Package names can evolve as sales data reveals best-performing language.",
    "Painting can be promoted harder on specific service pages without becoming the brand's main identity.",
  ],

  // ── Dealbreakers ───────────────────────────────────────────────────────
  dealbreakers: [
    "Looking like a generic contractor directory site.",
    "Looking like a luxury interior design brand unrelated to trades reality.",
    "Claiming 'premium' without showing process, finish quality, and homeowner-safe execution.",
    "Acting like a full renovation company.",
    "Burying small jobs under vague 'contact us for estimate' language.",
    "Leading with insulation as if it were the main reason to hire the company.",
    "Using cluttered layouts, too many colors, or aggressive hard-sell CTA language.",
    "Making basement work sound like full legal basement-development service when that is not the offer.",
    "Using broad claims like 'best,' 'top-rated,' or 'lowest price' without proof.",
    "Letting visual taste override category truth.",
  ],

  // ── Brand Spine ────────────────────────────────────────────────────────
  spine: {
    categoryStance: "Practical residential interior finishing for Cochrane homeowners.",
    enemy:
      "Vague handyman scope, full-renovation overcommitment, cluttered contractor sites.",
    categoryName: "Practical Interior Finishing",
    uniqueMechanisms: [
      "Small-Job Welcome Model — one patch, one wall, one room, one section.",
      "Service Ladder Logic — patch, finish, install, then package.",
      "Stage-One Space Upgrades — garage starter and basement starter offers.",
    ],
  },

  // ── Tagline candidates ─────────────────────────────────────────────────
  taglineCandidates: [
    "Finally Get That Wall Handled",
    "Clean Progress for Basements and Garages",
    "Straightforward Drywall, Paint, and Insulation",
    "The Focused Fix for Interior Spaces",
    "Spaces That Feel More Settled",
    "Start Small. Finish Strong.",
    "Damage Out. Comfort In.",
    "From Rough to Ready",
  ],

  // ── 3 Messaging Pillars (each with their CTA library) ──────────────────
  pillars: {
    cleanRepairs: {
      label: "Clean Repairs That Stop Catching Your Eye",
      meaning:
        "Quick, contained drywall patches and small repairs that disappear into the wall.",
      ctas: [
        "Request Repair Pricing",
        "Send Photos for a Patch Quote",
        "Get a Drywall Repair Quote",
        "Ask About a Small Job",
        "Show Us the Damage",
        "Get a Ballpark for Your Repair",
        "Book a Repair Estimate",
        "Start With a Photo Quote",
        "Get This Wall Handled",
        "Ask About Patch + Paint",
      ],
    },
    practicalProgress: {
      label: "Practical Progress for Basements and Garages",
      meaning:
        "Stage-one packages that move unfinished space forward without forcing a full renovation.",
      ctas: [
        "Explore Basement Starter Packages",
        "Ask About Garage Packages",
        "Get a Quote for Walls Only",
        "Price a Ceiling Package",
        "Start With Stage One",
        "Request a Basement Package Quote",
        "Ask About Garage Board + Insulation",
        "See What Fits Your Space",
        "Get Practical Upgrade Pricing",
        "Talk Through a Starter Scope",
      ],
    },
    clearScope: {
      label: "Clear Scope, Clear Pricing, No Project Spiral",
      meaning:
        "Photo-based quoting, straightforward ranges, contained execution.",
      ctas: [
        "Get a Clear Quote",
        "Send Photos for an Estimate",
        "See Starter Pricing",
        "Ask What's Included",
        "Start With a Simple Quote",
        "Find Out What Your Job Involves",
        "Get a Practical Ballpark",
        "Request Process + Pricing",
        "Ask About Scope",
        "Get a Quote Without the Runaround",
      ],
    },
  },

  // ── Voice ──────────────────────────────────────────────────────────────
  voice: {
    traits: [
      { trait: "Grounded", soundsLike: "practical, plainspoken, useful", neverSoundsLike: "inflated, theatrical" },
      { trait: "Reassuring", soundsLike: "calm, contained, homeowner-safe", neverSoundsLike: "pushy, urgent" },
      { trait: "Local", soundsLike: "Cochrane-specific, neighborly", neverSoundsLike: "franchise-corporate" },
      { trait: "Skilled", soundsLike: "scope-aware, finish-aware", neverSoundsLike: "boastful" },
      { trait: "Honest", soundsLike: "clear ranges, clear next steps", neverSoundsLike: "vague, hedging" },
    ],
  },

  // ── Words to AVOID (forbidden in copy) ─────────────────────────────────
  wordsToAvoid: [
    "elite",
    "luxury",
    "white glove",
    "world-class",
    "best-in-class",
    "premium contractor",
    "turnkey",
    "bespoke",
    "transformative experience",
    "revolutionary",
    "no. 1",
    "cheap",
    "best",
    "top-rated",
    "lowest price",
  ],

  // ── Replacement phrases (when tempted to use forbidden language) ───────
  replacements: {
    premium: "cleaner, more refined, and better organized",
    fullService: "focused residential finishing",
    turnkeySolution: "clear scope from repair to finish",
  },

  // ── Anti-patterns (do NOT do) ──────────────────────────────────────────
  antiPatterns: [
    "Do not present a giant undifferentiated service list.",
    "Do not let insulation dominate the narrative.",
    "Do not bury the drywall repair wedge under generic contractor language.",
    "Do not use flashy contractor aesthetics or fake luxury cues.",
    "Do not claim superiority without visible proof.",
    "Do not talk like a franchise template.",
    "Do not assume bigger projects are always better leads.",
    "Do not make homeowners work hard to understand package options.",
  ],
} as const;
