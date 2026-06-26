# 10 — SEO, Schema, Local (CMB)

> Owner: **SEO Virtuoso + SEO FAQ persona.** All schema renders SSR (or static-pre-render); never client-only.

---

## Title / meta templates

| Page | Title pattern | Meta description pattern |
|------|---------------|--------------------------|
| Master Homepage | `Cochrane Master Builders — Family-Owned Construction Services` | `Family-owned construction services for Cochrane homes, acreages, and surrounding communities. Clear pricing guidance. Long-term workmanship.` |
| Cluster Homepage (e.g. Roofing spin-off) | `[Cluster] In Cochrane — Family-Owned Builders` | `[Cluster] services built for Cochrane wind, freeze-thaw, and the long-term value of your home. Clear pricing guidance, real process, local team.` |
| Service Page | `[Service] In [Community] — Cochrane Master Builders` | `[Service] in [Community]. Pricing ranges with drivers. Family-owned standard. Photos welcome — send what you know.` |
| Process Page | `Our [Cluster] Process — Cochrane Master Builders` | `Step-by-step [Cluster] process from first message to final walkthrough. Hidden-work standard explained.` |
| Areas Page | `[Community] Construction Services — Cochrane Master Builders` | `Family-owned construction services in [Community] and surrounding areas. Local conditions, local team.` |

Hard caps: title ≤ 60 chars; meta ≤ 160 chars.

## H1 mandate

- Exactly one H1 per route.
- H1 must include the service or page subject.
- H1 must not be all-caps (CSS-uppercase is fine; the underlying text is sentence-case).

## JSON-LD blueprints

**LocalBusiness** (master site `/`, plus each spin-off home):

```
{
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "name": "Cochrane Master Builders",
  "areaServed": [
    { "@type": "City", "name": "Cochrane" },
    { "@type": "AdministrativeArea", "name": "Bearspaw" },
    { "@type": "AdministrativeArea", "name": "Springbank" }
  ],
  "url": "...",
  "telephone": "...",
  "address": { "@type": "PostalAddress", "addressLocality": "Cochrane", "addressRegion": "AB", "addressCountry": "CA" }
}
```

**Service** (every service page):

```
{ "@context": "https://schema.org", "@type": "Service", "serviceType": "[Service]", "provider": { "@type": "GeneralContractor", "name": "Cochrane Master Builders" }, "areaServed": [ ... ] }
```

**FAQPage** (every page that includes an FAQ section):

```
{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [ { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } } ] }
```

**BreadcrumbList** (every non-home route).

## Internal-link bundle

Every page must include outbound links to:

- The master homepage.
- 2 sibling cluster homes.
- 2 sibling services in the same cluster.
- The matching `[Community]` Areas page (if applicable).
- The Process page for the cluster.

Banned: doorway-page chains, hidden links, link-stuffing in footer.

## Geographic axis join

Each spin-off / community page joins `communities_master_v3` on `Community`. Required fields surfaced: community name, region cluster, drive-time band, local condition note (wind / clay soil / acreage / etc.).

## URL conventions

- Lower-case, hyphen-separated.
- `/services/[cluster]/[service]/`
- `/areas/[community]/`
- `/process/[cluster]/`
- Trailing slash mandatory.

## Banned SEO patterns

- Keyword-stuffed Areas chips.
- Hidden text (`color: var(--bone)` on `--bone` background).
- Doorway pages.
- Auto-generated city pages with no local content.
- `nofollow` on internal navigation links.
- Cloaked content.

## Pass/Fail audit

- [ ] One `<h1>` per route. Manual or `rg -c "<h1" src/pages/[Route].tsx`
- [ ] Title ≤ 60 chars, meta ≤ 160 chars per route.
- [ ] LocalBusiness + Service + FAQPage + BreadcrumbList JSON-LD render in SSR HTML (`view-source` not just devtools).
- [ ] No hidden text (audit by class name + computed style).
- [ ] Internal-link bundle present on every page.
