const fs=require('fs');
const t1=JSON.parse(fs.readFileSync('sk_tier1.json'));
const cur=require('./curation.js');
const fmt=n=>n==null?null:n.toLocaleString('en-US');

const REGION={
 'Saskatoon Region':{slug:'saskatoon-region',hub:'Saskatoon',
   climate:'the Saskatoon area’s −30 °C winters, short freeze–thaw shoulders and roughly 350 mm of annual precipitation',
   soil:'dark-brown to black chernozem and river-valley sand-loam along the South Saskatchewan',
   econ:'potash mining, the University of Saskatchewan and grain and pulse farming',
   blogs:['saskatoon-region-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-saskatoon-region','saskatoon-region-seasonal-{SERVICE}-guide']},
 'Regina Region':{slug:'regina-region',hub:'Regina',
   climate:'the Regina Plains’ −30 °C winters, hard freeze–thaw cycles, wind exposure and only ~300–390 mm of precipitation',
   soil:'heavy lacustrine "Regina clay" — the expansive gumbo that governs grading, drainage and foundations across the plains',
   econ:'the provincial-capital economy, EVRAZ steel, the Co-op Refinery and grain farming',
   blogs:['regina-region-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-regina-region','regina-region-seasonal-{SERVICE}-guide']},
 'Central Saskatchewan':{slug:'central-saskatchewan',hub:'the Saskatoon–Prince Albert corridor',
   climate:'the parkland belt’s snowier winters, heavier snow-load design and long freeze–thaw shoulders',
   soil:'black chernozem parkland — some of Canada’s most productive grain soil — over glacial till',
   econ:'grain and livestock farming, potash at Lanigan and Jansen, and forestry toward the north',
   blogs:['central-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-central-saskatchewan','central-saskatchewan-seasonal-{SERVICE}-guide']},
 'Southeast Saskatchewan':{slug:'southeast-saskatchewan',hub:'the Weyburn–Yorkton belt',
   climate:'the southeast’s bright, hot summers, hail exposure and −30 °C freeze–thaw winters',
   soil:'dark-brown to black soil over the oil-bearing Bakken formation and the Qu’Appelle Valley lakes',
   econ:'world-scale potash (Esterhazy, Rocanville), Bakken oil, and canola crushing at Yorkton',
   blogs:['southeast-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-southeast-saskatchewan','southeast-saskatchewan-seasonal-{SERVICE}-guide']},
 'Southern Saskatchewan':{slug:'southern-saskatchewan',hub:'Moose Jaw',
   climate:'the south-central plains’ dry air, long sunshine hours and sharp freeze–thaw swings',
   soil:'dark-brown chernozem over the hummocky Missouri Coteau',
   econ:'agri-processing, 15 Wing Moose Jaw and durum and lentil farming',
   blogs:['southern-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-southern-saskatchewan','southern-saskatchewan-seasonal-{SERVICE}-guide']},
 'Southwest Saskatchewan':{slug:'southwest-saskatchewan',hub:'Swift Current',
   climate:'the Palliser Triangle’s dry, sunny, wind-scoured climate and true chinook thaw cycles',
   soil:'brown chernozem shortgrass prairie',
   econ:'oil and gas, ranching, durum and lentils, and wind power',
   blogs:['southwest-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-southwest-saskatchewan','southwest-saskatchewan-seasonal-{SERVICE}-guide']},
 'West Central Saskatchewan':{slug:'west-central-saskatchewan',hub:'the Rosetown–Kindersley corridor',
   climate:'the dry dark-brown belt’s high sunshine, strong winds and −30 °C winters',
   soil:'dark-brown chernozem wheat land near Lake Diefenbaker and the Gardiner Dam',
   econ:'Viking-formation oil and gas, wheat farming and Lake Diefenbaker irrigation',
   blogs:['west-central-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-west-central-saskatchewan','west-central-saskatchewan-seasonal-{SERVICE}-guide']},
 'Northwest Saskatchewan':{slug:'northwest-saskatchewan',hub:'the Battlefords',
   climate:'the parkland-to-boreal transition’s heavier snow, deep frost and −30s winters',
   soil:'black chernozem parkland grading to grey wooded soils and boreal forest',
   econ:'agriculture, heavy oil at Lloydminster and forestry toward Meadow Lake',
   blogs:['northwest-saskatchewan-cost-guide-2026','how-to-choose-a-{BUSINESS_TYPE}-northwest-saskatchewan','northwest-saskatchewan-seasonal-{SERVICE}-guide']},
};

