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
  type: number
}
