/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DECISION SEARCH — pure deterministic keyword scorer
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Used by both the CLI (scripts/decisions.ts) and the /knowledge UI route.
 * Returns lean results: route + score + matched triggers/categories + reason.
 * Never touches I/O, never calls external APIs.
 *
 * The AI fallback (supabase/functions/decision-search-ai) is invoked
 * separately when topScore < AI_FALLBACK_THRESHOLD.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  DECISION_INDEX,
  type DecisionCategory,
  type DecisionRoute,
} from "./decision-index";
import {
  AUDIENCE_HINTS,
  CHANNEL_HINTS,
  CONSTRAINT_HINTS,
  PAGE_SECTION_HINTS,
  type DecisionInput,
} from "./decision-input";
import type { GuardRailId } from "../guardrails";

export const AI_FALLBACK_THRESHOLD = 0.35;

export interface MatchResult {
  route: DecisionRoute;
  score: number;
  matchedTriggers: string[];
  matchedCategories: DecisionCategory[];
  reason: string;
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "on", "in", "at", "to", "of",
  "is", "are", "be", "this", "that", "it", "as", "with", "by", "from", "we",
  "i", "my", "our", "your", "you", "what", "should", "how", "do", "does",
  "can", "would", "could", "if", "about", "page", "site",
]);

const CATEGORY_HINTS: Record<DecisionCategory, string[]> = {
  seo: ["seo", "meta", "keyword", "schema", "serp", "ranking", "json-ld", "areas we serve", "ai search", "perplexity", "chatgpt"],
  "brand-style": ["brand", "palette", "color", "colour", "typography", "font", "visual", "logo", "style"],
  "voice-copy": ["voice", "tone", "copy", "headline", "tagline", "microcopy", "wording", "language", "register"],
  "persona-icp": ["persona", "icp", "audience", "buyer", "mother", "mom", "grandfather", "elderly", "subcontractor", "vendor", "tradesperson"],
  conversion: ["conversion", "cta", "booking", "form", "lead", "convert", "objection"],
  "ux-layout": ["ux", "layout", "composition", "density", "rhythm", "section", "hero composition", "footer architecture", "form layout"],
  performance: ["performance", "speed", "lighthouse", "lcp", "cls", "image pipeline", "mobile budget"],
  "trust-legal": ["trust", "legal", "warranty", "license", "insurance", "nap", "privacy", "terms"],
  "strategy-positioning": ["strategy", "positioning", "north star", "mission", "purpose", "differentiation", "pitch"],
  "architecture-backend": ["architecture", "backend", "sister site", "sister-site", "remix", "trade.config", "taxonomy", "trades.ts"],
};

function normalize(s: string): string {
  return s.toLowerCase().replace(/[^\w\s/-]/g, " ").replace(/\s+/g, " ").trim();
}

