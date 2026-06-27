/**
 * Lesson 05 — Safely Interpret API Responses (Ticket GUARD-3010)
 * Companion: Lesson_05.md · labs/lab-05-guards-discriminated.md
 *
 * Replace `json as Order` (a lie the compiler believes) with a discriminated
 * union, exhaustive handling, and a boundary type guard that PROVES untrusted
 * data before you trust it. No `any`, no `as`.
 */

export interface Order {
  id: string;
  status: 'placed' | 'paid' | 'shipped';
  total: number;
}

/** A response is a success carrying data, or an error carrying a code + message. */
export type ApiResponse =
  | { status: 'success'; data: Order }
  | { status: 'error'; code: number; message: string };

/** Reduce a response to its Order, or null on error. Handle every variant. */
export function handle(res: ApiResponse): Order | null {
  // TODO: switch on res.status; in the default branch add an exhaustiveness
  // check: `const _exhaustive: never = res; return _exhaustive;`
  return null;
}

/** Type guard: prove an unknown value really is an Order before trusting it. */
export function isOrder(v: unknown): v is Order {
  // TODO: check object & non-null, string `id`, valid `status`, number `total`.
  return false;
}

/** Safe boundary parse: return the Order only if it passes the guard. */
export function parseSafe(json: unknown): Order | null {
  return isOrder(json) ? json : null;
}
