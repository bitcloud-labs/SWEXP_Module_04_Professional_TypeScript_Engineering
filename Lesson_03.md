# Lesson 03 — Eliminate Duplicate Types

> **Role:** TypeScript Engineer · **Competency:** Generics & Utility Types · **Track:** GEN · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      GEN-2010
TITLE:       The same shape is redeclared a dozen ways and they drift apart
PRIORITY:    P2
TYPE:        Refactor
DESCRIPTION: Forge has CreateOrderInput, UpdateOrderInput, OrderResponse,
             OrderListItem... each a hand-copied near-duplicate of Order that
             drifts when Order changes. There's also a generic "API result"
             pattern copy-pasted per resource. Eliminate the duplication with
             generics and utility types so one source of truth derives the rest.

ACCEPTANCE CRITERIA:
  - You can write and use generic types and functions with constraints
  - You can apply built-in utility types (Partial, Required, Pick, Omit, Readonly, Record, ReturnType)
  - You can derive related types from one canonical type instead of copying
  - Changing the canonical type propagates to all derived types
```

## 🏢 Business Context

Copy-pasted types are a maintenance trap: add a field to `Order` and you must remember to update `CreateOrderInput`, `OrderResponse`, and five others — miss one and you ship an inconsistency. Deriving types from a single source of truth means one change propagates everywhere, automatically and provably. Generics turn repeated patterns into one reusable, type-safe definition.

## 🎯 Learning Objectives

- Write generic types and functions, with `extends` constraints
- Apply the core utility types and know what each produces
- Derive related types from a canonical type rather than duplicating
- Recognize when generics improve safety versus when they over-engineer

## 📚 Technical Deep Dive

**Generics — parameterize over types.** A generic is a type with a "hole" filled in at use:

```ts
function first<T>(items: T[]): T | undefined { return items[0]; }
const n = first([1, 2, 3]);     // T = number → number | undefined
const s = first(['a', 'b']);    // T = string → string | undefined
```

**Constraints** restrict what `T` can be so you can use its members safely:

```ts
function byId<T extends { id: string }>(items: T[], id: string): T | undefined {
  return items.find(item => item.id === id);   // safe: T is guaranteed to have id
}
```

**A generic API envelope** replaces one-off copies per resource:

```ts
interface ApiResult<T> { data: T; fetchedAt: Date }
type OrderResult = ApiResult<Order>;
type CustomerResult = ApiResult<Customer>;
```

**Built-in utility types** derive new types from existing ones — your duplication killers:

| Utility | Produces |
|---------|----------|
| `Partial<T>` | all properties optional (great for update inputs) |
| `Required<T>` | all properties required |
| `Readonly<T>` | all properties `readonly` |
| `Pick<T, K>` | only the keys `K` |
| `Omit<T, K>` | everything except keys `K` |
| `Record<K, V>` | an object type with keys `K` and values `V` |
| `ReturnType<F>` | the return type of a function type |

```ts
type Order = { id: string; status: OrderStatus; total: Money; paidAt?: Date };

type CreateOrderInput = Omit<Order, 'id'>;          // server assigns id
type UpdateOrderInput = Partial<Omit<Order, 'id'>>;  // any subset, never id
type OrderSummary     = Pick<Order, 'id' | 'status'>;
type OrdersById       = Record<string, Order>;
```

Now add a field to `Order` and **all** of these update automatically. That propagation is the whole point.

**Don't over-engineer.** Generics earn their place when a pattern genuinely repeats over varying types. A generic with one call site, or three nested type parameters no one can read, is a cost, not a benefit. Reach for the simplest type that removes the duplication.

### Common gotchas
- A generic without a constraint when you need to access members (`T` has no known properties).
- Reaching for a hand-written duplicate where `Pick`/`Omit`/`Partial` would derive it.
- Over-generic, unreadable types — clever beats clear is a bug.

## 🧪 Hands-on Labs

Work through **`labs/lab-03-generics-utility.md`**. You'll get a file full of hand-copied near-duplicate types and a repeated API-wrapper pattern. You'll collapse them to one canonical `Order` plus derived utility types and one generic `ApiResult<T>`, then prove that adding a field to `Order` propagates everywhere (and that an inconsistent hand-copy would have been caught).

## 🔍 Engineering Investigation

Count the duplicate type declarations before refactoring. After deriving them, add a new field to the canonical `Order` and run `tsc` — observe every consumer that now must account for it (or that updates for free). Record how many places a manual edit would have required versus the one edit deriving achieved.

## 🤖 AI Engineering Exercise

Ask an AI to "reduce duplication in these types." **Verify** that its suggestion actually derives from a single source (vs producing yet another near-duplicate) and still compiles against real usage. **Log** which utility types it used correctly and any case where the compiler rejected its refactor.

## 📝 Assignment

Submit the de-duplicated types: the canonical type, the derived utility/generic types replacing the copies, the `tsc`-verified propagation when you add a field, and a short note on one place you chose *not* to use a generic and why.

## 🚀 Stretch Goal

Write a small generic mapped type of your own (e.g. `type Nullable<T> = { [K in keyof T]: T[K] | null }`) and use it. Explain how mapped types power the built-in utilities.

## ✅ Definition of Done

- [ ] Generic types/functions written with appropriate constraints
- [ ] Utility types applied correctly to derive related types
- [ ] Duplicated types replaced by derivations from one source of truth
- [ ] Propagation on change demonstrated via `tsc`
- [ ] No over-engineered/unreadable generics; `tsc --noEmit` clean

## 🪞 Reflection

Where had copy-pasted types drifted in code you've seen? Which utility type will you reach for most, and where would a generic be over-engineering?
