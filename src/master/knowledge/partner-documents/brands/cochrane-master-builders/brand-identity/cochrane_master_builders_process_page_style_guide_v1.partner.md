---
name: Cochrane Master Builders — Process Page Sub-Style-Guide v1.0
description: Page-specific sub-style-guide for the Process page across all 115 Cochrane spin-off sites. Inherits every locked token from Master Style Guide v1.0 and adds Process-page-only deltas, per-service overlays, a hard performance budget, an anti-pattern audit checklist, and a 15-point QA gate.
type: design
brand: cochrane-master-builders
axis: style (process-page leg)
inherits_from: partner-documents/brands/cochrane-master-builders/brand-identity/cochrane_master_builders_style_guide_v1.partner.md
status: partner-only
---

# Cochrane Master Builders — Process Page Sub-Style-Guide v1.0

> **Inherits from Master Style Guide v1.0.** Tokens (HSL palette, Space Grotesk + Jost, spacing, components, motion primitives, accessibility budget) are NOT redefined here — only Process-page-specific deltas. If a value isn't stated here, fall back to MSG v1.0.

> **Master message echo (mandatory):** every Process page must surface or paraphrase **"Strong Foundations For Those Who Come After Us"** at least once (recommended slots: hero subhead, "Why The Process Matters" section, or Final CTA microcopy).

> **Each section ends with a Pass/Fail audit check.** The Auditor persona runs these mechanically before publish.

---

## 1. Purpose & Anti-Gravity Principle

The Process page exists to **reduce mental weight** before the homeowner is asked to contact. Every step must make the reader feel lighter, safer, more oriented.

Three jobs, in order: (1) **reduce fear**, (2) **create confidence**, (3) **move to a clear estimate request**.

Emotional north star: *"I understand how this company works, and I feel safe enough to reach out."*

**Audit check:** Does the page answer the 10 anxieties in §2 of the source PDF before asking for contact? PASS / FAIL.

---

## 2. Brand Standard

Controlling idea: **Old-school accountability made usable through modern-day clarity.**

The page must communicate, without saying it cheaply: *"Our name matters here. We plan before we build. We explain what affects cost. We respect your home. We document the next step. We want to be the builder you call again."*

**Audit check:** Find at least 3 of those 6 statements expressed *as evidence*, not as slogans. PASS / FAIL.

---

## 3. Master Section Order (locked across all 115 sites)

1. Trust Bar
2. Navbar (inherited from sitewide spec)
3. Process Hero
4. Fast Answer Block
5. Why Our Process Matters
6. Full Process Timeline (8 steps)
7. What We Need From You
8. What Can Affect Price And Timeline
9. How We Protect Your Home
10. Service-Specific Process Details
11. Communication And Change Handling
12. Proof / Process Examples
13. Process FAQs
14. Final CTA
15. Footer (inherited)

**Audit check:** All 15 sections present, in this order, exactly once. PASS / FAIL.

---

## 4. Visual Direction (deltas from MSG v1.0)

Process page mood: **premium project briefing.** Calm, structured, useful. Not flashy.

**Palette mapping into our HSL tokens (do not introduce new tokens):**

| Source guide hint | Maps to MSG v1.0 token |
|---|---|
| warm off-white, soft stone | `--bone`, `--stone-50` |
| blueprint blue-grey | `--graphite-400` (cool tilt) |
| muted forest green | `--heritage-700` (Process page accent ONLY when service overlay calls for it — landscaping/decks) |
| charcoal steel | `--graphite-900` |
| warm timber accent | `--heritage-500` at ≤ 8% surface coverage |
| subtle brass highlight | `--heritage-600` for step numerals only |

**Texture rules:** paper grain (≤ 4% opacity), blueprint grid lines (timeline backdrop only, ≤ 6%), fine line dividers (`1px hsl(var(--graphite-200))`). **Banned:** loud textures, fake grunge, busy site-photo backdrops, human imagery in hero.

**Audit check:** No new HSL values introduced. Texture opacities ≤ stated maxes. No human faces in any hero/section header. PASS / FAIL.

