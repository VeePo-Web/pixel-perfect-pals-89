import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Check,
  Phone,
  Upload,
  Image as ImageIcon,
  Film,
  Trash2,
  MapPin,
  Calendar,
  Camera,
  RotateCcw,
  Mail,
} from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  TIME_WINDOWS,
  EMPTY_DRAFT,
  MAX_MEDIA_FILES,
  MAX_MEDIA_BYTES,
  ACCEPTED_MEDIA_MIME,
  type DrywallBookingDraft,
  type TimeWindowId,
  type BookingPrefill,
} from "@/config/drywall-booking";
import { uploadBookingMedia } from "@/lib/booking-uploads";
import { TRADE } from "@/config";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  /** Optional context from the CTA that opened the modal — pre-fills the form. */
  prefill?: BookingPrefill;
}

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ── Validation ────────────────────────────────────────────────────────────
const finalSchema = z.object({
  description: z.string().trim().min(10, "Tell us a little about what you need (10+ characters)").max(2000),
  address: z.string().trim().min(4, "Where is the work? (street + city)").max(200),
  date: z.string().min(1, "Pick a preferred date"),
  time: z.string().min(1, "Pick a time of day"),
  name: z.string().trim().min(2, "Name required").max(80),
  email: z.string().trim().email("Valid email required").max(160),
  phone: z.string().trim().min(7, "Phone required").max(24),
});

/** Build the seeded description from a prefill payload. */
const seedDescription = (prefill?: BookingPrefill): string => {
  if (!prefill) return "";
  const tag = prefill.source ? `[via: ${prefill.source}]\n\n` : "";
  return `${tag}${prefill.description ?? ""}`;
};

