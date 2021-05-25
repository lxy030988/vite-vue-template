import { Commit, CommitOptions, Dispatch, DispatchOptions, useStore } from 'vuex'
import { State } from '@/store'
import { Getters, CommitTypes, DispatchTypes } from '@/store/utils'

interface MyCommit extends Commit {
  (type: CommitTypes, payload?: any, options?: CommitOptions): void
}
interface MyDispatch extends Dispatch {
  (type: DispatchTypes, payload?: any, options?: DispatchOptions): Promise<any>
}
interface IUserMyStore {
  state: State
  getters: Getters
  commit: MyCommit
  dispatch: MyDispatch
}
const useMyStore = (): IUserMyStore => {
  const { state, getters, commit, dispatch }: IUserMyStore = useStore<State>()
  return { state, getters, commit, dispatch }
}
export { useMyStore }
export default useMyStore

// const { state, getters, commit, dispatch } = useStore<State>()
// state.user.loading
// state.wechat.loading
