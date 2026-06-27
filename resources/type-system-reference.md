# Type System Reference

## Primitives & annotations
```ts
let s: string = 'a';
let n: number = 1;
let b: boolean = true;
let xs: number[] = [1, 2];
let pair: [string, number] = ['qty', 2];   // tuple
let nada: null = null;
let undef: undefined = undefined;
```

## Inference — annotate intentionally
TS infers from initializers; don't annotate the obvious:
```ts
let total = 0;             // number (inferred)
const tags = ['a', 'b'];   // string[] (inferred)
```
Do annotate **function parameters** (no initializer to infer) and usually **return types** (pins the contract, catches mistakes inside the function):
```ts
function area(w: number, h: number): number { return w * h; }
```

## `any` vs `unknown` vs `never`
| Type | Meaning | Use |
|------|---------|-----|
| `any` | opt out of checking | avoid — it's a hole in the type system |
| `unknown` | "some value, type not yet known" | safe boundary type; must narrow before use |
| `never` | "cannot happen / no value" | exhaustiveness checks; functions that never return |
| `void` | "returns nothing" | function return type |

```ts
let a: any = 5; a.foo.bar;       // compiles, crashes at runtime — DANGER
let u: unknown = 5; u.toFixed(); // ERROR — narrow first: if (typeof u === 'number') u.toFixed();
```

## Objects: interface vs type
```ts
interface Customer { id: string; name: string; vip?: boolean; }
type Money = { amount: number; currency: 'USD' | 'EUR' };
```
Both describe object shapes. Use `interface` for extendable/implementable object contracts; use `type` for unions, tuples, primitives, and mapped/computed types. Be consistent.

## Modifiers
- `readonly` — property can't be reassigned after creation.
- `?` — optional property (its type becomes `T | undefined`).
- `as const` — narrows literals to their exact values (`['a','b'] as const` → readonly tuple of literals).

## Literal types
```ts
type Status = 'draft' | 'placed' | 'paid';   // safer than `string`
let s: Status = 'payed';                       // ERROR: typo caught
```

## Key mental model
Types are erased at runtime. Their job is to make illegal programs fail to compile. The compiler is your first reviewer — annotations are machine-checked claims, not comments.
