# Capstone — FORGE-9200: Migrate a Forge Module to Strict TypeScript

**Epic:** FORGE-9200 · **Role:** TypeScript Engineer (migration lead)

This is the integrated exercise: no new concepts, but you assemble the whole module — domain modelling,
utility-type derivation, typed logic, union narrowing, and a boundary guard — into one strict, type-safe
file. The full migration **report + engineering notebook** are submitted via the LMS using
[`../capstone-submission-template.md`](../capstone-submission-template.md); the code below is the part the
autograder scores.

## What you do
Implement every `// TODO` in [`src/forge.ts`](src/forge.ts):

| Concern | What to do | From |
| --- | --- | --- |
| Domain | exact `OrderStatus` union; flat `Order` interface | lab-02 |
| Utility types | derive `NewOrder = Omit<Order, 'id'>` | lab-03 |
| Logic | `subtotal(order)` over typed line items | lab-01 |
| Uncertainty | `applyDiscount` over a discount union | lab-04 |
| Boundary | `isIncomingOrder` guard + `parseOrder` | lab-05 |

Run:
```bash
npx vitest run assignments/capstone     # behaviour
npm run test:types                       # type-level derivations
npm run check                            # strict, clean
```

## Definition of done
- All capstone tests pass and the project type-checks clean — **zero** `any` / `as` / `@ts-ignore`.
- Your LMS migration report documents at least one previously-silent runtime bug now caught at compile time.

## The golden rule
A claim that doesn't type-check isn't true — and `any` is never the fix.
