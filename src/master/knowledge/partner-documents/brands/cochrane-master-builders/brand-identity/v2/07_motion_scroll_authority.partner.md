# 07 — Motion & Scroll Authority (CMB)

> Motion exists to confirm interaction and reveal hierarchy. It does not perform. It is never decoration.

---

## Duration scale

| Token | ms | Use |
|-------|-----|-----|
| `m-fast` | 120 | Hover, focus rings |
| `m-base` | 240 | Default transitions |
| `m-reveal` | 360 | Scroll reveals |
| `m-hero` | 600 | Hero / page transitions |

## Easing

- Default: `cubic-bezier(0.16, 1, 0.3, 1)` (gentle out).
- Hover: `ease-out`.
- Accordion: `ease-out`.
- **Banned:** spring physics, bounce, elastic, overshoot.

## Stagger sequence

| Pattern | Step | Cap |
|---------|------|-----|
| Trust bar items | 60 ms | 4 |
| Pricing cards | 100 ms | 3 |
| Process steps | 80 ms | 8 |
| Proof cards | 120 ms | 6 |

Stagger never exceeds 800 ms total wall-time.

## Properties allowed in animation

- `transform` (`translateY`, `translateX`, `scale`, `rotate`).
- `opacity`.
- `clip-path` only on hero seam reveal.

**Banned animated properties:** `width`, `height`, `top/left/right/bottom`, `margin`, `padding`, `box-shadow`, `background-position`, `filter` (except `opacity`).

## Scroll reveal recipe

```
const io = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) entry.target.dataset.revealed = "true";
}, { threshold: 0.15, rootMargin: "0px 0px -10% 0px" });
```

CSS:

```
[data-reveal] { opacity: 0; transform: translateY(16px); transition: 360ms cubic-bezier(.16,1,.3,1); }
[data-reveal][data-revealed="true"] { opacity: 1; transform: none; }
```

`will-change: transform, opacity` set on element only when about to animate; cleared after.

## Reduced motion (mandatory)

```
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Plus: scroll-reveals fall back to immediate `opacity: 1; transform: none` (no fade).

## Banned motion patterns

- Scroll-hijack (any handler that calls `preventDefault` on wheel/touchmove).
- Parallax on timelines or pricing cards.
- Autoplay video, even muted.
- Marquee text (auto-scrolling banners).
- Cursor-following spotlight on body content (allowed only on hero, optional, max one).
- Numeric count-up animations on prices.
- Loading spinners > 600 ms (use skeleton instead).

## Pass/Fail audit

- [ ] No scroll-hijack handlers. Grep: `rg -n "wheel|touchmove" src/components | rg "preventDefault"`
- [ ] No banned animated property in CSS / styled. Grep: `rg -n "transition.*(width|height|top|left|margin|padding)" src/`
- [ ] `prefers-reduced-motion` respected globally.
- [ ] No autoplay video. Grep: `rg -n "<video[^>]*autoplay" src/`
- [ ] All animations use the duration tokens (not arbitrary ms).
