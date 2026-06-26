# Cochrane Master Builders — Logo Usage Map

The master logo files are pre-cropped for specific surfaces and ship in
three official **colorways** — `black`, `navy`, `white`. Use the
`<MasterLogo slot="..." />` component from `@/master` — never import a PNG
directly into a page or component.

## Slot → file map

| Slot              | File                          | Where it appears                                |
| ----------------- | ----------------------------- | ----------------------------------------------- |
| `nav` (desktop)   | `cmb-{colorway}-nav-large.png`     | Top nav at ≥1024px                         |
| `nav` (tablet)    | `cmb-{colorway}-nav-medium.png`    | Top nav at 640–1023px                      |
| `nav` (mobile)    | `cmb-{colorway}-nav-small.png`     | Top nav at <640px                          |
| `footer` (desktop)| `cmb-{colorway}-footer-large.png`  | Footer brand block at ≥1024px              |
| `footer` (tablet) | `cmb-{colorway}-footer-medium.png` | Footer brand block at 768–1023px           |
| `footer` (mobile) | `cmb-{colorway}-footer-small.png`  | Footer brand block at <768px               |
| `loading`         | `cmb-{colorway}-small.png`         | Loading / splash screens                   |
| `hero`            | `cmb-{colorway}-hero.png`          | Hero watermarks, splash moments            |
| `large`           | `cmb-{colorway}-large.png`         | About-page brand monument                  |
| `medium`          | `cmb-{colorway}-medium.png`        | Booking modal left rail, 404 page          |
| `small`           | `cmb-{colorway}-small.png`         | Compact lockups                            |
| `og` (meta)       | `/public/og-image-cmb.png`         | Open Graph + Twitter share card            |
| `favicon` (meta)  | `/public/favicon-cmb.png`          | Browser tab + crawler favicon              |

The responsive nav and footer slots auto-pick the right size variant via
`<picture>` + `<source media>` so the browser only downloads what it needs.

## Colorway system

Three colorways ship in the master template:

| Colorway | Use it when                                              |
| -------- | -------------------------------------------------------- |
| `black`  | Architectural / serious. Default. Reads as authority.    |
| `navy`   | Editorial / refined. Softer than black on warm cream.    |
| `white`  | Reverse colorway — required for any dark surface.        |

### Per-trade default

Set once in `src/config/trade.config.ts`:

```ts
identity: {
  // ...
  logoColorway: "navy", // "black" | "navy" | "white"
}
```

### Per-instance override

```tsx
<MasterLogo slot="hero" colorway="white" /> // override for one surface
```

### Auto-recommendation

`<MasterLogo>` calls `recommendedColorwayForSlot(slot, tradeColorway)` when
no `colorway` prop is passed. Logic:

| Slot surface | Logic                                              |
| ------------ | -------------------------------------------------- |
| `light` (nav, footer, about, modal) | trade's chosen ink (white falls back to black) |
| `dark` (loading, dark sections)     | force `white`                                  |
| `image` (hero, OG)                  | default `white` for safety                     |
| `any` (favicon)                     | trade's chosen colorway                        |

### Recommended colorway per common surface

| Surface                     | Recommended    | Why                                       |
| --------------------------- | -------------- | ----------------------------------------- |
| Nav on bone background      | `navy`         | Softer than black on warm cream           |
| Nav on pure white           | `black`/`navy` | Both hold up; navy is more refined        |
| Footer (paper surface)      | matches nav    | Consistency top → bottom                  |
| Hero watermark over photo   | `white`        | Survives any underlying image             |
| Loading screen (dark)       | `white`        | Required — only readable colorway         |
| Booking modal left rail     | `navy`         | Editorial calm                            |
| Dark sections               | `white`        | Required                                  |
| OG / social share           | `navy`         | Stands out in white feeds (LinkedIn/FB)   |
| Favicon                     | `black`        | Maximum legibility at 16–32px             |
| Email header                | `navy`         | Email clients render navy more reliably   |

## Hard rules — never violated

1. **Never recolor.** Use one of the three official colorways. Do not
   tint, gradient, or invert outside the supplied files.
2. **Never stretch.** Always preserve aspect ratio. The `<MasterLogo>`
   component enforces `object-contain`.
3. **Clear space.** Allow at least 1× the height of the M-bar of empty
   space around the mark on every side.
4. **No effects.** No drop shadows, no glow, no parallax tilt, no hover
   scale > 1.02.
5. **No text overlays.** Never place type on top of the lockup.
6. **Pick by contrast, not preference.** A dark hero photo demands the
   `white` colorway, no matter what the trade's default is.

## Asset status

See `COLORWAY_STATUS` in `logo-registry.ts`. Pending colorways alias to
the black files at runtime so the build never breaks while assets land.
