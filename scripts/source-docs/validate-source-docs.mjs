#!/usr/bin/env node
// Validate that every source document matches its recorded SHA-256.
// Exits non-zero on any mismatch, missing sidecar, or orphan sidecar.

import { stat } from "node:fs/promises";
import path from "node:path";
import {
  ROOT,
  walk,
  isSidecar,
  hashFile,
  sidecarPath,
  readManifest,
  relFromRoot,
} from "./_lib.mjs";
import { readFile } from "node:fs/promises";

async function readSidecar(p) {
  const raw = await readFile(p, "utf8");
  return JSON.parse(raw);
}

async function main() {
  const all = await walk(ROOT);
  const sources = all.filter((p) => !isSidecar(p));
  const sidecars = all.filter((p) => isSidecar(p));

  const failures = [];
  const warnings = [];
  let okCount = 0;

  // 1. Hash check + coverage
  for (const src of sources) {
    const side = sidecarPath(src);
    let meta;
    try {
      meta = await readSidecar(side);
    } catch {
      failures.push(`MISSING SIDECAR  ${relFromRoot(src)}`);
      continue;
    }
    const actual = await hashFile(src);
    if (actual.sha256 !== meta.sha256 || actual.bytes !== meta.bytes) {
      failures.push(
        `HASH MISMATCH    ${relFromRoot(src)}\n` +
          `                 expected sha=${meta.sha256} bytes=${meta.bytes}\n` +
          `                 actual   sha=${actual.sha256} bytes=${actual.bytes} (delta ${actual.bytes - meta.bytes})`
      );
      continue;
    }
    if (meta.trusted === false) {
      warnings.push(`UNTRUSTED (backfill, no original) ${relFromRoot(src)}`);
    }
    okCount++;
  }

  // 2. Orphan sidecars
  for (const side of sidecars) {
    const src = side.replace(/\.sha256$/, "");
    try {
      await stat(src);
    } catch {
      failures.push(`ORPHAN SIDECAR   ${relFromRoot(side)} (no source file)`);
    }
  }

  // 3. Manifest cross-check (informational)
  const manifest = await readManifest();
  const tracked = new Set(Object.keys(manifest.entries || {}));
  const onDisk = new Set(sources.map(relFromRoot));
  for (const k of tracked) if (!onDisk.has(k)) warnings.push(`MANIFEST GHOST   ${k}`);
  for (const k of onDisk) if (!tracked.has(k)) warnings.push(`UNTRACKED        ${k}`);

  console.log(`\nSource-document integrity report`);
  console.log(`  ok:        ${okCount}`);
  console.log(`  warnings:  ${warnings.length}`);
  console.log(`  failures:  ${failures.length}`);
  if (warnings.length) {
    console.log(`\n--- warnings ---`);
    for (const w of warnings) console.log(`  ${w}`);
  }
  if (failures.length) {
    console.log(`\n--- failures ---`);
    for (const f of failures) console.log(`  ${f}`);
    process.exit(1);
  }
  console.log(`\nAll source documents are byte-for-byte intact.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
