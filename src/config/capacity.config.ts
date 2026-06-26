/**
 * Capacity Signal Configuration — Hormozi's honest scarcity principle.
 *
 * NEVER fake urgency. Real scarcity signals create real urgency.
 * Update weeksOut and slotsRemaining weekly/monthly.
 * Set isActive: false during slow periods to hide the component.
 *
 * Hormozi: "Scarcity must be real or it destroys trust."
 */

export const CAPACITY: {
  weeksOut: number;
  slotsRemaining: number;
  month: string;
  isActive: boolean;
} = {
  weeksOut: 3,
  slotsRemaining: 4,
  month: "June",
  isActive: true,
};
