/**
 * seed-reviews.ts — Insert local REVIEWS array into Supabase.
 *
 * Idempotent: skips any row where reviewer_name + review_date already exists
 * for this site_slug. Safe to run multiple times.
 *
 * Usage:
 *   SUPABASE_URL=xxx \
 *   SUPABASE_SERVICE_ROLE_KEY=xxx \
 *   npx tsx scripts/seed-reviews.ts
 *
 *   Optional override:
 *   TRADE_SLUG=cochrane-tile npx tsx scripts/seed-reviews.ts
 */

// tsx resolves TS path aliases via tsconfig — import directly from src
import { createClient } from "@supabase/supabase-js";

// ─── Env validation ───────────────────────────────────────────────────────────
const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "\n❌  Missing required env vars: SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY\n"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const SITE_SLUG = process.env.TRADE_SLUG ?? "master";

// ─── Inline the seed data (avoids tsconfig path-alias resolution in scripts) ──
// Keep this in sync with src/config/reviews.ts when reviews are updated.
const SEED = [
  { name: "Jordan M.",  community: "Sunset Ridge",    service: "Repair",       rating: 5.0, date: "March 2026",    quote: "We had a long crack running down a hallway wall that other guys kept telling us was 'just settling.' They patched it properly, blended it in, and you genuinely cannot find it. In and out in an afternoon, no dust through the rest of the house." },
  { name: "Priya S.",   community: "Heritage Hills",  service: "Painting",     rating: 5.0, date: "February 2026", quote: "Asked for a repaint after we patched a few spots ourselves. They re-did our patches first, then painted — the wall reads as new. Quote was clear, arrival window was on the dot." },
  { name: "Marcus L.",  community: "Fireside",        service: "Garage",       rating: 5.0, date: "February 2026", quote: "Took our garage from bare framing to insulated, boarded, and painted in one window. They covered the floor, swept up every night, and we could park back in by the weekend. The space finally feels like part of the house." },
  { name: "Elena R.",   community: "Riverview",       service: "Basement",     rating: 5.0, date: "January 2026",  quote: "Walls-only basement starter package. Our basement is warmer, quieter, and finished enough to actually use, without us committing to a full reno. Exactly what was promised, no upsell pressure." },
  { name: "Tom K.",     community: "Cochrane",        service: "Repair",       rating: 5.0, date: "January 2026",  quote: "Doorknob hole behind the door — small job, half the contractors I called wouldn't even quote it. These guys showed up, patched, primed, and painted. Charged what they said they would." },
  { name: "Rachel D.",  community: "Redwood Meadows", service: "Painting",     rating: 4.9, date: "December 2025", quote: "Repaint of two bedrooms after we had a small ceiling leak repaired. Lines are sharp, edges are clean, no drips on the trim. I could tell they actually cared about the finish." },
  { name: "Andrew P.",  community: "Harmony",         service: "Installation", rating: 5.0, date: "December 2025", quote: "We needed drywall on a partial basement section the previous owner never finished. They scoped it honestly — told me what didn't need doing — and the boarding and tape job is dead flat. Hard to find that level of care for a smaller job." },
  { name: "Steph N.",   community: "Bragg Creek",     service: "Garage",       rating: 5.0, date: "November 2025", quote: "Single-bay garage — boarded and painted into a clean working space. They were one of the only local crews willing to drive out, and the quote held. Dust containment was way better than I expected." },
  { name: "Will B.",    community: "Sunset Ridge",    service: "Basement",     rating: 5.0, date: "November 2025", quote: "Soundproofed and boarded the basement ceiling so the kids' footsteps stop owning the room. Crew was respectful in the house, took shoes off, the whole thing. Would book again without thinking about it." },
  { name: "Hannah J.",  community: "Calgary",         service: "Repair",       rating: 4.8, date: "October 2025",  quote: "Multiple patches across the main floor after we moved a few light fixtures. They came in, mapped the spots with me, and you cannot tell where any of them were. Communication via text was actually responsive." },
  { name: "Devon C.",   community: "Airdrie",         service: "Installation", rating: 5.0, date: "October 2025",  quote: "Boarded a brand-new ceiling in our laundry room after some plumbing work. Clean cuts around the vent and light box, and they vacuumed the laundry machines off before they left. Small thing, but it matters." },
  { name: "Megan O.",   community: "Heritage Hills",  service: "Painting",     rating: 5.0, date: "September 2025", quote: "Whole-room refresh after a furniture rearrangement exposed every old scuff and nail hole. Patched, primed, and painted — the room genuinely feels new. Honest pricing, no surprises on the invoice." },
] as const;

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n🌱  Seeding ${SEED.length} reviews → site_slug="${SITE_SLUG}"\n`);

  let inserted = 0;
  let skipped  = 0;
  let errored  = 0;

  for (const r of SEED) {
    // Idempotency: skip if reviewer_name + review_date already exists
    const { data: existing, error: checkErr } = await supabase
      .from("reviews")
      .select("id")
      .eq("site_slug", SITE_SLUG)
      .eq("reviewer_name", r.name)
      .eq("review_date", r.date)
      .maybeSingle();

    if (checkErr) {
      console.error(`  ⚠️  Check error for "${r.name}": ${checkErr.message}`);
      errored++;
      continue;
    }

    if (existing) {
      console.log(`  ↩️   Skipped (exists): ${r.name} — ${r.date}`);
      skipped++;
      continue;
    }

    const { error: insertErr } = await supabase.from("reviews").insert({
      site_slug:     SITE_SLUG,
      reviewer_name: r.name,
      community:     r.community,
      service:       r.service,
      rating:        r.rating.toFixed(1),
      review_date:   r.date,
      quote:         r.quote,
      approved:      true,
      source:        "manual",
    });

    if (insertErr) {
      console.error(`  ❌  Insert error for "${r.name}": ${insertErr.message}`);
      errored++;
    } else {
      console.log(`  ✅  Inserted: ${r.name}  ★${r.rating}  ${r.date}`);
      inserted++;
    }
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Seed complete for "${SITE_SLUG}"
  Inserted:  ${inserted}
  Skipped:   ${skipped}
  Errors:    ${errored}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);

  process.exit(errored > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
