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

interface SoundFamiliarSectionProps {
  videoSrc?: string;
}

/* ─── Spring: matched to SurfaceRevealSection for consistent feel ─── */
const SPRING = { stiffness: 45, damping: 15, mass: 0.6 };

/* ─── Text block — GPU-only (opacity + translateY) ─── */
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

/*
 * SOUND FAMILIAR SECTION
 *
 * Same scroll-scrub architecture as SurfaceRevealSection:
 * - Spring-smoothed scroll → lerped RAF → video.currentTime
 * - All-keyframe video (g=1) for instant seeking
 * - Static overlays, GPU-only text transforms
 * - No grain/vignette/blur filters over the video
 *
 * Two text phases:
 * 1. "Sound Familiar?" — the empathy hook
 * 2. The descriptive body copy — the specific pain points
 *
 * The section is shorter than SurfaceReveal (250vh vs 400vh)
 * to match the simpler narrative arc.
 */

const SoundFamiliarSection = ({
  videoSrc = "/sound-familiar-scrub.mp4",
}: SoundFamiliarSectionProps) => {
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

  /* ── Video scrub: spring → lerp → currentTime ── */
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

  // Phase 1: "Sound Familiar?" — eyebrow + rule (0% → 40%)
  const phase1Opacity = useTransform(smoothProgress, [0.0, 0.08, 0.32, 0.42], [0, 1, 1, 0]);
  const phase1Y = useTransform(smoothProgress, [0.0, 0.08, 0.32, 0.42], [24, 0, 0, -16]);

  // Phase 2: Body copy — the pain points (35% → 85%)
  const phase2Opacity = useTransform(smoothProgress, [0.36, 0.46, 0.78, 0.90], [0, 1, 1, 0]);
  const phase2Y = useTransform(smoothProgress, [0.36, 0.46, 0.78, 0.90], [24, 0, 0, -16]);

  /* ── Bleed gradients ── */
  const topBleedOpacity = useTransform(smoothProgress, [0, 0.10], [1, 0]);
  const bottomBleedOpacity = useTransform(smoothProgress, [0.90, 1.0], [0, 1]);

  /* ── Progress line ── */
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  /* ── Reduced motion ── */
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full bg-asphalt">
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? "auto" : "80vh" }}>
          <video
            src={videoSrc}
            muted
            playsInline
            preload="metadata"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#121418]/80" />
          <div className="relative z-10 py-28 md:py-36 lg:py-48">
            <div className="container mx-auto px-6 lg:px-8 max-w-xl">
              <p className="font-overline text-copper mb-4">Sound Familiar?</p>
              <div className="editorial-rule mb-8" />
              <p className="text-body-lg text-white/60 font-light max-w-[48ch]">
                Coffee stains on the console. Dog hair embedded in every surface.
                That mystery smell you've stopped noticing. You keep meaning to
                deal with it — but who has the time?
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sectionHeight = isMobile ? "250vh" : "300vh";

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: sectionHeight, contain: "layout style" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121418]">

        {/* Video — raw element, no wrapper transforms */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Static dark overlay — left-biased for text */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background: "linear-gradient(to right, hsl(220 12% 3% / 0.85) 0%, hsl(220 12% 3% / 0.55) 45%, hsl(220 12% 3% / 0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background: "linear-gradient(to top, hsl(220 12% 3% / 0.90) 0%, hsl(220 12% 3% / 0.60) 35%, hsl(220 12% 3% / 0.45) 100%)",
          }}
        />

        {/* Top bleed — seamless from previous section */}
        <motion.div
          className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
          style={{
            opacity: topBleedOpacity,
            height: "45vh",
            background: "linear-gradient(to bottom, hsl(220 8% 8%) 0%, hsl(220 8% 8% / 0.95) 20%, hsl(220 8% 8% / 0.6) 50%, transparent 100%)",
          }}
        />

        {/* Bottom bleed — into next section */}
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

              {/* Progress line */}
              <motion.div
                className="absolute -left-6 lg:-left-8 top-[12%] w-px h-[76%] origin-top hidden lg:block"
                style={{
                  scaleY: lineScaleY,
                  background: "linear-gradient(to bottom, hsl(25 60% 55% / 0.25), hsl(25 60% 55% / 0.05))",
                }}
              />

              {/* Phase 1: "Sound Familiar?" */}
              <TextBlock opacity={phase1Opacity} y={phase1Y}>
                <div>
                  <p className="font-overline text-copper mb-6">Sound Familiar?</p>
                  <h2 className="font-display text-display-lg text-white mb-5">
                    You know the feeling.
                  </h2>
                  <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed">
                    You get in, glance around, and think —
                    <span className="italic text-white/40"> I really need to deal with this.</span>
                  </p>
                </div>
              </TextBlock>

              {/* Phase 2: The pain points */}
              <TextBlock opacity={phase2Opacity} y={phase2Y}>
                <div>
                  <p className="font-overline text-copper mb-6">The Reality</p>
                  <h3 className="font-display text-display-sm text-white mb-5">
                    It adds up quietly.
                  </h3>
                  <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed mb-5">
                    Coffee stains on the console. Dog hair embedded in every surface.
                    That mystery smell you've stopped noticing.
                  </p>
                  <p className="text-body-lg text-white/40 font-light max-w-[44ch] leading-relaxed">
                    You keep meaning to deal with it — but who has the time?
                  </p>
                </div>
              </TextBlock>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SoundFamiliarSection;
