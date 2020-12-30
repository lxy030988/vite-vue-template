import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '/@/plugins/'

import './index.scss'
const app = createApp(App)
setupAntd(app)

app.mount('#app')
