# tsconfig & Strict Mode Reference

`tsconfig.json` is the engineering standard for a TypeScript project — it defines what the compiler will and won't catch. Strict mode is what makes TypeScript actually safe; without it you have "JavaScript with hints."

## A sane baseline
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "skipLibCheck": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

## What `strict: true` turns on
| Flag | Catches |
|------|---------|
| `noImplicitAny` | parameters/vars that silently became `any` |
| `strictNullChecks` | using a value that might be `null`/`undefined` |
| `strictFunctionTypes` | unsafe function-parameter variance |
| `strictBindCallApply` | wrong args to `bind`/`call`/`apply` |
| `strictPropertyInitialization` | class fields never initialized |
| `noImplicitThis` | `this` of implicit `any` |
| `useUnknownInCatchVariables` | `catch (e)` typed `unknown`, not `any` |

## High-value flags beyond strict
- `noUncheckedIndexedAccess` — `arr[i]` is `T | undefined`, forcing you to handle the out-of-range case (kills a huge class of "undefined is not a function").
- `exactOptionalPropertyTypes` — distinguishes "absent" from "present and `undefined`".
- `noImplicitOverride` — `override` must be explicit.

## Migration dial
You don't have to flip everything at once. Useful intermediate flags while migrating: `allowJs`, `checkJs`, and per-file `// @ts-check`. But the destination is `strict: true` — that's the engineering standard, not an optional extra.

## Running the compiler
```bash
tsc --noEmit                 # type-check the whole project per tsconfig
tsc --noEmit -p tsconfig.strict.json
```
Exit `0` = clean; non-zero = the compiler (your first reviewer) found something. Note `tsc file.ts` ignores `tsconfig.json`; use `-p` or run with no file argument.

## The standard
The same code under loose vs strict is a different language: loose lets implicit `any`, possibly-undefined access, and uninitialized fields through; strict makes each a compile error. **`any` is never the fix** — it's the thing strict mode exists to surface.
