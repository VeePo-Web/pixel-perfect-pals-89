/**
 * COCHRANE MASTER BUILDERS — Booking Validation
 *
 * Pure validation module. No React, no UI. Validates a `BookingDraft`
 * against the contract defined in `src/config/booking-requirements.ts`.
 *
 * Returns a structured result so the UI can highlight specific fields,
 * show summary messages, and decide whether to enable the submit button.
 */

import { z } from "zod";
import {
  ADD_ON_OPTIONS,
  PACKAGE_OPTIONS,
  REQUIRED_FIELD_KEYS,
  SERVICE_AREA_CITIES,
  SITE_READINESS_KEYS,
  VEHICLE_TYPE_OPTIONS,
  type AddOnOption,
  type PackageOption,
  type RequiredFieldKey,
  type ServiceCity,
  type VehicleTypeOption,
} from "@/config/booking-requirements";

/* ─── Types ────────────────────────────────────────────────────────────── */

export interface BookingDraft {
  // Job scope
  package?: PackageOption;
  addOns?: AddOnOption[];

  // Project
  vehicleType?: VehicleTypeOption;
  customVehicle?: string;

  // Schedule
  date?: string; // ISO YYYY-MM-DD
  time?: string; // HH:MM (24h)
  flexibility15min?: boolean;

  // Location
  street?: string;
  city?: ServiceCity | string;
  postalCode?: string;

  // Site readiness
  waterAccess?: boolean;
  powerOutlet?: boolean;
  driveway?: boolean;
  keysHandoff?: boolean;

  // Contact
  name?: string;
  email?: string;
  phone?: string;

  // Optional
  message?: string;
  media?: File[];
}

export interface BookingValidationResult {
  isValid: boolean;
  missing: RequiredFieldKey[];
  errors: Partial<Record<keyof BookingDraft, string>>;
  warnings: string[];
}

/* ─── Field-level zod schemas ──────────────────────────────────────────── */

const nameSchema = z
  .string()
  .trim()
  .min(1, "Name is required")
  .max(100, "Name must be under 100 characters");

const emailSchema = z
  .string()
  .trim()
  .email("Enter a valid email address")
  .max(255, "Email must be under 255 characters");

const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone is required")
  .refine((v) => v.replace(/\D/g, "").length >= 10, {
    message: "Phone must be at least 10 digits",
  });

const dateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD")
  .refine(
    (v) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const d = new Date(`${v}T00:00:00`);
      return !isNaN(d.getTime()) && d.getTime() >= today.getTime();
    },
    { message: "Date must be today or later" },
  );

const timeSchema = z
  .string()
  .regex(/^([01]\d|2[0-3]):[0-5]\d$/, "Time must be in HH:MM (24h) format");

const citySchema = z.enum(SERVICE_AREA_CITIES);
const packageSchema = z.enum(PACKAGE_OPTIONS);
const vehicleTypeSchema = z.enum(VEHICLE_TYPE_OPTIONS);
const addOnsSchema = z.array(z.enum(ADD_ON_OPTIONS));

const streetSchema = z.string().trim().min(2, "Street address is required").max(200);
const postalCodeSchema = z
  .string()
  .trim()
  .regex(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/, "Enter a valid Canadian postal code")
  .optional();

const customVehicleSchema = z.string().trim().min(2, "Tell us what you drive").max(120);

const HEAVY_MACHINERY_RX = /heavy machinery|tractor|excavator|forklift|semi[\s-]?truck/i;

/* ─── Helpers ──────────────────────────────────────────────────────────── */

function setError(
  errors: Partial<Record<keyof BookingDraft, string>>,
  key: keyof BookingDraft,
  message: string,
) {
  if (!errors[key]) errors[key] = message;
}

function isPresent(v: unknown): boolean {
  if (v === undefined || v === null) return false;
  if (typeof v === "string") return v.trim().length > 0;
  if (typeof v === "boolean") return v === true;
  if (Array.isArray(v)) return v.length > 0;
  return true;
}

/* ─── Main validator ───────────────────────────────────────────────────── */

