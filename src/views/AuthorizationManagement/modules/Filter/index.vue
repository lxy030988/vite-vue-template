<template>
  <a-card
    :bordered="false"
    class="jc-tabfilter"
  >
    <a-form
      layout="inline"
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="批次日期">
        <a-range-picker
          v-model:value="formState.batchTime"
          value-format='YYYY-MM-DD'
          format='YYYY-MM-DD'
          :show-time="false"
          @change='changeBatchDate'
        />
      </a-form-item>
      <a-form-item label="授权状态">
        <a-select
          v-model:value="formState.licenseStatus"
          placeholder="全部状态"
        >
          <a-select-option
            v-for="item in LICENSE_STATUSES.VALUES"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="授权信息">
        <a-input
          v-model:value="formState.licenseInfo"
          placeholder="请输入合同号/购买公司"
        ></a-input>
      </a-form-item>
      <a-form-item label="授权日期">
        <a-range-picker
          v-model:value="formState.date"
          value-format='YYYY-MM-DD'
          format='YYYY-MM-DD'
          :show-time="false"
          @change="changeDate"
        />
      </a-form-item>
    </a-form>
    <div class="jc-tabfilter-btns">
      <a-button
        type="primary"
        html-type="submit"
        @click="onSubmit"
      >查询</a-button>
      <a-button
        class="jc-ml"
        @click="resetFields"
      >重置</a-button>
    </div>

  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw, ref } from 'vue'
import { useForm } from '@/hooks'
import moment from 'moment'
import { LICENSE_STATUSES } from '../../CONST'

export default defineComponent({
  name: 'AuthorizationManagementFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    const date = ref<moment.Moment[]>([])

    let formState = reactive({
      licenseInfo: '',
      licenseStatus: undefined,
      batchTime: date.value,
      batchEndTime: '',
      batchStartTime: '',
      date: date.value,
      startTime: '',
      endTime: ''
    })

    const { resetFields } = useForm(formState, {})

    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }

    const changeDate = (v: any[]) => {
      if (v.length) {
        formState.startTime = v[0]
        formState.endTime = v[1]
      } else {
        formState.startTime = ''
        formState.endTime = ''
      }
    }
    const changeBatchDate = (v: any[]) => {
      if (v.length) {
        formState.batchStartTime = v[0]
        formState.batchEndTime = v[1]
      } else {
        formState.batchStartTime = ''
        formState.batchEndTime = ''
      }
    }

    return {
      formState,
      resetFields,
      onSubmit,
      changeDate,
      changeBatchDate,
      LICENSE_STATUSES,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 }
    }
  }
})
</script>

<style scoped lang="scss">
.ant-form {
  float: left;
}
</style>