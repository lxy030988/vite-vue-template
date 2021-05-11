import type { Plugin, App } from 'vue'
import VueEcharts from './vue3-echarts'
const install = (app: App) => {
  app.component(VueEcharts.name, VueEcharts)
}
VueEcharts.install = install
export default <Plugin>(VueEcharts as unknown)
