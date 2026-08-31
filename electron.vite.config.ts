import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    ssr: true,
    target: 'node22',
    outDir: 'dist-electron',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'electron/main.ts'),
        preload: path.resolve(__dirname, 'electron/preload.ts'),
      },
      output: {
        format: 'es',
        entryFileNames: '[name].js',
      },
      external: ['electron'],
    },
  },
});