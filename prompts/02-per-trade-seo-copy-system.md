# Prompt 02 — Per-Trade SEO Copy System

> Paste this entire prompt into Claude Code or Lovable.
> Fill in the TRADE INPUTS block at the top before pasting.
> Run AFTER Prompt 01 (Trade Remix Generator).

---

```
═══════════════════════════════════════════════════════════════════════
 PER-TRADE SEO COPY SYSTEM — Cochrane Master Builders Template
═══════════════════════════════════════════════════════════════════════

Fill in the block below, then paste this entire prompt.

┌─ TRADE INPUTS ────────────────────────────────────────────────────┐
│  SERVICE           = [e.g. "tile"]                                 │
│  SERVICE_PLURAL    = [e.g. "tiles"]                                │
│  SERVICE_VERB      = [e.g. "tile"]                                 │
│  SERVICE_CATEGORY  = [e.g. "Interior Finishing"]                   │
│  BRAND_NAME        = [e.g. "Cochrane Tile Masters"]                │
│  TRADE_SLUG        = [e.g. "cochrane-tile"]                        │
│  PRIMARY_COMMUNITY = [e.g. "Cochrane"]                             │
│  SERVICE_AREA      = [e.g. "Cochrane, Springbank, and Bearspaw"]   │
└───────────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────────
ROLE
─────────────────────────────────────────────────────────────────────
You are a senior technical SEO writer and conversion copywriter who
specialises in local home-services trades. You write in the Cochrane
Master Builders voice — permanent, authoritative, specific, legacy-
conscious. You never write marketing copy. You write statements of
craft and evidence. You understand that Google ranks specificity and
topical authority, and that conversions come from trust, not urgency.

─────────────────────────────────────────────────────────────────────
CODEBASE CONTEXT
─────────────────────────────────────────────────────────────────────
The template has 16 live routes:
  /                   → Home
  /brand-story        → Brand Story
  /why-we-love        → Why We Love {SERVICE}
  /services           → Services hub
  /services/:slug     → Service detail (one per SUB_SERVICE)
  /pricing            → Pricing & process
  /gallery            → Gallery
  /reviews            → Reviews
  /about              → About
  /contact            → Contact
  /areas-we-serve     → Areas hub
  /areas-we-serve/:r  → Region page (Cochrane, Springbank, etc.)
  /areas-we-serve/:r/:c → Community page (Heritage Hills, etc.)
  /thank-you          → Post-booking
  /privacy            → Privacy
  /terms              → Terms

Meta tags do NOT currently exist in this codebase. You will create:

  1. src/config/template/meta-config.ts
     A typed map of route → { title, description, canonical, ogTitle,
     ogDescription } for the 13 non-area routes. Area pages generate
     their meta dynamically from communities.ts (do not touch them).

  2. src/components/template/MetaTags.tsx
     A component that uses react-helmet-async to inject the correct
     meta tags per route. Reads from meta-config.ts + useLocation().
     Singleton — mounted once in App.tsx just inside BrowserRouter.

  3. src/config/template/why-we-love-copy.ts
     Trade-specific manifesto content for the /why-we-love page.
     This page currently uses TEMPLATE_COPY.whyWeLove which has
     {SERVICE} tokens. This file provides the fully-written version.

DO NOT modify:
  - src/config/template/template-copy.ts  (master template, never change)
  - src/config/template/remix-variables.ts (only Trade Remix Generator touches this)
  - Any page component in src/pages/template/

─────────────────────────────────────────────────────────────────────
DELIVERABLES — in this order
─────────────────────────────────────────────────────────────────────

STEP 1 — Install react-helmet-async
  Add "react-helmet-async" to dependencies in package.json.
  Wrap App.tsx root in <HelmetProvider>.

STEP 2 — Create src/config/template/meta-config.ts

  Export interface PageMeta {
    title: string;              // ≤ 60 chars; brand name at end
    description: string;        // 140–155 chars; no banned words
    ogTitle?: string;           // falls back to title if omitted
    ogDescription?: string;     // falls back to description
    canonical?: string;         // absolute URL (leave as template var)
  }

  Export const META_CONFIG: Record<string, PageMeta> for these routes:
    "/" | "/brand-story" | "/why-we-love" | "/services" | "/pricing"
    | "/gallery" | "/reviews" | "/about" | "/contact" | "/thank-you"
    | "/privacy" | "/terms"

  For /services/:slug routes, export META_SERVICE_DETAIL(slug: string):
  PageMeta — a function that generates meta for any sub-service slug.

  Title formula:   "{Trade-specific H1 keyword} | {BRAND_NAME}"
  Desc formula:    Lead with the primary keyword + city + specific
                   outcome claim. No exclamation marks. Never mention
                   price in the meta description.

STEP 3 — Create src/components/template/MetaTags.tsx

  - Import useLocation from react-router-dom
  - Import Helmet from react-helmet-async
  - Import META_CONFIG, META_SERVICE_DETAIL from meta-config.ts
  - Import MASTER_REMIX from remix-variables.ts
  - Route matching: exact match → META_CONFIG[pathname].
    /services/:slug → META_SERVICE_DETAIL(slug)
    /areas-we-serve/* → skip (those pages handle their own schema)
    /* (catch-all) → generic brand title only
  - Inject: <title>, <meta name="description">, <meta property="og:*">,
    <link rel="canonical">, <meta name="robots" content="index, follow">
  - On /thank-you: robots = "noindex, nofollow"

STEP 4 — Mount MetaTags in App.tsx
  Import and render <MetaTags /> once, just above <ScrollToTop />,
  inside BrowserRouter. No other changes to App.tsx.

STEP 5 — Create src/config/template/why-we-love-copy.ts

  Export WhyWeLoveCopy interface:
    obsessionHeadline: string   ← the "1mm no one else cares about" statement
    obsessionBody: string       ← 2–3 sentences on the trade-specific tolerance
    methods: [                  ← exactly 3 objects
      { title: "Material", body: string },
      { title: "Method",   body: string },
      { title: "Measurement", body: string },
    ]
    quote: string               ← the house-rule manifesto statement
    heroEyebrow: string
    heroTitle: string
    heroLede: string

  All copy is trade-specific. Write as if you are the third-generation
  master of this trade — not a marketer who knows about this trade.

─────────────────────────────────────────────────────────────────────
META COPY RULES (per-field)
─────────────────────────────────────────────────────────────────────
Title (≤ 60 chars):
  - Start with primary keyword + city ("Tile Installation Cochrane")
  - Never: "Best", "Top", "Expert", "Professional"
  - Never include price

Description (140–155 chars):
  - First clause: keyword + city + specific outcome
  - Second clause: trust signal (15-year guarantee, 3 generations, etc.)
  - Never: "we pride ourselves", "dedicated to", "passionate about"
  - Always end with a quiet action prompt ("Send photos for a quote.")

OG Title (≤ 70 chars):
  - Can be more editorial than the SEO title
  - Use the Space Grotesk headline register

─────────────────────────────────────────────────────────────────────
BRAND VOICE — BANNED WORDS
─────────────────────────────────────────────────────────────────────
Never write: seamless, passionate, quality, excellence, we pride
ourselves, industry-leading, solutions, affordable, quick, fast,
modern, luxury, premium, stunning, beautiful, amazing, world-class,
best-in-class, hassle-free, dedicated to, committed to, game-changer.
No exclamation marks. No urgency language. No scarcity.

─────────────────────────────────────────────────────────────────────
ACCEPTANCE GATES
─────────────────────────────────────────────────────────────────────
□ react-helmet-async installed and HelmetProvider wrapping App root
□ MetaTags.tsx renders in <head> on every route (verify with DevTools)
□ Every title is ≤ 60 chars
□ Every description is 140–155 chars
□ /thank-you has robots noindex
□ No banned word appears in any meta field
□ why-we-love-copy.ts has no {SERVICE} tokens — all tokens resolved
□ WhyWeLoveCopy.methods has exactly 3 entries (Material / Method / Measurement)
□ All trade-specific copy is factually accurate for the named trade
```
