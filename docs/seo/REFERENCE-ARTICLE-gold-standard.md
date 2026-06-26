# Gold-Standard Reference Article (worked example)

> A complete, copy-and-adapt model of a #1-targeting blog post, built to the §C blueprint in
> `BLOG-AISEO-MASTERPLAN.md`. This is a **trade-agnostic skeleton**: it shows the exact shape of a
> #1-targeting post using `{SERVICE}` / `{CITY}` / `{REGION}` placeholders and `$[X]` / `[example]`
> data slots that each remix fills with its own real service, geography, prices, author, and cited sources.
> It shows three layers: **(1)** the authoring data object (the `sections[]` model from Prompt C),
> **(2)** the rendered semantic HTML, **(3)** the static JSON-LD. Numbers shown are placeholders marked
> `[example]` — a real remix uses the business's true data and real cited sources. **Never invent stats.**
>
> This is a **spoke** post targeting a high-intent informational + local query
> (`how much does {SERVICE} cost`), engineered to (a) win the paragraph + table featured snippets,
> (b) be cited by AI Overviews/ChatGPT/Perplexity as self-contained passages, and (c) hand the reader to
> the money page (area/service) and convert.

---

## LAYER 1 — THE AUTHORING DATA (sections model → `blogData.ts`)

```ts
{
  slug: "{service-slug}-cost",
  title: "How Much Does {SERVICE_CATEGORY} Cost? (2026 Price Guide by [Job Type])", // ~11 words, primary kw front, year signal
  metaTitle: "{SERVICE_CATEGORY} Cost in 2026: Real Prices by Job | {BRAND_NAME}", // ~58 chars
  metaDescription:
    "{SERVICE_CATEGORY} costs $[X]–$[Y] per [unit] in 2026, depending on [job type] and [size]. See real price ranges, what drives cost, and how to get an exact written quote.", // ~156 chars
  excerpt: "Real 2026 {SERVICE} prices by [job type] — [type 1], [type 2], [type 3], and [type 4] — plus what actually drives the number.",
  category: "{SERVICE_CATEGORY}",
  tags: ["{SERVICE}", "{SERVICE} cost", "[related service]", "{REGION}"],
  featured: false,
  readingTime: 7,
  publishedAt: "2026-06-01",
  modifiedAt: "2026-06-01",
  wordCount: 1640, // spoke band 1,200–1,800
  authorId: "{AUTHOR_ID}", // resolves to a real licensed tradesperson with sameAs/credentials
  about: { regionSlug: "{REGION_SLUG}" }, // closes the Areas↔Blog loop
  tldr: "Most {SERVICE} jobs cost $[X]–$[Y] for a [smaller job] and $[Y]–$[Z] for [larger / more complex jobs] in 2026. The final price depends on [job type], [job size], [finish/match factor], and [whether finishing is included].", // 40–60w self-contained answer
  keyTakeaways: [ // 5–7 quotable, self-contained bullets — prime AI-extraction real estate
    "A [small job] (under [threshold]) typically costs $[X]–$[Y] in 2026. [example]",
    "[Complex job type] costs more — $[Y]–$[Z] — because [the underlying problem] must be fixed first. [example]",
    "[Finish/match work] adds $[X]–$[Y] because it is skilled, slow work.",
    "Most [single-room jobs] are done in one visit; [larger jobs] take [2–3 days] for [the work to set/cure].",
    "A written, itemized quote should separate labour, materials, [finish factor], and [add-on] so you see exactly what you pay for."
  ],
  outline: [ // becomes the anchor-linked TOC
    "How much does {SERVICE} cost in 2026?",
    "What drives the price of a {SERVICE} job?",
    "{SERVICE_CATEGORY} cost by [job type]",
    "How to get an accurate {SERVICE} quote",
    "Frequently asked questions"
  ],
  sections: [
    {
      id: "cost",
      h2: "How much does {SERVICE} cost in 2026?", // question = the exact query
      answer: // 40–60w, self-contained → wins paragraph snippet + AI cite
        "{SERVICE_CATEGORY} costs $[X]–$[Y] for a typical [smaller job] and $[Y]–$[Z] for [larger / more complex jobs] in 2026. Price depends on the [job type], the [job size], whether [the finish must be matched], and whether [finishing] is included. [Smallest jobs] sit at the low end.",
      body:
        "Those ranges cover the vast majority of [residential] jobs in {REGION}. Two things move the number most: how much [work] has to be done, and how hard the existing [finish] is to match. A [simple, ready] job is fast. A [complex job] that has to blend invisibly into [an existing finish] is slow, skilled work — and that time is what you pay for."
    },
    {
      id: "drivers",
      h2: "What drives the price of a {SERVICE} job?",
      answer:
        "Five factors drive {SERVICE} cost: the [size] of the job, the [type] of job (a [simple job] is cheaper than a [complex one]), [finish/match factor], [add-on factor], and access. [The most complex job type] costs the most because [the underlying problem] must be fixed first.",
      list: { // list-snippet target: 5–10 items, one sentence each
        ordered: false,
        items: [
          "[Job size] — a [small job] is fast; a [large job] is a bigger project.",
          "[Job type] — [simple jobs] are cheap; [complex jobs] cost more because of prep.",
          "[Finish/match factor] — [matching the existing finish] adds skilled blending time.",
          "[Add-on factor] — [colour matching / extra work] adds labour and materials.",
          "Access — [high ceilings, tight spaces, awkward locations] slow the work."
        ]
      }
    },
    {
      id: "by-type",
      h2: "{SERVICE_CATEGORY} cost by [job type]",
      answer:
        "Here are typical 2026 {SERVICE} prices by [job type] in {REGION}. A [smallest job] runs $[A]–$[B]; a [small-to-medium job] $[X]–$[Y]; [a complex job] $[Y]–$[Z]; and [full replacement] $[C]–$[D] per [unit] installed and finished.",
      table: { // table-snippet target: real <table>, 3–4 cols × 5–10 rows
        columns: ["[Job type]", "Typical size", "2026 price range [example]", "Time"],
        rows: [
          ["[Job type 1 — smallest]", "[size]", "$[A]–$[B]", "1 visit"],
          ["[Job type 2 — small]", "[size]", "$[X]–$[Y]", "1 visit"],
          ["[Job type 3 — medium]", "[size]", "$[Y]–$[Z]", "1 visit"],
          ["[Job type 4 — complex]", "varies", "$[Y]–$[Z]", "1–3 days"],
          ["[Job type 5 — full replacement]", "per [unit]", "$[C]–$[D]", "2–3 days"]
        ]
      },
      body:
        "[The complex job type] is the widest range because the price depends on [what caused it]. [Doing the visible work without fixing the underlying problem] just hides the issue — and [invites a bigger failure later]. A proper quote prices the job *after* the [root cause] is fixed. [Link an inline stat here, e.g. an authoritative source on the underlying issue.]"
    },
    {
      id: "quote",
      h2: "How do you get an accurate {SERVICE} quote?",
      answer:
        "Send 3–4 clear photos of the [job], a close-up of the [existing finish], and a rough measurement. A good contractor returns a written, itemized quote — separating labour, materials, [finish factor], and [add-on] — usually within 24 hours, with no in-home sales visit required.",
      body:
        "Photos beat a phone description every time: they let the estimator see the [finish], the [size], and the surrounding [surface]. Ask for the quote in writing and itemized — if labour, materials, [finish factor], and [add-on] are bundled into one number, you can't tell what you're paying for or compare fairly."
    }
  ],
  faq: [ // visible Q&A with .faq-question/.faq-answer; feeds AI + voice (no longer a rich result)
    { question: "Is it cheaper to repair or replace [the item]?",
      answer: "For [a job under a given threshold], repairing is almost always cheaper than replacing. Once the job spans [most of a unit] or [the item is too far gone], full replacement is usually the better value because [a large repair] takes as long as replacing it.",
      intent: "informational" },
    { question: "How long does {SERVICE} take to [set / cure / complete]?",
      answer: "[The relevant material/process] needs about [24 hours] between [stages], and most jobs use [2–3 stages]. A small job can be finished in one visit using [a fast method]; a larger job usually spans [2–3 days] so each stage [sets / cures] fully.",
      intent: "informational" },
    { question: "Do you [finish/match the work to the existing surface]?",
      answer: "Yes. [Finish type 1], [finish type 2], and [finish type 3] are all matched so the work disappears into the surrounding [surface]. [Finish matching] adds $[X]–$[Y] because it is skilled, slow work — but it is the difference between an invisible result and an obvious patch.",
      intent: "local" }
  ],
  citations: [ // 5–8 hyperlinked external stats on pillars; spokes carry the relevant few
    { label: "[Authoritative guidance on the underlying issue]", url: "https://[authoritative-source]", publisher: "[Source]", year: 2026 },
    { label: "National [trade] cost data", url: "https://[authoritative-source]", publisher: "[Source]", year: 2026 }
  ],
  hubGovernance: {
    hubId: "H1", hubName: "{SERVICE_CATEGORY}", hubSlug: "{service-slug}",
    postType: "spoke",
    internalLinks: { // spoke → hub + 2 adjacent spokes + 1 area/service page (≥4 for a spoke)
      hub: "/blog/{service-slug}",
      pillar: "/blog/{service-slug}/complete-guide",
      servicePages: ["/areas-we-serve/{REGION_SLUG}"],
      relatedPosts: ["/blog/{service-slug}/[related-spoke-1]", "/blog/{service-slug}/[related-spoke-2]"]
    },
    refreshCadence: "6months", // seasonal/price content — refresh before peak
    cannibalizationRisk: "low"
  }
}
```

