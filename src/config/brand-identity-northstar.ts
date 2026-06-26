/**
 * COCHRANE MASTER BUILDERS — Brand Identity North Star
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * 
 * This is the RESOLVED output of the Brand Identity Architect process.
 * Every design, copy, layout, and interaction decision for the Cochrane Master Builders
 * website must pass through this document. No ambiguity. One direction.
 * 
 * Category: Residential Interior Finishing & Home Building — Calgary, Alberta
 * Methodology: Fantasy.co / Landor & Fitch / Wolff Olins — North Star System
 */

export const BRAND_IDENTITY_NORTHSTAR = {

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1 — BRAND TRUTH TABLE
  // Provable truths extracted from all input documents.
  // Each truth has a source and a forced implication.
  // ═══════════════════════════════════════════════════════════════════
  brandTruthTable: [
    {
      truth: "The service is fully mobile across Calgary with travel and gas included",
      source: "business-overview",
      implication: "'We come to you' is a lead message, not a footnote. Convenience is structural, not a perk.",
    },
    {
      truth: "~$100 price point for a full detail",
      source: "business-overview",
      implication: "Value-transformation positioning, not luxury. The brand wins on accessible impact, not exclusivity.",
    },
    {
      truth: "Strongest demand comes from pain threshold, not interest in custom home building",
      source: "business-overview / ideal-customer",
      implication: "Lead with outcome and relief, never process or technique. The customer doesn't care about extraction tools — they care about the result.",
    },
    {
      truth: "The ideal customer ('Dirty Daniel') has let their home go for months or longer",
      source: "brand-identity / business-overview",
      implication: "The brand must never shame neglect. It must meet the customer with relief, ease, and possibility.",
    },
    {
      truth: "Interior extraction and paint restoration are core — not add-ons",
      source: "business-overview",
      implication: "The service promise is deep restoration, not surface cleaning. Every message must reinforce depth.",
    },
    {
      truth: "The founder uses stamped business cards — tactile, grassroots, personal",
      source: "business-overview",
      implication: "The brand personality is grounded, hands-on, and real. Not corporate, not slick, not luxury-coded.",
    },
    {
      truth: "Before/after transformation is the most powerful proof mechanic",
      source: "business-overview / brand-identity",
      implication: "The website must be built around visual proof. Before/after is not a gallery section — it is the primary trust engine.",
    },
    {
      truth: "Calgary is the only service area",
      source: "business-overview",
      implication: "Local identity is a brand asset. Calgary references should be woven into copy, imagery, and proof.",
    },
    {
      truth: "The emotional payoff is relief, pride, and satisfaction — not status",
      source: "business-overview / brand-identity",
      implication: "The brand sells a feeling, not a flex. Copy must trigger 'I want that feeling' not 'I want to look rich.'",
    },
    {
      truth: "This is a solo founder operation in early stage",
      source: "business-overview",
      implication: "Personal brand weight. The founder's work ethic and standards ARE the brand. Authenticity is non-negotiable.",
    },
    {
      truth: "The customer values results over process — they don't care about construction jargon",
      source: "business-overview / ideal-customer",
      implication: "All copy must translate technique into outcome. Never 'hot water extraction' — always 'deep interior reset.'",
    },
    {
      truth: "Traditional old-school contracting requires drop-off, coordination, and lost time",
      source: "business-overview",
      implication: "The competitor weakness is friction. Our convenience must be dramatized as a complete removal of hassle.",
    },
  ],

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2 — NON-NEGOTIABLES / FLEX / DEALBREAKERS
  // ═══════════════════════════════════════════════════════════════════
  boundaries: {
    nonNegotiables: [
      "Mobile-first positioning — 'we come to you' is always present, never buried",
      "Relief-based tone — the customer is met with possibility, never judgment",
      "Before/after proof — every page should reinforce transformation visually",
      "Calgary locality — woven into copy, imagery, and identity",
      "Outcome-over-process messaging — results, not technique",
      "No shame language — the brand never makes the customer feel bad about their home's condition",
      "Pricing transparency — straightforward, no hidden fees, travel included",
      "Real photography only — no stock, no staged showroom homes",
      "Founder authenticity — the brand feels like a real person, not a corporation",
      "Satisfaction as the north star emotion — everything builds toward 'that feeling'",
    ],
    allowedFlex: [
      "Visual warmth vs coolness — can lean warmer (approachable) or cooler (professional) as long as grounded",
      "Level of ruggedness vs polish — can range from work-boot to clean-workshop, never to luxury-lounge",
      "How prominently 'neglected home' language is used — can be direct or implied, depending on context",
      "Photography processing — natural vs slightly graded, as long as authentic",
      "Accent color intensity — can be bold or restrained, must always feel energetic and actionable",
      "Amount of founder personality shown — can feature Cochrane Master Builders directly or let the work speak",
    ],
    dealbreakers: [
      "Luxury-coded language or aesthetics (gold, marble, script fonts, 'bespoke experience')",
      "Generic service claims ('quality service,' 'attention to detail,' 'customer satisfaction guaranteed')",
      "Stock photography of any kind — especially pristine showroom homes",
      "Corporate tone — stiff, impersonal, or overly formal",
      "Shame-based messaging ('Is your home embarrassing?' 'Don't let people see this')",
      "Master Builders jargon without outcome translation",
      "Claiming luxury or premium without proof mechanics",
      "Visual clutter, busy layouts, or information overload",
      "Copying competitor language or identity signals",
      "Any claim not supported by the actual service offering",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3 — BRAND SPINE (the controlling artifact)
  // Every decision must trace back to this spine.
  // ═══════════════════════════════════════════════════════════════════
  brandSpine: {
    category: "Residential Interior Finishing — Calgary, Alberta",
    enemy: [
      "Generic quick handyman fixes that move dirt around but don't solve the real problem",
      "Drop-off detail shops that waste your time with coordination, waiting, and pick-up logistics",
      "Surface-level 'builders' who clean what you can see but leave embedded grime, odor, and buildup",
      "The voice in your head that says 'I'll get to it eventually' — the friction of DIY that never happens",
    ],
    audience: "Calgary homeowners whose home has crossed into problem-state — too far gone for a quick clean, too inconvenient for a drop-off shop, too overwhelming to tackle alone. They still care. They just need someone to handle it.",
    promise: "Your home back. Factory-feel restoration delivered to your door. A reset so satisfying you'll wonder why you waited.",
    proof: [
      "Before/after transformations — real homes, real Calgary jobs, real results",
      "Extraction close-ups showing what came out of the interior",
      "Drywall + paint finishing reveals — the moment the finish comes back",
      "Customer reactions and reviews describing the feeling, not just the service",
      "Transparent pricing with travel included — no surprises",
    ],
    personality: ["hardworking", "honest", "satisfying", "confident", "grounded", "no-nonsense", "warm but direct"],
    standards: [
      "Every home leaves feeling reset — not 'cleaner,' reset",
      "No shortcuts — if it needs extraction, it gets extraction",
      "No hidden fees — the price includes everything, including travel",
      "No judgment — every home condition is welcome",
      "The customer's time is respected — we come to them, we handle everything",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4 — POSITIONING & CATEGORY OWNERSHIP
  // ═══════════════════════════════════════════════════════════════════
  positioning: {
    statement: "Cochrane Master Builders is Calgary's residential interior finishing service for homeowners whose homes have crossed into problem-state. By delivering deep interior extraction, paint restoration, and a full sensory reset directly to the customer's location — with travel included — Cochrane Master Builders transforms neglected homes into spaces that feel factory-fresh again. This is not a quick handyman fix. This is getting your home back.",
    categoryOwned: "Residential Interior Finishing",
    uniqueMechanisms: [
      { mechanism: "Mobile delivery", description: "The entire service comes to the customer. No drop-offs, no coordination, no wasted time." },
      { mechanism: "Deep extraction", description: "Interior shampooing and extraction that removes embedded grime, stains, debris, and odor — not just surface dirt." },
      { mechanism: "Paint restoration", description: "Exterior work that goes beyond washing to restore the finish and visual impact of the home." },
      { mechanism: "All-Calgary coverage", description: "Anywhere in Calgary, with gas and travel included in the price. No service area surcharges." },
      { mechanism: "Travel-included pricing", description: "The ~$100 price point includes everything. No hidden fees, no mileage charges, no surprises." },
      { mechanism: "Neglected-home expertise", description: "Specifically equipped and experienced with homes in problem-state — the worse the condition, the more dramatic the result." },
      { mechanism: "Before/after proof engine", description: "Every job produces visible, documented transformation that serves as both marketing and credibility." },
    ],
    proofArchitecture: {
      mustShow: [
        "Before/after gallery — real Calgary homes, real transformations, multiple angles",
        "Process documentation — extraction results, interior close-ups, drywall + paint finishing stages",
        "Customer reviews quoting specific outcomes ('the smell is gone,' 'it looks brand new,' 'I can't believe the difference')",
        "Pricing transparency — clear pricing with 'travel included' prominently stated",
        "Service area map — visual confirmation of Calgary-wide coverage",
        "Founder presence — Cochrane Master Builders's face, name, and personal commitment to the work",
      ],
      mustNotShow: [
        "Stock photography of model-home-condition homes",
        "Vague testimonials without specific outcome language",
        "Hidden or complicated pricing structures",
        "Corporate team photos or generic business imagery",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5 — CUSTOMER IDENTITY MIRROR
  // ═══════════════════════════════════════════════════════════════════
  customerMirror: {
    youAreOurPeopleIf: [
      "You've been meaning to deal with your home for months — and it keeps not happening",
      "You want someone to just handle it, start to finish, without you lifting a finger",
      "You care about your home but life got in the way",
      "You've stopped offering rides because you're embarrassed by the state of your home",
      "You want the reward of a clean home without the effort of cleaning it yourself",
      "You'd rather pay for a real reset than spend a Saturday with a vacuum and bucket",
      "You've tried wiping it down yourself but the mess is deeper than surface-level",
      "You want to sit in your home and actually feel good again",
      "You need someone who won't judge the current state — just fix it",
      "You want it done at your place, on your schedule, with zero hassle",
    ],
    notForYouIf: [
      "You want the absolute cheapest option regardless of the result",
      "You're looking for a quick 15-minute express wash",
      "You want a white-glove home spa-day finish with champagne and lounge access",
      "You need a permanent wall finish or long-life topcoat installation",
      "You're comparing us to automated tunnel washes — that's a different category entirely",
      "You want someone to maintain a home that's already in good shape weekly",
      "You expect perfection on a home with permanent structural damage",
      "You're uncomfortable with mobile service and prefer a fixed location",
      "You want custom home building done with products you specify",
      "You're looking for competition-grade show prep",
    ],
    languageBank: {
      desires: [
        "I just want my home to feel new again",
        "Make it so I actually want to drive it",
        "I want the satisfaction of seeing it clean — really clean",
        "I want to stop dreading giving people rides",
        "Just make it go away — the mess, the smell, all of it",
        "I want to feel like I got a new home without buying one",
        "I want someone who actually cares about doing it right",
        "I want it handled without me having to think about it",
      ],
      fears: [
        "What if it's too far gone?",
        "What if the price goes up once they see how bad it is?",
        "What if it still smells after?",
        "What if they judge me for how dirty it is?",
        "What if 'mobile' means lower quality?",
        "What if I'm overpaying for something I could do myself?",
        "What if they damage something?",
      ],
      identitySignals: [
        "I'm not a slob — I'm just busy",
        "I take care of my stuff when I can",
        "I value my time",
        "I don't need luxury, I need results",
        "I like supporting local businesses",
        "I want quality without pretension",
        "I'm practical — show me the before/after",
      ],
      objections: [
        { objection: "~$100 seems too cheap for a full detail", response: "Transparent pricing with travel included. No hidden fees, no upsells at the door. You get the custom build." },
        { objection: "Can mobile really do as good a job as a shop?", response: "Before/after proof from hundreds of Calgary homes. Same equipment, same products, delivered to your driveway." },
        { objection: "My home might be too dirty", response: "The worse the condition, the more dramatic the transformation. That's where we do our best work." },
        { objection: "I don't know if I can trust someone at my home", response: "Reviews, real name, real face. Cochrane Master Builders shows up, does the work, and you watch it happen." },
        { objection: "What if I'm not satisfied?", response: "The proof is in every before/after. We don't leave until the reset is complete." },
        { objection: "I can just go to a quick handyman fix", response: "A quick handyman fix moves surface dirt. We extract what's embedded — grime, smell, buildup, everything a wash can't reach." },
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6 — BRAND STORY SYSTEM
  // ═══════════════════════════════════════════════════════════════════
  storySystem: {
    thesis: "Every neglected home is a fresh start waiting to happen.",
    narrativeSpine: {
      neglectBuilds: "Life gets busy. The home gets pushed down the list. Crumbs accumulate, stains set, the smell settles in. What started as 'I'll clean it this weekend' becomes months of avoidance.",
      thresholdHit: "Then one day — someone needs a ride, a client gets in, or the owner just can't take it anymore. The gap between how the home feels and how they want it to feel becomes unbearable.",
      discoveryMoment: "They find Cochrane Master Builders. Mobile. Calgary-wide. Travel included. No drop-off, no hassle. A real reset, not just a rinse.",
      theReset: "Cochrane Master Builders shows up. The extraction pulls out what nobody wants to see. The interior transforms. The paint comes back. The home that was a source of low-grade stress becomes a source of genuine satisfaction.",
      carBack: "They sit in their home and it feels different. Not just cleaner — reset. Factory-fresh. Like getting it back. The pride, the relief, the satisfaction of a home that feels cared for again.",
    },
    repeatableThemes: [
      { theme: "The Reset", description: "The core transformation promise. Before → after. Neglected → restored. A complete sensory and visual reset." },
      { theme: "The Reveal", description: "The dramatic moment of seeing the result. The extraction bucket. The drywall + paint finishing. The first look inside." },
      { theme: "The Relief", description: "The emotional exhale of having it handled. Not just clean — off your plate. Someone else took care of it." },
      { theme: "The Return", description: "Getting your home back. Not a different home — YOUR home, the way it used to feel. Factory-fresh, familiar, yours again." },
      { theme: "The Standard", description: "Cochrane Master Builders's personal commitment to a level of finish. Not good enough ≠ done. The standard is factory-feel or it's not finished." },
    ],
    signatureMoments: [
      "The before/after reveal — documented, shared, celebrated",
      "The first time sitting in the restored home — the sensory reset",
      "The customer's visible reaction — relief, surprise, satisfaction",
      "The extraction bucket reveal — proof of what was hiding in the interior",
      "The drywall + paint finishing wipe — the moment the original finish comes back",
      "The follow-up — how the home still feels days later",
    ],
    proofMoments: [
      "Extraction close-ups showing embedded dirt, grime, and buildup removed",
      "Side-by-side drywall + paint finishing: before haze vs restored clarity",
      "Customer reviews with specific language: 'smells new,' 'can't believe the difference,' 'finally feels like my home again'",
      "Real-time process documentation: Cochrane Master Builders working on a real Calgary home",
      "Repeat customer bookings — people who come back because the first reset was that good",
    ],
    taglineDirections: [
      "Get your home back.",
      "The reset your home has been waiting for.",
      "From neglected to factory-fresh.",
      "We come to you. We bring it back.",
      "Your home, restored.",
      "Custom home building that actually restores.",
      "The detail that makes it feel new again.",
      "Deep clean. Full reset. Your door.",
      "Calgary's residential finishing and home-building service.",
      "We don't wash homes. We bring them back.",
      "The before/after you've been putting off.",
      "A custom build, delivered.",
      "Your home deserves better. We deliver it.",
      "Clean is the starting line. Restored is the finish.",
      "Feel the difference in the homeowner's seat.",
      "We handle the mess. You get the satisfaction.",
      "Factory-fresh, wherever you are in Calgary.",
      "The transformation starts in your driveway.",
      "Stop putting it off. Start driving proud.",
      "Restoration, not just a rinse.",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7 — MESSAGING PILLARS (execution-ready)
  // ═══════════════════════════════════════════════════════════════════
  messagingPillars: {
    pillars: [
      {
        name: "The Reset",
        meaning: "The core transformation — taking a home from problem-state to factory-feel. This is not cleaning. This is restoration.",
        proofPoints: [
          "Before/after photo pairs from real Calgary jobs",
          "Extraction results showing embedded grime removal",
          "Customer testimonials describing the feeling of 'getting their home back'",
          "Drywall + paint finishing documentation showing restored finish",
        ],
        headlines: [
          "Get your home back.",
          "The reset your home needs.",
          "From months of neglect to factory-fresh.",
          "This isn't a clean. It's a comeback.",
          "Your home, the way it used to feel.",
          "A custom build starts here.",
          "The transformation is the proof.",
          "See what 'restored' actually looks like.",
          "We don't stop at clean.",
          "The detail that changes everything.",
        ],
        subheads: [
          "Deep extraction. Paint restoration. A home that feels new again.",
          "Not a surface wipe — a complete interior and exterior reset.",
          "The kind of clean you can smell, feel, and see the moment you sit down.",
          "We go past the surface to remove what's been building up for months.",
          "A transformation so visible, you'll take a photo before you drive.",
          "Your home's worst day becomes its best before/after.",
          "From embedded grime to factory-fresh in one appointment.",
          "The interior your home forgot it had.",
          "Every stain, every smell, every layer of neglect — handled.",
          "Not maintenance. Restoration.",
        ],
        ctas: [
          "Book your reset",
          "See the transformation",
          "Get your home back",
          "Start the reset",
          "View before & afters",
          "Ready for a fresh start?",
          "Let's bring it back",
          "Book now — we come to you",
          "See what we can do",
          "Your home is next",
        ],
      },
      {
        name: "We Come To You",
        meaning: "Total convenience. Mobile service across all of Calgary with travel included. No drop-offs, no coordination, no wasted time.",
        proofPoints: [
          "All-Calgary coverage with gas and travel included",
          "Service performed at customer's location — home, work, anywhere",
          "No drop-off/pick-up logistics or wasted transit time",
          "Flexible scheduling around the customer's life",
        ],
        headlines: [
          "We come to you. Anywhere in Calgary.",
          "Your driveway is our detail shop.",
          "Custom home building that actually shows up.",
          "Skip the drop-off. We bring the detail.",
          "Restoration delivered to your door.",
          "Anywhere in Calgary. Travel included.",
          "Your schedule. Your location. Our equipment.",
          "No drop-off. No pick-up. No hassle.",
          "The detail comes to you.",
          "Full restoration. Zero inconvenience.",
        ],
        subheads: [
          "We bring everything we need — you don't lift a finger.",
          "Book a time, share your address, and we handle the rest.",
          "Gas and travel are included in every detail. No surprises.",
          "While you work, rest, or go about your day — your home gets reset.",
          "Calgary-wide service, from your driveway to your office parking lot.",
          "The convenience of mobile with the results of a full shop.",
          "We removed the biggest barrier to a clean home: having to go somewhere.",
          "Professional-grade restoration, wherever your home is parked.",
          "No wasted time. No coordination headaches. Just results.",
          "The easiest way to get a full home reset in Calgary.",
        ],
        ctas: [
          "Book a mobile detail",
          "We'll come to you",
          "Enter your Calgary address",
          "Schedule at your location",
          "Zero hassle — book now",
          "See our coverage area",
          "Pick a time that works",
          "We drive to you",
          "Book from your couch",
          "Let's set it up",
        ],
      },
      {
        name: "Beyond Clean",
        meaning: "This service goes deeper than what a quick handyman fix or basic detail can reach. Deep extraction, embedded grime removal, odor elimination, paint restoration.",
        proofPoints: [
          "Interior shampooing and extraction vs surface wipe comparison",
          "Extraction results: what came out of the seats and carpets",
          "Odor elimination from source, not masking",
          "Paint restoration showing restored clarity and finish",
        ],
        headlines: [
          "Clean is where we start. Restored is where we finish.",
          "Beyond clean. Into restored.",
          "We don't wash your home. We bring it back.",
          "Surface-level won't cut it.",
          "The detail that goes deeper.",
          "What a quick handyman fix can't reach, we extract.",
          "This isn't a clean. It's a restoration.",
          "We remove what you can't see — and what you can smell.",
          "Factory-feel isn't a promise. It's the standard.",
          "Deep enough to make a difference you can feel.",
        ],
        subheads: [
          "Shampooing, extraction, and deep interior reset — not a surface pass.",
          "We target embedded grime, buildup, stains, and odor at the source.",
          "Paint restoration that brings back the finish, not just the shine.",
          "The difference between 'cleaned' and 'restored' is what we extract.",
          "You'll see what came out of your seats. Then you'll understand.",
          "Every detail includes the work most services skip.",
          "A quick handyman fix moves dirt. We remove it — from deep inside the fabric.",
          "Interior extraction pulls out months of buildup in a single session.",
          "The kind of deep clean your home hasn't had since it was new.",
          "We restore the standard your home was built to.",
        ],
        ctas: [
          "See the difference",
          "Go deeper than clean",
          "Book a real restoration",
          "Experience the extraction",
          "Beyond the surface",
          "Get the full detail",
          "See extraction results",
          "No more surface-level",
          "Book the deep reset",
          "Your home needs this",
        ],
      },
      {
        name: "Real Results",
        meaning: "Proof-driven credibility. Every claim is backed by visible transformation, documented work, and specific customer outcomes.",
        proofPoints: [
          "Before/after galleries from actual Calgary jobs",
          "Customer reviews with specific outcome language",
          "Documented extraction and restoration process",
          "Repeat customer rate and referral patterns",
        ],
        headlines: [
          "Don't take our word for it. See the results.",
          "Every detail tells a before/after story.",
          "Real homes. Real Calgary. Real transformation.",
          "The proof is in the bucket.",
          "Results you can see, smell, and feel.",
          "We let the work speak.",
          "Documented transformation, every single time.",
          "See what 'restored' looks like on a real home.",
          "No stock photos. Just real results.",
          "Your home could look like this.",
        ],
        subheads: [
          "Every job is documented — because the transformation speaks louder than any claim.",
          "Real homes in Calgary, restored by Cochrane Master Builders, photographed before and after.",
          "Our customers don't say 'it's clean.' They say 'it feels brand new.'",
          "We publish extraction results because the proof is in what comes out.",
          "Scroll through real jobs and decide for yourself.",
          "No filters, no staging. Just honest before/after documentation.",
          "The results are specific: the smell is gone, the stains are gone, the finish is back.",
          "We earn trust with every job. The gallery grows with every reset.",
          "When the seats dry and the paint shines, the transformation is undeniable.",
          "Calgary homeowners who tried us once keep coming back. The results are why.",
        ],
        ctas: [
          "Browse the gallery",
          "See real before/afters",
          "Read customer stories",
          "Proof, not promises",
          "View recent work",
          "The results speak",
          "See the transformation",
          "Explore real jobs",
          "Check the proof",
          "Convinced? Book now",
        ],
      },
      {
        name: "No Judgment, Just Results",
        meaning: "Emotional safety. The customer is never shamed for their home's condition. Every state is welcome. The brand meets them with relief and possibility.",
        proofPoints: [
          "Tone of all messaging — relief-based, possibility-focused, zero shame",
          "The worse the condition, the more dramatic the result — positioned as exciting, not embarrassing",
          "Customer language reflecting 'finally' and 'relief' rather than guilt",
          "Founder's personal approach: every home is just a job, not a judgment",
        ],
        headlines: [
          "No matter how bad it's gotten, we've seen worse.",
          "Zero judgment. Just a fresh start.",
          "The worse it is, the better the before/after.",
          "You've been putting this off. We get it.",
          "Your home's condition isn't a problem. It's our specialty.",
          "We don't judge the mess. We reset it.",
          "Finally ready? We're ready too.",
          "There's no 'too dirty' here.",
          "You don't need to apologize. You need a reset.",
          "The mess is temporary. The reset is satisfying.",
        ],
        subheads: [
          "Every home we restore started in a state someone wasn't proud of. That's the whole point.",
          "We're not here to make you feel bad about your home. We're here to make your home feel good again.",
          "Months of buildup? A year? Longer? Bring it. That's where transformations get dramatic.",
          "Your home doesn't need to be in decent shape for us to start. It needs to be ready for a reset.",
          "Most of our customers waited longer than they wanted to. None of them regretted booking.",
          "No awkward conversations. No raised eyebrows. Just professional restoration, no matter the starting point.",
          "We've extracted things from homes that would surprise you. Nothing phases us.",
          "The biggest barrier to a clean home isn't the mess — it's the feeling of being judged for it.",
          "We removed that barrier. Now it's just: book, show us the home, and we handle the rest.",
          "Embarrassment is the enemy of action. We're here to make action easy.",
        ],
        ctas: [
          "No judgment — book now",
          "Ready when you are",
          "Let's handle it",
          "Start fresh today",
          "It's time",
          "No shame, just results",
          "Book your fresh start",
          "We've seen it all",
          "Let us take it from here",
          "Finally? Let's go",
        ],
      },
    ],
    valuePropositionStack: {
      primary: "Factory-feel home restoration, delivered mobile to your door anywhere in Calgary, with travel included.",
      secondary: "Deep interior extraction and paint restoration that goes far beyond surface cleaning — for homes that need a real reset.",
      tertiary: "An accessible, no-judgment service built for busy Calgary homeowners who care about their home but haven't had the time to deal with it.",
    },
    offerArchitecture: {
      framingPrinciple: "Frame the offer by outcome, not by task list. The customer buys a reset, not a checklist of cleaning steps.",
      recommended: [
        "Lead with the transformation promise, not the service menu",
        "Show the ~$100 price point as 'custom build, travel included' — emphasize completeness and value",
        "Use 'what's included' as proof of depth, not as the headline",
        "Position add-ons (if any) as 'for homes that need extra attention' — never as upsells",
      ],
    },
    claimsAllowed: [
      "We come to you anywhere in Calgary",
      "Travel and gas are included",
      "Deep interior extraction — not surface cleaning",
      "Paint restoration to improve finish and appearance",
      "A full home reset for approximately $100",
      "Real before/after results from Calgary homes",
      "No judgment on home condition",
      "Factory-feel restoration",
    ],
    claimsProhibited: [
      "Best interior finishing in Cochrane and Calgary (unprovable superlative)",
      "Luxury building experience (misaligned positioning)",
      "Guaranteed perfect results on every home (overpromise)",
      "We use the best products in the industry (generic, unprovable)",
      "World-class service (empty claim)",
      "Premium experience (not the brand's positioning)",
      "100% satisfaction guaranteed (legal/expectation risk without defined terms)",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8 — VERBAL IDENTITY
  // ═══════════════════════════════════════════════════════════════════
  verbalIdentity: {
    voiceTraits: [
      {
        trait: "Hardworking",
        soundsLike: "We show up, do the work, and don't leave until it's right.",
        neverSoundsLike: "Our team of dedicated professionals strives for excellence in every engagement.",
      },
      {
        trait: "Honest",
        soundsLike: "Here's what the detail includes, here's the price, here's what your home will look like after.",
        neverSoundsLike: "We pride ourselves on our unwavering commitment to transparency and integrity.",
      },
      {
        trait: "Satisfying",
        soundsLike: "The before/after is the best part. You'll see it. You'll feel it. You'll sit in your home and just... exhale.",
        neverSoundsLike: "We ensure optimal client satisfaction through our proprietary methodology.",
      },
      {
        trait: "Confident",
        soundsLike: "We've done this hundreds of times. Your home's condition doesn't scare us.",
        neverSoundsLike: "We humbly believe we offer a competitive service in the Calgary market.",
      },
      {
        trait: "Grounded",
        soundsLike: "This is a Calgary-based mobile service. Cochrane Master Builders shows up in your driveway and restores your home.",
        neverSoundsLike: "Our bespoke concierge automotive renewal experience transcends traditional custom home building paradigms.",
      },
    ],
    toneModulation: {
      website: "Confident, warm, proof-driven. Lead with outcomes, support with specifics. Short paragraphs, direct language, before/after imagery doing the heavy lifting.",
      ads: "Punchy, visual, outcome-first. One strong hook + before/after image + CTA. No fluff. 'Your home, restored. We come to you. Book now.'",
      social: "Casual, satisfying, visual. Show the work. Let the transformation speak. Occasional Cochrane Master Builders personality. Calgary-local references.",
      bookingConfirmation: "Clear, friendly, practical. Confirm what's happening, when, where. Set expectations. 'See you [day] at [location]. We'll handle the rest.'",
      followUp: "Warm, appreciative, proof-collecting. Thank the customer. Ask for a review. Share the before/after. 'Your home looks incredible. Mind if we share?'",
    },
    lexicon: {
      ownedWords: ["reset", "restore", "factory-feel", "bring it back", "deep extraction", "your home back", "the reveal", "transformation", "mobile restoration"],
      bannedWords: ["luxury", "bespoke", "elite", "premium experience", "world-class", "unmatched", "simple clean", "just a wash", "cheap", "basic", "budget", "discount"],
      replacements: [
        { instead: "We clean your home", say: "We restore your home" },
        { instead: "Quality service", say: "Factory-feel results" },
        { instead: "Attention to detail", say: "Deep extraction and restoration" },
        { instead: "Customer satisfaction", say: "The kind of reset you can feel the moment you sit down" },
        { instead: "Affordable pricing", say: "Full reset, travel included, ~$100" },
        { instead: "Professional home building", say: "Mobile home restoration" },
        { instead: "Book an appointment", say: "Book your reset" },
        { instead: "Our services", say: "What we restore" },
        { instead: "Contact us", say: "Let's get started" },
      ],
    },
    writingStandards: {
      sentenceRhythm: "Short sentences dominate. Occasionally a longer one for warmth or context. Never more than two long sentences in a row. Sentence fragments are welcome when they add punch.",
      specificityRule: "Every claim must include a specific detail. Not 'we're thorough' — 'we extract what's been embedded in your seats for months.' Not 'great results' — 'a before/after that makes you do a double-take.'",
      bannedFluff: [
        "In today's fast-paced world...",
        "We pride ourselves on...",
        "Our dedicated team...",
        "Striving for excellence...",
        "Going above and beyond...",
        "At the end of the day...",
        "It's not just about...",
        "We believe that...",
        "Leveraging our expertise...",
      ],
    },
    copyExamples: {
      good: [
        "Your home's been through a lot. We bring it back.",
        "Deep extraction pulls out what months of use leave behind. You'll see what comes out — and you'll understand.",
        "We show up at your door in Calgary with everything we need. You don't do anything except hand over the keys.",
        "~$100. Full reset. Travel included. No surprises.",
        "The before/after is the proof. We let the work speak.",
      ],
      bad: [
        "We are a premium residential finishing company offering world-class services to discerning homeowners.",
        "Our team of experienced professionals takes pride in delivering exceptional results with attention to every detail.",
        "At Cochrane Master Builders, we believe in providing affordable, quality home cleaning services to the Calgary community.",
        "Experience the luxury of having your home professionally cleaned without leaving home.",
        "We go above and beyond to ensure complete customer satisfaction on every job.",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 9 — VISUAL IDENTITY DIRECTION
  // ═══════════════════════════════════════════════════════════════════
  visualIdentity: {
    visualPrinciples: [
      { principle: "Proof over polish", description: "The most compelling visual is a real before/after, not a styled photoshoot. Authenticity trumps aesthetics." },
      { principle: "Satisfaction is the aesthetic", description: "Every visual should trigger the feeling of a fresh, restored home. Clean lines, revealed finishes, reset interiors." },
      { principle: "Real over staged", description: "Real homes, real Calgary locations, real hands at work. No stock, no studio homes, no showroom pretense." },
      { principle: "Contrast tells the story", description: "The visual system should emphasize transformation through contrast — dark/dirty → clean/bright, textured/grimy → smooth/fresh." },
      { principle: "Grounded confidence", description: "The design should feel confident and professional without being corporate. Think clean workshop, not boardroom." },
      { principle: "Space = satisfaction", description: "Generous whitespace signals quality and lets before/after imagery breathe. Don't crowd the proof." },
      { principle: "Mobile-first always", description: "Every layout, image, and interaction is designed for phone-first viewing. Desktop is an expansion, not the primary." },
      { principle: "CTA clarity", description: "Every scroll position should make the next action obvious. 'Book your reset' should never be more than a thumb's reach away." },
    ],
    trustCues: [
      "Before/after gallery — the primary trust builder, updated with every job",
      "Real job photography — recognizably Calgary, recognizably real",
      "Pricing visibility — '$100 full detail, travel included' is shown early and clearly",
      "Review integration — specific customer quotes about outcomes, not generic praise",
      "Founder presence — Cochrane Master Builders's name, face, and personal standard visible throughout",
      "Process transparency — showing the extraction, the tools, the work in progress",
    ],
    photography: {
      required: [
        "Before/after pairs: same angle, same lighting, dramatic contrast",
        "Extraction close-ups: dirty water, debris removed, seat transformation",
        "Drywall + paint finishing reveals: the wipe that shows restored finish",
        "Real Calgary locations: driveways, parking lots, residential streets",
        "Cochrane Master Builders at work: authentic action shots, not posed",
        "Interior panoramas: the full cabin transformation",
        "Detail shots: clean door jambs, restored cup holders, fresh floor mats",
      ],
      prohibited: [
        "Stock photography of any kind",
        "Showroom or dealership homes",
        "Studio-lit homes on white backgrounds",
        "Overly filtered or heavily processed images",
        "Generic hand-with-cloth close-ups",
        "Images without Calgary context",
      ],
      style: "Natural light preferred. Slightly warm processing to convey satisfaction and approachability. High contrast between before/after states. Close-up detail work to show depth of restoration.",
    },
    layoutPhilosophy: {
      principles: [
        "Clean, spacious, proof-forward — every section should serve the transformation story",
        "Scroll-driven reveals — before/after pairs revealed as user scrolls, creating a satisfying reveal cadence",
        "Mobile-first grid — single column on mobile, expanding to 2-column max on desktop",
        "CTA anchored — booking action always accessible, never more than one scroll away",
        "Section breathing room — generous padding between content blocks",
        "Image-led hierarchy — photography carries the argument, text supports it",
        "Progressive disclosure — don't overwhelm. Reveal depth as the user scrolls deeper",
      ],
      antiPatterns: [
        "Dense text blocks without visual breaks",
        "Carousels that hide proof behind navigation",
        "Multi-column layouts that don't collapse gracefully on mobile",
        "Hero sections without a clear value proposition",
        "Pricing hidden at the bottom of the page",
        "CTAs that compete with each other",
      ],
    },
    typography: {
      direction: "Confident, clean sans-serif for primary headings. Readable, neutral body text. No script fonts. No decorative typefaces. No thin weights that disappear on mobile.",
      hierarchy: {
        h1: "Bold, large, short — the main promise or hook. Maximum 8 words.",
        h2: "Strong, medium — section value propositions. Maximum 12 words.",
        h3: "Clear, functional — subsection labels and feature names.",
        body: "Comfortable reading size, generous line height, neutral weight. Never smaller than 16px on mobile.",
        cta: "Confident weight, high contrast, action-verb led. 'Book your reset' not 'Learn more.'",
      },
      restrictions: [
        "No script or handwritten fonts — they contradict the grounded, hardworking personality",
        "No ultra-thin weights — they read as luxury/fragile, opposite of the brand",
        "No more than 2 font families total — one for headings, one for body",
        "No ALL-CAPS body text — headings only, sparingly",
      ],
    },
    colorLogic: {
      philosophy: "The palette should feel grounded, clean, and confident. It communicates craft, freshness, and the satisfaction of a job well done. Not luxury. Not generic blue. Not neon energy. Grounded authority with a clean, restorative feeling.",
      palette: {
        primary: {
          role: "Authority, craft, grounding",
          description: "Deep charcoal or near-black. The anchor of the brand. Used for text, headers, and primary surfaces. Signals seriousness, capability, and professionalism without corporate stiffness.",
          usage: "Primary text, headers, navigation, footer backgrounds, strong containers",
        },
        secondary: {
          role: "Freshness, reset, cleanliness",
          description: "Clean white or very light warm white. The canvas that represents the 'after' state — clean, fresh, reset. Used for backgrounds, cards, and breathing space.",
          usage: "Page backgrounds, card backgrounds, section dividers, content areas",
        },
        accent: {
          role: "Energy, action, conversion",
          description: "A warm, confident accent — not neon, not muted. Think amber, warm orange, or a grounded teal. Used sparingly for CTAs, highlights, and interactive elements. Must feel energetic and trustworthy.",
          usage: "CTAs, links, hover states, key highlights, pricing callouts, active states",
        },
        neutral: {
          role: "Trust, texture, supporting information",
          description: "Warm gray or stone tone. For secondary text, borders, subtle backgrounds, and information hierarchy. Adds warmth without competing with the primary or accent.",
          usage: "Secondary text, borders, muted backgrounds, form inputs, metadata",
        },
      },
      antiPatterns: [
        "Gold or champagne tones — reads as luxury, breaks positioning",
        "Marble or granite textures — same luxury misalignment",
        "Bright blue — generic quick handyman fix / corporate default",
        "Neon green or lime — energy drink, not restoration",
        "Pastel palette — too soft for a hardworking, confident brand",
        "Rainbow or multi-color — lacks the discipline this brand needs",
      ],
    },
    iconographyMotifs: {
      allowed: [
        "Simple, functional line icons for service features and process steps",
        "Arrow/chevron motifs for CTAs and navigation — directional energy",
        "Before/after split motifs — the visual language of transformation",
        "Water/extraction motifs — subtle, used sparingly",
      ],
      prohibited: [
        "Ornate or decorative icons",
        "Home silhouettes or generic auto icons",
        "Sparkle/shine effects (reads as quick handyman fix, not restoration)",
        "Shield/badge icons (reads as corporate or insurance)",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 10 — BRAND GOVERNANCE
  // ═══════════════════════════════════════════════════════════════════
  governance: {
    brandConstitution: [
      "The brand exists to give Calgary homeowners the feeling of getting their home back.",
      "Every message leads with outcome, never process.",
      "The customer is never shamed, judged, or made to feel bad about their home's condition.",
      "Proof (before/after, reviews, extraction results) is the primary trust mechanism — not claims.",
      "The brand sounds like a hardworking, honest person — not a corporation.",
      "Visual identity serves the transformation story — photography is the hero, design supports it.",
      "Pricing is transparent and straightforward — travel included, no hidden fees.",
      "Calgary is home. Local identity is a strength, not a limitation.",
    ],
    decisionFilter: [
      "Does this make the transformation story clearer or more believable?",
      "Would 'Dirty Daniel' understand this in 5 seconds?",
      "Does this sound like a real person or a corporate brochure?",
      "Can we prove this claim with a before/after, review, or specific detail?",
      "Does this respect the customer's situation without shaming them?",
    ],
    consistencyChecklists: {
      websitePages: [
        "Every page includes at least one before/after visual or transformation reference",
        "CTA ('Book your reset' or equivalent) is accessible within one scroll",
        "Pricing transparency: travel included, approximate cost visible",
        "Calgary-local reference present (copy, imagery, or service area)",
        "Tone check: hardworking, honest, satisfying — no corporate language",
        "Mobile-first: page works and reads well on phone before desktop",
      ],
      ads: [
        "One clear hook — outcome-first, not feature-first",
        "Before/after visual or transformation language present",
        "CTA is specific ('Book your reset') not generic ('Learn more')",
        "No luxury language, no generic claims, no shame-based messaging",
        "Calgary mentioned or visually implied",
      ],
      social: [
        "Visual-first: transformation imagery leads every post",
        "Caption is conversational, short, outcome-focused",
        "Before/after content is the primary content type",
        "Engagement prompts are natural, not forced",
        "Local Calgary references and hashtags used consistently",
      ],
      bookingFlow: [
        "Process is simple: location → date/time → home info → confirm",
        "Travel-included pricing is stated early",
        "No upsell pressure — add-ons offered without friction",
        "Confirmation message is warm, clear, and practical",
        "Sets expectations: what happens, when, how long",
      ],
      customerCommunications: [
        "Thank-you message after service — warm, genuine, brief",
        "Before/after sharing permission — asked respectfully",
        "Review request — specific, easy, non-pushy",
        "Follow-up — check if the reset is still holding up",
        "Re-booking prompt — timed, not aggressive",
      ],
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 11 — WHAT NOT TO DO (hard guardrails)
  // ═══════════════════════════════════════════════════════════════════
  whatNotToDo: {
    messaging: [
      "Never claim 'best in Calgary' or any unprovable superlative",
      "Never use 'quality service,' 'attention to detail,' or 'customer satisfaction' — these are empty calories",
      "Never shame the customer ('Is your home embarrassing?' 'Time to stop being lazy')",
      "Never use luxury language ('bespoke,' 'concierge,' 'curated experience')",
      "Never lead with the process or technique — always lead with the outcome",
      "Never describe the service as 'just a clean' or 'just a wash'",
      "Never use passive voice when active is possible",
      "Never write copy that could describe 10 other builders",
    ],
    visual: [
      "Never use stock photography — especially pristine showroom homes",
      "Never use gold, marble, or luxury textures",
      "Never use script or decorative fonts",
      "Never create cluttered layouts with competing elements",
      "Never hide pricing behind friction (modals, form submissions, 'call for a quote')",
      "Never use sparkle/shine effects that read as 'quick handyman fix'",
      "Never sacrifice mobile readability for desktop aesthetics",
      "Never use generic home silhouette graphics",
    ],
    strategic: [
      "Never position as luxury or premium — the brand wins on accessible transformation",
      "Never try to serve every customer equally — 'Dirty Daniel' is the hero customer",
      "Never abandon Calgary-local identity for a 'bigger' feel",
      "Never let founder personality disappear behind a corporate veneer",
      "Never treat before/after content as secondary — it is the primary trust engine",
      "Never overcomplicate the booking process — simplicity IS the brand promise",
      "Never make claims that can't be supported by the current service offering",
      "Never chase trending aesthetics that don't align with the Brand Spine",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 12 — BRAND ARCHETYPE
  // ═══════════════════════════════════════════════════════════════════
  archetype: {
    primary: {
      name: "Caregiver-Creator Hybrid",
      description: "The Caregiver restores what matters — taking responsibility for something the customer can't or won't handle themselves, and doing it with genuine care. The Creator takes pride in craft — the work itself is a source of satisfaction, and the standard is personal, not corporate.",
      manifestation: "Cochrane Master Builders doesn't just clean homes. He restores something the owner had stopped feeling good about. The care is real. The craft is visible. The standard is 'factory-feel or it's not done.'",
    },
    supporting: {
      name: "Everyman",
      description: "Accessible, grounded, real. The brand doesn't try to be elite or exclusive. It speaks plainly, charges fairly, and shows up where the customer is. This is a real person doing real work in a real city.",
      manifestation: "The pricing is straightforward. The tone is direct. The service area is Calgary — not 'the greater metropolitan area.' The founder has a face and a name.",
    },
    rejected: [
      {
        archetype: "Hero",
        reason: "The Hero archetype positions the brand as the central figure who overcomes challenges. But in this story, the customer is the one with the problem. Cochrane Master Builders is the guide, not the hero. Making the brand the hero would shift focus away from the customer's transformation.",
      },
      {
        archetype: "Ruler",
        reason: "The Ruler seeks control, dominance, and authority. This reads as corporate, premium, or exclusive — all of which contradict the grounded, accessible, no-judgment positioning.",
      },
      {
        archetype: "Magician",
        reason: "The Magician promises miraculous transformation. While the results are dramatic, positioning them as 'magic' undermines the credibility of hard work and craft. The brand's power comes from effort, not mystique.",
      },
    ],
  },

} as const;
