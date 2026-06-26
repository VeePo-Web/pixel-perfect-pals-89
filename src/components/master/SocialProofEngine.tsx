/**
 * SocialProofEngine — Hormozi's Before/After results testimonial format.
 *
 * Data source: useReviews() → Supabase (approved rows) with static fallback.
 * Visual code: pixel-identical to pre-migration version.
 * Schema: mounts <AggregateRatingSchema> when ≥ 3 approved reviews exist.
 */

import { motion } from "framer-motion";
import { useReviews } from "@/hooks/use-reviews";
import { AggregateRatingSchema } from "@/components/template/AggregateRatingSchema";
import { REVIEWS, type Review } from "@/config/reviews";

interface SocialProofEngineProps {
  reviews?: Review[];           // optional override (bypasses Supabase)
  variant?: "grid" | "featured";
  maxItems?: number;
  className?: string;
}

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

// ─── Enrich reviews with Before/After derived from quote + service ────────────
const enrichReviews = (reviews: Review[]) =>
  reviews.map((r) => {
    const befores: Record<string, string> = {
      Repair: "Visible wall or ceiling damage — left unaddressed.",
      Installation: "Exposed framing, unfinished interior space.",
      Painting: "Worn, scuffed, or patched walls needing refresh.",
      Garage: "Bare garage framing — not functional living space.",
      Basement: "Unfinished basement — cold, unusable, uninsulated.",
    };
    const afters: Record<string, string> = {
      Repair: "Repair invisible. Wall reads as one unbroken surface.",
      Installation: "Boarded, taped, finished. Space transformed.",
      Painting: "Clean, fresh, sharp edges. Room reads as new.",
      Garage: "Insulated, boarded, painted. Full working space.",
      Basement: "Warm, finished, usable. The room you wanted.",
    };

    const timeMatch = r.quote.match(
      /\b(an? \w+day|one \w+day|\d+ days?|a week|\w+ hour[s]?|the \w+end)\b/i
    );

    return {
      ...r,
      before: befores[r.service] ?? "Prior condition requiring attention.",
      after: afters[r.service] ?? "Project complete. Result as specified.",
      timeframe: timeMatch ? timeMatch[0] : undefined,
    };
  });

// ─── Star rating ──────────────────────────────────────────────────────────────
const Stars = ({ rating }: { rating: number }) => (
  <div
    className="flex items-center gap-0.5"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((s) => (
      <svg
        key={s}
        viewBox="0 0 12 12"
        className={[
          "w-3 h-3",
          s <= Math.floor(rating) ? "text-[#8B6B4A]" : "text-[#8B6B4A]/25",
        ].join(" ")}
        fill="currentColor"
        aria-hidden
      >
        <path d="M6 1l1.4 3h3.1l-2.5 1.9.9 3L6 7.3 4.1 9 5 5.9 2.5 4H5.6z" />
      </svg>
    ))}
  </div>
);

// ─── Single review card (visual unchanged) ────────────────────────────────────
const ReviewCard = ({
  review,
  large = false,
}: {
  review: ReturnType<typeof enrichReviews>[number];
  large?: boolean;
}) => (
  <div className="ring-1 ring-[#1F2F4D]/06 rounded-[1.5rem] p-1.5 bg-white/80 h-full">
    <div className="rounded-[calc(1.5rem-0.375rem)] p-6 md:p-8 bg-[#FDFBF7] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] h-full flex flex-col">
      {/* Before / After strip */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#7A8BAA] mb-1">
            Before
          </p>
          <p className="font-body text-[0.8125rem] leading-[1.5] text-[#7A8BAA] font-light truncate">
            {review.before}
          </p>
        </div>
        <div className="w-px bg-[#EDE9E1] flex-shrink-0" aria-hidden />
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#8B6B4A] mb-1">
            After
          </p>
          <p className="font-body text-[0.8125rem] leading-[1.5] text-[#1F2F4D] font-light truncate">
            {review.after}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-[#EDE9E1] mb-5" aria-hidden />

      {/* Quote */}
      <blockquote
        className={[
          "font-display leading-[1.45] tracking-[-0.005em] text-[#1F2F4D] font-light flex-1",
          large ? "text-[1.25rem]" : "text-[1rem]",
        ].join(" ")}
      >
        "{review.quote}"
      </blockquote>

      {/* Attribution + stars */}
      <div className="mt-6 flex items-end justify-between gap-3">
        <div>
          <p className="font-body text-[0.875rem] font-medium text-[#1F2F4D]">
            {review.name}
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7A8BAA] mt-0.5">
            {review.community} · {review.service}
            {review.timeframe && ` · ${review.timeframe}`}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1">
          <Stars rating={review.rating} />
          <p className="font-mono text-[11px] text-[#7A8BAA]">{review.date}</p>
        </div>
      </div>
    </div>
  </div>
);

// ─── Export component ─────────────────────────────────────────────────────────
export const SocialProofEngine = ({
  reviews: reviewsProp,
  variant = "grid",
  maxItems = 6,
  className = "",
}: SocialProofEngineProps) => {
  // If reviews are passed as props, skip the hook (used in Storybook / tests)
  const hookResult = useReviews({ maxItems });
  const source = reviewsProp ?? hookResult.reviews;
  const { aggregate } = hookResult;
  const enriched = enrichReviews(source).slice(0, maxItems);

  return (
    <section
      className={["bg-[#FDFBF7] py-20 md:py-28 overflow-hidden", className].join(
        " "
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-12"
        >
          <div className="inline-block rounded-full border border-[#1F2F4D]/12 bg-[#1F2F4D]/06 px-4 py-1.5 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-[#5C6B8A]">
              Real results
            </span>
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-[1.1] tracking-[-0.015em] text-[#1F2F4D] font-light max-w-lg">
            Before and after. In their words.
          </h2>
        </motion.div>

        {/* Featured: 1 large + 2 smaller */}
        {variant === "featured" && enriched.length >= 3 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, ease: EASE }}
              className="md:row-span-2"
            >
              <ReviewCard review={enriched[0]} large />
            </motion.div>
            {enriched.slice(1, 3).map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i + 1) * 0.1 }}
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </div>
        ) : (
          /* Grid: equal cards */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enriched.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.75, ease: EASE, delay: i * 0.08 }}
              >
                <ReviewCard review={r} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Review count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-[#7A8BAA] text-center"
        >
          {(aggregate?.totalReviews ?? REVIEWS.length)} reviews · All real · All from Cochrane and area
        </motion.p>

        {/* Aggregate rating schema — only when ≥ 3 approved reviews exist */}
        {aggregate && aggregate.totalReviews >= 3 && (
          <AggregateRatingSchema
            aggregate={aggregate}
            reviews={source}
          />
        )}
      </div>
    </section>
  );
};
