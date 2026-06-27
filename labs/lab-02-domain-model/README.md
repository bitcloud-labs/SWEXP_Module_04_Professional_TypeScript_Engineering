# Lab 02 — Model the Business Domain

**Ticket:** DOMAIN-2001 · **Goal:** model the Forge domain so that **illegal states are unrepresentable**.

## What you do
In [`src/domain.ts`](src/domain.ts):

1. Make `OrderStatus` the exact literal union: `'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled'`.
2. Model `Order` as a **union of two shapes** so bad data can't be constructed:
   - `{ status: 'draft' | 'placed'; total: Money }` — no `paidAt`
   - `{ status: 'paid' | 'shipped' | 'cancelled'; total: Money; paidAt: Date }` — `paidAt` required
3. Implement `placeOrder`, `markPaid`, and `describeOrder`.

Run:
```bash
npx vitest run labs/lab-02-domain-model        # behaviour
npm run test:types                              # type-level checks (illegal states rejected)
```

## The bar
A paid order without `paidAt` should be **unconstructable**, not merely discouraged. The type-level tests
in `tests/domain.test-d.ts` prove it.

## Submit
Commit and push. No `any`, no `as`, no `@ts-ignore`.
