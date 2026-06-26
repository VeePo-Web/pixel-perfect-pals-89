/**
 * COCHRANE DRYWALL & INSULATION — Design Preferences (canonical)
 *
 * SOURCE OF TRUTH — distilled from `1.3_Cochrane_Drywall_Insulation_--_customer_design_pref.docx`.
 * This is the design FILTER. Every visual decision must answer "yes" to:
 *  - Does it feel clean, precise, local, honest, calm, and quietly premium?
 *  - Does it serve the transformation story (damaged → clean / unfinished → complete)?
 *  - Does it avoid the explicit "do not look like" list?
 */

export const DESIGN_PREFERENCES = {
  coreConclusion:
    "Clean, premium, local, trustworthy, and visually refined — with just enough motion and polish to feel above-market without feeling expensive-for-the-sake-of-it.",

  positioning: "Elevated residential finishing",

  // ── The website should make people feel ────────────────────────────────
  feelings: [
    "this company is organized",
    "this company is careful inside homes",
    "this company does clean work",
    "this company is straightforward to hire",
    "this company can take a damaged or unfinished space and make it feel complete",
  ],

  // ── Design language pillars ────────────────────────────────────────────
  pillars: ["precision", "calmness", "cleanliness", "material honesty", "transformation"] as const,

  // ── 7 personality traits ───────────────────────────────────────────────
  personality: [
    { trait: "Clean", meaning: "Spacious layouts, smooth sections, minimal visual noise" },
    { trait: "Precise", meaning: "Sharp alignment, crisp spacing, controlled typography" },
    { trait: "Local", meaning: "Warm, grounded, residential, not corporate" },
    { trait: "Honest", meaning: "Clear wording, no inflated claims, no fake grandeur" },
    { trait: "Skilled", meaning: "Strong details, process clarity, before/after confidence" },
    { trait: "Calm", meaning: "Soft motion, restrained palette, easy readability" },
    { trait: "Premium", meaning: "Better photography, better spacing, better interaction design" },
  ],

  // ── 8 brand adjectives — the running design filter ─────────────────────
  adjectives: [
    "Clean",
    "Solid",
    "Finished",
    "Local",
    "Dependable",
    "Smooth",
    "Honest",
    "Quietly premium",
  ] as const,

  // ── Hero direction ─────────────────────────────────────────────────────
  hero: {
    concept:
      "Transformation hero — a clean cinematic interior wall scene or corner of a basement/garage space.",
    initialFrame: [
      "subtle seam lines, patch marks, or unfinished texture",
      "slightly cooler, flatter light",
      "visible problem state without looking ugly or dramatic",
    ],
    onScroll: [
      "seams smooth out",
      "board lines align",
      "light warms",
      "fine dust particles settle or fade",
      "paint finish becomes even",
      "the space becomes bright, complete, and calm",
    ],
    copyExamples: [
      "Clean Drywall Repairs, Painting & Insulation in Cochrane",
      "From Damaged or Unfinished to Clean and Complete",
      "Smooth Patches. Straightforward Installs. Practical Finishing Work.",
    ],
    purpose:
      "Service demonstration — not decorative motion. The user experiences the company's value before reading much copy.",
  },

  // ── Motion preferences ─────────────────────────────────────────────────
  motion: {
    style: "Subtle, spatial, and purposeful",
    feelLike: [
      "camera drift",
      "material refinement",
      "parallax depth",
      "dust settling",
      "surface smoothing",
      "lighting transition",
      "layered wall assembly",
    ],
    metaphors: [
      "seam disappears",
      "wall layers align",
      "insulation fills cavity",
      "light enters the room",
      "damaged surface becomes smooth",
      "before/after line passes across the wall",
      "rough texture resolves into finished paint",
    ],
    avoid: [
      "flashy spins",
      "over-animated objects",
      "fake construction gimmicks",
      "heavy gaming-style motion",
      "long scroll hijacks",
    ],
  },

  // ── Photography ────────────────────────────────────────────────────────
  photography: {
    subjects: [
      "real residential interiors",
      "clean basement walls",
      "garages in progress or recently finished",
      "drywall patching close-ups",
      "smooth painted surfaces",
      "insulation installation details",
      "tidy tools rather than messy worksites",
      "natural or soft directional lighting",
    ],
    feel: ["bright", "controlled", "honest", "residential", "clean enough to imply professionalism"],
    compositions: [
      "corner-of-room shots",
      "before/after frames",
      "hands-at-work detail shots",
      "straight-on wall repair close-ups",
      "basement progression shots",
      "wide shots with negative space for copy",
    ],
    avoid: [
      "hardhat stock-photo energy",
      "giant commercial job sites",
      "people-focused hero imagery",
    ],
  },

  // ── Things to actively avoid (positioning + visual) ────────────────────
  avoidPositioning: [
    "rugged construction",
    "macho trades branding",
    "discount handyman energy",
    "overbuilt renovation-agency aesthetics",
    "hyper-luxury black-and-gold theatrics",
  ],
  avoidVisual: [
    "bright red",
    "neon orange",
    "saturated construction yellow",
    "overly glossy black",
    "too many accent colors",
    "excessive black sections",
    "overdone parallax everywhere",
    "long-form brag copy too early",
    "too many service categories fighting each other",
  ],
  avoidLookingLike: [
    "a flashy startup",
    "a luxury interior design firm",
    "a gritty demolition company",
    "a cheap handyman flyer site",
    "a generic contractor directory site",
  ],

  // ── Trust-builders to lean into ────────────────────────────────────────
  trustBuilders: [
    "simple process",
    "local service area",
    "before/after visuals",
    "clean workmanship language",
    "realistic project scopes",
    "quick estimate framing",
    "residential focus",
  ],

  // ── Mobile principles ──────────────────────────────────────────────────
  mobile: {
    priorities: [
      "immediate headline clarity",
      "tap-to-call / quote button visible early",
      "service cards easy to scan",
      "before/after images load fast",
      "motion simplified",
      "no hover-dependent interactions",
      "short scroll blocks with clean spacing",
    ],
    principle:
      "Premium should come from spacing, hierarchy, and polish — not complex effects.",
  },

  // ── Final art direction statement ──────────────────────────────────────
  artDirectionStatement: "Quietly premium residential finishing.",
} as const;
