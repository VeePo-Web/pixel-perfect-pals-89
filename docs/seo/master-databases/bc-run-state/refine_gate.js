const fs=require('fs');
const fold=s=>(s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const u=JSON.parse(fs.readFileSync('bc_universe.json','utf8'));
const built=new Set(fs.readdirSync('out').map(f=>f.replace('.json','')));
// names/coords of already-built + all spreadsheet municipalities (to dedupe GeoNames collisions)
const builtRows=u.filter(r=>built.has(r.Location_ID));
const builtNames=new Set(builtRows.map(r=>fold(r.Location_Name)));
// also fold common variants: "Langley (City)" -> "langley"
const stripDesc=n=>fold(n).replace(/\s*\(.*?\)\s*/g,'').replace(/\b(city|district|township|regional district|first nation|nation)\b/g,'').trim();
const builtBare=new Set(builtRows.map(r=>stripDesc(r.Location_Name)));

let reclNbhd=0, reclDupe=0;
for(const r of u){
  if(!r.Gate_Publishable || r.Already_Built) continue;
  // 1. GeoNames neighborhoods (PPLX) are NOT auto-published as location pages (would cannibalize parent city keyword)
  if(r._fcode==='PPLX'){ r.Gate_Publishable=false; r.Defer_Reason='neighborhood tier — needs real signals, not auto-spawned'; reclNbhd++; continue; }
  // 2. duplicates of an already-built municipality by name (any distance = same place, different GeoNames rep point)
  const bare=stripDesc(r.Location_Name);
  if(builtNames.has(fold(r.Location_Name)) || builtBare.has(bare)){ r.Gate_Publishable=false; r.Defer_Reason='duplicate of an already-built municipality'; reclDupe++; continue; }
}
const pub=u.filter(r=>r.Gate_Publishable);
const newPub=pub.filter(r=>!r.Already_Built);
console.log('reclassified: neighborhoods ->', reclNbhd, '| dupes ->', reclDupe);
console.log('PUBLISHABLE now:',pub.length,'| built:',pub.filter(r=>r.Already_Built).length,'| NEW:',newPub.length);
const nb={};newPub.forEach(r=>nb[r.Parent_Region]=(nb[r.Parent_Region]||0)+1);
console.log('NEW by region:',JSON.stringify(nb));
const bt={};newPub.forEach(r=>bt[r.Location_Type]=(bt[r.Location_Type]||0)+1);
console.log('NEW by type:',JSON.stringify(bt));
console.log('NEW top 20:',newPub.sort((a,b)=>b.Unified_Score-a.Unified_Score).slice(0,20).map(r=>r.Location_Name+' '+r.Unified_Score+'('+r.Population_2021_Census+')').join(' · '));
const def=u.filter(r=>!r.Gate_Publishable);
const dr={};def.forEach(r=>dr[r.Defer_Reason]=(dr[r.Defer_Reason]||0)+1);
console.log('DEFERRED:',def.length,JSON.stringify(dr));
fs.writeFileSync('bc_universe.json',JSON.stringify(u));
fs.writeFileSync('bc_new_publishable.json',JSON.stringify(newPub.map(r=>({id:r.Location_ID,name:r.Location_Name,slug:r.URL_Slug,score:r.Unified_Score,region:r.Parent_Region}))));
