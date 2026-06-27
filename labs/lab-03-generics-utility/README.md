# Lab 03 — Eliminate Duplicate Types

**Ticket:** GEN-2010 · **Goal:** derive related types from ONE canonical `Order`, and replace per-resource wrappers with one generic.

## What you do
In [`src/types.ts`](src/types.ts), replace the `unknown` placeholders with derivations of `Order`:

- `CreateOrderInput` = `Order` without `id` → `Omit<Order, 'id'>`
- `UpdateOrderInput` = every field of that optional → `Partial<Omit<Order, 'id'>>`
- `OrderSummary` = just `id` + `status` → `Pick<Order, 'id' | 'status'>`
- `ApiResult<T>` = one generic wrapper `{ data: T; fetchedAt: Date }`

Run:
```bash
npm run test:types        # tests/types.test-d.ts checks each derivation
```

## Why it matters
Derivation propagates: add a field to `Order` and every derived type updates, and the compiler points you
at exactly the construction sites that must now supply it. Hand-copied duplicates silently drift.

## Submit
Commit and push. No `any`, no `as`.
