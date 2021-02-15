import { Module } from 'vuex'
import store, { RootState } from '@/store'
export interface ExplodingKittensState {
  players: string;
}

const module: Module<ExplodingKittensState, RootState> = {
  namespaced: true,

  state: {
    players: ''
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}

store.registerModule('ExplodingKittens', module)
