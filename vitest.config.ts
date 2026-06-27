import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    // Type-level assertions (expectTypeOf) live in tests/**/*.test-d.ts and run
    // when invoked with --typecheck (npm run test:types / npm run grade).
    typecheck: {
      enabled: false,
      include: ['tests/**/*.test-d.ts'],
      tsconfig: 'tsconfig.json',
    },
  },
});