const BookingModal = ({ open, onClose, prefill }: BookingModalProps) => {
  const [draft, setDraft] = useState<DrywallBookingDraft>(EMPTY_DRAFT);
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<{
    draft: DrywallBookingDraft;
    fileCount: number;
    at: Date;
  } | null>(null);
  const doneButtonRef = useRef<HTMLButtonElement>(null);
  const { toast } = useToast();

  // Lock body scroll
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Seed prefill when the modal opens (only if user hasn't typed anything yet)
  useEffect(() => {
    if (!open) return;
    setDraft((d) => {
      if (d.description.trim().length > 0) return d; // don't overwrite typing
      return { ...d, description: seedDescription(prefill) };
    });
  }, [open, prefill]);

  // Move focus to the "Done" button when the confirmation appears
  useEffect(() => {
    if (!submitted) return;
    const t = setTimeout(() => doneButtonRef.current?.focus(), 120);
    return () => clearTimeout(t);
  }, [submitted]);

  // Reset on close
  useEffect(() => {
    if (open) return;
    const t = setTimeout(() => {
      setDraft(EMPTY_DRAFT);
      setFiles([]);
      setSubmitted(false);
      setSubmittedSnapshot(null);
    }, 400);
    return () => clearTimeout(t);
  }, [open]);

  const resetForAnother = () => {
    setDraft(EMPTY_DRAFT);
    setFiles([]);
    setSubmitted(false);
    setSubmittedSnapshot(null);
  };

  const update = <K extends keyof DrywallBookingDraft>(k: K, v: DrywallBookingDraft[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const addFiles = (incoming: FileList | File[]) => {
    const arr = Array.from(incoming);
    const accepted: File[] = [];
    const rejected: string[] = [];

    for (const f of arr) {
      if (files.length + accepted.length >= MAX_MEDIA_FILES) {
        rejected.push(`${f.name} (max ${MAX_MEDIA_FILES} files)`);
        continue;
      }
      if (!/^(image|video)\//.test(f.type)) {
        rejected.push(`${f.name} (only photos or videos)`);
        continue;
      }
      if (f.size > MAX_MEDIA_BYTES) {
        rejected.push(`${f.name} (over 25 MB)`);
        continue;
      }
      accepted.push(f);
    }

    if (accepted.length) setFiles((prev) => [...prev, ...accepted]);
    if (rejected.length) {
      toast({
        title: "Some files were skipped",
        description: rejected.join(", "),
        variant: "destructive",
      });
    }
  };

  const removeFile = (idx: number) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  const handleSubmit = async () => {
    const parsed = finalSchema.safeParse(draft);
    if (!parsed.success) {
      toast({
        title: "Almost there",
        description: parsed.error.errors[0]?.message ?? "Please complete every field.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    try {
      // Upload media first (if any) so we have URLs for the booking row
      let mediaUrls: string[] = [];
      if (files.length > 0) {
        const result = await uploadBookingMedia(files);
        mediaUrls = result.urls;
        if (result.errors.length) {
          toast({
            title: "Some files didn't upload",
            description: `We saved your request. You can email us these later: ${result.errors.join(", ")}`,
          });
        }
      }

      const { error } = await supabase.from("bookings").insert({
        name: draft.name,
        email: draft.email,
        phone: draft.phone,
        message: draft.description,
        address: { street: draft.address, city: null, postalCode: null },
        scheduled_date: draft.date,
        scheduled_time: draft.time,
        media: mediaUrls.length ? mediaUrls : null,
      });
      if (error) throw error;
      setSubmittedSnapshot({ draft: { ...draft }, fileCount: files.length, at: new Date() });
      setSubmitted(true);
    } catch (err) {
      console.error("Booking submit failed", err);
      toast({
        title: "Could not submit",
        description: "Please try again, or call/text us directly at (403) 555-1234.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Full-bleed two-region composition */}
          <motion.div
            key="stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            className="fixed inset-0 z-50 flex pointer-events-none"
            role="dialog"
            aria-modal="true"
            aria-label="Request a quote"
          >
            {/* Left region — Brand identity stack */}
            <div className="hidden lg:flex flex-1 paper-grain bg-bone pointer-events-auto items-center justify-center px-12 overflow-hidden">
              <BrandIdentityStack />
            </div>

            {/* Right region — Form panel */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.54, ease }}
              className="relative flex w-full lg:w-[540px] flex-col bg-paper shadow-editorial pointer-events-auto"
            >
              {/* Top edge — drawn-on hairline */}
              <div className="absolute inset-x-0 top-0 h-px overflow-hidden">
                <div
                  className="h-px w-full animate-line-grow"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(var(--forest) / 0.4), transparent)",
                  }}
                />
              </div>

              {/* Mobile / tablet brand strip */}
              <div className="lg:hidden flex items-center gap-3 border-b border-seam bg-bone px-6 py-3">
                <DrywallMark className="h-6 w-6 text-forest" />
                <p className="font-display text-lg leading-none text-charcoal">
                  Cochrane Drywall <em className="not-italic text-forest italic font-light">Masters</em>
                </p>
              </div>

              <header className="flex items-start justify-between gap-4 px-6 pt-7 pb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="relative inline-flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-forest animate-pulse-dot" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-forest" />
                    </span>
                    <p className="font-eyebrow !text-[0.65rem]">
                      {submitted ? "Confirmed · we've got it" : "Replies within one business day"}
                    </p>
                  </div>
                  <h2 className="mt-3 font-display text-display-md text-charcoal">
                    {submitted && submittedSnapshot ? (
                      <>Thanks, <em className="font-light italic text-forest">{firstName(submittedSnapshot.draft.name)}</em>.</>
                    ) : (
                      <>Tell us about it.</>
                    )}
                  </h2>
                  {!submitted && (
                    <p className="mt-2 text-sm text-graphite leading-relaxed">
                      A few quick details and any photos you have. We'll reply with an honest ballpark.
                    </p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="group inline-flex flex-col items-center gap-1 shrink-0"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-seam bg-paper text-graphite transition-all group-hover:border-forest group-hover:text-forest">
                    <X className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                  <span className="hidden lg:inline font-eyebrow !text-[0.55rem] !tracking-[0.2em] text-mist">
                    ESC
                  </span>
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-6 pb-7 pt-2" data-lenis-prevent>
                <AnimatePresence mode="wait">
                  {submitted && submittedSnapshot ? (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease }}
                    >
                      <SubmittedState
                        name={submittedSnapshot.draft.name}
                        email={submittedSnapshot.draft.email}
                        description={submittedSnapshot.draft.description}
                        address={submittedSnapshot.draft.address}
                        date={submittedSnapshot.draft.date}
                        time={submittedSnapshot.draft.time}
                        fileCount={submittedSnapshot.fileCount}
                        submittedAt={submittedSnapshot.at}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.36, ease }}
                      className="space-y-7"
                    >
                      {/* 1. Describe the work */}
                      <div>
                        <label className="font-eyebrow mb-2 block">What do you need done?</label>
                        <Textarea
                          value={draft.description}
                          onChange={(e) => update("description", e.target.value)}
                          placeholder="e.g., Two doorknob holes in the hallway and a long water-stain crack above the laundry door — would love it patched and painted to match."
                          rows={5}
                        />
                      </div>

                      {/* 2. Address */}
                      <div>
                        <label className="font-eyebrow mb-2 block">Where is it?</label>
                        <Input
                          value={draft.address}
                          onChange={(e) => update("address", e.target.value)}
                          placeholder="123 Heritage Hills Dr, Cochrane"
                          autoComplete="street-address"
                        />
                      </div>

                      {/* 3. Schedule */}
                      <div>
                        <label className="font-eyebrow mb-2 block">When works best?</label>
                        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
                          <Input
                            type="date"
                            min={new Date().toISOString().slice(0, 10)}
                            value={draft.date}
                            onChange={(e) => update("date", e.target.value)}
                            className="sm:w-[180px]"
                          />
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                            {TIME_WINDOWS.map((w) => {
                              const active = draft.time === w.id;
                              return (
                                <button
                                  type="button"
                                  key={w.id}
                                  onClick={() => update("time", w.id as TimeWindowId)}
                                  className={`rounded-sm border bg-paper px-3 py-2 text-sm font-medium transition-all ${
                                    active
                                      ? "border-forest border-b-2 text-charcoal"
                                      : "border-seam text-graphite hover:border-forest/40 hover:border-b-2"
                                  }`}
                                >
                                  {w.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* 4. Media uploader */}
                      <div>
                        <label className="font-eyebrow mb-2 block">
                          Photos or a short video <span className="text-mist">— optional, but it speeds the quote up</span>
                        </label>
                        <MediaUploader files={files} onAdd={addFiles} onRemove={removeFile} />
                      </div>

                      {/* 5. Contact */}
                      <div className="space-y-4 border-t border-seam pt-7">
                        <p className="font-eyebrow !text-[0.6rem]">Your details</p>
                        <div>
                          <label className="font-eyebrow mb-2 block !text-[0.6rem]">Name</label>
                          <Input
                            value={draft.name}
                            onChange={(e) => update("name", e.target.value)}
                            autoComplete="name"
                          />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="font-eyebrow mb-2 block !text-[0.6rem]">Email</label>
                            <Input
                              type="email"
                              value={draft.email}
                              onChange={(e) => update("email", e.target.value)}
                              autoComplete="email"
                            />
                          </div>
                          <div>
                            <label className="font-eyebrow mb-2 block !text-[0.6rem]">Phone</label>
                            <Input
                              type="tel"
                              value={draft.phone}
                              onChange={(e) => update("phone", e.target.value)}
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {!submitted ? (
                <footer className="flex items-center justify-between gap-3 border-t border-seam bg-bone/40 px-6 py-4">
                  <p className="text-caption text-mist">No project spiral. No vague language.</p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="cta-forest group inline-flex items-center gap-2.5 rounded-sm bg-forest px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:bg-forest-deep disabled:opacity-50"
                  >
                    {submitting ? "Sending…" : "Send Request"}
                    <Check className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                </footer>
              ) : (
                <footer className="flex flex-col gap-3 border-t border-seam bg-bone/40 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                  {TRADE.contact.phone ? (
                    <a
                      href={`tel:${TRADE.contact.phone.replace(/[^\d+]/g, "")}`}
                      className="inline-flex items-center gap-2 text-caption text-graphite hover:text-forest transition-colors"
                    >
                      <Phone className="h-3.5 w-3.5 text-forest" strokeWidth={1.5} />
                      <span>Or call us — <span className="story-link">{TRADE.contact.phone}</span></span>
                    </a>
                  ) : (
                    <p className="text-caption text-mist">Replies within one business day.</p>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={resetForAnother}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-seam bg-paper px-4 py-2.5 text-sm font-medium text-graphite transition-all hover:border-forest/40 hover:text-charcoal"
                    >
                      <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                      Send another
                    </button>
                    <button
                      ref={doneButtonRef}
                      type="button"
                      onClick={onClose}
                      className="cta-forest inline-flex items-center gap-2 rounded-sm bg-forest px-6 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-forest-deep"
                    >
                      Done
                      <Check className="h-4 w-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </footer>
              )}
            </motion.aside>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── Media uploader ───────────────────────────────────────────────────────

const MediaUploader = ({
  files,
  onAdd,
  onRemove,
}: {
  files: File[];
  onAdd: (files: FileList | File[]) => void;
  onRemove: (idx: number) => void;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const full = files.length >= MAX_MEDIA_FILES;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!full) setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          if (!full && e.dataTransfer.files.length) onAdd(e.dataTransfer.files);
        }}
        disabled={full}
        className={`flex w-full flex-col items-center justify-center gap-2 rounded-sm border border-dashed bg-paper px-6 py-7 text-center transition-all ${
          dragging
            ? "border-forest bg-forest/5"
            : full
              ? "border-seam opacity-50 cursor-not-allowed"
              : "border-seam hover:border-forest/50"
        }`}
      >
        <Upload className="h-5 w-5 text-forest" strokeWidth={1.5} />
        <p className="text-sm font-medium text-charcoal">
          {full ? "Limit reached" : "Tap or drag photos / video here"}
        </p>
        <p className="text-caption text-mist">
          Up to {MAX_MEDIA_FILES} files · 25 MB each · images or video
        </p>
      </button>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_MEDIA_MIME}
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) onAdd(e.target.files);
          if (inputRef.current) inputRef.current.value = "";
        }}
      />

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file, i) => (
            <FilePreview key={`${file.name}-${i}`} file={file} onRemove={() => onRemove(i)} />
          ))}
        </ul>
      )}
    </div>
  );
};