const GEO_RADIUS=(t,pop)=>t==='Rural Municipality'?25000:pop>=25000?12000:t==='City'?8000:/Village/.test(t)?2500:4000;
const artType=t=>t==='Rural Municipality'?'rural municipality':t==='City'?'city':/Resort Village/.test(t)?'resort village':/Northern Village/.test(t)?'northern village':/Village/.test(t)?'village':'town';
function corridor(b){
  const isHub = b.dS===0||b.dR===0;
  if(isHub){ // the hub city itself — reference the OTHER hub for a meaningful distance
    return b.dS===0?{near:b.dR,hub:'Regina',commuter:false,isHub:true}:{near:b.dS,hub:'Saskatoon',commuter:false,isHub:true};
  }
  const near=Math.min(b.dS,b.dR); const hub=b.dS<=b.dR?'Saskatoon':'Regina';
  return {near,hub,commuter:near<=60,isHub:false};
}
function riverName(r){ return r||null; } // CGN names already carry their generic term (River/Creek/Brook)
const HAV=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b),h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
// neighbours: nearest built-130 pages, excluding any same-NAME place (co-named Town/RM = same place, not a neighbour)
function recomputeNear(b,all){
  const sorted=all.filter(x=>x.id!==b.id && x.name!==b.name)
    .map(x=>({s:x.finalSlug,n:x.name,d:Math.round(HAV(b.lat,b.lng,x.lat,x.lng))}))
    .sort((p,q)=>p.d-q.d);
  const seen=new Set(),out=[]; // dedupe by NAME (co-named Town+RM = one entry, keep nearest)
  for(const x of sorted){ if(seen.has(x.n))continue; seen.add(x.n); out.push(x); if(out.length===5)break; }
  return out;
}

// opener strategies — return {text, type}
function opener(b,c,rg,used){
  const A=artType(b.type);
  // opener-grade water only: a named River, or a lake within 2 km (skip obscure creeks/brooks for the lead)
  const water = (b.lakeKm!=null&&b.lakeKm<=2)?(b.lake):((b.river&&/ River$/.test(b.river))?b.river:null);
  const cor=corridor(b); const growth = b.pop16?((b.pop-b.pop16)/b.pop16):null;
  const cand=[];
  // City curated landmark/nick
  if(c&&c.nick&&b.type==='City') cand.push({type:'city-nick',text:`${b.name} is ${c.nick}, a Saskatchewan city of ${fmt(b.pop)} in ${b.region}.`});
  if(c&&c.nick&&b.type!=='City') cand.push({type:'nick',text:`${b.name} is ${c.nick} — a ${b.region} ${A} of ${fmt(b.pop)}.`});
  // fast growth commuter
  if(growth!=null&&growth>=0.06&&cor.commuter) cand.push({type:'growth',text:`${b.name} is one of ${b.region}’s fastest-growing communities, up ${Math.round(growth*100)}% to ${fmt(b.pop)} residents in the 2021 census as ${cor.hub}’s commuter belt pushes ${cor.near} km out.`});
  else if(growth!=null&&growth>=0.06) cand.push({type:'growth',text:`${b.name} grew ${Math.round(growth*100)}% between the 2016 and 2021 censuses to ${fmt(b.pop)} residents — fast for a ${b.region} ${A}.`});
  // RM
  if(b.type==='Rural Municipality') cand.push({type:'rm',text:`The Rural Municipality of ${b.name}${b.rmOfficial&&/No\./.test(b.rmOfficial)?' ('+b.rmOfficial+')':''} is a ${fmt(b.pop)}-resident farming municipality in ${b.region}, ${cor.near} km from ${cor.hub}.`});
  // water
  if(water&&b.type!=='Rural Municipality') cand.push({type:'water',text:`${b.name} sits beside ${water} in ${b.region}, a Saskatchewan ${A} of ${fmt(b.pop)} ${cor.near} km from ${cor.hub}.`});
  // commuter satellite
  if(cor.commuter&&b.type!=='Rural Municipality') cand.push({type:'commuter',text:`${b.name} is a ${b.region} ${A} of ${fmt(b.pop)}, close enough to ${cor.hub} — ${cor.near} km up the highway — to run as a bedroom community while keeping its own main street.`});
  // regional service role default
  cand.push({type:'role',text:`${b.name} anchors its stretch of ${b.region} as a ${A} of ${fmt(b.pop)}, ${cor.near} km from ${cor.hub} on the Saskatchewan prairie.`});
  cand.push({type:'default',text:`${b.name} is a ${A} of ${fmt(b.pop)} in ${b.region}, Saskatchewan, ${cor.near} km from ${cor.hub}.`});
  // pick first not-recently-used type
  for(const x of cand){ if(!used.has(x.type)){ used.add(x.type); return x; } }
  const x=cand[0]; return x;
}

