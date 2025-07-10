// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  logLevel: 'info',
  plugins: [
    react(),
    federation({
      remotes: {
        // We'll update this URL after the remote is set up
        accessReport: "http://localhost:5174/remoteEntry.js",
      },
      shared: ['react', 'react-dom'],
    }),
  ],
})
console.log('Vite config loaded with federation plugin');