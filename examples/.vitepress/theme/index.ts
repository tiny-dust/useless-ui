import UselessUI from '../../../packages'
import defaultTheme from 'vitepress/theme'
import './index.css'

export default {
  ...defaultTheme,
  enhanceApp ( { app } ) {
    app.use(UselessUI)
  }
}
