# Lab 06 — Configure the Engineering Standard (Loose vs Strict)

**Lesson:** 06 · **Goal:** prove a loose `tsconfig` lets real bugs through, then turn on strict mode and resolve what it surfaces.

## Goal
Run the *same* buggy code under a loose config (passes) and a strict config (catches the bugs), then fix them properly — no `any` escape hatch.

## Setup
```bash
mkdir -p /tmp/swexp-l06 && cd /tmp/swexp-l06

# LOOSE config — the kind that makes "it compiles" meaningless
cat > tsconfig.loose.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": false, "noImplicitAny": false, "strictNullChecks": false,
  "noEmit": true, "skipLibCheck": true }, "include": ["app.ts"] }
JSON

# STRICT config — the team standard
cat > tsconfig.strict.json <<'JSON'
{ "compilerOptions": { "target": "ES2022", "module": "ESNext", "moduleResolution": "bundler",
  "strict": true, "noUncheckedIndexedAccess": true,
  "noEmit": true, "skipLibCheck": true }, "include": ["app.ts"] }
JSON

cat > app.ts <<'TS'
// Three real bugs that a LOOSE config happily accepts.

// (1) implicit any: `user` has no type, so `.nmae` typo is not caught
function greet(user) {
  return 'Hi ' + user.nmae;          // typo: nmae (should be name)
}

// (2) unchecked null: find may return undefined; loose config ignores it
function firstAdminEmail(users: { name: string; role: string; email: string }[]) {
  const admin = users.find(u => u.role === 'admin');
  return admin.email;                 // admin may be undefined
}

// (3) unchecked index access: out-of-range read is `undefined` at runtime
function thirdName(names: string[]) {
  const n = names[2];
  return n.toUpperCase();             // names[2] may be undefined
}

console.log(greet({ name: 'Ada' }), firstAdminEmail([]), thirdName(['a']));
TS

echo "--- LOOSE config (expect: passes despite the bugs) ---"
tsc --noEmit -p tsconfig.loose.json; echo "loose exit=$?"
echo "--- STRICT config (expect: catches all three) ---"
tsc --noEmit -p tsconfig.strict.json; echo "strict exit=$?"
```

## Tasks
1. **See the gap.** Loose config exits 0 (no complaints). Strict config flags: the implicit-`any` param (which hides the `.nmae` typo), the possibly-`undefined` `admin`, and the possibly-`undefined` `names[2]`. Record each error and the flag responsible (`noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`).
2. **Fix properly — no `any`:**
   - Type `greet`'s param (`user: { name: string }`) so the typo `.nmae` becomes an error, then fix the typo.
   - Handle the `undefined` admin (return `admin?.email ?? null`, widen the return type).
   - Handle the possibly-undefined index (`names[2] ?? ''`, or guard).
3. **Re-check under strict** until clean. Confirm the loose config still passes too (it always did — that's the point).
4. **Reflect on the standard.** Note which flag caught which bug and why "it compiles" now means something.

## Deliverable
Both configs; the loose-passes / strict-fails output on the same code; each strict error mapped to its flag and the real bug; the proper fixes (no `any`); and the clean strict check. Add a note on the highest-value flag and the bug class it eliminates.

## Cleanup
```bash
rm -rf /tmp/swexp-l06
```

## Check
`../solutions/lab-06-solution.md`.
