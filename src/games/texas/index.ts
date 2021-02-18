import './store'
import router from '@/router'
import Texas from './components/Texas.vue'

router.addRoute({
  path: '/game/texas',
  name: 'Texas',
  component: Texas
})