const FilePreview = ({ file, onRemove }: { file: File; onRemove: () => void }) => {
  const [thumb, setThumb] = useState<string | null>(null);
  const isImage = file.type.startsWith("image/");

  useEffect(() => {
    if (!isImage) return;
    const url = URL.createObjectURL(file);
    setThumb(url);
    return () => URL.revokeObjectURL(url);
  }, [file, isImage]);

  const sizeKb = file.size / 1024;
  const sizeLabel = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.round(sizeKb)} KB`;

  return (
    <li className="flex items-center gap-3 rounded-sm border border-seam bg-paper px-3 py-2">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-bone text-graphite">
        {thumb ? (
          <img src={thumb} alt="" className="h-full w-full object-cover" />
        ) : isImage ? (
          <ImageIcon className="h-4 w-4" strokeWidth={1.5} />
        ) : (
          <Film className="h-4 w-4" strokeWidth={1.5} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-charcoal">{file.name}</p>
        <p className="text-caption text-mist">{sizeLabel}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${file.name}`}
        className="inline-flex h-8 w-8 items-center justify-center rounded-sm text-graphite transition-colors hover:bg-bone hover:text-forest"
      >
        <Trash2 className="h-4 w-4" strokeWidth={1.5} />
      </button>
    </li>
  );
};

