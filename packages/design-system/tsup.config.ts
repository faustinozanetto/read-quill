import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['src/**/*.tsx'],
  format: ['esm'],
  esbuildOptions(esBuildOptions) {
    esBuildOptions.banner = {
      js: '"use client"',
    };
  },
  dts: true,
  minify: true,
  external: ['react'],
  ...options,
}));
