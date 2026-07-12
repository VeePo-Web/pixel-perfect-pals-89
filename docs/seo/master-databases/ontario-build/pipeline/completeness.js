// Completeness audit: census municipality reference vs the spreadsheet.
const XLSX = require('xlsx');
const fs = require('fs');
const ONT = 'C:\\Users\\Business\\AppData\\Local\\Temp\\claude\\c--Users-Business-Desktop-Claude-Code-pixel-perfect-pals-89\\81f5b35c-2302-4bd1-9f82-c683854d0e4f\\scratchpad\\ontario\\';

// --- load spreadsheet ---
const wb = XLSX.readFile(ONT + 'ontario_master_seo_database_OPTIMIZED (1).xlsx');
const rows = XLSX.utils.sheet_to_json(wb.Sheets['MASTER_LOCATIONS'], { header: 1, defval: null });
const H = rows[1]; const C = {}; H.forEach((h, i) => C[h] = i);
const data = rows.slice(2).filter(r => r[0]);

function norm(s) {
  return String(s || '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[–—]/g, '-')
    .replace(/\bcity\b|\btown\b|\btownship\b|\bmunicipality of\b|\btownship of\b|\bcity of\b|\btown of\b|\bthe corporation of\b|\bunited (townships|counties) of\b/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}

// spreadsheet name index (all rows) + municipal-type subset
const sheetNames = new Set(data.map(r => norm(r[C.Location_Name])));
const munTypes = new Set(['City', 'Town', 'Municipality', 'Township', 'Village']);
const sheetMunNames = new Set(data.filter(r => munTypes.has(r[C.Location_Type])).map(r => norm(r[C.Location_Name])));

// --- load census municipality reference ---
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(l => l.trim());
  const hdr = lines[0].split(',');
  return lines.slice(1).map(l => {
    // simple split (these files have no quoted commas in name per inspection, but guard anyway)
    const parts = []; let cur = '', q = false;
    for (const ch of l) { if (ch === '"') q = !q; else if (ch === ',' && !q) { parts.push(cur); cur = ''; } else cur += ch; }
    parts.push(cur);
    const o = {}; hdr.forEach((h, i) => o[h.trim()] = (parts[i] || '').trim()); return o;
  });
}
const cenClean = parseCSV(fs.readFileSync(ONT + 'on_municipalities_clean.csv', 'utf8'));
console.log('census municipalities (clean):', cenClean.length);

// which census municipalities are NOT represented anywhere in the sheet?
const missing = [];
for (const m of cenClean) {
  const n = norm(m.name);
  if (!sheetNames.has(n)) {
    // try loose contains match
    let found = false;
    for (const s of sheetNames) { if (s === n || s.includes(n) || n.includes(s)) { if (Math.abs(s.length - n.length) < 6) { found = true; break; } } }
    if (!found) missing.push(m);
  }
}
console.log('\ncensus municipalities NOT found in spreadsheet:', missing.length);
for (const m of missing) console.log(`  MISSING  ${m.name} | ${m.csd_type} | ${m.census_div} | pop ${m.pop}`);

// spreadsheet type breakdown
const types = {}; for (const r of data) types[r[C.Location_Type]] = (types[r[C.Location_Type]] || 0) + 1;
console.log('\nspreadsheet type breakdown:', JSON.stringify(types));
console.log('total spreadsheet rows:', data.length);

// reserves present?
const reserves = data.filter(r => r[C.Location_Type] === 'First Nations Reserve').length;
console.log('First Nations reserves in sheet:', reserves);

fs.writeFileSync(__dirname + '\\missing-municipalities.json', JSON.stringify(missing, null, 1));
