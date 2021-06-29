// eslint-disable-next-line @typescript-eslint/ban-types
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
