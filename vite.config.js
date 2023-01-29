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
              find: 'useless-ui',
              replacement: path.resolve(__dirname, './packages')
            },
            {
              find: 'useless-ui/hooks',
              replacement: path.resolve(__dirname, './packages/hooks.ts')
            }
          ]
        : undefined
  },
  define: {
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    __DEV__: process.env.NODE_ENV !== 'production'
  },
  optimizeDeps: {
    include: [
      'highlight.js',
      'vooks',
      'vue',
      'vue-router',
      'codesandbox/lib/api/define',
      'highlight.js/lib/core',
      'highlight.js/lib/languages/javascript',
      'highlight.js/lib/languages/python',
      'highlight.js/lib/languages/cpp',
      'highlight.js/lib/languages/xml',
      '@vicons/ionicons5',
      '@vicons/ionicons4',
      '@vicons/fluent/Compose16Regular.js'
    ],
    exclude: ['__INDEX__']
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
