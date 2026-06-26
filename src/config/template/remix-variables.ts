/**
 * GENERIC SEO REMIX TEMPLATE — Remix Variable Contract
 *
 * One source of truth for every `{VARIABLE}` slot the template exposes.
 * Any remix binds these values in its own `trade.config.ts`.
 * The template never invents service-specific copy on its own — it
 * reads everything from this file plus `src/data/communities.ts`.
 */

export interface PriceBand {
  scope: string;
  range: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface SubService {
  title: string;
  summary: string;
  range?: string;
}

export interface ProofPoint {
  before: string;
  after: string;
  caption: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  aspect?: "3:2" | "1:1";
  caption?: string;
}

export interface TrustNumber {
  number: string;
  label: string;
}

export interface Author {
  /** Display name, e.g. "Avery Walsh". */
  name: string;
  /** Role / title, e.g. "Lead Estimator". */
  role: string;
  /** Short third-person bio — fed into BlogPosting.author + visible AuthorBio. */
  bio: string;
  /** Public photo URL (square). Empty string renders an editorial monogram fallback. */
  image: string;
  /** Optional canonical profile URL (LinkedIn, About page) — feeds `author.url`. */
  url?: string;
}

export interface RemixVariables {
  /** Sub-brand short name, e.g. "Acme Tile". */
  BRAND_NAME: string;
  /** Singular service noun, lower-case. e.g. "tile". */
  SERVICE: string;
  /** Plural form, e.g. "tiles". */
  SERVICE_PLURAL: string;
  /** Verb form, e.g. "tile" (as in "we tile bathrooms"). */
  SERVICE_VERB: string;
  /** Category label for breadcrumbs / schema, e.g. "Interior Finishing". */
  SERVICE_CATEGORY: string;
  /** Short tagline that names the geography the brand serves — e.g. "Canada & the USA". */
  SERVICE_REGION_TAGLINE: string;
  /** One-paragraph coverage blurb shown on the Areas hub editorial block. */
  COVERAGE_BLURB: string;
  /** Editorial label for the footer "service area" column. */
  SERVICE_REGION_LABEL: string;
  /** Four short trust statements rendered as the Areas hub trust strip. */
  TRUST_STATS_LABELS: [string, string, string, string];
  /** Hero image asset path. Replace per remix. */
  HERO_IMAGE: string;
  /** Service-area communities. Used by the Areas hub (deferred). */
  COMMUNITIES: string[];
  /** Sub-services that appear on /services and /services/{slug}. */
  SUB_SERVICES: SubService[];
  /** Transparent price bands — Hormozi value anchor. */
  PRICE_BANDS: PriceBand[];
  /** Top FAQs — pulled into Home + service detail. */
  FAQS: FAQ[];
  /** Before/after proof set. */
  PROOF: ProofPoint[];
  /** Trust numbers shown in the hero TrustBar + Reviews page. */
  TRUST_NUMBERS: TrustNumber[];

  // ── Heirloom Brand Identity ─────────────────────────────────────────────
  /** The generational slogan — surfaces in ≥7 places, never hard-coded in components. */
  BRAND_SLOGAN: string;
  /** Year the parent company / this trade was established. Feeds FoundationCounter. */
  FOUNDATION_YEAR: number;
  /** Three monogram letters — parent brand is CMB; remix trade may show e.g. CTM in its own badge. */
  MONOGRAM_LETTERS: [string, string, string];

  // ── Per-trade image library (populated by scripts/regenerate-images.ts) ──
  /**
   * URL-safe slug for the trade — used as the output path prefix.
   * e.g. "cochrane-drywall", "cochrane-tile", "cochrane-flooring"
   * Default: "master" (template preview mode).
   */
  TRADE_SLUG: string;
  /** Gallery lookbook — 6–9 images for /gallery ImageMosaic. Generated per trade. */
  GALLERY_IMAGES: GalleryImage[];
  /** Founder / hands-at-work editorial image for /about. Never shows faces. */
  FOUNDER_IMAGE: string;
  /** WHY page editorial quote backdrop — macro detail of service surface. */
  WHY_HERO_MACRO: string;
  /** Reviews page editorial quote backdrop — quiet finished room. */
  REVIEWS_HERO: string;
  /** Home manifesto editorial quote backdrop — atmospheric workshop wide. */
  MANIFESTO_BACKDROP: string;
  /** 404 page backdrop — quiet workshop wall, copper-leaning palette. */
  NOT_FOUND_BACKDROP: string;
  /** Contact page static map image (stylized hand-drawn, no satellite). */
  MAP_IMAGE: string;
  // ── Contact + Canonical ─────────────────────────────────────────────────
  /**
   * Parent brand canonical URL — used for JSON-LD sameAs network entity linking.
   * Every sub-site declares this as its parent, telling Google all 150 sites
   * belong to the same organisation family. Compounds authority across the network.
   * e.g. "https://cochranemasterbuilders.ca"
   */
  PARENT_BRAND_URL: string;

