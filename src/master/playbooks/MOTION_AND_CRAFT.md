# MOTION & CRAFT — Phase 5b, the FROG-level layer

> If Phase 5 (Visual) sets what the user sees, this phase sets what the user *feels*. Apple-grade restraint, Fantasy.co-grade editorial detail, Linear-grade interaction precision, FROG-grade ergonomics. The line between a good site and a great one lives here.

---

## Principles (master defaults — override only with documented reason)

1. **Light reveals material** — images and sections enter as if light is moving across them, not as if they popped in
2. **Restraint over spectacle** — one signature moment per scroll-screen, never three
3. **Tactile feedback on every input** — buttons feel pressed, fields feel focused, links feel hovered
4. **Choreography over solo** — staggered reveals beat synchronized ones (60–120ms stagger)
5. **Motion is content** — every animation tells the user *what just happened* or *what will happen next*
6. **Reduced motion is first-class** — every animation has a static or reduced equivalent (Apple a11y bar)
7. **60fps or it doesn't ship** — transforms + opacity only; no animating width/height/top/left
8. **One easing system** — site-wide consistency beats per-element creativity

## Easing curves (pin these)

| Use | Curve | Token name |
|---|---|---|
| Entry (reveal, fade-in, scale-in) | `cubic-bezier(.16, 1, .3, 1)` | `--ease-entry` |
| Exit (fade-out, dismiss) | `cubic-bezier(.7, 0, .84, 0)` | `--ease-exit` |
| In-out (toggles, accordion) | `cubic-bezier(.65, 0, .35, 1)` | `--ease-inout` |
| Spring-feel (modals, tactile) | `cubic-bezier(.34, 1.56, .64, 1)` | `--ease-spring` |
| Linear (only for continuous, e.g. shimmer) | `linear` | `--ease-linear` |

Document these in `src/index.css` and reference everywhere. **Do not hand-type cubic-bezier values in component code.**

## Duration ladder

| Action | Duration |
|---|---|
| Micro (hover color, focus ring) | 120–180ms |
| Small (button press, toggle) | 180–240ms |
| Medium (modal, accordion, card hover lift) | 240–360ms |
| Large (page transition, hero reveal) | 600–900ms |
| Hero / cinematic | 900–1400ms (only when meaningful) |

> If you're tempted to go above 1400ms, ask whether you're respecting the user's time.

## Stagger system

- Default stagger: **80ms**
- Hero text stagger: **120ms** (headline → sub → CTA)
- Card grid stagger: **60ms** (caps at 8 items, then disappears)
- Above 12 items: stagger reads as lag — drop to 40ms or batch

## Per-surface motion specs

### Page transitions
- Master cloth-wipe (per existing memory) — full-screen asphalt overlay sweeps across viewport, mimics millwork wipe
- Duration 700ms entry + 600ms exit
- `prefers-reduced-motion`: instant cross-fade

### Hero
- Image: bottom-to-top `clip-path` reveal, 900ms `--ease-entry`
- Cursor parallax: 3–5% translate, eased
- "Showroom spotlight" radial gradient follows cursor (per existing memory) — desktop only
- Reduced motion: static image, no parallax, no spotlight

### Section reveals (on scroll)
- Triggered at 15% in viewport
- Staggered children (80ms)
- `translateY(24px) → 0` + `opacity 0 → 1`, 600ms `--ease-entry`
- Once only (no replay on scroll back)

### Buttons
- Hover: `transform: translateY(-1px)` + shadow lift, 180ms `--ease-inout`
- Active: `transform: scale(.97)`, 120ms (tactile press)
- Focus: 2px ring offset 2px, instant
- Loading: copy slides up, spinner slides in, 200ms

### Links (story-link pattern)
- Underline scales `0 → 100%` from origin-bottom-left on hover, 300ms

### Cards
- Hover: lift 4px + shadow grow, image zooms 1.04 over 600ms (Ken Burns feel)
- Focus: same as hover, plus ring

### Modals (booking modal especially)
- Entry: scrim fades in 200ms; modal scales `.96 → 1` + slides `8px → 0` + fades, 360ms `--ease-spring`
- Focus moves to first input on open
- Exit: reverses, 240ms `--ease-exit`
- Escape closes; backdrop click closes; focus returns to trigger
- Step indicator (per booking-modal memory): 4 dots, current pulses, completed fill in

### Forms
- Field focus: border color animates 180ms, label floats up if floating-label pattern
- Field validation: error shake 200ms (translate 4px / -4px / 2px / 0), red ring fades in
- Field success: subtle green pulse 240ms
- Submission: signature animation per master memory (e.g. dirt-to-clean particles) — never a generic spinner on a brand site

### Loading sequence (initial site load)
- 5-phase per existing memory: enter → hold → suspend → exit → done
- "Suspend" phase: brief pause that signals craft (don't skip — it's the signature)
- Total budget: <1.6s on cold load

## Tactile feedback rules

- Every clickable surface has hover (desktop) AND active (touch) state
- Touch active state visible within 50ms of touchstart
- Optional `navigator.vibrate(8)` on critical CTAs (book, submit) — feature-detect
- No "dead" surfaces — if it looks tappable, it must respond

## Frame budget rules

- Animate `transform`, `opacity`, `filter` only
- Never animate `width`, `height`, `top`, `left`, `margin`, `padding`
- Use `will-change: transform` only on actively animating elements; remove after
- For long lists, use `content-visibility: auto`
- For parallax, use `transform: translate3d(0, ..., 0)` to force GPU

## Reduced-motion fallback rules

In `index.css`:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Then for each signature animation, provide a static alternative:
- Hero clip-path → instant fade-in
- Cloth-wipe page transition → cross-fade
- Cursor parallax → disabled
- Card Ken Burns → static image
- Loading sequence → skip suspend phase, go straight to ready

## Craft benchmarks (study before building)

| Site | What to steal |
|---|---|
| `apple.com/airpods-pro` | Scroll-driven hero, type rhythm, restraint |
| `apple.com/iphone-15-pro` | Section pacing, image treatment, motion timing |
| `fantasy.co` | Visual edge, asymmetric grids, cursor work |
| `linear.app` | Modal craft, easing language, keyboard-first feel |
| `stripe.com/payments` | Form craft, trust placement, copy density |
| `christophergawryletz.com` | Editorial luxury, white space, type pairings |
| `frog.co` | Interaction philosophy, micro-interactions ergonomics |

## Verification

For every motion item to be marked done:

1. DevTools Performance tab: record the interaction. Frames green. No long tasks.
2. Toggle `prefers-reduced-motion`. Confirm fallback works.
3. Real device test (iPhone 12 or older Android): no jank, no lag, taps feel instant.
4. Lighthouse: TBT < 200ms, no CLS introduced by animation.
5. Manual: tab through every interactive surface — focus visible at every stop.

---

## Sign-off

Phase 5b signs off when every interactive surface has hover + active + focus, every reveal uses the easing system, the booking modal animates per spec, the loading sequence runs all 5 phases, prefers-reduced-motion fallbacks exist for every signature, and DevTools shows 60fps on mid-tier mobile.
