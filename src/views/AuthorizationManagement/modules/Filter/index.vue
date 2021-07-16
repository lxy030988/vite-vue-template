<template>
  <a-card :bordered="false" class="jc-tabfilter">
    <a-form layout="inline" :model="formState">
      <a-form-item label="批次日期">
        <a-date-picker v-model:value="formState.date1" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" show-time />
      </a-form-item>
      <a-form-item label="授权状态">
        <a-select v-model:value="formState.status">
          <a-select-option value="1">Zone one</a-select-option>
          <a-select-option value="2">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="授权信息">
        <a-input v-model:value="formState.user"></a-input>
      </a-form-item>
      <a-form-item label="授权日期">
        <a-range-picker v-model:value="formState.date2" value-format="YYYY-MM-DD HH:mm:ss" show-time />
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

import { Form } from 'ant-design-vue'
const useForm = Form.useForm

export default defineComponent({
  name: 'AuthorizationManagementFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    let formState = reactive({ user: '', status: '', date1: '', date2: [] })

    const { resetFields } = useForm(formState, {})

    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }

    return { formState, resetFields, onSubmit }
  }
})
</script>

<style scoped lang="scss">
</style>