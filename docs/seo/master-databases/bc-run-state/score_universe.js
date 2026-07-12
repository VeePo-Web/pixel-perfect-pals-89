const fs=require('fs');
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b);const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
const u=JSON.parse(fs.readFileSync('bc_universe.json','utf8'));
const built=new Set(fs.readdirSync('out').map(f=>f.replace('.json','')));
const VAN=[49.2827,-123.1207],VIC=[48.4284,-123.3656];
const ANCHOR=Math.log10(2794356);
const econ=t=>/City|Regional/i.test(t)?8:/Town|District|County|Municipality/i.test(t)?5:/Community|Village|Neighborhood/i.test(t)?3:1;
for(const r of u){
  if(r.Latitude&&r.Longitude){
    r.Distance_From_Vancouver_KM=Math.round(hav(VAN[0],VAN[1],r.Latitude,r.Longitude));
    r.Distance_From_Victoria_KM=Math.round(hav(VIC[0],VIC[1],r.Latitude,r.Longitude));
  }
  const pop=r.Population_2021_Census||0;
  const sPop=Math.min(30,Math.log10(Math.max(pop,1))/ANCHOR*30);
  const sVol=pop>=100000?24:pop>=20000?19:pop>=5000?14:pop>=1000?8:pop>=200?3:1;
  const sComp=pop>=100000?4:pop>=20000?8:pop>=5000?12:pop>=1000?15:18;
  const hub=Math.min(r.Distance_From_Vancouver_KM??1e9,r.Distance_From_Victoria_KM??1e9);
  const sProx=r.Latitude?Math.max((1-Math.min(hub,500)/500)*15,0):0;
  r.Unified_Score=+(sPop+sVol+sComp+econ(r.Location_Type||'')+sProx).toFixed(1);
  r.Gate_Publishable = r.Unified_Score>=50 && !!r.Latitude && !!r.Population_2021_Census;
  if(!r.Gate_Publishable) r.Defer_Reason = !r.Latitude?'no authoritative coords':!r.Population_2021_Census?'no real census population':'unified score < 50';
  r.Already_Built = built.has(r.Location_ID);
}
const pub=u.filter(r=>r.Gate_Publishable);
const newPub=pub.filter(r=>!r.Already_Built);
const def=u.filter(r=>!r.Gate_Publishable);
console.log('UNIVERSE',u.length);
console.log('PUBLISHABLE (gate):',pub.length,'| already built:',pub.filter(r=>r.Already_Built).length,'| NEW to build:',newPub.length);
console.log('DEFERRED:',def.length);
const dr={};def.forEach(r=>dr[r.Defer_Reason]=(dr[r.Defer_Reason]||0)+1);
console.log('defer reasons:',JSON.stringify(dr));
// new publishable by region + score band
const nb={};newPub.forEach(r=>nb[r.Parent_Region]=(nb[r.Parent_Region]||0)+1);
console.log('NEW publishable by region:',JSON.stringify(nb));
const bands={'65+':0,'55-64':0,'50-54':0};newPub.forEach(r=>{const s=r.Unified_Score;if(s>=65)bands['65+']++;else if(s>=55)bands['55-64']++;else bands['50-54']++;});
console.log('NEW pub score bands:',JSON.stringify(bands));
console.log('NEW pub top 12:',newPub.sort((a,b)=>b.Unified_Score-a.Unified_Score).slice(0,12).map(r=>r.Location_Name+' '+r.Unified_Score+'('+r.Population_2021_Census+')').join(' · '));
fs.writeFileSync('bc_universe.json',JSON.stringify(u));
fs.writeFileSync('bc_new_publishable.json',JSON.stringify(newPub.map(r=>({id:r.Location_ID,name:r.Location_Name,slug:r.URL_Slug,score:r.Unified_Score,region:r.Parent_Region}))));
