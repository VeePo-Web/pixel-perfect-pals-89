# Cochrane Master Builders — Brand Bible

> **Single source of truth** for every brand decision: colors, marks, sizing, clear space, naming, and don'ts. If a rule is contested, this file wins.

---

## 1. The mark

**Cochrane Master Builders** ships as a family of seven coordinated marks:

| Family | What it is | Primary use |
|---|---|---|
| **Lockup** | Emblem + wordmark, stacked | Default brand mark. Nav, footer, hero, about, modal, 404. |
| **Lockup (with ground)** | Lockup framed by vertical plumb + horizontal base rule | Spec-grade contexts. Documents, certificates, project plates. |
| **Emblem** | The 3 navy diamond tiles + center "MB" script (no wordmark) | Square 1:1 surfaces. Favicon, profile pics, app icons, watermarks. |
| **Tiles** | The 3 diamond tiles only — no MB script (transparent center) | Kinetic identity. Pattern fills, animated assembly, decorative backdrop. |
| **MB monogram** | Just the handwritten "MB" letterform | Signature. Email footers, certificates, attribution, intimate contexts. |
| **Wordmark** | "MASTER BUILDERS / — COCHRANE —" type only | Editorial type voice. Section eyebrows, breadcrumbs, doc headers. |
| **Wordmark (with ground)** | Wordmark framed by drafting rule | Standalone brand statements. Chapter openers, deck covers, nameplates. |

> **Rule:** never `<img src="/.../cmb-...png">` directly. Always render through `<MasterLogo slot="..." />` so colorway, sizing, perf, and CLS are handled centrally and remixers can swap the colorway in one config flag.

---

## 2. Colors

The brand color is **navy `#1F2F4D`**. Three official colorways — pick one per trade in `trade.config.ts → identity.logoColorway`. Per-surface overrides allowed via the `colorway` prop on `<MasterLogo>`.

| Color | Hex | HSL | Use |
|---|---|---|---|
| **Navy (primary)** | `#1F2F4D` | `218° 43% 21%` | Default. White / light backgrounds. |
| **White** | `#FFFFFF` | `0° 0% 100%` | On navy, black, photographs, dark backgrounds. |
| **Black** | `#000000` | `0° 0% 0%` | Single-color print, embossing, blueprints. |

> **Rule of thumb:** navy on light, white on dark. Reserve black for single-color reproduction only (faxes, embossing, low-fidelity print).

The `recommendedColorwayForSlot()` helper in [`logo-registry.ts`](./logo-registry.ts) automates per-surface picks: dark + image surfaces always force `white`; light surfaces honor the trade's chosen colorway with a white→black fallback.

---

## 3. Size variants

### Lockup family (full logo)
`hero` (~2400px), `large` (~1200), `medium` (~800), `small` (~400),
`nav-large`, `nav-medium`, `nav-small`, `footer-large`, `footer-medium`, `footer-small`.

### Emblem & Tiles
`100, 200, 400, 800, 1200, 2400` px (square 1:1).

### MB monogram
`64, 128, 256, 512, 1024` px (height-based; never a hero asset).

### Wordmark & Wordmark-Ground
`200, 400, 800, 1200, 2400` px (width-based; ~5:1 aspect).

> **Why ladders matter:** every size in every family is a real PNG. We never CSS-resize a 2400px master down to a 32px favicon — that's a 70× scale-down that wastes bytes and looks soft. Vite bundles + tree-shakes the unused sizes per route.

---

## 4. File naming convention

```
cmb-{variation}-{color}-{size-label}.png
```

**Variation slugs:** `full-logo` (root family — no slug needed; just `cmb-{size}.png`), `emblem`, `tiles`, `mb-monogram`, `wordmark`, `wordmark-ground`.

**Color slugs:** `navy`, `white`, `black`.

**Examples:**
- `cmb-emblem-white-512.png`
- `cmb-tiles-black-200.png`
- `cmb-mb-monogram-navy-256.png`
- `cmb-wordmark-white-1200.png`
- `cmb-wordmark-ground-navy-800.png`

