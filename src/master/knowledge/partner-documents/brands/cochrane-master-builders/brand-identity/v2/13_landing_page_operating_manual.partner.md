---
doc: 13_landing_page_operating_manual
brand: cochrane-master-builders
authority_set: cmb-master-style-guide-v2.0
status: active
priority: 5
scope: every CMB landing page (homepage, service hub, service detail, process, service-area)
governed_by:
  - 01_brand_identity_north_star.partner.md
  - 09_voice_messaging_lexicon.partner.md
  - 11_performance_accessibility_governance.partner.md
  - 12_landing_page_style_guide_persona.partner.md
extends:
  - 04_typography_authority.partner.md
  - 05_spacing_grid_layout.partner.md
  - 06_components_authority.partner.md
---

# CMB Landing Page Operating Manual (v2.0)

The concrete, prescriptive translation of the **Landing Page Style Guide Persona** (file 12) into typography, spacing, and section-layout decisions. Every CMB landing page is built — and audited — against this manual.

This is not a philosophy doc. The persona (12) is the philosophy. This is the **operating manual**: tokens, tables, archetypes, decision rules, and the auditor grep bundle.

---

## 1. Purpose & Priority

### 1.1 What this manual decides
- Which typographic role and size every block of text takes.
- How much space sits between every block, section, and edge.
- Which section archetype a given content goal must use.
- When a cluster overlay is allowed to deviate, and how far.

### 1.2 Conflict resolution (locked)

When this manual collides with another v2 doc, the higher-priority doc wins. The order is:

```
01 north star  >  09 voice  >  11 performance/a11y  >  12 persona  >  13 (this)  >  component code
```

Practical examples:
- Persona says "let the headline breathe across two lines"; voice says the line is banned. → Rewrite the headline.
- This manual says "py-48"; perf doc would force a CLS bust on a specific section. → Reduce padding to the next step that fixes CLS, never grow.
- Component code prefers a different padding step. → Update the component to match this manual; do not edit the manual.

### 1.3 Hard floors (inherited, never overridden by this manual)
- Min text size: **13px**.
- Min interactive target: **48×48px**.
- Min contrast: **AA** (4.5 body, 3 large).
- Max LCP image: **180KB** AVIF/WebP.
- Reduced-motion users get **no transforms, no parallax**.
- Banned word list from `09` is absolute.

---

## 2. Typography Authority Extension

Extends `04_typography_authority.partner.md` with the per-archetype, per-role decisions the persona implies.

### 2.1 Type families (locked)
- **Display:** Space Grotesk — weights 300, 400, 500. Used for eyebrow, H1–H4, large numerals.
- **Body:** Jost — weights 300, 400, 500. Used for lede, body, caption, micro, UI labels.
- **Numerals:** Always tabular (`font-feature-settings: "tnum" 1`) for prices, ranges, durations, percentages.
- Never use italics for emphasis. Never use all-caps body. Never use a third family.

### 2.2 Modular scale (clamp-based, fluid 390 → 1920)

