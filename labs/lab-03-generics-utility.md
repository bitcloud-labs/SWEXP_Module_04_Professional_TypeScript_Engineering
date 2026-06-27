# Lab 03 — Eliminate Duplicate Types

**Lesson:** 03 · **Goal:** collapse hand-copied near-duplicate types into one canonical type + derivations, and prove propagation.

## Goal
Replace duplicated types and a copy-pasted API-wrapper with generics and utility types so one source of truth derives the rest — and changing it propagates everywhere.

## Setup
```bash
mkdir -p /tmp/swexp-l03 && cd /tmp/swexp-l03
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noEmit": true, "skipLibCheck": true }, "include": ["*.ts"] }
JSON
cat > types.ts <<'TS'
// SMELL: the same Order shape is hand-copied into many near-duplicates that drift.
export interface Order { id: string; status: 'draft'|'placed'|'paid'; total: number; paidAt?: Date; }

// duplicates to ELIMINATE by deriving from Order:
export interface CreateOrderInput { status: 'draft'|'placed'|'paid'; total: number; paidAt?: Date; } // Order without id
export interface UpdateOrderInput { id?: string; status?: 'draft'|'placed'|'paid'; total?: number; paidAt?: Date; } // all optional, no id
export interface OrderSummary { id: string; status: 'draft'|'placed'|'paid'; }  // a couple of fields

// SMELL: a copy-pasted "result" wrapper per resource:
export interface OrderResult { data: Order; fetchedAt: Date; }
export interface CustomerResult { data: { id: string; name: string }; fetchedAt: Date; }
TS

cat > consumers.ts <<'TS'
import type { Order, CreateOrderInput, UpdateOrderInput, OrderSummary } from './types.js';
export function create(input: CreateOrderInput): Order { return { id: crypto.randomUUID(), ...input }; }
export function update(id: string, patch: UpdateOrderInput): void { /* ... */ }
export function summarize(o: Order): OrderSummary { return { id: o.id, status: o.status }; }
// a LITERAL construction site — watch what happens to this when Order gains a field:
export const seed: CreateOrderInput = { status: 'draft', total: 0 };
TS
echo "Edit types.ts to derive the duplicates, then: tsc --noEmit"
```

## Tasks
1. **Derive, don't copy.** Rewrite the duplicates in `types.ts` as derivations of the canonical `Order`:
   - `CreateOrderInput = Omit<Order, 'id'>`
   - `UpdateOrderInput = Partial<Omit<Order, 'id'>>`
   - `OrderSummary = Pick<Order, 'id' | 'status'>`
2. **Generalize the wrapper.** Replace `OrderResult`/`CustomerResult` with one generic: `interface ApiResult<T> { data: T; fetchedAt: Date }`, then `type OrderResult = ApiResult<Order>` etc.
3. **Verify it still compiles:** `tsc --noEmit` clean with `consumers.ts` unchanged.
4. **Prove propagation.** Add a new required field to `Order` (e.g. `currency: 'USD'|'EUR'`). Re-run `tsc --noEmit` and observe: the derived `CreateOrderInput` *automatically* gains the field, so the **literal** `seed` now errors (`TS2741`, missing `currency`) — while `create`, which builds via `...input` spread, keeps working untouched. That contrast is the lesson: derivation propagates the requirement, and the compiler points you at exactly the construction sites that must supply it. With the old hand-copies you'd have edited each duplicate by hand and risked missing one.
5. **Judgment:** note one place a generic would be over-engineering (don't add it).

## Deliverable
The de-duplicated `types.ts`; the clean check; the propagation evidence after adding a field (the `TS2741` on the literal `seed`, the fact that the spread-based `create` was unaffected, then a clean check); and your "where I chose not to genericize" note.

## Cleanup
```bash
rm -rf /tmp/swexp-l03
```

## Check
`../solutions/lab-03-solution.md`.
