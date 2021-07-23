import { StorageEnum } from '@/enums/storageEnum'
import { localData, storageGet, storageSet } from '..'
import { User } from './model'

export function setToken(token: string) {
  storageSet(StorageEnum.ACCESS_TOKEN, token)
}

export function getToken() {
  return localData.getData(StorageEnum.ACCESS_TOKEN)
}

export function getUser() {
  return storageGet<User>(StorageEnum.USER)
}

export function setUser(info: User | null) {
  storageSet(StorageEnum.USER, info)
}
