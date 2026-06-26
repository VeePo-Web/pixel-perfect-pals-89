# Prompt 06 — Post-Booking Email Sequence

> Paste this entire prompt into Claude Code or Lovable.
> Requires the submit-booking edge function (built in the Booking Modal prompt).

---

```
═══════════════════════════════════════════════════════════════════════
 POST-BOOKING EMAIL SEQUENCE — Three-Email Resend Pipeline
 Cochrane Master Builders Universal Template
═══════════════════════════════════════════════════════════════════════

─────────────────────────────────────────────────────────────────────
ROLE
─────────────────────────────────────────────────────────────────────
You are building the automated email layer that closes the gap between
a lead submission and a signed job. Three emails. One template.
Zero hard-coded trade copy. Every trade in the network inherits this
system and only customises it via environment variables. The emails
must read as if a person wrote them — not a CRM sent them.

─────────────────────────────────────────────────────────────────────
CODEBASE CONTEXT
─────────────────────────────────────────────────────────────────────
Existing edge function: supabase/functions/submit-booking/index.ts
  — Already sends one internal alert email via Resend
  — Already inserts to booking_submissions table
  — Reads: RESEND_API_KEY, BOOKING_TO_EMAIL, BOOKING_FROM_EMAIL,
    BOOKING_FROM_NAME from Deno.env

booking_submissions table (migration 20260512000001):
  id, submission_id (uuid), site_slug, service_slug, name, email,
  phone, details, media_urls[], metadata jsonb, created_at

New table needed: booking_followups
  submission_id  uuid REFERENCES booking_submissions(submission_id)
  scheduled_at   timestamptz     ← 7 days after submission
  fired_at       timestamptz     ← null until sent
  cancelled_at   timestamptz     ← null unless booking confirmed
  site_slug      text

New env secrets (document in .env.example):
  SITE_BASE_URL        ← e.g. "https://cochrane-master-builders.com"
  FOLLOWUP_FROM_EMAIL  ← can match BOOKING_FROM_EMAIL
  FOLLOWUP_FROM_NAME   ← e.g. "Ryan at Cochrane Master Builders"

─────────────────────────────────────────────────────────────────────
THE THREE EMAILS
─────────────────────────────────────────────────────────────────────

EMAIL 1 — Client Confirmation (fires at submit)
  To: lead's email | From: BOOKING_FROM_NAME | Reply-to: BOOKING_TO_EMAIL
  Subject: "Your photos reached us — {name}, here's what happens next."
  Body:
    - Confirm receipt, name what they submitted
    - "You'll have a written, itemised quote within 24 hours. No sales call."
    - "Every quote is tied to our 15-year structural guarantee."
    - Sign-off: "— {BOOKING_FROM_NAME}" (plain name, not "The Team")
  No CTAs. No buttons. No links except a plain-text phone number.

EMAIL 2 — Internal Crew Alert (fires at submit, already exists — upgrade it)
  To: BOOKING_TO_EMAIL | Reply-to: lead's email
  Subject: "[{site_slug}] {service_slug} — {name} ({phone})"
  Body: Full submission table (Name / Email / Phone / Service / Community /
        Details / Files linked / Source / Submitted at / Submission ID)
  Replace current inline HTML with JSX email template.

EMAIL 3 — 7-Day Follow-Up (fires if no booking confirmed within 7 days)
  Trigger: pg_cron daily job checking booking_followups
  Cancel condition: if same email appears in booking_submissions within 7 days
  To: lead's email | From: FOLLOWUP_FROM_NAME
  Subject: "Still thinking about the {service_slug} work, {first_name}?"
  Body:
    - "A week ago you sent photos of a {service_slug} surface."
    - "If our quote didn't arrive, send the photos again — 24hr turnaround."
    - "If you've decided to hold off, no problem. The bands are there when ready."
    - Plain text link to /contact only. No CTA button.

─────────────────────────────────────────────────────────────────────
DELIVERABLES
─────────────────────────────────────────────────────────────────────

STEP 1 — Database migration
  Create: supabase/migrations/20260513000002_booking_followups.sql
  Create booking_followups table + index on (scheduled_at, fired_at).
  pg_cron job (if enabled): schedule fire-booking-followups at 09:00 daily.

STEP 2 — Create JSX email templates

  supabase/functions/_shared/transactional-email-templates/client-confirmation.tsx
  supabase/functions/_shared/transactional-email-templates/followup-7day.tsx

  Both use @react-email/components.

  client-confirmation.tsx props:
    name, email, phone, serviceSlug, community,
    mediaCount, submittedAt, fromName, siteBaseUrl

  followup-7day.tsx props:
    firstName, email, serviceSlug, community,
    fromName, fromEmail, siteBaseUrl

  Design system (both):
    Background #0f0f0f | Container #141414 max-width 600px
    Header #1a2230 | Eyebrow #C47D26 10px 0.22em uppercase
    Copper rule 1px solid #C47D26
    Body #c8c0b4 15px line-height 1.7
    Font: 'Helvetica Neue', Arial, sans-serif

STEP 3 — Update submit-booking/index.ts
  After existing Resend call:
    a) Send Email 1 to data.email via client-confirmation template
       idempotency_key: submissionId + "-client-confirm"
    b) Insert booking_followups row: scheduled_at = 7 days from now

STEP 4 — Create supabase/functions/fire-booking-followups/index.ts
  Query booking_followups: scheduled_at ≤ now(), fired_at IS NULL, cancelled_at IS NULL
  Cancel check: set cancelled_at if same email submitted again within 7 days
  For each unfired row: send Email 3, set fired_at = now()
  Print: fired count, skipped count

STEP 5 — Create .env.example in repo root
  Document all env secrets for the booking + email system.

─────────────────────────────────────────────────────────────────────
BRAND VOICE — EMAIL-SPECIFIC
─────────────────────────────────────────────────────────────────────
Email 1:
  - Never: "We're excited", "Thank you for reaching out", "We'll be in touch"
  - Open with "{Name}," — no greeting word before the name
  - No CTAs. No buttons.

Email 3:
  - One short paragraph before the practical middle section
  - Never apologise for following up
  - Never create urgency or scarcity
  - The word "still" in subject is intentional — do not change it

All emails:
  - No exclamation marks
  - Never "team" — always "we" or a personal name
  - Guarantees specific: "15-year structural guarantee"

─────────────────────────────────────────────────────────────────────
ACCEPTANCE GATES
─────────────────────────────────────────────────────────────────────
□ Client confirmation fires at submit (verify in Resend dashboard)
□ booking_followups row created with scheduled_at = 7 days out
□ fire-booking-followups sends Email 3 when scheduled_at is past
□ Cancelled rows are not fired (cancel check runs before fire step)
□ Both JSX templates render valid HTML email (test in Resend preview)
□ No "excited", "thrilled", "team", exclamation marks in any email body
□ Email 1 subject includes lead's name and the word "next"
□ Email 3 subject includes first_name and serviceSlug
□ .env.example documents all required secrets
□ Idempotency: same submissionId twice does not create duplicate rows or emails
```
