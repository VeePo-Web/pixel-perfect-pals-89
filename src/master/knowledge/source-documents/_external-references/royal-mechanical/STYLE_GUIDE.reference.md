---
external_reference: true
owner_brand: "Royal Mechanical Services"
source: "user upload (STYLE_GUIDE.md)"
status: "REFERENCE ONLY — NOT OUR BRAND"
do_not_copy:
  - colors
  - tokens
  - voice
  - copy
  - personality_spectrum
  - brand_promise
borrow_structurally:
  - table_of_contents_depth
  - governance_section_pattern
  - token_quick_reference_pattern
---

# ⚠ EXTERNAL REFERENCE — NOT A COCHRANE MASTER BUILDERS DOCUMENT

> This file is the verbatim style guide of **Royal Mechanical Services Ltd.**, uploaded by the user as a *structural inspiration template only*.
>
> **Do NOT** copy any color value, token name, typography pairing, voice line, brand promise ("Explain before we replace"), personality spectrum, or service description from this document.
>
> The Cochrane Master Builders Style Guide lives at:
> `src/master/knowledge/partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md`
>
> Use this reference only to study **structure and depth** (TOC layout, governance pattern, token quick-reference appendix). Our authored guide must be deeper, more premium, and uniquely CMB.

---

## VERBATIM REFERENCE CONTENT BELOW (Royal Mechanical Services)

# Royal Mechanical Services — Brand & Web Style Guide

