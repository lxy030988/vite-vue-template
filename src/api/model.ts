export interface TPageRes<T> {
  pageNum: number
  pageSize: number
  pages: number
  resultList: T[]
  total: number
}
