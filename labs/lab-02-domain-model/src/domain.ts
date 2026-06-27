/**
 * Lab 02 — Model the Business Domain. See README.md.
 * No `any`, no `as`, no `@ts-ignore`.
 */
export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Money {
  readonly amount: number;
  readonly currency: Currency;
}

export interface Customer {
  readonly id: string;
  name: string;
  email: string;
  vip?: boolean;
}

// TODO(1): make this the exact literal union (see README).
export type OrderStatus = string;

// TODO(2): replace this loose placeholder with a UNION so a 'paid'/'shipped'/'cancelled'
// order MUST carry paidAt and a 'draft'/'placed' order must NOT.
export type Order = { status: OrderStatus; total: Money; paidAt?: Date };

/** Create a freshly placed order (status 'placed', never paid yet). */
export function placeOrder(total: Money): Order {
  // TODO: return a 'placed' order.
  return { status: 'draft', total };
}

/** Transition any order to 'paid', stamping when it was paid (keep the same total). */
export function markPaid(order: Order, at: Date): Order {
  // TODO
  return order;
}

/** One-line summary, e.g. "paid order for 100 USD". */
export function describeOrder(order: Order): string {
  // TODO
  return '';
}
