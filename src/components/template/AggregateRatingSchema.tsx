/**
 * AggregateRatingSchema — JSON-LD structured data for Google rich results.
 *
 * Injects into <head> via react-helmet-async. Only mounts when
 * reviewCount ≥ 3 (Google's minimum for rich-result eligibility).
 *
 * Produces:
 *   - LocalBusiness + AggregateRating (drives the star snippet in SERPs)
 *   - Individual Review items for each displayed review
 *
 * Server-side safe — no window/document access. Helmet handles placement.
 */

import { Helmet } from "react-helmet-async";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { ReviewAggregate, Review } from "@/config/reviews";

interface AggregateRatingSchemaProps {
  aggregate: ReviewAggregate;
  reviews: Review[];
}

export const AggregateRatingSchema = ({
  aggregate,
  reviews,
}: AggregateRatingSchemaProps) => {
  // Guard: Google requires at least 3 reviews for rich results
  if (aggregate.totalReviews < 3) return null;

  const individualReviews = reviews
    .filter((r) => r.approved)
    .slice(0, 10)         // schema bloat guard — 10 max
    .map((r) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: r.name,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating.toString(),
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: r.quote,
      datePublished: r.date,
    }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: MASTER_REMIX.BRAND_NAME,
    url: MASTER_REMIX.BRAND_URL,
    telephone: MASTER_REMIX.PHONE,
    image: MASTER_REMIX.OG_IMAGE,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: aggregate.averageRating.toFixed(1),
      reviewCount: aggregate.totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    review: individualReviews,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
