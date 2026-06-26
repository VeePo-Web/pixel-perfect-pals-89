import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const WhyWeLoveService = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.whyWeLove;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="bone" size="lg" grain>
        <SectionTitle eyebrow="The obsession" headline={c.obsession.headline} lede={c.obsession.body} />
      </SectionFrame>

      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow="Material · method · measurement" headline="The three places quality is decided." />
        <RemixSlot name="METHODS">
          <div className="mt-12 grid gap-px bg-seam md:grid-cols-3">
            {c.methods.map((m, i) => (
              <div key={m.title} className="bg-paper p-8">
                <span className="font-display text-5xl text-forest/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-display text-display-sm text-charcoal">{m.title}</h3>
                <p className="mt-3 text-graphite">{m.body}</p>
              </div>
            ))}
          </div>
        </RemixSlot>
      </SectionFrame>

      <RemixSlot name="HERO_IMAGE" hint="Macro detail of {SERVICE} surface">
        <EditorialQuote quote={c.quote} attribution="House rule" image={MASTER_REMIX.WHY_HERO_MACRO} height="44vh" />
      </RemixSlot>

      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow="Proof" headline="The only argument that matters: the wall before, the wall after." />
        <div className="mt-12">
          <RemixSlot name="PROOF">
            <BeforeAfterPair pairs={MASTER_REMIX.PROOF} />
          </RemixSlot>
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Show us a {SERVICE} surface you've stopped looking at."
        body="Three photos. Twenty-four hours. A written quote against scope, not budget."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Why We Love → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default WhyWeLoveService;
