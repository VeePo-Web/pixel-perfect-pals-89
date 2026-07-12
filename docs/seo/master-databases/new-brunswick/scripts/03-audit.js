// Final audit: defect sweep + coverage + sitemap generation
const fs = require('fs'), path = require('path');
const BASE = 'c:/Users/Business/Desktop/Claude Code/pixel-perfect-pals-89/docs/seo/master-databases/new-brunswick';
const data = JSON.parse(fs.readFileSync(path.join(__dirname,'nb_final.json'),'utf8'));
const pass = data.csds.filter(c=>c.status==='GATE_PASS');
const expected = new Set(pass.map(c=>c.slug));

const locFiles = fs.readdirSync(path.join(BASE,'pages')).filter(f=>f.endsWith('.md') && f!=='areas-hub.md');
const regFiles = fs.existsSync(path.join(BASE,'pages/regions')) ? fs.readdirSync(path.join(BASE,'pages/regions')).filter(f=>f.endsWith('.md')) : [];
const nbhdFiles = fs.existsSync(path.join(BASE,'pages/neighborhoods')) ? fs.readdirSync(path.join(BASE,'pages/neighborhoods')).filter(f=>f.endsWith('.md')) : [];
const report = { files: locFiles.length, regions: regFiles.length, missing: [], extra: [], defects: {} };
for (const s of expected) if (!locFiles.includes(s+'.md')) report.missing.push(s);
for (const f of locFiles) if (!expected.has(f.replace(/\.md$/,''))) report.extra.push(f);

let dblCurly=0, phoneFails=[], altSeen={}, dupAlt=[], noRegionLink=[], fewNearby=[], fewBlog=[], jsonErr=[], faqLow=[], geoRadiusBad=[], dateBad=[], wordFails=[], noOGL=[], noH1=[], titleLong=[];
const sentSeen = new Map(); let dupSentences=[];
const wc = s => s.trim().split(/\s+/).filter(Boolean).length;

