/**
 * ConversionBar — neutral, token-driven conversion module.
 *
 * Renders headline + primary CTA (free quote) + optional phone CTA + a
 * response-promise micro-line + a risk-reversal line. All copy reads from
 * MASTER_REMIX so a remix author flips one file and every page picks it up.
 *
 * Use as an inline section (default) or sticky bottom strip (`sticky`).
 */

import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { MASTER_REMIX } from "@/config/template/remix-variables";

interface ConversionBarProps {
  /** Optional headline override — defaults to a neutral phrase. */
  headline?: string;
  /** Token substitution map applied to RESPONSE_PROMISE / RISK_REVERSAL / headline. */
  tokens?: Record<string, string>;
  /** Render variant. */
  variant?: "inline" | "sticky";
  /** Visual tone. */
  tone?: "forest" | "bone";
  /** Override the destination of the primary CTA. Defaults to `/areas-we-serve`. */
  primaryHref?: string;
  /** Hide the phone CTA even when PHONE_DISPLAY is set. */
  hidePhone?: boolean;
}

const sub = (s: string, t: Record<string, string> = {}) =>
  Object.entries(t).reduce((acc, [k, v]) => acc.replace(new RegExp(`{${k}}`, "g"), v), s);

const ConversionBar = ({
  headline,
  tokens = {},
  variant = "inline",
  tone = "forest",
  primaryHref = "/areas-we-serve",
  hidePhone = false,
}: ConversionBarProps) => {
  const phoneDisplay = MASTER_REMIX.PHONE_DISPLAY;
  const phoneHref = MASTER_REMIX.PHONE ? `tel:${MASTER_REMIX.PHONE.replace(/[^\d+]/g, "")}` : "";
  const phoneLabel = sub(MASTER_REMIX.CTA_TERTIARY, { PHONE_DISPLAY: phoneDisplay });

  const responsePromise = sub(MASTER_REMIX.RESPONSE_PROMISE, tokens);
  const riskReversal = sub(MASTER_REMIX.RISK_REVERSAL, tokens);
  const resolvedHeadline =
    headline ??
    `Tell us about your project — get a written estimate.`;

  if (variant === "sticky") {
    return (
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-seam bg-bone/95 backdrop-blur-md lg:hidden">
        <div className="container mx-auto flex items-center gap-3 px-4 py-3">
          <Link
            to={primaryHref}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-sm bg-charcoal px-4 py-3 text-sm font-medium tracking-[0.08em] text-bone"
          >
            {MASTER_REMIX.CTA_SECONDARY}
            <ArrowRight size={14} />
          </Link>
          {!hidePhone && phoneHref && (
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-seam px-4 py-3 text-sm font-medium tracking-[0.08em] text-charcoal"
              aria-label={phoneLabel}
            >
              <Phone size={14} />
            </a>
          )}
        </div>
      </div>
    );
  }

  const isForest = tone === "forest";
  const wrapperClass = isForest
    ? "bg-forest text-primary-foreground"
    : "bg-bone text-charcoal border-t border-seam";
  const eyebrowClass = isForest ? "text-primary-foreground/60" : "text-mist";
  const headlineClass = isForest ? "text-primary-foreground" : "text-charcoal";
  const subClass = isForest ? "text-primary-foreground/75" : "text-graphite";
  const primaryBtn = isForest
    ? "bg-clay text-white hover:bg-clay/90"
    : "bg-charcoal text-bone hover:bg-graphite";
  const phoneBtn = isForest
    ? "border-primary-foreground/30 text-primary-foreground/85 hover:border-primary-foreground/60 hover:text-primary-foreground"
    : "border-seam text-charcoal hover:border-charcoal/40";

  return (
    <section className={wrapperClass}>
      <div className="container mx-auto px-6 py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className={`font-eyebrow ${eyebrowClass} mb-4`}>Begin</p>
            <h2 className={`font-display text-display-md ${headlineClass} mb-4`}>
              {sub(resolvedHeadline, tokens)}
            </h2>
            <p className={`text-body ${subClass} max-w-[52ch]`}>{responsePromise}</p>
          </div>
          <div className="md:col-span-5">
            <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
              <Link
                to={primaryHref}
                className={`inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-medium tracking-[0.08em] transition-colors ${primaryBtn}`}
              >
                {MASTER_REMIX.CTA_SECONDARY}
                <ArrowRight size={14} />
              </Link>
              {!hidePhone && phoneHref && (
                <a
                  href={phoneHref}
                  className={`inline-flex items-center justify-center gap-2 rounded-sm border px-6 py-3 text-sm font-medium tracking-[0.08em] transition-colors ${phoneBtn}`}
                >
                  <Phone size={14} />
                  {phoneLabel}
                </a>
              )}
            </div>
            <p className={`mt-4 text-caption ${eyebrowClass} md:text-right`}>{riskReversal}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConversionBar;