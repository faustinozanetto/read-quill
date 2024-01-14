import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  esbuildOptions(esBuildOptions) {
    esBuildOptions.banner = {
      js: '"use client"',
    };
  },
  dts: true,
  minify: true,
  external: ['react'],
  format: ['esm', 'cjs'],
  sourcemap: true,
  clean: true,
  entry: ['src/index.tsx'],
  outDir: 'dist',
  ...options,
}));
