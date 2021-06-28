<template>
  <!-- /src   src   ~assets  ~/assets -->
  <img alt="Vue logo" src="@/assets/logo.png">
  <div class="bg"> bg </div>
  <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
    <a-menu-item key="/">
      <router-link to="/">首页</router-link>
    </a-menu-item>
    <a-menu-item key="/plan">
      <router-link to="/plan">计划</router-link>
    </a-menu-item>
  </a-menu>
  <router-view />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite1 ----APP 页面" /> -->
</template>

<script lang="ts">
import { defineComponent, provide, reactive, ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  components: {
    HelloWorld
  },
  setup(props, ctx) {
    ctx.expose
    const selectedKeys = ref(['/'])

    const name = ref('lxy')
    provide('name', name)
    setTimeout(() => {
      name.value = 'lxy hhh'
    }, 1000)
    return {
      selectedKeys
    }
  }
})
</script>

<style lang="scss" scoped>
.bg {
  width: 200px;
  height: 200px;
  background: url(@/assets/logo.png);
}
</style>
