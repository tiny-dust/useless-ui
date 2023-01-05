import { createApp } from 'vue'
import setupRouter from './routes/router.js'
import 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import './styles/demo.css'

import App from './App.vue'
const app = createApp(App)

setupRouter(app)

app.mount('#app')
