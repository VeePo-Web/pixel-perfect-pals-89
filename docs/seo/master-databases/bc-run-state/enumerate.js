const fs = require('fs');
// Full BC populated-place census from GeoNames CA.txt (admin1=02 = British Columbia)
// GeoNames columns: 0 id,1 name,2 ascii,3 alt,4 lat,5 lng,6 fclass,7 fcode,8 cc,...,10 admin1,...,14 pop,...
const lines = fs.readFileSync('CA.txt','utf8').split('\n');
// populated-place fcodes (P class). Exclude PPLQ/PPLW (abandoned/destroyed).
const PPL = new Set(['PPL','PPLA','PPLA2','PPLA3','PPLA4','PPLC','PPLL','PPLX','PPLF','PPLG','PPLR','PPLS']);
const places = [];
const fcodeCount = {};
for (const l of lines) {
  const f = l.split('\t');
  if (f.length < 15 || f[10] !== '02') continue;
  if (f[6] !== 'P') continue;
  if (!PPL.has(f[7])) continue;
  fcodeCount[f[7]] = (fcodeCount[f[7]]||0)+1;
  places.push({ gid:f[0], name:f[1], ascii:f[2], lat:+f[4], lng:+f[5], fcode:f[7], pop:+f[14]||0 });
}
console.log('BC populated places (P class, non-abandoned):', places.length);
console.log('by fcode:', JSON.stringify(fcodeCount));
console.log('with GeoNames population > 0:', places.filter(p=>p.pop>0).length);
console.log('  pop >= 1000:', places.filter(p=>p.pop>=1000).length);
console.log('  pop >= 5000:', places.filter(p=>p.pop>=5000).length);
// neighborhoods specifically
console.log('neighborhoods (PPLX):', places.filter(p=>p.fcode==='PPLX').length);
fs.writeFileSync('bc_census_places.json', JSON.stringify(places));
