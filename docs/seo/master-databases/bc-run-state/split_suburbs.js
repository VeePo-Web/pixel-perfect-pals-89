const fs=require('fs');
const hav=(a,b,c,d)=>{const R=6371,r=x=>x*Math.PI/180,dl=r(c-a),dg=r(d-b);const h=Math.sin(dl/2)**2+Math.cos(r(a))*Math.cos(r(c))*Math.sin(dg/2)**2;return 2*R*Math.asin(Math.sqrt(h));};
const u=JSON.parse(fs.readFileSync('bc_universe.json','utf8'));
const built=new Set(fs.readdirSync('out').map(f=>f.replace('.json','')));
const builtRows=u.filter(r=>built.has(r.Location_ID)&&r.Latitude);
// a "city" anchor = built municipality/city with pop >= 5000
const cityAnchors=builtRows.filter(r=>(r.Population_2021_Census||0)>=5000 && /City|Municipality|Town/i.test(r.Location_Type||''));
let toNbhd=0;
for(const r of u){
  if(!r.Gate_Publishable||r.Already_Built) continue;
  // nearest big built city
  let nd=Infinity, host=null;
  for(const c of cityAnchors){ const d=hav(r.Latitude,r.Longitude,c.Latitude,c.Longitude); if(d<nd){nd=d;host=c;} }
  // if within 8km of a bigger built city AND this place is smaller -> it's a suburb/neighborhood of it
  if(host && nd<8 && (r.Population_2021_Census||0) < (host.Population_2021_Census||0)){
    r.Gate_Publishable=false;
    r.Defer_Reason='suburb/neighborhood of '+host.Location_Name+' — neighborhood tier';
    r.Parent_Municipality=host.Location_Name;
    toNbhd++;
  }
}
const newPub=u.filter(r=>r.Gate_Publishable&&!r.Already_Built);
console.log('reclassified suburbs -> neighborhood tier:',toNbhd);
console.log('FINAL NEW publishable (distinct communities):',newPub.length);
console.log(newPub.sort((a,b)=>b.Unified_Score-a.Unified_Score).map(r=>r.Location_Name+' '+r.Unified_Score+'('+r.Population_2021_Census+') ['+r.Parent_Region+']').join('\n'));
fs.writeFileSync('bc_universe.json',JSON.stringify(u));
fs.writeFileSync('bc_new_publishable.json',JSON.stringify(newPub.map(r=>({id:r.Location_ID,name:r.Location_Name,slug:r.URL_Slug,score:r.Unified_Score,region:r.Parent_Region}))));
