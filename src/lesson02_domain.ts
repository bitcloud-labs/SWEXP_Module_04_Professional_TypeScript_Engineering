/**
 * Lesson 02 — Model the Business Domain (Ticket DOMAIN-2001)
 * Companion: Lesson_02.md · labs/lab-02-domain-model.md
 *
 * Goal: model the Forge domain so that illegal states are UNREPRESENTABLE.
 * Replace the loose placeholders below with a precise model, then implement
 * the transitions. Run `npm test` (behaviour) and `npm run test:types`
 * (the type-level checks in tests/lesson02_domain.test-d.ts).
 *
 * Rules of the module: no `any`, no `as`, no `@ts-ignore`. The compiler is
 * your first reviewer — a claim that doesn't type-check isn't true.
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

// TODO(1): make OrderStatus the exact literal union:
//   'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled'
export type OrderStatus = string;

// TODO(2): model Order as a UNION of two shapes so illegal states can't exist:
//   - { status: 'draft' | 'placed';            total: Money }              // no paidAt
//   - { status: 'paid' | 'shipped' | 'cancelled'; total: Money; paidAt: Date }  // paidAt required
// Replace this loose placeholder (it wrongly lets a 'paid' order omit paidAt):
export type Order = { status: OrderStatus; total: Money; paidAt?: Date };

/** Create a freshly placed order (status 'placed', never paid yet). */
export function placeOrder(total: Money): Order {
  // TODO: return a 'placed' order.
  return { status: 'draft', total };
}

/** Transition any order to 'paid', stamping when it was paid. */
export function markPaid(order: Order, at: Date): Order {
  // TODO: return the paid variant carrying paidAt = at (keep the same total).
  return order;
}

/** One-line summary, e.g. "paid order for 100 USD". */
export function describeOrder(order: Order): string {
  // TODO: `${order.status} order for ${amount} ${currency}`
  return '';
}
