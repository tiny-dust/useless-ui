const createVuePlugin = require('@vitejs/plugin-vue')
import vueJsx from '@vitejs/plugin-vue-jsx';

const vuePlugin = createVuePlugin({
  include: [/\.vue$/, /\.md$/, /\.tsx$/]
})

const createDemoPlugin = () => {
  console.log('%c [ vite plugin ]: ', 'color: #bf2c9f; background: pink; font-size: 13px;', vuePlugin,vueJsx)
  return [vueJsx]
}

module.exports = createDemoPlugin