| Role | Token | Min (390px) | Max (1920px) | Line-height | Tracking | Weight | Max measure |
|------|-------|------------:|-------------:|------------:|---------:|-------:|------------:|
| Display XL (hero only) | `--ts-display-xl` | `clamp(2.75rem, 4.6vw + 1rem, 6.5rem)` | 104px | 0.95 | -0.02em | 300 | 18ch |
| Display L (manifesto) | `--ts-display-l` | `clamp(2.25rem, 3.4vw + 1rem, 4.75rem)` | 76px | 1.00 | -0.018em | 300 | 22ch |
| H1 (page title) | `--ts-h1` | `clamp(2rem, 2.4vw + 1rem, 3.5rem)` | 56px | 1.05 | -0.015em | 400 | 26ch |
| H2 (section title) | `--ts-h2` | `clamp(1.625rem, 1.6vw + 1rem, 2.5rem)` | 40px | 1.10 | -0.012em | 400 | 32ch |
| H3 (block title) | `--ts-h3` | `clamp(1.25rem, 0.9vw + 1rem, 1.75rem)` | 28px | 1.20 | -0.008em | 400 | 38ch |
| H4 (sub-block) | `--ts-h4` | `clamp(1.125rem, 0.4vw + 1rem, 1.375rem)` | 22px | 1.30 | -0.005em | 500 | 44ch |
| Eyebrow | `--ts-eyebrow` | 12px | 13px | 1.20 | +0.16em (uppercase) | 500 | 28ch |
| Lede | `--ts-lede` | `clamp(1.0625rem, 0.5vw + 0.875rem, 1.375rem)` | 22px | 1.55 | 0 | 300 | 56ch |
| Body | `--ts-body` | 16px | 17px | 1.70 | 0 | 400 | 68ch |
| Caption | `--ts-caption` | 14px | 14px | 1.55 | 0 | 400 | 60ch |
| Micro / UI label | `--ts-micro` | 13px | 13px | 1.40 | +0.04em | 500 | 40ch |

Hard rules:
- Never go below `--ts-micro` (13px).
- Display XL is **only** allowed in a hero archetype, **once per page**.
- H1 appears **once per page**. (See `11` audit.)
- Eyebrow always uppercase, always tracked +0.16em, always above an H1/H2/Display.
- Body line-height locked at 1.7 (memory: typography legibility).
- Max measure is enforced via `max-width: <ch>` on the text element, not the container.

### 2.3 Decision table — which role does this text take?

| Content goal | Role |
|---|---|
| Site-defining promise on homepage hero | Display XL |
| Manifesto-style single-sentence belief | Display L |
| Service hub or process page title | H1 |
| Each major section heading on a landing page | H2 |
| Card or block heading inside a grid | H3 |
| Sub-step inside a process or pricing block | H4 |
| Pre-headline category cue ("Roofing", "Process", "Cochrane") | Eyebrow |
| One-paragraph framing under H1/H2 | Lede |
| Long-form prose, FAQ answers | Body |
| Image credits, footnotes, disclosures, "Last updated" | Caption |
| Form labels, badge text, tab labels | Micro |

### 2.4 Bans
- No `text-transform: uppercase` on body, lede, or H3+ headings (eyebrow + micro labels only).
- No italics. Italic = banned for emphasis; allowed only for proper-noun titles inside long prose.
- No drop-shadows on text except the hero showroom-spotlight overlay defined in memory.
- No font-size below 13px. No font-weight above 500 anywhere.
- No mixed-case eyebrow.

### 2.5 Pass/Fail (typography)
- [ ] Every page has exactly one H1 and at most one Display-XL.
- [ ] Every H1/H2/Display has an eyebrow.
- [ ] No element renders below 13px on any breakpoint.
- [ ] Body elements have a `max-width` of ≤ 68ch.
- [ ] Tabular numerals enabled for every price, range, duration, percentage.

---

## 3. Spacing Grid & Rhythm

Extends `05_spacing_grid_layout.partner.md`.

### 3.1 Base unit
- **8pt grid.** All spacing tokens are multiples of 8 (Tailwind `1` = 4, so use even steps: 2, 4, 6, 8, 12, 16, 20, 24, 32, 48, 64).
- Half-steps (multiples of 4) only allowed inside compound components (button padding, form input padding).

### 3.2 Spacing tokens

| Token | px | Use |
|---|---:|---|
| `space-2xs` | 4 | Inline gap inside a label/badge |
| `space-xs` | 8 | Adjacent UI elements (icon + label) |
| `space-sm` | 16 | Between paragraphs, list items |
| `space-md` | 24 | Between an eyebrow and its headline; between headline and lede |
| `space-lg` | 40 | Between a headline-stack and its body content |
| `space-xl` | 64 | Between two blocks inside one section |
| `space-2xl` | 96 | Between sub-sections inside a long section |
| `space-3xl` | 128 | Section padding (mobile) |
| `space-4xl` | 192 | Section padding (desktop) |
| `space-5xl` | 256 | Hero / manifesto section padding (desktop) |

