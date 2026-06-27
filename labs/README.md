# Labs — Professional TypeScript Engineering

Hands-on labs for each lesson. Every lab is **TypeScript checked by the compiler** — `tsc` is the test harness. A lab generator writes the starting `.ts` files and a `tsconfig.json` into a throwaway folder; you run `tsc --noEmit` to see what the compiler says, fix the types, and run it again until it's clean (or, for the "loose vs strict" lab, until the strict config catches what the loose one missed).

The module ethos runs through every lab: **make illegal states unrepresentable**, **the compiler is your first reviewer**, and **a claim that doesn't type-check isn't true.**

## How to use a lab
1. Read the matching `Lesson_NN.md` first.
2. Run the **Setup** (a generator writes files under `/tmp/swexp-*`).
3. Work the **Tasks**, running `tsc --noEmit` to gather compiler evidence as you go.
4. Produce the **Deliverable** for your engineering notebook (include compiler output).
5. Check your reasoning against `solutions/lab-NN-solution.md`.

## Ground rules
- **Work in a throwaway directory.** Generators build under `/tmp/swexp-*`; delete freely.
- **The compiler is the source of truth.** Paste real `tsc` output as evidence, not "I think it's typed."
- **No `any` escape hatch.** Making an error vanish with `any` is not a fix — use `unknown` + narrowing, or model the real type.
- **`tsc --noEmit`** type-checks without emitting JS — your default command.

## Prerequisites
- **Node.js** (`node --version`).
- **TypeScript** (`tsc --version`) — install once with `npm i -g typescript` (or use `npx tsc`).
- An editor with TypeScript support (inline errors as you type).

## Lab index
| # | Lab | Focus |
|---|-----|-------|
| 0 | `lab-00-setup.md` | toolchain + first caught error |
| 1 | `lab-01-static-typing.md` | the bug JS couldn't catch |
| 2 | `lab-02-domain-model.md` | interfaces, literals, illegal-states-unrepresentable |
| 3 | `lab-03-generics-utility.md` | generics + utility types, one source of truth |
| 4 | `lab-04-unions-narrowing.md` | union types + narrowing |
| 5 | `lab-05-guards-discriminated.md` | discriminated unions + type guards at the boundary |
| 6 | `lab-06-tsconfig-strict.md` | loose vs strict config on the same code |

The Lesson 07 capstone reuses these generators to assemble the legacy module to migrate.
