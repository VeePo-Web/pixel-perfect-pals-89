// Preflight edge function — runs the same guard-rail runner the CLI uses,
// but against the bundled function filesystem. Useful for the
// /knowledge/preflight UI to fetch a fresh report without shipping a
// Node-only runner to the browser.
//
// NOTE: file-system checkers in the edge function only see the deployed
// function bundle, not the live repo. Treat UI results as informational; the
// CLI (`bun preflight`) and `prebuild` hook are the authoritative source of
// truth for "ship / no-ship".

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CompactRail {
  id: string;
  title: string;
  category: string;
  status: "pass" | "fail" | "skipped";
  law: string;
  failures: string[];
  evidence: string[];
  remediation: string;
  routes: Array<{
    id: string;
    title: string;
    partnerDoc: string;
    sourceDoc: string;
  }>;
}

Deno.serve((req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // The edge function does not have access to the live source tree, so we
  // return a static informational payload pointing the user at the CLI.
  // If full programmatic checks are needed in the UI, they should be run
  // server-side in CI and persisted; the UI then fetches the persisted
  // report instead of recomputing in an edge function.
  const report: { rails: CompactRail[]; note: string } = {
    note:
      "Edge runtime cannot scan the live repo. Run `bun preflight` locally or in CI for the authoritative report. This endpoint is reserved for surfacing persisted CI reports in a future iteration.",
    rails: [],
  };

  return new Response(JSON.stringify(report), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