### 3.3 Section padding by archetype × breakpoint

| Archetype | 390 (mobile) | 768 (tablet) | 1024+ (desktop) |
|---|---|---|---|
| Hero | py-32 (128) | py-40 (160) | py-64 (256) |
| Manifesto | py-32 | py-40 | py-56 (224) |
| Proof Strip | py-16 (64) | py-20 (80) | py-24 (96) |
| Grid-of-Three | py-24 (96) | py-32 | py-48 (192) |
| Long-Read | py-24 | py-32 | py-48 |
| Editorial Image Slab | py-0 (full-bleed) | py-0 | py-0 |
| Process Steps | py-24 | py-32 | py-48 |
| Pricing | py-24 | py-32 | py-48 |
| Testimonial Quiet-Block | py-32 | py-40 | py-56 |
| FAQ | py-24 | py-32 | py-40 (160) |
| Closing CTA | py-32 | py-40 | py-56 |

### 3.4 Container max-widths

| Container | Max width | Use |
|---|---:|---|
| `container-prose` | 68ch | Long-form body, FAQ answers |
| `container-narrow` | 760px | Manifesto, testimonial, lede stacks |
| `container-default` | 1200px | Standard section frame |
| `container-wide` | 1440px | Grids, pricing, process steps |
| `container-full` | 100vw | Editorial image slab, hero |

Side gutters (clamp): `clamp(20px, 4vw, 64px)` on every container except `container-full`.

### 3.5 "Breath" mapping (persona cue → spacing token)

The persona repeatedly invokes "breath," "silence around the line," "the hush." Translate as:

| Persona cue | Token |
|---|---|
| "Whisper" / "hush" | `space-5xl` above + below the element |
| "Breath" | `space-4xl` above + below the element |
| "Beat" | `space-2xl` above + below the element |
| "Pulse" | `space-xl` above + below the element |
| "Tight" | `space-md` above + below the element |

If the persona text says "let the line breathe," default to `space-4xl` unless the section archetype overrides.

### 3.6 Pass/Fail (spacing)
- [ ] Every section uses one of the archetype paddings in 3.3 — no ad-hoc values.
- [ ] No container exceeds its declared max-width at 1920px.
- [ ] Side gutters never collapse below 20px on mobile.
- [ ] Inter-block gaps inside a section are `space-xl` or `space-2xl` — never less, never more.

---

## 4. Section Layout Playbook

The locked archetype catalog. **Every landing-page section must be one of these.** New archetypes require a PR to this file.

### 4.1 Archetype: Hero

```
+------------------------------------------------------+
| EYEBROW                                              |
|                                                      |
| Display-XL headline (≤ 18ch, may wrap to 2 lines)    |
|                                                      |
| Lede paragraph (≤ 56ch)                              |
|                                                      |
| [ Primary CTA ]   secondary link →                   |
+------------------------------------------------------+
| Full-bleed editorial image / video below or behind   |
+------------------------------------------------------+
```

- Tokens: `container-full` outer, `container-default` inner. `py-64` desktop / `py-32` mobile.
- Required: eyebrow, Display-XL, lede, primary CTA. Secondary link optional.
- One per page. Never two.
- Mobile collapse: image moves above text; CTA becomes full-width.

### 4.2 Archetype: Manifesto

Single-sentence belief, centered, generous breath above and below.
- Tokens: `container-narrow`, `py-56` desktop. Display-L. No CTA.
- Used at most twice per landing page.

### 4.3 Archetype: Proof Strip

Logos, stat counters, or short trust signals in a single horizontal row.
- Tokens: `container-default`, `py-24` desktop. H4 captions.
- Mobile collapse: 2-column grid; never a carousel.

