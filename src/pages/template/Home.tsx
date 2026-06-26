import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import TemplateLayout from "@/components/template/TemplateLayout";
import SectionFrame from "@/components/template/SectionFrame";
import SectionTitle from "@/components/drywall/SectionTitle";
import TrustNumbers from "@/components/template/TrustNumbers";
import ServicesGrid from "@/components/template/ServicesGrid";
import PriceBandsTable from "@/components/template/PriceBandsTable";
import RemixSlot from "@/components/template/RemixSlot";
import EditorialImage from "@/components/drywall/EditorialImage";
import EditorialQuote from "@/components/drywall/EditorialQuote";
import BeforeAfterPair from "@/components/drywall/BeforeAfterPair";
import ProcessSteps from "@/components/drywall/ProcessSteps";
import FAQAccordion from "@/components/drywall/FAQAccordion";
import CTABand from "@/components/drywall/CTABand";
import HeroImage from "@/components/drywall/HeroImage";
import ScrollReveal from "@/components/drywall/ScrollReveal";
import { TEMPLATE_COPY } from "@/config/template/template-copy";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import {
  HeroEtchedUnderline,
  SloganHeartbeat,
  CornerstoneStamp,
  FoundationCounter,
  PlumbLineDivider,
  BlueprintGrain,
} from "@/components/template/bespoke";
import type { BookingClickHandler } from "@/config/drywall-booking";

const SocialProofEngine = lazy(() => import("@/components/master/SocialProofEngine").then(m => ({ default: m.SocialProofEngine })));
const GuaranteeBlock = lazy(() => import("@/components/master/GuaranteeBlock").then(m => ({ default: m.GuaranteeBlock })));

interface Props { onBookClick?: BookingClickHandler }

const HOME_PROCESS = [
  { title: "Send three photos", description: "From your phone. Of the {SERVICE} surface, the lighting, and the room context. That is the entire ask." },
  { title: "Receive a written quote in 24 hours", description: "Itemised. Tied to scope. Bound to the 15-year structural guarantee. No sales call between you and the number." },
  { title: "We {SERVICE_VERB} on the agreed window", description: "Same crew, start to finish. Worksite cleaner than we found it or the work is free." },
  { title: "Sign-off and warranty registered", description: "Walk-through with you. Warranty card filed. Touch-up window opens for 14 days at zero cost." },
];

