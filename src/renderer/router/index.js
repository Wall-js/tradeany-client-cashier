import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/pages/Login').default
    },
    {
      path: '/home',
      name: 'landing-page',
      component: require('@/pages/CashRegister').default
    },
    {
      path: '/SellingGoods',
      name: 'landing-page',
      component: require('@/pages/ProductManagement/SellingGoods').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
