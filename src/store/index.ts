import { ErrorNumber } from '@/grpc/core/error_pb'
import { createStore } from 'vuex'
import { GameCoreClient } from '../grpc/core/CoreServiceClientPb'
import { LoginArgs } from '../grpc/core/types_pb'

const DEFAULT_CORE_HOSTNAME = 'http://localhost:8000'

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
      coreProxy: DEFAULT_CORE_HOSTNAME
    },
    token: '',
    client: new GameCoreClient(DEFAULT_CORE_HOSTNAME)
  },
  mutations: {
    setConfig (state: RootState, config: Config) {
      if (state.config.coreProxy !== config.coreProxy) {
        state.client = new GameCoreClient(config.coreProxy)
      }
      state.config = config
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
      if (ret.getErr() !== ErrorNumber.OK) {
        return ret
      }
      commit('setToken', ret.getToken())
    }
  },
  modules: {
  }
})
