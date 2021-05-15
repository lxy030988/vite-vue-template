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
import { computed, defineProps, getCurrentInstance, useContext, reactive, ref } from 'vue'
const { expose } = useContext()
interface Ltype {
  name: string
  age: number
}
defineProps({
  msg: String,
  more: {
    type: Object
  }
})
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
  console.log('test testSetup')
  color.value = 'green'
  font.size = '18px'
}
expose({ test })
</script>

<style lang="scss" scoped>
.test {
  color: v-bind(color);
  font-size: v-bind('font.size');
}
</style>
