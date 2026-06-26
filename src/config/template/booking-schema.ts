/**
 * BOOKING SCHEMA — Universal Base
 *
 * Single source of truth for the booking form contract.
 * Remixes IMPORT and EXTEND this schema — never replace it.
 *
 * Usage:
 *   import { bookingSchema, type BookingFormData } from "@/config/template/booking-schema"
 *   const tradeSchema = bookingSchema.extend({ roomCount: z.number().min(1) })
 */

import { z } from "zod";

const PHONE_RE = /^[\d\s\-\(\)\+\.x]{7,24}$/;

export const bookingSchema = z.object({
  // ── Required contact fields ──────────────────────────────────────────────
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(60, "Name is too long")
    .regex(/^[\p{L}\p{M}\s'\-\.]+$/u, "Name contains invalid characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255, "Email is too long"),

  phone: z
    .string()
    .trim()
    .min(7, "Phone number is required")
    .max(24, "Phone number is too long")
    .regex(PHONE_RE, "Enter a valid phone number"),

  // ── Optional project context ─────────────────────────────────────────────
  projectDetails: z
    .string()
    .trim()
    .max(1000, "Keep details under 1,000 characters")
    .optional(),

  // ── Auto-injected metadata (populated by the form, never user-facing) ───
  submissionId: z.string().optional(),
  serviceSlug: z.string().max(80).optional(),
  siteSlug: z.string().max(80).optional(),
  submittedAt: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),

  /** Signed Supabase Storage URLs — populated after client-side upload. */
  mediaUrls: z.array(z.string()).default([]),

  // ── Honeypot — must remain empty ─────────────────────────────────────────
  website: z.string().max(0, "").optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

/** Step indices — used by BookingForm to key state + dots. */
export const BOOKING_STEPS = [
  "project",   // 0 — projectDetails textarea
  "photos",    // 1 — media upload
  "contact",   // 2 — name / email / phone
  "review",    // 3 — summary + send
] as const;

export type BookingStep = (typeof BOOKING_STEPS)[number];

/** Prefill payload passed from any CTA into the modal. */
export interface BookingPrefill {
  /** Pre-filled project details text. */
  description?: string;
  /** Internal CTA label — recorded in metadata for lead attribution. */
  source?: string;
  /** Slug of the service/sub-service that opened this modal. */
  serviceSlug?: string;
}

/** The canonical handler type — all pages and components use this. */
export type BookingClickHandler = (prefill?: BookingPrefill) => void;

/** Media file limits enforced client-side. */
export const MEDIA_LIMITS = {
  maxFiles: 10,
  maxBytesPerFile: 25 * 1024 * 1024,  // 25 MB
  maxBytesTotal: 100 * 1024 * 1024,   // 100 MB
  compressThreshold: 2 * 1024 * 1024, // compress images > 2 MB
  acceptedMime: "image/jpeg,image/png,image/webp,image/heic,video/mp4,video/quicktime",
} as const;
