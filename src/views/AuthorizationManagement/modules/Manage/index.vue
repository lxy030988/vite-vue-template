<template>
  <a-modal :visible="visible" :title="title" :width="800" :footer="null" :mask-closable="false" @cancel="resetForm">
    <a-form
      ref="formRef"
      class="jc-manage-form"
      :model="formState"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item label="合同号" name="contractNumber">
        <a-input v-model:value="formState.contractNumber" :disabled="!!info" />
      </a-form-item>
      <a-form-item label="批次号" name="batchNumber">
        <a-input v-model:value="formState.batchNumber" :disabled="!!info" />
      </a-form-item>
      <a-form-item v-if="AuthorizationTypes.OUTSIDE === type" label="授权码" name="licenseCode">
        <a-input v-model:value="formState.licenseCode" disabled />
      </a-form-item>
      <a-form-item label="批次日期" name="batchTime">
        <a-date-picker
          v-model:value="formState.batchTime"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :show-time="false"
          :disabled="!!info"
        />
      </a-form-item>
      <a-form-item label="购买公司" name="company">
        <a-input v-model:value="formState.company" placeholder="请输入公司/机构/团体名称(仅限80个字符)" />
      </a-form-item>
      <a-form-item label="批次设备总数" name="allCount">
        <a-input v-model:value.number="formState.allCount" placeholder="请输入数量(仅限阿拉伯数字)" />
      </a-form-item>
      <a-form-item v-if="type === AuthorizationTypes.INSIDE" label="设备信息导入" name="execlUrl">
        <a href="/excel/设备信息表格模板.xlsx">设备信息表格模板下载</a>
        <span v-if="isEditDevice">重新导入后，若设备号相同，原有设备信息将被覆盖!</span>
        <jc-upload-list v-model:fileList="fileList" />
      </a-form-item>
      <a-form-item label="授权日期" name="date">
        <a-range-picker
          v-model:value="formState.date"
          value-format="YYYY-MM-DD"
          format="YYYY-MM-DD"
          @change="changeDate"
        />
      </a-form-item>
      <a-form-item label="描述" name="description">
        <a-textarea v-model:value="formState.description" placeholder="请输入问题描述(仅限1000个字符)" />
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
import moment from 'moment'
import { defineAsyncComponent, defineComponent, PropType, reactive, ref, toRaw, watch, watchEffect } from 'vue'
import { getStringRule, NOT_NULL, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
import { AuthorizationTypes } from '../../CONST'
import { TAuthorizationListItem, TParamsManage } from '@/api/authorizationManagement/model'
import { manageAuthManage } from '@/api/authorizationManagement'
import { createNonceStr } from '@/utils/util'
import { NumMessage, success } from '@/utils/message'
export default defineComponent({
  name: 'AuthorizationManagementManage',
  components: {
    JcUploadList: defineAsyncComponent(() => import('@/components/upload/uploadList.vue'))
  },
  props: {
    type: {
      type: String as PropType<AuthorizationTypes>,
      required: true
    },
    info: {
      type: Object as PropType<TAuthorizationListItem | null>,
      default: null
    },
    visible: {
      type: Boolean,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    num: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:visible', 'success'],
  setup(props, { emit }) {
    const curDate = new Date()
    const date = `${curDate.getFullYear()}-0${curDate.getMonth() + 1}-${curDate.getDate()}`
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
        if (typeof value !== 'number' || value < 0) {
          reject('输入正整数')
        } else if (props.info && props.info.licenseEquNum > value) {
          reject(`批次设备总数大于${props.info.licenseEquNum}`)
        } else {
          resolve('')
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
          Object.assign(formState, props.info)
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
          const nums = props.num + 1
          formState.contractNumber = `JCXSB${now}${nums}`
          formState.batchNumber = `ZFY${now}${nums}`
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
        const { successList, failList } = await manageAuthManage(toRaw(formState))
        if (successList || failList) {
          NumMessage(successList, failList)
        } else {
          success()
        }
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
