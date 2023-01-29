import App from './App.vue'
import { createApp } from 'vue'
import setupRouter from './routes/router'
import { installDemoComponents } from './setup'
import './styles/demo.css'
import setupNaive from './components/naive'
import setupUseless from './components/useless'
import { setupStore } from './store'
import 'useless-ui/dist/index.css'

const app = createApp(App)

setupStore(app)

setupRouter(app)

setupNaive(app)

setupUseless(app)

installDemoComponents(app)

app.mount('#app')
