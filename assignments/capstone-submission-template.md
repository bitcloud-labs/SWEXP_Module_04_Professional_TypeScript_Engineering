# FORGE-9200 Capstone Submission — [Your Name]

**Date:** [date] · **Time spent:** [hours] · **Module migrated:** [name]

## Executive summary
2–4 sentences: what the legacy module was, your migration approach (the ordered steps), and the headline result — what "it compiles" now guarantees.

## Per-step migration record
Repeat for each step (1 Standard → 2 Domain → 3 De-duplicate → 4 Logic → 5 Uncertainty → 6 Boundary → 7 Zero).

### Step N — [name]
- **Legacy code:** [the JS before]
- **Type model / change applied:** [the types or annotations, and *why this shape*]
- **Compiler evidence:** errors surfaced (`TSxxxx`) → then `tsc --noEmit` clean
- **Illegal cases now rejected:** [bad values that correctly fail to compile — paste errors]

```ts
// key type(s) for this step
```

## The headline catch
At least one **previously-silent runtime bug** now caught at compile time: the legacy behavior (e.g. a NaN, a typo'd status, an untrusted payload), and the exact compile error that now prevents it.

## Strict standard
Your `tsconfig.json` (the relevant options) and a statement of what each strict flag proves. Confirm: `tsc --noEmit` exits `0`, **zero** `any`/`@ts-ignore`.

## AI-usage log
| Asked | AI suggested | Type-check verdict | Outcome (accepted / rejected) |
|-------|-------------|--------------------|-------------------------------|
| | | | |

Include at least one case where the compiler (or your no-`any` standard) **overruled** the AI.

## "It compiles is now a guarantee"
What your strict config + model prove that the legacy JavaScript never did. What class of bug is now impossible?

## Reflection
The hardest thing to model and why; where the type system revealed the model was wrong; where you resisted `any`/`as` and what you did instead; how you'd migrate the next module faster.

---
**Self-check vs rubric:** [ ] Type Modeling [ ] Compiler Configuration [ ] Runtime Safety [ ] Utility Types [ ] Migration Strategy [ ] Documentation [ ] Engineering Judgment [ ] AI Engineering Workflow
