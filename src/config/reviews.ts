/**
 * reviews.ts — Review types + local-dev seed data.
 *
 * PRODUCTION: SocialProofEngine reads from Supabase via useReviews().
 * LOCAL DEV:  useReviews() falls back to REVIEWS below when Supabase
 *             returns an empty result (before any rows are approved).
 *
 * To seed Supabase: npm run reviews:seed
 */

export type ReviewService =
  | "Repair"
  | "Installation"
  | "Painting"
  | "Garage"
  | "Basement";

export type ReviewCommunity =
  | "Cochrane"
  | "Sunset Ridge"
  | "Heritage Hills"
  | "Fireside"
  | "Riverview"
  | "Redwood Meadows"
  | "Harmony"
  | "Bragg Creek"
  | "Calgary"
  | "Airdrie"
  | "Riversong"
  | "Springbank"
  | "Bearspaw"
  | "Elbow Valley";

export interface Review {
  // ── Core fields (match DB column names via hook mapping) ─────────────
  name: string;
  community: ReviewCommunity;
  service: ReviewService;
  rating: number;             // numeric(2,1) in DB — 1.0–5.0
  date: string;               // "March 2026" display format
  quote: string;
  // ── Extended fields (Supabase layer) ─────────────────────────────────
  approved: boolean;
  source: "manual" | "google";
  googleReviewId?: string;
  siteSlug?: string;
  serviceSlug?: string;
}

export interface ReviewAggregate {
  siteSlug: string;
  totalReviews: number;
  averageRating: number;
  fiveStarCount: number;
}

// ─── Local-dev seed data ──────────────────────────────────────────────────────
// All rows: approved=true, source="manual" — ready to seed via reviews:seed.
export const REVIEWS: Review[] = [
  {
    name: "Jordan M.",
    community: "Sunset Ridge",
    service: "Repair",
    rating: 5,
    date: "March 2026",
    quote:
      "We had a long crack running down a hallway wall that other guys kept telling us was 'just settling.' They patched it properly, blended it in, and you genuinely cannot find it. In and out in an afternoon, no dust through the rest of the house.",
    approved: true,
    source: "manual",
  },
  {
    name: "Priya S.",
    community: "Heritage Hills",
    service: "Painting",
    rating: 5,
    date: "February 2026",
    quote:
      "Asked for a repaint after we patched a few spots ourselves. They re-did our patches first, then painted — the wall reads as new. Quote was clear, arrival window was on the dot.",
    approved: true,
    source: "manual",
  },
  {
    name: "Marcus L.",
    community: "Fireside",
    service: "Garage",
    rating: 5,
    date: "February 2026",
    quote:
      "Took our garage from bare framing to insulated, boarded, and painted in one window. They covered the floor, swept up every night, and we could park back in by the weekend. The space finally feels like part of the house.",
    approved: true,
    source: "manual",
  },
  {
    name: "Elena R.",
    community: "Riverview",
    service: "Basement",
    rating: 5,
    date: "January 2026",
    quote:
      "Walls-only basement starter package. Our basement is warmer, quieter, and finished enough to actually use, without us committing to a full reno. Exactly what was promised, no upsell pressure.",
    approved: true,
    source: "manual",
  },
  {
    name: "Tom K.",
    community: "Cochrane",
    service: "Repair",
    rating: 5,
    date: "January 2026",
    quote:
      "Doorknob hole behind the door — small job, half the contractors I called wouldn't even quote it. These guys showed up, patched, primed, and painted. Charged what they said they would.",
    approved: true,
    source: "manual",
  },
  {
    name: "Rachel D.",
    community: "Redwood Meadows",
    service: "Painting",
    rating: 4.9,
    date: "December 2025",
    quote:
      "Repaint of two bedrooms after we had a small ceiling leak repaired. Lines are sharp, edges are clean, no drips on the trim. I could tell they actually cared about the finish.",
    approved: true,
    source: "manual",
  },
  {
    name: "Andrew P.",
    community: "Harmony",
    service: "Installation",
    rating: 5,
    date: "December 2025",
    quote:
      "We needed drywall on a partial basement section the previous owner never finished. They scoped it honestly — told me what didn't need doing — and the boarding and tape job is dead flat. Hard to find that level of care for a smaller job.",
    approved: true,
    source: "manual",
  },
  {
    name: "Steph N.",
    community: "Bragg Creek",
    service: "Garage",
    rating: 5,
    date: "November 2025",
    quote:
      "Single-bay garage — boarded and painted into a clean working space. They were one of the only local crews willing to drive out, and the quote held. Dust containment was way better than I expected.",
    approved: true,
    source: "manual",
  },
  {
    name: "Will B.",
    community: "Sunset Ridge",
    service: "Basement",
    rating: 5,
    date: "November 2025",
    quote:
      "Soundproofed and boarded the basement ceiling so the kids' footsteps stop owning the room. Crew was respectful in the house, took shoes off, the whole thing. Would book again without thinking about it.",
    approved: true,
    source: "manual",
  },
  {
    name: "Hannah J.",
    community: "Calgary",
    service: "Repair",
    rating: 4.8,
    date: "October 2025",
    quote:
      "Multiple patches across the main floor after we moved a few light fixtures. They came in, mapped the spots with me, and you cannot tell where any of them were. Communication via text was actually responsive.",
    approved: true,
    source: "manual",
  },
  {
    name: "Devon C.",
    community: "Airdrie",
    service: "Installation",
    rating: 5,
    date: "October 2025",
    quote:
      "Boarded a brand-new ceiling in our laundry room after some plumbing work. Clean cuts around the vent and light box, and they vacuumed the laundry machines off before they left. Small thing, but it matters.",
    approved: true,
    source: "manual",
  },
  {
    name: "Megan O.",
    community: "Heritage Hills",
    service: "Painting",
    rating: 5,
    date: "September 2025",
    quote:
      "Whole-room refresh after a furniture rearrangement exposed every old scuff and nail hole. Patched, primed, and painted — the room genuinely feels new. Honest pricing, no surprises on the invoice.",
    approved: true,
    source: "manual",
  },
];
