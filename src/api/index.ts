import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  return config
})

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.err == 1) {
      return Promise.reject(response.data.data)
    }
    return response.data.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default axios
