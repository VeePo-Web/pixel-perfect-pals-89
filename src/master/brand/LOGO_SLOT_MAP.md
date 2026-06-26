# Master Logo Slot Map

**Single source of truth** for every place the Cochrane Master Builders logo
appears across any remixed trade site. If you're adding a new surface that
needs a logo, add the slot here first, then to `LOGO_USAGE_MAP` in
`logo-registry.ts`, then render it through `<MasterLogo slot="..." />`.

> **Rule:** never `<img src="/.../cmb-...png">` directly in a component.
> Always go through `<MasterLogo>` so colorway, sizing, perf, and CLS are
> handled centrally and remixers can swap the colorway in one config flag.

---

## Per-slot map

| Slot              | File served                          | Component / Surface                     | When it shows                              | Surface tone       | Default colorway          | Loading | CLS box (w×h) |
|-------------------|--------------------------------------|-----------------------------------------|--------------------------------------------|--------------------|---------------------------|---------|---------------|
| `nav` mobile      | `cmb-nav-small.png` (9 KB)           | `Navigation.tsx` top bar                | viewport `<640px`, sticky                  | light (paper)      | trade colorway (CMB=black)| eager   | 280×224       |
| `nav` tablet      | `cmb-nav-medium.png` (15 KB)         | `Navigation.tsx`                        | `640–1023px`                               | light              | trade colorway            | eager   | 280×224       |
| `nav` desktop     | `cmb-nav-large.png` (29 KB)          | `Navigation.tsx`                        | `≥1024px`                                  | light              | trade colorway            | eager   | 280×224       |
| `footer` mobile   | `cmb-footer-small.png` (13 KB)       | `Footer.tsx` brand monument             | `<768px`                                   | light              | trade colorway            | lazy    | 400×320       |
| `footer` tablet   | `cmb-footer-medium.png` (21 KB)      | `Footer.tsx`                            | `768–1023px`                               | light              | trade colorway            | lazy    | 400×320       |
| `footer` desktop  | `cmb-footer-large.png` (47 KB)       | `Footer.tsx`                            | `≥1024px`                                  | light              | trade colorway            | lazy    | 400×320       |
| `hero`            | `cmb-hero.png` (490 KB — pre-cached) | Hero watermark / brand reveal           | first paint, above the fold                | image (photo bg)   | **white** (forced)        | eager   | full-bleed    |
| `loading`         | `cmb-small.png` (47 KB)              | 5-phase entry sequence (`loading-sequence`) | app boot, splash phases enter→exit     | dark (asphalt)     | **white** (forced)        | eager   | auto, w-28    |
| `bookingModal`    | `cmb-medium.png` (158 KB)            | Booking modal left rail                 | when modal opens (lg+)                     | light (bone)       | trade colorway            | lazy    | auto, max-w-sm|
| `about`           | `cmb-large.png` (323 KB)             | About-page brand monument               | `/about` route                             | light              | trade colorway            | lazy    | auto, max-w-lg|
| `notFound`        | `cmb-medium.png` (158 KB)            | 404 page                                | router fallback                            | light              | trade colorway            | lazy    | auto          |
| `email`           | `/og-image-cmb.png` (legacy — to migrate) | Transactional email header         | quote/booking confirmations                | light              | trade colorway            | n/a     | 280 max-w     |
| `og`              | `/share/og-1200x630-navybg.jpg`      | `<meta property="og:image">` + Twitter  | social share crawler fetch                 | navy (baked)       | navy MB diamond + wordmark| n/a     | 1200×630      |
| `favicon`         | `/favicon-cmb.png` (9 KB)            | `<link rel="icon">`                     | browser tab, bookmarks                     | any (browser-chrome)| (baked into favicon)     | n/a     | 32×32 → 256×256|

---

## Colorway file inventory

Per-colorway file paths the registry imports from. **All three colorways
are now fully embedded and live.**

