# Lesson 06 — Configure the Engineering Standard

> **Role:** TypeScript Engineer · **Competency:** tsconfig & Strict Mode · **Track:** CONFIG · **Est. time:** 3–4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      CONFIG-4001
TITLE:       Forge's tsconfig is loose, so "it compiles" proves almost nothing
PRIORITY:    P2
TYPE:        Configuration / Hardening
DESCRIPTION: Forge's TypeScript is configured loosely — implicit `any` allowed,
             null checks off — so code type-checks while still harboring exactly
             the bugs types are supposed to catch. Define the team's compiler
             standard: turn on strict mode, understand each flag, and drive the
             newly-surfaced errors to zero.

ACCEPTANCE CRITERIA:
  - You understand the key tsconfig compiler options and what each enforces
  - You can explain what `strict` turns on and why each flag matters
  - You can migrate loose code to strict and resolve the surfaced errors
  - "It compiles" under your config is a meaningful guarantee
```

## 🏢 Business Context

A compiler is only as strict as you configure it. A loose `tsconfig` lets implicit `any` and unchecked `null` through — so the codebase "passes" while still carrying the bugs TypeScript exists to prevent. The compiler config *is* the team's engineering standard, encoded and enforced on every build and PR. Setting it well is how "it compiles" becomes a guarantee instead of a shrug.

## 🎯 Learning Objectives

- Read and write `tsconfig.json`; understand the key compiler options
- Explain what `strict` enables and why each sub-flag matters
- Migrate loose code to strict mode and resolve the resulting errors
- Treat the compiler config as the team's enforced quality bar

## 📚 Technical Deep Dive

**`tsconfig.json` basics.**

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",          // JS version to emit
    "module": "ESNext",          // module system
    "strict": true,              // the big one — see below
    "noEmitOnError": true,       // don't emit JS if there are type errors
    "noUncheckedIndexedAccess": true,  // arr[i] is T | undefined (very valuable)
    "noImplicitOverride": true
  },
  "include": ["src"]
}
```

**`"strict": true` is an umbrella** that turns on a family of flags. The two that catch the most real bugs:

| Flag | Without it | With it |
|------|-----------|---------|
| `noImplicitAny` | untyped params silently become `any` (no checking) | every value must have a known type |
| `strictNullChecks` | `null`/`undefined` assignable everywhere → runtime crashes | `null`/`undefined` must be handled explicitly |
| `strictFunctionTypes` | unsafe function parameter variance | parameters checked contravariantly |
| `strictBindCallApply` | `bind`/`call`/`apply` unchecked | argument types checked |
| `strictPropertyInitialization` | class fields may be uninitialized | fields must be definitely assigned |
| `useUnknownInCatchVariables` | `catch (e)` is `any` | `e` is `unknown` (must narrow) |
| `alwaysStrict` | — | emits `"use strict"` |

**`strictNullChecks` is the highest-value flag.** It converts the entire "billion-dollar mistake" (unchecked null) into compile errors. With it on, `user.address.city` won't compile if `address` can be `undefined` — you must narrow (Lesson 4) or use `?.`/`??`.

**Beyond `strict`** — flags worth enabling: `noUncheckedIndexedAccess` (makes `array[i]` and `record[key]` correctly `T | undefined` — eliminates a huge class of off-by-one/missing-key bugs), `noImplicitReturns`, `noFallthroughCasesInSwitch`, `noUnusedLocals`/`noUnusedParameters`.

**Migrating loose → strict.** Flipping `strict` on a loose codebase surfaces a wave of errors. The professional approach is *incremental*: enable flags one at a time (or strict on new files first), drive each to zero, and never use `any` as the escape hatch — use `unknown` + narrowing, or fix the real type. This is exactly the strategy the capstone applies at scale.

### Common gotchas
- Believing "it compiles" means something under a loose config — it may not.
- Disabling a strict flag to make errors disappear (you turned off the reviewer).
- Sprinkling `any` to pass strict mode — defeats the purpose; use `unknown`/narrowing.
- Forgetting `noUncheckedIndexedAccess` — array/record access is a top source of `undefined` bugs it catches.

## 🧪 Hands-on Labs

Work through **`labs/lab-06-tsconfig-strict.md`**. You'll get Forge code that type-checks under a *loose* `tsconfig` despite real bugs (implicit `any`, unchecked `null`, an out-of-range index). You'll flip on `strict` (and `noUncheckedIndexedAccess`), watch the bugs surface as errors, and resolve them properly — proving that the loose config passed the buggy code and the strict config catches it.

## 🔍 Engineering Investigation

Type-check the code under the loose config (passes) and the strict config (fails). For each newly-surfaced error, record the flag responsible and the real bug it exposes — an implicit `any` hiding a wrong call, a null access, an index that can be `undefined`. The evidence: the *same code*, two configs, two outcomes.

## 🤖 AI Engineering Exercise

Ask an AI for "a good tsconfig for a production app." **Verify** each option it includes against the docs and your needs — AIs sometimes disable strictness or add cargo-cult flags. **Log** which flags you kept, which you rejected, and the bug each strict flag would catch in the lab code.

## 📝 Assignment

Submit: your `tsconfig.json` (strict, with rationale comments for non-obvious flags), the before (loose, passing) and after (strict, failing then fixed) compiler output, and a short note on the highest-value flag and the bug class it eliminates.

## 🚀 Stretch Goal

Add a CI-style script (`"typecheck": "tsc --noEmit"`) and a pre-commit hook (or document one) that blocks commits failing the type-check. Explain how this makes the compiler standard enforced, not optional.

## ✅ Definition of Done

- [ ] `tsconfig.json` written with `strict` on and key flags understood
- [ ] Each strict flag's purpose explained in your own words
- [ ] Loose code migrated to strict; all surfaced errors resolved properly (no `any` escape hatch)
- [ ] Loose-passes/strict-catches demonstrated on the same code; `tsc --noEmit` clean under strict

## 🪞 Reflection

What did "it compiles" actually guarantee under the loose config? Now that you've set the standard, what does a green type-check mean to your team, and why is config part of engineering quality?
