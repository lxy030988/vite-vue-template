import http from '@/utils/http'

export function utest() {
  return http.request<any, any>({
    url: '/',
    method: 'GET'
  })
}

export function uploadFile(data: FormData, cb?: Function) {
  return http.request<any, any>({
    url: '/uploadfile',
    method: 'POST',
    data,
    onUploadProgress: progress => {
      cb && cb(progress)
    }
  })
}
