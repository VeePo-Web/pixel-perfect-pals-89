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

interface SurfaceRevealSectionProps {
  videoSrc?: string;
}

const textStates = [
  {
    eyebrow: "Master Craftsmanship",
    headline: "Every finish tells a story.",
    body: "We build clarity, depth, and permanence through meticulous craft — drywall, millwork, paint, and trim worked to a finish you feel before you see.",
  },
  {
    eyebrow: "Craft in Motion",
    headline: "We build presence into every surface.",
    body: "Walls, joinery, and lighting are treated with the same precision that makes a well-built room feel unmistakable.",
  },
  {
    eyebrow: "Surface. Light. Detail.",
    headline: "Built for homes worth living in.",
    body: "A master-builder process anchored in correction, protection, and the kind of finish you notice the moment you walk in.",
  },
];

/*
 * Spring tuned tighter than other sections — this is the FIRST locomotive
 * section after the hero, so responsiveness matters more than glide here.
 * The user's first scroll into this section needs to feel immediate.
 */
const SPRING = { stiffness: 65, damping: 20, mass: 0.4 };

/* ─── Text block — zero filters, GPU-only props (opacity + translate) ─── */
interface TextBlockProps {
  eyebrow: string;
  headline: string;
  body: string;
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}

const TextBlock = ({ eyebrow, headline, body, opacity, y }: TextBlockProps) => (
  <motion.div
    className="absolute inset-0 flex items-center pointer-events-none"
    style={{ opacity, y }}
  >
    <div>
      <p className="font-overline text-copper mb-6">{eyebrow}</p>
      <h2 className="font-display text-display-lg text-white mb-5">{headline}</h2>
      <p className="text-body-lg text-white/50 font-light max-w-[44ch] leading-relaxed">
        {body}
      </p>
    </div>
  </motion.div>
);

/* ─────────────────────────── Component ──────────────────────────── */
/*
 * PERFORMANCE ARCHITECTURE
 *
 * The #1 rule: minimize composite layers on top of a scrubbing video.
 * Every overlay that needs repaint when the video frame changes is a
 * performance tax. Previous version had: grain (SVG feTurbulence),
 * vignette, animated scale wrapper, animated overlay opacities, and
 * blur filters on text — all recompositing on every seek.
 *
 * This version:
 * - NO grain overlay on this section (SVG turbulence is the biggest killer)
 * - NO vignette (radial gradient repaint)
 * - NO animated scale on video (removes a composite layer)
 * - NO blur filter on text (filter changes force rasterization)
 * - STATIC dark overlays (no animated opacity — one repaint, done)
 * - Text transitions use ONLY opacity + translateY (cheapest GPU props)
 * - Video scrub: spring-smoothed → lerp RAF at 0.25/frame with 0.04s gate
 *
 * The result: video decode is the only expensive operation per frame.
 * Everything else is either static or GPU-composited with no repaint.
 */

