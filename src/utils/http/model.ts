import { ResCodeEnum } from '@/enums/httpEnum'

interface TResMsg {
  msgCode: string
  msgText: string
}

export interface TRes {
  resCode: ResCodeEnum
  resData: any
  resMsg: TResMsg
}
