import { defineComponent, h, Ref, ref, toRefs, PropType, watch, onMounted, onUnmounted } from 'vue'

import * as echarts from 'echarts/core'

import {
  PieChart,
  BarChart,
  LineChart,
  GaugeChart,
  PictorialBarChart,
  ScatterChart,
  EffectScatterChart,
  //不常用
  // ParallelChart,
  // MapChart,
  // BoxplotChart,
  // LinesChart,
  // RadarChart,
  // SankeyChart,
  // SunburstChart,
  // ThemeRiverChart,
  // CandlestickChart,
  // TreeChart,
  // TreemapChart,
  // CustomChart,
  // FunnelChart,
  // GraphChart,
  // HeatmapChart,
  // 系列类型的定义后缀都为 SeriesOption
  PieSeriesOption,
  BarSeriesOption,
  LineSeriesOption,
  GaugeSeriesOption,
  PictorialBarSeriesOption,
  ScatterSeriesOption,
  EffectScatterSeriesOption
} from 'echarts/charts'

import {
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  LegendComponentOption,
  GridComponentOption,
  TooltipComponentOption
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
export type ECOption = echarts.ComposeOption<TitleComponentOption | GridComponentOption | TooltipComponentOption | LegendComponentOption | PieSeriesOption | BarSeriesOption | LineSeriesOption | GaugeSeriesOption | PictorialBarSeriesOption | ScatterSeriesOption | EffectScatterSeriesOption>

// 注册必须的组件
echarts.use([CanvasRenderer, TitleComponent, LegendComponent, TooltipComponent, GridComponent, PieChart, BarChart, LineChart, GaugeChart, PictorialBarChart, ScatterChart, EffectScatterChart])

export default defineComponent({
  name: 'VueEcharts',
  props: {
    options: {
      type: Object as PropType<ECOption>,
      required: true
    }
  },
  setup(props, { emit }) {
    const chartRef = ref<null | HTMLElement>(null)
    const { options } = toRefs(props)

    let mychart: echarts.ECharts

    function resize() {
      console.log('chart size Change')
      if (mychart) {
        mychart.resize()
      }
    }

    if (options.value) {
      watch(
        options,
        newValue => {
          if (mychart) {
            // console.log('watch options', newValue)
            mychart.setOption(newValue)
            emit('updated')
          }
        },
        {
          deep: true
        }
      )

      onMounted(() => {
        mychart = echarts.init(chartRef.value as HTMLElement)
        mychart.setOption(options.value)
        emit('rendered')
      })

      onUnmounted(() => {
        if (mychart) {
          mychart.clear()
          mychart.dispose()
        }
        emit('destroyed')
      })
    } else {
      console.error('请传递渲染函数组件必须的参数')
    }
    return {
      chartRef
    }
  },
  render() {
    return h('div', {
      class: 'vue-echarts',
      ref: 'chartRef',
      style: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }
    })
  }
})
