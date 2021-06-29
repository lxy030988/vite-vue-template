import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResCodeEnum } from '@/enums/httpEnum'
import { TRes } from './model'

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 200_000,
  headers: {
    token: 'token'
    // 'Content-Security-Policy': 'upgrade-insecure-requests'
  }
})

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (res: AxiosResponse<TRes>) => {
    if (res.status === 200) {
      if (res.data.resCode === ResCodeEnum.SUCCESS) {
        return res.data.resData
      } else {
        if (
          res.data.resMsg.msgCode === ResCodeEnum.AUTH_ERROR ||
          res.data.resMsg.msgCode === ResCodeEnum.AUTH_EXPIRE
        ) {
          // Message({ message: '您未登录或登录已失效', type: 'error', offset: 20 })
          // router.push({ name: 'login' })
          console.log('您未登录或登录已失效')
        } else {
          console.error(res.data.resMsg.msgText)
        }
        return Promise.reject(res)
      }
    } else {
      return Promise.reject(res)
    }
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
