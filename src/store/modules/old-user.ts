import { CATEGORY_TYPES, HomeState, Lessons, Slider } from '@/typings/user'
import { Module } from 'vuex'
import { GlobleState } from '..'
import * as TYPES from '../action-types'

const state: HomeState = {
  name: 'lxy',
  currentCategory: CATEGORY_TYPES.ALL,
  sliders: [],
  lessons: {
    hasMore: true,
    loading: false,
    offset: 0,
    limit: 5,
    list: []
  }
}
//Module<自己状态, 全局状态>
const home: Module<HomeState, GlobleState> = {
  namespaced: true,
  state,
  mutations: {
    [TYPES.SET_CATEGORY](state, payload: CATEGORY_TYPES) {
      state.currentCategory = payload
    },
    [TYPES.SET_SLIDER_LIST](state, payload: Slider[]) {
      state.sliders = payload
    },
    [TYPES.SET_LOADING](state, payload: boolean) {
      state.lessons.loading = payload
    },
    [TYPES.SET_LESSON_LIST](state, payload: Lessons) {
      state.lessons.list = [...state.lessons.list, ...payload.list]
      state.lessons.hasMore = payload.hasMore
      state.lessons.offset = state.lessons.offset + payload.list.length
    }
  },
  actions: {
    async [TYPES.SET_SLIDER_LIST]({ commit }) {
      commit(TYPES.SET_SLIDER_LIST, [])
    },
    async [TYPES.SET_LESSON_LIST]({ commit }) {
      if (state.lessons.loading || !state.lessons.hasMore) return
      commit(TYPES.SET_LOADING, true)
      commit(TYPES.SET_LESSON_LIST, [])
      commit(TYPES.SET_LOADING, false)
    }
  }
}
export default home
