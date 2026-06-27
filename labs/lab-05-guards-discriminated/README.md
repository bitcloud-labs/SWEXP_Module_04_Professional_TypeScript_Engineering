# Lab 05 — Safely Interpret API Responses

**Ticket:** GUARD-3010 · **Goal:** replace `json as Order` (a lie the compiler believes) with a discriminated union, exhaustive handling, and a boundary **type guard**.

## What you do
In [`src/api.ts`](src/api.ts):

1. `handle(res)` — switch on the discriminated `ApiResponse.status`; return the order on success, `null` on
   error. Add an exhaustiveness check in the default: `const _exhaustive: never = res; return _exhaustive;`.
2. `isOrder(v)` — a type guard (`v is Order`) that proves an `unknown` value really is an `Order`: object &
   non-null, string `id`, a valid `status`, number `total`.

Run:
```bash
npx vitest run labs/lab-05-guards-discriminated
```

## Why it matters
`parseSafe` uses your guard at the boundary, so a bad payload returns `null` instead of a bogus "Order" that
crashes later. `as` would have hidden the problem. No `any`, no `as`.

## Submit
Commit and push.
