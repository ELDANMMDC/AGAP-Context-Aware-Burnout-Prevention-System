import { defineConfig } from 'vite';
import path from 'node:path';

export default defineConfig({
  build: {
    ssr: true,
    target: 'node22',
    outDir: 'dist-electron',
    emptyOutDir: false,
    rollupOptions: {
      input: path.resolve(__dirname, 'electron/preload.ts'),
      output: {
        entryFileNames: 'preload.cjs',
        format: 'cjs',
      },
      external: ['electron'],
    },
  },
});