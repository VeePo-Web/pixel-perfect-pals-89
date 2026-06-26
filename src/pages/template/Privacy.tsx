import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const Privacy = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.privacy;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />
      <SectionFrame tone="paper" size="lg">
        <article className="prose prose-neutral mx-auto max-w-3xl text-graphite">
          <h2 className="font-display text-display-md text-charcoal">What we collect</h2>
          <p>Your name, email, phone, address, and the photos and notes you submit through the booking form. Nothing else.</p>
          <h2 className="mt-12 font-display text-display-md text-charcoal">Why</h2>
          <p>So we can produce a written {`{SERVICE}`} quote and contact you about it. No marketing automation. No third-party sale.</p>
          <h2 className="mt-12 font-display text-display-md text-charcoal">How to remove</h2>
          <p>Email {`{EMAIL}`} with the subject line "delete." We confirm within 48 hours and purge the record.</p>
        </article>
      </SectionFrame>
    </TemplateLayout>
  );
};

export default Privacy;
