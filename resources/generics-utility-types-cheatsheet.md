# Generics & Utility Types Cheatsheet

Write a type once, derive the rest. Duplicated type definitions drift; derived ones can't.

## Generics
```ts
function first<T>(xs: T[]): T | undefined { return xs[0]; }
interface ApiResult<T> { data: T; status: number; }
type Pair<K, V> = { key: K; value: V };
```
The type parameter flows through, so `first([1,2])` is `number | undefined` and `first(['a'])` is `string | undefined` — no casting.

## Constraints
```ts
function pluck<T, K extends keyof T>(obj: T, key: K): T[K] { return obj[key]; }
pluck({ id: 1, name: 'a' }, 'name');   // string
pluck({ id: 1 }, 'nope');              // ERROR — 'nope' not a key
```
`extends` bounds a type parameter so you can rely on structure inside the generic.

## Utility types (derive, don't duplicate)
| Utility | Produces |
|---------|----------|
| `Partial<T>` | all properties optional |
| `Required<T>` | all properties required |
| `Readonly<T>` | all properties `readonly` |
| `Pick<T, K>` | only properties `K` |
| `Omit<T, K>` | all properties except `K` |
| `Record<K, V>` | object with keys `K`, values `V` |
| `Return­Type<F>` | the return type of function `F` |
| `Parameters<F>` | the parameter tuple of `F` |
| `NonNullable<T>` | `T` without `null`/`undefined` |

```ts
interface Order { id: string; total: number; status: OrderStatus; paidAt: Date; }
type NewOrder    = Omit<Order, 'id'>;                 // server assigns id
type OrderPatch  = Partial<Omit<Order, 'id'>>;        // PATCH body
type OrderSummary = Pick<Order, 'id' | 'status'>;     // list view
```

## Why derived beats duplicated
When `Order` gains a required field, `NewOrder`/`OrderPatch`/`OrderSummary` update automatically, and any construction site missing the field fails to compile. A hand-maintained parallel `interface NewOrder` would silently drift — the bug class this lesson removes.

## Watch out
- A spread-based factory (`{ ...input, id }`) can *propagate* missing fields silently; a literal construction site (`const seed: NewOrder = {…}`) is what surfaces the error. Construct from the derived type explicitly when you want the compiler to catch omissions.
- Don't reach for `any` to "simplify" a generic — that erases the very checking you wanted.
