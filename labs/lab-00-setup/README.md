# Lab 00 — Toolchain Setup & Your First Caught Bug

**Ticket:** TS-1000 · **Goal:** confirm the workspace runs, then watch the compiler catch a bug before the code runs.

## What you do
1. From the repo root, install once: `npm install` (already done in the LMS workspace).
2. Implement `greet` in [`src/greet.ts`](src/greet.ts) so it returns a friendly, uppercased greeting:
   `greet('forge')` → `'Hi, FORGE'`.
3. Run the tests for this lab:
   ```bash
   npx vitest run labs/lab-00-setup
   ```
   Red until you implement it, green after.
4. **See the compiler work for you.** Temporarily change the call in a scratch file to `greet(42)` and
   run `npm run check` — TypeScript rejects a number where a string is required (`TS2345`) *before* the
   code ever runs. Undo it.

## Definition of done
- `npx vitest run labs/lab-00-setup` passes.
- You can explain, in a sentence, why `greet(42)` is a compile error and what runtime bug that prevents.

## Submit
Commit your change and push (or open a PR). The autograder scores it automatically.
