/**
 * submit-booking — Universal Booking Edge Function
 *
 * Receives JSON from the booking form, validates server-side,
 * inserts into booking_submissions, and sends via Resend.
 *
 * Env secrets required (set in Supabase dashboard):
 *   RESEND_API_KEY        — Resend API key
 *   BOOKING_TO_EMAIL      — single CMB inbox (e.g. leads@cochrane-master-builders.com)
 *   BOOKING_FROM_EMAIL    — verified Resend sender (e.g. noreply@cochrane-master-builders.com)
 *   BOOKING_FROM_NAME     — sender display name (e.g. "Cochrane Master Builders")
 */

// @ts-ignore — Deno
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore — Deno
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.104.1";
import { bookingSubmissionSchema } from "../_shared/booking-schema.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT = 5;           // max submissions
const RATE_WINDOW_MINUTES = 10; // per window

// ── Helpers ────────────────────────────────────────────────────────────────

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function hashIp(ip: string): string {
  // Simple base64 obfuscation — not cryptographic, just avoids storing raw IPs
  return btoa(ip).slice(0, 32);
}

function buildEmailHtml(data: {
  name: string;
  email: string;
  phone: string;
  details?: string;
  serviceSlug?: string;
  siteSlug?: string;
  mediaUrls: string[];
  submittedAt?: string;
  source?: string;
}): string {
  const mediaSection =
    data.mediaUrls.length > 0
      ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <span style="color:#8a8a8a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Photos / Video</span><br>
          ${data.mediaUrls.map((url, i) => `<a href="${url}" style="color:#C47D26;font-size:13px;">File ${i + 1} →</a>`).join("  &nbsp; ")}
         </td></tr>`
      : "";

  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#0f0f0f;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;">
  <tr>
    <td style="background:#1a2230;padding:32px 40px;border-bottom:1px solid #C47D26;">
      <p style="margin:0;color:#C47D26;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;">
        ${data.siteSlug ?? "Cochrane Master Builders"}
      </p>
      <h1 style="margin:12px 0 0;color:#f5f0e8;font-size:28px;font-weight:300;letter-spacing:-0.02em;line-height:1.1;">
        New ${data.serviceSlug ? data.serviceSlug.replace(/-/g, " ") + " " : ""}enquiry
      </h1>
    </td>
  </tr>
  <tr>
    <td style="background:#141414;padding:32px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <span style="color:#8a8a8a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Name</span><br>
          <strong style="color:#f5f0e8;font-size:17px;font-weight:400;">${data.name}</strong>
        </td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <span style="color:#8a8a8a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Email</span><br>
          <a href="mailto:${data.email}" style="color:#C47D26;font-size:15px;">${data.email}</a>
        </td></tr>
        <tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <span style="color:#8a8a8a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Phone</span><br>
          <a href="tel:${data.phone}" style="color:#C47D26;font-size:15px;">${data.phone}</a>
        </td></tr>
        ${data.details ? `<tr><td style="padding:12px 0;border-bottom:1px solid #2a2a2a;">
          <span style="color:#8a8a8a;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">Project details</span><br>
          <p style="color:#c8c0b4;font-size:14px;line-height:1.6;margin:8px 0 0;">${data.details.replace(/\n/g, "<br>")}</p>
        </td></tr>` : ""}
        ${mediaSection}
      </table>
    </td>
  </tr>
  <tr>
    <td style="background:#0f0f0f;padding:20px 40px;border-top:1px solid #1a1a1a;">
      <p style="margin:0;color:#555;font-size:11px;">
        ${data.source ? `Via: ${data.source} &nbsp;·&nbsp; ` : ""}
        Submitted: ${data.submittedAt ?? new Date().toISOString()}
      </p>
    </td>
  </tr>
</table>
</body></html>`;
}

