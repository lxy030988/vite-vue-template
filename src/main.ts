import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '/@/plugins/'
import router from './router'
import store from './store'

import './index.scss' //引入通用样式
const app = createApp(App)
setupAntd(app)

app.use(store).use(router).mount('#app')
