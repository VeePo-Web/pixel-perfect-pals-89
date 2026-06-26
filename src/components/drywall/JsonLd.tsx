import { useEffect } from "react";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

/** Inject a JSON-LD <script> into <head>. Removes on unmount. */
const JsonLd = ({ data, id }: JsonLdProps) => {
  useEffect(() => {
    const scriptId = id ?? `jsonld-${data["@type"] ?? "block"}`;
    const existing = document.getElementById(scriptId);
    if (existing) existing.remove();

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = scriptId;
    script.text = JSON.stringify(data);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [data, id]);

  return null;
};

export default JsonLd;
