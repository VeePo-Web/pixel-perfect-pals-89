const fs = require('fs');
const fold = s => (s||'').normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/\s+/g,' ').trim();
const hav = (a,b,c,d) => { const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b); const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2; return 2*R*Math.asin(Math.sqrt(h)); };
const slugify = s => fold(s).replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,60);

const census = JSON.parse(fs.readFileSync('bc_census_places.json','utf8'));   // 1827 GeoNames
const sheet  = JSON.parse(fs.readFileSync('bc_rows_upgraded.json','utf8'));   // 480 spreadsheet (scored, some built)

// region centroids from scored sheet rows that have coords + region
const regPts = {};
sheet.filter(r=>r.Latitude&&r.Longitude&&r.Parent_Region).forEach(r=>{ (regPts[r.Parent_Region]=regPts[r.Parent_Region]||[]).push([r.Latitude,r.Longitude]); });
const regCent = {};
for (const k in regPts){ const a=regPts[k]; regCent[k]=[a.reduce((s,p)=>s+p[0],0)/a.length, a.reduce((s,p)=>s+p[1],0)/a.length]; }
const assignRegion = (lat,lng) => { let best=null,bd=Infinity; for(const k in regCent){const d=hav(lat,lng,regCent[k][0],regCent[k][1]); if(d<bd){bd=d;best=k;}} return best; };

// index sheet rows by folded name for dedup
const sheetByName = {};
sheet.forEach(r=>{ (sheetByName[fold(r.Location_Name)]=sheetByName[fold(r.Location_Name)]||[]).push(r); });

// fcode -> Location_Type
const typeMap = { PPLA:'City', PPLA2:'City', PPLA3:'Municipality', PPLC:'City', PPL:'Community', PPLL:'Community', PPLX:'Neighborhood', PPLG:'Community' };

// Start universe from the sheet (keep everything, it's the richest)
const universe = sheet.map(r => ({...r, _src:'spreadsheet'}));
const usedSlugs = new Set(universe.map(r=>r.URL_Slug));
const sheetCoords = universe.filter(r=>r.Latitude&&r.Longitude).map(r=>[r.Latitude,r.Longitude,fold(r.Location_Name)]);

let added=0, matchedExisting=0, nextId=Math.max(...sheet.map(r=>+r.Location_ID.split('-')[1]))+1;
for (const g of census) {
  const fn = fold(g.name);
  // match to existing sheet row: same folded name AND within 5 km
  let matched=false;
  const cands = sheetByName[fn]||[];
  for (const c of cands) {
    if (c.Latitude && c.Longitude && hav(c.Latitude,c.Longitude,g.lat,g.lng) < 6) { matched=true; break; }
    if (!c.Latitude) { matched=true; break; } // same name, sheet had no coord -> treat as same
  }
  if (matched) { matchedExisting++; continue; }
  // new place from GeoNames
  const region = assignRegion(g.lat,g.lng);
  let slug = slugify(g.name)+'-bc';
  if (usedSlugs.has(slug)) { // disambiguate on real collision
    const rc = (region||'bc').split(/[\s-]/).map(w=>w[0]).join('').toLowerCase().slice(0,3);
    slug = slugify(g.name)+'-'+rc+'-bc';
    let n=2; while(usedSlugs.has(slug)){ slug=slugify(g.name)+'-'+rc+n+'-bc'; n++; }
  }
  usedSlugs.add(slug);
  const id = 'BC-'+String(nextId++).padStart(4,'0');
  universe.push({
    Location_ID:id, Location_Name:g.name, Location_Type:typeMap[g.fcode]||'Community',
    Parent_Municipality:null, Parent_Region:region, Province:'British Columbia',
    Latitude:+g.lat.toFixed(4), Longitude:+g.lng.toFixed(4),
    Population_2021_Census: g.pop>0 ? g.pop : null,
    URL_Slug:slug, Verification_Status:null, Gate_Publishable:false,
    _src:'geonames', _geo_source:'GeoNames', _pop_source: g.pop>0?'GeoNames':null, _gid:g.gid, _fcode:g.fcode
  });
  added++;
}
console.log('sheet rows:', sheet.length);
console.log('geonames places:', census.length, '| matched existing:', matchedExisting, '| added new:', added);
console.log('TOTAL UNIVERSE:', universe.length);
console.log('with real population:', universe.filter(r=>r.Population_2021_Census).length);
console.log('with real coords:', universe.filter(r=>r.Latitude).length);
const byType={}; universe.forEach(r=>byType[r.Location_Type]=(byType[r.Location_Type]||0)+1);
console.log('by type:', JSON.stringify(byType));
// dup slug check
const sc={}; universe.forEach(r=>sc[r.URL_Slug]=(sc[r.URL_Slug]||0)+1);
console.log('dup slugs:', Object.values(sc).filter(c=>c>1).length);
fs.writeFileSync('bc_universe.json', JSON.stringify(universe));
