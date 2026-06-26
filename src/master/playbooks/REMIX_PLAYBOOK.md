# REMIX PLAYBOOK — From master template to a live trade site in ~20 minutes

## Step 0 — Before you start

You should have:
- The new trade's name (e.g. "Cochrane Roofing")
- The kebab-case slug (e.g. `roofing`)
- A short list of services (3–5)
- (Optional) a brand-accent hue if this trade should lean a different color

If anything is missing, stop and gather it. Don't fake it.

## Step 1 — Click Remix in Lovable

The remix gives you a fresh fork of the master template with everything in `src/master/` already in place.

## Step 2 — Edit `src/config/trade.config.ts`

Touch only these blocks:
- `identity.name`, `identity.shortName`, `identity.trade`
- `services` (the 3–5 services for this trade)
- `palette.light.accent` (one HSL, optional)
- `seo.title`, `seo.description`

Don't touch typography, base palette, motion, or the master imports — they inherit.

## Step 3 — Open `/remix` in the preview

The `/remix` route shows your live checklist. Click **Generate logo for this trade** at the top — it calls the `generate-trade-logo` edge function, which uses the master logo as a reference and swaps the wordmark to the new trade name.

Wait ~10 seconds. Logo lands in `/public/logo.png` and `/public/og-image.png`. Confirm it looks right.

## Step 4 — Replace photography

Every photo slot in the master template uses placeholder paths. Generate trade-specific images via the AI image tool. **Hard rules:**
- No faces, no people
- Ultra-realistic, not illustration
- Match the master mood (calm, residential, controlled lighting)

See `AI_IMAGE_RULES.md` for prompt patterns.

## Step 5 — Rewrite copy

The master ships with drywall-flavored copy. Rewrite for this trade. **Don't paraphrase between sister sites — Google detects it.**

Affected files (search the repo for `Cochrane Drywall` to find them all):
- `src/pages/Index.tsx` — hero, problems-we-solve, why-us, FAQ
- `src/pages/<service-pages>.tsx` — one per service
- `src/components/drywall/Hero.tsx` and friends — copy props

The checklist on `/remix` flags any leftover "drywall" references automatically.

## Step 6 — Walk the checklist on `/remix`

Every item must be green or manually confirmed. The dashboard refuses to mark a remix "ready to ship" until all 20 items pass.

## Step 7 — Add this trade to the network

Open `src/master/trades.ts` and:
1. Add the new trade entry (slug, category, adjacent trades)
2. Once deployed, fill in the `url` field

This is what makes every other sister site cross-link to this one. Skipping it leaves the new site SEO-isolated.

## Step 8 — Deploy

Click **Publish** in Lovable. Done.

## Time budget

| Step | Target |
|---|---|
| Edit trade.config.ts | 3 min |
| Generate logo | 1 min |
| Replace photography | 5 min |
| Rewrite copy | 8 min |
| Walk checklist | 3 min |
| **Total** | **~20 min** |
