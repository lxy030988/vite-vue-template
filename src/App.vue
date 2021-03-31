<template>
  <!-- /src   src   ~assets  ~/assets -->
  <img alt="Vue logo" src="src/assets/logo.png" />

  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
    <a-menu-item key="/">
      <router-link to="/">首页</router-link>
    </a-menu-item>
    <a-menu-item key="/plan">
      <router-link to="/plan">计划</router-link>
    </a-menu-item>
  </a-menu>
  <router-view></router-view>
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite1 ----APP 页面" /> -->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
