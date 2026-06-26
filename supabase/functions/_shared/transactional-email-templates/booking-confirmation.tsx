/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

/* ═══════════════════════════════════════════════════════════════════════════
 * MASTER TRANSACTIONAL EMAIL TEMPLATE
 * ───────────────────────────────────────────────────────────────────────────
 * This template is the foundation for every sub-trade site in the family.
 * To remix for a new trade, edit ONLY the EMAIL_BRAND block below.
 * Layout, dark-mode handling, scripture seal, and Outlook fixes carry over.
 * ═══════════════════════════════════════════════════════════════════════════ */

const EMAIL_BRAND = {
  // ── Identity ──────────────────────────────────────────────────────────
  name: 'Cochrane Drywall & Insulation',
  shortName: 'Cochrane Drywall',
  tier: 'Masters', // optional italic accent line, set to '' to hide
  tagline: 'Finally get that wall handled.',
  serviceNoun: 'project', // "your project" / "appointment" / "job"

  // ── Location ──────────────────────────────────────────────────────────
  city: 'Cochrane',
  region: 'Alberta',
  serviceArea: 'Cochrane · Calgary · Airdrie',

  // ── Contact ───────────────────────────────────────────────────────────
  phone: '(403) 555-0100',
  phoneDigits: '4035550100',
  email: 'hello@cochranedrywall.com',
  websiteDisplay: 'cochranedrywall.com',
  websiteUrl: 'https://cochranedrywall.com',

  // ── Palette (warm neutrals + restrained forest accent) ────────────────
  colors: {
    bone: '#F4F1EC',
    paper: '#FFFFFF',
    seam: '#E5E0D8',
    charcoal: '#433D39',
    graphite: '#5B544F',
    mist: '#8C857F',
    forest: '#3E5352',
    forestDeep: '#2F4140',
    clay: '#B07A5B',
  },

  // ── Typography (web-safe; serif used for editorial moments) ───────────
  fonts: {
    serif:
      'Georgia, "Cormorant Garamond", "Times New Roman", Times, serif',
    sans:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
} as const

const C = EMAIL_BRAND.colors
const F = EMAIL_BRAND.fonts

/* ─── Props (trade-agnostic) ─────────────────────────────────────────── */

interface BookingConfirmationProps {
  name?: string
  description?: string
  address?: string
  scheduledDate?: string
  timeWindow?: string
  photoCount?: number
}

/* ─── Dark-mode + responsive CSS (injected once into <Head>) ─────────── */

const HEAD_CSS = `
  /* Reset for Outlook/iOS */
  body, table, td, p, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table { border-collapse: collapse !important; }
  img { border: 0; line-height: 100%; outline: none; text-decoration: none; }
  body { margin: 0 !important; padding: 0 !important; width: 100% !important; }

  /* Mobile */
  @media only screen and (max-width: 620px) {
    .px-outer { padding-left: 24px !important; padding-right: 24px !important; }
    .mx-card { margin-left: 16px !important; margin-right: 16px !important; }
    .h1-mobile { font-size: 26px !important; line-height: 1.25 !important; }
    .header-mobile { padding: 36px 24px 32px !important; }
    .scripture-mobile { padding: 40px 24px !important; }
  }

  /* Dark mode — body stays white per email rules; surfaces invert */
  @media (prefers-color-scheme: dark) {
    .dm-surface { background-color: #1F1D1B !important; }
    .dm-card    { background-color: #28252100 !important; }
    .dm-text    { color: #EDE7DE !important; }
    .dm-muted   { color: #B5ADA3 !important; }
    .dm-rule    { background-color: #3A3531 !important; }
    .dm-border  { border-color: #3A3531 !important; }
  }
`

/* ═══════════════════════════════════════════════════════════════════════
 * COMPONENT
 * ═══════════════════════════════════════════════════════════════════════ */

const BookingConfirmationEmail = ({
  name,
  description,
  address,
  scheduledDate,
  timeWindow,
  photoCount,
}: BookingConfirmationProps) => {
  const greeting = name ? `Thanks, ${name}.` : 'Thanks for reaching out.'
  const photoLine =
    photoCount && photoCount > 0
      ? `${photoCount} ${photoCount === 1 ? 'photo' : 'photos'} attached`
      : null

  return (
    <Html lang="en" dir="ltr">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <style dangerouslySetInnerHTML={{ __html: HEAD_CSS }} />
      </Head>
      <Preview>
        We've got your {EMAIL_BRAND.serviceNoun} request — here's what
        happens next.
      </Preview>
      <Body style={main}>
        <Container style={outerContainer}>
          {/* ─── 1. HEADER — bone band, brand wordmark ─────────────── */}
          <Section
            className="header-mobile dm-surface"
            style={header}
          >
            <Text style={brandWordmark} className="dm-text">
              {EMAIL_BRAND.name}
            </Text>
            <div style={forestRule} />
            {EMAIL_BRAND.tier && (
              <Text style={tierLine}>— {EMAIL_BRAND.tier} —</Text>
            )}
            <Text style={headerKicker} className="dm-muted">
              {EMAIL_BRAND.city.toUpperCase()} ·{' '}
              {EMAIL_BRAND.region.toUpperCase()}
            </Text>
          </Section>

          {/* ─── 2. SUBJECT HEADLINE ───────────────────────────────── */}
          <Section style={contentSection} className="px-outer">
            <Heading
              as="h1"
              style={h1}
              className="h1-mobile dm-text"
            >
              {greeting}
              <br />
              Your request is in.
            </Heading>
          </Section>

          {/* ─── 3. PERSONAL OPENING ───────────────────────────────── */}
          <Section style={contentSection} className="px-outer">
            <Text style={bodyText} className="dm-text">
              We've received your {EMAIL_BRAND.serviceNoun} request and
              someone from our team will review it within one business
              day. Below is a quick recap of what you sent and what
              happens next — no action needed from you right now.
            </Text>
            <Text style={signature}>
              — THE {EMAIL_BRAND.shortName.toUpperCase()} TEAM
            </Text>
          </Section>

          {/* ─── 4. BOOKING SUMMARY CARD ──────────────────────────── */}
          {(description || address || scheduledDate || timeWindow || photoLine) && (
            <Section
              style={summaryCard}
              className="mx-card dm-card dm-border"
            >
              <Text style={summaryLabel}>YOUR REQUEST</Text>
              <table
                cellPadding={0}
                cellSpacing={0}
                role="presentation"
                style={summaryTable}
              >
                <tbody>
                  {description && (
                    <tr>
                      <td style={summaryKey} className="dm-muted">
                        What
                      </td>
                      <td style={summaryValue} className="dm-text">
                        {description}
                      </td>
                    </tr>
                  )}
                  {address && (
                    <tr>
                      <td style={summaryKey} className="dm-muted">
                        Where
                      </td>
                      <td style={summaryValue} className="dm-text">
                        {address}
                      </td>
                    </tr>
                  )}
                  {scheduledDate && (
                    <tr>
                      <td style={summaryKey} className="dm-muted">
                        When
                      </td>
                      <td style={summaryValue} className="dm-text">
                        {scheduledDate}
                        {timeWindow ? ` · ${timeWindow}` : ''}
                      </td>
                    </tr>
                  )}
                  {!scheduledDate && timeWindow && (
                    <tr>
                      <td style={summaryKey} className="dm-muted">
                        When
                      </td>
                      <td style={summaryValue} className="dm-text">
                        {timeWindow}
                      </td>
                    </tr>
                  )}
                  {photoLine && (
                    <tr>
                      <td style={summaryKey} className="dm-muted">
                        Photos
                      </td>
                      <td style={summaryValue} className="dm-text">
                        {photoLine}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </Section>
          )}

          {/* ─── 5. WHAT HAPPENS NEXT ─────────────────────────────── */}
          <Section
            style={contentSection}
            className="px-outer"
          >
            <Text style={sectionEyebrow}>WHAT HAPPENS NEXT</Text>
            <Heading as="h2" style={h2} className="dm-text">
              Three steps from here.
            </Heading>

            <NextStep
              num="01"
              title="We review your request."
              cadence="Within 1 hour"
              body="A real person reads what you sent — including any photos — and figures out exactly what the work involves."
            />
            <NextStep
              num="02"
              title="We confirm a window with you."
              cadence="Within 1 business day"
              body="A short text or call to lock in the visit, answer any questions, and share a clear price range before we book the day."
            />
            <NextStep
              num="03"
              title="We arrive on time, scoped, and ready."
              cadence="On the scheduled day"
              body="Everything we need is on the truck. Clean work, tidy site, no surprises."
            />
          </Section>

          <Hr style={sectionDivider} className="dm-rule" />

          {/* ─── 6. BRAND PROMISE ─────────────────────────────────── */}
          <Section
            style={promiseCard}
            className="mx-card dm-card dm-border"
          >
            <Text style={promiseSlogan} className="dm-text">
              "{EMAIL_BRAND.tagline}"
            </Text>
            <div style={promiseRule} />
            <Text style={promiseSubline} className="dm-muted">
              Honest scope. Clean finish.
              <br />
              Built right here in {EMAIL_BRAND.city}.
            </Text>
          </Section>

          {/* ─── 7. CONTACT STRIP ─────────────────────────────────── */}
          <Section style={contactSection} className="px-outer">
            <Text style={contactLabel}>QUESTIONS IN THE MEANTIME?</Text>
            <Text style={contactPhone} className="dm-text">
              <a
                href={`tel:+1${EMAIL_BRAND.phoneDigits}`}
                style={contactPhoneLink}
              >
                {EMAIL_BRAND.phone}
              </a>
            </Text>
            <Text style={contactCaption} className="dm-muted">
              Or just reply to this email — it goes straight to us.
            </Text>
          </Section>

          {/* ─── 7b. GOOGLE REVIEW INVITE ─────────────────────────── */}
          {/*
            This section renders in every confirmation email.
            When the project is complete and the homeowner is happy,
            this is the lowest-friction path to a 5-star Google review.
            The websiteUrl placeholder will be replaced with the real
            Google review link once the Business Profile is live.
            To activate: replace EMAIL_BRAND.websiteUrl below with
            the g.page/r/XXXX/review link from Google Business Profile.
          */}
          <Section style={reviewInviteSection} className="px-outer">
            <Hr style={reviewDivider} className="dm-rule" />
            <Text style={reviewEyebrow}>ONE SMALL FAVOUR</Text>
            <Text style={reviewBody} className="dm-text">
              Once your project is complete, a brief Google review — even
              a single sentence — helps the next Cochrane homeowner find
              a crew they can trust. It takes about a minute and means
              more than any ad we could run.
            </Text>
            {/* Uncomment and replace href when Google Business Profile is live:
            <a href="https://g.page/r/XXXXX/review" style={reviewLink}>
              Leave a Google review →
            </a>
            */}
          </Section>

          {/* ─── 8. SCRIPTURE SEAL ────────────────────────────────── */}
          <Section
            style={scriptureSection}
            className="scripture-mobile"
          >
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              align="center"
              style={{ margin: '0 auto' }}
            >
              <tbody>
                <tr>
                  <td style={{ textAlign: 'center' }}>
                    {/* Five-dot clay flourish */}
                    <table
                      role="presentation"
                      cellPadding={0}
                      cellSpacing={0}
                      align="center"
                      style={{ margin: '0 auto 32px' }}
                    >
                      <tbody>
                        <tr>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <td key={i} style={dotCell}>
                              <div style={dot} />
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>

                    <Text style={scriptureQuote} className="dm-text">
                      &ldquo;Lazy hands make for poverty,
                      <br />
                      but diligent hands bring wealth.&rdquo;
                    </Text>
                    <Text style={scriptureAttribution}>
                      — PROVERBS 10:4 NIV
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ─── 9. FOOTER ────────────────────────────────────────── */}
          <Section style={footer} className="dm-border">
            <Text style={footerBrand} className="dm-text">
              {EMAIL_BRAND.name}
            </Text>
            <Text style={footerArea} className="dm-muted">
              {EMAIL_BRAND.serviceArea}
            </Text>
            <Text style={footerWeb} className="dm-muted">
              <a
                href={EMAIL_BRAND.websiteUrl}
                style={footerWebLink}
              >
                {EMAIL_BRAND.websiteDisplay}
              </a>
              {'  ·  '}
              <a
                href={`mailto:${EMAIL_BRAND.email}`}
                style={footerWebLink}
              >
                {EMAIL_BRAND.email}
              </a>
            </Text>
            <Text style={footerNote} className="dm-muted">
              You received this email because you submitted a{' '}
              {EMAIL_BRAND.serviceNoun} request with{' '}
              {EMAIL_BRAND.name}.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

/* ─── Sub-components ─────────────────────────────────────────────── */

const NextStep = ({
  num,
  title,
  cadence,
  body,
}: {
  num: string
  title: string
  cadence: string
  body: string
}) => (
  <table
    cellPadding={0}
    cellSpacing={0}
    role="presentation"
    style={{ width: '100%', marginBottom: '22px' }}
  >
    <tbody>
      <tr>
        <td style={stepNumCell}>{num}</td>
        <td style={stepBodyCell}>
          <Text style={stepTitle} className="dm-text">
            {title}
          </Text>
          <Text style={stepCadence}>{cadence}</Text>
          <Text style={stepBody} className="dm-muted">
            {body}
          </Text>
        </td>
      </tr>
    </tbody>
  </table>
)

/* ─── Template export ────────────────────────────────────────────── */

export const template = {
  component: BookingConfirmationEmail,
  subject: "We got your request — here's what happens next",
  displayName: 'Booking confirmation',
  previewData: {
    name: 'Sarah',
    description:
      'Two patches in the hallway from a recent furniture move — a fist-sized hole and a long scrape near the door frame.',
    address: '142 Sunset Ridge Pl, Cochrane, AB',
    scheduledDate: 'Tuesday, May 6',
    timeWindow: 'Morning · 8 AM – 12 PM',
    photoCount: 3,
  },
} satisfies TemplateEntry

/* ═══════════════════════════════════════════════════════════════════════
 * STYLES
 * ═══════════════════════════════════════════════════════════════════════ */

const main = {
  backgroundColor: C.paper,
  fontFamily: F.sans,
  margin: 0,
  padding: 0,
}

const outerContainer = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: 0,
  backgroundColor: C.paper,
}

/* ─── Header ─── */
const header = {
  backgroundColor: C.bone,
  padding: '52px 40px 44px',
  textAlign: 'center' as const,
  borderBottom: `1px solid ${C.seam}`,
}

const brandWordmark = {
  fontFamily: F.serif,
  fontSize: '24px',
  fontWeight: 400,
  lineHeight: 1.25,
  color: C.charcoal,
  margin: '0 0 18px',
  letterSpacing: '-0.005em',
}

const forestRule = {
  width: '36px',
  height: '1px',
  backgroundColor: C.forest,
  margin: '0 auto 14px',
  fontSize: '0',
  lineHeight: '0',
}

const tierLine = {
  fontFamily: F.serif,
  fontSize: '13px',
  fontStyle: 'italic' as const,
  color: C.forest,
  margin: '0 0 18px',
  letterSpacing: '0.05em',
}

const headerKicker = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  color: C.mist,
  margin: 0,
  textTransform: 'uppercase' as const,
}

/* ─── Content ─── */
const contentSection = {
  padding: '40px 40px 4px',
}

const h1 = {
  fontFamily: F.serif,
  fontSize: '30px',
  fontWeight: 400,
  lineHeight: 1.2,
  color: C.charcoal,
  margin: '0 0 8px',
  letterSpacing: '-0.012em',
}

const bodyText = {
  fontSize: '15px',
  color: C.graphite,
  lineHeight: 1.7,
  margin: '0 0 18px',
}

const signature = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.2em',
  color: C.forest,
  margin: '20px 0 0',
  textTransform: 'uppercase' as const,
}

const sectionEyebrow = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  color: C.forest,
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
}

