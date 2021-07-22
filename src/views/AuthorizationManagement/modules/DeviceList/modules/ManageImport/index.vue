<template>
  <a-modal :visible="visible" title="导入设备" :width="600" :footer="null" :mask-closable="false" @cancel="handleCancel">
    <a-form ref="formRef" class="jc-manage-form" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="合同号">
        <span>合同号</span>
      </a-form-item>
      <a-form-item label="批次号">
        <span>批次号</span>
      </a-form-item>
      <a-form-item label="设备信息导入" name="name">

      </a-form-item>
      <div class="text-center">
        <a-button @click="resetForm">取消</a-button>
        <a-button class="jc-ml" type="primary" @click="onSubmit">确定</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

import { defineComponent, reactive, ref, toRaw } from 'vue'
import { NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'

interface FormState {
  name: string
  region: boolean
}

export default defineComponent({
  name: 'AuthorizationManagementDeviceListManageImport',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    const handleCancel = (e: MouseEvent) => {
      emit('update:visible', false)
    }

    const formRef = ref<FormRefType>()
    const formState = reactive<FormState>({
      name: '',
      region: false
    })
    const rules = {
      name: NOT_NULL,
      region: SELECT_NOT_NULL
    }

    const { resetFields, validate } = useForm(formState, rules)

    const onSubmit = () => {
      formRef
        .value!.validate()
        .then(() => {
          console.log('values', formState, toRaw(formState))
          resetForm()
        })
        .catch((error: ValidateErrorEntity<FormState>) => {
          console.log('error', error)
        })
    }

    const resetForm = () => {
      resetFields()
      emit('update:visible', false)
    }

    return {
      handleCancel,
      formRef,
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formState,
      rules,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
</style>