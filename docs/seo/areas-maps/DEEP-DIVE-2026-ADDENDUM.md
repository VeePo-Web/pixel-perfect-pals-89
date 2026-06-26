# Areas + Maps + Blogs — 2026 Deep-Dive Addendum

> A focused deepening of the [masterplan](./AREAS-MAPS-MASTERPLAN.md), built from a fresh
> multi-source web-research pass (2025–2026). It (a) hard-numbers the "what wins in 2026"
> synthesis, (b) sharpens the **Maps integration** and **blog-for-maps** strategy with the
> latest data, and (c) indexes the two new deep-dive research reports + the new blog build
> prompt. **No source code is changed by anything in `docs/`.**

---

## What's new in this pass

Three new documents, all additive to the existing kit:

| New file | What it adds |
|---|---|
| **[`research/07-maps-integration-deep-dive-2026.md`](./research/07-maps-integration-deep-dive-2026.md)** | The definitive Maps-integration brief: pack-weight truth, the facade-first decision tree, the March-2025 billing change, the `GeoCircle`/`hasMap`/`sameAs` geo-graph, the GBP↔reviews prominence engine, and which AI engines actually read map data. A myth-killer table. |
| **[`research/08-local-blog-for-maps-deep-dive-2026.md`](./research/08-local-blog-for-maps-deep-dive-2026.md)** | The definitive blog-for-maps brief: intent bridge + inverted authority, the six highest-leverage local formats, cannibalization control, the "from across the web" prominence mechanism, AI-citation article structure with measured lifts, and the penalty-safe scaled-production system. |
| **[`prompts/06-local-blog-engine-canada-usa.md`](./prompts/06-local-blog-engine-canada-usa.md)** | The missing executable build prompt: populate the already-wired blog engine with penalty-safe local clusters, schema-in-static-HTML, and scheduled publishing — the content half of the prominence machine. |

---

## The 2026 numbers that should drive every decision

### Local Pack ranking weights (BrightLocal/Whitespark)

| Group | Weight | Note |
|---|---|---|
| GBP signals | **~32%** | Primary category is the #1 individual factor |
| **Reviews** | **~20%** | **Recency is now a top-5 factor; recent reviews weighted ~4×** |
| On-page (website) | **~15%** | The city page — an SAB's main controllable lever |
| Behavioral | **~9%** | CTR, calls, directions |
| Links | **~8%** | Local backlinks |
| Citations | **~6%** | 40+ accurate citations → ~53% higher; bad NAP → up to −70% |
| **Distance** | **~15% (falling)** | Down from 25–30% in 2020 — prominence now stretches reach |

**Local organic** (where distant, un-pinnable cities are won): **On-page ~33% · Links ~24%.**

### The facade decision (CWV + cost)

| Map pattern | CWV | Cost (post-March-2025) |
|---|---|---|
| Static Maps image | Best | ~10k free/mo, then ~$2/1k |
| **Facade → interactive on click** ⭐ | **Recommended** | image (or $0 placeholder) + **free** Embed on click |
| Embed iframe | Heavy (`lazy` insufficient) | **Free, unlimited** |
| JS Maps API | Worst (~14% PageSpeed) | **~$7/1k — most expensive** |

> Google removed the flat **$200/mo credit on March 1, 2025**; the **Maps Embed API stays free**.
> The facade gives near-perfect CWV *and* near-$0 cost at thousand-page scale. **Never ship the
> JS Maps API on the matrix.**

### AI search reality for local

- **Only Gemini / Google AI Mode reads Google Maps/GBP directly** (~100% profile accuracy, ~10×
  ChatGPT's local recommendation rate). ChatGPT/Perplexity/AIO **reconstruct from web text**
  (~68% accuracy) and lean on Yelp/BBB/**Reddit**/local media/YouTube.
- **AI bots (GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot) do NOT execute JavaScript.** A
  client-rendered SPA is invisible to them → **static render is a hard gate** (Prompt 00).
- **86% of local-business AI citations come from owned sources** (Yext) — your static, schema-rich
  pages are the asset.
- AI is **~30× more selective** than the local 3-pack (recommends ~1.2% of locations on ChatGPT,
  ~7.4% on Perplexity) **but AI traffic converts ~14.2% vs ~2.8% organic (~5×)** — low volume,
  high intent.
- **`llms.txt`: honest verdict — ship it (cheap, low-risk) but don't rely on it.** Adoption
  ~5–15%, no RFC, Google publicly declined to support it, and citation studies show no measurable
  lift. **Real static HTML + schema is the actual infrastructure.**

### Blog/AI-citation levers (measured)

- **Cost guides** = the #1 single format (answer-first AI magnet + highest pre-hire intent).
- **Listicles** = the most-cited format overall (43.8–63% of AI citations) — but **earn
  third-party placement**, don't self-promote (June-2026 spam update demotes thin best-of pages).
- **44.2% of AI citations come from the first 30% of content** → front-load the answer.
- **FAQ schema:** ~3.2× more likely in AI Overviews; one study 41% vs 15% cited. **Caveat:** schema
  is necessary infrastructure, **not a guaranteed multiplier** (Ahrefs: 1,885 pages, citations
  "barely moved") — stack 3–4 types and let answer-first structure + original data do the work.
- **Original local statistics = +37–41% AI visibility** (the #1 GEO tactic).
- **Freshness:** updated-within-2-months → **+28%** citations; stale 3+ months → **>3×** more
  likely to lose them. Visible "Updated 2026" must match `dateModified`.

### The penalty line (scaled content / doorway)

- 2025–2026 enforcement demoted thin city-page/blog farms **30–60%** (severe 50–80%); recovery
  **~6 months**. Triggers: city-name-swap clones, no local-expertise signals, doorway behavior.
- **Survival bar:** ≥500 unique words, **≥1 verifiable unique data point per page**, 30–40%
  differentiation, **≥4 of 8 local signals**, scheduled (not bursted) publishing, output scaled
  **2–4×, not 40–100×.** **Value-per-page is judged, not page count** — build the fewest pages you
  can make genuinely useful.

---

## The one principle, restated

> **Each location page and each blog spoke must be an independent asset that is genuinely useful
> to a person in that town — statically rendered, schema-rich, answer-first, ≥4 real local
> signals — not a find-and-replace clone that exists only to rank.** The map is UX; the content +
> schema rank. Scale is a liability until each page earns its place.

That single discipline, applied across all of Canada and all US states via one config + a
local-proof sheet, is the difference between a ranking geo-network and a manual action.

---

*Compiled from a fresh 2025–2026 multi-source research pass. Pairs with the six original research
briefs and seven build prompts in this folder. Last updated: 2026-06.*
