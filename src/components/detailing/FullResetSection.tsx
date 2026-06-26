import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionValue,
} from "framer-motion";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface FullResetSectionProps {
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

const FullResetSection = ({
  videoSrc = "/full-reset-scrub.mp4",
  onBookClick,
}: FullResetSectionProps) => {
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

  /* ── Text transforms ── */

  // Phase 1: Flagship headline (0% → 28%)
  const p1Opacity = useTransform(smoothProgress, [0.0, 0.07, 0.20, 0.28], [0, 1, 1, 0]);
  const p1Y = useTransform(smoothProgress, [0.0, 0.07, 0.20, 0.28], [24, 0, 0, -16]);

  // Phase 2: Service details (23% → 52%)
  const p2Opacity = useTransform(smoothProgress, [0.23, 0.31, 0.44, 0.52], [0, 1, 1, 0]);
  const p2Y = useTransform(smoothProgress, [0.23, 0.31, 0.44, 0.52], [24, 0, 0, -16]);

  // Phase 3: Pricing (48% → 76%)
  const p3Opacity = useTransform(smoothProgress, [0.48, 0.56, 0.68, 0.76], [0, 1, 1, 0]);
  const p3Y = useTransform(smoothProgress, [0.48, 0.56, 0.68, 0.76], [24, 0, 0, -16]);

  // Phase 4: CTA (72% → 100%)
  const ctaOpacity = useTransform(smoothProgress, [0.72, 0.85], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.72, 0.85], [20, 0]);

  /* ── Bleed ── */
  const topBleedOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const bottomBleedOpacity = useTransform(smoothProgress, [0.90, 1.0], [0, 1]);

  /* ── Progress line ── */
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  /* ── Reduced motion ── */
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full bg-asphalt">
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? "auto" : "80vh" }}>
          <video src={videoSrc} muted playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#121418]/80" />
          <div className="relative z-10 py-28 md:py-36 lg:py-48">
            <div className="container mx-auto px-6 lg:px-8 max-w-xl">
              <p className="font-overline text-copper mb-4">Flagship Service</p>
              <h2 className="font-display text-display-lg text-white mb-8">The Custom Build</h2>
              <p className="text-body-lg text-white/60 font-light mb-3">Architectural design, full structural build, master interior finishing.</p>
              <p className="text-body-lg text-white/60 font-light mb-3">Every wall, joint, and trim line built to last generations.</p>
              <p className="text-body-lg text-white/60 font-light mb-3">We build across Cochrane, Calgary, and Rocky View County.</p>
              <p className="font-display text-display-md text-copper mt-10 mb-2">Fixed-scope quotes</p>
              <p className="text-caption text-white/40 mb-10">Custom homes · Major renovations · Additions · Master interior finishing.</p>
              <button onClick={onBookClick} className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]">Request a Consultation</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sectionHeight = isMobile ? "320vh" : "400vh";

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
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

        {/* Static overlay */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{ background: "linear-gradient(to right, hsl(220 12% 3% / 0.85) 0%, hsl(220 12% 3% / 0.55) 45%, hsl(220 12% 3% / 0.25) 100%)" }}
        />
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{ background: "linear-gradient(to top, hsl(220 12% 3% / 0.90) 0%, hsl(220 12% 3% / 0.60) 35%, hsl(220 12% 3% / 0.45) 100%)" }}
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

              {/* Phase 1: Flagship headline */}
              <TextBlock opacity={p1Opacity} y={p1Y}>
                <div>
                  <p className="font-overline text-copper mb-6">Flagship Service</p>
                  <h2 className="font-display text-display-lg text-white mb-5">
                    The Custom Build
                  </h2>
                  <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed">
                    The complete master-builder process — design, build, and finish.
                  </p>
                </div>
              </TextBlock>

              {/* Phase 2: Service details */}
              <TextBlock opacity={p2Opacity} y={p2Y}>
                <div>
                  <p className="font-overline text-copper mb-6">What's Included</p>
                  <h3 className="font-display text-display-sm text-white mb-5">
                    Every detail, built right.
                  </h3>
                  <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed mb-5">
                    Architectural planning, foundation through framing, drywall, millwork,
                    cabinetry, and master interior finishing.
                  </p>
                  <p className="text-body-lg text-white/40 font-light max-w-[44ch] leading-relaxed">
                    We build across Cochrane, Calgary, and Rocky View County.
                  </p>
                </div>
              </TextBlock>

              {/* Phase 3: Pricing */}
              <TextBlock opacity={p3Opacity} y={p3Y}>
                <div>
                  <p className="font-overline text-copper mb-6">Transparent Pricing</p>
                  <p className="font-display text-display-md text-copper mb-5">Fixed-scope quotes</p>
                  <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed mb-2">
                    Custom homes · Major renovations · Additions · Master interior finishing
                  </p>
                  <p className="text-body-lg text-white/40 font-light max-w-[44ch] leading-relaxed">
                    Every quote is fixed-scope and detailed line-by-line — no surprise change orders.
                  </p>
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
                    Ready to start?
                  </h2>
                  <p className="text-body-lg text-white/50 font-light max-w-[40ch] mb-10">
                    A finished home is one consultation away.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <button
                      onClick={onBookClick}
                      className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms] pointer-events-auto"
                    >
                      Request a Consultation
                    </button>
                    <Link
                      to="/services"
                      className="inline-flex items-center text-white/50 text-body-sm hover:text-copper transition-colors duration-300 underline underline-offset-4 decoration-copper/30 hover:decoration-copper py-3.5 pointer-events-auto"
                    >
                      View All Services
                    </Link>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullResetSection;
