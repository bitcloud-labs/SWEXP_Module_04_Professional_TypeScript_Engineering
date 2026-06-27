/**
 * Capstone FORGE-9200 — migrate the Forge module to strict, type-safe TS. See README.md.
 * No `any`, no `as`, no `@ts-ignore`.
 */

export type Currency = 'USD' | 'EUR' | 'GBP';

export interface Money {
  readonly amount: number;
  readonly currency: Currency;
}

export interface LineItem {
  sku: string;
  price: Money;
  quantity: number;
}

// TODO(domain): the exact literal union 'draft'|'placed'|'paid'|'shipped'|'cancelled'.
export type OrderStatus = string;

export interface Order {
  id: string;
  status: OrderStatus;
  items: LineItem[];
  paidAt?: Date;
}

// TODO(utility): derive an Order without its id.
export type NewOrder = unknown; // hint: Omit<Order, 'id'>

/** Sum of price.amount * quantity across all line items. */
export function subtotal(order: Order): number {
  // TODO: accumulate over order.items.
  return 0;
}

export type Discount =
  | { kind: 'percent'; value: number }
  | { kind: 'flat'; amount: number };

/** Apply a discount to a price: percent reduces by value%, flat subtracts (never below 0). */
export function applyDiscount(price: number, d: Discount): number {
  // TODO: narrow on d.kind.
  return price;
}

/** The shape an order arrives in over the wire. */
export interface IncomingOrder {
  id: string;
  status: 'placed' | 'paid' | 'shipped';
  total: number;
}

/** Type guard: prove an unknown payload really is an IncomingOrder. */
export function isIncomingOrder(v: unknown): v is IncomingOrder {
  // TODO: object & non-null, string id, valid status, number total.
  return false;
}

/** Boundary parse: return the order only if it passes the guard (no `as`). */
export function parseOrder(json: unknown): IncomingOrder | null {
  return isIncomingOrder(json) ? json : null;
}
