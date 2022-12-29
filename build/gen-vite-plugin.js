import createVuePlugin from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const fileRegex = /\.(md|vue)$/

const createVitePlugin = () => {
  const mdPlugin = {
    name: 'vite-plugin-md',
    transform (code, id) {
      if (fileRegex.test(id)) {
        return ''
      }
    },
    async handleHotUpdate ({ file, server }) {
      console.log(
        '%c [ file, server ]-20',
        'font-size:13px; background:#90189b; color:#d45cdf;',
        file,
        server
      )
    }
  }
  return [mdPlugin, vuePlugin, Inspect()]
}

module.exports = createVitePlugin
