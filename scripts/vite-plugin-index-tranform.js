const transformIndexHtml = (code) => {
  return code.replace(/__INDEX__/, '/example/main.ts')
}

const demoIndexTransFormPlugin = {
  name: 'demo-transform',
  enforce: 'pre',
  // vite build is production will not invoke `transformIndexHtml`
  transform (code, id) {
    if (id.endsWith('.html')) {
      return { code: transformIndexHtml(code), map: null }
    }
  },
  transformIndexHtml
}

export default demoIndexTransFormPlugin
