import http from '@/utils/http'
import api from '../api'
import { TPageRes } from '../model'
import {
  TPageResItemTest,
  TParamsTest,
  TResItemDomainLogo,
  TParamsLogin
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
export function getUserInfo(params?: TParamsLogin) {
  return http.request<any, any>({
    url: api.user.login,
    method: 'POST',
    params
  })
}

// async function use() {
//   const res = await getSystemDomainLogo()
//   res[0]
// }
