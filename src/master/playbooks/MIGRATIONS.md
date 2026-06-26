# MASTER VERSION MIGRATIONS

When the parent CMB brand evolves (new tagline, palette tweak, new mission), bump `MASTER_VERSION` in `src/master/VERSION.ts` and add a note here.

Each remix records which master version it forked from in `trade.config.ts -> identity.forkedFromMaster`. The `/remix` dashboard surfaces stale forks so you know which sites need a refresh.

## v0.1.0 — Initial scaffold (current)

- `src/master/` folder created
- Placeholder identity, style guide, personas, service areas
- Awaiting Phase 2 content embedding from uploaded brand docs
