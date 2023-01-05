import path from 'path'
import { defineConfig } from 'vitest/config'
import createVitePlugin from './scripts/vite-plugin.js'

export default defineConfig({
  root: __dirname,
  plugins: createVitePlugin(),
  resolve: {
    alias:
      process.env.NODE_ENV !== 'production'
        ? [
            {
              find: '@useless/ui',
              replacement: path.resolve(__dirname, './packages')
            }
          ]
        : undefined
  },
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
