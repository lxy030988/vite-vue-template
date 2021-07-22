export interface TParamsList {
  batchTime?: string
  endTime?: string
  licenseInfo?: string
  licenseStatus?: number
  pageNum: number
  pageSize: number
  startTime?: string
  type: string
}

export interface TAuthorizationListItem {
  allCount: number
  batchNumber: string
  batchTime: string
  company: string
  contractNumber: string
  description: string
  endTime: string
  id: string
  licenseCode: string
  startTime: string
  licenseStatus: number
  type: number
  execlUrl: string
  importEquNum: number
  licenseEquNum: number
}

export interface TParamsManage {
  allCount: number | null
  batchNumber: string
  batchTime: string
  company: string
  contractNumber: string
  description: string
  endTime: string
  execlUrl: string
  id?: string
  licenseCode: string
  startTime: string
  type: string
  [key: string]: any
}

export interface TParamsDeviceList {
  licenseRecordId: string
  pageNum: number
  pageSize: number
  licenseStatus?: number
  createTime?: string
  equipmentNum?: string
}

export interface TDeviceListItem {
  id: string
  createTime: string
  equipmentNum: string
  licenseSentence: string
  licenseStatus: number
}

export interface TParamsAddDevice {
  licenseRecordId: string
  licenseStatus: number
  equipmentNum: string
}

export interface TParamsDeviceStatus {
  id: string
  licenseStatus: number
}
