/**
 * GoogleMap — CWV-safe FACADE embed.
 *
 * Renders a lightweight, reserved-space placeholder and injects the real
 * Google Maps iframe ONLY on user interaction (click / tap / keyboard). This
 * keeps every community page fast at scale: no Maps script on cold load, so
 * CLS = 0 and the map never taxes LCP/INP (see docs/seo/maps-mastery-2026 —
 * Maps Integration Playbook §1–2, CWV Hardening).
 *
 * Embed source, in priority order:
 *   1. Maps Embed API (free, unlimited) when a browser key is present —
 *      Place-ID query when supplied (ties the embed to the verified GBP
 *      entity), else a lat/lng pin.
 *   2. Keyless `maps.google.com/...&output=embed` fallback (no key required).
 *
 * The live Maps JavaScript API + Marker path was removed: at scale it is the
 * heaviest option (TBT/INP, per-load billing) and is invisible to non-JS
 * crawlers. A `<noscript>` iframe + an always-present Maps link preserve the
 * place signal for crawlers and no-JS users.
 */

import { useState } from "react";

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as
  | string
  | undefined;

interface Props {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  className?: string;
  /** Optional Google Place ID — ties the embed to the verified GBP entity. */
  placeId?: string;
}

/** Build the interactive-embed URL (Embed API when keyed, keyless fallback). */
function embedSrc(lat: number, lng: number, zoom: number, placeId?: string): string {
  if (BROWSER_KEY) {
    const params = new URLSearchParams({
      key: BROWSER_KEY,
      q: placeId ? `place_id:${placeId}` : `${lat},${lng}`,
      zoom: String(zoom),
    });
    return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
  }
  // Keyless fallback — undocumented/legacy, but works with no connector.
  return `https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&ie=UTF8&iwloc=&output=embed`;
}

const GoogleMap = ({ lat, lng, title, zoom = 14, className = "", placeId }: Props) => {
  const [active, setActive] = useState(false);
  const src = embedSrc(lat, lng, zoom, placeId);
  const label = `Google Map showing the location of ${title}`;
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    // Reserved 400px box → the map never causes layout shift (CLS = 0).
    <figure
      className={`relative m-0 h-[400px] w-full overflow-hidden rounded border border-seam ${className}`}
    >
      {active ? (
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={label}
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Load interactive map of ${title}`}
          className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-bone text-charcoal transition-colors hover:bg-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-forest transition-transform group-hover:-translate-y-0.5"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-eyebrow text-forest">View map</span>
          <span className="text-caption text-mist">
            {title} · load the interactive Google Map
          </span>
        </button>
      )}

      {/* No-JS + crawler fallback: a real Maps iframe in the initial HTML. */}
      <noscript>
        <iframe
          src={src}
          className="absolute inset-0 h-full w-full"
          style={{ border: 0 }}
          title={label}
        />
      </noscript>

      {/* Always-present, crawlable place signal + accessible escape hatch. */}
      <a
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="sr-only"
      >
        Open the location of {title} in Google Maps
      </a>
    </figure>
  );
};

export default GoogleMap;
