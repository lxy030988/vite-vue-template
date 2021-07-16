<template>
  <jc-filter @filter="goFilter" />
  <div>table</div>
  <!-- <jc-manage /> -->
  <!-- <jc-detail /> -->
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  name: 'AuthorizationManagementIndex',
  components: {
    JcFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    JcManage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    JcDetail: defineAsyncComponent(() => import('./modules/Detail/index.vue'))
  },
  setup() {
    const state = reactive({
      list: []
    })

    const goFilter = (v: any) => {
      console.log('goFilter', v)
    }

    return {
      ...toRefs(state),
      goFilter
    }
  }
})
</script>

<style scoped lang="scss">
</style>