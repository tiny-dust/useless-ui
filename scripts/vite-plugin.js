import createVuePlugin from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import vueJsx from '@vitejs/plugin-vue-jsx'
import getTransformedVueSrc from './transformed-vue-src'

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const fileRegex = /\.(md|vue)$/

const createVitePlugin = () => {
  const mdPlugin = {
    name: 'vite-plugin-md',
    transform (code, path) {
      if (fileRegex.test(path)) {
        return getTransformedVueSrc(code, path)
      }
    },
    async handleHotUpdate ({ file, server }) {
      console.log(file)
    }
  }
  return [mdPlugin, vuePlugin, vueJsx(), Inspect()]
}

export default createVitePlugin
