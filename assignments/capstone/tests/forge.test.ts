import { describe, it, expect } from 'vitest';
import {
  subtotal,
  applyDiscount,
  isIncomingOrder,
  parseOrder,
  type Order,
  type IncomingOrder,
} from '../src/forge';

const order: Order = {
  id: 'o1',
  status: 'placed',
  items: [
    { sku: 'a', price: { amount: 10, currency: 'USD' }, quantity: 2 },
    { sku: 'b', price: { amount: 5, currency: 'USD' }, quantity: 3 },
  ],
};

const incoming: IncomingOrder = { id: 'o1', status: 'paid', total: 35 };

describe('capstone — integrated module', () => {
  it('subtotal sums price * quantity across items', () => {
    expect(subtotal(order)).toBe(35); // 10*2 + 5*3
  });
  it('subtotal of an empty order is 0', () => {
    expect(subtotal({ id: 'x', status: 'draft', items: [] })).toBe(0);
  });
  it('applyDiscount handles both variants', () => {
    expect(applyDiscount(200, { kind: 'percent', value: 10 })).toBe(180);
    expect(applyDiscount(10, { kind: 'flat', amount: 99 })).toBe(0);
  });
  it('isIncomingOrder accepts a valid payload', () => {
    expect(isIncomingOrder(incoming)).toBe(true);
  });
  it('isIncomingOrder rejects bad payloads', () => {
    expect(isIncomingOrder({ id: 1, status: 'paid', total: 35 })).toBe(false);
    expect(isIncomingOrder({ status: 'error', code: 1 })).toBe(false);
    expect(isIncomingOrder(null)).toBe(false);
  });
  it('parseOrder rejects an unverified payload', () => {
    expect(parseOrder({ oops: true })).toBeNull();
    expect(parseOrder(incoming)).toEqual(incoming);
  });
});
