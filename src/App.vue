<template>
  <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys" :style="{ lineHeight: '64px' }">
    <a-menu-item key="/">
      <router-link to="/">首页</router-link>
    </a-menu-item>
    <a-menu-item key="/plan">
      <router-link to="/plan">计划</router-link>
    </a-menu-item>
  </a-menu>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped></style>