> **A complete reference for the visual, typographic, motion, and interaction language of royalmechanical.ca**
> Version 1.0 · Compiled 2026-04-26 · Maintained alongside `src/lib/colors.ts`, `src/lib/typography.ts`, `src/lib/spacing.ts`, `src/lib/animations.ts`, and `src/docs/personas/*`.

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
15. [Governance & Maintenance](#15-governance--maintenance)
16. [Appendix — Token Quick Reference](#16-appendix--token-quick-reference)

---

## 1. Brand Foundations

### 1.1 Identity at a Glance

| Attribute | Value |
|---|---|
| Legal Name | Royal Mechanical Services Ltd. |
| Founded | 1984, Cochrane, Alberta |
| Heritage | Three generations of Helfrich family ownership |
| Phone | (403) 899-9925 |
| Email | admin@royalmechanicalservices.com |
| Hours | Mon–Fri, 8:00 AM – 5:00 PM (24/7 emergency) |
| Reviews | 1,300+ verified Google reviews · 4.9★ average |
| Accreditation | A+ BBB |
| Service Footprint | Cochrane (HQ), Canmore, Springbank, Bearspaw, NW Calgary, Cremona, Redwood Meadows |

### 1.2 Brand Promise

> **"Explain before we replace."**
> Every diagnostic begins with the customer seeing the actual problem — flashlight in hand, photo on screen — before any quote is offered.

### 1.3 The Three Filters (every design decision must pass through these)

1. **Elevate the human experience** — empathy first, inclusivity always, emotion earned not manufactured.
2. **Embody brand truth with excellence** — if it isn't true, it doesn't ship; if it isn't crafted, it doesn't ship.
3. **Innovate responsibly for impact** — measurable purpose over novelty; ethics over conversion-tricks.

### 1.4 Personality Spectrum

```
Warm  ●━━━━━━━━━━━○  Detached
Confident ●━━━━━━━━━━━○ Boastful
Editorial ●━━━━━━━━━━━○ Templated
Local ●━━━━━━━━━━━━━━○ Corporate
Calm ●━━━━━━━━━━━━━━○ Urgent
Restrained ●━━━━━━━━━○ Decorative
```

---

## 2. Design Philosophy

### 2.1 Swedish Minimalism × Fantasy.co Editorial

The site is built on three intersecting movements:

- **Swedish Minimalism** — restraint, generous whitespace, fewer-but-better choices.
- **Fantasy.co editorial drama** — cinematic scale, typographic tension, atmospheric photography.
- **David Ogilvy copywriting** — benefit-led headlines, conversational paragraphs, no fluff.

### 2.2 The Two-Act Narrative

Every page is composed as a two-act structure:

| Act | Surface | Purpose |
|---|---|---|
| **Act I — The Daylight** | `bg-background` (Swedish white) and `bg-muted` (warm cream) | Service utility, trust, proof — the practical inhale |
| **Act II — The Cinema** | `bg-primary` (deep navy) | Story, values, emotion, terminus CTA — the cinematic exhale |

A `PhotoMoment` section is the pivot between acts.

### 2.3 Non-Negotiables

- **Zero stock imagery.** All photography sourced from the `imported-images` Supabase bucket.
- **Zero exclamation marks** in body copy.
- **Zero emojis**, anywhere.
- **Zero icons without text labels** (icons are reinforcement, never replacement).
- **Zero shimmer/glitter animations.** Motion serves comprehension, not decoration.
- **Zero dark patterns.** No false scarcity, no hidden fees, no forced opt-ins.

---

## 3. Color System

### 3.1 Core Palette

| Role | Token | HSL | Hex | Usage |
|---|---|---|---|---|
| **Navy** (primary) | `bg-primary` / `text-primary` | `210 55% 12%` | `#0F1D2A` | Act II surfaces, headlines on light, footer |
| **Gold** (accent) | `bg-accent` / `text-accent` | `42 50% 58%` | `#C9A962` | CTAs, dividers, anchors, drop caps |
| **Swedish White** (background) | `bg-background` | `210 20% 98%` | `#FAFBFC` | Default page surface |
| **Warm Cream** (muted) | `bg-muted` | `40 20% 96%` | `#F8F7F4` | Alternating section rhythm, chapter breaks |
| **Charcoal** | `bg-charcoal` | `210 20% 20%` | `#2A3441` | Deep text, secondary dark surfaces |

### 3.2 Color Roles

```
Primary:    Navy   →  Trust, gravity, authority
Accent:     Gold   →  Importance, motion, action
Surface:    White  →  Clarity, breathing room
Surface:    Cream  →  Warmth, editorial rhythm
Status:     Green / Amber / Red / Blue (semantic only — never decorative)
```

### 3.3 Semantic Tokens (always prefer these over raw hex)

```ts
// Backgrounds
BACKGROUND.page    // bg-background
BACKGROUND.dark    // bg-primary
BACKGROUND.muted   // bg-muted
BACKGROUND.card    // bg-card

// Text — context-aware
TEXT.light.primary    // text-foreground
TEXT.light.secondary  // text-muted-foreground
TEXT.dark.primary     // text-primary-foreground
TEXT.dark.secondary   // text-primary-foreground/80
TEXT.dark.tertiary    // text-primary-foreground/60
TEXT.dark.muted       // text-primary-foreground/50

// Borders — context-aware
BORDER.light.subtle   // border-primary/10
BORDER.light.medium   // border-primary/20
BORDER.dark.medium    // border-primary-foreground/20
```

### 3.4 Opacity-as-a-Tool

We deliberately use a small base palette and lean on opacity to create hierarchy. This is intentional.

| Need | Opacity | Example |
|---|---|---|
| Headline on dark | 100% | `text-primary-foreground` |
| Body on dark | 80% | `text-primary-foreground/80` |
| Helper on dark | 60% | `text-primary-foreground/60` |
| Citation on dark | 50% | `text-primary-foreground/50` |
| Subtle border | 10–20% | `border-primary/10`, `border-primary/20` |

### 3.5 Contrast Mandates (WCAG 2.1 AA, no exceptions)

- Body text on white: **≥ 4.5:1**
- Body text on cream: **≥ 4.5:1**
- Body text on navy: **≥ 7:1** (we exceed AAA on dark sections by design)
- Gold on navy: used only for accents ≥ 18px or 14px bold (large text rule)
- Gold on white: **never** for body — only as accent fill (CTA backgrounds, dividers, icons paired with dark text)

### 3.6 Forbidden Color Practices

❌ Pure black `#000` (use `text-foreground` / `bg-charcoal`)
❌ Pure white `#FFF` for surfaces (use `bg-background` / `bg-card`)
❌ Decorative gradients (rainbow, neon)
❌ Gold on cream (insufficient contrast)
❌ Color as the sole conveyor of meaning

---

## 4. Typography

### 4.1 Font Stack

| Family | Role | Loaded |
|---|---|---|
| **Playfair Display** | Headlines, stats, pull quotes | `font-display` |
| **Inter** | Body, UI, navigation | `font-sans` (default) |
| **Montserrat** | Eyebrows, labels (when extra variety helps) | `font-accent` |

System fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`.

### 4.2 Type Scale (1.25 Major Third, 16px base)

```
10 → 11 → 13 → 14 → 16 → 18 → 20 → 24 → 30 → 36 → 48 → 60 → 72 → 88
```

### 4.3 Headline Scale

| Token | Mobile → Desktop | Family / Weight | Use |
|---|---|---|---|
| `HEADLINE.hero.full` | `text-5xl` → `xl:text-[88px]` | Playfair, normal, leading-0.95 | Page hero only |
| `HEADLINE.section.full` | `text-4xl` → `lg:text-6xl` | Playfair, normal, leading-1.05 | Major section H2 |
| `HEADLINE.subsection.full` | `text-3xl` → `lg:text-4xl` | Playfair, bold, leading-1.1 | Card headers, feature titles |
| `HEADLINE.compact.full` | `text-2xl` → `lg:text-3xl` | Playfair, bold, leading-1.2 | Accordion titles, smaller cards |

All headlines use `tracking-[-0.02em]` for editorial tightness.

### 4.4 Body Scale

| Token | Size | Use |
|---|---|---|
| `BODY.large.full` | `text-lg lg:text-xl` | Hero subhead, feature intros |
| `BODY.standard.full` | `text-base lg:text-lg` | Default paragraph |
| `BODY.small.value` | `text-sm` | Accordion content, secondary copy |
| `BODY.micro.value` | `text-[13px]` | Helper text, timestamps |
| `BODY.caption.value` | `text-xs` | Captions, legal, fine print |

All body text uses `leading-relaxed` (≈1.625).

### 4.5 Eyebrows / Labels

| Token | Style | When |
|---|---|---|
| `EYEBROW.standard.value` | `text-[11px] tracking-[0.2em] uppercase font-medium` | Default section label |
| `EYEBROW.tight.value` | `tracking-[0.15em] font-semibold` | Compact spaces, proof rows |
| `EYEBROW.wide.value` | `tracking-[0.25em]` | Maximum editorial impact |
| `EYEBROW.micro.value` | `text-[10px] tracking-[0.15em]` | Badges, tenure, metadata |

> **Rule:** Eyebrows whisper, they do not shout. Always wide-tracked, always uppercase, always small.

### 4.6 Stats & Numbers

| Token | Size Range | Use |
|---|---|---|
| `STAT.hero.full` | `text-6xl → xl:text-8xl` | Hero credentials (e.g., "1,300+") |
| `STAT.large.full` | `text-4xl → xl:text-6xl` | Section stats, proof walls |
| `STAT.medium.full` | `text-2xl lg:text-3xl` | Card stats |
| `STAT.small.value` | `text-lg lg:text-xl` | Inline trust badges |

All stats use Playfair Display for editorial weight.

### 4.7 Quotes

| Token | Style |
|---|---|
| `QUOTE.featured.full` | `font-display italic text-xl → lg:text-3xl leading-relaxed` |
| `QUOTE.standard.full` | `text-lg lg:text-xl leading-relaxed` |
| `QUOTE.testimonial.full` | `text-base lg:text-lg leading-relaxed` |

### 4.8 Letter-Spacing Tokens

| Token | Value | Use |
|---|---|---|
| `tracking-[-0.02em]` | -0.02em | Editorial headlines |
| `tracking-[0.08em]` | 0.08em | Card titles |
| `tracking-[0.15em]` | 0.15em | Tight labels |
| `tracking-[0.2em]` | 0.2em | Standard eyebrows |
| `tracking-[0.25em]` | 0.25em | Wide eyebrows |

### 4.9 Reading-Width Constraints

| Token | Width | Use |
|---|---|---|
| `max-w-prose` | ~65ch | Default paragraph blocks |
| `max-w-2xl` | 672px | Hero subheads, pull quotes |
| `max-w-3xl` | 768px | Feature descriptions |
| `max-w-4xl` | 896px | Section intros |

> **Rule:** Body copy never exceeds ~75 characters per line.

### 4.10 Forbidden Typography Practices

❌ More than three font families on one page
❌ Centered body paragraphs longer than 2 lines
❌ ALL CAPS body copy (eyebrows only)
❌ Underlined text that isn't a link
❌ Italic blocks of body copy (italics reserved for pull quotes & titles of works)
❌ `text-xs` body content on mobile

---

## 5. Spacing & Layout

### 5.1 The 8-Point Rhythm

All spacing derives from an **8px base unit**. No magic numbers. No `gap-7`. No `py-25`.

```
2 → 4 → 8 → 12 → 16 → 24 → 32 → 48 → 64 → 80 → 96 → 112 → 128 → 160 → 192 (px)
```

### 5.2 Section Vertical Padding

| Token | Padding | When |
|---|---|---|
| `SECTION_PADDING.light.combined` | `py-24 lg:py-32` (96 → 128px) | Default light sections |
| `SECTION_PADDING.dark.combined` | `py-20 lg:py-28` (80 → 112px) | Dark navy sections |
| `SECTION_PADDING.compact.combined` | `py-16 lg:py-20` (64 → 80px) | FAQ, objections, transitions |
| `SECTION_PADDING.terminal.combined` | `py-32 lg:py-40` (128 → 160px) | Final CTA, footer lead-in |
| `SECTION_PADDING.hero.combined` | `py-20 lg:py-28` | Hero (often paired with viewport units) |

> **Rhythm rule:** Light backgrounds get *more* padding (content needs to breathe). Dark backgrounds get *less* (color provides visual weight).

### 5.3 Strip Padding

| Token | Padding | When |
|---|---|---|
| `STRIP_PADDING.minimal.value` | `py-3` | Trust strips, credential bars |
| `STRIP_PADDING.standard.value` | `py-4` | Announcements, notices |
| `STRIP_PADDING.tall.value` | `py-6` | Promotional banners |

### 5.4 Container Horizontal Padding

| Token | Mobile → Desktop |
|---|---|
| `CONTAINER_PADDING.standard` | `px-6 lg:px-8` |
| `CONTAINER_PADDING.wide` | `px-8 lg:px-12` |
| `CONTAINER_PADDING.narrow` | `px-4 lg:px-6` |

### 5.5 Content Gap Tokens

| Token | Gap | Relationship |
|---|---|---|
| `CONTENT_GAP.micro` | 4px | Tightly bound (icon + label) |
| `CONTENT_GAP.tight` | 8px | Related (form label + input) |
| `CONTENT_GAP.standard` | 16px | Cards, list items |
| `CONTENT_GAP.relaxed` | 24px | Content blocks |
| `CONTENT_GAP.section` | 32px | Major content areas |
| `CONTENT_GAP.large` | 48px | Distinct groups |

### 5.6 Max-Width Tokens

| Token | Width | Use |
|---|---|---|
| `max-w-prose` | ~580px | Single-column reading |
| `max-w-2xl` | 672px | Quotes, narrow text |
| `max-w-3xl` | 768px | Balanced content |
| `max-w-4xl` | 896px | Most sections |
| `max-w-6xl` | 1152px | Service grids, team layouts |
| `max-w-7xl` | 1280px | Hero, full-bleed |

---

## 6. Grid, Containers & Breakpoints

### 6.1 Breakpoints (Tailwind defaults)

| Token | Min Width | Audience |
|---|---|---|
| (default) | 0px | Mobile portrait |
| `sm` | 640px | Mobile landscape, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops, desktop |
| `xl` | 1280px | Wide desktop |
| `2xl` | 1400px (custom) | Container max |

### 6.2 Container

The root container is centered with `2rem` (32px) horizontal padding and a max-width of `1400px` at `2xl`.

### 6.3 Grid Conventions

- **Service / Feature grids:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` with `gap-4 lg:gap-6`.
- **Asymmetric editorial grids:** `lg:grid-cols-12` with explicit `col-span` (8/4 splits are the signature).
- **Bento layouts** are permitted on hero & community pages — never as decoration.

### 6.4 Mobile-First Discipline

Every component is authored mobile-first. Desktop styles are layered with `sm:`, `md:`, `lg:` modifiers. Never the reverse.

---

## 7. Iconography & Imagery

### 7.1 Icon Library

- **Library:** `lucide-react` (the only icon set).
- **Stroke:** 1.5 default, 2 for emphasis.
- **Size:** `w-4 h-4` (inline), `w-5 h-5` (default), `w-6 h-6` (large), `w-8 h-8` (feature).
- **Color:** inherit from parent text color; gold only when paired with `text-accent`.

### 7.2 Icon Rules

- **Always paired with a text label.** Icons are reinforcement, not replacement.
- **Never decorative.** If you can remove it without losing meaning, remove it.
- **Never multicolored.** Single-stroke only.
- **Never bouncing or spinning** (except loading spinners with `motion-reduce:animate-none`).

### 7.3 Photography Standards

| Rule | Detail |
|---|---|
| Source | Only `imported-images` Supabase bucket (`photoshoot('filename.jpg')`) |
| Style | Natural light, real Royal Mechanical work, real team |
| Format | WebP/AVIF preferred; JPG fallback |
| Aspect | 16:10 plates for editorial; 4:5 portraits; 16:9 cinematic |
| Treatment | Subtle desaturation acceptable on hero overlays; no Instagram filters |
| Alt text | `{action} by Royal Mechanical in {location}` (see §14.5) |

### 7.4 Forbidden Imagery

❌ Stock photography of any kind
❌ Generic "smiling technician" library photos
❌ Illustrated mascots, cartoon characters
❌ AI-generated faces or hands
❌ Before/after photos of customer homes without written consent
❌ Heavy filters, vignettes that obscure detail, tilt-shift gimmicks

### 7.5 Editorial Photo Treatment

Use the `EditorialPhoto` component for hero plates. It applies:

- 16:10 plate aspect
- Multi-layer SVG grain (3% opacity)
- Inner ring shadow + dual outer shadow
- Optional magazine-style caption

---

## 8. Components

### 8.1 Buttons

#### Primary CTA (Gold)

```ts
className={BUTTON.primary.full}
// bg-accent text-accent-foreground hover:bg-accent/90
// focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
```

- **Shape:** `rounded-sm` (sharp editorial edges)
- **Padding:** `px-8 py-4` (large), `px-6 py-3` (standard)
- **Typography:** `text-base font-semibold tracking-wide`
- **Min height:** `48px` (touch-comfort)
- **Animation:** `cta-breathe` (3s gold halo loop on hero CTAs only)

#### Ghost on Light

```ts
className={BUTTON.ghostLight.full}
// border-2 border-primary/20 hover:border-primary/40
// text-primary bg-transparent hover:bg-primary/5
```

#### Ghost on Dark

```ts
className={BUTTON.ghostDark.full}
// border-2 border-primary-foreground/30 hover:border-primary-foreground/50
// text-primary-foreground bg-transparent hover:bg-primary-foreground/10
```

#### Solid Dark

```ts
className={BUTTON.solidDark.full}
// bg-primary hover:bg-primary/90 text-primary-foreground
```

> **Rule:** One Primary CTA per fold maximum. Never two gold buttons side-by-side.

### 8.2 Cards

| Variant | Token | When |
|---|---|---|
| Default | `COMPONENT.card.default` | Standard content card |
| Elevated | `COMPONENT.card.elevated` | Modals, popovers, featured |
| Dark | `COMPONENT.card.dark` | Cards on light sections needing contrast |
| Ghost | `COMPONENT.card.ghost` | Borderless on cream sections |

**Border radius:** `rounded-lg` (12px) default, `rounded-xl` (16px) for large feature cards.
**Padding:** `p-6` standard, `p-8` feature, `p-4` compact.
**Hover:** `hover-lift` utility (4px translate, soft shadow).

### 8.3 Glassmorphic Cards

Used sparingly on editorial moments (CommunityCode, TeamValues). The 7-layer stack is centralized in `GlassmorphicCard`:

1. Background image (blurred, desaturated)
2. Navy color overlay
3. Gradient mask
4. Noise texture (3%)
5. Glass blur
6. Inner border highlight
7. Outer drop shadow

**Themes:** `navy`, `cream`, `gold`, `warm`, `cinematic`. Never invent a new theme — extend the system instead.

### 8.4 Section Dividers

| Variant | Style | Use |
|---|---|---|
| `accent` | 2px gold bar, 48–60px wide | Major chapter breaks |
| `subtle` | Gradient line, 100% width | Minor transitions |

Always paired with `EYEBROW` text above, headline below.

### 8.5 Trust Strip

- Background: `bg-[#0a1628]` (deeper than primary navy for visual weight)
- Padding: `STRIP_PADDING.minimal.value` (`py-3`)
- Text: `text-white/40` with `text-white/20` dividers
- Content: 4–6 credentials max (BBB, license, years, reviews)

### 8.6 FAQ Accordion

- Pattern: native `<details>` with custom chevron rotation
- Touch target: `min-h-[48px]`
- Open animation: 200ms ease-out height + chevron rotate
- Typography: `HEADLINE.compact` for question, `BODY.standard` for answer

### 8.7 Navigation

- Header height: 64px mobile, 80px desktop
- Logo: native SVG, 32–40px height
- Nav items: `UI.nav.value` (`text-sm font-medium tracking-wide`)
- Active state: `text-accent`
- Hover: `hover:text-accent` with 200ms ease

### 8.8 Footer

- Architected as a single 100svh "Hero Page" terminus
- Two states: **Resting** (navy + white) → **Gold Takeover** (scrolling fusion)
- Lion watermark positioned to never overlap link text
- Legal: single centered row, "Privacy Policy ◆ Terms of Service" only

### 8.9 Forms

See §10 for the full forms specification.

---

## 9. Motion & Interaction

### 9.1 Motion Philosophy

> **Motion serves comprehension, not decoration.**
> Every animation must answer one of three questions:
> 1. What just happened? (feedback)
> 2. Where am I going? (orientation)
> 3. What is now important? (focus)

### 9.2 Easing Tokens

| Token | Curve | Use |
|---|---|---|
| `--ease-smooth` | `cubic-bezier(0.4, 0, 0.2, 1)` | Default UI transitions |
| `--ease-spring` | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Playful pops (sparingly) |
| `--ease-bold` | `cubic-bezier(0.22, 1, 0.36, 1)` | Editorial reveals, hover-lift |
| Editorial sweep | `cubic-bezier(0.16, 1, 0.3, 1)` | Section sweep-up reveals |

### 9.3 Duration Tokens

| Token | Time | Use |
|---|---|---|
| `--duration-fast` | 150ms | Hover, focus, color shifts |
| `--duration-normal` | 250ms | Standard transitions |
| `--duration-slow` | 400ms | Page transitions, reveals |
| (sweep) | 800ms | Hero sweep-up reveal |
| (card flip) | 600ms | Team card flip |

### 9.4 Standard Animations

| Animation | When |
|---|---|
| `fade-in` | Section reveals on scroll |
| `sweep-up` | Hero entrance |
| `step-in` | Sequential list items (staggered 80ms) |
| `cta-breathe` | Hero CTA halo (3s loop) |
| `mega-menu-in/out` | Desktop nav dropdowns |

### 9.5 Hover States

- All interactive elements: `transition-[color,background,border-color] duration-200`
- Cards: `hover-lift` (translate-y-1, shadow-lg)
- Buttons: `hover:bg-accent/90` or border darkening
- Links: `hover:text-accent` only (never underline-on-hover)

### 9.6 Focus States (mandatory)

```css
:focus-visible {
  outline: 2px solid hsl(var(--bold-gold));
  outline-offset: 2px;
  border-radius: 4px;
}
```

### 9.7 Reduced Motion

**Every** animation longer than 500ms or involving translation/scale must respect `prefers-reduced-motion`:

```tsx
className="transition-opacity duration-300 motion-reduce:transition-none"
```

### 9.8 Forbidden Motion

❌ Parallax that prevents reading
❌ Auto-playing carousels with no pause
❌ Mouse-trail cursors
❌ Scroll-jacking
❌ Page-load splash animations > 800ms
❌ Bouncing CTAs
❌ Anything resembling "shimmer" or "sparkle"

---

## 10. Forms & Inputs

### 10.1 Field Anatomy

```
┌─────────────────────────────┐
│ Label (text-sm font-medium) │
├─────────────────────────────┤
│ ┌─────────────────────────┐ │
│ │ Input (h-12, px-4)      │ │
│ └─────────────────────────┘ │
│ Helper text (text-xs)       │
└─────────────────────────────┘
```

### 10.2 Input Tokens

```ts
COMPONENT.input.default   // bg-background border-border text-foreground
COMPONENT.input.focus     // focus:border-accent focus:ring-accent
COMPONENT.input.error     // border-red-500 focus:ring-red-500
```

- **Height:** `h-12` (48px touch target)
- **Padding:** `px-4`
- **Radius:** `rounded-md`
- **Border:** 1px solid `border-border`
- **Focus ring:** 2px gold offset by 2px

### 10.3 Validation States

| State | Visual |
|---|---|
| Default | Border `border-border`, label `text-foreground` |
| Focus | Border `border-accent`, ring `ring-2 ring-accent/30` |
| Error | Border `border-red-500`, message `text-red-600 text-xs mt-1` |
| Success | Border `border-green-500` (rare, only on real-time validation) |
| Disabled | `opacity-60 cursor-not-allowed bg-muted` |

### 10.4 Form Layout

- Single column on mobile, optional 2-column on `lg:` for short field pairs
- Vertical gap between fields: `space-y-6` (24px)
- Submit button: full width on mobile, auto on desktop
- Required fields marked with `*` in label, never red asterisk only

### 10.5 Microcopy

- Labels: sentence case, no colons (e.g., "Phone number")
- Placeholders: example values, not instructions (e.g., "(403) 899-9925")
- Helper text: explanatory or formatting hints below the field
- Error text: human and specific ("This phone number looks incomplete" — not "Invalid input")

---

## 11. Voice, Tone & Copywriting

### 11.1 Voice Pillars

| Pillar | Always | Never |
|---|---|---|
| **Honest** | "Your blower motor is failing" | "Your system needs attention" |
| **Local** | "We've been on Cochrane streets since 1984" | "Serving all of Alberta" |
| **Restrained** | One claim, well proven | Five claims, undefended |
| **Calm** | "Call when you're ready" | "Don't wait — call now!" |

### 11.2 The Ogilvy Principles in Use

1. **Headlines do 80% of the work.** Benefit-led, never clever-for-clever's-sake.
2. **Long copy outsells short copy** when the reader is in the consideration phase.
3. **Specifics outperform abstractions.** "1,300+ Google reviews" beats "many happy customers."
4. **Conversational tone wins.** Write the way a senior technician would speak to a neighbor.

### 11.3 Punctuation Rules

| Mark | Rule |
|---|---|
| `!` | Forbidden in body copy. Permitted only in user-quoted reviews. |
| `—` (em-dash) | Used for editorial pauses. Never `--` or ` - `. |
| `'` (curly apostrophe) | Always. Never straight `'`. |
| `"` (curly quotes) | Always. Never straight `"`. |
| `…` (ellipsis) | Single character. Never `...`. |
| `&` | Never substitute for "and" in body copy. Logos and proper names only. |

### 11.4 Forbidden Vocabulary

❌ "Synergy", "leverage", "ecosystem", "solutions" (jargon)
❌ "World-class", "best-in-class", "industry-leading" (boast)
❌ "Click here", "learn more" (lazy CTAs)
❌ "We" without context (specify *who* at Royal)
❌ Religious or political references
❌ Emojis 🚫

### 11.5 Approved CTA Verbs

- **Message Us** — primary conversational CTA
- **Call (403) 899-9925** — urgent, direct
- **Book a Diagnostic** — service intent
- **See Our Work** — gallery/portfolio
- **Read Their Story** — review/testimonial
- **Get a Quote** — when explicit pricing intent

### 11.6 Headline Patterns

| Pattern | Example |
|---|---|
| **Problem → Promise** | "Your furnace is louder than last winter. We'll tell you why before we touch it." |
| **Specific Claim** | "1,300+ Google reviews. 4.9 stars. 41 years in Cochrane." |
| **Inversion** | "We'd rather lose the job than lose your trust." |
| **Local Anchor** | "Three generations on Cochrane streets." |

### 11.7 Response Time Standard

The canonical phrase, used site-wide: **"We usually respond within a couple hours."**
Never "instantly", never "within 5 minutes", never "ASAP".

---

## 12. Accessibility

Royal Mechanical operates a **zero-tolerance accessibility standard**. Every commit must pass these tests.

### 12.1 WCAG 2.1 AA Mandates

- Color contrast ≥ 4.5:1 (body) / 3:1 (large text & UI components)
- All interactive elements keyboard-reachable
- All interactive elements have visible focus state
- All images have meaningful `alt` (or `alt=""` if decorative)
- All form fields have associated `<label>` (visible or `sr-only`)
- All landmarks present: `<header>`, `<nav>`, `<main>`, `<footer>`
- All headings in semantic order (no skipped levels)
- `prefers-reduced-motion` respected on every animation > 500ms

### 12.2 Touch Targets

| Element | Minimum |
|---|---|
| Primary CTA | 48px height |
| Secondary buttons | 44px height |
| Icon buttons | 44 × 44px hit area (use padding to reach) |
| Form inputs | 48px height |
| Nav links (mobile) | 48px height |

### 12.3 Screen Reader Support

- `aria-label` on icon-only buttons
- `aria-live="polite"` on dynamic counters and toast notifications
- `aria-modal="true"` + focus trap on overlays/dialogs
- `role="img"` on decorative SVGs that convey meaning
- Skip-to-content link as the first focusable element

### 12.4 Motion-Reduce

```tsx
// Required pattern for any animated element
className="animate-fade-in motion-reduce:animate-none"
className="transition-transform duration-300 motion-reduce:transition-none"
```

### 12.5 Forbidden A11y Practices

❌ `tabindex` values > 0
❌ Disabled focus outlines (`outline: none` without replacement)
❌ Color-only conveyance of meaning (always pair with icon, text, or shape)
❌ Auto-playing audio/video
❌ Flashing content (>3 flashes/sec)
❌ `<div>` or `<span>` used as buttons (must be `<button>` or `role="button"` with key handlers)

---

## 13. Performance Standards

### 13.1 Core Web Vitals Targets

| Metric | Target | Limit |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.0s | 2.5s |
| **INP** (Interaction to Next Paint) | < 100ms | 200ms |
| **CLS** (Cumulative Layout Shift) | < 0.05 | 0.1 |
| **TTFB** | < 600ms | 800ms |

### 13.2 Image Performance

- Always supply `width` and `height` attributes (prevents CLS)
- Use `loading="lazy"` for below-the-fold images
- Use `fetchpriority="high"` on the LCP image only
- Provide `srcset` + `sizes` for responsive delivery
- Use modern formats (WebP/AVIF) with JPG fallback
- Compress aggressively (Lighthouse target: < 100KB per hero image)

### 13.3 JavaScript Budget

- First-load JS (compressed): **< 120KB**
- Per-route chunk: **< 60KB**
- No new client-side libraries without justification (see prompt §4 dependency policy)
- Code-split lazy components (`React.lazy` + `Suspense`)

### 13.4 CSS Budget

- All styling via Tailwind utilities + design tokens
- Custom CSS limited to `src/styles/*` for base rules and animation keyframes
- No CSS-in-JS, no styled-components, no Emotion

### 13.5 Caching & Delivery

- Static assets cached for 1 year with content-hash filenames
- HTML cached for 5 minutes
- Service worker reserved for future PWA upgrade (not currently active)

---

## 14. SEO & Metadata

### 14.1 Title Tag

- **Length:** 50–60 characters (zero tolerance over 60)
- **Pattern:** `{Page Topic} — Royal Mechanical Services`
- **Example:** `Furnace Repair in Cochrane — Royal Mechanical Services`

### 14.2 Meta Description

- **Length:** 140–160 characters (zero tolerance outside this range)
- **Pattern:** Benefit + proof + soft CTA
- **Example:** `Same-day furnace diagnostics in Cochrane and the Foothills. 1,300+ five-star Google reviews. Call (403) 899-9925.`

### 14.3 Open Graph (mandatory on every page)

```html
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://royalmechanical.ca/og/{page}.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="website" />
<meta property="og:url" content="..." />
```

### 14.4 JSON-LD Schema (mandatory)

- `LocalBusiness` on home and area pages
- `Service` on each service page
- `FAQPage` on every page with 3+ FAQs
- `BreadcrumbList` on all sub-pages
- `Review` aggregated on home and reviews page

### 14.5 Image Alt Text Formula

`{Descriptive action} by Royal Mechanical in {Location}`

| Good | Bad |
|---|---|
| "Furnace installation by Royal Mechanical in Cochrane" | "Image of furnace" |
| "Mike servicing a heat pump in Springbank" | "Technician working" |
| (decorative) `alt=""` | (decorative) `alt="image"` |

### 14.6 URL Structure

- Lowercase, hyphen-separated
- No query strings for content pages
- No file extensions
- Reflect IA: `/services/heating/furnace-repair`, not `/page?id=12`

### 14.7 Canonical URLs

Every page declares a `<link rel="canonical">` pointing to its preferred URL.

---

## 15. Governance & Maintenance

### 15.1 Source of Truth

| Concern | File |
|---|---|
| Brand truths | `src/lib/brand-identity.ts` |
| Color tokens | `src/lib/colors.ts` + `src/styles/base.css` |
| Type tokens | `src/lib/typography.ts` |
| Spacing tokens | `src/lib/spacing.ts` |
| Animation tokens | `src/lib/animations.ts` |
| Business constants | `src/lib/constants.ts` |
| Component visual examples | `src/pages/StyleGuide.tsx` |

> **Rule:** Tokens are the contract. If a component contradicts a token, the component is wrong — never the token.

### 15.2 Adding New Tokens

1. Justify why an existing token cannot serve the need.
2. Add the token in semantic terms (purpose, not appearance).
3. Document the token inline with `@example`.
4. Add to `StyleGuide.tsx` so it is visually verifiable.
5. Update this document.

### 15.3 Deprecating Tokens

1. Mark with `@deprecated` JSDoc.
2. Provide migration path in the comment.
3. Remove all usages in the same pull request.
4. Delete the token only after verification.

### 15.4 Review Cadence

- **Weekly:** Component-level visual QA on `/styleguide` route.
- **Monthly:** Brand truth audit against `brand-identity.ts`.
- **Quarterly:** Full accessibility re-scan (axe + manual).
- **Annually:** Type-scale and color-contrast re-validation.

### 15.5 Change Log

All meaningful design system changes are recorded as memory entries (`mem://style/*`, `mem://design/*`) and reflected in this document on the next compile.

---

## 16. Appendix — Token Quick Reference

### 16.1 Color One-Liners

```tsx
// Section
<section className={COMPONENT.section.dark}>            // bg-primary text-primary-foreground
<section className={COMPONENT.section.light}>           // bg-background text-foreground
<section className={COMPONENT.section.muted}>           // bg-muted text-foreground

// Text
<p className={getTextColor('dark', 'secondary')}>       // text-primary-foreground/80
<p className={getTextColor('light', 'tertiary')}>       // text-muted-foreground/70

// Button
<button className={getButtonColors('primary')}>          // gold CTA
<button className={getButtonColors('ghost', 'dark')}>   // ghost on navy
```

### 16.2 Typography One-Liners

```tsx
<h1 className={HEADLINE.hero.full}>...</h1>
<h2 className={HEADLINE.section.full}>...</h2>
<h3 className={HEADLINE.subsection.full}>...</h3>
<p  className={BODY.large.full}>...</p>
<p  className={BODY.standard.full}>...</p>
<span className={EYEBROW.standard.value}>SECTION LABEL</span>
<span className={STAT.hero.full}>1,300+</span>
<blockquote className={QUOTE.featured.full}>...</blockquote>
```

### 16.3 Spacing One-Liners

```tsx
<section className={`${SECTION_PADDING.light.combined} ${CONTAINER_PADDING.standard.combined}`}>
  <div className={`${MAX_WIDTH.standard} mx-auto`}>
    <div className={`grid ${CONTENT_GAP.grid.combined}`}>
      ...
    </div>
  </div>
</section>
```

### 16.4 Component Composition

```tsx
// Section pattern
<section className={`${SECTION_PADDING.light.combined} ${COMPONENT.section.light}`}>
  <div className={`${MAX_WIDTH.wide} mx-auto ${CONTAINER_PADDING.standard.combined}`}>
    <SectionDivider variant="accent" />
    <span className={EYEBROW.standard.value}>{TEXT.light.accent}>SECTION LABEL</span>
    <h2 className={HEADLINE.section.full}>The Headline</h2>
    <p className={`${BODY.large.full} ${TEXT.light.secondary} ${MAX_WIDTH.medium}`}>
      The supporting paragraph with measured line length.
    </p>
  </div>
</section>
```

---

## Closing Manifesto

> A world-class website is defined as much by what it refuses as by what it includes.
>
> Royal Mechanical's site refuses stock photos, refuses jargon, refuses dark patterns, refuses gimmicks.
> It chooses restraint, choses honesty, chooses craft.
>
> Every pixel must be earned. Every word must be true. Every interaction must respect the reader.
>
> When in doubt: **fewer choices, longer thought, better outcome.**

---

*Compiled by the design system team. Maintained alongside the live token files. Last reviewed: 2026-04-26.*
