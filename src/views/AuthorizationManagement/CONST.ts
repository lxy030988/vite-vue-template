import JcEnum from '@/utils/enum'

export enum AuthorizationTypes {
  INSIDE = '0',
  OUTSIDE = '1'
}

//授权状态
export const LICENSE_STATUSES = new JcEnum([
  { key: 'WKS', value: 0, label: '未开始' },
  { key: 'JXZ', value: 1, label: '进行中' },
  { key: 'YJS', value: 2, label: '已结束' }
])

//设备授权状态
export const DEVICE_LICENSE_STATUSES = new JcEnum([
  { key: 'YSQ', value: 0, label: '已授权' },
  { key: 'WSQ', value: 1, label: '未授权' }
])
