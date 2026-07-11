// MODE B v2 — NB enumeration with authoritative CSD types + gate policy
const fs = require('fs');
function parseCSV(text) {
  const rows = []; let row = [], field = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQ) { if (c === '"') { if (text[i+1] === '"') { field += '"'; i++; } else inQ = false; } else field += c; }
    else { if (c === '"') inQ = true; else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n') { row.push(field); rows.push(row); row = []; field = ''; } else if (c !== '\r') field += c; }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}
const TYPES = JSON.parse(fs.readFileSync('nb_csd_types.json','utf8'));
const sc = parseCSV(fs.readFileSync('statcan/98100002.csv','utf8'));
const CD_COUNTY = {'01':'Saint John','02':'Charlotte','03':'Sunbury','04':'Queens','05':'Kings','06':'Albert','07':'Westmorland','08':'Kent','09':'Northumberland','10':'York','11':'Carleton','12':'Victoria','13':'Madawaska','14':'Restigouche','15':'Gloucester'};
const COUNTY_REGION = {
  'Westmorland':'Greater Moncton & Southeast','Albert':'Greater Moncton & Southeast','Kent':'Greater Moncton & Southeast',
  'Saint John':'Fundy & Greater Saint John','Kings':'Fundy & Greater Saint John','Charlotte':'Fundy & Greater Saint John',
  'York':'Capital & River Valley','Sunbury':'Capital & River Valley','Queens':'Capital & River Valley','Carleton':'Capital & River Valley',
  'Victoria':'Northwest & Madawaska','Madawaska':'Northwest & Madawaska',
  'Northumberland':'Miramichi River Region',
  'Gloucester':'Acadian Peninsula & Chaleur','Restigouche':'Restigouche & Chaleur Bay'
};
const TYPE_LONG = {C:'City', TV:'Town', VL:'Village', RCR:'Rural Community', MRM:'Regional Municipality', P:'Parish', IRI:'Indian Reserve'};
const csds = [];
for (const r of sc.slice(1)) {
  const dguid = r[2] || '';
  if (!dguid.startsWith('2021A0005')) continue;
  const csduid = dguid.slice(9);
  if (!csduid.startsWith('13')) continue;
  const t = TYPES[csduid] || {};
  const cd = csduid.slice(2,4);
  csds.push({ csduid, name: r[1], typeCode: t.type||'?', typeLong: TYPE_LONG[t.type]||t.type,
    cma: t.cma||'', gafLat: t.lat, gafLng: t.lng,
    pop21: parseInt((r[4]||'').replace(/,/g,''))||0, pop16: parseInt((r[6]||'').replace(/,/g,''))||0,
    areaKm2: parseFloat(r[22])||null, county: CD_COUNTY[cd], region: COUNTY_REGION[CD_COUNTY[cd]] });
}
// CGN
const cg = parseCSV(fs.readFileSync('cgn/cgn_nb_csv_eng.csv','utf8'));
const hdr = cg[0].map(h=>h.replace(/^﻿/,''));
const idx = Object.fromEntries(hdr.map((h,i)=>[h,i]));
const cgn = cg.slice(1).filter(r=>r.length>10).map(r=>({ id:r[idx['CGNDB ID']], name:r[idx['Geographical Name']],
  generic:r[idx['Generic Term']], cat:r[idx['Generic Category']], lat:parseFloat(r[idx['Latitude']]),
  lng:parseFloat(r[idx['Longitude']]), county:r[idx['Location']] }));
const popPlaces = cgn.filter(e=>e.cat==='Populated Place');
const norm = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const cgnByName = new Map();
for (const e of popPlaces) { const k = norm(e.name); if(!cgnByName.has(k)) cgnByName.set(k,[]); cgnByName.get(k).push(e); }
// join coords: CGN populated place (same county preferred) → GAF avg fallback
for (const c of csds) {
  const keys = [norm(c.name), ...c.name.split(' / ').map(norm)];
  let best = null;
  for (const k of keys) {
    const cands = cgnByName.get(k) || [];
    best = cands.find(e=>e.county===c.county) || cands[0];
    if (best) break;
  }
  if (best) { c.lat = best.lat; c.lng = best.lng; c.coordSrc = 'CGN:'+best.id; }
  else if (c.gafLat != null) { c.lat = c.gafLat; c.lng = c.gafLng; c.coordSrc = 'GAF-DA-avg'; }
}
// sub-CSD communities (exclude infrastructure points)
const EXCLUDE_GEN = new Set(['Railway Point','Landing','Post Office','Station','Industrial Park']);
const csdNames = new Set(csds.map(c=>norm(c.name)));
const seen = new Set(), communities = [];
for (const e of popPlaces) {
  if (EXCLUDE_GEN.has(e.generic)) continue;
  const k = norm(e.name);
  if (csdNames.has(k) || seen.has(k+'|'+e.county)) continue;
  seen.add(k+'|'+e.county);
  communities.push({ cgnId:e.id, name:e.name, generic:e.generic, lat:e.lat, lng:e.lng,
    county:e.county, region: COUNTY_REGION[e.county]||null });
}
// unified score
const HUBS=[{n:'Moncton',lat:46.0878,lng:-64.7782},{n:'Saint John',lat:45.2733,lng:-66.0633}];
const hav=(a,b)=>{const R=6371,t=x=>x*Math.PI/180;const dLa=t(b.lat-a.lat),dLo=t(b.lng-a.lng);
  const h=Math.sin(dLa/2)**2+Math.cos(t(a.lat))*Math.cos(t(b.lat))*Math.sin(dLo/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
const ECON={C:8,MRM:8,TV:5,RCR:5,VL:3,P:1,IRI:1};
for (const c of csds) {
  if (!c.pop21 || c.lat==null) { c.score=null; continue; }
  const pop=c.pop21;
  const sPop=Math.min(30,Math.log10(Math.max(pop,1))/Math.log10(2794356)*30);
  const sVol=pop>=100000?24:pop>=20000?19:pop>=5000?14:pop>=1000?8:pop>=200?3:1;
  const sCmp=pop>=100000?4:pop>=20000?8:pop>=5000?12:pop>=1000?15:18;
  const dmin=Math.min(...HUBS.map(h=>hav(c,h)));
  c.distMonctonKm=Math.round(hav(c,HUBS[0])); c.distSaintJohnKm=Math.round(hav(c,HUBS[1]));
  const sPrx=Math.max((1-Math.min(dmin,500)/500)*15,0);
  c.score=Math.round((sPop+sVol+sCmp+sPrx+(ECON[c.typeCode]??1))*10)/10;
}
// gate policy
const MUNI=new Set(['C','TV','VL','RCR','MRM']);
for (const c of csds) {
  if (!MUNI.has(c.typeCode)) { c.status='DEFERRED';
    c.reason = c.typeCode==='P' ? 'parish = administrative geography; name-clash/cannibalization with its municipality; covered by nearby municipal pages'
             : c.typeCode==='IRI' ? 'First Nations reserve — not an appropriate third-party service-landing-page target; excluded from build'
             : 'non-municipal CSD'; continue; }
  if (c.score==null) { c.status='DEFERRED'; c.reason='no verified coordinates or population'; continue; }
  if (c.score>=50 && c.pop21>0) { c.status='GATE_PASS'; }
  else { c.status='DEFERRED'; c.reason=`unified score ${c.score} < 50 publish threshold (pop ${c.pop21})`; }
}
for (const c of communities) { c.status='DEFERRED'; c.reason='CGN locality without census population — fails real-population gate; candidate v2 neighborhood/community page where signals exist'; }
// slugs (municipalities first by score)
const slug=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);
const slugSeen=new Set();
for (const c of [...csds].sort((a,b)=>(b.score??-1)-(a.score??-1))) {
  let s=slug(c.name.split(' / ')[0]);
  if (slugSeen.has(s)) s=slug(c.name.split(' / ')[0]+'-'+(c.county||'nb'));
  if (slugSeen.has(s)) s+='-'+c.typeCode.toLowerCase();
  slugSeen.add(s); c.slug=s;
}
// nearest neighbors among gate-passers (for the linking law)
const pass=csds.filter(c=>c.status==='GATE_PASS');
for (const c of pass) {
  c.nearby = pass.filter(o=>o!==c).map(o=>({name:o.name,slug:o.slug,km:Math.round(hav(c,o))}))
    .sort((a,b)=>a.km-b.km).slice(0,5);
}
fs.writeFileSync('nb_final.json', JSON.stringify({csds,communities},null,1));
// report
console.log('INTENDED:', csds.length+communities.length, '(CSDs',csds.length,'+ communities',communities.length,')');
console.log('GATE_PASS:', pass.length);
const byT={};for(const c of pass)byT[c.typeLong]=(byT[c.typeLong]||0)+1;console.log('pass by type:',byT);
const byR={};for(const c of pass)byR[c.region]=(byR[c.region]||0)+1;console.log('pass by region:',byR);
console.log('\nGATE_PASS list (score desc):');
for (const c of pass.sort((a,b)=>b.score-a.score))
  console.log(`${c.score}\t${c.name}\t${c.typeCode}\tpop ${c.pop21}\t${c.county}\t${c.region}\t/areas/${c.slug}\tMct ${c.distMonctonKm}km SJ ${c.distSaintJohnKm}km\tCMA:${c.cma||'-'}\t→ ${c.nearby.map(n=>n.slug+'('+n.km+'km)').join(', ')}`);
console.log('\nDEFERRED municipalities score 45-49.9 (near-miss):');
for (const c of csds.filter(c=>MUNI.has(c.typeCode)&&c.status==='DEFERRED'&&c.score>=45).sort((a,b)=>b.score-a.score))
  console.log(`${c.score}\t${c.name}\t${c.typeCode}\tpop ${c.pop21}\t${c.county}`);
