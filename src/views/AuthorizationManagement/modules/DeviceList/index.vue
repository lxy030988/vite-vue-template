<template>
  <div v-show="visible">
    <div class="jc-detail-header">
      <a-button @click="handleCancel">返回</a-button>
    </div>
    <jc-filter @filter="goFilter" />
    <a-card class="jc-mt" title="设备列表" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="magage">添加设备</a-button>
        <a-button type="primary" class="jc-ml" @click="magageImport">批量导入</a-button>
      </template>
      <a-table :data-source="list" :columns="columns" :pagination="false">
        <template #operation="{ record }">
          <a-button type="link" title="禁用">
            <template #icon>
              <StopOutlined />
            </template>
          </a-button>
          <a-button type="link" title="授权">
            <template #icon>
              <UnlockOutlined />
            </template>
          </a-button>
          <a-popconfirm title="您确定要删除吗?" @confirm="onDelete(record)">
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

    <jc-manage v-model:visible="manageVisible" />
    <jc-manage-import v-model:visible="magageImportVisible" />

  </div>

</template>

<script lang="ts">
import { usePage } from '@/hooks'
import {
  defineAsyncComponent,
  defineComponent,
  reactive,
  ref,
  toRefs,
  watchEffect
} from 'vue'

import {
  DeleteOutlined,
  UnlockOutlined,
  StopOutlined
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
  name: 'AuthorizationManagementDeviceList',
  components: {
    DeleteOutlined,
    UnlockOutlined,
    StopOutlined,
    JcPagination: defineAsyncComponent(
      () => import('@/components/pagination/index.vue')
    ),
    JcFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    JcManage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    JcManageImport: defineAsyncComponent(
      () => import('./modules/ManageImport/index.vue')
    )
  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
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
    let manageVisible = ref(false)
    let magageImportVisible = ref(false)

    watchEffect(() => {
      console.log('id', props.id)
      if (props.id) {
        initData()
      }
    })

    const initData = () => {
      console.log('initData')
      pages.total = 100
    }

    const { pages, currentChange, sizeChange } = usePage(initData)

    const goFilter = (v: any) => {
      console.log('goFilter', v)
      currentChange(1)
    }

    const onDelete = (record: any) => {
      console.log('onDelete', record.key)
    }

    const handleCancel = (e: MouseEvent) => {
      emit('update:visible', false)
    }

    const magage = () => {
      manageVisible.value = true
    }
    const magageImport = () => {
      magageImportVisible.value = true
    }

    return {
      columns,
      pages,
      currentChange,
      sizeChange,
      ...toRefs(state),
      goFilter,
      onDelete,
      handleCancel,
      manageVisible,
      magage,
      magageImportVisible,
      magageImport
    }
  }
})
</script>

<style scoped lang="scss">
.jc-detail-header {
  text-align: right;
  margin-bottom: $jc-default-dis;
}
</style>