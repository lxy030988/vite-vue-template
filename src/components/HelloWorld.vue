<template>
  <h1>{{ msg }}</h1>
  <img alt="Vue logo" src="@/assets/logo.png" />

  <a-button type="primary" @click="onSubmit">测试HTTP</a-button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getSystemDomainLogo } from '@/api/user'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: ''
    }
  },
  setup() {
    async function onSubmit() {
      const res = await getSystemDomainLogo()

      console.log('onSubmit', res)
    }
    return {
      count: 0,
      onSubmit
    }
  }
})
</script>
