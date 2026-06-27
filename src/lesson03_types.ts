/**
 * Lesson 03 — Eliminate Duplicate Types (Ticket GEN-2010)
 * Companion: Lesson_03.md · labs/lab-03-generics-utility.md
 *
 * Goal: derive the near-duplicate types from ONE canonical `Order` using
 * utility types, and replace the per-resource result wrappers with ONE generic.
 * Graded by tests/lesson03_types.test-d.ts (`npm run test:types`).
 */

export interface Order {
  id: string;
  status: 'draft' | 'placed' | 'paid';
  total: number;
  paidAt?: Date;
}

// TODO(1): derive, don't hand-copy. Replace `unknown` with the right utility type.
//   CreateOrderInput = Order without `id`
export type CreateOrderInput = unknown; // hint: Omit<Order, 'id'>

//   UpdateOrderInput = every field of CreateOrderInput optional
export type UpdateOrderInput = unknown; // hint: Partial<Omit<Order, 'id'>>

//   OrderSummary = just id + status
export type OrderSummary = unknown; // hint: Pick<Order, 'id' | 'status'>

// TODO(2): one generic wrapper instead of OrderResult / CustomerResult / ...
//   ApiResult<T> = { data: T; fetchedAt: Date }
export interface ApiResult<T> {
  // hint: data: T; fetchedAt: Date
}

/** Already implemented — keep it compiling as your derived types change. */
export function summarize(o: Order): OrderSummary {
  return { id: o.id, status: o.status };
}
