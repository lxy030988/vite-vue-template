import { userState } from './store'

const moduleGetters = {
  isLogin: (state: userState): string => {
    return `🏮${state}`
  }
}
export default moduleGetters
