const XLSX = require('xlsx');
const fs = require('fs');
const BASE = __dirname;
const path = 'C:\\Users\\Business\\AppData\\Local\\Temp\\claude\\c--Users-Business-Desktop-Claude-Code-pixel-perfect-pals-89\\81f5b35c-2302-4bd1-9f82-c683854d0e4f\\scratchpad\\ontario\\ontario_master_seo_database_OPTIMIZED (1).xlsx';
const wb = XLSX.readFile(path);
const ws = wb.Sheets['MASTER_LOCATIONS'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
const headers = rows[1];
const data = rows.slice(2).filter(r => r[0]);
const C = {}; headers.forEach((h, i) => C[h] = i);
const scored = JSON.parse(fs.readFileSync(BASE + '\\scored.json', 'utf8'));
const scoreById = Object.fromEntries(scored.map(s => [s.id, s.score]));

function hav(lat1, lon1, lat2, lon2) {
  const R = 6371, toR = d => d * Math.PI / 180;
  const dLat = toR(lat2 - lat1), dLon = toR(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

const all = data.map(r => {
  const lf = String(r[C.Local_Facts] || '');
  const g = (re) => { const m = lf.match(re); return m ? m[1].trim() : null; };
  let lat = parseFloat(r[C.Latitude]), lng = parseFloat(r[C.Longitude]);
  let coordNote = null, fixNote = null;
  const id = r[C.Location_ID];
  let name = r[C.Location_Name], type = r[C.Location_Type], region = r[C.Parent_Region],
    slug = r[C.URL_Slug], parentMuni = r[C.Parent_Municipality] || null,
    pop2021 = parseFloat(r[C.Population_2021_Census]) || null,
    pop2025 = parseFloat(r[C.Population_2025_Estimate]) || null;
  if (id === 'ON-0110') { lat = 43.617; lng = -80.150; coordNote = 'coords corrected (original 42.775,-79.558 fell in Lake Erie); centred near Rockwood — verify vs CGN'; }
  if (id === 'ON-0090') {
    // chimera repair: row carried City-of-Hamilton facts/coords with Hamilton Township (Northumberland) identity+pop
    name = 'Hamilton'; type = 'City'; region = 'Hamilton-Niagara'; parentMuni = null;
    pop2021 = 569353; pop2025 = null;
    fixNote = 're-identified as City of Hamilton (was mislabeled Township/Northumberland); pop corrected 11,059→569,353 (StatCan 2021 CSD); township split to ON-2515';
  }
  if (id === 'ON-0251') {
    name = 'The Blue Mountains'; slug = 'the-blue-mountains';
    lat = 44.500; lng = -80.312;
    coordNote = 'coords corrected (original 45.1455,-80.964 fell in Georgian Bay); centred near Thornbury — verify vs CGN';
    fixNote = 'name defect fixed ("Blue MountainsThe Blue Mountains"); slug re-frozen the-blue-mountains';
  }
  return {
    id, name, type,
    parentMuni, region, slug,
    lat, lng, coordNote, fixNote, fsa: r[C.Postal_Code_Primary],
    distTor: r[C.Distance_From_Toronto_KM], distOtt: r[C.Distance_From_Ottawa_KM],
    pop2021, pop2025,
    score: scoreById[id] || 0,
    curated: /Landmarks:|Founded:|Notable:/.test(lf),
    founded: g(/Founded:\s*([^\n]+)/), landmarks: g(/Landmarks:\s*([^\n]+)/),
    notable: g(/Notable:\s*([^\n]+)/), features: g(/Features:\s*([^\n]+)/),
    economy: g(/Economy:\s*([^\n]+)/), verif: r[C.Verification_Status],
    entityDesc: r[C.Entity_Description], longDesc: r[C.Long_Description],
  };
});
// new row: Hamilton Township, Northumberland (pop that ON-0090 wrongly carried)
all.push({
  id: 'ON-2515', name: 'Hamilton Township', type: 'Township', parentMuni: 'Northumberland',
  region: 'Central Ontario', slug: 'hamilton-township', lat: 44.054, lng: -78.204,
  coordNote: 'coords set to township centre (Baltimore/Rice Lake south shore) — verify vs CGN',
  fixNote: 'new row split from ON-0090 chimera; carries the 11,059 census pop that belonged to the township',
  fsa: 'K9A', distTor: 105, distOtt: 275, pop2021: 11059, pop2025: null, score: 0,
  curated: false, founded: null, landmarks: null, notable: null, features: null,
  economy: null, verif: 'Needs_Review', entityDesc: null, longDesc: null,
});
// re-score the repaired/new rows with the unified formula
for (const x of all) {
  if (['ON-0090', 'ON-2515', 'ON-0251', 'ON-0110'].includes(x.id)) {
    const p = Math.max(x.pop2021 || 0, 1);
    const popPts = Math.min(30, Math.log10(p) / Math.log10(2794356) * 30);
    const sv = p >= 100000 ? 24 : p >= 20000 ? 19 : p >= 5000 ? 14 : p >= 1000 ? 8 : p >= 200 ? 3 : 1;
    const comp = p >= 100000 ? 4 : p >= 20000 ? 8 : p >= 5000 ? 12 : p >= 1000 ? 15 : 18;
    const km = Math.min(hav(x.lat, x.lng, 43.6532, -79.3832), hav(x.lat, x.lng, 45.4215, -75.6972));
    const prox = Math.max((1 - Math.min(km, 500) / 500) * 15, 0);
    const t = String(x.type || '').toLowerCase();
    const econ = /city|regional/.test(t) ? 8 : /town|district|county|municipal/.test(t) ? 5 : /community|village/.test(t) ? 3 : 1;
    x.score = Math.round((popPts + sv + comp + prox + econ) * 10) / 10;
  }
}

// classification
const POP_B = 20000, POP_C = 4000;
for (const x of all) {
  const gated = x.score >= 50 && x.pop2021 && x.lat;
  if (x.id === 'ON-0453') { x.bucket = 'DEFERRED_DUP'; x.reason = 'ghost duplicate of ON-0110 Guelph/Eramosa (synthetic GTA region, Toronto FSA/coords); Census CSD row wins'; }
  else if (!gated) {
    x.bucket = 'DEFERRED_GATE';
    x.reason = !x.pop2021 ? 'no real census population (neighborhood/locality) — noindex until grounded' : `unified score ${x.score} < 50 — below publish threshold, noindex`;
  }
  else if (x.curated) { x.bucket = 'ATTEMPT'; x.tier = 'A'; }
  else if (x.pop2021 >= POP_B) { x.bucket = 'ATTEMPT'; x.tier = 'B'; }
  else if (x.pop2021 >= POP_C) { x.bucket = 'ATTEMPT'; x.tier = 'C'; }
  else { x.bucket = 'DEFERRED_THIN'; x.reason = `boilerplate-only grounding, pop ${x.pop2021} < ${POP_C} — cannot clear 4-of-8 signal gate without invention; noindex`; }
}
const attempt = all.filter(x => x.bucket === 'ATTEMPT');
const tierCount = { A: 0, B: 0, C: 0 };
attempt.forEach(x => tierCount[x.tier]++);
console.log('ATTEMPT:', attempt.length, JSON.stringify(tierCount));
console.log('DEFERRED_GATE:', all.filter(x => x.bucket === 'DEFERRED_GATE').length,
  '| DEFERRED_THIN:', all.filter(x => x.bucket === 'DEFERRED_THIN').length,
  '| DEFERRED_DUP:', all.filter(x => x.bucket === 'DEFERRED_DUP').length);

// nearest neighbors within attempt set
for (const x of attempt) {
  x.neighbors = attempt
    .filter(y => y.id !== x.id)
    .map(y => ({ name: y.name, slug: y.slug, km: Math.round(hav(x.lat, x.lng, y.lat, y.lng)) }))
    .sort((a, b) => a.km - b.km).slice(0, 4);
}

// batches: group by region, score desc, chunk 12
const byRegion = {};
for (const x of attempt) (byRegion[x.region] = byRegion[x.region] || []).push(x);
const regionOrder = Object.entries(byRegion).sort((a, b) => b[1].length - a[1].length).map(([k]) => k);
let batchNum = 0;
const batchDir = BASE + '\\batches-in';
fs.mkdirSync(batchDir, { recursive: true });
const batchIndex = [];
for (const reg of regionOrder) {
  const list = byRegion[reg].sort((a, b) => b.score - a.score);
  for (let i = 0; i < list.length; i += 12) {
    batchNum++;
    const chunk = list.slice(i, i + 12).map(x => ({
      id: x.id, name: x.name, type: x.type, parentMuni: x.parentMuni, region: x.region,
      slug: x.slug, lat: x.lat, lng: x.lng, coordNote: x.coordNote, fixNote: x.fixNote,
      distTorontoKm: x.distTor, distOttawaKm: x.distOtt,
      pop2021: x.pop2021, pop2025: x.pop2025, unifiedScore: x.score, tier: x.tier,
      curatedFacts: x.tier === 'A' ? { founded: x.founded, landmarks: x.landmarks, notable: x.notable, economy: x.economy, entityDesc: x.entityDesc, longDesc: x.longDesc } : null,
      regionBoilerplate: x.tier !== 'A' ? { economy: x.economy, features: x.features } : null,
      neighbors: x.neighbors,
    }));
    const fn = `batch-${String(batchNum).padStart(3, '0')}-${reg.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
    fs.writeFileSync(`${batchDir}\\${fn}`, JSON.stringify({ batch: batchNum, region: reg, count: chunk.length, rows: chunk }, null, 1));
    batchIndex.push({ batch: batchNum, region: reg, file: fn, count: chunk.length, ids: chunk.map(c => c.id), names: chunk.map(c => c.name), tiers: chunk.map(c => c.tier) });
  }
}
fs.writeFileSync(BASE + '\\batch-index.json', JSON.stringify(batchIndex, null, 1));
console.log('batches:', batchNum);
console.log(batchIndex.map(b => `${b.batch}: ${b.region} ×${b.count} [${b.tiers.join('')}] ${b.names.slice(0, 5).join(', ')}${b.count > 5 ? '…' : ''}`).join('\n'));

// ledger
const led = ['Location_ID,Location_Name,Type,Region,Pop_2021,Unified_Score,Tier,Bucket,Reason,Fix_Note'];
for (const x of all) led.push([x.id, JSON.stringify(String(x.name)), x.type, JSON.stringify(String(x.region)), x.pop2021 || '', x.score, x.tier || '', x.bucket, JSON.stringify(x.reason || ''), JSON.stringify(x.fixNote || x.coordNote || '')].join(','));
fs.writeFileSync(BASE + '\\ledger.csv', led.join('\n'));
console.log('ledger.csv written:', all.length, 'rows');
