/**
 * ═══════════════════════════════════════════════════════════════════════════
 * PREFLIGHT — non-negotiable guard-rail checker
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Runs every guard rail in src/master/guardrails.ts and returns a typed
 * report. Every failure carries the partner-doc routes you should consult
 * (via guardrail-routes.ts) so the operator never has to hunt for context.
 *
 * Used by:
 *   - scripts/preflight.ts                (CLI; runs in `prebuild`)
 *   - supabase/functions/preflight        (UI dashboard)
 *
 * Filesystem access is isolated behind the `Reader` interface so the same
 * logic can run in Node, Bun, or Deno (edge functions). The default reader
 * uses Node's fs/promises and is loaded lazily via dynamic import to keep
 * this module browser-safe.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import {
  GUARD_RAILS,
  type GuardRail,
  type GuardRailCategory,
  type GuardRailId,
} from "../guardrails";
import {
  getRoutesForGuardRail,
  getUnroutedGuardRails,
} from "./guardrail-routes";
import type { DecisionRoute } from "./decision-index";

// ───────────────────────────────────────────────────────────────────────────
// Types
// ───────────────────────────────────────────────────────────────────────────

export type RailStatus = "pass" | "fail" | "skipped";

export interface RailReport {
  id: GuardRailId | "gr-meta-coverage";
  title: string;
  category: GuardRailCategory | "operational-safety";
  status: RailStatus;
  law: string;
  evidence: string[];
  failures: string[];
  routes: DecisionRoute[];
  partnerDocPaths: string[];
  remediation: string;
}

export interface PreflightReport {
  ok: boolean;
  total: number;
  passed: number;
  failed: number;
  skipped: number;
  rails: RailReport[];
  /** ISO timestamp the report was generated */
  generatedAt: string;
}

export interface PreflightOptions {
  only?: GuardRailId[];
  skip?: GuardRailId[];
  /** Override repo root (defaults to process.cwd() when available). */
  cwd?: string;
  /** Override the file reader (used by edge function with bundled fixtures). */
  reader?: Reader;
}

// ───────────────────────────────────────────────────────────────────────────
// File reader abstraction
// ───────────────────────────────────────────────────────────────────────────

export interface Reader {
  cwd: string;
  /** Returns true if the file exists. */
  exists(relPath: string): Promise<boolean>;
  /** Returns file contents (utf-8) or null if missing. */
  readText(relPath: string): Promise<string | null>;
  /** Returns file size in bytes, or 0 if missing. */
  size(relPath: string): Promise<number>;
  /** Recursive grep — returns up to `limit` matching `file:line: text` strings. */
  grep(
    pattern: RegExp,
    opts?: { roots?: string[]; exts?: string[]; limit?: number },
  ): Promise<string[]>;
  /** List files in a directory (non-recursive). */
  list(relPath: string): Promise<string[]>;
}

let _defaultReader: Reader | null = null;

async function getDefaultReader(cwd: string): Promise<Reader> {
  if (_defaultReader && _defaultReader.cwd === cwd) return _defaultReader;
  // Lazy-load Node fs so this module stays bundleable for the browser.
  const fs = await import("node:fs/promises");
  const path = await import("node:path");

  async function walk(dir: string, exts: string[] | undefined): Promise<string[]> {
    const out: string[] = [];
    let entries: string[];
    try {
      entries = await fs.readdir(dir);
    } catch {
      return out;
    }
    for (const name of entries) {
      if (name === "node_modules" || name === "dist" || name.startsWith(".")) continue;
      const full = path.join(dir, name);
      let stat: Awaited<ReturnType<typeof fs.stat>>;
      try {
        stat = await fs.stat(full);
      } catch {
        continue;
      }
      if (stat.isDirectory()) {
        out.push(...(await walk(full, exts)));
      } else if (stat.isFile()) {
        if (!exts || exts.some((e) => name.endsWith(e))) out.push(full);
      }
    }
    return out;
  }

  const reader: Reader = {
    cwd,
    async exists(rel) {
      try {
        await fs.access(path.join(cwd, rel));
        return true;
      } catch {
        return false;
      }
    },
    async readText(rel) {
      try {
        return await fs.readFile(path.join(cwd, rel), "utf8");
      } catch {
        return null;
      }
    },
    async size(rel) {
      try {
        const s = await fs.stat(path.join(cwd, rel));
        return s.size;
      } catch {
        return 0;
      }
    },
    async grep(pattern, opts = {}) {
      const roots = opts.roots ?? ["src"];
      const exts = opts.exts ?? [".ts", ".tsx", ".js", ".jsx", ".html", ".md"];
      const limit = opts.limit ?? 50;
      const hits: string[] = [];
      for (const root of roots) {
        const files = await walk(path.join(cwd, root), exts);
        for (const file of files) {
          let text: string;
          try {
            text = await fs.readFile(file, "utf8");
          } catch {
            continue;
          }
          const lines = text.split("\n");
          for (let i = 0; i < lines.length; i++) {
            if (pattern.test(lines[i])) {
              hits.push(`${path.relative(cwd, file)}:${i + 1}: ${lines[i].trim()}`);
              if (hits.length >= limit) return hits;
            }
            // Reset stateful regex
            if (pattern.global) pattern.lastIndex = 0;
          }
        }
      }
      return hits;
    },
    async list(rel) {
      try {
        return await fs.readdir(path.join(cwd, rel));
      } catch {
        return [];
      }
    },
  };
  _defaultReader = reader;
  return reader;
}

