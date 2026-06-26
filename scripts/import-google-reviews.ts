/**
 * import-google-reviews.ts — Pull Google Place reviews into Supabase.
 *
 * Idempotent: rows with a matching google_review_id are skipped.
 * All imports land as approved=false and require admin approval.
 *
 * Usage:
 *   GOOGLE_PLACES_API_KEY=xxx \
 *   GOOGLE_PLACE_ID=xxx \
 *   SUPABASE_URL=xxx \
 *   SUPABASE_SERVICE_ROLE_KEY=xxx \
 *   npx tsx scripts/import-google-reviews.ts
 *
 * Or via npm: npm run reviews:import (set env vars in .env.local first)
 */

import { createClient } from "@supabase/supabase-js";

// ─── Env validation ───────────────────────────────────────────────────────────
const {
  GOOGLE_PLACES_API_KEY,
  GOOGLE_PLACE_ID,
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
} = process.env;

const missing = [
  !GOOGLE_PLACES_API_KEY && "GOOGLE_PLACES_API_KEY",
  !GOOGLE_PLACE_ID        && "GOOGLE_PLACE_ID",
  !SUPABASE_URL           && "SUPABASE_URL",
  !SUPABASE_SERVICE_ROLE_KEY && "SUPABASE_SERVICE_ROLE_KEY",
].filter(Boolean) as string[];

if (missing.length > 0) {
  console.error(`\n❌  Missing required env vars: ${missing.join(", ")}\n`);
  process.exit(1);
}

// ─── Clients ──────────────────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

// ─── Types ────────────────────────────────────────────────────────────────────
interface GoogleReview {
  author_name: string;
  author_url?: string;
  profile_photo_url?: string;
  rating: number;               // 1–5 integer
  relative_time_description: string;
  text: string;
  time: number;                 // Unix timestamp
}

interface PlacesResponse {
  result?: {
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

// ─── Derive a display-format date from Unix timestamp ────────────────────────
const formatDate = (unixTs: number): string => {
  const d = new Date(unixTs * 1000);
  return d.toLocaleDateString("en-CA", { month: "long", year: "numeric" });
};

// ─── Derive site_slug from env or default ────────────────────────────────────
const SITE_SLUG = process.env.TRADE_SLUG ?? "master";

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log(`\n📥  Importing Google reviews for Place ID: ${GOOGLE_PLACE_ID}`);
  console.log(`    Site slug: ${SITE_SLUG}\n`);

  // 1. Fetch from Google Places API
  const url =
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${GOOGLE_PLACE_ID}` +
    `&fields=reviews` +
    `&reviews_sort=newest` +
    `&key=${GOOGLE_PLACES_API_KEY}`;

  const res = await fetch(url);
  if (!res.ok) {
    console.error(`❌  Google Places API HTTP error: ${res.status}`);
    process.exit(1);
  }

  const json = (await res.json()) as PlacesResponse;

  if (json.status !== "OK") {
    console.error(`❌  Google Places API error: ${json.status}`);
    if (json.error_message) console.error(`    ${json.error_message}`);
    process.exit(1);
  }

  const googleReviews = json.result?.reviews ?? [];
  if (googleReviews.length === 0) {
    console.log("ℹ️   No reviews returned from Google.\n");
    process.exit(0);
  }

  console.log(`    Found ${googleReviews.length} review(s) from Google.\n`);

  // 2. Process each review
  let inserted = 0;
  let skipped  = 0;
  let errored  = 0;

  for (const gr of googleReviews) {
    // Build a stable ID from author + timestamp (Google doesn't expose review IDs)
    const googleReviewId = `${GOOGLE_PLACE_ID}__${gr.author_name}__${gr.time}`;

    // 2a. Idempotency check
    const { data: existing, error: checkErr } = await supabase
      .from("reviews")
      .select("id")
      .eq("google_review_id", googleReviewId)
      .maybeSingle();

    if (checkErr) {
      console.error(`  ⚠️  Check error for "${gr.author_name}": ${checkErr.message}`);
      errored++;
      continue;
    }

    if (existing) {
      console.log(`  ↩️   Skipped (already exists): ${gr.author_name}`);
      skipped++;
      continue;
    }

    // 2b. Skip reviews with no text
    if (!gr.text?.trim()) {
      console.log(`  ↩️   Skipped (no text): ${gr.author_name}`);
      skipped++;
      continue;
    }

    // 2c. Insert as unapproved
    const { error: insertErr } = await supabase.from("reviews").insert({
      site_slug:        SITE_SLUG,
      reviewer_name:    gr.author_name,
      community:        "Cochrane",         // default — refine in admin dashboard
      service:          "Installation",     // default — refine in admin dashboard
      rating:           gr.rating.toFixed(1),
      review_date:      formatDate(gr.time),
      quote:            gr.text.trim(),
      approved:         false,              // requires admin approval
      source:           "google",
      google_review_id: googleReviewId,
      google_author_url: gr.author_url ?? null,
    });

    if (insertErr) {
      console.error(`  ❌  Insert error for "${gr.author_name}": ${insertErr.message}`);
      errored++;
    } else {
      console.log(`  ✅  Inserted (pending approval): ${gr.author_name}  ★${gr.rating}`);
      inserted++;
    }
  }

  // 3. Summary
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Import complete
  Inserted (pending approval): ${inserted}
  Skipped (duplicate):         ${skipped}
  Errors:                      ${errored}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Approve reviews in the Supabase dashboard:
  Table: public.reviews  →  Set approved = true
`);

  process.exit(errored > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
