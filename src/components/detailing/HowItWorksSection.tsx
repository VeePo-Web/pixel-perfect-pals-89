import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

interface HowItWorksSectionProps {
  videoSrc?: string;
  onBookClick?: () => void;
}

const SPRING = { stiffness: 45, damping: 15, mass: 0.6 };

interface TextBlockProps {
  children: React.ReactNode;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const TextBlock = ({ children, opacity, y }: TextBlockProps) => (
  <motion.div
    className="absolute inset-0 flex items-center pointer-events-none"
    style={{ opacity, y }}
  >
    {children}
  </motion.div>
);

const steps = [
  { num: "01", title: "Consult", desc: "Tell us about your project. We'll book a no-pressure on-site walkthrough to understand scope, site conditions, and what success looks like for you." },
  { num: "02", title: "Plan & Quote", desc: "We deliver a clear scope, transparent fixed pricing, and a build schedule — no surprise change orders, no hidden fees." },
  { num: "03", title: "Build & Hand-Off", desc: "One master builder runs your project from foundation to final walk-through. You get the keys to a finished space, built to last." },
];

const HowItWorksSection = ({
  videoSrc = "/how-it-works-scrub.mp4",
  onBookClick,
}: HowItWorksSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING);

  /* ── Video scrub ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let active = false;
    const LERP = 0.25;
    const GATE = 0.04;

    const tick = () => {
      if (active && video.duration) {
        const target = smoothProgress.get() * video.duration;
        const delta = target - currentTimeRef.current;
        if (Math.abs(delta) > GATE) {
          currentTimeRef.current += delta * LERP;
          video.currentTime = currentTimeRef.current;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onCanPlay = () => {
      video.pause();
      currentTimeRef.current = 0;
      video.currentTime = 0;
      active = true;
    };

    rafRef.current = requestAnimationFrame(tick);

    if (video.readyState >= 3) {
      onCanPlay();
    } else {
      video.addEventListener("canplaythrough", onCanPlay, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      video.removeEventListener("canplaythrough", onCanPlay);
    };
  }, [smoothProgress, prefersReducedMotion]);

  /* ── Text transforms — 5 phases: headline + 3 steps + CTA ── */

  // Phase 1: "How It Works" headline (0% → 22%)
  const p1Opacity = useTransform(smoothProgress, [0.0, 0.06, 0.16, 0.22], [0, 1, 1, 0]);
  const p1Y = useTransform(smoothProgress, [0.0, 0.06, 0.16, 0.22], [24, 0, 0, -16]);

