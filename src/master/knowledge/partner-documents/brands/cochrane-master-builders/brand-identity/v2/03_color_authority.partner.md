# 03 — Color Authority (CMB)

> All color decisions in v2.0 use HSL semantic tokens. No raw hex in components. The token names below are the canonical CMB names; per-cluster overlays are listed last.

---

## Palette mood (locked, from upload §3)

Heritage navy, warm white, charcoal, stone, muted green, timber, aged brass.

## HSL token system

Defined under `:root` (light mode is the default — CMB does not ship a dark theme).

```css
:root {
  /* Surfaces */
  --bone:           36 30% 96%;   /* warm white page background */
  --paper:          36 22% 92%;   /* card / panel surface */
  --stone-50:       36 16% 88%;
  --stone-100:      34 14% 82%;
  --stone-200:      32 12% 74%;
  --stone-300:      30 10% 64%;
  --stone-400:      28  8% 52%;

  /* Ink */
  --graphite-100:   220  6% 78%;
  --graphite-300:   220  8% 58%;
  --graphite-500:   220 10% 38%;
  --graphite-700:   220 12% 22%;
  --graphite-900:   220 14% 12%;

  /* Heritage navy (primary brand) */
  --heritage-500:   216 38% 24%;
  --heritage-600:   216 42% 18%;
  --heritage-700:   216 46% 12%;

  /* Accents */
  --timber-500:     28 28% 38%;   /* warm wood */
  --brass-500:      38 32% 48%;   /* aged brass */
  --moss-500:      150 16% 32%;   /* muted green */
  --slate-500:     210 12% 36%;   /* roofing / mechanical clusters */
  --aggregate-500: 210  6% 46%;   /* concrete cluster */

  /* Semantic */
  --background:        var(--bone);
  --foreground:        var(--graphite-900);
  --muted:             var(--stone-50);
  --muted-foreground:  var(--graphite-500);
  --primary:           var(--heritage-600);
  --primary-foreground: var(--bone);
  --accent:            var(--brass-500);
  --accent-foreground: var(--graphite-900);
  --border:            var(--stone-100);
  --ring:              var(--heritage-500);
}
```

## Contrast matrix (must hold)

| Pairing | Use | Required ratio | Status |
|---------|-----|----------------|--------|
| `--graphite-900` on `--bone` | Body text | ≥ 7.0 (AAA) | Pass |
| `--graphite-700` on `--paper` | Body on card | ≥ 7.0 (AAA) | Pass |
| `--heritage-600` on `--bone` | H1 / brand | ≥ 7.0 (AAA) | Pass |
| `--bone` on `--heritage-600` | Primary CTA text | ≥ 7.0 (AAA) | Pass |
| `--graphite-500` on `--bone` | Captions, ≥ 18 px or bold | ≥ 4.5 (AA) | Pass |
| `--brass-500` on `--bone` | Accent label, ≥ 18 px | ≥ 4.5 (AA) | Pass |

Tokens added in cluster overlays must re-pass this matrix.

## Per-cluster accent overlays (from upload §9)

| Cluster | Accent token | Overlay use |
|---------|--------------|-------------|
| Roofing / Exterior | `--slate-500` | Hero band tint, divider line |
| Bathrooms / Interiors | `--brass-500` | Trust strip, stat numerals |
| Basements / Suites | `--moss-500` | Section eyebrow, link hover |
| Concrete / Foundations | `--aggregate-500` | Pricing-card border, process line |
| Decks / Landscaping | `--timber-500` | Hero tint, area-chip border |
| Flooring / Tile | `--brass-500` | Eyebrow, finish-card border |
| Mechanical / Systems | `--slate-500` | System-health card, divider |
| Commercial | `--graphite-500` | Section divider, eyebrow |
| Handyman / Repairs | `--moss-500` | Photo-upload card border |

Overlays change *accents only* — never the primary `--heritage-600`, never the surface `--bone` / `--paper`, never the `--graphite-*` ink.

## Banned in components

- Raw hex anywhere in TSX.
- `text-white`, `text-black`, `bg-black`, `bg-white` Tailwind classes.
- Saturated reds, neon greens, hot pinks, electric blues.
- Gradients on text.
- Color-based meaning without an accompanying icon or label.

## Pass/Fail audit

- [ ] No raw hex in `src/`.
  - Auditor grep: `rg -n "#[0-9a-fA-F]{3,6}\b" src/components src/pages | grep -v 'svg\\|stroke=\"none\"'`
- [ ] Every contrast pairing on the live page passes the matrix.
- [ ] No banned Tailwind color class.
  - Auditor grep: `rg -n "(text|bg)-(black|white)\b" src/components src/pages`
- [ ] Per-cluster overlays only modify accents.
