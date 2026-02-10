import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  target: 'es2020',
  outExtension: ({ format }) => {
    return format === 'esm' ? { js: '.js' } : { js: '.cjs' };
  },
  esbuildOptions(options) {
    options.jsx = 'automatic';
  },
  external: ['react'],
  noExternal: ['@hyphen/browser-sdk'],
});
