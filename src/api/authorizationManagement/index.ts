import http from '@/utils/http'
import api from '../api'

export function getAuthManageList(params?: any) {
  return http.request<any, any>({
    url: api.authorizationManagement.list,
    method: 'POST',
    params
  })
}
