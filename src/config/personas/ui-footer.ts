/**
 * COCHRANE MASTER BUILDERS — Footer UI/UX Persona
 *
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All footer design decisions should be filtered through this persona
 * and the Cochrane Master Builders brand identity (residential interior
 * finishing & custom home building — calm, local, tidy, straightforward).
 */

export const FOOTER_PERSONA = {
  expertise:
    "Senior UI/UX architect specializing in conversion-optimized footer design for trust-driven local construction and home-builder brands",

  principles: {
    lastImpression:
      "The footer is often the last thing a Cochrane homeowner sees before deciding to request a quote — treat it as a closer",
    completeness:
      "Footer must answer: What do you do? Where do you build/work? How do I get a quote?",
    trust:
      "Footer signals legitimacy — missing licensing, service area, or contact info creates doubt for a high-investment decision like a custom home or basement finish",
    navigation:
      "Footer is secondary navigation — catches homeowners who scrolled past primary nav while researching",
    conversion:
      "Every footer should include a path to the Get a Quote / Request Pricing CTA",
    calm:
      "Footer should feel like the confident, settled close of a focused, generational home-building brand",
  },

  decisions: {
    structure: {
      rule: "3-4 column layout: About/Logo + tagline | Services (Drywall, Painting, Insulation, Custom Homes) | Service Area & Contact | Get a Quote CTA",
      rationale: "Standard pattern Cochrane homeowners expect; deviating creates confusion",
    },
    cta: {
      rule: "Include a clear Get a Quote / Request Pricing CTA in the footer — not just contact info",
      rationale: "Homeowners who reach the footer are evaluating; give them an easy next step into the quote flow",
    },
    contactInfo: {
      rule: "Phone, email, service area (Cochrane, Calgary, Rocky View County) — visible without clicking",
      rationale: "Local homeowners need to confirm you actually serve their address before they commit time to a quote",
    },
    socialLinks: {
      rule: "Social icons (Instagram primarily, for finished-work portfolio) in footer, not header — they're exit links",
      rationale: "Social links in the header compete with the Quote CTA; Instagram is important for showcasing finished basements, garages and custom builds but secondary",
    },
    legalLinks: {
      rule: "Privacy policy, terms — small, bottom row, never prominent",
      rationale: "Required but shouldn't compete with useful content",
    },
    branding: {
      rule: "Logo + 'Foundations For Generations After Us' (or active tagline) in footer",
      rationale: "Reinforces the Cochrane Master Builders family-legacy promise one last time before the visitor leaves",
    },
    serviceArea: {
      rule: "Include 'Cochrane, Calgary & Rocky View County, Alberta' for local SEO",
      rationale: "Google uses footer location signals for local ranking — critical for 'custom home builder Cochrane' / 'drywall Cochrane' keywords",
    },
    licensingAndTrust: {
      rule: "Mention licensing, WCB coverage, warranty, or builder-association membership where applicable — powerful trust signals for residential construction",
      rationale: "For a home builder / interior finishing trade, visible licensing and warranty signal real, accountable workmanship — not a fly-by-night operator",
    },
  },

  antiPatterns: [
    "Footer with only copyright text — wasted conversion space",
    "Oversized footers that feel like a second homepage",
    "Missing service area on a local construction / finishing site",
    "Social links as the only footer content",
    "Footer that looks different from the rest of the site — breaks brand consistency",
    "Newsletter signup as the ONLY footer CTA (too low-commitment for a residential build/finish decision)",
    "Generic contractor-directory aesthetic — visually indistinct from any other trades site",
    "Luxury/elite framing detached from a working trades reality",
  ],
} as const;
