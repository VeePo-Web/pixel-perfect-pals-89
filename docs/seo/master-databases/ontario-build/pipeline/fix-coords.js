// Repair the 12 FLAG_COORD rows: correct coordinates (source sheet corrupted) + correct nearby links,
// normalize status to OK with a Fix_Note. Coords are high-confidence encyclopedic values (rep point of
// the municipality's main centre). Nearby slugs are real same-region adjacents in the published pool.
const fs = require('fs');
const corrections = {
  'ON-0029': { lat: 43.130, lng: -80.747, near: ['ingersoll', 'norwich', 'zorra', 'tillsonburg'], note: 'coords corrected (source sheet placed Woodstock in Huron County); Woodstock centre' },
  'ON-0036': { lat: 43.370, lng: -80.982, near: ['st-marys', 'perth-east', 'west-perth', 'north-perth'], note: 'coords corrected; Stratford centre on the Avon River' },
  'ON-0031': { lat: 43.140, lng: -80.400, near: ['brantford', 'six-nations-of-the-grand-river', 'norwich', 'woodstock'], note: 'coords corrected; County of Brant (Paris/Burford area)' },
  'ON-0039': { lat: 42.775, lng: -81.181, near: ['central-elgin', 'southwold', 'aylmer', 'malahide'], note: 'coords corrected; St. Thomas centre' },
  'ON-0037': { lat: 42.950, lng: -79.860, near: ['norfolk', 'six-nations-of-the-grand-river', 'brant', 'brantford'], note: 'coords corrected; Haldimand County (Cayuga/Dunnville area)' },
  'ON-0388': { lat: 42.957, lng: -81.617, near: ['middlesex-centre', 'southwest-middlesex', 'north-middlesex', 'thames-centre'], note: 'coords corrected; Strathroy-Caradoc (Strathroy)' },
  'ON-0100': { lat: 44.430, lng: -79.780, near: ['barrie', 'oro-medonte', 'clearview', 'tiny'], note: 'coords corrected; Springwater Township (Midhurst)' },
  'ON-0075': { lat: 44.520, lng: -80.017, near: ['collingwood', 'clearview', 'springwater', 'tiny'], note: 'coords corrected; Wasaga Beach on Georgian Bay' },
  'ON-0068': { lat: 44.501, lng: -80.217, near: ['wasaga-beach', 'clearview', 'the-blue-mountains', 'meaford'], note: 'coords corrected; Collingwood on Georgian Bay' },
  'ON-0032': { lat: 44.590, lng: -75.685, near: ['elizabethtown-kitley', 'augusta', 'leeds-and-the-thousand-islands', 'prescott'], note: 'coords corrected; Brockville on the St. Lawrence' },
  'ON-0034': { lat: 44.010, lng: -77.150, near: ['belleville', 'quinte-west', 'greater-napanee', 'loyalist'], note: 'coords corrected; Prince Edward County (Picton)' },
  'ON-0119': { lat: 44.400, lng: -76.490, near: ['kingston', 'loyalist', 'central-frontenac', 'rideau-lakes'], note: 'coords corrected; South Frontenac (Sydenham)' },
};

// 1) fix coords in batches-in (assemble reads coords from there)
const biDir = __dirname + '\\batches-in';
let coordFixed = 0;
for (const f of fs.readdirSync(biDir).filter(f => f.endsWith('.json'))) {
  const p = biDir + '\\' + f; const b = JSON.parse(fs.readFileSync(p, 'utf8')); let touched = false;
  for (const r of b.rows) if (corrections[r.id]) { r.lat = corrections[r.id].lat; r.lng = corrections[r.id].lng; r.coordNote = corrections[r.id].note; touched = true; coordFixed++; }
  if (touched) fs.writeFileSync(p, JSON.stringify(b, null, 1));
}

// 2) normalize the content rows: status OK, corrected nearbySlugs, fixNote
const outDir = __dirname + '\\batches-out';
let contentFixed = 0;
for (const f of fs.readdirSync(outDir).filter(f => f.endsWith('.jsonl'))) {
  const p = outDir + '\\' + f;
  const rows = fs.readFileSync(p, 'utf8').split(/\r?\n/).filter(l => l.trim()).map(l => JSON.parse(l));
  let touched = false;
  for (const r of rows) if (corrections[r.id]) {
    r.status = 'OK'; r.nearbySlugs = corrections[r.id].near; r.coordFixNote = corrections[r.id].note; touched = true; contentFixed++;
  }
  if (touched) fs.writeFileSync(p, rows.map(r => JSON.stringify(r)).join('\n'));
}
console.log('coord rows fixed in batches-in:', coordFixed, '| content rows normalized:', contentFixed);
