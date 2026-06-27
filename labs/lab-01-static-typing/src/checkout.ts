/**
 * Lab 01 — Static typing. See README.md.
 * Implement these against the LineItem type so the tests pass and `npm run check` is clean.
 */
export interface LineItem {
  price: number;
  quantity: number;
}

/** Total for a single line: price * quantity. */
export function lineTotal(item: LineItem): number {
  // TODO
  return 0;
}

/** Order total: sum of line totals, then add tax (sum * taxRate). */
export function orderTotal(items: LineItem[], taxRate: number): number {
  // TODO: accumulate lineTotal(it) for each item, then return sum + sum * taxRate.
  return 0;
}
