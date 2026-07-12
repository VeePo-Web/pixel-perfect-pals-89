// Emit per-page JSON-LD @graph (static, token-preserving) for all rows, a sample static HTML page,
// a segmented sitemap, and robots.txt.
const fs = require('fs');
const OUT = __dirname + '\\..\\deliver';
const rows = [];
for (const f of fs.readdirSync(__dirname + '\\batches-out').filter(f => f.endsWith('.jsonl')))
  for (const l of fs.readFileSync(__dirname + '\\batches-out\\' + f, 'utf8').split(/\r?\n/).filter(x => x.trim()))
    rows.push(JSON.parse(l));
rows.sort((a, b) => a.id < b.id ? -1 : 1);
const inputs = {};
for (const f of fs.readdirSync(__dirname + '\\batches-in').filter(f => f.endsWith('.json')))
  for (const r of JSON.parse(fs.readFileSync(__dirname + '\\batches-in\\' + f, 'utf8')).rows) inputs[r.id] = r;
const geoRadius = pop => pop >= 100000 ? 20000 : pop >= 20000 ? 12000 : pop >= 5000 ? 8000 : 6000;

function graph(r) {
  const inp = inputs[r.id] || {};
  const url = `{BRAND_URL}/areas/${r.slug}`;
  const nearCities = r.nearbySlugs.map(s => ({ '@type': 'City', name: s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': '{LOCALBUSINESS_TYPE}', '@id': '{BRAND_URL}#business', name: '{COMPANY_NAME}', url: '{BRAND_URL}',
        telephone: '{PHONE}', image: '{BRAND_URL}/img/{COMPANY_SHORT}.png', priceRange: '{PRICE_RANGE}',
        address: { '@type': 'PostalAddress', addressRegion: 'ON', addressCountry: 'CA' },
        areaServed: { '@type': 'State', name: 'Ontario' },
        sameAs: ['{BRAND_URL}'] },
      { '@type': 'Service', '@id': `${url}#service`, serviceType: '{SERVICE_CATEGORY}',
        name: `{SERVICE_CATEGORY} in ${r.name}`, provider: { '@id': '{BRAND_URL}#business' },
        areaServed: [ { '@type': 'City', name: `${r.name}`, address: { '@type': 'PostalAddress', addressLocality: r.name, addressRegion: 'ON', addressCountry: 'CA' } }, ...nearCities,
          { '@type': 'GeoCircle', geoMidpoint: { '@type': 'GeoCoordinates', latitude: inp.lat, longitude: inp.lng }, geoRadius: String(geoRadius(inp.pop2021 || 0)) } ] },
      { '@type': 'WebPage', '@id': `${url}#page`, url, name: r.h1.replace('{SERVICE}', '{SERVICE}'),
        isPartOf: { '@id': '{BRAND_URL}#website' }, primaryImageOfPage: { '@id': `${url}#primaryimage` },
        dateModified: '2026-07-10', speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.answer-first'] } },
      { '@type': 'ImageObject', '@id': `${url}#primaryimage`, contentUrl: `{BRAND_URL}/img/areas/${r.imageFilename}`,
        name: r.imageAltGeo, caption: r.imageAltGeo, contentLocation: { '@type': 'Place', name: `${r.name}, Ontario` } },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: '{BRAND_URL}' },
        { '@type': 'ListItem', position: 2, name: 'Areas We Serve', item: '{BRAND_URL}/areas' },
        { '@type': 'ListItem', position: 3, name: r.region, item: `{BRAND_URL}/areas/region/${r.region.toLowerCase().replace(/[^a-z0-9]+/g, '-')}` },
        { '@type': 'ListItem', position: 4, name: r.name, item: url } ] },
      { '@type': 'FAQPage', mainEntity: r.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    ],
  };
}

// 1) all-pages schema file (JSONL of {slug, graph})
const schemaLines = rows.map(r => JSON.stringify({ slug: r.slug, jsonld: graph(r) }));
fs.writeFileSync(OUT + '\\jsonld-graphs.jsonl', schemaLines.join('\n'));

