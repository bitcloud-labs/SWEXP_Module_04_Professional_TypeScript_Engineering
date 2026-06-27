# Capstone Brief — FORGE-9200: Migrate a Forge Module to Strict TypeScript

> **Epic:** FORGE-9200 · **Role:** TypeScript Engineer (migration lead) · **Est. time:** 12–16 hours (staged) · **Submission:** `capstone-submission-template.md`

## The situation
A real *Project Forge* module — domain objects (customers, orders, line items, money), a set of utility functions, an API client, and the code that consumes them — works today in untyped JavaScript but is fragile: typos in status strings, fields that are sometimes missing, API responses trusted blindly, duplicated shapes that drift apart. Your job is to migrate it to **strict, type-safe TypeScript** without changing its behavior — incrementally, with the compiler as both your guide and your proof. When you're done, "it compiles" must *mean* something.

The capstone introduces **no new concepts**. It integrates the whole module and tests *sequencing and judgment*: what to model strictly, where to validate, when a generic helps versus over-engineers, and how to drive strictness up without ever reaching for `any`.

## What to migrate
Assemble the legacy module from the lab generators you've already used — each defect maps to a lesson, so the migration is realistic and the compiler evidence is reproducible:

| Concern | Legacy weakness | Source lab |
|---------|-----------------|-----------|
| Domain objects | open `string`/`number` fields; illegal combos representable | lab-02 |
| Related shapes | hand-duplicated `NewOrder`/`OrderPatch`/summary types | lab-03 |
| Core logic | untyped params/returns; coercion bugs (NaN) | lab-01 |
| Uncertain data | fields sometimes missing/various; `null` unhandled | lab-04 |
| API client | responses trusted; `as` casts at the boundary | lab-05 |
| Compiler standard | loose config hiding implicit `any` / possibly-undefined | lab-06 |

## The migration order (follow it)
1. **Establish the standard** — add a strict `tsconfig.json`; get the project type-checking even if errors remain. (Lesson 6)
2. **Model the domain** — interfaces/literal unions; make illegal states unrepresentable. (Lesson 2)
3. **De-duplicate** — derive related types from the canonical ones with generics + utility types. (Lesson 3)
4. **Type the logic** — annotate parameters and return types; let inference handle locals. (Lesson 1)
5. **Model uncertainty** — replace loose/`any` fields with unions; narrow them. (Lesson 4)
6. **Harden the boundary** — API responses become discriminated unions; validate `unknown` with `is` guards; remove `as`. (Lesson 5)
7. **Drive strict errors to zero** — resolve every diagnostic properly; no `any` escape hatches. (Lesson 6)

Keep the compiler green between steps where you can; commit in small, type-checked increments.

## Phases (stage the work)
- **Phase A — Standard & domain (steps 1–2):** strict config in place; core types modeled.
- **Phase B — Structure & logic (steps 3–4):** duplication derived away; functions typed.
- **Phase C — Uncertainty & boundary (steps 5–6):** unions + narrowing; guards at the edge; `as` removed.
- **Phase D — Zero & report (step 7):** clean strict build; migration report assembled.

## Acceptance criteria → rubric mapping
| Acceptance criterion | Rubric category |
|----------------------|-----------------|
| Domain modeled explicitly; illegal states unrepresentable | Type Modeling (20%) |
| Project compiles clean under a strict `tsconfig` | Compiler Configuration (15%) |
| `unknown` validated at boundaries with `is` guards; no `as` | Runtime Safety (15%) |
| Duplicated types derived via generics/utility types | Utility Types (10%) |
| Migration sequenced incrementally with green checkpoints | Migration Strategy (15%) |
| Migration report documents each step with compiler evidence | Documentation (10%) |
| Sound modeling/validation choices, justified; no over-engineering | Engineering Judgment (10%) |
| AI used as draft → type-check → log | AI Engineering Workflow (5%) |

## Deliverables
1. **The migrated module** — strict TypeScript, `tsc --noEmit` exits `0`, **zero** `any`/`@ts-ignore`, plus the `tsconfig.json` and the legacy sources (or the generators) so the migration is reproducible.
2. **A migration report** — for each step: the legacy code, the type model/change applied, the compiler evidence (errors surfaced → clean check), and — for at least one case — a **previously-silent runtime bug now caught at compile time**.
3. **The engineering notebook**, including the **AI-usage log**.
4. **A "how `it compiles` is now a guarantee" summary** — what your strict config proves that the legacy code never did.

## Definition of done
- [ ] Compiles clean under a strict `tsconfig`, no `any` escape hatches
- [ ] Domain modeled; illegal states unrepresentable (show illegal cases failing to compile)
- [ ] Duplicated types derived from a single source
- [ ] Uncertain data modeled with unions and narrowed
- [ ] API responses are discriminated unions validated by guards (no `as`)
- [ ] At least one previously-silent runtime bug is now a compile error, with evidence
- [ ] Migration report + notebook + AI log complete and reproducible

## The golden rule
**A claim that doesn't type-check isn't true** — and **`any` is never the fix.** Where the AI's confident suggestion meets the compiler, the compiler wins; catching the AI reaching for `any`/`as` is part of the grade.
