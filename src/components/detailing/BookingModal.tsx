import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageCircle, Phone, Sparkles, Armchair, Home, HelpCircle, ArrowRight, Upload, Image as ImageIcon, Film } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { useBookingValidation } from "@/hooks/use-booking-validation";
import type { BookingDraft } from "@/lib/booking-validation";
import { supabase } from "@/integrations/supabase/client";
import LogoMark from "./LogoMark";

/**
 * STRICT_VALIDATION — when `true`, submit is gated by the full questionnaire
 * contract (date, time, location, site readiness, etc.). Keep `false` until
 * the modal UI is upgraded to actually collect those fields.
 */
const STRICT_VALIDATION = false;

/** Map current modal state into the `BookingDraft` shape the validator expects. */
function buildDraft(args: {
  selectedService: string;
  selectedVehicle: string;
  customVehicle: string;
  formData: { name: string; email: string; phone: string; message: string };
  files: File[];
}): Partial<BookingDraft> {
  const { selectedService, selectedVehicle, customVehicle, formData, files } = args;
  const packageMap: Record<string, BookingDraft["package"]> = {
    "full-reset": "full-detail",
    interior: "basic-wash",
    exterior: "full-detail",
    other: "not-sure",
  };
  const vehicleMap: Record<string, BookingDraft["vehicleType"]> = {
    townhome: "townhome",
    suv: "suv",
    truck: "truck",
    van: "van",
    other: "other",
  };
  return {
    package: packageMap[selectedService],
    vehicleType: vehicleMap[selectedVehicle],
    customVehicle: customVehicle || undefined,
    name: formData.name || undefined,
    email: formData.email || undefined,
    phone: formData.phone || undefined,
    message: formData.message || undefined,
    media: files.length ? files : undefined,
  };
}

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

const services = [
  { id: "full-reset", name: "The Custom Build", desc: "Interior + exterior — the complete transformation", popular: true, icon: Sparkles },
  { id: "interior", name: "Basic Wash (Interior)", desc: "Vacuum, shampoo, dash, seats, leather, doors, trunk.", icon: Armchair },
  { id: "exterior", name: "Exterior Add-On (+$30)", desc: "Hand wash, millwork detail, tires/trim, sealant — added to any interior.", icon: Home },
  { id: "other", name: "Not sure yet", desc: "I'll describe what I need", icon: HelpCircle },
];

const vehicleTypes = [
  { id: "townhome", label: "Townhome / Coupe", emoji: "🚗" },
  { id: "suv", label: "addition / Crossover", emoji: "🚙" },
  { id: "truck", label: "Truck", emoji: "🛻" },
  { id: "van", label: "Van / Minivan", emoji: "🚐" },
  { id: "other", label: "Other", emoji: "✏️" },
];

const stepMicrocopy = ["Choose your service", "What do you drive?", "Your details", "One more thing"];
const stepHeaders = ["Let's get started", "Almost there", "Last step", "Optional extras"];

const panelEase: [number, number, number, number] = [0.32, 0.72, 0, 1];

