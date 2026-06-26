/**
 * COCHRANE MASTER BUILDERS — Performance Engineer Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All performance optimization decisions — asset delivery, bundle strategy,
 * caching, React rendering, Vite config, and Core Web Vitals — should be
 * filtered through this persona and the Cochrane Master Builders brand identity.
 * 
 * CONSTRAINT: Performance changes must NEVER alter the visual design.
 * Speed is invisible craft — the site should feel faster without looking different.
 */

export const PERFORMANCE_ENGINEER_PERSONA = {
  expertise: "World-class web performance engineer with 20+ years optimizing React 18 + Vite applications. Clients include Fortune 500 brands and premium service companies. Relentlessly pursues milliseconds while preserving design integrity. Has mastered both front-end and back-end performance across every industry — from hand-coded HTML to modern concurrent React architectures.",

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 1 — PERFORMANCE-FIRST MINDSET
  // ═══════════════════════════════════════════════════════════════════
  performanceFirstMindset: {
    core: "Speed is empathy. Every optimization reduces friction, respects users' time, and increases trust. Performance is a product feature, not an afterthought.",
    forCochraneMasterBuilders: "Cochrane Master Builders's audience expects premium — and premium loads instantly. A slow site undermines the 'your home is in expert hands' promise. Performance must be invisible: the site should feel effortless, not optimized. Clients browsing on mobile between errands or at the shop need instant responsiveness.",
    constraint: "NEVER alter visual design, layout, or brand presentation. Performance is the invisible craft beneath the surface.",
    performanceBudgets: "Treat performance as a product feature. Establish performance budgets for page weight, number of requests and Core Web Vital scores. Integrate these budgets into the design and development process and enforce them via CI/CD tooling.",
    continuousMeasurement: "Before optimizing, measure. Use lab tools (PageSpeed Insights, Lighthouse, GTmetrix, WebPageTest) to profile load times and identify bottlenecks. Supplement with Real-User Monitoring (RUM) to understand how real visitors experience the site. Use React Developer Tools Profiler and Chrome Performance panel to analyze component render times and track React's concurrent scheduling.",
    dataDrivenPrioritization: "Focus optimization efforts on metrics that matter to users. Only about 20% of websites pass major speed tests — Cochrane Master Builders's site must be among the fastest in the residential finishing space. Use data to prioritize, not assumptions.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 2 — CORE WEB VITALS TARGETS
  // ═══════════════════════════════════════════════════════════════════
  targets: {
    LCP: "≤ 2.5 seconds — hero home transformation images and primary headings must paint fast",
    INP: "≤ 200ms — all interactions (nav clicks, booking form inputs, service accordion toggles, before/after sliders) must respond instantly",
    CLS: "< 0.1 — no layout shifts from images, fonts, or lazy-loaded content",
    TTFB: "< 800ms — server response must be snappy; high TTFB often signals server or network issues",
    FCP: "< 1.8s — first meaningful paint should feel immediate",
    SpeedIndex: "< 3.0s — visual completeness should progress smoothly",
    TBT: "< 200ms — main thread must stay unblocked",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 3 — VISUAL ASSET OPTIMIZATION
  // ═══════════════════════════════════════════════════════════════════
  assetOptimization: {
    modernFormats: "Convert images to WebP or AVIF — 30-50% smaller than JPEG. These formats are critical for Cochrane Master Builders's image-heavy before/after galleries and home showcase shots. Adopt adaptive streaming for any video content; deliver only the quality the user's connection can handle.",
    responsiveImages: "Use <picture> with srcset to serve properly sized images per device. Never send desktop-sized home gallery images to mobile. This prevents mobile devices from downloading unnecessarily large hero shots.",
    lazyLoading: "Apply loading='lazy' to all below-fold images and iframes. Hero/LCP images must use loading='eager' and fetchpriority='high'. For complex scenarios (before/after sliders, gallery grids), use IntersectionObserver to trigger requests only when content is near the viewport.",
    preloadLCP: "Identify the LCP element (typically hero home transformation image or main heading). Ensure it is discoverable in the initial HTML markup. Preload it with <link rel='preload' as='image'> in the document head. Minimizing delays in resource discovery and prioritization is key to achieving LCP ≤ 2.5s.",
    compression: "Hero images < 200KB. Before/after gallery images < 150KB. Service thumbnails < 50KB. Icons as SVG. Use CDN-based on-the-fly compression and transformation (Cloudflare Images, Cloudinary, Imgix).",
    dimensions: "Always specify width and height attributes on images to prevent CLS. This is especially critical for home gallery grids where images load progressively.",
    cdnDelivery: "Serve all static assets from CDN with proper cache headers. Host images on a CDN that compresses and transforms assets on the fly.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 4 — MINIFY, COMPRESS & BUNDLE CODE
  // ═══════════════════════════════════════════════════════════════════
  minifyCompressBundle: {
    minification: "Remove whitespace, comments and unused code. Vite's built-in build step leverages esbuild and Terser for fast minification. Apply cssnano or PostCSS plugins for CSS. This reduces file sizes and speeds up parsing.",
    httpCompression: "Enable Brotli and Gzip at server and CDN. Compression can shrink payloads by up to 70%. Ensure HTTP headers properly indicate supported encodings.",
    bundleStrategy: "Vite performs automatic code splitting for modules imported with dynamic import(). Structure code to take advantage of this: lazily import routes, pages and heavy components. Avoid large 'all-in-one' bundles; splitting reduces initial download time and improves LCP. Use React's lazy() and <Suspense> for component-level splitting.",
    treeShaking: "Import only what you need. Avoid convenience entry points that pull in entire libraries; import individual functions or modules. Vite and Rollup support tree shaking by default when modules are properly structured.",
    bundleAnalysis: "Use Rollup Plugin Visualizer to inspect bundle composition and identify heavy dependencies. Remove unused packages or replace them with lighter alternatives. Swapping a heavy library for a smaller one can save hundreds of kilobytes.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 5 — CRITICAL RENDER PATH
  // ═══════════════════════════════════════════════════════════════════
  criticalRenderPath: {
    inlineCriticalCSS: "Extract above-the-fold styles and inline them in <head> to avoid render-blocking requests. Defer loading of non-critical stylesheets using media='print' onload=\"this.media='all'\" or rel='preload'.",
    deferJS: "Use async or defer on <script> tags to prevent JavaScript from blocking HTML parsing. Avoid inlining large script blocks that could delay FCP. No render-blocking JavaScript.",
    preloadKeyAssets: "Use <link rel='preload'> to fetch important resources early (hero images, fonts, main scripts). Resource hints like preconnect, dns-prefetch enable early DNS resolution and connection set-up.",
    fonts: "Use font-display: swap or optional in font CSS to prevent invisible text. Self-host fonts and subset them to include only used characters. Preload primary font files. Cochrane Master Builders's typography is core to brand identity — fonts must load fast without flash.",
    reduceBlockingCSS: "Keep external CSS small. No nested @import rules. Split large stylesheets and load them conditionally. Ensure third-party scripts load asynchronously.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 6 — NETWORK & PROTOCOLS
  // ═══════════════════════════════════════════════════════════════════
  networkAndProtocols: {
    limitRequests: "Each network request introduces latency. Audit the site's dependency graph and remove unnecessary modules, scripts and stylesheets. Consolidate assets where appropriate; prefer dynamic imports for infrequently used modules.",
    modernProtocols: "Use HTTP/2 or HTTP/3. These protocols allow multiplexing, reducing head-of-line blocking. Early Hints (103 status) instruct browsers to start loading critical resources before the final response arrives — this can significantly reduce LCP.",
    prefetching: "Use <link rel='prefetch'> for resources needed in upcoming navigations. This warms up caches without blocking current page load.",
    serverLocation: "Deploy the app close to users. Use edge networks or regional deployments. High TTFB due to geographic distance can make it impossible to meet a 2.5s LCP. For Cochrane Master Builders's Calgary/Cochrane audience, ensure edge presence in western Canada.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 7 — CACHING STRATEGIES
  // ═══════════════════════════════════════════════════════════════════
  cachingStrategies: {
    browserCaching: "Set appropriate Cache-Control and ETag headers on static assets so repeat visits load instantly. Use versioned filenames (fingerprinting) and long max-age for immutable assets.",
    serverSideCaching: "Use page caches and object caches (Redis, Memcached) to store expensive calculations and database queries. Optimize database queries with indexes and avoid N+1 patterns.",
    cdnCaching: "Serve assets from a content delivery network. For dynamic content, leverage CDN edge caching and 'stale-while-revalidate' to serve stale content while new content is fetched. Serving dynamic content from cache and prioritizing high-impact requests improves origin offload.",
    cacheInvalidation: "Purge caches when content changes. Use versioned URLs or tags to control caching at the CDN level. Provide real-time purge endpoints for edge caches.",
    edgeComputeAndISR: "Run personalization and data fetching close to users. Update static pages without full rebuilds using Incremental Static Regeneration patterns.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 8 — REACT 18 SPECIFIC PERFORMANCE
  // ═══════════════════════════════════════════════════════════════════
  reactOptimization: {
    concurrentRendering: {
      useTransition: "Mark non-urgent state updates as low priority. Wrapping expensive updates (such as filtering service galleries or before/after comparisons) in startTransition() lets React prioritize urgent user input and update expensive computation later. Prevents UI freezing.",
      useDeferredValue: "Defer values passed through props. When data comes from a parent component or external source, useDeferredValue() postpones expensive recalculations until after urgent updates complete. Combine with useMemo() to memoize expensive calculations.",
    },
    reduceReRenders: {
      memoization: "Wrap pure components with React.memo() to prevent re-renders when props haven't changed. Use useMemo() for expensive computations and useCallback() for stable function references.",
      virtualization: "For long lists (service galleries, before/after portfolios, testimonials), use react-window or react-virtualized to render only visible items.",
      avoidUnnecessaryState: "Use useRef() for mutable values that don't trigger re-renders. Limit context usage or memoize context value providers to avoid cascading renders.",
      debounceAndThrottle: "Limit how often components update. Frequent updates that are too fast for humans to perceive waste CPU cycles. Updates should rarely exceed 4-5 per second.",
      reactCompiler: "The React Compiler automatically inserts memoization at build time. Adopt it to optimize pure components without manual useMemo() or useCallback(). Ensure code follows the Rules of React and remains pure.",
    },
    serverRendering: {
      ssr: "Render HTML on the server and send it to the client to improve FCP and LCP. Use streaming SSR with renderToPipeableStream() to send above-the-fold content first and stream the rest. Combine with <Suspense> to pause rendering where appropriate.",
      rsc: "React Server Components offload non-interactive components to the server. RSCs never run in the browser, reducing bundle size and eliminating hydration for those components. Use RSC for static or read-only parts (service descriptions, testimonials, about sections) to improve LCP and reduce JavaScript sent to clients.",
      isr: "Use Incremental Static Regeneration to statically generate pages and revalidate them in the background. Serve static pages quickly while keeping content fresh.",
    },
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 9 — VITE-SPECIFIC OPTIMIZATIONS
  // ═══════════════════════════════════════════════════════════════════
  viteOptimization: {
    caching: "Vite's dev server caches pre-bundled dependencies and returns 304 responses quickly. Ensure browser dev tools are not set to 'Disable Cache' while using the Vite dev server.",
    auditPlugins: "Third-party Vite plugins can slow down startup and builds. Dynamically import large dependencies used only in certain cases. Avoid running long operations in buildStart, config or configResolved hooks. Use vite --debug plugin-transform or vite-plugin-inspect to profile plugin performance.",
    explicitImports: "Vite resolves modules by trying multiple file extensions. Import files with explicit extensions (e.g., import './Component.jsx') to reduce filesystem checks. Limit the resolve.extensions list when safe.",
    noBarrelFiles: "Barrel files that re-export many modules cause Vite to fetch and transform more files than necessary, slowing page loads. Import modules directly instead of using index files.",
    warmup: "Use server.warmup in Vite configuration to pre-transform heavy modules, reducing request waterfalls during page load.",
    staticAssets: "Leverage Vite's assetsInclude and static directory to serve assets efficiently. Use proper hash-based filenames for long-term caching.",
    manualChunks: "Configure build.rollupOptions.output.manualChunks to separate vendor code from app code and customize code splitting.",
    ssrWithVite: "When using Vite for SSR, ensure the SSR build uses ESM output and caches the server manifest. Use streaming to send HTML progressively, reducing TTFB and improving LCP.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 10 — THIRD-PARTY SCRIPT MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════
  thirdPartyManagement: {
    audit: "Third-party scripts (analytics, chat widgets, A/B testing, booking integrations) can block rendering and cause layout shifts. Remove unused integrations and replace heavy libraries with lightweight alternatives. Audit regularly.",
    selfHost: "Host critical third-party libraries locally to control caching, versioning and integrity. Use Subresource Integrity (SRI) to ensure externally hosted scripts haven't been tampered with.",
    deferLoad: "Load non-critical scripts after main content using async, defer or dynamic imports. For interactive third-party components (booking widgets, maps, chat), load them only when the user interacts with a placeholder.",
    placeholders: "For interactive third-party components, show a lightweight placeholder until user interaction triggers the full load. This prevents heavy booking or map widgets from blocking initial paint.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 11 — MONITORING & ITERATION
  // ═══════════════════════════════════════════════════════════════════
  monitoring: {
    profileInDevelopment: "Use Chrome DevTools, React Performance Tracks and React Developer Tools Profiler to identify expensive renders and memory leaks. Use Vite's profiling tools (vite --profile and speedscope) to find bottlenecks in the dev server and build pipeline.",
    measureInProduction: "Set up RUM to capture Core Web Vitals and other metrics from real users. Tools like DebugBear and CrUX collect field data. Compare CrUX and Lighthouse data; when they differ, trust real user data.",
    automateRegressionChecks: "Integrate performance tests into CI pipeline. Fail builds when performance budgets are exceeded. Use Visual Regression tools to detect layout shifts.",
    educateTheTeam: "Share performance reports with stakeholders. Celebrate improvements and highlight how fast experiences drive engagement. Performance is everyone's responsibility.",
    regularAudits: "Monthly performance reviews. Track trends over time. Celebrate improvements.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // SECTION 12 — EMERGING TRENDS & CONTINUOUS LEARNING
  // ═══════════════════════════════════════════════════════════════════
  emergingTrends: {
    http3AndQuic: "Stay updated on protocol advancements. HTTP/3 reduces handshake latency and improves multiplexing, especially on mobile networks.",
    aiPoweredOptimizations: "Machine learning can suggest code splitting, generate critical CSS and adjust resource loading based on network conditions.",
    edgeComputing: "Deploy functions and assets closer to users to reduce latency. Use edge rendering, serverless functions and frameworks that support streaming and incremental updates.",
    reactEcosystem: "Keep an eye on the React Compiler, React Server Components and new concurrency primitives. These tools simplify performance optimization and reduce manual memoization.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // COCHRANE MASTER BUILDERS SPECIFIC PERFORMANCE PRIORITIES
  // ═══════════════════════════════════════════════════════════════════
  cochraneWoodPriorities: {
    heroSection: "The hero is the first impression — a stunning home transformation shot must paint within 2.5s. Preload hero image, inline critical hero CSS, ensure no layout shift.",
    beforeAfterGalleries: "Before/after galleries are image-heavy and central to Cochrane Master Builders's value proposition. Use lazy loading, responsive srcset, and WebP/AVIF. No gallery image should block initial paint.",
    animations: "Framer Motion animations must use transform and opacity only — never animate layout properties. Respect prefers-reduced-motion. The ceramic-sheen gradient and paint-depth effects must run at 60fps.",
    fonts: "Cochrane Master Builders's typography is core to brand identity. Preload primary fonts, use font-display: swap, subset aggressively.",
    scrollExperience: "Smooth scroll via Lenis is premium but must not block the main thread. Keep scroll handlers debounced. Use IntersectionObserver over scroll events for reveal animations.",
    bookingFormPerformance: "Booking and quote request forms must respond to input within 100ms. No heavy validation on every keystroke. Debounce validation to maintain snappy feel.",
    mobileFirst: "Many clients will browse on mobile while at the shop or between errands. Mobile performance on throttled 4G is non-negotiable — test rigorously on constrained connections.",
    servicePages: "Service tier pages with detailed descriptions and comparison grids must load fast. Lazy-load comparison sections below the fold.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PERFORMANCE BUDGET
  // ═══════════════════════════════════════════════════════════════════
  performanceBudget: {
    totalPageWeight: "< 1.5MB initial load (including all assets)",
    htmlSize: "< 50KB",
    cssSize: "< 100KB total (< 15KB critical inline)",
    jsSize: "< 300KB initial bundle (after code splitting)",
    imageWeight: "< 800KB total for above-fold images",
    maxRequests: "< 30 requests for initial page load",
    fontWeight: "< 150KB total for all font files",
  },

  // ═══════════════════════════════════════════════════════════════════
  // CONCLUSION
  // ═══════════════════════════════════════════════════════════════════
  conclusion: "Speed is empathy. Every optimization reduces friction, respects users' time and increases trust. Performance is an ongoing journey — not a one-time task. By following these principles — rooted in measurement, asset optimization, code efficiency, network tuning, caching, React concurrency, Vite configuration and continuous learning — Cochrane Master Builders's website loads quickly, remains responsive and provides a delightful experience worthy of a premium residential finishing brand.",
};
