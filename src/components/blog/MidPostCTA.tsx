import { ArrowRight } from "lucide-react";
import type { BookingClickHandler } from "@/config/template/booking-schema";

interface MidPostCTAProps {
  headline?: string;
  body?: string;
  onBookClick?: BookingClickHandler;
}

export const MidPostCTA = ({
  headline = "Want this done right?",
  body = "Send three or four photos. We'll write back with an honest scope and a written quote within one business day.",
  onBookClick,
}: MidPostCTAProps) => (
  <div
    data-cta="mid-post"
    className="my-12 border-l-[3px] border-copper bg-gradient-to-r from-copper/[0.05] to-transparent p-6 sm:p-8"
  >
    <div className="max-w-xl">
      <h3 className="mb-3 font-serif font-medium text-display-sm text-charcoal">
        {headline}
      </h3>
      <p className="mb-6 text-body text-graphite leading-relaxed">{body}</p>
      <button
        type="button"
        onClick={() => onBookClick?.({ source: "Blog mid-post → Book Now" })}
        className="group inline-flex min-h-[48px] items-center gap-2 bg-forest px-6 py-3 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground transition-colors hover:bg-forest-deep"
      >
        Send Photos
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
);