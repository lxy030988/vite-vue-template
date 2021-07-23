import http from '@/utils/http'
import api from '../api'
import { TPageRes } from '../model'
import {
  TPageResItemTest,
  TParamsTest,
  TResItemDomainLogo,
  TParamsLogin,
  TResUser
} from './model'

export function getSystemDomainLogo1(params?: TParamsTest) {
  return http.request<any, TPageRes<TPageResItemTest>>({
    url: '/user-service/domainLogo/getSystemDomainLogo',
    method: 'POST',
    params
  })
}

export function getSystemDomainLogo(params?: TParamsTest) {
  return http.request<any, Partial<TResItemDomainLogo>[]>({
    url: '/user-service/domainLogo/getSystemDomainLogo',
    method: 'POST',
    params
  })
}
export function getUserInfo(data: TParamsLogin) {
  return http.request<any, TResUser>({
    url: api.user.login,
    method: 'POST',
    data
  })
}

// async function use() {
//   const res = await getSystemDomainLogo()
//   res[0]
// }
