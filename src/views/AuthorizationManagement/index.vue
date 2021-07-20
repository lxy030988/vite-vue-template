<template>
  <div v-show="!deviceListVisible">
    <jc-filter @filter="goFilter" />
    <a-card class="jc-mt" title="列表内容" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="magage">添加授权</a-button>
      </template>
      <a-table :loading="loading" :data-source="list" :columns="columns" :pagination="false">
        <template #shouquan="{ record }">
          <span class="authorized-count-box" @click="showDevice(record)">
            <span class="authorized-count">10</span>/{{record.age}}
          </span>
        </template>
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
  </div>

  <jc-device-list :id="deviceListId" v-model:visible="deviceListVisible" />
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
    title: '授权设备数',
    dataIndex: 'shouquan',
    slots: { customRender: 'shouquan' }
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
    JcDetail: defineAsyncComponent(() => import('./modules/Detail/index.vue')),
    JcDeviceList: defineAsyncComponent(
      () => import('./modules/DeviceList/index.vue')
    )
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

    let loading = ref(false)
    let visible = ref(false)
    let detailVisible = ref(false)
    let deviceListVisible = ref(false)
    let detailId = ref('')
    let deviceListId = ref('')

    const initData = () => {
      // loading.value = true
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
      console.log('record', record)
      detailId.value = record.key
      detailVisible.value = true
    }

    const onDelete = (record: any) => {
      console.log('record', record.key)
    }

    const showDevice = (record: any) => {
      console.log('record', record.key)
      deviceListId.value = record.key
      deviceListVisible.value = true
    }

    return {
      columns,
      pages,
      loading,
      currentChange,
      sizeChange,
      ...toRefs(state),
      visible,
      detailVisible,
      goFilter,
      magage,
      onDelete,
      showDetail,
      detailId,
      deviceListId,
      showDevice,
      deviceListVisible
    }
  }
})
</script>

<style scoped lang="scss">
.authorized-count-box {
  cursor: pointer;
}
.authorized-count {
  color: $jc-color-primary;
}
</style>