| Slot variant   | Black ✅                  | Navy ✅                        | White ✅                       |
|----------------|---------------------------|--------------------------------|--------------------------------|
| nav small      | `cmb-nav-small.png`       | `cmb-navy-nav-small.png`       | `cmb-white-nav-small.png`      |
| nav medium     | `cmb-nav-medium.png`      | `cmb-navy-nav-medium.png`      | `cmb-white-nav-medium.png`     |
| nav large      | `cmb-nav-large.png`       | `cmb-navy-nav-large.png`       | `cmb-white-nav-large.png`      |
| footer small   | `cmb-footer-small.png`    | `cmb-navy-footer-small.png`    | `cmb-white-footer-small.png`   |
| footer medium  | `cmb-footer-medium.png`   | `cmb-navy-footer-medium.png`   | `cmb-white-footer-medium.png`  |
| footer large   | `cmb-footer-large.png`    | `cmb-navy-footer-large.png`    | `cmb-white-footer-large.png`   |
| hero           | `cmb-hero.png`            | `cmb-navy-hero.png`            | `cmb-white-hero.png`           |
| large          | `cmb-large.png`           | `cmb-navy-large.png`           | `cmb-white-large.png`          |
| medium         | `cmb-medium.png`          | `cmb-navy-medium.png`          | `cmb-white-medium.png`         |
| small          | `cmb-small.png`           | `cmb-navy-small.png`           | `cmb-white-small.png`          |

To switch the trade's primary colorway: set
`TRADE.identity.logoColorway = "black" | "navy" | "white"` in
`src/config/trade.config.ts`. Every slot (nav, footer, hero, loading, modal,
about, 404, email) flips in one shot via `<MasterLogo>`.

The `recommendedColorwayForSlot()` function still overrides per-surface:
**dark** and **image** surfaces (hero, loading splash) always force `white`
regardless of the trade's primary, ensuring contrast.

---

## Colorway decision tree

```text
                ┌─ slot surface? ─┐
                │                 │
            light/any            dark/image
                │                 │
       trade colorway       force "white"
       (white→black fallback)
                │
       per-instance override?
       (<MasterLogo colorway="..."/>)
                │
            final pick
```

Implemented in `recommendedColorwayForSlot(slot, tradeColorway)` —
`MasterLogo.tsx` calls it automatically. Override only when the surface
context is unusual (e.g. a hero photo that's unexpectedly bright and needs
the `black` lockup).

---

## Per-trade switch (the only knob remixers touch)

```ts
// src/config/trade.config.ts
export const TRADE = {
  identity: {
    // ...
    logoColorway: "black", // "black" | "navy" | "white"
  },
  // ...
};
```

Setting this one flag swaps every slot above to the matching colorway.
Navy + white are wired but currently alias to black until those PNG sets
are uploaded — see `COLORWAY_STATUS` in `logo-registry.ts`.

---

## Emblem family (square 1:1, no wordmark)

The **emblem** is a separate asset family from the full lockup. Where the
lockup says *who we are*, the emblem is the **repeat-appearance crest** —
favicons, avatars, watermarks, scroll-back buttons, print headers.

> **Rule of thumb:** lockup = first impression. Emblem = every time after.

### Sizes & recommended use

| Size (px) | Slot key          | Use case                                                  | Surface | Loading |
|-----------|-------------------|-----------------------------------------------------------|---------|---------|
| 100       | `emblemFavicon`   | Browser tab, list bullets, chat avatar (32–48px display)  | any     | eager   |
| 200       | `emblemAvatar`    | Nav-collapsed mark, mobile avatar, retina favicon         | any     | eager   |
| 400       | `emblemInline`    | Inline body badges, card crests, OG icon                  | light   | lazy    |
| 800       | `emblemAccent`    | Hero accent, section divider monogram, scroll-back-to-top | any     | lazy    |
| 1200      | `emblemWatermark` | Full-page watermark, splash crest, og-square (1200×1200)  | image   | lazy    |
| 2400      | `emblemPrint`     | Print master, billboard, 5K hero crest                    | any     | lazy    |

### Colorway readiness

| Variant | Black ✅                       | Navy ✅                       | White ✅                       |
|---------|--------------------------------|-------------------------------|--------------------------------|
| 100     | `cmb-emblem-black-100.png`     | `cmb-emblem-navy-100.png`     | `cmb-emblem-white-100.png`     |
| 200     | `cmb-emblem-black-200.png`     | `cmb-emblem-navy-200.png`     | `cmb-emblem-white-200.png`     |
| 400     | `cmb-emblem-black-400.png`     | `cmb-emblem-navy-400.png`     | `cmb-emblem-white-400.png`     |
| 800     | `cmb-emblem-black-800.png`     | `cmb-emblem-navy-800.png`     | `cmb-emblem-white-800.png`     |
| 1200    | `cmb-emblem-black-1200.png`    | `cmb-emblem-navy-1200.png`    | `cmb-emblem-white-1200.png`    |
| 2400    | `cmb-emblem-black-2400.png`    | `cmb-emblem-navy-2400.png`    | `cmb-emblem-white-2400.png`    |

