<template>
  <div class="plan">plan</div>
  <div class="plan2">plan</div>
  <!-- <img alt="Vue logo" src="@/assets/logo.png" /> -->
  <!-- <test-setup></test-setup> -->
  <my-count :init-value="1"></my-count>
</template>

<script lang="ts">
//setup
// import { defineAsyncComponent } from 'vue'
// const TestSetup = defineAsyncComponent(() => import('@/components/testSetup.vue'))
// import TestSetup from '@/components/testSetup.vue'

import { defineComponent } from 'vue'
import myCount from './count'
export default defineComponent({
  name: 'Plan',
  components: {
    myCount
  }
})
</script>

<style lang="scss" scoped>
.plan {
  color: $green;
}
.plan2 {
  color: $green1;
}
</style>
