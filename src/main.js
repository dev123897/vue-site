import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.config.errorHandler = console.error

app.use(pinia)
app.use(router)

app.mount('#app')