The legacy lockup family (no `{variation}` slug) was the first family embedded and kept its original naming for backward-compat: `cmb-nav-large.png`, `cmb-footer-medium.png`, `cmb-hero.png`, etc., with colorway prefixes for the navy/white variants (`cmb-navy-hero.png`, `cmb-white-footer-medium.png`).

---

## 5. Clear space & minimum size

- **Clear space:** maintain padding equal to the height of the "M" in MASTER on all sides of the full lockup. Never crop into this margin.
- **Minimum on-screen size:** full lockup ≥ **150 px wide**; emblem ≥ **32 px square**.
- **Minimum print size:** full lockup ≥ **0.75 in / 19 mm wide**.

---

## 6. Don'ts

- ❌ Don't recolor outside the navy / white / black palette.
- ❌ Don't apply drop shadows, gradients, strokes, or filters.
- ❌ Don't stretch, skew, or rotate.
- ❌ Don't reproduce on busy / photographic backgrounds without a navy or white panel behind the mark.
- ❌ Don't reconstruct or substitute fonts in the wordmark.
- ❌ Don't use the lockup smaller than 150 px wide — switch to the emblem.
- ❌ Don't use the monogram for nav, hero, or splash. It's a signature, not a brand mark.

---

## 7. Where things live in this repo

| Surface | Path | Read via |
|---|---|---|
| Bundled lockup + emblem + tiles + monogram + wordmark + wordmark-ground families | `src/master/assets/logo/` | `<MasterLogo slot="..." />` (never raw `<img>`) |
| Master source artwork (no-ground + with-ground originals) | `src/master/assets/logo/source/` | **Archive only** — never bundled to UI |
| In-context showcase boards | `src/master/assets/logo/boards/` | `MASTER_BOARDS` export in `logo-registry.ts`; rendered on `/brand` |
| Favicon ladder + PWA icons (navy + white reverse) | `public/favicon-*.png`, `public/android-chrome-*.png`, `public/apple-touch-icon.png` | `index.html` `<link rel="icon">` block + `prefers-color-scheme` media queries |
| PWA manifest | `public/site.webmanifest` | Browser auto-discovery |
| Social share + OG + profile pack | `public/share/` | `<meta property="og:image">` in `index.html` + `getShareAsset()` from `share-pack.ts` |
| Brand-kit page (boards + colors + rules + downloads) | `src/pages/Brand.tsx` → `/brand` | Direct URL only (not in nav) |

---

## 8. Code patterns — the only acceptable way to use the marks

### Nav / footer / hero / modal / about / 404
```tsx
import { MasterLogo } from "@/master/brand/MasterLogo";

<MasterLogo slot="nav" />          // resolves to size + colorway automatically
<MasterLogo slot="footer" />
<MasterLogo slot="hero" />
<MasterLogo slot="bookingModal" />
<MasterLogo slot="emblemFavicon" />
<MasterLogo slot="wordmarkSection" />
<MasterLogo slot="monogramSignature" />
```

### Per-surface colorway override
```tsx
<MasterLogo slot="footer" colorway="white" />   // force white on a dark footer
```

### Social share / OG / profile assets
```tsx
import { getShareAsset } from "@/master/brand/share-pack";

const ogUrl = getShareAsset("og");                       // → /share/og-1200x630-navybg.jpg
const profileUrl = getShareAsset("profile", "transparent"); // → /share/profile-400x400-transparent.png
```

### Showcase boards (brand-kit + press-kit only)
```tsx
import { MASTER_BOARDS } from "@/master/brand/logo-registry";

<img src={MASTER_BOARDS.lockupOnNavy} alt="Master Builders Cochrane lockup on navy" />
```

---

## 9. The full per-slot map

See [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md) for the complete table — every slot, every file, every component, every viewport breakpoint, every CLS box, every loading mode.

