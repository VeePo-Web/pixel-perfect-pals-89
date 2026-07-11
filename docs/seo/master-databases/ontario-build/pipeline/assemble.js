// assemble.js — merge batches-out/*.jsonl into the final upgraded dataset CSV + image manifest.
const fs = require('fs');
const dir = __dirname + '\\batches-out';
const OUT = process.argv[2] || (__dirname + '\\..\\deliver');
fs.mkdirSync(OUT, { recursive: true });
const rows = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
  for (const l of fs.readFileSync(`${dir}\\${f}`, 'utf8').split(/\r?\n/).filter(x => x.trim())) {
    try { rows.push(JSON.parse(l)); } catch (e) { console.log('PARSE FAIL', f, e.message); }
  }
}
// join with batch input for geo columns
const inputs = {};
for (const f of fs.readdirSync(__dirname + '\\batches-in').filter(f => f.endsWith('.json'))) {
  for (const r of JSON.parse(fs.readFileSync(__dirname + '\\batches-in\\' + f, 'utf8')).rows) inputs[r.id] = r;
}
const geoRadius = pop => pop >= 100000 ? 20000 : pop >= 20000 ? 12000 : pop >= 5000 ? 8000 : 6000;
const esc = v => { const s = v === null || v === undefined ? '' : String(v); return /[",\n]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
const DATE = '2026-07-10';
const header = ['Location_ID','Location_Name','Location_Type','Parent_Municipality','Parent_Region','Province','Latitude','Longitude','URL_Slug','Distance_From_Toronto_KM','Distance_From_Ottawa_KM','Population_2021_Census','Unified_SEO_Score','Tier','Status','Verification_Status','Signal_Count','Signals','Info_Gain','SEO_Title_Template','Meta_Description_Template','H1_Template','Primary_Keyword_Template','Secondary_Keywords_Template','Long_Tail_Keywords_Template','Question_Keywords','Conversational_Query_Examples','Entity_Type','Entity_Description','AI_Answer_Snippet','Short_Description','Long_Description','Local_Facts','FAQ_1_Question','FAQ_1_Answer','FAQ_2_Question','FAQ_2_Answer','FAQ_3_Question','FAQ_3_Answer','FAQ_4_Question','FAQ_4_Answer','Image_Alt_Geo','Image_Filename','Image_Source_Tier','GeoRadius_Metres','Nearby_Slugs','Data_Sources','Coord_Note','Fix_Note','Last_Updated'];
const lines = [header.join(',')];
const manifest = ['Location_ID,Image_Filename,Image_Alt_Geo,Image_Source_Tier,License_Requirement,Rendered_Alt_Formula'];
let built = 0, review = 0, flagged = 0;
const flaggedRows = [];
for (const r of rows.sort((a, b) => a.id < b.id ? -1 : 1)) {
  const inp = inputs[r.id] || {};
  if (r.status !== 'OK') { flagged++; flaggedRows.push(`${r.id},${JSON.stringify(r.name || '')},${r.status},${JSON.stringify(r.reason || '')}`); continue; }
  if (r.verification === 'Needs_Review') review++; else built++;
  const faqs = r.faqs || [];
  lines.push([
    r.id, r.name, inp.type, inp.parentMuni, r.region, 'Ontario', inp.lat, inp.lng, r.slug,
    inp.distTorontoKm, inp.distOttawaKm, inp.pop2021, inp.unifiedScore, r.tier, r.status, r.verification,
    r.signalCount, (r.signals || []).join(' | '), r.infoGain,
    r.seoTitle, r.metaDescription, r.h1, r.primaryKeyword, r.secondaryKeywords, r.longTailKeywords,
    r.questionKeywords, r.conversationalQueries,
    inp.type === 'City' ? 'City' : 'AdministrativeArea', r.entityDescription, r.aiAnswerSnippet,
    r.shortDescription, r.longDescription, (r.localFacts || []).map(x => '• ' + x).join('\n'),
    faqs[0] && faqs[0].q, faqs[0] && faqs[0].a, faqs[1] && faqs[1].q, faqs[1] && faqs[1].a,
    faqs[2] && faqs[2].q, faqs[2] && faqs[2].a, faqs[3] && faqs[3].q, faqs[3] && faqs[3].a,
    r.imageAltGeo, r.imageFilename, 'region', geoRadius(inp.pop2021 || 0),
    (r.nearbySlugs || []).join(' | '), (r.sourcesNote || '') + ' | StatCan 2021 Census',
    inp.coordNote, inp.fixNote, DATE,
  ].map(esc).join(','));
  manifest.push([r.id, r.imageFilename, r.imageAltGeo, 'region (real-photo upgrade pending)', 'CC0/Unsplash/CC-BY only — Getty/iStock/Shutterstock banned', '"{SERVICE_CATEGORY} in ' + r.name + ', Ontario — " + Image_Alt_Geo'].map(esc).join(','));
}
fs.writeFileSync(OUT + '\\ontario_master_upgraded.csv', '﻿' + lines.join('\n'));
fs.writeFileSync(OUT + '\\image-manifest.csv', '﻿' + manifest.join('\n'));
fs.writeFileSync(OUT + '\\flagged-rows.csv', 'Location_ID,Name,Status,Reason\n' + flaggedRows.join('\n'));
console.log(`assembled: ${built} Verified + ${review} Needs_Review published rows | ${flagged} flagged (deferred) | -> ${OUT}`);
