/**
 * regenerate-images.ts — AI Image Generation Script
 *
 * Reads IMAGE_MANIFEST, builds prompts, calls Gemini image-preview via
 * Google AI Studio or OpenRouter, encodes to AVIF + WebP, enforces byte
 * budgets, and prints a QA report.
 *
 * SETUP:
 *   npm install -D sharp @types/node
 *   # then set ONE of:
 *   export GOOGLE_AI_API_KEY="your-key"   # direct Google AI Studio
 *   export OPENROUTER_API_KEY="your-key"  # via OpenRouter
 *
 * RUN:
 *   npx tsx scripts/regenerate-images.ts              # all per-trade slots
 *   npx tsx scripts/regenerate-images.ts --brand-only # universal brand story slots
 *   npx tsx scripts/regenerate-images.ts --force      # overwrite existing files
 *   npx tsx scripts/regenerate-images.ts --slot HERO_HOME  # single slot
 *   npx tsx scripts/regenerate-images.ts --dry-run    # print prompts, no generation
 *
 * OUTPUT:
 *   public/remix/{TRADE_SLUG}/images/{KEY}.avif   (primary)
 *   public/remix/{TRADE_SLUG}/images/{KEY}.webp   (fallback)
 *   public/remix/{TRADE_SLUG}/images/{KEY}-{width}.avif  (srcset variants)
 *   public/remix/{TRADE_SLUG}/images/manifest.json (resolved paths + byte sizes)
 *
 *   Universal brand story outputs:
 *   public/brand/story/{KEY}.avif
 */

import { writeFileSync, mkdirSync, existsSync, readFileSync } from "fs";
import { join, dirname } from "path";
import { MASTER_REMIX } from "../src/config/template/remix-variables";
import {
  IMAGE_MANIFEST,
  UNIVERSAL_NEGATIVE,
  PROMPT_FORMULA,
  CAMERA_PROFILES,
  LIGHT_PROFILES,
  TRADE_SLOTS,
  BRAND_STORY_SLOTS,
  type ImageSlot,
} from "../src/config/template/image-manifest";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_AI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const OPENROUTER_BASE = "https://openrouter.ai/api/v1/chat/completions";

// Map OpenRouter model slugs → Google AI model IDs
const GOOGLE_MODEL_MAP: Record<string, string> = {
  "google/gemini-3.1-flash-image-preview": "gemini-2.0-flash-preview-image-generation",
  "google/gemini-3-pro-image-preview": "gemini-2.0-flash-preview-image-generation",
};

const SRCSET_WIDTHS = [400, 800, 1200, 1600] as const;

// ─────────────────────────────────────────────────────────────────────────────
// CLI ARGS
// ─────────────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const DRY_RUN = args.includes("--dry-run");
const BRAND_ONLY = args.includes("--brand-only");
const SLOT_ARG = (() => {
  const i = args.indexOf("--slot");
  return i !== -1 ? args[i + 1] : null;
})();

// ─────────────────────────────────────────────────────────────────────────────
// API KEY DETECTION
// ─────────────────────────────────────────────────────────────────────────────
const GOOGLE_AI_KEY = process.env.GOOGLE_AI_API_KEY ?? "";
const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY ?? "";
const USE_OPENROUTER = Boolean(OPENROUTER_KEY) && !GOOGLE_AI_KEY;

