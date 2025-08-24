// vite.config.js (or vite.config.ts)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080', // your Spring Boot dev server
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
