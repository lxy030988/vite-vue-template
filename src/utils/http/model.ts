import { ResultEnum } from '@/enums/httpEnum'

interface TResMsg {
  msgCode: string
  msgText: string
}

export interface TRes {
  resCode: ResultEnum
  resData: any
  resMsg: TResMsg
}
