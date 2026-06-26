import type { BookingPrefill } from "@/config/drywall-booking";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface CTABandProps {
  eyebrow?: string;
  headline: string;
  body?: string;
  primaryLabel?: string;
  onPrimaryClick?: (prefill?: BookingPrefill) => void;
  /** Optional context to seed the booking modal when the primary CTA is tapped. */
  prefill?: BookingPrefill;
  secondaryLabel?: string;
  onSecondaryClick?: () => void;
}

const CTABand = ({
  eyebrow = "Next step",
  headline,
  body,
  primaryLabel = "Send Photos for a Quote",
  onPrimaryClick,
  prefill,
  secondaryLabel,
  onSecondaryClick,
}: CTABandProps) => {
  return (
    <section data-cta-band className="bg-forest text-primary-foreground">
      <div className="container mx-auto px-6 py-20 md:py-28 max-md:py-14">
        <div className="max-w-3xl">
          <p className="font-eyebrow text-primary-foreground/70">{eyebrow}</p>
          <h2 className="mt-4 text-display-lg text-primary-foreground">{headline}</h2>
          {body && <p className="mt-5 max-w-2xl text-body-lg text-primary-foreground/85">{body}</p>}
          <div className="mt-8 flex flex-wrap gap-3 max-md:flex-col">
            <button
              type="button"
              onClick={() => onPrimaryClick?.(prefill)}
              className="rounded-sm bg-bone px-6 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-paper max-md:w-full"
            >
              {primaryLabel}
            </button>
            {secondaryLabel && (
              <button
                type="button"
                onClick={onSecondaryClick}
                className="rounded-sm border border-primary-foreground/30 px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/10 max-md:w-full"
              >
                {secondaryLabel}
              </button>
            )}
          </div>
          {/* Generational slogan — sealing every CTA band with the brand promise */}
          <p
            className="mt-10 uppercase text-primary-foreground/55"
            style={{
              fontFamily: "'Jost', system-ui, sans-serif",
              fontSize: 11,
              fontWeight: 400,
              letterSpacing: "0.24em",
            }}
          >
            <span aria-hidden style={{ color: "hsl(var(--copper))", marginRight: "0.6em" }}>▪</span>
            {MASTER_REMIX.BRAND_SLOGAN}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTABand;
