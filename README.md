# SWEXP Module 04 — Professional TypeScript Engineering

**Theme:** Eliminate entire classes of bugs before the application runs.

> 🧪 **Hands-on, autograded.** This repo is a clone-and-run workspace: implement the `// TODO`s
> in `src/`, run `npm test` for instant red→green feedback, and `npm run grade` for your score.
> See **[EXERCISES.md](EXERCISES.md)**. Open in Codespaces for a zero-setup environment.

You are a **TypeScript Engineer** on *Project Forge* (continuing from Modules 02–03), leading the move from fragile, untyped JavaScript to strict, type-safe code. This module treats TypeScript as an **engineering quality system**, not "JavaScript with types": you learn to model the business domain so that illegal states are unrepresentable, derive types from a single source of truth, handle uncertain data with unions and narrowing, validate boundaries with guards, and enforce a strict compiler standard — culminating in a real module migration.

The ethos, in every lesson: **make illegal states unrepresentable**, **the compiler is your first reviewer**, and the golden rule — **a claim that doesn't type-check isn't true.** And `any` is never the fix.

## How You Work Here

| Step | What it means |
|------|---------------|
| Pick up a ticket | Each lesson is an engineering ticket (`DOMAIN-2001`, `UNION-3001`, …) with acceptance criteria |
| Model first | Express the domain in types so the bad value can't be constructed |
| Type-check | Run `tsc --noEmit` — the compiler is the test harness; legal compiles, illegal fails |
| Read the diagnostics | Each `TSxxxx` code tells you exactly what claim failed and why |
| Fix the cause | Correct the model/value/narrowing — never silence with `any`/`as`/`@ts-ignore` |
| Verify AI | Draft → type-check (the compiler verifies) → log |

## Learning Outcomes

By the end you will be able to:
- Set up and run the TypeScript compiler as an engineering instrument.
- Use static typing to catch, at compile time, bugs that JavaScript only finds at runtime.
- Model a business domain so that illegal states are unrepresentable.
- Eliminate duplicate types by deriving them with generics and utility types.
- Model uncertain data with union types and handle it with narrowing.
- Build discriminated unions and validate untrusted input at the boundary with type guards.
- Configure and enforce a strict `tsconfig` standard, and explain what each flag proves.
- Migrate a legacy JavaScript module to strict, type-safe TypeScript with compiler-backed evidence.

## Lesson Index

| # | Lesson | Competency | Ticket |
|---|--------|-----------|--------|
| 0 | Welcome to Professional TypeScript Engineering | TypeScript Engineering Orientation | TS-1000 |
| 1 | The Bug That JavaScript Couldn't Catch | Static Typing Fundamentals | TS-1010 |
| 2 | Model the Business Domain | Domain Modeling | DOMAIN-2001 |
| 3 | Eliminate Duplicate Types | Generics & Utility Types | GEN-2010 |
| 4 | Model Uncertain Business Data | Union Types & Narrowing | UNION-3001 |
| 5 | Safely Interpret API Responses | Type Guards & Discriminated Unions | GUARD-3010 |
| 6 | Configure the Engineering Standard | tsconfig & Strict Mode | CONFIG-4001 |
| 7 | Project Forge TypeScript Migration Capstone | Production TypeScript Migration | FORGE-9200 |

The module flows through phases: **Foundations** (0–1) → **Modeling the Domain** (2–3) → **Handling Uncertainty** (4–5) → **The Engineering Standard** (6) → **Capstone** (7).

## Repository Layout

```
.
├── README.md                      # this file
├── MODULE_SYLLABUS.md             # pacing, structure, deliverables
├── LEARNER_GUIDE.md               # how to operate as a TypeScript engineer here
├── INSTRUCTOR_GUIDE.md            # facilitation and assessment
├── COMPETENCY_MATRIX.md           # lesson → competency → skills
├── ASSESSMENT_RUBRIC.md           # grading weights and performance levels
├── dashboard.html                 # interactive progress dashboard (open in a browser)
├── Lesson_00.md … Lesson_07.md    # the 8 lessons
├── labs/                          # hands-on labs (real .ts, type-checked with tsc)
├── solutions/                     # worked solutions / answer keys
├── resources/                     # type-system, domain-modeling, generics, unions, guards, tsconfig, migration + more
├── assignments/                   # submission templates + capstone brief
└── instructor-notes/              # per-lesson facilitation notes
```

## Getting Started

1. Read `resources/typescript-setup-guide.md` and get Node, `tsc`, and a TS-aware editor working (Lesson 0 / `labs/lab-00-setup.md`).
2. Start your engineering notebook from `resources/engineering-notebook-template.md`.
3. Open `dashboard.html` in your browser to track progress through the lessons and phases.
4. Open `Lesson_00.md` and pick up your first ticket. Keep `resources/compiler-error-reference.md` and the cheatsheets open as you work.

**The compiler is the test harness.** Type-check with `tsc --noEmit` (whole project) or `tsc --noEmit -p tsconfig.strict.json`. Note `tsc file.ts` ignores `tsconfig.json` — use `-p` or no file argument. Exit `0` means clean; anything else is your first reviewer telling you something.
