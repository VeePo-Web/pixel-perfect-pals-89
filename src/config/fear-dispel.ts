/**
 * COCHRANE DRYWALL & INSULATION — Fear-Dispelling Sentences (canonical)
 *
 * SOURCE OF TRUTH — verbatim from `Copy_of_2.1_Cochrane_Drywall_Insulation_--_wireframe.docx`.
 * Specific sentences keyed to specific anxieties on specific pages.
 * Render via the <FearDispelSection /> component on each service page.
 *
 * USAGE:
 *   import { FEAR_DISPEL } from "@/config/fear-dispel";
 *   FEAR_DISPEL.drywallRepair.map(group => ...)
 *
 * IMPORTANT: These sentences are written to specifically dissolve homeowner
 * anxiety. Do not paraphrase. Do not "improve." They have already been workshopped.
 */

interface FearGroup {
  fear: string;
  sentences: string[];
}

export const FEAR_DISPEL = {
  drywallRepair: [
    {
      fear: "Is my job too small?",
      sentences: [
        "Small drywall repairs are welcome.",
        "You do not need a major renovation to get this handled properly.",
        "Even one patch, one crack, or one damaged wall is worth fixing well.",
        "We handle the kinds of smaller interior jobs many companies overlook.",
        "If it bothers you every day, it is not 'too small.'",
      ],
    },
    {
      fear: "Will the repair still stand out?",
      sentences: [
        "The goal is not just to fill the damage, but to make it stop catching your eye.",
        "We focus on clean patches and smooth, paint-ready finishes.",
        "A repair should feel handled, not highlighted.",
        "You should not have to pay for a patch that still looks like a patch.",
        "We aim for repairs that blend back into the space as naturally as possible.",
      ],
    },
    {
      fear: "Will this turn into a whole thing?",
      sentences: [
        "This does not need to become a bigger project than you want.",
        "We keep repair scope focused, clear, and proportional to the problem.",
        "If you just need the damaged area fixed, that is exactly what we can do.",
        "You do not need to open up a full room project to deal with one bad wall.",
        "Clear scope means fewer surprises and fewer moving parts.",
      ],
    },
    {
      fear: "How messy or disruptive will this be?",
      sentences: [
        "Repair work should not leave your house feeling upside down.",
        "We keep the process as tidy and contained as possible.",
        "You should know what to expect before the work begins.",
        "The goal is to solve the problem, not create a new one inside your home.",
        "We know homeowners want the repair done properly without unnecessary disruption.",
      ],
    },
    {
      fear: "Can I trust you to quote this clearly?",
      sentences: [
        "We believe smaller jobs should still come with clear communication.",
        "You should know what is included before work starts.",
        "Straightforward quoting matters just as much as the repair itself.",
        "We keep pricing grounded in the actual scope of the job.",
        "No vague contractor language. Just a clear next step.",
      ],
    },
  ] as FearGroup[],

  drywallInstallation: [
    {
      fear: "Do you handle jobs like this, or only big builds?",
      sentences: [
        "We handle practical residential drywall installation for basements, garages, ceilings, utility rooms, and smaller interior spaces.",
        "You do not need a full renovation company to move an unfinished area forward.",
        "This is for homeowners who want clean progress without overbuilding the project.",
        "We focus on the in-between jobs that are too important for a handyman and too limited for a large renovation firm.",
        "Not every installation project needs to become a major construction process.",
      ],
    },
    {
      fear: "Will this get overcomplicated?",
      sentences: [
        "We keep installation work focused on what the space actually needs.",
        "If you only want walls boarded, we can keep it to walls.",
        "If you only want one section completed, that can be the scope.",
        "You can move a space forward in stages instead of committing to everything at once.",
        "We help homeowners make practical progress without unnecessary complexity.",
      ],
    },
    {
      fear: "Will this actually make the space feel better?",
      sentences: [
        "Fresh drywall changes a space from exposed and unfinished to cleaner and more complete.",
        "Even before final decorating, proper drywall makes a room feel more intentional.",
        "A boarded space feels closer to usable living space instead of postponed square footage.",
        "The goal is simple: help the area feel less rough, less temporary, and more finished.",
        "This is often the step that makes a basement or garage finally feel like part of the home.",
      ],
    },
    {
      fear: "Why hire you instead of a handyman?",
      sentences: [
        "Focus matters when you want cleaner finishes and a better result.",
        "Specialized interior finishing work usually delivers a more polished result than a patchwork approach.",
        "A better-finished surface makes every next step easier, from painting to everyday use.",
        "This is not about doing everything. It is about doing this scope properly.",
        "Homeowners usually feel the difference when the work is done by someone focused on this kind of interior finishing.",
      ],
    },
  ] as FearGroup[],

  painting: [
    {
      fear: "Do I need someone else after the drywall?",
      sentences: [
        "If the wall is repaired but never properly finished, it still feels unfinished.",
        "Painting is often the step that makes the repair finally disappear into the room.",
        "A patch-ready wall is not always a finished wall.",
        "It is easier when the repair and the finish work are handled as one clear scope.",
        "The goal is not just a repaired surface, but a room that feels refreshed again.",
      ],
    },
    {
      fear: "Will the room still look uneven?",
      sentences: [
        "Fresh paint helps the repaired area feel consistent with the rest of the space.",
        "A proper refresh makes the wall feel intentional again, not patched together.",
        "Clean paintwork helps the room feel brighter, smoother, and more pulled together.",
        "The right finish work can make the whole room feel better, not just the damaged spot.",
        "When the finish is done properly, the space stops looking like a compromise.",
      ],
    },
    {
      fear: "Is this too much for one room or one wall?",
      sentences: [
        "Smaller repaint jobs still make a real difference in how a space feels.",
        "One wall, one ceiling, or one room can be enough to remove daily irritation.",
        "You do not need to repaint the whole house to get a cleaner result.",
        "Focused paint work can be the fastest way to make a room feel finished again.",
        "Practical refreshes matter, especially in high-traffic spaces.",
      ],
    },
    {
      fear: "Will this be worth the money?",
      sentences: [
        "Homeowners usually are not paying for paint alone. They are paying for the room to feel right again.",
        "A finished wall feels better to live with than a repair that still looks temporary.",
        "The value is in making the problem disappear fully, not halfway.",
        "Clean finish work protects the value of the repair beneath it.",
        "A simple refresh can have a bigger impact than people expect.",
      ],
    },
  ] as FearGroup[],

  garagePackages: [
    {
      fear: "I do not want a huge garage renovation",
      sentences: [
        "You do not need a full garage makeover to make the space feel cleaner and more usable.",
        "A straightforward garage package can make a big difference without turning into a major project.",
        "This is about practical improvement, not unnecessary overbuilding.",
        "We help homeowners improve unfinished garages in manageable steps.",
        "A better garage does not have to start with a massive commitment.",
      ],
    },
    {
      fear: "Is this really worth doing?",
      sentences: [
        "Unfinished garage walls make the space feel colder, rougher, and less useful than it could be.",
        "Boarding and insulating the garage can make it feel more protected, more intentional, and easier to use.",
        "Even if the garage is mainly functional, it still feels better when it looks and performs like part of the home.",
        "A cleaner garage usually feels less like a storage shell and more like usable square footage.",
        "This kind of upgrade improves both comfort and day-to-day experience.",
      ],
    },
    {
      fear: "Will I get pushed into more than I want?",
      sentences: [
        "If you only want a starter package, we can keep it to that.",
        "We can focus on the practical first stage instead of pushing you into a larger build.",
        "Clear scope helps you improve the space without losing control of the project.",
        "Homeowners often want the garage handled in simple, logical steps.",
        "The goal is progress you feel good about, not pressure to do everything now.",
      ],
    },
    {
      fear: "Why not just leave it unfinished?",
      sentences: [
        "Unfinished spaces have a way of staying unfinished when there is no simple first step.",
        "A modest upgrade now can remove years of visual clutter and postponement.",
        "Taking care of the shell often makes the whole home feel more looked after.",
        "The garage may be functional now, but that does not mean it feels finished or enjoyable to use.",
        "A practical improvement today can make the space easier to live with for years.",
      ],
    },
  ] as FearGroup[],

  basementPackages: [
    {
      fear: "I am not ready for a full basement renovation",
      sentences: [
        "You do not have to commit to a full basement build to make meaningful progress.",
        "Starting with walls, insulation, or the ceiling is often the smartest first step.",
        "This is for homeowners who want the basement to feel better without taking on everything at once.",
        "A basement can move forward in stages.",
        "We help you improve the space without forcing a full-renovation decision.",
      ],
    },
    {
      fear: "Will this spiral into a much bigger job?",
      sentences: [
        "We are not here to turn a stage-one upgrade into a project spiral.",
        "If you want to start with one defined part of the basement, that can be the plan.",
        "Focused scope makes basement progress feel more manageable.",
        "You can solve the biggest pain point first and decide on the rest later.",
        "Clear phases help keep cost, disruption, and decision fatigue under control.",
      ],
    },
    {
      fear: "What if I just want it warmer, quieter, or less rough?",
      sentences: [
        "Sometimes the basement does not need everything. It just needs to feel more comfortable and less unfinished.",
        "Insulation and drywall can make the space feel warmer, quieter, and closer to usable.",
        "A basement feels very different once exposed surfaces are covered and the space starts to look intentional.",
        "Even partial finishing can remove that cold, bare, half-done feeling.",
        "The first improvement is often the one that makes the biggest emotional difference.",
      ],
    },
    {
      fear: "Why should I do anything now if I can wait?",
      sentences: [
        "Waiting does not make the basement less irritating to look at or live around.",
        "The longer unfinished space sits, the more it becomes part of the home's mental clutter.",
        "A simple first step now can make the basement feel more settled without taking on everything.",
        "You do not need to finish the whole basement to stop feeling like it is unfinished.",
        "Progress feels better than postponement.",
      ],
    },
  ] as FearGroup[],

  insulation: [
    {
      fear: "Do I really need insulation?",
      sentences: [
        "Insulation is not just about energy. It is also about comfort, sound control, and making unfinished spaces more usable.",
        "Colder, noisier spaces usually feel less inviting and less complete.",
        "A simple insulation upgrade can make a noticeable difference in how a basement or garage feels day to day.",
        "If the goal is a warmer, quieter, more comfortable space, insulation is often part of that solution.",
        "This is one of the easiest ways to improve comfort before everything else is finished.",
      ],
    },
    {
      fear: "Is insulation too technical or confusing?",
      sentences: [
        "We keep insulation recommendations tied to the actual space and scope.",
        "You do not need to become an expert to make a practical upgrade.",
        "The goal is simple: improve comfort without unnecessary complication.",
        "We focus on insulation where it makes sense for the project.",
        "Clear scope matters here too.",
      ],
    },
    {
      fear: "Will this be sold to me as a standalone upsell?",
      sentences: [
        "We position insulation where it actually adds value to the space.",
        "Insulation works best when it supports a clear basement or garage goal.",
        "We do not treat every project like it needs everything.",
        "If insulation belongs in the package, we explain why.",
        "If you are improving an unfinished space, this is often the step that makes the rest perform better.",
      ],
    },
  ] as FearGroup[],

  pricingProcess: [
    {
      fear: "How much is this really going to cost?",
      sentences: [
        "You should not have to guess whether a small job will come back at a huge number.",
        "We believe in giving homeowners realistic pricing direction early.",
        "Clear starter ranges help you know whether the job makes sense before moving forward.",
        "Better quoting starts with better scope.",
        "Predictability matters, especially for practical home projects.",
      ],
    },
    {
      fear: "Will I get vague answers?",
      sentences: [
        "We aim to make the process clear before the work begins.",
        "You should know what kind of job this is, what it includes, and what the next step looks like.",
        "Clear communication is part of the service.",
        "A straightforward quote builds more trust than a long list of maybes.",
        "Homeowners deserve clarity, not confusion.",
      ],
    },
    {
      fear: "How disruptive is this going to be?",
      sentences: [
        "You should know what to expect in your home before the project starts.",
        "A smaller repair or focused package should feel manageable, not overwhelming.",
        "We keep the process as simple and contained as the scope allows.",
        "Good preparation reduces stress for everyone.",
        "The goal is to improve the home without making life around it harder than it needs to be.",
      ],
    },
  ] as FearGroup[],

  // ── Cross-page reusable blocks ─────────────────────────────────────────
  smallJobsWelcome: [
    "Small jobs are welcome here.",
    "You do not need a giant project to get a professional result.",
    "One patch, one wall, one room, or one unfinished area can still be worth doing properly.",
    "Smaller jobs should not mean lower care.",
    "We built this service around the kinds of practical interior projects homeowners actually need help with.",
    "If the issue keeps bothering you, it is worth reaching out about.",
  ],

  whyChooseUs: [
    "We focus on practical interior finishing work for homeowners, not broad renovation projects.",
    "That focus helps keep the work clearer, cleaner, and better matched to the jobs people actually need done.",
    "We are not trying to be everything to everyone.",
    "We are built for the middle ground: jobs too important to ignore, but too limited for a full renovation company.",
    "Focused service usually feels easier on the homeowner side too.",
    "You get a clearer path from problem to finished result.",
  ],

  finalCta: [
    "You have looked at that damage or unfinished space long enough.",
    "The next step should feel simple.",
    "Send photos, get clarity, and find out what this would actually take.",
    "You do not need to figure out the whole project before reaching out.",
    "Start with the problem you want gone first.",
    "A cleaner, more finished space usually starts with one clear decision.",
  ],
} as const;

export type FearDispelKey = keyof typeof FEAR_DISPEL;
