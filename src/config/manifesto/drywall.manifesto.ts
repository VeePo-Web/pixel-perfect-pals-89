/**
 * Drywall Masters — "Why We Love Drywall"
 *
 * The living reference example for the ManifestoConfig system.
 * Every other trade manifesto should match this quality level.
 *
 * Tone: passionate, technically specific, dry wit, brand-aligned.
 * The reader should think: "these people are absolutely unhinged about drywall
 * and I have never felt more confident hiring them."
 */

import type { ManifestoConfig } from "./manifesto.types";
import bgTrowelArc from "@/assets/drywall/bg-blur-trowel-arc.jpg";
import bgBasementProgression from "@/assets/drywall/bg-blur-basement-progression.jpg";

export const drywallManifesto: ManifestoConfig = {
  // ── Identity ──────────────────────────────────────────────────────────────
  tradeName: "Drywall",
  tradeNounLower: "drywall",
  tradeNounPlural: "walls and ceilings",
  serviceFullName: "Cochrane Drywall Masters",
  pageTitle: "Why We Love Drywall — Cochrane Drywall Masters",

  // ── Header ────────────────────────────────────────────────────────────────
  subtitle:
    "A confession from people who genuinely lie awake thinking about mud levels",

  // ── §1 Hook ───────────────────────────────────────────────────────────────
  hook: {
    casualView:
      "Most people see a wall. They see the thing between the living room and the kitchen — the surface they painted beige six years ago and have been meaning to repaint ever since.",

    obsessiveView:
      "We see the five passes of compound it took to get there. We see the angle of afternoon light that reveals a bad taper at 3pm in November. We see the seam someone ran parallel to the lighting track instead of perpendicular — a rookie error that creates a shadow ridge nobody can explain and everybody eventually notices. We see the corner bead installed slightly proud that will start cracking in eighteen months when the house settles into itself. We see whether they used all-purpose or lightweight on the final coat, and we have feelings about it.",

    giftStatement: "This is either a problem or a gift. We decided it is a gift.",

    benefitStatement: "Your walls are benefiting from this decision.",
  },

  // ── §2 Escalation ─────────────────────────────────────────────────────────
  escalation: {
    unknownKnowledgeItems: [
      "what Level 5 finish means — or why it matters on a ceiling that catches raking light",
      "whether hot mud or all-purpose compound is correct for a first coat (the answer depends on the day, the humidity, and whether you are in a hurry — and if you are in a hurry, you have already made the wrong choice)",
      "the structural implications of running butt joints mid-span on a twelve-foot ceiling",
    ],

    brandClaim:
      "We are not the average homeowner. We are the people who have stopped mid-conversation at a dinner party to compliment someone's Level 4 ceiling — and meant it as a sincere and specific observation, not a social nicety.",

    specificFact:
      "Here is an objectively true thing: there are exactly four acceptable ways to finish an inside corner, and approximately seventy percent of drywall contractors in Calgary are using method five. We do not describe method five. We will say only that it makes us feel things. We document this not to brag — or only partly to brag — but to explain why we sometimes spend eleven days on a job quoted for eight. The math makes sense once you understand the standards.",
  },

  // ── §3 Origin Story ───────────────────────────────────────────────────────
  originStory: {
    paragraph:
      "In 2019, we were finishing a basement stairwell in Cochrane. The ceiling was a compound curve — the kind most crews flatten with a skim coat and call complete. We did not call it complete. We spent three additional days on forty square feet of compound. The homeowner came down twice to check on us and left without asking why. The ceiling knows why. We know why. That has always been sufficient.",

    punchline:
      "That homeowner's child is seven years old now. In perhaps thirty years, when they own that house and need to patch a section of that stairwell ceiling, whoever does the work will find a Level 5 finish behind the damage. They will understand immediately that someone once refused to take the easy way out. We find this deeply satisfying.",
  },

  // ── §4 Why It Matters ─────────────────────────────────────────────────────
  whyItMatters:
    "When someone is this preoccupied with drywall, you do not get a wall that looks passable on move-in day and starts confessing its mistakes by year three. You get the surface underneath everything — every coat of paint your family will ever apply, every piece of art they will ever hang, every shadow that moves across the ceiling on a winter afternoon. You get that surface done correctly, once, by people who will not leave until it is right.",

  // ── §5 Close ──────────────────────────────────────────────────────────────
  close: {
    awarenessLine:
      "We are aware this is a significant amount of feeling about building materials.",

    noChangeStatement: "We do not plan to change.",

    alternativeAcknowledgment:
      "If you want someone who finishes in six days and charges less, that contractor exists and is easy to find.",

    finalLine:
      "We will still be on your stairwell ceiling for eleven days.\nCome find us when that matters.",
  },

  // ── Assets ────────────────────────────────────────────────────────────────
  heroImage: bgTrowelArc,
  atmosphericImage: bgBasementProgression,
};
