<template>
  <jc-filter @filter="goFilter" />
  <a-card class="jc-mt" title="列表内容" :bordered="false">
    <template #extra>
      <a-button type="primary" @click="magage">添加授权</a-button>
    </template>
    <a-table :data-source="list" :columns="columns" :pagination="false" />
    <jc-pagination :pages="pages" @currentChange="currentChange" @sizeChange="sizeChange" />
  </a-card>
  <jc-manage v-model:visible="visible" />
  <!-- <jc-detail /> -->
</template>

<script lang="ts">
import { usePage } from '@/hooks'
import {
  defineAsyncComponent,
  defineComponent,
  reactive,
  ref,
  toRefs
} from 'vue'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
]

export default defineComponent({
  name: 'AuthorizationManagementIndex',
  components: {
    JcPagination: defineAsyncComponent(
      () => import('@/components/pagination/index.vue')
    ),
    JcFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    JcManage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    JcDetail: defineAsyncComponent(() => import('./modules/Detail/index.vue'))
  },
  setup() {
    const state = reactive({
      list: [
        {
          key: 0,
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        }
      ]
    })
    const visible = ref(false)

    const initData = () => {
      console.log('initData')
      for (let index = 1; index < 10; index++) {
        state.list.push({
          key: index,
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        })
      }
      pages.total = 100
    }

    const { pages, currentChange, sizeChange } = usePage(initData)

    const goFilter = (v: any) => {
      console.log('goFilter', v)
      currentChange(1)
    }

    initData()

    const magage = () => {
      visible.value = true
    }

    return {
      columns,
      pages,
      currentChange,
      sizeChange,
      ...toRefs(state),
      visible,
      goFilter,
      magage
    }
  }
})
</script>

<style scoped lang="scss">
</style>