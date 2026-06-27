# Learner Guide — Professional TypeScript Engineering

## You are a TypeScript engineer, not a student doing exercises
Every lesson is an **engineering ticket** on *Project Forge*. Approach each as real work: understand what's being asked, **model it in types** so the bad value can't even be constructed, type-check with the compiler, read the diagnostics, fix the cause, and document your reasoning. The goal isn't memorizing syntax — it's the judgment to use the type system to make whole classes of bugs impossible.

## The one idea that matters most
**Make illegal states unrepresentable.** If the type can't express the bad value, you never have to check for it at runtime — the compiler does, every time, for free. Most of this module is learning to model so that "it compiles" actually guarantees something.

## The compiler is your first reviewer
`tsc --noEmit` is the test harness. A green check is evidence; a `TSxxxx` error is your reviewer pointing at a failed claim. Learn to **predict the error before you run it** — when your prediction is wrong, you've found a gap in your mental model, which is the whole point. (Note: `tsc file.ts` ignores `tsconfig.json`; use `tsc --noEmit` or `-p`.)

## How each lesson works
1. **Read the ticket and the deep dive** — understand the concept and acceptance criteria.
2. **Do the lab.** Run the generator, **predict the diagnostics**, then type-check and compare.
3. **Investigate** — the Engineering Investigation pushes you from "it compiles" to "I can show the illegal cases failing."
4. **Run the AI exercise** — practice draft → type-check → log deliberately.
5. **Submit the assignment** and **update your notebook.**
6. **Check the solution** to validate your reasoning — after you've done the work.

Track your progress in `dashboard.html`.

## What every assignment must include
- **The model:** the types you defined/changed and *why this shape* — what illegal states it forbids.
- **Compiler evidence:** the codes you expected, what `tsc` said, the illegal cases confirmed rejected, the clean (exit `0`) state.
- **The fix at the cause** — never `any`/`as`/`@ts-ignore`.
- **AI-usage log:** draft → type-check → log.
- **Clean commits** (your Module 02 Git habits apply).

## Using AI responsibly
AI is a fast, confident, sometimes-wrong assistant — and TypeScript gives you a mechanical way to check it. Use it to draft a type, a generic, a guard, then **type-check the result**. The recurring failure to catch is the AI reaching for `any` or `as` to make an error vanish; that's the one move that defeats the type system. `resources/ai-workflow-guide.md` maps where AI most often misleads here.

## The golden rule
**A claim that doesn't type-check isn't true** — and **`any` is never the fix.** When the AI's explanation and the compiler disagree, the compiler wins.

## How you're graded
Against `ASSESSMENT_RUBRIC.md` — on modeling, compiler configuration, runtime safety, and the migration, **not** on reciting syntax. A clean build achieved with `any` scores worse than honest remaining errors.
