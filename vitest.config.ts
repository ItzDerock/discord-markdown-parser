import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['./tests/**/*.test.ts'],
    coverage: {
      enabled: true,
      reporter: ['text', 'lcov', 'clover'],
      include: ['src'],
    },
  },
});