export function validateBookingDraft(
  draft: Partial<BookingDraft>,
): BookingValidationResult {
  const errors: BookingValidationResult["errors"] = {};
  const warnings: string[] = [];
  const missing: RequiredFieldKey[] = [];

  // Track missing required keys
  for (const key of REQUIRED_FIELD_KEYS) {
    if (!isPresent((draft as Record<string, unknown>)[key])) {
      missing.push(key);
    }
  }

  // ── Job scope
  if (draft.package !== undefined) {
    const r = packageSchema.safeParse(draft.package);
    if (!r.success) setError(errors, "package", r.error.issues[0].message);
  }

  // ── Project
  if (draft.vehicleType !== undefined) {
    const r = vehicleTypeSchema.safeParse(draft.vehicleType);
    if (!r.success) setError(errors, "vehicleType", r.error.issues[0].message);
  }
  if (draft.vehicleType === "other") {
    if (!isPresent(draft.customVehicle)) {
      setError(errors, "customVehicle", "Tell us what you drive");
    } else {
      const r = customVehicleSchema.safeParse(draft.customVehicle);
      if (!r.success) setError(errors, "customVehicle", r.error.issues[0].message);
      else if (HEAVY_MACHINERY_RX.test(draft.customVehicle ?? "")) {
        warnings.push(
          "Heads up — we don't service heavy machinery. We'll reach out to confirm.",
        );
      }
    }
  }

  // ── Add-ons (optional but validated when present)
  if (draft.addOns !== undefined) {
    const r = addOnsSchema.safeParse(draft.addOns);
    if (!r.success) setError(errors, "addOns", r.error.issues[0].message);
  }

  // ── Schedule
  if (draft.date !== undefined && isPresent(draft.date)) {
    const r = dateSchema.safeParse(draft.date);
    if (!r.success) setError(errors, "date", r.error.issues[0].message);
  }
  if (draft.time !== undefined && isPresent(draft.time)) {
    const r = timeSchema.safeParse(draft.time);
    if (!r.success) setError(errors, "time", r.error.issues[0].message);
  }
  if (draft.flexibility15min !== undefined && draft.flexibility15min !== true) {
    setError(
      errors,
      "flexibility15min",
      "Please acknowledge the ±15 min arrival window",
    );
  }

  // ── Location
  if (draft.street !== undefined && isPresent(draft.street)) {
    const r = streetSchema.safeParse(draft.street);
    if (!r.success) setError(errors, "street", r.error.issues[0].message);
  }
  if (draft.city !== undefined && isPresent(draft.city)) {
    const r = citySchema.safeParse(draft.city as string);
    if (!r.success) {
      setError(errors, "city", "We currently service Calgary, Airdrie, and Cochrane");
      warnings.push(
        `Outside service area: ${draft.city}. We may not be able to book this address.`,
      );
    }
  }
  if (isPresent(draft.postalCode)) {
    const r = postalCodeSchema.safeParse(draft.postalCode);
    if (!r.success) setError(errors, "postalCode", r.error.issues[0]?.message ?? "Invalid postal code");
  }

  // ── Site readiness — every key must be true
  for (const key of SITE_READINESS_KEYS) {
    const v = (draft as Record<string, unknown>)[key];
    if (v !== undefined && v !== true) {
      setError(
        errors,
        key,
        `Required: please confirm ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`,
      );
    }
  }

  // ── Contact
  if (isPresent(draft.name)) {
    const r = nameSchema.safeParse(draft.name);
    if (!r.success) setError(errors, "name", r.error.issues[0].message);
  }
  if (isPresent(draft.email)) {
    const r = emailSchema.safeParse(draft.email);
    if (!r.success) setError(errors, "email", r.error.issues[0].message);
  }
  if (isPresent(draft.phone)) {
    const r = phoneSchema.safeParse(draft.phone);
    if (!r.success) setError(errors, "phone", r.error.issues[0].message);
  }

  const isValid = missing.length === 0 && Object.keys(errors).length === 0;

  return { isValid, missing, errors, warnings };
}

/* ─── Step + summary helpers ───────────────────────────────────────────── */

export type BookingStepKey = "scope" | "project" | "schedule" | "location" | "readiness" | "contact";

const STEP_FIELDS: Record<BookingStepKey, RequiredFieldKey[]> = {
  scope: ["package"],
  project: ["vehicleType"],
  schedule: ["date", "time", "flexibility15min"],
  location: ["street", "city"],
  readiness: ["waterAccess", "powerOutlet", "driveway", "keysHandoff"],
  contact: ["name", "email", "phone"],
};

export function isStepComplete(
  step: BookingStepKey,
  draft: Partial<BookingDraft>,
): boolean {
  const result = validateBookingDraft(draft);
  return STEP_FIELDS[step].every(
    (k) => !result.missing.includes(k) && !(result.errors as Record<string, unknown>)[k],
  );
}

export function getNextRequiredField(
  draft: Partial<BookingDraft>,
): RequiredFieldKey | null {
  const result = validateBookingDraft(draft);
  return result.missing[0] ?? null;
}

export function summarizeMissing(draft: Partial<BookingDraft>): string {
  const result = validateBookingDraft(draft);
  if (result.missing.length === 0) return "All required fields complete.";
  if (result.missing.length === 1) return `Missing: ${result.missing[0]}`;
  return `Missing ${result.missing.length} fields: ${result.missing.join(", ")}`;
}