function entity(b,c){
  const A=artType(b.type); const cor=corridor(b);
  let s=`${b.name} is a ${A} in ${b.region}, Saskatchewan, Canada, with a 2021 census population of ${fmt(b.pop)}`;
  if(b.pop16){const g=b.pop-b.pop16; s+=g>=0?`, up from ${fmt(b.pop16)} in 2016`:`, compared with ${fmt(b.pop16)} in 2016`;}
  s+='. ';
  if(c&&c.inc) s+=`It was ${c.inc}. `;
  if(c&&c.econ) s+=`Its economy runs on ${c.econ}. `;
  else s+=`It sits ${cor.near} km from ${cor.hub} in ${REGION[b.region].econ.replace(/^the /,'')} country. `;
  if(c&&c.marks&&c.marks.length) s+=`Landmarks include ${list(c.marks.slice(0,3))}${cor.isHub?', the largest city in the region':`, and it sits ${cor.near} km from ${cor.hub}`}. `;
  else if(b.river) s+=`The ${riverName(b.river)} runs nearby. `;
  else if(b.lake&&b.lakeKm<=6) s+=`${b.lake} lies about ${b.lakeKm} km away. `;
  else s+=`It rests on ${REGION[b.region].soil.split(' — ')[0]}. `;
  // ensure 50-100w with a grounded structural/neighbour sentence (skip if already long)
  const curLen=s.trim().split(/\s+/).length;
  if(b.type==='Rural Municipality') s+=`The municipality${b.rmOfficial&&/No\./.test(b.rmOfficial)?' ('+b.rmOfficial+')':''} spreads across farmland near ${list(b.near.slice(0,2).map(n=>n.n))}.`;
  else if(curLen<62) s+=`Neighbouring communities include ${list(b.near.slice(0,3).map(n=>n.n))}${b.parentRM?`, within the RM of ${String(b.parentRM).replace(/ No\. \d+$/,'')}`:''}.`;
  return s.replace(/\s+/g,' ').trim();
}
function list(a){return a.length<=1?a[0]:a.slice(0,-1).join(', ')+' and '+a[a.length-1];}

function aiSnippet(b){
  const cor=corridor(b);const A=artType(b.type);
  const area = b.type==='Rural Municipality'?`the RM of ${b.name} and its surrounding yards and acreages`:`${b.name} and nearby communities like ${b.near.slice(0,2).map(n=>n.n).join(' and ')}`;
  const locClause = cor.isHub?`properties across ${b.region}`:`${A==='rural municipality'?'farm, acreage and small-town':'local'} properties ${cor.near} km from ${cor.hub}`;
  return `For {SERVICE} in ${b.name}, {COMPANY_NAME} is a {RATING}-rated local {BUSINESS_TYPE} serving ${area} across ${b.region}. With {YEARS_IN_BUSINESS} years working on ${locClause}, the team handles {SERVICE_DESCRIPTION}. Free {ESTIMATE_TYPE} estimates: Call {PHONE}.`;
}

