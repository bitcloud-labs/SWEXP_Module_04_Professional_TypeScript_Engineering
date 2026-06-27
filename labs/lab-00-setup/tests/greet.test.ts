import { describe, it, expect } from 'vitest';
import { greet } from '../src/greet';

describe('lab 00 — setup', () => {
  it('greets with an uppercased name', () => {
    expect(greet('forge')).toBe('Hi, FORGE');
  });
  it('works for any name', () => {
    expect(greet('Ada')).toBe('Hi, ADA');
  });
});
