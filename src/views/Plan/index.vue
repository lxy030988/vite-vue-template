<template>
  <div class="plan">plan</div>
  <div class="plan2">plan</div>
  <div class="plan3">plan</div>
  <div>color--{{ color }}</div>
  <div>size--{{ size }}</div>
  <a-button type="primary" @click="test">测试</a-button>
  <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
  <test-setup ref="ref1" msg="xxx" :more="{ name: 'l', age: 11 }"></test-setup>
  <my-count :init-value="1"></my-count>
</template>

<script lang="ts">
//setup
// import { defineAsyncComponent } from 'vue'
// const TestSetup = defineAsyncComponent(() => import('@/components/testSetup.vue'))
import TestSetup from '@/components/testSetup.vue'

import { defineComponent, inject, onMounted, reactive, Ref, ref, toRefs, watch, watchEffect } from 'vue'
import myCount from './count'
export default defineComponent({
  name: 'Plan',
  components: {
    myCount,
    TestSetup
  },
  setup() {
    const name = inject('name', 'lxy0')
    const color = ref('red')
    const font = reactive({ size: '30px' })

    function test() {
      console.log('test')
      color.value = 'green'
      font.size = '18px'
    }
    // watch

    // watchEffect 和 watch的不同
    /**
     *1.不需要手动传入依赖
     2.不是lazy初始化执行分析依赖
     3.无法获取原始值
     4.一些异步操作放里面更加的合适
     5.wacth第三个参数处理副作用的第一个参数
     */
    const eff = watchEffect(
      cb => {
        // (name as  Ref<string>).value
        console.log('watchEffect', (name as unknown as Ref<string>).value)
        cb(() => {
          //清除副作用
          console.log('cb')
        })
      },
      {
        onTrigger() {
          console.log('onTrigger')
        }
      }
    )
    // eff()//停止副作用

    const ref1 = ref(null)
    onMounted(() => {
      console.log('onMounted')
      console.log('ref1', ref1.value)
      // ref1.value!.test()
      ;(ref1.value as any).test()
    })
    return { color, font, test, ...toRefs(font), ref1 }
  }
})
</script>

<style lang="scss" scoped>
.plan {
  // color: $green;
  color: var(--color);
}
.plan2 {
  color: $green1;
}
.plan3 {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
