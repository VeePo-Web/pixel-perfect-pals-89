# Open Questions Checklist — Cochrane Master Builders

This is a confirmation checklist, not a code change. Each open item below is
paired with the exact strings on the site that depend on the client's answer.

Once Cochrane Master Builders confirms each item, every linked location is
updated in one pass.

---

## 1. Brand Name — confirmed

The brand is **Cochrane Master Builders** across all surfaces. No sub-brand.
The booking modal overline reads `MASTER BUILDERS`. No further decision needed.

---

## 2. Contact Info — Phone, Email, Instagram

### Phone (placeholder `(403) 555-1234`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 99–103 | `tel:+14035551234` / `(403) 555-1234` |
| `src/pages/FAQ.tsx` | 121–124 | `sms:+14035551234` / `Text (403) 555-1234` |
| `src/components/detailing/BookingModal.tsx` | 463 | `tel:+14035551234` / `(403) 555-1234` |

### Email (`hello@cochranemasterbuilders.ca`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 93–96 | `mailto:hello@cochranemasterbuilders.ca` |
| `src/pages/Privacy.tsx` | 32 | `…contact us at hello@cochranemasterbuilders.ca.` |

### Instagram (`instagram.com/cochranemasterbuilders`)

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/Footer.tsx` | 105 | `https://instagram.com/cochranemasterbuilders` |

**Decision needed:** real phone, real email (does the domain
`cochranemasterbuilders.ca` exist?), real IG handle.

---

## 3. Cancellation / Reschedule Window

The current "24 hours" notice is a placeholder and must be confirmed or removed.

| File | Line | Current text |
|---|---|---|
| `src/pages/FAQ.tsx` | 35 | "Yes. We ask for 24 hours' notice for cancellations or reschedules. Life happens — just let us know." |
| `src/pages/Terms.tsx` | 16 | "We require a minimum of 24 hours' notice… Late cancellations or no-shows may be subject to a rebooking fee." |

### Also affected — "respond within 2 hours" SLA is unconfirmed

| File | Line | Current text |
|---|---|---|
| `src/pages/FAQ.tsx` | 34, 111 | "We respond within 2 hours…" / "text us anytime — we respond within 2 hours." |
| `src/components/detailing/BookingModal.tsx` | 906 | "We'll confirm by text within 2 hours" |
| `src/pages/Results.tsx` | 194 | "Book your consultation today. We'll confirm within 2 hours." |
| `src/pages/ThankYou.tsx` | 7, 74 | "…within 2 hours via text or email." |

**Decisions needed:**
- (a) cancellation / reschedule window for confirmed builds (24h? 48h? project-stage dependent?)
- (b) is there a rebooking / re-mobilization fee for site-prepped trades?
- (c) realistic confirmation SLA for new project enquiries

---

## 4. Pricing Display Model — Project quote vs published tiers

Cochrane Master Builders works on a **per-project quoted basis** (custom build,
renovation, addition, basement, kitchen, bath). Any "tiered" pricing in the
site copy is a placeholder and must either be removed or replaced with
representative ranges.

| File | Line | Current text |
|---|---|---|
| `src/pages/Services.tsx` | 45–48 | `The Custom Build` flagship tier — confirm representative range |
| `src/pages/Services.tsx` | 76–82 | Renovation package tier — confirm range |
| `src/pages/Services.tsx` | 97–103 | Interior finishing tier — confirm range |
| `src/components/detailing/FullResetSection.tsx` | 135–136, 242–247 | Flagship "from" pricing displayed on hero block |
| `src/pages/FAQ.tsx` | 32 | FAQ pricing answer |
| `src/components/detailing/BookingModal.tsx` | 14–19 | `services[]`: Custom Build / Renovation / Addition |

**Decisions needed:**
- (a) Show indicative ranges ("Renovations from $X / Custom builds from $Y")
      or replace all pricing with "Quoted on consultation"?
- (b) Confirm which project types should appear in the booking modal
      service list.
- (c) Confirm published lead-time / build-window expectations.

---

## 5. Service Area — Cochrane + Calgary + Rocky View County?

| File | Line | Current text |
|---|---|---|
| `src/pages/ServiceArea.tsx` | 19 | `Surrounding: ["Airdrie", "Cochrane", "Okotoks", "Chestermere", "Langdon"]` |
| `src/pages/ServiceArea.tsx` | 31 | "On-site builds across Calgary and surrounding areas." |
| `src/pages/ServiceArea.tsx` | 41–42 | "…anywhere in Calgary and surrounding communities." |
| `src/components/detailing/Footer.tsx` | 39 | `Calgary & Surrounding Areas · Alberta` |
| `src/pages/Services.tsx` | 36 | "All projects include site supervision anywhere in Calgary." |

**Decision needed:** confirm the canonical service area list — Cochrane,
Calgary, Rocky View County, plus which surrounding communities (Airdrie,
Bragg Creek, Springbank, etc.) qualify.

---

## Bonus — Unsupported Claims to Flag with Cochrane Master Builders

| File | Line | Current text |
|---|---|---|
| `src/components/detailing/FullResetSection.tsx` | 233 | "Before and after photos on every project." *(confirm framing)* |
| `src/pages/Results.tsx` | page | confirm whether real before/after exists or page should be deferred |

---

## Deliverable after confirmation

A single follow-up pass that updates every row above in lockstep, so brand,
contact, pricing, service area, and policy are consistent across:

- `Footer.tsx`
- `Navigation.tsx`
- `BookingModal.tsx`
- `Services.tsx`
- `FullResetSection.tsx`
- `FAQ.tsx`
- `ServiceArea.tsx`
- `Terms.tsx`
- `Privacy.tsx`
- `ThankYou.tsx`
- `Results.tsx`
- `index.html` meta

…with no copy left referencing the old placeholders.
