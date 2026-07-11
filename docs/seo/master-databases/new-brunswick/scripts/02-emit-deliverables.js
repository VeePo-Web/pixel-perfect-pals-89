// Emit repo deliverables + agent batch inputs
const fs = require('fs'), path = require('path');
const SCRATCH = __dirname;
const REPO = 'c:/Users/Business/Desktop/Claude Code/pixel-perfect-pals-89/docs/seo/master-databases/new-brunswick';
const data = JSON.parse(fs.readFileSync(path.join(SCRATCH,'nb_final.json'),'utf8'));
const cur = JSON.parse(fs.readFileSync(path.join(SCRATCH,'nb_curated_facts.json'),'utf8'));
for (const d of ['data','pages','pages/regions','pages/services']) fs.mkdirSync(path.join(REPO,d),{recursive:true});

const regionSlug = r => cur.regions[r] ? cur.regions[r].slug : 'new-brunswick';
const esc = v => { v = v==null?'':String(v); return /[",\n]/.test(v) ? '"'+v.replace(/"/g,'""')+'"' : v; };

// IDs by score
const sorted = [...data.csds].sort((a,b)=>(b.score??-1)-(a.score??-1));
sorted.forEach((c,i)=>c.id='NB-'+String(i+1).padStart(4,'0'));

// master CSV
const cols = ['Location_ID','Location_Name','Location_Type','County','Region','Province','Latitude','Longitude','Coord_Source','Postal_FSA','Population_2021_Census','Population_2016_Census','Pop_Change_Pct_2016_2021','Dwellings_2021','Occupied_Dwellings_2021','Seasonal_Vacant_Pct','Land_Area_Km2','Density_Per_Km2','CMA_or_MIZ','Dist_Moncton_Km','Dist_SaintJohn_Km','SEO_Priority_Score','URL_Slug','Page_URL','Status','Defer_Reason','Nearby_Links','Data_Sources','Verification_Status'];
let csv = cols.join(',')+'\n';
for (const c of sorted) {
  csv += [c.id,c.name,c.typeLong,c.county,c.region,'New Brunswick',c.lat!=null?c.lat.toFixed(5):'',c.lng!=null?c.lng.toFixed(5):'',c.coordSrc||'',
    '', c.pop21||'', c.pop16||'', c.popChangePct??'', c.dwell21||'', c.occ21||'', c.seasonalVacantPct??'', c.areaKm2||'', c.densityKm2||'', c.cma||'',
    c.distMonctonKm??'', c.distSaintJohnKm??'', c.score??'', c.slug, c.status==='GATE_PASS'?`/areas/${c.slug}`:'',
    c.status==='GATE_PASS'?'BUILT':'DEFERRED', c.reason||'', (c.nearby||[]).map(n=>`/areas/${n.slug} (${n.km}km)`).join(' | '),
    'StatCan 2021 Census 98-10-0002; NRCan CGN; StatCan GAF 92-151-X',
    c.status==='GATE_PASS'?'Verified':'Geographic_Verified'].map(esc).join(',')+'\n';
}
fs.writeFileSync(path.join(REPO,'data/nb_master_locations.csv'), csv);

// communities CSV
let ccsv = 'Community_ID,Name,CGN_Generic,County,Region,Latitude,Longitude,Status,Defer_Reason,Data_Sources\n';
data.communities.forEach((c,i)=>{
  ccsv += ['NB-C-'+String(i+1).padStart(4,'0'),c.name,c.generic,c.county,c.region||'',c.lat,c.lng,'DEFERRED',c.reason,'NRCan CGN (OGL-Canada)'].map(esc).join(',')+'\n';
});
fs.writeFileSync(path.join(REPO,'data/nb_communities_deferred.csv'), ccsv);

// image manifest (flag-tier fallback; metadata describes the PLACE)
const pass = sorted.filter(c=>c.status==='GATE_PASS');
let im = 'Page,Image_Source_Tier,Filename,Layer1_Alt_Geographic,Rendered_Alt_Template,EXIF_GeoTag,License,Source,Attribution_Note\n';
for (const c of pass) {
  const p = cur.places[c.slug]||{};
  const trait = p.geoTrait || `${c.county} County ${c.region} setting`;
  const alt1 = `${c.name}, ${c.county} County, New Brunswick — ${trait}`;
  im += [`/areas/${c.slug}`,'flag',`${c.slug}-${regionSlug(c.region)}-nb.webp`,alt1,
    `{SERVICE_CATEGORY} in ${c.name}, New Brunswick — ${alt1}`,`${c.lat.toFixed(5)},${c.lng.toFixed(5)} (${c.name})`,
    'Public Domain','Wikimedia Commons — Flag of New Brunswick',
    'Flag used as province-tier fallback; ALL metadata describes the place, never the flag. Upgrade path: verified CC0/Unsplash photo of the place.'].map(esc).join(',')+'\n';
}
for (const [rname,r] of Object.entries(cur.regions)) {
  const alt1 = `${rname} region, New Brunswick — ${r.counties.join(', ')} count${r.counties.length>1?'ies':'y'}`;
  im += [`/areas/region/${r.slug}`,'flag',`region-${r.slug}-nb.webp`,alt1,`{SERVICE_CATEGORY} across the ${rname} region, New Brunswick — ${alt1}`,'', 'Public Domain','Wikimedia Commons — Flag of New Brunswick','Province-tier fallback; metadata describes the region.'].map(esc).join(',')+'\n';
}
im += ['/areas','flag','areas-new-brunswick-nb.webp','New Brunswick, Canada — Bay of Fundy to the Acadian Peninsula service map','{SERVICE_CATEGORY} across New Brunswick — province service map','','Public Domain','Wikimedia Commons — Flag of New Brunswick','Province hub fallback.'].map(esc).join(',')+'\n';
fs.writeFileSync(path.join(REPO,'data/image-manifest.csv'), im);

// batch inputs
const byRegion = {};
for (const c of pass) { (byRegion[c.region]=byRegion[c.region]||[]).push(c); }
for (const k in byRegion) byRegion[k].sort((a,b)=>b.score-a.score);
const mk = c => {
  const p = cur.places[c.slug]||{};
  return { id:c.id, name:c.name, slug:c.slug, url:`/areas/${c.slug}`, type:c.typeLong, county:c.county,
    region:c.region, regionSlug:regionSlug(c.region), regionUrl:`/areas/region/${regionSlug(c.region)}`,
    lat:+c.lat.toFixed(5), lng:+c.lng.toFixed(5), pop2021:c.pop21, pop2016:c.pop16, popChangePct:c.popChangePct,
    dwellings2021:c.dwell21, occupiedDwellings2021:c.occ21, seasonalVacantPct:c.seasonalVacantPct,
    areaKm2:c.areaKm2, densityPerKm2:c.densityKm2, cmaOrMiz:c.cma, distMonctonKm:c.distMonctonKm,
    distSaintJohnKm:c.distSaintJohnKm, score:c.score, nearby:c.nearby,
    curated:{hook:p.hook||null, facts:p.facts||[], neighborhoods:p.neighborhoods||[], streets:p.streets||[], geoTrait:p.geoTrait||null} };
};
const R = Object.fromEntries(Object.entries(byRegion).map(([k,v])=>[k,v.map(mk)]));
const half = a => [a.slice(0,Math.ceil(a.length/2)), a.slice(Math.ceil(a.length/2))];
const [r1a,r1b]=half(R['Greater Moncton & Southeast']);
const [r2a,r2b]=half(R['Fundy & Greater Saint John']);
const [r3a,r3b]=half(R['Capital & River Valley']);
const batches = [
  {n:1, places:r1a, regionPages:[]},
  {n:2, places:r1b, regionPages:['Greater Moncton & Southeast']},
  {n:3, places:r2a, regionPages:[]},
  {n:4, places:r2b, regionPages:['Fundy & Greater Saint John']},
  {n:5, places:r3a, regionPages:[]},
  {n:6, places:r3b, regionPages:['Capital & River Valley']},
  {n:7, places:[...R['Northwest & Madawaska'],...R['Restigouche & Chaleur Bay']], regionPages:['Northwest & Madawaska','Restigouche & Chaleur Bay']},
  {n:8, places:[...R['Miramichi River Region'],...R['Acadian Peninsula & Chaleur']], regionPages:['Miramichi River Region','Acadian Peninsula & Chaleur']},
];
for (const b of batches) {
  const regions = {};
  for (const p of b.places) regions[p.region] = cur.regions[p.region];
  for (const r of b.regionPages) regions[r] = cur.regions[r];
  const regionPageDefs = b.regionPages.map(rn=>({ name:rn, slug:cur.regions[rn].slug, url:`/areas/region/${cur.regions[rn].slug}`,
    counties:cur.regions[rn].counties, childPlaces:(byRegion[rn]||[]).map(c=>({name:c.name,slug:c.slug,url:`/areas/${c.slug}`,pop:c.pop21,score:c.score})) }));
  fs.writeFileSync(path.join(SCRATCH,`batch${b.n}.json`), JSON.stringify({ batch:b.n, province:cur.province, regions, regionPageDefs, places:b.places }, null, 1));
  console.log(`batch${b.n}: ${b.places.length} places (${b.places.map(p=>p.slug).join(', ')})${b.regionPages.length?' + region pages: '+b.regionPages.join('; '):''}`);
}
// curated coverage check
const missing = pass.filter(c=>!cur.places[c.slug]).map(c=>c.slug);
console.log('curated missing:', missing.length?missing:'none');
console.log('CSV rows:', sorted.length, '| communities:', data.communities.length, '| manifest pages:', pass.length+7+1);
