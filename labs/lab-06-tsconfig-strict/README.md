# Lab 06 — Configure the Engineering Standard (Loose vs Strict)

**Ticket:** CONFIG-4001 · **Goal:** prove a loose config lets real bugs through, then make the code pass under strict — properly, with no `any`.

This lab has its **own** `tsconfig.loose.json` and `tsconfig.strict.json` so you can feel the difference.

## What you do
[`src/app.ts`](src/app.ts) has three real bugs. First see the gap:

```bash
npx tsc --noEmit -p labs/lab-06-tsconfig-strict/tsconfig.loose.json   # passes (says nothing) — that's the problem
npx tsc --noEmit -p labs/lab-06-tsconfig-strict/tsconfig.strict.json  # catches all three
```

Now fix each at the cause — **no `any`, no `as`**:

1. `greet` — a typo'd property (`noImplicitAny` + the object type surface it). Fix the property name.
2. `firstAdminEmail` — `find` may return `undefined` (`strictNullChecks`). Return `admin?.email ?? null`.
3. `thirdName` — an out-of-range index is `undefined` (`noUncheckedIndexedAccess`). Guard it.

Verify:
```bash
npx tsc --noEmit -p labs/lab-06-tsconfig-strict/tsconfig.strict.json   # clean
npx vitest run labs/lab-06-tsconfig-strict                              # behaviour green
```

## Definition of done
- Strict check clean, tests pass.
- Note which flag caught which bug, and why "it compiles" now means something.

## Submit
Commit and push.
