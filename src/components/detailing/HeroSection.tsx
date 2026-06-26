import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import heroVehicle from "@/assets/hero-project.jpg";
import { useIsMobile } from "@/hooks/use-mobile";
import RevealText from "@/components/detailing/RevealText";

interface HeroSectionProps {
  onBookClick?: () => void;
  initialDelay?: number;
}

const EASE = [0.25, 0.1, 0.25, 1.0] as const;

const HeroSection = ({ onBookClick, initialDelay = 0 }: HeroSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const mouseTarget = useRef({ x: 0.47, y: 0.42 });
  const mouseCurrent = useRef({ x: 0.47, y: 0.42 });
  const imgTarget = useRef({ x: 0, y: 0 });
  const imgCurrent = useRef({ x: 0, y: 0 });
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolledPast(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (isMobile || prefersReducedMotion) return;
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      mouseTarget.current = { x: 0.35 + nx * 0.3, y: 0.3 + ny * 0.4 };
      imgTarget.current = { x: (nx - 0.5) * -6, y: (ny - 0.5) * -6 };
    },
    [isMobile, prefersReducedMotion]
  );

  useEffect(() => {
    if (isMobile || prefersReducedMotion) return;
    const lerp = 0.03;
    const tick = () => {
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * lerp;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * lerp;
      imgCurrent.current.x += (imgTarget.current.x - imgCurrent.current.x) * lerp;
      imgCurrent.current.y += (imgTarget.current.y - imgCurrent.current.y) * lerp;

      if (lightRef.current) {
        const cx = mouseCurrent.current.x * 100;
        const cy = mouseCurrent.current.y * 100;
        lightRef.current.style.background = `radial-gradient(ellipse 45% 45% at ${cx}% ${cy}%, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 30%, transparent 65%)`;
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translate(${imgCurrent.current.x}px, ${imgCurrent.current.y}px) scale(1)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, prefersReducedMotion]);

  const skip = !!prefersReducedMotion;
  const d = (ms: number) => (skip ? 0 : initialDelay + ms / 1000);
  const dur = (ms: number) => (skip ? 0 : ms / 1000);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-svh flex items-center overflow-hidden"
    >
      {/* Image layer — develops from blur+dark to crisp clarity */}
      <motion.div
        ref={imageRef}
        initial={skip ? false : { opacity: 0, scale: 1.06, filter: "brightness(0.7) blur(3px)" }}
        animate={{ opacity: 1, scale: 1, filter: "brightness(1) blur(0px)" }}
        transition={{ duration: dur(2000), ease: EASE }}
        className="absolute inset-0 will-change-transform"
      >
        <img
          src={heroVehicle}
          alt="Macro detail of master-crafted interior finishing — millwork, joinery, and timber grain in a custom Cochrane home"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-asphalt/70 via-asphalt/30 to-transparent z-[1] lg:block hidden" />
      <div className="absolute inset-0 bg-gradient-to-b from-asphalt/50 via-asphalt/25 to-asphalt/80 z-[1] lg:hidden" />

      {/* Grain */}
      <motion.div
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: dur(800), delay: d(200), ease: EASE }}
        className="absolute inset-0 grain-overlay z-[2]"
      />

      {/* Vignette */}
      <div className="absolute inset-0 vignette z-[3]" />

      {/* Ambient light drift */}
      <div
        ref={lightRef}
        className={`absolute inset-0 z-[4] pointer-events-none ${
          isMobile && !prefersReducedMotion ? "hero-light-drift-mobile" : ""
        }`}
      />

      {/* Content */}
      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl text-center lg:text-left lg:ml-[4vw]">
            {/* Overline */}
            <motion.p
              initial={skip ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: dur(600), delay: d(1000), ease: EASE }}
              className="font-overline text-copper mb-8"
            >
              Cochrane's Master Home Builders
            </motion.p>

            {/* Headline */}
            <RevealText
              text="Build it like it is ours."
              as="h1"
              className="font-display text-display-xl text-white mb-8"
              delay={skip ? 0 : initialDelay + 1.2}
            />

            {/* Subhead */}
            <motion.p
              initial={skip ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur(500), delay: d(1450), ease: EASE }}
              className="text-body-lg text-white/60 mb-12 max-w-lg mx-auto lg:mx-0"
            >
              Custom homes, full renovations, and master-craft interior finishing — built in Cochrane, Calgary, and Rocky View County.
            </motion.p>

            {/* Single CTA */}
            <motion.div
              initial={skip ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: dur(500), delay: d(1650), ease: EASE }}
            >
              <button
                onClick={onBookClick}
                className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
              >
                Request a Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={skip ? false : { opacity: 0 }}
        animate={{ opacity: scrolledPast ? 0 : 1 }}
        transition={{
          opacity: {
            duration: scrolledPast ? 0.3 : dur(600),
            delay: scrolledPast ? 0 : d(2400),
            ease: EASE,
          },
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className="text-copper/20 hero-scroll-pulse" size={24} />
      </motion.div>
    </section>
  );
};

export default HeroSection;
