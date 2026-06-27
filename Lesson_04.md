# Lesson 04 — Model Uncertain Business Data

> **Role:** TypeScript Engineer · **Competency:** Union Types & Narrowing · **Track:** UNION · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      UNION-3001
TITLE:       Fields that are "sometimes there" cause undefined-access crashes
PRIORITY:    P1
TYPE:        Bug / Design
DESCRIPTION: Forge data is full of uncertainty: a discount that's a percentage
             OR a flat amount, a field that may be null, an id that's a number
             from one system and a string from another. Today these are typed
             loosely (or `any`) and crash at runtime. Model the uncertainty
             precisely with union types and handle every case by narrowing.

ACCEPTANCE CRITERIA:
  - You can model "one of several shapes/values" with union types
  - You can narrow unions with typeof, truthiness, equality, and `in`
  - You handle `null`/`undefined` explicitly (no unchecked access)
  - The compiler forces every variant to be handled before use
```

## 🏢 Business Context

Real business data is uncertain: optional fields, values that take more than one form, results that might be missing. JavaScript "handles" this by crashing when an assumption is wrong. Union types let you state the uncertainty *precisely* — "this is a string **or** a number **or** null" — and TypeScript then **forces** you to handle each possibility before you use the value. The uncertainty becomes explicit and safe instead of implicit and dangerous.

## 🎯 Learning Objectives

- Model alternatives with **union types** (`A | B`)
- **Narrow** unions using `typeof`, truthiness, equality, and the `in` operator
- Handle `null`/`undefined` explicitly with narrowing and `?.` / `??`
- Use control-flow analysis: the compiler tracks the narrowed type per branch

## 📚 Technical Deep Dive

**Union types** say "one of these":

```ts
type Id = string | number;
type Discount = { kind: 'percent'; value: number } | { kind: 'flat'; amount: Money };
let note: string | null = null;
```

You can only use members **common to all members** of a union until you narrow. `id.toUpperCase()` is an error on `string | number` (numbers have no `toUpperCase`) — you must narrow first.

**Narrowing** = convincing the compiler which member you have in a given branch. The checker performs **control-flow analysis** and changes the type inside each branch:

```ts
function format(id: string | number): string {
  if (typeof id === 'string') return id.toUpperCase();  // here id: string
  return id.toFixed(0);                                  // here id: number
}
```

Narrowing tools:

| Technique | Narrows by | Example |
|-----------|-----------|---------|
| `typeof` | primitive type | `typeof x === 'string'` |
| truthiness | removes falsy/null/undefined | `if (user) { ... }` |
| equality | specific value | `if (status === 'paid')` |
| `in` | property presence | `if ('amount' in discount)` |
| `Array.isArray` | arrays | `if (Array.isArray(x))` |

**`null` and `undefined`.** Under `strictNullChecks` (Lesson 6), these are *not* assignable to other types — you must handle them. Tools:

```ts
const city = user.address?.city ?? 'Unknown';  // optional chaining + nullish default
if (note != null) note.trim();                  // narrowed to string inside
```

**Exhaustiveness preview.** For a union you intend to handle fully, a `switch` plus a `never` check makes "you forgot a case" a compile error — covered in depth in Lesson 5.

### Common gotchas
- Trying to use a member that doesn't exist on all union members before narrowing (`TS2339`).
- Using `||` for defaults where `??` is meant (`0 || 5 === 5`, but `0 ?? 5 === 0`).
- "Narrowing" with a check the compiler can't follow (e.g. a boolean stored in a variable) — keep the check inline so control-flow analysis can track it.

## 🧪 Hands-on Labs

Work through **`labs/lab-04-unions-narrowing.md`**. You'll get loosely-typed Forge data (a `string | number` id, a `Discount` that's percent-or-flat, a nullable note) and functions that crash on the wrong assumption. You'll model the unions precisely and add narrowing so the compiler verifies every variant is handled — and rejects code that uses a value without narrowing.

## 🔍 Engineering Investigation

Before fixing, run a case that hits the unhandled variant and observe the runtime crash. After modeling the union, remove one narrowing branch and record the compiler error that results. The evidence: the compiler refuses to let you use a union member you haven't proven you have.

## 🤖 AI Engineering Exercise

Ask an AI to "handle this value that's sometimes a string and sometimes a number." **Verify** with the compiler that its code narrows correctly and handles `null`/`undefined` — AIs often assume one form and ignore the other. **Log** the diagnostic when a branch is missing and how narrowing satisfied the checker.

## 📝 Assignment

Submit: the union models, the narrowing logic for each, the runtime crash you reproduced before fixing, the compiler error when a branch is omitted, and a short note distinguishing `||` from `??` with an example from the lab.

## 🚀 Stretch Goal

Add a user-defined type guard function (`function isFlat(d: Discount): d is FlatDiscount`) and use it to narrow. (You'll go deeper on guards and `is` predicates in Lesson 5 — here, just see one in action.)

## ✅ Definition of Done

- [ ] Uncertainty modeled with precise union types
- [ ] Unions narrowed with `typeof`/truthiness/equality/`in` as appropriate
- [ ] `null`/`undefined` handled explicitly (no unchecked access)
- [ ] Omitting a branch produces a compile error; valid code type-checks clean

## 🪞 Reflection

Where had you been assuming a value's single form and getting burned at runtime? How does "state the uncertainty in the type" change the way you'll model data?
