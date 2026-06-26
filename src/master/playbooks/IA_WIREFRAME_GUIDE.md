# IA & WIREFRAME GUIDE — designing the site BEFORE writing copy

> Pages and structure first. Copy second. Visuals third. **In that order.** Reversing it leads to copy that fights the structure.

---

## Default sitemap (every Masters site)

```
/                        Home
/services                Services index
/services/<slug>         One page per service (from Phase 1 catalogue)
/areas                   Areas index
/areas/<slug>            One page per area cluster (from Phase 1 spreadsheet)
/about                   Team, license, insurance, warranty summary
/story                   Long-form founding story (split from /about for SEO)
/process                 Method walkthrough (own page if process is differentiator)
/gallery                 Finished-work portfolio
/faq                     Master FAQ list (≥20)
/contact                 Form + map + hours
/privacy                 Privacy policy
/terms                   Terms of service
/warranty                Warranty page
/accessibility           Accessibility statement
/brand                   Internal brand kit (noindex)
```

Service & area page counts come from Phase 1 docs. **Don't ship a site with a single area page** — that's a templated death sentence for local SEO.

## Page templates (section order)

### Home
1. Hero (headline + sub + primary CTA + phone)
2. Trust strip (license, insurance, years, warranty)
3. Services overview (cards → links to /services/<slug>)
4. Why us (3–5 differentiators)
5. Process (3–6 stages, condensed)
6. Before/after carousel
7. Areas served (map or chip cloud → /areas/<slug>)
8. FAQ (top 5, link to /faq)
9. Final CTA (booking + phone)
10. Footer

### Service page (`/services/<slug>`)
1. Hero (service-specific headline + CTA + breadcrumb)
2. Scope (what's included / not included)
3. Materials & timeline
4. Price band (transparency builds trust)
5. Process for THIS service (specific stages)
6. Before/after for THIS service
7. FAQ × 5 (service-specific, FAQPage JSON-LD)
8. Related services (2 siblings)
9. Areas served (chips → /areas/<slug>)
10. Final CTA
11. Footer

### Area page (`/areas/<slug>`)
1. Hero (service + area headline)
2. **UNIQUE 80–150-word intro** referencing real local landmarks/neighborhoods
3. Services we provide in <area> (chips → /services/<slug>)
4. Local proof (photo of work in this area + testimonial if available)
5. Drive-time / response-time line
6. LocalBusiness JSON-LD with `areaServed` set to this area
7. Final CTA
8. Footer

### About
1. Founder bio + work photo
2. Values (3)
3. License / insurance / WCB block (real numbers)
4. Warranty summary (link to /warranty)
5. Service area summary (link to /areas)
6. Final CTA

## Navigation rules

- **Top nav: ≤6 items.** If you want a 7th, put it in the footer.
- Default order: Services / Areas / About / Process / Gallery / Contact
- Mobile drawer mirrors desktop order
- Phone visible in header above the fold (especially mobile)
- Booking CTA visible in nav on every page

## Footer architecture (3 tiers per master memory)

```
┌─────────────────────────────────────────┐
│ TOP — Brand mark + tagline + booking CTA│
├─────────────────────────────────────────┤
│ MIDDLE — 4–5 columns                    │
│  Services | Areas | Company | Legal     │
│  | Sister sites                         │
├─────────────────────────────────────────┤
│ BOTTOM — license # | insurance # | NAP  │
│  | agency credit (VeePo) | © year       │
└─────────────────────────────────────────┘
```

## Booking CTA entry-point map

Document EVERY CTA in the site as a row:

| Page | Section | Button copy | Pre-filled service |
|---|---|---|---|
| / | Hero | Get a free quote | (none) |
| / | Final CTA | Book a call | (none) |
| /services/roof-replacement | Hero | Quote my roof | roof-replacement |
| /services/roof-replacement | Final CTA | Start my project | roof-replacement |
| /areas/cochrane | Final CTA | Book in Cochrane | (none) |

Phase 7 audits against this map. Every row must open the booking modal.

## URL / slug rules

- Lowercase, hyphenated, descriptive
- Keyword-aware where natural (`/services/asphalt-shingle-replacement` not `/services/srv-3`)
- No IDs in URLs
- No `/page-2` patterns
- Trailing-slash policy: pick one, stay consistent (current default: NO trailing slash)
- Verified against `sitemap.xml` in Phase 6

## Breadcrumbs

Render visible breadcrumbs on:
- `/services/<slug>` — Home › Services › <Service>
- `/areas/<slug>` — Home › Areas › <Area>

`BreadcrumbList` JSON-LD on every level-2+ page (Phase 6).

## Mobile-first checks before approving

- Open the wireframe on a real 390px viewport
- Tap every nav item with a thumb (no clicks)
- Confirm CTAs are in the bottom-third thumb-zone
- Confirm no horizontal scroll
- Confirm safe-area-inset on iOS

When all of the above are signed off, Phase 4 (copy) begins.
