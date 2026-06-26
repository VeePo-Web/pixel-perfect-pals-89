/**
 * useBookingValidation — thin React hook wrapping `validateBookingDraft`.
 *
 * Re-runs only when the draft reference changes. Used by `BookingModal.tsx`
 * (currently read-only, behind a STRICT_VALIDATION flag) and by future UI
 * pieces that need live field-level error feedback.
 */

import { useMemo } from "react";
import {
  validateBookingDraft,
  type BookingDraft,
  type BookingValidationResult,
} from "@/lib/booking-validation";

export function useBookingValidation(
  draft: Partial<BookingDraft>,
): BookingValidationResult {
  return useMemo(() => validateBookingDraft(draft), [draft]);
}
