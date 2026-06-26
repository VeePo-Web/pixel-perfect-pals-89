#!/usr/bin/env node
// Capture a source document byte-for-byte and write its SHA-256 sidecar + manifest entry.
//
// Usage:
//   node scripts/source-docs/capture-source.mjs <target-path> <input-file>
//   cat paste.txt | node scripts/source-docs/capture-source.mjs <target-path> --stdin [--source-name=<name>]
//
// Rules:
//   - Bytes are copied verbatim. No newline normalization, no encoding conversion.
//   - If <target-path> already exists with a different hash, refuses unless --force.

import { readFile, writeFile, mkdir, copyFile, stat } from "node:fs/promises";
import path from "node:path";
import {
  hashFile,
  hashBuffer,
  sidecarPath,
  readManifest,
  writeManifest,
  relFromRoot,
  ROOT,
} from "./_lib.mjs";

function parseArgs(argv) {
  const args = { flags: {}, positional: [] };
  for (const a of argv) {
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      args.flags[k] = v ?? true;
    } else args.positional.push(a);
  }
  return args;
}

async function main() {
  const { positional, flags } = parseArgs(process.argv.slice(2));
  const [targetRel, input] = positional;
  if (!targetRel || !input) {
    console.error("Usage: capture-source.mjs <target-path> <input-file|--stdin>");
    process.exit(2);
  }
  const target = path.resolve(targetRel);
  if (!target.startsWith(ROOT)) {
    console.error(`Refusing to write outside source-documents/: ${target}`);
    process.exit(2);
  }
  await mkdir(path.dirname(target), { recursive: true });

  let buf;
  let sourceName;
  if (input === "--stdin" || flags.stdin) {
    buf = await new Promise((resolve, reject) => {
      const chunks = [];
      process.stdin.on("data", (c) => chunks.push(c));
      process.stdin.on("end", () => resolve(Buffer.concat(chunks)));
      process.stdin.on("error", reject);
    });
    sourceName = flags["source-name"] || "stdin";
  } else {
    buf = await readFile(input);
    sourceName = path.basename(input);
  }

  const sha256 = await hashBuffer(buf);

  // Refuse to overwrite a different file unless --force.
  try {
    const existing = await hashFile(target);
    if (existing.sha256 !== sha256 && !flags.force) {
      console.error(
        `Refusing to overwrite ${targetRel} (existing sha=${existing.sha256.slice(0, 12)}, new sha=${sha256.slice(0, 12)}). Pass --force to replace.`
      );
      process.exit(3);
    }
  } catch {
    /* not present yet */
  }

  await writeFile(target, buf);

  let lines = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x0a) lines++;

  const sidecar = {
    sha256,
    bytes: buf.length,
    lines,
    capturedAt: new Date().toISOString(),
    sourceName,
    trusted: true,
  };
  await writeFile(sidecarPath(target), JSON.stringify(sidecar, null, 2) + "\n");

  const rel = relFromRoot(target);
  const manifest = await readManifest();
  manifest.entries[rel] = sidecar;
  await writeManifest(manifest);

  console.log(`captured ${rel}  sha=${sha256.slice(0, 12)}  bytes=${buf.length}  lines=${lines}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
