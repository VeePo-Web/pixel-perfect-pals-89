const XLSX = require('xlsx');
const fs = require('fs');
const path = 'C:\\Users\\Business\\AppData\\Local\\Temp\\claude\\c--Users-Business-Desktop-Claude-Code-pixel-perfect-pals-89\\81f5b35c-2302-4bd1-9f82-c683854d0e4f\\scratchpad\\ontario\\ontario_master_seo_database_OPTIMIZED (1).xlsx';
const wb = XLSX.readFile(path);
const ws = wb.Sheets['MASTER_LOCATIONS'];
const rows = XLSX.utils.sheet_to_json(ws, { header: 1, defval: null });
const headers = rows[1];
const data = rows.slice(2).filter(r => r[0]);
const C = {}; headers.forEach((h, i) => C[h] = i);
const scored = JSON.parse(fs.readFileSync(__dirname + '\\scored.json', 'utf8'));
const scoreById = Object.fromEntries(scored.map(s => [s.id, s.score]));

// boilerplate feature detection: extract Features line, count identical strings
const featCount = {};
const rowsInfo = data.map(r => {
  const lf = String(r[C.Local_Facts] || '');
  const featM = lf.match(/Features:\s*([^\n]+)/);
  const feat = featM ? featM[1].trim() : '';
  featCount[feat] = (featCount[feat] || 0) + 1;
  return { id: r[C.Location_ID], name: r[C.Location_Name], lf, feat, verif: r[C.Verification_Status], pop: parseFloat(r[C.Population_2021_Census]) || 0 };
});
let curatedA = [], buildB = [], thin = [];
for (const ri of rowsInfo) {
  const sc = scoreById[ri.id] || 0;
  if (sc < 50 || !ri.pop) continue; // out of gate anyway
  const hasCurated = /Landmarks:|Founded:|Notable:/.test(ri.lf);
  const featShared = ri.feat && featCount[ri.feat] > 3;
  if (hasCurated) curatedA.push(ri);
  else if (!featShared && ri.feat) buildB.push(ri); // semi-unique features
  else thin.push(ri);
}
console.log('publishable curated (Landmarks/Founded/Notable):', curatedA.length);
console.log('publishable semi-unique features:', buildB.length);
console.log('publishable boilerplate/thin:', thin.length);
console.log('\ncurated examples:', curatedA.slice(0, 30).map(x => x.name).join(', '));
console.log('\nsemi-unique examples:', buildB.slice(0, 20).map(x => `${x.name}[${x.feat.slice(0,50)}]`).join(' | '));
console.log('\nthin examples (pop desc):', thin.sort((a,b)=>b.pop-a.pop).slice(0, 25).map(x => `${x.name}(${x.pop})`).join(', '));
// top shared feature strings
const top = Object.entries(featCount).filter(([f, c]) => f && c > 3).sort((a, b) => b[1] - a[1]).slice(0, 12);
console.log('\ntop boilerplate feature strings:'); top.forEach(([f, c]) => console.log(`  [${c}×] ${f.slice(0, 90)}`));
// verif split within publishable
const pubs = rowsInfo.filter(ri => (scoreById[ri.id]||0) >= 50 && ri.pop);
const v = {}; pubs.forEach(p => v[p.verif] = (v[p.verif]||0)+1);
console.log('\npublishable verification split:', JSON.stringify(v));
fs.writeFileSync(__dirname + '\\tiers.json', JSON.stringify({ curatedA: curatedA.map(x=>x.id), buildB: buildB.map(x=>x.id), thin: thin.map(x=>x.id) }));
