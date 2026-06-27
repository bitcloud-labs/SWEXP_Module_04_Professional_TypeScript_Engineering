/**
 * Lab 03 — Eliminate Duplicate Types. See README.md.
 * Derive, don't hand-copy.
 */
export interface Order {
  id: string;
  status: 'draft' | 'placed' | 'paid';
  total: number;
  paidAt?: Date;
}

// TODO: replace each `unknown` with the right utility-type derivation.
export type CreateOrderInput = unknown; // hint: Omit<Order, 'id'>
export type UpdateOrderInput = unknown; // hint: Partial<Omit<Order, 'id'>>
export type OrderSummary = unknown; // hint: Pick<Order, 'id' | 'status'>

// TODO: one generic wrapper instead of OrderResult / CustomerResult / ...
export interface ApiResult<T> {
  // hint: data: T; fetchedAt: Date
}

/** Already implemented — keep it compiling as your derived types change. */
export function summarize(o: Order): OrderSummary {
  return { id: o.id, status: o.status };
}
