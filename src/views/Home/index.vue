<template>
  <div></div>
  <!-- <img alt="Vue logo" src="@/assets/logo.png">
  <img alt="Vue logo" src="../../assets/logo.png">
  <img src="@/assets/icons/home.svg" alt="" style="width: 20px">
  <div>
    <a-button type="primary" @click="testVuex">
      测试Vuex
    </a-button>
  </div>
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <HelloWorld msg="Hello Vue 3.0 + Vite1" />
  <Messagea />
  <div class="jc-svg-icon assd  s s s s ">
    <div>图标测试</div>
    <svg-icon name="home" />
    <svg-icon name="setting" />
    <div class="echarts">
      <vue-echarts :options="options" />
    </div>
    <div>
      <a-button type="primary" @click="test">
        测试
      </a-button>
    </div>
  </div> -->
</template>

<script lang="ts">
// import HelloWorld from '@/components/HelloWorld.vue'
// import Messagea from '@/components/Messagea.vue'
import { computed, defineComponent, ref } from 'vue'

// // import { GlobleState } from '@/store'
// // import { useStore } from 'vuex'
// import { useMyStore } from '@/hooks'

import VueEcharts, { EChartsOption } from '@/components/echarts'

export default defineComponent({
  name: 'Home',
  // components: {
  //   HelloWorld,
  //   Messagea,
  //   VueEcharts
  // },
  setup() {
    // console.log(import.meta.env.VITE_BASE_URL)
    // const store = useStore<GlobleState>()
    // console.log(store.state.home.name)
    // const { state, getters, commit, dispatch } = useMyStore()
    // console.log('vuex state', state.user.loading)
    // console.log('getters', getters['user/isLogin'])
    const installData = ref([120, 200, 150, 80, 70, 110, 130])
    const options = computed(
      (): EChartsOption => ({
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
    // function test() {
    //   console.log('test')
    //   installData.value = [80, 70, 110, 130, 120, 200, 150]
    // }
    // function testVuex() {
    //   console.log('testVuex')
    //   // commit('user/GET_DATA', false)
    //   dispatch('user/GET_DATA', false)
    //   console.log('vuex state', state.user.loading)
    //   setTimeout(() => {
    //     console.log('vuex state', state.user.loading)
    //   }, 3000)
    // }
    // return { options, test, testVuex }
  }
})
</script>
<style lang="scss" scoped>
// .jc-svg-icon {
//   color: red;
// }
// .echarts {
//   width: 300px;
//   height: 200px;
// }
// ::v-deep(.deep-test) {
//   color: red;
//   .c1 {
//     color: wheat;
//   }
// }
</style>
