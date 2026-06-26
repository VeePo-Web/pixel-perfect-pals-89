import HeroImage from "./HeroImage";
import { SloganHeartbeat } from "@/components/template/bespoke";

interface InnerHeroProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  backgroundImage?: string;
  backgroundAlt?: string;
}

/** Compact page-top hero for inner pages. */
const InnerHero = ({ eyebrow, title, lede, backgroundImage, backgroundAlt = "" }: InnerHeroProps) => {
  return (
    <section className="paper-grain relative bg-bone overflow-hidden">
      {backgroundImage && (
        <HeroImage src={backgroundImage} alt={backgroundAlt} gradientFrom="left" opacity={28} />
      )}
      <div className="container relative z-10 mx-auto px-6 py-20 md:py-28 max-md:py-14">
        <div className="max-w-4xl">
          {eyebrow && <p className="font-eyebrow mb-5">{eyebrow}</p>}
          <h1 className="text-display-xl text-charcoal">{title}</h1>
          {/* Generational slogan — heartbeat beneath every inner-page title */}
          <SloganHeartbeat variant="whisper" className="mt-5 block" />
          {lede && (
            <p className="mt-5 max-w-2xl text-body-lg text-graphite max-md:mt-4 max-md:text-base max-md:leading-relaxed">
              {lede}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default InnerHero;