const h2 = {
  fontFamily: F.serif,
  fontSize: '22px',
  fontWeight: 400,
  lineHeight: 1.3,
  color: C.charcoal,
  margin: '0 0 24px',
  letterSpacing: '-0.01em',
}

const sectionDivider = {
  border: 'none',
  borderTop: `1px solid ${C.seam}`,
  margin: '36px 40px',
  height: '1px',
}

/* ─── Summary card ─── */
const summaryCard = {
  backgroundColor: C.bone,
  borderLeft: `2px solid ${C.forest}`,
  padding: '26px 30px',
  margin: '24px 40px 12px',
}

const summaryLabel = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  color: C.forest,
  margin: '0 0 18px',
  textTransform: 'uppercase' as const,
}

const summaryTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
}

const summaryKey = {
  fontSize: '12px',
  color: C.mist,
  padding: '7px 18px 7px 0',
  width: '70px',
  verticalAlign: 'top' as const,
  fontWeight: 500,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.08em',
}

const summaryValue = {
  fontSize: '15px',
  color: C.charcoal,
  padding: '7px 0',
  fontWeight: 500,
  verticalAlign: 'top' as const,
  lineHeight: 1.55,
}

/* ─── Step list ─── */
const stepNumCell = {
  fontFamily: F.serif,
  fontSize: '22px',
  fontWeight: 400,
  color: C.forest,
  width: '50px',
  verticalAlign: 'top' as const,
  paddingTop: '0px',
  letterSpacing: '0.02em',
}

