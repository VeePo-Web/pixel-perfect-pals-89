# AI IMAGE RULES — How every CMB site gets its photography

## Hard rules

1. **No faces.** Ever.
2. **No people.** Not even hands holding tools — that creeps into uncanny territory at AI scale.
3. **Ultra-realistic.** No illustration, no 3D-render look, no stylization. If it could pass for an iPhone Pro shot, it's right.
4. **Calm, residential, controlled.** Soft natural light, generous negative space, neutral palettes.
5. **Trade-true.** A roofing site shows roofs; a plumbing site shows pipes/fixtures; a drywall site shows walls. No generic "construction" stock.

## Recommended models

- `google/gemini-3-pro-image-preview` — best fidelity, slower
- `google/gemini-3.1-flash-image-preview` — fast with pro-level quality (default for most slots)
- `google/gemini-2.5-flash-image` — fastest, good for ambient backdrops

## Prompt patterns that work

### Hero

> Ultra-realistic photograph of a [TRADE-SPECIFIC SUBJECT], shot at golden hour through a north-facing window, shallow depth of field, soft natural light, calm residential interior, generous negative space on the right for headline overlay, no people, no faces, photorealistic, 35mm film grain.

### Before/after

> Two-frame split: left frame shows [PROBLEM STATE — describe specifically], right frame shows [FINISHED STATE], same camera angle, same lighting, same room, photorealistic interior photography, no people, no faces.

### Ambient backdrop

> Extreme close-up macro of [MATERIAL / TEXTURE specific to trade], shallow depth of field, cinematic blur, soft warm light from upper left, photorealistic, no people.

### Detail shot

> [TOOL OR MATERIAL] resting on a [SURFACE], top-down or 3/4 view, soft window light, residential setting, photorealistic, no hands, no faces, generous negative space.

## What NOT to write in prompts

- "team of contractors" → triggers people
- "happy customer" → triggers faces
- "professional craftsman at work" → triggers hands and bodies
- "showroom" → drifts into corporate stock
- "luxury" → drifts into wrong aesthetic

## Where images live

- `src/assets/<trade-slug>/` — page-specific imagery
- Imported via ES6 `import heroHome from "@/assets/<trade>/hero-home.jpg"`

## Auto-checks on `/remix`

The dashboard scans:
- Filenames in `src/assets/` for words like `person`, `team`, `face`, `hands`, `worker`, `customer`
- `alt` attributes in TSX files for the same words

Any hit = red flag on the checklist.
