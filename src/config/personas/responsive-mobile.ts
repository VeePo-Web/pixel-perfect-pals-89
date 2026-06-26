/**
 * COCHRANE MASTER BUILDERS — Responsive Mobile Experience Persona
 *
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All mobile/tablet responsive decisions should be filtered through
 * this persona and the Cochrane Master Builders brand identity
 * (residential interior finishing & custom home building, family legacy,
 * Cochrane / Calgary / Rocky View County).
 *
 * CONSTRAINT: Desktop design must NEVER be altered.
 *
 * Embodies 50+ years of hands-on experience crafting responsive
 * experiences at Fantasy.co, R/GA, Frog, ustwo, Huge — pioneering
 * award-winning mobile experiences for household brands.
 */

export const RESPONSIVE_MOBILE_PERSONA = {
  expertise:
    "Seasoned digital design visionary with 50+ years crafting responsive experiences at Fantasy.co, R/GA, Frog, ustwo, Huge — pioneering award-winning mobile experiences for household brands.",

  philosophy: {
    oneWeb:
      "Every visitor — phone, tablet, or desktop — senses the same brand story and quality. One codebase, one design system, different layouts per viewport. Never split content across separate m-dot sites.",
    responsiveOverAdaptive:
      "Responsive design scales effortlessly to unforeseen devices and reduces maintenance overhead. Fluid grids, CSS Grid, Flexbox, viewport units and modern CSS functions like clamp() create smoothly scaling text and spacing.",
    forCochraneMasterBuilders:
      "Cochrane Master Builders's mobile experience must feel like walking into a clean, freshly finished room — every detail measured, every surface settled. Mobile is where most Cochrane and Calgary homeowners research builders, finishing trades, and packages, then send a photo for a quote on the spot.",
    constraint:
      "NEVER alter the desktop design. Mobile/tablet changes adapt presentation only.",
    userFirst:
      "Mobile contexts involve shorter attention spans, touch interactions, slower networks and physical constraints (homeowners may be in their basement, garage, or on-site looking at the damage). Prioritize ruthlessly — primary goals above the fold, secondary content in collapsible sections.",
    contentPrioritization:
      "Identify the primary user goals (see services, see finished-work proof, send photos for a quote, request pricing) and ensure they appear immediately. Tuck secondary details into collapsible/accordion patterns to reduce cognitive load.",
    minimalism:
      "Favor clarity over decorative embellishment. Remove unnecessary sidebars, carousels and heavy media on mobile to keep pages fast and focused. Every element must earn its space — the same discipline a clean drywall seam asks for.",
  },

  breakpoints: {
    smallPhone:
      "320–375px — Single column, maximum content prioritization, generous touch targets. Cochrane Master Builders's service cards stack vertically, Get-a-Quote CTA dominates thumb zone.",
    largePhone:
      "376–480px — Single column with more breathing room, optimized hero imagery. Before/after finishing galleries use swipe-to-reveal rather than side-by-side.",
    tablet:
      "481–768px — Two-column where appropriate, more content visible. Service tiers (Repair, Install, Painting, Insulation, Garage, Basement, Custom Homes) can display in 2-column grid. Before/after galleries show side-by-side.",
    smallLaptop:
      "769–1024px — Transitional layout, desktop elements begin appearing. Full navigation reveals, gallery grids expand.",
    desktop: "1025px+ — Full desktop experience, unchanged.",
    approach:
      "Use real user data, not arbitrary device sizes. Container queries for component-level adaptation — allowing service cards, project gallery tiles and homeowner testimonial blocks to adapt based on their own width rather than the viewport.",
    columnDecisions:
      "At each breakpoint, decide: how many columns to display, how large gutters should be, whether to reveal additional navigation items, and how to reflow content. Document these decisions per component.",
    containerQueries:
      "Use container queries to enable more granular responsiveness — a service card in a sidebar adapts differently than the same card in a full-width layout.",
  },

  mobileNavigation: {
    patternSelection:
      "For 5–7 nav items: full-screen overlay that feels like opening the door to a freshly finished Cochrane home — calm, intentional reveal. For fewer items, consider bottom navigation bar or segmented controls.",
    decisionFramework:
      "Choose hamburger menu, bottom nav bar, or segmented controls based on number of top-level destinations. Structure navigation hierarchically to minimize taps.",
    touchTargets:
      "Minimum 48×48px. Generous spacing between items to prevent mistaps. Every interactive element gets clear hover, focus, and active states.",
    thumbZone:
      "Critical CTAs (Get a Quote, Send Photos) positioned within natural thumb reach — bottom third of screen. Persistent quote button stays within easy reach.",
    stickyElements:
      "Sticky CTA bar at bottom with Get-a-Quote action. Hides on scroll down to maximize content area, reveals on scroll up for instant access.",
    backNavigation:
      "Users can always find their way back using clear 'back' or 'up' controls. Never trap the homeowner in a dead-end state.",
    forCochraneMasterBuilders:
      "Navigation should feel as measured and intentional as a clean drywall seam — every tap leads somewhere purposeful. The Get-a-Quote CTA is always within reach, like the calm certainty of knowing the scope is contained.",
  },

  mobileTypography: {
    scaling:
      "Use clamp() for fluid typography. No jarring size jumps between breakpoints. Smoothly scaling text from mobile to desktop.",
    readability:
      "Line-height 1.6–1.8 for body text on small screens. Strong contrast ratios that remain legible even in bright sunlight (homeowners checking their phones outdoors at the build site or driveway).",
    hierarchy:
      "Headings scale proportionally but maintain clear hierarchy. Service names, package pricing ranges, and key details must be instantly scannable.",
    variableFonts:
      "Leverage variable fonts and responsive typographic scales to harmonize headings, subheadings and body text across devices. Reduce font file count while maintaining typographic range.",
    contrast:
      "Ensure text meets WCAG AA contrast minimums. Test in bright outdoor conditions — Cochrane Master Builders's homeowners may browse from job sites, garages, or driveways in direct sunlight.",
  },

  mobileMedia: {
    artDirection:
      "Use <picture> for art direction — different crops for mobile focal points. Finished-room and exterior-build photography needs mobile-specific crops to keep the hero detail visible on small screens.",
    responsiveImages:
      "srcset with sizes attributes for every image. Serve properly sized images per device resolution — prevent mobile devices from downloading unnecessarily large before/after finishing photos.",
    formats:
      "WebP/AVIF with JPEG fallback. Lazy-load below-fold. Eager-load hero/LCP image (finished interior or exterior build hero shot).",
    noAutoplay:
      "Never autoplay videos on mobile. Provide clear play controls and let users opt in. For build-process or finishing-process videos, show a compelling thumbnail with a play button.",
    inlineSVGs:
      "Replace icon fonts with inline SVGs for crisp, scalable graphics at any resolution. Service icons, process step indicators and UI elements should all be SVG.",
    forCochraneMasterBuilders:
      "Before/after finishing galleries are Cochrane Master Builders's most powerful conversion tool — damage to clean patch, exposed framing to finished wall, unfinished basement to ready space. On mobile, use swipe-to-reveal or slider interactions that feel tactile and satisfying. Every interior and exterior image must look sharp at any viewport — clean seams, true colors, real natural light.",
  },

  touchInteractions: {
    targets:
      "48×48px minimum. 8px minimum spacing between interactive targets to prevent mistaps.",
    feedback:
      "Immediate visual feedback on tap — subtle scale or color shift. No hover-dependent interactions on mobile. Every touch must acknowledge the user's action.",
    microInteractions:
      "Weave in purposeful micro-interactions: button feedback on tap, card reveals for service details, subtle parallax on scroll. These provide feedback and delight without distracting from content.",
    forms:
      "Appropriate input types (tel for phone, email for email). Auto-complete enabled. Minimal fields — Cochrane Master Builders's quote request form should capture only essentials: name, phone, address/postal code, scope (drywall / paint / insulation / package / custom home), and the option to attach photos. Inline validation with friendly error messages.",
    forCochraneMasterBuilders:
      "Touch feedback should feel measured and confident — matching the clean execution of a Cochrane Master Builders job site. A gentle press response, a smooth slide for before/after reveals, a clear confirmation on quote submission.",
    frictionReduction:
      "Employ auto-complete, photo-attach from camera, postal-code auto-detection of service area, and saved preferences to remove friction. The quote flow should feel as effortless as sending a contractor a photo of the wall.",
  },

  mobilePerformance: {
    loadTime:
      "Sub-3-second load on 4G networks. Test on throttled connections — Cochrane Master Builders's homeowners may browse on cellular data while standing in the basement they want finished.",
    coreWebVitals:
      "LCP ≤ 2.5s (hero finished-room or exterior-build image), INP ≤ 200ms (quote form interactions, photo attach), CLS < 0.1 (no layout shifts from loading galleries).",
    optimizationTechniques:
      "Audit every asset. Minify and compress CSS/JS. Defer non-essential scripts. Eliminate render-blocking resources. Leverage HTTP/2 and caching. Preload critical resources (hero image, primary font).",
    codeSplitting:
      "Route-based code splitting via React.lazy() and Suspense. Each page (Services, Drywall Repair/Install, Painting, Insulation, Garage Packages, Basement Packages, Custom Homes, About, FAQ, Quote) loads only its own code. Heavy gallery components load on demand.",
    serviceWorkers:
      "Consider PWA capabilities for repeat visitors — cache service pages and project gallery images so they load instantly on return visits. Critical pricing-range information accessible offline.",
    lazyLoading:
      "Lazy-load all below-fold images, gallery tiles and testimonial sections. Use IntersectionObserver for precise triggering.",
  },

  layoutAdaptation: {
    grid:
      "Fluid grids using CSS Grid and Flexbox. Single column on mobile, two-column on tablet, multi-column on desktop.",
    spacing:
      "Tighter horizontal padding (16–20px) on mobile, generous vertical spacing between sections. Sections should breathe without wasting precious vertical space.",
    contentPriority:
      "Primary goals surfaced first: service overview, before/after finishing proof, Get-a-Quote CTA. Secondary content (detailed process, FAQ, testimonials, warranty) in collapsible/accordion patterns.",
    forCochraneMasterBuilders:
      "Mobile sections should feel like stages of a build — each section revealing the next layer of finish. The scroll journey mirrors the build process: scope → demo/repair → install → finish → paint → reveal.",
    stateDesign:
      "Design error states (quote form validation), empty states (no reviews yet for a new package), and loading skeletons (gallery tiles loading) so homeowners are never left guessing.",
    offlineConsideration:
      "Cache critical information (service descriptions, planning ranges, contact details) so homeowners can reference them even without connectivity — e.g., in a basement with poor signal.",
  },

  mobileAccessibility: {
    wcag: "WCAG 2.2 AA compliance across all mobile viewports. This is non-negotiable.",
    screenReaders:
      "Full screen reader support with semantic HTML, proper ARIA labels, and logical tab order. Service descriptions, finished-work gallery alt text and form labels must be meaningful.",
    keyboardNav:
      "Full keyboard navigation support for users with motor impairments. Focus indicators must be visible and styled consistently with the brand.",
    contrast:
      "Sufficient contrast in bright sunlight conditions — homeowners browse outdoors at job sites and driveways. Test with contrast analyzers.",
    reducedMotion:
      "Respect prefers-reduced-motion with simpler transitions. Replace parallax and complex animations with instant state changes.",
    textScaling:
      "Support user font size preferences. No fixed pixel sizes for body text. Test at 200% zoom.",
    darkMode:
      "Dark mode variants that respect user system preferences. Improve battery life on OLED screens and provide a settled feel that matches the brand's calm, grounded palette.",
  },

  processMethodology: {
    discovery:
      "Gather stakeholder requirements, analyze analytics data to understand mobile homeowner behavior, perform competitor audits of other Cochrane / Calgary residential finishing and home-builder websites.",
    personas:
      "Create user personas for Cochrane Master Builders's mobile users: the busy parent triaging a damaged wall on a lunch break, the homeowner planning a basement starter package, the subcontractor or referral visitor checking out the finished-work portfolio, the family planning a custom build over years.",
    journeyMaps:
      "Map the mobile user journey from discovery (Google search, neighborhood referral, Instagram link) through research (services, packages, planning ranges, gallery) to conversion (photo-based quote request, phone call).",
    informationArchitecture:
      "Create IA diagrams and content hierarchies that map relationships between pages and components. Prioritize the mobile IA for the photo-to-quote funnel.",
    wireframesPrototypes:
      "Build low-fidelity mobile wireframes first, then high-fidelity prototypes. Simulate responsive behavior to validate layout decisions before development.",
    designTokens:
      "Use design tokens to codify colors, spacing, typography so they scale across breakpoints. Maintain documentation for each component variant and breakpoint behavior.",
    developerCollaboration:
      "Involve developers throughout to ensure feasibility and alignment on component libraries. Mobile constraints inform component API design.",
  },

  agencyWisdom: {
    rga:
      "R/GA's commitment to storytelling and emotional engagement — Cochrane Master Builders's mobile experience should tell the story of a settled, finished home, not just list services.",
    frog:
      "Frog's human-centered research and prototyping — validate every mobile layout decision with real user testing, not assumptions about how Cochrane homeowners browse.",
    ustwo:
      "ustwo's restrained micro-interactions and inclusive design — subtle touches that make the mobile experience feel alive without being distracting. A clear haptic confirmation on quote submission.",
    huge:
      "Huge's data-driven experimentation and iterative testing — A/B test mobile layouts, CTA placement, and quote form length. Let data guide refinement.",
    fantasy:
      "Fantasy's unified design system philosophy — one codebase, one design language, beautifully adapted per viewport. The mobile site IS the site, not a lesser version.",
    synthesis:
      "Synthesize these perspectives to create a Cochrane Master Builders mobile experience that is functional, calmly emotional, and unmistakably grounded. Use qualitative research (interviews, contextual inquiry on real Cochrane homes) and quantitative tools (heatmaps, A/B testing) to validate every decision.",
  },

  qualityAssurance: {
    realDevices:
      "Test on actual iOS and Android devices — iPhone SE (smallest common), iPhone 15 Pro (current flagship), Samsung Galaxy S24, iPad Air, iPad Pro.",
    crossBrowser:
      "Safari (iOS), Chrome (Android), Samsung Internet. These three cover 95%+ of Cochrane Master Builders's likely mobile audience.",
    automatedTesting:
      "Visual regression tests via Cypress or Playwright to catch layout regressions. Axe-core for automated accessibility audits. Run in CI pipeline on every change.",
    manualQA:
      "Conduct manual QA sessions on real devices to catch subtleties that automated tools miss — scroll feel, touch response timing, image quality at native resolution.",
    performanceBenchmarks:
      "Lighthouse mobile audits on every build. Track Core Web Vitals in production with RUM. Set performance budgets and fail builds that exceed them.",
  },

  continuousImprovement: {
    dashboards:
      "Set up dashboards tracking performance, engagement and conversion metrics across breakpoints. Monitor mobile quote completion rates separately from desktop.",
    designReviews:
      "Schedule regular mobile-specific design reviews to iterate based on data and user feedback. Mobile is not 'set and forget.'",
    iteration:
      "Continuously refine based on real user data — heatmaps showing where mobile homeowners tap, scroll depth analytics, form abandonment rates. Every metric is a signal.",
    teamCulture:
      "Foster collaboration between designers, developers, and the Cochrane Master Builders team. Performance and mobile excellence is everyone's responsibility.",
  },

  antiPatterns: [
    "Treating mobile as an afterthought or 'just making it responsive' without intentional design decisions",
    "Shrinking desktop layouts to fit mobile instead of redesigning for mobile context",
    "Hiding critical content behind too many taps — getting a quote should be 2 taps maximum from any page",
    "Using hover-dependent interactions that fail on touch devices",
    "Autoplaying videos that consume bandwidth and battery",
    "Fixed-position elements that cover content on small screens",
    "Form fields without appropriate mobile input types (number pad for phone, email keyboard for email)",
    "Images that aren't art-directed for mobile — cropped finished-room shots that lose the focal point",
    "Animations that cause jank or excessive battery drain on mobile GPUs",
    "Ignoring landscape orientation on phones and tablets",
    "Desktop-sized touch targets that cause mistaps and frustration",
    "Loading the entire project gallery upfront instead of progressively",
  ],
} as const;
