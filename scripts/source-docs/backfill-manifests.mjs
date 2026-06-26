#!/usr/bin/env node
// One-time: write a SHA-256 sidecar for every existing source document that lacks one.
// Sidecars created here are marked trusted=false so future drifts are still caught,
// but a human reviewer knows the baseline was not captured via capture-source.mjs.

import { writeFile, stat } from "node:fs/promises";
import {
  ROOT,
  walk,
  isSidecar,
  hashFile,
  sidecarPath,
  readManifest,
  writeManifest,
  relFromRoot,
} from "./_lib.mjs";

async function main() {
  const all = await walk(ROOT);
  const sources = all.filter((p) => !isSidecar(p));
  const manifest = await readManifest();
  let created = 0;
  let existing = 0;

  for (const src of sources) {
    const side = sidecarPath(src);
    try {
      await stat(side);
      existing++;
      continue;
    } catch {
      /* missing - create it */
    }
    const h = await hashFile(src);
    const sidecar = {
      sha256: h.sha256,
      bytes: h.bytes,
      lines: h.lines,
      capturedAt: "backfill",
      sourceName: null,
      trusted: false,
    };
    await writeFile(side, JSON.stringify(sidecar, null, 2) + "\n");
    manifest.entries[relFromRoot(src)] = sidecar;
    created++;
    console.log(`backfilled ${relFromRoot(src)}  sha=${h.sha256.slice(0, 12)}  bytes=${h.bytes}`);
  }

  await writeManifest(manifest);
  console.log(`\nbackfill complete. created=${created} existing=${existing} total=${sources.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
