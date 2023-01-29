import useless from 'useless-ui'
import { App } from 'vue'

const setupUseless = (app: App): void => {
  app.use(useless)
}

export default setupUseless
