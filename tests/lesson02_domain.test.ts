import { describe, it, expect } from 'vitest';
import { placeOrder, markPaid, describeOrder, type Money } from '../src/lesson02_domain';

const usd100: Money = { amount: 100, currency: 'USD' };

describe('lesson 02 — domain transitions', () => {
  it('placeOrder creates a placed order with no paidAt', () => {
    const o = placeOrder(usd100);
    expect(o.status).toBe('placed');
    expect(o.total).toEqual(usd100);
    expect('paidAt' in o ? o.paidAt : undefined).toBeUndefined();
  });
  it('markPaid moves an order to paid and stamps paidAt', () => {
    const when = new Date('2026-01-02T03:04:05Z');
    const o = markPaid(placeOrder(usd100), when);
    expect(o.status).toBe('paid');
    expect('paidAt' in o ? o.paidAt : undefined).toEqual(when);
    expect(o.total).toEqual(usd100);
  });
  it('describeOrder summarises status, amount and currency', () => {
    expect(describeOrder(placeOrder(usd100))).toBe('placed order for 100 USD');
  });
});
