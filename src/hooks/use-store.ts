import { useStore } from 'vuex'
import { State } from '@/store'
import { Getters } from '@/store/utils'

interface IUserMyStore {
  state: State
  getters: Getters
}
const useMyStore = (): IUserMyStore => {
  const { state, getters }: IUserMyStore = useStore<State>()
  return { state, getters }
}
export { useMyStore }
export default useMyStore
