# Compiler Error Reference

The compiler is your first reviewer; its error codes are precise. Here are the ones you'll meet most in this module — what they mean and how to fix them *properly* (never with `any`).

| Code | Meaning | Proper fix |
|------|---------|-----------|
| `TS2322` | Type X is not assignable to type Y | the value doesn't fit the declared type — fix the value or the model (often a literal-union mismatch, e.g. a typo'd status) |
| `TS2345` | Argument of type X not assignable to parameter Y | you passed the wrong type to a function — convert/correct the argument |
| `TS2554` | Expected N arguments, but got M | wrong arity — supply the missing argument |
| `TS2561` | Object literal may only specify known properties (did you mean…) | a misspelled property key — fix the key (the compiler often suggests it) |
| `TS2741` | Property X is missing in type Y but required | a construction site omitted a required field — add it (surfaces when a derived/core type gains a field) |
| `TS2531` / `TS18047` | Object is possibly 'null' | narrow with `?.`, `??`, or a null check before use |
| `TS18048` | X is possibly 'undefined' | from optional access or `noUncheckedIndexedAccess` — guard the undefined case |
| `TS7006` | Parameter implicitly has an 'any' type | annotate the parameter (only surfaces under strict/`noImplicitAny`) |
| `TS2339` | Property X does not exist on type Y | you're on a union member that lacks it — narrow first; or the property name is wrong |
| `TS2540` | Cannot assign to X because it is read-only | the field is `readonly` — that's the invariant; don't mutate it |

## How to read an error
1. Read the **code and the types** named — they tell you what was expected vs what you gave.
2. Locate the **claim** that failed: an annotation, a construction site, an access on a union.
3. Fix the **cause**: correct the value, narrow the union, add the missing field, or fix the model.
4. Re-run `tsc --noEmit`; exit `0` means the reviewer is satisfied.

## The trap
`any`, `as`, and `// @ts-ignore` all make the error disappear without fixing the cause — they convert a compile-time catch back into a runtime bug. **`any` is never the fix.** If a type is hard to satisfy, the model usually needs to change.
