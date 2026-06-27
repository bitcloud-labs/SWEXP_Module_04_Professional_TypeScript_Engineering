# Lab 00 — Toolchain Setup & Your First Caught Bug

**Lesson:** 00 · **Goal:** working `tsc`, a project with `tsconfig.json`, and a bug caught before the code runs.

## Goal
Verify the TypeScript toolchain, type-check a file, and watch the compiler catch an error that plain JS would have run.

## Setup
```bash
node --version
tsc --version    # if missing: npm i -g typescript   (or use npx tsc)
mkdir -p /tmp/swexp-l00 && cd /tmp/swexp-l00
cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["*.ts"]
}
JSON
cat > hello.ts <<'TS'
function greet(name: string): string {
  return `Hi, ${name.toUpperCase()}`;
}
console.log(greet('Forge'));   // fine
TS
echo "Type-check (should pass):"
tsc --noEmit
```

## Tasks
1. **Confirm a clean check.** `tsc --noEmit` exits 0 and prints nothing. That's a passing build.
2. **Break it on purpose.** Add this line to `hello.ts` and re-run `tsc --noEmit`:
   ```ts
   console.log(greet(42));   // number where a string is required
   ```
   Record the diagnostic — the error code (`TS2345`), the location, and the message.
3. **Prove the JS would have run it.** Note that without types, `greet(42)` would execute and call `.toUpperCase()` on a number → a runtime `TypeError`. The compiler caught it *before running*.
4. **Fix it** (pass a string) and confirm a clean check again.
5. **Type-check vs emit:** run `tsc` without `--noEmit` after setting `"noEmit": false` temporarily; observe a `hello.js` is produced. Then restore `noEmit`. Explain the difference in your notebook.

## Deliverable
`tsc --version`/`node --version`; the passing check; the `TS2345` diagnostic from the broken version; the clean check after the fix; and a 5–8 sentence "what TypeScript is and why it's a quality system" explainer.

## Cleanup
```bash
rm -rf /tmp/swexp-l00
```

## Check
`../solutions/lab-00-solution.md`.
