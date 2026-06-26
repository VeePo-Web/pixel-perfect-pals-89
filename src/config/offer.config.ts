/**
 * Grand Slam Offer Configuration — Hormozi's $100M Offers framework.
 *
 * A Grand Slam Offer is a packaged set of value deliverables so complete and
 * de-risked that the customer feels stupid saying no. It is not a price.
 * It is a NAMED OFFER with a value stack, a guarantee, and a clear result.
 *
 * To adapt for a sub-brand: override the items, priceAnchor, and guarantees
 * with trade-specific language. The structure stays the same.
 */

export interface OfferItem {
  label: string;
  description: string;
  valueNote: string;
}

export interface GrandSlamOfferConfig {
  offerName: string;
  tagline: string;
  items: OfferItem[];
  priceAnchor: string;
  whoFor: string;
  whoNotFor: string;
  ctaLabel: string;
}

export const GRAND_SLAM_OFFER: GrandSlamOfferConfig = {
  offerName: "The Generational Finish Guarantee",
  tagline: "Everything included. Nothing hidden. Guaranteed in writing.",

  items: [
    {
      label: "Level 5 Finish Standard",
      description:
        "The highest drywall finish grade available. The surface that looks perfect under raking light, under your chosen paint, and under scrutiny years from now.",
      valueNote: "Most contractors offer Level 3 or 4 by default. Level 5 is a premium upcharge elsewhere.",
    },
    {
      label: "Same-Day Photo Assessment",
      description:
        "Send two photos. Receive a written realistic range within one business day — not a vague estimate, not a call to schedule a quote. A number you can plan around.",
      valueNote: "Other contractors charge a $150–$250 consultation fee for the same information.",
    },
    {
      label: "Written Scope Before Work Starts",
      description:
        "Nothing begins without a confirmed, written scope tied to your specific project. No surprises, no scope creep, no invoice that looks different from the quote.",
      valueNote: "This protects you from the most common contractor complaint: scope creep.",
    },
    {
      label: "Contained, Respected Worksite",
      description:
        "Dust controlled to the work area. Floor protection in place. Crew who arrive on time, work cleanly, and leave the rest of your home as they found it.",
      valueNote: "Professional dust containment and cleanup services cost $150–$300 when billed separately.",
    },
    {
      label: "14-Day Touch-Up Guarantee",
      description:
        "Any finish issue that appears in the 14 days after project completion: we return at zero cost. No negotiation, no invoice, no argument.",
      valueNote:
        "Most contractors charge for call-backs. A single return visit runs $250–$450.",
    },
    {
      label: "15-Year Structural Warranty",
      description:
        "Any structural work we complete — framing, boarding, installation — is warranted for 15 years in writing on your invoice.",
      valueNote:
        "Industry standard is 1–2 years. Our structural warranty is 15. In writing. On every invoice.",
    },
  ],

  priceAnchor:
    "A general contractor charges $4,000–$8,000 for a basement installation package. We specialize in exactly this work — and our range runs $1,800–$3,200 for the same scope, with a stronger guarantee attached.",

  whoFor:
    "Homeowners who have been burned before. Who know the difference between a contractor who cares and one who just wants to move to the next job. Who understand that paying once for something done right is not the same as paying twice for something done fast.",

  whoNotFor:
    "If you need the cheapest option available — we are not it. If your timeline is 'yesterday' and quality in three years doesn't concern you — we are not the right fit. We will tell you this directly, and you can find a contractor who will serve you better in that context.",

  ctaLabel: "Get Your Free Written Assessment",
};
