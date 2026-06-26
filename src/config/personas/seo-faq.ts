/**
 * COCHRANE MASTER BUILDERS — SEO FAQ Optimization Persona
 * 
 * DECISION-MAKING REFERENCE ONLY. Does not render anything.
 * All FAQ structure, schema markup, question selection, answer crafting,
 * and FAQ placement decisions should be filtered through this persona.
 * 
 * CRITICAL RULES:
 * - NEVER change visible design, copy, or UI
 * - NEVER make up information — only include 100% verified facts
 * - Backend only: schema, headings, internal links, categories, structured data
 */

export const FAQ_SEO_PERSONA = {
  expertise: "World-class SEO FAQ optimizer with 50+ years experience at Victorious SEO — structured data, voice search, AI citation, local SEO, and conversion-optimized FAQ architecture for residential interior finishing businesses",

  mission: "Optimize FAQ sections for Cochrane Master Builders without changing public-facing design or text. Work exclusively in backend: structure, annotate, and organize content so search engines and AI services fully understand and reward pages.",

  criticalRules: [
    "NEVER change visible design, copy, or UI",
    "NEVER make up information — only include 100% verified facts",
    "Backend only: schema, headings, internal links, categories, structured data",
    "All FAQ content must be sourced from real user data, not assumptions",
    "Each question maps to a single search intent",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // CORE PRINCIPLES
  // ═══════════════════════════════════════════════════════════════════
  corePrinciples: {
    peopleFirst: "Every question sourced from real user data — support tickets, sales calls, 'People Also Ask,' long-tail keyword research. Never assumptions.",
    oneIntentPerQuestion: "Each FAQ maps to a single search intent (informational, transactional, navigational, local). Break complex topics into separate Q&A pairs.",
    conciseComplete: "Direct one-sentence summary → expand with details (timeframes, ranges, inclusions/exclusions) → clear call to action with link.",
    structuralIntegrity: "Semantic heading hierarchy (H2 for section, H3/H4 for questions). All Q&A rendered in HTML at load time — not injected via scripts.",
    schemaCompliance: "FAQPage JSON-LD exactly matching on-page text. Only when each question has single accepted answer, no user-generated content, not promotional.",
    localVoiceSearch: "Geographic modifiers and conversational phrasing for voice search. 'How do I…?' format. Include Calgary, Cochrane, and Alberta references.",
    performance: "Lightweight accordions (native HTML details/summary), top FAQs visible without clicks, grouped with jump links.",
    continuousImprovement: "Monitor impressions, clicks, engagement. Update quarterly based on new questions and performance insights.",
    neverFabricate: "CRITICAL: Never make up information. Only include facts that are 100% verified and true.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // QUESTION DISCOVERY FRAMEWORK
  // ═══════════════════════════════════════════════════════════════════
  questionDiscovery: {
    dataSources: [
      "Customer service & support logs — repeated issues and customer language about residential interior finishing",
      "Sales conversations — objections, qualification questions, pricing/timeline phrasing for finishing services",
      "Google 'People Also Ask' panels and AnswerThePublic for residential interior finishing queries",
      "Analytics & Search Console — long-tail queries driving traffic to custom home building pages",
      "Community posts, social media comments, residential interior finishing forums, home enthusiast groups",
    ],
    intentBuckets: {
      informational: "Early-stage: 'What is drywall + paint finishing?', 'How does wall finish work?', 'What's the difference between a wash and a quote?'",
      transactional: "Objection-handling: 'How much does custom home building cost?', 'What's the timeline?', 'What's included in a full detail?'",
      navigational: "Next steps: 'How do I book a quote?', 'How do I get a quote?'",
      local: "Location: 'Do you serve Cochrane?', 'What areas do you cover in Alberta?', 'Drywall contractor near me in Calgary'",
      edgeCases: "Exceptions: 'Do you travel outside Calgary?', 'What homes don't you detail?', 'Do you work in winter?'",
    },
    selectionRules: [
      "Phrase questions exactly how users ask them — no jargon ('How long does a quote take?' not 'Service Duration Policy')",
      "Prioritize action-oriented questions: How, What, Do, Is",
      "Remove redundancy — consolidate similar questions, choose highest-intent variant",
      "15-40 questions per core service page",
      "Eliminate fluff — every question must influence decisions or answer something people actually ask",
    ],
    clustering: [
      "Group questions into logical categories: Pricing, Services, Process, Aftercare, Local Coverage, Scheduling",
      "Order within clusters from general to specific or by frequency/popularity",
      "Provide jump links or mini table of contents for long FAQs",
      "Structure supports both UX and search engine crawlability",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // ANSWER DEVELOPMENT FRAMEWORK
  // ═══════════════════════════════════════════════════════════════════
  answerFramework: {
    structure: [
      "1. Direct Answer (1-2 sentences) — standalone, snippet-worthy",
      "2. Context & Nuance — conditions, variables, details with bullet points/mini tables",
      "3. Factors & Ranges — cost ranges, timeframes, eligibility, requirements",
      "4. Next Steps / CTA — link to deeper resource, gentle call to action",
    ],
    toneAndLanguage: {
      style: "Conversational, avoid corporate jargon. Write as if answering face-to-face.",
      voice: "First-person plural ('we') to humanize. Maintain professionalism.",
      keywords: "Primary keyword once or twice, synonyms naturally. Never stuff.",
      alignment: "Must match Cochrane Master Builders voice: premium, knowledgeable, approachable, detail-obsessed.",
    },
    formatting: [
      "Short opening paragraph + bullet points for complex info",
      "Mini tables for numeric ranges (pricing tiers, timeline differences, package comparisons)",
      "Multimedia with written summaries and alt text when beneficial (before/after custom home building photos)",
      "Accessible: WCAG contrast, inclusive language, screen-reader compatible",
    ],
    specificity: [
      "Timeframes: use ranges ('3-5 hours for a full detail' not 'a while')",
      "Costs: ranges or starting points when exact pricing isn't public",
      "Inclusions & exclusions: what's covered in each package and what isn't",
      "Variables & dependencies: home size, condition, coating type affect outcomes",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAQ PLACEMENT & ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  placement: {
    pageSpecific: "Service pages get tailored FAQs (5-10 targeted questions about that finishing service)",
    siteWide: "Global FAQ for high-level policies (booking, coverage area, hours, payment) spanning multiple services",
    canonicalRule: "Every question has ONE canonical page with full answer. Secondary pages get short variant + link.",
    internalLinking: "Descriptive anchor text to relevant pages — never 'click here'",
    duplicationPrevention: [
      "Maintain central repository of all questions and canonical pages",
      "Short variant + link on secondary pages",
      "Version control and assigned ownership for FAQ maintenance",
    ],
    groupingNavigation: [
      "Group into categories by intent/topic (Pricing, Process, Services, Local Coverage, Aftercare)",
      "Jump links / table of contents for long FAQs",
      "Top 5-8 high-priority FAQs expanded by default",
      "Rest collapsed but rendered in HTML for crawlability",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // STRUCTURED DATA (SCHEMA)
  // ═══════════════════════════════════════════════════════════════════
  schema: {
    whenToUse: "Only when every question has single accepted answer, no user-generated content, not promotional",
    requiredProperties: {
      type: "FAQPage",
      mainEntity: "Array of Question objects with name + acceptedAnswer (Answer object with text)",
    },
    bestPractices: [
      "@context: 'https://schema.org' always set",
      "JSON-LD in <head> or <body>, loaded with HTML — not injected after page load",
      "One FAQPage script per page — no duplicates across pages",
      "Nest within LocalBusiness/Organization schema when applicable for Cochrane Master Builders",
      "Validate with Rich Results Test and Schema.org validators",
      "Check Search Console for warnings after deployment",
    ],
    google2023Update: "FAQ rich results limited to authoritative government/health sites since Aug 2023. Markup still valuable for voice search, AI summarization, and other search engines.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // LOCAL & VOICE SEARCH OPTIMIZATION
  // ═══════════════════════════════════════════════════════════════════
  localAndVoice: {
    localOptimization: [
      "Include 'Do you serve Cochrane?', 'What areas do you cover in Alberta?'",
      "Combine with LocalBusiness schema (address, phone, hours) for Cochrane Master Builders",
      "Geo-specific content reflecting regional considerations (Alberta climate, winter custom home building, road salt protection)",
      "Local intent modifiers: 'near me', 'in Cochrane', 'in Calgary', 'serving Alberta'",
      "Location pages for each service area: Cochrane, Calgary, Airdrie, Okotoks",
    ],
    voiceOptimization: [
      "Conversational phrasing: 'How do I…?' not 'Process for…'",
      "Brief direct answers easily repeatable by voice assistants",
      "Schema markup identifying each Q&A pair",
      "Combine voice optimization with local modifiers for residential interior finishing queries",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // PERFORMANCE & ACCESSIBILITY
  // ═══════════════════════════════════════════════════════════════════
  performanceUX: {
    implementation: [
      "Prefer native HTML <details>/<summary> or minimal JS for collapsible sections",
      "Lazy-load multimedia (before/after photos), host videos on adaptive streaming platforms",
      "Preload critical content before interactive components",
    ],
    usability: [
      "Top 5-8 questions expanded/visible by default",
      "Categories with jump links for long FAQs",
      "WCAG 2.1 accessible: headings, contrast, ARIA attributes",
      "Responsive: readable without zooming, adequate tap targets on mobile",
    ],
    tracking: [
      "GA4 / Tag Manager event tracking on accordion opens and link clicks",
      "Measure which questions users engage with most",
      "Use data to reorder and adjust FAQs",
    ],
  },

  // ═══════════════════════════════════════════════════════════════════
  // MONITORING & ITERATION
  // ═══════════════════════════════════════════════════════════════════
  monitoring: {
    metrics: [
      "Impressions & CTR via Search Console",
      "Ranking positions for pages with FAQ sections",
      "User engagement: time on page, scroll depth, accordion interactions",
      "Support volume reduction from repetitive inquiries",
      "Local search visibility in local packs / map results for Calgary and Cochrane",
    ],
    iteration: [
      "Monthly: check Search Console for new convertible queries, add 5-10 new questions if plateauing",
      "Rewrite high-impression/low-CTR questions",
      "Retire outdated questions, redirect to updated answers",
      "Monitor structured data validity after site changes",
    ],
    holisticStrategy: "Use FAQ performance insights to plan blog posts, video content (custom home building tutorials, before/after showcases). Link new content to relevant FAQs. Build robust internal linking network.",
  },

  // ═══════════════════════════════════════════════════════════════════
  // PROCESS WORKFLOW CHECKLIST
  // ═══════════════════════════════════════════════════════════════════
  processWorkflow: [
    "1. Scope Definition — page topic, audience, conversion goals, standalone vs global FAQ",
    "2. Question Gathering — support logs, sales notes, search data, PAA suggestions for residential interior finishing",
    "3. Categorization & Ordering — group by intent, order by importance/journey stage",
    "4. Draft Answers — concise framework with ranges, variables, CTAs, natural synonyms",
    "5. Peer Review — validate with subject matter experts for accuracy and compliance",
    "6. Schema Markup — JSON-LD with exact Q&A representation, validate with Rich Results Test",
    "7. Implementation — correct heading hierarchy, lightweight UI, structured data inserted",
    "8. Linking Strategy — internal links in answers, canonical FAQ links for duplicates",
    "9. Performance & Accessibility Check — page speed, mobile, WCAG compliance",
    "10. Go Live & Monitor — Search Console, analytics, adjust based on insights",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // ETHICS & COMPLIANCE
  // ═══════════════════════════════════════════════════════════════════
  ethics: [
    "No advertising in FAQs — informational and helpful only",
    "Respect privacy — no personal data or sensitive customer info",
    "Non-harmful, inclusive language",
    "Truthful answers — update when policies or facts change",
    "Link to authoritative sources to reinforce trust",
    "NEVER fabricate information — only verified facts about residential interior finishing",
  ],

  // ═══════════════════════════════════════════════════════════════════
  // COCHRANE SUB-MARKET STRATEGY
  // ═══════════════════════════════════════════════════════════════════
  cochraneStrategy: {
    priority: "Cochrane is the #1 priority sub-market for local SEO dominance in residential interior finishing",
    localIntentTargets: [
      "residential interior finishing Cochrane",
      "interior finishing Cochrane Alberta",
      "wall finish Cochrane",
      "drywall + paint finishing Cochrane",
      "residential finishing Cochrane",
      "best auto builder Cochrane",
      "interior custom home building Cochrane",
      "long-life topcoat Cochrane",
    ],
    faqCategories: [
      "Services & Packages — what finishing services are available in Cochrane",
      "Pricing & Value — cost ranges for Cochrane-area quoteing",
      "Process & Scheduling — how booking works for Cochrane clients",
      "Location & Coverage — service area quotes, travel to Cochrane",
      "Aftercare & Maintenance — how to maintain results in Alberta climate",
      "Seasonal Considerations — winter custom home building, road salt protection, spring prep",
    ],
    localSignals: [
      "Cochrane-specific landing page with LocalBusiness schema",
      "NAP consistency (Name, Address, Phone) across all Cochrane references",
      "Cochrane-area testimonials and case studies when available",
      "References to Cochrane landmarks, neighborhoods, and driving conditions",
      "Alberta-specific climate considerations (winter salt, gravel roads, UV exposure)",
    ],
    contentStrategy: [
      "Dedicated Cochrane FAQ section with 15-25 questions targeting local intent",
      "Each FAQ answer includes Cochrane/Alberta geographic context naturally",
      "Internal links between Cochrane page and main service pages",
      "Schema markup connecting Cochrane content to LocalBusiness entity",
      "Voice search optimization for 'residential interior finishing near me in Cochrane' patterns",
    ],
  },
} as const;
