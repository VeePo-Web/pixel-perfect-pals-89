import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { SloganHeartbeat, BlueprintGrain, CornerstoneStamp } from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

// 404 page: slogan is the only body line beneath the title.
// "lost-blueprint" tone — still brand-rooted, never humorous.
const TemplateNotFound = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.notFound;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <SectionFrame tone="bone" size="xl" grain>
        <div className="relative mx-auto max-w-2xl text-center">
          <BlueprintGrain opacity={0.025} className="absolute inset-0 pointer-events-none" />

          <p className="eyebrow-copper mb-6">{c.eyebrow}</p>
          <h1 className="text-display-xl text-charcoal" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 300 }}>
            {c.title}
          </h1>

          {/* Slogan — the only body line. Sacred. */}
          <div className="mt-8 mb-4">
            <SloganHeartbeat variant="whisper" className="block" />
          </div>

          <p className="text-body text-graphite">{c.lede}</p>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="rounded-none bg-forest px-6 py-3.5 text-sm font-medium tracking-[0.1em] uppercase text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              Back to home
            </Link>
            <Link
              to="/services"
              className="rounded-none px-6 py-3.5 text-sm font-medium tracking-[0.1em] uppercase text-charcoal transition-colors hover:text-forest"
              style={{ border: "1px solid hsl(var(--copper) / 0.20)" }}
            >
              See services
            </Link>
          </div>

          {/* Cornerstone stamp — bottom right, pressed into the page */}
          <div className="absolute -bottom-8 -right-4 opacity-40">
            <CornerstoneStamp size={64} />
          </div>
        </div>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default TemplateNotFound;
