# AI Workflow Guide — Draft → Type-check → Log

TypeScript gives you something rare when working with an AI assistant: a **mechanical verifier**. The compiler doesn't care how confident the AI sounded — it checks the claim. Use that.

## The loop
1. **Draft.** Ask the AI for a type, a generic, a guard, a migration step, an explanation.
2. **Type-check — the compiler is the verifier.** Paste it in and run `tsc --noEmit`. Green or it didn't happen.
   - Proposed a domain type? Construct legal and illegal values and confirm the illegal ones fail.
   - Proposed a guard? Feed it a malformed payload and confirm it rejects.
   - Proposed a generic? Use it at two types and confirm inference flows without casts.
3. **Log.** Record what you asked, what `tsc` said, where the AI was right, and where the compiler overruled it.

## Where AI most often goes wrong here
- Reaches for `any` (or `as`) to clear an error — the one move that defeats the type system. Reject it.
- Proposes a type that *compiles* but permits illegal states (optional fields instead of a discriminated union).
- Hand-writes a parallel type that duplicates a derivable one (should be `Omit`/`Partial`/`Pick`).
- Casts `unknown` at a boundary instead of writing a real `is` guard.
- Confidently mis-explains variance, `unknown` vs `any`, or exhaustiveness — the compiler settles it.

## The golden rule
**A claim that doesn't type-check isn't true.** When the AI's explanation and the compiler disagree, the compiler wins — every time. The whole point of TypeScript is that you don't have to take anyone's word, human or AI, for whether the types are sound: you can check.
