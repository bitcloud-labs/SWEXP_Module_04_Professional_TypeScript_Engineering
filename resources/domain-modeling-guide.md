# Domain Modeling Guide

The goal: **make illegal states unrepresentable.** If a bad value can't be constructed, you never have to check for it — the compiler does.

## Interfaces and type aliases
```ts
interface Customer { readonly id: string; name: string; vip?: boolean; }
type Money = { amount: number; currency: 'USD' | 'EUR' };
```
Use `interface` for object contracts you extend/implement; `type` for unions, tuples, and computed types.

## Literal types over `string`
```ts
type OrderStatus = 'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled';
let s: OrderStatus = 'payed';   // ERROR — typo caught at compile time
```
A `string` accepts every typo; a union accepts only the values you mean.

## Make illegal states unrepresentable
Don't model a thing as a bag of optional fields and hope the right combination is set. Model the *valid combinations* as a union so the invalid ones can't be built.

```ts
// WEAK: shippedAt can be set while status is still 'draft' — illegal but representable
interface BadOrder { status: OrderStatus; total: number; paidAt?: Date; }

// STRONG: a paidAt only exists once paid/shipped/cancelled — illegal combos don't typecheck
type Order =
  | { status: 'draft' | 'placed'; total: number }
  | { status: 'paid' | 'shipped' | 'cancelled'; total: number; paidAt: Date };
```
Now `{ status: 'draft', paidAt: new Date() }` is a compile error, not a runtime surprise.

## `readonly` for invariants
```ts
interface Customer { readonly id: string; name: string; }
const c: Customer = { id: 'c1', name: 'Ada' };
c.id = 'c2';   // ERROR — identity can't change after creation
```

## Modeling checklist
- Replace open `string`/`number` fields with literal unions where the set of values is fixed.
- Replace "optional fields that depend on each other" with a discriminated union (see the guards reference).
- Mark identity and other invariants `readonly`.
- Prefer required fields; make optional only what is truly optional.
- Let the compiler reject the illegal case — don't write a runtime guard for something the type can forbid.

## The standard
A model is done when **every value the type permits is a value the business permits** — and the compiler rejects the rest. `any` defeats the entire exercise; it is never the fix.
