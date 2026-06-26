import { lazy, Suspense } from "react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import PriceBandsTable from "@/components/template/PriceBandsTable";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const ValueLadder = lazy(() => import("@/components/master/ValueLadder").then(m => ({ default: m.ValueLadder })));
const ObjectionSection = lazy(() => import("@/components/master/ObjectionSection").then(m => ({ default: m.ObjectionSection })));

interface Props { onBookClick?: BookingClickHandler }

const STEPS = [
  { title: "Quote", description: "Photos in. Itemised quote out within 24 hours. Free." },
  { title: "Schedule", description: "Window agreed in writing. We do not sell timelines we cannot keep." },
  { title: "Build", description: "Same crew, start to finish. Worksite visibly cleaner than we found it." },
  { title: "Warranty", description: "14-day touch-up at zero cost. 15-year structural guarantee on the invoice." },
];

const Pricing = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.pricing;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="bone" size="lg" grain>
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <SectionTitle eyebrow="Philosophy" headline={c.philosophy.headline} lede={c.philosophy.body} />
          </div>
          <div className="md:col-span-7">
            <RemixSlot name="PRICE_BANDS">
              <PriceBandsTable
                title="{SERVICE} — honest bands"
                bands={MASTER_REMIX.PRICE_BANDS}
                note="Final invoice = band + material grade you select. Nothing else moves the number."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}><ValueLadder /></Suspense>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="Process" headline="What happens between yes and sign-off." />
        <div className="mt-12"><ProcessSteps steps={STEPS} /></div>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}><ObjectionSection /></Suspense>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Find your band. Receive the written number."
        body="No sales call between you and the quote. Three photos in. The math out."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Pricing → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default Pricing;
