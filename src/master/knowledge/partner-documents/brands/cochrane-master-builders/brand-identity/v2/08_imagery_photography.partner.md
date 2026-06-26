# 08 — Imagery & Photography Authority (CMB)

> Photography is *evidence*. Every image must show real material, real work, or real place. If it could be from any contractor in North America, it fails.

---

## Allowed subjects

- Real materials (shingles, tile, lumber, concrete, copper flashing) at honest scale.
- Real homes / acreages in or near Cochrane (with permission).
- In-progress process detail: framing, flashing, tile setting, formwork, drainage trenches.
- Hands working — gloves, tools, measurement, alignment.
- Site context: trucks parked at a site (not staged), tools laid out, a finished walk-around.
- Architectural detail crops at warm natural light.

## Banned subjects

- Stock smiling-family photos.
- Stock contractor truck photos.
- Stock handshake / "team thumbs up" / hardhat-pose photos.
- AI-generated faces. Any AI-generated human.
- Glossy hero composites with sun-flares, rim-lights, or marketing overlays.
- Drone cinematography that doesn't actually show CMB work.
- Lifestyle imagery that implies an outcome we didn't deliver.
- Pets unless they were on the actual site.

## Composition rules

- Shoot or select in **landscape 3:2** for hero, **square 1:1** for cards.
- Warm natural light only — no flash, no studio strobe, no HDR.
- Negative space respected — at least 25% of frame breathing room.
- Subject grounded — horizon level, no Dutch tilts, no fish-eye.

## Per-cluster main visual object (from upload §6 Step 5)

| Cluster | Main visual object |
|---------|-------------------|
| Roofing / Exterior | Roofline detail, flashing crop, truss line |
| Bathrooms / Interiors | Tile detail, finished suite vignette, fixture crop |
| Basements / Suites | Finished suite, egress window, sound-isolation detail |
| Concrete / Foundations | Concrete formwork, pour, finished slab edge |
| Decks / Landscaping | Deck framing, finished outdoor space, plant detail |
| Flooring / Tile | Tile setting, joint alignment, finished floor crop |
| Mechanical / Systems | Duct diagram, equipment install, register detail |
| Commercial / TI | Tenant fit-out, finished retail / office space |
| Handyman / Repairs | Hands working, tool layout, before/after pair |

## Image technical contract

| Property | Value |
|----------|-------|
| Format | AVIF primary, WebP fallback, JPG last |
| Hero size | ≤ 180 KB |
| Card size | ≤ 80 KB |
| `srcset` | 400 / 800 / 1200 / 1600 widths |
| `sizes` attribute | Required on every responsive image |
| `loading` | `eager` for hero only; `lazy` for everything below fold |
| `decoding` | `async` everywhere |
| Alt text | Specific, names the subject + cluster context. Banned: "image", "photo", "picture" |

## Honest Proof Framework (when imagery isn't yet available)

```
<EmptyProof>
  <Eyebrow>Honest Proof</Eyebrow>
  <H3>We're collecting documentation for this service.</H3>
  <Body>
    Until we publish a project here, here's what we'll show when we do:
    a scope summary, the hidden-work decisions we made, the material spec,
    and a final walkthrough photo.
  </Body>
</EmptyProof>
```

This is the **only** acceptable substitute for missing project imagery.

## Pass/Fail audit

- [ ] No stock-photo file in `src/assets/`. Reverse-image-search any uncertain hero.
- [ ] Every `<img>` has specific alt text. Grep: `rg -n "alt=\"\"|alt=\"image\"|alt=\"photo\"" src/`
- [ ] Every `<img>` has `sizes` and `srcset`. Grep audit.
- [ ] Hero ≤ 180 KB on any route (Network tab).
- [ ] No AI-generated humans.
- [ ] Empty proof slots use the Honest Proof Framework, not placeholders.
