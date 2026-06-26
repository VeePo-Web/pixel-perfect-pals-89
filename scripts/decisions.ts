/**
 * CLI: bun scripts/decisions.ts "<query>" [--category seo] [--limit 10]
 *
 * Structured form (any structured flag triggers the structured router):
 *   bun scripts/decisions.ts "hero copy" \
 *     --section home-hero \
 *     --audience mothers --audience grandfathers \
 *     --channel web-mobile \
 *     --constraint wcag-aa --constraint motion-restraint \
 *     --exclude cmb-strategy-1.0
 *
 * For the AI fallback, use the /knowledge UI route.
 */

import {
  searchDecisions,
  searchDecisionsStructured,
  topScore,
  AI_FALLBACK_THRESHOLD,
} from "../src/master/knowledge/decision-search";
import type { DecisionCategory } from "../src/master/knowledge/decision-index";
import {
  validateDecisionInput,
  hasStructuredFilters,
  type Audience,
  type Channel,
  type Constraint,
  type PageSection,
} from "../src/master/knowledge/decision-input";

interface ParsedArgs {
  query: string;
  category?: DecisionCategory;
  limit: number;
  section?: PageSection;
  audience: Audience[];
  channel?: Channel;
  constraints: Constraint[];
  exclude: string[];
}

function parseArgs(argv: string[]): ParsedArgs {
  const args = argv.slice(2);
  const out: ParsedArgs = {
    query: "",
    limit: 10,
    audience: [],
    constraints: [],
    exclude: [],
  };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    const next = () => args[++i];
    if (a === "--category") out.category = next() as DecisionCategory;
    else if (a === "--limit") out.limit = parseInt(next(), 10) || 10;
    else if (a === "--section") out.section = next() as PageSection;
    else if (a === "--audience") out.audience.push(next() as Audience);
    else if (a === "--channel") out.channel = next() as Channel;
    else if (a === "--constraint") out.constraints.push(next() as Constraint);
    else if (a === "--exclude") out.exclude.push(next());
    else if (!a.startsWith("--")) out.query = out.query ? `${out.query} ${a}` : a;
  }
  return out;
}

function pad(s: string, n: number): string {
  if (s.length >= n) return s.slice(0, n - 1) + "…";
  return s + " ".repeat(n - s.length);
}

const parsed = parseArgs(process.argv);

if (!parsed.query) {
  console.error(
    'Usage: bun scripts/decisions.ts "<query>" [--category seo] [--limit 10]',
  );
  console.error(
    "       [--section <id>] [--audience <id>]* [--channel <id>] [--constraint <id>]* [--exclude <route-id>]*",
  );
  process.exit(1);
}

const structuredCandidate = {
  goal: parsed.query,
  pageSection: parsed.section,
  audience: parsed.audience.length ? parsed.audience : undefined,
  channel: parsed.channel,
  category: parsed.category,
  constraints: parsed.constraints.length ? parsed.constraints : undefined,
  excludeIds: parsed.exclude.length ? parsed.exclude : undefined,
};

const useStructured = hasStructuredFilters(structuredCandidate);

if (useStructured) {
  const validated = validateDecisionInput(structuredCandidate);
  if (!validated.ok) {
    console.error("Invalid input:");
    for (const [k, v] of Object.entries(validated.errors)) {
      console.error(`  ${k}: ${v}`);
    }
    process.exit(2);
  }

  const { compiled, results } = searchDecisionsStructured(validated.value, {
    limit: parsed.limit,
  });

  console.log(`\nQuery: "${parsed.query}"  [structured]`);
  if (compiled.category) console.log(`  category filter: ${compiled.category}`);
  if (compiled.requiredRails.length)
    console.log(`  required rails:  ${compiled.requiredRails.join(", ")}`);
  if (compiled.boostRails.length)
    console.log(`  boost rails:     ${compiled.boostRails.join(", ")}`);
  if (compiled.excludeIds.size)
    console.log(`  excluded ids:    ${[...compiled.excludeIds].join(", ")}`);
  console.log("");

  if (results.length === 0) {
    console.log("No matches under the current filters.");
    process.exit(0);
  }

  console.log(pad("score", 7) + pad("id", 22) + pad("partner doc", 70) + "why");
  console.log("-".repeat(140));
  for (const r of results) {
    console.log(
      pad(r.score.toFixed(2), 7) +
        pad(r.route.id, 22) +
        pad(r.route.partnerDoc, 70) +
        r.reason,
    );
  }
  const top = topScore(results);
  if (top < AI_FALLBACK_THRESHOLD) {
    console.log(
      `\n⚠  Top score ${top.toFixed(2)} below AI fallback threshold ${AI_FALLBACK_THRESHOLD}.`,
    );
    console.log('    Open /knowledge in the app and click "Ask AI" for a semantic match.');
  }
  console.log("");
} else {
  const results = searchDecisions(parsed.query, {
    category: parsed.category,
    limit: parsed.limit,
  });

  if (results.length === 0) {
    console.log(`No keyword matches for: "${parsed.query}"`);
    console.log("Try the /knowledge UI route for AI-assisted matching.");
    process.exit(0);
  }

  console.log(
    `\nQuery: "${parsed.query}"${parsed.category ? ` [category=${parsed.category}]` : ""}\n`,
  );
  console.log(pad("score", 7) + pad("id", 22) + pad("partner doc", 70) + "why");
  console.log("-".repeat(140));
  for (const r of results) {
    console.log(
      pad(r.score.toFixed(2), 7) +
        pad(r.route.id, 22) +
        pad(r.route.partnerDoc, 70) +
        r.reason,
    );
  }

  const top = topScore(results);
  if (top < AI_FALLBACK_THRESHOLD) {
    console.log(
      `\n⚠  Top score ${top.toFixed(2)} below AI fallback threshold ${AI_FALLBACK_THRESHOLD}.`,
    );
    console.log('    Open /knowledge in the app and click "Ask AI" for a semantic match.');
  }
  console.log("");
}
