<template>
  <a-modal :visible="visible" title="授权详情" :width="800" :footer="null" :mask-closable="false" class="jc-detail" @cancel="handleCancel">
    <a-row :gutter="20">
      <a-col :span="4">合同号</a-col>
      <a-col :span="20">{{detail.contractNumber}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">批次号</a-col>
      <a-col :span="20">{{detail.batchNumber}}</a-col>
    </a-row>
    <a-row v-if="AuthorizationTypes.OUTSIDE===type" :gutter="20">
      <a-col :span="4">授权码</a-col>
      <a-col :span="20">{{detail.licenseCode}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">批次日期</a-col>
      <a-col :span="20">{{detail.batchTime}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">购买公司</a-col>
      <a-col :span="20">{{detail.company}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">设备总数</a-col>
      <a-col :span="20">{{detail.allCount}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">授权设备数</a-col>
      <a-col :span="20">{{detail.licenseEquNum}}/{{detail.importEquNum}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">授权日期</a-col>
      <a-col :span="20">{{detail.startTime}}-{{detail.endTime}}</a-col>
    </a-row>
    <a-row :gutter="20">
      <a-col :span="4">描述</a-col>
      <a-col :span="20">{{detail.description}}</a-col>
    </a-row>

    <!-- <div class="ant-modal-header">
      <div class="ant-modal-title">操作日志</div>
    </div>
    <a-timeline>
      <a-timeline-item>
        <div>2015-09-01</div>
        <div>Create a services site </div>
      </a-timeline-item>
      <a-timeline-item>
        <div>2015-09-01</div>
        <div>Create a services site </div>
      </a-timeline-item>
    </a-timeline> -->
  </a-modal>
</template>

<script lang="ts">
import { getAuthManageDetail } from '@/api/authorizationManagement'
import { TAuthorizationListItem } from '@/api/authorizationManagement/model'
import { defineComponent, PropType, ref, watch } from 'vue'
import { AuthorizationTypes } from '../../CONST'

export default defineComponent({
  name: 'AuthorizationManagementDetail',
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
    const handleCancel = (e: MouseEvent) => {
      emit('update:visible', false)
    }

    const detail = ref<TAuthorizationListItem>({} as TAuthorizationListItem)

    const initData = async () => {
      try {
        detail.value = await getAuthManageDetail({
          type: props.type,
          id: props.id
        })
      } catch (error) {
        console.error(error)
      }
    }

    watch(
      () => props.id,
      () => {
        console.log('id', props.id)
        if (props.id && props.type) {
          initData()
        }
      }
    )

    return {
      detail,
      AuthorizationTypes,
      handleCancel
    }
  }
})
</script>

<style scoped lang="scss">
.ant-timeline {
  padding: $jc-default-dis;
}
</style>