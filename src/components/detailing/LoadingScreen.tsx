import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LogoMark from "./LogoMark";

interface LoadingScreenProps {
  children: ReactNode;
  onComplete?: () => void;
}

type Phase = "enter" | "hold" | "suspend" | "exit" | "done";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_IN_OUT = [0.76, 0, 0.24, 1] as [number, number, number, number];
const EASE_DRAMATIC = [0.83, 0, 0.17, 1] as [number, number, number, number];

const LoadingScreen = ({ children, onComplete }: LoadingScreenProps) => {
  const [phase, setPhase] = useState<Phase>("enter");
  const [progress, setProgress] = useState(0);

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReduced) {
      setPhase("done");
      onComplete?.();
      return;
    }
    const enterTimer = setTimeout(() => setPhase("hold"), 200);
    return () => clearTimeout(enterTimer);
  }, [prefersReduced]);

  // Hold phase: progress bar fills
  useEffect(() => {
    if (phase !== "hold") return;

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.random() * 15 + 5;
      current = Math.min(current + increment, 100);
      setProgress(current);
      if (current >= 100) clearInterval(interval);
    }, 80);

    const holdTimer = setTimeout(() => setPhase("suspend"), 1400);

    return () => {
      clearInterval(interval);
      clearTimeout(holdTimer);
    };
  }, [phase]);

  // Suspend phase: "time stands still"
  useEffect(() => {
    if (phase !== "suspend") return;
    setProgress(100);
    const suspendTimer = setTimeout(() => setPhase("exit"), 1200);
    return () => clearTimeout(suspendTimer);
  }, [phase]);

  // Exit phase: curtains part
  useEffect(() => {
    if (phase !== "exit") return;
    const exitTimer = setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 900);
    return () => clearTimeout(exitTimer);
  }, [phase]);

  const showing = phase !== "done";

  if (!showing) return <>{children}</>;

  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 opacity-0 pointer-events-none">
        {children}
      </div>

      <AnimatePresence>
        {showing && (
          <>
            {/* Left curtain */}
            <motion.div
              key="curtain-left"
              className="fixed inset-y-0 left-0 w-1/2 z-[9998] bg-asphalt grain-overlay"
              initial={{ x: "0%" }}
              animate={phase === "exit" ? { x: "-102%", filter: "blur(2px)" } : { x: "0%", filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE_DRAMATIC }}
            />

            {/* Right curtain */}
            <motion.div
              key="curtain-right"
              className="fixed inset-y-0 right-0 w-1/2 z-[9998] bg-asphalt grain-overlay"
              initial={{ x: "0%" }}
              animate={phase === "exit" ? { x: "102%", filter: "blur(2px)" } : { x: "0%", filter: "blur(0px)" }}
              transition={{ duration: 0.9, ease: EASE_DRAMATIC }}
            />

            {/* Center seam copper shimmer line (exit only) */}
            {phase === "exit" && (
              <motion.div
                key="seam-line"
                className="fixed top-0 left-1/2 -translate-x-1/2 w-px h-full z-[9999]"
                style={{
                  background: `linear-gradient(180deg, transparent 0%, hsl(var(--copper)) 30%, hsl(var(--copper-glow)) 50%, hsl(var(--copper)) 70%, transparent 100%)`,
                }}
                initial={{ opacity: 1, scaleX: 0 }}
                animate={{ opacity: 0, scaleX: 3 }}
                transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
              />
            )}

            {/* Content overlay */}
            <motion.div
              key="content-overlay"
              className="fixed inset-0 z-[9999] flex flex-col items-center justify-center pointer-events-none"
              animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              {/* Corner L-brackets */}
              <CornerBrackets phase={phase} />

              <motion.div
                className="flex flex-col items-center gap-3"
                animate={
                  phase === "suspend"
                    ? { scale: 1.03 }
                    : { scale: 1 }
                }
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Logo mark entrance */}
                <motion.div
                  initial={{ scale: 0.4, opacity: 0, rotate: -8 }}
                  animate={
                    phase !== "enter"
                      ? { scale: 1, opacity: 1, rotate: 0 }
                      : { scale: 0.4, opacity: 0, rotate: -8 }
                  }
                  transition={{ duration: 0.6, delay: 0, ease: EASE_OUT_EXPO }}
                  className="text-copper mb-1"
                >
                  <LogoMark size={44} />
                </motion.div>

                {/* Brand name — clip-path wipe reveals */}
                <div className="flex items-baseline gap-[0.35em]">
                  <motion.span
                    className="font-display text-display-lg tracking-[-0.03em] text-foreground"
                    initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                    animate={
                      phase !== "enter"
                        ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
                        : { clipPath: "inset(0 0 100% 0)", opacity: 0 }
                    }
                    transition={{ duration: 0.6, delay: 0, ease: EASE_OUT_EXPO }}
                  >
                    Cochrane
                  </motion.span>
                  <motion.span
                    className="font-display text-display-lg tracking-[-0.03em] text-foreground"
                    initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                    animate={
                      phase !== "enter"
                        ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
                        : { clipPath: "inset(0 0 100% 0)", opacity: 0 }
                    }
                    transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_EXPO }}
                  >
                    Master Builders
                  </motion.span>
                </div>

                {/* "Custom Homes & Renovations" — staggered sub-title */}
                <motion.span
                  className="font-body text-body-sm uppercase tracking-[0.3em] text-copper/50"
                  initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0 }}
                  animate={
                    phase !== "enter"
                      ? { clipPath: "inset(0 0 0% 0)", opacity: 1 }
                      : { clipPath: "inset(0 0 100% 0)", opacity: 0 }
                  }
                  transition={{ duration: 0.5, delay: 0.25, ease: EASE_OUT_EXPO }}
                >
                  Custom Homes &amp; Renovations
                </motion.span>

                {/* Progress bar */}
                <motion.div
                  className="flex items-center gap-3 mt-3"
                  animate={
                    phase === "suspend" || phase === "exit"
                      ? { opacity: 0 }
                      : { opacity: 1 }
                  }
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <motion.div
                    className="w-40 h-[2px] bg-porcelain/5 overflow-hidden relative"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={phase !== "enter" ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease: EASE_OUT_EXPO }}
                    style={{ transformOrigin: "center" }}
                  >
                    <motion.div
                      className="h-full relative"
                      style={{
                        background: `linear-gradient(90deg, hsl(var(--copper)), hsl(var(--copper-glow)), hsl(var(--copper)))`,
                        width: `${progress}%`,
                      }}
                      transition={{ duration: 0.08 }}
                    >
                      {/* Shimmer sweep */}
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="loading-shimmer-sweep absolute inset-0" />
                      </div>
                    </motion.div>
                  </motion.div>
                  {/* Percentage counter with leading zero */}
                  <motion.span
                    className="text-caption text-copper/40 tabular-nums w-10 text-right"
                    initial={{ opacity: 0 }}
                    animate={phase !== "enter" ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
                  >
                    {Math.round(progress).toString().padStart(2, "0")}%
                  </motion.span>
                </motion.div>

                {/* Full-width horizontal copper rule — appears during suspend */}
                <motion.div
                  className="absolute left-0 right-0 h-px top-1/2"
                  style={{
                    background: `linear-gradient(90deg, transparent, hsl(var(--copper) / 0.4), hsl(var(--copper-glow) / 0.6), hsl(var(--copper) / 0.4), transparent)`,
                    transformOrigin: "center",
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={
                    phase === "suspend"
                      ? { scaleX: 1, opacity: 1 }
                      : phase === "exit"
                      ? { scaleX: 1, opacity: 0 }
                      : { scaleX: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.8, ease: EASE_IN_OUT }}
                />
              </motion.div>

              {/* Copper ring pulse — replaces cheap ambient glow */}
              <motion.div
                className="absolute w-48 h-48 rounded-full pointer-events-none border border-copper/10"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={
                  phase === "hold"
                    ? { scale: 1.2, opacity: 0.3 }
                    : phase === "suspend"
                    ? { scale: 1.5, opacity: 0 }
                    : { scale: 0.7, opacity: 0 }
                }
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* Industrial corner L-brackets */
const CornerBrackets = ({ phase }: { phase: Phase }) => {
  const show = phase !== "enter";
  const isSuspend = phase === "suspend";
  const size = "clamp(24px, 4vw, 40px)";
  const thickness = "1px";
  const color = "hsl(var(--copper) / 0.35)";

  const corners = [
    { top: "clamp(16px, 3vw, 32px)", left: "clamp(16px, 3vw, 32px)", originX: 0, originY: 0, borderTop: thickness, borderLeft: thickness },
    { top: "clamp(16px, 3vw, 32px)", right: "clamp(16px, 3vw, 32px)", originX: 1, originY: 0, borderTop: thickness, borderRight: thickness },
    { bottom: "clamp(16px, 3vw, 32px)", left: "clamp(16px, 3vw, 32px)", originX: 0, originY: 1, borderBottom: thickness, borderLeft: thickness },
    { bottom: "clamp(16px, 3vw, 32px)", right: "clamp(16px, 3vw, 32px)", originX: 1, originY: 1, borderBottom: thickness, borderRight: thickness },
  ];

  return (
    <>
      {corners.map((corner, i) => {
        const { originX, originY, ...pos } = corner;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: size,
              height: size,
              borderColor: color,
              transformOrigin: `${originX * 100}% ${originY * 100}%`,
            }}
            initial={{ scale: 0 }}
            animate={
              show
                ? { scale: isSuspend ? 1.08 : 1 }
                : { scale: 0 }
            }
            transition={{
              duration: isSuspend ? 1.2 : 0.4,
              delay: isSuspend ? 0 : 0.05 * i,
              ease: isSuspend ? [0.25, 0.1, 0.25, 1] : EASE_OUT_EXPO,
            }}
          />
        );
      })}
    </>
  );
};

export default LoadingScreen;
