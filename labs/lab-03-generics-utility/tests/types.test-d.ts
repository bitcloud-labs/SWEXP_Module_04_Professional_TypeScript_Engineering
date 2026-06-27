import { test, expectTypeOf } from 'vitest';
import type {
  Order,
  CreateOrderInput,
  UpdateOrderInput,
  OrderSummary,
  ApiResult,
} from '../src/types';

test('CreateOrderInput is Order without id', () => {
  expectTypeOf<CreateOrderInput>().toEqualTypeOf<Omit<Order, 'id'>>();
});

test('UpdateOrderInput is a partial create input', () => {
  expectTypeOf<UpdateOrderInput>().toEqualTypeOf<Partial<Omit<Order, 'id'>>>();
});

test('OrderSummary is just id + status', () => {
  expectTypeOf<OrderSummary>().toEqualTypeOf<Pick<Order, 'id' | 'status'>>();
});

test('ApiResult<T> is the one generic wrapper', () => {
  expectTypeOf<ApiResult<Order>>().toEqualTypeOf<{ data: Order; fetchedAt: Date }>();
});
