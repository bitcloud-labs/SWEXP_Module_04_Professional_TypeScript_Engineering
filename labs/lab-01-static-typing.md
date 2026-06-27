# Lab 01 — The Bug That JavaScript Couldn't Catch

**Lesson:** 01 · **Goal:** reproduce a silent JS bug, then add types and watch the compiler catch it before running.

## Goal
See the gap between *runs* and *correct*: untyped code that executes but misbehaves, versus typed code the compiler rejects.

## Setup
```bash
mkdir -p /tmp/swexp-l01 && cd /tmp/swexp-l01
cat > tsconfig.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noEmit": true, "skipLibCheck": true }, "include": ["*.ts"] }
JSON

# The buggy code as runnable JavaScript (no checking)
cat > checkout.mjs <<'JS'
// Computes an order total. "Works" in a quick test, breaks on real inputs.
function lineTotal(item) {
  return item.price * item.quantity;     // what if quantity is a string "2"? or missing?
}
function orderTotal(items, taxRate) {
  let sum = 0;
  for (const it of items) sum += lineTotal(it);
  return sum + sum * taxRate;            // what if taxRate is undefined?
}
// real-world-ish inputs from a form / API
const items = [{ price: 10, quantity: '2' }, { price: 5, qauntity: 3 }]; // string qty + typo'd key
console.log('total:', orderTotal(items));   // taxRate omitted
JS
echo "--- run the untyped version (observe the silent bug) ---"
node checkout.mjs

# The SAME logic as TypeScript to be typed
cat > checkout.ts <<'TS'
interface LineItem { price: number; quantity: number; }

function lineTotal(item: LineItem): number {
  return item.price * item.quantity;
}
function orderTotal(items: LineItem[], taxRate: number): number {
  let sum = 0;
  for (const it of items) sum += lineTotal(it);
  return sum + sum * taxRate;
}
// the same bad inputs — now type-checked. Annotating `items` makes the
// compiler check each object literal against LineItem directly.
const items: LineItem[] = [{ price: 10, quantity: '2' }, { price: 5, qauntity: 3 }];
console.log('total:', orderTotal(items));
TS
echo "--- type-check the TS version (expect errors that pinpoint the bugs) ---"
tsc --noEmit
```

## Tasks
1. **Reproduce the silent failure.** Run `node checkout.mjs`. Note the result: `quantity: '2'` makes `10 * '2'` → JS coerces oddly, the typo'd `qauntity` reads `undefined` → `5 * undefined` → `NaN`, and the missing `taxRate` → `NaN`. The program *ran* and produced garbage.
2. **Read the compiler's verdict.** `tsc --noEmit` on `checkout.ts` flags: the string `quantity`, the misspelled key, and the missing `taxRate` argument. Record each error code and location.
3. **Fix the types/inputs** so the data actually matches `LineItem` and `orderTotal` is called with a `taxRate`. Re-check until clean.
4. **Compare when the bug was caught:** runtime (JS) vs author-time (TS). Write it down.

## Deliverable
The runtime output of the untyped version, the `tsc` errors (codes + locations) for the typed version, the fix, the clean check, and a short "bug classes types eliminate" list.

## Cleanup
```bash
rm -rf /tmp/swexp-l01
```

## Check
`../solutions/lab-01-solution.md`.
