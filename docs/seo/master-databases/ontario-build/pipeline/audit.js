// audit.js — sweep all batches-out/*.jsonl for spec defects. Usage: node audit.js [batch numbers...]
const fs = require('fs');
const dir = __dirname + '\\batches-out';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsonl'))
  .filter(f => process.argv.length <= 2 || process.argv.slice(2).some(n => f.includes(String(n).padStart(3, '0'))));
const rows = [];
for (const f of files) {
  const lines = fs.readFileSync(`${dir}\\${f}`, 'utf8').split(/\r?\n/).filter(l => l.trim());
  for (const [i, l] of lines.entries()) {
    try { rows.push({ ...JSON.parse(l), _file: f }); }
    catch (e) { console.log(`PARSE FAIL ${f} line ${i + 1}: ${e.message}`); }
  }
}
const ok = rows.filter(r => r.status === 'OK');
const flagged = rows.filter(r => r.status !== 'OK');
console.log(`rows: ${rows.length} | OK: ${ok.length} | flagged: ${flagged.length}`);
flagged.forEach(r => console.log(`  FLAG ${r.id} ${r.name} [${r.status}] ${r.reason || ''}`));

const wc = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
const defects = [];
const seen = { slug: {}, alt: {}, opener: {} };
const TOKEN_RE = /\{([A-Za-z0-9_]+)\}/g;
const ALLOWED = new Set(['SERVICE','SERVICE_CATEGORY','SERVICE_LIST','SERVICE_SLUG','BUSINESS_TYPE','LOCALBUSINESS_TYPE','COMPANY_NAME','COMPANY_SHORT','BRAND_URL','TAGLINE','UNIQUE_VALUE_PROP','SERVICE_DESCRIPTION','PHONE','EMAIL','WEBSITE','YEARS_IN_BUSINESS','RATING','CERTIFICATIONS','INSURANCE_COVERAGE','AWARDS','PROPERTY_TYPE','PROJECT_TYPE','PRICE_RANGE','RESPONSE_TIME','ESTIMATE_TYPE','AVAILABILITY','SERVICE_RADIUS_KM','CTA_PRIMARY','CTA_SECONDARY','PLACE_ID','GOOGLE_MAPS_API_KEY','SUBSERVICE_1','SUBSERVICE_2','SUBSERVICE_3','SUBSERVICE_4','SUBSERVICE_5','SUBSERVICE_6','DATA_POINT_TODO']);
const D = (id, msg) => defects.push(`${id}: ${msg}`);
for (const r of ok) {
  const id = `${r.id} ${r.name}`;
  const allText = [r.seoTitle, r.metaDescription, r.h1, r.entityDescription, r.aiAnswerSnippet, r.shortDescription, r.longDescription, JSON.stringify(r.localFacts), JSON.stringify(r.faqs)].join('\n');
  if (allText.includes('{{')) D(id, 'DOUBLE-CURLY');
  let m; TOKEN_RE.lastIndex = 0;
  const bad = new Set();
  while ((m = TOKEN_RE.exec(allText))) if (!ALLOWED.has(m[1])) bad.add(m[1]);
  if (bad.size) D(id, 'unknown tokens: ' + [...bad].join(','));
  const e = wc(r.entityDescription); if (e < 45 || e > 110) D(id, `entity ${e}w (50-100)`);
  const a = wc(r.aiAnswerSnippet); if (a < 35 || a > 68) D(id, `snippet ${a}w (40-60)`);
  const L = wc(r.longDescription); if (L < 380 || L > 640) D(id, `long ${L}w (400-600)`);
  if (!/Call \{PHONE\}\.?\s*$/.test(String(r.aiAnswerSnippet).trim())) D(id, 'snippet no PHONE ending');
  if (!r.faqs || r.faqs.length < 4) D(id, `faqs ${r.faqs ? r.faqs.length : 0} (<4)`);
  else {
    r.faqs.forEach((f, i) => { const w = wc(f.a); if (w < 32 || w > 72) D(id, `faq${i + 1} ${w}w (40-60)`); });
    if (!/Call \{PHONE\}\.?\s*$/.test(String(r.faqs[r.faqs.length - 1].a).trim())) D(id, 'last faq no PHONE ending');
    r.faqs.forEach((f, i) => { if (!/\?$/.test(String(f.q).trim())) D(id, `faq${i + 1} q not question-format`); });
  }
  if (String(r.metaDescription).length > 175) D(id, `meta ${r.metaDescription.length}ch`);
  if (/\{SERVICE\}/.test(r.entityDescription || '') || /\{COMPANY/.test(r.entityDescription || '')) D(id, 'entity has business tokens');
  if ((r.signalCount || 0) < 4) D(id, `signals ${r.signalCount} < 4`);
  if (!r.infoGain) D(id, 'no infoGain');
  if (/flag of/i.test(r.imageAltGeo || '')) D(id, 'alt mentions flag');
  if (/\{SERVICE|\{BUSINESS/.test(r.imageAltGeo || '')) D(id, 'alt has trade token');
  // banned openers
  const open = String(r.longDescription).slice(0, 90).toLowerCase();
  if (/here's the truth|every community has a story|isn't just|didn't become|did not become/.test(open)) D(id, 'banned opener');
  // uniqueness
  if (seen.slug[r.slug]) D(id, `dup slug with ${seen.slug[r.slug]}`); seen.slug[r.slug] = id;
  const altKey = String(r.imageAltGeo || '').toLowerCase();
  if (seen.alt[altKey]) D(id, `dup alt with ${seen.alt[altKey]}`); seen.alt[altKey] = id;
  const opKey = String(r.longDescription).toLowerCase().split(/\s+/).slice(0, 6).join(' ');
  if (seen.opener[opKey]) D(id, `dup opener with ${seen.opener[opKey]}`); seen.opener[opKey] = id;
}
console.log(`\nDEFECTS: ${defects.length}`);
defects.forEach(d => console.log('  ' + d));
// distribution
const v = {}; ok.forEach(r => v[r.verification] = (v[r.verification] || 0) + 1);
console.log('\nverification:', JSON.stringify(v));
const sig = {}; ok.forEach(r => sig[r.signalCount] = (sig[r.signalCount] || 0) + 1);
console.log('signalCount dist:', JSON.stringify(sig));
