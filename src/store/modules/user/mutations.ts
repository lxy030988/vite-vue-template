import { GET_DATA, GET_DATA1 } from './constant'
import { userState } from './store'

const mutations = {
  [GET_DATA](state: userState, payload: boolean): void {
    console.log('mutations执行成功')
    state.loading = payload
  },
  [GET_DATA1](state: userState, payload: boolean): void {
    console.log('mutations执行成功')
    state.loading = payload
  }
}
export default mutations
