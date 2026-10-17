import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
export default defineConfig([
  ...nextVitals,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'max-lines-per-function': ['error', { max: 40, skipBlankLines: true, skipComments: true }],
    },
  },
  {
    files: ['src/components/**/*.tsx'],
    rules: { 'max-lines': ['error', { max: 150, skipBlankLines: true, skipComments: true }] },
  },
  {
    files: ['src/stores/*.ts'],
    rules: { 'max-lines': ['error', { max: 120, skipBlankLines: true, skipComments: true }] },
  },
  ...nextTypescript,
  globalIgnores(['.next/**', 'node_modules/**', 'test-results/**', 'playwright-report/**']),
  {
    files: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': ['error', { patterns: ['@/server', '@/server/*'] }],
    },
  },
  {
    files: ['src/server/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            '@/components',
            '@/components/*',
            '@/hooks',
            '@/hooks/*',
            '@/stores',
            '@/stores/*',
          ],
        },
      ],
    },
  },
  {
    files: ['src/lib/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        { patterns: ['@/components*', '@/hooks*', '@/stores*', '@/server*', '@/api*'] },
      ],
    },
  },
]);
