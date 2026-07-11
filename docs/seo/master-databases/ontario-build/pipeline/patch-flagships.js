// Expand each flagship longDescription past 400w and trim metas to <=160 chars.
// Extra paragraph is inserted before the final access/close paragraph. All facts grounded.
const fs = require('fs');
const P = 'batches-out/batch-flagships.jsonl';
const rows = fs.readFileSync(P, 'utf8').split(/\r?\n/).filter(l => l.trim()).map(l => JSON.parse(l));

// per-id: extra grounded paragraph (~85-110w) + trimmed meta (<=160 chars incl tokens)
const patch = {
  'ON-0001': {
    meta: 'Need {SERVICE} in Toronto? {COMPANY_NAME} serves all 158 neighbourhoods, from downtown condos to Scarborough and Etobicoke homes. Call {PHONE}.',
    extra: 'For homeowners, that variety is the whole point. A semi in Leslieville, a detached home in Willowdale and a Fallsview-facing condo downtown each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to the property in front of it. Our {SERVICE_LIST} covers the range, and every job comes with the same standards whether it sits on a narrow downtown lot or a wide suburban one. That is how a single call gets you work matched to how your address was actually built, not a template applied sight unseen.'
  },
  'ON-0002': {
    meta: 'Need {SERVICE} in Ottawa? {COMPANY_NAME} serves Centretown, Kanata, Orléans and Barrhaven, built for real capital winters. Call {PHONE}.',
    extra: 'That split between old and new shapes the work. A heritage stone home near the ByWard Market carries different demands than a five-year-old build in Riverside South, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the full range, and because Ottawa\'s seasons are so pronounced, we plan timing as carefully as method. Bilingual service is part of how we work across a capital where many homeowners are more comfortable in French, so every client gets a clear explanation of what the job needs.'
  },
  'ON-0003': {
    meta: 'Need {SERVICE} in Mississauga? {COMPANY_NAME} serves Square One, Port Credit, Streetsville and Meadowvale. Fast local service. Call {PHONE}.',
    extra: 'Mississauga\'s scale means our crews cover a lot of ground in a day, from a Lakeview bungalow near the water to a Meadowvale townhome to a City Centre tower. {COMPANY_NAME} scopes {SERVICE} to each property type, and our {SERVICE_LIST} spans the full range. The city\'s constant renewal — infill along the Credit River, new mid-rises in Port Credit, maturing subdivisions in Erin Mills — keeps demand steady, and we plan every job around the specific building and lot rather than a one-size approach.'
  },
  'ON-0004': {
    meta: 'Need {SERVICE} in Brampton? {COMPANY_NAME} serves Bramalea, Springdale, Mount Pleasant and downtown. Fast local service. Call {PHONE}.',
    extra: 'The contrast between old and new Brampton drives how we work. A Bramalea backsplit from the 1960s and a Mount Pleasant home built last year need very different care, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and because so much of the city is newly built, we pay close attention to how recent lots settle and grade. Downtown\'s century homes near Gage Park get an approach suited to their age. One call gets the right plan for your part of the Flower Town.'
  },
  'ON-0005': {
    meta: 'Need {SERVICE} in Markham? {COMPANY_NAME} serves Unionville, Markham Village, Cornell and Milliken. Licensed local service. Call {PHONE}.',
    extra: 'Markham\'s blend of heritage and high-tech shows up in its homes. A preserved frame house on Unionville\'s Main Street and a new Cornell build are worlds apart, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and we bring the care that Markham\'s well-kept, higher-value neighbourhoods expect. Because the city keeps expanding into new master-planned communities while protecting its historic cores, we work fluently across both — matching every job to the property\'s era rather than treating them the same.'
  },
  'ON-0006': {
    meta: 'Need {SERVICE} in Vaughan? {COMPANY_NAME} serves Woodbridge, Maple, Thornhill, Kleinburg and the VMC. Fast local service. Call {PHONE}.',
    extra: 'Vaughan\'s homes run large and varied, and that shapes the work. A Woodbridge estate, a Thornhill postwar home and a new VMC condo each demand a different plan, and {COMPANY_NAME} scopes {SERVICE} to fit. Our {SERVICE_LIST} covers the full range, and we bring the crews and planning that bigger executive properties call for. Kleinburg\'s heritage village homes get an approach suited to their age. Whatever corner of this fast-changing city you are in, one call gets work matched to your property.'
  },
  'ON-0090': {
    meta: 'Need {SERVICE} in Hamilton? {COMPANY_NAME} serves the lower city, the Mountain, Dundas, Ancaster and Stoney Creek. Call {PHONE}.',
    extra: 'Hamilton\'s terrain makes property type matter more than usual. A century brick home in the North End, a Mountain-top suburban build and an Ancaster estate each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range. Because so many older lower-city homes sit near the Escarpment\'s ravines and waterfalls, we account for slope and moisture that generic providers miss. From James Street North to Waterdown, every job is planned around the ground it sits on.'
  },
  'ON-0012': {
    meta: 'Need {SERVICE} in Kitchener? {COMPANY_NAME} serves downtown, Doon, Forest Heights and the ION corridor. Fast local service. Call {PHONE}.',
    extra: 'Kitchener\'s range of housing shapes the work. A downtown yellow-brick Victorian, a Forest Heights side-split and a new Doon build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and the region\'s freeze-thaw makes timing important, especially for older masonry. As condos rise along the ION line and subdivisions fill the south end, we work fluently across new and heritage construction alike, matching every job to the property rather than applying one method everywhere.'
  },
  'ON-0011': {
    meta: 'Need {SERVICE} in Guelph? {COMPANY_NAME} serves the Ward, Exhibition Park, Kortright Hills and the south end. Fast local service. Call {PHONE}.',
    extra: 'Guelph\'s limestone heritage makes property type especially important. A grey-stone home near the Basilica, a brick house in Exhibition Park and a new Westminster Woods build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and stone and century masonry get the specialized care the Royal City\'s older core requires. As the south end keeps growing, we work fluently across new and heritage construction, matching every job to how the property was actually built.'
  },
  'ON-0013': {
    meta: 'Need {SERVICE} in St. Catharines? {COMPANY_NAME} serves downtown, Port Dalhousie, Grantham and the west end. Call {PHONE}.',
    extra: 'The Garden City\'s range of homes shapes the work. A Port Dalhousie waterfront property, a Merritton mill-era house and a new west-end build near Brock each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range. Because so many homes sit near the Welland Canal and the Lake Ontario shoreline, we account for the extra moisture and drainage those settings bring. From the historic harbour to the newest subdivision, every job is planned around the property in front of us.'
  },
  'ON-0010': {
    meta: 'Need {SERVICE} in Barrie? {COMPANY_NAME} serves the waterfront, Allandale, the south end and Painswick. Fast local service. Call {PHONE}.',
    extra: 'Barrie\'s fast growth shows in its homes. A Kempenfelt Bay waterfront property, a historic Allandale house and a brand-new Ardagh build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and the Georgian Bay snowbelt makes winter planning essential, especially for newly graded subdivision lots that settle in their first years. As the south end keeps filling with commuter housing, we work fluently across new and established construction, matching every job to the property.'
  },
  'ON-0015': {
    meta: 'Need {SERVICE} in Cambridge? {COMPANY_NAME} serves Galt, Preston, Hespeler and the newer subdivisions. Fast local service. Call {PHONE}.',
    extra: 'Cambridge\'s three-town make-up gives it unusual variety. A Galt limestone home, a Preston mill-era house and a new subdivision build near the 401 each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and Galt\'s heritage stone gets the specialized care it requires. Because riverside lots along the Grand see extra spring runoff, we account for that too. Whichever of the three communities you live in, one call gets work matched to how your home was built.'
  },
  'ON-0016': {
    meta: 'Need {SERVICE} in London, ON? {COMPANY_NAME} serves Old North, Wortley Village, Byron and Masonville. Fast local service. Call {PHONE}.',
    extra: 'The Forest City\'s range of homes shapes the work. A century house on a tree-lined Old North street, a Wortley Village heritage home and a new north-end build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and older masonry gets the specialized care London\'s heritage districts require. Because the Thames branches run through the city, we account for the extra moisture riverside lots face. From Old North to Hyde Park, every job is planned around the property.'
  },
  'ON-0014': {
    meta: 'Need {SERVICE} in Brantford? {COMPANY_NAME} serves downtown, Echo Place, West Brant and Terrace Hill. Fast local service. Call {PHONE}.',
    extra: 'The Telephone City\'s mix of old and new shapes the work. A century home in Terrace Hill, a postwar house in Echo Place and a new West Brant build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and older downtown masonry gets the specialized care it requires. Because the Grand River wraps the city, we account for the extra moisture riverside lots face. As West Brant keeps growing, we work fluently across new and heritage construction alike.'
  },
  'ON-0019': {
    meta: 'Need {SERVICE} in Niagara Falls? {COMPANY_NAME} serves Chippawa, Stamford, Drummondville and the north end. Call {PHONE}.',
    extra: 'Away from the tourist towers, Niagara Falls is a city of varied homes. A Chippawa riverfront property, a Stamford postwar house and a new north-end build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range. Because the river gorge and heavy mist near the falls add moisture and freeze-thaw stress, we plan {SERVICE} around Niagara\'s microclimate. From historic Chippawa to the newest subdivision, every job is scoped to the property rather than a template.'
  },
  'ON-0021': {
    meta: 'Need {SERVICE} in Kingston? {COMPANY_NAME} serves downtown, Sydenham, Portsmouth and the west end. Fast local service. Call {PHONE}.',
    extra: 'The Limestone City\'s heritage makes property type especially important. A grey-stone home near Queen\'s, a Portsmouth waterfront house and a new Cataraqui build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and limestone and century masonry get the specialized care Kingston\'s core requires through its hard freeze-thaw. Because so many homes sit near Lake Ontario and the St. Lawrence, we account for the extra exposure waterfront lots face. Every job is planned around the property.'
  },
  'ON-0022': {
    meta: 'Need {SERVICE} in Peterborough? {COMPANY_NAME} serves the Avenues, East City, Monaghan and the north end. Call {PHONE}.',
    extra: 'The Electric City\'s range of homes shapes the work. A century house in the Avenues, an East City home across the Otonabee and a new north-end build near Trent each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and older masonry gets the specialized care Peterborough\'s heritage streets require. Because the Otonabee and the Trent-Severn run through the city, we account for the extra moisture riverside lots face through the region\'s freeze-thaw seasons.'
  },
  'ON-0025': {
    meta: 'Need {SERVICE} in Cornwall? {COMPANY_NAME} serves Le Village, Riverdale, downtown and the east and west ends. Bilingual service. Call {PHONE}.',
    extra: 'Cornwall\'s history gives it a varied housing stock. A Le Village heritage home, a downtown century house and a new east-end build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and older masonry gets the specialized care the city\'s oldest districts require through hard eastern-Ontario freeze-thaw. Because many homes sit along the St. Lawrence, we account for the extra exposure riverside lots face — and we explain every job clearly in English or French.'
  },
  'ON-0030': {
    meta: 'Need {SERVICE} in Belleville? {COMPANY_NAME} serves downtown, the east and west hills and the Bayshore. Fast local service. Call {PHONE}.',
    extra: 'The Friendly City\'s range of homes shapes the work. A century Front Street home, an east-hill postwar house and a new Bayshore build each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and older downtown masonry gets the specialized care it requires through the region\'s hard freeze-thaw. Because so many homes sit along the Bay of Quinte and the Moira River, we account for the extra moisture and exposure waterfront lots face. Every job is scoped to the property.'
  },
  'ON-0040': {
    meta: 'Need {SERVICE} in Windsor? {COMPANY_NAME} serves Walkerville, Riverside, South Windsor and Sandwich. Fast local service. Call {PHONE}.',
    extra: 'Canada\'s southernmost city has a housing stock all its own. A Walkerville heritage home, a South Windsor bungalow and a riverfront Riverside property each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and Walkerville\'s early-20th-century homes get the specialized care they deserve. Because Windsor\'s summers bring violent storms and heavy rain rather than deep cold, we plan {SERVICE} around water and heat as much as winter — matching every job to the property and the climate it faces.'
  },
  'ON-0041': {
    meta: 'Need {SERVICE} in Greater Sudbury? {COMPANY_NAME} serves the downtown core, New Sudbury, the South End, Val Caron and Chelmsford. Call {PHONE}.',
    extra: 'Sudbury\'s Shield terrain makes property type and setting matter more than usual. A downtown home near Ramsey Lake, a New Sudbury house and a lakefront lot in Val Caron each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and rock lots and frost heave get the attention the North demands. Because winters here are among Ontario\'s harshest, we plan timing, materials and access carefully — so work across the basin holds up through heavy snow and deep cold.'
  },
  'ON-0044': {
    meta: 'Need {SERVICE} in Sarnia? {COMPANY_NAME} serves the waterfront, Bright\'s Grove, Blackwell and the north and south ends. Call {PHONE}.',
    extra: 'The Blue Water region\'s range of homes shapes the work. A St. Clair River waterfront property, a central postwar bungalow and a lakeside Bright\'s Grove home each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range. Because so many homes sit on the open Lake Huron shoreline, we account for the extra wind, ice and snow-squall exposure the lakeshore brings. From the waterfront to the newest Blackwell subdivision, every job is scoped to the property in front of us.'
  },
  'ON-0048': {
    meta: 'Need {SERVICE} in North Bay? {COMPANY_NAME} serves the waterfront, downtown, Ferris and the Trout Lake area. Fast local service. Call {PHONE}.',
    extra: 'The Gateway to the North has a housing stock shaped by its setting. A downtown waterfront home, a Ferris postwar house and a Trout Lake cottage-style property each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and lakefront lots on Nipissing and Trout Lake get the attention their exposure demands. Because North Bay\'s winters are long and cold, we plan timing, materials and access carefully so the work holds up through heavy snow and deep frost.'
  },
  'ON-0065': {
    meta: 'Need {SERVICE} in Thunder Bay? {COMPANY_NAME} serves the Port Arthur and Fort William cores, Current River and Westfort. Call {PHONE}.',
    extra: 'The Lakehead\'s twin-city roots give it a varied housing stock. A Westfort century home, a Current River lakeside property and a newer build on the edges each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and the historic cores\' older masonry gets the specialized care it requires. Because Lake Superior drives long, severe winters, we plan timing, materials and access carefully so the work holds up through heavy snow and deep cold across the city.'
  },
  'ON-0074': {
    meta: 'Need {SERVICE} in Sault Ste. Marie? {COMPANY_NAME} serves the downtown, west end, Steelton and the east end. Call {PHONE}.',
    extra: 'The Soo\'s industrial history gives it a varied housing stock. A Steelton worker\'s home near Algoma Steel, a downtown century house and a west-end property each need a different plan, and {COMPANY_NAME} scopes {SERVICE} to each. Our {SERVICE_LIST} covers the range, and the older districts\' masonry gets the specialized care it requires. Because Lake Superior lake-effect snow drives long, cold winters, we plan timing, materials and access carefully so the work holds up through heavy snow and hard freeze-thaw across the city.'
  },
};

let patched = 0;
for (const r of rows) {
  const p = patch[r.id];
  if (!p) { console.log('NO PATCH for', r.id); continue; }
  r.metaDescription = p.meta;
  // insert extra paragraph before the final paragraph (the access/close one)
  const paras = r.longDescription.split('\n\n');
  paras.splice(paras.length - 1, 0, p.extra);
  r.longDescription = paras.join('\n\n');
  patched++;
}
fs.writeFileSync(P, rows.map(r => JSON.stringify(r)).join('\n'));
console.log('patched:', patched, 'of', rows.length);
