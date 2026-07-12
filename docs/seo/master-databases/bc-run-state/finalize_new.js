const fs=require('fs');
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b);const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
const u=JSON.parse(fs.readFileSync('bc_universe.json','utf8'));
const regions=JSON.parse(fs.readFileSync('region_bundles.json','utf8'));
const DROP={'Hanceville':'GeoNames population (10,000) implausible for this settlement','Aldergrove East':'near-duplicate of Aldergrove','Denman Island Trust Area':'duplicate of already-built Denman Island'};
for(const r of u){
  if(r.Gate_Publishable&&!r.Already_Built&&DROP[r.Location_Name]){ r.Gate_Publishable=false; r.Defer_Reason='data quality: '+DROP[r.Location_Name]; }
}
const built=u.filter(r=>r.Already_Built||(r.Gate_Publishable&&!r.Already_Built));
const pubAll=u.filter(r=>r.Gate_Publishable); // built(182)+new(13)
const newPub=pubAll.filter(r=>!r.Already_Built);
console.log('FINAL new publishable:',newPub.length,'->',newPub.map(r=>r.Location_Name).join(', '));
// write bundles for the new ones (nearby computed against ALL publishable that have coords+content)
fs.mkdirSync('bundles_new',{recursive:true});
const pubCoord=pubAll.filter(r=>r.Latitude);
for(const r of newPub){
  const nearby=pubCoord.filter(o=>o.Location_ID!==r.Location_ID)
    .map(o=>({name:o.Location_Name,slug:o.URL_Slug,km:Math.round(hav(r.Latitude,r.Longitude,o.Latitude,o.Longitude))}))
    .sort((a,b)=>a.km-b.km).slice(0,5);
  const b={
    Location_ID:r.Location_ID,Location_Name:r.Location_Name,Location_Type:r.Location_Type,
    Parent_Municipality:r.Parent_Municipality||null,Parent_Region:r.Parent_Region,Province:'British Columbia',
    Latitude:r.Latitude,Longitude:r.Longitude,FSA:null,
    Population_2021_Census:r.Population_2021_Census,Population_Source:'GeoNames (CC-BY)',
    Distance_From_Vancouver_KM:r.Distance_From_Vancouver_KM,Distance_From_Victoria_KM:r.Distance_From_Victoria_KM,
    Unified_Score:r.Unified_Score,URL_Slug:r.URL_Slug,
    existing_Entity_Description:null,existing_Local_Facts:null,existing_Long_Description:null,
    Notes:'Enumerated from GeoNames census expansion (not in original spreadsheet). Population is a GeoNames estimate — treat as approximate; omit any uncertain specifics.',
    REGION_BUNDLE:regions[r.Parent_Region],NEARBY_AREAS:nearby,CHILD_PAGES:[],
    UP_LINK:{name:r.Parent_Region,slug:''}
  };
  fs.writeFileSync('bundles_new/'+r.Location_ID+'.json',JSON.stringify(b,null,1));
}
fs.writeFileSync('bc_universe.json',JSON.stringify(u));
fs.writeFileSync('bc_new_manifest.json',JSON.stringify(newPub.sort((a,b)=>b.Unified_Score-a.Unified_Score).map(r=>({id:r.Location_ID,name:r.Location_Name,slug:r.URL_Slug,score:r.Unified_Score,region:r.Parent_Region}))));
console.log('bundles_new written:',fs.readdirSync('bundles_new').length);