All three colorways × six sizes are now embedded. `EMBLEM_STATUS` reports
`ready` for every colorway and `MASTER_LOGOS` contains zero aliases.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

// Browser auto-picks DPR via srcset; size is the 1x base file
<MasterLogo slot="emblem" size={100}  />          // favicon-style
<MasterLogo slot="emblem" size={400}  />          // inline crest
<MasterLogo slot="emblem" size={1200} colorway="white" /> // dark watermark
```

The `size` prop selects the 1x source; the next two ladder steps are
attached as `2x` / `3x` srcset descriptors so retina screens stay sharp
without downloading the 2400 master on every device.

---

## Tiles family (exploded / deconstructed mark)

The **tiles** are the third asset family — three separated diamond panels
(top-left, top-right, bottom V-notch) with a glossy ribbed metallic
texture. Where the lockup says *who we are* and the emblem is the
*repeat-appearance crest*, the tiles are the **kinetic identity** —
the mark in motion, the mark assembling itself, the mark as architecture.

> **When to use which:**
> - **Lockup** → first impression, nav, footer, marketing hero
> - **Emblem** → favicon, avatar, watermark, scroll-back, repeat appearances
> - **Tiles** → motion sequences, process storytelling, splash reveals,
>   premium watermarks where the kinetic look beats the solid crest

### Sizes & recommended use

| Size (px) | Slot key            | Use case                                                            | Surface | Loading |
|-----------|---------------------|---------------------------------------------------------------------|---------|---------|
| 100       | `tilesFavicon`      | Alt favicon for staging / construction-mode environments            | any     | eager   |
| 200       | `tilesAvatar`       | Team / social avatar where the kinetic look beats the solid crest   | any     | eager   |
| 400       | `tilesAccent`       | Section divider mark — three panels can animate in sequence         | any     | lazy    |
| 800       | `tilesProcess`      | Process / craft pages — one tile per step, animated assembly        | light   | lazy    |
| 1200      | `tilesLoadingHero`  | Loading splash final reveal — tiles fly in and lock into position   | dark    | eager   |
| 2400      | `tilesWatermark`    | Full-page background watermark on premium pages at 6–10% opacity    | image   | lazy    |

### Colorway readiness

| Variant | Black ✅                       | Navy ✅                        | White ✅                       |
|---------|--------------------------------|--------------------------------|--------------------------------|
| 100     | `cmb-tiles-black-100.png`      | `cmb-tiles-navy-100.png`       | `cmb-tiles-white-100.png`      |
| 200     | `cmb-tiles-black-200.png`      | `cmb-tiles-navy-200.png`       | `cmb-tiles-white-200.png`      |
| 400     | `cmb-tiles-black-400.png`      | `cmb-tiles-navy-400.png`       | `cmb-tiles-white-400.png`      |
| 800     | `cmb-tiles-black-800.png`      | `cmb-tiles-navy-800.png`       | `cmb-tiles-white-800.png`      |
| 1200    | `cmb-tiles-black-1200.png`     | `cmb-tiles-navy-1200.png`      | `cmb-tiles-white-1200.png`     |
| 2400    | `cmb-tiles-black-2400.png`     | `cmb-tiles-navy-2400.png`      | `cmb-tiles-white-2400.png`     |

All three colorways × six sizes are now embedded. `TILES_STATUS` reports
`ready` for every colorway and `MASTER_LOGOS` contains zero aliases.
The kinetic identity reveal on the dark splash and any image-surface
watermark now serves the correct white file for contrast.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="tiles" size={400}  />                       // accent / divider
<MasterLogo slot="tiles" size={800}  />                       // process step
<MasterLogo slot="tiles" size={1200} colorway="white" />      // splash / dark
<MasterLogo slot="tiles" size={2400} className="opacity-10" />// watermark
```

The `size` prop selects the 1x source; the registry attaches the next
two ladder steps as `2x` / `3x` srcset descriptors. Same DPR strategy
as the emblem family.

---

## Monogram family (handwritten "MB" signature)

