# Lesson 07 — Project Forge TypeScript Migration Capstone

> **Role:** TypeScript Engineer · **Competency:** Production TypeScript Migration · **Track:** CAP · **Est. time:** 12–16 hours

---

## 🎫 Engineering Ticket

```
EPIC:        FORGE-9200
TITLE:       Migrate a Forge module from legacy JavaScript to strict TypeScript
PRIORITY:    P1 — module capstone
TYPE:        Epic (integrative)
DESCRIPTION: You are leading the migration of a real Forge module — domain
             objects, utilities, an API client, and the code that consumes them —
             from untyped JavaScript to maintainable, strict TypeScript. Apply
             everything: static typing, an explicit domain model, generics and
             utility types, unions and narrowing, discriminated unions and
             guards at the boundary, and a strict compiler standard. Deliver
             type-safe code, a migration report, and a guarantee that "it
             compiles" now means something.

ACCEPTANCE CRITERIA: (full mapping in assignments/capstone-brief.md)
  - The module compiles clean under a strict tsconfig with no `any` escape hatches
  - The domain is modeled explicitly; illegal states are unrepresentable
  - Duplicated types are derived from a single source via generics/utility types
  - Uncertain data is modeled with unions and handled by narrowing
  - API responses are discriminated unions, validated at the boundary with guards
  - At least one previously-silent runtime bug is now a compile-time error
  - A migration report documents each decision with compiler evidence
```

## 🏢 Business Context

This is the job: take real, working-but-fragile JavaScript and make it provably safe without breaking behavior — incrementally, with the compiler as your guide and your proof. Migrations are where TypeScript pays off and where engineering judgment matters most: what to model strictly, where to validate, when a generic helps versus over-engineers, and how to drive strictness up without resorting to `any`. Any single technique is easy; sequencing a whole migration calmly is the skill.

## 🎯 Learning Objectives

Integrate every module competency: static typing; explicit domain modeling with illegal-states-unrepresentable; generics and utility types for a single source of truth; union types and narrowing for uncertain data; discriminated unions and type guards for safe boundaries; and a strict `tsconfig` as the enforced standard — all under disciplined, evidence-based documentation.

## 📚 Technical Deep Dive

No new concepts — the capstone tests **integration, sequencing, and judgment**. The full specification, the legacy module to migrate, the recommended migration order, and the acceptance-criteria → rubric mapping live in **`assignments/capstone-brief.md`**; read it first and trace each criterion to the evidence you'll produce.

A sound migration order (detailed in the brief):

1. **Establish the standard** — add a strict `tsconfig`; get the project type-checking even if errors remain (Lesson 6).
2. **Model the domain** — define the core types; make illegal states unrepresentable (Lesson 2).
3. **De-duplicate** — derive related types from the canonical ones with generics/utility types (Lesson 3).
4. **Type the logic** — annotate functions; let the compiler surface the silent bugs (Lesson 1).
5. **Model uncertainty** — replace loose/`any` fields with unions and narrow them (Lesson 4).
6. **Harden the boundary** — make API responses discriminated unions; validate `unknown` with guards; remove `as` (Lesson 5).
7. **Drive strict errors to zero** — resolve every diagnostic properly; no `any` escape hatches (Lesson 6).

## 🧪 Hands-on Labs

The capstone *is* the lab. The legacy module and its scenarios are assembled from the earlier lab generators (reuse them to reconstruct the buggy JavaScript and the bad API payloads), so the migration is realistic and the bugs are reproducible.

## 🔍 Engineering Investigation

Investigation is the deliverable. For each migration step, your report must show: the legacy code, the type model or change you applied, the compiler evidence (errors surfaced, then a clean check), and — for at least one case — a previously-silent runtime bug now caught at compile time. End with a "how `it compiles` is now a guarantee" summary: what your strict config proves that the legacy code never did.

## 🤖 AI Engineering Exercise

Use AI throughout as a professional would — to draft types, suggest a utility type, propose a guard — **but every use follows draft → type-check (the compiler is the verifier) → log.** Maintain an AI-usage log. The recurring failure to catch is the AI reaching for `any` or `as` to make errors disappear; the compiler (and your no-`any` standard) is the arbiter. The golden rule holds: **a claim that doesn't type-check isn't true.**

## 📝 Assignment

Deliver the migrated module per `assignments/capstone-brief.md`, using `assignments/capstone-submission-template.md`. Your submission is the strict-TypeScript code plus a **migration report** that proves each step with compiler evidence, and the engineering notebook (including the AI-usage log) tying it together.

## 🚀 Stretch Goal

Go beyond the brief in one way a real team would value — e.g. add Zod schema validation deriving types from schemas, enable `noUncheckedIndexedAccess` and fix the fallout, set up a CI `typecheck` gate, or add a branded ID type — and justify it with compiler evidence.

## ✅ Definition of Done

- [ ] Module compiles clean under a strict `tsconfig`, with no `any` escape hatches
- [ ] Domain modeled explicitly; at least one illegal state made unrepresentable
- [ ] Duplicated types derived from a single source (generics/utility types)
- [ ] Uncertain data modeled with unions and handled by narrowing
- [ ] API responses are discriminated unions validated at the boundary with guards
- [ ] At least one previously-silent bug now a compile-time error, with evidence
- [ ] Migration report + notebook + AI-usage log complete and reproducible

## 🪞 Reflection

Which migration step delivered the most safety per unit of effort? Where did the compiler catch something you'd have missed? If you joined a team with a 200k-line untyped codebase tomorrow, how would your migration strategy begin?
