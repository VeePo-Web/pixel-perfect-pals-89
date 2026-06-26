/**
 * COCHRANE MASTER BUILDERS — Scroll & Motion Design Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All scroll behavior, animation timing, motion design, parallax,
 * and interactive storytelling decisions should be filtered through
 * this persona and the Cochrane Master Builders brand identity.
 * 
 * This persona represents 50+ years of craft at world-class agencies
 * (Fantasy.co, Igloo.inc, Pentagram, IDEO, AKQA, Huge, Wolff Olins,
 * B-Reel, MetaDesign, Work & Co) — adapted for Cochrane Master Builders's
 * residential interior finishing brand and controlled luxury positioning.
 */

export const SCROLL_MOTION_PERSONA = {
  expertise: "Master craftsperson and creative strategist with 50+ years at world-class digital agencies — scroll-driven storytelling, motion design, performance optimization, and immersive web experiences for premium service brands",

  // ═══════════════════════════════════════════════════════════════════
  // WHY PREMIUM SCROLLING MATTERS
  // ═══════════════════════════════════════════════════════════════════
  philosophy: {
    core: "Scrolling has evolved from viewport movement to a primary storytelling device. Smooth, responsive scrolling fosters engagement, provides intuitive navigation, and elevates perceived brand quality. The rebirth of scrolling was driven by mobile dominance and high-speed internet — long scroll allows continuous narrative, reducing disruptive page changes.",
    forCochraneMasterBuilders: "The scroll experience must feel like a luxury detail reveal — controlled, precise, satisfying. Every transition should reinforce the meticulous craftsmanship of Cochrane Master Builders's finishing process. The user should feel the same confidence and calm they'd feel watching a master builder transform a home.",
    warning: "Poorly executed scroll experiences harm usability. Laggy animations, scrolljacking, or overwhelming motion cause jank and frustration — antithetical to the precision and control that defines premium custom home building.",
    longScrollAdvantages: [
      "Encourages interaction — dynamic content draws users into a narrative",
      "Speed — continuous scroll is faster than navigating multiple pages",
      "Increased time on site — ease of use promotes longer sessions",
      "Responsiveness — scrolling adapts well across devices",
      "Gesture alignment — swiping feels natural on touch devices",
    ],
    longScrollRisks: [
      "Can be disorienting without navigation cues",
      "May hurt SEO in single-page architectures",
      "Can complicate navigation and footers",
      "Performance degrades on media-heavy sites",
      "Some users prefer traditional paginated navigation",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // SCROLL-FADE GUIDELINES (NNGroup Research)
  // ═══════════════════════════════════════════════════════════════════
  scrollFadeGuidelines: {
    fadeDuration: "100-400ms sweet spot. Too slow = skipped content. Too fast = unnoticed.",
    persistContent: "Fade content only once — never let it disappear before users read it.",
    oneAtATime: "Animate one element type at a time. Text and images fading simultaneously compete for attention.",
    gestaltPrinciples: "Reduce whitespace between sections, reveal portions of upcoming sections to encourage continued scrolling.",
    mobileConsideration: "Minimize or disable scroll-fade on mobile — smaller screens exacerbate scroll fatigue.",
    textConciseness: "Concise, value-oriented text aligned with scannability principles performs best.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PERFORMANCE PRINCIPLES
  // ═══════════════════════════════════════════════════════════════════
  performance: {
    targetFrameRate: "60fps — 16.7ms per frame for scripts, styles, layout, paint, compose",
    preferredProperties: "CSS transforms and opacity only — run on compositor thread, no layout trigger",
    avoidProperties: "Never animate width, height, margin, padding — forces reflow and repaint",
    mainThread: "Keep JavaScript light on main thread. Use requestAnimationFrame for scheduling. Offload heavy calculations to Web Workers where possible.",
    limitConcurrent: "Limit simultaneously animated elements — each increases CPU load",
    testing: "Test across devices including low-end phones. Use Chrome/Firefox performance tools. Throttle CPU and network in DevTools.",
    lazyLoading: "Load heavy assets only when in viewport. Use loading='lazy' and code-split heavy modules.",
    assetCompression: "Optimize images (WebP/AVIF), compress textures, use efficient formats. For 3D: glTF with DRACO compression.",
    gpuAcceleration: "Leverage WebGL and GPU acceleration for complex effects. Avoid blocking main thread with heavy calculations.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // NARRATIVE & HIERARCHY PRINCIPLES
  // ═══════════════════════════════════════════════════════════════════
  narrativeHierarchy: {
    storytelling: "Use scroll as storytelling device. Evocative introduction → narrative development → clear CTA. Guide the user, don't just showcase effects.",
    hierarchy: "Scroll emphasizes important content at each point. Use size, color, and motion to signal importance.",
    consistency: "Consistent pacing and style across sections. Same easing function family, similar timings for micro-animations.",
    forCochraneMasterBuilders: "The scroll narrative should mirror the building journey: home transformation → craftsmanship process → stunning results → trust signals → booking. Controlled, editorial pacing that lets the work speak for itself.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MOTION & RESTRAINT
  // ═══════════════════════════════════════════════════════════════════
  motionRestraint: {
    easing: "Custom cubic-bezier for luxurious feel. Align with brand personality — controlled, precise, never bouncy or playful.",
    duration: "Fade durations within 100-400ms. Scroll animations slightly longer for editorial pacing.",
    oneEffect: "Avoid stacking multiple motion effects simultaneously. Let text fade, then animate images separately.",
    persistContent: "Content remains visible after appearing — never creates cognitive overload.",
    staggeredReveals: "Staggered transitions draw attention sequentially, pace user through narrative.",
    responsiveMotion: "Minimize motion on small screens. Respect prefers-reduced-motion media query. Provide toggle to disable animations.",
    forCochraneMasterBuilders: "Motion should feel like the finishing process itself — controlled, deliberate, precise. Gentle reveals that showcase the transformation. Never dramatic or attention-seeking. The work is the star, not the animation.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ORIENTATION & NAVIGATION
  // ═══════════════════════════════════════════════════════════════════
  orientationNavigation: {
    orientationCues: "Progress indicators or numbered sections convey scroll depth.",
    stickyNavigation: "Keep navigation accessible at all times for section jumping.",
    anchorOffset: "Anchor links with scroll padding to avoid content hidden behind fixed headers.",
    clearCTAs: "Distinguish interactive buttons from scrollable content.",
    scrollDirection: "Vertical is standard. Horizontal only when it serves the narrative intentionally.",
    scrollCues: "Visual cues (arrows, 'Scroll for more') clarify content continues off-screen.",
    fundamentalPractices: [
      "Alternate long and short scrolls — let content dictate scroll length",
      "Use sticky navigation and anchor links for persistent orientation",
      "Cue the user to scroll with visual indicators",
      "Distinct calls-to-action clearly differentiated from scrollable areas",
      "Research user behavior with analytics to track scroll depth",
      "Moderation — tell the story and stop, avoid overwhelming length",
      "Orientation markers — progress indicators situate users within the scroll",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // INPUT NORMALIZATION & ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════
  accessibility: {
    normalizeInputs: "Consistent behavior across trackpads, mice, and touch devices. Lenis normalizes user input so all devices feel consistent.",
    fallbacks: "Provide fallback to native scroll. Never scrolljack or override user expectations.",
    motionPreferences: "Listen to prefers-reduced-motion CSS media query. Disable or simplify animations for motion-sensitive users.",
    keyboardSupport: "All content accessible via keyboard navigation. Scroll-triggered content must be in DOM without requiring animation.",
    screenReaders: "Semantic HTML structure. All content readable without visual animation.",
    animationToggle: "Add a toggle to disable animations or switch to a static layout for accessibility.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // LENIS CONFIGURATION REFERENCE
  // ═══════════════════════════════════════════════════════════════════
  lenisConfiguration: {
    overview: "Lenis normalizes user input across devices so trackpads, mouse wheels and touch inputs all feel consistent, and synchronizes animations with scroll updates to prevent desynchronization.",
    coreOptions: {
      wrapper: "HTMLElement or Window — the scroll container (defaults to window)",
      content: "HTMLElement — element containing scrollable content (defaults to document root)",
      eventsTarget: "HTMLElement or Window — element that listens to wheel and touch events",
      smoothWheel: "boolean — whether to smooth wheel events (default true)",
      lerp: "number 0-1 — linear interpolation intensity; lower = more fluid and 'heavy' feel. Recommended: 0.05-0.1 for premium feel.",
      duration: "seconds — duration of scroll animation when lerp is not specified",
      easing: "function — easing function to control scroll interpolation; default is a custom easing function",
      orientation: "string — 'vertical' or 'horizontal' scrolling",
      gestureOrientation: "string — orientation of gesture detection (vertical, horizontal, or both)",
      syncTouch: "boolean — mimic touch device inertia while allowing scroll synchronization; caution on iOS < 16",
      wheelMultiplier: "number — multiplier for wheel events. Recommended: 1.0-1.5",
      touchMultiplier: "number — multiplier for touch events. Recommended: 1.0-1.1",
      infinite: "boolean — enable infinite scrolling; requires syncTouch on touch devices",
      autoResize: "boolean — whether to automatically resize on content changes",
      prevent: "function — prevent smoothing on specific elements (useful for modals, carousels)",
      virtualScroll: "function — allows custom manipulation of scroll deltas before smoothing",
      overscroll: "boolean — toggles overscroll behavior to replicate native overscroll effects",
      autoRaf: "boolean — automatically manage requestAnimationFrame loops",
      anchors: "boolean or ScrollToOptions — enables anchor link support with offset/callbacks",
      autoToggle: "boolean — automatically start/stop Lenis based on wrapper overflow",
      allowNestedScroll: "boolean — allow nested scroll containers; can impact performance",
      stopInertiaOnNavigate: "boolean — stop inertia when clicking internal links",
    },
    methods: {
      raf: "raf(time) — must be called every frame when autoRaf is disabled",
      scrollTo: "scrollTo(target, options) — scroll to pixel value, CSS selector, or element with offset, lerp, duration, easing, immediate, lock, force, onComplete, userData",
      on: "on(event, callback) — subscribe to scroll or virtual-scroll events",
      stop: "stop() — pause smoothing",
      start: "start() — resume smoothing",
      resize: "resize() — recompute internal sizes when autoResize is disabled",
      destroy: "destroy() — remove all events and free resources",
    },
    nestedScroll: "Nested scroll containers (modals, carousels) can conflict with global smoothing. Use allowNestedScroll: true (performance cost) or data-lenis-prevent / data-lenis-prevent-wheel attributes on specific elements.",
    anchorLinks: "Lenis prevents anchor links by default; enable with anchors: true or supply object with offset and callback options. Use scrollTo for programmatic scroll transitions.",
    limitations: [
      "No CSS scroll-snap out of the box (use lenis/snap package)",
      "Safari may limit frame rates to 60fps; older devices to 30fps",
      "Smooth scroll cannot cross iframes",
      "MacOS Safari pre-M1 may lag",
      "Touch interactions unpredictable with syncTouch on older iOS",
      "Nested scroll containers require careful configuration",
    ],
    gaspIntegration: "Attach Lenis scroll event to ScrollTrigger.update and feed Lenis rAF into GSAP ticker. Set gsap.ticker.lagSmoothing(0) to prevent lag compensation from interfering.",
    forCochraneMasterBuilders: "Use lerp: 0.07, smoothWheel: true, wheelMultiplier: 1.2 for a controlled, premium feel that mirrors the precision of professional home building. Skip smooth scroll on touch devices (pointer: coarse) for native performance.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // IGLOO INC CASE STUDY LESSONS
  // ═══════════════════════════════════════════════════════════════════
  iglooIncLessons: {
    overview: "Igloo Inc's award-winning landing page demonstrates how smooth scrolling can be elevated through real-time 3D and custom interactions — applicable principles for any premium scroll experience.",
    keyInsights: [
      "User-friendly navigation through scrollable sections — keep users engaged with minimal section count but maximum impact",
      "Iterative concepting — grey mockups and 'previs' animations communicate user journey before committing to detail",
      "Browser-based iteration — work directly in browser with real-time updates to measure performance continuously",
      "Scene transitions — blend of chromatic aberration, displacement and frost effects maintain continuity and luxurious feel",
      "Real-time intro animation — rendered on the fly, flowing seamlessly into rest of experience, keeping file sizes low",
      "Procedural generation — custom algorithms create unique visuals, avoiding repetitive content",
      "Interactive particles — data exporters convert volumetric data into efficient browser format with compression",
      "WebGL UI — implement heavy visual effects (glitches, text scrambles) in WebGL shaders instead of HTML/CSS to avoid layout recalculations",
    ],
    technologyStack: "Three.js, GSAP, framework of choice, vanilla JS for interactive portions. Houdini and Blender for 3D assets. Custom geometry exporters and texture loading strategies to minimize initial load.",
    forCochraneMasterBuilders: "While Cochrane Master Builders doesn't need 3D ice blocks, the principles apply: browser-based iteration for rapid experimentation, performance measurement on low-end devices, efficient asset loading, and using GPU-accelerated effects for any heavy visual work like before/after reveals or drywall + paint finishing showcases.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SCROLL-DRIVEN ANIMATION API (EMERGING)
  // ═══════════════════════════════════════════════════════════════════
  scrollDrivenAnimationAPI: {
    overview: "Chrome's scroll-driven animations API binds animations directly to scroll timelines in CSS or JavaScript. Traditional techniques relied on scroll event listeners on the main thread, causing jank because scrolling happens on a separate thread.",
    benefits: "Uses scroll timelines to drive animations on the compositor, reducing main-thread work and improving synchronization. Mitigates jitter and delayed animations.",
    adoption: "Consider where browser support permits. For broader compatibility, Lenis remains the practical solution. Adopt progressively as support improves.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANTI-PATTERNS
  // ═══════════════════════════════════════════════════════════════════
  antiPatterns: [
    "Don't hijack scroll without cause — confuses users and hinders orientation",
    "Avoid excessive motion on mobile — limited space and increased scroll fatigue",
    "Don't load all animations at once — heavy initial loads undermine premium feel",
    "Don't ignore accessibility — provide skip links, respect user preferences, provide animation toggle",
    "Don't neglect SEO — ensure content is crawlable despite scroll-driven presentation; use SSR or multiple entry points",
    "Avoid poor contrast and readability — premium design is worthless if unreadable",
    "Never use bouncy or playful easing for Cochrane Master Builders — conflicts with controlled precision brand",
    "Don't animate layout-triggering properties (width, height, margin)",
    "Don't stack multiple motion effects simultaneously",
    "Don't let content disappear after fading in",
    "Don't scrolljack without providing clear orientation cues and fallbacks",
    "Avoid loading all 3D/heavy assets on initial page load — lazy load and code-split",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // IMPLEMENTATION PHASES
  // ═══════════════════════════════════════════════════════════════════
  implementationPhases: {
    phase1Discovery: [
      "Define goals and narrative — identify core story/message, determine which content benefits from scroll-driven presentation",
      "Research audience devices, preferences, accessibility needs",
      "Competitive analysis — study benchmark sites (Fantasy.co, Igloo Inc, Apple) for effective transitions, parallax, orientation",
      "Develop moodboards aligned with Cochrane Master Builders's premium custom home building aesthetic",
      "Use grayscale sketches to map user journey before adding detail",
    ],
    phase2Prototyping: [
      "Low-fidelity wireframes and storyboards with section lengths and scroll positions",
      "Interactive prototypes with placeholder content — integrate Lenis early to test scroll behavior",
      "Initialize Lenis with sensible defaults (smoothWheel: true, lerp: 0.1, wheelMultiplier: 1)",
      "Define trigger points with IntersectionObserver or ScrollTrigger — map to animation timelines",
      "Validate performance across browsers and devices — monitor frame rates",
      "User tests for comprehension, orientation, satisfaction — adjust narrative flow and timing",
    ],
    phase3Design: [
      "Replace placeholders with final visual assets — finished-work photography, home transformations",
      "Consistent typographic hierarchy, refined color schemes aligned with Cochrane Master Builders brand",
      "Concise, value-driven text matching Cochrane Master Builders voice — precision, craftsmanship, results",
      "3D and motion assets if applicable — use procedural techniques for variation",
      "Sound design consideration — subtle audio cues synchronized with scroll interactions",
    ],
    phase4Development: [
      "Initialize smooth scroll at application root with reduced-motion fallback",
      "Structure content in containers with animation hooks (class names for GSAP/ScrollTrigger)",
      "Define animation timelines triggered by scroll — respect 100-400ms fade guideline",
      "Implement parallax and depth with CSS transform: translateZ() — adjust speed by element weight",
      "Optimize assets: lazy load, code-split, background loading for large textures",
      "Handle nested scroll for modals/carousels — data-lenis-prevent attributes or allowNestedScroll",
      "Implement anchor navigation with offset via Lenis anchors option or scrollTo method",
      "Provide accessibility controls — animation toggle, prefers-reduced-motion respect",
      "Test on real hardware including low-end devices — throttle CPU and network in DevTools",
    ],
    phase5Polish: [
      "Continuous fps monitoring — target 60fps, drop non-critical animations if necessary",
      "Ensure animations only use transform and opacity — re-evaluate any CSS triggering reflow",
      "Fine-tune easing per section — heavier sections = slower interpolation to convey weight",
      "Adaptive asset resolution for different device capabilities — retina vs low-end",
      "Audit network requests — minimize with bundling, prefetching, HTTP/2 or HTTP/3",
      "SEO: ensure content crawlable with proper metadata, alt text, and structured data",
      "Accessibility audit with Axe/Lighthouse for WCAG compliance — keyboard nav, descriptive links, semantic HTML",
      "Prepare simplified fallback for older browsers/devices that cannot render advanced scroll experience",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // TOOLS & TECHNOLOGIES REFERENCE
  // ═══════════════════════════════════════════════════════════════════
  toolsReference: {
    smoothScroll: "Lenis — foundation for smooth scroll with customizable smoothing and control",
    animation: "GSAP & ScrollTrigger — robust animation with Lenis integration",
    threeD: "Three.js / Spline / PixiJS — for 3D and WebGL interactions; choose based on complexity",
    viewportDetection: "IntersectionObserver — lightweight native API for viewport entry triggers",
    emergingCSS: "Scroll-driven animations API — binds animations to scroll timelines in CSS (adopt as browser support improves)",
    performance: "Chrome DevTools, Firefox Performance Monitor, WebPageTest",
    designTools: "Figma, Blender, Houdini, Shader editors for designing visuals and effects",
    frameworkIntegration: "React provider pattern for Lenis — useEffect lifecycle management with rAF loop",
  },

  // ═══════════════════════════════════════════════════════════════════
  // MINDSET
  // ═══════════════════════════════════════════════════════════════════
  mindset: "Optimistic yet practical, imaginative yet grounded. Not easily satisfied — constantly push for excellence. Collaborative, respectful, humble. A storyteller, architect, engineer, and strategist. Keep learning, experimenting, adapting. Every pixel matters — the scroll experience should be as meticulous as a Cochrane Master Builders detail.",
} as const;
