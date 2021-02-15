import { createStore } from 'vuex'
import { GameCoreClient } from '../grpc/core/CoreServiceClientPb'
import { LoginArgs } from '../grpc/core/types_pb'

export interface Config {
  coreProxy: string;
}

export interface RootState {
  config: Config;
  token: string;
  client: GameCoreClient;
}

export default createStore<RootState>({
  state: {
    config: {
      coreProxy: 'localhost:8080'
    },
    token: '',
    client: new GameCoreClient('localhost:8080')
  },
  mutations: {
    setConfig (state: RootState, config: Config) {
      state.config = config
      state.client = new GameCoreClient(state.config.coreProxy)
    },
    setToken (state: RootState, token: string) {
      state.token = token
    }
  },
  actions: {
    async loadConfig ({ commit }) {
      const configFile = await fetch(process.env.BASE_URL + 'config.json')
      const configJson = await configFile.json()
      commit('setConfig', configJson)
    },
    async login ({ commit, state }, payload: {userName: string; password: string}) {
      const args = new LoginArgs()
      args.setUsername(payload.userName)
      args.setPassword(payload.password)
      const ret = await state.client.login(args, null)
      commit('setToken', ret.getToken())
    }
  },
  modules: {
  }
})
