const fs = require('fs');
const dir = __dirname + '\\batches-in';
const A = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json'))) {
  for (const r of JSON.parse(fs.readFileSync(dir + '\\' + f, 'utf8')).rows) {
    if (r.tier === 'A') A.push(r);
  }
}
A.sort((a, b) => b.unifiedScore - a.unifiedScore);
fs.writeFileSync(__dirname + '\\tierA-grounding.json', JSON.stringify(A, null, 1));
console.log('Tier A rows:', A.length);
for (const r of A) {
  const cf = r.curatedFacts || {};
  console.log(`\n### ${r.id} ${r.name} | ${r.type} | ${r.region} | pop ${r.pop2021} | slug ${r.slug} | ${r.lat},${r.lng} | score ${r.unifiedScore}`);
  console.log('  founded:', cf.founded);
  console.log('  landmarks:', cf.landmarks);
  console.log('  notable:', cf.notable);
  console.log('  economy:', cf.economy);
  console.log('  neighbors:', (r.neighbors || []).map(n => `${n.name}(${n.km}km)`).join(', '));
}
