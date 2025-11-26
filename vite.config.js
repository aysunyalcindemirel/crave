import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Use '/' for local development, and '/crave/' for production deployment
  base: command === 'serve' ? '/' : '/crave/',
}))
