import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const Terms = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.terms;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />
      <SectionFrame tone="paper" size="lg">
        <article className="prose prose-neutral mx-auto max-w-3xl text-graphite">
          <h2 className="font-display text-display-md text-charcoal">Quotes are written</h2>
          <p>Every {`{SERVICE}`} quote is delivered in writing and is valid for 30 days from issue.</p>
          <h2 className="mt-12 font-display text-display-md text-charcoal">Guarantees are written</h2>
          <p>The Worksite, Touch-Up, and 15-Year Structural guarantees are printed on every invoice — not posted, not assumed.</p>
          <h2 className="mt-12 font-display text-display-md text-charcoal">Disputes</h2>
          <p>Any dispute is resolved by a site visit and a written response within seven days. We do not let small issues become big ones.</p>
        </article>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default Terms;
