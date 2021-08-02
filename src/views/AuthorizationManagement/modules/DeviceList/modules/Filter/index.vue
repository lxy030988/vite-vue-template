<template>
  <a-card
    :bordered="false"
    class="jc-tabfilter"
  >
    <a-form
      layout="inline"
      :model="formState"
    >
      <a-form-item label="创建日期">
        <a-range-picker
          v-model:value="formState.createTime"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          @change="handleChange"
        />
      </a-form-item>
      <a-form-item label="授权状态">
        <a-select
          v-model:value="formState.licenseStatus"
          placeholder="全部状态"
        >
          <a-select-option
            v-for="item in DEVICE_LICENSE_STATUSES.VALUES"
            :key="item.value"
            :value="item.value"
          >{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="设备信息">
        <a-input
          v-model:value="formState.equipmentNum"
          placeholder='
          请输入设备信息'
        >
        </a-input>
      </a-form-item>
      <a-form-item class="jc-tabfilter-btns">
        <a-button
          type="primary"
          html-type="submit"
          @click="onSubmit"
        >查询</a-button>
        <a-button
          class="jc-ml"
          @click="resetFields"
        >重置</a-button>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script lang="ts">
import { defineComponent, reactive, toRaw } from 'vue'
import { useForm } from '@/hooks'
import { DEVICE_LICENSE_STATUSES } from '@/views/AuthorizationManagement/CONST'

export default defineComponent({
  name: 'AuthorizationManagementDeviceListFilter',
  emits: ['filter'],
  setup(props, { emit }) {
    let formState = reactive({
      createTime: [],
      createEndTime: '',
      createStartTime: '',
      licenseStatus: undefined,
      equipmentNum: ''
    })

    const { resetFields } = useForm(formState, {})

    const onSubmit = () => {
      emit('filter', toRaw(formState))
    }
    const handleChange = (v: any[]) => {
      if (v) {
        formState.createStartTime = v[0]
        formState.createEndTime = v[1]
      } else {
        formState.createStartTime = ''
        formState.createEndTime = ''
      }
    }

    return {
      formState,
      resetFields,
      onSubmit,
      DEVICE_LICENSE_STATUSES,
      handleChange
    }
  }
})
</script>

<style scoped lang="scss">
</style>