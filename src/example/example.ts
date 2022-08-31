import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Example from './Example.vue'

import './index.css'

const app = createApp(Example)

app.use(createPinia())

app.mount('#app')
