# Lesson 05 — Safely Interpret API Responses

> **Role:** TypeScript Engineer · **Competency:** Type Guards & Discriminated Unions · **Track:** GUARD · **Est. time:** 4 hours

---

## 🎫 Engineering Ticket

```
TICKET:      GUARD-3010
TITLE:       The frontend trusts API JSON blindly and crashes on the unexpected
PRIORITY:    P1
TYPE:        Bug / Design
DESCRIPTION: Forge code does `const order = await res.json() as Order` and then
             accesses fields that aren't there when the API returns an error
             shape or a changed payload. `as` is a lie the compiler believes.
             Model responses as discriminated unions and validate at the
             boundary with type guards so untrusted data is proven before use.

ACCEPTANCE CRITERIA:
  - You can design discriminated unions with a common literal "tag"
  - You can narrow them exhaustively and prove exhaustiveness with `never`
  - You can write user-defined type guards (`x is T`) to validate `unknown` data
  - The compiler rejects code that forgets a case or uses unvalidated data
```

## 🏢 Business Context

The network boundary is where typed code meets the untyped world. JSON from an API is `unknown` until proven otherwise — but `as Order` *asserts* a type the compiler can't verify, so a changed or error payload sails through and crashes deep in the UI (you saw exactly this in Module 03's network lesson). Discriminated unions model "success or failure" precisely; type guards validate untrusted data *once, at the boundary*, so everything downstream is safe.

## 🎯 Learning Objectives

- Design **discriminated unions** (a shared literal `kind`/`status` tag)
- Narrow them with `switch`/`if` and enforce **exhaustiveness** via `never`
- Write **user-defined type guards** (`function isX(v): v is X`)
- Validate `unknown` data at the boundary instead of asserting with `as`

## 📚 Technical Deep Dive

**Discriminated (tagged) unions.** Each member carries a common literal property — the *discriminant* — that the compiler uses to narrow:

```ts
type ApiResponse<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; code: number; message: string };

function handle(res: ApiResponse<Order>): Order | null {
  switch (res.status) {
    case 'success': return res.data;            // narrowed: has `data`
    case 'error':   logError(res.code, res.message); return null;  // has `code`/`message`
  }
}
```

**Exhaustiveness with `never`.** Add a `default` that assigns to `never` — if a new variant is added later and unhandled, it won't be assignable to `never` and the compiler errors:

```ts
default: {
  const _exhaustive: never = res;   // ERROR if a case is unhandled
  return _exhaustive;
}
```

This turns "someone added a `'pending'` status and forgot to handle it" into a compile error — a quietly powerful safety net.

**`as` is an unchecked assertion — avoid it at boundaries.** `res.json() as Order` tells the compiler "trust me," disabling the very checking you want. The compiler now believes a claim nothing verified.

**User-defined type guards** validate at runtime *and* narrow at compile time:

```ts
function isOrder(v: unknown): v is Order {
  return typeof v === 'object' && v !== null
    && 'id' in v && typeof (v as Record<string, unknown>).id === 'string'
    && 'status' in v;   // ...check each required field
}

const json: unknown = await res.json();
if (isOrder(json)) {
  json.id;            // safe: narrowed to Order
} else {
  // handle invalid payload — no crash downstream
}
```

The `v is Order` **predicate** is what makes the guard narrow the type in the calling branch. Validate once at the boundary; trust the type everywhere after. (In production, schema validators like Zod generate these guards — but understanding the hand-written version is the point here.)

### Common gotchas
- Using `as` to silence the compiler at the network boundary — it reintroduces exactly the runtime crash you're trying to prevent.
- A discriminated union without a *literal* discriminant (so the compiler can't narrow on it).
- Forgetting the `never` exhaustiveness check, so a future variant slips through unhandled.
- A type guard that doesn't actually check every field it claims (the predicate lies).

## 🧪 Hands-on Labs

Work through **`labs/lab-05-guards-discriminated.md`**. You'll get code that does `await res.json() as Order` and crashes on an error payload. You'll model `ApiResponse<T>` as a discriminated union, handle it with an exhaustive `switch` (with a `never` check), and write an `isOrder` type guard to validate `unknown` JSON at the boundary — then prove the compiler rejects an unhandled case and unvalidated access.

## 🔍 Engineering Investigation

Reproduce the crash by feeding the error-shaped payload to the `as`-based code. Then, with the discriminated union, remove one `case` and record the `never` exhaustiveness error. Replace `as` with the type guard and show the compiler now requires the validation branch. The evidence chain: untrusted data → validated once → safe everywhere.

## 🤖 AI Engineering Exercise

Ask an AI to "parse this API response into an Order." **Verify** whether it uses `as` (unsafe) or an actual guard/validation, and run the error payload through it. **Log** whether the AI's version would crash on bad data and how the guard fixed it — the compiler and the bad-payload test are the arbiters.

## 📝 Assignment

Submit: the `ApiResponse<T>` discriminated union, the exhaustive handler with the `never` check, the `isOrder` guard, the reproduced crash from the `as` version, the compiler errors for an unhandled case and for unvalidated access, and a short note on why `as` is dangerous at boundaries.

## 🚀 Stretch Goal

Introduce a schema validation library (e.g. Zod) for one response, deriving the TypeScript type from the schema, and explain how it keeps the runtime check and the static type in sync automatically.

## ✅ Definition of Done

- [ ] Responses modeled as a discriminated union with a literal discriminant
- [ ] Handled exhaustively; a missing case is a compile error (via `never`)
- [ ] A working type guard validates `unknown` data at the boundary
- [ ] `as` removed at the boundary; unvalidated access rejected by the compiler

## 🪞 Reflection

You diagnosed an API error-handling bug in Module 03 — how would discriminated unions and guards have prevented it at compile time? Where else does your code currently trust data it hasn't validated?
