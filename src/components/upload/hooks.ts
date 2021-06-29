export function bindEvents(drag: HTMLElement, cb: Function) {
  drag.addEventListener('dragover', e => {
    drag.style.borderColor = 'red'
    e.preventDefault()
  })
  drag.addEventListener('dragleave', e => {
    drag.style.borderColor = '#eee'
    e.preventDefault()
  })
  drag.addEventListener('drop', e => {
    const fileList = e.dataTransfer!.files
    drag.style.borderColor = '#eee'
    cb(fileList[0])
    // file.value = fileList[0]
    e.preventDefault()
  })
}

async function blobToString(blob: Blob) {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.readAsBinaryString(blob)

    reader.onload = function () {
      console.log('reader', reader.result)
      const res = (reader.result as string)
        .split('')
        .map(v => v.charCodeAt(0))
        .map(v => v.toString(16).toUpperCase())
        // .map(v=>v.padStart(2,'0'))
        .join(' ')
      resolve(res)
    }
  })
}

export async function isGif(file: File) {
  const res = await blobToString(file.slice(0, 6))
  const isGif = res == '47 49 46 38 39 61' || res == '47 49 46 38 37 61'
  return isGif
}

export async function isPng(file: File) {
  const res = await blobToString(file.slice(0, 8))
  const ispng = res == '89 50 4E 47 0D 0A 1A 0A'
  return ispng
}

export async function isJpg(file: File) {
  const len = file.size
  const start = await blobToString(file.slice(0, 2))
  const end = await blobToString(file.slice(-2, len))
  // console.log('start', start)
  const isjpg = start == 'FF D8' && end == 'FF D9'
  return isjpg
}

export async function isImage(file: File) {
  return (await isGif(file)) || (await isPng(file)) || (await isJpg(file))
}

//文件切片
const CHUNK_SIZE = 10 * 1024 * 1024
export function createFileChunk(file: File, size = CHUNK_SIZE) {
  const chunks = []
  let cur = 0
  while (cur < file.size) {
    chunks.push({ index: cur, file: file.slice(cur, cur + size) })
    cur += size
  }
  return chunks
}

//web worker 计算hash值
export async function calculateHashWorker(chunks: any[], cb: Function) {
  return new Promise(resolve => {
    const worker = new Worker('/src/components/upload/worker.js')
    worker.postMessage({ chunks })
    worker.onmessage = e => {
      const { progress, hash } = e.data
      cb(Number(progress.toFixed(2)))
      if (hash) {
        resolve(hash)
      }
    }
  })
}
