# Lab 04 — Model Uncertain Business Data

**Ticket:** UNION-3001 · **Goal:** model uncertainty with unions and handle every case by **narrowing**.

## What you do
In [`src/uncertain.ts`](src/uncertain.ts), implement three functions by narrowing — no `any`, no `as`:

- `formatId(id)` — `id` is `string | number`; uppercase strings, render numbers as digits (`typeof` narrowing).
- `applyDiscount(price, d)` — `d` is a discriminated union; `percent` reduces by `value%`, `flat` subtracts
  `amount` (never below 0). Narrow on `d.kind`.
- `previewNote(note)` — `note` is `string | null`; return the trimmed text, or `'No note'` when null.

Run:
```bash
npx vitest run labs/lab-04-unions-narrowing
```

## Definition of done
- All tests pass; `npm run check` clean.
- Note one example of why `??` differs from `||` (hint: a `0` value).

## Submit
Commit and push.
