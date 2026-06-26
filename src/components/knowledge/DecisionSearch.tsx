import { useMemo, useState } from "react";
import { Search, Sparkles, ExternalLink, Loader2, SlidersHorizontal, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  searchDecisions,
  searchDecisionsStructured,
  topScore,
  AI_FALLBACK_THRESHOLD,
  type MatchResult,
  type CompiledQuery,
} from "@/master/knowledge/decision-search";
import {
  CATEGORY_LABELS,
  toCompactRegistry,
  getRouteById,
  type DecisionCategory,
  type DecisionRoute,
} from "@/master/knowledge/decision-index";
import {
  AUDIENCES,
  AUDIENCE_LABELS,
  CHANNELS,
  CHANNEL_LABELS,
  CONSTRAINTS,
  CONSTRAINT_LABELS,
  PAGE_SECTIONS,
  PAGE_SECTION_LABELS,
  hasStructuredFilters,
  validateDecisionInput,
  type Audience,
  type Channel,
  type Constraint,
  type PageSection,
} from "@/master/knowledge/decision-input";

interface AiMatch {
  route: DecisionRoute;
  score: number;
  reason: string;
}

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as DecisionCategory[];

const NONE = "__none__";

const DecisionSearch = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<DecisionCategory | "all">("all");
  const [aiResults, setAiResults] = useState<AiMatch[] | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [refineOpen, setRefineOpen] = useState(false);
  const [section, setSection] = useState<PageSection | "">("");
  const [channel, setChannel] = useState<Channel | "">("");
  const [audience, setAudience] = useState<Audience[]>([]);
  const [constraints, setConstraints] = useState<Constraint[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const structuredCandidate = useMemo(() => {
    return {
      goal: query.trim(),
      pageSection: section || undefined,
      audience: audience.length ? audience : undefined,
      channel: channel || undefined,
      category: category === "all" ? undefined : category,
      constraints: constraints.length ? constraints : undefined,
    };
  }, [query, section, channel, audience, category, constraints]);

  const useStructured = hasStructuredFilters(structuredCandidate);

  const { results, compiled } = useMemo<{
    results: MatchResult[];
    compiled?: CompiledQuery;
  }>(() => {
    if (!query.trim()) return { results: [] };
    if (useStructured) {
      const v = validateDecisionInput(structuredCandidate);
      if (!v.ok) {
        return { results: [] };
      }
      const r = searchDecisionsStructured(v.value, { limit: 10 });
      return { results: r.results, compiled: r.compiled };
    }
    return {
      results: searchDecisions(query, {
        category: category === "all" ? undefined : category,
        limit: 10,
      }),
    };
  }, [query, useStructured, structuredCandidate, category]);

  const top = topScore(results);
  const showAiHint = query.trim().length > 0 && top < AI_FALLBACK_THRESHOLD;

  const toggleAudience = (a: Audience) => {
    setAudience((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]));
    setAiResults(null);
  };
  const toggleConstraint = (c: Constraint) => {
    setConstraints((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : [...cur, c]));
    setAiResults(null);
  };
  const clearStructured = () => {
    setSection("");
    setChannel("");
    setAudience([]);
    setConstraints([]);
    setFieldErrors({});
    setAiResults(null);
  };

  const runAi = async () => {
    if (!query.trim()) return;
    let filters: Record<string, unknown> | undefined;
    if (useStructured) {
      const v = validateDecisionInput(structuredCandidate);
      if (v.ok === false) {
        setFieldErrors(v.errors);
        toast.error("Fix the highlighted fields before searching.");
        return;
      }
      setFieldErrors({});
      filters = {
        pageSection: v.value.pageSection,
        audience: v.value.audience,
        channel: v.value.channel,
        category: v.value.category,
        constraints: v.value.constraints,
        excludeIds: v.value.excludeIds,
      };
    }
    setAiLoading(true);
    setAiResults(null);
    try {
      const { data, error } = await supabase.functions.invoke("decision-search-ai", {
        body: {
          query,
          registry: toCompactRegistry(),
          filters,
        },
      });
      if (error) {
        const status = (error as { context?: { status?: number } }).context?.status;
        if (status === 429) toast.error("Rate limited — try again in a moment.");
        else if (status === 402)
          toast.error("AI credits exhausted — top up in Workspace usage.");
        else toast.error("AI search failed.");
        return;
      }
      const matches = (data?.matches ?? []) as Array<{
        id: string;
        score: number;
        reason: string;
      }>;
      const enriched: AiMatch[] = matches
        .map((m) => {
          const route = getRouteById(m.id);
          return route ? { route, score: m.score, reason: m.reason } : null;
        })
        .filter((x): x is AiMatch => x !== null);
      setAiResults(enriched);
    } catch (e) {
      console.error(e);
      toast.error("AI search failed.");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground">Decision Index</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Search across partner-doc rule books. Add structured filters to deterministically
          narrow the candidate set before scoring.
        </p>
      </header>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setAiResults(null);
            }}
            placeholder="Goal — e.g. hero copy for mothers, areas we serve schema"
            className="pl-9"
            aria-invalid={Boolean(fieldErrors.goal)}
          />
        </div>
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as DecisionCategory | "all")}
        >
          <SelectTrigger className="sm:w-56">
            <SelectValue placeholder="All categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {CATEGORY_KEYS.map((c) => (
              <SelectItem key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant={showAiHint ? "default" : "outline"}
          onClick={runAi}
          disabled={!query.trim() || aiLoading}
          className="sm:w-auto"
        >
          {aiLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4" />
          )}
          <span className="ml-2">Ask AI</span>
        </Button>
      </div>

      {fieldErrors.goal && (
        <p className="mt-2 text-xs text-destructive">{fieldErrors.goal}</p>
      )}

      {/* Refine toggle */}
      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setRefineOpen((o) => !o)}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <SlidersHorizontal className="mr-2 h-3.5 w-3.5" />
          Refine {useStructured && <span className="ml-1 text-foreground">· active</span>}
        </Button>
        {useStructured && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearStructured}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="mr-1 h-3 w-3" /> Clear filters
          </Button>
        )}
      </div>

      {refineOpen && (
        <div className="mt-3 rounded-lg border border-border bg-card p-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Page section
              </Label>
              <Select
                value={section || NONE}
                onValueChange={(v) => {
                  setSection(v === NONE ? "" : (v as PageSection));
                  setAiResults(null);
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Any section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Any section</SelectItem>
                  {PAGE_SECTIONS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {PAGE_SECTION_LABELS[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                Channel
              </Label>
              <Select
                value={channel || NONE}
                onValueChange={(v) => {
                  setChannel(v === NONE ? "" : (v as Channel));
                  setAiResults(null);
                }}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Any channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={NONE}>Any channel</SelectItem>
                  {CHANNELS.map((c) => (
                    <SelectItem key={c} value={c}>
                      {CHANNEL_LABELS[c]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Audience
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {AUDIENCES.map((a) => {
                const active = audience.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAudience(a)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {AUDIENCE_LABELS[a]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5">
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">
              Constraints
            </Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {CONSTRAINTS.map((c) => {
                const active = constraints.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleConstraint(c)}
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {CONSTRAINT_LABELS[c]}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Compiled summary */}
      {compiled && (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/30 px-3 py-2 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground">Compiled query:</span>{" "}
          {compiled.category && <span>category={compiled.category} · </span>}
          {compiled.requiredRails.length > 0 && (
            <span>required rails [{compiled.requiredRails.join(", ")}] · </span>
          )}
          {compiled.boostRails.length > 0 && (
            <span>boost rails [{compiled.boostRails.join(", ")}] · </span>
          )}
          <span>
            text length {compiled.text.length} chars
          </span>
        </div>
      )}

      {showAiHint && (
        <p className="mt-3 text-xs text-muted-foreground">
          Keyword match is weak (top score {top.toFixed(2)}). Try
          <span className="text-foreground"> Ask AI</span> for a semantic match.
        </p>
      )}

      {/* Keyword results */}
      {results.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {useStructured ? "Structured matches" : "Keyword matches"}
          </h2>
          <ul className="space-y-3">
            {results.map((r) => (
              <ResultRow
                key={r.route.id}
                route={r.route}
                score={r.score}
                reason={r.reason}
                matchedTriggers={r.matchedTriggers}
              />
            ))}
          </ul>
        </section>
      )}

      {/* AI results */}
      {aiResults && (
        <section className="mt-10">
          <h2 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" /> AI matches
          </h2>
          {aiResults.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              The AI returned no confident matches.
            </p>
          ) : (
            <ul className="space-y-3">
              {aiResults.map((r) => (
                <ResultRow
                  key={`ai-${r.route.id}`}
                  route={r.route}
                  score={r.score}
                  reason={r.reason}
                  ai
                />
              ))}
            </ul>
          )}
        </section>
      )}

      {query.trim() && results.length === 0 && !aiResults && !aiLoading && (
        <p className="mt-10 text-sm text-muted-foreground">
          {useStructured
            ? "No routes match these filters. Loosen a constraint or clear filters."
            : "No keyword matches."}{" "}
          Click <span className="text-foreground">Ask AI</span> for a semantic search.
        </p>
      )}
    </div>
  );
};

interface ResultRowProps {
  route: DecisionRoute;
  score: number;
  reason: string;
  matchedTriggers?: string[];
  ai?: boolean;
}

const ResultRow = ({ route, score, reason, matchedTriggers, ai }: ResultRowProps) => {
  return (
    <li className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-foreground/20">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-medium text-foreground">{route.title}</h3>
            {ai && (
              <Badge variant="secondary" className="text-[10px]">
                AI
              </Badge>
            )}
            <span className="text-xs text-muted-foreground">
              score {score.toFixed(2)}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{route.oneLine}</p>
          <p className="mt-2 text-xs text-muted-foreground">{reason}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {route.categories.map((c) => (
              <Badge key={c} variant="outline" className="text-[10px]">
                {CATEGORY_LABELS[c]}
              </Badge>
            ))}
          </div>

          {matchedTriggers && matchedTriggers.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {matchedTriggers.slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {route.guardRails.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {route.guardRails.map((g) => (
                <span
                  key={g}
                  className="rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground"
                >
                  {g}
                </span>
              ))}
            </div>
          )}

          {route.precedence && (
            <p className="mt-2 text-[11px] italic text-muted-foreground">
              precedence: {route.precedence}
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap gap-3 text-xs">
        <a
          href={`/${route.partnerDoc}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-foreground underline-offset-2 hover:underline"
        >
          partner doc <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={`/${route.sourceDoc}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-muted-foreground underline-offset-2 hover:underline"
        >
          source doc <ExternalLink className="h-3 w-3" />
        </a>
        <code className="text-muted-foreground">{route.id}</code>
      </div>
    </li>
  );
};

export default DecisionSearch;
