const fs=require('fs');
const rows=JSON.parse(fs.readFileSync('out_all.json'));
const wc=s=>String(s).trim().split(/\s+/).filter(Boolean).length;
let fails=[];const push=(id,m)=>fails.push(id+': '+m);
const slugs={},alts={},openersByRegion={},primaries={},aiOpeners={},aboutOpeners={};
for(const r of rows){
  const id=r.Location_ID;
  // no double curly anywhere
  const blob=JSON.stringify(r);
  if(blob.includes('{{')) push(id,'DOUBLE CURLY');
  // word counts
  const e=wc(r.Entity_Description); if(e<50||e>100) push(id,'entity wc='+e);
  const a=wc(r.AI_Answer_Snippet); if(a<40||a>62) push(id,'aiSnippet wc='+a);
  const ab=wc(r.About_Location); if(ab<400||ab>640) push(id,'about wc='+ab);
  // CTA endings
  if(!/Call \{PHONE\}\.?\s*$/.test(r.AI_Answer_Snippet)) push(id,'aiSnippet no Call {PHONE} end');
  if(!/Call \{PHONE\}\.?\s*$/.test(r.About_Location.trim())) push(id,'about no Call {PHONE} end');
  const lastFaq=r.FAQs[r.FAQs.length-1];
  if(!/Call \{PHONE\}\.?\s*$/.test(lastFaq.answer)) push(id,'lastFAQ no Call {PHONE}');
  // FAQ count + hyperlocal + answer wc
  if(r.FAQs.length<4||r.FAQs.length>6) push(id,'faq count='+r.FAQs.length);
  for(const f of r.FAQs){const w=wc(f.answer); if(w<30||w>75) push(id,'faq ans wc='+w+' ['+f.question.slice(0,30)+']');}
  // entity has no tokens
  if(/\{[A-Z_]+\}/.test(r.Entity_Description)) push(id,'entity has token');
  // signals
  if(r.Signals_Count<4) push(id,'signals='+r.Signals_Count);
  // local facts count
  if(r.Local_Facts.length<5||r.Local_Facts.length>7) push(id,'localfacts='+r.Local_Facts.length);
  // slug unique
  if(slugs[r.URL_Slug]) push(id,'DUP SLUG '+r.URL_Slug); slugs[r.URL_Slug]=1;
  // alt unique
  if(alts[r.Image.alt_geo]) push(id,'DUP ALT'); alts[r.Image.alt_geo]=1;
  // primary keyword unique
  if(primaries[r.Primary_Keyword]) push(id,'DUP PRIMARY '+r.Primary_Keyword); primaries[r.Primary_Keyword]=1;
  // title length after removing tokens? title uses tokens; check literal skeleton <=60 when {SERVICE}=Roofing {COMPANY_NAME}=Acme
  const tTitle=r.SEO_Title.replace('{SERVICE}','Roofing').replace('{COMPANY_NAME}','Acme Roofing');
  if(tTitle.length>62) push(id,'title long '+tTitle.length);
  // about opener uniqueness (first 60 chars)
  const op=r.About_Location.slice(0,55);
  if(aboutOpeners[op]) push(id,'DUP ABOUT OPENER vs '+aboutOpeners[op]); else aboutOpeners[op]=id;
  // neighbor opener-type collision within region handled by generator; track
}
// find-and-replace test: remove name, ensure numbers remain
console.log('ROWS',rows.length);
console.log('FAILS',fails.length);
fails.slice(0,60).forEach(f=>console.log(' -',f));
// distribution
const byRegion={},byType={};
for(const r of rows){byRegion[r.Region]=(byRegion[r.Region]||0)+1;byType[r.Location_Type]=(byType[r.Location_Type]||0)+1;}
console.log('BY REGION',JSON.stringify(byRegion));
console.log('BY TYPE',JSON.stringify(byType));
// about wc range
const abs=rows.map(r=>wc(r.About_Location)); console.log('about wc min/max',Math.min(...abs),Math.max(...abs));
const ents=rows.map(r=>wc(r.Entity_Description)); console.log('entity wc min/max',Math.min(...ents),Math.max(...ents));
const ais=rows.map(r=>wc(r.AI_Answer_Snippet)); console.log('ai wc min/max',Math.min(...ais),Math.max(...ais));
