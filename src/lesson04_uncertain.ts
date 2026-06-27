/**
 * Lesson 04 — Model Uncertain Business Data (Ticket UNION-3001)
 * Companion: Lesson_04.md · labs/lab-04-unions-narrowing.md
 *
 * Implement each function by NARROWING the union — no `any`, no `as`.
 * `npm test` runs tests/lesson04_uncertain.test.ts: red now, green once narrowed.
 */

/** An id arrives as a string from one system, a number from another. */
export type Id = string | number;

/** A discount is EITHER a percentage OR a flat money amount. */
export type Discount =
  | { kind: 'percent'; value: number }
  | { kind: 'flat'; amount: number };

/** A note may be absent. */
export type Note = string | null;

/** Format an id as an uppercase string (numbers render as their digits). */
export function formatId(id: Id): string {
  // TODO: narrow with `typeof id === 'string'`.
  return '';
}

/** Apply a discount: percent reduces by value%, flat subtracts (never below 0). */
export function applyDiscount(price: number, d: Discount): number {
  // TODO: narrow on `d.kind`.
  return price;
}

/** Preview a possibly-absent note: the trimmed text, or 'No note' when null. */
export function previewNote(note: Note): string {
  // TODO: handle the null case (note?.trim() ?? 'No note').
  return '';
}
