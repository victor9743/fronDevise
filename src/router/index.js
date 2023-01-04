import { createRouter, createWebHistory } from 'vue-router'
import PedidoView from '../views/PedidoView.vue'
import ProcessadorView from '../views/ProcessadorView.vue'

const routes = [
  {
    path: '/',
    name: 'pedidos',
    component: PedidoView
  },
  {
    path: '/processadores',
    name: 'processadores',
    component: ProcessadorView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
