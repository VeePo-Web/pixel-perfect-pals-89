import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import HeroImage from "./HeroImage";
import { BRAND_IDENTITY } from "@/config";
import type { BookingPrefill } from "@/config/drywall-booking";

interface HeroProps {
  eyebrow?: string;
  headline: string;
  sub: string;
  primaryLabel?: string;
  onPrimaryClick?: (prefill?: BookingPrefill) => void;
  prefill?: BookingPrefill;
  secondaryLabel?: string;
  secondaryHref?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

const Hero = ({
  eyebrow = "Cochrane, Alberta",
  headline,
  sub,
  primaryLabel = BRAND_IDENTITY.pillars.cleanRepairs.ctas[0],
  onPrimaryClick,
  prefill,
  secondaryLabel = "See pricing & process",
  secondaryHref = "/pricing-process",
  backgroundImage,
  backgroundAlt = "",
}: HeroProps) => {
  return (
    <section className="paper-grain relative bg-bone overflow-hidden">
      {backgroundImage && (
        <HeroImage src={backgroundImage} alt={backgroundAlt} gradientFrom="left" opacity={38} />
      )}
      <div className="container relative z-10 mx-auto px-6 pt-24 pb-20 md:pt-36 md:pb-28">
        <div className="grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-8">
            <ScrollReveal>
              <p className="font-eyebrow mb-6">{eyebrow}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <h1 className="text-display-xl text-charcoal">{headline}</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.12}>
              <p className="mt-6 max-w-2xl text-body-lg text-graphite">{sub}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-4 max-md:mt-7 max-md:flex-col max-md:items-stretch">
                <button
                  type="button"
                  onClick={() => onPrimaryClick?.(prefill)}
                  className="cta-forest inline-flex items-center justify-center gap-2 rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep max-md:w-full"
                >
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <a
                  href={secondaryHref}
                  className="story-link text-sm font-medium text-charcoal max-md:text-center"
                >
                  {secondaryLabel}
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.25} className="md:col-span-4">
            <div className="flex flex-col gap-6 border-l border-seam pl-6 max-md:border-l-0 max-md:border-t max-md:border-seam max-md:pl-0 max-md:pt-6">
              <p className="font-display text-display-sm text-forest">
                “Finally Get That Wall Handled.”
              </p>
              <p className="text-graphite">
                Focused residential finishing — drywall, paint, and insulation. Small jobs welcome.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
