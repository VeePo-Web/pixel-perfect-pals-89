import { useEffect, useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GUARD_RAILS, type GuardRailId } from "@/master/guardrails";
import { getRoutesForGuardRail } from "@/master/knowledge/guardrail-routes";
import { CATEGORY_LABELS } from "@/master/knowledge/decision-index";

type Status = "pass" | "fail" | "skipped" | "unknown";

interface RailRow {
  id: GuardRailId;
  status: Status;
}

const STATUS_STYLES: Record<Status, string> = {
  pass: "bg-green-500/10 text-green-600 border-green-500/30",
  fail: "bg-red-500/10 text-red-600 border-red-500/30",
  skipped: "bg-yellow-500/10 text-yellow-700 border-yellow-500/30",
  unknown: "bg-muted text-muted-foreground border-border",
};

const STATUS_ICON: Record<Status, string> = {
  pass: "✓",
  fail: "✗",
  skipped: "◌",
  unknown: "·",
};

const PreflightDashboard = () => {
  const [rows, setRows] = useState<RailRow[]>(
    GUARD_RAILS.map((g) => ({ id: g.id, status: "unknown" })),
  );
  const [loading] = useState(false);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold text-foreground">
          Guard-Rail Preflight
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Non-negotiable checks that run on every build. Each rail links to the
          partner-doc routes that govern it.
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          For the authoritative pass/fail status, run{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">bun preflight</code>{" "}
          locally or in CI. The build is configured to halt on failure via the{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">prebuild</code> hook.
        </p>
      </header>

      <div className="mb-4 flex items-center gap-3">
        <Button variant="outline" disabled>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <span>{GUARD_RAILS.length} rails declared</span>
          )}
        </Button>
        <span className="text-xs text-muted-foreground">
          Live status mirrors the latest CI/CLI run (wire when CI is configured).
        </span>
      </div>

      <ul className="space-y-3">
        {GUARD_RAILS.map((rail) => {
          const row = rows.find((r) => r.id === rail.id) ?? {
            id: rail.id,
            status: "unknown" as Status,
          };
          const routes = getRoutesForGuardRail(rail.id);
          return (
            <li
              key={rail.id}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start gap-3">
                <span
                  className={`inline-flex h-6 min-w-[2.5rem] items-center justify-center rounded border px-2 text-xs font-medium ${STATUS_STYLES[row.status]}`}
                >
                  {STATUS_ICON[row.status]} {row.status}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium text-foreground">
                      {rail.title}
                    </h3>
                    <code className="text-[10px] text-muted-foreground">
                      {rail.id}
                    </code>
                    <Badge variant="outline" className="text-[10px]">
                      {rail.category}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{rail.law}</p>

                  {routes.length > 0 && (
                    <div className="mt-3">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        Consult
                      </p>
                      <ul className="mt-1 space-y-1">
                        {routes.map((route) => (
                          <li key={route.id} className="text-xs">
                            <a
                              href={`/${route.partnerDoc}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-foreground underline-offset-2 hover:underline"
                            >
                              {route.title}{" "}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                            <span className="ml-2 text-muted-foreground">
                              ({route.categories
                                .map((c) => CATEGORY_LABELS[c])
                                .join(" · ")})
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {rail.proofRequired.length > 0 && (
                    <details className="mt-3">
                      <summary className="cursor-pointer text-xs text-muted-foreground">
                        Proof required ({rail.proofRequired.length})
                      </summary>
                      <ul className="ml-4 mt-1 list-disc text-xs text-muted-foreground">
                        {rail.proofRequired.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </details>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreflightDashboard;
