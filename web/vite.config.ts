import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dynamicImport from 'vite-plugin-dynamic-import';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), dynamicImport()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: '../server/dist/web',
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
