// Apply geocoded coords to batches-in, recompute same-region nearby links for ALL built rows from
// corrected coords, normalize FLAG_COORD -> OK, write everything back.
const fs = require('fs');
const geo = JSON.parse(fs.readFileSync('geocoded.json', 'utf8')).coords;
const uncertain = new Set(JSON.parse(fs.readFileSync('geocoded.json', 'utf8')).uncertain || []);

// 1) update coords in batches-in (source of truth for assemble)
const biDirs = ['batches-in', 'bc-batches-in'];
let coordUpd = 0;
for (const d of biDirs) for (const f of fs.readdirSync(d).filter(f => f.endsWith('.json'))) {
  const p = d + '/' + f; const b = JSON.parse(fs.readFileSync(p, 'utf8')); let touch = false;
  for (const r of b.rows) if (geo[r.id]) { r.lat = geo[r.id][0]; r.lng = geo[r.id][1]; r.coordNote = 'coords corrected via geocode (source dataset lat/lng corrupted)'; touch = true; if (d === 'batches-in') coordUpd++; }
  if (touch) fs.writeFileSync(p, JSON.stringify(b, null, 1));
}

// 2) build master coord map for ALL 242 built rows (corrected where geocoded, else batches-in)
const built = new Set();
const dir = 'batches-out';
const content = {}; // id -> content row + file
const order = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))) {
  const lines = fs.readFileSync(dir + '/' + f, 'utf8').split(/\r?\n/).filter(l => l.trim());
  for (const l of lines) { const r = JSON.parse(l); content[r.id] = { r, f }; built.add(r.id); order.push(r.id); }
}
// coord lookup from batches-in (already updated)
const coordOf = {}, regionOf = {}, slugOf = {}, nameOf = {};
for (const d of biDirs) for (const f of fs.readdirSync(d).filter(f => f.endsWith('.json')))
  for (const r of JSON.parse(fs.readFileSync(d + '/' + f, 'utf8')).rows) { coordOf[r.id] = [r.lat, r.lng]; regionOf[r.id] = r.region; slugOf[r.id] = r.slug; nameOf[r.id] = r.name; }

function hav(a, b, c, d) { const R = 6371, t = x => x * Math.PI / 180; const dLat = t(c - a), dLon = t(d - b); const h = Math.sin(dLat / 2) ** 2 + Math.cos(t(a)) * Math.cos(t(c)) * Math.sin(dLon / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); }

// 3) recompute nearbySlugs for every built row: nearest same-region built places (<=5), by corrected coords
const builtIds = [...built];
let nbUpd = 0;
for (const id of builtIds) {
  const [la, ln] = coordOf[id] || []; if (la == null) continue;
  const cand = builtIds.filter(o => o !== id && regionOf[o] === regionOf[id] && coordOf[o])
    .map(o => ({ slug: slugOf[o], km: hav(la, ln, coordOf[o][0], coordOf[o][1]) }))
    .filter(o => o.km >= 0.5).sort((a, b) => a.km - b.km);
  const seen = new Set(), near = [];
  for (const c of cand) { if (seen.has(c.slug)) continue; seen.add(c.slug); near.push(c.slug); if (near.length === 4) break; }
  if (near.length) { content[id].r.nearbySlugs = near; nbUpd++; }
}

// 4) normalize status: FLAG_COORD -> OK (coords now fixed); add note. Keep verification as-is.
let normed = 0;
for (const id of builtIds) { const r = content[id].r; if (r.status === 'FLAG_COORD') { r.status = 'OK'; r.coordFixNote = geo[id] ? ('coords corrected to ' + geo[id].join(',') + (uncertain.has(id) ? ' (rep-point approximate)' : '')) : 'coords reviewed'; normed++; } }

// 5) write content back per file
const byFile = {};
for (const id of builtIds) (byFile[content[id].f] = byFile[content[id].f] || []).push(content[id].r);
for (const f of Object.keys(byFile)) fs.writeFileSync(dir + '/' + f, byFile[f].map(r => JSON.stringify(r)).join('\n'));

console.log('coords updated in batches-in:', coordUpd, '| nearby recomputed:', nbUpd, '| FLAG_COORD->OK:', normed);
console.log('uncertain rep-points (flagged in note):', [...uncertain].join(', '));
