import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/kind',
    name: 'kind',
    component: () => import('../views/kind/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/index.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/user/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
