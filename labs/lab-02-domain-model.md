# Lab 02 — Model the Business Domain

**Lesson:** 02 · **Goal:** model the Forge domain so illegal states are unrepresentable, and prove bad data won't compile.

## Goal
Replace loose untyped objects with an explicit domain model (interfaces, literal unions, `readonly`, a strong `Order`), and demonstrate that previously-silent misuse now fails to compile.

## Setup
```bash
mkdir -p /tmp/swexp-l02 && cd /tmp/swexp-l02
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noEmit": true, "skipLibCheck": true }, "include": ["*.ts"] }
JSON
cat > domain.ts <<'TS'
// TODO: model the Forge domain here.
// Requirements:
//   - Customer: readonly id (string), name, email, optional vip flag
//   - Money: amount (number) + currency restricted to 'USD' | 'EUR' | 'GBP'
//   - OrderStatus: a literal union of draft | placed | paid | shipped | cancelled
//   - Order: make illegal states UNREPRESENTABLE — a paid/shipped order MUST have a
//     paidAt: Date; a draft/placed order must NOT. (Hint: a union of two shapes.)

export type Currency = 'USD' | 'EUR' | 'GBP';
export interface Money { /* amount, currency */ }
export interface Customer { /* readonly id, name, email, vip? */ }
export type OrderStatus = string; // TODO: make this a literal union
export type Order = unknown;      // TODO: strong union; illegal states impossible
TS

cat > usage.ts <<'TS'
import type { Order, Customer, Money } from './domain.js';

// These should COMPILE once your model is correct:
const c: Customer = { id: 'c1', name: 'Ada', email: 'a@x.io' };
const draft: Order = { status: 'placed', total: { amount: 100, currency: 'USD' } };
const paid: Order  = { status: 'paid', total: { amount: 100, currency: 'USD' }, paidAt: new Date() };

// These should FAIL to compile once your model is correct (uncomment to verify, then re-comment):
// const typo: Order = { status: 'payed', total: { amount: 1, currency: 'USD' } };          // bad status
// const illegal: Order = { status: 'shipped', total: { amount: 1, currency: 'USD' } };     // shipped w/o paidAt
// const badMoney: Money = { amount: 1, currency: 'JPY' };                                  // currency not allowed
// const mutateId = () => { c.id = 'c2'; };                                                  // readonly id

console.log(c, draft, paid);
TS
echo "Edit domain.ts, then: tsc --noEmit"
```

## Tasks
1. **Model the domain** in `domain.ts` per the requirements. Use `readonly`, optional `?`, a literal `Currency` union, an `OrderStatus` literal union, and a **strong `Order`** that is a union of `{ status: 'draft'|'placed'; total: Money }` and `{ status: 'paid'|'shipped'|'cancelled'; total: Money; paidAt: Date }` (decide where `cancelled` belongs and justify it).
2. **Verify the legal values compile:** `tsc --noEmit` passes with the three legal consts.
3. **Verify illegal states don't:** uncomment each "should FAIL" line one at a time, run `tsc --noEmit`, and record the diagnostic — the status typo, the shipped-without-`paidAt`, the bad currency, and the `readonly` id mutation. Re-comment after recording.
4. **Make illegal states unrepresentable** is the bar: bad data should be *unconstructable*, not merely discouraged.

## Deliverable
Your `domain.ts`; the passing check for legal values; the compiler errors for each illegal case (codes + messages); and a note on one illegal state you eliminated and why it mattered (plus where you put `cancelled`).

## Cleanup
```bash
rm -rf /tmp/swexp-l02
```

## Check
`../solutions/lab-02-solution.md`.
