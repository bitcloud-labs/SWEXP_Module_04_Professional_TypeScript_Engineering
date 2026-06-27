# Migration Playbook — JS → strict TypeScript

How to take a legacy JavaScript module to strict, type-safe TypeScript incrementally, without a risky big-bang rewrite. This is the capstone's spine.

## The ordered strategy
1. **Stand up the strict standard first.** Add a `tsconfig.json` with `strict: true` (and `noUncheckedIndexedAccess`). You'll see many errors — that's the work made visible, not a problem.
2. **Model the domain.** Define the core types (interfaces/literal unions), making illegal states unrepresentable. Everything else hangs off these.
3. **De-duplicate with utility types.** Derive `New*`/`*Patch`/`*Summary` from the core types via `Omit`/`Partial`/`Pick` rather than re-declaring.
4. **Type the logic.** Annotate function parameters and return types; let inference handle locals. Return types pin the contract and catch mistakes inside the function.
5. **Model uncertainty.** Replace "could be missing/various" fields with unions; handle `null`/`undefined` explicitly with narrowing.
6. **Harden the boundary.** Anything from JSON/network/IO enters as `unknown`; validate with `is` type guards before use. No bare `as`.
7. **Drive strict errors to zero.** Resolve real errors with real types — never silence them with `any` or `// @ts-ignore`.

## Tactics
- Rename `.js` → `.ts` one module at a time; `allowJs`/`checkJs` let typed and untyped coexist during the transition.
- Convert leaves first (modules with few dependencies), then work inward.
- Keep the compiler green between steps — small, type-checked commits (your Module 02 Git habits apply).
- When a fix is hard, the type is usually telling you the model is wrong. Fix the model, not the symptom.

## Anti-patterns (these *are* the bugs)
- `any` to make an error disappear — reintroduces the runtime bug the type caught.
- `as SomeType` at a boundary without a runtime check — an unverified claim.
- `// @ts-ignore` — a silenced reviewer.
- A parallel hand-maintained type that duplicates a derivable one — it will drift.

## Done means
`tsc --noEmit` exits `0` under `strict: true`, with **zero** `any`/`@ts-ignore`, boundaries validated by guards, and the domain types making the illegal cases uncompilable. **A claim that doesn't type-check isn't true.**
