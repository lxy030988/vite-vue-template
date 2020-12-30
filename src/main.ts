import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '/@/plugins/'
import router from './router'

import './index.scss'
const app = createApp(App)
setupAntd(app)

app.use(router).mount('#app')