### 4.4 Archetype: Grid-of-Three

Three peer cards (services, benefits, principles).
- Tokens: `container-wide`, `py-48` desktop. H3 headings, body paragraphs.
- Mobile collapse: 1 column with `space-xl` between cards.

### 4.5 Archetype: Long-Read

Editorial paragraph block with one inline image.
- Tokens: `container-prose`, `py-48` desktop. Lede then body.
- Hard rule: paragraphs never exceed 68ch.

### 4.6 Archetype: Editorial Image Slab

Full-bleed image with optional centered caption overlay.
- Tokens: `container-full`, `py-0`. Caption uses `--ts-caption` over a 30% asphalt scrim.
- Required: gradient feather (memory: visual-edge-refinement).

### 4.7 Archetype: Process Steps

Numbered vertical sequence (3–6 steps) with H3 step titles + body.
- Tokens: `container-default`, `py-48`. Tabular numerals for step numbers.
- Mobile collapse: numbers stay left-aligned, never centered.

### 4.8 Archetype: Pricing

Range cards with drivers + assumptions (per `06_components_authority`).
- Tokens: `container-wide`, `py-48`. H3 card titles, tabular numerals.
- Required: every price is a range, every range cites at least 2 drivers.

### 4.9 Archetype: Testimonial Quiet-Block

Single quote, attribution beneath.
- Tokens: `container-narrow`, `py-56`. Display-L for the quote, micro for attribution.
- No avatars. No stars. No carousels.

### 4.10 Archetype: FAQ

Accordion list of questions.
- Tokens: `container-prose`, `py-40` desktop. H3 question, body answer.
- First two open by default; rest collapsed.

### 4.11 Archetype: Closing CTA

Final conversion stack.
- Tokens: `container-narrow`, `py-56`. H2 + lede + primary CTA.
- Always present, always last, always above the footer.

### 4.12 Locked landing-page composition

Order is locked. Optional sections in [brackets].

```
Hero
[ Proof Strip ]
Manifesto
Grid-of-Three (services / benefits)
[ Editorial Image Slab ]
Long-Read or Process Steps
Pricing
[ Testimonial Quiet-Block ]
FAQ
Closing CTA
```

### 4.13 Pass/Fail (layout)
- [ ] Every section maps to exactly one archetype above.
- [ ] Order matches the locked composition (with allowed optionals).
- [ ] No two heroes, no carousels, no avatars, no star ratings.
- [ ] Every page ends with a Closing CTA directly above the footer.

---

## 5. Decision Rules

When two valid choices exist, apply these rules in order. They are derived directly from the persona.

1. **Breath beats density.** If a section feels crowded, increase padding before reducing content.
2. **Silence beats decoration.** Remove a divider before adding one.
3. **One accent per viewport.** Copper appears at most once per visible viewport — as a CTA, an underline, or a numeral, never two at once.
4. **Editorial over UI.** Prefer left-aligned long-measure text to centered short-measure text.
5. **Tabular over proportional.** Any numeric range, price, or percentage uses tabular numerals.
6. **Range over single number.** Prices are always ranges with drivers; never a single number.
7. **Eyebrow over icon.** Use an eyebrow string before reaching for a category icon.
8. **Plain over clever.** When the voice doc bans a phrase, rewrite — do not stylize around the ban.
9. **Mobile decides minimums.** Any spacing or type decision is validated at 390px first, then scaled up.
10. **Reduced-motion is the baseline.** Design the static frame first; animation is an enhancement, never a load-bearing element.
11. **Image earns its place.** An editorial image must replace a paragraph, not accompany one.
12. **Local proof beats stock proof.** A real Cochrane community name outranks a generic testimonial.
13. **Numerals carry weight.** Display-sized numerals are allowed once per section as visual anchors.
14. **Defer to the cluster overlay only for color.** Type and spacing never change per cluster.
15. **When in doubt, cut.** Removing a section is always allowed; adding a section requires this manual to be updated.

