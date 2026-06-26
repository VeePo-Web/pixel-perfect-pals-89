/**
 * COCHRANE MASTER BUILDERS — Master Ideal Customer Persona: "Dirty Daniel"
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * Every copy, design, UX, and conversion decision should be filtered
 * through this persona. He is the lens for all website choices.
 * 
 * Category: Residential Interior Finishing — Calgary, Alberta
 */

export const DIRTY_DANIEL = {

  // ═══════════════════════════════════════════════════════════════════
  // EXECUTIVE SUMMARY
  // ═══════════════════════════════════════════════════════════════════
  summary: "Daniel is a busy Calgary homeowner whose home has crossed into problem-state — months of accumulated crumbs, stains, smell, and visual decline. He's not a slob; life just got ahead of him. He still cares about his home but the mess has become too overwhelming to tackle himself and too inconvenient to coordinate a drop-off. He's hiring Cochrane Master Builders for one thing: a complete, hassle-free reset delivered to his door, without judgment.",

  // ═══════════════════════════════════════════════════════════════════
  // DEMOGRAPHICS & FIRMOGRAPHICS
  // ═══════════════════════════════════════════════════════════════════
  demographics: {
    role: "Working professional, parent, tradesperson, student, or anyone whose home serves as daily transportation — not a hobby",
    seniority: "Mid-career / Established / Varies widely — income matters less than the pain threshold",
    industries: ["Oil & gas", "Construction", "Healthcare", "Tech", "Education", "Trades", "Government", "Small business", "Gig economy"],
    ageRange: "25–55",
    location: "Calgary and surrounding communities — NW, NE, SW, SE",
    dailyTools: [
      "Google Search / Google Maps",
      "Instagram (passive scrolling, not active posting)",
      "Facebook Marketplace / community groups",
      "Text messaging (preferred communication)",
      "Phone calls (secondary)",
      "Email (least preferred)",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // NARRATIVE: A DAY IN HIS LIFE
  // Use this to guide copy tone, imagery, and emotional pacing
  // ═══════════════════════════════════════════════════════════════════
  narrative: {
    morning: "Gets into the home for the commute. Notices the stains on the seat, the crumbs in the console, the film on the windshield. Thinks 'I really need to deal with this' for the hundredth time. Feels a low hum of embarrassment — hopes no one needs a ride today.",
    daytime: "Full day at work. The home sits in a parking lot accumulating dust. Maybe kids get picked up, groceries loaded in, coffee spilled. The mess compounds. He sees a coworker's clean home and feels the contrast. Adding 'clean home' to the mental to-do list that never gets shorter.",
    whatHeWants: "Someone to just handle it. Show up, do the deep work, and hand back a home that feels new. No dropping it off, no picking it up, no Saturday spent with a bucket and vacuum achieving mediocre results. A real reset — interior extraction, exterior restoration — done while he's home or at work. And no weird judgment about the current state.",
    nightFears: "Not the price — it's the inertia. The fear that it's 'too dirty' for someone to fix. The worry that mobile means lower quality. The concern that the price will change once they see how bad it is. The social embarrassment of showing someone the actual condition. And underneath it all: the nagging feeling that he should just do it himself, even though he never will.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CORE "JOB TO BE DONE" (JTBD)
  // Drives: CTA language, service descriptions, value propositions
  // ═══════════════════════════════════════════════════════════════════
  jobToBeDone: {
    functional: "Transform a neglected home from problem-state to factory-feel — interior extraction, exterior restoration, complete sensory reset — at my location, on my schedule.",
    social: "Stop feeling embarrassed about my home. Feel comfortable offering rides again. Present a home that reflects that I have my life together.",
    emotional: "Feel the relief and satisfaction of getting my home back without the effort, time, or guilt of doing it myself. Experience the transformation — not just a cleaner home, but the feeling of a fresh start.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PAINS & FRUSTRATIONS (THE "BEFORE" STATE)
  // Drives: Objection handling, reassurance copy, trust signals
  // ═══════════════════════════════════════════════════════════════════
  pains: {
    quotes: [
      "I've been meaning to clean my home for months. It just never happens.",
      "It's past the point where I can fix it myself — the stains are set, the smell is embedded.",
      "I don't want to drop it off somewhere and deal with rides and pick-up logistics.",
      "I'm embarrassed to show anyone how bad it actually is.",
      "Every time I get in the home I feel a little worse about it.",
      "I tried wiping it down but it didn't even make a dent — the mess is deeper than surface.",
      "I just don't have a free Saturday to spend four hours cleaning my home.",
      "I'm worried 'mobile' means some guy with a garden hose.",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // GOALS & ASPIRATIONS (THE "AFTER" STATE)
  // Drives: Aspiration messaging, before/after storytelling, CTA promises
  // ═══════════════════════════════════════════════════════════════════
  goals: {
    functional: "A home that looks and smells like it just came off the lot — interior and exterior.",
    social: "Confidence to offer rides, pick up dates, drive clients, load up the family without apology.",
    emotional: "The deeply satisfying feeling of sitting in a truly clean home. Pride. Relief. A weight lifted.",
    convenience: "Zero effort on my part — someone handles everything at my location while I go about my day.",
    financial: "Fair pricing with no surprises. The value should be obvious from the before/after alone.",
    trust: "A real person, real reviews, real results. Someone I can text, who shows up on time, and delivers what they promised.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // WATERING HOLES & INFLUENCES
  // Drives: Content strategy, SEO topics, social proof placement
  // ═══════════════════════════════════════════════════════════════════
  wateringHoles: {
    informationSources: [
      "Google Search: 'interior finishing near me,' 'mobile home cleaning Calgary,' 'interior home cleaning Calgary'",
      "Google Maps: looking for nearby options with good reviews",
      "Instagram: before/after photos, satisfying cleaning videos",
      "Facebook community groups: 'Calgary recommendations' threads",
      "Reddit: r/Calgary, r/HomeImprovement for advice",
      "Word of mouth: coworkers, friends, family referrals",
    ],
    socialMedia: {
      primary: ["Instagram (before/after content)", "Google Maps/Reviews"],
      secondary: "Facebook groups, TikTok satisfying cleaning videos (passive discovery)",
    },
    influencers: "Not influenced by custom home building influencers or home culture. Influenced by real customer results, friend recommendations, and Google review volume/recency.",
    decisionProcess: {
      phase1Awareness: "Hits the embarrassment/frustration threshold → searches 'interior finishing Calgary' or 'mobile home cleaning near me'",
      phase2Proof: "Scans before/after photos → reads Google reviews → checks pricing transparency → evaluates 'is this legit?'",
      phase3Convenience: "Confirms it's actually mobile → checks if they serve his area → looks for easy booking (text, form, call)",
      phase4Action: "Books if friction is low — texts, fills a short form, or calls. Abandons if pricing is hidden, process is complicated, or the vibe feels 'too luxury' or 'too cheap.'",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // OBJECTIONS & BARRIERS TO PURCHASE
  // Drives: FAQ content, gentle objection handling throughout site
  // ═══════════════════════════════════════════════════════════════════
  objections: {
    tooExpensive: "~$100 seems too cheap to be real — or too expensive for 'just a cleaning.' Is this actually worth it?",
    mobileQuality: "Can mobile really do as good a job as a fixed shop with a bay and equipment?",
    tooDirty: "My home might be too far gone. What if they refuse or charge way more once they see it?",
    trustAtHome: "I don't know this person — are they insured? Professional? Can I trust them at my house?",
    doItMyself: "I keep telling myself I'll do it this weekend. Maybe I should just buy supplies instead.",
    priceSurprise: "What if the price changes once they see the condition? I don't want an uncomfortable conversation at my door.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SELF-IDENTIFICATION LANGUAGE BANK
  // From Brand Identity North Star — customerMirror
  // ═══════════════════════════════════════════════════════════════════
  selfIdentification: {
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
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // LANDING PAGE / HOMEPAGE HANDOFF BRIEF
  // Drives: Hero section, homepage arc, CTA language, trust signal placement
  // ═══════════════════════════════════════════════════════════════════
  landingPageBrief: {
    mindsetOnArrival: "Frustrated, embarrassed, and looking for relief. Actively searching for someone competent who can just handle it. Skeptical of flashy promises. Wants proof, pricing, and convenience confirmed fast.",
    fiveSecondQuestion: "Can you actually fix my home — and will you come to me?",
    primaryHook: "Build it like it is ours. 'Mobile home restoration across Calgary — deep interior extraction, paint restoration, travel included. From ~$100.'",
    evidenceNeeded: {
      transformationProof: "Before/after photos of genuinely dirty homes — not staged, not minor jobs. Real Calgary homes in problem-state restored to factory-feel.",
      pricingClarity: "Starting price visible immediately. 'From ~$100' with clear 'travel included, no hidden fees' language.",
      mobileConfirmation: "'We come to you' — not buried, prominent. Calgary-wide coverage stated.",
      founderCredibility: "Real name, real face. Not a corporate facade. Cochrane Master Builders's presence signals personal accountability.",
      reviewEvidence: "Google reviews or testimonials quoting specific outcomes — 'the smell is gone,' 'it looks brand new,' 'I can't believe the difference.'",
      noJudgmentSignal: "Explicit reassurance: 'No matter how long it's been' or 'The worse the condition, the more satisfying the reset.'",
    },
    cta: {
      motivation: "Build it like it is ours.",
      positioning: "Booking positioned as relief + results: 'Tell us what you're working with — we'll handle the rest. Text, call, or book online.'",
    },
  },
} as const;