---

## 5. Typography (Process-page rules on top of MSG v1.0)

- **H1:** Space Grotesk 300, 56–72px desktop / 36–44px mobile, sentence-case, line-height 1.05–1.1. Example: **"A Clear Process For Better Construction Decisions."**
- **H2:** Space Grotesk 400, 32–40px desktop / 26–30px mobile. Example: **"What Happens After You Reach Out."**
- **Body:** Jost 400, 17–18px desktop / 16px mobile, line-height 1.7. Short paragraphs (≤ 3 lines). Reads like a builder at a kitchen table.
- **Labels (locked vocabulary):** `Step 01`, `Before We Quote`, `During The Work`, `After Completion`, `Price Driver`, `Home Protection Note`, `Hidden Work`, `Local Note`. Jost 500, 11–12px, tracking `0.12em`, uppercase, color `hsl(var(--graphite-500))`.

**Audit check:** Body ≥ 16px on mobile. No paragraph > 3 lines on a 390px viewport. Labels drawn from the locked vocabulary only. PASS / FAIL.

---

## 6. Layout System

- Strong grid; the page must feel organized before it's read.
- **Desktop:** split hero (copy left, process snapshot card right). Sticky side index for the long timeline.
- **Mobile:** vertical stepper. No horizontal timeline below 1024px.
- **CTA placement:** exactly 3 — above the fold, after the timeline, final CTA. **Do not** place a loud CTA after every paragraph.
- Generous whitespace. `py-32` minimum between major sections; `py-24` mobile.

**Audit check:** Exactly 3 primary CTA surfaces. Mobile timeline is vertical. PASS / FAIL.

---

## 7. Motion & Interaction (anti-flashy)

Motion = *clarity unfolding*. Allowed: soft fade-in, subtle upward reveal (≤ 16px), timeline progress indicator, accordion expansion, gentle card hover, checkmark confirmation. **Banned on Process pages:** scroll hijacking, parallax, bouncing icons, autoplay video above the fold, Lottie, 3D, scroll-linked sticky pins on the timeline.

**Hard rules:**
- Animate `transform` and `opacity` only.
- `prefers-reduced-motion: reduce` → disable all reveals; show final state immediately.
- Reveals via shared `IntersectionObserver`, not per-component Framer Motion stacks.
- Total animation budget on the page: ≤ 8 distinct reveal triggers.

**Audit check:** `grep` for `motion.` count ≤ 8 in the Process page tree. `@media (prefers-reduced-motion: reduce)` block present and disables transforms. PASS / FAIL.

---

## 8. Voice (inherits Master Copywriter)

Formula: **Plainspoken + Reassuring + Specific + Local + Action-Oriented.**

Banned phrases on Process pages (extends the sitewide ban): *seamless, world-class, unmatched, dream project, hassle-free, turnkey, white-glove, premium experience, your trusted partner, one-stop shop, we've got you covered, peace of mind* (use only in the Home Protection section, sparingly).

Required phrases at least once each: *"clear next step," "rough range," "before work begins," "respect for the home," "Cochrane"* (or active community), *"family-owned."*

**Audit check:** `grep -iE 'seamless|world-class|unmatched|dream project|hassle[- ]free|turnkey|white[- ]glove|one[- ]stop'` returns 0 hits. All 6 required phrases present. PASS / FAIL.

---

## 9. Section-by-Section Component Specs

### Trust Bar
Copy: **"Family-owned construction services for Cochrane homes, acreages, and surrounding communities."** Service-specific: **"Family-owned [service] in Cochrane, planned clearly before work begins."** Background `hsl(var(--bone))`, height 36px desktop / 32px mobile.

### Process Hero
Eyebrow `The Cochrane Master Builders Process` (or `Our [Service] Process In Cochrane`). H1 from the source pool. Subheadline 60–110 words. Primary CTA `Request A Clear Estimate` (or per-service variant). Secondary CTA `See What We Need From You`. Right-side `ProcessSnapshotCard` listing 4 mini-steps.

