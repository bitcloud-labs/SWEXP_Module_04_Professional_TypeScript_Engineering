# Resources — Professional TypeScript Engineering

Working references to keep open while you do the labs. Not reading assignments — quick-reference cheatsheets and playbooks.

| Resource | Use it for |
|----------|-----------|
| `typescript-setup-guide.md` | toolchain, `tsc`, editor, project layout |
| `type-system-reference.md` | primitives, inference, `any`/`unknown`/`never`, annotations |
| `domain-modeling-guide.md` | interfaces/types, literals, illegal-states-unrepresentable |
| `generics-utility-types-cheatsheet.md` | generics, constraints, Partial/Pick/Omit/Record/etc. |
| `unions-narrowing-guide.md` | union types and every narrowing technique |
| `type-guards-discriminated-unions.md` | tagged unions, `never` exhaustiveness, `is` predicates |
| `tsconfig-strict-reference.md` | compiler options and what each strict flag enforces |
| `migration-playbook.md` | incremental JS → strict-TS migration strategy |
| `compiler-error-reference.md` | common `TSxxxx` codes, what they mean, how to fix |
| `ai-workflow-guide.md` | draft → type-check (the compiler verifies) → log |
| `engineering-notebook-template.md` | the notebook structure you submit |

**The thread through all of them:** make illegal states unrepresentable; the compiler is your first reviewer; **a claim that doesn't type-check isn't true** — and `any` is never the fix.