See [`LOGO_USAGE.md`](./LOGO_USAGE.md) for narrative usage rules and reasoning.

---

## 10. Master file → surface map (this brand bible's payload)

This section documents specifically where each file from the *uploaded master logo package* now lives in the repo and where it surfaces.

| Source file (uploaded) | Repo path | Surfaces / Consumers | When |
|---|---|---|---|
| `README.md` | `src/master/brand/BRAND_BIBLE.md` (this file) | `/brand` page (markdown render); referenced by every other brand doc | Single source of truth. Read first before any brand decision. |
| `MB_Master_Logo_1_cleaned.png` | `src/master/assets/logo/source/cmb-source-lockup-no-ground.png` | Archive only — never bundled to UI | Master file for re-deriving any future no-ground crop. |
| `MB_Master_Logo_2_original.png` | `src/master/assets/logo/source/cmb-source-lockup-with-ground.png` | Archive only — never bundled to UI | Master file for re-deriving any future with-ground crop. |
| `full-logo-on-white.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-white.png` | `/brand` showcase grid; press-kit download | "Logo on light backgrounds" demonstration board. |
| `full-logo-on-black.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-black.png` | `/brand` showcase grid; press-kit download | "Logo on dark backgrounds" demonstration board. |
| `full-logo-on-navy.png` | `src/master/assets/logo/boards/cmb-board-lockup-on-navy.png` | `/brand` showcase grid; press-kit download | "Logo on brand-navy backgrounds" demonstration board. |
| `emblem-on-black.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-black.png` | `/brand` showcase grid; press-kit download | "Emblem on dark backgrounds" demonstration board. |
| `emblem-on-navy.png` | `src/master/assets/logo/boards/cmb-board-emblem-on-navy.png` | `/brand` showcase grid; press-kit download | "Emblem on brand-navy backgrounds" demonstration board. |

The remaining derivative assets the README describes (every size × every colorway across all 7 families) were embedded in earlier passes and live under `src/master/assets/logo/` (bundled), `public/` (favicon + PWA), and `public/share/` (social pack). See [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md) for the full inventory.

---

## 11. Cross-references

- Slot map: [`LOGO_SLOT_MAP.md`](./LOGO_SLOT_MAP.md)
- Usage rules: [`LOGO_USAGE.md`](./LOGO_USAGE.md)
- Component: [`MasterLogo.tsx`](./MasterLogo.tsx)
- Registry: [`logo-registry.ts`](./logo-registry.ts)
- Share pack: [`share-pack.ts`](./share-pack.ts)
- Brand identity tokens: [`identity.ts`](./identity.ts)
- Design-system style guide: [`style-guide.ts`](./style-guide.ts)
- Brand-kit page: [`/brand`](../../../pages/Brand.tsx)
- Source archive: [`../assets/logo/source/`](../assets/logo/source/)
- Showcase boards: [`../assets/logo/boards/`](../assets/logo/boards/)
- Remix checklist: [`../checklist.ts`](../checklist.ts)

---

## Heirloom Moments

Eight bespoke visual moments that distinguish every Cochrane Master Builders site from any competitor template. All live in `src/components/template/bespoke/`. All strings source from `MASTER_REMIX` — none are hard-coded.

**Governing brand quotes:**
1. "luxury-level, fantasy.co-inspired website with Apple-level UX precision and bespoke motion polish" — 1.2.1 Family Legacy Standard
2. "slow, deliberate, heavy animations as opposed to fast, bouncy, cheap animations" — 1.5.1 UX Psychology System
3. "bespoke, warm, authoritative tradition executed with fantasy.co polish" — 1.5 Brand Identity North Star

