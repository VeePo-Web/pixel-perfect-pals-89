// Build clean Tier-B and Tier-C batch inputs, excluding the 25 already-built Tier-A rows.
const fs = require('fs');
const dir = __dirname + '\\batches-in';
const built = new Set(fs.readFileSync(__dirname + '\\batches-out\\batch-flagships.jsonl', 'utf8')
  .split(/\r?\n/).filter(l => l.trim()).map(l => JSON.parse(l).id));
const all = [];
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.json')))
  for (const r of JSON.parse(fs.readFileSync(dir + '\\' + f, 'utf8')).rows) all.push(r);

const outDir = __dirname + '\\bc-batches-in';
fs.mkdirSync(outDir, { recursive: true });
const idx = [];
for (const tier of ['B', 'C']) {
  const list = all.filter(r => r.tier === tier && !built.has(r.id));
  // group by region, keep score order
  const byReg = {};
  for (const r of list) (byReg[r.region] = byReg[r.region] || []).push(r);
  let n = 0;
  for (const reg of Object.keys(byReg)) {
    const rr = byReg[reg].sort((a, b) => b.unifiedScore - a.unifiedScore);
    for (let i = 0; i < rr.length; i += 12) {
      n++;
      const chunk = rr.slice(i, i + 12);
      const fn = `tier${tier}-${String(n).padStart(2, '0')}-${reg.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.json`;
      fs.writeFileSync(`${outDir}\\${fn}`, JSON.stringify({ tier, region: reg, count: chunk.length, rows: chunk }, null, 1));
      idx.push({ tier, file: fn, region: reg, count: chunk.length, names: chunk.map(c => c.name) });
    }
  }
}
fs.writeFileSync(__dirname + '\\bc-index.json', JSON.stringify(idx, null, 1));
console.log('Tier B rows:', all.filter(r => r.tier === 'B' && !built.has(r.id)).length,
  '| Tier C rows:', all.filter(r => r.tier === 'C' && !built.has(r.id)).length);
console.log('batches written:', idx.length);
for (const b of idx) console.log(`  ${b.file} [${b.count}] ${b.names.slice(0, 6).join(', ')}${b.count > 6 ? '…' : ''}`);
