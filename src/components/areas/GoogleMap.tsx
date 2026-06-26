/**
 * GoogleMap — Maps JS API when the Lovable browser key is available,
 * keyless iframe fallback otherwise. Loads the API asynchronously
 * with the documented `loading=async` + `callback` pattern.
 *
 * Renders a single `google.maps.Marker` at the supplied coordinates.
 * Does NOT use `AdvancedMarkerElement` (requires a `mapId` users will
 * not have configured).
 */

import { useEffect, useRef } from "react";

const BROWSER_KEY = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY as
  | string
  | undefined;
const TRACKING_ID = import.meta.env.VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_TRACKING_ID as
  | string
  | undefined;

interface Props {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  className?: string;
}

declare global {
  interface Window {
    __lovableMapsReady?: Promise<void>;
    __lovableMapsResolve?: () => void;
  }
}

function loadMapsApi(): Promise<void> {
  if (typeof window === "undefined") return Promise.reject(new Error("no window"));
  if (window.__lovableMapsReady) return window.__lovableMapsReady;

  window.__lovableMapsReady = new Promise<void>((resolve) => {
    window.__lovableMapsResolve = resolve;
    // Global callback referenced from the script URL.
    (window as unknown as { initLovableMap: () => void }).initLovableMap = () => {
      window.__lovableMapsResolve?.();
    };

    const params = new URLSearchParams({
      key: BROWSER_KEY ?? "",
      loading: "async",
      callback: "initLovableMap",
      v: "weekly",
    });
    if (TRACKING_ID) params.set("channel", TRACKING_ID);

    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    s.async = true;
    s.defer = true;
    document.head.appendChild(s);
  });

  return window.__lovableMapsReady;
}

const GoogleMap = ({ lat, lng, title, zoom = 14, className = "" }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!BROWSER_KEY) return;
    let cancelled = false;
    loadMapsApi().then(() => {
      if (cancelled || !ref.current) return;
      const g = (window as unknown as { google?: typeof google }).google;
      if (!g?.maps) return;
      const map = new g.maps.Map(ref.current, {
        center: { lat, lng },
        zoom,
        disableDefaultUI: false,
        clickableIcons: false,
      });
      new g.maps.Marker({ position: { lat, lng }, map, title });
    });
    return () => { cancelled = true; };
  }, [lat, lng, zoom, title]);

  // Fallback: keyless iframe — works without the connector, still
  // gives crawlers a real <iframe src="maps.google.com"> place signal.
  if (!BROWSER_KEY) {
    return (
      <div className={`w-full overflow-hidden rounded border border-seam ${className}`}>
        <iframe
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&ie=UTF8&iwloc=&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map of ${title}`}
          aria-label={`Google Map showing the location of ${title}`}
        />
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden rounded border border-seam ${className}`}>
      <div
        ref={ref}
        style={{ width: "100%", height: 400 }}
        role="region"
        aria-label={`Google Map showing the location of ${title}`}
      />
      <noscript>
        <iframe
          src={`https://maps.google.com/maps?q=${lat},${lng}&z=${zoom}&output=embed`}
          width="100%"
          height="400"
          style={{ border: 0 }}
          title={`Map of ${title}`}
        />
      </noscript>
    </div>
  );
};

export default GoogleMap;