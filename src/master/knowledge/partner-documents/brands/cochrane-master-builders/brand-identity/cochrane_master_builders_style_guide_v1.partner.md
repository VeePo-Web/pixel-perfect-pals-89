---
brand: "Cochrane Master Builders"
document: "Master Style Guide"
version: "1.0"
axis: "Style Axis"
status: "operational"
master_anchor: "Strong Foundations For Those Who Come After Us."
authored_by: "Master Style Guide Architect (Mode-OS)"
informed_by_structure_only:
  - "src/master/knowledge/partner-documents/_external-references/royal-mechanical/STYLE_GUIDE.reference.partner.md"
firewall:
  - "Zero tokens, copy, or voice inherited from any external reference."
  - "Not used by the live VeePo / Masters Detailing front-end code."
joins_with:
  - "Universal Website Template Wireframe Plan (Structural Axis)"
  - "Universal Website Copywriting Template Plan (Copy Axis)"
  - "communities_master_v3 (Geographic Axis)"
sections: 18
---

# Cochrane Master Builders — Master Style Guide v1.0

> **Strong Foundations For Those Who Come After Us.**
> The Style Axis. Joins with the Wireframe (Structural), the Copywriting Plan (Copy), and the Communities List (Geographic) to produce every spin-off site in the CMB family.
>
> This guide is **deeper, more premium, and more consistent** than the Royal Mechanical reference at `_external-references/royal-mechanical/`. No tokens, voice, or copy from that file are inherited here.

---

## Table of Contents

