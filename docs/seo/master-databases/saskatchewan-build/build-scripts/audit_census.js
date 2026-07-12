const fs=require('fs');const XLSX=require('xlsx');
function parseCSV(txt){const out=[];let row=[],f='',q=false;for(let i=0;i<txt.length;i++){const ch=txt[i];
  if(q){if(ch==='"'){if(txt[i+1]==='"'){f+='"';i++;}else q=false;}else f+=ch;}
  else if(ch==='"')q=true;else if(ch===','){row.push(f);f='';}else if(ch==='\n'){row.push(f.replace(/\r$/,''));out.push(row);row=[];f='';}else f+=ch;}
  if(f||row.length){row.push(f);out.push(row);}return out;}

// ---- CGN full universe ----
const cgnRows=parseCSV(fs.readFileSync('cgn/cgn_sk_csv_eng.csv','utf8').replace(/^﻿/,''));
const ch=cgnRows[0];const gi=n=>ch.indexOf(n);
const CI={name:gi('Geographical Name'),code:gi('Concise Code'),lat:gi('Latitude'),lng:gi('Longitude')};
const POP_CODES=['CITY','TOWN','VILG','HAM','UNP','IR','MUN2'];
const cgnByCode={}; const cgnPlaces=[];
for(const r of cgnRows.slice(1)){
  const code=r[CI.code]; if(!POP_CODES.includes(code))continue;
  cgnByCode[code]=(cgnByCode[code]||0)+1;
  cgnPlaces.push({name:r[CI.name],code,lat:+r[CI.lat],lng:+r[CI.lng]});
}
console.log('=== CGN populated-place features (SK) ===');
console.log(JSON.stringify(cgnByCode));
console.log('CGN total populated-place features:',cgnPlaces.length);

// ---- StatCan municipalities ----
const mun=parseCSV(fs.readFileSync('sk/sk_municipalities_clean.csv','utf8'));
const munRows=mun.slice(1).filter(r=>r[0]);
const munByStatus={};
for(const r of munRows) munByStatus[r[1]]=(munByStatus[r[1]]||0)+1;
console.log('\n=== StatCan sk_municipalities_clean.csv ===');
console.log('rows:',munRows.length,'| by status:',JSON.stringify(munByStatus));
const withPop=munRows.filter(r=>+r[3]>0).length;
console.log('with pop_2021 > 0:',withPop);

// ---- The sheet ----
const wb=XLSX.readFile('sk/saskatchewan_master_seo_database_OPTIMIZED.xlsx');
const rows=XLSX.utils.sheet_to_json(wb.Sheets['MASTER_LOCATIONS'],{header:1,defval:null});
const H=rows[1];const data=rows.slice(2).filter(r=>r[0]);const col=n=>H.indexOf(n);
const sheetByType={};
for(const r of data) sheetByType[r[col('Location_Type')]]=(sheetByType[r[col('Location_Type')]]||0)+1;
console.log('\n=== Sheet MASTER_LOCATIONS ===');
console.log('rows:',data.length,'| by type:',JSON.stringify(sheetByType));

// ---- Reconcile: which incorporated municipalities in StatCan are NOT in the sheet? ----
const sheetNames=new Set(data.map(r=>String(r[col('Location_Name')]).toLowerCase().trim()));
const missingMun=munRows.filter(r=>{
  const nm=String(r[0]).toLowerCase().replace(/ no\. \d+$/,'').trim();
  return !sheetNames.has(nm) && !sheetNames.has(String(r[0]).toLowerCase().trim());
});
console.log('\n=== StatCan municipalities NOT found by name in sheet ===');
console.log('count:',missingMun.length);
console.log(missingMun.slice(0,40).map(r=>r[0]+'/'+r[1]+'/pop'+r[3]).join(' · '));

// ---- Buildable universe: real pop + CGN coords ----
// Build RM base index from CGN
const rmBase={};
for(const p of cgnPlaces){ if(p.code!=='MUN2')continue; const m=p.name.toLowerCase().match(/^(.+?) no\. \d+$/); if(m&&!rmBase[m[1]])rmBase[m[1]]=p; }
const cgnByName={};
for(const p of cgnPlaces){ if(p.code==='MUN2')continue; const k=p.name.toLowerCase(); (cgnByName[k]=cgnByName[k]||[]).push(p); }
function coordFor(name,status){
  const key=name.toLowerCase();
  if(status==='Rural Municipality'){const b=name.toLowerCase().replace(/ no\. \d+$/,''); return rmBase[b]||null;}
  const pref={'City':['CITY'],'Town':['TOWN','VILG'],'Village':['VILG','HAM'],'Resort Village':['VILG','HAM','UNP'],'Northern Village':['VILG','HAM','UNP'],'Northern Town':['TOWN','VILG'],'Northern Hamlet':['HAM','UNP','VILG']}[status]||['VILG','HAM','UNP'];
  const cands=cgnByName[key]; if(!cands)return null;
  for(const c of pref){const h=cands.find(x=>x.code===c);if(h)return h;}
  return null;
}
let buildable=0, noCoord=0;
const buildableList=[];
for(const r of munRows){
  const name=r[0],status=r[1],pop=+r[3];
  if(!(pop>0))continue;
  const c=coordFor(name,status);
  if(!c){noCoord++;continue;}
  buildable++; buildableList.push({name,status,pop,pop16:+r[4]||null,parent_rm:r[2]||null,lat:c.lat,lng:c.lng});
}
console.log('\n=== BUILDABLE from StatCan (real pop_2021 + CGN coords) ===');
console.log('buildable:',buildable,'| StatCan-with-pop but no CGN coord:',noCoord);
const bByStatus={}; for(const b of buildableList) bByStatus[b.status]=(bByStatus[b.status]||0)+1;
console.log('by status:',JSON.stringify(bByStatus));
fs.writeFileSync('sk_statcan_buildable.json',JSON.stringify(buildableList,null,1));
