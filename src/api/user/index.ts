import http from '@/utils/http'
import { TPageRes } from '../model'
import { TPageResItemTest, TParamsTest, TResItemDomainLogo } from './model'

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

// async function use() {
//   const res = await getSystemDomainLogo()
//   res[0]
// }