function buildEmailText(data: {
  name: string;
  email: string;
  phone: string;
  details?: string;
  serviceSlug?: string;
  mediaUrls: string[];
}): string {
  const lines = [
    `NEW BOOKING ENQUIRY — ${data.serviceSlug ?? "General"}`,
    "",
    `Name:  ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
  ];
  if (data.details) lines.push("", `Project details:`, data.details);
  if (data.mediaUrls.length) {
    lines.push("", "Files:", ...data.mediaUrls);
  }
  return lines.join("\n");
}

// ── Main handler ───────────────────────────────────────────────────────────

serve(async (req: Request) => {
  // CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Parse body
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  // Honeypot
  const raw = body as Record<string, unknown>;
  if (raw.website) {
    // Silent success — bots see nothing suspicious
    return json({ ok: true, id: crypto.randomUUID() });
  }

  // Validate
  const result = bookingSubmissionSchema.safeParse(body);
  if (!result.success) {
    return json({ error: "Validation failed", issues: result.error.issues }, 422);
  }

  const data = result.data;

  // Supabase service-role client
  const supabase = createClient(
    // @ts-ignore Deno
    Deno.env.get("SUPABASE_URL") ?? "",
    // @ts-ignore Deno
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  // Rate limit check (by IP)
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipHash = hashIp(ip);
  const windowStart = new Date(Date.now() - RATE_WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count } = await supabase
    .from("booking_rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", windowStart);

  if ((count ?? 0) >= RATE_LIMIT) {
    return json({
      error: "We have received several messages from this address. Please wait a few minutes before trying again, or call us directly.",
    }, 429);
  }

  // Record rate-limit hit
  await supabase.from("booking_rate_limits").insert({ ip_hash: ipHash });

  // Insert submission
  const submissionId = data.submissionId ?? crypto.randomUUID();
  const { error: insertError } = await supabase.from("booking_submissions").insert({
    submission_id: submissionId,
    site_slug: data.siteSlug ?? "master",
    service_slug: data.serviceSlug ?? null,
    name: data.name,
    email: data.email.toLowerCase(),
    phone: data.phone,
    details: data.projectDetails ?? null,
    media_urls: data.mediaUrls ?? [],
    metadata: {
      source: (raw as any).source ?? null,
      userAgent: data.userAgent ?? null,
      referrer: data.referrer ?? null,
      submittedAt: data.submittedAt ?? new Date().toISOString(),
    },
  });

  if (insertError) {
    console.error("DB insert error:", insertError);
    return json({ error: "Submission could not be saved. Please try again." }, 500);
  }

  // Send email via Resend
  // @ts-ignore Deno
  const resendKey = Deno.env.get("RESEND_API_KEY");
  // @ts-ignore Deno
  const toEmail = Deno.env.get("BOOKING_TO_EMAIL");
  // @ts-ignore Deno
  const fromEmail = Deno.env.get("BOOKING_FROM_EMAIL") ?? "noreply@cochrane-master-builders.com";
  // @ts-ignore Deno
  const fromName = Deno.env.get("BOOKING_FROM_NAME") ?? "Cochrane Master Builders";

  if (resendKey && toEmail) {
    const serviceLabel = data.serviceSlug
      ? data.serviceSlug.replace(/-/g, " ")
      : "General";

    const emailPayload = {
      from: `${fromName} <${fromEmail}>`,
      to: [toEmail],
      reply_to: data.email,
      subject: `[${data.siteSlug ?? "CMB"}] ${serviceLabel} — ${data.name} (${data.phone})`,
      html: buildEmailHtml({
        name: data.name,
        email: data.email,
        phone: data.phone,
        details: data.projectDetails,
        serviceSlug: data.serviceSlug,
        siteSlug: data.siteSlug,
        mediaUrls: data.mediaUrls,
        submittedAt: data.submittedAt,
        source: (raw as any).source,
      }),
      text: buildEmailText({
        name: data.name,
        email: data.email,
        phone: data.phone,
        details: data.projectDetails,
        serviceSlug: data.serviceSlug,
        mediaUrls: data.mediaUrls,
      }),
      // Idempotency — prevents duplicate sends on retry
      headers: { "X-Entity-Ref-ID": submissionId },
    };

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    if (!emailRes.ok) {
      // Log but don't fail the submission — DB insert succeeded
      console.error("Resend error:", await emailRes.text());
    }
  }

  return json({ ok: true, id: submissionId });
});
