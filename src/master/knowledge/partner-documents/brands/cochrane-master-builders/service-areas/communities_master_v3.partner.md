# Partner Document — Cochrane Service-Area Communities Master List (v3)

**Source (verbatim):** `src/master/knowledge/source-documents/brands/cochrane-master-builders/service-areas/communities_master_v3.xlsx`
**Markdown mirror (1:1):** `…/service-areas/communities_master_v3.source.md`

## Title
Cochrane Master Builders — Service-Area Communities Registry (v3)

## Category
brands → cochrane-master-builders → **service-areas** → canonical geographic registry of all communities served. This is a **new axis** in the Cochrane knowledge graph: not a v-numbered companion to the 115-spin-off paired set, but the **geographic axis** that intersects every spin-off site.

## Main Purpose
Canonical source-of-truth for **every community / neighbourhood served** by Cochrane Master Builders and all 115 planned spin-off sites. Will eventually power per-community programmatic SEO landing pages on every site in the family.

131 communities × 2 cols (`Community`, `Details`). Descriptions are SEO-grade local copy ready to feed page bodies, meta descriptions, and LocalBusiness/Place schema.

## What This Document Should Influence
- **Per-community programmatic SEO pages** on each Cochrane spin-off site (e.g., `/service-areas/springbank`, `/service-areas/bearspaw`).
- **Service-area listings** in footers, "Areas We Serve" hubs, and sitemap priority.
- **Local schema** — `LocalBusiness.areaServed`, `Place`, `GeoCoordinates` future enrichment.
- **Hero/contextual copy** for any page that mentions a specific community by name (the `Details` cell is the canonical narrative).
- **Internal linking** between cluster service pages and community pages (hub-and-spoke local SEO).
- **"Do you serve [X]?"** answer logic — chatbot, FAQ, AI search.

## Trigger Keywords
*community, communities, neighbourhood, area served, service area, location, where we work, "do you serve [X]," geographic SEO, local landing page, programmatic SEO, hub-and-spoke local, Calgary CMA, Cochrane region, Springbank, Bearspaw, Bragg Creek, Rocky View County, acreage, estate community, Place schema, LocalBusiness areaServed.*

## Adaptation Rules / Firewall
- Brand context = **Cochrane Master Builders** only. No automotive vocabulary firewall.
- The source `.xlsx` is **immutable** — verbatim cell content is the source of truth. If any row contains contextual references unrelated to construction (e.g., wedding venues, tourism, etc.), **do not delete or edit them in the source**. The partner doc is the only place to flag what to filter when generating front-end copy.
- Front-end copy generated from a `Details` cell may **selectively render** the construction-relevant portions and omit clearly off-brand fragments — but the underlying source row stays intact for audit.
- Per-community page copy must reconcile against Cochrane brand-identity (`1.2.1`, `1.2.2`), Cochrane UX (`1.3.1`), v4.0 ICP voice, v5.0 palette, v6.0 temperament, v9.0 layout, v10.0 style guide, and the Image SEO + Local Visibility persona before shipping.
- No `.ca` domain or contact-data assumptions are encoded here; never invent street addresses or phone numbers from this file.

## Cross-Axis Relationship to the 115-Spin-off Paired Set
The 8-file paired set (v1.0 / v2.0 / v4.0 / v5.0 / v6.0 / v7.0 / v9.0 / v10.0) is the **service axis** — joined on `Master Row`. This communities registry is the **geographic axis** — joined on `Community`. Each spin-off site can render the full communities list as its `/service-areas/` hub, and each community can be cross-referenced from any service page via internal linking. Together they form the **service × geography matrix** that powers the family's local-SEO surface area.

## Mode-OS Pairing
- **Architect** — uses the registry to scaffold per-community page templates, sitemap entries, and internal-linking maps.
- **Mapper** — renders region-by-region or cluster-by-region community matrices (e.g., Springbank acreage cluster vs. inner-city Calgary cluster).
- **Auditor** — verifies per-community page output against (a) the row's verbatim `Details`, (b) the Image SEO + Local Visibility persona's 14-step framework, and (c) locked brand-identity memories. Missing community = **High** bug; off-brand fragment leaking from a `Details` cell into front-end copy = **Medium** bug; broken `LocalBusiness.areaServed` schema = **Critical**.

## Dependencies
- Cross-brand: Image SEO + Local Visibility persona, SEO Virtuoso persona, SEO FAQ Optimization persona, Navigation Architect, Footer Architect, the 3-mode OS personas.
- Cochrane brand-identity: `1.2.1` Family Legacy Standard, `1.2.2` Foundations. Cochrane UX: `1.3.1`.
- Paired set: v1.0 (master plan + linking), v9.0 (layout for community pages), v10.0 (style guide for community pages).

## Guidance Type
Brand-global for Cochrane Master Builders only. Geographic axis applies across **all 115 spin-off sites**.

## Practical Examples
- *"Build the Springbank service-area page for Cochrane Construction Masters."* → Pull the Springbank row's `Details`; reconcile with v9.0 layout + v10.0 style guide + Image SEO persona.
- *"Generate the footer 'Areas We Serve' list."* → Render the full `Community` column; link each to its programmatic page.
- *"Do we serve Bragg Creek?"* → Look up by `Community`; if present, answer yes and surface the `Details` excerpt.
- *"Audit the local SEO completeness of the family of sites."* → Verify every `Community` has a rendered page on each spin-off and that `LocalBusiness.areaServed` schema is populated.
