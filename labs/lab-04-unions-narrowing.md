# Lab 04 — Model Uncertain Business Data

**Lesson:** 04 · **Goal:** model uncertainty with union types and handle every case by narrowing; the compiler enforces completeness.

## Goal
Replace loose/`any` fields with precise unions, and add narrowing so the compiler refuses code that uses a value without proving which variant it holds.

## Setup
```bash
mkdir -p /tmp/swexp-l04 && cd /tmp/swexp-l04
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noEmit": true, "skipLibCheck": true }, "include": ["*.ts"] }
JSON
cat > uncertain.ts <<'TS'
// Forge data is uncertain. Model it precisely, then narrow before use.

// An id arrives as a string from one system, a number from another.
export type Id = string | number;

// A discount is EITHER a percentage OR a flat money amount.
export type Discount =
  | { kind: 'percent'; value: number }
  | { kind: 'flat'; amount: number };

// A note may be absent.
export type Note = string | null;

// TODO: implement these so they compile under strict mode by NARROWING.

export function formatId(id: Id): string {
  // must work for both string and number — narrow with typeof
  return id.toUpperCase();   // BUG: numbers have no toUpperCase → fix by narrowing
}

export function applyDiscount(price: number, d: Discount): number {
  // narrow on d.kind; percent reduces by value%, flat subtracts amount (floor at 0)
  return price - d.amount;   // BUG: 'amount' doesn't exist on the percent variant
}

export function previewNote(note: Note): string {
  // return the trimmed note, or 'No note' when null
  return note.trim();        // BUG: note may be null
}
TS
echo "Edit uncertain.ts, then: tsc --noEmit"
```

## Tasks
1. **Observe the errors.** `tsc --noEmit` flags each buggy line: `toUpperCase` on `string | number`, `.amount` on the percent variant, `.trim()` on a possibly-`null` value. Record the codes (`TS2339`, `TS18047`/`TS2531`).
2. **Narrow `formatId`** with `typeof id === 'string'` → branch returns `id.toUpperCase()`, else `id.toFixed(0)` (or `String(id)`).
3. **Narrow `applyDiscount`** on `d.kind` (`'percent'` → `price * (1 - d.value/100)`; `'flat'` → `Math.max(0, price - d.amount)`).
4. **Handle `previewNote`** with a null check (`note != null ? note.trim() : 'No note'`, or `note?.trim() ?? 'No note'`).
5. **Prove the compiler enforces narrowing:** in `formatId`, remove the `typeof` guard and use `id.toUpperCase()` directly (or drop the null check in `previewNote`). Record the error (`TS2339` / `TS18047`) — the compiler won't let you use a member you haven't proven the value has. (Full *exhaustiveness* enforcement comes in Lesson 5 with `never`.)
6. **`||` vs `??`:** show with an example (e.g. a `0` percent discount) why `??` differs from `||`.

## Deliverable
The narrowed implementations; the before errors and the clean check after; the error produced when a branch is removed; and your `||`-vs-`??` example.

## Cleanup
```bash
rm -rf /tmp/swexp-l04
```

## Check
`../solutions/lab-04-solution.md`.
