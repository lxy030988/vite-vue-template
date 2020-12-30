import { CATEGORY_TYPES } from '/@/typings/home'
import axios from '.'

export function getSliders<T>() {
  return axios.get<T, T>('/slider/list')
}

export function getLessons<T>(
  category: CATEGORY_TYPES,
  offset: number = 0 as number,
  limit: number = 5 as number
) {
  return axios.get<T, T>('/lesson/list', {
    params: {
      category,
      offset,
      limit
    }
  })
}