// ── Brand identity stack (left region) ───────────────────────────────────

const DrywallMark = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    aria-hidden="true"
    className={className}
  >
    <rect x="2" y="3" width="20" height="5" />
    <rect x="2" y="9.5" width="20" height="5" />
    <rect x="2" y="16" width="20" height="5" />
  </svg>
);

const BrandIdentityStack = () => {
  const items = [
    { delay: 0 }, { delay: 120 }, { delay: 240 }, { delay: 360 },
    { delay: 480 }, { delay: 600 }, { delay: 720 }, { delay: 840 },
  ];

  return (
    <div className="flex max-w-md flex-col items-center text-center">
      <p
        className="font-eyebrow animate-brand-rise"
        style={{ animationDelay: `${items[0].delay}ms` }}
      >
        Est. Cochrane · Alberta
      </p>

      <div
        className="mt-10 animate-brand-rise"
        style={{ animationDelay: `${items[1].delay}ms` }}
      >
        <DrywallMark className="h-28 w-28 text-forest" />
      </div>

      <div
        className="mt-10 h-px w-28 animate-line-grow-center"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--seam)), transparent)",
          animationDelay: `${items[2].delay}ms`,
          opacity: 0,
          animationFillMode: "forwards",
        }}
      />

      <h3
        className="mt-10 font-display text-display-md font-light leading-tight text-charcoal animate-brand-rise"
        style={{ animationDelay: `${items[3].delay}ms` }}
      >
        Cochrane Drywall<br />
        <em className="font-light italic text-forest">Masters</em>
      </h3>

      <p
        className="mt-5 font-display italic text-lg text-graphite animate-brand-rise"
        style={{ animationDelay: `${items[4].delay}ms` }}
      >
        Damage out. Comfort in.
      </p>

      <div
        className="mt-10 h-px w-16 animate-line-grow-center"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(var(--seam)), transparent)",
          animationDelay: `${items[5].delay}ms`,
          opacity: 0,
          animationFillMode: "forwards",
        }}
      />

      <a
        href="tel:+14035551234"
        className="group mt-8 inline-flex items-center gap-2.5 text-charcoal animate-brand-rise"
        style={{ animationDelay: `${items[6].delay}ms`, fontVariantNumeric: "tabular-nums" }}
      >
        <Phone className="h-3.5 w-3.5 text-forest" strokeWidth={1.5} />
        <span className="story-link text-base">(403) 555-1234</span>
        <span className="text-forest transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
          ↗
        </span>
      </a>

      <p
        className="mt-6 font-eyebrow !text-[0.65rem] !text-mist animate-brand-rise"
        style={{ animationDelay: `${items[7].delay}ms` }}
      >
        Cochrane <span className="text-forest/50 mx-1.5">·</span> Calgary
        <span className="text-forest/50 mx-1.5">·</span> Airdrie
        <span className="text-forest/50 mx-1.5">·</span> Bragg Creek
      </p>
    </div>
  );
};

