import { describe, it, expect } from 'vitest';
import { formatId, applyDiscount, previewNote } from '../src/lesson04_uncertain';

describe('lesson 04 — unions & narrowing', () => {
  it('formatId uppercases string ids', () => {
    expect(formatId('ab12')).toBe('AB12');
  });
  it('formatId renders numeric ids as their digits', () => {
    expect(formatId(42)).toBe('42');
  });
  it('percent discount reduces by value%', () => {
    expect(applyDiscount(200, { kind: 'percent', value: 10 })).toBe(180);
  });
  it('flat discount subtracts the amount', () => {
    expect(applyDiscount(50, { kind: 'flat', amount: 12 })).toBe(38);
  });
  it('flat discount never goes below 0', () => {
    expect(applyDiscount(10, { kind: 'flat', amount: 99 })).toBe(0);
  });
  it('previewNote trims present notes', () => {
    expect(previewNote('  hello  ')).toBe('hello');
  });
  it('previewNote returns "No note" for null', () => {
    expect(previewNote(null)).toBe('No note');
  });
});
