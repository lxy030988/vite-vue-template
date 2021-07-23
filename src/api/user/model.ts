export interface TPageResItemTest {
  id: string
  name: string
  [key: string]: any
}

export interface TParamsTest {
  name?: string
}

export interface TResItemDomainLogo {
  domain: string
  domainLogo: string
  domainLogoChar: string
  entranceRouter: string
  firstPageLoginLogo: string
  firstPageLogo: string
  id: string
  loginLogoLocation: number
  systemName: string
}
export interface TParamsLogin {
  account?: string
  userPwd?: string
}
export interface TResUser {
  account: string
  id: string
  token: string
  userName: string
}