The fourth asset family. Where the lockup is the formal identity, the
emblem is the repeat-appearance crest, and the tiles are the kinetic
identity, the **monogram is the human hand** — "signed personally by
the master builder." Use for closing moments, signatures, certificates,
intimate contexts. Never for nav, hero, or splash.

> **Five-family decision rule:**
> - **Lockup**   → first impression / formal identity (nav, footer, hero)
> - **Emblem**   → repeat-appearance crest (favicon, avatar, watermark)
> - **Tiles**    → kinetic / built-from-pieces (motion, splash, process)
> - **Monogram** → the human hand (signatures, certificates, founder)
> - **Wordmark** → editorial type voice (eyebrows, doc headers, horizontal rails)

### Sizes & recommended use

| Size (px) | Slot key              | Use case                                                            | Surface | Loading |
|-----------|-----------------------|---------------------------------------------------------------------|---------|---------|
| 64        | `monogramFavicon`     | Alt favicon for founder-mode / personal pages                       | any     | eager   |
| 128       | `monogramSignature`   | Email signature footer, quote letter, contract sign-off             | light   | lazy    |
| 256       | `monogramSealAccent`  | About-page founder card, story seal, testimonial attribution        | light   | lazy    |
| 512       | `monogramCertificate` | Warranty / completion certificate seal, project handoff             | light   | lazy    |
| 1024      | `monogramWatermark`   | Premium project case-study watermark (low opacity, signed-work)     | image   | lazy    |

### Colorway readiness

| Variant | Black ✅                          | Navy ✅                          | White ✅                          |
|---------|-----------------------------------|----------------------------------|-----------------------------------|
| 64      | `cmb-mb-monogram-black-64.png`    | `cmb-mb-monogram-navy-64.png`    | `cmb-mb-monogram-white-64.png`    |
| 128     | `cmb-mb-monogram-black-128.png`   | `cmb-mb-monogram-navy-128.png`   | `cmb-mb-monogram-white-128.png`   |
| 256     | `cmb-mb-monogram-black-256.png`   | `cmb-mb-monogram-navy-256.png`   | `cmb-mb-monogram-white-256.png`   |
| 512     | `cmb-mb-monogram-black-512.png`   | `cmb-mb-monogram-navy-512.png`   | `cmb-mb-monogram-white-512.png`   |
| 1024    | `cmb-mb-monogram-black-1024.png`  | `cmb-mb-monogram-navy-1024.png`  | `cmb-mb-monogram-white-1024.png`  |

`MONOGRAM_STATUS` reports `ready` for all three colorways. The monogram
has its own size ladder (no 2400) — it is never a hero asset. The white
monogram is the dark-surface variant for image / dark watermarks.

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="monogram" size={64}   />                    // founder favicon
<MasterLogo slot="monogram" size={128}  />                    // email signature
<MasterLogo slot="monogram" size={256}  />                    // about-page seal
<MasterLogo slot="monogram" size={512}  />                    // certificate seal
<MasterLogo slot="monogram" size={1024} className="opacity-10" /> // watermark
```

---

## Wordmark family (pure typography, no emblem)

The fifth and final asset family. Pure type — "MASTER BUILDERS" stacked
above "— COCHRANE —" with hairline rule. Where the **lockup** stacks the
emblem above this same wordmark, the **wordmark alone** strips the crest
so it can sit in horizontal rails (≥3:1 aspect) without the emblem
dominating. The editorial type voice.

> **When to reach for the wordmark vs. the lockup:**
> - **Lockup** → vertical/square containers, first impression, marketing
> - **Wordmark** → horizontal/inline contexts where the emblem would crowd:
>   section eyebrows, document headers, breadcrumb chips, press kit pages,
>   cinema-bar captions, full-width brand bands.

### Sizes & recommended use

| Size (px) | Slot key            | Use case                                                            | Surface | Loading |
|-----------|---------------------|---------------------------------------------------------------------|---------|---------|
| 200       | `wordmarkInline`    | Inline body wordmark, byline strip, breadcrumb brand chip           | light   | lazy    |
| 400       | `wordmarkSection`   | Section eyebrow above an H2, editorial divider label, modal header  | light   | lazy    |
| 800       | `wordmarkDocument`  | Document/PDF header, quote letter masthead, press kit page header   | light   | lazy    |
| 1200      | `wordmarkBanner`    | Wide hero strip alternative, cinema-bar caption, full-width band    | any     | lazy    |
| 2400      | `wordmarkPrint`     | Print master, large-format banner, billboard wordmark               | any     | lazy    |

### Colorway readiness

| Variant | Black ✅                          | Navy ✅                           | White ✅                          |
|---------|-----------------------------------|-----------------------------------|-----------------------------------|
| 200     | `cmb-wordmark-black-200.png`      | `cmb-wordmark-navy-200.png`       | `cmb-wordmark-white-200.png`      |
| 400     | `cmb-wordmark-black-400.png`      | `cmb-wordmark-navy-400.png`       | `cmb-wordmark-white-400.png`      |
| 800     | `cmb-wordmark-black-800.png`      | `cmb-wordmark-navy-800.png`       | `cmb-wordmark-white-800.png`      |
| 1200    | `cmb-wordmark-black-1200.png`     | `cmb-wordmark-navy-1200.png`      | `cmb-wordmark-white-1200.png`     |
| 2400    | `cmb-wordmark-black-2400.png`     | `cmb-wordmark-navy-2400.png`      | `cmb-wordmark-white-2400.png`     |

`WORDMARK_STATUS` reports `ready` for all three colorways. Matrix is fully
complete — dark-surface wordmarks now serve real white assets instead of
falling back to black. With this round, **every cell in the
five-family × three-colorway matrix is a real binary; the registry
contains zero aliases.**

### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="wordmark" size={200}  />                    // breadcrumb chip
<MasterLogo slot="wordmark" size={400}  />                    // section eyebrow
<MasterLogo slot="wordmark" size={800}  />                    // document header
<MasterLogo slot="wordmark" size={1200} className="w-full" /> // brand band
<MasterLogo slot="wordmark" size={2400} />                    // print master
```

