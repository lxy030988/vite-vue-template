import http from '@/utils/http'
import api from '../api'
import { TParamsLogin, TResUser } from './model'

/**
 * 用户登录
 * @param data
 * @returns
 */
export function getUserInfo(data: TParamsLogin) {
  return http.request<any, TResUser>({
    url: api.user.login,
    method: 'POST',
    data
  })
}
