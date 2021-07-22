<template>
  <a-card :bordered="false" class="jc-tabfilter">
    <a-form layout="inline" :model="formState">
      <a-form-item label="批次日期">
        <a-date-picker v-model:value="formState.batchTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :show-time="false" />
      </a-form-item>
      <a-form-item label="授权状态">
        <a-select v-model:value="formState.licenseStatus">
          <a-select-option v-for="item in LICENSE_STATUSES.VALUES" :key="item.value" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="授权信息">
        <a-input v-model:value="formState.licenseInfo"></a-input>
      </a-form-item>
      <a-form-item label="授权日期">
        <a-range-picker v-model:value="formState.date" value-format="YYYY-MM-DD HH:mm:ss" @change="changeDate" />
      </a-form-item>
      <a-form-item class="jc-tabfilter-btns">
        <a-button type="primary" html-type="submit" @click="onSubmit">查询</a-button>
        <a-button class="jc-ml" @click="resetFields">重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'
import { useForm } from '@/hooks'
import { LICENSE_STATUSES } from '../../CONST'

export default defineComponent({
  name: 'AuthorizationManagementFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    let formState = reactive({
      licenseInfo: '',
      licenseStatus: '',
      batchTime: '',
      date: [],
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
      // console.log('changeDate', v)
    }

    return { formState, resetFields, onSubmit, changeDate, LICENSE_STATUSES }
  }
})
</script>

<style scoped lang="scss">
</style>