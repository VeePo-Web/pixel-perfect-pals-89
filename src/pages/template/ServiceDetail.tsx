import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import FAQAccordion from "@/components/drywall/FAQAccordion";
import PriceBandsTable from "@/components/template/PriceBandsTable";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

const GuaranteeBlock = lazy(() => import("@/components/master/GuaranteeBlock").then(m => ({ default: m.GuaranteeBlock })));
const ObjectionSection = lazy(() => import("@/components/master/ObjectionSection").then(m => ({ default: m.ObjectionSection })));

interface Props { onBookClick?: BookingClickHandler }

const STEPS = [
  { title: "Photos in", description: "Send three to five photos and a sentence about the {SERVICE} surface in question." },
  { title: "Written quote out", description: "Within 24 hours. Itemised by surface, by material grade, by cure window." },
  { title: "We {SERVICE_VERB}", description: "Same crew start to finish. Same standard from the smallest patch to the largest install." },
  { title: "Sign-off + warranty", description: "Walk-through with you. 14-day touch-up window opens. 15-year structural guarantee filed." },
];

const ServiceDetail = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.serviceDetail;
  const sub = MASTER_REMIX.SUB_SERVICES[0];
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero
        eyebrow="{SERVICE_CATEGORY} · {SERVICE}"
        title={`${sub.title} — the full scope.`}
        lede="One sub-service. One crew. One price band. One guarantee."
      />

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.whatYouGet.eyebrow} headline={c.whatYouGet.headline} lede={c.whatYouGet.body} />
        <RemixSlot name="WHAT_YOU_GET">
          <ul className="mt-10 grid gap-px bg-seam md:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="bg-paper p-8">
                <span className="font-eyebrow text-mist">Inclusion {String(i).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-display-sm text-charcoal">{`{SCOPE_LINE_${i}}`}</p>
                <p className="mt-2 text-graphite">A specific deliverable for this {`{SERVICE}`} sub-service.</p>
              </li>
            ))}
          </ul>
        </RemixSlot>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="Material · method" headline="The grades we install. The methods we use." />
        <div className="mt-12 grid gap-px bg-seam md:grid-cols-3">
          {["Material", "Method", "Measurement"].map((m, i) => (
            <div key={m} className="bg-paper p-8">
              <span className="font-display text-5xl text-forest/40">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-display-sm text-charcoal">{m}</h3>
              <p className="mt-3 text-graphite">{`{${m.toUpperCase()}_DETAIL} — replace with the binding answer for this {SERVICE} sub-service.`}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow="Process" headline="Four steps. The first three are free." />
        <div className="mt-12"><ProcessSteps steps={STEPS} /></div>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="Proof" headline="The walls. Before. After." />
        <div className="mt-12">
          <RemixSlot name="PROOF"><BeforeAfterPair pairs={MASTER_REMIX.PROOF} /></RemixSlot>
        </div>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <SectionTitle eyebrow="Pricing" headline="The band for this sub-service." />
          </div>
          <div className="md:col-span-7">
            <RemixSlot name="PRICE_BANDS">
              <PriceBandsTable bands={MASTER_REMIX.PRICE_BANDS} note="Final invoice = band + material grade you select." />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <Suspense fallback={null}><GuaranteeBlock variant="full" /></Suspense>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow="Common questions" headline="The questions every {SERVICE} client asks." />
        <div className="mt-10"><FAQAccordion items={MASTER_REMIX.FAQS} /></div>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <Suspense fallback={null}><ObjectionSection /></Suspense>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.relatedServices.eyebrow} headline={c.relatedServices.headline} />
        <div className="mt-10 grid gap-px bg-seam md:grid-cols-3">
          {MASTER_REMIX.SUB_SERVICES.slice(1, 4).map((s) => (
            <Link key={s.title} to="/services/detail" className="block bg-paper p-8 transition-colors hover:bg-bone">
              <h3 className="font-display text-display-sm text-charcoal">{s.title}</h3>
              <p className="mt-3 text-graphite">{s.summary}</p>
            </Link>
          ))}
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Send three photos of this surface."
        body="Written quote within 24 hours. Bound to scope. Bound to the 15-year guarantee."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: `Service detail → ${sub.title}` }}
      />
    </TemplateLayout>
  );
};

export default ServiceDetail;
