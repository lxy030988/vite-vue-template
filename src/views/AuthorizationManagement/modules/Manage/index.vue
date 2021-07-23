<template>
  <a-modal :visible="visible" :title="title" :width="800" :footer="null" :mask-closable="false" @cancel="resetForm">
    <a-form ref="formRef" class="jc-manage-form" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="合同号" name="contractNumber">
        <a-input v-model:value="formState.contractNumber" :disabled="info" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="批次号" name="batchNumber">
        <a-input v-model:value="formState.batchNumber" :disabled="info" placeholder="请输入" />
      </a-form-item>
      <a-form-item v-if="AuthorizationTypes.OUTSIDE===type" label="授权码" name="licenseCode">
        <a-input v-model:value="formState.licenseCode" disabled />
      </a-form-item>
      <a-form-item label="批次日期" name="batchTime">
        <a-date-picker v-model:value="formState.batchTime" format="YYYY-MM-DD" value-format="YYYY-MM-DD" :show-time="false" />
      </a-form-item>
      <a-form-item label="购买公司" name="company">
        <a-input v-model:value="formState.company" />
      </a-form-item>
      <a-form-item label="批次设备总数" name="allCount">
        <a-input v-model:value.number="formState.allCount" />
      </a-form-item>
      <a-form-item label="设备信息导入" name="execlUrl">
        <a href="/public/excel/test.xlsx">设备信息表格模板下载</a>
        <jc-upload-list v-model:fileList="fileList" />
      </a-form-item>
      <a-form-item label="授权日期" name="date">
        <a-range-picker v-model:value="formState.date" value-format="YYYY-MM-DD HH:mm:ss" show-time @change="changeDate" />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formState.description" />
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
import moment from 'moment'
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRaw,
  watchEffect
} from 'vue'
import { getIntegerRule, NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
import { AuthorizationTypes } from '../../CONST'
import { TParamsManage } from '@/api/authorizationManagement/model'
import { manageAuthManage } from '@/api/authorizationManagement'
import { createNonceStr } from '@/utils/util'

export default defineComponent({
  name: 'AuthorizationManagementManage',
  components: {
    JcUploadList: defineAsyncComponent(
      () => import('@/components/upload/uploadList.vue')
    )
  },
  props: {
    type: {
      type: String as PropType<AuthorizationTypes>,
      required: true
    },
    info: {
      type: Object as PropType<TParamsManage>,
      required: true
    },
    visible: {
      type: Boolean,
      required: true
    },
    total: {
      type: Number,
      required: true
    }
  },
  emits: ['update:visible', 'success'],
  setup(props, { emit }) {
    const handleCancel = (e: MouseEvent) => {
      emit('update:visible', false)
    }

    let title = ref('添加授权')

    const formRef = ref<FormRefType>()
    const formState = reactive<TParamsManage>({
      allCount: null,
      batchNumber: '',
      batchTime: '',
      company: '',
      contractNumber: '',
      description: '',
      endTime: '',
      execlUrl: '',
      id: '',
      licenseCode: '',
      startTime: '',
      type: '',
      date: []
    })
    let fileList = ref<any[]>([])
    const rules = {
      allCount: getIntegerRule(),
      execlUrl: SELECT_NOT_NULL,
      date: SELECT_NOT_NULL,
      batchTime: SELECT_NOT_NULL,
      batchNumber: NOT_NULL,
      company: NOT_NULL,
      contractNumber: NOT_NULL,
      description: NOT_NULL,
      licenseCode: NOT_NULL
    }

    const { resetFields, validate } = useForm(formState, rules)

    watchEffect(() => {
      if (props.info) {
        console.log('props.info', props.info)
        title.value = '编辑授权'
        formState.id = props.info.id
        formState.allCount = props.info.allCount
        formState.batchNumber = props.info.batchNumber
        formState.batchTime = props.info.batchTime
        formState.company = props.info.company
        formState.contractNumber = props.info.contractNumber
        formState.description = props.info.description
        formState.execlUrl = props.info.execlUrl
        formState.type = props.info.type
        formState.licenseCode = props.info.licenseCode
        formState.endTime = props.info.endTime
        formState.startTime = props.info.startTime //时间格式化
        formState.date = [props.info.startTime, props.info.endTime]

        fileList.value = [
          {
            uid: props.info.execlUrl,
            name: props.info.execlUrl,
            url: props.info.execlUrl
          }
        ]
      } else {
        title.value = '添加授权'
        formState.licenseCode = createNonceStr(16)
        const now = moment().format('YYYYMMDD')
        const num = props.total + 1
        formState.contractNumber = `JCXSB${now}${num}`
        formState.batchNumber = `ZFY${now}${num}`
      }
    })

    watchEffect(() => {
      formState.execlUrl = fileList.value[0]?.url || ''
    })

    const onSubmit = () => {
      formRef
        .value!.validate()
        .then(async () => {
          formState.type = props.type
          console.log('values', formState, toRaw(formState))

          try {
            await manageAuthManage(toRaw(formState))

            resetForm()
            emit('success')
          } catch (error) {
            console.error(error)
          }
        })
        .catch((error: ValidateErrorEntity<TParamsManage>) => {
          console.log('error', error)
        })
    }

    const resetForm = () => {
      resetFields()
      fileList.value = []
      emit('update:visible', false)
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

    return {
      title,
      AuthorizationTypes,
      fileList,
      handleCancel,
      changeDate,
      formRef,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
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