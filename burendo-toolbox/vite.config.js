import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    target: 'esnext',
    modulePreload: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    react(),
    federation({
      name: 'toolbox',
      remotes: {
        accessReport: 'accessReport@/apps/door-access/remoteEntry.js',
      },
      shared: ['react', 'react-dom'],
    }),
  ],
});
