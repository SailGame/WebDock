import { ErrorNumber } from '@/grpc/core/error_pb'
import { ClientReadableStream } from 'grpc-web'
import { createStore } from 'vuex'
import { GameCoreClient } from '../grpc/core/CoreServiceClientPb'
import { ListenArgs, LoginArgs, BroadcastMsg } from '../grpc/core/types_pb'

const DEFAULT_CORE_HOSTNAME = 'http://localhost:8000'

export interface Config {
  coreProxy: string;
}

export interface RootState {
  config: Config;
  token: string;
  client: GameCoreClient;
  lisStream: ClientReadableStream<BroadcastMsg> | null;
}

export default createStore<RootState>({
  state: {
    config: {
      coreProxy: DEFAULT_CORE_HOSTNAME
    },
    token: '',
    client: new GameCoreClient(DEFAULT_CORE_HOSTNAME),
    lisStream: null
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
    },
    setListenStream (state: RootState, stream: ClientReadableStream<BroadcastMsg>) {
      state.lisStream = stream
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
      await this.dispatch('listen')
    },
    async listen ({ commit, state }) {
      const args = new ListenArgs()
      args.setToken(state.token)
      const stream = await state.client.listen(args) as ClientReadableStream<BroadcastMsg>
      stream.on('data', (response) => {
        this.dispatch('message', response)
      })
      stream.on('end', () => {
        commit('setToken', '')
        commit('setListenStream', null)
      })
    }
  },
  modules: {
  }
})
