# 09 — Voice, Messaging Pillars, Lexicon (CMB)

> Owner: **Master Copywriter.** Inherits the 5 Brand Spine pillars from `01_…`. Every line must pass the 5-question decision filter.

---

## Voice formula

**Plainspoken + Reassuring + Specific + Local + Action-Oriented.**

| Trait | Sounds like | Never sounds like |
|-------|-------------|-------------------|
| Plainspoken | "Here's what usually drives the cost." | "Unlock your dream renovation journey." |
| Reassuring | "We'll walk you through it before we start." | "Don't miss out — book today!" |
| Specific | "Pitch, access, layers to remove, flashing condition, decking integrity." | "Quality, value, and trusted solutions." |
| Local | "Cochrane wind. Acreage logistics. Freeze-thaw." | "Serving all of Western Canada." |
| Action-Oriented | "Send what you know. We'll respond within one business day." | "Contact us today for amazing service!" |

## Tone modulation by channel

| Channel | Tone shift |
|---------|------------|
| Homepage hero | Calm, declarative. One promise. |
| Service page hero | Scope-specific. Confirm exact service + location. |
| Pricing block | Clinical, range-based, driver-explicit. |
| Process block | Stepwise, sequential, no marketing flourish. |
| FAQ | Conversational, complete sentences, real-question framing. |
| CTA panel | Low-pressure, give the visitor an out. |
| Form helpers | Explain *why* the field matters. |
| Email confirmations | Plain, dated, signed by name. |

## 5 messaging pillars

(Headlines / subheads / CTAs are abbreviated examples — full 10/10/10 sets per pillar are authored as the Master Copywriter is engaged on a specific spin-off domain.)

### Pillar 1 — Family-Owned Accountability

- *Headlines:* "The Family That Answers Your Call Is The Family That Builds Your Project." / "Family-Owned. Locally Built. Long-Term Standard." / "Built Like Your Family Will Live With The Result."
- *Subheads:* "Same name on the truck, same name on the warranty." / "We've worked here long enough to be recognized at the hardware store."
- *CTAs:* "Talk Through Your Project," "Walk Us Through The Scope," "Tell Us What You Know."

### Pillar 2 — Clarity Before Cost

- *Headlines:* "Clear Pricing Guidance Before You Start The Conversation." / "What This Project Can Cost In Cochrane." / "Ranges, Drivers, And No Hidden Surprises."
- *Subheads:* "Construction prices vary because conditions vary. We explain why." / "Small, standard, and premium-complex — laid out plainly."
- *CTAs:* "Request A Clear Estimate," "Send Photos For A First Look," "Plan Your Project."

### Pillar 3 — Hidden-Work Standard

- *Headlines:* "What Lasts Is What You Can't See." / "Materials And Methods Matter More Than Most People Realize." / "The Hidden Work Behind A Project That Holds Up."
- *Subheads:* "Flashing, waterproofing, prep, drainage, ventilation. We explain each." / "We tell you what we'll do behind the wall, not just what you'll see in front of it."
- *CTAs:* "Request A Site Scope Review," "Talk Through The Hidden Work," "Get A First Look."

### Pillar 4 — Local Reality

- *Headlines:* "Built For Cochrane Wind, Cochrane Winters, Cochrane Land." / "Serving Cochrane And The Communities Around It." / "We Know What Acreage Logistics Actually Look Like."
- *Subheads:* "Bearspaw, Springbank, Bragg Creek, Cremona, and the Foothills." / "Local conditions aren't a marketing line — they're a build constraint."
- *CTAs:* "See Areas We Serve," "Tell Us Where You Are," "Send Your Address."

### Pillar 5 — Built To Outlast Us

- *Headlines:* "Strong Foundations For Those Who Come After Us." *(master line — required at least once per page)* / "Built Like It Still Matters 50 Years From Now." / "Old-School Accountability. Modern-Day Clarity."
- *Subheads:* "We build for the family who'll live with this longer than we will." / "Long-term value isn't a tagline; it's the standard."
- *CTAs:* "Build It Properly," "Plan For The Long Term," "Start The Conversation."

## You are our people if… / Not for you if…

(See `01_…` §6. Master Copywriter authors per-cluster variants on demand.)

## Lexicon

**Words we own (use freely):**

family-owned · locally built · clear pricing guidance · hidden work · ranges · drivers · assumptions · process · proof · long-term · acreage · freeze-thaw · scope · walk-through · sequence · stand behind · standard · accountability

**Words to avoid (replace immediately):**

| Banned | Replacement |
|--------|-------------|
| premium / luxury | (omit — show, don't claim) |
| amazing / awesome / incredible | specific outcome instead |
| solutions | "work" or "services" |
| state-of-the-art / cutting-edge | the actual material or method name |
| game-changer / revolutionary | (delete) |
| affordable / cheap | "ranged pricing" |
| quality / value | name the actual proof point |
| seamless | (delete or "step-by-step") |
| tailored / bespoke | "scoped to your project" |
| journey | "process" |
| world-class / best-in-class | (delete) |
| unleash / elevate | (delete) |
| pricing starts at | "ranges from" |
| limited time / book now | (delete — never use urgency) |

## Writing standards

- Sentence rhythm: short → short → long → short. Vary length deliberately.
- One idea per paragraph.
- Specificity quota: every paragraph contains at least one concrete noun (a material, a measurement, a community, a step name).
- No filler intros ("In today's fast-paced world…").
- No exclamation marks anywhere except in genuine quoted speech.
- Sentence-case headlines, *not* Title Case (except the master line which is intentional capitalized).
- Em-dash with no surrounding spaces — like this.

## Claims governance

| Claim | Allowed? | Condition |
|-------|----------|-----------|
| "Family-owned" | Yes | Always. |
| "Locally based in Cochrane" | Yes | Address verifiable. |
| Specific year founded | Yes | Only with founder confirmation. |
| Project counts ("over 200 homes") | No | Until verifiable & dated. |
| Awards / BBB ratings | Conditional | Only if currently held. |
| Warranty terms | Conditional | Only what is in the actual contract. |
| "Best in Cochrane" / superlatives | Never | Banned. |

## Pass/Fail audit

- [ ] No banned word present. Grep: `rg -n -i "(premium|luxury|amazing|seamless|tailored|world-class|unleash|elevate|journey|game-?changer|state-of-the-art)" src/components src/pages content/`
- [ ] Master line appears at least once per page route.
- [ ] No exclamation marks outside quoted speech. Grep: `rg -n "!\"|!'" src/`
- [ ] Every pricing block uses the word "range" + names ≥ 3 drivers.
- [ ] No claim from the "Never" row of the claims table.
