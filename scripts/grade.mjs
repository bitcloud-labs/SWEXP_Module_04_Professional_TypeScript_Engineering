#!/usr/bin/env node
/**
 * Forge SWEXP autograder (Module 04).
 * Runs the test suite (behaviour + type-level) and the strict type gate,
 * prints a per-lesson score, and writes a Markdown report for GitHub Actions.
 *
 * Exit 0 only when every test passes AND the project type-checks clean.
 * The tests are the spec — no answer keys are shipped.
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, appendFileSync, existsSync } from 'node:fs';

const REPORT = '.grade/vitest.json';
mkdirSync('.grade', { recursive: true });

const LESSONS = {
  lesson02: 'Lesson 02 — Domain modelling',
  lesson03: 'Lesson 03 — Generics & utility types',
  lesson04: 'Lesson 04 — Unions & narrowing',
  lesson05: 'Lesson 05 — Guards & discriminated unions',
};

function run(cmd) {
  try {
    return { ok: true, out: execSync(cmd, { stdio: ['ignore', 'pipe', 'pipe'] }).toString() };
  } catch (e) {
    return { ok: false, out: `${e.stdout ?? ''}${e.stderr ?? ''}` };
  }
}

// 1) Behaviour + type-level tests via vitest (JSON reporter).
run(`npx vitest run --typecheck --reporter=json --outputFile=${REPORT}`);
if (!existsSync(REPORT)) {
  console.error('Could not produce a test report. Run `npm install` first.');
  process.exit(2);
}
const report = JSON.parse(readFileSync(REPORT, 'utf8'));

// 2) Strict type gate (the compiler is your first reviewer).
const typeGate = run('npx tsc --noEmit -p tsconfig.json');

// Aggregate per lesson from each test file's results.
const tally = {};
for (const key of Object.keys(LESSONS)) tally[key] = { passed: 0, total: 0 };
for (const file of report.testResults ?? []) {
  const key = Object.keys(LESSONS).find((k) => file.name.includes(k));
  if (!key) continue;
  for (const a of file.assertionResults ?? []) {
    tally[key].total += 1;
    if (a.status === 'passed') tally[key].passed += 1;
  }
}

const passed = report.numPassedTests ?? 0;
const total = report.numTotalTests ?? 0;
const pct = total ? Math.round((passed / total) * 100) : 0;
const complete = passed === total && total > 0 && typeGate.ok;

const rows = Object.entries(LESSONS).map(([k, label]) => {
  const t = tally[k];
  const mark = t.total === 0 ? '—' : t.passed === t.total ? '✅' : '❌';
  return `| ${label} | ${t.passed}/${t.total} | ${mark} |`;
});

const md = [
  `## Forge SWEXP — Module 04 autograde`,
  ``,
  `**Score: ${passed}/${total} tests (${pct}%)**  ·  Strict type-check: ${typeGate.ok ? '✅ clean' : '❌ errors'}`,
  ``,
  `| Lesson | Tests | Status |`,
  `| --- | --- | --- |`,
  ...rows,
  ``,
  complete
    ? `🎉 **All exercises complete and the project type-checks clean.**`
    : `Keep going — implement the \`// TODO\`s in \`src/\` until every test is green and \`npm run check\` passes. The tests in \`tests/\` are the spec.`,
].join('\n');

writeFileSync('grade-report.md', md + '\n');
console.log('\n' + md + '\n');

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, md + '\n');
}

process.exit(complete ? 0 : 1);
