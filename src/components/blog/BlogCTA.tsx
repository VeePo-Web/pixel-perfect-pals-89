import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { BookingClickHandler } from "@/config/template/booking-schema";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface BlogCTAProps {
  headline?: string;
  subheadline?: string;
  body?: string;
  onBookClick?: BookingClickHandler;
}

export const BlogCTA = ({
  headline = "Ready to start?",
  subheadline = "No sales call. No pressure.",
  body = "Send three or four photos through the booking form. You'll have a written estimate within 24 hours.",
  onBookClick,
}: BlogCTAProps) => (
  <section
    data-cta="blog-bottom"
    className="my-16 border-t border-b border-copper/20 bg-paper"
  >
    <div className="container mx-auto max-w-3xl px-6 py-16 text-center">
      <span className="mb-4 inline-flex items-center gap-2">
        <span className="h-1 w-6 bg-copper" />
        <span className="text-eyebrow uppercase tracking-[0.22em] text-mist">
          {subheadline}
        </span>
        <span className="h-1 w-6 bg-copper" />
      </span>
      <h2
        className="mb-5 font-serif font-medium text-display-lg text-charcoal"
        style={{ textWrap: "balance" } as React.CSSProperties}
      >
        {headline}
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-body-lg text-graphite">{body}</p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={() => onBookClick?.({ source: "Blog bottom CTA → Book Now" })}
          className="group inline-flex min-h-[48px] items-center gap-2 bg-forest px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-forest-deep"
        >
          Send Photos
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
        <Link
          to="/areas-we-serve"
          className="inline-flex min-h-[48px] items-center gap-2 border border-charcoal/20 px-7 py-3 text-sm font-medium uppercase tracking-[0.12em] text-charcoal transition-colors hover:border-charcoal hover:bg-bone"
        >
          See {MASTER_REMIX.SERVICE_REGION_LABEL}
        </Link>
      </div>
    </div>
  </section>
);