const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [customVehicle, setCustomVehicle] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [animating, setAnimating] = useState(false);
  const isMobile = useIsMobile();
  const nameRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Track all pending timeouts so we can clear them on close/unmount
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());

  const trackedTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeoutRefs.current.delete(id);
      fn();
    }, ms);
    timeoutRefs.current.add(id);
    return id;
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(clearTimeout);
    timeoutRefs.current.clear();
  }, []);

  // Cleanup all timeouts on unmount
  useEffect(() => () => clearAllTimeouts(), [clearAllTimeouts]);

  useEffect(() => {
    if (step === 3) {
      trackedTimeout(() => nameRef.current?.focus(), 350);
    }
  }, [step, trackedTimeout]);

  const handleSelectService = (id: string) => {
    setSelectedService(id);
    trackedTimeout(() => setStep(2), 400);
  };

  const handleSelectVehicle = (id: string) => {
    setSelectedVehicle(id);
    if (id !== "other") {
      trackedTimeout(() => setStep(3), 400);
    }
  };

  const handleContinueFromOther = () => {
    if (customVehicle.trim()) {
      trackedTimeout(() => setStep(3), 200);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...newFiles].slice(0, 3));
    e.target.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const persistAndNotify = useCallback(async () => {
    // Best-effort persistence + email. Failures are silent to the user — the
    // animation/success state still completes so the customer never sees a
    // technical error. Cochrane Master Builders can follow up via the contact channels shown.
    try {
      const id = crypto.randomUUID();
      const serviceLabel = services.find((s) => s.id === selectedService)?.name;
      const vehicleLabel =
        selectedVehicle === "other"
          ? customVehicle.trim() || "Other"
          : vehicleTypes.find((v) => v.id === selectedVehicle)?.label;

      const { error: insertError } = await supabase.from("bookings").insert({
        id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        service: serviceLabel ?? null,
        vehicle_type: selectedVehicle || null,
        custom_vehicle: customVehicle.trim() || null,
        message: formData.message || null,
      });

      if (insertError && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[booking] insert failed", insertError);
      }

      const { error: fnError } = await supabase.functions.invoke(
        "send-transactional-email",
        {
          body: {
            templateName: "booking-confirmation",
            recipientEmail: formData.email,
            idempotencyKey: `booking-confirm-${id}`,
            templateData: {
              name: formData.name,
              service: serviceLabel ?? "The Custom Build",
              project: vehicleLabel ?? undefined,
              phone: formData.phone || undefined,
              message: formData.message || undefined,
            },
          },
        },
      );

      if (fnError && import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[booking] email invoke failed", fnError);
      }
    } catch (err) {
      if (import.meta.env.DEV) {
        // eslint-disable-next-line no-console
        console.warn("[booking] submit pipeline error", err);
      }
    }
  }, [
    selectedService,
    selectedVehicle,
    customVehicle,
    formData.name,
    formData.email,
    formData.phone,
    formData.message,
  ]);

  const handleSubmit = () => {
    // Fire-and-forget — UI continues immediately, the network work runs in the
    // background. The dirt-to-clean animation gives it time to complete.
    void persistAndNotify();

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setSubmitted(true);
      return;
    }
    setAnimating(true);
    trackedTimeout(() => {
      setAnimating(false);
      setSubmitted(true);
    }, 2000);
  };

  // Reset all state only after exit animation completes (via onExitComplete)
  const resetState = useCallback(() => {
    setStep(1);
    setSelectedService("");
    setSelectedVehicle("");
    setCustomVehicle("");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setFiles([]);
    setSubmitted(false);
    setAnimating(false);
  }, []);

  // Clear all pending timeouts the instant close begins
  useEffect(() => {
    if (!open) {
      clearAllTimeouts();
    }
  }, [open, clearAllTimeouts]);

  const handleClose = () => {
    onClose();
  };

  // Build a BookingDraft derived from current state and run the full validator
  // behind a flag. This is read-only for now — the existing UI flow still works.
  const draft = useMemo(
    () => buildDraft({ selectedService, selectedVehicle, customVehicle, formData, files }),
    [selectedService, selectedVehicle, customVehicle, formData, files],
  );
  const validation = useBookingValidation(draft);

  useEffect(() => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.debug("[booking] validation", {
        isValid: validation.isValid,
        missing: validation.missing,
        errors: validation.errors,
        warnings: validation.warnings,
      });
    }
  }, [validation]);

  const looseCanSubmit = !!(formData.name && formData.email);
  const canSubmit = STRICT_VALIDATION ? validation.isValid : looseCanSubmit;
  const selectedServiceData = services.find(s => s.id === selectedService);
  const selectedVehicleData = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <div style={{ pointerEvents: open ? 'auto' : 'none' }}>
      <AnimatePresence onExitComplete={resetState}>
        {open && (
          <motion.div
            key="booking-modal-root"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70]"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="absolute inset-0 bg-asphalt/60 backdrop-blur-xl"
            />

          {/* Brand identity stack — desktop only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="absolute inset-0 z-[1] hidden lg:flex items-center justify-center pointer-events-none"
            style={{ right: "480px" }}
          >
            <div className="relative flex flex-col items-center gap-6">
              {/* Ambient copper glow */}
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: [1, 1.15, 1], opacity: 1 }}
                transition={{ scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 1, delay: 0.3 } }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-copper/[0.04] blur-[80px] pointer-events-none"
              />

              {/* LogoMark — clipPath circular reveal + spring scale */}
              <motion.div
                initial={{ clipPath: "circle(0% at 50% 50%)", scale: 0.6, opacity: 0 }}
                animate={{ clipPath: "circle(100% at 50% 50%)", scale: 1, opacity: 1 }}
                exit={{ clipPath: "circle(0% at 50% 50%)", scale: 0.6, opacity: 0 }}
                transition={{
                  clipPath: { duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] },
                  scale: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 },
                  opacity: { duration: 0.4, delay: 0.1 },
                }}
              >
                {/* Slow idle rotation */}
                <motion.div
                  animate={{ rotate: [0, 0.5, 0, -0.5, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LogoMark size={160} className="text-copper" />
                </motion.div>
              </motion.div>

              {/* Copper rule — scaleX from center */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: [1, 0.6, 1] }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{
                  scaleX: { duration: 0.7, delay: 0.5, ease: [0.32, 0.72, 0, 1] },
                  opacity: { duration: 4, delay: 1.2, repeat: Infinity, ease: "easeInOut" },
                }}
                className="w-16 h-px bg-gradient-to-r from-transparent via-copper/40 to-transparent origin-center"
              />

              {/* "COCHRANE MASTER BUILDERS" — character-by-character stagger */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.55 }}
                className="text-center"
              >
                <p className="font-display text-display-sm text-foreground/90 tracking-[0.08em]">
                  {"COCHRANE MASTER BUILDERS".split("").map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.6 + i * 0.03, ease: [0.25, 0.1, 0.25, 1] }}
                      className="inline-block"
                      style={char === " " ? { width: "0.25em" } : undefined}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                </p>
                {/* "Master Builders" — slides in from right */}
                <motion.p
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + "COCHRANE MASTER BUILDERS".length * 0.03 + 0.05, ease: panelEase }}
                  className="font-overline text-caption tracking-[0.3em] text-copper/60 uppercase mt-1"
                >
                  Master Builders
                </motion.p>
              </motion.div>

              {/* "Calgary, Alberta" — fades in last */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.6 + "COCHRANE MASTER BUILDERS".length * 0.03 + 0.25 }}
                className="text-body-sm text-muted-foreground/30 tracking-[0.15em] uppercase"
              >
                Calgary, Alberta
              </motion.p>
            </div>
          </motion.div>

          {/* Side panel */}
          <motion.div
            initial={isMobile ? { y: "100%" } : { x: "100%" }}
            animate={isMobile ? { y: 0 } : { x: 0 }}
            exit={isMobile ? { y: "100%" } : { x: "100%" }}
            transition={{ duration: 0.5, ease: panelEase }}
            className={`absolute z-[2] bg-background ${
              isMobile
                ? "inset-x-0 bottom-0 rounded-t-xl max-h-[92dvh] overflow-y-auto"
                : "top-0 right-0 bottom-0 w-[480px] overflow-y-auto shadow-large"
            }`}
          >
            {/* Grain overlay */}
            <div className="grain-overlay pointer-events-none absolute inset-0 rounded-[inherit] z-0" />

            {/* Veepo agency credit */}
            <a
              href="https://veepo.ca/case-studies"
              target="_blank"
              rel="noopener noreferrer"
              className="group/veepo absolute top-3 left-4 z-20 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition-all duration-500"
            >
              <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-foreground/70 transition-colors duration-300">
                Powered{" "}
                <span className="group-hover/veepo:text-[#FF8C2A] transition-colors duration-300">locally</span>
                {" "}by{" "}
                <span className="group-hover/veepo:text-[#2EAF4B] transition-colors duration-300 font-medium">veepo.ca</span>
              </span>
            </a>

            {/* Copper accent bar — desktop */}
            {!isMobile && (
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-copper/0 via-copper/40 to-copper/0 z-10" />
            )}

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 pb-4">
              <div className="flex items-center gap-3">
                {/* Logo on mobile */}
                <div className="lg:hidden">
                  <LogoMark size={24} className="text-copper/70" />
                </div>
                <div>
                  <h2 className="font-display text-display-sm text-foreground">
                    {animating ? "" : submitted ? "You're all set." : stepHeaders[step - 1]}
                  </h2>
                </div>
              </div>
              <motion.button
                onClick={handleClose}
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.3 }}
                className="p-3 text-muted-foreground/40 hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X size={20} strokeWidth={1.5} />
              </motion.button>
            </div>

            {/* Progress dots */}
            {!submitted && !animating && (
              <div className="relative z-10 px-6 pb-4">
                <div className="flex items-center gap-3 mb-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-3">
                      <motion.div
                        className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                          s < step
                            ? "bg-copper"
                            : s === step
                            ? "bg-copper shadow-[0_0_8px_hsl(var(--copper)/0.4)]"
                            : "border border-muted-foreground/20 bg-transparent"
                        }`}
                        animate={s === step ? { scale: [1, 1.3, 1] } : {}}
                        transition={{ duration: 0.4 }}
                      >
                        {s < step && <Check size={8} className="text-primary-foreground" strokeWidth={3} />}
                      </motion.div>
                      {s < 4 && (
                        <div className={`w-8 h-px transition-colors duration-300 ${s < step ? "bg-copper/40" : "bg-muted-foreground/10"}`} />
                      )}
                    </div>
                  ))}
                </div>
                <p className="font-overline text-muted-foreground/40 text-caption tracking-[0.2em] uppercase">
                  {stepMicrocopy[step - 1]}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 px-6 pb-2">
              <AnimatePresence mode="wait">
                {animating ? (
                  <motion.div key="dirt-animation" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <DirtToCleanAnimation />
                  </motion.div>
                ) : submitted ? (
                  <motion.div key="success-state" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <SuccessState serviceName={selectedServiceData?.name || "service"} onDone={handleClose} />
                  </motion.div>
                ) : step === 1 ? (
                  <StepServices selectedService={selectedService} onSelect={handleSelectService} />
                ) : step === 2 ? (
                  <StepVehicle selectedVehicle={selectedVehicle} onSelect={handleSelectVehicle} customVehicle={customVehicle} setCustomVehicle={setCustomVehicle} onContinue={handleContinueFromOther} />
                ) : step === 3 ? (
                  <StepDetails
                    formData={formData}
                    setFormData={setFormData}
                    nameRef={nameRef}
                    selectedServiceData={selectedServiceData}
                    selectedVehicleData={selectedVehicleData}
                    customVehicle={customVehicle}
                  />
                ) : (
                  <StepMedia
                    selectedServiceData={selectedServiceData}
                    selectedVehicleData={selectedVehicleData}
                    customVehicle={customVehicle}
                    files={files}
                    onFileChange={handleFileChange}
                    onRemoveFile={removeFile}
                    fileInputRef={fileInputRef}
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Footer — step 3: Continue to step 4 */}
            {!submitted && !animating && step === 3 && (
              <div className="relative z-10 p-6 pt-2 flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep(2)}
                  className="text-body-sm text-muted-foreground/40 hover:text-foreground transition-colors flex-shrink-0"
                >
                  ← Back
                </button>
                <motion.button
                  onClick={() => setStep(4)}
                  disabled={!canSubmit}
                  whileHover={canSubmit ? { scale: 1.02 } : {}}
                  whileTap={canSubmit ? { scale: 0.98 } : {}}
                  className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms] disabled:opacity-30 disabled:cursor-not-allowed min-w-0"
                >
                  Continue
                  <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </motion.span>
                </motion.button>
              </div>
            )}

            {/* Footer — step 4: Skip or Book */}
            {!submitted && !animating && step === 4 && (
              <div className="relative z-10 p-6 pt-2 flex items-center justify-between gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="text-body-sm text-muted-foreground/40 hover:text-foreground transition-colors flex-shrink-0"
                >
                  ← Back
                </button>
                <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    onClick={handleSubmit}
                    className="text-body-sm text-muted-foreground/50 hover:text-foreground transition-colors underline underline-offset-4 decoration-muted-foreground/20 hover:decoration-foreground/40 text-center"
                  >
                    Skip & Book
                  </button>
                  <motion.button
                    onClick={handleSubmit}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms] w-full sm:w-auto"
                  >
                    Book My Reset
                    <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </motion.span>
                  </motion.button>
                </div>
              </div>
            )}

            {/* Back — step 2 */}
            {!submitted && !animating && step === 2 && (
              <div className="relative z-10 px-6 pb-4">
                <button
                  onClick={() => setStep(1)}
                  className="text-body-sm text-muted-foreground/40 hover:text-foreground transition-colors"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* Contact fallback */}
            <div className="relative z-10 px-6 pb-6 pt-2 border-t border-border/30">
              <div className="flex items-center gap-4 text-body-sm text-muted-foreground/40">
                <div className="flex items-center gap-2">
                  <MessageCircle size={14} strokeWidth={1.5} />
                  <a href="sms:+13062097804" className="text-copper/70 hover:text-copper transition-colors">Text us</a>
                </div>
                <span className="text-border/30">·</span>
                <div className="flex items-center gap-2">
                  <Phone size={14} strokeWidth={1.5} />
                  <a href="tel:+13062097804" className="text-copper/70 hover:text-copper transition-colors">Call or text (306) 209-7804</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
};

/* ─── Dirt-to-Clean Submission Animation ─── */

const generateParticles = () =>
  Array.from({ length: 14 }, (_, i) => {
    const isStreak = i >= 12; // last 2-3 are elongated streaks
    return {
      id: i,
      x: Math.random() * 75 + 12,
      y: Math.random() * 65 + 12,
      size: isStreak ? Math.random() * 12 + 6 : Math.random() * 32 + 8,
      width: isStreak ? Math.random() * 40 + 20 : undefined,
      opacity: Math.random() * 0.35 + 0.25,
      hue: Math.random() > 0.5 ? "25 30% 25%" : "30 20% 18%",
      blur: Math.random() > 0.75,
      delay: Math.random() * 0.3,
      rotation: isStreak ? Math.random() * 60 - 30 : 0,
      borderRadius: isStreak
        ? "40% 60% 50% 50%"
        : `${40 + Math.random() * 20}% ${50 + Math.random() * 15}% ${45 + Math.random() * 20}% ${50 + Math.random() * 15}% / ${45 + Math.random() * 15}% ${40 + Math.random() * 20}% ${55 + Math.random() * 10}% ${50 + Math.random() * 15}%`,
      isStreak,
    };
  });

const DirtToCleanAnimation = () => {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <motion.div
      key="dirt-animation"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative min-h-[300px] overflow-hidden"
    >
      {/* Subtle breathing pulse on container */}
      <motion.div
        animate={{ scale: [1, 1.008, 1] }}
        transition={{ duration: 2, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {/* Phase 1: Organic dirt particles splatter in */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1.1, 1],
              opacity: [0, p.opacity, p.opacity],
            }}
            transition={{
              delay: p.delay,
              duration: 0.4,
              type: "spring",
              stiffness: 280,
              damping: 14,
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.isStreak ? p.width : p.size,
              height: p.size,
              borderRadius: p.borderRadius,
              background: `hsl(${p.hue})`,
              filter: p.blur ? "blur(3px)" : "none",
              transform: `rotate(${p.rotation}deg)`,
            }}
          />
        ))}

        {/* Phase 1→2: Particles fade out timed to wipe position */}
        {particles.map((p) => (
          <motion.div
            key={`fade-${p.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: p.opacity }}
            transition={{
              delay: p.delay,
              duration: 0.3,
            }}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.isStreak ? p.width : p.size,
              height: p.size,
              borderRadius: p.borderRadius,
              background: `hsl(${p.hue})`,
              filter: p.blur ? "blur(3px)" : "none",
              transform: `rotate(${p.rotation}deg)`,
            }}
          >
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                delay: 0.6 + (p.y / 100) * 0.7,
                duration: 0.12,
                ease: "easeOut",
              }}
              className="w-full h-full"
              style={{
                borderRadius: "inherit",
                background: `hsl(${p.hue})`,
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Phase 2: Microfiber cloth wipe sweeps top to bottom */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: "120%" }}
        transition={{
          delay: 0.6,
          duration: 0.8,
          ease: [0.32, 0.72, 0, 1],
        }}
        className="absolute inset-x-0 z-10"
        style={{ height: 80 }}
      >
        {/* Copper leading edge */}
        <div className="w-full h-px bg-copper/60" />
        {/* Cloth body with millwork texture lines */}
        <div className="relative w-full h-full bg-gradient-to-b from-stone/30 via-stone/15 to-transparent overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-evenly">
            <div className="w-full h-px bg-foreground/[0.03]" />
            <div className="w-full h-px bg-foreground/[0.02]" />
            <div className="w-full h-px bg-foreground/[0.03]" />
          </div>
        </div>
      </motion.div>

      {/* Phase 3: Copper shine sweep — polished surface catching light */}
      <div className="absolute inset-0 flex items-center justify-center z-20 overflow-hidden">
        <motion.div
          initial={{ x: "-120%", opacity: 0 }}
          animate={{ x: "120%", opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            delay: 1.5,
            duration: 0.45,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="w-full h-px bg-gradient-to-r from-transparent via-copper/50 to-transparent"
        />
      </div>
    </motion.div>
  );
};

