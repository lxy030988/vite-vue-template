<template>
  <div>
    <h1>upload</h1>
  </div>
  <div ref='drag' class="drag">
    <input type="file" name="file" @change="handleFileChange">
  </div>
  <div>
    <a-progress :percent="progressPercent" />
  </div>
  <div>
    <a-button type="primary" @click="uploadBtn">上传</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue'

import { utest, uploadFile } from '@/api/upload'

import { bindEvents } from './hooks'

export default defineComponent({
  async setup() {
    let progressPercent = ref(0)
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

      const res = await uploadFile(form, (progress: any) => {
        console.log('progress', progress)
        progressPercent.value = Number(
          ((progress.loaded / progress.total) * 100).toFixed(2)
        )
      })
      console.log(res)
    }

    const drag = ref<HTMLElement>()

    onMounted(() => {
      bindEvents(drag.value!, (f: File) => {
        file.value = f
      })
    })

    const res = await utest()
    console.log('utest1222', res)

    return {
      handleFileChange,
      uploadBtn,
      drag,
      progressPercent
    }
  }
})
</script>

<style scoped lang="scss">
.drag {
  // margin: 0 auto;
  // width: 400px;
  height: 100px;
  // line-height: 100px;
  border: 2px dashed #eee;
  text-align: center;
}
</style>