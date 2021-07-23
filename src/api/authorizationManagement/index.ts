import http from '@/utils/http'
import api from '../api'
import { TPageRes } from '../model'
import {
  TAuthorizationListItem,
  TParamsManage,
  TParamsList,
  TParamsDeviceList,
  TDeviceListItem,
  TParamsAddDevice,
  TParamsDeviceStatus,
  TParamsImportDevice
} from './model'

export function getAuthManageList(data: TParamsList) {
  return http.request<any, TPageRes<TAuthorizationListItem>>({
    url: api.authorizationManagement.list,
    method: 'POST',
    data
  })
}

export function addAuthManage(data: TParamsManage) {
  return http.request<any, any>({
    url: api.authorizationManagement.add,
    method: 'POST',
    data
  })
}

export function updateAuthManage(data: TParamsManage) {
  return http.request<any, any>({
    url: api.authorizationManagement.update,
    method: 'POST',
    data
  })
}

export function manageAuthManage(data: TParamsManage) {
  return data.id ? updateAuthManage(data) : addAuthManage(data)
}

export function getAuthManageDeviceList(data: TParamsDeviceList) {
  return http.request<any, TPageRes<TDeviceListItem>>({
    url: api.authorizationManagement.deviceList,
    method: 'POST',
    data
  })
}

export function addAuthManageDevice(data: TParamsAddDevice) {
  return http.request<any, any>({
    url: api.authorizationManagement.addDevice,
    method: 'POST',
    data
  })
}

export function updateDeviceStatus(data: TParamsDeviceStatus) {
  return http.request<any, any>({
    url: api.authorizationManagement.updateDeviceStatus,
    method: 'POST',
    data
  })
}

export function importDevice(data: TParamsImportDevice) {
  const { recordId, file } = data
  const formData = new FormData()

  formData.append('file', file)

  return http.request<any, any>({
    url: api.authorizationManagement.importDevice,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { recordId },
    data: formData
  })
}