/* ─── Step 1: Services ─── */
const StepServices = ({ selectedService, onSelect }: { selectedService: string; onSelect: (id: string) => void }) => (
  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
    <div className="space-y-1.5">
      {services.map((s) => {
        const Icon = s.icon;
        const isSelected = selectedService === s.id;
        return (
          <motion.button
            key={s.id}
            onClick={() => onSelect(s.id)}
            animate={isSelected ? { scale: [1, 1.02, 1] } : { scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full text-left py-4 px-5 flex items-start gap-4 transition-all duration-200 ${
              isSelected
                ? "border-l-2 border-copper bg-copper/[0.04] shadow-[0_0_0_1px_hsl(var(--copper)/0.15)]"
                : "border-l-2 border-transparent hover:bg-foreground/[0.02]"
            }`}
          >
            <div className={`mt-0.5 transition-colors duration-200 ${isSelected ? "text-copper" : "text-muted-foreground/30"}`}>
              <Icon size={18} strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-display text-body font-medium text-foreground">{s.name}</span>
                <div className="flex items-center gap-2">
                  {s.popular && (
                    <span className="text-caption text-copper/70 font-medium uppercase tracking-wider">Popular</span>
                  )}
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <Check size={14} className="text-copper" strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <p className="text-body-sm text-muted-foreground/60 mt-0.5">{s.desc}</p>
            </div>
          </motion.button>
        );
      })}
    </div>
  </motion.div>
);

/* ─── Step 2: Project ─── */
const StepVehicle = ({ selectedVehicle, onSelect, customVehicle, setCustomVehicle, onContinue }: { selectedVehicle: string; onSelect: (id: string) => void; customVehicle: string; setCustomVehicle: (v: string) => void; onContinue: () => void }) => (
  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
    <div className="grid grid-cols-2 gap-3">
      {vehicleTypes.map((v) => {
        const isSelected = selectedVehicle === v.id;
        return (
          <motion.button
            key={v.id}
            onClick={() => onSelect(v.id)}
            animate={isSelected ? { scale: [1, 1.03, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            className={`py-5 px-4 text-center flex flex-col items-center gap-2 transition-all duration-200 rounded-sm ${
              isSelected
                ? "bg-copper/[0.06] text-foreground shadow-[0_0_0_1px_hsl(var(--copper)/0.2)]"
                : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.02]"
            }`}
          >
            <span className="text-2xl">{v.emoji}</span>
            <span className="font-display text-body-sm font-medium">{v.label}</span>
            <AnimatePresence>
              {isSelected && (
                <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}>
                  <Check size={12} className="text-copper" strokeWidth={2.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>

    <AnimatePresence>
      {selectedVehicle === "other" && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
          <div className="mt-4 space-y-3">
            <div className="input-copper-focus">
              <Input
                value={customVehicle}
                onChange={(e) => setCustomVehicle(e.target.value)}
                placeholder="e.g. Tesla Model 3, RV, Motorcycle..."
                className="rounded-sm bg-white/5 border-border/50 focus:translate-y-[-1px] transition-all"
                autoFocus
              />
            </div>
            <motion.button
              onClick={onContinue}
              disabled={!customVehicle.trim()}
              whileHover={customVehicle.trim() ? { scale: 1.02 } : {}}
              whileTap={customVehicle.trim() ? { scale: 0.98 } : {}}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms] disabled:opacity-30 disabled:cursor-not-allowed"
            >
              Continue
              <ArrowRight size={14} strokeWidth={1.5} />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

/* ─── Step 3: Details (no file upload) ─── */
interface StepDetailsProps {
  formData: { name: string; email: string; phone: string; message: string };
  setFormData: (d: { name: string; email: string; phone: string; message: string }) => void;
  nameRef: React.RefObject<HTMLInputElement>;
  selectedServiceData?: { name: string; icon: any } | null;
  selectedVehicleData?: { id?: string; label: string; emoji: string } | null;
  customVehicle: string;
}

const StepDetails = ({ formData, setFormData, nameRef, selectedServiceData, selectedVehicleData, customVehicle }: StepDetailsProps) => (
  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
    {(selectedServiceData || selectedVehicleData) && (
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 mb-5 border border-copper/15 rounded-sm bg-copper/[0.02]">
        {selectedServiceData && (
          <div className="flex items-center gap-2 text-body-sm text-foreground/70">
            <selectedServiceData.icon size={14} strokeWidth={1.5} className="text-copper/60" />
            <span>{selectedServiceData.name}</span>
          </div>
        )}
        {selectedServiceData && selectedVehicleData && <span className="text-muted-foreground/20">·</span>}
        {selectedVehicleData && (
          <div className="flex items-center gap-1.5 text-body-sm text-foreground/70">
            <span className="text-sm">{selectedVehicleData.emoji}</span>
            <span>{selectedVehicleData.id === "other" ? customVehicle || "Other" : selectedVehicleData.label}</span>
          </div>
        )}
      </div>
    )}

    <div className="space-y-5">
      <div className="input-copper-focus">
        <label className="text-body-sm text-foreground/70 mb-1.5 block">Name</label>
        <Input ref={nameRef} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" className="rounded-sm bg-white/5 border-border/50 focus:translate-y-[-1px] transition-all" />
      </div>
      <div className="input-copper-focus">
        <label className="text-body-sm text-foreground/70 mb-1.5 block">Email</label>
        <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="you@email.com" className="rounded-sm bg-white/5 border-border/50 focus:translate-y-[-1px] transition-all" />
      </div>
      <div className="input-copper-focus">
        <label className="text-body-sm text-foreground/70 mb-1.5 block">Phone (optional)</label>
        <Input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="(403) 555-0123" className="rounded-sm bg-white/5 border-border/50 focus:translate-y-[-1px] transition-all" />
      </div>
      <div className="input-copper-focus">
        <label className="text-body-sm text-foreground/70 mb-1.5 block">Anything else? (optional)</label>
        <Textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your project's condition..." rows={3} className="rounded-sm bg-white/5 border-border/50 focus:translate-y-[-1px] transition-all" />
      </div>
    </div>
  </motion.div>
);

/* ─── Step 4: Optional Media Upload ─── */
interface StepMediaProps {
  selectedServiceData?: { name: string; icon: any } | null;
  selectedVehicleData?: { id?: string; label: string; emoji: string } | null;
  customVehicle: string;
  files: File[];
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

const StepMedia = ({ selectedServiceData, selectedVehicleData, customVehicle, files, onFileChange, onRemoveFile, fileInputRef }: StepMediaProps) => (
  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
    {(selectedServiceData || selectedVehicleData) && (
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 p-3 mb-5 border border-copper/15 rounded-sm bg-copper/[0.02]">
        {selectedServiceData && (
          <div className="flex items-center gap-2 text-body-sm text-foreground/70">
            <selectedServiceData.icon size={14} strokeWidth={1.5} className="text-copper/60" />
            <span>{selectedServiceData.name}</span>
          </div>
        )}
        {selectedServiceData && selectedVehicleData && <span className="text-muted-foreground/20">·</span>}
        {selectedVehicleData && (
          <div className="flex items-center gap-1.5 text-body-sm text-foreground/70">
            <span className="text-sm">{selectedVehicleData.emoji}</span>
            <span>{selectedVehicleData.id === "other" ? customVehicle || "Other" : selectedVehicleData.label}</span>
          </div>
        )}
      </div>
    )}

    <p className="text-body-sm text-muted-foreground/50 mb-5">
      This step is totally optional — feel free to skip it.
    </p>

    <div>
      <label className="text-body-sm text-foreground/70 mb-1.5 block">Photos or video (optional)</label>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={onFileChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        disabled={files.length >= 3}
        className="w-full py-4 px-4 border border-dashed border-copper/20 rounded-sm bg-copper/[0.02] hover:bg-copper/[0.05] hover:border-copper/30 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed group"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 text-muted-foreground/40 group-hover:text-copper/60 transition-colors">
            <Upload size={16} strokeWidth={1.5} />
            <ImageIcon size={16} strokeWidth={1.5} />
            <Film size={16} strokeWidth={1.5} />
          </div>
          <span className="text-body-sm text-muted-foreground/40 group-hover:text-muted-foreground/60 transition-colors">
            {files.length >= 3 ? "Maximum 3 files" : "Show us what we're working with — totally optional"}
          </span>
        </div>
      </button>

      {files.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between py-1.5 px-3 bg-copper/[0.03] border border-copper/10 rounded-sm">
              <div className="flex items-center gap-2 min-w-0">
                {file.type.startsWith("image") ? <ImageIcon size={12} className="text-copper/50 flex-shrink-0" strokeWidth={1.5} /> : <Film size={12} className="text-copper/50 flex-shrink-0" strokeWidth={1.5} />}
                <span className="text-body-sm text-foreground/60 truncate">{file.name}</span>
              </div>
              <button onClick={() => onRemoveFile(i)} className="p-2 text-muted-foreground/30 hover:text-foreground transition-colors flex-shrink-0 ml-2">
                <X size={12} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  </motion.div>
);

/* ─── Success State ─── */
const SuccessState = ({ serviceName, onDone }: { serviceName: string; onDone?: () => void }) => (
  <motion.div key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="relative text-center py-10">
    {/* Light-catch flash on mount */}
    <motion.div
      initial={{ opacity: 0.03 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.1, delay: 0.05 }}
      className="absolute inset-0 bg-foreground pointer-events-none z-10"
    />

    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.1 }}
      className="w-14 h-14 rounded-full border border-copper/30 flex items-center justify-center mx-auto mb-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.3 }}
      >
        <Check size={22} className="text-copper" strokeWidth={1.5} />
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "3rem" }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="h-px bg-copper/30 mx-auto mb-6"
    />

    <p className="font-display text-body text-foreground mb-2">Your {serviceName} is booked.</p>
    <p className="text-body-sm text-muted-foreground/50 mb-8">Here's what happens next:</p>

    <div className="space-y-4 text-left max-w-[280px] mx-auto">
      {[
        { step: "1", text: "We'll confirm by text within 2 hours" },
        { step: "2", text: "We show up on your schedule" },
        { step: "3", text: "You build it like it is ours, transformed" },
      ].map((item, i) => (
        <motion.div
          key={item.step}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 + i * 0.12 }}
          className="flex items-start gap-3"
        >
          <span className="w-5 h-5 rounded-full border border-copper/20 flex items-center justify-center text-caption text-copper/60 font-medium flex-shrink-0 mt-0.5">
            {item.step}
          </span>
          <span className="text-body-sm text-muted-foreground/70">{item.text}</span>
        </motion.div>
      ))}
    </div>

    {onDone && (
      <motion.button
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        onClick={onDone}
        className="mt-8 mx-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-copper text-primary-foreground font-body text-label uppercase tracking-[0.15em] hover:bg-copper-glow cta-copper-glow transition-all duration-[400ms]"
      >
        Done
      </motion.button>
    )}

    <div className="mt-6 flex items-center justify-center gap-2 text-body-sm text-muted-foreground/40">
      <MessageCircle size={14} strokeWidth={1.5} />
      <span>Questions? <a href="sms:+13062097804" className="text-copper/70 hover:text-copper transition-colors">Text us anytime</a></span>
    </div>
  </motion.div>
);

export default BookingModal;
