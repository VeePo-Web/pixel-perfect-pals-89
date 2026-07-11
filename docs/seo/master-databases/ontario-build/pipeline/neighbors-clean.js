// Recompute clean nearby-place links from the ATTEMPT pool, dropping ghost/dup-coord rows.
const fs = require('fs');
const dir = __dirname + '\\batches-in';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
const all = [];
for (const f of files) { const b = JSON.parse(fs.readFileSync(dir + '\\' + f, 'utf8')); for (const r of b.rows) all.push({ r, f, b }); }
// detect ghost coords: (lat,lng) rounded to 3dp shared by >1 row
const key = (la, ln) => `${la.toFixed(3)},${ln.toFixed(3)}`;
const coordCount = {};
for (const { r } of all) coordCount[key(r.lat, r.lng)] = (coordCount[key(r.lat, r.lng)] || 0) + 1;
function hav(a, b, c, d) { const R = 6371, t = x => x * Math.PI / 180; const dLat = t(c - a), dLon = t(d - b); const h = Math.sin(dLat / 2) ** 2 + Math.cos(t(a)) * Math.cos(t(c)) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }
// clean pool = rows with unique coords (not ghost duplicates)
const pool = all.filter(({ r }) => coordCount[key(r.lat, r.lng)] === 1).map(({ r }) => r);
let fixed = 0;
for (const { r } of all) {
  const cand = pool.filter(y => y.id !== r.id && y.name !== r.name && y.region === r.region) // same region only
    .map(y => ({ name: y.name, slug: y.slug, km: Math.round(hav(r.lat, r.lng, y.lat, y.lng)) }))
    .filter(y => y.km >= 1)          // drop coincident
    .sort((a, b) => a.km - b.km);
  // dedupe by slug
  const seen = new Set(); const clean = [];
  for (const c of cand) { if (seen.has(c.slug)) continue; seen.add(c.slug); clean.push(c); if (clean.length === 4) break; }
  const before = JSON.stringify(r.neighbors);
  r.neighbors = clean;
  if (JSON.stringify(clean) !== before) fixed++;
}
// rewrite batch files
const byFile = {};
for (const { r, f } of all) (byFile[f] = byFile[f] || []).push(r);
for (const f of files) {
  const b = JSON.parse(fs.readFileSync(dir + '\\' + f, 'utf8'));
  const map = Object.fromEntries(byFile[f].map(r => [r.id, r]));
  b.rows = b.rows.map(r => map[r.id] || r);
  fs.writeFileSync(dir + '\\' + f, JSON.stringify(b, null, 1));
}
console.log('ghost-coord groups:', Object.values(coordCount).filter(c => c > 1).length, '| clean pool:', pool.length, '| neighbor lists updated:', fixed);
// re-extract tier A grounding with clean neighbors
const A = all.map(x => x.r).filter(r => r.tier === 'A').sort((a, b) => b.unifiedScore - a.unifiedScore);
fs.writeFileSync(__dirname + '\\tierA-grounding.json', JSON.stringify(A, null, 1));
console.log('Tier A neighbor check:');
for (const r of A) console.log(`  ${r.name}: ${r.neighbors.map(n => `${n.name}(${n.km})`).join(', ')}`);