const TemplateHome = ({ onBookClick }: Props) => {
  const c = TEMPLATE_COPY.home;
  return (
    <TemplateLayout onBookClick={onBookClick}>
      {/* HERO */}
      <RemixSlot name="HERO_IMAGE" hint="Bind a service-specific AVIF (≤140KB)">
        <section className="relative isolate flex min-h-[82svh] items-center overflow-hidden border-b border-seam/60 bg-bone">
          <BlueprintGrain opacity={0.018} />
          {MASTER_REMIX.HERO_IMAGE && (
            <HeroImage src={MASTER_REMIX.HERO_IMAGE} alt="" gradientFrom="left" opacity={32} />
          )}
          <div className="container relative z-10 mx-auto w-full px-6 py-20 md:py-28">
            <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
              {/* LEFT — the argument (sequential reveal: eyebrow → headline → mark → sub → CTA) */}
              <div className="md:col-span-7">
                <ScrollReveal>
                  {/* Eyebrow: 24px copper hairline + Jost caps */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="hairline-copper w-6 flex-shrink-0" />
                    <p className="eyebrow-copper">{c.hero.eyebrow}</p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.06}>
                  <h1
                    className="text-charcoal"
                    style={{
                      fontFamily: "'Space Grotesk', system-ui, sans-serif",
                      fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)",
                      fontWeight: 300,
                      letterSpacing: "-0.025em",
                      lineHeight: 0.98,
                    }}
                  >
                    {c.hero.headline}
                  </h1>
                </ScrollReveal>

                <ScrollReveal delay={0.14}>
                  {/* Hand-etched copper underline — a measured stroke, not a full-column rule */}
                  <HeroEtchedUnderline className="mt-5 mb-5 block w-40 md:w-56" />
                  {/* Slogan whisper — beneath the H1 */}
                  <SloganHeartbeat variant="whisper" className="mb-7 block" />
                </ScrollReveal>

                <ScrollReveal delay={0.2}>
                  <p className="max-w-[56ch] text-body-lg text-graphite">{c.hero.sub}</p>
                </ScrollReveal>

                <ScrollReveal delay={0.28}>
                  <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                    <button
                      type="button"
                      onClick={() => onBookClick?.({ source: "Home hero" })}
                      className="w-full rounded-none bg-forest px-7 py-4 text-sm font-medium uppercase tracking-[0.12em] text-primary-foreground shadow-[0_1px_0_hsl(var(--forest-deep))] transition-[transform,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-forest-deep hover:shadow-[0_12px_30px_-10px_hsl(var(--forest)/0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985] sm:w-auto"
                    >
                      {TEMPLATE_COPY.cta.primary}
                    </button>
                    <Link
                      to="/pricing"
                      className="w-full rounded-none border border-[hsl(var(--copper)/0.35)] px-7 py-4 text-center text-sm font-medium uppercase tracking-[0.12em] text-charcoal transition-[transform,color,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-forest/30 hover:bg-forest/[0.04] hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest/30 focus-visible:ring-offset-2 focus-visible:ring-offset-bone active:translate-y-0 active:scale-[0.985] sm:w-auto"
                    >
                      {TEMPLATE_COPY.cta.secondary}
                    </Link>
                  </div>
                </ScrollReveal>
              </div>

              {/* RIGHT — the seal: cornerstone registration mark, grid-anchored (desktop) */}
              <ScrollReveal delay={0.34} className="hidden md:col-span-5 md:block">
                <div className="flex items-center justify-center border-l border-seam/70 pl-10 lg:pl-16">
                  <CornerstoneStamp size={132} />
                </div>
              </ScrollReveal>
            </div>

            {/* Mobile seal — in-flow beneath the argument, never colliding */}
            <ScrollReveal delay={0.34} className="md:hidden">
              <div className="mt-12 flex items-center gap-4">
                <span className="hairline-copper flex-1" />
                <CornerstoneStamp size={56} />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </RemixSlot>

      {/* TRUST BAR */}
      <SectionFrame tone="paper" size="sm">
        <RemixSlot name="TRUST_NUMBERS">
          <TrustNumbers items={MASTER_REMIX.TRUST_NUMBERS} />
        </RemixSlot>
        <div className="mt-6 flex flex-col items-start justify-between gap-4 border-t border-seam/60 pt-6 md:flex-row md:items-center">
          <p className="font-eyebrow text-[11px] tracking-[0.18em] text-mist md:text-[11px]">
            Since 1958 · Cochrane, AB
          </p>
          <FoundationCounter />
        </div>
      </SectionFrame>


      {/* PROMISE */}
      <SectionFrame tone="bone" size="lg" grain>
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7">
            <SectionTitle eyebrow={c.promise.eyebrow} headline={c.promise.headline} lede={c.promise.body} />
          </div>
          <div className="md:col-span-5">
            <RemixSlot name="HERO_IMAGE" hint="Editorial detail shot of {SERVICE}">
              <EditorialImage
                src={MASTER_REMIX.HERO_IMAGE}
                alt={`${MASTER_REMIX.SERVICE} surface detail in ${MASTER_REMIX.COMMUNITIES[0]} — completed, sign-off day`}
                caption="A finished surface — taken on sign-off day."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* SERVICES */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.services.eyebrow} headline={c.services.headline} lede={c.services.lede} />
        <div className="mt-12">
          <RemixSlot name="SUB_SERVICES">
            <ServicesGrid services={MASTER_REMIX.SUB_SERVICES} hrefFor={() => "/services"} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* PROOF */}
      <SectionFrame tone="bone" size="lg">
        <SectionTitle eyebrow={c.proof.eyebrow} headline={c.proof.headline} lede={c.proof.lede} />
        <div className="mt-12">
          <RemixSlot name="PROOF" hint="Before/after image pairs">
            <BeforeAfterPair pairs={MASTER_REMIX.PROOF} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* MANIFESTO QUOTE */}
      <RemixSlot name="HERO_IMAGE" hint="Atmospheric backdrop">
        <EditorialQuote
          quote="The standard is the standard. We do not lower it for a smaller job, a tighter budget, or a faster timeline."
          attribution="The {BRAND_NAME} crew"
          image={MASTER_REMIX.MANIFESTO_BACKDROP || MASTER_REMIX.HERO_IMAGE}
        />
      </RemixSlot>

      {/* PROCESS */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.process.eyebrow} headline={c.process.headline} />
        <div className="mt-12">
          <ProcessSteps steps={HOME_PROCESS} />
        </div>
      </SectionFrame>

      {/* SOCIAL PROOF */}
      <SectionFrame tone="bone" size="lg">
        <Suspense fallback={null}>
          <SocialProofEngine variant="grid" maxItems={3} />
        </Suspense>
      </SectionFrame>

      {/* GUARANTEE */}
      <SectionFrame tone="paper" size="lg">
        <Suspense fallback={null}>
          <GuaranteeBlock variant="full" />
        </Suspense>
      </SectionFrame>

      {/* PRICING PREVIEW */}
      <SectionFrame tone="bone" size="lg">
        <div className="grid gap-12 md:grid-cols-12 md:items-start">
          <div className="md:col-span-5">
            <SectionTitle
              eyebrow="Pricing preview"
              headline="The bands are public. The number is the number."
              lede="See the full scope on /pricing — including the philosophy, the process, and the objections we've already heard."
            />
            <Link
              to="/pricing"
              className="mt-8 inline-flex rounded-sm border border-charcoal/20 px-6 py-3.5 text-sm font-medium text-charcoal transition-colors hover:bg-charcoal hover:text-bone"
            >
              See the full pricing page
            </Link>
          </div>
          <div className="md:col-span-7">
            <RemixSlot name="PRICE_BANDS">
              <PriceBandsTable
                title="{SERVICE} — honest bands"
                bands={MASTER_REMIX.PRICE_BANDS}
                note="Final number on the invoice equals the band; only material grade selected by you adjusts it."
              />
            </RemixSlot>
          </div>
        </div>
      </SectionFrame>

      {/* FAQ */}
      <SectionFrame tone="paper" size="lg">
        <SectionTitle eyebrow={c.faq.eyebrow} headline={c.faq.headline} />
        <div className="mt-10">
          <RemixSlot name="FAQS">
            <FAQAccordion items={MASTER_REMIX.FAQS.slice(0, 6)} />
          </RemixSlot>
        </div>
      </SectionFrame>

      {/* CTA BAND */}
      <CTABand
        eyebrow={c.cta.eyebrow}
        headline={c.cta.headline}
        body={c.cta.body}
        primaryLabel={TEMPLATE_COPY.cta.primary}
        onPrimaryClick={onBookClick}
        prefill={{ source: "Home → Final CTA" }}
      />
    </TemplateLayout>
  );
};

export default TemplateHome;
