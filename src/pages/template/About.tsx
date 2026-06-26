import { lazy, Suspense } from "react";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import HeritageRelay from "@/components/template/bespoke/HeritageRelay";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import type { BookingClickHandler } from "@/config/drywall-booking";

const MasterBuilderSeal = lazy(() => import("@/components/master/MasterBuilderSeal").then(m => ({ default: m.MasterBuilderSeal })));

interface Props { onBookClick?: BookingClickHandler }

const About = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.about;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg" grain>
        <HeritageRelay />
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="The crew" headline="Six people. Cochrane locals. Master-builder grade." />
        <RemixSlot name="TEAM">
          <div className="mt-12 grid gap-px bg-seam md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-paper p-8">
                <span className="font-eyebrow text-mist">Crew · {String(i).padStart(2, "0")}</span>
                <p className="mt-3 font-display text-display-sm text-charcoal">{`{TEAM_MEMBER_${i}_NAME}`}</p>
                <p className="mt-2 text-graphite">{`{TEAM_MEMBER_${i}_ROLE}`} — short bio of how long they've been on the {`{SERVICE}`} crew.</p>
              </div>
            ))}
          </div>
        </RemixSlot>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow="What we will not change" headline="Four values. One standard." />
        <div className="mt-12 grid gap-px bg-seam md:grid-cols-2">
          {c.values.map((v) => (
            <div key={v.title} className="bg-paper p-8">
              <h3 className="font-display text-display-sm text-charcoal">{v.title}</h3>
              <p className="mt-3 text-graphite">{v.body}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tone="bone" size="md">
        <Suspense fallback={null}><MasterBuilderSeal /></Suspense>
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-eyebrow mb-4">Community roots</p>
          <p className="font-display text-display-md text-charcoal">{c.communityRoots}</p>
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Hire the seventh generation."
        body="Send three photos. Receive the written quote. Decide on your terms."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "About → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default About;
