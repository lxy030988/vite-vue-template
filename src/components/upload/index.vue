<template>
  <div>
    <h1>upload</h1>
  </div>
  <div ref='drag'>
    <input type="file" name="file" @change="handleFileChange">
  </div>
  <div>
    <a-button type="primary" @click="uploadBtn">上传</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue'

import { utest, uploadFile } from '@/api/upload'
export default defineComponent({
  async setup() {
    const res = await utest()
    console.log('utest1222', res)

    let file: Ref<Nullable<File>> = ref(null)

    function handleFileChange(e: any) {
      const target: HTMLInputElement = e.target
      file.value = target.files![0]
      console.log('handleFileChange', file.value)
    }

    async function uploadBtn() {
      console.log('uploadBtn', file.value)

      const form = new FormData()
      form.append('name', 'file')
      form.append('file', file.value as Blob)

      const res = await uploadFile(form)
      console.log(res)
    }

    return {
      handleFileChange,
      uploadBtn
    }
  }
})
</script>

<style scoped>
</style>