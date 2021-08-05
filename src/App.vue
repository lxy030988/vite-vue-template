<template>
  <a-config-provider :locale="zhCN">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import 'moment/dist/locale/zh-cn'
export default defineComponent({
  name: 'App',
  setup() {
    return { zhCN }
  }
})
</script>
