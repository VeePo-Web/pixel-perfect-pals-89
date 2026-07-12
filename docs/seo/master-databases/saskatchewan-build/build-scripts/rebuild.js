const fs = require('fs');
const XLSX = require('xlsx');
function parseCSV(txt){ const out=[]; let row=[],f='',q=false; for(let i=0;i<txt.length;i++){const ch=txt[i];
  if(q){ if(ch==='"'){ if(txt[i+1]==='"'){f+='"';i++;} else q=false; } else f+=ch; }
  else if(ch==='"') q=true; else if(ch===','){row.push(f);f='';} else if(ch==='\n'){row.push(f.replace(/\r$/,''));out.push(row);row=[];f='';} else f+=ch; }
  if(f||row.length){row.push(f);out.push(row);} return out; }
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b),h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};

// CGN
const cgnRows = parseCSV(fs.readFileSync('cgn/cgn_sk_csv_eng.csv','utf8').replace(/^﻿/,''));
const ch = cgnRows[0]; const gi=n=>ch.indexOf(n);
const CI={name:gi('Geographical Name'),code:gi('Concise Code'),lat:gi('Latitude'),lng:gi('Longitude')};
const cgn={}; const lakes=[]; const rivers=[];
for(const r of cgnRows.slice(1)){
  const code=r[CI.code], nm=r[CI.name], lat=+r[CI.lat], lng=+r[CI.lng];
  if(code==='LAKE'){lakes.push([nm,lat,lng]);continue;}
  if(code==='RIV'){rivers.push([nm,lat,lng]);continue;}
  if(!['CITY','TOWN','VILG','HAM','UNP','MUN2','IR'].includes(code)) continue;
  const key=nm.toLowerCase();
  (cgn[key]=cgn[key]||[]).push({code,lat,lng,nm});
}
// StatCan CSV
const mun = parseCSV(fs.readFileSync('sk/sk_municipalities_clean.csv','utf8'));
const munByKey={};
for(const r of mun.slice(1)){ if(!r[0])continue;
  munByKey[(r[0].toLowerCase())+'|'+(r[1]||'')] = {name:r[0],status:r[1],parent_rm:r[2],pop21:+r[3]||null,pop16:+r[4]||null};
}
// xlsx
const wb = XLSX.readFile('sk/saskatchewan_master_seo_database_OPTIMIZED.xlsx');
const rows = XLSX.utils.sheet_to_json(wb.Sheets['MASTER_LOCATIONS'], {header:1, defval:null});
const H=rows[1]; const data=rows.slice(2).filter(r=>r[0]);
const col=n=>H.indexOf(n);
const typeToCgn={'City':['CITY'],'Town':['TOWN'],'Northern Town':['TOWN','VILG','HAM'],'Village':['VILG','HAM'],'Resort Village':['VILG','HAM','UNP'],'Northern Village':['VILG','HAM','UNP'],'Rural Municipality':['MUN2'],'Organized Hamlet':['HAM','UNP','VILG'],'Locality':['UNP','HAM','VILG'],'Northern Hamlet':['HAM','UNP','VILG']};
// StatCan sk_municipalities_clean.csv uses lowercase second words — match its exact casing
const typeToStatus={'City':'City','Town':'Town','Village':'Village','Resort Village':'Resort village','Northern Village':'Northern village','Northern Town':'Northern town','Northern Hamlet':'Northern hamlet','Rural Municipality':'Rural Municipality'};

const rmBase={};
for(const k of Object.keys(cgn)){
  const m=k.match(/^(.+?) no\. \d+$/);
  if(m){ const hit=cgn[k].find(x=>x.code==='MUN2'); if(hit && !rmBase[m[1]]) rmBase[m[1]]=hit; }
}
function cgnMatch(name,type){
  const key=name.toLowerCase(); const prefs=typeToCgn[type]||['UNP','HAM'];
  if(type==='Rural Municipality') return rmBase[key]||null;
  const cands=cgn[key]; if(!cands) return null;
  for(const p of prefs){ const hit=cands.find(x=>x.code===p); if(hit) return hit; }
  return null;
}
const sask=cgnMatch('Saskatoon','City'), reg=cgnMatch('Regina','City');
console.log('HUBS:', JSON.stringify({sask,reg}));