---

## 6. Per-Cluster Overrides

Cluster overlays live in `03_color_authority` (Roofing, Concrete, Framing, Finishing, Site Services, etc.). What clusters **may** override:

- Accent hue swap (within the approved overlay map).
- Editorial image subject (within the approved imagery rules in `08`).

What clusters **may not** override:

- Typography scale or family.
- Spacing tokens or section padding.
- Section archetypes or composition order.
- Voice or banned-word list.

Any cluster page that needs to deviate from typography, spacing, or layout must propose a change to **this** manual via a versioned PR.

---

## 7. Worked Examples

### 7.1 Service Hub landing page (e.g. "Roofing Services in Cochrane")

| Order | Section | Archetype | Tokens |
|---|---|---|---|
| 1 | Hero | Hero | container-full · py-64 · Display-XL · eyebrow "Roofing" · lede 42ch |
| 2 | Trust signals | Proof Strip | container-default · py-24 · H4 captions |
| 3 | "Strong roofs for those who come after us." | Manifesto | container-narrow · py-56 · Display-L |
| 4 | Service categories | Grid-of-Three | container-wide · py-48 · H3 cards |
| 5 | Editorial roof macro | Editorial Image Slab | container-full · py-0 · caption micro |
| 6 | How we work | Process Steps | container-default · py-48 · 5 H3 steps |
| 7 | Pricing ranges | Pricing | container-wide · py-48 · 3 range cards |
| 8 | FAQ | FAQ | container-prose · py-40 |
| 9 | Closing CTA | Closing CTA | container-narrow · py-56 |

### 7.2 Process page

| Order | Section | Archetype | Tokens |
|---|---|---|---|
| 1 | Hero | Hero | container-full · py-64 · eyebrow "Process" |
| 2 | Manifesto | Manifesto | container-narrow · py-56 |
| 3 | Steps | Process Steps | container-default · py-48 · 6 H3 steps |
| 4 | Long-read context | Long-Read | container-prose · py-48 |
| 5 | FAQ | FAQ | container-prose · py-40 |
| 6 | Closing CTA | Closing CTA | container-narrow · py-56 |

### 7.3 Service-Area page (e.g. "Bearspaw")

| Order | Section | Archetype | Tokens |
|---|---|---|---|
| 1 | Hero | Hero | container-full · py-64 · eyebrow "Bearspaw" |
| 2 | Local proof strip | Proof Strip | container-default · py-24 |
| 3 | Manifesto | Manifesto | container-narrow · py-56 |
| 4 | Services available locally | Grid-of-Three | container-wide · py-48 |
| 5 | Editorial local image | Editorial Image Slab | container-full · py-0 |
| 6 | Pricing ranges | Pricing | container-wide · py-48 |
| 7 | Testimonial | Testimonial Quiet-Block | container-narrow · py-56 |
| 8 | FAQ | FAQ | container-prose · py-40 |
| 9 | Closing CTA | Closing CTA | container-narrow · py-56 |

---

## 8. Pass/Fail Audit Checklist (25 items)

Run before any landing page ships. Any "Fail" blocks merge.

**Typography**
- [ ] Exactly one H1 per page.
- [ ] At most one Display-XL per page (hero only).
- [ ] Every H1/H2/Display has an eyebrow above it.
- [ ] No font-size below 13px at any breakpoint.
- [ ] No `italic` on body or headings.
- [ ] No `uppercase` outside eyebrow / micro labels.
- [ ] Body text has `max-width: ≤ 68ch`.
- [ ] All numerals in prices/ranges use tabular figures.

**Spacing**
- [ ] Every section uses an archetype padding from §3.3.
- [ ] Side gutters ≥ 20px on mobile.
- [ ] Inter-block gaps inside sections are `space-xl` or `space-2xl`.
- [ ] No container exceeds its declared max-width at 1920px.

