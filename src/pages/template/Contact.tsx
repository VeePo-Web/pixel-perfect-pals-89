import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import InnerHero from "@/components/drywall/InnerHero";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const Contact = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.contact;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <div className="grid gap-px bg-seam md:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Phone", value: "{PHONE}" },
            { label: "Email", value: "{EMAIL}" },
            { label: "Hours", value: "Mon–Sat · 7am–6pm" },
            { label: "Service area", value: MASTER_REMIX.COMMUNITIES.slice(0, 4).join(" · ") + " + 4 more" },
          ].map((it) => (
            <div key={it.label} className="bg-paper p-8">
              <p className="font-eyebrow text-mist">{it.label}</p>
              <p className="mt-3 font-display text-display-sm text-charcoal break-words">{it.value}</p>
            </div>
          ))}
        </div>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg" grain>
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionTitle eyebrow="Booking" headline={c.booking.headline} lede={c.booking.body} />
            <button
              type="button"
              onClick={() => onBookClick?.({ source: "Contact → Open booking" })}
              className="cta-forest mt-8 inline-flex rounded-sm bg-forest px-6 py-3.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-forest-deep"
            >
              {TEMPLATE_COPY.cta.primary}
            </button>
          </div>
          <div className="md:col-span-5">
            <RemixSlot name="MAP_PLACEHOLDER" hint="Static map of Cochrane + service area">
              <div className="aspect-[4/3] border border-seam bg-paper">
                <div className="flex h-full items-center justify-center text-mist text-caption">
                  {`{MAP_IMAGE}`}
                </div>
              </div>
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Three photos. One written quote. No sales call."
        body="Standard turnaround on the written estimate is under 24 hours."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Contact → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default Contact;
