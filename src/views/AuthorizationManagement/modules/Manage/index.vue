<template>
  <a-modal :visible="visible" title="添加授权" :width="800" :footer="null" :mask-closable="false" @cancel="handleCancel">
    <a-form ref="formRef" class="jc-manage-form" :model="formState" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="合同号" name="name">
        <a-input v-model:value="formState.name" placeholder="请输入" />
      </a-form-item>
      <a-form-item label="批次号" name="region">
        <a-select v-model:value="formState.region" placeholder="请选择">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="授权码" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="批次日期" name="date1">
        <a-date-picker v-model:value="formState.date1" format="YYYY-MM-DD HH:mm:ss" value-format="YYYY-MM-DD HH:mm:ss" show-time />
      </a-form-item>
      <a-form-item label="购买公司" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>
      <a-form-item label="批次设备总数" name="count">
        <a-input v-model:value.number="formState.count" />
      </a-form-item>
      <a-form-item label="设备信息导入" name="name">

      </a-form-item>
      <a-form-item label="授权日期" name="date2">
        <a-range-picker v-model:value="formState.date2" value-format="YYYY-MM-DD HH:mm:ss" show-time />
      </a-form-item>
      <a-form-item label="描述" name="desc">
        <a-textarea v-model:value="formState.desc" />
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
import { Moment } from 'moment'
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue'
import { getIntegerRule, SELECT_NOT_NULL } from '@/utils/rule'
import { useForm } from '@/hooks'
import { FormRefType } from '@/hooks/useForm'
interface FormState {
  name: string
  region: string | undefined
  date1: string | undefined
  delivery: boolean
  type: string[]
  resource: string
  desc: string
  count: number | null
}

export default defineComponent({
  name: 'AuthorizationManagementManage',
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
      region: undefined,
      date1: undefined,
      delivery: false,
      type: [],
      resource: '',
      desc: '',
      count: null
    })
    const rules = {
      count: getIntegerRule(),
      name: [
        {
          required: true,
          message: 'Please input Activity name'
        },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ],
      region: [
        {
          required: true,
          message: 'Please select Activity zone',
          trigger: 'change'
        }
      ],
      date1: SELECT_NOT_NULL
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