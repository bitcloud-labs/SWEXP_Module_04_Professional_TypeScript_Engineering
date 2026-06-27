import { describe, it, expect } from 'vitest';
import { greet, firstAdminEmail, thirdName } from '../src/app';

describe('lab 06 — strict config catches real bugs', () => {
  it('greet uses the correct property', () => {
    expect(greet({ name: 'Ada' })).toBe('Hi Ada');
  });
  it('firstAdminEmail returns null when there is no admin', () => {
    expect(firstAdminEmail([])).toBeNull();
  });
  it('firstAdminEmail returns the admin email when present', () => {
    const users = [
      { name: 'Ada', role: 'admin', email: 'ada@forge.io' },
      { name: 'Bo', role: 'user', email: 'bo@forge.io' },
    ];
    expect(firstAdminEmail(users)).toBe('ada@forge.io');
  });
  it('thirdName uppercases the third name', () => {
    expect(thirdName(['a', 'b', 'c'])).toBe('C');
  });
  it('thirdName handles a short list without crashing', () => {
    expect(thirdName(['a'])).toBe('');
  });
});