if (!GOOGLE_AI_KEY && !OPENROUTER_KEY && !DRY_RUN) {
  console.error(
    "❌ Set GOOGLE_AI_API_KEY (Google AI Studio) or OPENROUTER_API_KEY before running.\n" +
    "   Google AI Studio (free tier): https://aistudio.google.com/apikey\n" +
    "   OpenRouter: https://openrouter.ai/keys"
  );
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// TRADE CONFIG FROM MASTER_REMIX
// ─────────────────────────────────────────────────────────────────────────────
const TRADE_SLUG = MASTER_REMIX.TRADE_SLUG ?? "master";
const SERVICE = MASTER_REMIX.SERVICE;
const SERVICE_VERB = MASTER_REMIX.SERVICE_VERB;
const COMMUNITIES_0 = MASTER_REMIX.COMMUNITIES[0] ?? "Cochrane";
const PALETTE_ACCENT = MASTER_REMIX.PALETTE_ACCENT_HEX ?? "copper-warm hsl(30 62% 48%)";

// Material vocabulary per trade — defaults to drywall; override in MASTER_REMIX
const MATERIAL_PRIMARY = MASTER_REMIX.MATERIAL_PRIMARY ?? "joint compound, drywall board, skim coat, Level-5 finish";
const MATERIAL_SUBSURFACE = MASTER_REMIX.MATERIAL_SUBSURFACE ?? "mesh tape, corner bead, fiberglass compound";

// Derived forms
const SERVICE_PAST = SERVICE.endsWith("e") ? SERVICE + "d" : SERVICE + "ed";

// ─────────────────────────────────────────────────────────────────────────────
// PROMPT BUILDER
// ─────────────────────────────────────────────────────────────────────────────
function buildPrompt(slot: ImageSlot): string {
  if (slot.promptOverride) {
    return resolveTokens(slot.promptOverride);
  }

  const cameraProfile = CAMERA_PROFILES[slot.realism];
  const lightProfile = LIGHT_PROFILES[slot.light];

  const formula = PROMPT_FORMULA
    .replace("{SUBJECT}", resolveTokens(slot.subject))
    .replace("{COMMUNITIES_0}", COMMUNITIES_0)
    .replace("{CAMERA_PROFILE}", cameraProfile)
    .replace("{LIGHT_PROFILE}", lightProfile)
    .replace("{COMPOSITION}", resolveTokens(slot.composition))
    .replace("{MATERIAL}", resolveTokens(slot.material))
    .replace("{PALETTE_ACCENT}", PALETTE_ACCENT);

  const negative = [UNIVERSAL_NEGATIVE, ...(slot.negativeAdd ?? [])].join(", ");
  return `${formula}\n\nNEGATIVE PROMPT: ${negative}`;
}

function resolveTokens(str: string): string {
  return str
    .replace(/\{SERVICE\}/g, SERVICE)
    .replace(/\{SERVICE_VERB\}/g, SERVICE_VERB)
    .replace(/\{SERVICE_PAST\}/g, SERVICE_PAST)
    .replace(/\{COMMUNITIES_0\}/g, COMMUNITIES_0)
    .replace(/\{MATERIAL_PRIMARY\}/g, MATERIAL_PRIMARY)
    .replace(/\{MATERIAL_SUBSURFACE\}/g, MATERIAL_SUBSURFACE)
    .replace(/\{TRADE_SLUG\}/g, TRADE_SLUG)
    .replace(/\{PALETTE_ACCENT\}/g, PALETTE_ACCENT);
}

function resolveOutputPath(slot: ImageSlot): string {
  return resolveTokens(slot.outputPath);
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE GENERATION — Google AI Studio (direct)
// ─────────────────────────────────────────────────────────────────────────────
async function generateViaGoogleAI(slot: ImageSlot, prompt: string): Promise<Buffer> {
  const googleModel = GOOGLE_MODEL_MAP[slot.model] ?? "gemini-2.0-flash-preview-image-generation";
  const url = `${GOOGLE_AI_BASE}/${googleModel}:generateContent?key=${GOOGLE_AI_KEY}`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseModalities: ["IMAGE", "TEXT"] },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Google AI API ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json() as any;
  const candidates = data?.candidates ?? [];

  for (const candidate of candidates) {
    for (const part of candidate?.content?.parts ?? []) {
      if (part?.inlineData?.mimeType?.startsWith("image/")) {
        return Buffer.from(part.inlineData.data, "base64");
      }
    }
  }

  throw new Error(`No image part in Google AI response for ${slot.key}. Response: ${JSON.stringify(data).slice(0, 400)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// IMAGE GENERATION — OpenRouter
// ─────────────────────────────────────────────────────────────────────────────
async function generateViaOpenRouter(slot: ImageSlot, prompt: string): Promise<Buffer> {
  const res = await fetch(OPENROUTER_BASE, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_KEY}`,
      "Content-Type": "application/json",
      "X-Title": "CMB Image Regeneration",
    },
    body: JSON.stringify({
      model: slot.model,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenRouter API ${res.status}: ${err.slice(0, 300)}`);
  }

  const data = await res.json() as any;

  // OpenRouter may return base64 image data in the content or a URL
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content === "string" && content.startsWith("data:image")) {
    const base64 = content.split(",")[1];
    return Buffer.from(base64, "base64");
  }

  // Some providers return image_url in a structured content block
  if (Array.isArray(content)) {
    for (const block of content) {
      if (block?.type === "image_url") {
        const url: string = block.image_url?.url ?? "";
        if (url.startsWith("data:image")) {
          const base64 = url.split(",")[1];
          return Buffer.from(base64, "base64");
        }
        // Fetch external URL
        const imgRes = await fetch(url);
        const arrayBuffer = await imgRes.arrayBuffer();
        return Buffer.from(arrayBuffer);
      }
    }
  }

  throw new Error(`Could not extract image from OpenRouter response for ${slot.key}. Content: ${JSON.stringify(content).slice(0, 200)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// SHARP — AVIF + WebP encode with srcset
// ─────────────────────────────────────────────────────────────────────────────
async function encodeAndSave(
  rawPng: Buffer,
  slot: ImageSlot,
  outputPath: string
): Promise<{ primaryBytes: number; srcsetPaths: string[] }> {
  // Dynamic import — sharp is a native addon
  const sharp = (await import("sharp")).default;

  const avifPath = outputPath.replace(/\.(avif|webp|png|jpg)$/, "") + ".avif";
  const webpPath = outputPath.replace(/\.(avif|webp|png|jpg)$/, "") + ".webp";

  mkdirSync(dirname(avifPath), { recursive: true });

  // Primary AVIF at full target width
  const img = sharp(rawPng).resize(slot.width, undefined, {
    fit: "inside",
    withoutEnlargement: true,
  });

  // Enforce byte budget — retry with lower quality until under budget
  let quality = 75;
  let avifBuf: Buffer;
  do {
    avifBuf = await img.clone().avif({ quality }).toBuffer();
    if (avifBuf.length <= slot.maxBytes) break;
    quality -= 5;
    if (quality < 30) {
      console.warn(`⚠️  ${slot.key}: still over budget at q30 (${avifBuf.length}B > ${slot.maxBytes}B). Keeping q30.`);
      break;
    }
  } while (avifBuf.length > slot.maxBytes);

  writeFileSync(avifPath, avifBuf);

  // WebP fallback at same quality
  const webpBuf = await img.clone().webp({ quality }).toBuffer();
  writeFileSync(webpPath, webpBuf);

  // Srcset variants
  const srcsetPaths: string[] = [];
  for (const w of SRCSET_WIDTHS) {
    if (w >= slot.width) continue; // don't upscale
    const srcPath = avifPath.replace(".avif", `-${w}.avif`);
    const srcBuf = await sharp(rawPng)
      .resize(w, undefined, { fit: "inside", withoutEnlargement: true })
      .avif({ quality })
      .toBuffer();
    writeFileSync(srcPath, srcBuf);
    srcsetPaths.push(srcPath);
  }

  return { primaryBytes: avifBuf.length, srcsetPaths };
}

// ─────────────────────────────────────────────────────────────────────────────
// QA REPORT
// ─────────────────────────────────────────────────────────────────────────────
interface QARow {
  key: string;
  status: "skip" | "dry" | "ok" | "fail" | "over-budget";
  bytes: number | null;
  budget: number;
  attempts: number;
  note: string;
}

function printReport(rows: QARow[]) {
  console.log("\n" + "─".repeat(90));
  console.log("  QA REPORT — Cochrane Master Builders Image Regeneration");
  console.log("─".repeat(90));
  console.log(`  Trade slug : ${TRADE_SLUG}`);
  console.log(`  Service    : ${SERVICE}`);
  console.log(`  Community  : ${COMMUNITIES_0}`);
  console.log(`  Provider   : ${USE_OPENROUTER ? "OpenRouter" : "Google AI Studio"}`);
  console.log("─".repeat(90));

  const header = "  Slot".padEnd(36) + "Status".padEnd(14) + "Bytes".padEnd(12) + "Budget".padEnd(12) + "Att.";
  console.log(header);
  console.log("  " + "─".repeat(86));

  let totalBytes = 0;
  let failCount = 0;
  let overBudgetCount = 0;

  for (const row of rows) {
    const icon =
      row.status === "ok"          ? "✓" :
      row.status === "skip"        ? "↷" :
      row.status === "dry"         ? "○" :
      row.status === "over-budget" ? "⚠" : "✗";

    const bytesStr = row.bytes != null ? `${Math.round(row.bytes / 1024)}KB` : "—";
    const budgetStr = `${Math.round(row.budget / 1024)}KB`;

    const line =
      `  ${icon} ${row.key}`.padEnd(36) +
      row.status.padEnd(14) +
      bytesStr.padEnd(12) +
      budgetStr.padEnd(12) +
      String(row.attempts);

    console.log(line);
    if (row.note) console.log(`    ↳ ${row.note}`);

    if (row.bytes) totalBytes += row.bytes;
    if (row.status === "fail") failCount++;
    if (row.status === "over-budget") overBudgetCount++;
  }

  console.log("─".repeat(90));
  const generated = rows.filter(r => r.status === "ok" || r.status === "over-budget").length;
  const skipped   = rows.filter(r => r.status === "skip").length;
  console.log(`  Generated  : ${generated} | Skipped : ${skipped} | Failures : ${failCount} | Over-budget : ${overBudgetCount}`);
  console.log(`  Total AVIF : ${Math.round(totalBytes / 1024)}KB across all primary assets`);
  console.log("─".repeat(90) + "\n");

  if (failCount > 0) {
    console.error(`❌ ${failCount} slot(s) failed. Re-run with --slot {KEY} to retry individual slots.`);
    process.exit(1);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// MANIFEST JSON (placed in trade output directory)
// ─────────────────────────────────────────────────────────────────────────────
function writeManifestJSON(rows: QARow[]) {
  const dir = `public/remix/${TRADE_SLUG}/images`;
  mkdirSync(dir, { recursive: true });

  const resolved: Record<string, { avif: string; webp: string; bytes: number | null; alt: string }> = {};

  for (const row of rows) {
    const slot = IMAGE_MANIFEST.find(s => s.key === row.key);
    if (!slot) continue;
    const basePath = resolveOutputPath(slot).replace(".avif", "");
    resolved[row.key] = {
      avif: basePath + ".avif",
      webp: basePath + ".webp",
      bytes: row.bytes,
      alt: resolveTokens(slot.altFormula),
    };
  }

  writeFileSync(
    join(dir, "manifest.json"),
    JSON.stringify({ generatedAt: new Date().toISOString(), trade: TRADE_SLUG, slots: resolved }, null, 2)
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log("\n🏗️  Cochrane Master Builders — Image Regeneration");
  console.log(`   Trade  : ${TRADE_SLUG} (${SERVICE})`);
  console.log(`   Mode   : ${DRY_RUN ? "DRY RUN" : BRAND_ONLY ? "BRAND ONLY" : "PER-TRADE"}`);
  console.log(`   Force  : ${FORCE ? "yes" : "no (skip existing)"}\n`);

  // Select which slots to run
  let slots = BRAND_ONLY ? BRAND_STORY_SLOTS : TRADE_SLOTS;

  if (SLOT_ARG) {
    const target = IMAGE_MANIFEST.find(s => s.key === SLOT_ARG);
    if (!target) {
      console.error(`❌ Unknown slot: ${SLOT_ARG}`);
      console.error(`   Valid keys: ${IMAGE_MANIFEST.map(s => s.key).join(", ")}`);
      process.exit(1);
    }
    slots = [target];
  }

  const report: QARow[] = [];

  for (const slot of slots) {
    const outputPath = resolveOutputPath(slot);
    const avifPath = outputPath.replace(/\.(avif|webp|png|jpg)$/, "") + ".avif";

    // Skip existing unless --force
    if (!FORCE && existsSync(avifPath)) {
      const existingSize = readFileSync(avifPath).length;
      report.push({ key: slot.key, status: "skip", bytes: existingSize, budget: slot.maxBytes, attempts: 0, note: "file exists, use --force to overwrite" });
      console.log(`↷ ${slot.key} — skipped (exists)`);
      continue;
    }

    const prompt = buildPrompt(slot);

    if (DRY_RUN) {
      report.push({ key: slot.key, status: "dry", bytes: null, budget: slot.maxBytes, attempts: 0, note: "" });
      console.log(`○ ${slot.key} [DRY RUN]`);
      console.log(`  PROMPT: ${prompt.slice(0, 120)}…\n`);
      continue;
    }

    // Attempt generation with retry
    const MAX_ATTEMPTS = 3;
    let lastError: Error | null = null;
    let success = false;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        console.log(`⏳ ${slot.key} — attempt ${attempt}/${MAX_ATTEMPTS}…`);

        const rawPng = USE_OPENROUTER
          ? await generateViaOpenRouter(slot, prompt)
          : await generateViaGoogleAI(slot, prompt);

        const { primaryBytes } = await encodeAndSave(rawPng, slot, avifPath);

        const status = primaryBytes > slot.maxBytes ? "over-budget" : "ok";
        report.push({
          key: slot.key,
          status,
          bytes: primaryBytes,
          budget: slot.maxBytes,
          attempts: attempt,
          note: status === "over-budget" ? `${Math.round(primaryBytes/1024)}KB > ${Math.round(slot.maxBytes/1024)}KB budget — consider tighter composition` : "",
        });

        console.log(`  ✓ ${slot.key} — ${Math.round(primaryBytes / 1024)}KB (budget: ${Math.round(slot.maxBytes / 1024)}KB)`);
        success = true;
        break;

      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        console.error(`  ✗ Attempt ${attempt} failed: ${lastError.message.slice(0, 120)}`);
        if (attempt < MAX_ATTEMPTS) {
          await new Promise(r => setTimeout(r, 2000 * attempt)); // exponential backoff
        }
      }
    }

    if (!success) {
      report.push({
        key: slot.key,
        status: "fail",
        bytes: null,
        budget: slot.maxBytes,
        attempts: MAX_ATTEMPTS,
        note: lastError?.message.slice(0, 200) ?? "unknown error",
      });
    }
  }

  if (!DRY_RUN) {
    writeManifestJSON(report);
  }

  printReport(report);
}

main().catch(err => {
  console.error("\n💥 Unhandled error:", err);
  process.exit(1);
});
