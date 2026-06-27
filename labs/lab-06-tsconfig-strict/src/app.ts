/**
 * Lab 06 — Loose vs Strict. See README.md.
 * Three real bugs. They PASS under tsconfig.loose.json and FAIL under tsconfig.strict.json.
 * Fix each at the cause — no `any`, no `as`.
 */

// BUG 1 (noImplicitAny): `user` has no type, so the `.nmae` typo is invisible.
// Annotate the param `(user: { name: string })` so the typo becomes an error, then fix it.
export function greet(user): string {
  return 'Hi ' + user.nmae;
}

export function firstAdminEmail(
  users: { name: string; role: string; email: string }[],
): string | null {
  const admin = users.find((u) => u.role === 'admin');
  // BUG 2 (strictNullChecks): admin may be undefined. Return admin?.email ?? null.
  return admin.email;
}

export function thirdName(names: string[]): string {
  const n = names[2];
  // BUG 3 (noUncheckedIndexedAccess): names[2] may be undefined. Guard it (?? '').
  return n.toUpperCase();
}
