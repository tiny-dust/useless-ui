import { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

const setupRouter = (app: App): void => {
  app.use(router)
}

export default setupRouter
