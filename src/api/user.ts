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
