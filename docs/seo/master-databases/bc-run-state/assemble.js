const fs = require('fs');
const XLSX = require('xlsx');
const rows = JSON.parse(fs.readFileSync('bc_rows.json','utf8'));
const byId = {}; rows.forEach(r=>byId[r.Location_ID]=r);
const wc = s => (s||'').trim().split(/\s+/).filter(Boolean).length;
const outFiles = fs.readdirSync('out').filter(f=>f.endsWith('.json'));
const qa = { merged:0, missing:[], defects:[], needsReview:[], verified:0 };
const openers = {}; const alts = {};
const TODAY = '2026-07-11';

for (const f of outFiles) {
  let o;
  try { o = JSON.parse(fs.readFileSync('out/'+f,'utf8')); } catch(e){ qa.defects.push(`${f}: unparseable JSON`); continue; }
  const r = byId[o.Location_ID];
  if (!r) { qa.defects.push(`${f}: unknown Location_ID`); continue; }
  const D = [];
  // {{ check across all values
  for (const [k,v] of Object.entries(o)) if (typeof v==='string' && v.includes('{{')) D.push(`{{ in ${k}`);
  // word counts
  const e=wc(o.Entity_Description), a=wc(o.AI_Answer_Snippet), s=wc(o.Short_Description), l=wc(o.Long_Description);
  if (e<45||e>110) D.push(`Entity ${e}w`);
  if (a<35||a>65) D.push(`Snippet ${a}w`);
  if (s<90||s>160) D.push(`Short ${s}w`);
  if (l<280||l>520) D.push(`Long ${l}w`);
  // {PHONE} CTA endings
  const endsPhone = t => /\{PHONE\}[.!]?\s*$/.test((t||'').trim());
  if (!endsPhone(o.AI_Answer_Snippet)) D.push('Snippet no {PHONE} end');
  if (!endsPhone(o.Short_Description)) D.push('Short no {PHONE} end');
  if (!endsPhone(o.FAQ_3_Answer)) D.push('FAQ3 no {PHONE} end');
  // no placeholders in Entity/Local_Facts/alt
  if (/\{[A-Z_0-9]+\}/.test(o.Entity_Description||'')) D.push('token in Entity');
  if (/\{[A-Z_0-9]+\}/.test(o.Local_Facts||'')) D.push('token in Local_Facts');
  if (/\{[A-Z_0-9]+\}/.test(o.Hero_Image_Alt_Geo||'')) D.push('token in alt');
  // conversational queries = 5
  const cq = (o.Conversational_Query_Examples||'').split('|').filter(x=>x.trim());
  if (cq.length!==5) D.push(`CQ count ${cq.length}`);
  // opener diversity (first 6 words) within region
  const opener = (o.Short_Description||'').split(/\s+/).slice(0,6).join(' ').toLowerCase();
  const key = r.Parent_Region+'::'+opener;
  if (openers[key]) D.push(`opener clash with ${openers[key]}`); else openers[key]=o.Location_ID;
  // unique alt
  const altKey = (o.Hero_Image_Alt_Geo||'').toLowerCase().trim();
  if (alts[altKey]) D.push(`alt clash with ${alts[altKey]}`); else alts[altKey]=o.Location_ID;
  // signals
  if (!(o.signals_count>=4)) D.push(`signals ${o.signals_count}`);

  if (D.length) { qa.defects.push(`${o.Location_ID}: ${D.join('; ')}`); }
  const status = D.length ? 'Needs_Review' : (o.verification_status||'Needs_Review');
  if (status==='Verified') qa.verified++; else qa.needsReview.push(o.Location_ID);
  // merge into row
  Object.assign(r, {
    Entity_Description:o.Entity_Description, AI_Answer_Snippet:o.AI_Answer_Snippet,
    Short_Description:o.Short_Description, Long_Description:o.Long_Description, Local_Facts:o.Local_Facts,
    FAQ_1_Question:o.FAQ_1_Question, FAQ_1_Answer:o.FAQ_1_Answer, FAQ_2_Question:o.FAQ_2_Question,
    FAQ_2_Answer:o.FAQ_2_Answer, FAQ_3_Question:o.FAQ_3_Question, FAQ_3_Answer:o.FAQ_3_Answer,
    Conversational_Query_Examples:o.Conversational_Query_Examples,
    Hero_Image_Alt_Geo:o.Hero_Image_Alt_Geo, Info_Gain_Element:o.Info_Gain_Element,
    Signals_Count:o.signals_count, Verification_Status:status,
    SEO_Priority_Score:r.Unified_Score, Last_Updated:TODAY,
    Data_Sources:(r.Data_Sources||'StatsCan 2021 Census') + (r._geo_source?'; GeoNames (CC-BY)':'')
  });
  qa.merged++;
}
// which publishable rows have no output yet?
rows.filter(r=>r.Gate_Publishable).forEach(r=>{ if(!outFiles.includes(r.Location_ID+'.json')) qa.missing.push(r.Location_ID); });
console.log('merged:', qa.merged, '| verified:', qa.verified, '| needs_review:', qa.needsReview.length, '| missing:', qa.missing.length);
if (qa.defects.length) console.log('DEFECTS ('+qa.defects.length+'):\n'+qa.defects.join('\n'));
if (qa.missing.length) console.log('MISSING:', qa.missing.join(','));
fs.writeFileSync('bc_rows_upgraded.json', JSON.stringify(rows));
fs.writeFileSync('qa_report.json', JSON.stringify(qa,null,1));