---

## LAYER 2 — THE RENDERED SEMANTIC HTML (what ships in the static file)

```html
<main id="main">
  <article>
    <nav aria-label="Breadcrumb">
      <a href="/blog">Blog</a> / <a href="/blog/{service-slug}">{SERVICE_CATEGORY}</a> /
      <span>How Much Does {SERVICE_CATEGORY} Cost?</span>
    </nav>

    <p class="eyebrow">{SERVICE_CATEGORY}</p>
    <h1>How Much Does {SERVICE_CATEGORY} Cost? (2026 Price Guide by [Job Type])</h1>

    <p class="byline">
      By <a href="/authors/{author-slug}">{Author Name}, {Author Role}</a> ·
      Updated <time datetime="2026-06-01">June 2026</time> · 7 min read
    </p>

    <p class="tldr">Most {SERVICE} jobs cost $[X]–$[Y] for a [smaller job] and $[Y]–$[Z]
      for [larger / more complex jobs] in 2026. The final price depends on [job type], [job size],
      [finish/match factor], and [add-on].</p>

    <section aria-label="Key takeaways">
      <h2>Key takeaways</h2>
      <ul>
        <li>A [small job] (under [threshold]) typically costs $[X]–$[Y] in 2026.</li>
        <li>[Complex job type] costs more — $[Y]–$[Z] — because [the underlying problem] must be fixed first.</li>
        <li>[Finish/match work] adds $[X]–$[Y].</li>
        <li>Most [single-room jobs] are done in one visit; [larger jobs] take [2–3 days].</li>
        <li>A written, itemized quote separates labour, materials, [finish factor], and [add-on].</li>
      </ul>
    </section>

    <figure>
      <img src="/remix/{service-slug}/{service-slug}-{city-slug}-before.avif"
           alt="[The completed {SERVICE} work, ready for the next stage] in a {REGION} home"
           width="1200" height="800" loading="eager" fetchpriority="high" />
      <figcaption>A [typical {SERVICE} job], [in progress / partway through], before [final finishing].</figcaption>
    </figure>

    <nav aria-label="On this page">
      <ol>
        <li><a href="#cost">How much does {SERVICE} cost in 2026?</a></li>
        <li><a href="#drivers">What drives the price of a {SERVICE} job?</a></li>
        <li><a href="#by-type">{SERVICE_CATEGORY} cost by [job type]</a></li>
        <li><a href="#quote">How to get an accurate {SERVICE} quote</a></li>
      </ol>
    </nav>

    <section>
      <h2 id="cost">How much does {SERVICE} cost in 2026?</h2>
      <p>{SERVICE_CATEGORY} costs $[X]–$[Y] for a typical [smaller job] and $[Y]–$[Z] for [larger
         or more complex jobs] in 2026. Price depends on the [job type], the [job size], whether
         [the finish must be matched], and whether [finishing] is included. [Smallest jobs] sit
         at the low end.</p>
      <p>Those ranges cover the vast majority of [residential] jobs in {REGION}. Two things move the
         number most: how much [work] has to be done, and how hard the existing [finish] is to match.</p>
    </section>

    <section>
      <h2 id="drivers">What drives the price of a {SERVICE} job?</h2>
      <p>Five factors drive {SERVICE} cost: the [size] of the job, the [type] of job, [finish/match
         factor], [add-on], and access. [The most complex job type] costs the most because [the
         underlying problem] must be fixed before the work is closed out.</p>
      <ul>
        <li>[Job size] — a [small job] is fast; a [large job] is a bigger project.</li>
        <li>[Job type] — [simple jobs] are cheap; [complex jobs] cost more.</li>
        <li>[Finish/match factor] — [matching the existing finish] adds skilled blending time.</li>
        <li>[Add-on] — [colour matching / extra work] adds labour and materials.</li>
        <li>Access — [high ceilings, tight spaces, awkward locations] slow the work.</li>
      </ul>
    </section>

    <section>
      <h2 id="by-type">{SERVICE_CATEGORY} cost by [job type]</h2>
      <p>Here are typical 2026 {SERVICE} prices by [job type] in {REGION}. A [smallest job]
         runs $[A]–$[B]; a [small-to-medium job] $[X]–$[Y]; [a complex job] $[Y]–$[Z];
         and [full replacement] $[C]–$[D] per [unit] installed and finished.</p>
      <table>
        <thead><tr><th>[Job type]</th><th>Typical size</th><th>2026 price range</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>[Job type 1 — smallest]</td><td>[size]</td><td>$[A]–$[B]</td><td>1 visit</td></tr>
          <tr><td>[Job type 2 — small]</td><td>[size]</td><td>$[X]–$[Y]</td><td>1 visit</td></tr>
          <tr><td>[Job type 3 — medium]</td><td>[size]</td><td>$[Y]–$[Z]</td><td>1 visit</td></tr>
          <tr><td>[Job type 4 — complex]</td><td>varies</td><td>$[Y]–$[Z]</td><td>1–3 days</td></tr>
          <tr><td>[Job type 5 — full replacement]</td><td>per [unit]</td><td>$[C]–$[D]</td><td>2–3 days</td></tr>
        </tbody>
      </table>
      <p>[The complex job type] is the widest range because the price depends on the cause. [Doing the
         visible work without fixing the underlying problem invites a bigger failure later], per
         <a href="https://[source]" rel="noopener">[authoritative source]</a>. A proper quote prices
         the job after the [root cause] is fixed.</p>
    </section>

    <section>
      <h2 id="quote">How do you get an accurate {SERVICE} quote?</h2>
      <p>Send 3–4 clear photos of the [job], a close-up of the [existing finish], and a rough measurement.
         A good contractor returns a written, itemized quote — separating labour, materials, [finish factor],
         and [add-on] — usually within 24 hours, with no in-home sales visit required.</p>
    </section>

    <section>
      <h2>Frequently asked questions</h2>
      <div>
        <h3 class="faq-question">Is it cheaper to repair or replace [the item]?</h3>
        <p class="faq-answer">For [a job under a given threshold], repairing is almost always cheaper than
          replacing. Once the job spans [most of a unit] or [the item is too far gone], full
          replacement is usually the better value.</p>
      </div>
      <div>
        <h3 class="faq-question">How long does {SERVICE} take to [set / cure / complete]?</h3>
        <p class="faq-answer">[The relevant material/process] needs about [24 hours] between [stages], and
          most jobs use [2–3 stages]. A small job can be finished in one visit with [a fast method]; larger
          jobs span [2–3 days].</p>
      </div>
      <div>
        <h3 class="faq-question">Do you [finish/match the work to the existing surface]?</h3>
        <p class="faq-answer">Yes. [Finish type 1], [finish type 2], and [finish type 3] are all matched so the
          work disappears. [Finish matching] adds $[X]–$[Y].</p>
      </div>
    </section>

    <!-- GEO BRIDGE — closes the Areas↔Blog loop -->
    <aside>
      <p class="eyebrow">Serving</p>
      <p>{Region Name}</p>
      <a href="/areas-we-serve/{REGION_SLUG}">See {SERVICE} we do across {Region Name} →</a>
    </aside>

    <!-- AUTHOR E-E-A-T -->
    <section class="author-bio">
      <img src="/authors/{author-slug}.avif" alt="{Author Name}, {Author Role}" width="96" height="96" />
      <p><a href="/authors/{author-slug}">{Author Name}</a> — {Author Role}, {N} years [doing this work]
         across {REGION}. Certified in {credential}.</p>
    </section>

    <!-- SOURCES -->
    <section>
      <h2>Sources</h2>
      <ol>
        <li><a href="https://[source]" rel="noopener">[Authoritative guidance on the underlying issue], [Source] (2026)</a></li>
        <li><a href="https://[source]" rel="noopener">[National trade cost data], [Source] (2026)</a></li>
      </ol>
    </section>
  </article>

  <!-- ONE first-person, outcome-named CTA -->
  <section class="conversion-bar">
    <h2>Get your exact {SERVICE} quote</h2>
    <p>Send 3–4 photos — get a written, itemized quote within 24 hours. No sales visit, no obligation.</p>
    <a href="/#book">Get my free quote</a>
  </section>
</main>
```

