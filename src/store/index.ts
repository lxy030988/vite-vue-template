// import { createStore } from 'vuex'
// import { HomeState } from '@/typings/user'
// import home from './modules/old-user'

// export interface GlobleState {
//   home: HomeState //某个模块的状态
// }
// export default createStore<GlobleState>({
//   mutations: {},
//   actions: {},
//   modules: {
//     home
//   }
// })

import { createStore } from 'vuex'
import { modules } from './modules'
import { userState } from './modules/user/store'
type State = {
  user: userState
}

const store = createStore<State>({
  modules
})
export { State }
export default store
