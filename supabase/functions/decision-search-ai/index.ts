// Decision Search AI fallback — registry-bounded, structured output.
// Called only when the keyword scorer returns weak results.
// Now accepts an optional `filters` block so AI matches honour the same
// hard constraints used by the structured router on the client.

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CompactRoute {
  id: string;
  title: string;
  oneLine: string;
  triggers: string[];
  categories: string[];
  // Optional fields the client may send for filter-aware matching.
  guardRails?: string[];
}

interface Filters {
  pageSection?: string;
  audience?: string[];
  channel?: string;
  category?: string;
  constraints?: string[];
  excludeIds?: string[];
}

interface RequestBody {
  query: string;
  registry: CompactRoute[];
  filters?: Filters;
}

// Mirror of the structured router's hard-required guard rails per enum value.
// Keep in sync with `src/master/knowledge/decision-input.ts`.
const REQUIRED_RAILS: Record<string, string[]> = {
  // page sections
  "service-area-page": ["gr-areas-we-serve-excellence"],
  legal: ["gr-legal-pages-bespoke"],
  "style-guide": ["gr-bespoke-style-guide-live"],
  "meta-seo": ["gr-page-meta-jsonld-unique"],
  // constraints
  "wcag-aa": ["gr-wcag-aa"],
  "motion-restraint": ["gr-motion-system-pinned"],
  "no-sister-fingerprints": ["gr-zero-sister-fingerprints"],
  "local-trust-required": ["gr-real-business-signals"],
  "legal-bespoke": ["gr-legal-pages-bespoke"],
};

function applyFilters(registry: CompactRoute[], filters?: Filters): {
  filtered: CompactRoute[];
  required: string[];
} {
  if (!filters) return { filtered: registry, required: [] };

  const exclude = new Set(filters.excludeIds ?? []);
  const required: string[] = [];
  if (filters.pageSection && REQUIRED_RAILS[filters.pageSection]) {
    required.push(...REQUIRED_RAILS[filters.pageSection]);
  }
  for (const c of filters.constraints ?? []) {
    if (REQUIRED_RAILS[c]) required.push(...REQUIRED_RAILS[c]);
  }
  const requiredSet = new Set(required);

  const filtered = registry.filter((r) => {
    if (exclude.has(r.id)) return false;
    if (filters.category && !r.categories.includes(filters.category)) return false;
    if (requiredSet.size > 0) {
      const rails = new Set(r.guardRails ?? []);
      for (const req of requiredSet) {
        if (!rails.has(req)) return false;
      }
    }
    return true;
  });
  return { filtered, required: Array.from(requiredSet) };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = (await req.json()) as Partial<RequestBody>;
    const query = (body.query ?? "").toString().trim();
    const registry = Array.isArray(body.registry) ? body.registry : [];
    const filters = body.filters;

    if (!query || registry.length === 0) {
      return new Response(
        JSON.stringify({ error: "query and registry are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(
        JSON.stringify({ error: "LOVABLE_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const { filtered, required } = applyFilters(registry, filters);
    const validIds = new Set(filtered.map((r) => r.id));

    if (filtered.length === 0) {
      return new Response(JSON.stringify({ matches: [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const filterSummary: string[] = [];
    if (filters?.pageSection) filterSummary.push(`pageSection=${filters.pageSection}`);
    if (filters?.channel) filterSummary.push(`channel=${filters.channel}`);
    if (filters?.audience?.length) filterSummary.push(`audience=[${filters.audience.join(",")}]`);
    if (filters?.category) filterSummary.push(`category=${filters.category}`);
    if (filters?.constraints?.length)
      filterSummary.push(`constraints=[${filters.constraints.join(",")}]`);
    if (required.length) filterSummary.push(`requiredRails=[${required.join(",")}]`);

    const systemPrompt = [
      "You are a routing engine for a knowledge index of partner-doc rule books.",
      "You will receive a USER QUERY, optional FILTERS, and a REGISTRY of routes.",
      "Each route has an id, title, oneLine summary, trigger phrases, categories, and guardRails.",
      "Return the most relevant routes for the query, ranked by relevance.",
      "RULES:",
      "1. ONLY return ids that exist in the registry. Never invent ids.",
      "2. Return at most 5 routes.",
      "3. score is 0..1 — be strict; only the strongest match should approach 1.",
      "4. reason is one short sentence (≤14 words) explaining why this route fits the query and filters.",
      "5. Honour all filters; never recommend a route excluded by them.",
      "6. If the query is ambiguous, prefer routes whose triggers contain the query's nouns.",
    ].join("\n");

    const userPrompt = [
      `USER QUERY: ${query}`,
      filterSummary.length ? `FILTERS: ${filterSummary.join("; ")}` : "FILTERS: (none)",
      "",
      "REGISTRY:",
      JSON.stringify(filtered, null, 2),
    ].join("\n");

    const aiResp = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "return_matches",
                description: "Return ranked route matches.",
                parameters: {
                  type: "object",
                  properties: {
                    matches: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          id: { type: "string" },
                          score: { type: "number" },
                          reason: { type: "string" },
                        },
                        required: ["id", "score", "reason"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["matches"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "return_matches" } },
        }),
      },
    );

    if (aiResp.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (aiResp.status === 402) {
      return new Response(
        JSON.stringify({
          error: "Payment required, please add funds to your Lovable AI workspace.",
        }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!aiResp.ok) {
      const text = await aiResp.text();
      console.error("AI gateway error:", aiResp.status, text);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiResp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const argsStr = toolCall?.function?.arguments ?? "{}";

    let parsed: { matches?: Array<{ id: string; score: number; reason: string }> } = {};
    try {
      parsed = JSON.parse(argsStr);
    } catch (e) {
      console.error("Failed to parse tool args:", e, argsStr);
    }

    const matches = (parsed.matches ?? [])
      .filter((m) => validIds.has(m.id))
      .slice(0, 5);

    return new Response(JSON.stringify({ matches }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("decision-search-ai error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
