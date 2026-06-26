# Prompt 01 — Trade Remix Generator

> Paste this entire prompt into Claude Code or Lovable.
> Fill in the TRADE INPUTS block at the top before pasting.

---

```
══════════════════════════════════════════════════════════════════════════
 TRADE REMIX GENERATOR — Cochrane Master Builders Universal Template
══════════════════════════════════════════════════════════════════════════

Fill in the block below, then paste this entire prompt.

┌─ TRADE INPUTS ───────────────────────────────────────────────────────┐
│  TRADE_NAME        = [e.g. "tile installation"]                       │
│  TRADE_SLUG        = [e.g. "cochrane-tile"]         ← URL-safe       │
│  SERVICE           = [e.g. "tile"]                  ← singular noun  │
│  SERVICE_PLURAL    = [e.g. "tiles"]                                   │
│  SERVICE_VERB      = [e.g. "tile"]                  ← "we tile..."   │
│  SERVICE_VERB_PAST = [e.g. "tiled"]                                   │
│  SERVICE_CATEGORY  = [e.g. "Interior Finishing"]    ← breadcrumbs    │
│  BRAND_NAME        = [e.g. "Cochrane Tile Masters"]                   │
│  FOUNDATION_YEAR   = [e.g. 1962]                                      │
│  MONOGRAM_LETTERS  = [e.g. C, T, M]                ← 3 letters       │
│  PRICE_BAND_LOW    = [e.g. "$1,400 – $3,500"]      ← small repair    │
│  PRICE_BAND_MID    = [e.g. "$4,000 – $9,000"]      ← full room       │
│  PRICE_BAND_HIGH   = [e.g. "$10,000 – $22,000"]    ← whole home      │
│  MATERIAL_PRIMARY  = [e.g. "porcelain tile, mortar bed, grout"]       │
│  MATERIAL_SUB      = [e.g. "backer board, waterproofing membrane"]    │
│  PALETTE_ACCENT    = [e.g. "#C47D26"]               ← copper default  │
└──────────────────────────────────────────────────────────────────────┘

─────────────────────────────────────────────────────────────────────────
ROLE
─────────────────────────────────────────────────────────────────────────
You are the configuration architect for the Cochrane Master Builders
universal template network. This template is remixed into 150 trade
websites — one config file powers an entire site. Your job is to
generate every data field in that config, from scratch, for the trade
defined above. You do not build UI. You generate data.

─────────────────────────────────────────────────────────────────────────
CODEBASE CONTEXT — what already exists, read before generating
─────────────────────────────────────────────────────────────────────────
Master config lives at: src/config/template/remix-variables.ts

The full RemixVariables interface is:

  BRAND_NAME: string
  SERVICE: string            ← singular noun, lowercase
  SERVICE_PLURAL: string
  SERVICE_VERB: string       ← "we {SERVICE_VERB} bathrooms"
  SERVICE_CATEGORY: string   ← breadcrumbs + schema
  HERO_IMAGE: string         ← set to "" (populated by image script)
  COMMUNITIES: string[]      ← 8 primary service-area communities
  SUB_SERVICES: SubService[] ← 5 entries: { title, summary, range? }
  PRICE_BANDS: PriceBand[]   ← 3 entries: { scope, range }
  FAQS: FAQ[]                ← 6 entries: { question, answer }
  PROOF: ProofPoint[]        ← 3 entries: { before, after, caption }
  TRUST_NUMBERS: TrustNumber[]← 4 entries: { number, label }
  BRAND_SLOGAN: string       ← the generational promise sentence
  FOUNDATION_YEAR: number
  MONOGRAM_LETTERS: [string, string, string]
  TRADE_SLUG: string
  GALLERY_IMAGES: []         ← always empty (image script fills it)
  FOUNDER_IMAGE: ""
  WHY_HERO_MACRO: ""
  REVIEWS_HERO: ""
  MANIFESTO_BACKDROP: ""
  NOT_FOUND_BACKDROP: ""
  MAP_IMAGE: ""
  STORY_IMAGES: ["/brand/story/story-1.avif"... ×4]   ← fixed, never change
  BRAND_STORY_HERO: "/brand/story/brand-story-hero.avif" ← fixed
  PALETTE_ACCENT_HEX: string
  MATERIAL_PRIMARY: string
  MATERIAL_SUBSURFACE: string

Cross-sell config lives at: src/config/template/cross-sell-map.ts
The interface is:
  CROSS_SELL_MAP[serviceSlug] = {
    question: string   ← e.g. "While the tile is setting, who does the rest?"
    recommendations: [
      { name, url, valueProp },   ← 3 entries exactly
      { name, url, valueProp },
      { name, url, valueProp },
    ]
  }

Reviews seed lives at: src/config/reviews.ts
The interface is:
  type ReviewService = "Repair" | "Installation" | "Painting" | "Garage" | "Basement"
  interface Review { name, community, service: ReviewService, rating, date, quote }

─────────────────────────────────────────────────────────────────────────
DELIVERABLES — produce all four, in this order
─────────────────────────────────────────────────────────────────────────

STEP 1 — Generate the fully populated MASTER_REMIX object.
Output it as a valid TypeScript const assignment that can replace the
existing MASTER_REMIX default in remix-variables.ts. Every field must
be populated — no empty strings except the image slots listed as "" above.

Rules for each field:
  SUB_SERVICES      5 real sub-services for this trade. Titles: 2–4 words,
                    noun-led. Summaries: 1 sentence, specific to scope.
                    Range: honest band matching the trade's price reality.
  PRICE_BANDS       scope describes what triggers this band (e.g. "single-
                    room floor, ≤ 150 sq ft"). range is the honest number.
  FAQS              Questions a real homeowner asks before hiring this trade.
                    Answers: specific, written in first person plural.
                    Must include: pricing question, timeline, guarantee,
                    insurance/certification, small-job policy, how to start.
  PROOF             3 before/after captions. Format: "[Before state]. [After
                    state]. [Specific measurable outcome in one number or
                    timeframe]."
  TRUST_NUMBERS     4 credibility anchors. At least one must be the 15-year
                    guarantee. Others: years in trade, liability coverage
                    ($5M), finish standard, or project count.
  BRAND_SLOGAN      A generational sentence specific to this trade. Must
                    reference what the trade produces and who inherits it.
                    Never a tagline — a permanent statement of intention.
  COMMUNITIES       Use this exact list:
                    ["Cochrane", "Sunset Ridge", "Heritage Hills",
                     "Riversong", "Fireside", "Springbank", "Bearspaw",
                     "Elbow Valley"]

STEP 2 — Add one entry to CROSS_SELL_MAP.
Key = SERVICE (e.g. "tile"). The question must reference the specific
moment after this trade's work completes. Recommendations: 3 real
Cochrane Master Builder sister trades that logically follow this one.
URLs = "https://cochrane-master-builders.com" as placeholder.

STEP 3 — Generate 6 seed reviews for src/config/reviews.ts.
Each review must:
  - Be from a real Cochrane-area community (use the COMMUNITIES list above)
  - Quote a specific outcome — name the wall, room, timeline, or number
  - Use one of the 5 ReviewService types (Repair/Installation/Painting/
    Garage/Basement) — adapt the trade vocabulary to match
  - Read as a real homeowner wrote it — not polished, not corporate
  - Never use banned words (see Brand Voice section below)

STEP 4 — Output a one-page REMIX CHECKLIST in plain text.
List every variable generated and confirm it is populated. Flag any
field that needs human review (e.g. actual company founding year).

─────────────────────────────────────────────────────────────────────────
BRAND VOICE RULES — non-negotiable
─────────────────────────────────────────────────────────────────────────
BANNED WORDS (never appear in generated copy):
  seamless, passionate, quality, excellence, we pride ourselves,
  industry-leading, solutions, affordable, quick, fast, modern,
  unleash, elevate, game-changer, best-in-class, hassle-free,
  delighted, excited, thrilled, committed to, dedicated to,
  luxury, premium, world-class, stunning, beautiful, amazing

VOICE RULES:
  - Permanent tone. These surfaces will outlast the family that ordered them.
  - Specific over vague. Name the room, the material, the millimeter.
  - First person plural ("we"), never "our team" or "our professionals."
  - No exclamation marks. No urgency language. No scarcity stunts.
  - CTA is always "Send photos for a quote" — never "Book now."
  - Numbers are written as numerals (15, not fifteen; $5M, not five million).
  - Guarantees are always "in writing on the invoice" — not marketing claims.

─────────────────────────────────────────────────────────────────────────
ACCEPTANCE GATES — do not declare done until all pass
─────────────────────────────────────────────────────────────────────────
□ Every RemixVariables field is populated (no undefined, no empty string
  except the 9 image slots specified as "")
□ All 5 SUB_SERVICES have title + summary + range
□ All 3 PRICE_BANDS have scope + range
□ All 6 FAQS are trade-specific (not generic about construction)
□ BRAND_SLOGAN contains no banned words
□ TRUST_NUMBERS[0] is the 15-year structural guarantee
□ All 6 seed reviews quote a specific number, room, or timeframe
□ CROSS_SELL_MAP entry has exactly 3 recommendations
□ No banned word appears anywhere in the generated output
□ Remix checklist confirms every field is populated
```
