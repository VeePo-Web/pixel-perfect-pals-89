/**
 * MASTER TEMPLATE — Neutral Copy Library
 *
 * Page-by-page copy in the master-builder voice. Every service-specific
 * fragment is a `{VARIABLE}` token that 150 future remixes will swap.
 * No exclamation marks. No "call now." No urgency stunts. Just the
 * legacy-luxury voice from File 1.5 (North Star) filtered through
 * 1.5.6 StoryBrand (hero=client, guide=us) and 1.5.7 Trade Manifesto.
 */

export const TEMPLATE_COPY = {
  brand: {
    tagline: "Built for the families who'll inherit it.",
    promise:
      "Six generations of builders made Cochrane. We build as the seventh — to the standard they set, for the families who'll inherit it.",
  },

  nav: [
    { label: "Home",              path: "/" },
    { label: "Services",          path: "/services" },
    { label: "Areas We Serve",    path: "/areas-we-serve" },
    { label: "Pricing",           path: "/pricing" },
    { label: "Guarantee",         path: "/guarantee" },
    { label: "Reviews",           path: "/reviews" },
    { label: "Gallery",           path: "/gallery" },
    { label: "FAQ",               path: "/faq" },
    { label: "About",             path: "/about" },
    { label: "Contact",           path: "/contact" },
    // Hidden from main nav but kept for footer columns:
    { label: "Brand Story",       path: "/brand-story" },
    { label: "Why We Love {SERVICE}", path: "/why-we-love" },
  ],

  cta: {
    primary: "Send photos for a quote",
    secondary: "See pricing & process",
    contact: "Speak with a builder",
  },

  // ─── HOME ─────────────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow: "Cochrane, Alberta — building since 1881",
      headline: "{SERVICE_PLURAL} for the families who'll inherit them.",
      sub: "We {SERVICE_VERB} the way Cochrane's builders always have — square, plumb, and warranted in writing for fifteen years. No shortcuts. No second invoices. The standard is the standard.",
    },
    promise: {
      eyebrow: "The promise",
      headline: "One trade. One standard. One invoice you'll keep.",
      body: "Most {SERVICE} work in this country is a race to the bottom on price and finish. Ours isn't. We {SERVICE_VERB} a single category at master-builder grade — every line of every quote tied to the 15-year structural guarantee on the invoice.",
    },
    services: {
      eyebrow: "What we {SERVICE_VERB}",
      headline: "Five {SERVICE} engagements. Five honest price bands.",
      lede: "Pick the scope closest to your home. The price you see on /pricing is the price on the invoice — the only adjustment is for material you select.",
    },
    proof: {
      eyebrow: "The work",
      headline: "Before. After. The number that mattered.",
      lede: "We don't show portfolio shots. We show the wall the previous contractor told someone to live with — and the wall after we left.",
    },
    process: {
      eyebrow: "How we work",
      headline: "Four steps. No surprises. The first three are free.",
    },
    faq: {
      eyebrow: "Common questions",
      headline: "The questions every honest {SERVICE} client asks.",
    },
    cta: {
      eyebrow: "Begin",
      headline: "Send three photos. Receive a written quote within 24 hours.",
      body: "No sales call. No pressure. The next move is entirely yours.",
    },
  },

  // ─── BRAND STORY ──────────────────────────────────────────────────────
  brandStory: {
    hero: {
      eyebrow: "Brand story",
      title: "Six generations of one standard.",
      lede: "{BRAND_NAME} stands in a line of Cochrane builders that began in 1881, with the first foundation laid in this town. The trade changed. The standard never did.",
    },
    chapters: [
      {
        eyebrow: "Chapter 01 — 1881",
        headline: "The first foundation.",
        body: "The first foundation in Cochrane went down on the Bow in 1881. The winters that followed were brutal. It held anyway — and set the rule that still runs this town: if your name is on the invoice, your name is on the wall.",
      },
      {
        eyebrow: "Chapter 02 — 1885",
        headline: "The builders raised a town, not just a trade.",
        body: "Steel reached the valley and set a town where the river met the grassland. Quarry, sawmill, brick plant. The sandstone those hands cut still carries First Street West — a century after the hands that set it were gone.",
      },
      {
        eyebrow: "Chapter 03 — Today",
        headline: "We {SERVICE_VERB} like the people who built this town.",
        body: "{BRAND_NAME} is the seventh generation to lay a foundation in Cochrane. We {SERVICE_VERB} to the standard the first six set. We will not finish a {SERVICE} surface in your home that wouldn't have passed them.",
      },
    ],
    values: [
      { title: "Square, plumb, warranted.", body: "The three rules every {SERVICE} surface meets. In writing on every invoice." },
      { title: "Quote against scope.", body: "Never against the client's budget. The price band is the price band." },
      { title: "Clean is the standard.", body: "If the worksite is not visibly cleaner than we found it, the work is free." },
      { title: "One trade, mastered.", body: "We {SERVICE_VERB}. We don't dabble. The depth is what makes the price honest." },
    ],
    founderQuote:
      "The people who built this town built for families they would never meet — and a century later we're still finishing rooms in the houses they raised. Each generation hands the next a standard, not just a town. We're the seventh to carry it. That's the math that runs this company.",
  },

  // ─── WHY WE LOVE {SERVICE} ────────────────────────────────────────────
  whyWeLove: {
    hero: {
      eyebrow: "Why we love {SERVICE}",
      title: "{SERVICE} is the trade everyone underestimates.",
      lede: "Every other finish in your home depends on the {SERVICE} underneath it being right. Get the {SERVICE} wrong and the whole room reads wrong. That's why we chose this trade — and why we won't share it with another category.",
    },
    obsession: {
      headline: "The 1mm that nobody else cares about.",
      body: "Industry tolerance for {SERVICE} flatness is roughly a quarter inch over eight feet. Our standard is one millimetre. The difference is invisible to the eye until light grazes the wall — and then it is the entire conversation.",
    },
    methods: [
      { title: "Material", body: "We {SERVICE_VERB} only with grades the manufacturer will warranty. No commodity stock from the last contractor's truck." },
      { title: "Method", body: "The crew that frames the job is the crew that finishes the job. No hand-offs. No 'someone else's problem' on the second pass." },
      { title: "Measurement", body: "Every {SERVICE} surface laser-checked at three stages — pre-install, mid-cure, sign-off. The number goes on the invoice." },
    ],
    quote:
      "There is no such thing as 'good enough' {SERVICE}. There is the standard, and there is everything below the standard.",
  },

  // ─── SERVICES HUB ─────────────────────────────────────────────────────
  services: {
    hero: {
      eyebrow: "Services",
      title: "Five {SERVICE} engagements. One standard across all five.",
      lede: "Every package below carries the same 15-year structural guarantee, the same Level-5 finish, the same crew. The only thing that changes is scope.",
    },
    crossTradeGuarantee: {
      headline: "If we touch it, we warranty it. In writing. For fifteen years.",
      body: "The guarantee is not a product tier. It is the floor. Every {SERVICE} surface, every package, every invoice.",
    },
  },

  // ─── SERVICE DETAIL ───────────────────────────────────────────────────
  serviceDetail: {
    whatYouGet: {
      eyebrow: "What you get",
      headline: "The full scope. Itemised. Before you spend a dollar.",
      body: "A written quote enumerating every {SERVICE} surface, every material grade, every cure window, every clean-up step. Read it before you decide.",
    },
    relatedServices: {
      eyebrow: "Related",
      headline: "If you're {SERVICE_VERB}-ing, you're probably also planning these.",
    },
  },

  // ─── PRICING ──────────────────────────────────────────────────────────
  pricing: {
    hero: {
      eyebrow: "Pricing & process",
      title: "Honest bands. Written quotes. No second invoices.",
      lede: "We publish our {SERVICE} price bands because the alternative — quoting against the client's budget — is the practice that ruined this trade. The number you see is the number on the invoice.",
    },
    philosophy: {
      headline: "The expensive option is paying twice.",
      body: "A general contractor charges two-to-four times our band for the same {SERVICE} scope — because they bring six trades when two will do. The 15-year structural guarantee is the math: you pay once.",
    },
  },

  // ─── GALLERY ──────────────────────────────────────────────────────────
  gallery: {
    hero: {
      eyebrow: "Gallery",
      title: "The work, unretouched.",
      lede: "Every photo is a {SERVICE} surface in a Cochrane home, taken on the day of sign-off, before the client moved their furniture back. No staging. No portfolio styling.",
    },
  },

  // ─── REVIEWS ──────────────────────────────────────────────────────────
  reviews: {
    hero: {
      eyebrow: "Reviews",
      title: "Before. After. The specific number.",
      lede: "Every review below names the wall, the timeline, and the outcome. Vague praise doesn't make it onto this page.",
    },
  },

  // ─── ABOUT ────────────────────────────────────────────────────────────
  about: {
    hero: {
      eyebrow: "About",
      title: "A {SERVICE} company holding a standard six generations of Cochrane builders set.",
      lede: "We chose depth over breadth on purpose. One trade, mastered, in one town — to the standard six generations of Cochrane builders set before us.",
    },
    story: {
      eyebrow: "The ground beneath Cochrane",
      headline: "Built by people who built for people they'd never meet.",
      lede: "Every foundation in this town sits on one someone laid first. We didn't begin that. We inherited it — and we build to carry it forward.",
      beats: [
        { year: "1881", label: "The first foundation", body: "The first foundation in Cochrane went down on the Bow. The winters that followed were brutal. It held anyway. The rule it set still runs this town: build to outlast the builder." },
        { year: "1885", label: "The town the builders raised", body: "Steel reached the valley and set a town where the river met the grassland. They named it Cochrane. The hands that laid that track were building a place most of them would never live in." },
        { year: "Early 1900s", label: "The masons", body: "Quarry, sawmill, brick plant — the trades of foundation and frame. The sandstone those hands cut still carries First Street West, a hundred years after they were gone." },
        { year: "Today", label: "The seventh generation", body: "We are the seventh generation to lay a foundation in Cochrane. We build to the standard the first six set — square, plumb, warranted in writing." },
      ],
      turn: "Every one of them built for someone they would never meet. Today, that someone is you. The next foundation in the line is yours — and we lay it the only way Cochrane ever has. Square. Plumb. Warranted in writing.",
    },
    values: [
      { title: "Seventh generation.", body: "We build to the standard six generations of Cochrane builders set before us. The work outlasts the builder." },
      { title: "Local first.", body: "Cochrane and the eight surrounding communities. Nothing further. Nothing dispatched." },
      { title: "Transparent always.", body: "Pricing public. Guarantees written. Mistakes named. Invoices itemised." },
      { title: "Standard before scale.", body: "We will turn down a job before we will compromise the {SERVICE} standard on a finished surface." },
    ],
    communityRoots:
      "We finish {SERVICE_PLURAL} in the same Cochrane neighbourhoods builders have worked for six generations. Our crew lives within ten minutes of every house we work in.",
  },

  // ─── CONTACT ──────────────────────────────────────────────────────────
  contact: {
    hero: {
      eyebrow: "Contact",
      title: "Send three photos. We do the rest.",
      lede: "Most {SERVICE} questions can be answered from a clear photograph and a few sentences. Begin with the booking form — speak with a builder only if you'd prefer.",
    },
    booking: {
      headline: "The quote arrives within 24 hours.",
      body: "Itemised. Written. Tied to the 15-year guarantee. No sales call between you and the number.",
    },
  },

  // ─── 404 ──────────────────────────────────────────────────────────────
  notFound: {
    eyebrow: "404",
    title: "This page is not in the catalogue.",
    lede: "The {SERVICE} surface you're looking for is somewhere else. Try the services hub or send us the link you followed and we'll repair the path.",
  },

  // ─── LEGAL ────────────────────────────────────────────────────────────
  privacy: {
    hero: {
      eyebrow: "Privacy",
      title: "What we collect, why, and how to remove it.",
      lede: "We collect the minimum needed to quote your {SERVICE} job: your contact details, your address, the photos you send. Nothing else. Nothing sold. Nothing shared.",
    },
  },
  terms: {
    hero: {
      eyebrow: "Terms",
      title: "The terms that govern every {SERVICE} engagement.",
      lede: "Plain language. The same language that goes on the invoice. No fine print designed to favour the contractor.",
    },
  },
} as const;
