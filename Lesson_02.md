# Lesson 02 — Model the Business Domain

> **Role:** TypeScript Engineer · **Competency:** Domain Modeling · **Track:** DOMAIN · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      DOMAIN-2001
TITLE:       Forge's "order" shape is implicit and inconsistent across the code
PRIORITY:    P2
TYPE:        Refactor / Design
DESCRIPTION: Orders, customers, and money are passed around as untyped objects
             whose shape lives only in people's heads, so every function makes
             slightly different assumptions. Model the core Forge domain
             explicitly with TypeScript types so the shapes are documented,
             enforced, and illegal states are unrepresentable.

ACCEPTANCE CRITERIA:
  - You can model object shapes with `interface` / `type` and know when to use each
  - You can use literal types, `readonly`, and optional vs required fields deliberately
  - You can make illegal states unrepresentable in the type model
  - Functions consume and produce the domain types; misuse is a compile error
```

## 🏢 Business Context

When the shape of "an order" lives only in developers' heads, every function reinvents it and they drift apart — one assumes `status` is a string, another expects a boolean `paid`, a third forgets `currency`. An explicit domain model is **executable documentation**: it says exactly what an order is, the compiler keeps every function honest, and new engineers read the types instead of guessing.

## 🎯 Learning Objectives

- Model object shapes with `interface` and `type` aliases; choose between them
- Use literal types, unions of literals, `readonly`, and optional (`?`) fields with intent
- Apply the principle: **make illegal states unrepresentable**
- Write functions whose signatures consume/produce domain types

## 📚 Technical Deep Dive

**Interfaces and type aliases.**

```ts
interface Customer {
  readonly id: string;        // can't be reassigned after creation
  name: string;
  email: string;
  vip?: boolean;              // optional: Customer | undefined for this field
}

type Money = { amount: number; currency: 'USD' | 'EUR' | 'GBP' };  // literal union
```

`interface` and `type` overlap heavily for object shapes. Rules of thumb: use `interface` for object/class contracts that might be extended or implemented; use `type` for unions, tuples, primitives, and computed/mapped types (Lessons 3–4). Be consistent.

**Literal types** restrict a value to specific constants — far safer than a bare `string`:

```ts
type OrderStatus = 'draft' | 'placed' | 'paid' | 'shipped' | 'cancelled';
```

Now `status = 'payed'` is a compile error, not a silent typo that breaks a `switch`.

**`readonly` and optionality** encode rules: `readonly id` says identity never changes; `vip?` says VIP is optional. Required-by-default is a feature — it forces callers to provide what the domain needs.

**Make illegal states unrepresentable.** This is the heart of domain modeling: design types so that a value that *shouldn't* exist *can't* be constructed.

```ts
// WEAK: paid + status can contradict; paidAt can exist on an unpaid order
interface OrderWeak { status: string; paid: boolean; paidAt?: Date }

// STRONG: a paid order HAS a paidAt; an unpaid one CAN'T — enforced by the type
type Order =
  | { status: 'draft' | 'placed'; total: Money }
  | { status: 'paid' | 'shipped'; total: Money; paidAt: Date };
```

With the strong model, "shipped but no `paidAt`" won't compile. (This is a *discriminated union* — you'll wield them fully in Lesson 5.)

### Common gotchas
- Typing a constrained field as `string` instead of a literal union (lets typos through).
- Making everything optional "to be safe" — optionality should encode a real rule, not avoidance.
- Modeling so that contradictory states are representable, then policing them with runtime checks the type system could have prevented.

## 🧪 Hands-on Labs

Work through **`labs/lab-02-domain-model.md`**. You'll be given Forge orders/customers as loose untyped objects and a few functions that disagree about their shape. You'll build an explicit domain model (interfaces, literal unions, `readonly`, a strong `Order`), retype the functions, and prove that previously-silent misuse (a status typo, a missing field, a contradictory state) now fails to compile.

## 🔍 Engineering Investigation

Before modeling, list the implicit assumptions each function makes about an "order." After modeling, try to construct an *illegal* order (e.g. `status: 'shipped'` with no `paidAt`, or `status: 'payed'`) and record the compiler error. The goal: demonstrate that the type model makes the bad states *unconstructable*, with the diagnostic as evidence.

## 🤖 AI Engineering Exercise

Ask an AI to "define types for an order." **Verify** with the compiler whether its model permits illegal states (it often produces weak models — `status: string`, everything optional). **Log** how you tightened it to make illegal states unrepresentable, and the error the tighter model produces on bad input.

## 📝 Assignment

Deliver the Forge domain model and retyped functions, with: a before/after of one weak vs strong type, the compiler errors that bad inputs now produce, and a short note on one illegal state you made unrepresentable and why it mattered.

## 🚀 Stretch Goal

Introduce a branded/opaque type for an identifier (e.g. `type CustomerId = string & { readonly brand: unique symbol }`) so a raw string can't be passed where a `CustomerId` is required. Explain what bug class this prevents.

## ✅ Definition of Done

- [ ] Domain shapes modeled with `interface`/`type`, chosen deliberately
- [ ] Literal unions, `readonly`, and optionality used with intent
- [ ] At least one illegal state made unrepresentable
- [ ] Functions typed against the domain; misuse is a compile error
- [ ] `tsc --noEmit` passes for valid usage and fails for invalid usage

## 🪞 Reflection

Where had "the shape lives in my head" caused drift in code you've written? What does "make illegal states unrepresentable" change about how you'll design data?