// 2) sample static HTML page for Toronto (proves static-render: H1 + body + <a href> + ld+json all in initial HTML)
const t = rows.find(r => r.id === 'ON-0001'); const ti = inputs['ON-0001'];
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const faqHtml = t.faqs.map(f => `      <div class="faq"><h3>${esc(f.q)}</h3><p>${esc(f.a)}</p></div>`).join('\n');
const factsHtml = t.localFacts.map(f => `        <li>${esc(f)}</li>`).join('\n');
const nearHtml = t.nearbySlugs.map(s => `<a href="/areas/${s}">{SERVICE} in ${s.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</a>`).join(' · ');
const html = `<!doctype html>
<html lang="en-CA">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.seoTitle)}</title>
  <meta name="description" content="${esc(t.metaDescription)}">
  <link rel="canonical" href="{BRAND_URL}/areas/${t.slug}">
  <script type="application/ld+json">
${JSON.stringify(graph(t), null, 2)}
  </script>
</head>
<body>
  <!-- STATIC-RENDER PROOF: every element below is in the initial HTML, no JS required -->
  <nav aria-label="Breadcrumb"><a href="/">Home</a> › <a href="/areas">Areas We Serve</a> › <a href="/areas/region/greater-toronto-area">${esc(t.region)}</a> › <span>${esc(t.name)}</span></nav>
  <header>
    <p class="overline">${esc(t.name)} · ${esc(t.region)} · Ontario</p>
    <h1>${esc(t.h1)}</h1>
    <p class="subhead">{UNIQUE_VALUE_PROP}</p>
    <p class="badges">{YEARS_IN_BUSINESS} years · {RATING}★ · {CERTIFICATIONS}</p>
    <a class="cta" href="tel:{PHONE}">{CTA_PRIMARY} — Call {PHONE}</a>
    <figure><img src="/img/areas/${t.imageFilename}" width="1200" height="900" loading="eager" decoding="async" alt="{SERVICE_CATEGORY} in ${esc(t.name)}, Ontario — ${esc(t.imageAltGeo)}"></figure>
  </header>
  <p class="answer-first"><strong>${esc(t.aiAnswerSnippet)}</strong></p>
  <section id="entity"><h2>What is ${esc(t.name)}?</h2><p>${esc(t.entityDescription)}</p></section>
  <section id="about"><h2>{SERVICE} in ${esc(t.name)}</h2>
${t.longDescription.split('\n\n').map(p => '    <p>' + esc(p) + '</p>').join('\n')}
  </section>
  <section id="facts"><h2>${esc(t.name)} local facts</h2><ul>
${factsHtml}
      </ul></section>
  <section id="services"><h2>Our {SERVICE_CATEGORY} services in ${esc(t.name)}</h2>
    <ul><li><a href="/areas/${t.slug}/{SERVICE_SLUG}">{SUBSERVICE_1}</a> — {SERVICE_DESCRIPTION}</li>
        <li><a href="/areas/${t.slug}/{SERVICE_SLUG}">{SUBSERVICE_2}</a> — {SERVICE_DESCRIPTION}</li>
        <li><a href="/areas/${t.slug}/{SERVICE_SLUG}">{SUBSERVICE_3}</a> — {SERVICE_DESCRIPTION}</li>
        <li><a href="/areas/${t.slug}/{SERVICE_SLUG}">{SUBSERVICE_4}</a> — {SERVICE_DESCRIPTION}</li></ul></section>
  <section id="proof"><h2>Local information gain</h2><p>${esc(t.infoGain)}</p><p>{DATA_POINT_TODO}</p></section>
  <section id="faqs"><h2>${esc(t.name)} {SERVICE} FAQs</h2>
${faqHtml}
  </section>
  <figure class="map-facade"><button type="button" aria-label="Load map of our ${esc(t.name)} service area">
    <img src="/img/maps/${t.slug}-facade.webp" width="800" height="600" loading="lazy" decoding="async" alt="Map showing our {SERVICE_CATEGORY} service area across ${esc(t.name)}, Ontario"></button></figure>
  <nav class="nearby" aria-label="Nearby areas"><h2>Nearby areas we serve</h2>${nearHtml} · <a href="/areas/region/greater-toronto-area">All ${esc(t.region)} areas</a></nav>
  <section class="blog-links"><h2>From the blog</h2><a href="/blog/service-cost-guide-ontario">{SERVICE} cost guide for Ontario</a> · <a href="/blog/${t.slug}-seasonal-guide">Seasonal {SERVICE} tips for ${esc(t.name)}</a></section>
  <footer><p>Updated July 2026</p><p>Contains information licensed under the Open Government Licence – Canada.</p></footer>
</body>
</html>`;
fs.writeFileSync(OUT + '\\sample-page-toronto.html', html);

// 3) sitemap (segmented — one urlset for the built location pages)
const sm = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
let smCount = 0;
for (const r of rows) { if (r.verification === 'Needs_Review') continue; smCount++; sm.push(`  <url><loc>{BRAND_URL}/areas/${r.slug}</loc><lastmod>2026-07-12</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>`); }
sm.push('</urlset>');
fs.writeFileSync(OUT + '\\sitemap-areas-ontario.xml', sm.join('\n'));

// 4) robots.txt
fs.writeFileSync(OUT + '\\robots.txt', `# Ontario areas — allow all major search + AI crawlers
User-agent: Googlebot
Allow: /
User-agent: Bingbot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: GPTBot
Allow: /
User-agent: *
Allow: /

Sitemap: {BRAND_URL}/sitemap-areas-ontario.xml
`);
console.log('schema graphs:', schemaLines.length, '| sitemap URLs (Verified only):', smCount, '| sample HTML + robots written');
