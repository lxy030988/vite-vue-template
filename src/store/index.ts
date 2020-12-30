import { createStore } from 'vuex'
import { HomeState } from '/@/typings/user'
import home from './modules/user'

export interface GlobleState {
  home: HomeState //某个模块的状态
}
export default createStore<GlobleState>({
  mutations: {},
  actions: {},
  modules: {
    home
  }
})