const stepBodyCell = {
  verticalAlign: 'top' as const,
  paddingLeft: '4px',
}

const stepTitle = {
  fontSize: '15px',
  fontWeight: 600,
  color: C.charcoal,
  margin: '0 0 4px',
  lineHeight: 1.4,
}

const stepCadence = {
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  color: C.forest,
  margin: '0 0 6px',
  textTransform: 'uppercase' as const,
}

const stepBody = {
  fontSize: '14px',
  color: C.graphite,
  lineHeight: 1.6,
  margin: 0,
}

/* ─── Brand promise ─── */
const promiseCard = {
  backgroundColor: C.bone,
  padding: '40px 36px',
  margin: '20px 40px',
  textAlign: 'center' as const,
  borderTop: `1px solid ${C.seam}`,
  borderBottom: `1px solid ${C.seam}`,
}

const promiseSlogan = {
  fontFamily: F.serif,
  fontSize: '22px',
  fontWeight: 400,
  fontStyle: 'italic' as const,
  lineHeight: 1.4,
  color: C.charcoal,
  margin: '0 0 18px',
  letterSpacing: '-0.005em',
}

const promiseRule = {
  width: '28px',
  height: '1px',
  backgroundColor: C.forest,
  margin: '0 auto 16px',
  fontSize: '0',
  lineHeight: '0',
}