### The Slogan — `BRAND_SLOGAN`
"Building Strong Foundations For Those Who Come After Us" is encoded once in `remix-variables.ts` and surfaces in ≥7 distinct placements via `<SloganHeartbeat variant="..." />`:
- **nav** — 9px Jost, letter-spacing 0.30em, copper/40, disappears on scroll
- **whisper** — 11px Jost uppercase, beneath hero H1
- **divider** — 10px tracked caps, between major sections
- **footer** — clamp(1.25–2rem) Space Grotesk Light Italic, above CTA
- **monument** — clamp(0.9–1.6rem) Jost tracked, beneath monumental wordmark
Rule: never animate with bounce. Only fades, draws, or clip-path reveals. Sacred type.

### 1. CMBTrio — `<CMBTrio />`
Three personified SVG glyphs — C (The Foreman, hardhat), M (The Craftsman, carpenter's pencil), B (The Local, coffee cup). Idle animations: 7–12s cycles, ultra-subtle. Assembles letter-by-letter on loading screen. 64px in footer Tier 2, 240px on About hero, 48px in booking modal.

### 2. BlueprintGrain — `<BlueprintGrain />`
Pure SVG `<pattern>` of architectural marks: grid lines, corner ticks, T-square references. 1–2% opacity behind hero and footer. Zero images. Zero performance cost.

### 3. CornerstoneStamp — `<CornerstoneStamp />`
Circular notary seal — outer ring: "EST · COCHRANE · MASTER · BUILDERS · ALBERTA", inner: CMB monogram. Rotates 360° in 60s. 80px default at 60% copper opacity. Placed bottom-right of hero, in booking confirmation, on thank-you page.

### 4. PlumbLineDivider — `<PlumbLineDivider />`
A copper hairline with a 6px diamond plumb-bob that drops 24px on a spring (stiffness 260, damping 18) into view. Replaces generic horizontal rules between all major sections.

### 5. FoundationCounter — `<FoundationCounter />`
Year counts from 1900 → `FOUNDATION_YEAR` over 3s ease-out on scroll-into-view. Reads "Foundations laid since" above. Every trade inherits the framing; only the year changes.

### 6. HeroEtchedUnderline — `<HeroEtchedUnderline />`
A slightly imperfect bezier SVG path in copper that draws itself on mount in 1.4s ease-out. Placed directly beneath every hero H1. Single-shot, never loops.

### 7. GenerationalMarquee — `<GenerationalMarquee />`
Ultra-slow (90s) horizontal marquee of the slogan with copper diamond separators. 12px tracked Jost, charcoal/30. Pauses on hover. Respects prefers-reduced-motion. Placed above the monumental footer sign-off.

### 8. MastersMark — `<MastersMark />`
A hand-script-style SVG signature "— The Master Builders" drawn on scroll-into-view. 2.2s continuous stroke animation. Used at the end of About, Brand Story, and Why We Love pages.

### New Token Summary
| Token | Value | Use |
|---|---|---|
| `--copper` | hsl(30 62% 48%) | Hairlines, eyebrow caps, dots, stamp |
| `--copper-glow` | copper/30 | Glow shadows |
| `--ink-blueprint` | hsl(215 25% 18%) | Blueprint grain pattern |
| `--shadow-heirloom` | 0 1px 0 copper/30 | Bespoke component edge |
| `BRAND_SLOGAN` | remix-variables.ts | All 7+ slogan placements |
| `FOUNDATION_YEAR` | remix-variables.ts | FoundationCounter |
| `MONOGRAM_LETTERS` | remix-variables.ts | CMBTrio letters |

### New Fonts
- **Space Grotesk 300** — Hero H1, FoundationCounter, pull quotes
- **Jost 300–400** — Eyebrow caps, slogan variants, marquee, monument line

### Acceptance Gates
- Slogan appears in ≥7 surfaces, all from one variable ✓
- All 8 bespoke components render at 24px, 64px, 240px ✓
- CMBTrio idle animations whisper, never wave ✓
- Zero rounded cards, zero gray borders — copper hairlines only ✓
- Full re-skin by changing only `remix-variables.ts` + `bespoke-config.ts` ✓
- All animations respect `prefers-reduced-motion` ✓
