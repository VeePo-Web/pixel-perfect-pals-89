import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import RevealText from "@/components/detailing/RevealText";

interface InnerHeroProps {
  image: string;
  imageAlt: string;
  overline: string;
  headline: string;
  subhead?: string;
  minHeight?: string;
  align?: "left" | "center";
  children?: ReactNode;
}

const ease = [0.25, 0.1, 0.25, 1.0] as [number, number, number, number];

const InnerHero = ({
  image,
  imageAlt,
  overline,
  headline,
  subhead,
  minHeight = "min-h-[70vh]",
  align = "left",
  children,
}: InnerHeroProps) => {
  const isCenter = align === "center";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className={`relative ${minHeight} flex items-end overflow-hidden`}>
      <motion.img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 w-full h-full object-cover will-change-transform"
        loading="eager"
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
        style={{ y: imgY }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/40 to-transparent z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-asphalt/30 via-transparent to-transparent z-[1]" />
      <div className="absolute inset-0 grain-overlay z-[2]" />
      <div className="absolute inset-0 vignette z-[3]" />
      {/* Copper trim line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center z-[4]">
        <div className="h-[2px] w-2/5 bg-gradient-to-r from-transparent via-copper/20 to-transparent" />
      </div>
      <div className={`relative z-10 container mx-auto px-6 lg:px-8 pb-16 lg:pb-24 ${isCenter ? "text-center" : ""}`}>
        <div className={`max-w-xl ${isCenter ? "mx-auto" : ""}`}>
          <motion.p
            className="font-overline text-copper mb-4"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
          >
            {overline}
          </motion.p>
          <RevealText
            text={headline}
            as="h1"
            className="font-display text-display-xl text-white mb-6"
            delay={0.6}
          />
          {subhead && (
            <motion.p
              className="text-body-lg text-white/60"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8, ease }}
            >
              {subhead}
            </motion.p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
};

export default InnerHero;