const promiseSubline = {
  fontSize: '13px',
  color: C.graphite,
  lineHeight: 1.7,
  margin: 0,
  fontWeight: 400,
}

/* ─── Contact ─── */
const contactSection = {
  padding: '12px 40px 36px',
  textAlign: 'center' as const,
}

const contactLabel = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  color: C.forest,
  margin: '0 0 12px',
  textTransform: 'uppercase' as const,
}

const contactPhone = {
  fontFamily: F.serif,
  fontSize: '22px',
  fontWeight: 400,
  color: C.charcoal,
  margin: '0 0 8px',
  letterSpacing: '-0.005em',
}

const contactPhoneLink = {
  color: C.charcoal,
  textDecoration: 'none',
}

const contactCaption = {
  fontSize: '13px',
  color: C.mist,
  margin: 0,
  lineHeight: 1.6,
}

/* ─── Review invite ─── */
const reviewInviteSection = {
  padding: '4px 40px 32px',
}

const reviewDivider = {
  border: 'none',
  borderTop: `1px solid ${C.seam}`,
  margin: '0 0 28px',
  height: '1px',
}

const reviewEyebrow = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.22em',
  color: C.forest,
  margin: '0 0 10px',
  textTransform: 'uppercase' as const,
}

const reviewBody = {
  fontSize: '14px',
  color: C.graphite,
  lineHeight: 1.65,
  margin: '0 0 14px',
  fontWeight: 300,
  maxWidth: '460px',
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const reviewLink = {
  fontSize: '12px',
  fontWeight: 500,
  letterSpacing: '0.14em',
  textTransform: 'uppercase' as const,
  color: C.forest,
  textDecoration: 'none',
  borderBottom: `1px solid ${C.forest}`,
  paddingBottom: '2px',
}

/* ─── Scripture seal ─── */
const scriptureSection = {
  padding: '56px 40px 48px',
  backgroundColor: C.paper,
  textAlign: 'center' as const,
}

const dotCell = {
  padding: '0 4px',
  lineHeight: '0',
}

const dot = {
  width: '3px',
  height: '3px',
  backgroundColor: C.clay,
  borderRadius: '50%',
  display: 'inline-block',
  fontSize: '0',
  lineHeight: '0',
}

const scriptureQuote = {
  fontFamily: F.serif,
  fontSize: '17px',
  fontStyle: 'italic' as const,
  color: C.charcoal,
  lineHeight: 1.65,
  margin: '0 auto 24px',
  maxWidth: '380px',
  fontWeight: 400,
  letterSpacing: '0.005em',
}

const scriptureAttribution = {
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.24em',
  color: C.mist,
  margin: 0,
  textTransform: 'uppercase' as const,
}

/* ─── Footer ─── */
const footer = {
  borderTop: `1px solid ${C.seam}`,
  padding: '32px 40px 40px',
  textAlign: 'center' as const,
  backgroundColor: C.paper,
}

const footerBrand = {
  fontFamily: F.serif,
  fontSize: '15px',
  fontWeight: 400,
  color: C.charcoal,
  margin: '0 0 6px',
  letterSpacing: '0.005em',
}

const footerArea = {
  fontSize: '11px',
  color: C.mist,
  letterSpacing: '0.14em',
  margin: '0 0 14px',
  textTransform: 'uppercase' as const,
}

const footerWeb = {
  fontSize: '12px',
  color: C.graphite,
  margin: '0 0 18px',
  lineHeight: 1.6,
}

const footerWebLink = {
  color: C.graphite,
  textDecoration: 'none',
}

const footerNote = {
  fontSize: '11px',
  color: C.mist,
  lineHeight: 1.6,
  margin: 0,
}
