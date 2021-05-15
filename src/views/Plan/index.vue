<template>
  <div class="plan">plan</div>
  <div class="plan2">plan</div>
  <div class="plan3">plan</div>
  <a-button type="primary" @click="test">测试</a-button>
  <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
  <test-setup></test-setup>
  <my-count :init-value="1"></my-count>
</template>

<script lang="ts">
//setup
// import { defineAsyncComponent } from 'vue'
// const TestSetup = defineAsyncComponent(() => import('@/components/testSetup.vue'))
import TestSetup from '@/components/testSetup.vue'

import { defineComponent, reactive, ref } from 'vue'
import myCount from './count'
export default defineComponent({
  name: 'Plan',
  components: {
    myCount,
    TestSetup
  },
  setup() {
    const color = ref('red')
    const font = reactive({ size: '30px' })

    function test() {
      console.log('test')
      color.value = 'green'
      font.size = '18px'
    }
    return { color, font, test }
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
