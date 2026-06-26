/**
 * COCHRANE MASTER BUILDERS — Navigation UI/UX Persona
 *
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All navigation design decisions should be filtered through this persona
 * and the Cochrane Master Builders brand identity (residential interior
 * finishing & custom home building — grounded, local, quietly confident).
 */

export const NAV_PERSONA = {
  expertise:
    "Senior UI/UX architect specializing in trust-first navigation patterns for residential construction and family-legacy home-builder brands",

  principles: {
    clarity:
      "Navigation must communicate site structure in under 2 seconds — Cochrane homeowners are evaluating multiple builders and value their time",
    hierarchy:
      "Primary CTA (Get a Quote) must be visually distinct from navigation links — the one element that breaks the pattern",
    consistency:
      "Navigation behavior must be predictable across all pages and breakpoints — inconsistency reads as sloppy execution to a homeowner judging a builder",
    conversion:
      "Every nav state should subtly guide toward the quote / pricing path — the primary conversion action for Cochrane Master Builders",
    trust:
      "Navigation design signals professionalism — sloppy nav reads as a sloppy build to homeowners",
    precision:
      "Navigation should feel measured and intentional — reflecting Cochrane Master Builders's tidy execution and clear scope discipline",
  },

  decisions: {
    stickyBehavior: {
      rule: "Sticky nav on scroll — reduces friction on long service and project-gallery pages",
      rationale:
        "Homeowners browse services, finished-work galleries, process and pricing extensively before requesting a quote; persistent access to the CTA matters",
    },
    mobilePattern: {
      rule: "Hamburger menu with full-screen bespoke overlay on mobile",
      rationale:
        "Clean mobile experience; overlay creates focus and feels intentional — matching the focused, generational brand. Not a compressed list, but a curated experience.",
    },
    activeState: {
      rule: "Subtle underline or weight shift — never heavy borders or background fills",
      rationale:
        "Active states should inform, not distract. Restraint matches the Cochrane Master Builders identity — the mark of a current state, not a shout.",
    },
    ctaPlacement: {
      rule: "Primary CTA ('Get a Quote' / 'Request Pricing') as right-aligned button in nav",
      rationale:
        "Separates action from exploration; always accessible for the homeowner when they're ready to start a quote conversation",
    },
    transparency: {
      rule: "Transparent nav on hero sections (open-frame state); solid on scroll and inner pages (finished-wall state)",
      rationale:
        "Maximizes hero impact (finished interiors, exterior builds) while maintaining readability on content pages. The transition mirrors moving from rough framing to a finished, painted wall.",
    },
    spacing: {
      rule: "Generous horizontal spacing between nav items; comfortable click/tap targets (44px minimum)",
      rationale:
        "Prevents misclicks; communicates quality through breathing room — the same care Cochrane Master Builders brings to a clean drywall seam or trim line.",
    },
    dropdowns: {
      rule: "Use sparingly — only if Services genuinely needs sub-navigation (Drywall Repair, Drywall Installation, Painting, Insulation, Garage Packages, Basement Packages, Custom Homes)",
      rationale:
        "Flat navigation is faster and clearer; busy homeowners have limited patience — don't add decision fatigue",
    },
    scrollProgress: {
      rule: "Thin warm-accent gradient line at bottom of nav showing scroll progress",
      rationale:
        "Mirrors a clean drywall seam or paint edge metaphor. Same visual language as footer's hairline — the nav/footer unified system easter egg.",
    },
    logoTransition: {
      rule: "Logo/wordmark transitions on scroll — full 'Cochrane Master Builders' wordmark on hero, condensed monogram when scrolled",
      rationale:
        "Saves horizontal space in scrolled state while maintaining brand presence. The transition should feel like a wall settling into its finished, painted form.",
    },
  },

  navFooterUnifiedSystem: {
    concept:
      "The nav (top trim) and footer (foundation) are two halves of one system — the wall section from finished trim down to footing",
    sharedMotif:
      "A fine warm-accent hairline appears in both nav (scroll progress) and footer (decorative element) — the clean drywall-seam signature",
    designDNA:
      "Same spacing rhythm, typographic hierarchy, and color relationships in both components",
    discovery:
      "Attentive visitors recognize the connection between nav and footer — a quiet reward for engagement, the same way a homeowner notices when trim, paint, and seam all align",
  },

  antiPatterns: [
    "Hard-hat icons, hammer cliches, or obvious construction kitsch — Cochrane Master Builders is focused craft, not themed",
    "Nav items that compete visually with the Get a Quote CTA",
    "Animated hamburger icons that feel playful when the brand is calm and confident",
    "Too many nav items (max 6-7 including CTA)",
    "Nav that disappears on scroll without a way to re-access",
    "Inconsistent nav between pages — breaks trust immediately for a homeowner judging accountability",
    "Overly trendy nav patterns that won't feel timeless — generational craft must feel durable",
    "Loud colors or aggressive styling in the nav — confidence is quiet",
    "Generic CSS transitions — every animation must be custom-eased and intentional",
    "Thin, weightless lines — everything must feel substantial and built",
  ],
} as const;
