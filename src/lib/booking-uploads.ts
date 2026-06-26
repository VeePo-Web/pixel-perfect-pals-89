/**
 * Upload booking media (photos / short videos) to the public
 * `booking-media` storage bucket and return the public URLs.
 *
 * Files are grouped under a per-submission UUID prefix so each request
 * has a clean, browsable folder when the team checks the dashboard.
 */

import { supabase } from "@/integrations/supabase/client";

export interface UploadResult {
  urls: string[];
  errors: string[];
}

const BUCKET = "booking-media";

/** Strip diacritics + spaces so the filename survives URL encoding cleanly. */
function safeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

export async function uploadBookingMedia(files: File[]): Promise<UploadResult> {
  if (!files.length) return { urls: [], errors: [] };

  const submissionId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2)}`;

  const urls: string[] = [];
  const errors: string[] = [];

  await Promise.all(
    files.map(async (file, i) => {
      const path = `${submissionId}/${String(i + 1).padStart(2, "0")}-${safeName(file.name)}`;
      const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
        cacheControl: "3600",
        upsert: false,
        contentType: file.type || undefined,
      });
      if (error) {
        console.error("Upload failed", file.name, error);
        errors.push(file.name);
        return;
      }
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
      if (data?.publicUrl) urls.push(data.publicUrl);
    }),
  );

  return { urls, errors };
}