### Fast Answer Block
50–90 words. Single calm card. SSR-rendered (powers Google + AI search snippets).

### Why Our Process Matters
Two columns. Left: 2 short paragraphs. Right: 8 risk cards (`unclear scope`, `surprise costs`, `permit confusion`, `poor sequencing`, `hidden conditions`, `messy work areas`, `weak communication`, `rushed decisions`).

### Full Process Timeline (8 steps)
Steps 01–08 verbatim from source §15 unless service overlay replaces. Numerals in Space Grotesk 300, 64px, color `hsl(var(--heritage-600))`. Each step card: label + 1-sentence body (≤ 28 words).

### What We Need From You
10-item checklist grid (3 cols desktop / 1 mobile). Microcopy + `Send Project Details` CTA.

### What Can Affect Price And Timeline
7 expandable cards (Size & Scope, Existing Conditions, Access, Materials & Finish Level, Permits & Licensed Trades, Season & Weather, Changes After Approval). Use `<details><summary>` for SEO + INP + a11y.

### How We Protect Your Home
9 reassurance cards. Tone deeply human.

### Service-Specific Process Details
Driven by the service overlay (§10). Includes "what we inspect first" card + photo-example callout.

### Communication And Change Handling
6 cards (`what we found`, `why it matters`, `what the options are`, `how it affects price`, `how it affects timeline`, `what we recommend`).

### Proof / Process Examples
Real local case-story cards: `[Service] In [Community] — Situation / Process / Decision / Outcome`. If empty, render the placeholder copy from source §21. **Never fake proof.**

### Process FAQs
6 universal FAQs (source §22) + 3 service-specific FAQs from overlay. Renders FAQPage JSON-LD server-side.

### Final CTA
H2: **"Ready To Start With A Clear Next Step?"** Primary CTA + secondary `Call A Local Builder`. Microcopy: *"No pressure. Just a clearer path forward."*

**Audit check:** Each section's component is present, with copy length within stated bounds (Fast Answer 50–90 words, step body ≤ 28 words). PASS / FAIL.

---

## 10. Service-Specific Overlays

For each service category, the overlay defines: **Process Page Emotion**, **Hero Line**, **7-step service timeline**, **Special Components**, **CTA**. Verbatim defaults from source §25:

| Category | Emotion | Hero Line | CTA |
|---|---|---|---|
| Roofing / Exterior Envelope | Protection | *A Clear Roofing Process For Protecting The Family Under The Roof.* | Request A Roof Assessment |
| Bathroom / Kitchen / Interior Reno | Comfort + Control | *A Renovation Process Built To Protect Your Home And Daily Routine.* | Plan Your Renovation |
| Basement / Suite / Garage | Security + Future | *A Clear Process For Turning Unused Space Into Long-Term Family Value.* | Request A Suite Planning Conversation |
| Concrete / Foundations / Excavation | Strength + Stability | *A Site Process Built Around Strength, Drainage, And Long-Term Performance.* | Request A Site Scope Review |
| Decks / Fences / Outdoor Living | Family + Safety | *A Clear Outdoor Project Process For Safer, More Usable Family Spaces.* | Plan Your Outdoor Project |
| Flooring / Tile / Finish Work | Precision + Pride | *A Finish Process Built Around Clean Details And Daily Use.* | Get Finish Guidance |
| HVAC / Mechanical / System | Safety + Reliability | *A Clear Process For Safer, More Reliable Home Systems.* | Request A System Review |
| Commercial / Tenant Improvement | Control + Continuity | *A Commercial Process Built To Protect Your Timeline, Budget, And Operations.* | Talk Through A Commercial Scope |
| Handyman / Repairs / Maintenance | Relief | *A Simple Process For Getting Small Jobs Handled Properly.* | Send Photos For A First Look |

**Audit check:** Per-site Process page picks exactly one overlay. All 5 overlay fields populated. Hero line + CTA match the overlay table verbatim or have a documented per-site reason for divergence. PASS / FAIL.

---

## 11. Service Process Config Schema

Every Process page is built from a config object (no hardcoded copy in components):

