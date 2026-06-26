/**
 * ManifestoConfig — the typed contract every VeePo sub-brand fills in
 * to generate their "Why We Love [X]" trade manifesto page.
 *
 * Usage:
 *   1. Create src/config/manifesto/[trade].manifesto.ts
 *   2. Export a const satisfying ManifestoConfig
 *   3. Pass to <TradeManifesto config={yourConfig} />
 *
 * See drywall.manifesto.ts for a complete filled example.
 */

export interface ManifestoHook {
  /** 1–2 sentences: what a normal person sees when they look at this trade's material. */
  casualView: string;
  /** 3–5 specific technical details the obsessed craftsman actually sees. One paragraph. */
  obsessiveView: string;
  /** The pivot: "This is a problem or a gift. We chose gift." */
  giftStatement: string;
  /** The customer benefit closer: "Your [X] is benefiting from this decision." */
  benefitStatement: string;
}

export interface ManifestoEscalation {
  /**
   * Exactly 3 items. Each is something the average homeowner will never think about.
   * Written as a noun phrase or clause (not a full sentence — the component wraps them).
   * Example: "what Level 5 finish means — or why it matters on a raking-light ceiling"
   */
  unknownKnowledgeItems: [string, string, string];
  /**
   * The "We are not the average homeowner" paragraph.
   * Should include one specifically funny/specific detail about how obsessed they are.
   */
  brandClaim: string;
  /**
   * THE FUNNY MOMENT. One paragraph that reveals the depth of the obsession.
   * Rendered in a distinct dark callout box labelled "THE HONEST TRUTH".
   * Should make the reader laugh and simultaneously trust the brand completely.
   */
  specificFact: string;
}

export interface ManifestoOriginStory {
  /**
   * A specific story: a specific job, a specific year, a specific detail.
   * Should be true (or archetypally true). Should reveal the obsession in action.
   * One paragraph, 3–5 sentences.
   */
  paragraph: string;
  /**
   * The generational punchline. Shows the long-term thinking.
   * Usually involves a child, a future owner, or a future craftsman.
   */
  punchline: string;
}

export interface ManifestoClose {
  /** "We are aware this is a significant amount of feeling about [tradeNounPlural]." */
  awarenessLine: string;
  /** "We do not plan to change." — or a variant. Keep it short. */
  noChangeStatement: string;
  /**
   * Acknowledge the faster/cheaper alternative exists.
   * Shows confidence, not fear. One sentence.
   */
  alternativeAcknowledgment: string;
  /**
   * THE KICKER. The final line of the entire page.
   * Use "\n" to force a line break if you want the two-line punchline effect.
   * This is the line people screenshot and share. Make it worth that.
   * Examples:
   *   "We will still be on your stairwell ceiling for eleven days.\nCome find us when that matters."
   *   "The grout will be perfect.\nOr we will be back until it is."
   */
  finalLine: string;
}

export interface ManifestoConfig {
  // ── Identity ───────────────────────────────────────────────────────────────
  /** "Drywall" — Title Case, used standalone in the H1 */
  tradeName: string;
  /** "drywall" — lowercase, for mid-sentence use in body copy */
  tradeNounLower: string;
  /** "walls and ceilings" — what the trade produces, plural, for the close */
  tradeNounPlural: string;
  /** "Cochrane Drywall Masters" — full brand name with location */
  serviceFullName: string;
  /** Value for document.title */
  pageTitle: string;

  // ── Header ─────────────────────────────────────────────────────────────────
  /**
   * The subtitle / eyebrow line. Sets the tone before anyone reads a word of copy.
   * Should be dry, self-aware, slightly funny.
   * Example: "A confession from people who genuinely lie awake thinking about mud levels"
   */
  subtitle: string;

  // ── Content sections ───────────────────────────────────────────────────────
  hook: ManifestoHook;
  escalation: ManifestoEscalation;
  originStory: ManifestoOriginStory;

  /**
   * §4 — The customer benefit paragraph.
   * Pivots from "here is our obsession" to "here is what you get because of it."
   * One strong paragraph. No bullet points. Pure Cormorant Garamond weight.
   */
  whyItMatters: string;

  close: ManifestoClose;

  // ── Assets ─────────────────────────────────────────────────────────────────
  /** Import path for the full-bleed hero background image. */
  heroImage: string;
  /** Optional: second atmospheric image for the origin story section. */
  atmosphericImage?: string;
}