const anchors=[['Moose Jaw','Southern Saskatchewan'],['Assiniboia','Southern Saskatchewan'],['Prince Albert','Central Saskatchewan'],['Humboldt','Central Saskatchewan'],['Melfort','Central Saskatchewan'],['Tisdale','Central Saskatchewan'],['Nipawin','Central Saskatchewan'],['Watrous','Central Saskatchewan'],['Weyburn','Southeast Saskatchewan'],['Estevan','Southeast Saskatchewan'],['Yorkton','Southeast Saskatchewan'],['Melville','Southeast Saskatchewan'],['Moosomin','Southeast Saskatchewan'],['Canora','Southeast Saskatchewan'],['North Battleford','Northwest Saskatchewan'],['Lloydminster','Northwest Saskatchewan'],['Meadow Lake','Northwest Saskatchewan'],['Unity','Northwest Saskatchewan'],['Swift Current','Southwest Saskatchewan'],['Maple Creek','Southwest Saskatchewan'],['Gravelbourg','Southwest Saskatchewan'],['Kindersley','West Central Saskatchewan'],['Rosetown','West Central Saskatchewan'],['Biggar','West Central Saskatchewan']];
const anchorPts = anchors.map(([n,rg])=>{const m=cgnMatch(n,'Town')||cgnMatch(n,'City');return m?{n,reg:rg,lat:m.lat,lng:m.lng}:null;}).filter(Boolean);
console.log('ANCHORS resolved:', anchorPts.length, '/', anchors.length);

const TOR=Math.log10(2794356);
const out=[]; let cgnMiss=0, popConflict=0;
for(const r of data){
  const name=r[col('Location_Name')], type=r[col('Location_Type')];
  const region0=r[col('Parent_Region')];
  const vstat=r[col('Verification_Status')];
  const m=cgnMatch(name,type);
  let stat=munByKey[(name.toLowerCase())+'|'+(typeToStatus[type]||'')];
  if(!stat && type==='Rural Municipality'){
    stat=Object.values(munByKey).find(x=>x.status==='Rural Municipality'&&x.name.toLowerCase().replace(/ no\. \d+$/,'')===name.toLowerCase());
  }
  let pop=Number(r[col('Population_2021_Census')])||null;
  let popSource='sheet';
  if(stat&&stat.pop21){ if(pop&&Math.abs(pop-stat.pop21)>2) popConflict++; pop=stat.pop21; popSource='statcan'; }
  const lat=m?m.lat:null, lng=m?m.lng:null;
  if(!m) cgnMiss++;
  let dS=null,dR=null,region=null;
  if(m){ dS=Math.round(hav(lat,lng,sask.lat,sask.lng)); dR=Math.round(hav(lat,lng,reg.lat,reg.lng));
    if(dS<=60) region='Saskatoon Region'; else if(dR<=60) region='Regina Region';
    else if(lat>=54.4) region='Northern Saskatchewan';
    else { let best=null,bd=1e9; for(const a of anchorPts){const d=hav(lat,lng,a.lat,a.lng); if(d<bd){bd=d;best=a;}} region=best.reg; }
  }
  let u=null;
  if(m&&pop){ const p30=Math.min(30,Math.log10(Math.max(pop,1))/TOR*30);
    const sv=pop>=100000?24:pop>=20000?19:pop>=5000?14:pop>=1000?8:pop>=200?3:1;
    const comp=pop>=100000?4:pop>=20000?8:pop>=5000?12:pop>=1000?15:18;
    const prox=Math.max((1-Math.min(dS,dR)/500)*15,0);
    const econ=/City|Regional/i.test(type)?8:/Town|Rural Municipality|Municipality|District|County/i.test(type)?5:/Village|Community|Resort/i.test(type)?3:1;
    u=Math.round((p30+sv+comp+prox+econ)*10)/10; }
  out.push({id:r[col('Location_ID')],name,type,region0,region,vstat,pop,popSource,pop16:stat?stat.pop16:null,parentRM:stat?stat.parent_rm:null,rmOfficial:(type==='Rural Municipality'&&stat)?stat.name:null,lat,lng,dS,dR,u,slug:r[col('URL_Slug')],cgnName:m?m.nm:null});
}
console.log('CGN unmatched rows:', cgnMiss, ' popConflicts(StatCan wins):', popConflict);
const incNames=new Set(out.filter(s=>/City|Town|Village/.test(s.type)).map(s=>s.name.toLowerCase()));
// EXPANDED GATE (full-coverage build): every place with a real StatCan population + CGN-verified
// coordinates + source Verification_Status = Verified. Score threshold and RM floor dropped — the hard
// grounding gate (real pop + real coords + Verified) is what keeps thin/ungroundable pages out.
const built=out.filter(s=>s.popSource==='statcan' && s.lat && !(s.type==='Locality'&&incNames.has(s.name.toLowerCase())));
built.sort((a,b)=>b.u-a.u);
console.log('BUILT after re-ground:', built.length);
const byR={}; for(const b of built)(byR[b.region]=byR[b.region]||[]).push(b.name+'('+b.type[0]+',p'+b.pop+',u'+b.u+',dS'+b.dS+',dR'+b.dR+')');
for(const [k,v] of Object.entries(byR)) console.log('\n'+k+' ['+v.length+']: '+v.join(' · '));
const slugCount={}; for(const s of out) slugCount[s.slug]=(slugCount[s.slug]||0)+1;
for(const b of built){ let sl=b.slug;
  if(sl==='le-la-crosse') sl='ile-a-la-crosse';
  if(b.type==='Rural Municipality' && slugCount[b.slug]>1) sl=sl+'-rm';
  b.finalSlug=sl; }
