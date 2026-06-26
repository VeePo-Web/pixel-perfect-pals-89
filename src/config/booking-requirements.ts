/**
 * COCHRANE MASTER BUILDERS — Booking Requirements
 *
 * Single source of truth for what a "complete" booking is, derived from
 * `QUESTIONNAIRE_ANSWERS`. Decision-making reference + validator contract.
 *
 * ⚠️ This file is INTERNAL ONLY. It does not render UI. The booking modal
 * still shows its existing 4-step flow — once the UI is upgraded to collect
 * every field listed here, flip `STRICT_VALIDATION` in `BookingModal.tsx`
 * to `true` to enforce.
 */

export const SERVICE_AREA_CITIES = ["Calgary", "Airdrie", "Cochrane"] as const;
export type ServiceCity = (typeof SERVICE_AREA_CITIES)[number];

export const PACKAGE_OPTIONS = ["basic-wash", "full-detail", "not-sure"] as const;
export type PackageOption = (typeof PACKAGE_OPTIONS)[number];

export const ADD_ON_OPTIONS = ["ceramic-spray", "clay-bar", "iron-extraction"] as const;
export type AddOnOption = (typeof ADD_ON_OPTIONS)[number];

export const VEHICLE_TYPE_OPTIONS = ["townhome", "suv", "truck", "van", "other"] as const;
export type VehicleTypeOption = (typeof VEHICLE_TYPE_OPTIONS)[number];

/**
 * Required field keys — every key here must be filled (and pass its
 * field-level validator) for `validateBookingDraft` to return `isValid: true`.
 */
export const REQUIRED_FIELD_KEYS = [
  // Job scope (Q2.3, Q2.4 — basic wash + full detail are the lead services)
  "package",
  // Project (Q2.6, Q2.11 — pricing varies by project type)
  "vehicleType",
  // Schedule (Q11 — booking flow)
  "date",
  "time",
  "flexibility15min",
  // Location (Q5 — service area: Calgary + Airdrie + Cochrane)
  "street",
  "city",
  // Site readiness (Cochrane Master Builders's hard requirements — mobile-service contract)
  "waterAccess",
  "powerOutlet",
  "driveway",
  "keysHandoff",
  // Contact (Q9 — SMS confirmation is the real channel, phone now required)
  "name",
  "email",
  "phone",
] as const;

export type RequiredFieldKey = (typeof REQUIRED_FIELD_KEYS)[number];

/**
 * Site-readiness keys — exposed separately so the future UI can render them
 * as a single grouped checklist ("before we arrive, please confirm…").
 */
export const SITE_READINESS_KEYS = [
  "waterAccess",
  "powerOutlet",
  "driveway",
  "keysHandoff",
] as const;

export type SiteReadinessKey = (typeof SITE_READINESS_KEYS)[number];

/**
 * Full requirements catalog — grouped, with provenance back to the
 * questionnaire so future maintainers know why each field exists.
 */
export const BOOKING_REQUIREMENTS = {
  jobScope: {
    package: {
      required: true,
      options: PACKAGE_OPTIONS,
      // Q2.3 — "the basic wash and full detail" are the lead services
      source: "Q2.3_leadServiceForWebsite",
    },
    addOns: {
      required: false,
      options: ADD_ON_OPTIONS,
      // Q2.7 + Q2.8 — Ceramic spray coat, millwork detail, iron extraction
      source: "Q2.8_addOnsList",
    },
  },

  project: {
    vehicleType: {
      required: true,
      options: VEHICLE_TYPE_OPTIONS,
      // Q2.6 — "the budget may change by the difference of project type"
      source: "Q2.6_variableByVehicle",
    },
    customVehicle: {
      // Required only when vehicleType === "other"
      requiredWhen: { vehicleType: "other" },
      // Q2.12 — Heavy machinery is not a fit; warn if detected here
      warnIfMatches: /heavy machinery|tractor|excavator|forklift|semi[\s-]?truck/i,
      source: "Q2.12_notAGoodFit",
    },
  },

  schedule: {
    date: {
      required: true,
      // Must be ≥ today
      source: "Q11_bookingFlow",
    },
    time: {
      required: true,
      // 24h HH:MM
      source: "Q11_bookingFlow",
    },
    flexibility15min: {
      required: true,
      // Acknowledgement that arrival window may flex ±15min
      source: "Q11_bookingFlow",
    },
  },

  location: {
    street: {
      required: true,
      source: "Q5_serviceArea",
    },
    city: {
      required: true,
      options: SERVICE_AREA_CITIES,
      // Q5 — Calgary + Airdrie + Cochrane only
      source: "Q5_serviceArea",
    },
    postalCode: {
      required: false,
      source: "Q5_serviceArea",
    },
  },

  siteReadiness: {
    waterAccess: {
      required: true,
      // Q14.3 — water access required for exterior service
      source: "Q14.3_siteRequirements",
    },
    powerOutlet: {
      required: true,
      // Q14.3 — power outlet required for vacuum / extractor
      source: "Q14.3_siteRequirements",
    },
    driveway: {
      required: true,
      // Q14.3 — flat driveway / parking pad required
      source: "Q14.3_siteRequirements",
    },
    keysHandoff: {
      required: true,
      // Q14.3 — customer must be available to hand off keys / unlock
      source: "Q14.3_siteRequirements",
    },
  },

  contact: {
    name: { required: true, source: "Q9_contactMethod" },
    email: { required: true, source: "Q9_contactMethod" },
    // Q9 — SMS confirmation is the real channel, so phone is required
    phone: { required: true, source: "Q9_contactMethod" },
  },

  optional: {
    message: { required: false },
    media: { required: false, max: 3 },
  },
} as const;