  /**
   * Google Business Profile review link for this trade.
   * Format: "https://g.page/r/XXXXX/review"
   * Leave as "" until the Google Business Profile is created.
   * Used by: ThankYou page review CTA, email footer review invite.
   */
  GOOGLE_REVIEW_URL: string;

  /**
   * Canonical origin for this trade site. No trailing slash.
   * e.g. "https://cochranetile.ca"
   * Used by: MetaTags canonical, seo.ts, AreasSEOSchema, JSON-LD schemas.
   * MUST be overridden per trade — every site has a different domain.
   */
  BRAND_URL: string;
  /**
   * Contact phone in E.164 format. e.g. "+14031234567"
   * Used by: JSON-LD LocalBusiness telephone field (required for rich results).
   */
  PHONE: string;
  /**
   * OG share image absolute path (served from /public).
   * e.g. "/share/og-1200x630-tile.jpg"
   * Must be 1200×630 JPEG/PNG. Used by MetaTags og:image + twitter:image.
   */
  OG_IMAGE: string;

  /**
   * UNIVERSAL BRAND ASSETS — do NOT override per-trade.
   * These are the same images on every Cochrane Master Builders sub-brand site.
   * Generated once with: npx tsx scripts/regenerate-images.ts --brand-only
   * Stored at /brand/story/ not /remix/{TRADE_SLUG}/
   */
  STORY_IMAGES: [string, string, string, string];
  BRAND_STORY_HERO: string;

  // ── Image generation metadata (used by scripts/regenerate-images.ts) ─────
  /**
   * Hex color of the brand accent for image prompt color direction.
   * Default: copper #C47D26
   */
  PALETTE_ACCENT_HEX?: string;
  /** Primary material vocabulary for the trade — injected into image prompts. */
  MATERIAL_PRIMARY?: string;
  /** Sub-surface / specialty material for detail shots. */
  MATERIAL_SUBSURFACE?: string;

  // ── E-E-A-T author surface (Victorious-SEO pattern) ─────────────────────
  /**
   * Author registry keyed by id. Referenced by future blog posts via
   * `post.author.name` (current scaffold) or `post.authorId` (when
   * posts are added). At least one entry is required before publishing
   * a post — search engines reward visible, attributable authorship.
   */
  AUTHORS: Record<string, Author>;

