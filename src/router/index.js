import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Footer from '../components/Footer'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    components: {
      default: () => import('../views/home/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/kind',
    name: 'kind',
    components: {
      default: () => import('../views/kind/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/cart',
    name: 'cart',
    components: {
      default: () => import('../views/cart/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/user',
    name: 'user',
    components: {
      default: () => import('../views/user/index.vue'),
      footer: Footer
    }
  },
  {
    path: '/detail/:proid',
    name: 'detail',
    component: () => import('../views/detail/index.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register/index.vue')
  },
  {
    path: '/sms',
    name: 'sms',
    component: () => import('../views/register/sms.vue')
  },
  {
    path: '/setpwd',
    name: 'setpwd',
    component: () => import('../views/register/setpwd.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/order/:time',
    name: 'order',
    component: () => import('../views/order/index.vue')
  },
  {
    path: '/orderaddresslist/:time',
    name: 'orderaddresslist',
    component: () => import('../views/order/list.vue')
  },
  {
    path: '/orderaddressadd/:time',
    name: 'orderaddressadd',
    component: () => import('../views/order/add.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
