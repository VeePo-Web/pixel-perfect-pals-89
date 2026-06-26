# 05 — Spacing, Grid, Layout (CMB)

> One spacing scale. One grid. One section rhythm.

---

## Spacing scale

`4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 px`. No off-scale values. Tailwind aliases:

| Token | px | Use |
|-------|----|-----|
| `s-1` | 4 | Icon gap |
| `s-2` | 8 | Inline label-to-value |
| `s-3` | 16 | Card inner padding (mobile) |
| `s-4` | 24 | Card inner padding (desktop) |
| `s-5` | 32 | Section eyebrow → H2 |
| `s-6` | 48 | Block-internal stack |
| `s-7` | 64 | Section vertical padding (mobile) |
| `s-8` | 96 | Section vertical padding (desktop, default) |
| `s-9` | 128 | Marquee / hero generous breathing |

## Grid

| Breakpoint | Columns | Gutter | Container |
|------------|---------|--------|-----------|
| `< 640`  | 4   | 16 px | 100% – 32 px outer |
| `640–1023` | 8 | 20 px | 100% – 48 px outer |
| `≥ 1024` | 12  | 24 px | max 1280 px |

- Editorial blocks use 8/12 columns.
- Pricing cards: 1 / 2 / 3 columns at sm / md / lg.
- Process timeline: vertical on mobile (full width), horizontal scroll-snap on `≥ md`.

## Section rhythm

- Default section padding: `s-8` top + bottom on `≥ md`, `s-7` on phone.
- Hero gets `s-9` top, `s-8` bottom.
- Adjacent dark-on-light sections share a 1 px `--border` divider, never decorative shapes.

## Page section budgets

| Page | Section count | Authority |
|------|---------------|-----------|
| Homepage | 12 (Trust Bar → Final CTA) | `homepage_service_page_style_guide_template_and_how_to.partner.md` §4 |
| Service Page | 12 (Hero → Final CTA) | same §5 |
| Process Page | 15 | `cochrane_master_builders_process_page_style_guide_v1.partner.md` |
| Areas Page (per community) | 8 | template-architect spec |
| Contact Page | 5 | template-architect spec |

## Whitespace minimums

- Min 96 px breathing room between editorial proof block and the next section on desktop.
- Min 48 px between last paragraph and CTA on mobile.
- Sticky mobile bottom bar reserves 64 px safe-area; all bottom CTAs add `pb-[calc(env(safe-area-inset-bottom)+16px)]`.

## Banned

- Off-scale paddings (`py-[27px]`).
- 1280 px containers on body sections that contain narrow editorial copy (use 720 ch max).
- Full-bleed images at hero on mobile under 360 px wide.

## Pass/Fail audit

- [ ] No off-scale spacing. Grep: `rg -n "p[xytblr]?-\[[0-9]+px\]" src/components src/pages`
- [ ] Container max-width = 1280 px on `≥ lg`.
- [ ] Sticky mobile bar bottom-padding includes safe-area env.
- [ ] Section count per page matches budget table.