  /**
   * Brand social / canonical profile URLs. Emitted into the sitewide
   * Organization JSON-LD as `sameAs` — strengthens entity disambiguation.
   * Leave empty until at least one profile exists.
   */
  BRAND_SOCIAL: string[];
}

/**
 * MASTER DEFAULTS — neutral master-builder voice, used as the live
 * preview before any remix happens. Variable tokens are kept *visible*
 * in the rendered text (e.g. "{SERVICE}") so a remix author can see
 * exactly what to swap.
 */
export const MASTER_REMIX: RemixVariables = {
  BRAND_NAME: "{BRAND_NAME}",
  SERVICE: "{SERVICE}",
  SERVICE_PLURAL: "{SERVICE_PLURAL}",
  SERVICE_VERB: "{SERVICE_VERB}",
  SERVICE_CATEGORY: "{SERVICE_CATEGORY}",
  SERVICE_REGION_TAGLINE: "{SERVICE_REGION_TAGLINE}",
  COVERAGE_BLURB:
    "{COVERAGE_BLURB} — replace this paragraph in MASTER_REMIX with a single editorial line that names the regions you serve, how local your team is to them, and why that matters for the customer.",
  SERVICE_REGION_LABEL: "Service area",
  TRUST_STATS_LABELS: [
    "{TRUST_COMMUNITIES}",
    "{TRUST_LOCATION}",
    "{TRUST_CERTIFICATION}",
    "{TRUST_GUARANTEE}",
  ],
  HERO_IMAGE: "",
  COMMUNITIES: [
    "{COMMUNITY_1}",
    "{COMMUNITY_2}",
    "{COMMUNITY_3}",
    "{COMMUNITY_4}",
  ],
  SUB_SERVICES: [
    { title: "{SUB_SERVICE_1}", summary: "Brief client-facing summary of the first specialised offering inside this trade.", range: "$—" },
    { title: "{SUB_SERVICE_2}", summary: "Second offering — kept tightly scoped so the price band is honest.", range: "$—" },
    { title: "{SUB_SERVICE_3}", summary: "Third offering. Speak in nouns, not adjectives.", range: "$—" },
    { title: "{SUB_SERVICE_4}", summary: "Fourth offering. The one most clients underestimate.", range: "$—" },
    { title: "{SUB_SERVICE_5}", summary: "Fifth offering. Premium tier. Heritage finish.", range: "$—" },
  ],
  PRICE_BANDS: [
    { scope: "{PRICE_BAND_1_SCOPE} — small, single-room", range: "$—" },
    { scope: "{PRICE_BAND_2_SCOPE} — full room or zone", range: "$—" },
    { scope: "{PRICE_BAND_3_SCOPE} — whole-home or new-build" , range: "$—" },
  ],
  FAQS: [
    {
      question: "How do you price a {SERVICE} job?",
      answer:
        "We quote against scope, never against the client. Every quote is itemised, written, and tied to a 15-year structural guarantee where the work qualifies. The bands on /pricing are the honest truth — you do not pay more because you can.",
    },
    {
      question: "Do you handle small {SERVICE_PLURAL} jobs?",
      answer:
        "Yes. The smallest job we take is the same as the largest in standard. A 30-minute repair gets the same Level-5 finish a whole-home install gets, because the standard is the standard.",
    },
    {
      question: "What is your timeline for {SERVICE} work?",
      answer:
        "Most {SERVICE} engagements begin within two to four weeks. Heritage and whole-home schedules quote a window honestly — we do not sell timelines we cannot keep.",
    },
    {
      question: "Are you insured and certified?",
      answer:
        "$5M general liability, WCB-covered crews, manufacturer-certified on every material we install. Certificates available on request before any work begins.",
    },
    {
      question: "What guarantees come with the work?",
      answer:
        "The Worksite Guarantee, the 14-Day Touch-Up Guarantee, and the 15-Year Structural Guarantee — all in writing on the invoice. If the standard is not met, we return at zero cost.",
    },
    {
      question: "How do I start?",
      answer:
        "Send three or four photos through the booking form. You receive a written estimate within 24 hours. No sales call. No pressure. The next step is yours.",
    },
  ],
  PROOF: [
    { before: "", after: "", caption: "{PROOF_1_CAPTION} — describe the transformation in one sentence." },
    { before: "", after: "", caption: "{PROOF_2_CAPTION} — pull the specific number into the line." },
    { before: "", after: "", caption: "{PROOF_3_CAPTION} — new-build or whole-home scope." },
  ],
  TRUST_NUMBERS: [
    { number: "15", label: "Year structural guarantee" },
    { number: "24h", label: "Written quote turnaround" },
    { number: "$5M", label: "Liability coverage" },
    { number: "Level 5", label: "Finish standard" },
  ],

  // ── Contact + Canonical defaults ────────────────────────────────────────
  PARENT_BRAND_URL: "",
  GOOGLE_REVIEW_URL: "",
  BRAND_URL: "",
  PHONE: "",
  OG_IMAGE: "",

  // ── Heirloom defaults ───────────────────────────────────────────────────
  BRAND_SLOGAN: "{BRAND_SLOGAN}",
  FOUNDATION_YEAR: 1900,
  MONOGRAM_LETTERS: ["B", "R", "D"],

  // ── Image library defaults ───────────────────────────────────────────────
  // Empty strings = no image yet. Components render a styled aspect-ratio
  // placeholder (blueprint grain + copper hairline) when src is "".
  // Run scripts/regenerate-images.ts to populate these for your trade.
  TRADE_SLUG: "master",
  GALLERY_IMAGES: [],
  FOUNDER_IMAGE: "",
  WHY_HERO_MACRO: "",
  REVIEWS_HERO: "",
  MANIFESTO_BACKDROP: "",
  NOT_FOUND_BACKDROP: "",
  MAP_IMAGE: "",

  // Universal brand story assets — same on every sub-brand site.
  // Generated once with: npx tsx scripts/regenerate-images.ts --brand-only
  STORY_IMAGES: [
    "/brand/story/story-1.avif",
    "/brand/story/story-2.avif",
    "/brand/story/story-3.avif",
    "/brand/story/story-4.avif",
  ],
  BRAND_STORY_HERO: "/brand/story/brand-story-hero.avif",

  // Image generation metadata
  PALETTE_ACCENT_HEX: "#C47D26",
  MATERIAL_PRIMARY: "{MATERIAL_PRIMARY}",
  MATERIAL_SUBSURFACE: "{MATERIAL_SUBSURFACE}",

  // ── E-E-A-T defaults ────────────────────────────────────────────────────
  // Replace per trade. Ships blank by design — never publish a post under
  // a fake author.
  AUTHORS: {},
  BRAND_SOCIAL: [],
};
