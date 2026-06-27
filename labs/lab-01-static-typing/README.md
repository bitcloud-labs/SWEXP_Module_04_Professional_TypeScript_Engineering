# Lab 01 — The Bug That JavaScript Couldn't Catch

**Ticket:** TS-1010 · **Goal:** see the gap between *runs* and *correct* — typed code the compiler can vouch for.

## Background
In untyped JS, `lineTotal({ price: 10, quantity: '2' })` runs and returns garbage; a typo'd key reads
`undefined`; a missing `taxRate` yields `NaN`. The program *ran* and produced wrong numbers. With types,
those become author-time errors.

## What you do
Implement the two functions in [`src/checkout.ts`](src/checkout.ts) against their `LineItem` types:

- `lineTotal(item)` → `price * quantity`
- `orderTotal(items, taxRate)` → sum of line totals, plus tax (`sum * taxRate`)

Run:
```bash
npx vitest run labs/lab-01-static-typing
npm run check    # the types now reject bad inputs (string quantity, missing taxRate) at author-time
```

## Definition of done
- Tests pass.
- Write a one-line "bug classes types eliminate" note (coercion, typos, missing args).

## Submit
Commit and push. The autograder scores it automatically.