function tokenize(s: string): string[] {
  return normalize(s)
    .split(" ")
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function scoreRoute(
  route: DecisionRoute,
  query: string,
  qTokens: string[],
): Omit<MatchResult, "route"> {
  const qNorm = normalize(query);
  const qTokenSet = new Set(qTokens);

  // 1. Trigger phrase substring hits (strongest signal).
  const matchedTriggers: string[] = [];
  let triggerScore = 0;
  for (const trig of route.triggers) {
    const tNorm = normalize(trig);
    if (!tNorm) continue;
    if (qNorm.includes(tNorm)) {
      matchedTriggers.push(trig);
      triggerScore += 3 + Math.min(tNorm.split(" ").length, 4); // longer phrase = stronger
      continue;
    }
    // Partial: every token of the trigger appears in the query.
    const tTokens = tokenize(tNorm);
    if (tTokens.length > 0 && tTokens.every((t) => qTokenSet.has(t))) {
      matchedTriggers.push(trig);
      triggerScore += 2 + tTokens.length;
    }
  }

  // 2. Category hint hits.
  const matchedCategories: DecisionCategory[] = [];
  let categoryScore = 0;
  for (const cat of route.categories) {
    const hints = CATEGORY_HINTS[cat] ?? [];
    let hit = false;
    for (const h of hints) {
      if (qNorm.includes(h)) {
        hit = true;
        break;
      }
    }
    if (hit) {
      matchedCategories.push(cat);
      categoryScore += 2;
    }
  }

  // 3. Title / oneLine fuzzy token overlap (weak).
  const titleTokens = new Set(tokenize(route.title + " " + route.oneLine));
  let titleOverlap = 0;
  for (const t of qTokens) {
    if (titleTokens.has(t)) titleOverlap += 1;
  }

  // 4. Precedence boost — small nudge so e.g. v1.2 wins ties over v1.0.
  const precedenceBoost = route.precedence ? 0.5 : 0;

  const raw = triggerScore + categoryScore + titleOverlap + precedenceBoost;

  // Normalize loosely to 0..1. We treat ~12 as a "strong" hit ceiling.
  const score = Math.min(1, raw / 12);

  const reasonParts: string[] = [];
  if (matchedTriggers.length) {
    const sample = matchedTriggers.slice(0, 2).map((t) => `"${t}"`).join(", ");
    reasonParts.push(`triggers: ${sample}${matchedTriggers.length > 2 ? "…" : ""}`);
  }
  if (matchedCategories.length) {
    reasonParts.push(`categories: ${matchedCategories.join(", ")}`);
  }
  if (!reasonParts.length && titleOverlap > 0) {
    reasonParts.push("title token overlap");
  }
  if (!reasonParts.length) reasonParts.push("no direct match");

  return {
    score,
    matchedTriggers,
    matchedCategories,
    reason: reasonParts.join(" · "),
  };
}

export interface SearchOptions {
  category?: DecisionCategory;
  limit?: number;
  minScore?: number;
}

export function searchDecisions(
  query: string,
  opts: SearchOptions = {},
): MatchResult[] {
  const { category, limit = 10, minScore = 0 } = opts;
  const qTokens = tokenize(query);
  if (qTokens.length === 0) return [];

  const pool = category
    ? DECISION_INDEX.filter((r) => r.categories.includes(category))
    : DECISION_INDEX;

  const results: MatchResult[] = pool
    .map((route) => ({ route, ...scoreRoute(route, query, qTokens) }))
    .filter((r) => r.score >= minScore && r.score > 0)
    .sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

export function topScore(results: MatchResult[]): number {
  return results[0]?.score ?? 0;
}

// ───────────────────────────────────────────────────────────────────────────
// Structured input → compiled query
// ───────────────────────────────────────────────────────────────────────────

export interface CompiledQuery {
  /** Synthesized free-text passed to the existing keyword scorer. */
  text: string;
  /** Hard category pre-filter (from input.category). */
  category?: DecisionCategory;
  /** Soft boost: routes touching these guard rails get a score nudge. */
  boostRails: GuardRailId[];
  /** Hard filter: route MUST cover every rail listed here. */
  requiredRails: GuardRailId[];
  /** Routes excluded outright. */
  excludeIds: Set<string>;
}

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function compileQuery(input: DecisionInput): CompiledQuery {
  const phrases: string[] = [input.goal];
  const boostRails: GuardRailId[] = [];
  const requiredRails: GuardRailId[] = [];

  const collect = (hint?: { phrases: string[]; boostRails: GuardRailId[]; requireRails?: GuardRailId[] }) => {
    if (!hint) return;
    phrases.push(...hint.phrases);
    boostRails.push(...hint.boostRails);
    if (hint.requireRails) requiredRails.push(...hint.requireRails);
  };

  if (input.pageSection) collect(PAGE_SECTION_HINTS[input.pageSection]);
  if (input.channel) collect(CHANNEL_HINTS[input.channel]);
  for (const a of input.audience ?? []) collect(AUDIENCE_HINTS[a]);
  for (const c of input.constraints ?? []) collect(CONSTRAINT_HINTS[c]);

  return {
    text: phrases.join(" · "),
    category: input.category,
    boostRails: uniq(boostRails),
    requiredRails: uniq(requiredRails),
    excludeIds: new Set(input.excludeIds ?? []),
  };
}

export interface StructuredSearchOptions {
  limit?: number;
  minScore?: number;
}

export function searchDecisionsStructured(
  input: DecisionInput,
  opts: StructuredSearchOptions = {},
): { compiled: CompiledQuery; results: MatchResult[] } {
  const { limit = 10, minScore = 0 } = opts;
  const compiled = compileQuery(input);
  const qTokens = tokenize(compiled.text);

  // 1. Pre-filter the candidate pool.
  const pool = DECISION_INDEX.filter((r) => {
    if (compiled.excludeIds.has(r.id)) return false;
    if (compiled.category && !r.categories.includes(compiled.category)) return false;
    if (compiled.requiredRails.length > 0) {
      const railSet = new Set(r.guardRails);
      for (const req of compiled.requiredRails) {
        if (!railSet.has(req)) return false;
      }
    }
    return true;
  });

  // 2. Score with the existing keyword scorer + boost-rail nudge.
  const results: MatchResult[] = pool
    .map((route) => {
      const base = scoreRoute(route, compiled.text, qTokens);
      const railSet = new Set(route.guardRails);
      const boostHits = compiled.boostRails.filter((g) => railSet.has(g));
      // Each boost hit adds +1 to the raw score (pre-normalized 0..1 ceiling).
      const boostedRaw = base.score + boostHits.length / 12;
      const score = Math.min(1, boostedRaw);
      const reason = boostHits.length
        ? `${base.reason} · +${boostHits.length} guard-rail boost`
        : base.reason;
      return { route, ...base, score, reason };
    })
    .filter((r) => r.score >= minScore && r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { compiled, results };
}
