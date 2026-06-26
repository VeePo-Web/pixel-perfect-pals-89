/**
 * ═══════════════════════════════════════════════════════════════════════════
 * GUARDRAIL → DECISION ROUTES (inverted index)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Pure derived data — inverts DECISION_INDEX so that for any GuardRailId you
 * can immediately get the partner-doc routes that govern it. Used by the
 * preflight runner to print "consult these partner docs" alongside any
 * failed rail, and by the /knowledge/preflight UI to render clickable links.
 *
 * Adding a new partner-doc route to DECISION_INDEX, or a new rail to
 * guardrails.ts, is the only way to update this map. No content lives here.
 * ═══════════════════════════════════════════════════════════════════════════
 */

import { GUARD_RAILS, type GuardRailId } from "../guardrails";
import { DECISION_INDEX, type DecisionRoute } from "./decision-index";

export type GuardRailRouteMap = Partial<Record<GuardRailId, DecisionRoute[]>>;

function buildMap(): GuardRailRouteMap {
  const map: GuardRailRouteMap = {};
  for (const route of DECISION_INDEX) {
    for (const railId of route.guardRails) {
      const list = (map[railId] ??= []);
      // Order is preserved by registry order; no dedupe needed (registry has
      // distinct ids), but guard against accidental future dupes.
      if (!list.some((r) => r.id === route.id)) list.push(route);
    }
  }
  return map;
}

export const GUARDRAIL_TO_ROUTES: GuardRailRouteMap = buildMap();

export function getRoutesForGuardRail(id: GuardRailId): DecisionRoute[] {
  return GUARDRAIL_TO_ROUTES[id] ?? [];
}

/**
 * Returns guard rails that no partner doc currently references.
 * The preflight runner converts a non-empty result into a meta failure so we
 * never silently ship a rail that has no decision-routing context.
 */
export function getUnroutedGuardRails(): GuardRailId[] {
  return GUARD_RAILS.filter(
    (g) => (GUARDRAIL_TO_ROUTES[g.id] ?? []).length === 0,
  ).map((g) => g.id);
}
