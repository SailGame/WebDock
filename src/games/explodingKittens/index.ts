import './store'
import router from '@/router'
import Exploding from './components/Exploding.vue'

router.addRoute({
  path: '/game/exploding_kittens',
  name: 'Exploding',
  component: Exploding
})
