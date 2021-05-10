import { userState } from './store'

const moduleGetters = {
  isLogin: (state: userState): string => {
    return `🏮${state.loading}`
  },
  isLogin2: (state: userState): string => {
    return `🏮2${state.loading}`
  }
}
export default moduleGetters