```ts
type ProcessConfig = {
  domainName: string;
  brandName: string;
  serviceName: string;
  serviceCategory:
    | "roofing" | "interior-reno" | "basement-suite" | "concrete"
    | "outdoor-living" | "flooring-finish" | "hvac-mechanical"
    | "commercial-ti" | "handyman-repairs" | "custom-homes";
  processHeroEyebrow: string;
  processHeroHeadline: string;
  processHeroSubheadline: string;
  primaryCTA: string;
  secondaryCTA: string;
  fastAnswerBlock: string;          // 50–90 words
  mainCustomerAnxiety: string[];
  hiddenWorkFactors: string[];
  universalProcessSteps: TimelineStep[]; // length 8
  serviceSpecificSteps: TimelineStep[];  // length 6–8
  whatWeNeedChecklist: string[];    // length 8–12
  priceDrivers: PriceDriver[];      // length 6–8
  homeProtectionNotes: string[];    // length 6–9
  changeHandlingCopy: string;
  proofItems: ProofStory[];         // can be []
  processFAQs: Faq[];               // 6 universal + 3 service-specific
  finalCTACopy: string;
  seoTitle: string;                 // pattern below
  metaDescription: string;          // pattern below
};
```

**Audit check:** Every published Process page has a typed `ProcessConfig` with all fields populated. PASS / FAIL.

---

## 12. SEO Template

- **Title:** `Our [Service] Process In Cochrane | [Brand Name]` — ≤ 60 chars.
- **Meta description:** *"See how our family-owned [service] process works in Cochrane, from project intake and scope review to pricing guidance, scheduling, workmanship, and final walkthrough."* — ≤ 160 chars (truncate `workmanship, and final walkthrough` if needed).
- **H1:** `A Clear Process For Your [Service] Project.`
- **Schema (SSR-rendered, never via JS):** `BreadcrumbList`, `Service`, `FAQPage`, `LocalBusiness` (sitewide).
- **Internal links (mandatory):** home, services, pricing, the matching service page, areas-we-serve, contact, 2 related service process pages.

**Audit check:** Title ≤ 60 chars; meta ≤ 160 chars; FAQPage JSON-LD present in initial HTML (not injected); 7 internal links present. PASS / FAIL.

---

## 13. Cross-Site Consistency Matrix

| Element | Locked across all 115 sites | Variable per site |
|---|---|---|
| 15-section order | ✅ | — |
| 8-step universal timeline copy | ✅ | service overlay may replace 6–8 service-specific steps |
| Voice formula + banned words | ✅ | — |
| Component set | ✅ | — |
| Master message echo | ✅ | which slot it lives in |
| Heritage accent token (`--heritage-600`) | ✅ for step numerals | overlay may shift accent hue (landscaping → green-leaning, concrete → cooler graphite) within the locked HSL family |
| Hero line | template | service overlay value |
| CTA wording | overlay value | per-site brand-name suffix |
| Proof stories | empty placeholder | per-site real cases |

**Audit check:** Locked column items unchanged across sample of 5 sites. PASS / FAIL.

---

## 14. Variable-Driven Theming knobs

Per-service palette tilts must stay inside MSG v1.0's HSL family. Allowed knobs:

```css
/* Process page only — overrides scoped to .process-page */
.process-page[data-overlay="landscaping"]   { --process-accent: var(--heritage-500); }
.process-page[data-overlay="concrete"]      { --process-accent: var(--graphite-400); }
.process-page[data-overlay="roofing"]       { --process-accent: var(--graphite-700); }
.process-page[data-overlay="interior-reno"] { --process-accent: var(--heritage-600); }
/* default */
.process-page { --process-accent: var(--heritage-600); }
```

**Forbidden:** loading any extra font file or weight to support an overlay. All overlays use the existing 4 face files.

**Audit check:** No new `@font-face` declarations introduced. Only `--process-accent` is overridden per overlay. PASS / FAIL.

---

## 15. Brand Anchor Enforcement on Process pages

