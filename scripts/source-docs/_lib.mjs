// Shared helpers for source-document integrity tooling.
// Pure Node, no deps. Binary-safe (Buffer-only).

import { createHash } from "node:crypto";
import { readFile, writeFile, stat, readdir, mkdir } from "node:fs/promises";
import path from "node:path";

export const ROOT = path.resolve(
  process.cwd(),
  "src/master/knowledge/source-documents"
);
export const INTEGRITY_DIR = path.join(ROOT, ".integrity");
export const MANIFEST_PATH = path.join(INTEGRITY_DIR, "manifest.json");

export function sidecarPath(filePath) {
  return `${filePath}.sha256`;
}

export function isSidecar(p) {
  return p.endsWith(".sha256");
}

export function isIntegrityPath(p) {
  return p.includes(`${path.sep}.integrity${path.sep}`) || p.endsWith(".gitkeep");
}

export async function hashBuffer(buf) {
  return createHash("sha256").update(buf).digest("hex");
}

export async function hashFile(filePath) {
  const buf = await readFile(filePath); // Buffer, no encoding -> binary-safe
  // Count newlines on raw bytes (0x0A) to stay text-format agnostic.
  let lines = 0;
  for (let i = 0; i < buf.length; i++) if (buf[i] === 0x0a) lines++;
  return {
    sha256: createHash("sha256").update(buf).digest("hex"),
    bytes: buf.length,
    lines,
  };
}

export async function walk(dir) {
  const out = [];
  const entries = await readdir(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === ".integrity") continue;
      out.push(...(await walk(full)));
    } else {
      out.push(full);
    }
  }
  return out;
}

export async function readManifest() {
  try {
    const raw = await readFile(MANIFEST_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { version: 1, entries: {} };
  }
}

export async function writeManifest(m) {
  await mkdir(INTEGRITY_DIR, { recursive: true });
  await writeFile(MANIFEST_PATH, JSON.stringify(m, null, 2) + "\n");
}

export function relFromRoot(p) {
  return path.relative(ROOT, p).split(path.sep).join("/");
}
