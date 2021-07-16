<template>
  <jc-filter @filter="goFilter" />
  <a-card class="jc-mt" title="列表内容" :bordered="false">
    <template #extra>
      <a-button type="primary">添加授权</a-button>
    </template>
    <a-table :data-source="list" :columns="columns" :pagination="false" />
    <a-pagination v-model:current="currentPage" v-model:pageSize="pageSize" show-quick-jumper show-size-changer :total="100" @showSizeChange="changeSize" @change="changePage" />
  </a-card>
  <!-- <jc-manage /> -->
  <!-- <jc-detail /> -->
</template>

<script lang="ts">
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
    JcFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    JcManage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    JcDetail: defineAsyncComponent(() => import('./modules/Detail/index.vue'))
  },
  setup() {
    const state = reactive({
      list: [
        {
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
        },
        {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
        }
      ]
    })

    const pageSize = ref(10)
    const currentPage = ref(1)

    const goFilter = (v: any) => {
      console.log('goFilter', v)
    }

    const changePage = (page: number, pageSize: number) => {
      console.log(page, pageSize)
    }
    const changeSize = (current: number, pageSize: number) => {
      console.log(current, pageSize)
    }

    return {
      columns,
      pageSize,
      currentPage,
      ...toRefs(state),
      goFilter,
      changePage,
      changeSize
    }
  }
})
</script>

<style scoped lang="scss">
</style>