# Type Guards & Discriminated Unions

The most powerful modeling tool in TypeScript: a union where each member carries a literal **tag**, so a `switch` on the tag narrows exhaustively — and the compiler proves you handled every case.

## Discriminated union
```ts
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }
  | { status: 'loading' };
```
The shared literal field (`status`) is the discriminant. Switch on it and each branch narrows to that member:
```ts
function render<T>(res: ApiResponse<T>): string {
  switch (res.status) {
    case 'success': return `ok: ${JSON.stringify(res.data)}`;  // res.data exists here
    case 'error':   return `error: ${res.message}`;            // res.message exists here
    case 'loading': return 'loading…';
    default: { const _exhaustive: never = res; return _exhaustive; } // compile-time exhaustiveness
  }
}
```

## The `never` exhaustiveness check
If you later add `{ status: 'pending' }` to the union and forget a `case`, the `default` assignment `const _exhaustive: never = res` fails to compile (`Type '{status:"pending"}' is not assignable to 'never'`). **The compiler forces you to handle the new case.** This is how you make a whole class of "forgot to handle a state" bugs impossible.

## User-defined type guards (`is`)
At a trust boundary, validate `unknown` and tell the compiler what you proved:
```ts
function isOrder(x: unknown): x is Order {
  return typeof x === 'object' && x !== null
    && 'id' in x && typeof (x as any).id === 'string'
    && 'total' in x && typeof (x as any).total === 'number';
}

const parsed: unknown = JSON.parse(body);
if (isOrder(parsed)) { parsed.total; }   // narrowed to Order — safe
else { /* reject — bad payload */ }
```
A guard that *checks* then narrows is safe; a bare cast `parsed as Order` only *asserts* and lets a malformed payload through to crash later.

## `as` vs a real guard
`as` is a promise to the compiler with no runtime check — at a boundary it's a lie waiting to happen. Validate with a guard returning `x is T`, then the narrowed value is safe to use.

## The standard
Tag your states; switch with a `never` default; validate `unknown` at boundaries with `is` guards. **A claim that doesn't type-check isn't true** — and `as`/`any` are how untrue claims sneak past the compiler.
