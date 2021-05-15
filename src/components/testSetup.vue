<template>
  <div>script setup</div>
  <img :src="logo" alt="" />

  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.title }}
    </li>
  </ul>

  <div class="test">test</div>
  <a-button type="primary" @click="test">测试</a-button>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import { computed, getCurrentInstance, reactive, ref } from 'vue'

type c = {
  id: number
  title: string
}

const list = reactive<c[]>([
  { id: 1, title: 'aaa' },
  { id: 2, title: 'aaa2' }
])

const color = ref('red')
const font = reactive({ size: '30px' })

function test() {
  console.log('test')
  color.value = 'green'
  font.size = '18px'
}
</script>

<style lang="scss" scoped>
.test {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
