## Problem

At the current viewport (928px), the Home trust bar wraps numbers onto one line and labels onto the next, with "Liability coverage" clipping to "Liabi". Root causes:

1. `TrustNumbers` row variant uses `flex-wrap` with `justify-between` and `min-w-[8rem]` per item — 4 items + `FoundationCounter` in a 9/3 grid collapse below ~1024px.
2. Labels use `text-caption` with `tracking-[0.18em]` — wide letter-spacing pushes "Liability coverage" past the cell.
3. No vertical hairlines, no eyebrow framing — far from a Fantasy.co / Locomotive editorial bar.

## Fix — Fantasy.co–grade trust strip

Rebuild `src/components/template/TrustNumbers.tsx` row variant only (grid variant stays untouched — used on Reviews page).

**Structure (row variant):**
- CSS Grid, `grid-cols-2 md:grid-cols-4`, hairline `divide-x divide-seam/60` between cells, `divide-y md:divide-y-0` for the mobile 2×2.
- Each cell: vertical stack — number on top, copper square bullet rule (12px), then label.
- Numbers: `font-display`, `text-[clamp(2.25rem,4vw,3.25rem)]`, `leading-[0.95]`, `tracking-[-0.02em]`, `text-forest`, `tabular-nums`.
- Labels: `font-eyebrow` reduced to `text-[10px] md:text-[11px]`, `tracking-[0.14em]` (was .18), `text-mist`, `leading-[1.35]`, `max-w-[14ch]`, balanced — no clipping.
- Cell padding: `px-5 py-6 md:px-8 md:py-8`, first/last cell flush.
- Add subtle copper underline accent under each number: `h-px w-6 bg-copper/60 my-3`.

**Home page layout (`src/pages/template/Home.tsx` ~line 110–122):**
- Drop the 9/3 grid that squeezes 4 numbers into 9 columns next to FoundationCounter.
- Stack: `TrustNumbers` full-width on its own row, then a slim row below with eyebrow ("Since 1958 · Cochrane, AB") on the left and `FoundationCounter` on the right, separated by a hairline.
- Section padding stays `size="sm"`.

**Result:** four numbers breathe across full width at 928px, "Liability coverage" sits on one line under "$5M", FoundationCounter no longer fights for space, and the bar reads like Fantasy.co's editorial stat rows.

## Out of scope

- No copy changes to numbers or labels.
- No edits to `TrustNumbers` grid variant (Reviews page).
- No color, font, or token additions.
- No other sections touched.

## Files

- `src/components/template/TrustNumbers.tsx` — rewrite row variant.
- `src/pages/template/Home.tsx` — restructure trust bar block (~lines 110–122).
