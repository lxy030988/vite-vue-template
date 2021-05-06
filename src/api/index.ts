import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ResultEnum } from '../enums/httpEnum'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL as string

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 200) {
      if (res.data.resCode === ResultEnum.SUCCESS) {
        return res.data.resData
      } else {
        if (res.data.resMsg.msgCode === ResultEnum.AUTH_ERROR || res.data.resMsg.msgCode === ResultEnum.AUTH_EXPIRE) {
          // Message({ message: '您未登录或登录已失效', type: 'error', offset: 20 })
          // router.push({ name: 'login' })
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

export default axios
