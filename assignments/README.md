# Assignments — Professional TypeScript Engineering

Each lesson has an assignment described in its `Lesson_NN.md`. Submit every one using `submission-template.md`, and back every type claim with compiler evidence — `tsc --noEmit` is the test harness.

| File | Purpose |
|------|---------|
| `submission-template.md` | per-lesson submission format |
| `capstone-brief.md` | the full FORGE-9200 migration specification |
| `capstone-submission-template.md` | the capstone migration-report format |

## What every submission must include
- **The model:** the types you defined/changed and *why this shape* — what illegal states it makes unrepresentable.
- **Compiler evidence:** the `TSxxxx` errors you expected, what `tsc --noEmit` actually said, the illegal cases you confirmed are rejected, and the clean (exit `0`) state reached.
- **The fix at the cause:** model/narrowing/missing-field — never silenced with `any`, `as`, or `// @ts-ignore`.
- **AI-usage log:** draft → type-check (the compiler verifies) → log.
- **Clean commits** (your Module 02 Git skills apply).

## Grading
Against `../ASSESSMENT_RUBRIC.md`. The recurring standard: **make illegal states unrepresentable, the compiler is your first reviewer, and a claim that doesn't type-check isn't true** — `any` is never the fix.
