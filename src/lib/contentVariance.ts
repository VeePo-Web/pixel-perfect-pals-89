/**
 * contentVariance.ts — deterministic per-slug picker.
 *
 * Programmatic SEO pages (community pages, ItemList pages, hub spokes)
 * risk Google's "doorway page" classifier when 1,000 templated pages
 * ship identical intros and FAQ blocks. The Victorious-SEO playbook
 * solves this with intent-matched variance: same template shape,
 * different surface phrasing per page.
 *
 * `pickVariant(slug, variants)` is a stable hash → index picker. Same
 * slug always returns the same variant (so links never reshuffle on
 * navigation) but a 50-community region rotates evenly across the
 * supplied variant pool.
 */

function hash(input: string): number {
  let h = 2166136261; // FNV-1a 32-bit
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function pickVariant<T>(slug: string, variants: readonly T[]): T {
  if (variants.length === 0) {
    throw new Error("pickVariant: variants array is empty");
  }
  return variants[hash(slug) % variants.length];
}

/** Interpolate `{token}` placeholders into a variant template. */
export function fill(
  template: string,
  vars: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`));
}