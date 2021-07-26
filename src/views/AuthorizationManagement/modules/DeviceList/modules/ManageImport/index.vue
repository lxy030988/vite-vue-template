<template>
  <a-modal :visible="visible" title="导入设备" :width="600" :footer="null" :mask-closable="false" @cancel="resetForm">
    <a-form ref="formRef" class="jc-manage-form" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="合同号">
        <span>{{info.contractNumber}}</span>
      </a-form-item>
      <a-form-item label="批次号">
        <span>{{info.batchNumber}}</span>
      </a-form-item>
      <a-form-item label="设备信息导入" name="file">
        <a href="/public/excel/test.xlsx">设备信息表格模板下载</a>
        <input type="file" name="file" @change="handleFileChange" />
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

import {
  defineComponent,
  PropType,
  reactive,
  ref,
  toRaw,
  watchEffect
} from 'vue'
import { NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
import {
  TParamsImportDevice,
  TParamsManage
} from '@/api/authorizationManagement/model'
import { importDevice } from '@/api/authorizationManagement'
import { success } from '@/utils/message'

export default defineComponent({
  name: 'AuthorizationManagementDeviceListManageImport',
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    info: {
      type: Object as PropType<TParamsManage>,
      default: () => ({})
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:visible', 'success'],
  setup(props, { emit }) {
    const formState = reactive<TParamsImportDevice>({
      recordId: '',
      file: null
    })
    const rules = {
      recordId: NOT_NULL,
      file: SELECT_NOT_NULL
    }

    const { resetFields, validate } = useForm(formState, rules)

    watchEffect(() => {
      formState.recordId = props.id
    })

    const handleFileChange = (e: any) => {
      const target: HTMLInputElement = e.target
      console.log('target', target)
      formState.file = target.files![0]
    }

    const formRef = ref<FormRefType>()
    const onSubmit = () => {
      formRef
        .value!.validate()
        .then(() => {
          validated()
        })
        .catch((error: ValidateErrorEntity<TParamsImportDevice>) => {
          console.log('error', error)
        })
    }

    let loading = ref(false)
    const validated = async () => {
      try {
        loading.value = true
        await importDevice(toRaw(formState))
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
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formRef,
      formState,
      rules,
      handleFileChange,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
</style>