# Unions & Narrowing Guide

A union says "one of these"; **narrowing** is how you prove which one before using it. The compiler tracks the narrowing and only lets you touch members that exist.

## Union types
```ts
type Id = string | number;
type Note = string | null;
type Discount = { kind: 'percent'; value: number } | { kind: 'flat'; value: number };
```

## Narrowing techniques
| Technique | For |
|-----------|-----|
| `typeof x === 'string'` | primitives (string/number/boolean/etc.) |
| `'kind' in x` | object shapes with distinguishing keys |
| `x.kind === 'percent'` | discriminated unions (literal tag) |
| `x instanceof Date` | class instances |
| `Array.isArray(x)` | arrays |
| truthiness `if (x)` / `x?.y` / `x ?? d` | `null`/`undefined` |

```ts
function formatId(id: Id): string {
  return typeof id === 'number' ? id.toFixed(0) : id.toUpperCase();
  // inside each branch, `id` is narrowed — .toFixed/.toUpperCase are safe
}
```

## null / undefined
```ts
function previewNote(note: Note): string {
  return note?.slice(0, 80) ?? '(no note)';
}
```
`?.` short-circuits on null/undefined; `??` defaults only on null/undefined (unlike `||`, which also fires on `0`/`''`).

```ts
const count = 0;
count || 5;   // 5  (probably a bug)
count ?? 5;   // 0  (usually what you want)
```

## Without the guard, the compiler stops you
```ts
function bad(id: Id) { return id.toUpperCase(); }   // ERROR: toUpperCase not on number
```
That error is the feature — it's the bug the guard prevents, caught before runtime.

## The standard
Every member of a union must be handled or provably excluded. Reaching for `any` to dodge a narrowing error reintroduces exactly the runtime bug the union was protecting against. Exhaustive handling of discriminated unions is the next reference.
