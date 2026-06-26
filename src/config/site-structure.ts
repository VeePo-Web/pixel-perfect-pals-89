/**
 * COCHRANE DRYWALL & INSULATION — Site Structure (canonical)
 *
 * SOURCE OF TRUTH — verbatim from `2.1_Cochrane_Drywall_Insulation_--_wireframe.docx`.
 * The locked 9-page IA + section list per page.
 *
 * Customer journey: problem → service → proof → reassurance → quote.
 */

export const SITE_STRUCTURE = {
  // ── Navigation order (locked) ──────────────────────────────────────────
  nav: [
    { label: "Home", path: "/" },
    { label: "Drywall Repair", path: "/drywall-repair" },
    { label: "Drywall Installation", path: "/drywall-installation" },
    { label: "Painting", path: "/painting" },
    { label: "Garage Packages", path: "/garage-packages" },
    { label: "Basement Packages", path: "/basement-packages" },
    { label: "Pricing & Process", path: "/pricing-process" },
    { label: "Gallery", path: "/gallery" },
    { label: "Reviews", path: "/reviews" },
    { label: "Favourite Things", path: "/favourite-things" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ],

  // ── Page section maps (per wireframe doc) ──────────────────────────────
  pages: {
    home: {
      purpose:
        "Quickly show this is for Cochrane homeowners with drywall damage, unfinished basements/garages, or paint/insulation needs.",
      sections: [
        "Hero",
        "Trust bar",
        "Main problems we solve",
        "Core services overview",
        "Before / after preview",
        "Why choose us",
        "Simple process",
        "Starter packages / offers",
        "Testimonials",
        "FAQ",
        "Final CTA",
        "Footer",
      ],
    },
    drywallRepair: {
      purpose:
        "Convert people with holes, cracks, dents, cutouts, and visible wall damage.",
      sections: [
        "Hero",
        "Common repair problems",
        "Small jobs welcome",
        "Before / after repairs",
        "Repair options / pricing starter ranges",
        "Trade-cutout repair section",
        "Patch + paint option",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    drywallInstallation: {
      purpose:
        "Convert visitors who need new drywall installed in basements, garages, ceilings, utility spaces, or partial rooms.",
      sections: [
        "Hero",
        "What installation jobs we handle",
        "Basement / garage / ceiling examples",
        "Why not a handyman / full renovator",
        "Project types / package options",
        "Before / after or project examples",
        "Process",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    painting: {
      purpose:
        "Capture people who want the space to feel fully finished, refreshed, and clean after repair work.",
      sections: [
        "Hero",
        "Painting jobs we handle",
        "Patch + prime + paint section",
        "Room refresh section",
        "Before / after painting results",
        "Pricing starter ranges",
        "Why this works well with drywall repair",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    garagePackages: {
      purpose: "Sell the garage as a practical upgrade, not a major renovation.",
      sections: [
        "Hero",
        "Problems with unfinished garages",
        "Garage package options",
        "Insulation + drywall benefits",
        "Before / after garage examples",
        "What's included",
        "Process",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    basementPackages: {
      purpose:
        "Convert homeowners who want to start improving the basement without committing to a full basement renovation.",
      sections: [
        "Hero",
        "'Not ready for a full basement renovation?' section",
        "Basement starter package options",
        "Walls-only option",
        "Ceiling / soundproofing option",
        "Insulation option",
        "Benefits of staged progress",
        "Before / after examples",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    pricingProcess: {
      purpose: "Reduce fear around cost, confusion, and disruption.",
      sections: [
        "Hero",
        "Starter pricing ranges",
        "What affects price",
        "How quoting works",
        "Photo quote section",
        "What to expect on-site",
        "How long jobs usually take",
        "What's included / not included",
        "FAQ",
        "CTA",
        "Footer",
      ],
    },
    gallery: {
      purpose: "Build trust by showing visible proof.",
      sections: [
        "Hero",
        "Filter by service type",
        "Repair gallery",
        "Patch + paint gallery",
        "Garage gallery",
        "Basement gallery",
        "Short captions / scope summaries",
        "CTA",
        "Footer",
      ],
    },
    about: {
      purpose: "Build trust and explain the company's focused positioning.",
      sections: [
        "Hero",
        "Who we help",
        "What makes us different",
        "Why focused beats broad",
        "Local Cochrane positioning",
        "Values / work style",
        "CTA",
        "Footer",
      ],
    },
    contact: {
      purpose: "Make it easy to take the next step.",
      sections: [
        "Hero",
        "Short reassurance copy",
        "Quote form",
        "Photo upload",
        "Preferred contact method",
        "Service area note",
        "What happens next",
        "CTA / submit",
        "Footer",
      ],
    },
  },
} as const;

export type PageKey = keyof typeof SITE_STRUCTURE.pages;
