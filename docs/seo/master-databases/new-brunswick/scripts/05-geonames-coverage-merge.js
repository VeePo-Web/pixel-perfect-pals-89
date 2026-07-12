const fs=require('fs'),path=require('path');
const REPO='c:/Users/Business/Desktop/Claude Code/pixel-perfect-pals-89/docs/seo/master-databases/new-brunswick';
const gnN=JSON.parse(fs.readFileSync(path.join(__dirname,'gn_neighborhoods.json'),'utf8'));
const gnC=JSON.parse(fs.readFileSync(path.join(__dirname,'gn_communities.json'),'utf8'));
const cur=JSON.parse(fs.readFileSync(path.join(__dirname,'nb_neighborhoods_curated.json'),'utf8'));
const esc=v=>{v=v==null?'':String(v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;};
const builtSlugs=new Set(cur.neighborhoods.map(n=>n.slug));

// 1. Neighborhoods CSV (all 32 GeoNames PPLX: BUILT ones + deferred subdivisions)
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
let ncsv='Neighborhood_ID,Name,Parent_City,Parent_City_URL,Region,Latitude,Longitude,GeoNames_Pop_Est,Status,Page_URL,Reason,Data_Source\n';
let ni=0;
// built
for(const n of cur.neighborhoods){
  ni++;
  ncsv+=['NB-N-'+String(ni).padStart(3,'0'),n.name,n.parentName,'/areas/'+n.parentSlug,n.region,n.lat,n.lng,n.gnPop||'','BUILT','/areas/'+n.parentSlug+'/'+n.slug,'grounded local signals present (heritage/landmark/street)','GeoNames CC-BY + verified local facts'].map(esc).join(',')+'\n';
}
// deferred PPLX subdivisions (GeoNames neighborhoods not built)
for(const g of gnN){
  const slug=norm(g.name);
  if(builtSlugs.has(slug)||builtSlugs.has(norm(g.name.replace(/^(downtown|uptown|central) /i,'')))) continue;
  // skip if it maps to a built one by name contains
  if(cur.neighborhoods.some(n=>norm(n.name)===slug)) continue;
  ni++;
  ncsv+=['NB-N-'+String(ni).padStart(3,'0'),g.name,g.nearestBuilt,'/areas/'+g.nearestBuilt,'',g.lat,g.lng,g.gnPop||'','DEFERRED','','subdivision/statistical section — insufficient distinct groundable local signals to meet the depth gate','GeoNames CC-BY'].map(esc).join(',')+'\n';
}
fs.writeFileSync(path.join(REPO,'data/nb_neighborhoods.csv'),ncsv);
console.log('neighborhoods CSV rows:',ni);

// 2. GeoNames-only communities -> append to a supplementary deferred CSV
let ccsv='Community_ID,Name,GeoNames_Code,Latitude,Longitude,GeoNames_Pop_Est,Nearest_Built,Nearest_Built_Km,Status,Reason,Data_Source\n';
gnC.forEach((g,i)=>{
  const reason=g.code==='PPLX'?'statistical section >20km from a built city — deferred':
    /First Nation/i.test(g.name)?'First Nations community — excluded from third-party landing-page build by policy':
    'GeoNames-only populated place (StatCan population centre or dispersed community) without standalone census-subdivision population — fails real-population gate';
  ccsv+=['NB-GC-'+String(i+1).padStart(4,'0'),g.name,g.code,g.lat,g.lng,g.gnPop||'',g.nearestBuilt||'',g.nearestBuiltKm||'','DEFERRED',reason,'GeoNames CC-BY'].map(esc).join(',')+'\n';
});
fs.writeFileSync(path.join(REPO,'data/nb_geonames_supplementary_deferred.csv'),ccsv);
console.log('GeoNames-only communities CSV rows:',gnC.length);

// 3. coverage numbers
const mine=JSON.parse(fs.readFileSync(path.join(__dirname,'nb_final.json'),'utf8'));
const builtLoc=mine.csds.filter(c=>c.status==='GATE_PASS').length;
const builtN=cur.neighborhoods.length;
const defCSD=mine.csds.length-builtLoc;
const defComm=mine.communities.length;
const defGN=gnC.length + (gnN.length-builtN);
console.log('\\n=== FINAL COVERAGE RECONCILIATION ===');
console.log('INTENDED total:',mine.csds.length+mine.communities.length+gnN.length+gnC.length);
console.log('  BUILT: location pages',builtLoc,'+ region',7,'+ hub 1 + neighborhoods',builtN,'=',builtLoc+7+1+builtN);
console.log('  DEFERRED: CSDs',defCSD,'+ CGN communities',defComm,'+ GeoNames neighborhoods',gnN.length-builtN,'+ GeoNames communities',gnC.length);
console.log('  = DEFERRED total:',defCSD+defComm+defGN);