---

## LAYER 3 — THE STATIC JSON-LD (in the served HTML, not useEffect)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BlogPosting",
      "@id": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost#article",
      "headline": "How Much Does {SERVICE_CATEGORY} Cost? (2026 Price Guide by [Job Type])",
      "description": "{SERVICE_CATEGORY} costs $[X]–$[Y] per [unit] in 2026, depending on [job type] and [size]...",
      "url": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost",
      "datePublished": "2026-06-01",
      "dateModified": "2026-06-01",
      "wordCount": 1640,
      "inLanguage": "en",
      "isPartOf": { "@id": "/#website" },
      "publisher": { "@id": "/#organization" },
      "mainEntityOfPage": { "@id": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost#webpage" },
      "author": { "@id": "https://{brand}.ca/authors/{author-slug}#person" },
      "image": {
        "@type": "ImageObject",
        "url": "https://{brand}.ca/remix/{service-slug}/{service-slug}-{city-slug}-before.avif",
        "width": 1200, "height": 800,
        "caption": "A [typical {SERVICE} job], [in progress / partway through], before [final finishing].",
        "creator": { "@id": "/#organization" }
      },
      "keywords": "{SERVICE}, {SERVICE} cost, [related service], {REGION}",
      "articleSection": "{SERVICE_CATEGORY}",
      "citation": [
        "https://[authoritative-source-1]",
        "https://[authoritative-source-2]"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://{brand}.ca/authors/{author-slug}#person",
      "name": "{Author Name}",
      "url": "https://{brand}.ca/authors/{author-slug}",
      "image": "https://{brand}.ca/authors/{author-slug}.avif",
      "jobTitle": "{Author Role}",
      "worksFor": { "@id": "/#organization" },
      "description": "{N} years [doing this work] across {REGION}.",
      "knowsAbout": ["{service skill 1}", "{service skill 2}", "{service skill 3}", "{service skill 4}"],
      "hasCredential": ["{Trade certification}", "{insurance/coverage}"],
      "sameAs": ["https://www.linkedin.com/in/{author}", "https://www.wikidata.org/wiki/{id-if-any}"]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://{brand}.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://{brand}.ca/blog" },
        { "@type": "ListItem", "position": 3, "name": "{SERVICE_CATEGORY}", "item": "https://{brand}.ca/blog/{service-slug}" },
        { "@type": "ListItem", "position": 4, "name": "How Much Does {SERVICE_CATEGORY} Cost?", "item": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://{brand}.ca/blog/{service-slug}/{service-slug}-cost#faq",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".faq-question", ".faq-answer"] },
      "mainEntity": [
        { "@type": "Question", "name": "Is it cheaper to repair or replace [the item]?",
          "acceptedAnswer": { "@type": "Answer", "text": "For [a job under a given threshold], repairing is almost always cheaper..." } },
        { "@type": "Question", "name": "How long does {SERVICE} take to [set / cure / complete]?",
          "acceptedAnswer": { "@type": "Answer", "text": "[The relevant material/process] needs about [24 hours] between [stages]..." } },
        { "@type": "Question", "name": "Do you [finish/match the work to the existing surface]?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. [Finish type 1], [finish type 2], and [finish type 3] are all matched..." } }
      ]
    }
  ]
}
</script>
```

---

## WHY THIS RANKS AND GETS CITED (the checklist this example satisfies)

- ✅ **One `<h1>`**, ~11-word title, primary keyword front, **2026 year signal**.
- ✅ **Every `<h2>` is a real query**; each opens with a **40–60w self-contained answer** (paragraph-snippet + AI-passage target).
- ✅ **Real list + real `<table>`** (list-snippet + table-snippet targets).
- ✅ **TL;DR + Key-takeaways** (quotable AI-extraction blocks).
- ✅ **FAQ** with `.faq-question`/`.faq-answer` resolving the `speakable` selectors (AI + voice).
- ✅ **Outbound citations** hyperlinked + a **Sources** section + `citation` in schema.
- ✅ **Author entity**: full `Person` with `url` → crawlable author page, `sameAs`, `knowsAbout`, `hasCredential`, `worksFor`.
- ✅ **Image**: descriptive filename, alt + caption + surrounding text aligned, `ImageObject` schema, AVIF, `fetchpriority`.
- ✅ **Internal links**: hub + pillar + 2 adjacent spokes + 1 area page (≥4 for a spoke).
- ✅ **Geo bridge** to the area page + **one first-person outcome CTA**.
- ✅ **Schema stack** (BlogPosting + Person + BreadcrumbList + FAQPage) **in static HTML**, entity-linked by `@id`.
- ✅ **Reading grade 6–8**, in-band word count, self-contained passages, no "as above" dependencies.
- ✅ **Local specificity** ({REGION}, {CITY}, real job detail) = the Experience signal that beats AI-commodity content.

> Adapt this exact shape per remix: swap the trade, the prices (real, never invented), the region, the author (real, with a real `sameAs`), and the cited sources. Every spoke in every cluster should pass the checklist above before it ships.