- Master line **"Strong Foundations For Those Who Come After Us"** echoes ≥ 1× per page.
- Recommended paraphrase from source §4 ("Strong foundations do not begin when the tools come out…") allowed in Why-The-Process-Matters or Final CTA microcopy slot.
- Family-owned, local, multi-generational language present in: Trust Bar, Hero subhead OR Why-Process section, Final CTA.

**Audit check:** `grep -F "Strong Foundations For Those Who Come After Us"` returns ≥ 1. The tokens "family-owned" and "Cochrane" each appear ≥ 2×. PASS / FAIL.

---

## 16. Performance Audit (mandatory — this is the hard part)

### 16.1 Budget (tighter than sitewide MSG v1.0 §13)

| Metric | Process Page Budget | Why tighter |
|---|---|---|
| LCP (mobile, 4G) | ≤ 1.8s | high-intent page; latency erodes trust |
| CLS | ≤ 0.02 | timeline shifting is fatal |
| INP | ≤ 150ms | accordion FAQs must feel instant |
| TBT | ≤ 120ms | — |
| First-load JS (gz) | ≤ 140 kB | no heavy timeline libs |
| Hero image | ≤ 180 kB AVIF/WebP, responsive `srcset`, `fetchpriority="high"` | — |
| Web fonts | 2 families × ≤ 2 weights = ≤ 4 face files, all `font-display: swap` | — |
| Below-fold images | `loading="lazy" decoding="async"` + intrinsic `width`/`height` | — |
| Third-party JS on this page | 0 | no chat widget, no blocking analytics |

### 16.2 Anti-pattern checklist (Auditor runs greps + Lighthouse)

| ❌ Anti-pattern | ✅ Fix | Mechanical check |
|---|---|---|
| Multiple `<motion.*>` per timeline step | Shared `IntersectionObserver` + CSS keyframes | `grep -c '<motion\.' ProcessPage tree → ≤ 8` |
| Icon library imported client-side for tiny step icons | Inline SVG sprite | `grep -E "from ['\"](lucide-react\|@heroicons)['\"]" → 0 imports for step icons` |
| Animating `width` / `height` / `top` / `left` | Animate `transform` + `opacity` only | `grep -E "(animate\|transition).*['\"](width\|height\|top\|left)['\"]" → 0` |
| Long-running scroll-linked anim without `will-change` cleanup | Apply `will-change` only while active, remove on completion | code review |
| Accordion that mounts/unmounts heavy children | Keep mounted; toggle via `[hidden]` + `aria-expanded` | code review |
| Autoplay hero `<video>` > 1MB | Static AVIF + CSS Ken Burns | `grep -E "<video[^>]*autoPlay" → 0` |
| `<img>` without `width`/`height` | Always set intrinsic dims | `grep -E "<img(?![^>]*width=)" → 0` |
| FAQ rendered as div instead of `<details>` | `<details><summary>` | `grep -c '<details' in FAQ component ≥ FAQ count` |
| Background parallax on the timeline | Banned (§7) | code review |
| `lottie`, `three`, `gsap`, large 3D libs imported | Forbidden on Process pages | `grep -E "from ['\"](lottie\|three\|gsap)" → 0` |
| `srcset` without `sizes` | Always pair | `grep -E "srcSet=" without paired `sizes=` → 0` |
| JSON-LD injected via JS in `useEffect` | SSR-render in document head | code review |
| Auto-playing carousel of proof images | Static grid | `grep -E "autoplay" in proof component → 0` |
| Web fonts without `font-display: swap` | Add | `grep -L 'font-display' tailwind.config / @font-face → fail if missing` |
| Heavy CSS-in-JS runtime on this page | Tailwind tokens only | `grep -E "@emotion/styled\|styled-components" in Process tree → 0` |
| Whole page hydrated to make 2 components interactive | Island pattern: static-render timeline; only FAQ + form hydrate | code review |
| Loading icon libraries via barrel imports | Tree-shaken named imports | `grep -E "import \* as" in Process tree → 0` |
| Re-fetching fonts when overlay changes | All overlays share the 4 face files | network panel review |

### 16.3 Lighthouse gate

