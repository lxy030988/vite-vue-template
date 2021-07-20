<template>
  <jc-filter @filter="goFilter" />
  <a-card class="jc-mt" title="列表内容" :bordered="false">
    <template #extra>
      <a-button type="primary" @click="magage">添加授权</a-button>
    </template>
    <a-table :data-source="list" :columns="columns" :pagination="false">
      <template #operation="{ record }">
        <a-button type="link" title="详情" @click="showDetail(record)">
          <template #icon>
            <InfoCircleOutlined />
          </template>
        </a-button>
        <a-button type="link" title="编辑">
          <template #icon>
            <FormOutlined />
          </template>
        </a-button>
        <a-popconfirm title="Sure to delete?" @confirm="onDelete(record)">
          <a-button type="link" title="删除">
            <template #icon>
              <DeleteOutlined />
            </template>
          </a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <jc-pagination :pages="pages" @currentChange="currentChange" @sizeChange="sizeChange" />
  </a-card>
  <jc-manage v-model:visible="visible" />
  <jc-detail :id="detailId" v-model:visible="detailVisible" />
</template>

<script lang="ts">
import { usePage } from '@/hooks'
import {
  defineAsyncComponent,
  defineComponent,
  reactive,
  ref,
  toRaw,
  toRefs
} from 'vue'

import {
  DeleteOutlined,
  FormOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'

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
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

export default defineComponent({
  name: 'AuthorizationManagementIndex',
  components: {
    DeleteOutlined,
    FormOutlined,
    InfoCircleOutlined,
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
    let visible = ref(false)
    let detailVisible = ref(false)
    let detailId = ref('')

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

    const showDetail = (record: any) => {
      console.log('record', record.key)
      detailId.value = record.key
      detailVisible.value = true
    }
    const onDelete = (record: any) => {
      console.log('record', record.key)
    }

    return {
      columns,
      pages,
      currentChange,
      sizeChange,
      ...toRefs(state),
      visible,
      detailVisible,
      goFilter,
      magage,
      onDelete,
      showDetail,
      detailId
    }
  }
})
</script>

<style scoped lang="scss">
</style>