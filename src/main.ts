import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// games
import './games'

createApp(App).use(ElementPlus).use(store).use(router).mount('#app')

// TODO: centralize router guard
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && store.state.token === '') next({ name: 'Login' })
  else next()
})

store.dispatch('loadConfig')