The component sets `width={size}` and `height={Math.round(size/5)}` on
the `<img>` so the ~5:1 aspect ratio of the file is reserved before
the bytes arrive — zero CLS.

### Wordmark Ground variant (drafted plumb-line + base rule)

Sibling treatment to the plain wordmark, **not a replacement**. Same
typography, but framed by an architect's plumb-line on the left and a
horizontal base rule beneath. Reads as **spec-grade / authored** where the
plain wordmark reads as **editorial type**.

> **Plain `wordmark` vs. `wordmarkGround`:**
> - **`wordmark`** → sits *with* surrounding text (inline, eyebrow, breadcrumb, document masthead). Doesn't compete with body copy.
> - **`wordmarkGround`** → **standalone** brand statements that need to feel anchored and authored (chapter openers, project nameplates, deck covers, certificate headers). The plumb + base rule make it read as a stamp, not a label.

#### Sizes & recommended use

| Size (px) | Slot key                | Use case                                                            | Surface | Loading |
|-----------|-------------------------|---------------------------------------------------------------------|---------|---------|
| 200       | `wordmarkGroundInline`  | Specification stamp inline in a spec sheet, drawing-set legend      | light   | lazy    |
| 400       | `wordmarkGroundChapter` | Chapter / case-study opener title block above a long-form section  | light   | lazy    |
| 800       | `wordmarkGroundPlate`   | Project nameplate, "stamped by" plate on warranty / handoff docs   | light   | lazy    |
| 1200      | `wordmarkGroundBand`    | Hero brand band on About / Capabilities — anchors a wide section   | any     | lazy    |
| 2400      | `wordmarkGroundCover`   | Capabilities deck / proposal PDF cover, large-format presentation   | any     | lazy    |

#### Colorway readiness

| Variant | Black ✅                                 | Navy ✅                                  | White ✅                                 |
|---------|------------------------------------------|------------------------------------------|------------------------------------------|
| 200     | `cmb-wordmark-ground-black-200.png`      | `cmb-wordmark-ground-navy-200.png`       | `cmb-wordmark-ground-white-200.png`      |
| 400     | `cmb-wordmark-ground-black-400.png`      | `cmb-wordmark-ground-navy-400.png`       | `cmb-wordmark-ground-white-400.png`      |
| 800     | `cmb-wordmark-ground-black-800.png`      | `cmb-wordmark-ground-navy-800.png`       | `cmb-wordmark-ground-white-800.png`      |
| 1200    | `cmb-wordmark-ground-black-1200.png`     | `cmb-wordmark-ground-navy-1200.png`      | `cmb-wordmark-ground-white-1200.png`     |
| 2400    | `cmb-wordmark-ground-black-2400.png`     | `cmb-wordmark-ground-navy-2400.png`      | `cmb-wordmark-ground-white-2400.png`     |