1. [Brand Foundations](#1-brand-foundations)
2. [Design Philosophy](#2-design-philosophy)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Spacing & Layout](#5-spacing--layout)
6. [Grid, Containers & Breakpoints](#6-grid-containers--breakpoints)
7. [Iconography & Imagery](#7-iconography--imagery)
8. [Components](#8-components)
9. [Motion & Interaction](#9-motion--interaction)
10. [Forms & Inputs](#10-forms--inputs)
11. [Voice, Tone & Copywriting](#11-voice-tone--copywriting)
12. [Accessibility](#12-accessibility)
13. [Performance Standards](#13-performance-standards)
14. [SEO & Metadata](#14-seo--metadata)
15. [Cross-Site Consistency Matrix](#15-cross-site-consistency-matrix)
16. [Variable-Driven Theming](#16-variable-driven-theming)
17. [Brand Anchor Enforcement](#17-brand-anchor-enforcement)
18. [Governance & Maintenance + Token Quick Reference](#18-governance--maintenance--token-quick-reference)

Every section ends with a **Pass/Fail audit check** the Auditor mode can execute.

---

## 1. Brand Foundations

### 1.1 Identity at a glance

| Attribute | Value |
|---|---|
| Brand | Cochrane Master Builders |
| Master anchor | **Strong Foundations For Those Who Come After Us.** |
| Category | Custom homes, renovations, additions, multi-generational builds |
| Heritage | Multi-generational craft tradition; legacy-first |
| Voice owner | Master Copywriter persona |
| Style owner | Master Style Guide Architect persona (this document) |
| Structural owner | Template Architect persona |
| Geographic owner | Communities Mapper (communities_master_v3) |

### 1.2 Brand promise

> We build what your grandchildren will inherit. Every foundation, every framing decision, every joint is sized for the next generation, not the next quarter.

### 1.3 The Three Filters (every design decision passes through all three)

1. **Generational, not transactional** — would this hold up if a grandchild walked the property in fifty years?
2. **Crafted, not assembled** — would a master tradesperson sign their name to it?
3. **Restrained, not loud** — would the strongest version of this be quieter than the first draft?

### 1.4 Personality spectrum

```
Editorial   ●━━━━━━━━━━━━○ Templated
Heritage    ●━━━━━━━━━━━━○ Trendy
Restrained  ●━━━━━━━━━━━━○ Loud
Generational●━━━━━━━━━━━━○ Disposable
Local       ●━━━━━━━━━━━━○ Corporate
```

**Audit check:** every page hero, footer, and primary CTA echoes the master anchor or one of the Three Filters. Otherwise: FAIL → rewrite.

---

## 2. Design Philosophy

CMB is **editorial-craft**. Pages should read like a hardcover monograph about a build, not like a SaaS landing page. Negative space is a material; we use it the way a master mason uses the gap between stones.

### 2.1 Principles

- **Negative space is a feature, not waste.** Default vertical section padding is generous (clamp(6rem, 12vw, 12rem)).
- **Borderless blocks > rounded cards.** Use horizontal rules, divider gradients, and whitespace to separate content. Never add `rounded-2xl` to a content block.
- **Numerals do the heavy lifting.** Years, square footage, generations counted, communities served — large display numerals over short captions.
- **Editorial captions, never marketing claims.** Copy under images is descriptive, never persuasive.
- **One accent color per page.** Heritage accent is a punctuation mark, not a paint roller.

**Audit check:** zero `rounded-xl`/`rounded-2xl` on content cards; zero stock-photo humans; at least one display numeral per major section. Otherwise: FAIL.

---

## 3. Color System

All values are HSL. Tokens are semantic. Components must never reference raw hex.

### 3.1 Primitive palette (locked)

| Token | HSL | Role |
|---|---|---|
| `--stone-50`  | `30 14% 96%` | Page surface, light theme background |
| `--stone-100` | `30 12% 92%` | Card surface, elevated background |
| `--stone-300` | `30 8% 78%`  | Hairline rules, dividers |
| `--stone-600` | `28 6% 38%`  | Secondary type |
| `--stone-900` | `26 8% 12%`  | Primary type, dark theme background |
| `--graphite-950` | `220 8% 8%` | Hero overlays, deepest dark |
| `--heritage-500` | `28 60% 42%` | Single accent (warm sienna; never neon) |
| `--heritage-700` | `28 55% 32%` | Hover/active state of accent |
| `--signal-success` | `150 35% 35%` | Form success only |
| `--signal-warn`    | `40 70% 45%`  | Form warn only |

### 3.2 Semantic tokens (consumed by components)

| Semantic | Light | Dark |
|---|---|---|
| `--bg`              | `--stone-50`  | `--graphite-950` |
| `--surface`         | `--stone-100` | `--stone-900` |
| `--fg`              | `--stone-900` | `--stone-50` |
| `--fg-muted`        | `--stone-600` | `--stone-300` |
| `--border-hairline` | `--stone-300` | `--stone-600` |
| `--accent`          | `--heritage-500` | `--heritage-500` |
| `--accent-hover`    | `--heritage-700` | `--heritage-700` |

### 3.3 Contrast targets

- Body text on `--bg`: ≥ **7:1** (AAA).
- Captions on `--surface`: ≥ **4.5:1** (AA).
- Accent text on `--bg`: ≥ **4.5:1**, never used for body copy — accent is for CTAs and small typographic flourishes only.

**Audit check:** no hex literals in components; all `text-*`/`bg-*` classes resolve to a semantic token; contrast measured at the listed thresholds. Otherwise: FAIL.

---

## 4. Typography

### 4.1 Pairing (locked)

- **Display:** Space Grotesk — weights 300, 400, 500. Used for H1, hero numerals, monogram.
- **Body:** Jost — weights 300, 400, 500. Used for paragraphs, navigation, captions.
- No serif. No script. No additional family without a Style Architect review.

### 4.2 Scale (rem; clamp() for responsive)

| Token | Size | Line height | Tracking | Use |
|---|---|---|---|---|
| `--text-display-1` | clamp(3.5rem, 8vw, 7rem) | 1.02 | -0.02em | Hero |
| `--text-display-2` | clamp(2.5rem, 5vw, 4.5rem) | 1.05 | -0.015em | Section title |
| `--text-h2` | clamp(1.75rem, 3vw, 2.5rem) | 1.15 | -0.01em | Subsection |
| `--text-h3` | 1.5rem | 1.25 | 0 | Card title |
| `--text-body-lg` | 1.1875rem (19px) | 1.7 | 0 | Lead paragraph |
| `--text-body`    | 1.0625rem (17px) | 1.7 | 0 | Body |
| `--text-caption` | 0.875rem (14px)  | 1.55 | 0.02em uppercase optional | Editorial caption |
| `--text-micro`   | 0.8125rem (13px) | 1.5 | 0.04em uppercase | Labels |

Minimum body size is **13px**; never smaller.

### 4.3 Rules

- Headings: weight 400 max. Never bold a display heading; weight is communicated by size.
- Body: weight 300 or 400; line-height 1.7 minimum.
- Numerals: tabular figures (`font-feature-settings: "tnum"`) on any data display.
- Allowed type colors: `--fg`, `--fg-muted`, `--accent`. Nothing else.

**Audit check:** every heading uses Space Grotesk ≤ weight 500; every paragraph uses Jost weight ≤ 400; all body sizes ≥ 13px; contrast tokens met. Otherwise: FAIL.

---

## 5. Spacing & Layout

### 5.1 Spacing scale (rem)

`0, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24`

### 5.2 Vertical rhythm

| Context | Padding |
|---|---|
| Section default | `clamp(6rem, 12vw, 12rem)` top + bottom |
| Section dense   | `clamp(4rem, 8vw, 8rem)` |
| Hero            | `clamp(8rem, 16vw, 16rem)` top + bottom |
| Editorial divider | 40–55vh (varied by section to avoid mechanical rhythm) |

### 5.3 Horizontal rhythm

- Page gutter: `clamp(1.25rem, 4vw, 4rem)`.
- Max content width for prose: `68ch`.
- Max content width for full-bleed editorial: `1440px`.

**Audit check:** no `p-2`/`p-3` on full sections; section padding ≥ `py-24` desktop equivalent; prose blocks capped at 68ch. Otherwise: FAIL.

---

## 6. Grid, Containers & Breakpoints

### 6.1 Breakpoints

| Token | Min width | Use |
|---|---|---|
| `sm` | 640px | Large phone landscape |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / small laptop |
| `xl` | 1280px | Laptop |
| `2xl` | 1536px | Desktop |

Mobile target viewport: **390px**, with safe-area bottom padding and 48px minimum touch targets.

### 6.2 Grids

- **Editorial 12-col** at `lg`+; gutter 24px.
- **Asymmetric 8/4** for hero + caption pairings.
- **Stack** (1-col) below `md`, with editorial dividers between blocks.

**Audit check:** every breakpoint visually verified at 390 / 768 / 1024 / 1440 widths. No horizontal scroll at 390. Otherwise: FAIL.

---

## 7. Iconography & Imagery

### 7.1 Iconography

- Stroke-based (1.25px), 24px default, sized in increments of 4.
- Match `--fg` or `--accent` only. Never gradient-filled icons.

### 7.2 Imagery rules

- **No human imagery in heroes.** No stock-photo people, no team headshots in primary modules. Humans appear only as small editorial portraits in long-form journal posts (≤ 280px).
- Subjects: foundations being poured, framing detail, joinery, stone, weathered wood, drone footage of completed builds, blueprint macro shots.
- Treatment: high-contrast, slight desaturation, generous negative space within the frame.
- Aspect ratios allowed: 16:9, 3:2, 4:5. Never 1:1 cards.

### 7.3 Caption format

Editorial caption sits below image, separated by hairline rule. Format: `Project name — Community, year.`

**Audit check:** zero stock humans in hero positions; every image has a captioned hairline; aspect ratios in the allowed list. Otherwise: FAIL.

---

## 8. Components

Every component below is **token-driven**. Component code references semantic tokens only.

### 8.1 Buttons

| Variant | Token usage | Shape |
|---|---|---|
| `primary` (filled accent) | bg `--accent`, text `--stone-50`, hover bg `--accent-hover` | Rectangular, 0 border-radius, 1px outer hairline of `--accent-hover` |
| `secondary` (outlined) | bg transparent, border 1px `--fg`, text `--fg` | Rectangular, 0 radius |
| `tertiary` (text link) | text `--accent`, underline on hover (1px offset 4px) | No background, no border |

**Forbidden:** ghost buttons, gradient buttons, rounded buttons, icon-only buttons in primary positions.

### 8.2 Cards

- No rounded corners.
- 1px hairline `--border-hairline` only on bottom; sides remain open.
- Internal padding: `2rem` minimum.
- One headline + one paragraph + one numeric stat maximum per card.

### 8.3 Navigation

- 80px tall navbar; sticky after 120px scroll.
- Link hover: 4px underline that draws left-to-right over 240ms.
- No mega-menus. Maximum 7 top-level items.

### 8.4 Dividers

- Horizontal, 1px, gradient `transparent → --accent → transparent`, opacity 0.6.
- Used between sections, never within cards.

### 8.5 Forms (see §10 for full spec)

**Audit check:** zero `rounded-*` classes ≥ `md` on the listed components; one underline-on-hover style for nav; no mega-menu. Otherwise: FAIL.

---

## 9. Motion & Interaction

### 9.1 Principles

- **Cinematic, never showy.** Reveals are slow (450–900ms), eased `cubic-bezier(0.2, 0.8, 0.2, 1)`.
- **Bottom-to-top clip-path curtains** for hero entries.
- **Ken Burns** scaling at 1.02–1.05 over 12s for editorial backgrounds.
- **No spring bounce** on UI elements. No confetti. No pulsing CTAs.

### 9.2 Reduced motion

Honor `prefers-reduced-motion: reduce` everywhere. Replace clip-path reveals with simple opacity 0→1 over 200ms.

### 9.3 Hover states

- Links: 4px underline, left-to-right.
- Images: subtle 1.02 scale over 600ms, no shadow change.
- Buttons: bg color shift only.

**Audit check:** all motion ≤ 1s; reduced-motion verified; no spring bounce. Otherwise: FAIL.

---

## 10. Forms & Inputs

- Inputs: 1px hairline `--border-hairline`; focus ring 2px `--accent` offset 2px; no rounded corners.
- Labels: above input, `--text-micro` uppercase.
- Helper text: `--fg-muted`, below input, 0.5rem gap.
- Error: text `--signal-warn`, hairline becomes `--signal-warn`. No red-fill backgrounds.
- Buttons follow §8.1.
- Multi-step forms (booking funnel): one question per step, auto-advance on valid input, dot indicator at top.

**Audit check:** zero rounded inputs; focus visible at 2px offset; reduced-motion respected on auto-advance. Otherwise: FAIL.

---

## 11. Voice, Tone & Copywriting

Voice is fully owned by the **Master Copywriter** persona at:
`src/master/knowledge/partner-documents/experience-prompts/master-copywriter-persona.partner.md`

This section enforces **style-side rules** that copywriting must obey.

### 11.1 Voice spectrum

```
Plainspoken  ●━━━━━━━━━━━━○ Ornate
Specific     ●━━━━━━━━━━━━○ Generic
Generational ●━━━━━━━━━━━━○ Quarterly
Quiet        ●━━━━━━━━━━━━○ Loud
```

### 11.2 Banned words / phrases (must match Master Copywriter list exactly)

`cheap`, `lowest price`, `best in town`, `synergy`, `unlock`, `seamless`, `solutions`, `world-class`, `revolutionary`, `cutting-edge`, `passionate`, `next-level`, `game-changer`, `innovative` (as a self-claim), `we are committed to…`, `at [brand], we believe…`.

### 11.3 Required phrasing

- Use **specific numerals** over adjectives (e.g., "framing 2× over code" not "extra-strong framing").
- Use **community names** literally (e.g., "Sunset Ridge in Cochrane" not "the area").
- Echo the master anchor at least once on every page (long form) and once per major section (homepage).

**Audit check:** zero banned words on every page; master anchor present in §1 and §17 of every page; community name present where geographic. Otherwise: FAIL.

---

## 12. Accessibility

- WCAG 2.2 AA minimum. AAA for body text contrast.
- Keyboard reachable: every interactive element, with visible 2px focus ring.
- `prefers-reduced-motion`: honored throughout (see §9.2).
- Image `alt`: descriptive, not decorative-empty unless the image is purely ornamental.
- Color is never the sole carrier of meaning — pair color with shape, label, or icon.
- Touch targets: 48×48px minimum on mobile.

**Audit check:** axe-core run produces zero serious/critical violations; manual keyboard pass complete; reduced-motion verified. Otherwise: FAIL.

---

## 13. Performance Standards

| Metric | Budget |
|---|---|
| LCP   | ≤ 2.0s on 4G mobile |
| CLS   | ≤ 0.05 |
| INP   | ≤ 200ms |
| TBT   | ≤ 150ms |
| JS    | ≤ 180kb gzipped on first load |
| Hero image | ≤ 220kb, AVIF/WebP, responsive `srcset` |
| Fonts | Self-hosted, `font-display: swap`, max 4 weights total |

**Audit check:** Lighthouse mobile ≥ 95 performance / 100 accessibility / 100 best-practices / 100 SEO. Otherwise: FAIL.

---

## 14. SEO & Metadata

Cross-link to **SEO Virtuoso** persona for full SEO playbook. Style-side rules:

- Title ≤ 60 chars, contains primary keyword + brand.
- Meta description ≤ 160 chars, contains primary keyword and a numeric proof point.
- One H1 per page.
- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `footer`.
- JSON-LD: `LocalBusiness`, `Service`, `BreadcrumbList`, `FAQPage` where applicable.
- Canonical tag on every route.
- OG image: 1200×630, editorial photography + master anchor.

**Audit check:** every route has unique title + description ≤ limits; one H1; valid JSON-LD; canonical present. Otherwise: FAIL.

---

## 15. Cross-Site Consistency Matrix

The 115 forecast spin-off sites all share the same Style Axis. The matrix below states what is **locked** (never varies) vs. **variable** (per-site theming).

| Concern | Locked across all sites | Variable per site |
|---|---|---|
| Typography pairing | ✅ Space Grotesk + Jost | — |
| Type scale tokens | ✅ All `--text-*` | — |
| Spacing scale | ✅ All spacing primitives | — |
| Breakpoints & grid | ✅ | — |
| Button shapes | ✅ Rectangular, 0 radius | — |
| Card rules | ✅ No rounded corners, hairline-bottom | — |
| Motion easing & duration | ✅ | — |
| Form rules | ✅ | — |
| Banned-word list | ✅ | — |
| Master anchor | ✅ "Strong Foundations…" | — |
| `--bg` / `--surface` mapping | ✅ Stone/Graphite | — |
| `--accent` value | — | ⚙ Per-brand within heritage palette range |
| Hero imagery subject | — | ⚙ Per-brand (foundation, framing, stone…) |
| Community names | — | ⚙ Per-geo from `communities_master_v3` |
| Service module ordering | — | ⚙ Per-brand within wireframe constraints |

**Audit check:** any site deviating from a locked column is rejected; any site missing a variable mapping is incomplete. Otherwise: FAIL.

---

## 16. Variable-Driven Theming

Per-site theming exposes only a small, named set of CSS variables. Spin-off operators may set these and nothing else.

```css
:root[data-brand="example-spin-off"] {
  --accent: 28 60% 42%;        /* must stay within heritage range, see allowed list */
  --accent-hover: 28 55% 32%;
  --hero-image-url: url("…");
  --community-primary: "Sunset Ridge";
}
```

### 16.1 Allowed `--accent` range

Hue: 18–38. Saturation: 45–65%. Lightness: 35–48%. Anything outside this range requires Style Architect approval.

### 16.2 Forbidden per-site overrides

- Typography family
- Type scale values
- Spacing primitives
- Border-radius values
- Motion duration / easing
- Banned-word list

**Audit check:** spin-off CSS only declares variables on the allowed list and within allowed ranges. Otherwise: FAIL.

---

## 17. Brand Anchor Enforcement

The master anchor — **Strong Foundations For Those Who Come After Us.** — must appear:

1. Verbatim in the homepage hero or sub-hero.
2. Verbatim in the footer sign-off.
3. Echoed (paraphrased OK) in at least three of: services, process, legacy, proof, FAQ.
4. Reflected structurally: every CTA must promise something multi-generational ("book your legacy consult", "plan your inheritance build", etc., not "get a quote now").

### Auditor hooks

- `grep -i "strong foundations for those who come after us"` must return ≥ 2 matches per page.
- Banned-word grep must return 0.
- Community-name grep must return ≥ 1 per geographic page.

**Audit check:** all four anchor rules met on every page; auditor greps green. Otherwise: FAIL.

---

## 18. Governance & Maintenance + Token Quick Reference

### 18.1 Governance

- **Owner:** Master Style Guide Architect persona.
- **Cadence:** review quarterly; out-of-cycle updates require an Auditor pass before merge.
- **Change log:** appended to `.lovable/plan.md` under "Style Axis".
- **Cross-axis sync:** any change here that touches §8 (components) requires Template Architect sign-off; any change touching §11 requires Master Copywriter sign-off.

### 18.2 Token quick reference

```
--bg                  light: stone-50    | dark: graphite-950
--surface             light: stone-100   | dark: stone-900
--fg                  light: stone-900   | dark: stone-50
--fg-muted            light: stone-600   | dark: stone-300
--border-hairline     light: stone-300   | dark: stone-600
--accent              heritage-500
--accent-hover        heritage-700
--text-display-1      clamp(3.5rem, 8vw, 7rem)  / 1.02 / -0.02em
--text-display-2      clamp(2.5rem, 5vw, 4.5rem) / 1.05 / -0.015em
--text-h2             clamp(1.75rem, 3vw, 2.5rem) / 1.15 / -0.01em
--text-body           17px / 1.7
--text-caption        14px / 1.55
--text-micro          13px / 1.5 / 0.04em uppercase
spacing primitives    0, .25, .5, .75, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24 rem
section padding       clamp(6rem, 12vw, 12rem)
prose width           68ch
```

### 18.3 File locations

- This guide: `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md`
- Owning persona: `…/experience-prompts/master-style-guide-architect-persona.partner.md`
- Reference (NOT OURS): `…/_external-references/royal-mechanical/STYLE_GUIDE.reference.partner.md`

---

> **This style guide is the Cochrane Master Builders Style Axis.**
> The Royal Mechanical reference at `_external-references/royal-mechanical/` informed structure only — no tokens, copy, or voice are shared.
>
> **Strong Foundations For Those Who Come After Us.**
