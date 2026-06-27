# Lesson 00 — Welcome to Professional TypeScript Engineering

> **Role:** TypeScript Engineer · **Competency:** TypeScript Engineering Orientation · **Track:** TS · **Est. time:** 2–3 hours

---

## 🎫 Engineering Ticket

```
TICKET:      TS-1000
TITLE:       Onboard to TypeScript as an engineering quality system
PRIORITY:    P1 — blocks the Project Forge migration
TYPE:        Onboarding
ASSIGNEE:    You (TypeScript Engineer)
DESCRIPTION: Project Forge's frontend (the app you diagnosed in Module 03) is
             growing, and JavaScript's lack of static checking is letting whole
             classes of bugs reach production. You are joining the migration to
             TypeScript. First, set up the toolchain and understand what
             TypeScript actually is: not "JavaScript with types" as decoration,
             but a compiler that catches bugs *before the app runs*.

ACCEPTANCE CRITERIA:
  - Node.js, an editor with TS support, and the TypeScript compiler are installed and working
  - You can compile/type-check a .ts file and read compiler output
  - You can explain what `tsc` does and what "type-check vs run" means
  - You can articulate why types are a quality system, not syntax decoration
  - Your engineering notebook has a dated first entry
```

## 🏢 Business Context

A bug caught by the compiler costs seconds; the same bug caught in production costs an incident, an on-call page, and customer trust. TypeScript's value proposition is **shifting bugs left** — moving the moment of detection from runtime (late, expensive) to compile time (early, cheap). For a growing app like Forge, that shift is the difference between confident refactoring and fear of touching the code.

## 🎯 Learning Objectives

- Install and verify the TypeScript toolchain (`tsc`, an editor, Node)
- Compile/type-check a file and read compiler diagnostics
- Explain the difference between *type-checking* and *running* code
- Articulate TypeScript's role as an engineering quality system

## 📚 Technical Deep Dive

**What TypeScript is.** TypeScript is a *typed superset* of JavaScript: every valid JS program is valid TS, but TS adds a **static type system** checked by a compiler (`tsc`) *before* the code runs. The types are erased during compilation — they produce **no runtime code**. Their entire job is to catch mistakes at author time and in CI.

**Type-check vs run.**

```bash
tsc --noEmit app.ts     # type-check only: report errors, emit nothing
tsc app.ts              # type-check AND emit app.js
node app.js             # run the emitted JavaScript
```

The compiler is the new step. `tsc --noEmit` answers one question: *would this program type-check?* A non-zero exit code means it found bugs.

**The mental model: the compiler is your first reviewer.** Before any human reviews your PR, the type checker has already verified that every function is called with the right shapes, every property exists, and no `undefined` is being used as if it were a value. That reviewer never gets tired and never misses a case.

**Why "quality system," not "decoration."** Annotations like `: string` aren't comments — they're machine-checked claims. When you write `function total(items: LineItem[]): Money`, you've made a contract the compiler enforces at every call site. The payoff scales with the codebase: types are how you refactor a large app without fear.

### Common gotchas
- Thinking types exist at runtime — they're erased; you can't `if (x is User)` at runtime without writing a real check (Lesson 5).
- Treating `tsc` errors as nagging instead of as caught bugs.
- Reaching for `any`, which switches the checker off for that value (Lesson 6).

## 🧪 Hands-on Labs

Work through **`labs/lab-00-setup.md`**: install/verify `tsc`, initialize a project with `tsconfig.json`, type-check a first file, and deliberately introduce an error to watch the compiler catch it before the code ever runs.

## 🔍 Engineering Investigation

Write a tiny function with a type annotation, then call it incorrectly. Run `tsc --noEmit` and read the diagnostic: the error code (e.g. `TS2345`), the location, and the message. Then run the *same* logic as plain JS and confirm it fails only at runtime (or silently misbehaves). Record the difference in *when* the bug is caught.

## 🤖 AI Engineering Exercise

Ask an AI to "add types to this function." **Draft** its answer, then **verify with the compiler** — run `tsc` and see whether the types actually hold or whether the AI used `any`/loose types that compile but check nothing. **Log** what the compiler said. The loop all module: **draft → type-check (the compiler is the verifier) → log.** The golden rule: **the compiler is the source of truth — a claim that doesn't type-check isn't true.**

## 📝 Assignment

1. Get `tsc` working; paste `tsc --version` and `node --version`.
2. Complete the lab; include the compiler output for both the passing and the deliberately-broken version.
3. Write a 5–8 sentence explainer in your own words: "what TypeScript is and why it's a quality system, not decoration."
4. Commit your notebook (your Module 02 Git skills apply).

## 🚀 Stretch Goal

Enable `"strict": true` in your `tsconfig.json` and re-check your file. Note any new errors it surfaces — you'll learn to configure and satisfy strict mode in Lesson 6; for now, just observe that a stricter compiler is a stricter reviewer.

## ✅ Definition of Done

- [ ] `tsc`, editor TS support, and Node all working
- [ ] A file type-checked; a deliberate error caught before running
- [ ] "Type-check vs run" explained in your own words
- [ ] "TypeScript as a quality system" explainer written
- [ ] Notebook committed

## 🪞 Reflection

Where, in code you've written before, would a compiler have caught a bug you only found at runtime? What changes about how you'd refactor a large app if the compiler has your back?
