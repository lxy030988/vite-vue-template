<template>
  <a-modal
    :visible="visible"
    :title="title"
    :width="800"
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
      <a-form-item
        label="合同号"
        name="contractNumber"
      >
        <a-input
          v-model:value="formState.contractNumber"
          :disabled="!!info"
        />
      </a-form-item>
      <a-form-item
        label="批次号"
        name="batchNumber"
      >
        <a-input
          v-model:value="formState.batchNumber"
          :disabled="!!info"
        />
      </a-form-item>
      <a-form-item
        v-if="AuthorizationTypes.OUTSIDE===type"
        label="授权码"
        name="licenseCode"
      >
        <a-input
          v-model:value="formState.licenseCode"
          disabled
        />
      </a-form-item>
      <a-form-item
        label="批次日期"
        name="batchTime"
      >
        <a-date-picker
          v-model:value="formState.batchTime"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :show-time="false"
        />
      </a-form-item>
      <a-form-item
        label="购买公司"
        name="company"
      >
        <a-input
          v-model:value="formState.company"
          placeholder="请输入公司/机构/团体名称(仅限80个字符)"
        />
      </a-form-item>
      <a-form-item
        label="批次设备总数"
        name="allCount"
      >
        <a-input
          v-model:value.number="formState.allCount"
          placeholder="请输入数量(仅限阿拉伯数字)"
        />
      </a-form-item>
      <a-form-item
        v-if="type === AuthorizationTypes.INSIDE"
        label="设备信息导入"
        name="execlUrl"
      >
        <a href="/public/excel/test.xlsx">设备信息表格模板下载</a>
        <span v-if='isEditDevice'>重新导入后，若设备号相同，原有设备信息将被覆盖!</span>
        <jc-upload-list v-model:fileList="fileList" />
      </a-form-item>
      <a-form-item
        label="授权日期"
        name="date"
      >
        <a-range-picker
          v-model:value="formState.date"
          value-format="YYYY-MM-DD HH:mm:ss"
          show-time
          @change="changeDate"
        />
      </a-form-item>
      <a-form-item
        label="描述"
        name="description"
      >
        <a-textarea
          v-model:value="formState.description"
          placeholder="请输入问题描述(仅限1000个字符)"
        />
      </a-form-item>
      <div class="text-center">
        <a-button @click="resetForm">取消</a-button>
        <a-button
          class="jc-ml"
          type="primary"
          :loading="loading"
          @click="onSubmit"
        >确定</a-button>
      </div>
    </a-form>
  </a-modal>

</template>

<script lang="ts">
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import moment from 'moment'
import {
  defineAsyncComponent,
  defineComponent,
  PropType,
  reactive,
  ref,
  toRaw,
  watch,
  watchEffect
} from 'vue'
import { getStringRule, NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
import { AuthorizationTypes } from '../../CONST'
import {
  TAuthorizationListItem,
  TParamsManage
} from '@/api/authorizationManagement/model'
import { manageAuthManage } from '@/api/authorizationManagement'
import { createNonceStr } from '@/utils/util'
import { success } from '@/utils/message'

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
      type: Object as PropType<TAuthorizationListItem>,
      default: null
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
    const curDate = new Date()
    const date = `${curDate.getFullYear()}-0${
      curDate.getMonth() + 1
    }-${curDate.getDate()}`
    const formState = reactive<TParamsManage>({
      allCount: null,
      batchNumber: '',
      batchTime: date,
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
    const validateAllCount = (rule: any, value: number) => {
      return new Promise((resolve, reject) => {
        if (props.info === null) {
          resolve('')
        }
        if (props.info.licenseEquNum < value) {
          resolve('')
        } else {
          reject(`批次设备总数大于${props.info.licenseEquNum}`)
        }
      })
    }

    const rules = {
      allCount: [{ validator: validateAllCount }],
      execlUrl: SELECT_NOT_NULL,
      date: SELECT_NOT_NULL,
      batchTime: SELECT_NOT_NULL,
      batchNumber: NOT_NULL,
      company: getStringRule(80),
      contractNumber: NOT_NULL,
      description: getStringRule(1000, 0),
      licenseCode: NOT_NULL
    }

    const { resetFields, validate } = useForm(formState, rules)

    //表单初始化
    let title = ref('添加授权')
    let isEditDevice = ref(false)
    watch(
      () => props.visible,
      value => {
        if (!value) {
          return
        }
        if (props.info) {
          console.log('props.info', props.info)
          title.value = '编辑授权'
          isEditDevice.value = true
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
          isEditDevice.value = false
          formState.licenseCode = createNonceStr(8)
          const now = moment().format('YYYYMMDD')
          const num = props.total + 1
          formState.contractNumber = `JCXSB${now}${num}`
          formState.batchNumber = `ZFY${now}${num}`
        }
      }
    )

    //文件上传
    let fileList = ref<any[]>([])
    watchEffect(() => {
      formState.execlUrl = fileList.value[0]?.url || ''
    })

    const changeDate = (v: any[]) => {
      if (v.length) {
        formState.startTime = v[0]
        formState.endTime = v[1]
      } else {
        formState.startTime = ''
        formState.endTime = ''
      }
    }

    //表单确认提交
    const formRef = ref<FormRefType>()
    const onSubmit = () => {
      formRef
        .value!.validate()
        .then(() => {
          validated()
        })
        .catch((error: ValidateErrorEntity<TParamsManage>) => {
          console.log('validate error', error)
        })
    }

    let loading = ref(false)
    const validated = async () => {
      formState.type = props.type
      try {
        loading.value = true
        await manageAuthManage(toRaw(formState))
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
      formRef.value!.resetFields()
      resetFields()
      fileList.value = []
      emit('update:visible', false)
    }

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      //编辑导入设备提示
      isEditDevice,
      //form数据
      AuthorizationTypes,
      title,
      formRef,
      formState,
      rules,
      fileList,
      changeDate,
      //form操作
      loading,
      onSubmit,
      resetForm
    }
  }
})
</script>

<style scoped lang="scss">
span {
  display: block;
  color: red;
}
</style>