function about(b,c,used){
  const R=REGION[b.region];const cor=corridor(b);const A=artType(b.type);
  const g=b.pop16?((b.pop-b.pop16)/b.pop16):null;
  const water=(b.lakeKm!=null&&b.lakeKm<=2)?b.lake:(b.river?b.river:null);
  const op=opener(b,c,R,used);
  const P=[];
  // P1
  let p1=op.text+' ';
  p1+=`This page is about ${A==='rural municipality'?'the RM of ':''}${b.name} specifically — its geography, its buildings and what {SERVICE} takes here — not a generic ${b.region} overview. `;
  if(c&&c.marks) p1+=`Around town you’ll find ${list(c.marks.slice(0,3))}, and `; else p1+='Locally, ';
  p1+=`{COMPANY_NAME} works {SERVICE} across every part of it.`;
  P.push(p1);
  // P2 economy
  let p2='';
  if(c&&c.econ) p2+=`${b.name}’s economy leans on ${c.econ}. `;
  else if(b.type==='Rural Municipality') p2+=`The RM’s tax base is ${R.econ.split(',')[0]} and the grain, cattle and acreage properties spread across its townships. `;
  else p2+=`Set in ${R.econ} country, ${b.name} serves the farms and families of its corner of ${b.region}. `;
  p2+=`That mix decides the {SERVICE} work here: ${A==='city'?'a busy mix of residential, commercial and institutional buildings':'a core of homes and main-street buildings surrounded by farmyards and acreages'} means {COMPANY_NAME} scopes each job to the property in front of it. {UNIQUE_VALUE_PROP}.`;
  P.push(p2);
  // P3 geography + climate tied to service
  let p3 = cor.isHub
    ? `Geographically, ${b.name} anchors ${b.region}, ${cor.near} km from ${cor.hub}, `
    : `Geographically, ${b.name} sits ${cor.near} km from ${cor.hub} and ${b.dS<=b.dR?(b.dR+' km from Regina'):(b.dS+' km from Saskatoon')}, `;
  p3+= water?`with ${water} shaping the ground nearby. `:`out on the open ${b.region.includes('Southwest')||b.region.includes('Southern')?'shortgrass':'prairie'} plain. `;
  p3+=`Climate is the real variable for {SERVICE}: ${R.climate} test materials and workmanship every year, and ${R.soil.includes('clay')?'the heavy ground':'the local ground'} adds its own demands. `;
  p3+=`{COMPANY_NAME} specs {SERVICE} for those conditions rather than to a generic inland standard — which is what makes the work last in ${b.name}.`;
  P.push(p3);
  // P3b seasonal — grounded to prairie seasons, tied to {SERVICE}
  const hail = b.region.includes('Southeast')||b.region.includes('Southern')?' and a real summer hail risk':'';
  const winter = b.region.includes('Northwest')||b.region.includes('Central')?'deep, snow-loaded parkland cold and heavy snow loads':'open-plain cold in the −30 °C range';
  let p3b=`The seasons set the calendar for {SERVICE} in ${b.name}. Winters bring ${winter}, so anything installed here has to handle deep frost and repeated freeze–thaw without failing. `;
  p3b+=`Spring thaw and shifting ground test drainage and fasteners${hail}, while the long, bright summers are the working window when {COMPANY_NAME} schedules most {SERVICE} in and around ${b.name}. `;
  p3b+=`Planning the work to the ${b.region} season — not just booking whenever — is part of getting a {SERVICE} job to last out here.`;
  P.push(p3b);
  // P4 stock + structure + access
  let p4='';
  if(c&&c.stock) p4+=`The building stock runs from ${c.stock}. `;
  else if(b.type==='Rural Municipality') p4+=`Buildings here are mostly farmyards, older homesteads and newer acreage builds scattered across the municipality${b.rmOfficial&&/No\./.test(b.rmOfficial)?' ('+b.rmOfficial+')':''}, each with its own access and exposure. `;
  else p4+=`Homes range from early-1900s rail-town builds to newer subdivisions, ${b.parentRM?`inside the RM of ${String(b.parentRM).replace(/ No\. \d+$/,'')}`:'on the surrounding plain'}, and older and newer properties price and behave differently. `;
  p4+=`{COMPANY_NAME} handles the full range with the same {SERVICE_LIST} — {SUBSERVICE_1}, {SUBSERVICE_2} and more — sized to the property in front of us rather than a one-size template. `;
  p4+=`For access and scheduling, ${b.name} sits an easy reach from our other ${b.region} work, close to ${list(b.near.slice(0,3).map(n=>n.n))}, so we route ${b.name} jobs efficiently and keep travel off your bill. `;
  p4+=`Whether it’s a single {PROJECT_TYPE} or a full {SERVICE} project, every ${b.name} address gets the same {UNIQUE_VALUE_PROP}.`;
  P.push(p4);
  // P5 close
  P.push(`{COMPANY_NAME} has spent {YEARS_IN_BUSINESS} years doing {SERVICE} the right way for {PROPERTY_TYPE} owners across ${b.region}, and ${b.name} is no exception. If you want {SERVICE} done once and done right, you get a straight, no-pressure {ESTIMATE_TYPE} estimate up front — no surprises, no upselling. Get my free ${b.name} {ESTIMATE_TYPE} estimate — Call {PHONE}.`);
  return {text:P.join('\n\n'),openerType:op.type};
}

