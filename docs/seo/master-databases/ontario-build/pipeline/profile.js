const XLSX = require('xlsx');
const fs = require('fs');
const path = 'C:\\Users\\Business\\AppData\\Local\\Temp\\claude\\c--Users-Business-Desktop-Claude-Code-pixel-perfect-pals-89\\81f5b35c-2302-4bd1-9f82-c683854d0e4f\\scratchpad\\ontario\\ontario_master_seo_database_OPTIMIZED (1).xlsx';
const wb = XLSX.readFile(path);
const ws = wb.Sheets['MASTER_LOCATIONS'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
const headers = rows[1];
const data = rows.slice(2).filter(r => r[0]); // Location_ID present
const col = name => headers.indexOf(name);
const C = {};
headers.forEach((h, i) => C[h] = i);

console.log('data rows:', data.length);

// --- unified re-score ---
const TOR = [43.6532, -79.3832], OTT = [45.4215, -75.6972];
function hav(lat1, lon1, lat2, lon2) {
  const R = 6371, toR = d => d * Math.PI / 180;
  const dLat = toR(lat2 - lat1), dLon = toR(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}
function unifiedScore(pop, lat, lng, type) {
  const p = Math.max(pop || 0, 1);
  const popPts = Math.min(30, Math.log10(Math.max(p, 1)) / Math.log10(2794356) * 30);
  const sv = p >= 100000 ? 24 : p >= 20000 ? 19 : p >= 5000 ? 14 : p >= 1000 ? 8 : p >= 200 ? 3 : 1;
  const comp = p >= 100000 ? 4 : p >= 20000 ? 8 : p >= 5000 ? 12 : p >= 1000 ? 15 : 18;
  let prox = 0;
  if (lat && lng) {
    const km = Math.min(hav(lat, lng, ...TOR), hav(lat, lng, ...OTT));
    prox = Math.max((1 - Math.min(km, 500) / 500) * 15, 0);
  }
  const t = String(type || '').toLowerCase();
  const econ = /city|regional/.test(t) ? 8 : /town|district|county|municipal/.test(t) ? 5 : /community|village/.test(t) ? 3 : 1;
  return popPts + sv + comp + prox + econ;
}

let stats = { noCoords: 0, noPop: 0, dblCurly: 0, verif: {}, types: {}, regions: {} };
const slugs = {};
const scored = [];
for (const r of data) {
  const lat = parseFloat(r[C.Latitude]), lng = parseFloat(r[C.Longitude]);
  const pop = parseFloat(r[C.Population_2021_Census]);
  if (!isFinite(lat) || !isFinite(lng)) stats.noCoords++;
  if (!isFinite(pop) || pop <= 0) stats.noPop++;
  const v = r[C.Verification_Status] || '(blank)';
  stats.verif[v] = (stats.verif[v] || 0) + 1;
  const t = r[C.Location_Type] || '(blank)';
  stats.types[t] = (stats.types[t] || 0) + 1;
  const reg = r[C.Parent_Region] || '(blank)';
  stats.regions[reg] = (stats.regions[reg] || 0) + 1;
  const slug = r[C.URL_Slug];
  slugs[slug] = (slugs[slug] || []); slugs[slug].push(r[C.Location_ID]);
  // double-curly scan across all string cells
  for (const cell of r) if (typeof cell === 'string' && cell.includes('{{')) { stats.dblCurly++; break; }
  const sc = unifiedScore(pop, lat, lng, t);
  scored.push({ id: r[C.Location_ID], name: r[C.Location_Name], type: t, region: reg, pop: isFinite(pop) ? pop : null, lat: isFinite(lat) ? lat : null, lng: isFinite(lng) ? lng : null, score: Math.round(sc * 10) / 10, oldScore: r[C.SEO_Priority_Score] });
}
const dupSlugs = Object.entries(slugs).filter(([s, ids]) => ids.length > 1);
console.log('missing coords:', stats.noCoords, '| missing pop:', stats.noPop, '| rows w/ {{:', stats.dblCurly);
console.log('dup slugs:', dupSlugs.length, dupSlugs.slice(0, 10).map(([s, ids]) => `${s}:${ids.join(',')}`).join(' '));
console.log('verification:', JSON.stringify(stats.verif));
console.log('types:', JSON.stringify(stats.types));
console.log('regions count:', Object.keys(stats.regions).length);
// unified band distribution
const bands = { '80+': 0, '65-79': 0, '50-64': 0, '35-49': 0, '<35': 0 };
for (const s of scored) bands[s.score >= 80 ? '80+' : s.score >= 65 ? '65-79' : s.score >= 50 ? '50-64' : s.score >= 35 ? '35-49' : '<35']++;
console.log('unified bands:', JSON.stringify(bands));
const publishable = scored.filter(s => s.score >= 50 && s.pop && s.lat);
console.log('publishable (>=50 + pop + coords):', publishable.length);
publishable.sort((a, b) => b.score - a.score);
console.log('top 15:', publishable.slice(0, 15).map(s => `${s.name} ${s.score}`).join(' | '));
console.log('bottom 5 publishable:', publishable.slice(-5).map(s => `${s.name}(${s.type},pop ${s.pop}) ${s.score}`).join(' | '));
// region distribution of publishable
const pubReg = {};
for (const s of publishable) pubReg[s.region] = (pubReg[s.region] || 0) + 1;
console.log('publishable by region:', JSON.stringify(pubReg));
// content fill: measure word counts of key content cols for a top row, mid row, and count empties
const contentCols = ['Entity_Description', 'AI_Answer_Snippet', 'Short_Description', 'Long_Description', 'Local_Facts', 'FAQ_1_Answer'];
let empt = {};
for (const cc of contentCols) empt[cc] = data.filter(r => !r[C[cc]] || String(r[C[cc]]).trim().length < 20).length;
console.log('near-empty content cells:', JSON.stringify(empt));
// save scored list
fs.writeFileSync(__dirname + '\\scored.json', JSON.stringify(scored));
console.log('scored.json written');