Per-route Lighthouse mobile scores at publish: **Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO 100.** Below any gate = block publish.

**Audit check:** All 17 anti-pattern greps pass. Lighthouse mobile meets gate. PASS / FAIL.

---

## 17. Accessibility Audit

- Heading hierarchy: 1× H1, only H2/H3 below; no skipped levels.
- All accordions keyboard-operable (`<details>` or proper `aria-expanded` + `aria-controls`).
- Visible focus rings on all CTAs (`:focus-visible` outline ≥ 2px, contrast ≥ 3:1).
- Alt text on every diagram / proof image (descriptive, not decorative).
- Body text contrast ≥ AAA (`hsl(var(--graphite-900))` on `hsl(var(--bone))`).
- No information conveyed by color alone (step state uses numeral + label, not just hue).
- Reduced-motion respected (§7).
- Forms labeled with `<label for>` + descriptive helper text + visible error states.

**Audit check:** axe-core 0 critical/serious issues; manual keyboard pass through hero → timeline → FAQs → final CTA succeeds. PASS / FAIL.

---

## 18. Governance + Token Quick Reference + Auditor Greps

### Token Quick Reference (Process page only)

```
--process-accent       : --heritage-600 (default), overlay-swappable
--process-bg           : --bone
--process-surface      : hsl(var(--bone) / 0.6)
--process-divider      : hsl(var(--graphite-200))
--process-numeral      : Space Grotesk 300, 64px, color var(--process-accent)
--process-label        : Jost 500, 11px, tracking 0.12em, color hsl(var(--graphite-500))
```

### Governance

- Source PDF + source.md are immutable.
- This sub-style-guide is versioned (`v1.0`). Material changes ship as `v1.1` (additive) or `v2.0` (breaking). Never edit historical versions in place.
- Master Style Guide Architect owns the file; Auditor signs off; Master Copywriter signs off on voice; Performance Engineer signs off on §16.

### Auditor grep bundle (paste-ready)

```bash
# Voice
grep -RInE 'seamless|world-class|unmatched|dream project|hassle[- ]free|turnkey|white[- ]glove|one[- ]stop' src/<process-page>
# Required tokens
grep -RIc 'family-owned' src/<process-page>     # ≥ 2
grep -RIc 'Cochrane'     src/<process-page>     # ≥ 2
grep -RF 'Strong Foundations For Those Who Come After Us' src/<process-page>  # ≥ 1
# Motion
grep -RInc '<motion\.' src/<process-page>       # ≤ 8
grep -RInE "from ['\"](lottie|three|gsap)" src   # 0
# Layout safety
grep -RInE "<img(?![^>]*width=)" src/<process-page>  # 0
grep -RInE "(animate|transition).*['\"](width|height|top|left)['\"]" src/<process-page>  # 0
```

### 15-point Final QA gate (from source §30, audit-ready)

1. Hero clearly explains process + service.
2. Reduces fear before asking for contact.
3. Explains what happens after inquiry.
4. Includes what we need from the customer.
5. Explains what affects price + timeline.
6. Shows how the home is protected.
7. Includes service-specific process details.
8. Connects to the family-owned standard.
9. Includes FAQs (6 universal + 3 service).
10. Includes a clear final CTA.
11. Avoids fake guarantees.
12. Avoids generic identical copy across services.
13. Loads quickly on mobile (§16 gate).
14. Accessible headings, buttons, accordions (§17 gate).
15. Feels like guidance, not pressure.

**Audit check:** All 15 = PASS. Any single FAIL blocks publish.

---

## North Star

A good Process page makes the customer think:

> *They know what they are doing. They will explain the price. They will not pressure me. They understand what can go wrong. They will respect my home. They think beyond the invoice. I can contact them now.*

It is not a timeline. It is a **trust-building tool** — the digital version of a calm builder sitting at a kitchen table saying:

> *"Here is what happens next. Here is what can affect the work. Here is what we need from you. Here is how we protect your home. Here is how we move forward properly."*

> **Strong Foundations For Those Who Come After Us.**
