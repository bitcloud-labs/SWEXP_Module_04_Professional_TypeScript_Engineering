# Lesson NN Submission — [Your Name]

**Ticket:** [e.g. UNION-3001] · **Date:** [date] · **Lesson:** [title]

## 1. Goal / Definition of Done
What the ticket asked; the acceptance criteria you met.

## 2. The model
The types you defined or changed, and *why this shape*. What illegal states does it make unrepresentable? Note any discriminated union, literal type, `readonly`, or derived utility type and the reason for it.

```ts
// the key type(s)
```

## 3. Compiler evidence
- **Errors expected (and why):** the `TSxxxx` codes you predicted.
- **What `tsc --noEmit` said:** the actual diagnostics.
- **Illegal cases confirmed rejected:** the bad values that correctly fail to compile (paste the errors).
- **Clean state:** `tsc --noEmit` exits `0`.

## 4. Fix at the cause
What you changed to satisfy the compiler, and confirmation it addresses the cause (model/narrowing/missing field) — **not** silenced with `any`/`as`/`@ts-ignore`.

## 5. AI-usage log
| Asked | AI suggested | Type-check verdict | Outcome |
|-------|-------------|--------------------|---------|
| | | | accepted / rejected because the compiler showed… |

## 6. Reflection
What the type system taught you here; where a runtime-"fine" value was actually illegal; what you'd model differently.

---
**Checklist:** [ ] illegal states unrepresentable · [ ] every claim type-checked · [ ] zero `any`/`@ts-ignore` · [ ] boundaries guarded · [ ] AI output verified · [ ] commits clean
