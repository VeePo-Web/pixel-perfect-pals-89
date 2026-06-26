# 02 — Design Philosophy (CMB)

> The 3-value decision filter that governs every design, motion, and layout choice in CMB v2.0. Operates **within** the conflict-resolution order from Brand Identity Architect v3.

---

## The three values (decision filter)

1. **Old-School Accountability.** The page should feel like a serious local family-builder shop — not a national contractor template. Layout signals stability: stable grids, restrained editorial hierarchy, calm spacing.
2. **Modern-Day Clarity.** Every choice reduces the customer's cognitive load: explain the work, explain the price, explain the next step. If a decoration doesn't help comprehension, it goes.
3. **Family Legacy.** Every page leaves the visitor with the impression *this team will still be here in twenty years.* Visuals reinforce continuity — heritage navy, warm stone, aged brass — never "viral trend of the quarter."

Every design call must pass *all three.* If a choice serves only one or two, rework it.

## Anti-decoration stance

- No glossy hero composites.
- No floating SaaS cards with neon shadows.
- No "premium" gradient skies, sun-flares, or rim-light overlays.
- No purely decorative iconography. Icons must label or measure.
- No animated background gradients.
- No marketing stock with smiling families.

## Precision rituals (the work standard)

| Ritual | Standard |
|--------|----------|
| Alignment | Every block snaps to the grid (`05_spacing_grid_layout`). No off-grid floats. |
| Typography | Space Grotesk + Jost only (`04_…`). Numerals: Space Grotesk 300 for prices and step counters. |
| Color | HSL semantic tokens only (`03_…`). No raw hex in components. |
| Spacing | 4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px scale. No off-scale values. |
| Motion | `transform` + `opacity` only (`07_…`). Reduced-motion respected. |
| Components | Use the contracts in `06_…`. No bespoke one-offs without a v2 update. |

## Reveal-timing reference

| Element | Duration | Easing | Stagger |
|---------|----------|--------|---------|
| Hero copy | 600 ms | `cubic-bezier(0.16, 1, 0.3, 1)` | 0 |
| Trust bar items | 320 ms | same | 60 ms |
| Pricing cards | 480 ms | same | 100 ms |
| Process timeline steps | 360 ms | same | 80 ms |
| FAQ accordion expand | 200 ms | `ease-out` | n/a |

(Full motion spec in `07_motion_scroll_authority`.)

## Family-resemblance rule

Every spin-off domain must be recognizably part of the same family in **under 2 seconds** of viewing. Recognizability is carried by:

- Heritage navy as primary or accent.
- Space Grotesk + Jost typography.
- Section rhythm (12 / 12 / 15 master block orders).
- The master line: *Strong Foundations For Those Who Come After Us.*

## Pass/Fail audit

- [ ] Every component on the page passes all 3 values.
- [ ] Anti-decoration list confirmed not present.
- [ ] All numbers / spacing / colors land on declared scales.
- [ ] Family-resemblance recognizable in 2 seconds on a cold visit.
