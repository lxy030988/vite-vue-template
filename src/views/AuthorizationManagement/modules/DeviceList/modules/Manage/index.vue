<template>
  <a-modal :visible="visible" title="添加设备" :width="600" :footer="null" :mask-closable="false" @cancel="resetForm">
    <a-form ref="formRef" class="jc-manage-form" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="设备号" name="equipmentNum">
        <a-input v-model:value="formState.equipmentNum" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="是否授权" name="licenseStatus">
        <a-switch v-model:checked="formState.licenseStatus" :checked-value="DEVICE_LICENSE_STATUSES.YSQ" :un-checked-value="DEVICE_LICENSE_STATUSES.WSQ" />
      </a-form-item>
      <div class="text-center">
        <a-button @click="resetForm">取消</a-button>
        <a-button class="jc-ml" type="primary" :loading="loading" @click="onSubmit">确定</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'

import { defineComponent, reactive, ref, toRaw, watchEffect } from 'vue'
import { NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
import { TParamsAddDevice } from '@/api/authorizationManagement/model'
import { DEVICE_LICENSE_STATUSES } from '@/views/AuthorizationManagement/CONST'
import { addAuthManageDevice } from '@/api/authorizationManagement'
import { success } from '@/utils/message'

export default defineComponent({
  name: 'AuthorizationManagementDeviceListManage',
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
  emits: ['update:visible', 'success'],
  setup(props, { emit }) {
    const formState = reactive<TParamsAddDevice>({
      licenseRecordId: '',
      licenseStatus: DEVICE_LICENSE_STATUSES['WSQ'],
      equipmentNum: ''
    })

    const rules = {
      equipmentNum: NOT_NULL,
      licenseStatus: SELECT_NOT_NULL
    }

    const { resetFields, validate } = useForm(formState, ref(rules))

    watchEffect(() => {
      formState.licenseRecordId = props.id
    })

    const formRef = ref<FormRefType>()
    const onSubmit = () => {
      formRef
        .value!.validate()
        .then(() => {
          validated()
        })
        .catch((error: ValidateErrorEntity<TParamsAddDevice>) => {
          console.log('error', error)
        })
    }

    let loading = ref(false)
    const validated = async () => {
      try {
        loading.value = true
        await addAuthManageDevice(toRaw(formState))
        success()
        resetForm()
        emit('success')
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      resetFields()
      emit('update:visible', false)
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      DEVICE_LICENSE_STATUSES,
      formRef,
      formState,
      rules,
      loading,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
</style>