function section(body, startRe) {
  const m = body.match(startRe);
  if (!m) return null;
  const rest = body.slice(m.index + m[0].length);
  const next = rest.search(/\n## /);
  return next === -1 ? rest : rest.slice(0, next);
}

for (const f of [...locFiles.map(f=>['pages',f]), ...regFiles.map(f=>['pages/regions',f]), ...nbhdFiles.map(f=>['pages/neighborhoods',f]), [ 'pages','areas-hub.md']]) {
  const p = path.join(BASE, f[0], f[1]);
  const t = fs.readFileSync(p,'utf8');
  const isLoc = (f[0]==='pages' && f[1]!=='areas-hub.md') || f[0]==='pages/neighborhoods';
  dblCurly += (t.match(/\{\{/g)||[]).length;
  if ((t.match(/Call \{PHONE\}/g)||[]).length < (isLoc?3:1)) phoneFails.push(f[1]);
  const alt = (t.match(/imageAltGeo: ?"([^"]+)"/)||[])[1];
  if (alt) { if (altSeen[alt]) dupAlt.push(f[1]); altSeen[alt]=1; }
  if (!/Open Government Licence/.test(t)) noOGL.push(f[1]);
  if ((t.match(/^# /gm)||[]).length !== 1) noH1.push(f[1]);
  const title = (t.match(/^title: ?"(.+)"$/m)||[])[1]||'';
  if (title.replace('{SERVICE}','Roofing').replace('{COMPANY_NAME}','Acme Contracting Ltd').length > 66) titleLong.push(f[1]+':'+title.length);
  if (isLoc) {
    const body = t.replace(/^---[\s\S]*?---/,'');
    const c = pass.find(c=>c.slug===f[1].replace(/\.md$/,''));
    if (c && !body.includes(`/areas/region/`)) noRegionLink.push(f[1]);
    const near = new Set((body.match(/\/areas\/(?!region)[a-z0-9-]+/g)||[]).map(x=>x.replace('/areas/','')).filter(s=>s!==(c&&c.slug) && expected.has(s)));
    if (c && near.size < Math.min(3,c.nearby.length)) fewNearby.push(f[1]+':'+near.size);
    if ((body.match(/\/blog\//g)||[]).length < 2) fewBlog.push(f[1]);
    // word counts
    const snip = section(body, /## Need \{SERVICE\}[^\n]*\n/);
    if (snip) { const w = wc(snip.replace(/<[^>]+>/g,' ').replace(/\{[A-Z_0-9.]+\}/g,'X')); if (w<35||w>75) wordFails.push(f[1]+' snippet='+w); }
    const about = section(body, /\n## (?!Need|About [A-Za-zÀ-ÿ' .-]+, New Brunswick)[^\n]+\n/);
    // deep body = 4th section; simpler: find longest section
    const secs = body.split(/\n## /).slice(1).map(s=>wc(s));
    const maxw = Math.max(...secs);
    if (maxw < 380) wordFails.push(f[1]+' longest-section='+maxw);
    // sentence dedup across pages (About-ish content)
    for (const s of (body.match(/[A-Z][^.!?\n]{79,}[.!?]/g)||[])) {
      const k = s.trim();
      if (sentSeen.has(k) && sentSeen.get(k)!==f[1]) dupSentences.push([sentSeen.get(k), f[1], k.slice(0,70)]);
      else sentSeen.set(k, f[1]);
    }
  }
  // JSON-LD
  const jm = t.match(/```json\r?\n([\s\S]*?)```/);
  if (!jm) { jsonErr.push(f[1]+' no-json'); continue; }
  let g; try { g = JSON.parse(jm[1]); } catch(e) { jsonErr.push(f[1]+' parse:'+e.message.slice(0,40)); continue; }
  const graph = g['@graph']||[];
  const faq = graph.find(n=>n['@type']==='FAQPage');
  if (isLoc) {
    if (!faq || (faq.mainEntity||[]).length < 4) faqLow.push(f[1]);
    const svc = graph.find(n=>n['@type']==='Service');
    const gc = svc && [].concat(svc.areaServed||[]).find(a=>a['@type']==='GeoCircle');
    if (!gc || !/^\d+$/.test(String(gc.geoRadius))) geoRadiusBad.push(f[1]);
  }
  const wp = graph.find(n=>n['@type']==='WebPage');
  if (!wp || wp.dateModified !== '2026-07-10') dateBad.push(f[1]);
}
report.defects = { doubleCurly: dblCurly, phoneCTAfails: phoneFails, duplicateAlt: dupAlt,
  missingRegionUplink: noRegionLink, fewNearbyLinks: fewNearby, fewBlogLinks: fewBlog,
  jsonLdErrors: jsonErr, faqUnder4: faqLow, geoRadiusBad, dateModifiedBad: dateBad,
  wordCountFlags: wordFails, missingOGLfooter: noOGL, h1CountBad: noH1, titleOver60: titleLong,
  crossPageDuplicateSentences: dupSentences.slice(0,20), dupSentenceCount: dupSentences.length };

// sitemap
const today='2026-07-10';
let sm='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sm+=`  <url><loc>{BRAND_URL}/areas</loc><lastmod>${today}</lastmod><priority>0.8</priority></url>\n`;
const cur = JSON.parse(fs.readFileSync(path.join(__dirname,'nb_curated_facts.json'),'utf8'));
for (const r of Object.values(cur.regions)) sm+=`  <url><loc>{BRAND_URL}/areas/region/${r.slug}</loc><lastmod>${today}</lastmod><priority>0.7</priority></url>\n`;
for (const c of [...pass].sort((a,b)=>b.score-a.score)) sm+=`  <url><loc>{BRAND_URL}/areas/${c.slug}</loc><lastmod>${today}</lastmod><priority>${(c.score/100).toFixed(2)}</priority></url>\n`;
for (const f of nbhdFiles) { const t=fs.readFileSync(path.join(BASE,'pages/neighborhoods',f),'utf8'); const u=(t.match(/^url: (.+)$/m)||[])[1]; if(u) sm+=`  <url><loc>{BRAND_URL}${u}</loc><lastmod>${today}</lastmod><priority>0.55</priority></url>\n`; }
sm+='</urlset>\n';
fs.writeFileSync(path.join(BASE,'data/sitemap-areas.xml'), sm);
console.log(JSON.stringify(report,null,1));