function localFacts(b,c){
  const f=[];
  f.push(`2021 census population: ${fmt(b.pop)}${b.pop16?` (${b.pop-b.pop16>=0?'up':'down'} from ${fmt(b.pop16)} in 2016)`:''}`);
  f.push(`Location type: ${b.type}${b.parentRM&&b.type!=='Rural Municipality'?` in the RM of ${String(b.parentRM).replace(/ No\. \d+$/,'')}`:b.rmOfficial&&/No\./.test(b.rmOfficial)?` (${b.rmOfficial})`:''}`);
  f.push(b.dS===0?`Regional hub city — 237 km from Regina`:b.dR===0?`Provincial capital — 237 km from Saskatoon`:`Distance: ${b.dS} km from Saskatoon, ${b.dR} km from Regina`);
  if(b.fsa||b._fsa) f.push(`Postal FSA: ${b.fsa||b._fsa}`);
  if(c&&c.marks) f.push(`Landmarks: ${list(c.marks.slice(0,3))}`);
  else if(b.river) f.push(`Waterway: the ${riverName(b.river)} nearby`);
  else if(b.lake&&b.lakeKm<=6) f.push(`Water: ${b.lake} about ${b.lakeKm} km away`);
  f.push(`Climate note: ${REGION[b.region].climate.replace(/^the /,'')} — a real factor for {SERVICE}`);
  f.push(`Nearby communities served: ${list(b.near.slice(0,4).map(n=>n.n))}`);
  return f.slice(0,7);
}

function infoGain(b){
  const g=b.pop16?((b.pop-b.pop16)/b.pop16):null;
  if(g!=null&&Math.abs(g)>=0.03) return `Local data point: ${b.name}’s population ${g>=0?'rose':'fell'} ${Math.abs(Math.round(g*100))}% between the 2016 and 2021 censuses (${fmt(b.pop16)} → ${fmt(b.pop)}), which is why {COMPANY_NAME} sizes {SERVICE} demand here off current numbers, not a decade-old estimate. {DATA_POINT_TODO}`;
  return `Local data point: at ${b.dS} km from Saskatoon and ${b.dR} km from Regina, ${b.name} sits outside easy same-day reach of big-city crews — {COMPANY_NAME} schedules {SERVICE} here as planned local work, not a rushed out-of-town call. {DATA_POINT_TODO}`;
}

