import { setToken, setUser } from '@/utils/storage/user/user'
import { MutationsTypes } from './constant'
import { userState } from './store'

const mutations = {
  [MutationsTypes.SET_USER](state: userState, payload: any): void {
    console.log('mutations执行成功')
    state.user = payload
    setUser(payload)
    setToken(payload?.token)
  }
}
export default mutations
