<template>
  <a-modal
    :visible="visible"
    title="导入设备"
    :width="600"
    :footer="null"
    :mask-closable="false"
    @cancel="resetForm"
  >
    <a-form
      ref="formRef"
      class="jc-manage-form"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="合同号">
        <span>{{info.contractNumber}}</span>
      </a-form-item>
      <a-form-item label="批次号">
        <span>{{info.batchNumber}}</span>
      </a-form-item>
      <a-form-item
        label="设备信息导入"
        name="file"
      >
        <a href="/public/excel/test.xlsx">
          <span>设备信息表格模板下载</span>
        </a>
        <a-upload
          :file-list="files"
          :before-upload="beforeUpload"
        >
          <a-button>
            <upload-outlined></upload-outlined>
            上传文件
          </a-button>
        </a-upload>
      </a-form-item>
      <div class="text-center">
        <a-button @click="resetForm">取消</a-button>
        <a-button
          class="jc-ml"
          type="primary"
          @click="onSubmit"
        >确定</a-button>
      </div>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { UploadOutlined } from '@ant-design/icons-vue'
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
import { NumMessage } from '@/utils/message'
export default defineComponent({
  name: 'AuthorizationManagementDeviceListManageImport',
  components: {
    UploadOutlined
  },
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
    let files = ref<File[]>([])
    watchEffect(() => {
      formState.recordId = props.id
    })

    const beforeUpload = (file: File) => {
      console.log(file)
      formState.file = file
      files.value = [...files.value, file]
      return false
    }
    const formRef = ref<FormRefType>()
    const onSubmit = () => {
      console.log(formState)

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
        const { successList, failList } = await importDevice(toRaw(formState))
        NumMessage(successList, failList)
        resetForm()
        emit('success')
      } catch (error) {
        console.error(error)
      } finally {
        loading.value = false
      }
    }

    const resetForm = () => {
      formRef.value!.resetFields()
      resetFields()
      emit('update:visible', false)
    }

    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      formRef,
      formState,
      files,
      rules,
      beforeUpload,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
.ant-form a span {
  display: block;
}
</style>