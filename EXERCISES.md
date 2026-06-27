# Module 04 — Interactive Exercises

This repo is a **clone-and-run workspace**. The lessons (`Lesson_*.md`, `labs/`) explain the
concepts; the code below is where you *prove* you can apply them. You edit real TypeScript,
run the tests for instant red→green feedback, and an autograder scores every push.

> **The tests are the spec.** There are no answer keys in this repo. Each test in `tests/`
> describes exactly what your code must do — make them pass without weakening the types
> (no `any`, no `as`, no `@ts-ignore`).

## Quick start

```bash
npm install        # one time (or just open in Codespaces — it's preinstalled)
npm test           # run the behaviour tests (red until you implement)
npm run test:watch # re-run automatically as you edit
npm run check      # strict type-check — "the compiler is your first reviewer"
npm run grade      # your score + per-lesson breakdown (what CI reports)
```

## What to implement

Each file in `src/` maps to a lesson and its lab. Replace the `// TODO`s:

| File | Lesson | Lab | You implement |
| --- | --- | --- | --- |
| `src/lesson02_domain.ts` | 02 — Domain modelling | `labs/lab-02-domain-model.md` | `OrderStatus`, a union `Order` (illegal states unrepresentable), `placeOrder`, `markPaid`, `describeOrder` |
| `src/lesson03_types.ts` | 03 — Generics & utility types | `labs/lab-03-generics-utility.md` | Derive `CreateOrderInput` / `UpdateOrderInput` / `OrderSummary` from `Order`; one generic `ApiResult<T>` |
| `src/lesson04_uncertain.ts` | 04 — Unions & narrowing | `labs/lab-04-unions-narrowing.md` | `formatId`, `applyDiscount`, `previewNote` — by narrowing |
| `src/lesson05_api.ts` | 05 — Guards & discriminated unions | `labs/lab-05-guards-discriminated.md` | exhaustive `handle` (with a `never` check) and the `isOrder` type guard |

## How grading works

`npm run grade` runs two gates and prints a score:

1. **Tests** — behaviour (`tests/*.test.ts`) plus type-level assertions (`tests/*.test-d.ts`,
   checked with `expectTypeOf`). Modelling lessons (02, 03) are graded mostly at the *type* level;
   logic lessons (04, 05) at runtime.
2. **Strict type-check** — `tsc --noEmit` under a strict `tsconfig.json`. Must be clean.

You're done when the score is **100%** and the type-check is clean. On every push, the
**Autograde** GitHub Action runs the same grader, posts your score to the run summary, and
comments it on any pull request.

## The rules of this module

- Make illegal states **unrepresentable** — model so bad values can't be constructed.
- The compiler is your first reviewer — a claim that doesn't type-check isn't true.
- `any` is never the fix. Neither is `as` at a trust boundary — use a type guard.
