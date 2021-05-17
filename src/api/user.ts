import { CATEGORY_TYPES } from '../typings/user'
import axios from '.'

export function getSystemDomainLogo<T>() {
  return axios.post<T, T>('/user-service/domainLogo/getSystemDomainLogo')
}

// export function getLessons<T>(
//   category: CATEGORY_TYPES,
//   offset: number = 0 as number,
//   limit: number = 5 as number
// ) {
//   return axios.get<T, T>('/lesson/list', {
//     params: {
//       category,
//       offset,
//       limit
//     }
//   })
// }

import service from '@/utils/http'
interface T1 {
  pageNum: number
  pageSize: number
  pages: number
  resultList: any[]
  total: number
}

function test() {
  return service.request<any, T1>({
    url: '/user-service/domainLogo/getSystemDomainLogo',
    method: 'GET'
  })
}
async function name() {
  const red = await test()
  // red.
}
