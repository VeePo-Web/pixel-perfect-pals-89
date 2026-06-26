/**
 * BookingForm — right region of the booking modal.
 *
 * 4-step animated wizard:
 *   0 — Project details (optional textarea)
 *   1 — Photos / video (MediaDropzone, optional)
 *   2 — Contact info (name, email, phone — all required)
 *   3 — Review & send
 *
 * State persisted to sessionStorage ("cmb.booking.draft") on every change.
 * Cleared on successful submission.
 *
 * Uses react-hook-form + zod. Validates on blur, errors shown below field.
 * Optimistic navigation: route to /thank-you at request fire; toast on failure.
 */

import {
  useEffect,
  useState,
  useCallback,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  bookingSchema,
  BOOKING_STEPS,
  MEDIA_LIMITS,
  type BookingFormData,
  type BookingPrefill,
} from "@/config/template/booking-schema";
import { MASTER_REMIX } from "@/config/template/remix-variables";
import { MediaDropzone, type MediaFile } from "./MediaDropzone";

const DRAFT_KEY = "cmb.booking.draft";
const STEP_VARIANTS = {
  enter: (dir: number) => ({ x: dir > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -40 : 40, opacity: 0 }),
};
const STEP_TRANSITION = { duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

function loadDraft(): Partial<BookingFormData> {
  try {
    const raw = sessionStorage.getItem(DRAFT_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch { return {}; }
}

function saveDraft(data: Partial<BookingFormData>) {
  try { sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data)); } catch {}
}

function clearDraft() {
  try { sessionStorage.removeItem(DRAFT_KEY); } catch {}
}

async function uploadMedia(files: MediaFile[], submissionId: string): Promise<string[]> {
  const urls: string[] = [];
  for (let i = 0; i < files.length; i++) {
    const { file } = files[i];
    const ext = file.name.split(".").pop() ?? "bin";
    const path = `${submissionId}/${String(i + 1).padStart(2, "0")}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error } = await supabase.storage
      .from("booking-media")
      .upload(path, file, { upsert: true });
    if (!error) {
      const { data } = supabase.storage.from("booking-media").getPublicUrl(path);
      urls.push(data.publicUrl);
    }
  }
  return urls;
}

interface Props {
  prefill?: BookingPrefill;
  onClose: () => void;
  formKey: string; // changes on each modal open → resets form
}

export const BookingForm = ({ prefill, onClose, formKey }: Props) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [submitting, setSubmitting] = useState(false);
  // Focus is handled via data-booking-first attribute + querySelector on step change

  const draft = loadDraft();

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    mode: "onBlur",
    defaultValues: {
      projectDetails: prefill?.description ?? draft.projectDetails ?? "",
      name: draft.name ?? "",
      email: draft.email ?? "",
      phone: draft.phone ?? "",
      serviceSlug: prefill?.serviceSlug ?? draft.serviceSlug ?? "",
      website: "",
    },
  });

  // Persist draft on every change
  const values = watch();
  useEffect(() => {
    saveDraft({ projectDetails: values.projectDetails, name: values.name, email: values.email, phone: values.phone });
  }, [values.projectDetails, values.name, values.email, values.phone]);

  // Focus first input/textarea in the active step after transition
  useEffect(() => {
    const t = setTimeout(() => {
      const el = document.querySelector<HTMLElement>("[data-booking-first]");
      el?.focus();
    }, 260);
    return () => clearTimeout(t);
  }, [step]);

  const goTo = useCallback((next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  }, [step]);

  // Step 0 → 1: always advance (projectDetails is optional)
  const advanceStep0 = () => goTo(1);

  // Step 1 → 2: always advance (media is optional)
  const advanceStep1 = () => goTo(2);

  // Step 2 → 3: validate contact fields first
  const advanceStep2 = async () => {
    const ok = await trigger(["name", "email", "phone"]);
    if (ok) goTo(3);
  };

  const onSubmit = async (data: BookingFormData) => {
    if (submitting) return;

    // Honeypot check (client-side double gate)
    if (data.website) return;

    setSubmitting(true);

    const submissionId = crypto.randomUUID();
    const serviceSlug = prefill?.serviceSlug ?? data.serviceSlug ?? "";

    // 1. Upload media first
    let mediaUrls: string[] = [];
    if (mediaFiles.length > 0) {
      try {
        mediaUrls = await uploadMedia(mediaFiles, submissionId);
      } catch (e) {
        console.warn("Media upload failed, continuing without:", e);
      }
    }

    // 2. Optimistic navigation — route immediately
    navigate(`/thank-you?service=${serviceSlug}`);
    onClose();

    // 3. Submit to edge function in background
    const payload = {
      ...data,
      email: data.email.toLowerCase(),
      submissionId,
      serviceSlug,
      siteSlug: MASTER_REMIX.TRADE_SLUG,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent.slice(0, 500),
      referrer: document.referrer.slice(0, 500),
      mediaUrls,
      source: prefill?.source ?? "",
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/submit-booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        clearDraft();
      } else {
        const err = await res.json().catch(() => ({}));
        console.error("Booking submission failed:", err);
        toast({
          title: "Submission issue",
          description:
            (err as any).error ??
            "Something went wrong — please email us directly or call.",
          duration: 8000,
        });
      }
    } catch (e) {
      console.error("Network error:", e);
      toast({
        title: "Could not send",
        description: "Please check your connection and try again, or call us directly.",
        duration: 8000,
      });
    }

    setSubmitting(false);
  };

  // Step labels
  const stepLabel = ["Your project", "Photos", "Your details", "Review & send"][step];

  return (
    <div className="flex flex-1 flex-col" style={{ minWidth: 0 }}>
      {/* ── Header: step dots + close ──────────────────────────────── */}
      <div
        className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid hsl(var(--copper) / 0.10)" }}
      >
        {/* Dot indicator */}
        <div className="flex items-center gap-2" role="progressbar" aria-valuenow={step + 1} aria-valuemax={4}>
          {BOOKING_STEPS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => { if (i < step) goTo(i); }}
              aria-label={`Step ${i + 1}`}
              className="transition-all duration-300"
              style={{
                width: i === step ? 20 : 6,
                height: 6,
                borderRadius: 3,
                background: i === step
                  ? "hsl(var(--copper))"
                  : i < step
                  ? "hsl(var(--copper) / 0.40)"
                  : "hsl(var(--copper) / 0.15)",
              }}
            />
          ))}
          <span
            className="ml-2 text-mist"
            style={{ fontFamily: "'Jost', system-ui", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}
          >
            {stepLabel}
          </span>
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close booking"
          className="flex h-8 w-8 items-center justify-center text-mist transition-colors hover:text-charcoal"
          style={{ fontSize: 20, lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      {/* ── Step content ──────────────────────────────────────────── */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col"
        noValidate
      >
        {/* Honeypot — visually hidden, screen-readers excluded */}
        <input
          {...register("website")}
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          style={{ position: "absolute", left: -9999, width: 1, height: 1 }}
        />

        <div className="relative flex-1 overflow-hidden">
          <AnimatePresence initial={false} custom={dir} mode="wait">
            <motion.div
              key={step}
              custom={dir}
              variants={STEP_VARIANTS}
              initial="enter"
              animate="center"
              exit="exit"
              transition={STEP_TRANSITION}
              className="absolute inset-0 overflow-y-auto px-8 py-8"
            >
              {step === 0 && (
                <Step0
                  register={register}
                  errors={errors}
                  prefill={prefill}
                />
              )}
              {step === 1 && (
                <Step1
                  mediaFiles={mediaFiles}
                  onChange={setMediaFiles}
                />
              )}
              {step === 2 && (
                <Step2
                  register={register}
                  errors={errors}
                />
              )}
              {step === 3 && (
                <Step3 values={getValues()} mediaCount={mediaFiles.length} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Sticky CTA ──────────────────────────────────────────── */}
        <div
          className="px-8 pb-8 pt-4"
          style={{ borderTop: "1px solid hsl(var(--copper) / 0.10)" }}
        >
          {step < 3 && (
            <button
              type="button"
              onClick={
                step === 0 ? advanceStep0 :
                step === 1 ? advanceStep1 :
                advanceStep2
              }
              className="w-full tracking-[0.14em] uppercase text-bone transition-opacity active:opacity-80"
              style={{
                height: 56,
                background: "hsl(var(--copper))",
                fontFamily: "'Jost', system-ui",
                fontSize: 13,
                fontWeight: 400,
                letterSpacing: "0.14em",
                border: "none",
                cursor: "pointer",
              }}
            >
              {step === 1 && mediaFiles.length === 0 ? "Skip photos →" : "Continue →"}
            </button>
          )}

          {step === 3 && (
            <>
              <button
                type="submit"
                disabled={submitting}
                className="w-full tracking-[0.14em] uppercase text-bone transition-opacity active:opacity-80"
                style={{
                  height: 56,
                  background: submitting ? "hsl(var(--copper) / 0.60)" : "hsl(var(--copper))",
                  fontFamily: "'Jost', system-ui",
                  fontSize: 13,
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  border: "none",
                  cursor: submitting ? "wait" : "pointer",
                }}
              >
                {submitting ? "Sending…" : "Send →"}
              </button>

              <p
                className="mt-3 text-center text-mist"
                style={{ fontFamily: "'Jost', system-ui", fontSize: 11, lineHeight: 1.5 }}
              >
                By sending, you agree we may contact you about your project.
              </p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

// ── Step 0: Project details ────────────────────────────────────────────────

const Step0 = ({
  register,
  errors,
  prefill,
}: {
  register: any;
  errors: any;
  prefill?: BookingPrefill;
}) => (
  <div className="space-y-6">
    <div>
      <p
        className="uppercase tracking-[0.22em] text-mist"
        style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
      >
        Step 1
      </p>
      <h2
        className="mt-2 text-charcoal"
        style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.015em" }}
      >
        Tell us what you need done.
      </h2>
      <p className="mt-2 text-graphite text-body-sm">
        A sentence is enough. We will ask if we need more.
      </p>
    </div>

    <div>
      <textarea
        {...register("projectDetails")}
        data-booking-first
        rows={5}
        maxLength={1000}
        placeholder={`${MASTER_REMIX.SERVICE !== "{SERVICE}" ? MASTER_REMIX.SERVICE.charAt(0).toUpperCase() + MASTER_REMIX.SERVICE.slice(1) : "Describe your"} project — scope, rough size, any quirks worth knowing.`}
        className="w-full resize-none border-0 border-b bg-transparent px-0 py-2 text-charcoal placeholder:text-mist focus:border-copper focus:outline-none focus:ring-0"
        style={{
          fontFamily: "'Jost', system-ui",
          fontSize: 15,
          lineHeight: 1.65,
          borderBottomColor: "hsl(var(--copper) / 0.25)",
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
        }}
      />
      {errors.projectDetails && (
        <FieldError>{errors.projectDetails.message}</FieldError>
      )}
    </div>
  </div>
);

// ── Step 1: Photos ─────────────────────────────────────────────────────────

const Step1 = ({
  mediaFiles,
  onChange,
}: {
  mediaFiles: MediaFile[];
  onChange: (files: MediaFile[]) => void;
}) => (
  <div className="space-y-6">
    <div>
      <p
        className="uppercase tracking-[0.22em] text-mist"
        style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
      >
        Step 2
      </p>
      <h2
        className="mt-2 text-charcoal"
        style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.015em" }}
      >
        Show us the space.
      </h2>
      <p className="mt-2 text-graphite text-body-sm">
        A photo tells us what words cannot. Optional — skip if you prefer.
      </p>
    </div>

    <MediaDropzone files={mediaFiles} onChange={onChange} />
  </div>
);

// ── Step 2: Contact ────────────────────────────────────────────────────────

const Step2 = ({
  register,
  errors,
}: {
  register: any;
  errors: any;
}) => (
  <div className="space-y-6">
    <div>
      <p
        className="uppercase tracking-[0.22em] text-mist"
        style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
      >
        Step 3
      </p>
      <h2
        className="mt-2 text-charcoal"
        style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.015em" }}
      >
        How we will reach you.
      </h2>
    </div>

    {/* Name */}
    <Field label="Your name" error={errors.name?.message}>
      <input
        {...register("name")}
        data-booking-first
        type="text"
        autoComplete="name"
        placeholder="Full name"
        className={fieldClass}
        style={fieldStyle}
      />
    </Field>

    {/* Email + Phone — 2-up on desktop */}
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="your@email.com"
          className={fieldClass}
          style={fieldStyle}
        />
      </Field>

      <Field label="Phone" error={errors.phone?.message}>
        <input
          {...register("phone")}
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="403-000-0000"
          className={fieldClass}
          style={fieldStyle}
        />
      </Field>
    </div>
  </div>
);

// ── Step 3: Review ─────────────────────────────────────────────────────────

const Step3 = ({
  values,
  mediaCount,
}: {
  values: BookingFormData;
  mediaCount: number;
}) => {
  const rows = [
    { label: "Project", value: values.projectDetails ? `"${values.projectDetails.slice(0, 120)}${values.projectDetails.length > 120 ? "…" : ""}"` : "No details added" },
    { label: "Photos", value: mediaCount > 0 ? `${mediaCount} file${mediaCount !== 1 ? "s" : ""} attached` : "None" },
    { label: "Name", value: values.name || "—" },
    { label: "Email", value: values.email || "—" },
    { label: "Phone", value: values.phone || "—" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <p
          className="uppercase tracking-[0.22em] text-mist"
          style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
        >
          Step 4
        </p>
        <h2
          className="mt-2 text-charcoal"
          style={{ fontFamily: "'Space Grotesk', system-ui", fontSize: "clamp(1.25rem, 3vw, 1.75rem)", fontWeight: 300, letterSpacing: "-0.015em" }}
        >
          Here is what we are sending.
        </h2>
      </div>

      <div className="space-y-0 border-t" style={{ borderColor: "hsl(var(--copper) / 0.15)" }}>
        {rows.map(({ label, value }) => (
          <div
            key={label}
            className="grid grid-cols-[100px_1fr] gap-4 border-b py-4"
            style={{ borderColor: "hsl(var(--copper) / 0.10)" }}
          >
            <span
              className="text-mist uppercase tracking-[0.14em]"
              style={{ fontFamily: "'Jost', system-ui", fontSize: 11 }}
            >
              {label}
            </span>
            <span
              className="text-charcoal break-words"
              style={{ fontFamily: "'Jost', system-ui", fontSize: 14 }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Shared field primitives ────────────────────────────────────────────────

const fieldClass =
  "w-full border-0 border-b bg-transparent px-0 py-2 text-charcoal placeholder:text-mist focus:outline-none focus:ring-0";

const fieldStyle: React.CSSProperties = {
  fontFamily: "'Jost', system-ui",
  fontSize: 15,
  lineHeight: 1.65,
  borderBottomColor: "hsl(var(--copper) / 0.25)",
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
};

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label
      className="block text-mist uppercase tracking-[0.14em]"
      style={{ fontFamily: "'Jost', system-ui", fontSize: 11, marginBottom: 4 }}
    >
      {label}
    </label>
    {children}
    {error && <FieldError>{error}</FieldError>}
  </div>
);

const FieldError = ({ children }: { children: React.ReactNode }) => (
  <p
    className="mt-1.5"
    style={{ fontFamily: "'Jost', system-ui", fontSize: 12, color: "hsl(var(--copper))" }}
    role="alert"
  >
    {children}
  </p>
);
