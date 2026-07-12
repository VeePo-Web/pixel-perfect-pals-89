// Build all BC deliverables from bc_rows_upgraded.json:
//   1. upgraded xlsx (all 480 rows, original 4 sheets preserved, new QC columns appended)
//   2. image manifest (built rows only)
//   3. region + hub structure JSON (linking law: UP/SIDEWAYS/DOWN)
//   4. segmented sitemap (built URLs only, honest lastmod)
//   5. audit stats JSON (for the report)
const fs = require('fs');
const XLSX = require('xlsx');
const TODAY = '2026-07-12';
const BRAND = 'https://{BRAND_URL}';

const rows = JSON.parse(fs.readFileSync('bc_universe_final.json','utf8'));
const regions = JSON.parse(fs.readFileSync('region_bundles.json','utf8'));
const provAbbr = 'bc';
const slugify = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
const regionSlug = {};
Object.keys(regions).forEach(r => regionSlug[r] = slugify(r));

// ---------- 1. upgraded xlsx ----------
const wbSrc = XLSX.readFile('bc/General Provinces/BC/bc_master_seo_database_COMPLETE.xlsx');
const srcRaw = XLSX.utils.sheet_to_json(wbSrc.Sheets['MASTER_LOCATIONS'], {header:1, defval:null});
const banner = srcRaw[0];
const headers = srcRaw[1];
const NEW_COLS = ['Unified_Score','Gate_Publishable','Defer_Reason','Hero_Image_Alt_Geo','Info_Gain_Element','Signals_Count','Geo_Source','Pop_Source'];
const outHeaders = headers.concat(NEW_COLS);
const outBanner = banner.concat(NEW_COLS.map(()=> null));
outBanner[headers.length] = 'PHASE A-D UPGRADE';
const byId = {}; rows.forEach(r => byId[r.Location_ID] = r);
const aoa = [outBanner, outHeaders];
for (const r of rows) {
  const line = headers.map(h => r[h] ?? null);
  line.push(r.Unified_Score ?? null, r.Gate_Publishable ? 'Yes' : 'No', r.Defer_Reason ?? null,
    r.Hero_Image_Alt_Geo ?? null, r.Info_Gain_Element ?? null, r.Signals_Count ?? null,
    r._geo_source ?? null, r._pop_source ?? null);
  aoa.push(line);
}
const wsNew = XLSX.utils.aoa_to_sheet(aoa);
const wbOut = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wbOut, wsNew, 'MASTER_LOCATIONS');
// preserve the other 3 doc sheets verbatim
for (const sn of ['SCORING_METHODOLOGY','PLACEHOLDER_GUIDE','SCHEMA_DOCUMENTATION']) {
  if (wbSrc.Sheets[sn]) XLSX.utils.book_append_sheet(wbOut, wbSrc.Sheets[sn], sn);
}
XLSX.writeFile(wbOut, 'bc_master_seo_database_UPGRADED.xlsx');

// ---------- 2. image manifest (built rows) ----------
const built = rows.filter(r => r.Gate_Publishable && r.Verification_Status === 'Verified' && r.Hero_Image_Alt_Geo);
const imageManifest = built.map(r => {
  const lslug = r.URL_Slug.replace(/-bc$/, '');
  const filename = `${lslug}-${regionSlug[r.Parent_Region]}-${provAbbr}.webp`;
  return {
    Location_ID: r.Location_ID,
    filename,
    tier: 'flag',            // no per-place photo library shipped; province-flag fallback, metadata still describes the place
    layer1_alt_geo: r.Hero_Image_Alt_Geo,
    layer2_alt_rendered: `{SERVICE_CATEGORY} in ${r.Location_Name}, British Columbia — ${r.Hero_Image_Alt_Geo}`,
    title: r.Hero_Image_Alt_Geo,
    caption: r.Hero_Image_Alt_Geo,
    exif_geo: { lat: r.Latitude, lng: r.Longitude, name: r.Location_Name },
    license: 'CC0/Public-Domain',
    license_url: 'https://creativecommons.org/publicdomain/zero/1.0/',
    attribution: '// Wikimedia Commons — CC0/Public-Domain — Flag of British Columbia (fallback; alt/EXIF describe the place)',
    width: 1200, height: 900
  };
});
fs.writeFileSync('bc_image_manifest.json', JSON.stringify(imageManifest, null, 1));

