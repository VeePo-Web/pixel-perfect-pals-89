# 11 — Performance, Accessibility, Governance (CMB)

> Owner: **Performance Engineer + Auditor.** Hard gates. No publish without all checks green.

---

## Performance budget (hard)

| Metric | Desktop | Mobile |
|--------|---------|--------|
| LCP | ≤ 2.0 s | ≤ 2.5 s |
| CLS | ≤ 0.05 | ≤ 0.05 |
| INP | ≤ 200 ms | ≤ 200 ms |
| TBT | ≤ 150 ms | ≤ 200 ms |
| First-load JS (gz) | ≤ 160 KB | ≤ 160 KB |
| Hero image (delivered) | ≤ 180 KB | ≤ 120 KB |
| Card image (delivered) | ≤ 80 KB | ≤ 60 KB |
| Total page weight (median route) | ≤ 1.4 MB | ≤ 1.0 MB |
| Web font faces over the wire | ≤ 4 | ≤ 4 |
| Third-party JS | 0 | 0 |
| Lighthouse (Perf / A11y / BP / SEO) | ≥ 95 / 100 / 100 / 100 | ≥ 90 / 100 / 100 / 100 |

If any number fails on any route: **do not publish.** Re-architect the offending section.

## Accessibility gates

- axe-core: 0 critical, 0 serious.
- All interactive elements keyboard-reachable in DOM order.
- Focus ring visible on every focusable element (`outline: 2px solid hsl(var(--ring))` minimum).
- Form fields labeled (`<label for>` or `aria-labelledby`).
- Color is never the sole carrier of meaning.
- Reduced-motion respected (see `07_…`).
- Heading order monotonic (no h1 → h3 jumps).

## 18-item anti-pattern grep bundle (Auditor)

```bash
# 1. Raw hex
rg -n "#[0-9a-fA-F]{3,6}\b" src/components src/pages | grep -v 'svg'
# 2. Banned Tailwind colors
rg -n "(text|bg)-(black|white)\b" src/components src/pages
# 3. Banned families
rg -n "Playfair|Merriweather|Lobster|Pacifico|Dancing|Comic" src/
# 4. Banned voice words
rg -n -i "(premium|luxury|amazing|seamless|tailored|world-class|unleash|elevate|journey|game-?changer|state-of-the-art|book now|limited time)" src/components src/pages content/
# 5. Off-scale spacing
rg -n "p[xytblr]?-\[[0-9]+px\]" src/components src/pages
# 6. Animated banned properties
rg -n "transition.*(width|height|top|left|margin|padding|box-shadow|background-position)" src/
# 7. Scroll hijack
rg -n "wheel|touchmove" src/components | rg "preventDefault"
# 8. Autoplay video
rg -n "<video[^>]*autoplay" src/
# 9. Missing alt text
rg -n "alt=\"\"|alt=\"image\"|alt=\"photo\"" src/
# 10. Multiple H1
for f in src/pages/*.tsx; do c=$(rg -c "<h1" "$f" 2>/dev/null || echo 0); [ "$c" != "0" ] && [ "$c" -gt 1 ] && echo "$f: $c h1"; done
# 11. Title Case headlines (sample)
rg -n ">[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+<" src/components src/pages
# 12. Exclamation marks outside quoted text
rg -n "!\"|!'|!\\}" src/components src/pages
# 13. nofollow on internal links
rg -n "rel=\"nofollow\"" src/components src/pages
# 14. Carousels / auto-rotate
rg -n "autoplay|autoPlay|setInterval.*slide|swiper" src/components
# 15. Floating chat / notification pulses
rg -n "animate-pulse" src/components | rg -i "chat|toast|notif"
# 16. Fake urgency
rg -n -i "limited|today only|hurry|book before|deal ends" src/
# 17. Console.log in shipped code
rg -n "console\.log" src/components src/pages
# 18. Inline style attribute
rg -n "style=\\{" src/components src/pages
```

Each greps returning rows = **fail.** Document & fix.

## 5-question decision filter (every change must pass)

1. Does it explain the work?
2. Does it explain the price?
3. Does it surface the family-owned standard?
4. Does it sound like Cochrane, not "Anywhere"?
5. Does it leave the visitor feeling safe to contact?

## Sign-off chain

| Step | Owner | Artifact |
|------|-------|----------|
| 1 | Brand Identity Architect | North Star (v2 `01_…`) signed for the engagement. |
| 2 | Master Style Guide Architect | All v2 `02–08` files reviewed for the proposed change. |
| 3 | Master Copywriter | v2 `09_…` voice + lexicon greps green. |
| 4 | Template Architect | Page composition matches the §4 / §5 / Process locked block orders. |
| 5 | SEO Virtuoso + SEO FAQ | v2 `10_…` schema + title/meta verified. |
| 6 | Performance Engineer | Lighthouse + axe + budget table green. |
| 7 | Auditor | 18-item grep bundle returns zero rows. |
| 8 | Mermaid Mapper | (On-request) Updated diagram added to plan. |

Publish only when all eight steps return green.

## Change-log protocol

- Every v2 file change opens a row in v2 `00_…` change-log table.
- Brand Spine changes (v2 `01_…`) require Brand Identity Architect + Founder approval.
- Token additions (v2 `03_…` / `04_…` / `05_…`) require Master Style Guide Architect approval.
- Voice lexicon additions (v2 `09_…`) require Master Copywriter approval.

## Versioning

- v2.x for any non-breaking addition.
- v3.0 only for a Brand Spine reset (would require a new North Star authoring pass).

## Pass/Fail audit

- [ ] Every metric in the budget table green on every route, both viewports.
- [ ] axe: 0 critical / 0 serious.
- [ ] All 18 grep checks return zero rows.
- [ ] 5-question filter applied and documented per change.
- [ ] Sign-off chain entries logged for the release.