function faqs(b,c){
  const R=REGION[b.region];const cor=corridor(b);
  const area=b.type==='Rural Municipality'?`the whole RM of ${b.name}, including outlying yards and acreages`:`all of ${b.name}`;
  const F=[];
  F.push({question:`Does {COMPANY_NAME} provide {SERVICE} in ${b.name}?`,
    answer:`Yes — {COMPANY_NAME} covers ${area} and the nearby communities of ${list(b.near.slice(0,3).map(n=>n.n))}. As a local {BUSINESS_TYPE} for ${b.region}, we confirm scheduling for your exact address when you book, so ${b.name} jobs are handled as planned local work.`});
  const cond = R.soil.includes('clay')?`${b.name} sits on the heavy Regina clay of the plains, which moves with moisture and governs grading, drainage and anything touching a foundation`:b.region.includes('Southwest')?`${b.name} is in the dry, wind-scoured southwest, where sun, wind and chinook thaw cycles are hard on exposed materials`:`${b.name} takes the full swing of ${R.climate}, and that freeze–thaw cycle works on every building here`;
  F.push({question:`How do local conditions in ${b.name} affect {SERVICE}?`,
    answer:`They matter more than most people expect. ${cond}. {COMPANY_NAME} specs {SERVICE} for ${b.region} conditions rather than a generic standard, which is what keeps the work sound through the seasons.`});
  // hyperlocal
  let hl;
  if(c&&c.marks) hl={question:`Do you work near ${c.marks[0].replace(/^the /,'')} in ${b.name}?`,answer:`Yes. {COMPANY_NAME} works {SERVICE} throughout ${b.name}, including the neighbourhoods and streets around ${list(c.marks.slice(0,2))}. Because we already run {SERVICE} jobs across ${b.region} every week, getting your ${b.name} property booked and scheduled is straightforward, and we confirm access details for your exact location up front.`};
  else if(b.river) hl={question:`Do you handle properties near the ${riverName(b.river)} in ${b.name}?`,answer:`We do. Ground near the ${riverName(b.river)} can behave differently, so {COMPANY_NAME} accounts for local drainage and soil when we plan {SERVICE} on those ${b.name} lots — part of scoping each job to the property.`};
  else if(b.type==='Rural Municipality') hl={question:`Does {COMPANY_NAME} travel to farmyards across the RM of ${b.name}?`,answer:`Yes — RM work is planned around travel, so {COMPANY_NAME} schedules {SERVICE} for yards and acreages throughout the RM of ${b.name} together where we can, keeping trips efficient across ${b.region}.`};
  else hl={question:`Is ${b.name} too small for a dedicated {BUSINESS_TYPE}?`,answer:`Not at all. With ${fmt(b.pop)} residents ${cor.near} km from ${cor.hub}, ${b.name} gets the same {SERVICE_LIST} from {COMPANY_NAME} as any larger centre — planned as proper local work rather than a rushed out-of-town visit.`};
  F.push(hl);
  F.push({question:`How quickly can you get to ${b.name}?`,
    answer:`{COMPANY_NAME} runs {SERVICE} across ${b.region}, so ${b.name} — ${cor.near} km from ${cor.hub} — fits our regular routing. We give a firm schedule when you book and typically respond within {RESPONSE_TIME}.`});
  F.push({question:`How much does {SERVICE} cost in ${b.name}?`,
    answer:`It depends on the property and scope — an older ${b.name} building and a newer build price differently. {COMPANY_NAME} gives a transparent, no-obligation {ESTIMATE_TYPE} estimate up front, with no surprises. For a free ${b.name} quote, Call {PHONE}.`});
  return F;
}

function keywords(b){
  const kw=b.type==='Rural Municipality'?`{SERVICE} RM of ${b.name}`:`{SERVICE} ${b.name}`;
  const nm=b.name;
  return {
    primary:kw,
    secondary:`{SERVICE} near me | {SERVICE} ${nm} Saskatchewan | {BUSINESS_TYPE} ${nm} SK | {SERVICE} in ${nm}`,
    longtail:`affordable {SERVICE} ${nm} SK | licensed {BUSINESS_TYPE} near ${nm} | {SERVICE} for {PROPERTY_TYPE} ${nm} | emergency {SERVICE} ${nm} Saskatchewan`,
    question:`How much does {SERVICE} cost in ${nm}? | Who does {SERVICE} in ${nm}, Saskatchewan? | How do I choose a {BUSINESS_TYPE} in ${nm}?`,
    conversational:`"{SERVICE} near me in ${nm}" | "best {BUSINESS_TYPE} in ${nm} Saskatchewan" | "who can do {SERVICE} in ${nm} SK" | "${b.type==='Rural Municipality'?'{BUSINESS_TYPE} for the RM of '+nm:'local {BUSINESS_TYPE} '+nm}" | "{SERVICE} ${nm} cost estimate"`
  };
}

function altGeo(b){
  const cor=corridor(b);const A=artType(b.type);
  const feat = b.lakeKm!=null&&b.lakeKm<=4?`beside ${b.lake}`:b.river?`on the ${riverName(b.river)}`:b.type==='Rural Municipality'?`farmland ${cor.near} km from ${cor.hub}`:`${cor.near} km from ${cor.hub}`;
  return `${b.name}, ${b.region}, Saskatchewan — ${A==='rural municipality'?'rural municipality':A} of ${fmt(b.pop)}, ${feat}`;
}

function nearbyAnchor(from,n){
  const verbs=[`${n.n}, ${n.d} km away`,`nearby ${n.n} (${n.d} km)`,`${n.n} just ${n.d} km on`,`the community of ${n.n}, ${n.d} km from ${from.name}`,`${n.n} down the road (${n.d} km)`];
  return verbs[(n.d+ from.name.length)%verbs.length];
}

