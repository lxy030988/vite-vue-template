<template>
  <div v-show="!deviceListVisible">
    <jc-filter @filter="goFilter" />
    <a-card class="jc-mt" title="列表内容" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="magage(null)">添加授权</a-button>
      </template>
      <a-table :loading="loading" row-key="id" :data-source="list" :columns="columns" :pagination="false">
        <template #index="{ index }">
          {{tableIndex(index)}}
        </template>
        <template #shouquan="{ record }">
          <span class="authorized-count-box" @click="showDevice(record)">
            <span class="authorized-count">10</span>/{{record.age}}
          </span>
        </template>
        <template #date="{ record }">
          {{formatDate(record)}}
        </template>
        <template #operation="{ record }">
          <a-button type="link" title="详情" @click="showDetail(record)">
            <template #icon>
              <InfoCircleOutlined />
            </template>
          </a-button>
          <a-button type="link" title="编辑" @click="magage(record)">
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

  <jc-device-list :id="deviceListId" v-model:visible="deviceListVisible" :type="authorizationType" />
  <jc-manage v-model:visible="visible" :type="authorizationType" :info="manageInfo" />
  <jc-detail :id="detailId" v-model:visible="detailVisible" :type="authorizationType" />
</template>

<script lang="ts">
import { usePage } from '@/hooks'
import {
  defineAsyncComponent,
  defineComponent,
  reactive,
  ref,
  toRaw,
  toRefs,
  watch,
  watchEffect
} from 'vue'

import {
  DeleteOutlined,
  FormOutlined,
  InfoCircleOutlined
} from '@ant-design/icons-vue'
import { useRoute } from 'vue-router'
import { AuthorizationTypes } from './CONST'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'

import { getAuthManageList } from '@/api/authorizationManagement'
import { TAuthorizationListItem } from '@/api/authorizationManagement/model'
const dcolumns: ColumnProps[] = [
  {
    title: '序号',
    slots: { customRender: 'index' }
  },
  {
    title: '合同号',
    dataIndex: 'contractNumber'
  },
  {
    title: '批次号',
    dataIndex: 'batchNumber'
  },
  {
    title: '批次日期',
    dataIndex: 'batchTime'
  },
  {
    title: '购买公司',
    dataIndex: 'company'
  },
  {
    title: '设备总数',
    dataIndex: 'allCount'
  },
  {
    title: '授权设备数',
    dataIndex: 'shouquan',
    slots: { customRender: 'shouquan' }
  },
  {
    title: '授权日期',
    slots: { customRender: 'date' }
  },
  {
    title: '授权状态',
    dataIndex: 'licenseStatus'
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
    let authorizationType = ref(AuthorizationTypes.INSIDE)
    let columns = ref<any[]>([])
    let filter = ref<any>({})

    let list = ref<TAuthorizationListItem[]>([])

    let loading = ref(false)
    let visible = ref(false)
    let manageInfo = ref<TAuthorizationListItem>()
    let detailVisible = ref(false)
    let deviceListVisible = ref(false)
    let detailId = ref('')
    let deviceListId = ref('')

    const initData = async () => {
      loading.value = true
      try {
        const res = await getAuthManageList({
          ...filter.value,
          ...pages,
          type: authorizationType.value
        })
        console.log('res', res)
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

    const formatDate = (record: TAuthorizationListItem) => {
      return `${record.startTime}-${record.endTime}`
    }

    const magage = (record: TAuthorizationListItem) => {
      manageInfo.value = record
      visible.value = true
    }

    const showDetail = (record: TAuthorizationListItem) => {
      console.log('record', record)
      detailId.value = record.id
      detailVisible.value = true
    }

    const onDelete = (record: TAuthorizationListItem) => {
      console.log('record', record.id)
    }

    const showDevice = (record: TAuthorizationListItem) => {
      console.log('record', record.id)
      deviceListId.value = record.id
      deviceListVisible.value = true
    }

    //根据路由的变化 改变授权类型
    const route = useRoute()

    watch(
      route,
      () => {
        console.log('route', route.params)
        if (route.params.type === AuthorizationTypes.INSIDE) {
          authorizationType.value = AuthorizationTypes.INSIDE
          columns.value = [...dcolumns]
        } else if (route.params.type === AuthorizationTypes.OUTSIDE) {
          authorizationType.value = AuthorizationTypes.OUTSIDE
          columns.value = [...dcolumns]
          columns.value.splice(3, 0, {
            title: '授权码',
            dataIndex: 'licenseCode'
          })
        }
        deviceListVisible.value = false
        initData()
      },
      { immediate: true }
    )

    // watchEffect(() => {

    // })

    return {
      authorizationType,
      columns,
      pages,
      loading,
      currentChange,
      sizeChange,
      tableIndex,
      formatDate,
      // ...toRefs(state),
      list,
      visible,
      manageInfo,
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