// ---------- 3. region + hub structure (linking law) ----------
const hav = (a,b,c,d) => { const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b); const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2; return 2*R*Math.asin(Math.sqrt(h)); };
const rdByRegion = {};
built.filter(r=>/Regional District/i.test(r.Location_Type)).forEach(r=>{
  if (!rdByRegion[r.Parent_Region] || r.Unified_Score > rdByRegion[r.Parent_Region].Unified_Score) rdByRegion[r.Parent_Region]=r;
});
const structure = built.map(r => {
  const nearby = built.filter(o=>o.Location_ID!==r.Location_ID)
    .map(o=>({name:o.Location_Name, slug:o.URL_Slug, km:Math.round(hav(r.Latitude,r.Longitude,o.Latitude,o.Longitude))}))
    .sort((a,b)=>a.km-b.km).slice(0,5);
  const children = built.filter(o=>o.Parent_Municipality===r.Location_Name).map(o=>({name:o.Location_Name, slug:o.URL_Slug}));
  const up = rdByRegion[r.Parent_Region] && rdByRegion[r.Parent_Region].Location_ID!==r.Location_ID
    ? {name:rdByRegion[r.Parent_Region].Location_Name, url:`/areas/${rdByRegion[r.Parent_Region].URL_Slug}`}
    : {name:r.Parent_Region, url:`/areas/region/${regionSlug[r.Parent_Region]}`};
  return {
    Location_ID: r.Location_ID, name: r.Location_Name, region: r.Parent_Region,
    url: `/areas/${r.URL_Slug}`,
    breadcrumb: ['/', '/areas', `/areas/region/${regionSlug[r.Parent_Region]}`, `/areas/${r.URL_Slug}`],
    up_link: up,
    sideways_links: nearby.map(n=>({url:`/areas/${n.slug}`, km:n.km, anchor:`${n.name} (${n.km} km)`})),
    down_links: children.map(c=>({url:`/areas/${c.slug}`, anchor:c.name})),
    blog_links: [
      {url:`/blog/${provAbbr}-${slugify(r.Parent_Region)}-cost-guide-2026`, anchor:`${r.Parent_Region} {SERVICE} cost guide (2026)`},
      {url:`/blog/${provAbbr}-${slugify(r.Parent_Region)}-seasonal-guide-2026`, anchor:`Seasonal {SERVICE} timing in the ${r.Parent_Region}`}
    ]
  };
});
fs.writeFileSync('bc_page_structure.json', JSON.stringify(structure, null, 1));

// region hub pages
const regionPages = Object.keys(regions).map(reg => ({
  region: reg, url: `/areas/region/${regionSlug[reg]}`,
  bundle: regions[reg],
  child_locations: built.filter(r=>r.Parent_Region===reg).sort((a,b)=>b.Unified_Score-a.Unified_Score)
    .map(r=>({name:r.Location_Name, url:`/areas/${r.URL_Slug}`, score:r.Unified_Score}))
})).filter(rp => rp.child_locations.length > 0);
fs.writeFileSync('bc_region_pages.json', JSON.stringify(regionPages, null, 1));

// ---------- 4. sitemap (built URLs) ----------
const urls = [`/areas`]
  .concat(regionPages.map(rp=>rp.url))
  .concat(built.map(r=>`/areas/${r.URL_Slug}`));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u=>`  <url><loc>${BRAND}${u}</loc><lastmod>${TODAY}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`;
fs.writeFileSync('bc_sitemap.xml', sitemap);

// ---------- 5. audit stats ----------
const all = rows;
const deferred = all.filter(r=>!r.Gate_Publishable);
const dr = {}; deferred.forEach(r=>dr[r.Defer_Reason]=(dr[r.Defer_Reason]||0)+1);
const needsReview = all.filter(r=>r.Gate_Publishable && r.Verification_Status!=='Verified');
// defect sweeps
const slugs={}, alts={}, openers={};
let dupSlug=0, doubleCurly=0, dupAlt=0, missingCTA=0, openerClash=0;
built.forEach(r=>{
  slugs[r.URL_Slug]=(slugs[r.URL_Slug]||0)+1;
  const a=(r.Hero_Image_Alt_Geo||'').toLowerCase().trim(); if(alts[a])dupAlt++; else alts[a]=1;
  const op=r.Parent_Region+'::'+(r.Short_Description||'').split(/\s+/).slice(0,6).join(' ').toLowerCase();
  if(openers[op])openerClash++; else openers[op]=1;
  ['Entity_Description','AI_Answer_Snippet','Short_Description','Long_Description','Local_Facts','FAQ_1_Answer','FAQ_2_Answer','FAQ_3_Answer'].forEach(k=>{ if((r[k]||'').includes('{{'))doubleCurly++; });
  const endsPhone=t=>/\{PHONE\}[.!]?\s*$/.test((t||'').trim());
  if(!endsPhone(r.AI_Answer_Snippet)||!endsPhone(r.Short_Description)||!endsPhone(r.FAQ_3_Answer))missingCTA++;
});
Object.values(slugs).forEach(c=>{if(c>1)dupSlug++;});
const orphans = structure.filter(s=>s.sideways_links.length===0).length;
const audit = {
  date: TODAY,
  intended: all.length,
  built: built.length,
  needs_review_count: needsReview.length,
  deferred: deferred.length,
  reconciliation_ok: built.length + needsReview.length + deferred.length === all.length,
  defer_reasons: dr,
  needs_review: needsReview.map(r=>r.Location_ID),
  built_by_region: built.reduce((a,r)=>{a[r.Parent_Region]=(a[r.Parent_Region]||0)+1;return a;},{}),
  score_range_built: [Math.min(...built.map(r=>r.Unified_Score)), Math.max(...built.map(r=>r.Unified_Score))],
  defects: { duplicate_slugs: dupSlug, double_curly: doubleCurly, duplicate_alts: dupAlt, orphans, missing_phone_cta: missingCTA, opener_clashes: openerClash },
  region_pages: regionPages.length,
  images: imageManifest.length,
  sitemap_urls: urls.length
};
fs.writeFileSync('bc_audit_stats.json', JSON.stringify(audit, null, 1));
console.log('xlsx rows:', aoa.length-2, '| built:', built.length, '| images:', imageManifest.length, '| region pages:', regionPages.length, '| sitemap urls:', urls.length);
console.log('DEFECTS:', JSON.stringify(audit.defects));
console.log('INTENDED', audit.intended, '= BUILT', audit.built, '+ NEEDS_REVIEW', audit.needs_review_count, '+ DEFERRED', audit.deferred, '(check:', audit.reconciliation_ok, ')');
console.log('defer reasons:', JSON.stringify(dr));
