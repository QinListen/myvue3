import './assets/main.css'

import { createApp } from 'vue'
// 引入pinia,他取代了vuex
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
createApp(App).use(pinia).mount('#app')
