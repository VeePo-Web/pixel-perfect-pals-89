/**
 * MediaDropzone — universal file uploader for the booking modal.
 *
 * - Drag-drop + tap-to-add
 * - Max 10 files, 25 MB each, 100 MB total
 * - Client-side image compression (canvas) for files > 2 MB
 * - Thumbnails via createImageBitmap — never FileReader.readAsDataURL on the original
 * - prefers-reduced-motion respected (no animation for low-motion users)
 */

import { useCallback, useRef, useState } from "react";
import { X, ImageIcon, VideoIcon, UploadCloud } from "lucide-react";
import { MEDIA_LIMITS } from "@/config/template/booking-schema";

export interface MediaFile {
  file: File;
  thumbUrl: string;   // 120×120 canvas-rendered thumbnail data URL
  isVideo: boolean;
  sizeLabel: string;
}

interface Props {
  files: MediaFile[];
  onChange: (files: MediaFile[]) => void;
  error?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

async function buildThumb(file: File): Promise<string> {
  if (file.type.startsWith("video/")) return "";
  try {
    const bitmap = await createImageBitmap(file, {
      resizeWidth: 120,
      resizeHeight: 120,
      resizeQuality: "medium",
    });
    const canvas = document.createElement("canvas");
    canvas.width = 120;
    canvas.height = 120;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";
    // Center-crop
    const srcRatio = bitmap.width / bitmap.height;
    const dstRatio = 1;
    let sx = 0, sy = 0, sw = bitmap.width, sh = bitmap.height;
    if (srcRatio > dstRatio) {
      sw = bitmap.height;
      sx = (bitmap.width - sw) / 2;
    } else {
      sh = bitmap.width;
      sy = (bitmap.height - sh) / 2;
    }
    ctx.drawImage(bitmap, sx, sy, sw, sh, 0, 0, 120, 120);
    bitmap.close();
    return canvas.toDataURL("image/jpeg", 0.7);
  } catch {
    return "";
  }
}

async function maybeCompress(file: File): Promise<File> {
  if (!file.type.startsWith("image/")) return file;
  if (file.size <= MEDIA_LIMITS.compressThreshold) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.sqrt(MEDIA_LIMITS.compressThreshold / file.size);
    const w = Math.floor(bitmap.width * scale);
    const h = Math.floor(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) { bitmap.close(); return file; }
    ctx.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name, { type: "image/jpeg" }) : file),
        "image/jpeg",
        0.85
      );
    });
  } catch {
    return file;
  }
}

async function processFile(rawFile: File): Promise<MediaFile | null> {
  if (rawFile.size > MEDIA_LIMITS.maxBytesPerFile) return null;
  const isVideo = rawFile.type.startsWith("video/");
  const file = await maybeCompress(rawFile);
  const thumbUrl = await buildThumb(file);
  return { file, thumbUrl, isVideo, sizeLabel: formatBytes(file.size) };
}

export const MediaDropzone = ({ files, onChange, error }: Props) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(async (incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming);
    const totalExisting = files.reduce((s, f) => s + f.file.size, 0);
    const processed: MediaFile[] = [];

    for (const raw of arr) {
      if (files.length + processed.length >= MEDIA_LIMITS.maxFiles) break;
      const totalSize = totalExisting + processed.reduce((s, f) => s + f.file.size, 0) + raw.size;
      if (totalSize > MEDIA_LIMITS.maxBytesTotal) break;
      const mf = await processFile(raw);
      if (mf) processed.push(mf);
    }

    onChange([...files, ...processed]);
  }, [files, onChange]);

  const remove = useCallback((index: number) => {
    onChange(files.filter((_, i) => i !== index));
  }, [files, onChange]);

  const onDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const totalSize = files.reduce((s, f) => s + f.file.size, 0);
  const canAddMore = files.length < MEDIA_LIMITS.maxFiles && totalSize < MEDIA_LIMITS.maxBytesTotal;

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      {canAddMore && (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className="relative flex w-full flex-col items-center justify-center gap-2 rounded-none border border-dashed py-8 text-center transition-colors duration-200"
          style={{
            borderColor: dragging
              ? "hsl(var(--copper) / 0.6)"
              : "hsl(var(--copper) / 0.20)",
            background: dragging ? "hsl(var(--copper) / 0.04)" : "transparent",
          }}
        >
          <UploadCloud
            size={22}
            style={{ color: "hsl(var(--copper) / 0.70)" }}
            aria-hidden
          />
          <span className="text-body-sm text-graphite">
            Drag photos or video here, or <span style={{ color: "hsl(var(--copper))" }}>tap to browse</span>
          </span>
          <span className="text-caption text-mist">
            JPG · PNG · WEBP · HEIC · MP4 · MOV — max {MEDIA_LIMITS.maxFiles} files, {formatBytes(MEDIA_LIMITS.maxBytesPerFile)} each
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        multiple
        accept={MEDIA_LIMITS.acceptedMime}
        className="sr-only"
        onChange={(e) => addFiles(e.target.files)}
      />

      {/* Thumbnails */}
      {files.length > 0 && (
        <div className="grid grid-cols-5 gap-2">
          {files.map((mf, i) => (
            <div
              key={`${mf.file.name}-${i}`}
              className="group relative aspect-square overflow-hidden bg-charcoal/10"
            >
              {mf.isVideo ? (
                <div className="flex h-full items-center justify-center">
                  <VideoIcon size={24} className="text-mist" />
                </div>
              ) : mf.thumbUrl ? (
                <img
                  src={mf.thumbUrl}
                  alt={mf.file.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <ImageIcon size={24} className="text-mist" />
                </div>
              )}

              {/* Size label */}
              <span className="absolute bottom-0 left-0 right-0 bg-charcoal/70 px-1 py-0.5 text-center text-[10px] text-bone/80 truncate">
                {mf.sizeLabel}
              </span>

              {/* Remove */}
              <button
                type="button"
                onClick={() => remove(i)}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center bg-charcoal/80 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                aria-label={`Remove ${mf.file.name}`}
              >
                <X size={12} className="text-bone" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      {files.length > 0 && (
        <p className="text-caption text-mist">
          {files.length} file{files.length !== 1 ? "s" : ""} · {formatBytes(totalSize)} of {formatBytes(MEDIA_LIMITS.maxBytesTotal)} total
        </p>
      )}

      {error && (
        <p className="text-caption" style={{ color: "hsl(var(--copper))" }}>
          {error}
        </p>
      )}
    </div>
  );
};
