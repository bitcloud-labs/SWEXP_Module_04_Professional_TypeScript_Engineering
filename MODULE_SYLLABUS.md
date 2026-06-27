# Module Syllabus — Professional TypeScript Engineering

## Description
A ticket-driven, compiler-verified module that teaches TypeScript the way a professional engineer uses it: as a **quality system that eliminates whole classes of bugs before the application runs.** Across 8 lessons and a capstone, you operate as a TypeScript Engineer on *Project Forge*, closing tickets that move from static typing, through explicit domain modeling, generics and utility types, union types and narrowing, discriminated unions and boundary guards, to a strict compiler standard — culminating in a real legacy-JavaScript-to-strict-TypeScript migration. The emphasis is on **modeling and judgment**: make illegal states unrepresentable, let the compiler be your first reviewer, and never accept a claim that doesn't type-check.

## Prerequisites
- Solid JavaScript fundamentals (SWEXP Module 03 is ideal preparation: the runtime, modern JS, the type-coercion bugs TypeScript prevents).
- Comfort at a command line and basic version control (Modules 01–02).
- **Node.js** (LTS or newer) and the **TypeScript compiler** (`tsc`), installed globally or per-project.
- A TypeScript-aware editor (VS Code or equivalent) for inline diagnostics.

## Pacing Options

| Track | Cadence | Duration |
|-------|---------|----------|
| Intensive (bootcamp) | ~1 lesson/day; capstone over the last 3–4 days | ~2–3 weeks |
| Part-time (cohort) | 2 lessons/week | ~5–6 weeks |
| Self-paced | 1 lesson per sitting; capstone when ready | flexible |

Most lessons are 3–4 hours including the lab; the capstone is 12–16 hours.

## Module Arc

| Phase | Lessons | Focus |
|-------|---------|-------|
| Foundations | 0–1 | toolchain; static typing catching runtime bugs at compile time |
| Modeling the Domain | 2–3 | illegal-states-unrepresentable; deriving types via generics/utility types |
| Handling Uncertainty | 4–5 | union types & narrowing; discriminated unions & boundary guards |
| The Engineering Standard | 6 | strict `tsconfig` and what each flag enforces |
| Capstone | 7 | a real JS → strict-TS migration, proven with compiler evidence |

## Lesson Structure
Every lesson follows the same shape: **Engineering Ticket → Business Context → Learning Objectives → Technical Deep Dive → Hands-on Labs → Engineering Investigation → AI Engineering Exercise → Assignment → Stretch Goal → Definition of Done → Reflection.**

## Labs
Every lab is **real TypeScript, type-checked with `tsc`** — the compiler is the test harness. A generator writes the `.ts` files and a lab `tsconfig`; you run `tsc --noEmit` and read the diagnostics. The labs are verified: legal values compile, and each illegal case fails with specific `TSxxxx` codes (e.g. a typo'd status → TS2322, a missing argument → TS2554, possibly-undefined access → TS18048). The discipline is to **predict the error codes before running**. All labs are local; no external services. Note `tsc file.ts` ignores `tsconfig.json` — use `tsc --noEmit` or `-p`.

## Deliverables
- **Per lesson:** a completed lab, an assignment via `assignments/submission-template.md`, and an engineering-notebook entry (the model → the compiler dialogue → the fix → the AI log).
- **Capstone:** the migrated strict-TypeScript module, a migration report proving each step with compiler evidence (including one previously-silent runtime bug now caught at compile time), and the notebook — per `assignments/capstone-brief.md`.

## Final Assessment
Graded against `ASSESSMENT_RUBRIC.md`: Type Modeling (20%), Compiler Configuration (15%), Runtime Safety (15%), Utility Types (10%), Migration Strategy (15%), Documentation (10%), Engineering Judgment (10%), AI Engineering Workflow (5%).

## Support Materials
- `resources/` — TypeScript setup; type-system reference; domain-modeling guide; generics & utility-types cheatsheet; unions & narrowing; type guards & discriminated unions; tsconfig & strict reference; migration playbook; compiler-error reference; AI-workflow guide; notebook template.
- `dashboard.html` — an interactive progress tracker.
- `solutions/` — worked solutions (compiler-reproducible) to check reasoning against.
- `instructor-notes/` — per-lesson facilitation guidance.

## Academic & Professional Integrity
AI assistance is **encouraged**, used as a professional would: every use follows **draft → type-check (the compiler is the verifier) → log**, and you never accept a claim that doesn't type-check. The recurring failure to catch is the AI reaching for `any`/`as` to make errors disappear — `any` is never the fix, and unverified AI output in deliverables counts against you.
