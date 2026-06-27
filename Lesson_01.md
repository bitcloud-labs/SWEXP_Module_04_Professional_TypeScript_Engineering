# Lesson 01 — The Bug That JavaScript Couldn't Catch

> **Role:** TypeScript Engineer · **Competency:** Static Typing Fundamentals · **Track:** TS · **Est. time:** 3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      TS-1010
TITLE:       A production incident traced to a bug the JS engine never flagged
PRIORITY:    P1
TYPE:        Bug / Investigation
DESCRIPTION: A Forge checkout function silently produced "NaN" totals for some
             orders and crashed for others with "undefined is not a function".
             The code "worked" in testing and passed code review. Reproduce the
             bug, then add static types and prove the compiler catches it *before
             the code runs*. Establish the team's baseline type vocabulary.

ACCEPTANCE CRITERIA:
  - You can annotate variables, parameters, and return types
  - You understand inference and when to annotate vs let TS infer
  - You can read and resolve common compiler errors (TS2345, TS2339, TS18048)
  - The previously-silent bug is now a compile-time error
```

## 🏢 Business Context

The most dangerous bugs are the ones that don't announce themselves: a function called with the wrong argument, a misspelled property that reads `undefined`, a value that's sometimes missing. JavaScript runs all of these happily and fails later — often in production, with the worst possible timing. TypeScript turns these into compile-time errors that never ship.

## 🎯 Learning Objectives

- Annotate variables, parameters, and return types
- Use and trust **type inference**; know when an explicit annotation earns its place
- Read common compiler diagnostics and resolve them
- Recognize the bug classes static typing eliminates

## 📚 Technical Deep Dive

**The primitives and annotations.**

```ts
let name: string = 'Forge';
let count: number = 3;
let active: boolean = true;
let ids: number[] = [1, 2, 3];
let pair: [string, number] = ['qty', 5];   // tuple
```

**Inference — let the compiler do the work.** TypeScript infers types from initializers; annotating the obvious is noise:

```ts
let total = 0;            // inferred number — no annotation needed
const items = ['a', 'b']; // inferred string[]
```

Annotate where inference can't help or where the contract matters: **function parameters** (no initializer to infer from) and often **return types** (to pin the contract and catch mistakes inside the function):

```ts
function lineTotal(price: number, qty: number): number {
  return price * qty;
}
```

**The bug classes TS catches:**

| Bug | JavaScript | TypeScript |
|-----|-----------|------------|
| wrong argument type | runs, may produce `NaN` | `TS2345` at the call site |
| misspelled/missing property | reads `undefined` | `TS2339` "Property does not exist" |
| using a possibly-`undefined` value | crashes at runtime | `TS18048` "possibly undefined" |
| calling a non-function | `TypeError` at runtime | flagged at compile time |

**`any` vs `unknown`.** `any` disables checking for that value — a hole in the type system; avoid it. `unknown` is the safe top type: you can hold anything in it, but you must *narrow* it (Lesson 4) before use. Prefer `unknown` when a type is genuinely not known yet.

**Special types:** `void` (returns nothing), `never` (never returns / impossible — used for exhaustiveness in Lesson 5), `null` and `undefined` (their own types; how strictly they're treated depends on `strictNullChecks`, Lesson 6).

### Common gotchas
- Over-annotating what TS already infers (clutter); under-annotating function parameters (they default to `any` under loose config).
- Reaching for `any` to "make the error go away" — it hides the bug, doesn't fix it.
- Assuming the emitted JS behaves differently because of types — types are erased; they change *what compiles*, not *what runs*.

## 🧪 Hands-on Labs

Work through **`labs/lab-01-static-typing.md`**. You'll get the buggy checkout function as untyped JS-style code that "runs," reproduce the silent `NaN`/crash, then add annotations and watch `tsc` flag the exact bug at the call site — before any execution.

## 🔍 Engineering Investigation

Run the untyped version and observe the silent failure. Then add types and run `tsc --noEmit`. Record each compiler error: its code, location, and what real bug it corresponds to. The compiler output *is* your evidence — note how it points to the call site, not just the symptom.

## 🤖 AI Engineering Exercise

Paste the buggy function to an AI and ask "is there a bug?" Then add types and let the compiler answer the same question. **Verify** which found the real issue and where; AIs sometimes miss the exact bug or invent a different one. **Log** the compiler's diagnostic versus the AI's guess — the compiler is the arbiter.

## 📝 Assignment

Submit: the reproduced runtime failure (output), the typed version with annotations, the `tsc` errors it produced before fixing, the fix, and a clean type-check after. Add a short list of "bug classes types eliminate" in your own words.

## 🚀 Stretch Goal

Replace one `any` (or implicit any) with `unknown` and show the compiler now *forces* you to narrow before use. Explain why `unknown` is safe where `any` is dangerous.

## ✅ Definition of Done

- [ ] Variables, parameters, and return types annotated appropriately
- [ ] Inference used where it suffices; annotations where they earn their place
- [ ] Compiler errors read and resolved (with codes noted)
- [ ] The previously-silent bug is now a compile-time error, then fixed
- [ ] `tsc --noEmit` passes clean

## 🪞 Reflection

Which bug class surprised you as something types could catch? How does "the compiler is the first reviewer" change what you'd rely on tests for versus types?
