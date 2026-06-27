import { describe, it, expect } from 'vitest';
import { lineTotal, orderTotal } from '../src/checkout';

describe('lab 01 — static typing', () => {
  it('lineTotal multiplies price by quantity', () => {
    expect(lineTotal({ price: 10, quantity: 2 })).toBe(20);
  });
  it('orderTotal sums line totals and adds tax', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 },
    ];
    expect(orderTotal(items, 0.1)).toBeCloseTo(38.5, 5); // (20 + 15) * 1.1
  });
  it('orderTotal of an empty cart is 0', () => {
    expect(orderTotal([], 0.2)).toBe(0);
  });
});
