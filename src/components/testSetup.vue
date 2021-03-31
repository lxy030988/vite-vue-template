<template>
  <div>script setup</div>
  <img :src="logo" alt="" />

  <ul>
    <li v-for="item in list" :key="item.id">
      {{ item.title }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import { reactive } from 'vue'

type c = {
  id: number
  title: string
}

const list = reactive<c[]>([{ id: 1, title: 'aaa' }])
</script>

<style lang="scss" scoped></style>
