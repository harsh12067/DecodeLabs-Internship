import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/__tests__/setup.jsx'],
    css: false,
    // Only collect tests from src — exclude Netlify serverless functions
    include: ['src/__tests__/**/*.{test,spec}.{js,jsx}'],
    exclude: ['netlify/**', 'node_modules/**', 'dist/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/components/**', 'src/data/**'],
      exclude: ['src/__tests__/**', 'node_modules/**', 'netlify/**'],
      thresholds: {
        statements: 50,
        branches: 40,
        functions: 50,
        lines: 50,
      },
    },
  },
});
