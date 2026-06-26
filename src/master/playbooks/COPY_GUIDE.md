# COPY GUIDE — Voice and storytelling for every Masters sub-service site

> Every word bespoke. Zero paraphrasing across sister sites — Google penalizes it harder than thin content. **No Lorem. No template mad-libs.**

---

## 1. Voice traits (Masters default)

- **Calm** — confident, not hyped
- **Honest** — admit limits, give ranges
- **Local** — references to real neighborhoods, real materials, real building stock
- **Practical** — show the next step on every screen
- **Quietly confident** — never boastful

Per-trade voice doc (Phase 2) layers on 5 do's, 5 don'ts, sample paragraph, 5 power words, 5 banned words. **The trade voice doc wins** when it conflicts with master defaults.

## 2. The anti-paraphrase rule

Sister sites must not share paragraphs. Google's duplicate-content filter is unforgiving for local sites.

**The rule**: for every long-form block (hero sub, why-us, process, about, story, FAQ, area-page intros), n-gram diff against every sister site in `src/master/trades.ts`. **>40% n-gram overlap = rewrite**.

What you CAN keep similar across sister sites:
- Page structure (headline → sub → trust → CTA)
- Section order
- Component patterns
- Form copy ("Send a couple of photos…" is fine to repeat)

What you CANNOT keep similar:
- Body paragraphs
- Service descriptions
- FAQ answers
- Area-page intros
- Origin story
- Why-us bullets

## 3. Story rules — answer in the first scroll

Every page must answer:

1. **What do you do?** — one specific service, not a list
2. **For whom?** — a specific kind of homeowner with a specific problem
3. **Where?** — primary city + named adjacent areas
4. **What's the next step?** — concrete (photos in → range out → tidy visit)

If any answer is fuzzy, fail the audit.

## 4. Founder origin story (≥250 words)

Built from Phase 1 founder bio + interview. Structure:

1. **Who** — name + years in trade
2. **Why** — what frustrated them about the industry
3. **The pivot** — what made them start their own thing
4. **The standard** — how they refuse to compromise (specific example)
5. **Now** — who they serve, where, what they're known for

Voice = master + per-trade. Tone = grounded, not hagiographic.

## 5. Per-page copy targets

| Page | Min words | Notes |
|---|---|---|
| Home | 600 | Sub-headlines, problems, why-us, process snippet, FAQ snippet |
| /services/<slug> | 600 | Each service page must stand on its own SEO-wise |
| /areas/<slug> | 250 | Includes the unique 80–150 word intro |
| /about | 400 | Founder, values, license, warranty summary |
| /story | 600 | The long-form origin story |
| /faq | 1200 | ≥20 Q&A |

Below the minimum = thin content = ranking penalty.

## 6. Words to avoid (master defaults)

- "luxury", "premium", "world-class", "elite"
- "best in <city>", "#1", "top-rated" — unless you have third-party proof
- "synergy", "leverage", "best-in-class", "solutions"
- "passionate about" — everyone is; say what you actually do
- "we pride ourselves on…" — show, don't pride

| Avoid | Use |
|---|---|
| "premium" | "considered" / "carefully done" |
| "best" | "right" / "right-sized" |
| "passionate" | (delete; show with a specific) |
| "high-quality" | name the brand / spec |
| "affordable" | give a price band |

## 7. CTAs (sales pass)

| Bad | Better |
|---|---|
| "Get a quote" | "Send a couple of photos" |
| "Learn more" | "See pricing & process" |
| "Click here" | (rewrite the surrounding sentence) |
| "Submit" | "Send my photos" / "Book my visit" |
| "Contact us" | "Book a call" / "Get a same-day call" |

Every primary CTA must pass AIDA: Attention (visible), Interest (relevant copy), Desire (clear benefit), Action (verb-led).

## 8. FAQ master list (≥20 Q&A)

Source from:
1. Founder interview ("what do customers ALWAYS ask?")
2. Google "People also ask" for top keywords
3. Reddit / forum threads in this trade
4. Competitor FAQs (read for patterns, never copy answers)

Each answer 40–120 words. Include the question's keyword in the answer naturally.

Default 4 questions every Masters site keeps (rewritten per trade):
1. Is my job too small?
2. How does pricing actually work?
3. How disruptive will this be to my home?
4. Do you work outside <primary city>?

## 9. Service-page anatomy (copy slots)

For each service page, write copy for:

- **Hero headline** (≤8 words)
- **Hero sub** (≤22 words, who/where/proof)
- **Scope** — 1 paragraph plain-English description
- **What's included** — 5–8 bullets
- **What's NOT included** — 3–5 bullets (transparency = trust)
- **Materials / brands** — 1–2 lines
- **Timeline** — 1 line range
- **Price band** — low/mid/high with what drives the spread
- **Process for THIS service** — 3–6 stages
- **5 service-specific FAQs** — answers feed FAQPage JSON-LD
- **CTA copy** — primary + secondary

## 10. Area-page intro template (then make each unique)

Pattern (write 100 versions, never one):

> [Trade] in [Area] is shaped by [local building stock / climate / age]. We work mostly in [3 named neighborhoods], where most jobs involve [common scope]. Drive time from our HQ is [N] minutes — we usually book [Area] visits within [N] days. If your home is in [adjacent area or landmark], we cover it.

**The key**: each area's version references **real** local landmarks. If the founder doesn't know the area well enough to write 80 unique words about it, drop it from the area list.

## 11. Microcopy (Phase 4 sweep)

- Form labels (descriptive, not just "Email")
- Placeholders (helpful examples, not redundant labels)
- Helper text (when needed, not always)
- Error messages (specific, never "Something went wrong")
- Empty states (give the user a next step)
- Success states (reassure + tell what happens next)
- 404 + 500 (helpful, on-brand, link back)

## 12. Readability target

- Flesch reading ease: **60–75** (8th–10th grade) for body
- Marketing copy can dip lower for punch
- Legal pages can go higher
- Sentence length: average 15–20 words
- Paragraphs: 2–4 sentences max for web

Tools: `textstat` (Python), Hemingway Editor.

## 13. The "so what?" test

For every section, ask three times:

1. So what? (Why does the user care?)
2. So what? (Why do they care THIS minute?)
3. So what? (What do they do next?)

If you can't answer all three by line 3 of the section, rewrite.

---

## Sign-off

Phase 4 signs off when:

1. Every page meets the minimum word count
2. Anti-paraphrase audit passes (n-gram diff vs. every sister site)
3. Voice doc rules respected (do's used, don'ts absent)
4. Readability grade in band
5. Every CTA passes AIDA
6. ≥20 FAQs ready for Phase 6 schema
7. Owner has read and approved every page out loud (the test that catches what scripts miss)
