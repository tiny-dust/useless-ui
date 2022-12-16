import vueJsx from '@vitejs/plugin-vue-jsx'
const createVuePlugin = require('@vitejs/plugin-vue')

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/, /\.tsx$/]
})

const createDemoPlugin = () => {
  return [vuePlugin(), vueJsx]
}

module.exports = createDemoPlugin
