# SWEXP Module 04 — Professional TypeScript Engineering · Starter Workspace

This repo is your **work-along workspace** for Module 04. The lessons live in the LMS; here you do the
labs and the capstone: open an exercise, read its `README.md`, implement the `// TODO`s in its `src/`,
run the tests, and submit.

> **The tests are the spec.** Each exercise's `tests/` describes exactly what your code must do — make
> them pass without weakening the types (no `any`, no `as`, no `@ts-ignore`). No answer keys are shipped.

## Quick start

```bash
npm install            # one time (already done in your LMS code-server workspace)
npm test               # run every exercise's behaviour tests
npm run test:types     # add the type-level checks (expectTypeOf)
npm run check          # strict type-check — "the compiler is your first reviewer"
npm run grade          # your score + per-exercise breakdown (what CI reports)
```

Run a single exercise while you work on it:

```bash
npx vitest run labs/lab-04-unions-narrowing      # or any folder below
npx vitest watch labs/lab-04-unions-narrowing    # re-run on save
```

## Exercises

| Exercise | Folder | You implement |
| --- | --- | --- |
| Lab 00 — Setup | `labs/lab-00-setup` | first function; confirm the toolchain |
| Lab 01 — Static typing | `labs/lab-01-static-typing` | typed `lineTotal` / `orderTotal` |
| Lab 02 — Domain modelling | `labs/lab-02-domain-model` | `Order` union (illegal states unrepresentable) |
| Lab 03 — Generics & utility types | `labs/lab-03-generics-utility` | derive types from `Order`; one generic wrapper |
| Lab 04 — Unions & narrowing | `labs/lab-04-unions-narrowing` | `formatId` / `applyDiscount` / `previewNote` |
| Lab 05 — Guards & discriminated unions | `labs/lab-05-guards-discriminated` | exhaustive `handle`; `isOrder` guard |
| Lab 06 — Strict tsconfig | `labs/lab-06-tsconfig-strict` | fix 3 bugs strict mode catches |
| Capstone — Migration | `assignments/capstone` | integrate it all into one strict module |

Each folder is self-contained: a `README.md` (the brief), `src/` (starter code with `// TODO`s), and
`tests/` (the spec). Reference cheatsheets are in [`resources/`](resources/).

## How grading & submission work

- Every exercise contributes tests — behaviour (`*.test.ts`) and, for the modelling labs, type-level
  assertions (`*.test-d.ts`). `npm run grade` reports a per-exercise score plus a strict type-check gate.
- **Submit** by committing your changes and pushing (or opening a pull request). The **Autograde** GitHub
  Action runs the same grader, posts your score to the run summary, and comments it on any PR.
- You're done when the score is **100%** and the type-check is clean.

## The rules of this module

- Make illegal states **unrepresentable** — model so bad values can't be constructed.
- The compiler is your first reviewer — a claim that doesn't type-check isn't true.
- `any` is never the fix. Neither is `as` at a trust boundary — use a type guard.
