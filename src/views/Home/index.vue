<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <img alt="Vue logo" src="../../assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea></Messagea>
  <div class="jc-svg-icon">
    <div>图标测试</div>
    <svg-icon name="qingsaoche-3"></svg-icon>
    <svg-icon name="sun"></svg-icon>
    <svg-icon name="moon"></svg-icon>
    <hr />
    <svg-icon name="test2-dynamic-avatar-2"></svg-icon>
    <svg-icon name="test2-dynamic-avatar-3"></svg-icon>
    <hr />
    <svg-icon name="test1-dynamic-avatar-1"></svg-icon>
    <hr />
    <svg-icon name="test1-test11-download-count"></svg-icon>
    <div class="echarts">
      <vue-echarts :options="options"></vue-echarts>
    </div>
    <div>
      <a-button type="primary" @click="test">测试</a-button>
    </div>
  </div>
</template>

<script lang="ts">
import HelloWorld from '@/components/HelloWorld.vue'
import Messagea from '@/components/Messagea.vue'
import { computed, defineComponent, ref } from 'vue'

// import { GlobleState } from '@/store'
// import { useStore } from 'vuex'
import { useMyStore } from '@/hooks/use-store'

import VueEcharts, { OptionType } from '@/components/echarts/vue3-echarts'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    Messagea,
    VueEcharts
  },
  setup() {
    // console.log(import.meta.env.VITE_BASE_URL)
    // const store = useStore<GlobleState>()
    // console.log(store.state.home.name)

    const { state, getters } = useMyStore()
    console.log('vuex state', state.user.loading)
    console.log('getters', getters['user/isLogin'])
    const installData = ref([120, 200, 150, 80, 70, 110, 130])
    const options = computed(
      (): OptionType => ({
        // tooltip: {},
        color: ['red', '#006cff'],
        // legend: {},
        title: {
          text: '柱状图',
          borderWidth: 1,
          borderType: 'solid'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: installData.value,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      })
    )

    function test() {
      console.log('test')
      installData.value = [80, 70, 110, 130, 120, 200, 150]
    }
    return { options, test }
  }
})
</script>
<style lang="scss" scoped>
.jc-svg-icon {
  color: red;
}
.echarts {
  width: 300px;
  height: 200px;
}
</style>