const SurfaceRevealSection = ({
  videoSrc = "/surface-reveal-scrub.mp4",
}: SurfaceRevealSectionProps) => {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);

  /*
   * Offset: "start end" means progress=0 when section top enters viewport bottom.
   * This gives the spring a head-start — by the time the section pins at the top,
   * the spring is already settled and the video is ready at the right frame.
   * "end end" means progress=1 when section bottom reaches viewport bottom.
   */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, SPRING);

  /* ── Video scrub: spring → lerp → currentTime ── */
  useEffect(() => {
    if (prefersReducedMotion) return;
    const video = videoRef.current;
    if (!video) return;

    let active = false;

    /*
     * Lerp at 0.25/frame — fast enough to feel responsive, slow enough
     * to smooth out jitter. Gate at 0.04s — skip seeks smaller than
     * ~2.5 frames to avoid hammering the decoder with micro-seeks.
     */
    const LERP = 0.30;
    const GATE = 0.03;

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

  /*
   * Text transforms — remapped for "start end" offset.
   * Progress ~0.18 = section top reaches viewport top (pin starts).
   * All text phases shifted to begin after pinning.
   */

  const s1Opacity = useTransform(smoothProgress, [0.18, 0.24, 0.34, 0.42], [0, 1, 1, 0]);
  const s1Y = useTransform(smoothProgress, [0.18, 0.24, 0.34, 0.42], [24, 0, 0, -16]);

  const s2Opacity = useTransform(smoothProgress, [0.38, 0.44, 0.56, 0.64], [0, 1, 1, 0]);
  const s2Y = useTransform(smoothProgress, [0.38, 0.44, 0.56, 0.64], [24, 0, 0, -16]);

  const s3Opacity = useTransform(smoothProgress, [0.60, 0.66, 0.78, 0.84], [0, 1, 1, 0]);
  const s3Y = useTransform(smoothProgress, [0.60, 0.66, 0.78, 0.84], [24, 0, 0, -16]);

  const ctaOpacity = useTransform(smoothProgress, [0.82, 0.92], [0, 1]);
  const ctaY = useTransform(smoothProgress, [0.82, 0.92], [20, 0]);

  /* ── Progress line — starts at pin point ── */
  const lineScaleY = useTransform(smoothProgress, [0.18, 1], [0, 1]);

  /* ── Bleed gradients ── */
  const topBleedOpacity = useTransform(smoothProgress, [0.0, 0.22], [1, 0]);
  const bottomBleedOpacity = useTransform(smoothProgress, [0.90, 1.0], [0, 1]);

  /* ── Reduced motion ── */
  if (prefersReducedMotion) {
    return (
      <section className="relative w-full bg-asphalt">
        <div className="relative overflow-hidden" style={{ minHeight: isMobile ? "auto" : "100vh" }}>
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
            <div className="container mx-auto px-6 lg:px-8 max-w-2xl">
              {textStates.map((state, i) => (
                <div key={i} className={i > 0 ? "mt-20" : ""}>
                  <p className="font-overline text-copper mb-4">{state.eyebrow}</p>
                  <h2 className="font-display text-display-lg text-white mb-4">{state.headline}</h2>
                  <p className="text-body-lg text-white/60 font-light max-w-[48ch]">{state.body}</p>
                </div>
              ))}
              <div className="mt-20">
                <Link
                  to="/services"
                  className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
                >
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const sectionHeight = isMobile ? "350vh" : "400vh";

  return (
    <section
      ref={sectionRef}
      className="relative w-full"
      style={{ height: sectionHeight, contain: "layout style" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121418]">

        {/* Video — raw element, no wrapper transforms, no filters on top */}
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Single static dark overlay — no animated opacity */}
        <div
          className="absolute inset-0 pointer-events-none hidden lg:block"
          style={{
            background: "linear-gradient(to right, hsl(220 12% 3% / 0.88) 0%, hsl(220 12% 3% / 0.60) 45%, hsl(220 12% 3% / 0.25) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none lg:hidden"
          style={{
            background: "linear-gradient(to top, hsl(220 12% 3% / 0.92) 0%, hsl(220 12% 3% / 0.60) 35%, hsl(220 12% 3% / 0.45) 100%)",
          }}
        />

        {/* Top bleed — matches hero bg exactly */}
        <motion.div
          className="absolute inset-x-0 top-0 pointer-events-none z-[2]"
          style={{
            opacity: topBleedOpacity,
            height: "45vh",
            background: "linear-gradient(to bottom, hsl(220 8% 8%) 0%, hsl(220 8% 8% / 0.92) 25%, hsl(220 8% 8% / 0.6) 55%, transparent 100%)",
          }}
        />

        {/* Bottom bleed — matches next section bg */}
        <motion.div
          className="absolute inset-x-0 bottom-0 pointer-events-none z-[2]"
          style={{
            opacity: bottomBleedOpacity,
            height: "45vh",
            background: "linear-gradient(to top, hsl(220 8% 8%) 0%, hsl(220 8% 8% / 0.95) 20%, hsl(220 8% 8% / 0.6) 50%, transparent 100%)",
          }}
        />

        {/* Content — text only, no filters, GPU-only transforms */}
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

              <TextBlock {...textStates[0]} opacity={s1Opacity} y={s1Y} />
              <TextBlock {...textStates[1]} opacity={s2Opacity} y={s2Y} />
              <TextBlock {...textStates[2]} opacity={s3Opacity} y={s3Y} />

              <motion.div
                className="absolute inset-0 flex items-center"
                style={{ opacity: ctaOpacity, y: ctaY }}
              >
                <div>
                  <div className="editorial-rule mb-8" />
                  <h2 className="font-display text-display-md text-white mb-4">
                    The finish doesn't lie.
                  </h2>
                  <p className="text-body-lg text-white/50 font-light max-w-[40ch] mb-10">
                    See what master-craft homebuilding looks like up close.
                  </p>
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Link
                      to="/services"
                      className="inline-flex items-center px-8 py-3.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
                    >
                      Explore Services
                    </Link>
                    <Link
                      to="/results"
                      className="inline-flex items-center text-white/50 text-body-sm hover:text-copper transition-colors duration-300 underline underline-offset-4 decoration-copper/30 hover:decoration-copper py-3.5"
                    >
                      See Results
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

export default SurfaceRevealSection;
