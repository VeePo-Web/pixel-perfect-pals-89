interface GoogleMapEmbedProps {
  lat: number;
  lng: number;
  title: string;
  zoom?: number;
  className?: string;
}

const GoogleMapEmbed = ({ lat, lng, title, zoom = 14, className = "" }: GoogleMapEmbedProps) => (
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

export default GoogleMapEmbed;
