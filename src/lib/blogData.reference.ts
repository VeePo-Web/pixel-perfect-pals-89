/**
 * ════════════════════════════════════════════════════════════════════════
 *   REFERENCE ONLY — DO NOT IMPORT IN PRODUCTION.
 * ════════════════════════════════════════════════════════════════════════
 *
 * Snapshot of a fully-populated BlogPost (sourced from VeePo.ca) so a
 * remix author can see what a complete article — with hub governance,
 * FAQ block, CTA configuration, and Victorious-SEO extras — looks like.
 *
 * To activate: copy this entry into `blogPosts` in `blogData.ts`,
 * rewrite for your trade, and ensure a matching `Hub` exists in
 * `hubRegistry.ts` (see `hubRegistry.reference.ts` for the hub shape).
 */

import type { BlogPost } from "./blogData";

export const REFERENCE_POST: BlogPost = {
  slug: "hvac-website-design-cochrane",
  title: "HVAC Website Playbook — Cochrane: Structure that Ranks & Converts",
  metaTitle: "HVAC Website Design Cochrane | What You Need | VeePo",
  metaDescription:
    "What every HVAC contractor in Cochrane needs on their website. Lead forms, emergency pages, and local SEO — explained by a local developer.",
  excerpt:
    "If you run heating & cooling services in Cochrane, AB—furnace installs, AC repair, 24/7 emergency HVAC—this guide shows exactly how to structure a high-converting, fast website that ranks for local intent and turns mobile visitors into quotes and calls.",
  author: {
    name: "VeePo Editorial Team",
    role: "Editorial Team",
    image: "/favicon.png",
    bio: "The VeePo Editorial Team brings over a decade of web development expertise to Cochrane businesses. Specializing in conversion-optimized websites that drive real results.",
  },
  publishedAt: "2025-10-27T08:00:00-07:00",
  modifiedAt: "2025-10-27T08:00:00-07:00",
  readingTime: 10,
  category: "Web Development",
  tags: ["HVAC", "Cochrane", "web design", "Core Web Vitals", "local SEO", "trades", "conversions"],
  featured: false,
  featuredImage: {
    url: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=630&fit=crop&q=80",
    alt: "Residential home exterior — HVAC website design Cochrane",
    width: 1200,
    height: 630,
  },
  ogImage:
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=630&fit=crop&q=80",
  twitterImage:
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=630&fit=crop&q=80",
  tldr:
    "Six pages, mobile-first speed, and a 3-step quote flow are what separate HVAC sites that book jobs from HVAC sites that just exist. This playbook gives you the structure, the targets, and the conversion flow.",
  outline: [
    "Who This Guide Is For",
    "Quick Summary: What Works",
    "The 6 HVAC Pages That Book Jobs",
    "Speed That Actually Matters (Core Web Vitals)",
    "Your Quote Flow in 3 Steps",
    "Project Galleries Without the Slowdown",
    "How We Build Your HVAC Homepage",
    "Mini-FAQ",
  ],
  wordCount: 1450,
  content: `
## Who This Guide Is For

You run an HVAC business in Cochrane—furnace installs, AC repair, maybe 24/7 emergency calls.

You want a website that:
- Ranks when people search "furnace repair Cochrane"
- Loads fast on mobile (where most leads come from)
- Turns visitors into quotes and calls

This guide gives you the exact structure. Six pages. Speed targets. A quote flow that works. No fluff.

---

## Quick Summary: What Works

| Element | Target |
|---------|--------|
| **Pages** | Home, Services (one per job type), Areas, Reviews, Financing, Contact |
| **Speed** | LCP under 2.5s, INP under 200ms, CLS under 0.1—on mobile |
| **Quote flow** | Short form → instant confirmation → secure lead log + sticky call button |
| **Images** | AVIF/WebP, lazy-load below fold, eager hero |
| **Proof** | Recent Google reviews, project photos, response-time promise |

---

## The 6 HVAC Pages That Book Jobs

### Page 1: Home
Shows you're a real HVAC company—and makes it easy to call or request a quote. Visible phone, two CTAs ("Get a Quote", "Call Now"), 3–5 proof chips, 40–60 word intro.

### Page 2: Services (One Job Per URL)
"Furnace installation" and "AC repair" deserve their own URLs to rank and convert. Each page: overview, price range, 4–6 FAQs, before/after photo, clear CTA.

### Page 3: Areas We Serve (No Doorway Clones)
One hub with a coverage map, 2–4 local mini-blurbs (seasonality, parking, common jobs), 2–3 locally-tagged reviews.

### Page 4: Reviews (Policy-Safe, Recent, Specific)
Ask every customer, reply to all, feature recency. Quote-wall pattern with short, specific snippets next to CTAs.

### Page 5: Financing (Simple, Clear)
Options, "who qualifies" checklist, risk note. Small comparison table + CTA.

### Page 6: Contact (Tap-to-Call + Short Form)
Sticky mobile call button, 6-field quote form (Name, Phone, Email, Address, Job type, Notes).

---

## Speed That Actually Matters (Core Web Vitals)

**LCP under 2.5s** — serve images in AVIF/WebP, don't lazy-load the hero, use \`fetchpriority="high"\`.
**INP under 200ms** — keep JavaScript light on the first screen.
**CLS under 0.1** — set width/height on every image, reserve space for sticky bars.

Test on mobile LTE—not office Wi-Fi.

---

## Your Quote Flow in 3 Steps
1. **Short form** — 6 fields or fewer, invisible honeypot, no captcha walls.
2. **Instant confirmation** — email or SMS, restate your response promise.
3. **Secure lead log** — every request saved with timestamp, source page, UTM.
`,
  faq: [
    {
      question: "What should an HVAC website include?",
      answer:
        "Home with one-tap call, Services with job-type pages, Areas We Serve, Reviews with recent Google excerpts, simple Financing, and a Contact page with a short quote form.",
      intent: "informational",
    },
    {
      question: "How fast should a local service site load?",
      answer:
        "LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 on mobile — eager hero, modern image formats, limited blocking JS, reserved layout space.",
      intent: "informational",
    },
    {
      question: "How do I get more HVAC website calls?",
      answer:
        "Visible phone in header, sticky on mobile, 3-screen quote flow, recent reviews near CTAs, local area signals like 'Same-day in Sunset Ridge'.",
      intent: "transactional",
    },
  ],
  ctaConfig: {
    midPost: {
      headline: "Need Your HVAC Website Built Right?",
      body: "Skip the guesswork. Get a 6-page HVAC website that loads fast, ranks for local searches, and converts visitors into calls.",
    },
    bottomPost: {
      headline: "Ready to Launch Your HVAC Website?",
      subheadline: "Get a working homepage in 7 days — or your $200 back.",
      body: "Stop losing calls to competitors with better websites.",
    },
  },
  about: { regionSlug: "cochrane" },
  hubGovernance: {
    hubId: "H1",
    hubName: "Web Design for Trades",
    hubSlug: "trades-web-design",
    postType: "spoke",
    internalLinks: {
      hub: "/blog/trades-web-design",
      pillar: "/blog/trades-web-design",
      servicePages: ["/areas-we-serve"],
      relatedPosts: [],
    },
    refreshCadence: "6months",
    cannibalizationRisk: "none",
    hubIndexEntry: {
      subtopicBucket: "HVAC & Climate Control",
      teaserTitle: "HVAC Website Playbook — Cochrane",
      teaserSummary:
        "Learn the 6 essential HVAC pages, Core Web Vitals targets, and 3-screen quote flow that converts Cochrane heating and cooling leads.",
      priority: "high",
    },
  },
};