// ── Submitted state ──────────────────────────────────────────────────────

const firstName = (full: string): string => {
  const trimmed = full.trim();
  if (!trimmed) return "there";
  const first = trimmed.split(/\s+/)[0];
  return first.charAt(0).toUpperCase() + first.slice(1);
};

const cleanDescription = (desc: string): string => {
  // Strip leading "[via: …]\n\n" tag from prefilled descriptions
  return desc.replace(/^\s*\[via:[^\]]*\]\s*/i, "").trim();
};

const truncate = (s: string, max = 160): string =>
  s.length > max ? `${s.slice(0, max).trimEnd()}…` : s;

const formatScheduledDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d);
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(date);
};

const getTimeWindowLabel = (id: TimeWindowId | ""): string => {
  if (!id) return "";
  const w = TIME_WINDOWS.find((x) => x.id === id);
  return w ? `${w.label} (${w.desc})` : "";
};

const formatSubmittedAt = (d: Date): string =>
  new Intl.DateTimeFormat("en-CA", {
    hour: "numeric",
    minute: "2-digit",
  }).format(d);

interface SubmittedStateProps {
  name: string;
  email: string;
  description: string;
  address: string;
  date: string;
  time: TimeWindowId | "";
  fileCount: number;
  submittedAt: Date;
}

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.08 * i, ease },
});

