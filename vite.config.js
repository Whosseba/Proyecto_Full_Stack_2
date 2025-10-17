import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // Simula el DOM en los tests
    globals: true,
    setupFiles: './src/setupTests.js'
  }
})
