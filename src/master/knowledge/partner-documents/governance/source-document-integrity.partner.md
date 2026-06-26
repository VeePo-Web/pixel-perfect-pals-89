---
title: Source-Document Integrity Gate
type: governance
status: active
owner: Auditor Persona
---

# Source-Document Integrity Gate

Every file under `src/master/knowledge/source-documents/` MUST be a **byte-for-byte verbatim copy** of the original pasted, uploaded, or supplied text. No cleanup. No rewrapping. No smart-quote conversion. No silent truncation.

This gate enforces that rule via SHA-256 sidecars and a validator that runs as part of the standard knowledge-base audit.

## How it works

For every source file `foo.source.md`, a sibling `foo.source.md.sha256` JSON sidecar records:

```json
{
  "sha256": "...",
  "bytes": 12345,
  "lines": 678,
  "capturedAt": "2026-05-10T...",
  "sourceName": "original-filename-or-stdin",
  "trusted": true
}
```

A central manifest at `source-documents/.integrity/manifest.json` mirrors every entry for fast bulk audit.

## Adding a new source document — the ONLY supported path

```bash
# From a file
node scripts/source-docs/capture-source.mjs \
  src/master/knowledge/source-documents/<area>/<name>.source.md \
  /path/to/original-paste.md

# From a paste (stdin) — wrap the heredoc so bytes are preserved exactly
node scripts/source-docs/capture-source.mjs \
  src/master/knowledge/source-documents/<area>/<name>.source.md \
  --stdin --source-name="2026-05-10 paste from user" <<'PASTE_EOF'
...exact pasted content...
PASTE_EOF
```

Do **not** create or edit `.source.md` files in the editor. The editor may normalize newlines, strip BOMs, or recode characters — exactly what this gate is designed to catch.

## Verifying

```bash
npm run verify:sources
```

Exit code is non-zero on any of:

- **HASH MISMATCH** — file bytes differ from sidecar.
- **MISSING SIDECAR** — a source file has no sidecar.
- **ORPHAN SIDECAR** — a sidecar points to a missing file.

Warnings (non-blocking):

- **UNTRUSTED** — file was sidecar'd via the one-time backfill, not via `capture-source.mjs`. Re-capture from the true original to upgrade it to trusted.
- **UNTRACKED / MANIFEST GHOST** — manifest is out of sync with disk; re-run a capture or backfill.

## On mismatch

1. Do **not** auto-fix the file to make the hash pass.
2. Locate the original paste/upload.
3. Re-run `capture-source.mjs ... --force` with the true original.
4. Re-run `npm run verify:sources` until clean.

## Scope

- Applies to `source-documents/` only.
- `partner-documents/` are intentionally edited interpretations and are NOT covered by this gate.
- Binary files (PDFs, images) are hashed the same way; no parsing.

## Auditor checklist (paste-ready)

```bash
npm run verify:sources                                    # check #0 — must pass
rg -n "TODO|FIXME" src/master/knowledge/source-documents  # no in-file edits
git diff --stat src/master/knowledge/source-documents     # only sidecar + capture changes expected
```
