import App from './App.vue'
import { createApp } from 'vue'
import setupRouter from './routes/router'
import { installDemoComponents } from './setup'
import './styles/demo.css'
import setupNaive from './components/naive'
import setupUseless from './components/useless'

const app = createApp(App)

setupRouter(app)

setupNaive(app)

setupUseless(app)

installDemoComponents(app)

app.mount('#app')
