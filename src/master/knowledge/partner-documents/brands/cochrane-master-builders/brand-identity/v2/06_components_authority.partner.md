# 06 — Components Authority (CMB)

> Every block from the upload §10, expanded into a contract. Implementations must conform exactly.

---

## Hero

```
<Hero>
  <Eyebrow />            // 13 px, 500, all-caps
  <H1 />                 // t-8 / clamp(32, 6vw, 48)
  <SubheadlineTrust />   // t-4
  <CTAPrimary />         // filled --heritage-600
  <CTASecondary />       // text + border --heritage-600
  <ProofCards count="0..3" optional />
</Hero>
```

Rules:

- One H1.
- Primary CTA visible above fold on 360 × 640.
- No autoplay video. Static image or static SVG only.
- Hero photography drawn from cluster's main visual object (`08_imagery_photography`).

## Cards (universal)

- `border: 1px solid --border` on `--paper` fill.
- Radius: 6 px. *Not* 16/24 px — never SaaS rounded.
- Shadow: optional `0 1px 2px hsl(var(--graphite-900) / .04)`.
- Inner padding: `s-4` desktop, `s-3` mobile.
- Hover: 80 ms ease-out, lift 2 px, no color change.

## Buttons

| Variant | Background | Text | Border | Use |
|---------|------------|------|--------|-----|
| Primary | `--heritage-600` | `--bone` | none | All conversion CTAs |
| Secondary | transparent | `--heritage-600` | 1 px `--heritage-600` | Auxiliary |
| Tertiary | transparent | `--graphite-700` | none, underlined on hover | Inline links |

Sizes: 48 px height minimum (touch target). 16 px horizontal padding on mobile, 24 px desktop. **Never** neon, glow, or animated buttons.

## Forms (multi-step + photo upload)

- Multi-step on mobile (1 field per screen on `< sm`); single page on `≥ md`.
- Each field: label above (Space Grotesk 500, 13 px), helper below (Jost 400, 13 px) explaining *why* the field matters.
- Photo upload accepts up to 6 images, ≤ 8 MB each, jpeg/png/heic.
- Hidden fields: `domain`, `source`, `service`, `community` (for Areas pages) — required.
- Success state: calm — no confetti, no modals. Inline panel: "Thanks. We'll respond within one business day."

## Pricing Cards

```
<PricingCard tier="Small | Standard | Premium-Complex">
  <RangeMin /> – <RangeMax />        // tabular nums
  <Drivers items="..." />            // chip row
  <Assumptions />                    // small print, italic-banned
  <CTA />                            // tier-appropriate
</PricingCard>
```

Rules:

- Always shown as **range**.
- `Drivers` and `Assumptions` are required props — empty array fails build (knowledge-level requirement; future React contract).
- No "from $X" leading dollar — always range.

## Accordions

- Implement with semantic `<details><summary>` for FAQ / hidden-work / what-to-expect blocks.
- Keyboard accessible by default.
- Animation: 200 ms `ease-out` on `max-height` only.
- Icon: chevron, `transform: rotate(180deg)` on open. No bounce.

## Proof Cards

```
<ProofCard>
  <Scope />        // "Acreage roof replacement, 38 sq"
  <Location />     // "Glenbow Ranch area"
  <Challenge />
  <Approach />
  <Result />
  <Photos count="1..6" optional />
</ProofCard>
```

If `Photos` empty, render the **Honest Proof Framework** placeholder instead — never render fake imagery.

## Area Chips

- Pill, `--stone-100` border, `--graphite-700` text.
- Hover: `--moss-500` border (or cluster overlay accent).
- Group by region cluster (Cochrane / Bearspaw / Springbank / Bragg Creek / Cremona / Foothills) — never alphabetic flat list.

## Trust Bar (top of homepage)

- One line on `≥ lg`, two-line allowed on phone.
- `--paper` background, 13 px Space Grotesk 400, `--graphite-700`.
- Single sentence. No phone-number ticker, no rotating proof.

## Service Finder

- Search input + popular-service row + cluster cards + helper card.
- Minimum tap target 48 px on phone.
- Search performs client-side fuzzy match across the 115-domain registry.

## Mega-Menu (Navigation)

- 9 cluster columns from upload §9.
- Each column: cluster name (Space Grotesk 500, 15 px) + up to 8 in-cluster services + "View all in [cluster]" link at bottom.
- **Never** a flat 115-link list anywhere in the IA.

## Sticky Mobile Bar

- Two CTAs only: "Call" (tel:) and "Estimate" (opens contact form).
- Height 64 px + safe-area bottom inset.
- Calm — no glow, no shimmer, no haptic vibration triggers.

## Banned components / patterns

- Carousels with auto-rotation.
- Lightboxes with sound.
- Floating chat-bot bubbles with attention-grabbing pulses.
- Live-typing hero text.
- "Customers viewing this page" social-proof banners (fake urgency).

## Pass/Fail audit

- [ ] All buttons ≥ 48 px height on phone.
- [ ] No flat 115-link service list anywhere. Grep `service-list|all-services` markup manually.
- [ ] Pricing cards always show range — never fixed.
- [ ] Forms include `domain` + `source` + `service` hidden fields.
- [ ] Sticky mobile bar respects `env(safe-area-inset-bottom)`.
- [ ] No banned component pattern present.
