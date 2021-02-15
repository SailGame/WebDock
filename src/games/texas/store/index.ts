import { Module } from 'vuex'
import store, { RootState } from '@/store'

const module: Module<{}, RootState> = {
  namespaced: true,

  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}

store.registerModule('Texas', module)
