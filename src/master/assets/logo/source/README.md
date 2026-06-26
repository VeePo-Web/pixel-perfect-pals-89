# Master Source Artwork — DO NOT EDIT

This folder holds the **two canonical master compositions** every cropped, recolored, or sized export in `src/master/assets/logo/` is derived from.

| File | Composition | Notes |
|---|---|---|
| `cmb-source-lockup-no-ground.png` | Full lockup: emblem + wordmark, no ground rule | **Primary master.** Source of `cmb-{nav,footer,hero,large,medium,small}*` exports across all three colorways. |
| `cmb-source-lockup-with-ground.png` | Full lockup: emblem + wordmark + vertical plumb-line + horizontal base rule | Source of the `cmb-wordmark-ground-*` family. The drafted-rule treatment is the architect's plumb mark — reads as spec-grade. |

## Rules

- **Never `<img src="...source/...">`** — these are NOT shipped to the browser. They are bundled (Vite) only when explicitly imported, and currently NO surface imports them.
- **Never edit in place.** If you need a new variant (different crop, different colorway, different surface treatment), re-derive from these and add the export to `src/master/assets/logo/` with the canonical naming convention (`cmb-{family}-{colorway}-{size}.png`).
- **Archive-grade.** If these are ever lost, the brand cannot be regenerated without commissioning new artwork. They are the only files in this repo treated as immutable.

See [`../../brand/BRAND_BIBLE.md`](../../brand/BRAND_BIBLE.md) for the canonical brand contract.
