import http from '@/utils/http'
import api from '../api'
import { TPageRes } from '../model'
import { TAuthorizationListItem, TParamsList } from './model'

export function getAuthManageList(data?: TParamsList) {
  return http.request<any, TPageRes<TAuthorizationListItem>>({
    url: api.authorizationManagement.list,
    method: 'POST',
    data
  })
}