`WORDMARK_GROUND_STATUS` reports `ready` for all three colorways. **The
entire five-family × three-colorway brand matrix is now embedded with
zero aliases anywhere in the registry.**

#### Render API

```tsx
import MasterLogo from "@/master/brand/MasterLogo";

<MasterLogo slot="wordmarkGround" size={400}  />                    // chapter opener
<MasterLogo slot="wordmarkGround" size={800}  />                    // project plate
<MasterLogo slot="wordmarkGround" size={1200} className="w-full" /> // brand band
<MasterLogo slot="wordmarkGround" size={2400} />                    // deck cover
```

The component reserves a `~3.5:1` CLS box (`width={size}`,
`height={Math.round(size/3.5)}`) — taller than the plain wordmark because
the plumb-line adds vertical artwork.

---

## Perf budget per slot

| Slot          | Max bytes | Why                                         |
|---------------|-----------|---------------------------------------------|
| `nav` mobile  | < 15 KB   | Above the fold on every page, every device. |
| `nav` desktop | < 35 KB   | Same — eager load.                          |
| `footer` *    | < 50 KB   | Below the fold, lazy-loaded.                |
| `hero`        | < 600 KB  | LCP candidate — keep tight.                 |
| `loading`     | < 50 KB   | Splash phase, must be inline-fast.          |
| `og`          | < 400 KB  | Social crawler limits.                      |
| `favicon`     | < 12 KB   | Sent on every cold request.                 |

If a slot exceeds budget, re-export from the master Figma at the recommended
size before adding compression — never just compress harder.

---

## How to add a new slot

1. Add the slot key + metadata to `LOGO_USAGE_MAP` in
   `src/master/brand/logo-registry.ts` (declare its `surface`).
2. Add the slot key to `MasterLogoSlot` union and `SLOT_HEIGHT` in
   `src/master/brand/MasterLogo.tsx`.
3. Add a row to the table above with the file, trigger, surface, and CLS box.
4. Render via `<MasterLogo slot="yourSlot" />` — never an `<img>` direct.
5. Tick `master-logo-rendering` in the remix checklist after verifying.

---

## Browser chrome & PWA pack

A separate concern from the React `<MasterLogo>` system. These flat files
live in `/public/` and are referenced from `index.html` via `<link>` tags
or by the user-agent itself. They use the **navy MB-diamond** (drafted
texture) — the canonical browser-chrome mark — distinct from the wordmark
and lockup families which live in component code.

> **Decision rule:** browser-chrome icons live in `/public/` and are
> referenced by `<link>` tags — **never** through `<MasterLogo>`. Component
> code uses the registry; the browser handshake uses these flat files.

### Full file ladder

13 native sizes covering every modern browser, OS, and PWA spec. Each row
is a real PNG at its declared size — the user agent picks the closest
match instead of scaling, so the diamond stays sharp on every chrome.

| Size  | File                                            | Renders in                                  | Density tier     |
|-------|-------------------------------------------------|---------------------------------------------|------------------|
| ICO   | `favicon.ico`                                   | Legacy IE/Edge, Windows pinned tabs         | universal        |
| 16    | `favicon-16.png`                                | Desktop tab @ 100% zoom                     | tab              |
| 32    | `favicon-32.png`                                | Desktop tab @ retina                        | tab              |
| 48    | `favicon-48.png`                                | Windows taskbar, classic pinned             | OS chrome        |
| 64    | `favicon-64.png`                                | Hi-DPI laptop tab, dock thumbnail           | tab              |
| 96    | `favicon-96.png`                                | Android low-density home, README crest      | mobile chrome    |
| 128   | `favicon-128.png`                               | Chrome Web Store, generic medium            | OS chrome        |
| 144   | `favicon-144.png`                               | Windows Metro / IE11 pinned tile            | OS tile          |
| 152   | `favicon-152.png`                               | iPad home-screen (older iOS)                | iOS springboard  |
| 180   | `apple-touch-icon.png` (also `favicon-180.png`) | iPhone home-screen (Safari iOS)             | iOS springboard  |
| 192   | `android-chrome-192x192.png` (also `favicon-192.png`) | Android home, PWA install prompt      | Android launcher |
| 256   | `favicon-256.png`                               | Hero browser-chrome, OG-square fallback     | premium chrome   |
| 512   | `android-chrome-512x512.png` (also `favicon-512.png`) | PWA splash, maskable adaptive icon source, dark hero | PWA runtime |
|  —    | `site.webmanifest`                              | PWA install metadata, theme + bg color      | browser chrome   |