// ───────────────────────────────────────────────────────────────────────────
// Checker registry — one per GuardRailId
// ───────────────────────────────────────────────────────────────────────────

interface CheckOutcome {
  status: RailStatus;
  evidence: string[];
  failures: string[];
  remediation: string;
}

type Checker = (reader: Reader) => Promise<CheckOutcome>;

const SKIP = (reason: string, remediation: string): CheckOutcome => ({
  status: "skipped",
  evidence: [reason],
  failures: [],
  remediation,
});

const PASS = (evidence: string[]): CheckOutcome => ({
  status: "pass",
  evidence,
  failures: [],
  remediation: "no action required",
});

const FAIL = (
  failures: string[],
  remediation: string,
  evidence: string[] = [],
): CheckOutcome => ({
  status: "fail",
  evidence,
  failures,
  remediation,
});

const RAIL_CHECKERS: Record<GuardRailId, Checker> = {
  // ── Brand & Identity ────────────────────────────────────────────────────
  "gr-bespoke-brand-derivation": async (r) => {
    const path = "src/config/brand-identity.ts";
    if (!(await r.exists(path))) {
      return FAIL(
        [`${path} is missing`],
        "Create src/config/brand-identity.ts derived from the master bible.",
      );
    }
    const text = (await r.readText(path)) ?? "";
    if (text.length < 200) {
      return FAIL(
        [`${path} exists but is suspiciously small (${text.length} bytes)`],
        "Flesh out brand-identity.ts with palette, typography, motion signature.",
      );
    }
    return PASS([`${path} present (${text.length} bytes)`]);
  },

  "gr-bespoke-style-guide-live": async (r) => {
    const app = (await r.readText("src/App.tsx")) ?? "";
    if (!app.includes('path="/style-guide"') && !app.includes("'/style-guide'")) {
      return FAIL(
        ["No /style-guide route registered in src/App.tsx"],
        "Register a noindex /style-guide route showing palette, type scale, components, motion samples.",
      );
    }
    return PASS(["/style-guide route registered"]);
  },

  "gr-zero-sister-fingerprints": async (r) => {
    const tradesText = (await r.readText("src/master/trades.ts")) ?? "";
    const slugs = Array.from(tradesText.matchAll(/slug:\s*"([^"]+)"/g)).map(
      (m) => m[1],
    );
    // Identify which slug is "self" by reading trade.config.ts
    const tradeConfig = (await r.readText("src/config/trade.config.ts")) ?? "";
    const selfMatch = tradeConfig.match(/trade:\s*"([^"]+)"/);
    const self = selfMatch?.[1];
    const sibling = slugs.filter((s) => s !== self);
    if (sibling.length === 0) {
      return SKIP(
        "No sibling slugs found in trades.ts; nothing to scan against.",
        "Add sibling trades to src/master/trades.ts as the network grows.",
      );
    }
    const pattern = new RegExp(
      `\\b(${sibling.map((s) => s.replace(/[-]/g, "[-]")).join("|")})\\b`,
      "i",
    );
    const hits = await r.grep(pattern, { roots: ["src"], limit: 20 });
    // Filter out hits inside trades.ts itself, knowledge docs (allowed),
    // backend taxonomy/SEO config, and master/playbook prose (not shipped UI).
    const real = hits.filter(
      (h) =>
        !h.startsWith("src/master/") &&
        !h.startsWith("src/config/business.ts") &&
        !h.startsWith("src/config/reviews.ts") &&
        !h.startsWith("src/components/knowledge/"),
    );
    if (real.length > 0) {
      return FAIL(
        real.slice(0, 10),
        "Remove sibling-trade references from app code; rerun preflight.",
        [`scanned for ${sibling.length} sibling slug(s)`],
      );
    }
    return PASS([`zero hits across ${sibling.length} sibling slug(s)`]);
  },

  "gr-master-logo-slot-map": async (r) => {
    const pattern = /<img[^>]*src=["'][^"']*(cmb-|master\/assets\/logo)/i;
    const hits = await r.grep(pattern, { roots: ["src"], limit: 20 });
    // Exclude markdown/playbook prose that quotes the rule as documentation.
    const real = hits.filter((h) => !/\.md:/.test(h) && !h.startsWith("src/master/checklist.ts"));
    if (real.length > 0) {
      return FAIL(
        real,
        "Replace direct master-logo <img> tags with <MasterLogo slot=\"...\"/>.",
      );
    }
    return PASS(["no direct master-logo <img> references in shipped code"]);
  },

  // ── SEO Depth ───────────────────────────────────────────────────────────
  "gr-areas-we-serve-excellence": async () =>
    SKIP(
      "Areas-We-Serve depth requires a running app + area spreadsheet.",
      "Run the in-app /style-guide audit and validate /areas/[slug] coverage manually.",
    ),

  "gr-page-meta-jsonld-unique": async (r) => {
    const files = (await r.list("src/pages")).filter((f) => f.endsWith(".tsx"));
    const titles = new Map<string, string[]>();
    const evidence: string[] = [];
    for (const f of files) {
      const text = (await r.readText(`src/pages/${f}`)) ?? "";
      const matches = Array.from(text.matchAll(/document\.title\s*=\s*["'`]([^"'`]+)["'`]/g));
      for (const m of matches) {
        const t = m[1].trim();
        const list = titles.get(t) ?? [];
        list.push(f);
        titles.set(t, list);
      }
    }
    evidence.push(`${files.length} page files, ${titles.size} unique titles`);
    const dups = Array.from(titles.entries()).filter(([, files]) => files.length > 1);
    if (dups.length > 0) {
      return FAIL(
        dups.map(([t, files]) => `duplicate title "${t}" in: ${files.join(", ")}`),
        "Make every page's document.title unique.",
        evidence,
      );
    }
    if (titles.size === 0) {
      return SKIP(
        "No document.title assignments found in src/pages.",
        "Wire per-page document.title (and meta description) using useEffect or a head manager.",
      );
    }
    return PASS(evidence);
  },

  "gr-crawl-hygiene": async (r) => {
    const failures: string[] = [];
    const evidence: string[] = [];
    const robots = await r.readText("public/robots.txt");
    if (!robots) failures.push("public/robots.txt missing");
    else {
      evidence.push(`robots.txt present (${robots.length} bytes)`);
      if (/^\s*Disallow:\s*\/\s*$/im.test(robots) && !/Allow:/i.test(robots)) {
        failures.push("robots.txt blocks the entire site (Disallow: /)");
      }
    }
    const sitemap = await r.exists("public/sitemap.xml");
    if (!sitemap) failures.push("public/sitemap.xml missing");
    else evidence.push("sitemap.xml present");
    if (failures.length > 0) {
      return FAIL(
        failures,
        "Add robots.txt and sitemap.xml to /public; ensure no production routes are disallowed.",
        evidence,
      );
    }
    return PASS(evidence);
  },

  "gr-local-trust-schema": async (r) => {
    const hits = await r.grep(/"@type"\s*:\s*"LocalBusiness"/, {
      roots: ["src", "public"],
      limit: 5,
    });
    if (hits.length === 0) {
      return FAIL(
        ["No LocalBusiness JSON-LD found in src/ or public/"],
        "Render LocalBusiness JSON-LD with address, hours, phone, geo, areaServed.",
      );
    }
    return PASS([`LocalBusiness JSON-LD found in ${hits.length} location(s)`]);
  },

  // ── Performance & Accessibility ─────────────────────────────────────────
  "gr-performance-budget-mobile": async () =>
    SKIP(
      "Mobile performance budget needs a runtime Lighthouse run.",
      "Run Lighthouse mobile against home + a service + an area page; verify LCP≤2.5s, INP≤200ms, CLS≤0.1.",
    ),

  "gr-modern-image-pipeline": async (r) => {
    const hits = await r.grep(/<img[^>]+src=["'][^"']+\.(png|jpe?g)["']/i, {
      roots: ["src"],
      exts: [".tsx", ".jsx", ".html"],
      limit: 20,
    });
    if (hits.length > 0) {
      return FAIL(
        hits,
        "Convert .png/.jpg <img> sources to webp/avif (or use <picture>) and lazy-load.",
      );
    }
    return PASS(["no raw png/jpg <img> sources detected in shipped components"]);
  },

  "gr-wcag-aa": async () =>
    SKIP(
      "WCAG-AA requires runtime axe checks + contrast matrix.",
      "Run axe on home + a service page; verify the /style-guide contrast matrix is green.",
    ),

  // ── Conversion & Trust ──────────────────────────────────────────────────
  "gr-booking-one-tap": async (r) => {
    const app = (await r.readText("src/App.tsx")) ?? "";
    if (!/BookingModal/.test(app)) {
      return FAIL(
        ["BookingModal not mounted in src/App.tsx"],
        "Mount a single BookingModal at the App level so any CTA can open it in one tap.",
      );
    }
    return PASS(["BookingModal mounted at App level"]);
  },

  "gr-real-business-signals": async (r) => {
    const failures: string[] = [];
    const evidence: string[] = [];
    const candidatePaths = [
      "src/components/Footer.tsx",
      "src/components/drywall/Footer.tsx",
      "src/pages/Contact.tsx",
    ];
    let footerText = "";
    for (const p of candidatePaths) {
      const t = await r.readText(p);
      if (t) {
        footerText += "\n" + t;
        evidence.push(`scanned ${p}`);
      }
    }
    if (!footerText) {
      return SKIP(
        "Could not locate a footer or contact page to scan.",
        "Ensure footer/contact surfaces phone, address, and hours.",
      );
    }
    const hasPhone = /(\+?\d[\d\s\-().]{7,})/.test(footerText);
    const hasAddress = /(street|avenue|road|drive|blvd|ave|st\.|rd\.|address)/i.test(
      footerText,
    );
    if (!hasPhone) failures.push("no phone-number pattern in footer/contact");
    if (!hasAddress) failures.push("no address keyword in footer/contact");
    if (failures.length > 0) {
      return FAIL(
        failures,
        "Render real phone + address + hours in footer and contact page; do not use placeholders.",
        evidence,
      );
    }
    return PASS(evidence);
  },

  "gr-legal-pages-bespoke": async (r) => {
    const failures: string[] = [];
    const evidence: string[] = [];
    for (const p of ["src/pages/Privacy.tsx", "src/pages/Terms.tsx"]) {
      const size = await r.size(p);
      if (size === 0) failures.push(`${p} missing`);
      else if (size < 1024) failures.push(`${p} suspiciously small (${size} bytes)`);
      else evidence.push(`${p} OK (${size} bytes)`);
    }
    if (failures.length > 0) {
      return FAIL(
        failures,
        "Author bespoke Privacy + Terms pages (real entity, real jurisdiction); do not ship placeholders.",
        evidence,
      );
    }
    return PASS(evidence);
  },

  // ── Motion, Copy & Craft ────────────────────────────────────────────────
  "gr-motion-system-pinned": async (r) => {
    const pkg = (await r.readText("package.json")) ?? "";
    if (!/framer-motion/.test(pkg)) {
      return FAIL(
        ["framer-motion not in package.json"],
        "Pin framer-motion and codify a motion system (durations, easings, reduced-motion fallback).",
      );
    }
    return PASS(["framer-motion present in package.json"]);
  },

  "gr-anti-paraphrase-readability": async () =>
    SKIP(
      "Anti-paraphrase audit needs the sister-site corpus.",
      "Run the cross-network n-gram audit; require ≤40% overlap on any 100-word window.",
    ),

  // ── Operational Safety ──────────────────────────────────────────────────
  "gr-plan-first-deep-items": async (r) => {
    const size = await r.size(".lovable/plan.md");
    if (size === 0) {
      return FAIL(
        [".lovable/plan.md missing or empty"],
        "Author a deep plan in .lovable/plan.md before any deep checklist item.",
      );
    }
    return PASS([`.lovable/plan.md present (${size} bytes)`]);
  },

  "gr-prelaunch-walk-postlaunch-monitor": async () =>
    SKIP(
      "Pre-launch walk + post-launch monitor are operational rituals.",
      "Run the pre-launch walk script and arm the 7-day post-launch CWV/uptime monitor.",
    ),
};

// ───────────────────────────────────────────────────────────────────────────
// Runner
// ───────────────────────────────────────────────────────────────────────────

function railToReport(
  rail: GuardRail,
  outcome: CheckOutcome,
): RailReport {
  const routes = getRoutesForGuardRail(rail.id);
  return {
    id: rail.id,
    title: rail.title,
    category: rail.category,
    status: outcome.status,
    law: rail.law,
    evidence: outcome.evidence,
    failures: outcome.failures,
    routes,
    partnerDocPaths: routes.map((r) => r.partnerDoc),
    remediation: outcome.remediation,
  };
}

export async function runPreflight(
  opts: PreflightOptions = {},
): Promise<PreflightReport> {
  const cwd =
    opts.cwd ??
    (typeof process !== "undefined" ? process.cwd() : "/dev-server");
  const reader = opts.reader ?? (await getDefaultReader(cwd));

  const onlySet = opts.only ? new Set(opts.only) : null;
  const skipSet = opts.skip ? new Set(opts.skip) : new Set<GuardRailId>();

  const rails: RailReport[] = [];

  // Meta coverage check (always first). Missing checkers = hard fail (real
  // bug). Unrouted rails surface as warnings via evidence — some rails (e.g.
  // operational-safety) legitimately have no partner-doc routing.
  const unrouted = getUnroutedGuardRails();
  const missingCheckers = GUARD_RAILS.filter(
    (g) => !(g.id in RAIL_CHECKERS),
  ).map((g) => g.id);
  const metaFailures: string[] = [];
  const metaEvidence: string[] = [
    `${GUARD_RAILS.length} rails declared`,
    `${Object.keys(RAIL_CHECKERS).length} checkers registered`,
  ];
  if (missingCheckers.length > 0) {
    metaFailures.push(`rails without checkers: ${missingCheckers.join(", ")}`);
  }
  if (unrouted.length > 0) {
    metaEvidence.push(
      `unrouted (no partner-doc context): ${unrouted.join(", ")}`,
    );
  }
  rails.push({
    id: "gr-meta-coverage",
    title: "Meta Coverage",
    category: "operational-safety",
    status: metaFailures.length > 0 ? "fail" : "pass",
    law: "Every guard rail must have a checker. Missing partner-doc routes are warnings only.",
    evidence: metaEvidence,
    failures: metaFailures,
    routes: [],
    partnerDocPaths: [],
    remediation:
      metaFailures.length > 0
        ? "Register a checker in preflight.ts for each missing rail."
        : "no action required",
  });

  for (const rail of GUARD_RAILS) {
    if (onlySet && !onlySet.has(rail.id)) continue;
    if (skipSet.has(rail.id)) {
      rails.push({
        id: rail.id,
        title: rail.title,
        category: rail.category,
        status: "skipped",
        law: rail.law,
        evidence: ["skipped via --skip flag"],
        failures: [],
        routes: getRoutesForGuardRail(rail.id),
        partnerDocPaths: getRoutesForGuardRail(rail.id).map((r) => r.partnerDoc),
        remediation: "remove from --skip when ready to enforce",
      });
      continue;
    }
    const checker = RAIL_CHECKERS[rail.id];
    let outcome: CheckOutcome;
    if (!checker) {
      outcome = SKIP(
        "no checker registered",
        "Add a checker entry in src/master/knowledge/preflight.ts.",
      );
    } else {
      try {
        outcome = await checker(reader);
      } catch (e) {
        outcome = FAIL(
          [`checker threw: ${e instanceof Error ? e.message : String(e)}`],
          "Fix the checker implementation in preflight.ts.",
        );
      }
    }
    rails.push(railToReport(rail, outcome));
  }

  const passed = rails.filter((r) => r.status === "pass").length;
  const failed = rails.filter((r) => r.status === "fail").length;
  const skipped = rails.filter((r) => r.status === "skipped").length;

  return {
    ok: failed === 0,
    total: rails.length,
    passed,
    failed,
    skipped,
    rails,
    generatedAt: new Date().toISOString(),
  };
}
