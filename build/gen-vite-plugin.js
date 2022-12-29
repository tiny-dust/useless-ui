import createVuePlugin from '@vitejs/plugin-vue'
import Inspect from 'vite-plugin-inspect'
import mdToVue from './md-to-vue'

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/]
})

const fileRegex = /\.(md|vue)$/

const createVitePlugin = () => {
  const mdPlugin = {
    name: 'vite-plugin-md',
    transform (code, id) {
      if (fileRegex.test(id)) {
        return mdToVue(id)
      }
    },
    async handleHotUpdate ({ file, server }) {
      console.log(file, server)
    }
  }
  return [mdPlugin, vuePlugin, Inspect()]
}

module.exports = createVitePlugin
