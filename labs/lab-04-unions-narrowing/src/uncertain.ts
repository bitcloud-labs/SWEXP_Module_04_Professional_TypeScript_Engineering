/**
 * Lab 04 — Model Uncertain Business Data. See README.md.
 * Implement by NARROWING — no `any`, no `as`.
 */
export type Id = string | number;

export type Discount =
  | { kind: 'percent'; value: number }
  | { kind: 'flat'; amount: number };

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
