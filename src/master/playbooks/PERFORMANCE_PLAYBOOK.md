# PERFORMANCE PLAYBOOK — Budgets every CMB site holds

## Budgets (mobile, throttled 4G)

| Metric | Target | Hard cap |
|---|---|---|
| Lighthouse Performance | ≥ 90 | ≥ 85 |
| LCP | < 2.0s | < 2.5s |
| CLS | < 0.05 | < 0.1 |
| TBT | < 150ms | < 300ms |
| Total page weight | < 1.5 MB | < 2.5 MB |
| Hero image | < 200 KB | < 400 KB |

## Image rules

- Save as `.jpg` (not PNG) for photographs
- Max width 1920px, served via `srcset` for retina
- Lazy-load everything below the fold (`loading="lazy"`)
- Hero gets `fetchpriority="high"` and is preloaded in `index.html`
- Use the existing `EditorialImage` / `BeforeAfterPair` components — they already handle this

## Font loading

- One headline family + one UI family — never more
- `font-display: swap` (already set in the Google Fonts URL)
- Preconnect to `fonts.gstatic.com` in `index.html`

## JS budget

- The shared bundle is the master template's bundle. Don't add new dependencies casually.
- Per-trade additions go into route-level lazy chunks.

## Verification

Before deploying any remix:
```bash
npm run build
# Then run Lighthouse on the built site
```

If any budget fails, fix before publishing. The `/remix` checklist surfaces this as `perf-budget-green`.
