import { createStore } from 'vuex'
import { GameCoreClient } from '../grpc/core/CoreServiceClientPb'
import { LoginArgs } from '../grpc/core/types_pb'

export interface RootState {
  token: string;
  client: GameCoreClient;
}

export default createStore<RootState>({
  state: {
    token: '',
    client: new GameCoreClient('')
  },
  mutations: {
    async login (state: RootState, payload: {userName: string; password: string}) {
      const args = new LoginArgs()
      args.setUsername(payload.userName)
      args.setPassword(payload.password)
      const ret = await state.client.login(args, null)
      state.token = ret.getToken()
    }
  },
  actions: {
  },
  modules: {
  }
})
