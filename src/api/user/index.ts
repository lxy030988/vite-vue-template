import http from '@/utils/http'
import { TPageRes } from '../model'
import { TPageResItemTest, TParamsTest } from './model'

function test(params?: TParamsTest) {
  return http.request<any, TPageRes<TPageResItemTest>>({
    url: '/user-service/domainLogo/getSystemDomainLogo',
    method: 'GET',
    params
  })
}

// async function use() {
//   const res = await test()
//   res.resultList[0].id
// }
