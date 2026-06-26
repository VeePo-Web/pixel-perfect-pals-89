/**
 * ═══════════════════════════════════════════════════════════════════════════
 * CONTRAST UTILITIES — WCAG AA / AAA checking
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pure functions. Used by the live Contrast Matrix in the style guide
 * and (via build-time check) to flag failing color pairs in CI.
 *
 * Algorithm: WCAG 2.1 relative luminance + contrast ratio.
 * https://www.w3.org/TR/WCAG21/#contrast-minimum
 * ═══════════════════════════════════════════════════════════════════════════
 */

import type { HSL } from "@/config/trade.config";

// ───────────────────────────────────────────────────────────────────────────
// HSL → RGB → relative luminance
// ───────────────────────────────────────────────────────────────────────────

function hslToRgb({ h, s, l }: HSL): [number, number, number] {
  const sN = s / 100;
  const lN = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sN * Math.min(lN, 1 - lN);
  const f = (n: number) =>
    lN - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

function relativeLuminance(rgb: [number, number, number]): number {
  const [r, g, b] = rgb.map((channel) => {
    const c = channel / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// ───────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ───────────────────────────────────────────────────────────────────────────

/** WCAG contrast ratio between two HSL colours (1 to 21) */
export function wcagRatio(a: HSL, b: HSL): number {
  const la = relativeLuminance(hslToRgb(a));
  const lb = relativeLuminance(hslToRgb(b));
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

export type ContrastTextSize = "normal" | "large" | "ui";

/**
 * Pass thresholds (WCAG 2.1):
 *   - Normal text:  AA ≥ 4.5,  AAA ≥ 7
 *   - Large text:   AA ≥ 3,    AAA ≥ 4.5  (≥18pt or ≥14pt bold)
 *   - UI / graphics: ≥ 3 (non-text contrast)
 */
export function passesAA(ratio: number, size: ContrastTextSize = "normal"): boolean {
  if (size === "normal") return ratio >= 4.5;
  if (size === "large") return ratio >= 3;
  return ratio >= 3;
}

export function passesAAA(ratio: number, size: ContrastTextSize = "normal"): boolean {
  if (size === "normal") return ratio >= 7;
  if (size === "large") return ratio >= 4.5;
  return ratio >= 4.5;
}

export type ContrastBadge = "AAA" | "AA" | "AA Large" | "Fail";

export function gradeContrast(
  ratio: number,
  size: ContrastTextSize = "normal",
): ContrastBadge {
  if (passesAAA(ratio, size)) return "AAA";
  if (passesAA(ratio, size)) return "AA";
  if (size === "normal" && passesAA(ratio, "large")) return "AA Large";
  return "Fail";
}
