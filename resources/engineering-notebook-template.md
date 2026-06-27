# Engineering Notebook — Template

Your professional record. One entry per lesson/lab. The compiler's verdict is the evidence; the model is the reasoning.

---

## [Date] — Lesson NN: [Title] (TICKET-ID)

### Ticket / goal
What was asked; the acceptance criteria / Definition of Done.

### The model
The types I defined (or changed) and *why this shape*. What illegal states does it make unrepresentable? Where did I choose a discriminated union, a literal type, `readonly`, a derived utility type?

### The compiler dialogue (evidence)
- **Errors I expected and why:** the `TSxxxx` codes I predicted before running.
- **What `tsc --noEmit` actually said:** the codes/messages I got.
- **Illegal cases I confirmed are rejected:** the bad values that correctly fail to compile.
- **Clean state reached:** `tsc --noEmit` exits `0`.

### Fixes
What I changed to satisfy the compiler — and confirmation I fixed the *cause* (model/narrowing/missing field), not silenced it with `any`/`as`/`@ts-ignore`.

### AI usage log
- Asked: …
- AI suggested: …
- Type-checked it: … (compiler verdict)
- Outcome: accepted / rejected because the compiler showed …

### Reflection
What the type system taught me here; where a value I'd have trusted at runtime was actually illegal; what I'd model differently.

---

**Standards:** every type claim is type-checked, not asserted; illegal states are unrepresentable, not merely discouraged; **zero `any`/`@ts-ignore`**; boundaries validated with guards; clean, well-messaged commits. **A claim that doesn't type-check isn't true.**
