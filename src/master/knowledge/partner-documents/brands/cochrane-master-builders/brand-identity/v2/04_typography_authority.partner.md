# 04 — Typography Authority (CMB)

> Two typefaces. One scale. Strict numerals. No decorative scripts.

---

## Pairing (locked)

| Role | Family | Weights | Source |
|------|--------|---------|--------|
| Display | **Space Grotesk** | 300, 400, 500 | Google Fonts (self-host) |
| Body | **Jost** | 300, 400, 500 | Google Fonts (self-host) |
| Numerals (price + step counters) | Space Grotesk | 300, tabular | Same as display |

`font-display: swap`. Subset to Latin. Two weights per family loaded above the fold; the third weight may be lazy-loaded only if it appears on that page.

## Modular scale (9 steps, 1.20 ratio)

| Step | Name | Size | Line-height | Weight | Tracking |
|------|------|------|-------------|--------|----------|
| `t-1` | Caption | 13 px | 1.55 | 400 | 0.02 em |
| `t-2` | Body S | 15 px | 1.65 | 400 | 0 |
| `t-3` | Body | 17 px | 1.70 | 400 | 0 |
| `t-4` | Body L | 19 px | 1.65 | 400 | 0 |
| `t-5` | H4 | 22 px | 1.45 | 500 | -0.005 em |
| `t-6` | H3 | 28 px | 1.35 | 500 | -0.01 em |
| `t-7` | H2 | 36 px | 1.25 | 500 | -0.015 em |
| `t-8` | H1 | 48 px | 1.15 | 400 | -0.02 em |
| `t-9` | Display | 64 px | 1.10 | 300 | -0.025 em |

(Mobile auto-scales by `clamp()`; H1 floor 32 px, ceiling 48 px on phone.)

## Hierarchy rules

- One H1 per page — always the page subject.
- Eyebrow (Space Grotesk 500, 13 px, all-caps, +0.08 em tracking) sits 8 px above each H2 in editorial blocks.
- Body never set in all-caps.
- Italic only for cited project names or quotes — never for emphasis chains.
- No script / decorative typefaces. Ever.

## Numerals (prices + step counters)

- Tabular figures (`font-variant-numeric: tabular-nums`).
- Space Grotesk 300.
- Currency mark detached: `$` `12,400` (thin space).
- Ranges shown with en-dash: `$12,400 – $18,200`.
- Pricing drivers chip: 13 px, 400, sentence-case.

## Body copy rules

- Measure 60–75 ch on body paragraphs.
- Line-height 1.7 on long body, 1.55 on captions, 1.25 on H1+.
- Paragraph rhythm: 16 px gap below body paragraphs; 24 px above H3/H4.
- No double spaces. No double hyphens — use real em-dashes.

## Banned typographic patterns

- All-caps body text.
- Decorative serifs / scripts / handwriting fonts.
- Italic emphasis chains.
- Letter-spacing on body copy.
- Drop caps.
- Justified body text (always left-aligned).
- Color-only emphasis (`<span class="text-brass">` etc.).

## Pass/Fail audit

- [ ] Only Space Grotesk + Jost loaded. Auditor grep: `rg -n "font-family|@import.*fonts" src/index.css src/styles`
- [ ] Max 4 font faces over-the-wire on any route. Network-tab manual check.
- [ ] No `text-uppercase` on body / paragraph elements. Grep: `rg -n "uppercase" src/components | rg -v "(eyebrow|label|chip|kbd)"`
- [ ] No banned families anywhere. Grep: `rg -n "Playfair|Merriweather|Lobster|Pacifico|Dancing|Comic" src/`
- [ ] H1 count = 1 per route. Manual or `axe`.