**Layout**
- [ ] Every section maps to one archetype in §4.
- [ ] Composition order matches §4.12.
- [ ] Closing CTA is the last section before the footer.
- [ ] No carousels, no avatars, no star ratings.
- [ ] Editorial image slabs include the asphalt/30 gradient feather.

**Voice & content**
- [ ] No banned word from `09` appears anywhere.
- [ ] Every price is a range with ≥ 2 drivers.
- [ ] Every CTA verb is a plain action ("Book a visit", "Get a range", "See process").

**Performance & a11y**
- [ ] Hero image ≤ 180KB AVIF/WebP, with `width`/`height` set.
- [ ] CLS < 0.05 on first paint.
- [ ] LCP < 2.5s on a throttled 4G profile.
- [ ] Reduced-motion rendering has zero transforms.
- [ ] Color-contrast audit clean at AA on every text/background pair.

---

## 9. Auditor Grep Bundle

Run from repo root. Any non-empty result on a landing-page route is a Fail.

```bash
# 1. Forbidden uppercase outside eyebrow/micro
rg --glob 'src/**/*.tsx' -n 'uppercase' | rg -v 'eyebrow|micro|--ts-eyebrow|--ts-micro'

# 2. Forbidden italic
rg --glob 'src/**/*.{tsx,css}' -n 'italic'

# 3. Font sizes below 13px
rg --glob 'src/**/*.{tsx,css}' -nE 'text-\[1[0-2]px\]|font-size:\s*1[0-2]px'

# 4. Off-grid padding (only multiples of 8)
rg --glob 'src/**/*.tsx' -nE 'p[xy]?-(1|3|5|7|9|11|13|15|17|19|21|23)\b'

# 5. Forbidden carousels / avatars / stars
rg --glob 'src/**/*.tsx' -n 'Carousel|<Avatar|StarRating|StarIcon\s*/'

# 6. Hero / Display-XL more than once per file
rg --glob 'src/pages/**/*.tsx' -nl 'ts-display-xl' | while read f; do
  c=$(rg -c 'ts-display-xl' "$f"); [ "$c" -gt 1 ] && echo "$f: $c";
done

# 7. Body text without max-measure
rg --glob 'src/**/*.tsx' -n 'ts-body' | rg -v 'max-w-|max-width'

# 8. Banned voice (delegate to 09 lexicon)
rg --glob 'src/**/*.{tsx,md}' -niE '\b(premium|luxury|unleash|solutions)\b'

# 9. Missing eyebrow above H1/H2 (visual heuristic)
rg --glob 'src/**/*.tsx' -nE '<h[12]\b' -B 2 | rg -L 'eyebrow|--ts-eyebrow'

# 10. Single-number pricing (no range dash)
rg --glob 'src/**/*.tsx' -nE '\$[0-9,]+(?!\s*[–\-]\s*\$)'
```

Wire these into the existing audit pipeline alongside the 18-item bundle in `11_performance_accessibility_governance`.

---

## 10. Sign-off Chain

Extends the 8-step chain from `11`. For landing pages, add three landing-specific gates before the existing chain runs:

| Gate | Owner | Pass criterion |
|---|---|---|
| L1. Persona read-through | Designer | Has read file 12 in full this sprint |
| L2. Archetype map | Designer | Every section labeled with one archetype |
| L3. Token map | Designer | Every block annotated with the typography + spacing tokens from §2 and §3 |
| → existing 8-step chain in `11` | Auditor | All 18 grep checks + this manual's 10 grep checks pass |

A landing page is shippable only when L1–L3 pass and the combined 28-item grep bundle returns clean.

---

## Pass/Fail (this manual)
- [ ] All 25 audit items in §8 are clean on the target page.
- [ ] All 10 grep checks in §9 return empty for the target page's files.
- [ ] L1–L3 sign-off recorded in the PR description.
- [ ] No deviation from typography or spacing tokens claims a cluster-overlay justification.
