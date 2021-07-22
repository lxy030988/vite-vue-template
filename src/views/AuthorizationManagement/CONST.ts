import JcEnum from '@/utils/enum'

export enum AuthorizationTypes {
  INSIDE = '0',
  OUTSIDE = '1'
}

export const LICENSE_STATUSES = new JcEnum([
  { key: 'WKS', value: 0, label: '未开始' },
  { key: 'JXZ', value: 1, label: '进行中' },
  { key: 'YJS', value: 2, label: '已结束' }
])
