# Bespoke Heirloom Components

The 11 visual moments that make every Cochrane Master Builders trade site unmistakably the same family — while remaining fully remixable for 150+ sub-brands.

All strings source from `MASTER_REMIX` (remix-variables.ts) and `BESPOKE_CONFIG` (bespoke-config.ts). No brand copy lives inside these components.

## Components

| Component | What It Is | Key Placement |
|---|---|---|
| `MonogramC` | "The Foreman" — C letterform wearing a hardhat (tilts every 10s) | CMBTrio, loading, favicon |
| `MonogramM` | "The Craftsman" — M with a carpenter's pencil behind the right peak | CMBTrio, About hero |
| `MonogramB` | "The Local" — B cradling a to-go coffee cup with steam wisps | CMBTrio, footer |
| `CMBTrio` | Composer for all three letters, three modes: inline / stacked / loading | Footer Tier 2, About, modal |
| `BlueprintGrain` | Pure SVG architectural pattern at 1–2% opacity | Hero, footer |
| `CornerstoneStamp` | Circular notary seal with EST ring text + CMB monogram, rotates 60s | Hero bottom-right, thank-you |
| `PlumbLineDivider` | Copper hairline + plumb-bob diamond that drops on scroll | Between all major sections |
| `FoundationCounter` | Year counts up from 1900 → FOUNDATION_YEAR on view | Homepage trust band, footer |
| `HeroEtchedUnderline` | Hand-drawn copper bezier that draws itself on mount, 1.4s | Beneath every hero H1 |
| `GenerationalMarquee` | Ultra-slow marquee of slogan + ◆ separators, pauses on hover | Above footer sign-off |
| `MastersMark` | SVG hand-script signature drawn on view | End of About, Brand Story |
| `SloganHeartbeat` | Typography utility — slogan in 5 variants (nav/whisper/divider/footer/monument) | ≥7 surfaces per page |

## Motion Rules

- Idle animations: 7–12s cycles, ultra-subtle, never twitchy
- Entrances: opacity + translateY(12px→0), 600ms `cubic-bezier(0.16,1,0.3,1)`
- Stagger: 80ms between sibling elements, 120ms in hero
- `prefers-reduced-motion`: all animations fall back to static rendered state

## Remix Guide

To remix for Cochrane Tile Masters:
1. Set `MASTER_REMIX.BRAND_NAME = "Cochrane Tile Masters"` in trade.config.ts
2. Set `MASTER_REMIX.MONOGRAM_LETTERS = ["C","T","M"]` — the trio updates automatically
3. The CMB personifications (hardhat/pencil/coffee) remain as the *parent brand* attribution
4. `FOUNDATION_YEAR`, `BRAND_SLOGAN`, and cornerstone ring text never change per trade

## Attribution

Quotes used in implementation comments:
- "luxury-level, fantasy.co-inspired website with Apple-level UX precision and bespoke motion polish" — 1.2.1 Family Legacy Standard
- "slow, deliberate, heavy animations as opposed to fast, bouncy, cheap animations" — 1.5.1 UX Psychology System
- "bespoke, warm, authoritative tradition executed with fantasy.co polish" — 1.5 Brand Identity North Star
