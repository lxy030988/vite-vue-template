<template>
  <div v-show="!deviceListVisible">
    <jc-filter @filter="goFilter" />
    <a-card class="jc-mt" title="列表内容" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="magage(null)">添加授权</a-button>
      </template>
      <a-table :loading="loading" row-key="id" :data-source="list" :columns="columns" :pagination="false">
        <template #index="{ index }">
          {{ tableIndex(index) }}
        </template>
        <template #count="{ record }">
          <span class="authorized-count-box" @click="showDevice(record)">
            <span class="authorized-count">{{ record.licenseEquNum }}</span
            >/{{ record.importEquNum }}
          </span>
        </template>
        <template #licenseStatus="{ record }">
          <span
            :class="
              record.licenseStatus === 1
                ? 'licenseStatus-color-green'
                : record.licenseStatus === 0
                ? 'licenseStatus-color-red'
                : 'licenseStatus-color-orange'
            "
            >{{ formatStatus(record) }}</span
          >
        </template>
        <template #date="{ record }">
          {{ formatDate(record) }}
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
  </div>

  <jc-device-list
    :id="deviceListId"
    v-model:visible="deviceListVisible"
    :info="deviceListInfo"
    :type="authorizationType"
  />
  <jc-manage
    v-model:visible="visible"
    :total="pages.total"
    :type="authorizationType"
    :info="manageInfo"
    :num="deviceNum"
    @success="initData"
  />
  <jc-detail :id="detailId" v-model:visible="detailVisible" :type="authorizationType" />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import { DeleteOutlined, FormOutlined, InfoCircleOutlined } from '@ant-design/icons-vue'

import { AuthorizationTypes, LICENSE_STATUSES } from './CONST'
import { usePage } from '@/hooks'

import { deleteAuthManage, getAuthManageList, deviceCount } from '@/api/authorizationManagement'
import { TAuthorizationListItem } from '@/api/authorizationManagement/model'
import { ColumnProps } from 'ant-design-vue/lib/table/interface'
//定义表格默认列
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
    slots: { customRender: 'count' }
  },
  {
    title: '授权状态',
    slots: { customRender: 'licenseStatus' }
  },
  {
    title: '授权日期',
    slots: { customRender: 'date' }
  },

  {
    title: '操作',
    slots: { customRender: 'operation' }
  }
]

export default defineComponent({
  name: 'AuthorizationManagementIndex',
  components: {
    DeleteOutlined,
    FormOutlined,
    InfoCircleOutlined,

    JcPagination: defineAsyncComponent(() => import('@/components/pagination/index.vue')),
    JcFilter: defineAsyncComponent(() => import('./modules/Filter/index.vue')),
    JcManage: defineAsyncComponent(() => import('./modules/Manage/index.vue')),
    JcDetail: defineAsyncComponent(() => import('./modules/Detail/index.vue')),
    JcDeviceList: defineAsyncComponent(() => import('./modules/DeviceList/index.vue'))
  },
  setup() {
    //获取表格数据
    let list = ref<TAuthorizationListItem[]>([])
    let loading = ref(false)
    const initData = async () => {
      if (loading.value) {
        return
      }
      try {
        loading.value = true
        const res = await getAuthManageList({
          ...filter.value,
          ...pages,
          type: authorizationType.value
        })
        pages.total = res.total
        list.value = res.list
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }
    //表格数据 格式化
    const formatDate = (record: TAuthorizationListItem) => {
      return `${record.startTime}-${record.endTime}`
    }
    const formatStatus = (record: TAuthorizationListItem) => {
      return LICENSE_STATUSES.toString(record.licenseStatus)
    }

    //分页
    const { pages, tableIndex, currentChange, sizeChange } = usePage(initData)
    //搜索
    let filter = ref<any>({})
    const goFilter = (v: any) => {
      console.log('goFilter', v)
      filter.value = v

      currentChange(1)
    }

    //表格相关操作

    //新增、编辑 授权
    let deviceNum = ref(0)
    let visible = ref(false)
    let manageInfo = ref<TAuthorizationListItem>()
    const magage = async (record: TAuthorizationListItem) => {
      if (!record) {
        const { count } = await deviceCount()
        deviceNum.value = count
      }

      manageInfo.value = record
      visible.value = true
    }

    //查看详情
    let detailVisible = ref(false)
    let detailId = ref('')
    const showDetail = (record: TAuthorizationListItem) => {
      // console.log('record', record)
      detailId.value = record.id
      detailVisible.value = true
    }

    //删除授权
    const onDelete = async (record: TAuthorizationListItem) => {
      console.log('record', record.id)
      try {
        await deleteAuthManage([record.id])
        initData()
      } catch (error) {
        console.error(error)
      }
    }

    //查看设备列表
    let deviceListVisible = ref(false)
    let deviceListId = ref('')
    let deviceListInfo = ref<TAuthorizationListItem>()
    const showDevice = (record: TAuthorizationListItem) => {
      // console.log('record', record.id)
      deviceListId.value = record.id
      deviceListInfo.value = record
      deviceListVisible.value = true
    }

    //从设备列表返回，从新获取授权列表的数据
    watch(deviceListVisible, (value, oldValue) => {
      if (!value) {
        initData()
      }
    })

    //根据路由的变化 改变授权类型 动态改变表格列数
    let authorizationType = ref(AuthorizationTypes.INSIDE) //授权类型
    let columns = ref<any[]>([])
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
        goFilter({})
      },
      { immediate: true }
    )

    return {
      authorizationType,
      columns,
      //当天授权设备数
      deviceNum,
      //表格数据
      pages,
      currentChange,
      sizeChange,
      tableIndex,
      goFilter,
      initData,
      loading,
      list,
      formatDate,
      formatStatus,
      //表格操作
      visible,
      manageInfo,
      magage,
      detailVisible,
      detailId,
      showDetail,
      deviceListVisible,
      deviceListId,
      deviceListInfo,
      showDevice,
      onDelete
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
.licenseStatus-color-green {
  color: $jc-color-success;
}
.licenseStatus-color-red {
  color: $jc-color-danger;
}
.licenseStatus-color-orange {
  color: $jc-color-warning;
}
</style>
