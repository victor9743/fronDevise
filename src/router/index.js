import { createRouter, createWebHistory } from 'vue-router'
import PedidoView from '../views/PedidoView.vue'
import CadastroView from '../views/CadastroView.vue'

const routes = [
  {
    path: '/',
    name: 'pedidos',
    component: PedidoView
  },
  {
    path: '/novoPedido',
    name: 'novoPedido',
    component: CadastroView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
