import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { ResCodeEnum } from '@/enums/httpEnum'
import { TRes } from './model'
import { getToken } from '../storage/user/user'

import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 200_000,
  headers: {
    token: getToken(),
    'Content-Security-Policy': 'upgrade-insecure-requests'
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
      if (res.data.code === ResCodeEnum.SUCCESS) {
        return res.data.data
      } else {
        if (
          res.data.msg.msgCode === ResCodeEnum.AUTH_ERROR ||
          res.data.msg.msgCode === ResCodeEnum.AUTH_EXPIRE
        ) {
          message.error('您未登录或登录已失效')
          router.push({ path: '/login' })
        } else {
          console.error(res.data.msg.msgText)
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
