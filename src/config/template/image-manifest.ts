/**
 * IMAGE MANIFEST — Master Universal Template
 *
 * Single source of truth for every image slot in the template.
 * Consumed by scripts/regenerate-images.ts to generate per-trade image libraries
 * via the Gemini image-preview models.
 *
 * Rules:
 * - Slots marked `fixed: true` are universal brand assets — the script skips them
 *   during per-trade generation. They live at /brand/story/ and are generated once.
 * - Areas-we-serve images are NEVER included here — they are static CC-licensed photos.
 * - Alt text formulas use {SERVICE} and {COMMUNITIES_0} tokens, resolved at render time
 *   via MASTER_REMIX.SERVICE_CATEGORY and MASTER_REMIX.COMMUNITIES[0].
 *
 * Model naming follows OpenRouter slugs (the script maps these to Google AI model IDs).
 */

export type ImageRealism = "smartphone" | "dslr-kit" | "mirrorless-prime";
export type ImageLight   = "north-window" | "warm-sidelight" | "overcast" | "single-practical";
export type ImageRole    = "hero" | "card" | "background" | "macro" | "social";

export interface ImageSlot {
  /** Unique key matching the MASTER_REMIX field or manifest constant. */
  key: string;
  /** Route the image primarily lives on. */
  page: string;
  role: ImageRole;
  aspect: "1:1" | "3:2" | "2:3" | "4:3" | "16:9" | "1.91:1";
  /** Longest-edge target in pixels. */
  width: number;
  /** Hard byte cap after AVIF encode. Regenerate if exceeded. */
  maxBytes: number;
  /**
   * Output path template.
   * `{TRADE_SLUG}` is substituted at runtime from MASTER_REMIX.TRADE_SLUG.
   * Fixed brand assets use `/brand/story/` prefix instead.
   */
  outputPath: string;
  /**
   * Alt text formula — tokens resolved at render time in the component.
   * {SERVICE} → MASTER_REMIX.SERVICE_CATEGORY
   * {COMMUNITIES_0} → MASTER_REMIX.COMMUNITIES[0]
   */
  altFormula: string;
  realism: ImageRealism;
  light: ImageLight;
  /** Human-readable subject description — injected into the prompt formula. */
  subject: string;
  /** Framing/composition instruction for the prompt. */
  composition: string;
  /** Dominant material to show — trade-specific. */
  material: string;
  model: "google/gemini-3.1-flash-image-preview" | "google/gemini-3-pro-image-preview";
  /** Full prompt override — if set, bypasses the formula. */
  promptOverride?: string;
  /** Appended to the universal negative prompt. */
  negativeAdd?: string[];
  /**
   * If true, this is a universal brand asset — same across all 150 trade sites.
   * The regenerate script skips this slot during per-trade runs.
   * Generate once with: npx tsx scripts/regenerate-images.ts --brand-only
   */
  fixed?: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// UNIVERSAL NEGATIVE PROMPT — appended to every generation call verbatim.
// ─────────────────────────────────────────────────────────────────────────────
export const UNIVERSAL_NEGATIVE =
  "people, person, human, face, faces, smiling, portrait, hands and face, selfie, model, " +
  "mannequin, crowd, AI face, plastic skin, uncanny valley, stock photo, shutterstock, getty, " +
  "watermark, logo, text overlay, caption, sun flare, lens flare, rim light, ring light, " +
  "studio strobe, HDR halo, drone shot, fisheye, tilt shift, dutch tilt, oversaturated, " +
  "overexposed sky, glossy advertorial, marketing render, 3D render, CGI, cartoon, illustration, " +
  "painterly, anime, perfect cleanliness, floating tools, impossible tool placement, tool that " +
  "does not belong to the trade, fake brand names, decorative tool arrangement, family lifestyle, " +
  "handshake, thumbs up, hardhat pose, unrealistic perfect lighting, cinematic teal-and-orange grading";

// ─────────────────────────────────────────────────────────────────────────────
// PROMPT FORMULA — applied to every slot at script runtime.
// Tokens: {SUBJECT}, {COMMUNITIES_0}, {CAMERA_PROFILE}, {LIGHT_PROFILE},
//         {COMPOSITION}, {MATERIAL}, {PALETTE_ACCENT}
// ─────────────────────────────────────────────────────────────────────────────
export const PROMPT_FORMULA = `
Documentary photograph of {SUBJECT}, on a real residential jobsite in {COMMUNITIES_0}, Alberta.
{CAMERA_PROFILE}. {LIGHT_PROFILE}. Composition: {COMPOSITION}. Material: {MATERIAL}.
Mood: quiet, evidentiary, working class, restrained. Negative space approx 25 percent.
Color palette muted, warm neutrals with a single {PALETTE_ACCENT} accent.
No people, no faces. Avoid marketing polish. Slight imperfection acceptable
(a smudge, a wire just out of frame, a half-empty cup of coffee on a saw horse).
Looks like it was taken by a working tradesperson on a normal Tuesday.
`.trim();

// ─────────────────────────────────────────────────────────────────────────────
// CAMERA PROFILES (picked per slot to avoid uniform look)
// ─────────────────────────────────────────────────────────────────────────────
export const CAMERA_PROFILES: Record<ImageRealism, string> = {
  smartphone:
    "shot on iPhone 15 Pro, slight HDR clipping in highlights, mild barrel distortion, " +
    "normal smartphone color science",
  "dslr-kit":
    "shot on entry DSLR with kit zoom, very mild motion blur, autofocus slightly soft on " +
    "the background, faint chromatic aberration on edges",
  "mirrorless-prime":
    "shot on compact mirrorless with 35mm prime, sharp center, natural bokeh, slight vignetting",
};

export const LIGHT_PROFILES: Record<ImageLight, string> = {
  "north-window": "soft north-window daylight",
  "warm-sidelight": "late-afternoon warm sidelight through a doorway",
  overcast: "overcast diffuse, no direct sun",
  "single-practical": "single practical work-lamp, rest of room dim",
};

// ─────────────────────────────────────────────────────────────────────────────
// THE MANIFEST — one entry per image slot
// ─────────────────────────────────────────────────────────────────────────────
export const IMAGE_MANIFEST: ImageSlot[] = [

  // ── HOME ──────────────────────────────────────────────────────────────────

  {
    key: "HERO_HOME",
    page: "/",
    role: "hero",
    aspect: "3:2",
    width: 2400,
    maxBytes: 180_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/HERO_HOME.avif",
    altFormula: "{SERVICE} in {COMMUNITIES_0}, Alberta — finished surface, natural light",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "freshly taped and skim-coated {SERVICE} surface on an open living-room wall, " +
      "smooth Level-5 finish visible under raking sidelight, one professional tool resting on a " +
      "drop cloth in the far corner",
    composition:
      "landscape orientation, left third clear and uncluttered for headline overlay, " +
      "surface fills right two-thirds, horizon level, no Dutch tilt",
    material: "{MATERIAL_PRIMARY} — finished surface, no raw edges",
    model: "google/gemini-3-pro-image-preview",
  },

  {
    key: "PROMISE_DETAIL",
    page: "/",
    role: "macro",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROMISE_DETAIL.avif",
    altFormula: "{SERVICE} surface detail in {COMMUNITIES_0} — precision finish, cut line",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "extreme macro crop of a {SERVICE_PAST} surface — paint cut-in line at ceiling, " +
      "perfectly flat, razor-straight edge, no brush marks",
    composition:
      "square crop, subject centered, 30% negative space above the cut line, shallow DOF",
    material: "{MATERIAL_PRIMARY} — dried, finished, painted",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "MANIFESTO_BACKDROP",
    page: "/",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/MANIFESTO_BACKDROP.avif",
    altFormula: "{SERVICE} workshop context in {COMMUNITIES_0} — atmospheric, quiet",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "wide atmospheric view of a residential worksite — {SERVICE} tools laid flat on a " +
      "workhorse, afternoon light cutting through a doorway, soft dust in the air, " +
      "finished wall section visible at one edge",
    composition:
      "wide landscape, no subject in center, visual weight distributed to edges, " +
      "generous negative space for quote overlay, 3:2 aspect",
    material: "{MATERIAL_PRIMARY} — ambient, in-progress context",
    model: "google/gemini-3.1-flash-image-preview",
  },

  // ── BEFORE / AFTER PROOF (3 pairs) ────────────────────────────────────────

  {
    key: "PROOF_BEFORE_1",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_BEFORE_1.avif",
    altFormula: "Before {SERVICE} repair in {COMMUNITIES_0} — original damage state",
    realism: "smartphone",
    light: "overcast",
    subject:
      "cracked {SERVICE} surface bisecting a bedroom wall — popped nail, joint tape lifting " +
      "at corner, old damage pattern consistent with settling",
    composition:
      "wall centered, damage clearly visible and in focus, room edge visible at frame corner, " +
      "no people, natural ambient light",
    material: "{MATERIAL_PRIMARY} — damaged, unrepaired",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["clean surface", "freshly painted", "perfect wall"],
  },

  {
    key: "PROOF_AFTER_1",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_AFTER_1.avif",
    altFormula: "After {SERVICE} repair in {COMMUNITIES_0} — seamless finish, no trace of damage",
    realism: "smartphone",
    light: "overcast",
    subject:
      "same bedroom wall, seamless {SERVICE_PAST} surface, freshly painted flat white, " +
      "no trace of the original crack — identical framing to the before shot",
    composition:
      "identical framing and camera position to PROOF_BEFORE_1, wall centered, " +
      "same ambient light, room edge visible at frame corner",
    material: "{MATERIAL_PRIMARY} — finished, Level-5, freshly painted",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["visible cracks", "damage", "tape lifting"],
  },

  {
    key: "PROOF_BEFORE_2",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_BEFORE_2.avif",
    altFormula: "Before {SERVICE} in {COMMUNITIES_0} — second proof pair, problem state",
    realism: "smartphone",
    light: "single-practical",
    subject:
      "water-damaged {SERVICE} surface in a bathroom or utility room — staining, soft spot, " +
      "bubbled finish, corner bead rusted through",
    composition:
      "damage filling center frame, practical work lamp casting one-sided shadow, " +
      "realistic residential interior, no staging",
    material: "{MATERIAL_PRIMARY} — water-damaged, deteriorated",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["clean", "repaired", "fresh paint"],
  },

  {
    key: "PROOF_AFTER_2",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_AFTER_2.avif",
    altFormula: "After {SERVICE} in {COMMUNITIES_0} — second proof, fully restored",
    realism: "smartphone",
    light: "single-practical",
    subject:
      "same bathroom or utility room wall, fully replaced {SERVICE} surface, " +
      "new corner bead, smooth finish painted, identical camera position",
    composition:
      "identical framing to PROOF_BEFORE_2, same practical lamp position, " +
      "wall centered, no traces of previous damage",
    material: "{MATERIAL_PRIMARY} — new board, finished, painted",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["water stains", "damage", "old bead"],
  },

  {
    key: "PROOF_BEFORE_3",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_BEFORE_3.avif",
    altFormula: "Before {SERVICE} renovation in {COMMUNITIES_0} — third proof, new build rough",
    realism: "dslr-kit",
    light: "overcast",
    subject:
      "new-build {SERVICE} rough-in stage — boards hung, screws set, no tape yet, " +
      "open stud bays visible at one side, raw material honesty",
    composition:
      "wide shot showing scope of room, boards hung but untaped, " +
      "ambient overcast light through rough opening, no staging",
    material: "{MATERIAL_PRIMARY} — raw, hung, untaped",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["finished surface", "painted", "Level 5"],
  },

  {
    key: "PROOF_AFTER_3",
    page: "/",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PROOF_AFTER_3.avif",
    altFormula: "After {SERVICE} renovation in {COMMUNITIES_0} — completed room, ready to paint",
    realism: "dslr-kit",
    light: "overcast",
    subject:
      "same new-build room, fully {SERVICE_PAST} — all seams taped and finished to Level 5, " +
      "ready for primer, identical camera position and ambient light",
    composition:
      "identical wide framing to PROOF_BEFORE_3, same overcast light, " +
      "smooth walls visible across full room depth",
    material: "{MATERIAL_PRIMARY} — all seams finished, Level-5 ready-for-primer",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["raw board", "untaped", "open studs"],
  },

  // ── GALLERY (9 images — /gallery ImageMosaic) ─────────────────────────────

  {
    key: "GALLERY_IMAGE_1",
    page: "/gallery",
    role: "hero",
    aspect: "3:2",
    width: 1600,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_1.avif",
    altFormula: "{SERVICE} in {COMMUNITIES_0} — wide room view, completed project",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "wide view of a completed {SERVICE} living room — all walls smooth, " +
      "one accent wall in view, natural light from north window",
    composition:
      "landscape, room depth visible, 3:2 aspect, horizon level, generous ceiling negative space",
    material: "{MATERIAL_PRIMARY} — all walls finished",
    model: "google/gemini-3-pro-image-preview",
  },

  {
    key: "GALLERY_IMAGE_2",
    page: "/gallery",
    role: "macro",
    aspect: "1:1",
    width: 800,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_2.avif",
    altFormula: "{SERVICE} corner detail in {COMMUNITIES_0} — inside corner, Level-5",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "inside corner of two {SERVICE_PAST} walls — perfectly straight bead, " +
      "no shadow gap, shallow DOF pulling attention to the corner junction",
    composition:
      "square, corner centered, 1:1 aspect, corner running diagonally across frame",
    material: "{MATERIAL_PRIMARY} — inside corner, finished and painted",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_3",
    page: "/gallery",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_3.avif",
    altFormula: "{SERVICE} ceiling detail in {COMMUNITIES_0} — level surface, cut line",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "ceiling-to-wall junction, {SERVICE_PAST} and painted — razor-straight cut line, " +
      "late-afternoon warm light raking across the surface at shallow angle, " +
      "revealing absolute flatness",
    composition:
      "landscape, horizon at junction line, warm sidelight entering from left, " +
      "generous negative space in ceiling",
    material: "{MATERIAL_PRIMARY} — ceiling and wall junction, painted",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_4",
    page: "/gallery",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_4.avif",
    altFormula: "{SERVICE} whole-home project in {COMMUNITIES_0} — open plan, completed",
    realism: "smartphone",
    light: "overcast",
    subject:
      "open-plan main floor — kitchen and living room merged, all {SERVICE_PAST} walls " +
      "and ceiling, overcast light through sliding glass door, " +
      "no furniture except one ladder folded in background corner",
    composition:
      "landscape, wide 28mm equivalent field, room depth shows full scope, " +
      "horizon level, ladder in far corner establishes scale without staging",
    material: "{MATERIAL_PRIMARY} — large-format, whole-floor scope",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_5",
    page: "/gallery",
    role: "macro",
    aspect: "1:1",
    width: 800,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_5.avif",
    altFormula: "{SERVICE} material detail in {COMMUNITIES_0} — close-up, texture",
    realism: "mirrorless-prime",
    light: "single-practical",
    subject:
      "extreme close-up of {MATERIAL_PRIMARY} surface texture under single practical lamp — " +
      "grain, smooth finish quality, trowel marks gone, photographic realism",
    composition:
      "square, surface fills frame, single lamp casting 45-degree raking shadow to reveal texture",
    material: "{MATERIAL_PRIMARY} — cured, smooth, textured under raking light",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_6",
    page: "/gallery",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_6.avif",
    altFormula: "{SERVICE} stairwell project in {COMMUNITIES_0} — tall walls, finished",
    realism: "dslr-kit",
    light: "north-window",
    subject:
      "residential stairwell — two-storey wall run, fully {SERVICE_PAST}, " +
      "north-window light entering at mid-level, " +
      "stairs visible at base establishing room scale",
    composition:
      "landscape, vertical wall run filling most of frame, stair handrail anchoring lower third",
    material: "{MATERIAL_PRIMARY} — tall wall run, multi-storey",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_7",
    page: "/gallery",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_7.avif",
    altFormula: "{SERVICE} basement project in {COMMUNITIES_0} — finished suite",
    realism: "smartphone",
    light: "single-practical",
    subject:
      "finished basement suite — all walls and ceiling {SERVICE_PAST} and primed, " +
      "one practical work lamp active, egress window letting in overcast daylight",
    composition:
      "landscape, room depth visible, lamp and egress window balancing light sources",
    material: "{MATERIAL_PRIMARY} — basement suite, moisture-rated board",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_8",
    page: "/gallery",
    role: "macro",
    aspect: "1:1",
    width: 800,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_8.avif",
    altFormula: "{SERVICE} outside corner in {COMMUNITIES_0} — metal bead, sharp edge",
    realism: "mirrorless-prime",
    light: "warm-sidelight",
    subject:
      "outside corner bead on a {SERVICE_PAST} wall — crisp metal edge, " +
      "compound feathered out perfectly, warm sidelight revealing absolute straightness",
    composition:
      "square, corner bead centered vertically, warm sidelight entering from right",
    material: "{MATERIAL_PRIMARY} — metal corner bead, feathered compound",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "GALLERY_IMAGE_9",
    page: "/gallery",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 120_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/GALLERY_IMAGE_9.avif",
    altFormula: "{SERVICE} heritage renovation in {COMMUNITIES_0} — old home, new surface",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "older Cochrane home interior — one original character detail (window trim or baseboard) " +
      "adjacent to a freshly {SERVICE_PAST} wall, contrast between old wood detail and new " +
      "perfect surface, warm afternoon light through original window",
    composition:
      "landscape, heritage trim at left third, fresh wall filling right two-thirds",
    material: "{MATERIAL_PRIMARY} — new finish alongside original character details",
    model: "google/gemini-3.1-flash-image-preview",
  },

  // ── WHY WE LOVE ───────────────────────────────────────────────────────────

  {
    key: "WHY_HERO_MACRO",
    page: "/why-we-love",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/WHY_HERO_MACRO.avif",
    altFormula: "{SERVICE} surface detail in {COMMUNITIES_0} — raking light, craft evidence",
    realism: "mirrorless-prime",
    light: "warm-sidelight",
    subject:
      "extreme macro of {MATERIAL_PRIMARY} surface under raking sidelight — " +
      "every grain of the material revealed, shallow DOF, warm amber cast, " +
      "no tool in frame, pure material study",
    composition:
      "landscape, surface fills 80% of frame, raking light entering from left at 10-degree angle, " +
      "no identifiable room context, generous blur at edges",
    material: "{MATERIAL_PRIMARY} — cured surface, raking light reveals texture",
    model: "google/gemini-3-pro-image-preview",
    negativeAdd: ["room context", "furniture", "identifiable location"],
  },

  {
    key: "WHY_PROOF_1",
    page: "/why-we-love",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/WHY_PROOF_1.avif",
    altFormula: "{SERVICE} method detail in {COMMUNITIES_0} — material application",
    realism: "smartphone",
    light: "north-window",
    subject:
      "in-progress {SERVICE} work — fresh compound applied to a seam, " +
      "feathered edges visible, hawk and mud pan on the floor beside the wall, " +
      "no person, tool resting on drop cloth",
    composition:
      "landscape, wall seam centered, tool on floor at bottom of frame establishing context",
    material: "{MATERIAL_PRIMARY} — wet compound, in-progress",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["finished surface", "painted", "Level 5 final"],
  },

  {
    key: "WHY_PROOF_2",
    page: "/why-we-love",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/WHY_PROOF_2.avif",
    altFormula: "{SERVICE} method detail in {COMMUNITIES_0} — sanded seam, final coat",
    realism: "dslr-kit",
    light: "single-practical",
    subject:
      "freshly sanded {SERVICE} seam — compound dust settling on drop cloth, " +
      "sanding sponge resting flat on the cloth, practical work lamp showing seam flatness, " +
      "seam barely visible in the finished surface",
    composition:
      "landscape, seam runs horizontally at midframe, sanding sponge anchoring lower left, " +
      "practical lamp at frame edge creating controlled shadow",
    material: "{MATERIAL_PRIMARY} — sanded, compound dust, near-finish state",
    model: "google/gemini-3.1-flash-image-preview",
  },

  // ── BRAND STORY (FIXED — same across all 150 trade sites) ─────────────────

  {
    key: "BRAND_STORY_HERO",
    page: "/brand-story",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/brand/story/brand-story-hero.avif",
    altFormula: "Cochrane Master Builders craftwork — generational tradition, archival detail",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "archival-style wide view of an older residential worksite — worn wooden workhorse, " +
      "hand tools laid in working order, afternoon light through a doorway, " +
      "quality tools showing decades of honest use",
    composition:
      "landscape, tools filling lower half, doorway light entering from right, " +
      "generous upper negative space for quote overlay",
    material: "hand tools — worn, honest, generation-used",
    model: "google/gemini-3-pro-image-preview",
    fixed: true,
    negativeAdd: ["power tools", "cordless drill", "modern equipment", "branded packaging"],
  },

  {
    key: "STORY_IMAGE_1",
    page: "/brand-story",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/brand/story/story-1.avif",
    altFormula: "Master Builders craft detail — generational workmanship, chapter one",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "close-up of a well-worn hand tool — plane, hawk, or trowel — laid flat on a workbench, " +
      "tool showing years of honest use, warm sidelight, wood grain of the bench visible",
    composition:
      "square, tool centered diagonally, warm sidelight from upper right, " +
      "bench grain texture visible at edges",
    material: "worn hand tool — patina, honest wear, no replacement",
    model: "google/gemini-3.1-flash-image-preview",
    fixed: true,
  },

  {
    key: "STORY_IMAGE_2",
    page: "/brand-story",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/brand/story/story-2.avif",
    altFormula: "Master Builders craft detail — generational workmanship, chapter two",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "architectural drawing or project notebook opened to a hand-drawn floor plan — " +
      "pencil lines, measurements in neat handwriting, " +
      "ruler and pencil resting beside the book, north-window light",
    composition:
      "square, notebook centered, tools framing at edges, north-window light even and soft",
    material: "paper, pencil marks, architectural notation",
    model: "google/gemini-3.1-flash-image-preview",
    fixed: true,
    negativeAdd: ["digital screen", "laptop", "tablet", "printed blueprint"],
  },

  {
    key: "STORY_IMAGE_3",
    page: "/brand-story",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/brand/story/story-3.avif",
    altFormula: "Master Builders craft detail — generational workmanship, chapter three",
    realism: "mirrorless-prime",
    light: "warm-sidelight",
    subject:
      "stack of worn project files or receipt books on a wooden desk — " +
      "handwritten labels, edges worn, a stamp or seal partially visible on the top file, " +
      "warm afternoon light through a small window",
    composition:
      "square, files occupying center-left, window light from right, " +
      "desk surface visible at bottom edge as grounding element",
    material: "paper records, handwritten, aged — archival",
    model: "google/gemini-3.1-flash-image-preview",
    fixed: true,
    negativeAdd: ["computer", "modern office", "printer", "stapler"],
  },

  {
    key: "STORY_IMAGE_4",
    page: "/brand-story",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/brand/story/story-4.avif",
    altFormula: "Master Builders craft detail — generational workmanship, values chapter",
    realism: "dslr-kit",
    light: "single-practical",
    subject:
      "a quality level resting against a perfectly plumb wall — " +
      "bubble centered, tool body casting a soft shadow under practical lamp, " +
      "wall surface smooth and flat behind it",
    composition:
      "square, level placed vertically, bubble at optical center, " +
      "practical lamp shadow creating depth from left",
    material: "precision instrument, plumb level — honest use",
    model: "google/gemini-3.1-flash-image-preview",
    fixed: true,
  },

  // ── ABOUT ─────────────────────────────────────────────────────────────────

  {
    key: "FOUNDER_IMAGE",
    page: "/about",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/FOUNDER_IMAGE.avif",
    altFormula: "{SERVICE} craftsman at work in {COMMUNITIES_0} — gloved hand, material detail",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "a single gloved forearm reaching into frame from the left, " +
      "trowel or hawk applying fresh compound to a wall — " +
      "tool grip confident, elbow-to-wrist only visible, no face, no shoulder, " +
      "wall surface at focus, fresh material catching north-window light",
    composition:
      "landscape, forearm entering from left third, wall surface at right, " +
      "tool at focus point, generous depth of field fade into wall background",
    material: "{MATERIAL_PRIMARY} — fresh application, single working hand",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["portrait", "face", "torso", "full person", "two hands", "shoulder"],
  },

  {
    key: "TEAM_DETAIL_1",
    page: "/about",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/TEAM_DETAIL_1.avif",
    altFormula: "{SERVICE} tool kit in {COMMUNITIES_0} — professional grade, working order",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "professional {SERVICE} tool roll laid open on a clean work surface — " +
      "knives, corner tools, and tape accessories in order, " +
      "tools showing honest use without damage, no branding visible",
    composition:
      "square, tool roll centered, tools arranged in working order not decorative order, " +
      "soft north-window light even across",
    material: "professional {SERVICE} hand tools — laid flat, used",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "TEAM_DETAIL_2",
    page: "/about",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/TEAM_DETAIL_2.avif",
    altFormula: "{SERVICE} truck kit in {COMMUNITIES_0} — loaded, ready for job",
    realism: "smartphone",
    light: "overcast",
    subject:
      "cargo area of a work van or truck, {SERVICE} materials neatly loaded — " +
      "boards or rolls, tool boxes secured, overcast morning light, " +
      "cargo floor visible, no faces visible through windshield",
    composition:
      "square, cargo opening centered, materials organized by type, " +
      "overcast diffuse light, depth into cargo space",
    material: "{MATERIAL_PRIMARY} — loaded, staged for transport",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["branding", "logo on truck", "license plate", "person in cab"],
  },

  {
    key: "TEAM_DETAIL_3",
    page: "/about",
    role: "card",
    aspect: "1:1",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/TEAM_DETAIL_3.avif",
    altFormula: "{SERVICE} jobsite kit in {COMMUNITIES_0} — bucket, drop cloth, tools",
    realism: "dslr-kit",
    light: "warm-sidelight",
    subject:
      "jobsite corner setup — 5-gallon bucket with compound, drop cloth folded over " +
      "a sawhorse, hand tools resting on the cloth, afternoon light, " +
      "fresh wall section visible behind the setup",
    composition:
      "square, bucket and sawhorse at center, tools at rest not staged, " +
      "wall surface at 30% depth behind establishing context",
    material: "{MATERIAL_PRIMARY} — in-progress setup, bucket and tools",
    model: "google/gemini-3.1-flash-image-preview",
  },

  // ── REVIEWS ───────────────────────────────────────────────────────────────

  {
    key: "REVIEWS_HERO",
    page: "/reviews",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/REVIEWS_HERO.avif",
    altFormula: "Completed {SERVICE} project in {COMMUNITIES_0} — quiet room, ready to live in",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "quiet finished room, all walls and ceiling {SERVICE_PAST}, " +
      "north-window light across the room, one plant at the window as the only living element, " +
      "room completely empty of furniture, surfaces reading perfectly flat",
    composition:
      "landscape, room depth from corner, window in background-right, " +
      "plant silhouette grounding the window, generous negative space for quote overlay",
    material: "{MATERIAL_PRIMARY} — all surfaces finished, painted, ready",
    model: "google/gemini-3-pro-image-preview",
    negativeAdd: ["furniture", "staged room", "rugs", "art on walls", "lifestyle"],
  },

  // ── SERVICES ──────────────────────────────────────────────────────────────

  {
    key: "SERVICES_HERO",
    page: "/services",
    role: "hero",
    aspect: "3:2",
    width: 2400,
    maxBytes: 180_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/SERVICES_HERO.avif",
    altFormula: "{SERVICE} services in {COMMUNITIES_0}, Alberta — full scope, residential",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "wide room showing multiple {SERVICE} surfaces — walls, ceiling, corner junction — " +
      "all completed to same standard, north-window light revealing surface quality, " +
      "no furniture, room represents full scope capability",
    composition:
      "landscape, room fills frame, ceiling-to-floor visible, " +
      "all three planes showing — walls, ceiling, corner",
    material: "{MATERIAL_PRIMARY} — full room, all surfaces",
    model: "google/gemini-3-pro-image-preview",
  },

  {
    key: "SERVICE_DETAIL_HERO",
    page: "/services/:slug",
    role: "hero",
    aspect: "3:2",
    width: 2400,
    maxBytes: 180_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/SERVICE_DETAIL_HERO_{SLUG}.avif",
    altFormula: "{SUB_SERVICE_TITLE} in {COMMUNITIES_0}, Alberta — specific scope, trade detail",
    realism: "mirrorless-prime",
    light: "warm-sidelight",
    subject:
      "close-context view specific to the sub-service — " +
      "the dominant material for this scope, " +
      "warm sidelight revealing surface precision, one tool at rest establishing trade context",
    composition:
      "landscape, surface fills right two-thirds, left third clear for hero overlay, " +
      "warm light from left edge, material at critical focus point",
    material: "{MATERIAL_SUBSURFACE} — specific to this sub-service scope",
    model: "google/gemini-3-pro-image-preview",
    negativeAdd: ["generic construction", "unrelated trade tools"],
  },

  {
    key: "SERVICE_DETAIL_PROOF_1",
    page: "/services/:slug",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/SERVICE_DETAIL_PROOF_{SLUG}_1.avif",
    altFormula: "{SUB_SERVICE_TITLE} method detail in {COMMUNITIES_0} — in progress",
    realism: "smartphone",
    light: "north-window",
    subject:
      "in-progress view of the sub-service scope — material being applied or set, " +
      "tool at work position but no person, fresh material catching soft daylight",
    composition:
      "landscape, work surface centered, tool establishing process context",
    material: "{MATERIAL_SUBSURFACE} — in-progress, being applied",
    model: "google/gemini-3.1-flash-image-preview",
  },

  {
    key: "SERVICE_DETAIL_PROOF_2",
    page: "/services/:slug",
    role: "card",
    aspect: "3:2",
    width: 1200,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/SERVICE_DETAIL_PROOF_{SLUG}_2.avif",
    altFormula: "{SUB_SERVICE_TITLE} completed in {COMMUNITIES_0} — finished result",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "completed sub-service scope — finished material, final quality state, " +
      "north-window light revealing precision of finish",
    composition:
      "landscape, finished surface fills frame, light raking to show flatness",
    material: "{MATERIAL_SUBSURFACE} — finished, inspected, signed off",
    model: "google/gemini-3.1-flash-image-preview",
  },

  // ── PRICING ───────────────────────────────────────────────────────────────

  {
    key: "PRICING_HERO",
    page: "/pricing",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/PRICING_HERO.avif",
    altFormula: "{SERVICE} quote documentation in {COMMUNITIES_0} — honest, written",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "a project quote pad or clipboard with a handwritten scope estimate, " +
      "tape measure resting beside it, pencil laid across the pad, " +
      "north-window light even and soft, no pricing numbers legible",
    composition:
      "landscape, clipboard center-left, tape measure at right, " +
      "pencil diagonal across pad, numbers intentionally out of focus or angle-obscured",
    material: "paper, pencil, tape measure — documentation tools",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["laptop", "calculator", "digital device", "money", "coins", "cash"],
  },

  // ── CONTACT ───────────────────────────────────────────────────────────────

  {
    key: "CONTACT_MAP",
    page: "/contact",
    role: "card",
    aspect: "4:3",
    width: 800,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/CONTACT_MAP.avif",
    altFormula: "{SERVICE} service area map — {COMMUNITIES_0} and surrounding Alberta communities",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "hand-drawn stylized map of {COMMUNITIES_0} and surrounding area — " +
      "paper texture background, ink lines, community names in neat handwriting, " +
      "compass rose in corner, no satellite imagery, no digital look",
    composition:
      "4:3, map fills frame, generous margin, compass at lower-right corner",
    material: "paper, ink, hand-drawn cartographic style",
    model: "google/gemini-3.1-flash-image-preview",
    promptOverride:
      "Hand-drawn ink map on aged paper of {COMMUNITIES_0} and surrounding Alberta communities — " +
      "cartographic style, compass rose lower right, community names in neat handwriting, " +
      "rivers and roads as simple lines, warm paper texture, no satellite imagery, " +
      "no digital rendering, no people, no logos, looks like a site planner's working sketch.",
    negativeAdd: ["satellite imagery", "Google Maps style", "digital interface", "GPS", "digital font"],
  },

  // ── 404 ───────────────────────────────────────────────────────────────────

  {
    key: "NOT_FOUND_BACKDROP",
    page: "/*",
    role: "background",
    aspect: "3:2",
    width: 1600,
    maxBytes: 80_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/NOT_FOUND_BACKDROP.avif",
    altFormula: "{SERVICE} workshop context in {COMMUNITIES_0} — quiet wall, copper tone",
    realism: "dslr-kit",
    light: "single-practical",
    subject:
      "quiet workshop wall — bare studs partially sheeted, " +
      "practical lamp casting warm copper-toned light, " +
      "tools stored at rest on a ledger shelf, " +
      "one drop cloth folded on a sawhorse at the edge of frame",
    composition:
      "landscape, wall occupies most of frame, lamp at left casting directional light, " +
      "generous blank wall space at center for text overlay, copper-warm palette",
    material: "{MATERIAL_PRIMARY} — raw/mid-install, workshop context",
    model: "google/gemini-3.1-flash-image-preview",
    negativeAdd: ["finished room", "painted walls", "decorated space"],
  },

  // ── SOCIAL / OG ───────────────────────────────────────────────────────────

  {
    key: "OG_SHARE_IMAGE",
    page: "meta",
    role: "social",
    aspect: "1.91:1",
    width: 1200,
    maxBytes: 180_000,
    outputPath: "public/remix/{TRADE_SLUG}/images/OG_SHARE_IMAGE.avif",
    altFormula: "{SERVICE} by Cochrane Master Builders in {COMMUNITIES_0}, Alberta",
    realism: "mirrorless-prime",
    light: "north-window",
    subject:
      "brand wordmark area over a {SERVICE} macro surface — " +
      "navy or dark overlay with the service surface visible beneath at 30% opacity, " +
      "1200×630px, generous negative space at left half for logotype placement",
    composition:
      "landscape 1.91:1, left half blank dark overlay, right half shows service surface texture, " +
      "no text, no logo in image — overlay handled by meta tag, surface only",
    material: "{MATERIAL_PRIMARY} — macro under dark overlay",
    model: "google/gemini-3-pro-image-preview",
    promptOverride:
      "Documentary macro photograph of {MATERIAL_PRIMARY} surface, " +
      "navy-dark color grading applied, left half of frame intentionally darker for brand overlay, " +
      "right half shows material texture at 30% exposure, 1200×630px format, " +
      "no people, no text, no logo, no watermark — pure material under color grade.",
    negativeAdd: ["text in image", "logo", "watermark", "bright image", "white background"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SLOT MAP — quick lookup for component-level references
// ─────────────────────────────────────────────────────────────────────────────
export const SLOT_MAP = Object.fromEntries(
  IMAGE_MANIFEST.map((slot) => [slot.key, slot])
) as Record<string, ImageSlot>;

/**
 * Returns all non-fixed slots — the per-trade generation set.
 * Pass --brand-only to generate fixed slots only.
 */
export const TRADE_SLOTS = IMAGE_MANIFEST.filter((s) => !s.fixed);

/** Universal brand story slots — generated once, shared across all 150 trade sites. */
export const BRAND_STORY_SLOTS = IMAGE_MANIFEST.filter((s) => s.fixed);

export default IMAGE_MANIFEST;
