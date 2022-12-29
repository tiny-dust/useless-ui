import { defineConfig } from 'vitest/config'
import createVitePlugin from './build/gen-vite-plugin.js'

export default defineConfig({
  root: __dirname,
  plugins: createVitePlugin(),
  test: {
    coverage: {
      reporter: ['text', 'json', 'html'],
      provider: 'istanbul' // or 'c8'
    }
  },
  server: {
    port: 5173
  }
})
