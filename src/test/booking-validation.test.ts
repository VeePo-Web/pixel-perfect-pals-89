import { describe, expect, it } from "vitest";
import {
  validateBookingDraft,
  type BookingDraft,
} from "@/lib/booking-validation";
import { REQUIRED_FIELD_KEYS } from "@/config/booking-requirements";

function tomorrowISO(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function happyDraft(): Partial<BookingDraft> {
  return {
    package: "full-detail",
    vehicleType: "townhome",
    date: tomorrowISO(),
    time: "10:30",
    flexibility15min: true,
    street: "123 Main St",
    city: "Calgary",
    waterAccess: true,
    powerOutlet: true,
    driveway: true,
    keysHandoff: true,
    name: "Cochrane Master Builders",
    email: "Cochrane Master Builders@example.com",
    phone: "(403) 555-0123",
  };
}

describe("validateBookingDraft", () => {
  it("empty draft is invalid and lists every required field as missing", () => {
    const result = validateBookingDraft({});
    expect(result.isValid).toBe(false);
    for (const key of REQUIRED_FIELD_KEYS) {
      expect(result.missing).toContain(key);
    }
  });

  it("name + email only is still invalid", () => {
    const result = validateBookingDraft({
      name: "Cochrane Master Builders",
      email: "Cochrane Master Builders@example.com",
    });
    expect(result.isValid).toBe(false);
    expect(result.missing.length).toBeGreaterThan(0);
  });

  it("full happy-path draft with all 4 site-readiness flags true is valid", () => {
    const result = validateBookingDraft(happyDraft());
    expect(result.errors).toEqual({});
    expect(result.missing).toEqual([]);
    expect(result.isValid).toBe(true);
  });

  it("waterAccess=false makes draft invalid with correct error key", () => {
    const result = validateBookingDraft({ ...happyDraft(), waterAccess: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.waterAccess).toBeTruthy();
  });

  it("powerOutlet=false makes draft invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), powerOutlet: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.powerOutlet).toBeTruthy();
  });

  it("driveway=false makes draft invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), driveway: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.driveway).toBeTruthy();
  });

  it("keysHandoff=false makes draft invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), keysHandoff: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.keysHandoff).toBeTruthy();
  });

  it("city outside Calgary/Airdrie/Cochrane is invalid with warning", () => {
    const result = validateBookingDraft({
      ...happyDraft(),
      city: "Okotoks" as unknown as "Calgary",
    });
    expect(result.isValid).toBe(false);
    expect(result.errors.city).toBeTruthy();
    expect(result.warnings.some((w) => w.includes("Outside service area"))).toBe(true);
  });

  it("project = 'other' without customVehicle is invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), vehicleType: "other" });
    expect(result.isValid).toBe(false);
    expect(result.errors.customVehicle).toBeTruthy();
  });

  it("project = 'other' with customVehicle = 'Tesla Model 3' is valid", () => {
    const result = validateBookingDraft({
      ...happyDraft(),
      vehicleType: "other",
      customVehicle: "Tesla Model 3",
    });
    expect(result.isValid).toBe(true);
  });

  it("heavy machinery custom project triggers warning", () => {
    const result = validateBookingDraft({
      ...happyDraft(),
      vehicleType: "other",
      customVehicle: "Caterpillar excavator",
    });
    expect(result.warnings.some((w) => w.includes("heavy machinery"))).toBe(true);
  });

  it("date in the past is invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), date: "2000-01-01" });
    expect(result.isValid).toBe(false);
    expect(result.errors.date).toBeTruthy();
  });

  it("phone with <10 digits is invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), phone: "403-555" });
    expect(result.isValid).toBe(false);
    expect(result.errors.phone).toBeTruthy();
  });

  it("flexibility15min not acknowledged is invalid", () => {
    const result = validateBookingDraft({ ...happyDraft(), flexibility15min: false });
    expect(result.isValid).toBe(false);
    expect(result.errors.flexibility15min).toBeTruthy();
  });
});