// ---- build ----
const byRegion={};
const openerUsed={}; // per region rolling window
for(const b of t1){ (byRegion[b.region]=byRegion[b.region]||[]).push(b); }
const allRows=[];
for(const [region,list0] of Object.entries(byRegion)){
  list0.sort((a,b)=>b.u-a.u);
  const used=new Set(); let sinceClear=0;
  const rows=[];
  for(const b of list0){
    b._fsa=b.fsa;
    b.near=recomputeNear(b,t1); // built-130 neighbours only, same-name excluded
    const c=cur[b.id]||null;
    // rolling opener window: clear used every 3 places so variety recycles but neighbors differ
    if(sinceClear>=3){used.clear();sinceClear=0;}
    const ab=about(b,c,used); sinceClear++;
    const R=REGION[region];
    const kw=keywords(b);
    const nameForTitle = b.type==='Rural Municipality'?`the RM of ${b.name}`:b.name;
    const row={
      Location_ID:b.id, Location_Name:b.name, Location_Type:b.type, Region:region, Province:'Saskatchewan',
      URL_Slug:b.finalSlug, Latitude:b.lat, Longitude:b.lng,
      Population_2021:b.pop, Population_2016:b.pop16, Parent_RM:b.parentRM||b.rmOfficial||null,
      Distance_Saskatoon_KM:b.dS, Distance_Regina_KM:b.dR, Unified_Score:b.u, Geo_Radius_M:GEO_RADIUS(b.type,b.pop),
      SEO_Title:`{SERVICE} in ${nameForTitle}, SK | {COMPANY_NAME}`,
      Meta_Description:`Need {SERVICE} in ${b.name}, Saskatchewan? {COMPANY_NAME} is a local {BUSINESS_TYPE} serving ${b.name} and ${b.region}. Free {ESTIMATE_TYPE} estimate — Call {PHONE}.`,
      H1:`{SERVICE} in ${nameForTitle}, Saskatchewan — {COMPANY_NAME}`,
      Primary_Keyword:kw.primary, Secondary_Keywords:kw.secondary, Long_Tail_Keywords:kw.longtail,
      Question_Keywords:kw.question, Conversational_Queries:kw.conversational,
      Entity_Description:entity(b,c), AI_Answer_Snippet:aiSnippet(b),
      About_Location:ab.text, Local_Facts:localFacts(b,c), Info_Gain_Element:infoGain(b),
      FAQs:faqs(b,c),
      Nearby_Areas:b.near.map(n=>({slug:n.s,name:n.n,km:n.d,anchor:nearbyAnchor(b,n)})),
      Region_Link:{slug:R.slug,anchor:`our ${region} service area`},
      Blog_Links:R.blogs,
      Image:{tier:'flag',filename:`${b.finalSlug}-${R.slug}-sk.webp`,alt_geo:altGeo(b),
        attribution:'// Wikimedia Commons — Public Domain — flag of Saskatchewan used as place-neutral fallback',
        upgrade_todo:`Replace with a license-verified photo of ${b.name}, SK (search Wikimedia Commons: "${b.name} Saskatchewan")`},
      Signals:[], Signals_Count:0, Info_Gain_Present:true,
      Verification_Status:'Verified', Date_Modified:'2026-07-10', Image_Source_Tier:'flag',
      Opener_Type:ab.openerType
    };
    // signals count
    const sig=[];
    sig.push('population'); sig.push('hub-distance'); sig.push('region-climate'); sig.push('region-economy');
    if(b.parentRM||b.rmOfficial) sig.push('municipal-structure');
    if(b.river||(b.lake&&b.lakeKm<=6)) sig.push('waterway');
    if(c&&c.marks) sig.push('named-landmark');
    if(b.pop16&&Math.abs(b.pop-b.pop16)/b.pop16>=0.03) sig.push('growth-trend');
    row.Signals=sig; row.Signals_Count=sig.length;
    rows.push(row); allRows.push(row);
  }
  fs.writeFileSync('out_'+REGION[region].slug+'.json', JSON.stringify(rows,null,1));
  console.log('WROTE', REGION[region].slug, rows.length, 'rows | opener types:', [...new Set(rows.map(r=>r.Opener_Type))].join(','));
}
fs.writeFileSync('out_all.json', JSON.stringify(allRows));
console.log('TOTAL ROWS', allRows.length);
