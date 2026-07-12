// Universe-aware assembly: merge out/*.json into the full 1,986-place universe, QA, write final.
const fs=require('fs');
const TODAY='2026-07-12';
const rows=JSON.parse(fs.readFileSync('bc_universe.json','utf8'));
const byId={}; rows.forEach(r=>byId[r.Location_ID]=r);
const wc=s=>(s||'').trim().split(/\s+/).filter(Boolean).length;
const outFiles=fs.readdirSync('out').filter(f=>f.endsWith('.json'));
const qa={merged:0,verified:0,needsReview:[],defects:[]};
const openers={},alts={};
for(const f of outFiles){
  let o; try{o=JSON.parse(fs.readFileSync('out/'+f,'utf8'));}catch(e){qa.defects.push(f+': bad json');continue;}
  const r=byId[o.Location_ID]; if(!r){qa.defects.push(f+': unknown id');continue;}
  const D=[];
  for(const [k,v] of Object.entries(o)) if(typeof v==='string'&&v.includes('{{')) D.push('{{ in '+k);
  const e=wc(o.Entity_Description),a=wc(o.AI_Answer_Snippet),s=wc(o.Short_Description),l=wc(o.Long_Description);
  if(e<45||e>110)D.push('Entity '+e+'w'); if(a<35||a>65)D.push('Snippet '+a+'w');
  if(s<90||s>160)D.push('Short '+s+'w'); if(l<280||l>520)D.push('Long '+l+'w');
  const endsPhone=t=>/\{PHONE\}[.!]?\s*$/.test((t||'').trim());
  if(!endsPhone(o.AI_Answer_Snippet))D.push('Snippet !CTA');
  if(!endsPhone(o.Short_Description))D.push('Short !CTA');
  if(!endsPhone(o.FAQ_3_Answer))D.push('FAQ3 !CTA');
  if(/\{[A-Z_0-9]+\}/.test(o.Entity_Description||''))D.push('token in Entity');
  if(/\{[A-Z_0-9]+\}/.test(o.Local_Facts||''))D.push('token in Local_Facts');
  if(/\{[A-Z_0-9]+\}/.test(o.Hero_Image_Alt_Geo||''))D.push('token in alt');
  const cq=(o.Conversational_Query_Examples||'').split('|').filter(x=>x.trim());
  if(cq.length!==5)D.push('CQ '+cq.length);
  const op=r.Parent_Region+'::'+(o.Short_Description||'').split(/\s+/).slice(0,6).join(' ').toLowerCase();
  if(openers[op])D.push('opener clash '+openers[op]); else openers[op]=o.Location_ID;
  const ak=(o.Hero_Image_Alt_Geo||'').toLowerCase().trim();
  if(alts[ak])D.push('alt clash '+alts[ak]); else alts[ak]=o.Location_ID;
  if(!(o.signals_count>=4))D.push('signals '+o.signals_count);
  if(D.length)qa.defects.push(o.Location_ID+': '+D.join('; '));
  const status=D.length?'Needs_Review':(o.verification_status||'Needs_Review');
  if(status==='Verified')qa.verified++; else qa.needsReview.push(o.Location_ID);
  Object.assign(r,{
    Entity_Description:o.Entity_Description,AI_Answer_Snippet:o.AI_Answer_Snippet,
    Short_Description:o.Short_Description,Long_Description:o.Long_Description,Local_Facts:o.Local_Facts,
    FAQ_1_Question:o.FAQ_1_Question,FAQ_1_Answer:o.FAQ_1_Answer,FAQ_2_Question:o.FAQ_2_Question,
    FAQ_2_Answer:o.FAQ_2_Answer,FAQ_3_Question:o.FAQ_3_Question,FAQ_3_Answer:o.FAQ_3_Answer,
    Conversational_Query_Examples:o.Conversational_Query_Examples,Hero_Image_Alt_Geo:o.Hero_Image_Alt_Geo,
    Info_Gain_Element:o.Info_Gain_Element,Signals_Count:o.signals_count,Verification_Status:status,
    SEO_Priority_Score:r.Unified_Score,Last_Updated:TODAY,
    Data_Sources:(r.Data_Sources||'StatsCan 2021 Census')+(r._geo_source?'; GeoNames (CC-BY)':'')
  });
  qa.merged++;
}
// fill deterministic SEO metadata templates for any publishable row missing them (new GeoNames communities)
let tmplFilled=0;
for(const r of rows){
  if(!(r.Gate_Publishable && r.Verification_Status==='Verified')) continue;
  if(r.SEO_Title_Template) continue; // already has templates (original sheet rows)
  const N=r.Location_Name;
  r.Entity_Type=r.Entity_Type||'Place';
  r.SEO_Title_Template=`{SERVICE} in ${N}, BC | {COMPANY_NAME}`;
  r.Meta_Description_Template=`Need {SERVICE} in ${N}, BC? {COMPANY_NAME} is your trusted local {BUSINESS_TYPE}. Free {ESTIMATE_TYPE} estimates — call {PHONE}.`;
  r.H1_Template=`{SERVICE} in ${N}, British Columbia — {COMPANY_NAME}`;
  r.Primary_Keyword_Template=`{SERVICE} ${N}`;
  r.Secondary_Keywords_Template=`{SERVICE} near me | {SERVICE} ${N} BC | {BUSINESS_TYPE} ${N} | best {SERVICE} ${N}`;
  r.Long_Tail_Keywords_Template=`affordable {SERVICE} ${N} BC | {BUSINESS_TYPE} for {PROPERTY_TYPE} ${N} | licensed {BUSINESS_TYPE} near ${N} | {SERVICE} cost ${N} BC`;
  r.Question_Keywords=`How much does {SERVICE} cost in ${N}? | Who is the best {BUSINESS_TYPE} in ${N}? | What {BUSINESS_TYPE} serves ${N} BC?`;
  r.Google_Maps_Embed_Code=`<iframe src="https://www.google.com/maps/embed/v1/place?key={GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(N+',British Columbia,Canada')}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
  tmplFilled++;
}
fs.writeFileSync('bc_universe_final.json',JSON.stringify(rows));
console.log('merged:',qa.merged,'| verified:',qa.verified,'| needs_review:',qa.needsReview.length,'| defects:',qa.defects.length,'| templates filled:',tmplFilled);
if(qa.defects.length)console.log(qa.defects.join('\n'));