> **Why dual filenames at 180, 192, and 512?** The spec-named files
> (`apple-touch-icon.png`, `android-chrome-192x192.png`,
> `android-chrome-512x512.png`) are what iOS and Android crawlers look for
> by convention. The `favicon-{size}.png` versions ship the same bytes
> under the unified ladder name so any consumer that prefers that pattern
> can find them. Both names point at the same MB-diamond — pick whichever
> the consumer expects.

### Dark-mode reverse colorway (white MB-diamond)

A second 6-rung ladder in the white reverse colorway, served via
`prefers-color-scheme: dark` media queries. Modern browsers (Safari 15+,
Chrome 91+, Firefox 109+) ask the OS at request time which appearance is
active and pick the matching `<link>` automatically. Browsers without
media-query support ignore the `media` attribute and fall back to the
navy default — graceful degradation, no JS required.

| Size | File                        | Renders in                                  | Density tier     |
|------|-----------------------------|---------------------------------------------|------------------|
| 32   | `favicon-white-32.png`      | Dark-mode desktop tab @ retina              | tab              |
| 64   | `favicon-white-64.png`      | Dark-mode hi-DPI laptop tab                 | tab              |
| 128  | `favicon-white-128.png`     | Dark-mode generic OS chrome                 | OS chrome        |
| 192  | `favicon-white-192.png`     | Dark-mode Android home / install prompt     | Android launcher |
| 256  | `favicon-white-256.png`     | Dark-mode hero favicon, dark email headers  | premium chrome   |
| 512  | `favicon-white-512.png`     | Dark splash, dark transactional templates   | hero             |

