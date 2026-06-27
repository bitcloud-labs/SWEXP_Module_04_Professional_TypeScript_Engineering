import { describe, it, expect } from 'vitest';
import { handle, isOrder, parseSafe, type ApiResponse, type Order } from '../src/lesson05_api';

const order: Order = { id: 'o1', status: 'paid', total: 100 };

describe('lesson 05 — guards & discriminated unions', () => {
  it('handle returns the data on success', () => {
    const res: ApiResponse = { status: 'success', data: order };
    expect(handle(res)).toEqual(order);
  });
  it('handle returns null on error', () => {
    const res: ApiResponse = { status: 'error', code: 500, message: 'boom' };
    expect(handle(res)).toBeNull();
  });
  it('isOrder accepts a valid order', () => {
    expect(isOrder(order)).toBe(true);
  });
  it('isOrder rejects an error-shaped payload', () => {
    expect(isOrder({ status: 'error', code: 1, message: 'x' })).toBe(false);
  });
  it('isOrder rejects non-objects', () => {
    expect(isOrder(null)).toBe(false);
    expect(isOrder('order')).toBe(false);
    expect(isOrder(42)).toBe(false);
  });
  it('isOrder rejects an order with a wrong-typed field', () => {
    expect(isOrder({ id: 1, status: 'paid', total: 100 })).toBe(false);
    expect(isOrder({ id: 'o1', status: 'paid', total: 'lots' })).toBe(false);
  });
  it('parseSafe rejects a bad payload (where `as` would not)', () => {
    expect(parseSafe({ oops: true })).toBeNull();
  });
  it('parseSafe accepts a good payload', () => {
    expect(parseSafe(order)).toEqual(order);
  });
});
