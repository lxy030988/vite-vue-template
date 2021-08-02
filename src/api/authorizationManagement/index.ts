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
  TParamsImportDevice,
  TParamsDetail,
  TResImportDevice,
  TResDevice
} from './model'

/**
 * 授权管理列表
 * @param data
 * @returns
 */
export function getAuthManageList(data: TParamsList) {
  return http.request<any, TPageRes<TAuthorizationListItem>>({
    url: api.authorizationManagement.list,
    method: 'POST',
    data
  })
}

/**
 * 授权管理详情
 * @param data
 * @returns
 */
export function getAuthManageDetail(data: TParamsDetail) {
  return http.request<any, TAuthorizationListItem>({
    url: api.authorizationManagement.detail,
    method: 'POST',
    data
  })
}

/**
 * 添加授权
 * @param data
 * @returns
 */
export function addAuthManage(data: TParamsManage) {
  return http.request<any, any>({
    url: api.authorizationManagement.add,
    method: 'POST',
    data
  })
}

/**
 * 修改授权
 * @param data
 * @returns
 */
export function updateAuthManage(data: TParamsManage) {
  return http.request<any, any>({
    url: api.authorizationManagement.update,
    method: 'POST',
    data
  })
}

/**
 * 添加 编辑 授权
 * @param data data.id 存在为编辑授权
 * @returns
 */
export function manageAuthManage(data: TParamsManage) {
  return data.id ? updateAuthManage(data) : addAuthManage(data)
}

/**
 * 删除授权
 * @param data
 * @returns
 */
export function deleteAuthManage(data: string[]) {
  return http.request<any, any>({
    url: api.authorizationManagement.delete,
    method: 'POST',
    data
  })
}

/**
 * 授权设备列表
 * @param data
 * @returns
 */
export function getAuthManageDeviceList(data: TParamsDeviceList) {
  return http.request<any, TPageRes<TDeviceListItem>>({
    url: api.authorizationManagement.deviceList,
    method: 'POST',
    data
  })
}

/**
 * 添加授权设备
 * @param data
 * @returns
 */
export function addAuthManageDevice(data: TParamsAddDevice) {
  return http.request<any, any>({
    url: api.authorizationManagement.addDevice,
    method: 'POST',
    data
  })
}

/**
 * 更新授权设备状态
 * @param data
 * @returns
 */
export function updateDeviceStatus(data: TParamsDeviceStatus) {
  return http.request<any, any>({
    url: api.authorizationManagement.updateDeviceStatus,
    method: 'POST',
    data
  })
}

/**
 * 导入授权设备
 * @param data
 * @returns
 */
export function importDevice(data: TParamsImportDevice) {
  const { recordId, file } = data
  const formData = new FormData()

  formData.append('file', file as File)

  return http.request<any, TResImportDevice>({
    url: api.authorizationManagement.importDevice,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    params: { recordId },
    data: formData
  })
}

/**
 * 删除授权设备
 * @param data
 * @returns
 */
export function deleteDevice(data: string[]) {
  return http.request<any, any>({
    url: api.authorizationManagement.deleteDevice,
    method: 'POST',
    data
  })
}

/**
 * 当天授权设备数
 * @param data
 * @returns
 */
export function deviceCount() {
  return http.request<any, TResDevice>({
    url: api.authorizationManagement.deviceCount,
    method: 'POST'
  })
}
