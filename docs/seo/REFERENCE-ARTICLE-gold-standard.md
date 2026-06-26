# Gold-Standard Reference Article (worked example)

> A complete, copy-and-adapt model of a #1-targeting blog post, built to the §C blueprint in
> `BLOG-AISEO-MASTERPLAN.md`. Trade used for the example: **drywall** (matches the repo's component set).
> It shows three layers: **(1)** the authoring data object (the `sections[]` model from Prompt C),
> **(2)** the rendered semantic HTML, **(3)** the static JSON-LD. Numbers shown are placeholders marked
> `[example]` — a real remix uses the business's true data and real cited sources. **Never invent stats.**
>
> This is a **spoke** post targeting a high-intent informational + local query
> (`how much does drywall repair cost`), engineered to (a) win the paragraph + table featured snippets,
> (b) be cited by AI Overviews/ChatGPT/Perplexity as self-contained passages, and (c) hand the reader to
> the money page (area/service) and convert.

---

## LAYER 1 — THE AUTHORING DATA (sections model → `blogData.ts`)

```ts
{
  slug: "drywall-repair-cost",
  title: "How Much Does Drywall Repair Cost? (2026 Price Guide by Damage Type)", // 11 words, primary kw front, year signal
  metaTitle: "Drywall Repair Cost in 2026: Real Prices by Job | {BRAND_NAME}", // 58 chars
  metaDescription:
    "Drywall repair costs $[X]–$[Y] per patch in 2026, depending on damage type and size. See real price ranges, what drives cost, and how to get an exact written quote.", // 156 chars
  excerpt: "Real 2026 drywall repair prices by damage type — holes, cracks, water damage, and full sheet replacement — plus what actually drives the number.",
  category: "Drywall Repair",
  tags: ["drywall repair", "drywall cost", "wall repair", "{REGION}"],
  featured: false,
  readingTime: 7,
  publishedAt: "2026-06-01",
  modifiedAt: "2026-06-01",
  wordCount: 1640, // spoke band 1,200–1,800
  authorId: "{AUTHOR_ID}", // resolves to a real licensed tradesperson with sameAs/credentials
  about: { regionSlug: "{REGION_SLUG}" }, // closes the Areas↔Blog loop
  tldr: "Most drywall repairs cost $[150]–$[400] for a single patch and $[400]–$[1,200] for larger or water-damaged areas in 2026. The final price depends on damage type, patch size, texture matching, and paint.", // 40–60w self-contained answer
  keyTakeaways: [ // 5–7 quotable, self-contained bullets — prime AI-extraction real estate
    "A small drywall hole (under 6 inches) typically costs $[150]–$[250] to repair in 2026. [example]",
    "Water-damaged drywall costs more — $[400]–$[1,200] — because the source leak and any mold must be fixed first. [example]",
    "Texture matching (knockdown, orange peel) adds $[50]–$[150] because it is skilled, slow work.",
    "Most single-room repairs are done in one visit; whole-wall replacement takes 2–3 days for mud to cure.",
    "A written, itemized quote should separate labour, materials, texture, and paint so you see exactly what you pay for."
  ],
  outline: [ // becomes the anchor-linked TOC
    "How much does drywall repair cost in 2026?",
    "What drives the price of a drywall repair?",
    "Drywall repair cost by damage type",
    "How to get an accurate drywall repair quote",
    "Frequently asked questions"
  ],
  sections: [
    {
      id: "cost",
      h2: "How much does drywall repair cost in 2026?", // question = the exact query
      answer: // 40–60w, self-contained → wins paragraph snippet + AI cite
        "Drywall repair costs $[150]–$[400] for a typical single patch and $[400]–$[1,200] for larger or water-damaged sections in 2026. Price depends on the damage type, the patch size, whether the texture must be matched, and whether painting is included. Small dents and nail holes sit at the low end.",
      body:
        "Those ranges cover the vast majority of residential jobs in {REGION}. Two things move the number most: how much wall has to be rebuilt, and how hard the existing finish is to match. A flat, paint-ready wall is fast. A textured ceiling that has to blend invisibly into 20-year-old knockdown is slow, skilled work — and that time is what you pay for."
    },
    {
      id: "drivers",
      h2: "What drives the price of a drywall repair?",
      answer:
        "Five factors drive drywall repair cost: the size of the damage, the type of damage (a clean hole is cheaper than water or smoke damage), texture matching, paint, and access. Water damage costs the most because the leak and any mold must be fixed before the wall is closed.",
      list: { // list-snippet target: 5–10 items, one sentence each
        ordered: false,
        items: [
          "Damage size — a 4-inch hole is a fast patch; a 4-foot section is a rebuild.",
          "Damage type — clean holes are cheap; water, smoke, and mold cost more because of prep.",
          "Texture matching — knockdown and orange peel add skilled blending time.",
          "Paint — colour matching and a full wall repaint add labour and materials.",
          "Access — high ceilings, stairwells, and tight rooms slow the work."
        ]
      }
    },
    {
      id: "by-type",
      h2: "Drywall repair cost by damage type",
      answer:
        "Here are typical 2026 drywall repair prices by damage type in {REGION}. A nail-hole or hairline crack runs $[100]–$[200]; a small-to-medium hole $[150]–$[400]; water damage $[400]–$[1,200]; and full sheet replacement $[300]–$[800] per sheet installed, taped, and finished.",
      table: { // table-snippet target: real <table>, 3–4 cols × 5–10 rows
        columns: ["Damage type", "Typical size", "2026 price range [example]", "Time"],
        rows: [
          ["Nail holes / hairline cracks", "< 1 in", "$[100]–$[200]", "1 visit"],
          ["Small hole / doorknob ding", "1–6 in", "$[150]–$[250]", "1 visit"],
          ["Medium hole", "6–12 in", "$[250]–$[400]", "1 visit"],
          ["Water-damaged section", "varies", "$[400]–$[1,200]", "1–3 days"],
          ["Full sheet replacement", "per 4×8 sheet", "$[300]–$[800]", "2–3 days"]
        ]
      },
      body:
        "Water damage is the widest range because the price depends on what caused it. Closing a wet wall without fixing the leak just hides the problem — and invites mold. A proper quote prices the repair *after* the source is fixed. [Link an inline stat here, e.g. a building-science source on moisture and mold.]"
    },
    {
      id: "quote",
      h2: "How do you get an accurate drywall repair quote?",
      answer:
        "Send 3–4 clear photos of the damage, a close-up of the wall texture, and a rough measurement. A good contractor returns a written, itemized quote — separating labour, materials, texture, and paint — usually within 24 hours, with no in-home sales visit required.",
      body:
        "Photos beat a phone description every time: they let the estimator see the texture, the size, and the surrounding finish. Ask for the quote in writing and itemized — if labour, materials, texture, and paint are bundled into one number, you can't tell what you're paying for or compare fairly."
    }
  ],
  faq: [ // visible Q&A with .faq-question/.faq-answer; feeds AI + voice (no longer a rich result)
    { question: "Is it cheaper to repair or replace drywall?",
      answer: "For damage under about 12 inches, repairing is almost always cheaper than replacing the sheet. Once damage spans most of a sheet or the drywall is water-soaked, full replacement is usually the better value because patching a large area takes as long as replacing it.",
      intent: "informational" },
    { question: "How long does drywall repair take to dry?",
      answer: "Drywall compound (mud) needs about 24 hours between coats, and most repairs use 2–3 coats. A small patch can be finished and painted in one visit using fast-set compound; a larger repair usually spans 2–3 days so each coat cures fully.",
      intent: "informational" },
    { question: "Do you match existing wall texture?",
      answer: "Yes. Knockdown, orange peel, and smooth finishes are all matched so the repair disappears into the surrounding wall. Texture matching adds $[50]–$[150] because it is skilled, slow work — but it is the difference between an invisible repair and an obvious patch.",
      intent: "local" }
  ],
  citations: [ // 5–8 hyperlinked external stats on pillars; spokes carry the relevant few
    { label: "Building-science guidance on drywall moisture and mold", url: "https://[authoritative-source]", publisher: "[Source]", year: 2026 },
    { label: "National remodeling cost data", url: "https://[authoritative-source]", publisher: "[Source]", year: 2026 }
  ],
  hubGovernance: {
    hubId: "H1", hubName: "Drywall Repair", hubSlug: "drywall-repair",
    postType: "spoke",
    internalLinks: { // spoke → hub + 2 adjacent spokes + 1 area/service page (≥4 for a spoke)
      hub: "/blog/drywall-repair",
      pillar: "/blog/drywall-repair/complete-guide",
      servicePages: ["/areas-we-serve/{REGION_SLUG}"],
      relatedPosts: ["/blog/drywall-repair/water-damage", "/blog/drywall-repair/patch-vs-replace"]
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
      <a href="/blog">Blog</a> / <a href="/blog/drywall-repair">Drywall Repair</a> /
      <span>How Much Does Drywall Repair Cost?</span>
    </nav>

    <p class="eyebrow">Drywall Repair</p>
    <h1>How Much Does Drywall Repair Cost? (2026 Price Guide by Damage Type)</h1>

    <p class="byline">
      By <a href="/authors/{author-slug}">{Author Name}, {Licensed Drywall Finisher}</a> ·
      Updated <time datetime="2026-06-01">June 2026</time> · 7 min read
    </p>

    <p class="tldr">Most drywall repairs cost $[150]–$[400] for a single patch and $[400]–$[1,200]
      for larger or water-damaged areas in 2026. The final price depends on damage type, patch size,
      texture matching, and paint.</p>

    <section aria-label="Key takeaways">
      <h2>Key takeaways</h2>
      <ul>
        <li>A small drywall hole (under 6 inches) typically costs $[150]–$[250] to repair in 2026.</li>
        <li>Water-damaged drywall costs more — $[400]–$[1,200] — because the leak and any mold must be fixed first.</li>
        <li>Texture matching (knockdown, orange peel) adds $[50]–$[150].</li>
        <li>Most single-room repairs are done in one visit; whole-wall replacement takes 2–3 days.</li>
        <li>A written, itemized quote separates labour, materials, texture, and paint.</li>
      </ul>
    </section>

    <figure>
      <img src="/remix/cochrane-drywall/drywall-repair-cochrane-patch-before.avif"
           alt="Patched and sanded drywall hole ready for primer in a {REGION} home"
           width="1200" height="800" loading="eager" fetchpriority="high" />
      <figcaption>A 6-inch drywall patch, taped and sanded, before texture matching and paint.</figcaption>
    </figure>

    <nav aria-label="On this page">
      <ol>
        <li><a href="#cost">How much does drywall repair cost in 2026?</a></li>
        <li><a href="#drivers">What drives the price of a drywall repair?</a></li>
        <li><a href="#by-type">Drywall repair cost by damage type</a></li>
        <li><a href="#quote">How to get an accurate drywall repair quote</a></li>
      </ol>
    </nav>

    <section>
      <h2 id="cost">How much does drywall repair cost in 2026?</h2>
      <p>Drywall repair costs $[150]–$[400] for a typical single patch and $[400]–$[1,200] for larger
         or water-damaged sections in 2026. Price depends on the damage type, the patch size, whether
         the texture must be matched, and whether painting is included. Small dents and nail holes sit
         at the low end.</p>
      <p>Those ranges cover the vast majority of residential jobs in {REGION}. Two things move the
         number most: how much wall has to be rebuilt, and how hard the existing finish is to match.</p>
    </section>

    <section>
      <h2 id="drivers">What drives the price of a drywall repair?</h2>
      <p>Five factors drive drywall repair cost: the size of the damage, the type of damage, texture
         matching, paint, and access. Water damage costs the most because the leak and any mold must
         be fixed before the wall is closed.</p>
      <ul>
        <li>Damage size — a 4-inch hole is a fast patch; a 4-foot section is a rebuild.</li>
        <li>Damage type — clean holes are cheap; water, smoke, and mold cost more.</li>
        <li>Texture matching — knockdown and orange peel add skilled blending time.</li>
        <li>Paint — colour matching and a full repaint add labour and materials.</li>
        <li>Access — high ceilings, stairwells, and tight rooms slow the work.</li>
      </ul>
    </section>

    <section>
      <h2 id="by-type">Drywall repair cost by damage type</h2>
      <p>Here are typical 2026 drywall repair prices by damage type in {REGION}. A nail-hole or hairline
         crack runs $[100]–$[200]; a small-to-medium hole $[150]–$[400]; water damage $[400]–$[1,200];
         and full sheet replacement $[300]–$[800] per sheet installed, taped, and finished.</p>
      <table>
        <thead><tr><th>Damage type</th><th>Typical size</th><th>2026 price range</th><th>Time</th></tr></thead>
        <tbody>
          <tr><td>Nail holes / hairline cracks</td><td>&lt; 1 in</td><td>$[100]–$[200]</td><td>1 visit</td></tr>
          <tr><td>Small hole / doorknob ding</td><td>1–6 in</td><td>$[150]–$[250]</td><td>1 visit</td></tr>
          <tr><td>Medium hole</td><td>6–12 in</td><td>$[250]–$[400]</td><td>1 visit</td></tr>
          <tr><td>Water-damaged section</td><td>varies</td><td>$[400]–$[1,200]</td><td>1–3 days</td></tr>
          <tr><td>Full sheet replacement</td><td>per 4×8 sheet</td><td>$[300]–$[800]</td><td>2–3 days</td></tr>
        </tbody>
      </table>
      <p>Water damage is the widest range because the price depends on the cause. Closing a wet wall
         without fixing the leak invites mold, per <a href="https://[source]" rel="noopener">[building-science
         source]</a>. A proper quote prices the repair after the source is fixed.</p>
    </section>

    <section>
      <h2 id="quote">How do you get an accurate drywall repair quote?</h2>
      <p>Send 3–4 clear photos of the damage, a close-up of the wall texture, and a rough measurement.
         A good contractor returns a written, itemized quote — separating labour, materials, texture,
         and paint — usually within 24 hours, with no in-home sales visit required.</p>
    </section>

    <section>
      <h2>Frequently asked questions</h2>
      <div>
        <h3 class="faq-question">Is it cheaper to repair or replace drywall?</h3>
        <p class="faq-answer">For damage under about 12 inches, repairing is almost always cheaper than
          replacing the sheet. Once damage spans most of a sheet or the drywall is water-soaked, full
          replacement is usually the better value.</p>
      </div>
      <div>
        <h3 class="faq-question">How long does drywall repair take to dry?</h3>
        <p class="faq-answer">Drywall compound needs about 24 hours between coats, and most repairs use
          2–3 coats. A small patch can be finished in one visit with fast-set compound; larger repairs
          span 2–3 days.</p>
      </div>
      <div>
        <h3 class="faq-question">Do you match existing wall texture?</h3>
        <p class="faq-answer">Yes. Knockdown, orange peel, and smooth finishes are all matched so the
          repair disappears. Texture matching adds $[50]–$[150].</p>
      </div>
    </section>

    <!-- GEO BRIDGE — closes the Areas↔Blog loop -->
    <aside>
      <p class="eyebrow">Serving</p>
      <p>{Region Name}</p>
      <a href="/areas-we-serve/{REGION_SLUG}">See drywall repair we do across {Region Name} →</a>
    </aside>

    <!-- AUTHOR E-E-A-T -->
    <section class="author-bio">
      <img src="/authors/{author-slug}.avif" alt="{Author Name}, licensed drywall finisher" width="96" height="96" />
      <p><a href="/authors/{author-slug}">{Author Name}</a> — {Licensed Drywall Finisher}, {N} years finishing
         walls across {REGION}. Certified in {credential}.</p>
    </section>

    <!-- SOURCES -->
    <section>
      <h2>Sources</h2>
      <ol>
        <li><a href="https://[source]" rel="noopener">[Building-science guidance on drywall moisture], [Source] (2026)</a></li>
        <li><a href="https://[source]" rel="noopener">[National remodeling cost data], [Source] (2026)</a></li>
      </ol>
    </section>
  </article>

  <!-- ONE first-person, outcome-named CTA -->
  <section class="conversion-bar">
    <h2>Get your exact drywall repair quote</h2>
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
      "@id": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost#article",
      "headline": "How Much Does Drywall Repair Cost? (2026 Price Guide by Damage Type)",
      "description": "Drywall repair costs $[X]–$[Y] per patch in 2026, depending on damage type and size...",
      "url": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost",
      "datePublished": "2026-06-01",
      "dateModified": "2026-06-01",
      "wordCount": 1640,
      "inLanguage": "en",
      "isPartOf": { "@id": "/#website" },
      "publisher": { "@id": "/#organization" },
      "mainEntityOfPage": { "@id": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost#webpage" },
      "author": { "@id": "https://{brand}.ca/authors/{author-slug}#person" },
      "image": {
        "@type": "ImageObject",
        "url": "https://{brand}.ca/remix/cochrane-drywall/drywall-repair-cochrane-patch-before.avif",
        "width": 1200, "height": 800,
        "caption": "A 6-inch drywall patch, taped and sanded, before texture matching and paint.",
        "creator": { "@id": "/#organization" }
      },
      "keywords": "drywall repair, drywall cost, wall repair, {REGION}",
      "articleSection": "Drywall Repair",
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
      "jobTitle": "Licensed Drywall Finisher",
      "worksFor": { "@id": "/#organization" },
      "description": "{N} years finishing drywall across {REGION}.",
      "knowsAbout": ["drywall repair", "texture matching", "Level 5 finishing", "water damage repair"],
      "hasCredential": ["{Trade certification}", "WCB coverage"],
      "sameAs": ["https://www.linkedin.com/in/{author}", "https://www.wikidata.org/wiki/{id-if-any}"]
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost#breadcrumb",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://{brand}.ca/" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://{brand}.ca/blog" },
        { "@type": "ListItem", "position": 3, "name": "Drywall Repair", "item": "https://{brand}.ca/blog/drywall-repair" },
        { "@type": "ListItem", "position": 4, "name": "How Much Does Drywall Repair Cost?", "item": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost" }
      ]
    },
    {
      "@type": "FAQPage",
      "@id": "https://{brand}.ca/blog/drywall-repair/drywall-repair-cost#faq",
      "speakable": { "@type": "SpeakableSpecification", "cssSelector": [".faq-question", ".faq-answer"] },
      "mainEntity": [
        { "@type": "Question", "name": "Is it cheaper to repair or replace drywall?",
          "acceptedAnswer": { "@type": "Answer", "text": "For damage under about 12 inches, repairing is almost always cheaper..." } },
        { "@type": "Question", "name": "How long does drywall repair take to dry?",
          "acceptedAnswer": { "@type": "Answer", "text": "Drywall compound needs about 24 hours between coats..." } },
        { "@type": "Question", "name": "Do you match existing wall texture?",
          "acceptedAnswer": { "@type": "Answer", "text": "Yes. Knockdown, orange peel, and smooth finishes are all matched..." } }
      ]
    }
  ]
}
</script>
```

---

## WHY THIS RANKS AND GETS CITED (the checklist this example satisfies)

- ✅ **One `<h1>`**, 11-word title, primary keyword front, **2026 year signal**.
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
- ✅ **Local specificity** ({REGION}, texture matching, real job detail) = the Experience signal that beats AI-commodity content.

> Adapt this exact shape per remix: swap the trade, the prices (real, never invented), the region, the author (real, with a real `sameAs`), and the cited sources. Every spoke in every cluster should pass the checklist above before it ships.