**Beyond browser chrome**, the white ladder also serves as the source
artwork for any **dark-surface chrome-style mark** outside the browser:
- Transactional email headers with navy / asphalt backgrounds (use the
  256 or 512 inline as the email's brand mark)
- In-product dark splashes / modals that need a chrome-style diamond
  rather than the full lockup
- Dark social-share OG renders

> **Component-system rule still applies:** in React code, render the
> dark-surface diamond via `<MasterLogo slot="emblem" colorway="white" />`
> when possible — the white favicon ladder exists for the
> `<link>`/email/static contexts where the component system can't reach.

### Wired in `index.html`

```html
<!-- Default colorway: navy MB-diamond -->
<link rel="icon" type="image/x-icon" href="/favicon.ico" />
<link rel="icon" type="image/png" sizes="16x16"   href="/favicon-16.png" />
<link rel="icon" type="image/png" sizes="32x32"   href="/favicon-32.png" />
<link rel="icon" type="image/png" sizes="48x48"   href="/favicon-48.png" />
<link rel="icon" type="image/png" sizes="64x64"   href="/favicon-64.png" />
<link rel="icon" type="image/png" sizes="96x96"   href="/favicon-96.png" />
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-128.png" />
<link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-256.png" />
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<meta name="msapplication-TileImage" content="/favicon-144.png" />
<meta name="msapplication-TileColor" content="#1F2F4D" />

<!-- Dark-mode reverse colorway: white MB-diamond -->
<link rel="icon" type="image/png" sizes="32x32"   href="/favicon-white-32.png"  media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="64x64"   href="/favicon-white-64.png"  media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="128x128" href="/favicon-white-128.png" media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-white-192.png" media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="256x256" href="/favicon-white-256.png" media="(prefers-color-scheme: dark)" />
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-white-512.png" media="(prefers-color-scheme: dark)" />

<link rel="manifest" href="/site.webmanifest" />
```

The `msapplication-TileImage` + `TileColor` pair makes Windows pinned-site
tiles render the navy MB-diamond on a navy field — no generic letter
placeholder.

### Theme color

`<meta name="theme-color" content="#1F2F4D">` (navy) tints the iOS Safari
status-bar and Android Chrome address-bar to the brand navy — the chrome
becomes part of the brand surface instead of a neutral border. Matches
the manifest's `theme_color`.

### Manifest identity (`site.webmanifest`)

- `name`: "Cochrane Master Builders" · `short_name`: "CMB"
- `theme_color`: `#1F2F4D` (navy — matches `<meta name="theme-color">` and `msapplication-TileColor`)
- `background_color`: `#FFFFFF` (white — splash background while the app boots)
- `display`: `standalone` · `start_url`: `/` · `scope`: `/`
- Icons declared at 96, 128, 144, 152, 192, 256, 512 with `purpose: "any"`;
  512 is also exposed as `purpose: "maskable"` for adaptive Android icons.

> **No service worker.** This pack delivers installability and crisp
> browser chrome without registering a service worker — avoiding the
> stale-content and navigation-interference issues that service workers
> cause inside Lovable's preview iframe. Add a SW only if true offline
> support becomes a requirement.

### Legacy files

`/public/favicon-cmb.png` and `/public/og-image-cmb.png` remain in place;
the slot-map's `favicon` and `og` rows above still reference them as
transactional email + social-share fallbacks. Migrate those to the new
MB-diamond pack (likely using `favicon-256.png` or `favicon-white-256.png`
for email depending on template surface, and a fresh 1200×630 OG render)
in a separate pass.

---

## Social share & profile pack

A complete 10-file pack lives in `/public/share/`. Five platform-sized canvases
× two background treatments (`transparent`, `navybg`). Consumed via the typed
registry in [`share-pack.ts`](./share-pack.ts).

| File | Dimensions | Consumer | When to use |
|---|---|---|---|
| `og-1200x630-navybg.jpg` | 1200×630 | Facebook, Slack, iMessage, LinkedIn, default OG/Twitter | **Default share preview.** Wired to `og:image` + `twitter:image` in `index.html`. |
| `og-1200x630-transparent.png` | 1200×630 | Email signatures, brand-kit downloads, layered comps | When the destination surface is already navy/dark and the baked bg would clash. |
| `twitter-1200x600-navybg.jpg` | 1200×600 | Twitter alternate 2:1 ratio, generic 2:1 share | Twitter cards or any UI requesting a 2:1 image. |
| `twitter-1200x600-transparent.png` | 1200×600 | Composable banners | When the designer drops the lockup onto a custom backdrop. |
| `linkedin-1584x396-navybg.jpg` | 1584×396 | LinkedIn company-page cover | Upload as the page banner / hero. |
| `linkedin-1584x396-transparent.png` | 1584×396 | Custom LinkedIn hero comps | Designer overlay use only. |
| `instagram-1080x1080-navybg.jpg` | 1080×1080 | IG feed post, FB square share, generic 1:1 social | Default 1:1 social post. |
| `instagram-1080x1080-transparent.png` | 1080×1080 | IG carousels / Stories with custom backdrops | When other slides set the surface color. |
| `profile-400x400-navybg.jpg` | 400×400 | Twitter / IG / LinkedIn / GitHub / Substack profile photo | Set as profile pic everywhere — round-crops cleanly. |
| `profile-400x400-transparent.png` | 400×400 | Brand-kit downloads, embed badges, dark-mode avatars | Use behind a custom backdrop or where transparency is required. |

**Decision rule:** default to `-navybg` for any external surface (share
previews, profile photos, banners, anywhere a third-party renders the asset
on its own chrome). Reach for `-transparent` only when **you control the
destination background** or the consumer composites onto its own surface.

Programmatic access:
```ts
import { getShareAsset } from "@/master/brand/share-pack";
const ogUrl = getShareAsset("og");          // → /share/og-1200x630-navybg.jpg
const ogAlt = getShareAsset("og", "transparent");
```

---

## Cross-references

- **Brand bible (start here):** [`BRAND_BIBLE.md`](./BRAND_BIBLE.md)
- Brand-kit page: [`/brand`](../../pages/Brand.tsx) — internal showcase + downloads
- Component: [`MasterLogo.tsx`](./MasterLogo.tsx)
- Registry: [`logo-registry.ts`](./logo-registry.ts) — includes `MASTER_BOARDS`
- Share pack: [`share-pack.ts`](./share-pack.ts)
- Usage rules: [`LOGO_USAGE.md`](./LOGO_USAGE.md)
- Brand identity: [`identity.ts`](./identity.ts)
- Source archive: [`../assets/logo/source/`](../assets/logo/source/)
- Showcase boards: [`../assets/logo/boards/`](../assets/logo/boards/)
- Remix checklist: [`../checklist.ts`](../checklist.ts)
