<template>
  <div v-show="visible">
    <div class="jc-detail-header">
      <a-button @click="handleCancel">返回</a-button>
    </div>
    <jc-filter @filter="goFilter" />
    <a-card class="jc-mt" title="设备列表" :bordered="false">
      <template v-if="type === AuthorizationTypes.INSIDE" #extra>
        <a-button type="primary" @click="magage">添加设备</a-button>
        <a-button type="primary" class="jc-ml" @click="magageImport">批量导入</a-button>
      </template>
      <a-table :loading="loading" :data-source="list" row-key="id" :columns="columns" :pagination="false">
        <template #index="{ index }">
          {{tableIndex(index)}}
        </template>
        <template #operation="{ record }">
          <template v-if="type === AuthorizationTypes.INSIDE">
            <a-popconfirm v-if="record.licenseStatus===DEVICE_LICENSE_STATUSES.YSQ" title="您确定要禁用该设备吗?" @confirm="onDeviceStatus(record,DEVICE_LICENSE_STATUSES.WSQ)">
              <a-button type="link" title="禁用">
                <template #icon>
                  <StopOutlined />
                </template>
              </a-button>
            </a-popconfirm>
            <a-popconfirm v-else title="您确定要授权该设备吗?" @confirm="onDeviceStatus(record,DEVICE_LICENSE_STATUSES.YSQ)">
              <a-button type="link" title="授权">
                <template #icon>
                  <UnlockOutlined />
                </template>
              </a-button>
            </a-popconfirm>
          </template>

          <a-popconfirm title="您确定要删除吗?" @confirm="onDelete(record)">
            <a-button type="link" danger title="删除">
              <template #icon>
                <DeleteOutlined />
              </template>
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>

      <jc-pagination :pages="pages" @currentChange="currentChange" @sizeChange="sizeChange" />
    </a-card>

    <jc-manage :id="id" v-model:visible="manageVisible" @success="initData" />
    <jc-manage-import :id="id" v-model:visible="magageImportVisible" @success="initData" />

  </div>

</template>

<script lang="ts">
import { usePage } from '@/hooks'
import {
  defineAsyncComponent,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect
} from 'vue'

import {
  DeleteOutlined,
  UnlockOutlined,
  StopOutlined
} from '@ant-design/icons-vue'
import { AuthorizationTypes } from '../../CONST'
import {
  deleteDevice,
  getAuthManageDeviceList,
  updateDeviceStatus
} from '@/api/authorizationManagement'
import { TDeviceListItem } from '@/api/authorizationManagement/model'
import { DEVICE_LICENSE_STATUSES } from '@/views/AuthorizationManagement/CONST'
import { message } from 'ant-design-vue'

const dcolumns = [
  {
    title: '序号',
    slots: { customRender: 'index' }
  },
  {
    title: '设备号',
    dataIndex: 'equipmentNum'
  },
  {
    title: '创建日期',
    dataIndex: 'createTime'
  },
  {
    title: '设备状态',
    dataIndex: 'licenseStatus'
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
    type: {
      type: String as PropType<AuthorizationTypes>,
      required: true
    },
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
    let columns = ref<any[]>([])
    let filter = ref<any>({})
    let loading = ref(false)
    let list = ref<TDeviceListItem[]>([])

    let manageVisible = ref(false)
    let magageImportVisible = ref(false)

    watch(
      () => props.id,
      () => {
        console.log('id', props.id)
        if (props.id) {
          initData()
        }
      }
    )

    const initData = async () => {
      try {
        loading.value = true
        const res = await getAuthManageDeviceList({
          ...filter.value,
          ...pages,
          licenseRecordId: props.id
        })
        pages.total = res.total
        list.value = res.list
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const { pages, tableIndex, currentChange, sizeChange } = usePage(initData)

    const goFilter = (v: any) => {
      console.log('goFilter', v)
      filter.value = v
      currentChange(1)
    }

    const onDelete = async (record: TDeviceListItem) => {
      console.log('onDelete', record.id)
      try {
        await deleteDevice([record.id])
        initData()
      } catch (error) {
        console.error(error)
      }
    }

    const onDeviceStatus = async (
      record: TDeviceListItem,
      licenseStatus: number
    ) => {
      try {
        await updateDeviceStatus({ licenseStatus, id: record.id })
        message.success('操作成功')
        initData()
      } catch (error) {
        console.error(error)
      }
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

    watchEffect(() => {
      if (props.type === AuthorizationTypes.INSIDE) {
        columns.value = [...dcolumns]
      } else if (props.type === AuthorizationTypes.OUTSIDE) {
        columns.value = [...dcolumns]
        columns.value.splice(1, 0, {
          title: '授权信息',
          dataIndex: 'licenseSentence'
        })
      }
    })

    return {
      loading,
      DEVICE_LICENSE_STATUSES,
      AuthorizationTypes,
      columns,
      pages,
      tableIndex,
      currentChange,
      sizeChange,
      list,
      // ...toRefs(state),
      goFilter,
      initData,
      onDelete,
      onDeviceStatus,
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