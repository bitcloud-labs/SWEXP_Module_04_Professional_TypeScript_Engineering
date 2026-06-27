import { test, expectTypeOf } from 'vitest';
import type { Order, OrderStatus, Money } from '../src/domain';

test('OrderStatus is the exact literal union', () => {
  expectTypeOf<OrderStatus>().toEqualTypeOf<
    'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled'
  >();
});

test('a paid order WITHOUT paidAt is not a valid Order (illegal state unrepresentable)', () => {
  expectTypeOf<{ status: 'paid'; total: Money }>().not.toMatchTypeOf<Order>();
});

test('a paid order WITH paidAt is a valid Order', () => {
  expectTypeOf<{ status: 'paid'; total: Money; paidAt: Date }>().toMatchTypeOf<Order>();
});

test('a draft order needs no paidAt', () => {
  expectTypeOf<{ status: 'draft'; total: Money }>().toMatchTypeOf<Order>();
});
