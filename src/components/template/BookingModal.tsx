/**
 * BookingModal — Universal singleton booking modal.
 *
 * Import statically in App.tsx — NOT lazy. Kept in the main bundle so
 * mount time after trigger is < 1 frame.
 *
 * Two-region layout:
 *   Left  — BookingBrandStack (lg+, hidden on mobile)
 *   Right — BookingForm (full-width mobile, 540px desktop)
 *
 * Behaviour contract:
 *   - AnimatePresence wraps the backdrop + container inside this component.
 *   - Esc key closes.
 *   - Body scroll locked while open.
 *   - Focus trapped inside the modal.
 *   - Pointer-events gated during AnimatePresence exit (isClosing flag).
 *   - Full form state reset on each open (formKey changes with Date.now()).
 *   - prefers-reduced-motion: replaces clip-path with 120ms opacity fade.
 */

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookingBrandStack } from "./BookingBrandStack";
import { BookingForm } from "./BookingForm";
import type { BookingPrefill } from "@/config/template/booking-schema";

interface Props {
  open: boolean;
  onClose: () => void;
  prefill?: BookingPrefill;
}

const EASE_SPRING = [0.16, 1, 0.3, 1] as const;

export const BookingModal = ({ open, onClose, prefill }: Props) => {
  const reduceMotion = useReducedMotion();
  const [formKey, setFormKey] = useState(() => String(Date.now()));
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalId = useId();

  // New key on each open → resets form state
  useEffect(() => {
    if (open) {
      setFormKey(String(Date.now()));
      setIsClosing(false);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Esc key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const el = dialogRef.current;
    if (!el) return;

    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    };

    // Move focus into modal on mount
    const t = setTimeout(() => first?.focus(), 50);
    document.addEventListener("keydown", trap);
    return () => { clearTimeout(t); document.removeEventListener("keydown", trap); };
  }, [open, formKey]);

  const handleClose = () => {
    if (isClosing) return;
    setIsClosing(true);
    onClose();
  };

  // Motion variants — reduced-motion uses plain opacity fade
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const containerVariants = reduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: "100%" },
        visible: { opacity: 1, y: 0 },
      };

  const transition = reduceMotion
    ? { duration: 0.12 }
    : { duration: 0.38, ease: EASE_SPRING };

  return (
    <AnimatePresence mode="sync">
      {open && (
        <>
          {/* ── Backdrop ──────────────────────────────────────────── */}
          <motion.div
            key="booking-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: reduceMotion ? 0.12 : 0.22 }}
            className="fixed inset-0 z-[60]"
            style={{ background: "hsl(218 43% 8% / 0.88)", backdropFilter: "blur(4px)" }}
            onClick={isClosing ? undefined : handleClose}
            aria-hidden="true"
          />

          {/* ── Modal container ───────────────────────────────────── */}
          <motion.div
            key="booking-modal"
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`${modalId}-title`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={transition}
            className="fixed inset-x-0 bottom-0 z-[70] mx-auto w-full md:inset-x-6 md:bottom-auto md:top-1/2 md:w-auto"
            style={{ maxWidth: 1040, transform: open ? undefined : "translateY(100%)" }}
            onAnimationComplete={(def) => {
              if (def === "hidden") setIsClosing(false);
            }}
          >
            {/* Centering on desktop */}
            <div className="md:-translate-y-1/2 md:transform">
              <div
                className="flex overflow-hidden shadow-2xl"
                style={{
                  height: "92dvh",
                  maxHeight: "92dvh",
                  background: "#f8f4ef", // bone — form panel background
                  // On desktop, cap height
                }}
              >
                {/* Left: Brand stack (lg+ only) */}
                <BookingBrandStack prefill={prefill} />

                {/* Right: Form — always visible */}
                <div className="flex min-w-0 flex-1 flex-col md:w-[540px] md:flex-none">
                  <BookingForm
                    key={formKey}
                    prefill={prefill}
                    onClose={handleClose}
                    formKey={formKey}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
