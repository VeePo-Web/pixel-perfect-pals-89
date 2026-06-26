import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import InnerHero from "@/components/drywall/InnerHero";
import ImageMosaic from "@/components/drywall/ImageMosaic";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import CTABand from "@/components/drywall/CTABand";
import RemixSlot from "@/components/template/RemixSlot";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import type { BookingClickHandler } from "@/config/drywall-booking";

interface Props { onBookClick?: BookingClickHandler }

const Gallery = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.gallery;
  // Use manifest-generated images from MASTER_REMIX; fall back to empty mosaic
  // (no placeholder.svg — run scripts/regenerate-images.ts to populate).
  const galleryItems = MASTER_REMIX.GALLERY_IMAGES.length > 0
    ? MASTER_REMIX.GALLERY_IMAGES.map(img => ({
        src: img.src,
        alt: img.alt,
        caption: img.caption,
        aspect: img.aspect,
      }))
    : [];

  return (
    <TemplateLayout onBookClick={onBookClick}>
      <InnerHero eyebrow={c.hero.eyebrow} title={c.hero.title} lede={c.hero.lede} />

      <SectionFrame tone="paper" size="lg">
        <RemixSlot name="GALLERY_IMAGES">
          {galleryItems.length > 0 ? (
            <ImageMosaic items={galleryItems} layout="3-up" />
          ) : (
            <div className="flex aspect-[3/2] items-center justify-center border border-copper/20 bg-paper text-caption text-mist">
              Gallery images not yet generated — run scripts/regenerate-images.ts
            </div>
          )}
        </RemixSlot>
      </SectionFrame>

      <SectionFrame tone="bone" size="lg">
        <RemixSlot name="PROOF">
          <BeforeAfterPair pairs={MASTER_REMIX.PROOF} />
        </RemixSlot>
      </SectionFrame>

      <CTABand
        eyebrow="Begin"
        headline="Send the wall you want to live with."
        body="Photo in. Written quote out. The next image in this gallery could be yours."
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Gallery → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default Gallery;
