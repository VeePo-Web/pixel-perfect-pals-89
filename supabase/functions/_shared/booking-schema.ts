/**
 * BOOKING SCHEMA — Shared (Deno / Supabase Edge Function)
 *
 * Mirror of src/config/template/booking-schema.ts for the edge function runtime.
 * Keep in sync with the frontend schema. Use Zod from esm.sh.
 */

// @ts-ignore — Deno import
import { z } from "https://esm.sh/zod@3.25.76";

const PHONE_RE = /^[\d\s\-\(\)\+\.x]{7,24}$/;

export const bookingSubmissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name is required")
    .max(60),

  email: z
    .string()
    .trim()
    .email("Invalid email")
    .max(255)
    .transform((v: string) => v.toLowerCase()),

  phone: z
    .string()
    .trim()
    .min(7, "Phone required")
    .max(24)
    .regex(PHONE_RE, "Invalid phone"),

  projectDetails: z.string().trim().max(1000).optional(),

  submissionId: z.string().optional(),
  serviceSlug: z.string().max(80).optional(),
  siteSlug: z.string().max(80).optional(),
  submittedAt: z.string().optional(),
  userAgent: z.string().max(500).optional(),
  referrer: z.string().max(500).optional(),

  mediaUrls: z.array(z.string()).default([]),

  // Honeypot — reject if filled
  website: z.string().max(0, "").optional(),
});

export type BookingSubmission = z.infer<typeof bookingSubmissionSchema>;
