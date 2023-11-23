import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        // target: 'https://mispagos.3.us-1.fl0.io',
        changeOrigin: true,
      }
    }
  }
})