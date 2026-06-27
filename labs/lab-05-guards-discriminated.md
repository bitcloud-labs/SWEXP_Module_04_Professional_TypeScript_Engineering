# Lab 05 — Safely Interpret API Responses

**Lesson:** 05 · **Goal:** model responses as a discriminated union, handle them exhaustively (`never`), and validate `unknown` JSON with a type guard instead of `as`.

## Goal
Replace `await res.json() as Order` (a lie the compiler believes) with a discriminated union + exhaustive handling + a boundary type guard that proves untrusted data before use.

## Setup
```bash
mkdir -p /tmp/swexp-l05 && cd /tmp/swexp-l05
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noEmit": true, "skipLibCheck": true }, "include": ["*.ts"] }
JSON
cat > api.ts <<'TS'
export interface Order { id: string; status: 'placed' | 'paid' | 'shipped'; total: number; }

// The UNSAFE legacy pattern: assert a type the compiler can't verify.
export function parseUnsafe(json: unknown): Order {
  return json as Order;   // BUG: a lie — error payloads & changed shapes sail through
}

// TODO 1: model the API response as a DISCRIMINATED UNION on a literal `status` tag:
//   success -> { status: 'success'; data: Order }
//   error   -> { status: 'error'; code: number; message: string }
export type ApiResponse =
  | { status: 'success'; data: Order }
  | { status: 'error'; code: number; message: string };

// TODO 2: handle it EXHAUSTIVELY; add a `never` check so a future variant won't slip through.
export function handle(res: ApiResponse): Order | null {
  switch (res.status) {
    case 'success': return res.data;
    case 'error':   console.error(res.code, res.message); return null;
    // add a default with a `never` exhaustiveness check
  }
}

// TODO 3: write a TYPE GUARD that validates unknown JSON is really an Order.
export function isOrder(v: unknown): v is Order {
  // check object, non-null, has string id, has a valid status, has number total
  return false; // TODO
}

// Use the guard at the boundary instead of `as`:
export function parseSafe(json: unknown): Order | null {
  return isOrder(json) ? json : null;
}
TS
echo "Edit api.ts, then: tsc --noEmit. Also test parseSafe on a bad payload."
```

## Tasks
1. **Exhaustive handler.** Complete `handle` with a `default` that does `const _exhaustive: never = res; return _exhaustive;`. Then add a third variant to `ApiResponse` (e.g. `{ status: 'pending' }`) and watch the `never` line error — that's the compiler telling you a case is unhandled. Record it, then handle or revert.
2. **Type guard.** Implement `isOrder` to actually check the shape: `typeof v === 'object' && v !== null && 'id' in v && typeof (v as Record<string, unknown>).id === 'string' && 'status' in v && 'total' in v && typeof (v as any).total === 'number'`. The `v is Order` predicate makes it narrow.
3. **Prove `as` is unsafe.** Feed an error-shaped payload to `parseUnsafe` (cast and access `.total`) and to `parseSafe`; show `parseSafe` returns `null` (no crash) while the `as` path would hand back a bogus "Order."
4. **Remove `as` at the boundary.** Confirm `parseSafe` type-checks and that accessing fields on its result requires the `!== null` check first.

## Deliverable
The discriminated union; the exhaustive `handle` with the `never` check; the `never` error you saw when adding an unhandled variant; the working `isOrder` guard; evidence `parseSafe` rejects a bad payload where `as` would not; and a note on why `as` is dangerous at boundaries.

## Cleanup
```bash
rm -rf /tmp/swexp-l05
```

## Check
`../solutions/lab-05-solution.md`.
