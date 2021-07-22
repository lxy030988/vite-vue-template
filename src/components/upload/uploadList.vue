<template>
  <div>
    <a-upload :file-list="fileList" :multiple="false" action="https://192.168.0.180/gwy-api/file-server-service/upload/upload?ifSaveName=true" :before-upload="beforeUpload" @change="handleChange">
      <a-button type="primary" :disabled="loading">
        <upload-outlined></upload-outlined>
        上传文件
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { UploadOutlined } from '@ant-design/icons-vue'
import { defineComponent, PropType, ref } from 'vue'

interface FileItem {
  uid: string
  name?: string
  status?: string
  response?: any
  url?: string
}

interface FileInfo {
  file: FileItem
  fileList: FileItem[]
}

export default defineComponent({
  name: 'UploadList',
  components: {
    UploadOutlined
  },
  props: {
    fileList: {
      type: Array as PropType<FileItem[]>,
      default: () => []
    }
  },
  emits: ['update:fileList'],
  setup(props, { emit }) {
    let loading = ref(false)
    // const fileList = ref<FileItem[]>([
    //   {
    //     uid: '1',
    //     name: 'xxx.png',
    //     // status: 'done',
    //     // response: 'Server Error 500',
    //     url: 'http://www.baidu.com/xxx.png'
    //   },
    //   {
    //     uid: '2',
    //     name: 'yyy.png',
    //     // status: 'done',
    //     url: 'http://www.baidu.com/yyy.png'
    //   }
    // ])

    const handleChange = (info: FileInfo) => {
      console.log('handleChange', info.file.status, info)
      if (info.file.status === 'done') {
        loading.value = false
      }

      let resFileList = [...info.fileList]

      resFileList = resFileList.slice(-1)

      resFileList = resFileList.map(file => {
        if (file.response) {
          file.url = file.response.url || 'url'
        }
        return file
      })

      emit('update:fileList', resFileList)
      // fileList.value = resFileList
    }

    const beforeUpload = () => {
      loading.value = true
    }

    return {
      loading,
      // fileList,
      handleChange,
      beforeUpload
    }
  }
})
</script>

