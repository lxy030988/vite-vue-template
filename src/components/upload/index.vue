<template>
  <div>
    <h1>upload</h1>
  </div>
  <div ref='drag' class="drag">
    <input type="file" name="file" accept="image/*" @change="handleFileChange">
  </div>
  <div>
    <div>计算hash进度</div>
    <a-progress :percent="hashProgress" />
  </div>
  <div>
    <a-progress :percent="progressPercent" />
  </div>
  <div>
    <a-button type="primary" @click="uploadBtn">上传</a-button>
  </div>
  <div>
    <!-- chunk.progress 
      progress<0 报错 显示红色
      == 100 成功
      别的数字 方块高度显示 -->
    <!-- 尽可能让方块看起来仕真方形
      比如10各方块 4*4
      9 3*3
      100 10*10 -->
    <div class="cube-container" :style="{width:cubeWidth+'px'}">
      <div v-for="chunk in uploadedChunks" :key="chunk.name" class="cube">
        <div :class="{
              'uploading':chunk.progress>0&&chunk.progress<100,
              'success':chunk.progress==100,
              'error':chunk.progress<0
            }" :style="{height:chunk.progress+'%'}">
          <LoadingOutlined v-if="chunk.progress<100 && chunk.progress>0" style="color:#f56c6c" />
          <!-- <i v-if="chunk.progress<100 && chunk.progress>0" class="el-icon-loading" style="color:#f56c6c"></i> -->
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  Ref,
  ref,
  toRefs
} from 'vue'

import { utest, uploadFile } from '@/api/upload'
import { LoadingOutlined } from '@ant-design/icons-vue'

import {
  bindEvents,
  isImage,
  isJpg,
  createFileChunk,
  calculateHashWorker,
  calculateHashIdle,
  calculateHashSample,
  uploadChunks
} from './hooks'

export default defineComponent({
  components: { LoadingOutlined },
  async setup() {
    // let progressPercent = ref(0)
    let hashProgress = ref(0)
    let file: Ref<Nullable<File>> = ref(null)
    let hash = ref('')
    let state = reactive<any>({ uploadedChunks: [] })

    let cubeWidth = computed(() => {
      return Math.ceil(Math.sqrt(state.uploadedChunks.length)) * 30
    })

    let progressPercent = computed(() => {
      if (!file.value || state.uploadedChunks.length) {
        return 0
      }
      console.log('progressPercent computed')
      const loaded = state.uploadedChunks
        .map((item: any) => item.chunk.size * item.progress)
        .reduce((acc: any, cur: any) => acc + cur, 0)
      return parseInt(((loaded * 100) / file.value.size).toFixed(2))
    })

    async function handleFileChange(e: any) {
      const target: HTMLInputElement = e.target
      file.value = target.files![0]
      const res = await isImage(file.value)
      console.log('handleFileChange', file.value, res)
    }

    async function uploadBtn() {
      console.log('uploadBtn', file.value)

      const chunks = createFileChunk(file.value!)
      console.log('chunks', chunks)

      // const hash0 = await calculateHashWorker(chunks, (progress: any) => {
      //   // console.log('hash progress', progress)
      //   hashProgress.value = progress
      // })
      // console.log('hash0', hash0)

      const hash1 = await calculateHashIdle(chunks, (progress: any) => {
        // console.log('hash progress', progress)
        hashProgress.value = progress
      })
      console.log('hash1', hash1)

      // const hash2 = await calculateHashSample(file.value!, (progress: any) => {
      //   // console.log('hash progress', progress)
      //   hashProgress.value = progress
      // })
      // console.log('hash2', hash2)
      hash.value = hash1
      state.uploadedChunks = chunks.map((chunk, index) => {
        // 切片的名字 hash+index
        return {
          hash: hash1,
          name: hash1 + '-' + index,
          index,
          chunk: chunk.file,
          progress: 0
        }
      })
      console.log('uploadedChunks', state.uploadedChunks)
      await uploadChunks(state.uploadedChunks)
      return

      const form = new FormData()
      form.append('name', 'file')
      form.append('file', file.value as Blob)

      const res = await uploadFile(form, (progress: any) => {
        // console.log('progress', progress)
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
      progressPercent,
      hashProgress,
      // uploadedChunks,
      ...toRefs(state),
      cubeWidth
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

.cube-container {
  .cube {
    width: 28px;
    height: 28px;
    line-height: 26px;
    border: 1px black solid;
    background: #eee;
    float: left;

    & > .success {
      background: green;
    }

    & > .uploading {
      background: blue;
    }

    & > .error {
      background: red;
    }
  }
}
</style>