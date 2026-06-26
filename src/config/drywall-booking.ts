/**
 * COCHRANE DRYWALL — Legacy booking config for the drywall-specific modal.
 *
 * BookingPrefill and BookingClickHandler are the universal types — re-exported
 * from booking-schema.ts. Any component that only needs those types should
 * import directly from "@/config/template/booking-schema" instead.
 *
 * Drywall-specific fields (TIME_WINDOWS, DrywallBookingDraft, etc.) stay here.
 */

// Re-export universal types so existing drywall components keep working
export type { BookingPrefill, BookingClickHandler } from "@/config/template/booking-schema";

export const TIME_WINDOWS = [
  { id: "morning", label: "Morning", desc: "8 AM – 12 PM" },
  { id: "afternoon", label: "Afternoon", desc: "12 – 5 PM" },
  { id: "evening", label: "Evening", desc: "5 – 8 PM" },
  { id: "flexible", label: "Flexible", desc: "Any time that works" },
] as const;

export type TimeWindowId = (typeof TIME_WINDOWS)[number]["id"];

export const MAX_MEDIA_FILES = 5;
export const MAX_MEDIA_BYTES = 25 * 1024 * 1024; // 25 MB
export const ACCEPTED_MEDIA_MIME = "image/*,video/*";

export interface DrywallBookingDraft {
  description: string;
  address: string;
  date: string;
  time: TimeWindowId | "";
  name: string;
  email: string;
  phone: string;
}

export const EMPTY_DRAFT: DrywallBookingDraft = {
  description: "",
  address: "",
  date: "",
  time: "",
  name: "",
  email: "",
  phone: "",
};

// BookingPrefill and BookingClickHandler are now defined in booking-schema.ts (above re-export).
