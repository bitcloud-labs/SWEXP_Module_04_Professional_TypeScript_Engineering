# TypeScript Setup Guide

## Install
```bash
npm i -g typescript      # global tsc
# or, per-project (preferred for teams):
npm i -D typescript
npx tsc --version
```

## Type-check vs emit vs run
```bash
tsc --noEmit             # type-check only; report errors, write nothing  ← your default
tsc                      # type-check AND emit .js (types erased)
node dist/app.js         # run the emitted JavaScript
tsc --noEmit --watch     # re-check on every save
```
The compiler is a separate step from running. `tsc --noEmit` answers "would this type-check?" — exit code 0 = clean, 2 = errors.

## Minimal project
```
project/
├── tsconfig.json
└── src/
    └── app.ts
```
```jsonc
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
Run `tsc --noEmit` from the project root (it finds `tsconfig.json`), or point at one: `tsc --noEmit -p tsconfig.strict.json`.

## Editor
Use an editor with the TypeScript language service so you see errors *as you type* — the tightest possible feedback loop. The editor and `tsc` use the same engine, so what the editor flags is what CI will flag.

## A CI gate (recommended)
```jsonc
// package.json
{ "scripts": { "typecheck": "tsc --noEmit" } }
```
Run `npm run typecheck` in CI and (via a hook) before commits, so a failing type-check can't merge. This is how the compiler standard becomes enforced rather than optional.

## Gotchas
- `tsc file.ts` ignores your `tsconfig.json` — prefer `tsc -p tsconfig.json` or run with no file argument from the project root.
- Types are erased at compile time — no runtime cost and no runtime type info (you need real checks/guards for that).
- `skipLibCheck` speeds up checking by trusting `.d.ts` files; fine for app code.