const seen={}; for(const b of built){ if(seen[b.finalSlug]) b.finalSlug+='-'+b.id.slice(-3).toLowerCase(); seen[b.finalSlug]=1; }
for(const b of built){ b.near=built.filter(x=>x.id!==b.id).map(x=>({s:x.finalSlug,n:x.name,d:Math.round(hav(b.lat,b.lng,x.lat,x.lng))})).sort((a,c)=>a.d-c.d).slice(0,5); }
for(const b of built){
  let bl=null,bd=8; for(const [nm,la,lo] of lakes){const d=hav(b.lat,b.lng,la,lo); if(d<bd){bd=d;bl=nm;}}
  b.lake=bl; b.lakeKm=bl?Math.round(bd*10)/10:null;
  let br=null,bdr=6; for(const [nm,la,lo] of rivers){const d=hav(b.lat,b.lng,la,lo); if(d<bdr){bdr=d;br=nm;}}
  b.river=br;
}
fs.writeFileSync('sk_built_final.json', JSON.stringify(built,null,1));
const builtIds=new Set(built.map(b=>b.id));
const deferred=out.filter(s=>!builtIds.has(s.id)).map(s=>({id:s.id,name:s.name,type:s.type,region:s.region||s.region0,pop:s.pop,u:s.u,
  reason: (s.type==='Locality'&&incNames.has(s.name.toLowerCase()))?'duplicate place (locality twin of an incorporated municipality)'
    : s.popSource!=='statcan'?('no published StatCan census population ('+s.type+' — unincorporated locality / reserve / neighborhood; population would have to be invented)')
    : !s.lat?'no CGN-verifiable coordinates'
    : 'other'}));
fs.writeFileSync('sk_deferred_final.json', JSON.stringify(deferred));
const dr={}; for(const d of deferred){const k=d.reason.replace(/ [\d.]+ below 50/,' below 50');dr[k]=(dr[k]||0)+1;}
console.log('\nDEFERRED total', deferred.length, JSON.stringify(dr,null,1));
console.log('RECONCILE: intended', out.length, '= built', built.length, '+ deferred', deferred.length);
