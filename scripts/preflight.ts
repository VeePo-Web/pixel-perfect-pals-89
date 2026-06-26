/**
 * CLI: bun scripts/preflight.ts [--only gr-foo] [--skip gr-bar] [--json] [--strict]
 *
 * Runs every guard rail in src/master/guardrails.ts via the preflight runner
 * and prints a categorized report. In `--strict` mode (used by `prebuild`),
 * exits non-zero on any failure so the build halts.
 */

import { runPreflight } from "../src/master/knowledge/preflight";
import type { GuardRailId } from "../src/master/guardrails";

interface CliArgs {
  only?: GuardRailId[];
  skip?: GuardRailId[];
  json: boolean;
  strict: boolean;
}

function parseArgs(argv: string[]): CliArgs {
  const args = argv.slice(2);
  const out: CliArgs = { json: false, strict: false };
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === "--only" && args[i + 1]) {
      out.only = args[++i].split(",") as GuardRailId[];
    } else if (a === "--skip" && args[i + 1]) {
      out.skip = args[++i].split(",") as GuardRailId[];
    } else if (a === "--json") out.json = true;
    else if (a === "--strict") out.strict = true;
  }
  return out;
}

const ICON = { pass: "✓", fail: "✗", skipped: "◌" } as const;
const COLOR = {
  pass: "\x1b[32m",
  fail: "\x1b[31m",
  skipped: "\x1b[33m",
  dim: "\x1b[2m",
  reset: "\x1b[0m",
  bold: "\x1b[1m",
};

const args = parseArgs(process.argv);
const report = await runPreflight({ only: args.only, skip: args.skip });

if (args.json) {
  console.log(JSON.stringify(report, null, 2));
} else {
  const grouped = new Map<string, typeof report.rails>();
  for (const rail of report.rails) {
    const list = grouped.get(rail.category) ?? [];
    list.push(rail);
    grouped.set(rail.category, list);
  }

  console.log(
    `\n${COLOR.bold}Preflight — ${report.total} rails${COLOR.reset}  ` +
      `${COLOR.pass}${report.passed} pass${COLOR.reset}  ` +
      `${COLOR.fail}${report.failed} fail${COLOR.reset}  ` +
      `${COLOR.skipped}${report.skipped} skipped${COLOR.reset}\n`,
  );

  for (const [cat, rails] of grouped) {
    console.log(`${COLOR.bold}${cat}${COLOR.reset}`);
    for (const r of rails) {
      const c = COLOR[r.status];
      console.log(`  ${c}${ICON[r.status]} ${r.id}${COLOR.reset}  ${r.title}`);
      if (r.status === "fail") {
        for (const f of r.failures) console.log(`      ${COLOR.fail}- ${f}${COLOR.reset}`);
        console.log(`      ${COLOR.dim}remediation:${COLOR.reset} ${r.remediation}`);
        if (r.routes.length > 0) {
          console.log(
            `      ${COLOR.dim}consult:${COLOR.reset} ${r.routes.map((x) => x.id).join(", ")}`,
          );
          for (const path of r.partnerDocPaths.slice(0, 3)) {
            console.log(`        ${COLOR.dim}${path}${COLOR.reset}`);
          }
        }
      } else if (r.status === "skipped") {
        console.log(`      ${COLOR.dim}${r.evidence[0] ?? "skipped"}${COLOR.reset}`);
      }
    }
    console.log("");
  }

  if (!report.ok) {
    console.log(
      `${COLOR.fail}✗ Preflight failed.${COLOR.reset} ${report.failed} rail(s) blocking ship.\n`,
    );
  } else {
    console.log(`${COLOR.pass}✓ Preflight passed.${COLOR.reset}\n`);
  }
}

// Exit code policy
if (args.strict) {
  // Strict: any fail OR any skipped halts the build.
  process.exit(report.failed === 0 && report.skipped === 0 ? 0 : report.failed > 0 ? 1 : 0);
}
process.exit(report.failed === 0 ? 0 : 1);