  // Phase 2: Step 01 (18% → 40%)
  const p2Opacity = useTransform(smoothProgress, [0.18, 0.25, 0.34, 0.40], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.18, 0.25, 0.34, 0.40], [24, 0, 0, -16]);

  // Phase 3: Step 02 (36% → 58%)
  const p3Opacity = useTransform(smoothProgress, [0.36, 0.43, 0.52, 0.58], [0, 1, 1, 0]);
  const p3Y = useTransform(smoothProgress, [0.36, 0.43, 0.52, 0.58], [24, 0, 0, -16]);

  // Phase 4: Step 03 (54% → 76%)
  const p4Opacity = useTransform(smoothProgress, [0.54, 0.61, 0.70, 0.76], [0, 1, 1, 0]);
  const p4Y = useTransform(smoothProgress, [0.54, 0.61, 0.70, 0.76], [24, 0, 0, -16]);

  // Phase 5: CTA (73% → 100%)
  const ctaOpacity = useTransform(smoothProgress, [0.73, 0.86], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.73, 0.86], [20, 0]);

  /* ── Bleed ── */
  const topBleedOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const bottomBleedOpacity = useTransform(smoothProgress, [0.90, 1.0], [0, 1]);

  /* ── Progress line ── */
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  /* ── Reduced motion ── */
  if (prefersReducedMotion) {
    return (
      <section id="how-it-works" className="relative w-full bg-asphalt scroll-mt-[88px]">
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? "auto" : "80vh" }}>
          <video src={videoSrc} muted playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#121418]/80" />
          <div className="relative z-10 py-28 md:py-36 lg:py-48">
            <div className="container mx-auto px-6 lg:px-8 max-w-xl">
              <div className="editorial-rule mb-6" />
              <p className="font-overline text-copper mb-4">How It Works</p>
              <h2 className="font-display text-display-lg text-white mb-12">Three steps. That's it.</h2>
              {steps.map((step, i) => (
                <div key={step.num} className={i > 0 ? "mt-10" : ""}>
                  <div className="flex items-start gap-6">
                    <span className="font-display text-display-lg text-copper/20 shrink-0 leading-none">{step.num}</span>
                    <div>
                      <h3 className="font-display text-display-sm text-white mb-2">{step.title}</h3>
                      <p className="text-body text-white/50 max-w-md">{step.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-12">
                <button onClick={onBookClick} className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]">Request a Consultation</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sectionHeight = isMobile ? "380vh" : "450vh";

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative w-full scroll-mt-[88px]"
      style={{ height: sectionHeight, contain: "layout style" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121418]">

        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Heavier overlay — the blurred video edges blend into this darkness */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to right, hsl(220 12% 3% / 0.88) 0%, hsl(220 12% 3% / 0.60) 40%, hsl(220 12% 3% / 0.30) 70%, hsl(220 12% 3% / 0.50) 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{ background: "linear-gradient(to top, hsl(220 12% 3% / 0.92) 0%, hsl(220 12% 3% / 0.60) 35%, hsl(220 12% 3% / 0.50) 100%)" }}
        />

        {/* Soft edge vignette — gentle bleed into darkness at the edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 150px 40px hsl(220 12% 3% / 0.45)" }}
        />

        {/* Top bleed */}
        <motion.div
          className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
          style={{
            opacity: topBleedOpacity,
            height: "45vh",
            background: "linear-gradient(to bottom, hsl(220 8% 8%) 0%, hsl(220 8% 8% / 0.95) 20%, hsl(220 8% 8% / 0.6) 50%, transparent 100%)",
          }}
        />

        {/* Bottom bleed */}
        <motion.div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-[2]"
          style={{
            opacity: bottomBleedOpacity,
            height: "45vh",
            background: "linear-gradient(to top, hsl(220 8% 8%) 0%, hsl(220 8% 8% / 0.95) 20%, hsl(220 8% 8% / 0.6) 50%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full">
          <div className="container mx-auto px-6 lg:px-8 h-full">
            <div className="relative max-w-xl lg:ml-[4vw] h-full">

              <motion.div
                className="absolute -left-6 lg:-left-8 top-[12%] w-px h-[76%] origin-top hidden lg:block"
                style={{
                  scaleY: lineScaleY,
                  background: "linear-gradient(to bottom, hsl(25 60% 55% / 0.25), hsl(25 60% 55% / 0.05))",
                }}
              />

              {/* Phase 1: Headline */}
              <TextBlock opacity={p1Opacity} y={p1Y}>
                <div>
                  <div className="editorial-rule mb-6" />
                  <p className="font-overline text-copper mb-6">How It Works</p>
                  <h2 className="font-display text-display-lg text-white">
                    Three steps.<br />That's it.
                  </h2>
                </div>
              </TextBlock>

              {/* Phase 2: Step 01 */}
              <TextBlock opacity={p2Opacity} y={p2Y}>
                <div className="flex items-start gap-8">
                  <span className="font-display text-display-lg text-copper/15 shrink-0 leading-none select-none">01</span>
                  <div>
                    <h3 className="font-display text-display-sm text-white mb-3">{steps[0].title}</h3>
                    <p className="text-body-lg text-white/50 font-light max-w-[40ch] leading-relaxed">
                      {steps[0].desc}
                    </p>
                  </div>
                </div>
              </TextBlock>

              {/* Phase 3: Step 02 */}
              <TextBlock opacity={p3Opacity} y={p3Y}>
                <div className="flex items-start gap-8">
                  <span className="font-display text-display-lg text-copper/15 shrink-0 leading-none select-none">02</span>
                  <div>
                    <h3 className="font-display text-display-sm text-white mb-3">{steps[1].title}</h3>
                    <p className="text-body-lg text-white/50 font-light max-w-[40ch] leading-relaxed">
                      {steps[1].desc}
                    </p>
                  </div>
                </div>
              </TextBlock>

              {/* Phase 4: Step 03 */}
              <TextBlock opacity={p4Opacity} y={p4Y}>
                <div className="flex items-start gap-8">
                  <span className="font-display text-display-lg text-copper/15 shrink-0 leading-none select-none">03</span>
                  <div>
                    <h3 className="font-display text-display-sm text-white mb-3">{steps[2].title}</h3>
                    <p className="text-body-lg text-white/50 font-light max-w-[40ch] leading-relaxed">
                      {steps[2].desc}
                    </p>
                  </div>
                </div>
              </TextBlock>

              {/* CTA */}
              <motion.div
                className="absolute inset-0 flex items-center"
                style={{ opacity: ctaOpacity, y: ctaY }}
              >
                <div>
                  <div className="editorial-rule mb-8" />
                  <h2 className="font-display text-display-md text-white mb-4">
                    Simple as that.
                  </h2>
                  <p className="text-body-lg text-white/50 font-light max-w-[40ch] mb-10">
                    No vague quotes. No subcontractor relay. Just one master builder, one standard.
                  </p>
                  <button
                    onClick={onBookClick}
                    className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms] pointer-events-auto"
                  >
                    Request a Consultation
                  </button>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
