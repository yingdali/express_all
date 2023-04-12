import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
    },
    {
        path: '/table',
        name: 'table',
        component: () => import('../components/table/Table.vue')
      },
      {
        path: '/echars',
        name: 'echars',
        component: () => import('../components/echars/histogram.vue')
      },
      {
        path: '/encrypt',
        name: 'echars',
        component: () => import('../components/component/encrypt.vue')
      },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
