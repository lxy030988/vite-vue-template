import { createApp } from 'vue'
import App from './App.vue'
import { setupAntd } from '@/plugins/'
import router from './router'
import store from './store'

// import vm from 'virtual-module'
// console.log(vm)

import './index.scss' //引入通用样式

import 'vite-plugin-svg-icons/register'
import SvgIcon from '@/components/Icon/index.vue'

const app = createApp(App)
setupAntd(app)

// import VueEcharts from './components/echarts'
// app.use(VueEcharts)

app.component('SvgIcon', SvgIcon).use(store).use(router).mount('#app')