const SubmittedState = ({
  email,
  description,
  address,
  date,
  time,
  fileCount,
  submittedAt,
}: SubmittedStateProps) => {
  const cleanDesc = cleanDescription(description);
  const scheduledDate = formatScheduledDate(date);
  const timeLabel = getTimeWindowLabel(time);
  const whenLine = [scheduledDate, timeLabel].filter(Boolean).join(" · ");

  return (
    <div className="flex flex-col items-start gap-7 py-4" role="status" aria-live="polite">
      {/* Top hairline */}
      <div className="w-full h-px overflow-hidden">
        <div
          className="h-px w-full animate-line-grow"
          style={{
            background:
              "linear-gradient(90deg, hsl(var(--forest)), hsl(var(--forest) / 0.2), transparent)",
          }}
        />
      </div>

      {/* Zone 1 — Confirmation badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease }}
        className="flex items-center gap-3"
      >
        <span className="relative inline-flex">
          <span className="absolute inset-0 rounded-full bg-forest/20 animate-ping" />
          <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-full border border-forest/40 bg-paper text-forest">
            <Check className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </span>
        <p className="font-eyebrow !text-[0.6rem] !text-graphite">
          Sent · {formatSubmittedAt(submittedAt)}
        </p>
      </motion.div>

      {/* Zone 2 — Personal acknowledgement */}
      <motion.div {...stagger(1)} className="space-y-2">
        <p className="text-body-lg text-charcoal leading-relaxed">
          Your request is in. We've got everything we need to put together a real, honest ballpark.
        </p>
        {email && (
          <p className="text-sm text-graphite leading-relaxed inline-flex items-start gap-2">
            <Mail className="h-3.5 w-3.5 text-forest mt-1 shrink-0" strokeWidth={1.5} />
            <span>
              A confirmation is on its way to <span className="text-charcoal font-medium">{email}</span>. If it doesn't show up in a few minutes, check spam — or text us.
            </span>
          </p>
        )}
      </motion.div>

      {/* Zone 3 — Recap card */}
      <motion.div
        {...stagger(2)}
        className="w-full border border-seam bg-bone/50 px-5 py-5 space-y-4"
      >
        <p className="font-eyebrow !text-[0.6rem]">Here's what we got</p>

        {cleanDesc && (
          <RecapRow label="What" icon={<Check className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            {truncate(cleanDesc)}
          </RecapRow>
        )}

        {address && (
          <RecapRow label="Where" icon={<MapPin className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            {address}
          </RecapRow>
        )}

        {whenLine && (
          <RecapRow label="When" icon={<Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            {whenLine}
          </RecapRow>
        )}

        {fileCount > 0 && (
          <RecapRow label="Photos" icon={<Camera className="h-3.5 w-3.5" strokeWidth={1.5} />}>
            {fileCount} {fileCount === 1 ? "file" : "files"} attached
          </RecapRow>
        )}
      </motion.div>

      {/* Divider */}
      <motion.div {...stagger(3)} className="w-full h-px bg-seam" />

      {/* Zone 4 — What happens next */}
      <motion.div {...stagger(4)} className="w-full">
        <p className="font-eyebrow !text-[0.6rem] mb-4">What happens next</p>
        <ol className="space-y-4">
          {[
            { when: "Within 1 hour", text: "Auto-confirmation lands in your inbox so you have a copy of your request." },
            { when: "Within 1 business day", text: "We review your photos and reply with a realistic ballpark — no vague language." },
            { when: "When you're ready", text: "We confirm a tidy on-site visit window and put the scope in writing." },
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="font-eyebrow !text-[0.65rem] !text-forest pt-0.5 shrink-0 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="space-y-1">
                <p className="text-sm font-medium text-charcoal leading-snug">{step.when}</p>
                <p className="text-sm text-graphite leading-relaxed">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </div>
  );
};

const RecapRow = ({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="grid grid-cols-[88px_1fr] gap-3 items-start">
    <div className="flex items-center gap-1.5 text-forest pt-0.5">
      {icon}
      <span className="font-eyebrow !text-[0.55rem] !text-graphite">{label}</span>
    </div>
    <p className="text-sm text-charcoal leading-relaxed">{children}</p>
  </div>
);

export default BookingModal;
